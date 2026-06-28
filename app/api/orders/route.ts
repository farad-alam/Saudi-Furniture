import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function generateOrderNumber() {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 90000) + 10000;
  return `SF-${year}${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name, phone, email, city, address, notes,
      deliveryMethod, deliveryFee, subtotal, total,
      receiptUrl, transactionRef, items,
    } = body;

    const orderNumber = generateOrderNumber();

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName: name,
        customerPhone: phone,
        customerEmail: email || null,
        city,
        address,
        notes: notes || null,
        deliveryMethod,
        deliveryFee,
        subtotal,
        total,
        receiptUrl: receiptUrl || null,
        transactionRef: transactionRef || null,
        status: receiptUrl ? "PAYMENT_SUBMITTED" : "PENDING_PAYMENT",
        items: {
          create: items.map((item: { productId: string; quantity: number; price: number }) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    return NextResponse.json({ orderNumber: order.orderNumber, orderId: order.id });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const orderNumber = searchParams.get("orderNumber");
  const phone = searchParams.get("phone");

  if (!orderNumber || !phone) {
    return NextResponse.json({ error: "Missing orderNumber or phone" }, { status: 400 });
  }

  try {
    const order = await prisma.order.findFirst({
      where: {
        orderNumber,
        customerPhone: { contains: phone.replace(/\D/g, "").slice(-9) },
      },
      include: {
        items: {
          include: { product: { select: { nameAr: true, nameEn: true, images: true } } },
        },
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("Order lookup error:", error);
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
  }
}

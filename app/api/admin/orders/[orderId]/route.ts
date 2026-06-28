import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await params;
  const body = await request.json();
  const { status, note } = body;

  try {
    const updateData: Record<string, unknown> = { status };
    if (status === "PENDING_PAYMENT" && note) {
      updateData.rejectionNote = note;
    }
    if (status === "PAYMENT_VERIFIED") {
      updateData.rejectionNote = null;
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: updateData,
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Order update error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import OrderActionButtons from "./OrderActionButtons";

export const metadata: Metadata = { title: "تفاصيل الطلب" };

const STATUS_LABEL: Record<string, { label: string; cls: string }> = {
  PENDING_PAYMENT:   { label: "في انتظار الدفع",  cls: "status-pending"   },
  PAYMENT_SUBMITTED: { label: "بانتظار التحقق",   cls: "status-submitted" },
  PAYMENT_VERIFIED:  { label: "تم التحقق",         cls: "status-verified"  },
  PROCESSING:        { label: "جاري التجهيز",      cls: "status-processing"},
  OUT_FOR_DELIVERY:  { label: "في الطريق",         cls: "status-shipping"  },
  DELIVERED:         { label: "تم التسليم",        cls: "status-delivered" },
  CANCELLED:         { label: "ملغى",              cls: "status-cancelled" },
};

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  let order;
  try {
    order = await prisma.order.findFirst({
      where: { orderNumber: orderId },
      include: {
        items: {
          include: { product: { select: { nameAr: true, nameEn: true, images: true } } },
        },
      },
    });
  } catch { order = null; }

  if (!order) notFound();

  const s = STATUS_LABEL[order.status] ?? { label: order.status, cls: "status-pending" };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <Link href="/admin/orders" className="btn btn-outline btn-sm">
          ← الطلبات
        </Link>
        <h1 className="text-xl font-bold" dir="ltr">{order.orderNumber}</h1>
        <span className={`badge ${s.cls}`}>{s.label}</span>
      </div>

      <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
        {/* Customer info */}
        <InfoCard title="بيانات العميل">
          <Row label="الاسم"       value={order.customerName}  />
          <Row label="الجوال"      value={order.customerPhone} dir="ltr" />
          <Row label="البريد"      value={order.customerEmail ?? "—"} />
          <Row label="المدينة"     value={order.city}          />
          <Row label="العنوان"     value={order.address}       />
          <Row label="التوصيل"     value={order.deliveryMethod === "PICKUP" ? "استلام من المعرض" : "توصيل للمنزل"} />
          {order.notes && <Row label="ملاحظات" value={order.notes} />}
        </InfoCard>

        {/* Order summary */}
        <InfoCard title="ملخص الطلب">
          <Row label="المجموع الجزئي"  value={`${Number(order.subtotal).toLocaleString("ar-SA")} ر.س`} />
          <Row label="رسوم التوصيل"    value={`${Number(order.deliveryFee).toLocaleString("ar-SA")} ر.س`} />
          <Row label="الإجمالي"        value={`${Number(order.total).toLocaleString("ar-SA")} ر.س`} bold />
          <Row label="التاريخ"         value={new Date(order.createdAt).toLocaleString("ar-SA")} />
          {order.transactionRef && <Row label="رقم العملية" value={order.transactionRef} dir="ltr" />}
        </InfoCard>

        {/* Receipt */}
        {order.receiptUrl && (
          <InfoCard title="إيصال التحويل">
            <a href={order.receiptUrl} target="_blank" rel="noopener noreferrer">
              <Image
                src={order.receiptUrl}
                alt="Receipt"
                width={300}
                height={200}
                className="rounded-xl object-cover w-full hover:opacity-90 transition-opacity"
              />
            </a>
            <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
              انقر على الصورة لفتحها بالحجم الكامل
            </p>
          </InfoCard>
        )}
      </div>

      {/* Order items */}
      <div
        className="rounded-2xl border mt-6 overflow-hidden"
        style={{ background: "var(--color-white)", borderColor: "var(--border)" }}
      >
        <h2 className="font-bold p-5 border-b" style={{ borderColor: "var(--border)" }}>المنتجات</h2>
        <div className="divide-y" style={{ borderColor: "var(--border)" }}>
          {order.items.map((item: any) => (
            <div key={item.id} className="flex items-center gap-4 p-4">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0" style={{ background: "var(--color-sand)" }}>
                {item.product.images[0] && (
                  <Image src={item.product.images[0]} alt={item.product.nameAr} fill className="object-cover" sizes="56px" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-semibold">{item.product.nameAr}</p>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>×{item.quantity}</p>
              </div>
              <p className="font-bold">{(Number(item.price) * item.quantity).toLocaleString("ar-SA")} ر.س</p>
            </div>
          ))}
        </div>
      </div>

      {/* Admin actions */}
      <div
        className="rounded-2xl border mt-6 p-6"
        style={{ background: "var(--color-white)", borderColor: "var(--border)" }}
      >
        <h2 className="font-bold mb-4">إجراءات الطلب</h2>
        <OrderActionButtons orderId={order.id} currentStatus={order.status} />
      </div>
    </div>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border p-5" style={{ background: "var(--color-white)", borderColor: "var(--border)" }}>
      <h2 className="font-bold mb-4 pb-3 border-b" style={{ borderColor: "var(--border)" }}>{title}</h2>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function Row({ label, value, bold, dir }: { label: string; value: string; bold?: boolean; dir?: string }) {
  return (
    <div className="flex gap-2 text-sm">
      <span className="min-w-[100px] font-semibold" style={{ color: "var(--text-muted)" }}>{label}:</span>
      <span className={bold ? "font-black" : ""} dir={dir}>{value}</span>
    </div>
  );
}

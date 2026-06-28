import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "الطلبات | Orders" };

const STATUS_LABEL: Record<string, { label: string; cls: string }> = {
  PENDING_PAYMENT:   { label: "في انتظار الدفع",  cls: "status-pending"   },
  PAYMENT_SUBMITTED: { label: "بانتظار التحقق",   cls: "status-submitted" },
  PAYMENT_VERIFIED:  { label: "تم التحقق",         cls: "status-verified"  },
  PROCESSING:        { label: "جاري التجهيز",      cls: "status-processing"},
  OUT_FOR_DELIVERY:  { label: "في الطريق",         cls: "status-shipping"  },
  DELIVERED:         { label: "تم التسليم",        cls: "status-delivered" },
  CANCELLED:         { label: "ملغى",              cls: "status-cancelled" },
};

const ALL_STATUSES = Object.keys(STATUS_LABEL);

async function getOrders(status?: string) {
  try {
    return await prisma.order.findMany({
      where: status ? { status: status as never } : undefined,
      orderBy: { createdAt: "desc" },
      take: 50,
    });
  } catch { return []; }
}

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const orders = await getOrders(status);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">الطلبات</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{orders.length} طلب</p>
      </div>

      {/* Status filters */}
      <div className="flex gap-2 flex-wrap mb-6">
        <Link
          href="/admin/orders"
          className={`btn btn-sm ${!status ? "btn-primary" : "btn-outline"}`}
        >
          الكل
        </Link>
        {ALL_STATUSES.map((s) => (
          <Link
            key={s}
            href={`/admin/orders?status=${s}`}
            className={`btn btn-sm ${status === s ? "btn-primary" : "btn-outline"}`}
          >
            {STATUS_LABEL[s].label}
          </Link>
        ))}
      </div>

      {/* Table */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ background: "var(--color-white)", borderColor: "var(--border)" }}
      >
        {orders.length === 0 ? (
          <div className="p-16 text-center" style={{ color: "var(--text-muted)" }}>
            <p className="text-4xl mb-3">📦</p>
            <p>لا توجد طلبات</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead style={{ background: "var(--bg-secondary)" }}>
                <tr>
                  {["رقم الطلب", "العميل", "الجوال", "المدينة", "المبلغ", "الحالة", "التاريخ", ""].map((h) => (
                    <th key={h} className="text-start px-4 py-3 font-semibold" style={{ color: "var(--text-muted)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => {
                  const s = STATUS_LABEL[o.status] ?? { label: o.status, cls: "status-pending" };
                  return (
                    <tr
                      key={o.id}
                      className="border-t hover:bg-[var(--bg-secondary)] transition-colors"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <td className="px-4 py-3 font-mono font-bold text-xs" style={{ color: "var(--color-gold)" }}>
                        {o.orderNumber}
                      </td>
                      <td className="px-4 py-3 font-semibold">{o.customerName}</td>
                      <td className="px-4 py-3" dir="ltr">{o.customerPhone}</td>
                      <td className="px-4 py-3">{o.city}</td>
                      <td className="px-4 py-3 font-bold">{Number(o.total).toLocaleString("ar-SA")} ر.س</td>
                      <td className="px-4 py-3">
                        <span className={`badge text-xs ${s.cls}`}>{s.label}</span>
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--text-muted)" }}>
                        {new Date(o.createdAt).toLocaleDateString("ar-SA")}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/admin/orders/${o.orderNumber}`}
                          className="btn btn-sm btn-outline"
                        >
                          تفاصيل
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

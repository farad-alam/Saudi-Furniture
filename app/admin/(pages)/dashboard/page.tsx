import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import {
  ShoppingBag, Clock, CheckCircle, TrendingUp,
} from "lucide-react";

export const metadata: Metadata = { title: "Dashboard" };

async function getStats() {
  try {
    const [totalOrders, pendingOrders, verifiedOrders, recentOrders] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { status: "PAYMENT_SUBMITTED" } }),
      prisma.order.count({ where: { status: { in: ["PAYMENT_VERIFIED", "PROCESSING", "OUT_FOR_DELIVERY", "DELIVERED"] } } }),
      prisma.order.findMany({
        take: 8, orderBy: { createdAt: "desc" },
        select: { orderNumber: true, customerName: true, total: true, status: true, createdAt: true },
      }),
    ]);

    const revenue = await prisma.order.aggregate({
      _sum: { total: true },
      where: { status: { in: ["PAYMENT_VERIFIED", "PROCESSING", "OUT_FOR_DELIVERY", "DELIVERED"] } },
    });

    return { totalOrders, pendingOrders, verifiedOrders, recentOrders, revenue: Number(revenue._sum.total ?? 0) };
  } catch {
    return { totalOrders: 0, pendingOrders: 0, verifiedOrders: 0, recentOrders: [] as any[], revenue: 0 };
  }
}

const STATUS_LABEL: Record<string, { label: string; cls: string }> = {
  PENDING_PAYMENT:   { label: "في انتظار الدفع",       cls: "status-pending"   },
  PAYMENT_SUBMITTED: { label: "بانتظار التحقق",         cls: "status-submitted" },
  PAYMENT_VERIFIED:  { label: "تم التحقق",              cls: "status-verified"  },
  PROCESSING:        { label: "جاري التجهيز",           cls: "status-processing"},
  OUT_FOR_DELIVERY:  { label: "في الطريق",              cls: "status-shipping"  },
  DELIVERED:         { label: "تم التسليم",             cls: "status-delivered" },
  CANCELLED:         { label: "ملغى",                   cls: "status-cancelled" },
};

export default async function DashboardPage() {
  const stats = await getStats();

  const KPI = [
    { label: "إجمالي الطلبات",       value: stats.totalOrders,  icon: ShoppingBag, color: "#C9913A" },
    { label: "بانتظار التحقق",        value: stats.pendingOrders, icon: Clock,       color: "#E8C27A" },
    { label: "مؤكدة",                value: stats.verifiedOrders,icon: CheckCircle, color: "#1A4A2E" },
    { label: "إيرادات مؤكدة (ر.س)",  value: stats.revenue.toLocaleString("ar-SA"), icon: TrendingUp, color: "#7A1C2E" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">لوحة التحكم</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
          {new Date().toLocaleDateString("ar-SA", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 mb-8" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        {KPI.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-2xl p-5 border flex items-center gap-4"
            style={{ background: "var(--color-white)", borderColor: "var(--border)" }}
          >
            <div
              className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center"
              style={{ background: `${color}18`, color }}
            >
              <Icon size={22} />
            </div>
            <div>
              <p className="text-2xl font-black" style={{ color: "var(--text-primary)" }}>{value}</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ background: "var(--color-white)", borderColor: "var(--border)" }}
      >
        <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: "var(--border)" }}>
          <h2 className="font-bold">آخر الطلبات</h2>
          <a href="/admin/orders" className="text-sm font-semibold" style={{ color: "var(--color-gold)" }}>
            عرض الكل →
          </a>
        </div>

        {stats.recentOrders.length === 0 ? (
          <div className="p-10 text-center" style={{ color: "var(--text-muted)" }}>
            لا توجد طلبات بعد
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead style={{ background: "var(--bg-secondary)" }}>
                <tr>
                  {["رقم الطلب", "العميل", "المبلغ", "الحالة", "التاريخ"].map((h) => (
                    <th key={h} className="text-start px-5 py-3 font-semibold" style={{ color: "var(--text-muted)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((o: any, i: number) => {
                  const s = STATUS_LABEL[o.status] ?? { label: o.status, cls: "status-pending" };
                  return (
                    <tr
                      key={o.orderNumber}
                      className="border-t hover:bg-[var(--bg-secondary)] transition-colors"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <td className="px-5 py-3 font-mono font-bold" style={{ color: "var(--color-gold)" }}>
                        <a href={`/admin/orders/${o.orderNumber}`} className="hover:underline">{o.orderNumber}</a>
                      </td>
                      <td className="px-5 py-3">{o.customerName}</td>
                      <td className="px-5 py-3 font-semibold">{Number(o.total).toLocaleString("ar-SA")} ر.س</td>
                      <td className="px-5 py-3">
                        <span className={`badge text-xs ${s.cls}`}>{s.label}</span>
                      </td>
                      <td className="px-5 py-3" style={{ color: "var(--text-muted)" }}>
                        {new Date(o.createdAt).toLocaleDateString("ar-SA")}
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

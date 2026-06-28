import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "العملاء | Customers" };

export default async function AdminCustomersPage() {
  let customers: any[] = [];
  try {
    // Group orders by phone to get a unique list of customers
    const orders = await prisma.order.groupBy({
      by: ["customerPhone", "customerName", "city"],
      _count: { _all: true },
      _sum: { total: true },
      orderBy: { _count: { id: "desc" } },
      take: 50,
    });
    customers = orders;
  } catch {}

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">العملاء</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>قائمة العملاء المسجلين من الطلبات</p>
      </div>

      <div
        className="rounded-2xl border overflow-hidden"
        style={{ background: "var(--color-white)", borderColor: "var(--border)" }}
      >
        {customers.length === 0 ? (
          <div className="p-16 text-center" style={{ color: "var(--text-muted)" }}>
            <p className="text-4xl mb-3">👥</p>
            <p>لا يوجد عملاء حتى الآن</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead style={{ background: "var(--bg-secondary)" }}>
                <tr>
                  {["الاسم", "الجوال", "المدينة", "عدد الطلبات", "إجمالي المشتريات"].map((h) => (
                    <th key={h} className="text-start px-4 py-3 font-semibold" style={{ color: "var(--text-muted)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {customers.map((c: any, i: number) => (
                  <tr
                    key={i}
                    className="border-t hover:bg-[var(--bg-secondary)] transition-colors"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <td className="px-4 py-3 font-semibold">{c.customerName}</td>
                    <td className="px-4 py-3" dir="ltr">{c.customerPhone}</td>
                    <td className="px-4 py-3">{c.city}</td>
                    <td className="px-4 py-3 font-bold">{c._count._all}</td>
                    <td className="px-4 py-3 font-bold" style={{ color: "var(--color-gold)" }}>
                      {Number(c._sum.total ?? 0).toLocaleString("ar-SA")} ر.س
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

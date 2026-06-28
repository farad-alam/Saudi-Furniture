import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "المنتجات | Products" };

export default async function AdminProductsPage() {
  let products = [];
  try {
    products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: { category: true },
      take: 50,
    });
  } catch {}

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">المنتجات</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>إدارة المنتجات المخزنة</p>
        </div>
        <button className="btn btn-primary btn-sm flex items-center gap-2">
          <Plus size={16} /> إضافه منتج
        </button>
      </div>

      <div
        className="rounded-2xl border overflow-hidden"
        style={{ background: "var(--color-white)", borderColor: "var(--border)" }}
      >
        {products.length === 0 ? (
          <div className="p-16 text-center" style={{ color: "var(--text-muted)" }}>
            <p className="text-4xl mb-3">🛋️</p>
            <p>لا توجد منتجات حتى الآن</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead style={{ background: "var(--bg-secondary)" }}>
                <tr>
                  {["الاسم (عربي)", "القسم", "السعر الأساسي", "سعر العرض", "المخزون", "الإجراءات"].map((h) => (
                    <th key={h} className="text-start px-4 py-3 font-semibold" style={{ color: "var(--text-muted)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr
                    key={p.id}
                    className="border-t hover:bg-[var(--bg-secondary)] transition-colors"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <td className="px-4 py-3 font-semibold">{p.nameAr}</td>
                    <td className="px-4 py-3">{p.category.nameAr}</td>
                    <td className="px-4 py-3 font-bold">{Number(p.price).toLocaleString("ar-SA")} ر.س</td>
                    <td className="px-4 py-3">
                      {p.salePrice ? (
                        <span style={{ color: "var(--color-burgundy)", fontWeight: "bold" }}>
                          {Number(p.salePrice).toLocaleString("ar-SA")} ر.س
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`badge text-xs ${p.inStock ? "badge-green" : "badge-muted"}`}>
                        {p.inStock ? "متوفر" : "نفد"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="btn btn-sm btn-outline text-xs">تعديل</button>
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

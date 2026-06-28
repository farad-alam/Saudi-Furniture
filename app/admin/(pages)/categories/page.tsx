import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "الأقسام | Categories" };

export default async function AdminCategoriesPage() {
  let categories: any[] = [];
  try {
    categories = await prisma.category.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {}

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">الأقسام</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>إدارة تصنيفات المنتجات</p>
        </div>
        <button className="btn btn-primary btn-sm flex items-center gap-2">
          <Plus size={16} /> إضافة قسم
        </button>
      </div>

      <div
        className="rounded-2xl border overflow-hidden"
        style={{ background: "var(--color-white)", borderColor: "var(--border)" }}
      >
        {categories.length === 0 ? (
          <div className="p-16 text-center" style={{ color: "var(--text-muted)" }}>
            <p className="text-4xl mb-3">📁</p>
            <p>لا توجد أقسام حتى الآن</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead style={{ background: "var(--bg-secondary)" }}>
                <tr>
                  {["الاسم (عربي)", "الاسم (إنجليزي)", "الرابط", "الإجراءات"].map((h) => (
                    <th key={h} className="text-start px-4 py-3 font-semibold" style={{ color: "var(--text-muted)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {categories.map((c: any) => (
                  <tr
                    key={c.id}
                    className="border-t hover:bg-[var(--bg-secondary)] transition-colors"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <td className="px-4 py-3 font-semibold">{c.nameAr}</td>
                    <td className="px-4 py-3">{c.nameEn}</td>
                    <td className="px-4 py-3 font-mono" dir="ltr">/{c.slug}</td>
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

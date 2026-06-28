import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "البانرات | Banners" };

export default async function AdminBannersPage() {
  let banners = [];
  try {
    banners = await prisma.banner.findMany({
      orderBy: { position: "asc" },
    });
  } catch {}

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">البانرات الترويجية</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>إدارة البانرات في الصفحة الرئيسية</p>
        </div>
        <button className="btn btn-primary btn-sm flex items-center gap-2">
          <Plus size={16} /> إضافة بانر
        </button>
      </div>

      <div
        className="rounded-2xl border overflow-hidden"
        style={{ background: "var(--color-white)", borderColor: "var(--border)" }}
      >
        {banners.length === 0 ? (
          <div className="p-16 text-center" style={{ color: "var(--text-muted)" }}>
            <p className="text-4xl mb-3">🖼️</p>
            <p>لا توجد بانرات حتى الآن</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead style={{ background: "var(--bg-secondary)" }}>
                <tr>
                  {["العنوان (عربي)", "الرابط", "الترتيب", "الحالة", "الإجراءات"].map((h) => (
                    <th key={h} className="text-start px-4 py-3 font-semibold" style={{ color: "var(--text-muted)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {banners.map((b) => (
                  <tr
                    key={b.id}
                    className="border-t hover:bg-[var(--bg-secondary)] transition-colors"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <td className="px-4 py-3 font-semibold">{b.titleAr ?? "—"}</td>
                    <td className="px-4 py-3 font-mono" dir="ltr">{b.link ?? "—"}</td>
                    <td className="px-4 py-3 font-bold">{b.position}</td>
                    <td className="px-4 py-3">
                      <span className={`badge text-xs ${b.isActive ? "badge-green" : "badge-muted"}`}>
                        {b.isActive ? "نشط" : "معطل"}
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

import type { Metadata } from "next";
import { Save } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "الإعدادات | Settings" };

export default async function AdminSettingsPage() {
  let settings = [];
  try {
    settings = await prisma.setting.findMany();
  } catch {}

  const getValue = (key: string) => settings.find((s) => s.key === key)?.value ?? "";

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">الإعدادات العامة</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>تحديث معلومات المتجر الأساسية</p>
      </div>

      <div
        className="rounded-2xl border p-6"
        style={{ background: "var(--color-white)", borderColor: "var(--border)" }}
      >
        <form className="flex flex-col gap-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="form-label">رقم الواتساب (WhatsApp)</label>
              <input type="text" className="form-input" dir="ltr" defaultValue={getValue("whatsapp")} placeholder="+966 5X XXX XXXX" />
            </div>
            <div>
              <label className="form-label">البريد الإلكتروني للتواصل</label>
              <input type="email" className="form-input" dir="ltr" defaultValue={getValue("contact_email")} placeholder="info@saudifurniture.com" />
            </div>
          </div>

          <div>
            <label className="form-label">عنوان المعرض (عربي)</label>
            <input type="text" className="form-input" defaultValue={getValue("address_ar")} />
          </div>

          <div>
            <label className="form-label">عنوان المعرض (إنجليزي)</label>
            <input type="text" className="form-input" defaultValue={getValue("address_en")} dir="ltr" />
          </div>

          <div>
            <label className="form-label">ساعات العمل (عربي)</label>
            <input type="text" className="form-input" defaultValue={getValue("hours_ar")} />
          </div>

          <div>
            <label className="form-label">ساعات العمل (إنجليزي)</label>
            <input type="text" className="form-input" defaultValue={getValue("hours_en")} dir="ltr" />
          </div>

          <div className="pt-4 border-t mt-2" style={{ borderColor: "var(--border)" }}>
            <button type="button" className="btn btn-primary flex items-center gap-2">
              <Save size={16} /> حفظ التغييرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

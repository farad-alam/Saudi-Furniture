"use client";

import { useState } from "react";
import { CheckCircle, XCircle, Package, Truck, Home, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const TRANSITIONS: Record<string, { label: string; next: string; icon: typeof CheckCircle; color: string }[]> = {
  PAYMENT_SUBMITTED: [
    { label: "تحقق من الدفع ✓", next: "PAYMENT_VERIFIED", icon: CheckCircle, color: "var(--color-green)" },
    { label: "رفض الإيصال ✗",   next: "PENDING_PAYMENT",  icon: XCircle,     color: "var(--color-burgundy)" },
  ],
  PAYMENT_VERIFIED: [
    { label: "بدء التجهيز",     next: "PROCESSING",       icon: Package,     color: "var(--color-gold)" },
  ],
  PROCESSING: [
    { label: "تم الشحن",        next: "OUT_FOR_DELIVERY",  icon: Truck,       color: "var(--color-gold)" },
  ],
  OUT_FOR_DELIVERY: [
    { label: "تم التسليم",      next: "DELIVERED",         icon: Home,        color: "var(--color-green)" },
  ],
};

export default function OrderActionButtons({
  orderId, currentStatus,
}: {
  orderId: string; currentStatus: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [note, setNote] = useState("");

  const actions = TRANSITIONS[currentStatus] ?? [];

  if (actions.length === 0) {
    return (
      <p className="text-sm" style={{ color: "var(--text-muted)" }}>
        {currentStatus === "DELIVERED" ? "✅ الطلب مكتمل" :
         currentStatus === "CANCELLED" ? "❌ الطلب ملغى" :
         "لا توجد إجراءات متاحة لهذه الحالة"}
      </p>
    );
  }

  const handleAction = async (next: string) => {
    setLoading(next);
    await fetch(`/api/admin/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next, note: note || undefined }),
    });
    setLoading(null);
    setNote("");
    router.refresh();
  };

  const needsNote = actions.some((a) => a.next === "PENDING_PAYMENT");

  return (
    <div className="flex flex-col gap-4">
      {needsNote && (
        <div>
          <label className="form-label">سبب الرفض (اختياري)</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="form-input"
            rows={2}
            placeholder="وضح سبب رفض الإيصال..."
          />
        </div>
      )}
      <div className="flex gap-3 flex-wrap">
        {actions.map(({ label, next, icon: Icon, color }) => (
          <button
            key={next}
            onClick={() => handleAction(next)}
            disabled={loading !== null}
            className="btn btn-sm flex items-center gap-2"
            style={{ background: color, color: "white", border: "none" }}
          >
            {loading === next ? <Loader2 size={14} className="animate-spin" /> : <Icon size={14} />}
            {label}
          </button>
        ))}
        {currentStatus !== "CANCELLED" && currentStatus !== "DELIVERED" && (
          <button
            onClick={() => handleAction("CANCELLED")}
            disabled={loading !== null}
            className="btn btn-sm flex items-center gap-2"
            style={{ background: "var(--text-muted)", color: "white", border: "none" }}
          >
            {loading === "CANCELLED" ? <Loader2 size={14} className="animate-spin" /> : <XCircle size={14} />}
            إلغاء الطلب
          </button>
        )}
      </div>
    </div>
  );
}

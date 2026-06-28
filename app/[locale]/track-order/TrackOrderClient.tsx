"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Search, Package, Loader2 } from "lucide-react";

type OrderStatus =
  | "PENDING_PAYMENT" | "PAYMENT_SUBMITTED" | "PAYMENT_VERIFIED"
  | "PROCESSING" | "OUT_FOR_DELIVERY" | "DELIVERED" | "CANCELLED";

const STATUS_ORDER: OrderStatus[] = [
  "PENDING_PAYMENT", "PAYMENT_SUBMITTED", "PAYMENT_VERIFIED",
  "PROCESSING", "OUT_FOR_DELIVERY", "DELIVERED",
];

const STATUS_ICONS: Record<OrderStatus, string> = {
  PENDING_PAYMENT:    "🕐",
  PAYMENT_SUBMITTED:  "📄",
  PAYMENT_VERIFIED:   "✅",
  PROCESSING:         "📦",
  OUT_FOR_DELIVERY:   "🚚",
  DELIVERED:          "🏠",
  CANCELLED:          "❌",
};

export default function TrackOrderClient({ locale }: { locale: string }) {
  const t = useTranslations("trackOrder");
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone]     = useState("");
  const [order, setOrder]     = useState<{ status: OrderStatus; orderNumber: string; rejectionNote?: string; total: number; createdAt: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setOrder(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/orders?orderNumber=${encodeURIComponent(orderId)}&phone=${encodeURIComponent(phone)}`);
      if (!res.ok) throw new Error("not found");
      const data = await res.json();
      setOrder(data);
    } catch {
      setError(t("notFound"));
    } finally {
      setLoading(false);
    }
  };

  const statusLabel = (status: OrderStatus) => {
    const map = t.raw("status") as Record<string, string>;
    return map[status] ?? status;
  };

  const currentIndex = order ? STATUS_ORDER.indexOf(order.status as OrderStatus) : -1;

  return (
    <div className="container py-12" style={{ minHeight: "70vh" }}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "rgba(201,145,58,0.12)" }}
          >
            <Package size={30} style={{ color: "var(--color-gold)" }} />
          </div>
          <h1>{t("title")}</h1>
          <p className="mt-2" style={{ color: "var(--text-muted)" }}>
            {locale === "ar"
              ? "أدخل رقم طلبك ورقم جوالك لمتابعة حالة الطلب"
              : "Enter your order number and phone to track your order status"}
          </p>
        </div>

        {/* Search form */}
        <form
          onSubmit={handleSearch}
          className="rounded-2xl border p-6 mb-8 flex flex-col gap-4"
          style={{ background: "var(--color-white)", borderColor: "var(--border)" }}
        >
          <div>
            <label className="form-label">{t("orderId")}</label>
            <input
              className="form-input"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="SF-20250XXXXX"
              dir="ltr"
              required
            />
          </div>
          <div>
            <label className="form-label">{t("phone")}</label>
            <input
              className="form-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+966 5X XXX XXXX"
              dir="ltr"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary flex items-center gap-2 w-fit" disabled={loading}>
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
            {t("submit")}
          </button>

          {error && (
            <p className="text-sm font-semibold" style={{ color: "var(--color-burgundy)" }}>
              {error}
            </p>
          )}
        </form>

        {/* Results */}
        {order && (
          <div
            className="rounded-2xl border p-6"
            style={{ background: "var(--color-white)", borderColor: "var(--border)" }}
          >
            <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
              <div>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{t("orderId")}</p>
                <p className="text-xl font-black tracking-wider" style={{ color: "var(--color-espresso)", fontFamily: "monospace" }}>
                  {order.orderNumber}
                </p>
              </div>
              <span
                className={`badge text-sm ${
                  order.status === "DELIVERED" ? "badge-green" :
                  order.status === "CANCELLED" ? "badge-muted" :
                  "badge-gold"
                }`}
              >
                {STATUS_ICONS[order.status]} {statusLabel(order.status as OrderStatus)}
              </span>
            </div>

            {/* Rejection note */}
            {order.rejectionNote && (
              <div
                className="p-3 rounded-xl mb-6 text-sm"
                style={{ background: "rgba(122,28,46,0.08)", border: "1px solid rgba(122,28,46,0.2)", color: "var(--color-burgundy)" }}
              >
                <strong>{locale === "ar" ? "ملاحظة الرفض: " : "Rejection Note: "}</strong>
                {order.rejectionNote}
              </div>
            )}

            {/* Status timeline */}
            {order.status !== "CANCELLED" && (
              <div className="flex flex-col gap-0">
                {STATUS_ORDER.map((status, i) => {
                  const done    = i <= currentIndex;
                  const current = i === currentIndex;
                  const isLast  = i === STATUS_ORDER.length - 1;

                  return (
                    <div key={status} className="flex gap-4">
                      {/* Line + dot column */}
                      <div className="flex flex-col items-center" style={{ width: "32px" }}>
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-base transition-all"
                          style={{
                            background: done ? (current ? "var(--color-gold)" : "var(--color-green)") : "var(--color-cream-dark)",
                            boxShadow: current ? "0 0 0 4px rgba(201,145,58,0.2)" : "none",
                          }}
                        >
                          {done ? (current ? "●" : "✓") : "○"}
                        </div>
                        {!isLast && (
                          <div
                            className="flex-1 w-0.5 my-1"
                            style={{
                              background: i < currentIndex ? "var(--color-green)" : "var(--border)",
                              minHeight: "24px",
                            }}
                          />
                        )}
                      </div>

                      {/* Label */}
                      <div className="pb-5 flex-1">
                        <p
                          className="font-semibold text-sm"
                          style={{ color: done ? "var(--text-primary)" : "var(--text-muted)" }}
                        >
                          {STATUS_ICONS[status]} {statusLabel(status)}
                        </p>
                        {current && (
                          <p className="text-xs mt-0.5" style={{ color: "var(--color-gold)" }}>
                            {locale === "ar" ? "← الحالة الحالية" : "← Current status"}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

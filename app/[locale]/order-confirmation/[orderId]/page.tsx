import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, MessageCircle, Package } from "lucide-react";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+000000000";

export const metadata: Metadata = { title: "تم الطلب | Order Confirmed" };

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ locale: string; orderId: string }>;
}) {
  const { locale, orderId } = await params;
  const localePath = (path: string) => (locale === "ar" ? path : `/en${path}`);

  const waMsg = locale === "ar"
    ? `مرحباً، لقد أتممت طلبي رقم: ${orderId} وأرفقت إيصال التحويل`
    : `Hello, I've placed order ${orderId} and am attaching my transfer receipt`;

  return (
    <div
      className="min-h-[70vh] flex items-center justify-center"
      style={{ background: "var(--bg-secondary)", padding: "3rem 1rem" }}
    >
      <div
        className="max-w-lg w-full rounded-3xl p-8 text-center shadow-lg"
        style={{ background: "var(--color-white)", border: "1px solid var(--border)" }}
      >
        {/* Success icon */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: "rgba(26, 74, 46, 0.1)" }}
        >
          <CheckCircle size={44} style={{ color: "#1A4A2E" }} />
        </div>

        <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--color-espresso)" }}>
          {locale === "ar" ? "تم استلام طلبك! ✅" : "Order Received! ✅"}
        </h1>
        <p className="mb-6" style={{ color: "var(--text-muted)" }}>
          {locale === "ar"
            ? "سنتحقق من التحويل البنكي خلال ٢٤ ساعة ونؤكد طلبك"
            : "We'll verify your bank transfer within 24 hours and confirm your order"}
        </p>

        {/* Order number */}
        <div
          className="p-4 rounded-2xl mb-6"
          style={{ background: "rgba(201,145,58,0.08)", border: "1px solid rgba(201,145,58,0.25)" }}
        >
          <p className="text-sm mb-1" style={{ color: "var(--text-muted)" }}>
            {locale === "ar" ? "رقم طلبك" : "Your Order Number"}
          </p>
          <p
            className="text-3xl font-black tracking-wider"
            style={{ color: "var(--color-gold)", fontFamily: "monospace" }}
          >
            {orderId}
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
            {locale === "ar" ? "احتفظ بهذا الرقم لتتبع طلبك" : "Keep this number to track your order"}
          </p>
        </div>

        {/* Bank reminder */}
        <div
          className="p-4 rounded-xl mb-6 text-start"
          style={{ background: "rgba(122,28,46,0.05)", border: "1px solid rgba(122,28,46,0.15)" }}
        >
          <p className="font-semibold text-sm mb-2" style={{ color: "var(--color-burgundy)" }}>
            {locale === "ar" ? "تذكير: بيانات التحويل البنكي" : "Reminder: Bank Transfer Details"}
          </p>
          <div className="text-sm flex flex-col gap-1" style={{ color: "var(--text-secondary)" }}>
            <p>{locale === "ar" ? "البنك:" : "Bank:"} <strong>البنك الأهلي السعودي / SNB</strong></p>
            <p>IBAN: <strong dir="ltr">SA00 0000 0000 0000 0000 0000</strong></p>
            <p className="font-bold" style={{ color: "var(--color-burgundy)" }}>
              {locale === "ar" ? `المرجع: ${orderId}` : `Reference: ${orderId}`}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3">
          <a
            href={`https://wa.me/${WHATSAPP.replace(/\D/g, "")}?text=${encodeURIComponent(waMsg)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-lg flex items-center justify-center gap-2 w-full"
          >
            <MessageCircle size={18} />
            {locale === "ar" ? "أرسل الإيصال عبر واتساب" : "Send Receipt via WhatsApp"}
          </a>

          <Link
            href={localePath("/track-order")}
            className="btn btn-outline btn-lg flex items-center justify-center gap-2 w-full"
          >
            <Package size={18} />
            {locale === "ar" ? "تتبع طلبك" : "Track Your Order"}
          </Link>

          <Link
            href={localePath("/")}
            className="text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            {locale === "ar" ? "العودة للرئيسية" : "Back to Home"}
          </Link>
        </div>
      </div>
    </div>
  );
}

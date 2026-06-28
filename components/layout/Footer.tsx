"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+000000000";

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations("footer");
  const tc = useTranslations("categories");

  const localePath = (path: string) =>
    locale === "ar" ? path : `/en${path}`;

  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Main Grid */}
      <div className="container section-py">
        <div
          className="grid gap-8"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}
        >
          {/* Brand */}
          <div>
            <div className="mb-4">
              <p
                className="text-2xl font-extrabold text-white mb-1"
                style={{ fontFamily: "var(--font-arabic)" }}
              >
                {locale === "ar" ? "السعودية للأثاث" : "Saudi Furniture"}
              </p>
              <p className="text-sm opacity-70">{t("tagline")}</p>
            </div>
            <p className="text-sm opacity-60 leading-relaxed">
              {locale === "ar"
                ? "عرعر، المملكة العربية السعودية"
                : "Arar, Saudi Arabia"}
            </p>
            <a
              href={`https://wa.me/${WHATSAPP.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-sm mt-4 inline-flex"
            >
              <MessageCircle size={15} />
              WhatsApp
            </a>
          </div>

          {/* Shop */}
          <div>
            <p className="footer-heading">{t("shop")}</p>
            <ul className="flex flex-col gap-2">
              {[
                "living-room", "bedroom", "dining", "office", "majlis",
              ].map((cat) => (
                <li key={cat}>
                  <Link
                    href={localePath(`/shop/${cat}`)}
                    className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                  >
                    {tc(cat as Parameters<typeof tc>[0])}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <p className="footer-heading">{t("help")}</p>
            <ul className="flex flex-col gap-2">
              {[
                { label: t("faq"), href: localePath("/faq") },
                { label: t("trackOrder"), href: localePath("/track-order") },
                { label: t("deliveryPolicy"), href: localePath("/policies/delivery-returns") },
                { label: t("returns"), href: localePath("/policies/delivery-returns") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="footer-heading">{t("company")}</p>
            <ul className="flex flex-col gap-2">
              {[
                { label: t("about"), href: localePath("/about") },
                { label: t("showroom"), href: localePath("/showroom") },
                { label: t("contact"), href: localePath("/contact") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="footer-heading">{t("legal")}</p>
            <ul className="flex flex-col gap-2">
              {[
                { label: t("terms"), href: localePath("/policies/terms") },
                { label: t("privacy"), href: localePath("/policies/privacy") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="border-t"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="container py-4 flex flex-wrap items-center justify-between gap-3 text-xs opacity-60">
          <p>
            © {year} {locale === "ar" ? "السعودية للأثاث" : "Saudi Furniture"}. {t("rights")}
          </p>
          <p>{t("paymentNote")}</p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Phone, MessageCircle } from "lucide-react";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+000000000";

export default function TopBar({ locale }: { locale: string }) {
  const t = useTranslations("topbar");
  const pathname = usePathname();
  const searchParams = useSearchParams();

  let targetPath = pathname;
  if (locale === "en") {
    targetPath = pathname.replace(/^\/en/, "") || "/";
  } else {
    targetPath = `/en${pathname === "/" ? "" : pathname}`;
  }
  
  const searchString = searchParams.toString();
  if (searchString) {
    targetPath += `?${searchString}`;
  }

  return (
    <div className="topbar">
      <div className="container h-full flex items-center justify-between gap-4">
        {/* Left: Phone */}
        <a
          href="tel:+000000000"
          className="flex items-center gap-1.5 hover:text-white transition-colors"
          aria-label={t("phone")}
        >
          <Phone size={13} />
          <span className="hidden sm:inline">+000 000 000</span>
        </a>

        {/* Center: announcement */}
        <p className="text-center text-xs opacity-90 flex-1">
          {t("freeDelivery")}
        </p>

        {/* Right: WhatsApp + Language */}
        <div className="flex items-center gap-3">
          <a
            href={`https://wa.me/${WHATSAPP.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
            aria-label="WhatsApp"
          >
            <MessageCircle size={13} />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          <span className="opacity-30">|</span>

          <Link
            href={targetPath}
            className="text-xs font-semibold hover:text-white transition-colors tracking-wide"
          >
            {t("language")}
          </Link>
        </div>
      </div>
    </div>
  );
}

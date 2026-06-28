"use client";

import { useTranslations } from "next-intl";
import { Gem, Palette, PackageCheck, Banknote } from "lucide-react";

const WHY_ITEMS = [
  { icon: Gem, titleKey: "why1Title", descKey: "why1Desc" },
  { icon: Palette, titleKey: "why2Title", descKey: "why2Desc" },
  { icon: PackageCheck, titleKey: "why3Title", descKey: "why3Desc" },
  { icon: Banknote, titleKey: "why4Title", descKey: "why4Desc" },
] as const;

export default function WhyChooseUs() {
  const t = useTranslations("home");

  return (
    <section className="section-py" style={{ background: "var(--color-espresso)" }}>
      <div className="container">
        <div className="section-title">
          <h2 style={{ color: "white" }}>{t("whyTitle")}</h2>
          <div
            className="mx-auto mt-2 rounded-full"
            style={{ width: "60px", height: "3px", background: "var(--color-gold)" }}
          />
        </div>

        <div
          className="grid gap-6 mt-10"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}
        >
          {WHY_ITEMS.map(({ icon: Icon, titleKey, descKey }, i) => (
            <div
              key={titleKey}
              className="glass-card p-6 text-center group hover:border-[var(--color-gold)] transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(201,145,58,0.15)",
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                style={{ background: "rgba(201,145,58,0.15)", color: "var(--color-gold)" }}
              >
                <Icon size={26} />
              </div>
              <h3
                className="text-base font-bold mb-2"
                style={{ color: "white" }}
              >
                {t(titleKey)}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                {t(descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

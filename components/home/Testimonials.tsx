"use client";

import { useTranslations } from "next-intl";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    nameAr: "أحمد الشمري", nameEn: "Ahmad Al-Shamri",
    cityAr: "عرعر", cityEn: "Arar",
    rating: 5,
    textAr: "خدمة ممتازة وأثاث راقي. التوصيل كان سريعاً والتركيب احترافي جداً. أنصح الجميع بالتسوق من هنا.",
    textEn: "Excellent service and premium furniture. Delivery was fast and installation was very professional. I recommend everyone to shop here.",
  },
  {
    nameAr: "نورة القحطاني", nameEn: "Noura Al-Qahtani",
    cityAr: "حائل", cityEn: "Hail",
    rating: 5,
    textAr: "طلبت طقم كنب ووصلني بحالة ممتازة. الدفع عبر التحويل البنكي كان سهلاً جداً والتواصل مع الفريق رائع.",
    textEn: "I ordered a sofa set and it arrived in perfect condition. Bank transfer payment was very easy and communication with the team was great.",
  },
  {
    nameAr: "محمد الرشيدي", nameEn: "Mohammad Al-Rashidi",
    cityAr: "عرعر", cityEn: "Arar",
    rating: 4,
    textAr: "منتجات جميلة وأسعار مناسبة مقارنة بالجودة. المعرض نظيف ومنظم وعندهم تشكيلة واسعة.",
    textEn: "Beautiful products and reasonable prices compared to the quality. The showroom is clean, organized and they have a wide selection.",
  },
];

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          fill={i < rating ? "var(--color-gold)" : "none"}
          color="var(--color-gold)"
        />
      ))}
    </div>
  );
}

export default function Testimonials({ locale }: { locale: string }) {
  const t = useTranslations("home");

  return (
    <section className="section-py">
      <div className="container">
        <div className="section-title">
          <h2>{t("testimonialsTitle")}</h2>
        </div>

        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
        >
          {TESTIMONIALS.map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border hover:border-[var(--color-gold)] transition-all duration-300"
              style={{
                background: "var(--color-white)",
                borderColor: "var(--border)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              {/* Quote mark */}
              <div
                className="text-4xl leading-none mb-3 font-bold"
                style={{ color: "var(--color-gold)", opacity: 0.4, fontFamily: "Georgia, serif" }}
              >
                "
              </div>

              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: "var(--text-secondary)" }}
              >
                {locale === "ar" ? item.textAr : item.textEn}
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t" style={{ borderColor: "var(--border)" }}>
                <div>
                  <p className="font-bold text-sm">{locale === "ar" ? item.nameAr : item.nameEn}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {locale === "ar" ? item.cityAr : item.cityEn}
                  </p>
                </div>
                <StarRow rating={item.rating} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

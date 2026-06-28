"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80",
    category: { ar: "غرفة المعيشة", en: "Living Room" },
    headline: { ar: "فخامة لا مثيل لها في كل زاوية", en: "Unmatched Elegance in Every Corner" },
    sub: { ar: "أثاث راقٍ يعكس ذوقك الرفيع", en: "Premium furniture that reflects your refined taste" },
    href: "/shop/living-room",
  },
  {
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1600&q=80",
    category: { ar: "غرفة النوم", en: "Bedroom" },
    headline: { ar: "نوم هنيء يبدأ من غرفتك", en: "Restful Sleep Starts in Your Room" },
    sub: { ar: "تصاميم تجمع الراحة والجمال", en: "Designs that blend comfort and beauty" },
    href: "/shop/bedroom",
  },
  {
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&q=80",
    category: { ar: "مجلس", en: "Majlis" },
    headline: { ar: "مجلسك مساحتك الملكية", en: "Your Majlis, Your Royal Space" },
    sub: { ar: "استقبل ضيوفك بأبهى صورة", en: "Welcome your guests in the most elegant style" },
    href: "/shop/majlis",
  },
];

export default function HeroCarousel({ locale }: { locale: string }) {
  const t = useTranslations("home");
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isRTL = locale === "ar";

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const localePath = (path: string) => (locale === "ar" ? path : `/en${path}`);

  const slide = SLIDES[current];

  return (
    <div
      className="hero-slide"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image */}
      <Image
        src={slide.image}
        alt={slide.headline[locale as "ar" | "en"]}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      {/* Overlay */}
      <div className="hero-overlay" />

      {/* Content */}
      <div
        className="absolute inset-0 flex items-center"
        style={{ padding: "0 clamp(1rem, 6vw, 8rem)" }}
      >
        <div
          className="max-w-2xl animate-fade-in-up"
          style={{ textAlign: isRTL ? "right" : "left" }}
          key={current}
        >
          <span
            className="badge badge-gold mb-4 inline-block tracking-widest"
            style={{ fontSize: "0.7rem" }}
          >
            {slide.category[locale as "ar" | "en"]}
          </span>

          <h1
            className="text-white mb-4 leading-tight"
            style={{
              fontFamily: locale === "ar" ? "var(--font-arabic)" : "var(--font-latin-serif)",
              fontWeight: locale === "ar" ? 800 : 700,
              textShadow: "0 2px 12px rgba(0,0,0,0.3)",
            }}
          >
            {slide.headline[locale as "ar" | "en"]}
          </h1>

          <p
            className="text-white/80 text-lg mb-8"
            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.25)" }}
          >
            {slide.sub[locale as "ar" | "en"]}
          </p>

          <div className="flex gap-3 flex-wrap" style={{ justifyContent: isRTL ? "flex-end" : "flex-start" }}>
            <Link href={localePath(slide.href)} className="btn btn-primary btn-lg">
              {t("heroCtaShop")}
            </Link>
            <Link href={localePath("/shop")} className="btn btn-outline btn-lg" style={{ borderColor: "rgba(255,255,255,0.6)", color: "white" }}>
              {t("heroCtaDiscover")}
            </Link>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={isRTL ? next : prev}
        className="absolute start-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
        style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
        aria-label="Previous"
      >
        {isRTL ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>
      <button
        onClick={isRTL ? prev : next}
        className="absolute end-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
        style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
        aria-label="Next"
      >
        {isRTL ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="transition-all rounded-full"
            style={{
              width: i === current ? "28px" : "8px",
              height: "8px",
              background: i === current ? "var(--color-gold)" : "rgba(255,255,255,0.5)",
            }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

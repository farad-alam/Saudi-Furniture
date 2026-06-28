"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const CATEGORIES = [
  {
    slug: "living-room",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    size: "large",
  },
  {
    slug: "bedroom",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
    size: "large",
  },
  {
    slug: "dining",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80",
    size: "large",
  },
  {
    slug: "majlis",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
    size: "small",
  },
  {
    slug: "office",
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",
    size: "small",
  },
  {
    slug: "kids",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    size: "small",
  },
  {
    slug: "outdoor",
    image: "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=600&q=80",
    size: "small",
  },
  {
    slug: "mattresses",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
    size: "small",
  },
  {
    slug: "decor",
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80",
    size: "small",
  },
];

export default function CategoryGrid({ locale }: { locale: string }) {
  const t = useTranslations("home");
  const tc = useTranslations("categories");
  const localePath = (path: string) => (locale === "ar" ? path : `/en${path}`);

  const large = CATEGORIES.filter((c) => c.size === "large");
  const small = CATEGORIES.filter((c) => c.size === "small");

  return (
    <section className="section-py" style={{ background: "var(--bg-secondary)" }}>
      <div className="container">
        <div className="section-title">
          <h2>{t("featuredCategories")}</h2>
        </div>

        {/* Desktop: large row + small grid */}
        <div className="flex flex-col gap-4">
          {/* Large tiles row */}
          <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {large.map((cat) => (
              <CategoryTile key={cat.slug} {...cat} locale={locale} height="280px" />
            ))}
          </div>

          {/* Small tiles row */}
          <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}>
            {small.map((cat) => (
              <CategoryTile key={cat.slug} {...cat} locale={locale} height="160px" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryTile({
  slug,
  image,
  locale,
  height,
}: {
  slug: string;
  image: string;
  locale: string;
  height: string;
}) {
  const tc = useTranslations("categories");
  const localePath = (path: string) => (locale === "ar" ? path : `/en${path}`);

  return (
    <Link
      href={localePath(`/shop/${slug}`)}
      className="relative overflow-hidden rounded-xl group block"
      style={{ height }}
    >
      <Image
        src={image}
        alt={tc(slug as Parameters<typeof tc>[0])}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />
      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: "linear-gradient(to top, rgba(44,26,14,0.85) 0%, rgba(44,26,14,0.1) 60%, transparent 100%)",
        }}
      />
      {/* Gold border on hover */}
      <div
        className="absolute inset-0 border-2 border-transparent group-hover:border-[var(--color-gold)] rounded-xl transition-all duration-300 pointer-events-none"
      />
      {/* Label */}
      <div className="absolute bottom-0 inset-x-0 p-3 text-white">
        <p
          className="font-bold text-base leading-tight"
          style={{
            fontFamily: locale === "ar" ? "var(--font-arabic)" : "var(--font-latin)",
            textShadow: "0 1px 4px rgba(0,0,0,0.4)",
          }}
        >
          {tc(slug as Parameters<typeof tc>[0])}
        </p>
        <p
          className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ color: "var(--color-gold-light)" }}
        >
          {locale === "ar" ? "تسوق الآن ←" : "Shop now →"}
        </p>
      </div>
    </Link>
  );
}

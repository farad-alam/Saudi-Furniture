import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import ShopClient from "../ShopClient";

const CATEGORIES: Record<string, { ar: string; en: string }> = {
  "living-room": { ar: "غرفة المعيشة", en: "Living Room" },
  "bedroom":     { ar: "غرفة النوم",   en: "Bedroom"     },
  "dining":      { ar: "غرفة الطعام", en: "Dining Room"  },
  "office":      { ar: "مكتب",         en: "Office"       },
  "majlis":      { ar: "مجلس",         en: "Majlis"       },
  "kids":        { ar: "أطفال",        en: "Kids"         },
  "outdoor":     { ar: "خارجي",        en: "Outdoor"      },
  "mattresses":  { ar: "مراتب",        en: "Mattresses"   },
  "decor":       { ar: "ديكور",        en: "Décor"        },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale, category } = await params;
  const cat = CATEGORIES[category];
  if (!cat) return { title: "Category Not Found" };
  return {
    title: locale === "ar" ? cat.ar : cat.en,
    description:
      locale === "ar"
        ? `تسوق تشكيلة ${cat.ar} الفاخرة – السعودية للأثاث`
        : `Shop our premium ${cat.en} collection – Saudi Furniture`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  const cat = CATEGORIES[category];
  const localePath = (path: string) => (locale === "ar" ? path : `/en${path}`);

  return (
    <div>
      {/* Category hero banner */}
      <div
        className="py-10 text-center"
        style={{
          background: "var(--color-espresso)",
          color: "white",
        }}
      >
        <div className="container">
          <div className="flex items-center justify-center gap-2 text-sm mb-2" style={{ color: "var(--color-gold-light)", opacity: 0.8 }}>
            <Link href={localePath("/")} className="hover:text-white transition-colors">
              {locale === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <span>{locale === "ar" ? "←" : "→"}</span>
            <Link href={localePath("/shop")} className="hover:text-white transition-colors">
              {locale === "ar" ? "تسوق" : "Shop"}
            </Link>
            <span>{locale === "ar" ? "←" : "→"}</span>
            <span>{cat ? (locale === "ar" ? cat.ar : cat.en) : category}</span>
          </div>
          <h1 style={{ color: "white" }}>
            {cat ? (locale === "ar" ? cat.ar : cat.en) : category}
          </h1>
        </div>
      </div>

      <ShopClient locale={locale} searchParams={{ category }} />
    </div>
  );
}

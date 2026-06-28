"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import ProductCard, { type ProductCardData } from "@/components/product/ProductCard";

// Placeholder data until DB is seeded
const SAMPLE_PRODUCTS: ProductCardData[] = [
  {
    id: "1", slug: "modern-sofa-set", nameAr: "طقم كنب حديث", nameEn: "Modern Sofa Set",
    price: 4500, salePrice: 3800, images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80"],
    inStock: true, isBestSeller: true,
  },
  {
    id: "2", slug: "luxury-bed-frame", nameAr: "هيكل سرير فاخر", nameEn: "Luxury Bed Frame",
    price: 3200, images: ["https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80"],
    inStock: true, isBestSeller: true,
  },
  {
    id: "3", slug: "dining-table-6", nameAr: "طاولة طعام 6 أشخاص", nameEn: "6-Person Dining Table",
    price: 2800, salePrice: 2200, images: ["https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80"],
    inStock: true, isBestSeller: true,
  },
  {
    id: "4", slug: "office-desk-executive", nameAr: "مكتب تنفيذي", nameEn: "Executive Office Desk",
    price: 1900, images: ["https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80"],
    inStock: false,
  },
  {
    id: "5", slug: "arabic-majlis-set", nameAr: "طقم مجلس عربي", nameEn: "Arabic Majlis Set",
    price: 5500, images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80"],
    inStock: true, isBestSeller: true,
  },
  {
    id: "6", slug: "kids-bunk-bed", nameAr: "سرير أطفال بطابقين", nameEn: "Kids Bunk Bed",
    price: 1650, salePrice: 1350, images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"],
    inStock: true,
  },
];

const NEW_PRODUCTS: ProductCardData[] = [
  {
    id: "7", slug: "outdoor-rattan-set", nameAr: "طقم روطان خارجي", nameEn: "Outdoor Rattan Set",
    price: 2400, images: ["https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=600&q=80"],
    inStock: true, isNewArrival: true,
  },
  {
    id: "8", slug: "memory-foam-mattress", nameAr: "مرتبة ميموري فوم", nameEn: "Memory Foam Mattress",
    price: 1200, salePrice: 950, images: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80"],
    inStock: true, isNewArrival: true,
  },
  {
    id: "9", slug: "decor-vase-set", nameAr: "طقم مزهريات ديكور", nameEn: "Decorative Vase Set",
    price: 350, images: ["https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80"],
    inStock: true, isNewArrival: true,
  },
  {
    id: "10", slug: "accent-chair", nameAr: "كرسي أكسنت", nameEn: "Accent Armchair",
    price: 980, salePrice: 820, images: ["https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80"],
    inStock: true, isNewArrival: true,
  },
];

type Tab = "best" | "new" | "sale";

export default function ProductCarousel({ locale }: { locale: string }) {
  const t = useTranslations("home");
  const [tab, setTab] = useState<Tab>("best");

  const products =
    tab === "best"
      ? SAMPLE_PRODUCTS
      : tab === "new"
      ? NEW_PRODUCTS
      : SAMPLE_PRODUCTS.filter((p) => p.salePrice);

  const TABS: { key: Tab; label: string }[] = [
    { key: "best", label: t("bestSellers") },
    { key: "new", label: t("newArrivals") },
    { key: "sale", label: t("onSale") },
  ];

  return (
    <section className="section-py">
      <div className="container">
        {/* Tab Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex gap-2 flex-wrap">
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all"
                style={
                  tab === key
                    ? { background: "var(--color-gold)", color: "white" }
                    : {
                        background: "var(--color-cream-dark)",
                        color: "var(--text-muted)",
                      }
                }
              >
                {label}
              </button>
            ))}
          </div>
          <a
            href={locale === "ar" ? "/shop" : "/en/shop"}
            className="text-sm font-semibold text-[var(--color-gold)] hover:underline"
          >
            {t("viewAll")} ←
          </a>
        </div>

        {/* Grid */}
        <div className="grid-products">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}

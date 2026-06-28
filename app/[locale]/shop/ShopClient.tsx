"use client";

import { useTranslations } from "next-intl";
import { useState, useMemo } from "react";
import Link from "next/link";
import { SlidersHorizontal, ChevronDown, X } from "lucide-react";
import ProductCard, { type ProductCardData } from "@/components/product/ProductCard";

// ── Sample data (replace with DB fetch once Prisma is connected) ──────────
const ALL_PRODUCTS: ProductCardData[] = [
  { id: "1",  slug: "modern-sofa-set",        nameAr: "طقم كنب حديث",         nameEn: "Modern Sofa Set",         price: 4500, salePrice: 3800, images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80"],  inStock: true,  isBestSeller: true,  isNewArrival: false },
  { id: "2",  slug: "luxury-bed-frame",       nameAr: "هيكل سرير فاخر",       nameEn: "Luxury Bed Frame",        price: 3200, salePrice: null, images: ["https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80"],  inStock: true,  isBestSeller: true,  isNewArrival: false },
  { id: "3",  slug: "dining-table-6",         nameAr: "طاولة طعام 6 أشخاص",   nameEn: "6-Person Dining Table",   price: 2800, salePrice: 2200, images: ["https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80"],  inStock: true,  isBestSeller: true,  isNewArrival: false },
  { id: "4",  slug: "office-desk-executive",  nameAr: "مكتب تنفيذي",           nameEn: "Executive Office Desk",   price: 1900, salePrice: null, images: ["https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80"],  inStock: false, isBestSeller: false, isNewArrival: false },
  { id: "5",  slug: "arabic-majlis-set",      nameAr: "طقم مجلس عربي",         nameEn: "Arabic Majlis Set",       price: 5500, salePrice: null, images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80"],  inStock: true,  isBestSeller: true,  isNewArrival: false },
  { id: "6",  slug: "kids-bunk-bed",          nameAr: "سرير أطفال بطابقين",    nameEn: "Kids Bunk Bed",           price: 1650, salePrice: 1350, images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"],  inStock: true,  isBestSeller: false, isNewArrival: false },
  { id: "7",  slug: "outdoor-rattan-set",     nameAr: "طقم روطان خارجي",       nameEn: "Outdoor Rattan Set",      price: 2400, salePrice: null, images: ["https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=600&q=80"],  inStock: true,  isBestSeller: false, isNewArrival: true  },
  { id: "8",  slug: "memory-foam-mattress",   nameAr: "مرتبة ميموري فوم",      nameEn: "Memory Foam Mattress",    price: 1200, salePrice: 950,  images: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80"],  inStock: true,  isBestSeller: false, isNewArrival: true  },
  { id: "9",  slug: "decor-vase-set",         nameAr: "طقم مزهريات ديكور",     nameEn: "Decorative Vase Set",     price: 350,  salePrice: null, images: ["https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80"],  inStock: true,  isBestSeller: false, isNewArrival: true  },
  { id: "10", slug: "accent-chair",           nameAr: "كرسي أكسنت",            nameEn: "Accent Armchair",         price: 980,  salePrice: 820,  images: ["https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80"],  inStock: true,  isBestSeller: false, isNewArrival: true  },
  { id: "11", slug: "l-shaped-sofa",          nameAr: "كنبة زاوية",            nameEn: "L-Shaped Corner Sofa",    price: 6200, salePrice: null, images: ["https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=600&q=80"],  inStock: true,  isBestSeller: false, isNewArrival: false },
  { id: "12", slug: "wardrobe-4-door",        nameAr: "خزانة ملابس 4 أبواب",   nameEn: "4-Door Wardrobe",         price: 2600, salePrice: 2100, images: ["https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80"],  inStock: true,  isBestSeller: false, isNewArrival: false },
];

const SORT_OPTIONS = [
  { value: "newest",     labelAr: "الأحدث",              labelEn: "Newest"         },
  { value: "price-low",  labelAr: "السعر: من الأقل",     labelEn: "Price: Low–High"},
  { value: "price-high", labelAr: "السعر: من الأعلى",   labelEn: "Price: High–Low"},
  { value: "bestselling",labelAr: "الأكثر مبيعاً",      labelEn: "Best Selling"   },
];

const PRICE_RANGES = [
  { labelAr: "جميع الأسعار", labelEn: "All Prices", min: 0, max: Infinity },
  { labelAr: "أقل من 1000", labelEn: "Under SAR 1,000", min: 0, max: 1000 },
  { labelAr: "1000 – 3000",  labelEn: "SAR 1,000 – 3,000", min: 1000, max: 3000 },
  { labelAr: "3000 – 6000",  labelEn: "SAR 3,000 – 6,000", min: 3000, max: 6000 },
  { labelAr: "أكثر من 6000", labelEn: "Over SAR 6,000", min: 6000, max: Infinity },
];

interface ShopClientProps {
  locale: string;
  searchParams: { category?: string; sort?: string; inStock?: string };
}

export default function ShopClient({ locale, searchParams }: ShopClientProps) {
  const t = useTranslations("shop");
  const isRTL = locale === "ar";

  const [sort, setSort] = useState(searchParams.sort ?? "newest");
  const [priceRange, setPriceRange] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = useMemo(() => {
    let items = [...ALL_PRODUCTS];
    const { min, max } = PRICE_RANGES[priceRange];
    items = items.filter((p) => {
      const price = p.salePrice ?? p.price;
      if (price < min || price > max) return false;
      if (inStockOnly && !p.inStock) return false;
      return true;
    });
    switch (sort) {
      case "price-low":   return items.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
      case "price-high":  return items.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
      case "bestselling": return items.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
      default:            return items.reverse();
    }
  }, [sort, priceRange, inStockOnly]);

  const localePath = (path: string) => (locale === "ar" ? path : `/en${path}`);

  return (
    <div style={{ minHeight: "80vh", background: "var(--bg-primary)" }}>
      {/* ── Breadcrumb ─────────────────────────────── */}
      <div style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)" }}>
        <div className="container py-3 flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
          <Link href={localePath("/")} className="hover:text-[var(--color-gold)]">
            {locale === "ar" ? "الرئيسية" : "Home"}
          </Link>
          <span>{isRTL ? "←" : "→"}</span>
          <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{t("title")}</span>
        </div>
      </div>

      <div className="container py-8">
        {/* ── Mobile filter toggle ─── */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <h1 className="text-xl font-bold">{t("title")}</h1>
          <button
            onClick={() => setSidebarOpen(true)}
            className="btn btn-outline btn-sm flex items-center gap-2"
          >
            <SlidersHorizontal size={15} />
            {t("filters")}
          </button>
        </div>

        <div className="flex gap-8">
          {/* ── Sidebar ─────────────────────────────── */}
          <>
            {/* Mobile overlay */}
            {sidebarOpen && (
              <div className="fixed inset-0 z-50 lg:hidden flex">
                <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
                <div
                  className="relative ms-auto w-80 max-w-full h-full overflow-y-auto p-6"
                  style={{ background: "var(--color-cream)" }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-bold text-lg">{t("filters")}</h2>
                    <button onClick={() => setSidebarOpen(false)}>
                      <X size={20} />
                    </button>
                  </div>
                  <FilterPanel locale={locale} priceRange={priceRange} setPriceRange={setPriceRange} inStockOnly={inStockOnly} setInStockOnly={setInStockOnly} t={t} />
                </div>
              </div>
            )}

            {/* Desktop sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-[calc(var(--header-height)+1rem)] rounded-2xl p-5 border" style={{ background: "var(--color-white)", borderColor: "var(--border)" }}>
                <h2 className="font-bold mb-5 flex items-center gap-2">
                  <SlidersHorizontal size={16} style={{ color: "var(--color-gold)" }} />
                  {t("filters")}
                </h2>
                <FilterPanel locale={locale} priceRange={priceRange} setPriceRange={setPriceRange} inStockOnly={inStockOnly} setInStockOnly={setInStockOnly} t={t} />
              </div>
            </aside>
          </>

          {/* ── Main content ──────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Top bar: title + sort */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">
                {t("title")}
                <span className="text-sm font-normal ms-2" style={{ color: "var(--text-muted)" }}>
                  ({filtered.length} {t("results")})
                </span>
              </h1>
              <SortDropdown sort={sort} setSort={setSort} locale={locale} />
            </div>

            {/* Mobile sort */}
            <div className="flex justify-end mb-4 lg:hidden">
              <SortDropdown sort={sort} setSort={setSort} locale={locale} />
            </div>

            {/* Product grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-5xl mb-4">🛋️</p>
                <p style={{ color: "var(--text-muted)" }}>{t("noProducts")}</p>
              </div>
            ) : (
              <div className="grid-products">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} locale={locale} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────

function FilterPanel({ locale, priceRange, setPriceRange, inStockOnly, setInStockOnly, t }: {
  locale: string; priceRange: number; setPriceRange: (v: number) => void;
  inStockOnly: boolean; setInStockOnly: (v: boolean) => void; t: ReturnType<typeof useTranslations>;
}) {
  return (
    <div className="flex flex-col gap-6">
      {/* Price Range */}
      <div>
        <p className="font-semibold text-sm mb-3">{t("priceRange")}</p>
        <div className="flex flex-col gap-2">
          {PRICE_RANGES.map((r, i) => (
            <label key={i} className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="radio"
                name="price"
                checked={priceRange === i}
                onChange={() => setPriceRange(i)}
                className="accent-[var(--color-gold)]"
              />
              {locale === "ar" ? r.labelAr : r.labelEn}
            </label>
          ))}
        </div>
      </div>

      {/* In Stock */}
      <div className="border-t pt-4" style={{ borderColor: "var(--border)" }}>
        <label className="flex items-center gap-2 cursor-pointer">
          <div
            onClick={() => setInStockOnly(!inStockOnly)}
            className="relative w-10 h-5 rounded-full transition-colors cursor-pointer"
            style={{ background: inStockOnly ? "var(--color-gold)" : "var(--color-cream-dark)" }}
          >
            <span
              className="absolute top-0.5 start-0.5 w-4 h-4 rounded-full bg-white shadow transition-all"
              style={{ transform: inStockOnly ? (locale === "ar" ? "translateX(-20px)" : "translateX(20px)") : "translateX(0)" }}
            />
          </div>
          <span className="text-sm font-medium">{t("inStockOnly")}</span>
        </label>
      </div>
    </div>
  );
}

function SortDropdown({ sort, setSort, locale }: { sort: string; setSort: (v: string) => void; locale: string }) {
  return (
    <div className="relative">
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="appearance-none form-input pe-8 py-2 text-sm cursor-pointer"
        style={{ paddingInlineEnd: "2.5rem", width: "auto" }}
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {locale === "ar" ? o.labelAr : o.labelEn}
          </option>
        ))}
      </select>
      <ChevronDown size={14} className="absolute top-1/2 -translate-y-1/2 end-3 pointer-events-none" style={{ color: "var(--text-muted)" }} />
    </div>
  );
}

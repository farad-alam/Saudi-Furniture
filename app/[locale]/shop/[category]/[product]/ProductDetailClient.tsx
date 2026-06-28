"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ShoppingCart, MessageCircle, Check, PackageCheck } from "lucide-react";
import ProductGallery from "@/components/product/ProductGallery";
import { useCartStore } from "@/lib/cart";
import { formatPrice, buildWhatsAppUrl } from "@/lib/utils";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+000000000";

type ProductData = {
  id: string; nameAr: string; nameEn: string;
  descriptionAr: string; descriptionEn: string;
  specsAr: string; specsEn: string;
  price: number; salePrice?: number;
  images: string[]; inStock: boolean;
  categorySlug: string; categoryAr: string; categoryEn: string;
};

export default function ProductDetailClient({
  product, locale,
}: {
  product: ProductData; locale: string;
}) {
  const t = useTranslations("product");
  const addItem = useCartStore((s) => s.addItem);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "reviews">("desc");
  const [added, setAdded] = useState(false);

  const name = locale === "ar" ? product.nameAr : product.nameEn;
  const description = locale === "ar" ? product.descriptionAr : product.descriptionEn;
  const specs = locale === "ar" ? product.specsAr : product.specsEn;
  const displayPrice = product.salePrice ?? product.price;

  const waMsg = locale === "ar"
    ? `مرحباً، أريد الاستفسار عن: ${product.nameAr}`
    : `Hello, I'm interested in: ${product.nameEn}`;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem({
        id: product.id, slug: product.id,
        nameAr: product.nameAr, nameEn: product.nameEn,
        price: product.price, salePrice: product.salePrice ?? null,
        image: product.images[0],
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const localePath = (path: string) => (locale === "ar" ? path : `/en${path}`);

  const TABS = [
    { key: "desc"    as const, label: t("description")   },
    { key: "specs"   as const, label: t("specifications") },
    { key: "reviews" as const, label: t("reviews")        },
  ];

  return (
    <div className="container py-10">
      {/* ── Main grid ────────────────────────────── */}
      <div className="grid gap-10 mb-16" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
        {/* Gallery */}
        <ProductGallery images={product.images} name={name} locale={locale} />

        {/* Info panel */}
        <div className="flex flex-col gap-5">
          {/* Stock badge */}
          <div>
            {product.inStock ? (
              <span className="badge badge-green flex items-center gap-1 w-fit">
                <Check size={12} /> {t("inStock")}
              </span>
            ) : (
              <span className="badge badge-muted w-fit">{t("outOfStock")}</span>
            )}
          </div>

          {/* Name */}
          <h1 style={{ fontFamily: locale === "ar" ? "var(--font-arabic)" : "var(--font-latin-serif)" }}>
            {name}
          </h1>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span style={{ fontSize: "2rem", fontWeight: 800, color: "var(--color-gold)" }}>
              {formatPrice(displayPrice, locale)}
            </span>
            {product.salePrice && (
              <span style={{ fontSize: "1.1rem", textDecoration: "line-through", color: "var(--text-muted)" }}>
                {formatPrice(product.price, locale)}
              </span>
            )}
          </div>

          {/* Divider */}
          <hr style={{ borderColor: "var(--border)" }} />

          {/* Qty selector */}
          {product.inStock && (
            <div className="flex items-center gap-4">
              <span className="font-semibold text-sm">{t("quantity" in t ? "quantity" : "الكمية") ?? "الكمية"}</span>
              <div className="flex items-center gap-0 rounded-lg border overflow-hidden" style={{ borderColor: "var(--border-strong)" }}>
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-[var(--color-sand)] transition-colors font-bold text-lg"
                >−</button>
                <span className="w-12 text-center font-semibold">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-[var(--color-sand)] transition-colors font-bold text-lg"
                >+</button>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="btn btn-primary btn-lg flex items-center justify-center gap-2 w-full"
              style={{ opacity: !product.inStock ? 0.5 : 1 }}
            >
              {added ? <Check size={18} /> : <ShoppingCart size={18} />}
              {added ? (locale === "ar" ? "تمت الإضافة ✓" : "Added ✓") : t("addToCart")}
            </button>

            <a
              href={buildWhatsAppUrl(WHATSAPP, waMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg flex items-center justify-center gap-2 w-full"
            >
              <MessageCircle size={18} />
              {t("askWhatsapp")}
            </a>
          </div>

          {/* Delivery note */}
          <div
            className="flex items-center gap-3 p-3 rounded-xl text-sm"
            style={{ background: "rgba(201,145,58,0.08)", border: "1px solid rgba(201,145,58,0.2)" }}
          >
            <PackageCheck size={18} style={{ color: "var(--color-gold)", flexShrink: 0 }} />
            <span style={{ color: "var(--text-secondary)" }}>
              {locale === "ar"
                ? "توصيل وتركيب لجميع مدن المملكة — التوصيل خلال 5-7 أيام عمل"
                : "Delivery & installation across KSA — 5-7 business days"}
            </span>
          </div>
        </div>
      </div>

      {/* ── Tabs ────────────────────────────── */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ borderColor: "var(--border)", background: "var(--color-white)" }}
      >
        {/* Tab headers */}
        <div className="flex border-b" style={{ borderColor: "var(--border)" }}>
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className="flex-1 py-4 text-sm font-semibold transition-all"
              style={{
                borderBottom: activeTab === key ? "2px solid var(--color-gold)" : "2px solid transparent",
                color: activeTab === key ? "var(--color-gold)" : "var(--text-muted)",
                background: "transparent",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Tab body */}
        <div className="p-6">
          {activeTab === "desc" && (
            <p className="leading-loose whitespace-pre-line">{description}</p>
          )}
          {activeTab === "specs" && (
            <pre className="leading-loose whitespace-pre-wrap font-sans text-sm" style={{ color: "var(--text-secondary)" }}>
              {specs}
            </pre>
          )}
          {activeTab === "reviews" && (
            <div className="text-center py-8" style={{ color: "var(--text-muted)" }}>
              <p className="text-4xl mb-3">⭐</p>
              <p>{locale === "ar" ? "لا توجد تقييمات بعد" : "No reviews yet"}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

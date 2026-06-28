"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Eye } from "lucide-react";
import { useCartStore } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";

export interface ProductCardData {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  price: number;
  salePrice?: number | null;
  images: string[];
  inStock: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
}

export default function ProductCard({
  product,
  locale,
}: {
  product: ProductCardData;
  locale: string;
}) {
  const t = useTranslations("product");
  const addItem = useCartStore((s) => s.addItem);

  const name = locale === "ar" ? product.nameAr : product.nameEn;
  const image = product.images[0] ?? "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80";
  const localePath = (path: string) => (locale === "ar" ? path : `/en${path}`);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product.inStock) return;
    addItem({
      id: product.id,
      slug: product.slug,
      nameAr: product.nameAr,
      nameEn: product.nameEn,
      price: product.price,
      salePrice: product.salePrice ?? null,
      image,
    });
  };

  return (
    <div className="product-card">
      {/* Image */}
      <div className="product-card-image">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Badges */}
        <div className="absolute top-2 start-2 flex flex-col gap-1">
          {product.isBestSeller && (
            <span className="badge badge-gold" style={{ fontSize: "0.68rem" }}>
              {locale === "ar" ? "الأكثر مبيعاً" : "Best Seller"}
            </span>
          )}
          {product.isNewArrival && (
            <span className="badge badge-burgundy" style={{ fontSize: "0.68rem" }}>
              {locale === "ar" ? "جديد" : "New"}
            </span>
          )}
          {product.salePrice && (
            <span className="badge badge-burgundy" style={{ fontSize: "0.68rem" }}>
              {locale === "ar" ? "عرض" : "Sale"}
            </span>
          )}
        </div>

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "rgba(44,26,14,0.55)" }}
          >
            <span className="badge badge-muted text-sm">{t("outOfStock")}</span>
          </div>
        )}

        {/* Hover Actions */}
        {product.inStock && (
          <div className="product-card-actions">
            <button
              onClick={handleAddToCart}
              className="btn btn-primary btn-sm"
              title={t("addToCart")}
            >
              <ShoppingCart size={15} />
              {t("addToCart")}
            </button>
            <Link
              href={localePath(`/shop/${product.slug}`)}
              className="btn btn-outline btn-sm"
              style={{ borderColor: "rgba(255,255,255,0.6)", color: "white" }}
              title={locale === "ar" ? "عرض سريع" : "Quick View"}
            >
              <Eye size={15} />
            </Link>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="product-card-body">
        <Link href={localePath(`/shop/${product.slug}`)}>
          <h3 className="product-card-name hover:text-[var(--color-gold)] transition-colors">
            {name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span className="product-card-price">
            {formatPrice(product.salePrice ?? product.price, locale)}
          </span>
          {product.salePrice && (
            <span className="product-card-price-original">
              {formatPrice(product.price, locale)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

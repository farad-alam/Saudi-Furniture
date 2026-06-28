"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";

export default function CartPage({ locale }: { locale: string }) {
  const t = useTranslations("cart");
  const { items, removeItem, updateQuantity, subtotal } = useCartStore();
  const localePath = (path: string) => (locale === "ar" ? path : `/en${path}`);

  if (items.length === 0) {
    return (
      <div
        className="min-h-[60vh] flex flex-col items-center justify-center gap-6 text-center"
        style={{ padding: "4rem 1rem" }}
      >
        <ShoppingBag size={72} style={{ color: "var(--color-cream-dark)", opacity: 0.6 }} />
        <div>
          <h2 className="text-2xl font-bold mb-2">{t("empty")}</h2>
          <p style={{ color: "var(--text-muted)" }}>
            {locale === "ar" ? "لم تضف أي منتجات إلى السلة بعد" : "You haven't added any products yet"}
          </p>
        </div>
        <Link href={localePath("/shop")} className="btn btn-primary btn-lg">
          {t("emptyAction")}
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-10" style={{ minHeight: "70vh" }}>
      <h1 className="mb-8">
        {t("title")}
        <span className="text-base font-normal ms-2" style={{ color: "var(--text-muted)" }}>
          ({items.length} {locale === "ar" ? "منتج" : "item(s)"})
        </span>
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* ── Items list ──────────────────────────── */}
        <div className="flex-1 flex flex-col gap-4">
          {items.map((item) => {
            const name = locale === "ar" ? item.nameAr : item.nameEn;
            const price = item.salePrice ?? item.price;
            return (
              <div
                key={item.id}
                className="flex gap-4 p-4 rounded-2xl border"
                style={{ background: "var(--color-white)", borderColor: "var(--border)" }}
              >
                {/* Image */}
                <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden" style={{ background: "var(--color-sand)" }}>
                  <Image src={item.image} alt={name} fill className="object-cover" sizes="96px" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base leading-tight truncate">{name}</h3>
                  <p className="mt-1 font-bold" style={{ color: "var(--color-gold)" }}>
                    {formatPrice(price, locale)}
                  </p>
                  {item.salePrice && (
                    <p className="text-xs line-through" style={{ color: "var(--text-muted)" }}>
                      {formatPrice(item.price, locale)}
                    </p>
                  )}

                  {/* Qty + remove */}
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center gap-0 rounded-lg border overflow-hidden" style={{ borderColor: "var(--border-strong)" }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-[var(--color-sand)] font-bold"
                      >−</button>
                      <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-[var(--color-sand)] font-bold"
                      >+</button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="flex items-center gap-1 text-xs hover:text-[var(--color-burgundy)] transition-colors"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <Trash2 size={13} />
                      {t("remove")}
                    </button>

                    <p className="ms-auto font-bold text-sm">
                      {formatPrice(price * item.quantity, locale)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Order summary ──────────────────────── */}
        <div className="lg:w-80">
          <div
            className="sticky top-[calc(var(--header-height)+1rem)] rounded-2xl border p-6 flex flex-col gap-4"
            style={{ background: "var(--color-white)", borderColor: "var(--border)" }}
          >
            <h2 className="font-bold text-lg border-b pb-4" style={{ borderColor: "var(--border)" }}>
              {locale === "ar" ? "ملخص الطلب" : "Order Summary"}
            </h2>

            <div className="flex justify-between text-sm">
              <span style={{ color: "var(--text-muted)" }}>{t("subtotal")}</span>
              <span className="font-semibold">{formatPrice(subtotal(), locale)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: "var(--text-muted)" }}>{t("delivery")}</span>
              <span className="font-semibold" style={{ color: "var(--color-gold)" }}>
                {locale === "ar" ? "يُحدد عند الشراء" : "Calculated at checkout"}
              </span>
            </div>

            <div
              className="flex justify-between font-bold text-lg pt-3 border-t"
              style={{ borderColor: "var(--border)" }}
            >
              <span>{t("total")}</span>
              <span style={{ color: "var(--color-gold)" }}>{formatPrice(subtotal(), locale)}</span>
            </div>

            <Link href={localePath("/checkout")} className="btn btn-primary btn-lg text-center w-full">
              {t("checkout")} →
            </Link>

            <Link
              href={localePath("/shop")}
              className="text-center text-sm hover:text-[var(--color-gold)] transition-colors"
              style={{ color: "var(--text-muted)" }}
            >
              {locale === "ar" ? "← متابعة التسوق" : "← Continue Shopping"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { useCartStore } from "@/lib/cart";

const CATEGORIES = [
  "living-room", "bedroom", "dining", "office",
  "majlis", "kids", "outdoor", "mattresses", "decor",
];

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const tc = useTranslations("categories");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const localePath = (path: string) =>
    locale === "ar" ? path : `/en${path}`;

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="container h-full flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href={localePath("/")}
          className="flex-shrink-0 flex flex-col leading-tight"
        >
          <span
            style={{
              fontFamily: "var(--font-arabic)",
              fontWeight: 800,
              fontSize: "1.25rem",
              color: "var(--color-espresso)",
              lineHeight: 1.1,
            }}
          >
            {locale === "ar" ? "السعودية للأثاث" : "Saudi Furniture"}
          </span>
          <span
            style={{
              fontSize: "0.65rem",
              color: "var(--color-gold)",
              letterSpacing: "0.12em",
              fontWeight: 600,
              textTransform: "uppercase",
            }}
          >
            {locale === "ar" ? "عرعر، المملكة العربية السعودية" : "Arar, KSA"}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link
            href={localePath("/")}
            className="text-sm font-semibold hover:text-[var(--color-gold)] transition-colors"
          >
            {t("home")}
          </Link>

          {/* Categories mega-menu trigger */}
          <div className="relative group">
            <button
              className="text-sm font-semibold hover:text-[var(--color-gold)] transition-colors flex items-center gap-1"
            >
              {t("categories")}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M6 8L1 3h10z"/>
              </svg>
            </button>

            {/* Dropdown */}
            <div
              className="absolute top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-[var(--border)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
              style={{
                ...(locale === "ar"
                  ? { right: 0 }
                  : { left: 0 }),
              }}
            >
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat}
                  href={localePath(`/shop/${cat}`)}
                  className="block px-4 py-2.5 text-sm hover:bg-[var(--color-sand)] hover:text-[var(--color-gold)] transition-colors first:rounded-t-xl last:rounded-b-xl"
                >
                  {tc(cat as Parameters<typeof tc>[0])}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href={localePath("/about")}
            className="text-sm font-semibold hover:text-[var(--color-gold)] transition-colors"
          >
            {t("about")}
          </Link>
          <Link
            href={localePath("/showroom")}
            className="text-sm font-semibold hover:text-[var(--color-gold)] transition-colors"
          >
            {t("showroom")}
          </Link>
          <Link
            href={localePath("/contact")}
            className="text-sm font-semibold hover:text-[var(--color-gold)] transition-colors"
          >
            {t("contact")}
          </Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 rounded-lg hover:bg-[var(--color-sand)] transition-colors"
            aria-label="Search"
          >
            <Search size={20} />
          </button>

          {/* Cart */}
          <Link
            href={localePath("/cart")}
            className="relative p-2 rounded-lg hover:bg-[var(--color-sand)] transition-colors"
            aria-label={t("cart")}
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span
                className="absolute -top-1 -end-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ background: "var(--color-gold)" }}
              >
                {totalItems}
              </span>
            )}
          </Link>

          {/* Hamburger (mobile) */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-[var(--color-sand)] transition-colors"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-200 flex"
          style={{ direction: locale === "ar" ? "rtl" : "ltr" }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMenuOpen(false)}
          />
          {/* Drawer */}
          <div
            className="relative ms-auto w-80 max-w-full h-full overflow-y-auto shadow-xl"
            style={{ background: "var(--color-cream)" }}
          >
            <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
              <span className="font-bold text-lg" style={{ fontFamily: "var(--font-arabic)" }}>
                {locale === "ar" ? "القائمة" : "Menu"}
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-[var(--color-sand)]"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="p-4 flex flex-col gap-1">
              {[
                { label: t("home"), href: localePath("/") },
                { label: t("shop"), href: localePath("/shop") },
                { label: t("about"), href: localePath("/about") },
                { label: t("showroom"), href: localePath("/showroom") },
                { label: t("contact"), href: localePath("/contact") },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg font-semibold hover:bg-[var(--color-sand)] hover:text-[var(--color-gold)] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 pt-2 border-t border-[var(--border)]">
                <p className="px-4 py-1 text-xs uppercase tracking-widest text-[var(--text-muted)] font-semibold">
                  {t("categories")}
                </p>
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat}
                    href={localePath(`/shop/${cat}`)}
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2.5 text-sm hover:bg-[var(--color-sand)] hover:text-[var(--color-gold)] transition-colors rounded-lg"
                  >
                    {tc(cat as Parameters<typeof tc>[0])}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-200 flex items-start justify-center pt-20 px-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setSearchOpen(false)}
          />
          <div
            className="relative w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl"
            style={{ background: "var(--color-cream)" }}
          >
            <div className="flex items-center gap-3 p-4">
              <Search size={20} className="text-[var(--color-gold)] flex-shrink-0" />
              <input
                autoFocus
                type="search"
                placeholder={t("search")}
                className="flex-1 bg-transparent outline-none font-medium text-lg"
                style={{ fontFamily: "inherit" }}
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 hover:text-[var(--color-gold)]"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

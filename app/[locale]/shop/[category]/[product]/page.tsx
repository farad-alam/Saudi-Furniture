import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";

// ── Sample product DB (replace with Prisma query) ────────────────────────────
const PRODUCTS: Record<string, {
  id: string; nameAr: string; nameEn: string;
  descriptionAr: string; descriptionEn: string;
  specsAr: string; specsEn: string;
  price: number; salePrice?: number;
  images: string[]; inStock: boolean;
  categorySlug: string; categoryAr: string; categoryEn: string;
}> = {
  "modern-sofa-set": {
    id: "1", nameAr: "طقم كنب حديث", nameEn: "Modern Sofa Set",
    descriptionAr: "طقم كنب عصري بتصميم أنيق يجمع بين الفخامة والراحة. مصنوع من أجود أنواع الأقمشة المنسجة مع ألوان دافئة تناسب ديكور غرف المعيشة السعودية. يشمل الطقم كنبة ثلاثية وكنبتين ثنائية وفردية.",
    descriptionEn: "A modern sofa set with elegant design that combines luxury and comfort. Made from premium woven fabrics in warm tones that suit Saudi living room décor. The set includes a 3-seater, 2-seater, and 1-seater sofa.",
    specsAr: "• الأبعاد: 3م × 1م × 0.9م\n• الخامة: قماش مُنسج درجة أولى\n• الإطار: خشب الزان المُعالج\n• الوسائد: إسفنج عالي الكثافة\n• الألوان المتاحة: بيج، رمادي، بني",
    specsEn: "• Dimensions: 3m × 1m × 0.9m\n• Material: First-grade woven fabric\n• Frame: Treated beech wood\n• Cushions: High-density foam\n• Available colors: Beige, Grey, Brown",
    price: 4500, salePrice: 3800,
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80",
    ],
    inStock: true, categorySlug: "living-room",
    categoryAr: "غرفة المعيشة", categoryEn: "Living Room",
  },
  "luxury-bed-frame": {
    id: "2", nameAr: "هيكل سرير فاخر", nameEn: "Luxury Bed Frame",
    descriptionAr: "هيكل سرير فاخر بتصميم ملكي يضفي لمسة من الأناقة على غرفة نومك. الرأسية مبطنة بالمخمل الناعم مع حواف ذهبية اللون تعكس الذوق الرفيع.",
    descriptionEn: "A luxurious bed frame with a royal design that adds elegance to your bedroom. Velvet-upholstered headboard with gold-toned edges reflecting refined taste.",
    specsAr: "• المقاس: كنج 200×200 سم\n• الإطار: خشب صلب\n• الرأسية: مبطنة بالمخمل\n• ارتفاع السرير: 45 سم\n• التحمل: حتى 300 كجم",
    specsEn: "• Size: King 200×200 cm\n• Frame: Solid wood\n• Headboard: Velvet upholstered\n• Bed height: 45 cm\n• Weight capacity: Up to 300 kg",
    price: 3200,
    images: ["https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80"],
    inStock: true, categorySlug: "bedroom",
    categoryAr: "غرفة النوم", categoryEn: "Bedroom",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; product: string }>;
}): Promise<Metadata> {
  const { locale, product: slug } = await params;
  const product = PRODUCTS[slug];
  if (!product) return { title: "Product Not Found" };
  return {
    title: locale === "ar" ? product.nameAr : product.nameEn,
    description:
      locale === "ar"
        ? product.descriptionAr.slice(0, 160)
        : product.descriptionEn.slice(0, 160),
    openGraph: { images: [product.images[0]] },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; category: string; product: string }>;
}) {
  const { locale, category, product: slug } = await params;
  const product = PRODUCTS[slug];

  if (!product) notFound();

  const localePath = (path: string) => (locale === "ar" ? path : `/en${path}`);

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "80vh" }}>
      {/* Breadcrumb */}
      <div style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)" }}>
        <div className="container py-3 flex items-center gap-2 text-sm flex-wrap" style={{ color: "var(--text-muted)" }}>
          <Link href={localePath("/")} className="hover:text-[var(--color-gold)]">
            {locale === "ar" ? "الرئيسية" : "Home"}
          </Link>
          <span>{locale === "ar" ? "←" : "→"}</span>
          <Link href={localePath("/shop")} className="hover:text-[var(--color-gold)]">
            {locale === "ar" ? "تسوق" : "Shop"}
          </Link>
          <span>{locale === "ar" ? "←" : "→"}</span>
          <Link href={localePath(`/shop/${category}`)} className="hover:text-[var(--color-gold)]">
            {locale === "ar" ? product.categoryAr : product.categoryEn}
          </Link>
          <span>{locale === "ar" ? "←" : "→"}</span>
          <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>
            {locale === "ar" ? product.nameAr : product.nameEn}
          </span>
        </div>
      </div>

      <ProductDetailClient product={product} locale={locale} />
    </div>
  );
}

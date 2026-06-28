import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import HeroCarousel from "@/components/home/HeroCarousel";
import TrustStrip from "@/components/home/TrustStrip";
import CategoryGrid from "@/components/home/CategoryGrid";
import ProductCarousel from "@/components/home/ProductCarousel";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ShowroomTeaser from "@/components/home/ShowroomTeaser";
import Testimonials from "@/components/home/Testimonials";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "ar"
      ? "السعودية للأثاث — أثاث فاخر في عرعر"
      : "Saudi Furniture — Premium Furniture in Arar",
    description: locale === "ar"
      ? "اكتشف تشكيلة واسعة من الأثاث الفاخر لغرفة المعيشة والنوم والطعام والمجلس. معرض في عرعر مع توصيل لجميع مدن المملكة."
      : "Explore a wide range of premium furniture for living room, bedroom, dining and majlis. Showroom in Arar with delivery across Saudi Arabia.",
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <HeroCarousel locale={locale} />
      <TrustStrip />
      <CategoryGrid locale={locale} />
      <ProductCarousel locale={locale} />
      <WhyChooseUs />
      <ShowroomTeaser locale={locale} />
      <Testimonials locale={locale} />
    </>
  );
}

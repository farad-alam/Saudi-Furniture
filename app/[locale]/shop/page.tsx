import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ShopClient from "./ShopClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "جميع المنتجات" : "All Products",
    description:
      locale === "ar"
        ? "تسوق أثاث غرفة المعيشة والنوم والطعام والمجلس والمكتب وأكثر"
        : "Shop living room, bedroom, dining, majlis, office furniture and more",
  };
}

export default async function ShopPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; sort?: string; inStock?: string; page?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;

  return <ShopClient locale={locale} searchParams={sp} />;
}

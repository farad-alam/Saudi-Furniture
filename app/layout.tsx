import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Saudi Furniture | أثاث سعودي",
    template: "%s | Saudi Furniture",
  },
  description:
    "أثاث فاخر لبيتك – معرض في عرعر، المملكة العربية السعودية. Premium furniture for your home – Showroom in Arar, KSA.",
  keywords: ["أثاث", "عرعر", "furniture", "Arar", "Saudi Arabia"],
  openGraph: {
    siteName: "Saudi Furniture",
    type: "website",
    locale: "ar_SA",
    alternateLocale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

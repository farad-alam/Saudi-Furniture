import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: { default: "Admin | Saudi Furniture", template: "%s | Admin" },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body style={{ fontFamily: "var(--font-arabic)" }}>{children}</body>
    </html>
  );
}

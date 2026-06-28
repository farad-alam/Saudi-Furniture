import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center"
      style={{ background: "var(--bg-primary)", padding: "2rem" }}
    >
      <p
        className="text-8xl font-black mb-4"
        style={{ color: "var(--color-gold)", fontFamily: "var(--font-arabic)" }}
      >
        ٤٠٤
      </p>
      <h1 className="text-2xl font-bold mb-2">الصفحة غير موجودة</h1>
      <p style={{ color: "var(--text-muted)" }} className="mb-8">
        Page Not Found
      </p>
      <Link href="/" className="btn btn-primary">
        العودة للرئيسية / Go Home
      </Link>
    </div>
  );
}

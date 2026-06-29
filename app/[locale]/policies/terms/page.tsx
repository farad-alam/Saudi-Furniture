import { getTranslations } from "next-intl/server";
import { FileText } from "lucide-react";

export default async function TermsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations("footer");
  const isAr = locale === "ar";

  return (
    <div className="container section-py max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8 border-b border-[var(--border)] pb-8">
        <div className="w-12 h-12 rounded-full bg-[var(--color-sand)] text-[var(--color-gold)] flex items-center justify-center shrink-0">
          <FileText size={24} />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold" style={{ color: "var(--color-espresso)" }}>
          {t("terms")}
        </h1>
      </div>

      <div className="glass-card p-8 space-y-6 text-[var(--text-secondary)] leading-relaxed">
        {isAr ? (
          <>
            <p>مرحباً بكم في موقع السعودية للأثاث. يخضع استخدامك لهذا الموقع للشروط والأحكام التالية:</p>
            <h3 className="font-bold text-lg text-[var(--color-espresso)] mt-6">1. قبول الشروط</h3>
            <p>من خلال تصفحك واستخدامك للموقع أو إتمامك لعملية الشراء، فإنك توافق على الالتزام بهذه الشروط والأحكام.</p>
            <h3 className="font-bold text-lg text-[var(--color-espresso)] mt-6">2. المنتجات والأسعار</h3>
            <p>نحرص على أن تكون تفاصيل المنتجات وأسعارها دقيقة. جميع الأسعار المعروضة بالريال السعودي. نحتفظ بالحق في تعديل الأسعار في أي وقت دون إشعار مسبق.</p>
            <h3 className="font-bold text-lg text-[var(--color-espresso)] mt-6">3. الدفع (التحويل البنكي)</h3>
            <p>يتم تأكيد الطلب فقط بعد استلام وتأكيد الحوالة البنكية. يجب أن يتم التحويل خلال 24 ساعة من إنشاء الطلب، وإلا سيتم إلغاؤه تلقائياً.</p>
            <h3 className="font-bold text-lg text-[var(--color-espresso)] mt-6">4. إخلاء المسؤولية</h3>
            <p>قد تختلف ألوان المنتجات بشكل طفيف عن الواقع بسبب إضاءة التصوير أو إعدادات الشاشة. المقاسات موضحة بدقة ويجب التأكد منها قبل الشراء.</p>
          </>
        ) : (
          <>
            <p>Welcome to Saudi Furniture. Your use of this website is subject to the following terms and conditions:</p>
            <h3 className="font-bold text-lg text-[var(--color-espresso)] mt-6">1. Acceptance of Terms</h3>
            <p>By browsing and using the site or completing a purchase, you agree to be bound by these terms and conditions.</p>
            <h3 className="font-bold text-lg text-[var(--color-espresso)] mt-6">2. Products and Pricing</h3>
            <p>We strive to ensure product details and prices are accurate. All prices are in Saudi Riyals (SAR). We reserve the right to modify prices at any time without prior notice.</p>
            <h3 className="font-bold text-lg text-[var(--color-espresso)] mt-6">3. Payment (Bank Transfer)</h3>
            <p>Orders are confirmed only after receiving and verifying the bank transfer. The transfer must be completed within 24 hours of creating the order, otherwise it will be automatically cancelled.</p>
            <h3 className="font-bold text-lg text-[var(--color-espresso)] mt-6">4. Disclaimer</h3>
            <p>Product colors may vary slightly from reality due to photography lighting or screen settings. Dimensions are clearly stated and must be checked before purchase.</p>
          </>
        )}
      </div>
    </div>
  );
}

import { getTranslations } from "next-intl/server";
import { Shield } from "lucide-react";

export default async function PrivacyPage({
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
          <Shield size={24} />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold" style={{ color: "var(--color-espresso)" }}>
          {t("privacy")}
        </h1>
      </div>

      <div className="glass-card p-8 space-y-6 text-[var(--text-secondary)] leading-relaxed">
        {isAr ? (
          <>
            <p>نحن في السعودية للأثاث نقدر خصوصيتك ونلتزم بحماية بياناتك الشخصية.</p>
            <h3 className="font-bold text-lg text-[var(--color-espresso)] mt-6">جمع المعلومات</h3>
            <p>نقوم بجمع المعلومات الأساسية اللازمة لإتمام طلبك مثل الاسم، ورقم الهاتف، وعنوان التوصيل. نحن لا نطلب أي بيانات بنكية أو أرقام بطاقات ائتمانية على موقعنا، حيث أن الدفع يتم عبر الحوالات البنكية المباشرة.</p>
            <h3 className="font-bold text-lg text-[var(--color-espresso)] mt-6">استخدام المعلومات</h3>
            <p>تستخدم معلوماتك فقط لغرض معالجة الطلبات، والتوصيل، والتواصل معك بشأن طلبك أو للرد على استفساراتك.</p>
            <h3 className="font-bold text-lg text-[var(--color-espresso)] mt-6">حماية البيانات</h3>
            <p>نحن لا نقوم بمشاركة أو بيع بياناتك لأي جهات خارجية. جميع بياناتك محفوظة بسرية تامة لخدمتك فقط.</p>
          </>
        ) : (
          <>
            <p>At Saudi Furniture, we value your privacy and are committed to protecting your personal data.</p>
            <h3 className="font-bold text-lg text-[var(--color-espresso)] mt-6">Information Collection</h3>
            <p>We collect essential information necessary to process your order, such as name, phone number, and delivery address. We do not ask for any bank details or credit card numbers on our site, as payment is done via direct bank transfers.</p>
            <h3 className="font-bold text-lg text-[var(--color-espresso)] mt-6">Information Usage</h3>
            <p>Your information is used solely for processing orders, delivery, and communicating with you regarding your order or to respond to your inquiries.</p>
            <h3 className="font-bold text-lg text-[var(--color-espresso)] mt-6">Data Protection</h3>
            <p>We do not share or sell your data to any third parties. All your data is kept strictly confidential to serve you only.</p>
          </>
        )}
      </div>
    </div>
  );
}

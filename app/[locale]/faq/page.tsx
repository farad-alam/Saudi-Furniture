import { getTranslations } from "next-intl/server";
import { HelpCircle } from "lucide-react";

export default async function FAQPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations("footer");
  const isAr = locale === "ar";

  const FAQS = isAr ? [
    {
      q: "ما هي طرق الدفع المتاحة؟",
      a: "في الوقت الحالي، نوفر الدفع عبر التحويل البنكي المباشر. عند إتمام الطلب، ستظهر لك تفاصيل الحساب البنكي لتحويل المبلغ ورفع الإيصال."
    },
    {
      q: "كم يستغرق التوصيل؟",
      a: "داخل عرعر يستغرق التوصيل من 1 إلى 3 أيام عمل. لباقي مدن المملكة، يستغرق من 5 إلى 10 أيام عمل."
    },
    {
      q: "هل يتوفر لديكم تركيب للأثاث؟",
      a: "نعم، التوصيل والتركيب مجاني داخل عرعر. للمدن الأخرى، يتم احتساب رسوم رمزية للتركيب بناءً على حجم الطلب."
    },
    {
      q: "هل يمكنني إرجاع الطلب أو استبداله؟",
      a: "نعم، يمكنك الإرجاع أو الاستبدال خلال 7 أيام من تاريخ الاستلام، بشرط أن يكون المنتج بحالته الأصلية ولم يتم تركيبه. تطبق الشروط والأحكام."
    }
  ] : [
    {
      q: "What payment methods do you accept?",
      a: "Currently, we accept direct bank transfers. Upon checkout, you will see our bank account details to transfer the amount and upload your receipt."
    },
    {
      q: "How long does delivery take?",
      a: "Within Arar, delivery takes 1-3 business days. For other cities across KSA, it takes 5-10 business days."
    },
    {
      q: "Do you offer furniture assembly?",
      a: "Yes, delivery and assembly are free within Arar. For other cities, a nominal assembly fee applies based on the order size."
    },
    {
      q: "Can I return or exchange my order?",
      a: "Yes, returns and exchanges are accepted within 7 days of receiving your order, provided the product is in its original un-assembled condition. Terms and conditions apply."
    }
  ];

  return (
    <div className="container section-py">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-16 h-16 mx-auto mb-6 bg-[var(--color-sand)] text-[var(--color-gold)] rounded-full flex items-center justify-center">
            <HelpCircle size={32} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: "var(--color-espresso)" }}>
            {t("faq")}
          </h1>
          <p className="text-[var(--text-secondary)] text-lg">
            {isAr ? "الإجابات على أكثر الأسئلة شيوعاً" : "Answers to the most commonly asked questions"}
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div key={index} className="glass-card p-6 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <h3 className="font-bold text-lg mb-3 text-[var(--color-espresso)]">{faq.q}</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

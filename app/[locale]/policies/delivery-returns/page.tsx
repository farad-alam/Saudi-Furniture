import { getTranslations } from "next-intl/server";
import { Truck } from "lucide-react";

export default async function DeliveryReturnsPage({
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
          <Truck size={24} />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold" style={{ color: "var(--color-espresso)" }}>
          {t("deliveryPolicy")} & {t("returns")}
        </h1>
      </div>

      <div className="glass-card p-8 space-y-6 text-[var(--text-secondary)] leading-relaxed">
        {isAr ? (
          <>
            <h3 className="font-bold text-xl text-[var(--color-espresso)]">سياسة التوصيل والتركيب</h3>
            <ul className="list-disc list-inside space-y-2 opacity-80 pl-4">
              <li><strong>داخل عرعر:</strong> التوصيل والتركيب مجاني للطلبات فوق 1000 ريال. يستغرق التوصيل من 1 إلى 3 أيام عمل.</li>
              <li><strong>باقي مدن المملكة:</strong> تتوفر خدمة الشحن لكافة المدن. رسوم الشحن تعتمد على حجم الطلب والمدينة.</li>
              <li>يتم تحديد موعد التوصيل مسبقاً بالتنسيق مع العميل.</li>
            </ul>

            <h3 className="font-bold text-xl text-[var(--color-espresso)] mt-8">سياسة الإرجاع والاستبدال</h3>
            <ul className="list-disc list-inside space-y-2 opacity-80 pl-4">
              <li>يحق للعميل إرجاع أو استبدال المنتج خلال 7 أيام من تاريخ الاستلام.</li>
              <li><strong>شرط أساسي:</strong> يجب أن يكون المنتج بحالته الأصلية، بغلافه، ولم يتم تركيبه أو استخدامه.</li>
              <li>المنتجات التي تم تفصيلها أو تعديلها بناءً على طلب العميل غير قابلة للإرجاع أو الاستبدال، إلا في حال وجود عيب مصنعي.</li>
              <li>يتحمل العميل رسوم شحن الإرجاع إذا لم يكن هناك عيب مصنعي في المنتج.</li>
              <li>يتم إرجاع المبلغ المدفوع عبر الحوالة البنكية خلال 3 إلى 7 أيام عمل من استلامنا وفحصنا للمنتج المرتجع.</li>
            </ul>
          </>
        ) : (
          <>
            <h3 className="font-bold text-xl text-[var(--color-espresso)]">Delivery & Assembly Policy</h3>
            <ul className="list-disc list-inside space-y-2 opacity-80 pl-4">
              <li><strong>Within Arar:</strong> Free delivery and assembly for orders over 1000 SAR. Delivery takes 1 to 3 business days.</li>
              <li><strong>Other KSA Cities:</strong> Shipping is available to all cities. Shipping fees depend on the order size and city.</li>
              <li>Delivery schedules will be coordinated in advance with the customer.</li>
            </ul>

            <h3 className="font-bold text-xl text-[var(--color-espresso)] mt-8">Return & Exchange Policy</h3>
            <ul className="list-disc list-inside space-y-2 opacity-80 pl-4">
              <li>Customers have the right to return or exchange products within 7 days of receipt.</li>
              <li><strong>Core Condition:</strong> The product must be in its original condition, in its packaging, and un-assembled or unused.</li>
              <li>Custom-made or specially modified products based on customer requests are non-returnable and non-exchangeable, unless there is a manufacturing defect.</li>
              <li>The customer bears the return shipping fees if the return is not due to a manufacturing defect.</li>
              <li>Refunds will be processed via bank transfer within 3 to 7 business days after we receive and inspect the returned product.</li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

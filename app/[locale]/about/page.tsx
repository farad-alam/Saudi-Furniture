import { getTranslations } from "next-intl/server";
import { Store, ShieldCheck, HeartHandshake } from "lucide-react";

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations("footer");

  const isAr = locale === "ar";

  return (
    <div className="container section-py">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center" style={{ color: "var(--color-espresso)" }}>
          {t("about")}
        </h1>
        
        <div className="glass-card p-8 md:p-12 mb-12 animate-fade-in-up">
          {isAr ? (
            <div className="space-y-6 text-lg leading-relaxed text-[var(--text-secondary)]">
              <p>
                مرحباً بكم في <strong>السعودية للأثاث</strong>، الوجهة الأولى للأثاث الفاخر في مدينة عرعر. نحن نفخر بتقديم تشكيلات واسعة من أرقى قطع الأثاث التي تجمع بين الأصالة والمعاصرة لتناسب جميع الأذواق.
              </p>
              <p>
                تأسست السعودية للأثاث برؤية واضحة: توفير أثاث عالي الجودة بأسعار تنافسية، مع التركيز على راحة ورضا عملائنا. من غرف المعيشة المريحة إلى المجالس الفاخرة، كل قطعة نختارها بعناية لتضيف لمسة من الأناقة والدفء إلى منزلك.
              </p>
              <p>
                نحن لا نبيع الأثاث فحسب، بل نساعدك في بناء مساحة تعكس شخصيتك وتلبي احتياجات عائلتك، مع خدمات توصيل وتركيب احترافية لجميع أنحاء المملكة.
              </p>
            </div>
          ) : (
            <div className="space-y-6 text-lg leading-relaxed text-[var(--text-secondary)]">
              <p>
                Welcome to <strong>Saudi Furniture</strong>, the premier destination for luxury and contemporary furniture in Arar. We take pride in offering a wide selection of the finest furniture pieces that combine tradition and modernity to suit all tastes.
              </p>
              <p>
                Saudi Furniture was founded with a clear vision: to provide high-quality furniture at competitive prices, with a focus on our customers' comfort and satisfaction. From cozy living rooms to luxurious Majlis sets, every piece is carefully selected to add a touch of elegance and warmth to your home.
              </p>
              <p>
                We do not just sell furniture; we help you build a space that reflects your personality and meets your family's needs, backed by professional delivery and installation services across the Kingdom.
              </p>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-[var(--color-sand)] text-[var(--color-gold)] rounded-full flex items-center justify-center">
              <Store size={24} />
            </div>
            <h3 className="font-bold mb-2 text-xl">{isAr ? "معرضنا في عرعر" : "Arar Showroom"}</h3>
            <p className="text-sm opacity-80">{isAr ? "نرحب بزيارتكم لمعاينة الجودة بأنفسكم." : "Visit us to experience the quality firsthand."}</p>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-[var(--color-sand)] text-[var(--color-gold)] rounded-full flex items-center justify-center">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-bold mb-2 text-xl">{isAr ? "جودة مضمونة" : "Guaranteed Quality"}</h3>
            <p className="text-sm opacity-80">{isAr ? "ننتقي أفضل الخامات لضمان استدامة منتجاتنا." : "We select the best materials to ensure durability."}</p>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-[var(--color-sand)] text-[var(--color-gold)] rounded-full flex items-center justify-center">
              <HeartHandshake size={24} />
            </div>
            <h3 className="font-bold mb-2 text-xl">{isAr ? "خدمة عملاء متميزة" : "Excellent Support"}</h3>
            <p className="text-sm opacity-80">{isAr ? "فريقنا متواجد دائماً للإجابة على استفساراتكم." : "Our team is always here to answer your questions."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

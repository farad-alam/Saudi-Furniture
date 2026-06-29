import { getTranslations } from "next-intl/server";
import { MapPin, Clock, Phone, MessageCircle } from "lucide-react";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+000000000";

export default async function ShowroomPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations("footer");
  const th = await getTranslations("home");
  
  const isAr = locale === "ar";

  return (
    <div className="container section-py">
      <h1 className="text-3xl md:text-5xl font-bold mb-10 text-center" style={{ color: "var(--color-espresso)" }}>
        {t("showroom")}
      </h1>
      
      <div className="grid md:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
        {/* Info Box */}
        <div className="glass-card p-8 md:p-10 space-y-8 animate-fade-in-up">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-[var(--color-gold)]">
              {th("showroomTitle")}
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              {isAr 
                ? "تفضل بزيارة معرضنا في مدينة عرعر لاستكشاف تشكيلتنا الواسعة من الأثاث الفاخر. فريقنا في انتظارك لتقديم الاستشارة ومساعدتك في اختيار القطع المثالية لمنزلك."
                : "Visit our showroom in Arar to explore our wide selection of luxury furniture. Our team is waiting to provide consultation and help you choose the perfect pieces for your home."
              }
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[var(--color-sand)] text-[var(--color-gold)] flex items-center justify-center shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="font-bold mb-1">{isAr ? "العنوان" : "Address"}</h3>
                <p className="text-[var(--text-muted)] text-sm">{th("showroomAddress")}</p>
                <a href="#" className="text-sm font-semibold text-[var(--color-gold)] mt-2 inline-block hover:underline">
                  {th("showroomDirections")} →
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[var(--color-sand)] text-[var(--color-gold)] flex items-center justify-center shrink-0">
                <Clock size={20} />
              </div>
              <div>
                <h3 className="font-bold mb-1">{isAr ? "ساعات العمل" : "Opening Hours"}</h3>
                <p className="text-[var(--text-muted)] text-sm" dir="ltr">{th("showroomHours")}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[var(--color-sand)] text-[var(--color-gold)] flex items-center justify-center shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <h3 className="font-bold mb-1">{isAr ? "التواصل" : "Contact"}</h3>
                <p className="text-[var(--text-muted)] text-sm mb-3">
                  {isAr ? "لأي استفسارات قبل زيارتكم:" : "For any inquiries before your visit:"}
                </p>
                <a
                  href={`https://wa.me/${WHATSAPP.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-sm inline-flex"
                >
                  <MessageCircle size={15} />
                  {th("showroomWhatsapp")}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="glass-card overflow-hidden h-[400px] md:h-full min-h-[400px] relative animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
           {/* Replace this div with an actual Google Maps iframe */}
           <div className="absolute inset-0 bg-[var(--color-sand)] flex flex-col items-center justify-center text-[var(--text-muted)] p-6 text-center">
             <MapPin size={48} className="mb-4 opacity-50" />
             <p className="font-bold text-lg mb-2">{isAr ? "خريطة المعرض" : "Showroom Map"}</p>
             <p className="text-sm">{isAr ? "سيتم تضمين خريطة جوجل هنا" : "Google Maps Embed goes here"}</p>
           </div>
        </div>
      </div>
    </div>
  );
}

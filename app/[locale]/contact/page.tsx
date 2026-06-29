import { getTranslations } from "next-intl/server";
import { Mail, MessageCircle, MapPin, Phone } from "lucide-react";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+000000000";

export default async function ContactPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations("footer");
  const isAr = locale === "ar";

  return (
    <div className="container section-py">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: "var(--color-espresso)" }}>
            {t("contact")}
          </h1>
          <p className="text-[var(--text-secondary)]">
            {isAr ? "نحن هنا لمساعدتك. تواصل معنا بأي من الطرق التالية:" : "We're here to help. Get in touch with us through any of the following ways:"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Contact Methods */}
          <div className="space-y-4">
            <a href={`https://wa.me/${WHATSAPP.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="glass-card p-6 flex items-center gap-4 hover:border-[#25D366] transition-colors group block">
              <div className="w-12 h-12 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">{isAr ? "واتساب" : "WhatsApp"}</h3>
                <p className="text-[var(--text-muted)] text-sm" dir="ltr">{WHATSAPP}</p>
              </div>
            </a>

            <div className="glass-card p-6 flex items-center gap-4 hover:border-[var(--color-gold)] transition-colors group">
              <div className="w-12 h-12 rounded-full bg-[var(--color-sand)] text-[var(--color-gold)] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">{isAr ? "البريد الإلكتروني" : "Email"}</h3>
                <p className="text-[var(--text-muted)] text-sm">support@saudifurniture.com</p>
              </div>
            </div>

            <div className="glass-card p-6 flex items-center gap-4 hover:border-[var(--color-gold)] transition-colors group">
              <div className="w-12 h-12 rounded-full bg-[var(--color-sand)] text-[var(--color-gold)] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">{isAr ? "الهاتف" : "Phone"}</h3>
                <p className="text-[var(--text-muted)] text-sm" dir="ltr">{WHATSAPP}</p>
              </div>
            </div>
          </div>

          {/* Form Placeholder */}
          <div className="glass-card p-8">
            <h3 className="font-bold text-xl mb-6">{isAr ? "أرسل لنا رسالة" : "Send us a message"}</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="form-label">{isAr ? "الاسم" : "Name"}</label>
                <input type="text" className="form-input" placeholder={isAr ? "الاسم الكامل" : "Full Name"} />
              </div>
              <div>
                <label className="form-label">{isAr ? "البريد الإلكتروني أو الجوال" : "Email or Phone"}</label>
                <input type="text" className="form-input" placeholder={isAr ? "للتواصل معك" : "To contact you"} />
              </div>
              <div>
                <label className="form-label">{isAr ? "الرسالة" : "Message"}</label>
                <textarea className="form-input" rows={4} placeholder={isAr ? "اكتب رسالتك هنا..." : "Type your message..."}></textarea>
              </div>
              <button type="button" className="btn btn-primary w-full">
                {isAr ? "إرسال" : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

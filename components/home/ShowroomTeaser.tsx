"use client";

import { useTranslations } from "next-intl";
import { MapPin, Clock, Navigation, MessageCircle } from "lucide-react";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+000000000";

export default function ShowroomTeaser({ locale }: { locale: string }) {
  const t = useTranslations("home");
  const isRTL = locale === "ar";

  const waMessage = locale === "ar"
    ? "مرحباً، أريد الاستفسار عن زيارة معرض السعودية للأثاث في عرعر"
    : "Hello, I'd like to enquire about visiting Saudi Furniture showroom in Arar";

  return (
    <section className="section-py" style={{ background: "var(--bg-secondary)" }}>
      <div className="container">
        <div
          className="grid gap-8 items-center"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
        >
          {/* Map */}
          <div
            className="rounded-2xl overflow-hidden shadow-lg"
            style={{ height: "360px", order: isRTL ? 1 : 0 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3585.4!2d41.0!3d30.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDU4JzEyLjAiTiA0McKwMDAnMDAuMCJF!5e0!3m2!1sar!2ssa!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Saudi Furniture Showroom Location"
            />
          </div>

          {/* Info */}
          <div style={{ order: isRTL ? 0 : 1 }}>
            <span
              className="badge badge-gold mb-4 inline-block"
              style={{ fontSize: "0.7rem", letterSpacing: "0.1em" }}
            >
              {locale === "ar" ? "معرضنا" : "Our Showroom"}
            </span>
            <h2 className="mb-6">{t("showroomTitle")}</h2>

            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5"
                  style={{ background: "rgba(201,145,58,0.12)", color: "var(--color-gold)" }}
                >
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="font-semibold text-sm mb-0.5">
                    {locale === "ar" ? "العنوان" : "Address"}
                  </p>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    {t("showroomAddress")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5"
                  style={{ background: "rgba(201,145,58,0.12)", color: "var(--color-gold)" }}
                >
                  <Clock size={16} />
                </div>
                <div>
                  <p className="font-semibold text-sm mb-0.5">
                    {locale === "ar" ? "أوقات العمل" : "Opening Hours"}
                  </p>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    {t("showroomHours")}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              <a
                href="https://maps.google.com/?q=Arar,Saudi+Arabia"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <Navigation size={16} />
                {t("showroomDirections")}
              </a>
              <a
                href={`https://wa.me/${WHATSAPP.replace(/\D/g, "")}?text=${encodeURIComponent(waMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <MessageCircle size={16} />
                {t("showroomWhatsapp")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

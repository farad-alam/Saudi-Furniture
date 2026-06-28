"use client";

import { useTranslations } from "next-intl";
import { Store, Landmark, Truck, ShieldCheck } from "lucide-react";

const TRUST_ITEMS = [
  { icon: Store, key: "trustShowroom" },
  { icon: Landmark, key: "trustPayment" },
  { icon: Truck, key: "trustDelivery" },
  { icon: ShieldCheck, key: "trustWarranty" },
] as const;

export default function TrustStrip() {
  const t = useTranslations("home");

  return (
    <div
      className="border-b"
      style={{
        background: "var(--color-espresso)",
        borderColor: "rgba(201,145,58,0.15)",
      }}
    >
      <div className="container py-5">
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}
        >
          {TRUST_ITEMS.map(({ icon: Icon, key }) => (
            <div
              key={key}
              className="flex items-center gap-3 justify-center text-center sm:text-start sm:justify-start"
            >
              <div
                className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{ background: "rgba(201,145,58,0.15)", color: "var(--color-gold)" }}
              >
                <Icon size={18} />
              </div>
              <p
                className="text-sm font-semibold"
                style={{ color: "rgba(255,255,255,0.9)" }}
              >
                {t(key)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  User, Phone, Mail, MapPin, Home, FileText,
  Building2, Truck, Landmark, Upload, Check, Loader2, MessageCircle
} from "lucide-react";
import { useCartStore } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+000000000";

// Saudi cities with delivery fees
const CITIES = [
  { nameAr: "عرعر",      nameEn: "Arar",      fee: 0    },
  { nameAr: "الرياض",    nameEn: "Riyadh",    fee: 250  },
  { nameAr: "جدة",       nameEn: "Jeddah",    fee: 350  },
  { nameAr: "الدمام",    nameEn: "Dammam",    fee: 300  },
  { nameAr: "مكة المكرمة", nameEn: "Makkah", fee: 380  },
  { nameAr: "المدينة",   nameEn: "Madinah",  fee: 320  },
  { nameAr: "تبوك",      nameEn: "Tabuk",     fee: 280  },
  { nameAr: "حائل",      nameEn: "Hail",      fee: 180  },
  { nameAr: "القصيم",    nameEn: "Qassim",    fee: 220  },
  { nameAr: "أخرى",      nameEn: "Other",     fee: 400  },
];

const schema = z.object({
  name:           z.string().min(3, "الاسم مطلوب / Name required"),
  phone:          z.string().min(9, "رقم الجوال غير صحيح / Invalid phone"),
  email:          z.string().email().optional().or(z.literal("")),
  city:           z.string().min(1, "اختر مدينة / Select city"),
  address:        z.string().min(10, "العنوان مطلوب / Address required"),
  notes:          z.string().optional(),
  deliveryMethod: z.enum(["PICKUP", "DELIVERY"]),
  transactionRef: z.string().min(3, "رقم العملية مطلوب / Transaction ref required"),
});

type FormData = z.infer<typeof schema>;

export default function CheckoutClient({ locale }: { locale: string }) {
  const t = useTranslations("checkout");
  const router = useRouter();
  const { items, subtotal, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const localePath = (path: string) => (locale === "ar" ? path : `/en${path}`);

  const {
    register, handleSubmit, watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { deliveryMethod: "PICKUP", city: "" },
  });

  const deliveryMethod = watch("deliveryMethod");
  const city = watch("city");
  const cityData = CITIES.find((c) => c.nameEn === city || c.nameAr === city);
  const deliveryFee = deliveryMethod === "PICKUP" ? 0 : (cityData?.fee ?? 0);
  const total = subtotal() + deliveryFee;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setReceiptFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setReceiptPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: FormData) => {
    if (!receiptFile) {
      alert(locale === "ar" ? "الرجاء رفع إيصال التحويل" : "Please upload the transfer receipt");
      return;
    }
    setIsSubmitting(true);
    try {
      // Upload receipt
      const formData = new FormData();
      formData.append("file", receiptFile);
      const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
      const { url: receiptUrl } = await uploadRes.json();

      // Create order
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          deliveryFee,
          subtotal: subtotal(),
          total,
          receiptUrl,
          items: items.map((i) => ({
            productId: i.id,
            quantity: i.quantity,
            price: i.salePrice ?? i.price,
          })),
        }),
      });

      const { orderNumber } = await orderRes.json();
      clearCart();
      router.push(localePath(`/order-confirmation/${orderNumber}`));
    } catch {
      alert(locale === "ar" ? "حدث خطأ، يرجى المحاولة مرة أخرى" : "An error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container py-20 text-center">
        <p className="text-2xl font-bold mb-4">
          {locale === "ar" ? "سلتك فارغة" : "Your cart is empty"}
        </p>
        <a href={localePath("/shop")} className="btn btn-primary">
          {locale === "ar" ? "تسوق الآن" : "Shop Now"}
        </a>
      </div>
    );
  }

  const stepLabel = (n: number) =>
    n === 1 ? t("step1") : n === 2 ? t("step2") : t("step3");

  return (
    <div className="container py-10">
      <h1 className="mb-6">{t("title")}</h1>

      {/* ── Step indicator ── */}
      <div className="flex items-center gap-0 mb-10 max-w-md">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex items-center flex-1">
            <div
              className="flex flex-col items-center gap-1"
              style={{ minWidth: "72px" }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
                style={{
                  background: step >= n ? "var(--color-gold)" : "var(--color-cream-dark)",
                  color: step >= n ? "white" : "var(--text-muted)",
                }}
              >
                {step > n ? <Check size={14} /> : n}
              </div>
              <span className="text-xs text-center" style={{ color: step === n ? "var(--color-gold)" : "var(--text-muted)" }}>
                {stepLabel(n)}
              </span>
            </div>
            {n < 3 && (
              <div className="flex-1 h-0.5 mx-1" style={{ background: step > n ? "var(--color-gold)" : "var(--border-strong)" }} />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── Left: form steps ──────────────────── */}
          <div className="flex-1 flex flex-col gap-6">

            {/* STEP 1: Customer info */}
            <div
              className="rounded-2xl border p-6"
              style={{ background: "var(--color-white)", borderColor: step === 1 ? "var(--color-gold)" : "var(--border)" }}
            >
              <div
                className="flex items-center justify-between mb-5 cursor-pointer"
                onClick={() => setStep(1)}
              >
                <h2 className="font-bold flex items-center gap-2">
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: "var(--color-gold)", color: "white" }}
                  >1</span>
                  {t("step1")}
                </h2>
                {step !== 1 && <span className="text-sm" style={{ color: "var(--color-gold)" }}>✓ {locale === "ar" ? "تم" : "Done"}</span>}
              </div>

              {step === 1 && (
                <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
                  <div>
                    <label className="form-label">
                      <User size={13} className="inline me-1" />{t("name")} *
                    </label>
                    <input {...register("name")} className="form-input" placeholder={locale === "ar" ? "محمد عبدالله" : "John Smith"} />
                    {errors.name && <p className="form-error">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="form-label">
                      <Phone size={13} className="inline me-1" />{t("phone")} *
                    </label>
                    <input {...register("phone")} className="form-input" placeholder="+966 5X XXX XXXX" dir="ltr" />
                    {errors.phone && <p className="form-error">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="form-label">
                      <Mail size={13} className="inline me-1" />{t("email")}
                    </label>
                    <input {...register("email")} type="email" className="form-input" placeholder="email@example.com" dir="ltr" />
                  </div>
                  <div>
                    <label className="form-label">
                      <MapPin size={13} className="inline me-1" />{t("city")} *
                    </label>
                    <select {...register("city")} className="form-input">
                      <option value="">{locale === "ar" ? "اختر مدينتك" : "Select your city"}</option>
                      {CITIES.map((c) => (
                        <option key={c.nameEn} value={c.nameEn}>
                          {locale === "ar" ? c.nameAr : c.nameEn}
                          {c.fee > 0 ? ` (${locale === "ar" ? "ر.س" : "SAR"} ${c.fee})` : ` (${locale === "ar" ? "مجاني" : "Free"})`}
                        </option>
                      ))}
                    </select>
                    {errors.city && <p className="form-error">{errors.city.message}</p>}
                  </div>
                  <div className="col-span-full" style={{ gridColumn: "1/-1" }}>
                    <label className="form-label">
                      <Home size={13} className="inline me-1" />{t("address")} *
                    </label>
                    <textarea {...register("address")} className="form-input" rows={2}
                      placeholder={locale === "ar" ? "الحي، الشارع، رقم المبنى..." : "Neighborhood, Street, Building No..."} />
                    {errors.address && <p className="form-error">{errors.address.message}</p>}
                  </div>
                  <div className="col-span-full" style={{ gridColumn: "1/-1" }}>
                    <label className="form-label">
                      <FileText size={13} className="inline me-1" />{t("notes")}
                    </label>
                    <textarea {...register("notes")} className="form-input" rows={2}
                      placeholder={locale === "ar" ? "أي ملاحظات للتوصيل..." : "Any delivery notes..."} />
                  </div>
                  <div className="col-span-full" style={{ gridColumn: "1/-1" }}>
                    <button type="button" className="btn btn-primary" onClick={() => setStep(2)}>
                      {locale === "ar" ? "التالي ←" : "Next →"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* STEP 2: Delivery method */}
            <div
              className="rounded-2xl border p-6"
              style={{ background: "var(--color-white)", borderColor: step === 2 ? "var(--color-gold)" : "var(--border)" }}
            >
              <div
                className="flex items-center justify-between mb-5 cursor-pointer"
                onClick={() => setStep(2)}
              >
                <h2 className="font-bold flex items-center gap-2">
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: step >= 2 ? "var(--color-gold)" : "var(--color-cream-dark)", color: step >= 2 ? "white" : "var(--text-muted)" }}
                  >2</span>
                  {t("step2")}
                </h2>
              </div>

              {step === 2 && (
                <div className="flex flex-col gap-4">
                  {[
                    { value: "PICKUP",   label: t("pickup"),   Icon: Building2, fee: 0    },
                    { value: "DELIVERY", label: t("delivery"), Icon: Truck,     fee: deliveryFee },
                  ].map(({ value, label, Icon, fee }) => (
                    <label
                      key={value}
                      className="flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all"
                      style={{
                        borderColor: deliveryMethod === value ? "var(--color-gold)" : "var(--border)",
                        background: deliveryMethod === value ? "rgba(201,145,58,0.06)" : "var(--color-white)",
                      }}
                    >
                      <input type="radio" {...register("deliveryMethod")} value={value} className="accent-[var(--color-gold)]" />
                      <Icon size={20} style={{ color: "var(--color-gold)" }} />
                      <span className="font-semibold flex-1">{label}</span>
                      <span className="font-bold" style={{ color: "var(--color-gold)" }}>
                        {value === "PICKUP" || fee === 0
                          ? (locale === "ar" ? "مجاني" : "Free")
                          : formatPrice(fee, locale)}
                      </span>
                    </label>
                  ))}

                  <div className="flex gap-3">
                    <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>
                      {locale === "ar" ? "→ السابق" : "← Back"}
                    </button>
                    <button type="button" className="btn btn-primary" onClick={() => setStep(3)}>
                      {locale === "ar" ? "التالي ←" : "Next →"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* STEP 3: Bank transfer */}
            <div
              className="rounded-2xl border p-6"
              style={{ background: "var(--color-white)", borderColor: step === 3 ? "var(--color-gold)" : "var(--border)" }}
            >
              <div
                className="flex items-center justify-between mb-5 cursor-pointer"
                onClick={() => setStep(3)}
              >
                <h2 className="font-bold flex items-center gap-2">
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: step >= 3 ? "var(--color-gold)" : "var(--color-cream-dark)", color: step >= 3 ? "white" : "var(--text-muted)" }}
                  >3</span>
                  {t("step3")}
                </h2>
              </div>

              {step === 3 && (
                <div className="flex flex-col gap-5">
                  {/* Bank details box */}
                  <div
                    className="p-4 rounded-xl"
                    style={{ background: "rgba(201,145,58,0.07)", border: "1px solid rgba(201,145,58,0.25)" }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Landmark size={18} style={{ color: "var(--color-gold)" }} />
                      <p className="font-bold">{t("paymentTitle")}</p>
                    </div>
                    <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                      {t("paymentInstructions")}
                    </p>
                    <div className="flex flex-col gap-2 text-sm font-mono">
                      {[
                        { label: locale === "ar" ? "البنك" : "Bank", value: "البنك الأهلي السعودي / SNB" },
                        { label: locale === "ar" ? "اسم الحساب" : "Account Name", value: "Saudi Furniture" },
                        { label: "IBAN", value: "SA00 0000 0000 0000 0000 0000" },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex items-center gap-2 flex-wrap">
                          <span style={{ color: "var(--text-muted)", minWidth: "110px" }}>{label}:</span>
                          <span
                            className="font-bold cursor-pointer hover:text-[var(--color-gold)] transition-colors"
                            onClick={() => navigator.clipboard.writeText(value)}
                            title={locale === "ar" ? "انقر للنسخ" : "Click to copy"}
                          >
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs mt-3 font-semibold" style={{ color: "var(--color-burgundy)" }}>
                      {locale === "ar"
                        ? "⚠️ استخدم رقم الطلب مرجعاً للتحويل"
                        : "⚠️ Use your Order Number as the transfer reference"}
                    </p>
                  </div>

                  {/* WhatsApp help */}
                  <a
                    href={`https://wa.me/${WHATSAPP.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-semibold"
                    style={{ color: "#25D366" }}
                  >
                    <MessageCircle size={16} />
                    {t("whatsappHelp")}
                  </a>

                  {/* Receipt upload */}
                  <div>
                    <label className="form-label">
                      <Upload size={13} className="inline me-1" />
                      {t("uploadReceipt")} *
                    </label>
                    <label
                      className="flex flex-col items-center justify-center gap-2 p-6 rounded-xl border-2 border-dashed cursor-pointer transition-all hover:border-[var(--color-gold)] hover:bg-[rgba(201,145,58,0.04)]"
                      style={{ borderColor: receiptFile ? "var(--color-gold)" : "var(--border-strong)" }}
                    >
                      <input type="file" accept="image/*,application/pdf" className="hidden" onChange={handleFileChange} />
                      {receiptPreview ? (
                        <Image src={receiptPreview} alt="Receipt" width={120} height={80} className="rounded object-cover" />
                      ) : (
                        <>
                          <Upload size={28} style={{ color: "var(--text-muted)" }} />
                          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                            {locale === "ar" ? "انقر أو اسحب الملف هنا" : "Click or drag file here"}
                          </p>
                        </>
                      )}
                      {receiptFile && (
                        <p className="text-xs font-semibold" style={{ color: "var(--color-gold)" }}>
                          {receiptFile.name}
                        </p>
                      )}
                    </label>
                  </div>

                  {/* Transaction ref */}
                  <div>
                    <label className="form-label">{t("transactionRef")} *</label>
                    <input {...register("transactionRef")} className="form-input" dir="ltr"
                      placeholder={locale === "ar" ? "مثال: TXN123456789" : "e.g. TXN123456789"} />
                    {errors.transactionRef && <p className="form-error">{errors.transactionRef.message}</p>}
                  </div>

                  <div className="flex gap-3">
                    <button type="button" className="btn btn-outline" onClick={() => setStep(2)}>
                      {locale === "ar" ? "→ السابق" : "← Back"}
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary flex items-center gap-2"
                    >
                      {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                      {t("placeOrder")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Right: order summary ──────────────── */}
          <div className="lg:w-80">
            <div
              className="sticky top-[calc(var(--header-height)+1rem)] rounded-2xl border p-5"
              style={{ background: "var(--color-white)", borderColor: "var(--border)" }}
            >
              <h3 className="font-bold mb-4 pb-3 border-b" style={{ borderColor: "var(--border)" }}>
                {locale === "ar" ? "ملخص طلبك" : "Your Order"}
              </h3>

              <div className="flex flex-col gap-3 mb-4">
                {items.map((item) => {
                  const name = locale === "ar" ? item.nameAr : item.nameEn;
                  const price = item.salePrice ?? item.price;
                  return (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0" style={{ background: "var(--color-sand)" }}>
                        <Image src={item.image} alt={name} fill className="object-cover" sizes="48px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold truncate">{name}</p>
                        <p className="text-xs" style={{ color: "var(--text-muted)" }}>×{item.quantity}</p>
                      </div>
                      <p className="text-sm font-bold">{formatPrice(price * item.quantity, locale)}</p>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col gap-2 pt-3 border-t text-sm" style={{ borderColor: "var(--border)" }}>
                <div className="flex justify-between">
                  <span style={{ color: "var(--text-muted)" }}>{locale === "ar" ? "المجموع" : "Subtotal"}</span>
                  <span>{formatPrice(subtotal(), locale)}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--text-muted)" }}>{locale === "ar" ? "التوصيل" : "Delivery"}</span>
                  <span style={{ color: "var(--color-gold)" }}>
                    {deliveryFee === 0 ? (locale === "ar" ? "مجاني" : "Free") : formatPrice(deliveryFee, locale)}
                  </span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t mt-1 text-base" style={{ borderColor: "var(--border)" }}>
                  <span>{locale === "ar" ? "الإجمالي" : "Total"}</span>
                  <span style={{ color: "var(--color-gold)" }}>{formatPrice(total, locale)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

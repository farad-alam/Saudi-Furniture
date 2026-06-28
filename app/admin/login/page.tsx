"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await signIn("credentials", {
      email, password, redirect: false,
    });
    if (result?.ok) {
      router.push("/admin/dashboard");
    } else {
      setError("بيانات الدخول غير صحيحة / Invalid credentials");
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, var(--color-espresso) 0%, var(--color-brown) 100%)",
        padding: "2rem",
      }}
    >
      <div
        className="w-full max-w-sm rounded-3xl p-8 shadow-2xl"
        style={{ background: "var(--color-cream)" }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <p
            className="text-2xl font-extrabold mb-1"
            style={{ fontFamily: "var(--font-arabic)", color: "var(--color-espresso)" }}
          >
            السعودية للأثاث
          </p>
          <p
            className="text-xs uppercase tracking-widest font-semibold"
            style={{ color: "var(--color-gold)" }}
          >
            Admin Panel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="form-label flex items-center gap-1">
              <Mail size={13} /> Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="admin@saudifurniture.com"
              required
            />
          </div>

          <div>
            <label className="form-label flex items-center gap-1">
              <Lock size={13} /> Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input pe-10"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute top-1/2 end-3 -translate-y-1/2"
                style={{ color: "var(--text-muted)" }}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm" style={{ color: "var(--color-burgundy)" }}>{error}</p>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-lg w-full flex items-center justify-center gap-2 mt-2"
            disabled={loading}
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Lock size={18} />}
            {loading ? "جاري الدخول..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

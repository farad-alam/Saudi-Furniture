"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard, ShoppingBag, Package, FolderOpen,
  Users, Image, Settings, LogOut, Menu, X,
} from "lucide-react";
import { useState } from "react";

const NAV = [
  { href: "/admin/dashboard", label: "لوحة التحكم",   icon: LayoutDashboard },
  { href: "/admin/orders",    label: "الطلبات",        icon: ShoppingBag     },
  { href: "/admin/products",  label: "المنتجات",       icon: Package         },
  { href: "/admin/categories",label: "الأقسام",        icon: FolderOpen      },
  { href: "/admin/customers", label: "العملاء",        icon: Users           },
  { href: "/admin/banners",   label: "البانرات",       icon: Image           },
  { href: "/admin/settings",  label: "الإعدادات",      icon: Settings        },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <p className="text-xl font-extrabold text-white" style={{ fontFamily: "var(--font-arabic)" }}>
          السعودية للأثاث
        </p>
        <p className="text-xs mt-0.5" style={{ color: "var(--color-gold-light)", opacity: 0.8 }}>
          Admin Panel
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 overflow-y-auto">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all text-sm font-semibold"
              style={{
                background:  active ? "rgba(201,145,58,0.18)" : "transparent",
                color:       active ? "var(--color-gold-light)" : "rgba(255,255,255,0.65)",
                borderInlineStart: active ? "3px solid var(--color-gold)" : "3px solid transparent",
              }}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <div className="p-3 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-sm font-semibold transition-colors hover:bg-white/10"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          <LogOut size={18} />
          تسجيل الخروج
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside
        className="hidden lg:flex flex-col fixed top-0 start-0 h-full w-60 z-40"
        style={{ background: "var(--color-espresso)", borderInlineEnd: "1px solid rgba(255,255,255,0.06)" }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-3 start-3 z-50 lg:hidden w-9 h-9 rounded-xl flex items-center justify-center"
        style={{ background: "var(--color-espresso)", color: "white" }}
      >
        <Menu size={18} />
      </button>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <aside
            className="relative w-60 h-full flex flex-col"
            style={{ background: "var(--color-espresso)" }}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 end-3 text-white/60 hover:text-white"
            >
              <X size={20} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}

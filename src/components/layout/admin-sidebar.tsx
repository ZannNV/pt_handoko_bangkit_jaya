"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CompanyLogoIcon } from "../icons/logo";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  FileText,
  Package,
  Briefcase,
  Building2,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export const ADMIN_NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/pesanan", label: "Pesanan", icon: ShoppingCart },
  { href: "/admin/klien", label: "Klien", icon: Users },
  { href: "/admin/dokumen", label: "Dokumen Pesanan", icon: FileText },
  { href: "/admin/produk", label: "Produk & Kategori", icon: Package },
  { href: "/admin/portofolio", label: "Portofolio", icon: Briefcase },
  { href: "/admin/profil", label: "Profil Usaha", icon: Building2 },
];

export interface AdminSidebarProps {
  onLogout?: () => void;
  className?: string;
}

export function AdminSidebar({ onLogout, className }: AdminSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setCollapsed(true);
    }
  }, []);

  return (
    <aside
      className={cn(
        "relative flex flex-col bg-navy-900 text-white min-h-screen transition-all duration-300 z-40 select-none",
        collapsed ? "w-[72px]" : "w-[248px]",
        className
      )}
    >
      {/* Header Logo */}
      <div className="h-[72px] flex items-center justify-between px-4 border-b border-navy-700/40">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-3 overflow-hidden"
        >
          <CompanyLogoIcon size={36} />
          {!collapsed && (
            <span className="font-bold text-h3 text-white tracking-wide truncate">
              Panel Admin
            </span>
          )}
        </Link>
        {/* Toggle Collapse Button */}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="flex p-1.5 rounded-md text-content-mutedOnDark hover:text-white hover:bg-navy-700/60 transition-colors"
          aria-label={collapsed ? "Perluas sidebar" : "Lipat sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigasi Menu */}
      <nav
        role="navigation"
        aria-label="Menu Admin"
        className="flex-1 py-4 px-2.5 flex flex-col gap-1 overflow-y-auto"
      >
        {ADMIN_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-3 h-[42px] px-3 rounded-lg text-isi transition-all duration-150",
                isActive
                  ? "bg-navy-700/70 text-white font-semibold border-l-4 border-orange-500 shadow-sm"
                  : "text-content-mutedOnDark hover:text-white hover:bg-navy-700/40"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 shrink-0 transition-colors",
                  isActive ? "text-orange-500" : "text-content-mutedOnDark"
                )}
              />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Tombol Keluar di Bawah */}
      <div className="p-3 border-t border-navy-700/40">
        <button
          type="button"
          onClick={onLogout}
          title={collapsed ? "Keluar" : undefined}
          className="w-full flex items-center gap-3 h-[42px] px-3 rounded-lg text-isi text-content-mutedOnDark hover:text-[#f87171] hover:bg-navy-700/40 transition-colors"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="font-medium truncate">Keluar</span>}
        </button>
      </div>
    </aside>
  );
}

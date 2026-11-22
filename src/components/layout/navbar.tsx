"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CompanyBrand } from "../icons/logo";
import { Button } from "../ui/button";
import { Menu, X, MessageCircle } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/katalog", label: "Produk & Portofolio" },
  { href: "/profil", label: "Profil Usaha" },
  { href: "/ajukan-pesanan", label: "Ajukan Pesanan" },
  { href: "/cek-status", label: "Cek Status Pesanan" },
  { href: "/hubungi", label: "Kontak" },
];

export interface NavbarProps {
  whatsappNumber?: string;
  className?: string;
}

export function Navbar({
  whatsappNumber = "6289567676767",
  className,
}: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cleanWaNumber = whatsappNumber.replace(/\D/g, "");
  const waUrl = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
    "Halo PT Handoko Bangkit Jaya, saya ingin berkonsultasi mengenai pesanan fabrikasi besi."
  )}`;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full h-[72px] bg-card border-b border-divider flex items-center transition-shadow",
        className
      )}
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-20 flex items-center justify-between">
        {/* Logo Brand */}
        <Link href="/" className="hover:opacity-95 transition-opacity">
          <CompanyBrand />
        </Link>

        {/* Menu Navigasi Desktop */}
        <nav
          role="navigation"
          aria-label="Navigasi Utama"
          className="hidden lg:flex items-center gap-7"
        >
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-1 text-isi transition-colors",
                  isActive
                    ? "font-semibold text-content-primary"
                    : "text-content-primary/80 hover:text-orange-500"
                )}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-orange-500 rounded-full"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA WhatsApp Desktop */}
        <div className="hidden lg:flex items-center">
          <Link href={waUrl} target="_blank" rel="noopener noreferrer">
            <Button
              variant="utama"
              size="md"
              leftIcon={<MessageCircle className="w-4 h-4 fill-navy-900" />}
            >
              Hubungi via WhatsApp
            </Button>
          </Link>
        </div>

        {/* Hamburger Mobile */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-content-primary hover:bg-page transition-colors"
          aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu navigasi"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-[72px] left-0 right-0 bg-card border-b border-divider shadow-modal p-6 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-3 py-2 rounded-lg text-isi transition-colors",
                    isActive
                      ? "bg-orange-100/60 font-semibold text-orange-500"
                      : "text-content-primary hover:bg-page"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="pt-3 border-t border-divider flex flex-col gap-2">
            <Link
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full"
            >
              <Button
                variant="utama"
                size="md"
                className="w-full"
                leftIcon={<MessageCircle className="w-4 h-4 fill-navy-900" />}
              >
                Hubungi via WhatsApp
              </Button>
            </Link>

            <div className="pt-2 text-center">
              <Link
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-kecil text-content-muted hover:text-orange-500 transition-colors inline-flex items-center gap-1.5"
              >
                <span>🔐 Portal Khusus Admin</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

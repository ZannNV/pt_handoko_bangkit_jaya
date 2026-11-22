import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { MessageCircle } from "lucide-react";

export interface FooterProps {
  whatsapp?: string;
  email?: string;
  address?: string;
  className?: string;
}

export function Footer({
  whatsapp = "089567676767",
  email = "pthandokobj@gmail.com",
  address = "Jl. Pasundan No. 54, Adiarsa Barat, Karawang Barat, Kabupaten Karawang, Jawa Barat.",
  className,
}: FooterProps) {
  const cleanWa = whatsapp.replace(/\D/g, "");
  const waUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent(
    "Halo PT Handoko Bangkit Jaya, saya ingin menanyakan informasi pemesanan."
  )}`;

  return (
    <footer
      role="contentinfo"
      className={cn("w-full bg-navy-900 text-white border-t border-navy-700/50", className)}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo + Detail Kontak */}
        <div className="flex items-center gap-4">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
            <Image
              src="/images/logo-hbj.jpg"
              alt="Logo PT Handoko Bangkit Jaya"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col text-left text-kecil md:text-label text-content-mutedOnDark leading-relaxed">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>
                <strong className="text-white font-medium">WhatsApp:</strong>{" "}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-500 transition-colors"
                >
                  {whatsapp}
                </a>
              </span>
              <span className="hidden sm:inline text-navy-700">|</span>
              <span>
                <strong className="text-white font-medium">Email:</strong>{" "}
                <a
                  href={`mailto:${email}`}
                  className="hover:text-orange-500 transition-colors"
                >
                  {email}
                </a>
              </span>
              <span className="hidden sm:inline text-navy-700">|</span>
              <span>
                <Link
                  href="/admin/login"
                  className="text-orange-400 hover:text-orange-300 font-medium transition-colors inline-flex items-center gap-1"
                  title="Akses Portal Admin PT Handoko Bangkit Jaya"
                >
                  🔐 Akses Admin
                </Link>
              </span>
            </div>
            <p className="mt-1 text-content-mutedOnDark/80">
              <a
                href="https://maps.app.goo.gl/U3JW67qD13SPh9kb6"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-500 transition-colors"
                title="Buka di Google Maps"
              >
                {address} ↗
              </a>
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="shrink-0 mt-2 md:mt-0">
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
      </div>
    </footer>
  );
}

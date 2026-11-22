"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { ProfilUsaha } from "@/lib/types";
import { ArrowRight, Mail, MapPin, Clock, Phone } from "lucide-react";

interface HubungiContentProps {
  profile: ProfilUsaha;
  initialProduk?: string;
}

export function HubungiContent({ profile, initialProduk = "" }: HubungiContentProps) {
  const searchParams = useSearchParams();
  const namaProduk = searchParams?.get("produk") || initialProduk || "";

  // Bersihkan format nomor WhatsApp
  // e.g. "0895-6767-6767" -> "6289567676767"
  let cleanWa = profile.whatsapp.replace(/\D/g, "");
  if (cleanWa.startsWith("0")) {
    cleanWa = "62" + cleanWa.slice(1);
  } else if (!cleanWa.startsWith("62")) {
    cleanWa = "62" + cleanWa;
  }

  // Pesan WhatsApp otomatis sesuai persyaratan
  const pesanTeks = namaProduk
    ? `Halo PT Handoko Bangkit Jaya, saya ingin berkonsultasi mengenai produk/layanan: ${namaProduk}. Mohon informasinya.`
    : `Halo PT Handoko Bangkit Jaya, saya ingin berkonsultasi mengenai kebutuhan fabrikasi besi make-to-order. Mohon informasinya.`;

  const waUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent(pesanTeks)}`;

  return (
    <div className="flex flex-col items-center">
      {/* Kartu Utama Frame 07 (796px lebar pada desktop) */}
      <div className="max-w-[796px] w-full bg-surface-card border border-border rounded-2xl shadow-card p-8 md:p-14 text-center flex flex-col items-center">
        {/* WhatsApp Icon */}
        <div className="w-24 h-24 rounded-full bg-[#25D366]/10 flex items-center justify-center p-4 border border-[#25D366]/20 shadow-sm mb-6">
          <svg
            className="w-14 h-14 text-[#25D366] fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.586 1.761.88 2.791.88 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.766-5.768-5.766zm9.969 5.766c0 5.518-4.482 10-10 10-1.696 0-3.32-.429-4.757-1.218l-5.243 1.372 1.396-5.105c-.86-1.488-1.396-3.218-1.396-5.049 0-5.518 4.482-10 10-10 5.518 0 10 4.482 10 10zm-3.692 4.148c-.14-.236-.518-.376-1.082-.659-.564-.282-3.332-1.644-3.85-1.832-.518-.188-.895-.282-1.272.282-.376.564-1.458 1.832-1.787 2.208-.329.376-.658.423-1.222.141-.564-.282-2.383-.878-4.538-2.799-1.677-1.495-2.809-3.342-3.138-3.906-.329-.564-.035-.869.247-1.15.253-.253.564-.658.846-.987.282-.329.376-.564.564-.94.188-.376.094-.705-.047-.987-.14-.282-1.272-3.064-1.742-4.195-.458-1.103-.923-.953-1.272-.972-.329-.017-.706-.021-1.082-.021-.376 0-.987.141-1.504.705-.518.564-1.975 1.93-1.975 4.708 0 2.778 2.022 5.461 2.304 5.837.282.376 3.98 6.077 9.642 8.523 1.347.582 2.399.929 3.218 1.189 1.353.43 2.584.37 3.557.225 1.086-.162 3.332-1.362 3.803-2.678.47-1.316.47-2.443.329-2.678z" />
          </svg>
        </div>

        {/* Heading & Subheading */}
        <h2 className="text-h1 md:text-[32px] font-bold text-navy-900 tracking-tight">
          Hubungi Kami
        </h2>
        <p className="text-isi sm:text-h3 text-content-muted mt-3 max-w-[480px] leading-relaxed">
          Ada pertanyaan seputar produk, layanan, atau pemesanan? Tim kami siap membantu.
        </p>

        {/* Info produk jika datang dari detail produk */}
        {namaProduk && (
          <div className="mt-4 px-4 py-2 bg-orange-100/60 border border-orange-500/30 rounded-lg text-content-main text-sm max-w-md">
            Konsultasi produk:{" "}
            <span className="font-semibold text-orange-600">{namaProduk}</span>
          </div>
        )}

        {/* Tombol Utama */}
        <div className="mt-8 w-full max-w-[634px]">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-16 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg sm:text-xl rounded-xl flex items-center justify-center gap-3 transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.99] group"
          >
            <span>Chat via WhatsApp</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Keterangan di bawah tombol */}
        <div className="mt-4 text-kecil sm:text-isi text-content-muted leading-relaxed">
          <p>Anda akan diarahkan langsung ke WhatsApp</p>
          <p>untuk menghubungi admin kami.</p>
        </div>

        {/* Nomor & Jam Layanan */}
        <div className="mt-8 pt-6 border-t border-border w-full flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-label text-content-muted">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-orange-500" />
            <span>
              Nomor Resmi: <strong className="text-navy-900">{profile.whatsapp}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-500" />
            <span>Senin - Sabtu: 08.00 - 16.00 WIB</span>
          </div>
        </div>
      </div>

      {/* Info Tambahan Kantor */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[796px] w-full text-label text-content-muted">
        <div className="p-4 rounded-xl bg-white border border-border flex items-start gap-3">
          <Mail className="w-5 h-5 text-navy-700 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-navy-900">Email Resmi</div>
            <a
              href={`mailto:${profile.email}`}
              className="text-orange-500 hover:underline"
            >
              {profile.email}
            </a>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-border flex items-start gap-3">
          <MapPin className="w-5 h-5 text-navy-700 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-navy-900">Lokasi Workshop</div>
            <p className="text-xs text-content-muted mt-0.5 leading-relaxed">
              {profile.alamat}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

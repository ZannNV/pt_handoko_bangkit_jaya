"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCompanyProfile } from "@/lib/data/store";
import { ProfilUsaha } from "@/lib/types";
import { Button } from "@/components/ui/button";

export default function AdminProfilPage() {
  const [profile, setProfile] = useState<ProfilUsaha | null>(null);

  useEffect(() => {
    setProfile(getCompanyProfile());
  }, []);

  if (!profile) {
    return (
      <div className="p-8">
        <div className="h-8 w-48 bg-navy-100 rounded animate-pulse mb-6" />
        <div className="h-96 bg-white rounded-lg border border-garis animate-pulse" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-display-sm sm:text-display font-bold text-navy-900">
            Profil Usaha
          </h1>
          <p className="text-body-sm text-teks-redup mt-1">
            Kelola identitas perusahaan, visi misi, keunggulan, alur produksi, dan informasi kontak publik.
          </p>
        </div>
        <div>
          <Link href="/admin/profil/edit">
            <Button variant="utama" size="md">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit Profil Usaha
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Card: Informasi Profil Usaha (Frame 14) */}
      <div className="bg-white rounded-xl border border-garis shadow-kartu p-6 lg:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-garis pb-4">
          <h2 className="text-h2 font-bold text-navy-900">
            Informasi Profil Usaha
          </h2>
          <span className="text-xs text-teks-redup bg-navy-100/50 px-2.5 py-1 rounded">
            Tampil di Website Publik
          </span>
        </div>

        {/* Row 1: 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-label text-teks-redup mb-1">
              Nama Usaha
            </label>
            <div className="p-3 bg-latar-halaman rounded-lg border border-garis text-body font-semibold text-navy-900">
              {profile.nama_perusahaan}
            </div>
          </div>
          <div>
            <label className="block text-label text-teks-redup mb-1">
              Email Resmi
            </label>
            <div className="p-3 bg-latar-halaman rounded-lg border border-garis text-body text-navy-900">
              {profile.email}
            </div>
          </div>
          <div>
            <label className="block text-label text-teks-redup mb-1">
              No. WhatsApp
            </label>
            <div className="p-3 bg-latar-halaman rounded-lg border border-garis text-body font-mono text-navy-900">
              {profile.whatsapp}
            </div>
          </div>
        </div>

        {/* Row 2: 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <label className="block text-label text-teks-redup mb-1">
              Bidang Usaha
            </label>
            <div className="p-3 bg-latar-halaman rounded-lg border border-garis text-body text-navy-900">
              {profile.bidang_usaha}
            </div>
          </div>
          <div>
            <label className="block text-label text-teks-redup mb-1">
              Jam Operasional
            </label>
            <div className="p-3 bg-latar-halaman rounded-lg border border-garis text-body text-navy-900">
              08.00 - 16.00 WIB
            </div>
          </div>
          <div>
            <label className="block text-label text-teks-redup mb-1">
              Hari Layanan
            </label>
            <div className="p-3 bg-latar-halaman rounded-lg border border-garis text-body text-navy-900">
              Senin – Sabtu
            </div>
          </div>
        </div>

        {/* Row 3: Alamat & Media Sosial */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <label className="block text-label text-teks-redup mb-1">
              Alamat Workshop & Kantor
            </label>
            <div className="p-3 bg-latar-halaman rounded-lg border border-garis text-body text-navy-900">
              {profile.alamat}
            </div>
          </div>
          <div>
            <label className="block text-label text-teks-redup mb-1">
              Instagram
            </label>
            <div className="p-3 bg-latar-halaman rounded-lg border border-garis text-body text-navy-900">
              @handokobangkitjaya
            </div>
          </div>
        </div>

        {/* Row 4: Deskripsi Singkat */}
        <div>
          <label className="block text-label text-teks-redup mb-1">
            Deskripsi Singkat Usaha (Fabrikasi Besi Make-to-Order)
          </label>
          <div className="p-4 bg-latar-halaman rounded-lg border border-garis text-body text-teks-utama leading-relaxed">
            {profile.deskripsi}
          </div>
        </div>

        {/* Row 5: 3 Quick Link Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Card 1: Visi & Misi */}
          <Link
            href="/admin/profil/edit?step=2"
            className="p-5 rounded-lg border border-garis bg-latar-halaman hover:border-navy-700 hover:shadow-sm transition-all group block"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-navy-900 group-hover:text-oranye-500 transition-colors">
                Visi & Misi
              </span>
              <svg
                className="w-4 h-4 text-teks-redup group-hover:text-oranye-500 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
            <p className="text-body-sm text-teks-redup">
              Visi perusahaan dan {profile.misi?.length || 4} pilar misi utama untuk website publik.
            </p>
          </Link>

          {/* Card 2: Layanan & Keunggulan */}
          <Link
            href="/admin/profil/edit?step=2"
            className="p-5 rounded-lg border border-garis bg-latar-halaman hover:border-navy-700 hover:shadow-sm transition-all group block"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-navy-900 group-hover:text-oranye-500 transition-colors">
                3 Kartu Keunggulan
              </span>
              <svg
                className="w-4 h-4 text-teks-redup group-hover:text-oranye-500 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
            <p className="text-body-sm text-teks-redup">
              Bahan baku SNI, tenaga las bersertifikat, dan garansi pengerjaan.
            </p>
          </Link>

          {/* Card 3: 4 Alur Produksi */}
          <Link
            href="/admin/profil/edit?step=3"
            className="p-5 rounded-lg border border-garis bg-latar-halaman hover:border-navy-700 hover:shadow-sm transition-all group block"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-navy-900 group-hover:text-oranye-500 transition-colors">
                4 Tahap Alur Produksi
              </span>
              <svg
                className="w-4 h-4 text-teks-redup group-hover:text-oranye-500 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
            <p className="text-body-sm text-teks-redup">
              Konsultasi, Penawaran & Desain, Fabrikasi di Workshop, Pemasangan & Serah Terima.
            </p>
          </Link>
        </div>

        {/* Footer button */}
        <div className="flex justify-end pt-4 border-t border-garis">
          <Link href="/admin/profil/edit">
            <Button variant="utama" size="md">
              Edit Data Profil Usaha
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

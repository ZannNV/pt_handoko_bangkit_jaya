"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { getCompanyProfile, updateCompanyProfile } from "@/lib/data/store";
import { ProfilUsaha } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function ProfilEditWizardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialStep = parseInt(searchParams.get("step") || "1", 10);
  const [step, setStep] = useState<number>(initialStep >= 1 && initialStep <= 3 ? initialStep : 1);
  const [profile, setProfile] = useState<ProfilUsaha | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

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

  const handleUpdate = (field: keyof ProfilUsaha, value: any) => {
    setProfile((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleMisiChange = (index: number, val: string) => {
    if (!profile) return;
    const newMisi = [...profile.misi];
    newMisi[index] = val;
    setProfile({ ...profile, misi: newMisi });
  };

  const handleKeunggulanChange = (
    index: number,
    field: "judul" | "deskripsi",
    val: string
  ) => {
    if (!profile) return;
    const newKeunggulan = [...profile.keunggulan];
    newKeunggulan[index] = { ...newKeunggulan[index], [field]: val };
    setProfile({ ...profile, keunggulan: newKeunggulan });
  };

  const handleAlurProduksiChange = (
    index: number,
    field: "judul" | "deskripsi",
    val: string
  ) => {
    if (!profile) return;
    const newAlur = [...profile.alur_produksi];
    newAlur[index] = { ...newAlur[index], [field]: val };
    setProfile({ ...profile, alur_produksi: newAlur });
  };

  const handleSave = () => {
    if (!profile) return;
    setIsSaving(true);
    setTimeout(() => {
      updateCompanyProfile(profile);
      setIsSaving(false);
      setSuccessToast(true);
      setTimeout(() => {
        router.push("/admin/profil");
      }, 1200);
    }, 600);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-5xl mx-auto">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-6 right-6 z-50 bg-status-sukses-latar border border-status-sukses-teks text-status-sukses-teks px-5 py-3.5 rounded-lg shadow-modal flex items-center gap-3 animate-fade-in">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-semibold text-sm">
            Profil Usaha berhasil diperbarui dan diterapkan ke website!
          </span>
        </div>
      )}

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-teks-redup text-body-sm mb-1">
          <Link href="/admin/profil" className="hover:text-navy-900 transition-colors">
            Profil Usaha
          </Link>
          <span>/</span>
          <span className="text-navy-900 font-medium">
            {step === 1 && "1. Tentang Usaha"}
            {step === 2 && "2. Visi & Keunggulan"}
            {step === 3 && "3. Produksi & Kontak"}
          </span>
        </div>
        <h1 className="text-display-sm sm:text-display font-bold text-navy-900">
          Profil Usaha - {step === 1 && "Tentang Usaha"}
          {step === 2 && "Visi & Keunggulan"}
          {step === 3 && "Produksi & Kontak"}
        </h1>
        <p className="text-body-sm text-teks-redup mt-1">
          Kelola konten yang akan tampil pada halaman Profil Usaha website.
        </p>
      </div>

      {/* 3-Step Wizard Navigation Bar (Frames 15, 16, 17) */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 bg-navy-100/50 p-1.5 rounded-xl border border-garis">
        <button
          type="button"
          onClick={() => setStep(1)}
          className={`py-3 px-2 sm:px-4 text-center rounded-lg text-body-sm font-semibold transition-all ${
            step === 1
              ? "bg-white text-navy-900 shadow-sm border border-garis"
              : "text-teks-redup hover:text-navy-900 hover:bg-white/60"
          }`}
        >
          1. Tentang Usaha
        </button>
        <button
          type="button"
          onClick={() => setStep(2)}
          className={`py-3 px-2 sm:px-4 text-center rounded-lg text-body-sm font-semibold transition-all ${
            step === 2
              ? "bg-white text-navy-900 shadow-sm border border-garis"
              : "text-teks-redup hover:text-navy-900 hover:bg-white/60"
          }`}
        >
          2. Visi & Keunggulan
        </button>
        <button
          type="button"
          onClick={() => setStep(3)}
          className={`py-3 px-2 sm:px-4 text-center rounded-lg text-body-sm font-semibold transition-all ${
            step === 3
              ? "bg-white text-navy-900 shadow-sm border border-garis"
              : "text-teks-redup hover:text-navy-900 hover:bg-white/60"
          }`}
        >
          3. Produksi & Kontak
        </button>
      </div>

      {/* STEP 1: Tentang Usaha (Frame 15) */}
      {step === 1 && (
        <div className="bg-white rounded-xl border border-garis shadow-kartu p-6 lg:p-8 space-y-6">
          <div className="border-b border-garis pb-4">
            <h2 className="text-h2 font-bold text-navy-900">
              Informasi Umum & Tentang Usaha
            </h2>
            <p className="text-body-sm text-teks-redup mt-0.5">
              Data dasar profil perusahaan fabrikasi besi make-to-order yang ditampilkan di halaman beranda dan profil website.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Nama Usaha"
              required
              value={profile.nama_perusahaan}
              onChange={(e) => handleUpdate("nama_perusahaan", e.target.value)}
              placeholder="Contoh: PT Handoko Bangkit Jaya"
            />
            <Input
              label="Subjudul Profil Usaha"
              required
              value={profile.bidang_usaha}
              onChange={(e) => handleUpdate("bidang_usaha", e.target.value)}
              placeholder="Contoh: Fabrikasi Besi & Konstruksi Make-to-Order"
            />
          </div>

          <Textarea
            label="Tentang Usaha (ditampilkan pada website)"
            required
            rows={5}
            value={profile.deskripsi}
            onChange={(e) => handleUpdate("deskripsi", e.target.value)}
            helperText="Deskripsikan latar belakang bengkel, spesialisasi pembuatan besi/baja custom, komitmen mutu SNI, dan area layanan."
          />

          {/* Upload foto perusahaan (dropzone preview) */}
          <div>
            <label className="block text-label font-medium text-teks-utama mb-2">
              Foto Perusahaan / Workshop
            </label>
            <div className="border-2 border-dashed border-garis hover:border-navy-700 transition-colors rounded-xl p-8 text-center bg-latar-halaman">
              <div className="w-12 h-12 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-3 text-navy-700">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-body-sm font-semibold text-navy-900 mb-1">
                Unggah foto perusahaan (JPG / PNG)
              </p>
              <p className="text-caption text-teks-redup">
                Pratinjau foto akan ditampilkan di halaman website profil utama. Ukuran maksimal 5MB.
              </p>
            </div>
          </div>

          {/* Wizard Footer Step 1 */}
          <div className="flex items-center justify-between pt-6 border-t border-garis">
            <span className="text-caption font-medium text-teks-redup">
              Langkah 1 dari 3
            </span>
            <div className="flex gap-3">
              <Link href="/admin/profil">
                <Button variant="outline-navy" size="md">
                  Batalkan
                </Button>
              </Link>
              <Button variant="utama" size="md" onClick={() => setStep(2)}>
                Selanjutnya →
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: Visi & Keunggulan (Frame 16) */}
      {step === 2 && (
        <div className="space-y-6">
          {/* Card 1: Visi & Misi */}
          <div className="bg-white rounded-xl border border-garis shadow-kartu p-6 lg:p-8 space-y-6">
            <div className="border-b border-garis pb-4">
              <h2 className="text-h2 font-bold text-navy-900">
                Visi & Misi Perusahaan
              </h2>
              <p className="text-body-sm text-teks-redup mt-0.5">
                Visi dan butir misi strategis perusahaan PT Handoko Bangkit Jaya.
              </p>
            </div>

            <Textarea
              label="Visi"
              required
              rows={3}
              value={profile.visi}
              onChange={(e) => handleUpdate("visi", e.target.value)}
              placeholder="Contoh: Menjadi mitra fabrikasi dan konstruksi besi terpercaya nomor satu..."
            />

            <div>
              <label className="block text-label font-medium text-teks-utama mb-2">
                Misi Perusahaan (4 Butir)
              </label>
              <div className="space-y-3">
                {profile.misi?.map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-center">
                    <span className="w-8 h-8 rounded-full bg-navy-100 text-navy-900 font-bold text-xs flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleMisiChange(idx, e.target.value)}
                      className="flex-1 px-3.5 py-2.5 rounded-lg border border-garis text-body text-teks-utama focus:outline-none focus:border-navy-700"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: 3 Kartu Keunggulan (Frame 16) */}
          <div className="bg-white rounded-xl border border-garis shadow-kartu p-6 lg:p-8 space-y-6">
            <div className="border-b border-garis pb-4">
              <h2 className="text-h2 font-bold text-navy-900">
                Kapasitas & Keunggulan
              </h2>
              <p className="text-body-sm text-teks-redup mt-0.5">
                Ubah judul dan keterangan tiga kartu yang ditampilkan pada website.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {profile.keunggulan?.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-garis bg-latar-halaman space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-oranye-500 bg-oranye-100 px-2.5 py-1 rounded">
                      Keunggulan {idx + 1}
                    </span>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-teks-redup mb-1">
                      Judul
                    </label>
                    <input
                      type="text"
                      value={item.judul}
                      onChange={(e) =>
                        handleKeunggulanChange(idx, "judul", e.target.value)
                      }
                      className="w-full px-3 py-2 rounded-lg border border-garis text-body-sm font-semibold text-navy-900 focus:outline-none focus:border-navy-700 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-teks-redup mb-1">
                      Deskripsi
                    </label>
                    <textarea
                      rows={4}
                      value={item.deskripsi}
                      onChange={(e) =>
                        handleKeunggulanChange(idx, "deskripsi", e.target.value)
                      }
                      className="w-full px-3 py-2 rounded-lg border border-garis text-body-sm text-teks-utama focus:outline-none focus:border-navy-700 bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Wizard Footer Step 2 */}
            <div className="flex items-center justify-between pt-6 border-t border-garis">
              <span className="text-caption font-medium text-teks-redup">
                Langkah 2 dari 3
              </span>
              <div className="flex gap-3">
                <Button
                  variant="outline-navy"
                  size="md"
                  onClick={() => setStep(1)}
                >
                  ← Kembali
                </Button>
                <Button variant="utama" size="md" onClick={() => setStep(3)}>
                  Selanjutnya →
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Produksi & Kontak (Frame 17, corrected title) */}
      {step === 3 && (
        <div className="space-y-6">
          {/* Card 1: 4 Tahap Alur Produksi */}
          <div className="bg-white rounded-xl border border-garis shadow-kartu p-6 lg:p-8 space-y-6">
            <div className="border-b border-garis pb-4">
              <h2 className="text-h2 font-bold text-navy-900">
                Alur Produksi
              </h2>
              <p className="text-body-sm text-teks-redup mt-0.5">
                Keempat tahap ini akan tampil berurutan di halaman Profil Usaha website.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profile.alur_produksi?.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-garis bg-latar-halaman space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-navy-900 text-white font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-label font-semibold text-navy-900">
                      Tahap {idx + 1} — Judul
                    </span>
                  </div>
                  <input
                    type="text"
                    value={item.judul}
                    onChange={(e) =>
                      handleAlurProduksiChange(idx, "judul", e.target.value)
                    }
                    className="w-full px-3 py-2 rounded-lg border border-garis text-body-sm font-semibold text-navy-900 focus:outline-none focus:border-navy-700 bg-white"
                  />
                  <div>
                    <label className="block text-xs font-medium text-teks-redup mb-1">
                      Deskripsi singkat
                    </label>
                    <textarea
                      rows={2}
                      value={item.deskripsi}
                      onChange={(e) =>
                        handleAlurProduksiChange(idx, "deskripsi", e.target.value)
                      }
                      className="w-full px-3 py-2 rounded-lg border border-garis text-body-sm text-teks-utama focus:outline-none focus:border-navy-700 bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Informasi Kontak & CTA (Frame 17) */}
          <div className="bg-white rounded-xl border border-garis shadow-kartu p-6 lg:p-8 space-y-6">
            <div className="border-b border-garis pb-4">
              <h2 className="text-h2 font-bold text-navy-900">
                Informasi Kontak & CTA
              </h2>
              <p className="text-body-sm text-teks-redup mt-0.5">
                Nomor WhatsApp, email, dan alamat resmi yang dihubungkan ke tombol chat otomatis dan kontak footer.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Nomor WhatsApp"
                required
                value={profile.whatsapp}
                onChange={(e) => handleUpdate("whatsapp", e.target.value)}
                placeholder="Contoh: 0895-6767-6767"
                helperText="Digunakan untuk integrasi tombol Hubungi WhatsApp di seluruh website."
              />
              <Input
                label="Email Perusahaan"
                required
                type="email"
                value={profile.email}
                onChange={(e) => handleUpdate("email", e.target.value)}
                placeholder="email@perusahaan.com"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Textarea
                label="Alamat Workshop & Kantor"
                required
                rows={3}
                value={profile.alamat}
                onChange={(e) => handleUpdate("alamat", e.target.value)}
                placeholder="Alamat lengkap bengkel fabrikasi..."
              />
              <div>
                <Input
                  label="Jam Layanan Operasional"
                  required
                  value={profile.jam_layanan}
                  onChange={(e) => handleUpdate("jam_layanan", e.target.value)}
                  placeholder="Senin–Sabtu, 08.00–16.00 WIB"
                  helperText="Tampil pada footer dan halaman kontak."
                />
              </div>
            </div>

            {/* Wizard Footer Step 3 */}
            <div className="flex items-center justify-between pt-6 border-t border-garis">
              <span className="text-caption font-medium text-teks-redup">
                Langkah 3 dari 3
              </span>
              <div className="flex gap-3">
                <Button
                  variant="outline-navy"
                  size="md"
                  onClick={() => setStep(2)}
                >
                  ← Kembali
                </Button>
                <Button
                  variant="utama"
                  size="md"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProfilEditWizardPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8">
          <div className="h-8 w-48 bg-navy-100 rounded animate-pulse mb-6" />
          <div className="h-96 bg-white rounded-lg border border-garis animate-pulse" />
        </div>
      }
    >
      <ProfilEditWizardContent />
    </Suspense>
  );
}

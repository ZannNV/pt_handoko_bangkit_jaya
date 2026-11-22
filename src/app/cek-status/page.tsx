"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { BadgeStatus } from "@/components/ui/badge-status";
import { checkOrderStatusAction, PublicOrderStatusResult } from "@/actions/customer-actions";
import {
  ChevronRight,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  HelpCircle,
  MessageCircle,
  FileText,
  Calendar,
  Layers,
  Info,
} from "lucide-react";

function CekStatusContent() {
  const searchParams = useSearchParams();
  const initialKode = searchParams.get("kode") || "";

  const [kodeInput, setKodeInput] = useState(initialKode);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PublicOrderStatusResult | null>(null);

  const handleSearch = async (codeToSearch?: string) => {
    const code = (codeToSearch || kodeInput).trim();
    if (!code) return;

    setIsLoading(true);
    setResult(null);

    try {
      const res = await checkOrderStatusAction(code);
      setResult(res);
    } catch {
      setResult({
        success: false,
        error: "Terjadi gangguan saat memproses pencarian status. Silakan coba lagi.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialKode) {
      handleSearch(initialKode);
    }
  }, [initialKode]);

  return (
    <div className="min-h-screen bg-page flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-[1280px] w-full mx-auto px-6 lg:px-8 py-8 flex flex-col gap-8 text-left">
        {/* Breadcrumb & Header Halaman (Frame 06) */}
        <div className="flex flex-col gap-2 border-b border-divider pb-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-kecil text-content-muted">
            <Link href="/" className="hover:text-navy-900 transition-colors">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-navy-900 font-semibold">Cek Status Pesanan</span>
          </nav>
          <div className="flex flex-col gap-1">
            <h1 className="text-display-sm sm:text-display font-bold text-navy-900 tracking-tight">
              Cek Status Pesanan
            </h1>
            <p className="text-isi text-content-muted max-w-2xl">
              Pantau perkembangan pesanan produk atau jasa konstruksi Anda secara berkala.
            </p>
          </div>
        </div>

        {/* Layout 2 Kolom: Pencarian & Detail di Kiri, Panduan di Kanan */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Kolom Kiri: Form Pencarian & Detail Hasil */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* Box Cari Pesanan Anda (Frame 06) */}
            <div className="bg-card rounded-2xl border border-divider shadow-card p-6 sm:p-8 flex flex-col gap-4">
              <div>
                <h2 className="text-h2 font-bold text-navy-900">
                  Cari Pesanan Anda
                </h2>
                <p className="text-isi text-content-muted mt-1">
                  Masukkan kode pesanan yang diterima setelah mengajukan pesanan.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
                className="flex flex-col sm:flex-row items-stretch gap-3 mt-1"
              >
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={kodeInput}
                    onChange={(e) => setKodeInput(e.target.value)}
                    placeholder="Contoh: HBJ-2026-0012"
                    className="w-full h-[46px] px-4 font-mono font-semibold rounded-lg border border-divider text-navy-900 placeholder:text-content-muted/60 focus:outline-none focus:border-orange-500 uppercase"
                  />
                </div>
                <Button
                  type="submit"
                  variant="utama"
                  size="md"
                  isLoading={isLoading}
                  className="sm:w-auto px-6 h-[46px]"
                  leftIcon={<Search className="w-4 h-4" />}
                >
                  Cek Status
                </Button>
              </form>
            </div>

            {/* Pesan Kesalahan / Tidak Ditemukan */}
            {result && !result.success && (
              <div className="bg-card rounded-2xl border border-status-danger-text/20 p-6 flex items-start gap-4 bg-status-danger-bg/40 animate-in fade-in">
                <AlertCircle className="w-6 h-6 text-status-danger-text shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold text-navy-900 text-isi">
                    Pesanan Tidak Ditemukan
                  </h3>
                  <p className="text-isi text-status-danger-text">
                    {result.error}
                  </p>
                  <p className="text-kecil text-content-muted mt-2">
                    Tip: Periksa kembali email atau pesan konfirmasi pengajuan untuk memastikan kode pesanan sudah sesuai.
                  </p>
                </div>
              </div>
            )}

            {/* Hasil Detail Status Pesanan (Frame 06) */}
            {result && result.success && result.order && (
              <div className="bg-card rounded-2xl border border-divider shadow-card p-6 sm:p-8 flex flex-col gap-8 animate-in fade-in">
                {/* Header Hasil */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-divider pb-5">
                  <div>
                    <h2 className="text-h2 font-bold text-navy-900">
                      Detail Status Pesanan
                    </h2>
                    <span className="text-kecil text-content-muted">
                      Data status publik resmi PT Handoko Bangkit Jaya
                    </span>
                  </div>
                  <div className="self-start sm:self-auto">
                    <BadgeStatus size="md">{result.order.status}</BadgeStatus>
                  </div>
                </div>

                {/* Grid Rincian Pesanan (Hanya Data Publik Aman) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-latar-halaman p-5 rounded-xl border border-divider">
                  <div>
                    <span className="text-kecil text-content-muted block mb-1">
                      Nomor Pesanan
                    </span>
                    <span className="text-h3 font-mono font-bold text-navy-900">
                      {result.order.kode}
                    </span>
                  </div>
                  <div>
                    <span className="text-kecil text-content-muted block mb-1">
                      Tanggal Pengajuan
                    </span>
                    <span className="text-h3 font-semibold text-content-primary">
                      {result.order.tanggal}
                    </span>
                  </div>
                  <div>
                    <span className="text-kecil text-content-muted block mb-1">
                      Jenis Pesanan
                    </span>
                    <span className="text-h3 font-semibold text-content-primary">
                      {result.order.nama_produk}
                    </span>
                  </div>
                </div>

                {/* Progres Pesanan Stepper 4 Tahap (Frame 06) */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-h3 font-bold text-navy-900">
                    Progres Pesanan
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {result.order.timeline.map((step) => {
                      return (
                        <div
                          key={step.step}
                          className={`p-4 rounded-xl border flex flex-col gap-2 relative transition-all ${
                            step.isCurrent
                              ? "bg-orange-100/40 border-orange-500 shadow-sm"
                              : step.isCompleted
                              ? "bg-card border-status-success-text/40"
                              : "bg-latar-halaman/60 border-divider opacity-70"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${
                                step.isCompleted
                                  ? "bg-status-success-bg text-status-success-text border border-status-success-text/30"
                                  : step.isCurrent
                                  ? "bg-orange-500 text-white"
                                  : "bg-latar-halaman text-content-muted border border-divider"
                              }`}
                            >
                              {step.isCompleted ? "✓" : step.step}
                            </span>

                            {step.isCurrent && (
                              <span className="text-[11px] font-bold uppercase tracking-wider text-orange-500 bg-orange-100 px-2 py-0.5 rounded">
                                Saat Ini
                              </span>
                            )}
                          </div>

                          <div>
                            <span className="text-tombol font-bold text-navy-900 block">
                              {step.label}
                            </span>
                            <span className="text-kecil text-content-muted block mt-0.5">
                              {step.tanggal ? step.tanggal : step.isCompleted ? "Telah selesai" : "Menunggu"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Catatan Progres Publik (Frame 06) */}
                <div className="p-4 rounded-xl bg-latar-halaman border border-divider flex items-start gap-3">
                  <Info className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-label font-bold text-navy-900">
                      Catatan Progres Publik:
                    </span>
                    <p className="text-isi text-content-primary mt-0.5 leading-relaxed">
                      {result.order.catatan_terbaru}
                    </p>
                  </div>
                </div>

                {/* Hubungi Admin untuk Info Lanjutan */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-divider">
                  <span className="text-kecil text-content-muted">
                    Membutuhkan perubahan ukuran atau konsultasi lanjutan terkait pesanan ini?
                  </span>
                  <Link
                    href={`/hubungi?produk=${encodeURIComponent(
                      `${result.order.nama_produk} (${result.order.kode})`
                    )}`}
                  >
                    <Button
                      variant="outline-navy"
                      size="sm"
                      leftIcon={<MessageCircle className="w-4 h-4 text-orange-500" />}
                    >
                      Hubungi Admin
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Kolom Kanan: Panduan Status Pesanan & Bantuan (Frame 06) */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            {/* Card 1: Panduan Status Pesanan (Frame 06) */}
            <div className="bg-card rounded-2xl border border-divider shadow-card p-6 flex flex-col gap-5">
              <h3 className="text-h3 font-bold text-navy-900 border-b border-divider pb-3">
                Panduan Status Pesanan
              </h3>

              <div className="flex flex-col gap-4">
                {[
                  {
                    step: 1,
                    title: "Diajukan",
                    desc: "Pesanan berhasil dikirim dan masuk ke antrean verifikasi admin.",
                  },
                  {
                    step: 2,
                    title: "Ditinjau",
                    desc: "Admin memeriksa permintaan, kebutuhan survei lokasi, dan penyusunan RAB.",
                  },
                  {
                    step: 3,
                    title: "Diproses",
                    desc: "Pengerjaan fabrikasi dan pengelasan besi sedang berlangsung di workshop.",
                  },
                  {
                    step: 4,
                    title: "Selesai",
                    desc: "Pesanan selesai dikerjakan, pemasangan tuntas, dan serah terima ke klien.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-navy-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {item.step}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-tombol font-bold text-navy-900">
                        {item.title}
                      </span>
                      <span className="text-kecil text-content-muted leading-relaxed">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2: Butuh Bantuan? (Frame 06) */}
            <div className="bg-card rounded-2xl border border-divider shadow-card p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-500 flex items-center justify-center">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <h3 className="text-h3 font-bold text-navy-900">
                  Butuh bantuan?
                </h3>
              </div>
              <p className="text-isi text-content-muted leading-relaxed">
                Hubungi admin jika ada kendala atau pertanyaan seputar status dan jadwal pengerjaan pesanan Anda.
              </p>
              <Link href="/hubungi">
                <Button
                  variant="utama"
                  size="md"
                  className="w-full justify-center"
                  leftIcon={<MessageCircle className="w-4 h-4" />}
                >
                  Hubungi via WhatsApp
                </Button>
              </Link>
              <span className="text-kecil text-content-muted text-center block">
                Jam layanan: Senin–Sabtu, 08.00–16.00 WIB
              </span>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function CekStatusPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-page flex items-center justify-center">
          <div className="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CekStatusContent />
    </Suspense>
  );
}

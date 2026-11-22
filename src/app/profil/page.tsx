import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { getCompanyProfile } from "@/lib/data/store";
import {
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Wrench,
  Award,
  Clock,
  Compass,
  Target,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

export const metadata = {
  title: "Profil Usaha | PT Handoko Bangkit Jaya",
  description:
    "Profil usaha, visi & misi, kapasitas keunggulan, alur produksi, dan informasi kontak bengkel fabrikasi besi PT Handoko Bangkit Jaya di Karawang.",
};

export default function ProfilUsahaWebPage() {
  const profile = getCompanyProfile();

  return (
    <div className="min-h-screen bg-page flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-[1280px] w-full mx-auto px-6 lg:px-8 py-8 flex flex-col gap-12 text-left">
        {/* Breadcrumb & Header Halaman (Frame 04) */}
        <div className="flex flex-col gap-2 border-b border-divider pb-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-kecil text-content-muted">
            <Link href="/" className="hover:text-navy-900 transition-colors">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-navy-900 font-semibold">Profil Usaha</span>
          </nav>
          <div className="flex flex-col gap-1">
            <h1 className="text-display-sm sm:text-display font-bold text-navy-900 tracking-tight">
              Profil Usaha
            </h1>
            <p className="text-isi text-content-muted max-w-2xl">
              Mengenal lebih dekat {profile.nama_perusahaan}, spesialis fabrikasi dan konstruksi besi make-to-order di Jawa Barat.
            </p>
          </div>
        </div>

        {/* Seksi 1: Tentang Usaha (Frame 04) */}
        <section className="bg-card rounded-2xl border border-divider shadow-card p-8 sm:p-10 flex flex-col gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center shrink-0">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-label font-bold uppercase tracking-wider text-orange-500 block">
                    Tentang Usaha
                  </span>
                  <h2 className="text-h1 font-bold text-navy-900">
                    {profile.nama_perusahaan}
                  </h2>
                </div>
              </div>
              <p className="text-isi sm:text-h3 text-content-primary leading-relaxed">
                {profile.deskripsi}
              </p>
            </div>
            {profile.foto_workshop && (
              <div className="lg:col-span-5 flex flex-col gap-2">
                <div className="relative h-64 sm:h-72 rounded-xl overflow-hidden border border-divider shadow-sm group">
                  <Image
                    src={profile.foto_workshop}
                    alt={`Workshop ${profile.nama_perusahaan}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-navy-900/90 via-navy-900/50 to-transparent p-3.5 text-white text-kecil font-medium flex items-center justify-between">
                    <span className="truncate pr-2">Bengkel & Workshop Karawang</span>
                    <a
                      href="https://maps.app.goo.gl/U3JW67qD13SPh9kb6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 text-xs font-semibold shrink-0"
                    >
                      Buka Google Maps ↗
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Seksi 2: Visi & Misi (Frame 04) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Kartu Visi */}
          <div className="bg-card rounded-2xl border border-divider shadow-card p-8 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-orange-500">
              <div className="w-9 h-9 rounded-lg bg-orange-100 flex items-center justify-center font-bold">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-h2 font-bold text-navy-900">Visi</h3>
            </div>
            <p className="text-isi text-content-muted leading-relaxed">
              {profile.visi}
            </p>
          </div>

          {/* Kartu Misi */}
          <div className="bg-card rounded-2xl border border-divider shadow-card p-8 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-navy-900">
              <div className="w-9 h-9 rounded-lg bg-navy-100 flex items-center justify-center font-bold text-navy-900">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-h2 font-bold text-navy-900">Misi</h3>
            </div>
            <ul className="space-y-3">
              {profile.misi.map((m, idx) => (
                <li key={idx} className="flex items-start gap-3 text-isi text-content-muted">
                  <span className="w-5 h-5 rounded-full bg-navy-100 text-navy-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Seksi 3: Kapasitas & Keunggulan (Frame 04: 3 Kartu) */}
        <section className="flex flex-col gap-6">
          <div className="border-b border-divider pb-4">
            <span className="text-label font-bold uppercase tracking-wider text-orange-500 block mb-1">
              Standar & Mutu
            </span>
            <h2 className="text-h1 font-bold text-navy-900">
              Kapasitas & Keunggulan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {profile.keunggulan.map((k, idx) => (
              <div
                key={idx}
                className="bg-card rounded-xl border border-divider shadow-card p-6 flex flex-col gap-3 hover:border-navy-700/40 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-latar-halaman text-navy-900 flex items-center justify-center font-bold">
                  {idx === 0 && <ShieldCheck className="w-5 h-5 text-orange-500" />}
                  {idx === 1 && <Wrench className="w-5 h-5 text-orange-500" />}
                  {idx === 2 && <Award className="w-5 h-5 text-orange-500" />}
                </div>
                <h3 className="text-h3 font-bold text-navy-900">{k.judul}</h3>
                <p className="text-isi text-content-muted leading-relaxed">
                  {k.deskripsi}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Seksi 4: Alur Produksi (Frame 04: 4 Tahap) */}
        <section className="flex flex-col gap-6">
          <div className="border-b border-divider pb-4">
            <span className="text-label font-bold uppercase tracking-wider text-orange-500 block mb-1">
              Transparansi Pengerjaan
            </span>
            <h2 className="text-h1 font-bold text-navy-900">
              Alur Produksi Fabrikasi
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {profile.alur_produksi.map((tahap, idx) => (
              <div
                key={idx}
                className="bg-card rounded-xl border border-divider shadow-card p-6 flex flex-col gap-3 relative"
              >
                <div className="w-9 h-9 rounded-full bg-navy-900 text-white font-bold text-label flex items-center justify-center">
                  {idx + 1}
                </div>
                <h3 className="text-h3 font-bold text-navy-900">
                  {tahap.judul}
                </h3>
                <p className="text-isi text-content-muted leading-relaxed">
                  {tahap.deskripsi}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Seksi 5: Banner Ajakan CTA (Frame 04 - Audit #8 Teks Riil) dengan background bangunan overlay */}
        <section className="relative overflow-hidden text-white rounded-2xl p-8 sm:p-12 text-center flex flex-col items-center gap-6">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/building-hbj.jpg"
              alt="Workshop PT Handoko Bangkit Jaya"
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-900/85 to-navy-900/75" />
          </div>
          <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl">
            <h2 className="text-display-sm sm:text-h1 font-bold text-white tracking-tight">
              Tertarik Memesan Produk Kami?
            </h2>
            <p className="text-isi sm:text-h3 text-content-mutedOnDark max-w-xl">
              Diskusikan rancangan kebutuhan pagar, rak, kanopi, atau konstruksi besi custom Anda bersama tim ahli kami.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/ajukan-pesanan">
                <Button variant="utama" size="lg">
                  Ajukan Pesanan
                </Button>
              </Link>
              <Link href="/hubungi">
                <Button
                  variant="outline-navy"
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                  leftIcon={<MessageCircle className="w-4 h-4 text-orange-500" />}
                >
                  Hubungi via WhatsApp
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/cards/product-card";
import { PortfolioCard } from "@/components/cards/portfolio-card";
import { getProducts, getPortfolios, getCompanyProfile } from "@/lib/data/store";
import { formatTanggal } from "@/lib/utils";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Wrench,
  Award,
  Clock,
  MessageCircle,
} from "lucide-react";

export const metadata = {
  title: "Beranda | PT Handoko Bangkit Jaya - Fabrikasi Besi Make-to-Order",
  description:
    "Solusi konstruksi dan fabrikasi besi make-to-order terpercaya di Karawang. Melayani pagar minimalis, kanopi, railing, rak gudang, dan pintu besi custom.",
};

export default function HomePage() {
  const profile = getCompanyProfile();
  const products = getProducts({ status: "Tayang" }).slice(0, 4);
  const portfolios = getPortfolios({ onlyVisible: true }).slice(0, 4);

  return (
    <div className="min-h-screen bg-page flex flex-col">
      {/* 1. Navbar Publik */}
      <Navbar />

      <main className="flex-1 flex flex-col">
        {/* 2. Hero - Informasi Perusahaan (Frame 01) dengan Foto Bangunan Overlay Transparan */}
        <section className="relative overflow-hidden text-white py-16 lg:py-24 px-6 lg:px-12 border-b border-navy-700/50">
          {/* Background: Foto Bangunan PT Handoko Bangkit Jaya */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/building-hbj.jpg"
              alt="Bangunan Workshop PT Handoko Bangkit Jaya"
              fill
              sizes="100vw"
              className="object-cover object-center"
              priority
              unoptimized
            />
            {/* Overlay transparan gelap agar foto bangunan terlihat & teks putih sangat jelas (tidak samar) */}
            <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-900/80 to-navy-900/50" />
            {/* Bottom fade */}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-navy-900 to-transparent" />
          </div>

          <div className="relative z-10 max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Teks Hero */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-700/80 border border-white/20 text-orange-400 text-label font-semibold w-fit shadow-md">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                <span>Fabrikasi Besi & Baja Make-to-Order Karawang</span>
              </div>

              <h1 className="text-display sm:text-[48px] font-bold text-white tracking-tight leading-[1.15] drop-shadow-md">
                Solusi Konstruksi Besi dan Baja Berkualitas
              </h1>

              <p className="text-isi sm:text-h3 text-slate-100 font-normal leading-relaxed max-w-xl drop-shadow-xs">
                {profile.nama_perusahaan}, usaha fabrikasi besi make-to-order terpercaya. Melayani kebutuhan pagar, rak, kanopi, railing, dan pesanan besi custom dengan jaminan presisi dan bahan SNI.
              </p>

              {/* Tombol Hero */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/katalog?tab=portofolio">
                  <Button variant="utama" size="lg">
                    Lihat Portofolio
                  </Button>
                </Link>
                <Link href="/hubungi">
                  <Button
                    variant="outline-navy"
                    size="lg"
                    className="border-white text-white hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                    leftIcon={<MessageCircle className="w-4 h-4 text-orange-500" />}
                  >
                    Hubungi via WhatsApp
                  </Button>
                </Link>
                <Link href="/ajukan-pesanan">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-white hover:bg-white/10 font-medium"
                    rightIcon={<ArrowRight className="w-4 h-4 text-white" />}
                  >
                    Ajukan Pesanan Custom
                  </Button>
                </Link>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/20 mt-2">
                <div>
                  <span className="block text-h2 font-bold text-orange-500">15+</span>
                  <span className="text-kecil text-slate-200">Tahun Pengalaman</span>
                </div>
                <div>
                  <span className="block text-h2 font-bold text-white">500+</span>
                  <span className="text-kecil text-slate-200">Proyek Fabrikasi Selesai</span>
                </div>
                <div>
                  <span className="block text-h2 font-bold text-white">100%</span>
                  <span className="text-kecil text-slate-200">Garansi & Material SNI</span>
                </div>
              </div>
            </div>

            {/* Visual Hero: Logo Perusahaan Sesuai Awal */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative rounded-2xl overflow-hidden border-2 border-white/20 bg-white/10 backdrop-blur-md p-6 sm:p-8 shadow-2xl w-full max-w-[420px]">
                <div className="flex flex-col items-center justify-center gap-6 text-center">
                  <div className="relative w-48 h-48 sm:w-56 sm:h-56">
                    <Image
                      src="/images/logo-hbj.jpg"
                      alt="Logo PT Handoko Bangkit Jaya"
                      fill
                      sizes="224px"
                      className="object-contain drop-shadow-2xl"
                      priority
                      unoptimized
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-h2 font-bold text-white drop-shadow-md">
                      PT Handoko Bangkit Jaya
                    </h2>
                    <p className="text-label text-content-mutedOnDark">
                      MEP Contractor & Subcontractor
                    </p>
                  </div>
                  <div className="flex items-center gap-3 bg-navy-900/80 px-4 py-2 rounded-lg border border-white/20 shadow-md">
                    <CheckCircle2 className="w-4 h-4 text-status-success-text" />
                    <span className="text-label text-white font-medium">Bahan SNI & Cat Anti Karat</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Seksi - Produk / Layanan Unggulan (Frame 01) */}
        <section className="py-16 px-6 lg:px-12 max-w-[1280px] w-full mx-auto text-left">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-label font-bold uppercase tracking-wider text-orange-500 block mb-1">
                Katalog Pilihan
              </span>
              <h2 className="text-display-sm sm:text-h1 font-bold text-navy-900">
                Produk / Layanan Unggulan
              </h2>
            </div>
            <Link
              href="/katalog?tab=produk"
              className="inline-flex items-center gap-1.5 text-tombol font-semibold text-navy-900 hover:text-orange-500 transition-colors"
            >
              <span>Lihat semua produk</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((prod) => (
              <ProductCard
                key={prod.id}
                title={prod.nama}
                description={prod.deskripsi}
                imageUrl={prod.gambar_url}
                href={`/katalog/${prod.slug}`}
              />
            ))}
          </div>
        </section>

        {/* 4. Seksi - Portofolio Pilihan (Frame 01) */}
        <section className="py-16 px-6 lg:px-12 bg-latar-kartu border-y border-divider">
          <div className="max-w-[1280px] w-full mx-auto text-left">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-label font-bold uppercase tracking-wider text-orange-500 block mb-1">
                  Hasil Pengerjaan Nyata
                </span>
                <h2 className="text-display-sm sm:text-h1 font-bold text-navy-900">
                  Portofolio Pilihan
                </h2>
              </div>
              <Link
                href="/katalog?tab=portofolio"
                className="inline-flex items-center gap-1.5 text-tombol font-semibold text-navy-900 hover:text-orange-500 transition-colors"
              >
                <span>Lihat semua portofolio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {portfolios.map((item) => (
                <PortfolioCard
                  key={item.id}
                  title={item.judul}
                  category={item.kategori?.nama || "Fabrikasi Besi"}
                  date={formatTanggal(item.tanggal_selesai)}
                  imageUrl={item.gambar_utama}
                  href={`/katalog/${item.slug}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 5. Seksi - 3 Keunggulan Kami (Dari Profil Usaha) */}
        <section className="py-16 px-6 lg:px-12 max-w-[1280px] w-full mx-auto text-left">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-label font-bold uppercase tracking-wider text-orange-500 block mb-1">
              Mengapa Memilih Kami
            </span>
            <h2 className="text-display-sm sm:text-h1 font-bold text-navy-900">
              Keunggulan Fabrikasi PT Handoko Bangkit Jaya
            </h2>
            <p className="text-isi text-content-muted mt-2">
              Komitmen kami adalah memberikan hasil pengerjaan besi dan baja yang presisi, tahan lama, dan bergaransi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {profile.keunggulan.map((item, idx) => (
              <div
                key={idx}
                className="p-8 rounded-xl bg-card border border-divider shadow-card flex flex-col gap-4 text-left hover:border-navy-700/50 transition-all hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center font-bold text-h3">
                  {idx === 0 && <ShieldCheck className="w-6 h-6" />}
                  {idx === 1 && <Award className="w-6 h-6" />}
                  {idx === 2 && <Clock className="w-6 h-6" />}
                </div>
                <h3 className="text-h3 font-bold text-navy-900">{item.judul}</h3>
                <p className="text-isi text-content-muted leading-relaxed">
                  {item.deskripsi}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Banner CTA Ajukan Pesanan - dengan background bangunan overlay */}
        <section className="relative overflow-hidden text-white py-12 px-6 lg:px-12 text-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/building-hbj.jpg"
              alt="Workshop PT Handoko Bangkit Jaya"
              fill
              sizes="100vw"
              className="object-cover object-center"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-900/85 to-navy-900/75" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6">
            <h2 className="text-display-sm sm:text-h1 font-bold text-white tracking-tight">
              Punya Rencana Desain Pagar, Kanopi, atau Rak Custom?
            </h2>
            <p className="text-isi sm:text-h3 text-content-mutedOnDark max-w-xl">
              Diskusikan dimensi dan spesifikasi yang Anda inginkan. Tim teknis kami siap melakukan survei dan menyusun penawaran anggaran transparan.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/ajukan-pesanan">
                <Button variant="utama" size="lg">
                  Ajukan Pesanan Sekarang
                </Button>
              </Link>
              <Link href="/hubungi">
                <Button
                  variant="outline-navy"
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                >
                  Konsultasi via WhatsApp
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* 7. Footer Kontak */}
      <Footer />
    </div>
  );
}

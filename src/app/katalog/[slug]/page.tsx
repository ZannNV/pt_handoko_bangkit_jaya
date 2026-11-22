import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { BadgeStatus } from "@/components/ui/badge-status";
import { PortfolioCard } from "@/components/cards/portfolio-card";
import { DetailGallery } from "./detail-gallery";
import {
  getPortfolioBySlug,
  getProductBySlug,
  getPortfolios,
} from "@/lib/data/store";
import { formatTanggal } from "@/lib/utils";
import {
  ChevronRight,
  Calendar,
  MessageCircle,
  FileEdit,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Wrench,
} from "lucide-react";

interface DetailPageProps {
  params: {
    slug: string;
  };
}

export function generateMetadata({ params }: DetailPageProps) {
  const portfolio = getPortfolioBySlug(params.slug);
  const product = getProductBySlug(params.slug);
  const title = portfolio?.judul || product?.nama || "Detail Produk";

  return {
    title: `${title} | PT Handoko Bangkit Jaya`,
    description:
      portfolio?.deskripsi ||
      product?.deskripsi ||
      "Spesifikasi fabrikasi besi custom make-to-order PT Handoko Bangkit Jaya.",
  };
}

export default function DetailKatalogPage({ params }: DetailPageProps) {
  const portfolio = getPortfolioBySlug(params.slug);
  const product = getProductBySlug(params.slug);

  if (!portfolio && !product) {
    notFound();
  }

  const isPortfolio = !!portfolio;
  const title = isPortfolio ? portfolio.judul : product!.nama;
  const description = isPortfolio ? portfolio.deskripsi : product!.deskripsi;
  const categoryName = isPortfolio
    ? portfolio.kategori?.nama || "Fabrikasi Besi"
    : product!.kategori?.nama || "Fabrikasi Besi";
  const dateFormatted = isPortfolio
    ? formatTanggal(portfolio.tanggal_selesai)
    : formatTanggal(product!.created_at);
  const mainImage = isPortfolio ? portfolio.gambar_utama : product!.gambar_url;
  const galleryImages =
    isPortfolio && portfolio.media && portfolio.media.length > 0
      ? portfolio.media.map((m) => m.url)
      : [mainImage].filter(Boolean) as string[];

  // Proyek terkait (ambil hingga 4 item portofolio lain)
  const relatedProjects = getPortfolios({ onlyVisible: true })
    .filter((p) => p.slug !== params.slug)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-page flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-[1280px] w-full mx-auto px-6 lg:px-8 py-8 flex flex-col gap-10 text-left">
        {/* Breadcrumb (Frame 03) */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-kecil text-content-muted">
          <Link href="/" className="hover:text-navy-900 transition-colors">
            Beranda
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/katalog" className="hover:text-navy-900 transition-colors">
            Katalog
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-navy-900 font-semibold truncate max-w-xs sm:max-w-md">
            {title}
          </span>
        </nav>

        {/* Isi Detail 2 Kolom (Frame 03) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Kolom Kiri: Galeri Media Interaktif (Frame 03) */}
          <div className="lg:col-span-7">
            <DetailGallery
              initialImage={mainImage}
              images={galleryImages}
              title={title}
            />
          </div>

          {/* Kolom Kanan: Informasi Proyek & Kotak Kontak (Frame 03) */}
          <div className="lg:col-span-5 flex flex-col gap-6 bg-card rounded-2xl border border-divider shadow-card p-6 sm:p-8">
            <div className="flex flex-col gap-2.5">
              <span className="w-fit">
                <BadgeStatus variant="info">{categoryName}</BadgeStatus>
              </span>
              <h1 className="text-display-sm sm:text-h1 font-bold text-navy-900 leading-tight">
                {title}
              </h1>
              {/* Meta: Audit #4 Format tanggal selesai utuh dd-mm-yyyy */}
              <div className="flex items-center gap-2 text-kecil text-content-muted pt-1">
                <Calendar className="w-4 h-4 text-orange-500" />
                <span>
                  Tanggal selesai: <strong>{dateFormatted}</strong>
                </span>
                <span>•</span>
                <span>Produk: <strong>{categoryName}</strong></span>
              </div>
            </div>

            {/* Deskripsi Proyek */}
            <div className="border-t border-divider pt-5 flex flex-col gap-2">
              <h2 className="text-label font-bold uppercase tracking-wider text-navy-900">
                Deskripsi Proyek & Spesifikasi
              </h2>
              <p className="text-isi text-content-muted leading-relaxed">
                {description}
              </p>
            </div>

            {/* Keunggulan Spesifikasi */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-kecil text-content-primary">
                <CheckCircle2 className="w-4 h-4 text-status-success-text shrink-0" />
                <span>Material Standar SNI</span>
              </div>
              <div className="flex items-center gap-2 text-kecil text-content-primary">
                <CheckCircle2 className="w-4 h-4 text-status-success-text shrink-0" />
                <span>Finishing Anti Karat</span>
              </div>
              <div className="flex items-center gap-2 text-kecil text-content-primary">
                <CheckCircle2 className="w-4 h-4 text-status-success-text shrink-0" />
                <span>Las Bersertifikat</span>
              </div>
              <div className="flex items-center gap-2 text-kecil text-content-primary">
                <CheckCircle2 className="w-4 h-4 text-status-success-text shrink-0" />
                <span>Garansi Pemasangan</span>
              </div>
            </div>

            {/* Kotak Kontak & CTA (Frame 03) */}
            <div className="p-5 rounded-xl bg-latar-halaman border border-divider flex flex-col gap-4 mt-2">
              <div>
                <h3 className="text-h3 font-bold text-navy-900">
                  Tertarik dengan produk ini?
                </h3>
                <p className="text-kecil text-content-muted mt-0.5">
                  Diskusikan spesifikasi ukuran, material, dan estimasi harga penawaran langsung dengan tim kami.
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                <Link
                  href={`/hubungi?produk=${encodeURIComponent(title)}`}
                  className="w-full"
                >
                  <Button
                    variant="utama"
                    size="md"
                    className="w-full justify-center"
                    leftIcon={<MessageCircle className="w-4 h-4" />}
                  >
                    Hubungi via WhatsApp
                  </Button>
                </Link>
                <Link
                  href={`/ajukan-pesanan?produk=${encodeURIComponent(title)}`}
                  className="w-full"
                >
                  <Button
                    variant="outline-navy"
                    size="md"
                    className="w-full justify-center"
                    leftIcon={<FileEdit className="w-4 h-4" />}
                  >
                    Ajukan Pesanan Custom
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Seksi - Proyek Terkait (Frame 03) */}
        {relatedProjects.length > 0 && (
          <section className="border-t border-divider pt-12 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-label font-bold uppercase tracking-wider text-orange-500 block">
                  Rekomendasi Lain
                </span>
                <h2 className="text-h1 font-bold text-navy-900">
                  Proyek Terkait
                </h2>
              </div>
              <Link
                href="/katalog"
                className="inline-flex items-center gap-1.5 text-tombol font-semibold text-navy-900 hover:text-orange-500 transition-colors"
              >
                <span>Lihat katalog lengkap</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProjects.map((item) => (
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
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SearchInput } from "@/components/ui/search-input";
import { Select } from "@/components/ui/select";
import { ProductCard } from "@/components/cards/product-card";
import { PortfolioCard } from "@/components/cards/portfolio-card";
import { Pagination } from "@/components/ui/pagination";
import { getCategories, getProducts, getPortfolios } from "@/lib/data/store";
import { Kategori, Produk, Portofolio } from "@/lib/types";
import { formatTanggal } from "@/lib/utils";
import { ChevronRight, Filter, Package, Briefcase } from "lucide-react";

function KatalogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabParam = (searchParams.get("tab") as "produk" | "portofolio") || "portofolio";
  const [activeTab, setActiveTab] = useState<"produk" | "portofolio">(tabParam);
  const [categories, setCategories] = useState<Kategori[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("terbaru");
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setCategories(getCategories());
  }, []);

  useEffect(() => {
    if (tabParam === "produk" || tabParam === "portofolio") {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  // Load products & portfolios
  const allProducts = getProducts({
    search: searchQuery,
    kategori_id: selectedCategory !== "Semua" ? selectedCategory : undefined,
    status: "Tayang",
  });

  const allPortfolios = getPortfolios({
    search: searchQuery,
    kategori_id: selectedCategory !== "Semua" ? selectedCategory : undefined,
    status_tampil: true,
  });

  // Sort
  const sortedProducts = [...allProducts].sort((a, b) => {
    if (sortBy === "nama") return a.nama.localeCompare(b.nama);
    return 0;
  });

  const sortedPortfolios = [...allPortfolios].sort((a, b) => {
    if (sortBy === "nama") return a.judul.localeCompare(b.judul);
    return new Date(b.tanggal_selesai).getTime() - new Date(a.tanggal_selesai).getTime();
  });

  // Pagination (6 items per page)
  const itemsPerPage = 6;
  const activeItems = activeTab === "produk" ? sortedProducts : sortedPortfolios;
  const totalPages = Math.ceil(activeItems.length / itemsPerPage) || 1;
  const paginatedItems = activeItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleTabChange = (tab: "produk" | "portofolio") => {
    setActiveTab(tab);
    setCurrentPage(1);
    router.replace(`/katalog?tab=${tab}`);
  };

  return (
    <div className="min-h-screen bg-page flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-[1280px] w-full mx-auto px-6 lg:px-8 py-8 flex flex-col gap-8 text-left">
        {/* Judul Halaman & Breadcrumb (Frame 02) */}
        <div className="flex flex-col gap-2 border-b border-divider pb-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-kecil text-content-muted">
            <Link href="/" className="hover:text-navy-900 transition-colors">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-navy-900 font-semibold">Katalog</span>
          </nav>
          <h1 className="text-display-sm sm:text-display font-bold text-navy-900 tracking-tight">
            Katalog Produk dan Portofolio
          </h1>
          <p className="text-isi text-content-muted">
            Jelajahi ragam produk fabrikasi besi dan dokumentasi hasil pengerjaan proyek nyata PT Handoko Bangkit Jaya.
          </p>
        </div>

        {/* Layout Utama: Sidebar Filter + Konten Katalog */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Kolom Kiri: Filter Sederhana (Frame 02) */}
          <aside className="lg:col-span-3 bg-card rounded-xl border border-divider shadow-card p-5 flex flex-col gap-6">
            <div className="flex items-center gap-2 font-bold text-h3 text-navy-900 border-b border-divider pb-3">
              <Filter className="w-4 h-4 text-orange-500" />
              <span>Filter Katalog</span>
            </div>

            {/* Pencarian */}
            <div className="flex flex-col gap-2">
              <label className="text-label font-semibold text-content-primary">
                Cari Produk / Proyek
              </label>
              <SearchInput
                placeholder="Cari produk atau proyek..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                onClear={() => setSearchQuery("")}
              />
            </div>

            {/* Filter Kategori (Radio) */}
            <div className="flex flex-col gap-2.5">
              <label className="text-label font-semibold text-content-primary">
                Kategori Produk
              </label>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2.5 cursor-pointer text-isi text-content-primary hover:text-navy-900">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === "Semua"}
                    onChange={() => {
                      setSelectedCategory("Semua");
                      setCurrentPage(1);
                    }}
                    className="w-4 h-4 text-orange-500 focus:ring-orange-500 border-divider"
                  />
                  <span>Semua Kategori</span>
                </label>
                {categories.map((cat) => (
                  <label
                    key={cat.id}
                    className="flex items-center gap-2.5 cursor-pointer text-isi text-content-primary hover:text-navy-900"
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat.id}
                      onChange={() => {
                        setSelectedCategory(cat.id);
                        setCurrentPage(1);
                      }}
                      className="w-4 h-4 text-orange-500 focus:ring-orange-500 border-divider"
                    />
                    <span>{cat.nama}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Dropdown Urutkan */}
            <div className="flex flex-col gap-2">
              <Select
                label="Urutkan"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                options={[
                  { label: "Terbaru", value: "terbaru" },
                  { label: "Nama (A - Z)", value: "nama" },
                ]}
              />
            </div>
          </aside>

          {/* Kolom Kanan: Konten Katalog (Frame 02) */}
          <div className="lg:col-span-9 flex flex-col gap-6">
            {/* Tab Jenis Konten: Produk vs Portofolio */}
            <div className="flex items-center justify-between border-b border-divider pb-3">
              <div className="flex items-center gap-2 bg-latar-halaman p-1 rounded-xl border border-divider">
                <button
                  type="button"
                  onClick={() => handleTabChange("portofolio")}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-tombol font-semibold transition-all ${
                    activeTab === "portofolio"
                      ? "bg-navy-900 text-white shadow-sm"
                      : "text-content-muted hover:text-navy-900"
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Portofolio ({allPortfolios.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleTabChange("produk")}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-tombol font-semibold transition-all ${
                    activeTab === "produk"
                      ? "bg-navy-900 text-white shadow-sm"
                      : "text-content-muted hover:text-navy-900"
                  }`}
                >
                  <Package className="w-4 h-4" />
                  <span>Produk & Layanan ({allProducts.length})</span>
                </button>
              </div>

              <span className="text-kecil text-content-muted hidden sm:inline">
                Menampilkan {paginatedItems.length} dari {activeItems.length} item
              </span>
            </div>

            {/* Grid Kartu (3 Kolom) */}
            {paginatedItems.length === 0 ? (
              <div className="p-12 text-center bg-card rounded-xl border border-divider flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-navy-100 flex items-center justify-center text-navy-700">
                  <Filter className="w-6 h-6" />
                </div>
                <h3 className="text-h3 font-semibold text-navy-900">
                  Tidak Ada Hasil yang Cocok
                </h3>
                <p className="text-isi text-content-muted max-w-sm">
                  Coba ubah kata kunci pencarian atau pilih kategori lainnya.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("Semua");
                    setSearchQuery("");
                  }}
                  className="text-tombol font-semibold text-orange-500 hover:underline mt-2"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeTab === "portofolio"
                  ? (paginatedItems as Portofolio[]).map((item) => (
                      <PortfolioCard
                        key={item.id}
                        title={item.judul}
                        category={item.kategori?.nama || "Fabrikasi Besi"}
                        date={formatTanggal(item.tanggal_selesai)}
                        imageUrl={item.gambar_utama}
                        href={`/katalog/${item.slug}`}
                      />
                    ))
                  : (paginatedItems as Produk[]).map((prod) => (
                      <ProductCard
                        key={prod.id}
                        title={prod.nama}
                        description={prod.deskripsi}
                        imageUrl={prod.gambar_url}
                        href={`/katalog/${prod.slug}`}
                      />
                    ))}
              </div>
            )}

            {/* Paginasi (Frame 02) */}
            {totalPages > 1 && (
              <div className="flex justify-center pt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(p) => setCurrentPage(p)}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function KatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-page flex items-center justify-center">
          <div className="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <KatalogContent />
    </Suspense>
  );
}

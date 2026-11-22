"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { SearchInput } from "@/components/ui/search-input";
import { BadgeStatus, BadgeVariant } from "@/components/ui/badge-status";
import { Toggle } from "@/components/ui/toggle";
import { Pagination } from "@/components/ui/pagination";
import { RadioFilter, SegmentedTabs } from "@/components/ui/filter-options";
import { ProductCard } from "@/components/cards/product-card";
import { PortfolioCard } from "@/components/cards/portfolio-card";
import { SummaryCard } from "@/components/cards/summary-card";
import { DataTable, Column } from "@/components/table/data-table";
import {
  Plus,
  ArrowRight,
  Download,
  Eye,
  Trash2,
  Edit2,
  Calendar,
  Check,
  TrendingUp,
} from "lucide-react";

interface SamplePesanan {
  id: string;
  kode: string;
  klien: string;
  produk: string;
  tanggal: string;
  status: string;
  pembayaran: string;
  nominal: string;
}

const SAMPLE_ORDERS: SamplePesanan[] = [
  {
    id: "1",
    kode: "HBJ-2026-0012",
    klien: "Budi Santoso",
    produk: "Pagar Minimalis",
    tanggal: "27-10-2026",
    status: "Diproses",
    pembayaran: "DP 50%",
    nominal: "Rp 12.500.000",
  },
  {
    id: "2",
    kode: "HBJ-2026-0013",
    klien: "CV Maju Jaya",
    produk: "Kanopi Hollow",
    tanggal: "26-10-2026",
    status: "Ditinjau",
    pembayaran: "Belum Bayar",
    nominal: "Rp 18.000.000",
  },
  {
    id: "3",
    kode: "HBJ-2026-0014",
    klien: "Nadya Putri",
    produk: "Railing Tangga",
    tanggal: "25-10-2026",
    status: "Selesai",
    pembayaran: "Lunas",
    nominal: "Rp 8.750.000",
  },
  {
    id: "4",
    kode: "HBJ-2026-0015",
    klien: "PT Surya Abadi",
    produk: "Pintu Besi Geser",
    tanggal: "24-10-2026",
    status: "Diajukan",
    pembayaran: "DP 30%",
    nominal: "Rp 24.000.000",
  },
  {
    id: "5",
    kode: "HBJ-2026-0016",
    klien: "Hotel Merapi",
    produk: "Kanopi Kaca Tempered",
    tanggal: "21-10-2026",
    status: "Dibatalkan",
    pembayaran: "Belum Bayar",
    nominal: "Rp 35.000.000",
  },
];

export default function UjiKomponenPage() {
  const [searchValue, setSearchValue] = useState("");
  const [toggleTayang, setToggleTayang] = useState(true);
  const [toggleAktif, setToggleAktif] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("semua");
  const [activeTab, setActiveTab] = useState("produk");
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const tableColumns: Column<SamplePesanan>[] = [
    {
      header: "Kode",
      accessorKey: "kode",
      cell: (row) => <span className="font-semibold">{row.kode}</span>,
    },
    {
      header: "Nama Klien",
      accessorKey: "klien",
    },
    {
      header: "Produk",
      accessorKey: "produk",
    },
    {
      header: "Tanggal",
      accessorKey: "tanggal",
    },
    {
      header: "Status",
      align: "center",
      cell: (row) => <BadgeStatus>{row.status}</BadgeStatus>,
    },
    {
      header: "Pembayaran",
      align: "center",
      cell: (row) => <BadgeStatus>{row.pembayaran}</BadgeStatus>,
    },
    {
      header: "Nominal",
      align: "right",
      cell: (row) => (
        <span className="font-semibold text-content-primary">
          {row.nominal}
        </span>
      ),
    },
    {
      header: "Aksi",
      align: "center",
      cell: () => (
        <div className="flex items-center justify-center gap-1.5">
          <Button variant="sekunder" size="sm" className="h-8 px-2.5">
            <Eye className="w-3.5 h-3.5 mr-1" />
            Detail
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-page flex flex-col">
      {/* Real Customer Navbar Preview */}
      <Navbar />

      <main className="max-w-[1440px] mx-auto w-full px-6 lg:px-20 py-10 flex flex-col gap-14">
        {/* Header Seksi */}
        <div className="flex flex-col gap-2 border-b border-divider pb-6">
          <span className="text-tombol font-bold text-orange-500 uppercase tracking-wider">
            Fase 0 — Verifikasi Desain & Komponen UI
          </span>
          <h1 className="text-display font-bold text-navy-900">
            Halaman Uji Komponen (Design System)
          </h1>
          <p className="text-isi text-content-muted max-w-3xl">
            Semua komponen dibuat berdasarkan design tokens Figma PT Handoko
            Bangkit Jaya. Menggunakan CSS variables + Tailwind theme dan Inter
            font. Tidak ada warna yang di-hardcode di komponen.
          </p>
        </div>

        {/* 1. PALET WARNA (DESIGN TOKENS) */}
        <section className="flex flex-col gap-5">
          <h2 className="text-h1 font-bold text-navy-900">
            1. Design Tokens — Palet Warna
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="p-4 rounded-xl bg-navy-900 text-white flex flex-col justify-between h-28 shadow-card">
              <span className="text-label font-bold">Navy / 900</span>
              <span className="text-kecil opacity-80">#10233C</span>
            </div>
            <div className="p-4 rounded-xl bg-navy-700 text-white flex flex-col justify-between h-28 shadow-card">
              <span className="text-label font-bold">Navy / 700</span>
              <span className="text-kecil opacity-80">#1D3A5C</span>
            </div>
            <div className="p-4 rounded-xl bg-navy-100 text-navy-900 flex flex-col justify-between h-28 shadow-card border border-divider">
              <span className="text-label font-bold">Navy / 100</span>
              <span className="text-kecil opacity-80">#E4EAF2</span>
            </div>
            <div className="p-4 rounded-xl bg-orange-500 text-navy-900 flex flex-col justify-between h-28 shadow-card">
              <span className="text-label font-bold">Oranye / 500</span>
              <span className="text-kecil opacity-80">#F58220</span>
            </div>
            <div className="p-4 rounded-xl bg-orange-100 text-navy-900 flex flex-col justify-between h-28 shadow-card border border-divider">
              <span className="text-label font-bold">Oranye / 100</span>
              <span className="text-kecil opacity-80">#FDEBD8</span>
            </div>
            <div className="p-4 rounded-xl bg-page text-navy-900 flex flex-col justify-between h-28 shadow-card border border-divider">
              <span className="text-label font-bold">Latar / Halaman</span>
              <span className="text-kecil opacity-80">#F3F5F8</span>
            </div>
            <div className="p-4 rounded-xl bg-card text-navy-900 flex flex-col justify-between h-28 shadow-card border border-divider">
              <span className="text-label font-bold">Latar / Kartu</span>
              <span className="text-kecil opacity-80">#FFFFFF</span>
            </div>
            <div className="p-4 rounded-xl bg-[#D5DBE3] text-navy-900 flex flex-col justify-between h-28 shadow-card">
              <span className="text-label font-bold">Garis Border</span>
              <span className="text-kecil opacity-80">#D5DBE3</span>
            </div>
            <div className="p-4 rounded-xl bg-[#566579] text-white flex flex-col justify-between h-28 shadow-card">
              <span className="text-label font-bold">Teks Redup</span>
              <span className="text-kecil opacity-90">#566579</span>
            </div>
            <div className="p-4 rounded-xl bg-navy-900 text-[#B8C4D4] flex flex-col justify-between h-28 shadow-card border border-navy-700">
              <span className="text-label font-bold">Redup Di Atas Gelap</span>
              <span className="text-kecil opacity-90">#B8C4D4</span>
            </div>
            <div className="p-4 rounded-xl bg-status-success-bg text-status-success-text flex flex-col justify-between h-28 shadow-card">
              <span className="text-label font-bold">Status Sukses</span>
              <span className="text-kecil opacity-90">#DCF2E3 / #17613A</span>
            </div>
            <div className="p-4 rounded-xl bg-status-warning-bg text-status-warning-text flex flex-col justify-between h-28 shadow-card">
              <span className="text-label font-bold">Status Peringatan</span>
              <span className="text-kecil opacity-90">#FFF0D1 / #7A4B00</span>
            </div>
            <div className="p-4 rounded-xl bg-status-info-bg text-status-info-text flex flex-col justify-between h-28 shadow-card">
              <span className="text-label font-bold">Status Info</span>
              <span className="text-kecil opacity-90">#E1ECFA / #174E8C</span>
            </div>
            <div className="p-4 rounded-xl bg-status-danger-bg text-status-danger-text flex flex-col justify-between h-28 shadow-card">
              <span className="text-label font-bold">Status Bahaya</span>
              <span className="text-kecil opacity-90">#FBE0E0 / #912020</span>
            </div>
            <div className="p-4 rounded-xl bg-status-neutral-bg text-status-neutral-text flex flex-col justify-between h-28 shadow-card border border-divider">
              <span className="text-label font-bold">Status Netral</span>
              <span className="text-kecil opacity-90">#E7EBF0 / #3F4E62</span>
            </div>
          </div>
        </section>

        {/* 2. TIPOGRAFI & TEXT STYLES */}
        <section className="flex flex-col gap-5">
          <h2 className="text-h1 font-bold text-navy-900">
            2. Tipografi & Hierarki Teks (Inter)
          </h2>
          <div className="bg-card rounded-xl border border-divider p-6 shadow-card flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-divider pb-3">
              <span className="text-display font-bold text-navy-900">
                Display — 40px / 48px Bold
              </span>
              <span className="text-kecil text-content-muted">
                font-bold text-display
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-divider pb-3">
              <span className="text-h1 font-bold text-navy-900">
                H1 — 28px / 36px Bold
              </span>
              <span className="text-kecil text-content-muted">
                font-bold text-h1
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-divider pb-3">
              <span className="text-h2 font-semibold text-navy-900">
                H2 — 20px / 28px Semi Bold
              </span>
              <span className="text-kecil text-content-muted">
                font-semibold text-h2
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-divider pb-3">
              <span className="text-h3 font-semibold text-navy-900">
                H3 — 16px / 24px Semi Bold
              </span>
              <span className="text-kecil text-content-muted">
                font-semibold text-h3
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-divider pb-3">
              <span className="text-isi text-content-primary">
                Isi — 14px / 22px Regular. Teks paragraf utama pada website dan
                tabel deskripsi.
              </span>
              <span className="text-kecil text-content-muted">
                font-normal text-isi
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-divider pb-3">
              <span className="text-label font-semibold text-navy-900">
                Label — 13px / 18px Semi Bold
              </span>
              <span className="text-kecil text-content-muted">
                font-semibold text-label
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-divider pb-3">
              <span className="text-tombol font-semibold text-orange-500">
                Tombol — 14px / 20px Semi Bold
              </span>
              <span className="text-kecil text-content-muted">
                font-semibold text-tombol
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-baseline justify-between">
              <span className="text-kecil text-content-muted">
                Kecil — 12px / 16px Regular. Keterangan bantuan atau timestamp.
              </span>
              <span className="text-kecil text-content-muted">
                font-normal text-kecil
              </span>
            </div>
          </div>
        </section>

        {/* 3. KOMPONEN TOMBOL (BUTTONS) */}
        <section className="flex flex-col gap-5">
          <h2 className="text-h1 font-bold text-navy-900">
            3. Komponen Tombol (Button)
          </h2>
          <div className="bg-card rounded-xl border border-divider p-6 shadow-card flex flex-col gap-6">
            <div>
              <h3 className="text-label font-semibold text-content-muted mb-3">
                VARIAN TOMBOL
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="utama">Utama (Oranye)</Button>
                <Button variant="sekunder">Sekunder (Outline)</Button>
                <Button variant="navy">Navy 900</Button>
                <Button variant="outline-navy">Outline Navy</Button>
                <Button variant="bahaya">Bahaya (Hapus)</Button>
                <Button variant="ghost">Ghost Link</Button>
              </div>
            </div>

            <div>
              <h3 className="text-label font-semibold text-content-muted mb-3">
                UKURAN (SIZES)
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="utama" size="sm">
                  Kecil (sm - 36px)
                </Button>
                <Button variant="utama" size="md">
                  Sedang (md - 42px)
                </Button>
                <Button variant="utama" size="lg">
                  Besar (lg - 48px)
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-label font-semibold text-content-muted mb-3">
                STATE: DENGAN IKON, LOADING & DISABLED
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="utama" leftIcon={<Plus className="w-4 h-4" />}>
                  Tambah Data
                </Button>
                <Button
                  variant="sekunder"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Selanjutnya
                </Button>
                <Button
                  variant="utama"
                  isLoading={isLoadingButton}
                  onClick={() => {
                    setIsLoadingButton(true);
                    setTimeout(() => setIsLoadingButton(false), 2000);
                  }}
                >
                  {isLoadingButton ? "Memproses..." : "Klik Tes Loading"}
                </Button>
                <Button variant="utama" disabled>
                  Dinonaktifkan
                </Button>
                <Button variant="sekunder" disabled>
                  Disabled Outline
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 4. BADGE STATUS */}
        <section className="flex flex-col gap-5">
          <h2 className="text-h1 font-bold text-navy-900">
            4. Badge Status (Status Tokens)
          </h2>
          <div className="bg-card rounded-xl border border-divider p-6 shadow-card flex flex-col gap-6">
            <div>
              <h3 className="text-label font-semibold text-content-muted mb-3">
                STATUS PESANAN & PEMBAYARAN
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <BadgeStatus variant="sukses">Selesai</BadgeStatus>
                <BadgeStatus variant="sukses">Lunas</BadgeStatus>
                <BadgeStatus variant="sukses">Aktif</BadgeStatus>
                <BadgeStatus variant="peringatan">Diproses</BadgeStatus>
                <BadgeStatus variant="peringatan">DP 50%</BadgeStatus>
                <BadgeStatus variant="peringatan">Pending</BadgeStatus>
                <BadgeStatus variant="info">Ditinjau</BadgeStatus>
                <BadgeStatus variant="info">Diajukan</BadgeStatus>
                <BadgeStatus variant="info">Baru</BadgeStatus>
                <BadgeStatus variant="bahaya">Dibatalkan</BadgeStatus>
                <BadgeStatus variant="netral">Belum Bayar</BadgeStatus>
                <BadgeStatus variant="netral">Nonaktif</BadgeStatus>
              </div>
            </div>

            <div>
              <h3 className="text-label font-semibold text-content-muted mb-3">
                UKURAN & VARIAN TANPA DOT
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <BadgeStatus variant="info" size="sm">
                  Kecil (sm)
                </BadgeStatus>
                <BadgeStatus variant="info" size="md">
                  Sedang (md)
                </BadgeStatus>
                <BadgeStatus variant="sukses" withDot={false}>
                  Tanpa Dot — Sukses
                </BadgeStatus>
                <BadgeStatus variant="peringatan" withDot={false}>
                  Tanpa Dot — Peringatan
                </BadgeStatus>
                <BadgeStatus variant="netral" withDot={false}>
                  Tag Kategori
                </BadgeStatus>
              </div>
            </div>
          </div>
        </section>

        {/* 5. FORM CONTROLS & INPUT */}
        <section className="flex flex-col gap-5">
          <h2 className="text-h1 font-bold text-navy-900">
            5. Input & Kontrol Formulir
          </h2>
          <div className="bg-card rounded-xl border border-divider p-6 shadow-card grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Input
              label="Nama Lengkap"
              required
              placeholder="Masukkan nama Anda"
            />
            <Input
              label="Nomor WhatsApp"
              required
              placeholder="Contoh: 081234567890"
              helperText="Pastikan nomor aktif untuk konfirmasi pesanan."
            />
            <Input
              label="Contoh Error Validasi"
              required
              value="email-tidak-valid"
              error="Format email tidak valid. Gunakan nama@domain.com"
              readOnly
            />
            <Select
              label="Kategori Produk"
              required
              options={[
                { label: "Pilih Kategori Produk...", value: "" },
                { label: "Pagar Perumahan", value: "pagar" },
                { label: "Kanopi Baja / Hollow", value: "kanopi" },
                { label: "Rak Besi Gudang & Kayu", value: "rak" },
                { label: "Railing Tangga & Balkon", value: "railing" },
              ]}
            />
            <SearchInput
              placeholder="Cari kode atau nama klien..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onClear={() => setSearchValue("")}
            />
            <Input
              label="Input Dinonaktifkan"
              disabled
              value="Tidak dapat diubah"
            />
            <div className="md:col-span-2 lg:col-span-3">
              <Textarea
                label="Catatan atau Spesifikasi Khusus"
                placeholder="Tuliskan ukuran, model, atau kebutuhan khusus pesanan Anda di sini..."
                rows={3}
              />
            </div>
          </div>
        </section>

        {/* 6. TOGGLE & OPSI FILTER */}
        <section className="flex flex-col gap-5">
          <h2 className="text-h1 font-bold text-navy-900">
            6. Toggle Status Tampil & Opsi Filter
          </h2>
          <div className="bg-card rounded-xl border border-divider p-6 shadow-card grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-4">
              <h3 className="text-label font-semibold text-content-muted">
                TOGGLE STATUS TAMPIL
              </h3>
              <Toggle
                checked={toggleTayang}
                onChange={setToggleTayang}
                label="Status Tampil Portofolio"
                description="Tentukan apakah karya ini terlihat di katalog publik."
                activeLabel="Tayang"
                inactiveLabel="Draft"
              />
              <div className="pt-2 border-t border-divider">
                <Toggle
                  checked={toggleAktif}
                  onChange={setToggleAktif}
                  label="Status Akun Klien"
                  activeLabel="Aktif"
                  inactiveLabel="Nonaktif"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-label font-semibold text-content-muted">
                SEGMENTED TABS (PRODUK / PORTOFOLIO)
              </h3>
              <SegmentedTabs
                tabs={[
                  { id: "produk", label: "Produk" },
                  { id: "portofolio", label: "Portofolio" },
                ]}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
              <p className="text-kecil text-content-muted mt-2">
                Tab terpilih saat ini:{" "}
                <strong className="text-navy-900">{activeTab}</strong>
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <RadioFilter
                label="Kategori Produk"
                selectedId={selectedCategory}
                onSelect={setSelectedCategory}
                options={[
                  { id: "semua", label: "Semua", count: 12 },
                  { id: "pagar", label: "Pagar Perumahan", count: 5 },
                  { id: "rak", label: "Rak", count: 3 },
                  { id: "kanopi", label: "Kanopi", count: 4 },
                ]}
              />
            </div>
          </div>
        </section>

        {/* 7. KARTU RINGKASAN DASHBOARD */}
        <section className="flex flex-col gap-5">
          <h2 className="text-h1 font-bold text-navy-900">
            7. Kartu Ringkasan (Dashboard Stat Cards)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <SummaryCard
              title="Diajukan"
              value={2}
              icon={<Plus className="w-4 h-4 text-status-info-text" />}
            />
            <SummaryCard
              title="Ditinjau"
              value={2}
              icon={<TrendingUp className="w-4 h-4 text-status-warning-text" />}
            />
            <SummaryCard
              title="Diproses"
              value={2}
              icon={<Check className="w-4 h-4 text-orange-500" />}
            />
            <SummaryCard
              title="Portofolio Tayang"
              value={4}
              icon={<Eye className="w-4 h-4 text-status-success-text" />}
            />
          </div>
        </section>

        {/* 8. KARTU PRODUK & PORTOFOLIO */}
        <section className="flex flex-col gap-5">
          <h2 className="text-h1 font-bold text-navy-900">
            8. Kartu Produk & Kartu Portofolio
          </h2>
          <div>
            <h3 className="text-h3 font-semibold text-navy-900 mb-4">
              Kartu Produk (Katalog Produk Unggulan)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ProductCard
                id="1"
                title="Pagar Perumahan"
                description="Pagar besi minimalis dan modern untuk rumah Anda dengan daya tahan karat optimal."
                categoryName="Pagar Perumahan"
              />
              <ProductCard
                id="2"
                title="Rak Besi & Kayu"
                description="Rak besi kuat dan tahan lama untuk berbagai kebutuhan gudang maupun display toko."
                categoryName="Rak"
              />
              <ProductCard
                id="3"
                title="Kanopi Baja Ringan / Hollow"
                description="Kanopi baja modern untuk perlindungan maksimal area teras dan carport kendaraan."
                categoryName="Kanopi"
              />
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-h3 font-semibold text-navy-900 mb-4">
              Kartu Portofolio (Proyek Selesai)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <PortfolioCard
                id="1"
                categoryName="Pagar Perumahan"
                title="Pagar Perumahan Minimalis"
                completionDate="2026-08-04"
              />
              <PortfolioCard
                id="2"
                categoryName="Rak"
                title="Rak Besi Minimalis Kayu"
                completionDate="2026-08-26"
              />
              <PortfolioCard
                id="3"
                categoryName="Kanopi"
                title="Kanopi Area Parkir"
                completionDate="2026-07-03"
              />
              <PortfolioCard
                id="4"
                categoryName="Pagar Perumahan"
                title="Pagar Rumah Modern"
                completionDate="2026-05-18"
              />
            </div>
          </div>
        </section>

        {/* 9. TABEL & PAGINASI */}
        <section className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-h1 font-bold text-navy-900">
              9. Header & Baris Tabel + Paginasi
            </h2>
            <Button
              variant="utama"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Tambah Pesanan
            </Button>
          </div>
          <DataTable columns={tableColumns} data={SAMPLE_ORDERS} />
          <div className="flex items-center justify-between mt-2">
            <span className="text-label text-content-muted">
              Menampilkan 5 dari 24 data pesanan
            </span>
            <Pagination
              currentPage={currentPage}
              totalPages={5}
              onPageChange={setCurrentPage}
            />
          </div>
        </section>

        {/* 10. PREVIEW SIDEBAR & TOPBAR ADMIN */}
        <section className="flex flex-col gap-5">
          <h2 className="text-h1 font-bold text-navy-900">
            10. Komponen Admin: Sidebar & Topbar
          </h2>
          <div className="rounded-xl border border-divider shadow-card overflow-hidden bg-page">
            <div className="flex min-h-[500px]">
              {/* Sidebar Preview */}
              <AdminSidebar
                onLogout={() => alert("Simulasi: Admin logout")}
                className="shrink-0"
              />

              {/* Area Utama Preview */}
              <div className="flex-1 flex flex-col">
                <AdminTopbar
                  title="Dashboard Kelola Pesanan"
                  action={
                    <Button
                      variant="utama"
                      size="sm"
                      leftIcon={<Plus className="w-4 h-4" />}
                    >
                      Tambah Data
                    </Button>
                  }
                />
                <div className="p-6 flex flex-col gap-4">
                  <div className="p-4 rounded-lg bg-card border border-divider">
                    <p className="text-isi text-content-primary">
                      Ini adalah area kerja utama Admin di kanan sidebar.
                      Sidebar di sebelah kiri memiliki tombol lipat/collapse
                      untuk tampilan responsif layar kecil.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Real Customer Footer Preview */}
      <Footer />
    </div>
  );
}

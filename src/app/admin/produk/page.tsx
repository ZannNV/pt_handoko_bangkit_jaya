"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { Select } from "@/components/ui/select";
import { BadgeStatus } from "@/components/ui/badge-status";
import {
  getProducts,
  getCategories,
  deleteProduct,
  deleteCategory,
  updateProduct,
} from "@/lib/data/store";
import { Produk, Kategori } from "@/lib/types";
import { Plus, Package, Layers, Trash2, Edit2, CheckCircle2 } from "lucide-react";

export default function DashboardProdukKategoriPage() {
  const [activeTab, setActiveTab] = useState<"produk" | "kategori">("produk");
  const [products, setProducts] = useState<Produk[]>([]);
  const [categories, setCategories] = useState<Kategori[]>([]);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("Semua");

  const loadData = () => {
    setProducts(getProducts({ search, kategori_id: catFilter }));
    setCategories(getCategories());
  };

  useEffect(() => {
    loadData();
  }, [search, catFilter, activeTab]);

  const handleToggleProductStatus = (prod: Produk) => {
    const nextStatus = prod.status === "Tayang" ? "Draft" : "Tayang";
    updateProduct(prod.id, { status: nextStatus });
    loadData();
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("Hapus produk ini?")) {
      deleteProduct(id);
      loadData();
    }
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm("Hapus kategori ini?")) {
      deleteCategory(id);
      loadData();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-page">
      <AdminTopbar
        title="Produk & Kategori"
        action={
          <div className="flex items-center gap-2">
            <Link href="/admin/kategori/tambah">
              <Button
                variant="sekunder"
                size="sm"
                leftIcon={<Plus className="w-4 h-4" />}
              >
                Tambah Kategori
              </Button>
            </Link>
            <Link href="/admin/produk/tambah">
              <Button
                variant="utama"
                size="sm"
                leftIcon={<Plus className="w-4 h-4" />}
              >
                Tambah Produk
              </Button>
            </Link>
          </div>
        }
      />

      <main className="p-6 lg:p-8 flex flex-col gap-6 max-w-[1440px] w-full mx-auto text-left">
        {/* Tab Navigasi: Produk vs Kategori */}
        <div className="flex items-center gap-2 border-b border-divider pb-2">
          <button
            type="button"
            onClick={() => setActiveTab("produk")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-tombol font-semibold transition-colors ${
              activeTab === "produk"
                ? "bg-navy-900 text-white shadow-sm"
                : "text-content-primary hover:bg-card"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Katalog Produk ({products.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("kategori")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-tombol font-semibold transition-colors ${
              activeTab === "kategori"
                ? "bg-navy-900 text-white shadow-sm"
                : "text-content-primary hover:bg-card"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Kategori Produk ({categories.length})</span>
          </button>
        </div>

        {activeTab === "produk" ? (
          <>
            {/* Filter Bar Produk */}
            <div className="bg-card rounded-xl border border-divider shadow-card p-5 grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
              <div className="sm:col-span-8 flex flex-col gap-1.5">
                <span className="text-label font-semibold text-content-primary">
                  Pencarian Produk
                </span>
                <SearchInput
                  placeholder="Cari nama produk..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onClear={() => setSearch("")}
                />
              </div>

              <div className="sm:col-span-4 flex flex-col gap-1.5">
                <Select
                  label="Filter Kategori"
                  value={catFilter}
                  onChange={(e) => setCatFilter(e.target.value)}
                  options={[
                    { label: "Semua Kategori", value: "Semua" },
                    ...categories.map((c) => ({
                      label: c.nama,
                      value: c.id,
                    })),
                  ]}
                />
              </div>
            </div>

            {/* Tabel Produk */}
            <div className="bg-card rounded-xl border border-divider shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-divider bg-page/40">
                      <th className="px-5 py-3.5 text-label font-semibold text-content-muted text-left">
                        Nama Produk
                      </th>
                      <th className="px-5 py-3.5 text-label font-semibold text-content-muted text-left">
                        Kategori
                      </th>
                      <th className="px-5 py-3.5 text-label font-semibold text-content-muted text-left">
                        Deskripsi
                      </th>
                      <th className="px-5 py-3.5 text-label font-semibold text-content-muted text-center">
                        Status
                      </th>
                      <th className="px-5 py-3.5 text-label font-semibold text-content-muted text-center">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-divider">
                    {products.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-6 py-12 text-center text-content-muted text-isi"
                        >
                          Tidak ada produk ditemukan.
                        </td>
                      </tr>
                    ) : (
                      products.map((prod) => (
                        <tr
                          key={prod.id}
                          className="hover:bg-page/50 transition-colors"
                        >
                          <td className="px-5 py-4 text-isi font-semibold text-content-primary">
                            <div className="flex items-center gap-3">
                              {prod.gambar_url ? (
                                <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-divider">
                                  <Image
                                    src={prod.gambar_url}
                                    alt={prod.nama}
                                    fill
                                    sizes="40px"
                                    className="object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="w-10 h-10 rounded-lg bg-navy-100 flex items-center justify-center text-navy-700 shrink-0">
                                  <Package className="w-5 h-5" />
                                </div>
                              )}
                              <span>{prod.nama}</span>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-isi text-content-muted">
                            {prod.kategori?.nama || "-"}
                          </td>
                          <td className="px-5 py-4 text-isi text-content-muted max-w-md truncate">
                            {prod.deskripsi}
                          </td>
                          <td className="px-5 py-4 text-center">
                            <button
                              type="button"
                              onClick={() => handleToggleProductStatus(prod)}
                              title="Klik untuk ubah status Tayang / Draft"
                            >
                              <BadgeStatus>{prod.status}</BadgeStatus>
                            </button>
                          </td>
                          <td className="px-5 py-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <Button
                                variant="sekunder"
                                size="sm"
                                onClick={() => handleToggleProductStatus(prod)}
                                className="h-8 px-2.5 text-kecil"
                              >
                                {prod.status === "Tayang" ? "Draftkan" : "Tayangkan"}
                              </Button>
                              <Button
                                variant="bahaya"
                                size="sm"
                                onClick={() => handleDeleteProduct(prod.id)}
                                className="h-8 px-2 text-kecil"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          /* Tabel Kategori (Jumlah produk per kategori dihitung otomatis) */
          <div className="bg-card rounded-xl border border-divider shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-divider bg-page/40">
                    <th className="px-5 py-3.5 text-label font-semibold text-content-muted text-left">
                      Nama Kategori
                    </th>
                    <th className="px-5 py-3.5 text-label font-semibold text-content-muted text-left">
                      Slug URL
                    </th>
                    <th className="px-5 py-3.5 text-label font-semibold text-content-muted text-left">
                      Deskripsi
                    </th>
                    <th className="px-5 py-3.5 text-label font-semibold text-content-muted text-right">
                      Jumlah Produk
                    </th>
                    <th className="px-5 py-3.5 text-label font-semibold text-content-muted text-center">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-divider">
                  {categories.map((cat) => (
                    <tr
                      key={cat.id}
                      className="hover:bg-page/50 transition-colors"
                    >
                      <td className="px-5 py-4 text-isi font-semibold text-content-primary">
                        {cat.nama}
                      </td>
                      <td className="px-5 py-4 text-isi text-content-muted font-mono text-kecil">
                        {cat.slug}
                      </td>
                      <td className="px-5 py-4 text-isi text-content-muted max-w-md">
                        {cat.deskripsi || "-"}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <span className="inline-flex px-2.5 py-1 rounded-full bg-navy-100 text-navy-900 font-bold text-kecil">
                          {cat.jumlah_produk ?? 0} Produk
                        </span>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <Button
                          variant="bahaya"
                          size="sm"
                          onClick={() => handleDeleteCategory(cat.id)}
                          className="h-8 px-2 text-kecil"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

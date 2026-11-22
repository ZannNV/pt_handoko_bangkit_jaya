"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { Select } from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import {
  getPortfolios,
  getCategories,
  togglePortfolioVisibility,
  deletePortfolio,
} from "@/lib/data/store";
import { Portofolio, Kategori } from "@/lib/types";
import { formatTanggal } from "@/lib/utils";
import { Plus, Briefcase, Trash2, Calendar, Eye } from "lucide-react";

export default function DashboardPortofolioPage() {
  const [portfolios, setPortfolios] = useState<Portofolio[]>([]);
  const [categories, setCategories] = useState<Kategori[]>([]);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("Semua");

  const loadData = () => {
    setPortfolios(getPortfolios({ search, kategori_id: catFilter }));
    setCategories(getCategories());
  };

  useEffect(() => {
    loadData();
  }, [search, catFilter]);

  const handleToggle = (id: string) => {
    togglePortfolioVisibility(id);
    loadData();
  };

  const handleDelete = (id: string) => {
    if (confirm("Hapus portofolio ini dari daftar?")) {
      deletePortfolio(id);
      loadData();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-page">
      {/* Koreksi Penamaan Frame: Dashboard Portofolio (Audit Poin 8.1) */}
      <AdminTopbar
        title="Dashboard Portofolio"
        action={
          <Link href="/admin/portofolio/tambah">
            <Button
              variant="utama"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Tambah Portofolio
            </Button>
          </Link>
        }
      />

      <main className="p-6 lg:p-8 flex flex-col gap-6 max-w-[1440px] w-full mx-auto text-left">
        {/* Filter Bar */}
        <div className="bg-card rounded-xl border border-divider shadow-card p-5 grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
          <div className="sm:col-span-8 flex flex-col gap-1.5">
            <span className="text-label font-semibold text-content-primary">
              Pencarian
            </span>
            <SearchInput
              placeholder="Cari judul proyek portofolio..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClear={() => setSearch("")}
            />
          </div>

          <div className="sm:col-span-4 flex flex-col gap-1.5">
            <Select
              label="Kategori"
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

        {/* Tabel Portofolio */}
        <div className="bg-card rounded-xl border border-divider shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-divider bg-page/40">
                  <th className="px-5 py-3.5 text-label font-semibold text-content-muted text-left">
                    Judul Portofolio
                  </th>
                  <th className="px-5 py-3.5 text-label font-semibold text-content-muted text-left">
                    Kategori
                  </th>
                  <th className="px-5 py-3.5 text-label font-semibold text-content-muted text-left">
                    Tanggal Selesai
                  </th>
                  <th className="px-5 py-3.5 text-label font-semibold text-content-muted text-center">
                    Status Tampil
                  </th>
                  <th className="px-5 py-3.5 text-label font-semibold text-content-muted text-center">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-divider">
                {portfolios.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-content-muted text-isi"
                    >
                      Tidak ada data portofolio ditemukan.
                    </td>
                  </tr>
                ) : (
                  portfolios.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-page/50 transition-colors"
                    >
                      <td className="px-5 py-4 text-isi font-semibold text-content-primary">
                        <div className="flex items-center gap-3">
                          {item.gambar_utama ? (
                            <div className="relative w-12 h-9 rounded-lg overflow-hidden shrink-0 border border-divider">
                              <Image
                                src={item.gambar_utama}
                                alt={item.judul}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-9 rounded-lg bg-navy-100 flex items-center justify-center text-navy-700 shrink-0">
                              <Briefcase className="w-4 h-4" />
                            </div>
                          )}
                          <span>{item.judul}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-isi text-content-muted">
                        {item.kategori?.nama || "-"}
                      </td>
                      <td className="px-5 py-4 text-isi text-content-muted">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{formatTanggal(item.tanggal_selesai)}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <div className="inline-flex items-center justify-center">
                          <Toggle
                            checked={item.status_tampil}
                            onChange={() => handleToggle(item.id)}
                            activeLabel="Tayang"
                            inactiveLabel="Draft"
                          />
                        </div>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Link href={`/katalog/${item.slug}`} target="_blank">
                            <Button
                              variant="sekunder"
                              size="sm"
                              className="h-8 px-2.5 text-kecil"
                              leftIcon={<Eye className="w-3.5 h-3.5" />}
                            >
                              Lihat
                            </Button>
                          </Link>
                          <Button
                            variant="bahaya"
                            size="sm"
                            onClick={() => handleDelete(item.id)}
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
          <div className="p-4 border-t border-divider text-kecil text-content-muted text-left">
            Total {portfolios.length} karya portofolio tercatat
          </div>
        </div>
      </main>
    </div>
  );
}

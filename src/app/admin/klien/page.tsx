"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { Select } from "@/components/ui/select";
import { BadgeStatus } from "@/components/ui/badge-status";
import { getClients } from "@/lib/data/store";
import { Klien } from "@/lib/types";
import { Plus, Edit2, Users, Building, Phone, Mail } from "lucide-react";

export default function DashboardKlienPage() {
  const [clients, setClients] = useState<Klien[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [typeFilter, setTypeFilter] = useState("Semua");

  const loadData = () => {
    let list = getClients({ search, status: statusFilter });
    if (typeFilter === "Perusahaan") {
      list = list.filter((c) => c.perusahaan && c.perusahaan !== "-");
    } else if (typeFilter === "Perorangan") {
      list = list.filter((c) => !c.perusahaan || c.perusahaan === "-");
    }
    setClients(list);
  };

  useEffect(() => {
    loadData();
  }, [search, statusFilter, typeFilter]);

  return (
    <div className="flex flex-col min-h-screen bg-page">
      <AdminTopbar
        title="Kelola Klien"
        action={
          <Link href="/admin/klien/tambah">
            <Button
              variant="utama"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Tambah Klien
            </Button>
          </Link>
        }
      />

      <main className="p-6 lg:p-8 flex flex-col gap-6 max-w-[1440px] w-full mx-auto">
        {/* Filter Bar */}
        <div className="bg-card rounded-xl border border-divider shadow-card p-5 grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
          <div className="sm:col-span-5 flex flex-col gap-1.5 text-left">
            <span className="text-label font-semibold text-content-primary">
              Pencarian
            </span>
            <SearchInput
              placeholder="Cari nama klien..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClear={() => setSearch("")}
            />
          </div>

          <div className="sm:col-span-4 flex flex-col gap-1.5 text-left">
            <Select
              label="Tipe Klien"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              options={[
                { label: "Semua", value: "Semua" },
                { label: "Perusahaan", value: "Perusahaan" },
                { label: "Perorangan", value: "Perorangan" },
              ]}
            />
          </div>

          <div className="sm:col-span-3 flex flex-col gap-1.5 text-left">
            <Select
              label="Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { label: "Semua", value: "Semua" },
                { label: "Aktif", value: "Aktif" },
                { label: "Nonaktif", value: "Nonaktif" },
              ]}
            />
          </div>
        </div>

        {/* Tabel Klien */}
        <div className="bg-card rounded-xl border border-divider shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-divider bg-page/40">
                  <th className="px-5 py-3.5 text-label font-semibold text-content-muted text-left">
                    Nama Klien
                  </th>
                  <th className="px-5 py-3.5 text-label font-semibold text-content-muted text-left">
                    Perusahaan
                  </th>
                  <th className="px-5 py-3.5 text-label font-semibold text-content-muted text-left">
                    WhatsApp
                  </th>
                  <th className="px-5 py-3.5 text-label font-semibold text-content-muted text-left">
                    Email
                  </th>
                  <th className="px-5 py-3.5 text-label font-semibold text-content-muted text-right">
                    Jumlah Pesanan
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
                {clients.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-12 text-center text-content-muted text-isi"
                    >
                      Tidak ada data klien yang ditemukan.
                    </td>
                  </tr>
                ) : (
                  clients.map((klien) => (
                    <tr
                      key={klien.id}
                      className="hover:bg-page/50 transition-colors"
                    >
                      <td className="px-5 py-4 text-isi font-semibold text-content-primary">
                        {klien.nama}
                      </td>
                      <td className="px-5 py-4 text-isi text-content-muted">
                        {klien.perusahaan || "-"}
                      </td>
                      <td className="px-5 py-4 text-isi text-content-primary">
                        <a
                          href={`https://wa.me/${klien.whatsapp.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-orange-500 transition-colors"
                        >
                          {klien.whatsapp}
                        </a>
                      </td>
                      <td className="px-5 py-4 text-isi text-content-muted">
                        {klien.email || "-"}
                      </td>
                      <td className="px-5 py-4 text-right text-isi font-semibold text-navy-900 font-mono">
                        {klien.jumlah_pesanan ?? 0}
                      </td>
                      <td className="px-5 py-4 text-center">
                        <BadgeStatus>{klien.status}</BadgeStatus>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <Link href={`/admin/klien/tambah?id=${klien.id}`}>
                          <Button
                            variant="sekunder"
                            size="sm"
                            className="h-8 px-3"
                            leftIcon={<Edit2 className="w-3.5 h-3.5" />}
                          >
                            Edit
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-divider text-kecil text-content-muted text-left">
            Total {clients.length} klien terdaftar
          </div>
        </div>
      </main>
    </div>
  );
}

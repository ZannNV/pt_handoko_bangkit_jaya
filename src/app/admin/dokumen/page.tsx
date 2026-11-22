"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { Select } from "@/components/ui/select";
import { BadgeStatus } from "@/components/ui/badge-status";
import { getDocuments, deleteDocument } from "@/lib/data/store";
import { DokumenPesanan } from "@/lib/types";
import { formatTanggal } from "@/lib/utils";
import { Plus, Eye, Download, FileText, Trash2, X } from "lucide-react";

export default function DashboardDokumenPage() {
  const [documents, setDocuments] = useState<DokumenPesanan[]>([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("Semua");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [viewDoc, setViewDoc] = useState<DokumenPesanan | null>(null);

  const loadData = () => {
    const list = getDocuments({
      search,
      status: statusFilter,
      tipe: typeFilter,
    });
    setDocuments(list);
  };

  useEffect(() => {
    loadData();
  }, [search, typeFilter, statusFilter]);

  const handleDownload = (doc: DokumenPesanan) => {
    alert(`Mengunduh dokumen: ${doc.nama_file} (${doc.ukuran_file})`);
  };

  const handleDelete = (id: string) => {
    if (confirm("Hapus dokumen ini?")) {
      deleteDocument(id);
      loadData();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-page">
      <AdminTopbar
        title="Dokumen Pesanan"
        action={
          <Link href="/admin/dokumen/tambah">
            <Button
              variant="utama"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Tambah Dokumen
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
              placeholder="Cari nomor pesanan, klien, atau dokumen..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClear={() => setSearch("")}
            />
          </div>

          <div className="sm:col-span-4 flex flex-col gap-1.5 text-left">
            <Select
              label="Jenis Dokumen"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              options={[
                { label: "Semua", value: "Semua" },
                { label: "Desain", value: "Desain" },
                { label: "Invoice", value: "Invoice" },
                { label: "Kontrak", value: "Kontrak" },
                { label: "Foto Lokasi", value: "Foto Lokasi" },
                { label: "Bukti DP", value: "Bukti DP" },
                { label: "Spesifikasi", value: "Spesifikasi" },
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
                { label: "Lengkap", value: "Lengkap" },
                { label: "Pending", value: "Pending" },
              ]}
            />
          </div>
        </div>

        {/* Tabel Dokumen Pesanan */}
        <div className="bg-card rounded-xl border border-divider shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-divider bg-page/40">
                  <th className="px-5 py-3.5 text-label font-semibold text-content-muted text-left">
                    No Pesanan
                  </th>
                  <th className="px-5 py-3.5 text-label font-semibold text-content-muted text-left">
                    Nama Klien
                  </th>
                  <th className="px-5 py-3.5 text-label font-semibold text-content-muted text-left">
                    Dokumen
                  </th>
                  <th className="px-5 py-3.5 text-label font-semibold text-content-muted text-right">
                    Ukuran
                  </th>
                  <th className="px-5 py-3.5 text-label font-semibold text-content-muted text-left">
                    Tanggal Upload
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
                {documents.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-12 text-center text-content-muted text-isi"
                    >
                      Tidak ada dokumen pesanan yang sesuai filter.
                    </td>
                  </tr>
                ) : (
                  documents.map((doc) => (
                    <tr
                      key={doc.id}
                      className="hover:bg-page/50 transition-colors"
                    >
                      <td className="px-5 py-4 text-isi font-semibold text-content-primary">
                        {doc.kode_pesanan}
                      </td>
                      <td className="px-5 py-4 text-isi text-content-primary">
                        {doc.nama_klien}
                      </td>
                      <td className="px-5 py-4 text-isi text-content-primary flex items-center gap-2">
                        <FileText className="w-4 h-4 text-navy-700 shrink-0" />
                        <span className="font-medium">{doc.nama_file}</span>
                      </td>
                      <td className="px-5 py-4 text-isi font-mono text-content-muted text-right">
                        {doc.ukuran_file}
                      </td>
                      <td className="px-5 py-4 text-isi text-content-muted">
                        {formatTanggal(doc.created_at)}
                      </td>
                      <td className="px-5 py-4 text-center">
                        <BadgeStatus>{doc.status}</BadgeStatus>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="sekunder"
                            size="sm"
                            onClick={() => setViewDoc(doc)}
                            className="h-8 px-2.5 text-kecil"
                            leftIcon={<Eye className="w-3.5 h-3.5" />}
                          >
                            Lihat
                          </Button>
                          <Button
                            variant="sekunder"
                            size="sm"
                            onClick={() => handleDownload(doc)}
                            className="h-8 px-2.5 text-kecil"
                            leftIcon={<Download className="w-3.5 h-3.5" />}
                          >
                            Unduh
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
            Total {documents.length} dokumen tersimpan
          </div>
        </div>
      </main>

      {/* Modal Lihat Dokumen */}
      {viewDoc && (
        <div className="fixed inset-0 z-50 bg-navy-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card w-full max-w-lg rounded-2xl border border-divider shadow-modal p-6 flex flex-col gap-5 text-left animate-in fade-in">
            <div className="flex items-start justify-between border-b border-divider pb-3">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-orange-500" />
                <div>
                  <h3 className="text-h3 font-bold text-navy-900">
                    {viewDoc.nama_file}
                  </h3>
                  <span className="text-kecil text-content-muted">
                    {viewDoc.tipe_dokumen} • {viewDoc.ukuran_file}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewDoc(null)}
                className="p-1 rounded-lg text-content-muted hover:text-navy-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 rounded-xl bg-page border border-divider flex flex-col gap-2.5 text-isi">
              <div className="flex justify-between">
                <span className="text-content-muted">Nomor Pesanan:</span>
                <span className="font-semibold text-navy-900">
                  {viewDoc.kode_pesanan}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-content-muted">Klien:</span>
                <span className="font-semibold text-navy-900">
                  {viewDoc.nama_klien}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-content-muted">Tanggal Upload:</span>
                <span className="text-navy-900">
                  {formatTanggal(viewDoc.created_at)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-content-muted">Status Dokumen:</span>
                <BadgeStatus>{viewDoc.status}</BadgeStatus>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="bahaya"
                size="sm"
                onClick={() => {
                  handleDelete(viewDoc.id);
                  setViewDoc(null);
                }}
                leftIcon={<Trash2 className="w-3.5 h-3.5" />}
              >
                Hapus
              </Button>
              <Button
                variant="utama"
                size="sm"
                onClick={() => handleDownload(viewDoc)}
                leftIcon={<Download className="w-3.5 h-3.5" />}
              >
                Unduh Berkas
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

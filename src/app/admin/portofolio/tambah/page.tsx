"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { getCategories, createPortfolio } from "@/lib/data/store";
import { Kategori } from "@/lib/types";
import { ArrowLeft, Save, Briefcase, UploadCloud, Image as ImageIcon } from "lucide-react";

export default function TambahPortofolioPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Kategori[]>([]);
  const [kategoriId, setKategoriId] = useState("");
  const [judul, setJudul] = useState("");
  const [tanggalSelesai, setTanggalSelesai] = useState("2026-10-28");
  const [statusTampil, setStatusTampil] = useState(true);
  const [deskripsi, setDeskripsi] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const list = getCategories();
    setCategories(list);
    if (list.length > 0) setKategoriId(list[0].id);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul.trim() || !kategoriId || !tanggalSelesai) return;

    setIsSubmitting(true);

    createPortfolio({
      kategori_id: kategoriId,
      judul,
      deskripsi,
      tanggal_selesai: tanggalSelesai,
      status_tampil: statusTampil,
    });

    router.push("/admin/portofolio");
  };

  return (
    <div className="flex flex-col min-h-screen bg-page">
      <AdminTopbar title="Tambah Portofolio" />

      <main className="p-6 lg:p-8 flex flex-col gap-6 max-w-2xl w-full mx-auto text-left">
        <Link
          href="/admin/portofolio"
          className="inline-flex items-center gap-1.5 text-tombol font-semibold text-content-primary hover:text-orange-500 transition-colors self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Dashboard Portofolio</span>
        </Link>

        <div className="bg-card rounded-2xl border border-divider shadow-card p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="border-b border-divider pb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-500 shrink-0">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-h2 font-bold text-navy-900 tracking-tight">
                  Formulir Tambah Portofolio
                </h2>
                <p className="text-isi text-content-muted mt-0.5">
                  Publikasikan hasil pengerjaan proyek fabrikasi yang telah selesai dikerjakan.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <Input
                label="Judul Proyek Portofolio"
                required
                placeholder="Contoh: Pagar Rumah Modern Minimalis"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Pilih Kategori"
                  required
                  value={kategoriId}
                  onChange={(e) => setKategoriId(e.target.value)}
                  options={categories.map((c) => ({
                    label: c.nama,
                    value: c.id,
                  }))}
                />

                {/* Tanggal selesai utuh (Audit Poin 8.4) */}
                <Input
                  label="Tanggal Selesai Pengerjaan"
                  type="date"
                  required
                  value={tanggalSelesai}
                  onChange={(e) => setTanggalSelesai(e.target.value)}
                  helperText="Format tanggal utuh (Hari-Bulan-Tahun)"
                />
              </div>

              <div className="p-4 rounded-xl bg-page border border-divider">
                <Toggle
                  checked={statusTampil}
                  onChange={setStatusTampil}
                  label="Status Tampil di Website"
                  description="Jika aktif, proyek ini langsung tayang pada halaman Beranda dan Katalog publik."
                  activeLabel="Tayang"
                  inactiveLabel="Draft"
                />
              </div>

              <Textarea
                label="Deskripsi & Rincian Pengerjaan"
                required
                placeholder="Rincikan lokasi proyek, spesifikasi besi/las yang digunakan, dan tantangan teknis yang berhasil diselesaikan..."
                rows={4}
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
              />

              {/* Area Upload Foto / Video */}
              <div className="flex flex-col gap-1.5">
                <label className="text-label font-semibold text-content-primary">
                  Galeri Foto / Video Dokumentasi Proyek
                </label>
                <div className="border-2 border-dashed border-divider hover:border-orange-500 rounded-xl p-6 flex flex-col items-center justify-center gap-2 bg-page/50 transition-colors text-center cursor-pointer">
                  <UploadCloud className="w-8 h-8 text-orange-500" />
                  <span className="text-isi font-semibold text-navy-900">
                    Klik untuk unggah multi foto atau video
                  </span>
                  <span className="text-kecil text-content-muted">
                    Format file JPG, PNG, MP4 hingga 50 MB
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-divider flex items-center justify-end gap-3">
              <Link href="/admin/portofolio">
                <Button variant="sekunder" size="md" type="button">
                  Batal
                </Button>
              </Link>
              <Button
                variant="utama"
                size="md"
                type="submit"
                isLoading={isSubmitting}
                leftIcon={<Save className="w-4 h-4" />}
              >
                Simpan Portofolio
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

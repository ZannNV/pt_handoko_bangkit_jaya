"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getCategories, createProduct } from "@/lib/data/store";
import { Kategori } from "@/lib/types";
import { ArrowLeft, Save, PackagePlus, UploadCloud } from "lucide-react";

export default function TambahProdukPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Kategori[]>([]);
  const [kategoriId, setKategoriId] = useState("");
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [status, setStatus] = useState<"Tayang" | "Draft">("Tayang");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const list = getCategories();
    setCategories(list);
    if (list.length > 0) setKategoriId(list[0].id);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim() || !kategoriId) return;

    setIsSubmitting(true);

    createProduct({
      kategori_id: kategoriId,
      nama,
      deskripsi,
      status,
    });

    router.push("/admin/produk");
  };

  return (
    <div className="flex flex-col min-h-screen bg-page">
      <AdminTopbar title="Tambah Produk" />

      <main className="p-6 lg:p-8 flex flex-col gap-6 max-w-2xl w-full mx-auto text-left">
        <Link
          href="/admin/produk"
          className="inline-flex items-center gap-1.5 text-tombol font-semibold text-content-primary hover:text-orange-500 transition-colors self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Produk & Kategori</span>
        </Link>

        <div className="bg-card rounded-2xl border border-divider shadow-card p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="border-b border-divider pb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-500 shrink-0">
                <PackagePlus className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-h2 font-bold text-navy-900 tracking-tight">
                  Formulir Tambah Produk
                </h2>
                <p className="text-isi text-content-muted mt-0.5">
                  Tambahkan produk fabrikasi besi baru ke katalog penjualan.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <Input
                label="Nama Produk Fabrikasi"
                required
                placeholder="Contoh: Pagar Besi Minimalis Modern"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
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

                <Select
                  label="Status Publikasi"
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as "Tayang" | "Draft")
                  }
                  options={[
                    { label: "Tayang (Tampil di Website)", value: "Tayang" },
                    { label: "Draft (Disimpan Saja)", value: "Draft" },
                  ]}
                />
              </div>

              <Textarea
                label="Deskripsi Lengkap Produk"
                required
                placeholder="Jelaskan spesifikasi bahan baku, keunggulan, pilihan ketebalan hollow/baja, dan rekomendasi penggunaan..."
                rows={4}
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
              />

              {/* Upload Foto Produk */}
              <div className="flex flex-col gap-1.5">
                <label className="text-label font-semibold text-content-primary">
                  Foto Produk (JPG, PNG)
                </label>
                <div className="border-2 border-dashed border-divider hover:border-orange-500 rounded-xl p-6 flex flex-col items-center justify-center gap-2 bg-page/50 transition-colors text-center cursor-pointer">
                  <UploadCloud className="w-8 h-8 text-orange-500" />
                  <span className="text-isi font-semibold text-navy-900">
                    Klik untuk unggah gambar produk
                  </span>
                  <span className="text-kecil text-content-muted">
                    Rekomendasi rasio 16:9 atau resolusi minimal 800x600 piksel
                  </span>
                </div>
              </div>
            </div>

            {/* Tombol Simpan Produk (Audit Poin 8.3) */}
            <div className="pt-6 border-t border-divider flex items-center justify-end gap-3">
              <Link href="/admin/produk">
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
                Simpan Produk
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

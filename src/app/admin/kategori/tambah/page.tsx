"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createCategory } from "@/lib/data/store";
import { ArrowLeft, Save, Layers } from "lucide-react";

export default function TambahKategoriPage() {
  const router = useRouter();
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim()) return;

    setIsSubmitting(true);
    createCategory({ nama, deskripsi });
    router.push("/admin/produk");
  };

  return (
    <div className="flex flex-col min-h-screen bg-page">
      <AdminTopbar title="Tambah Kategori" />

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
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-h2 font-bold text-navy-900 tracking-tight">
                  Formulir Tambah Kategori
                </h2>
                <p className="text-isi text-content-muted mt-0.5">
                  Tambahkan kelompok kategori untuk mengelompokkan produk dan portofolio.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <Input
                label="Nama Kategori"
                required
                placeholder="Contoh: Railing Tangga & Balkon"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />

              <Textarea
                label="Deskripsi Kategori"
                placeholder="Jelaskan jenis-jenis pekerjaan atau produk yang masuk dalam kategori ini..."
                rows={3}
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
              />
            </div>

            {/* Tombol Simpan Kategori (Audit Poin 8.3) */}
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
                Simpan Kategori
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

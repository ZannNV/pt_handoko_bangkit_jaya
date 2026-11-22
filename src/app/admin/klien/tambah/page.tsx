"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { createClient, updateClient, getClients } from "@/lib/data/store";
import { StatusKlien } from "@/lib/types";
import { ArrowLeft, Save, UserCheck } from "lucide-react";

function TambahKlienForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const [nama, setNama] = useState("");
  const [perusahaan, setPerusahaan] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [alamat, setAlamat] = useState("");
  const [status, setStatus] = useState<StatusKlien>("Aktif");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editId) {
      const list = getClients();
      const existing = list.find((c) => c.id === editId);
      if (existing) {
        setNama(existing.nama);
        setPerusahaan(existing.perusahaan || "");
        setWhatsapp(existing.whatsapp);
        setEmail(existing.email || "");
        setAlamat(existing.alamat || "");
        setStatus(existing.status);
      }
    }
  }, [editId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim() || !whatsapp.trim()) return;

    setIsSubmitting(true);

    if (editId) {
      updateClient(editId, {
        nama,
        perusahaan: perusahaan || "-",
        whatsapp,
        email,
        alamat,
        status,
      });
    } else {
      createClient({
        nama,
        perusahaan: perusahaan || "-",
        whatsapp,
        email,
        alamat,
        status,
      });
    }

    router.push("/admin/klien");
  };

  return (
    <div className="flex flex-col min-h-screen bg-page">
      <AdminTopbar title={editId ? "Edit Klien" : "Tambah Klien"} />

      <main className="p-6 lg:p-8 flex flex-col gap-6 max-w-2xl w-full mx-auto text-left">
        <Link
          href="/admin/klien"
          className="inline-flex items-center gap-1.5 text-tombol font-semibold text-content-primary hover:text-orange-500 transition-colors self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Kelola Klien</span>
        </Link>

        <div className="bg-card rounded-2xl border border-divider shadow-card p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="border-b border-divider pb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-500 shrink-0">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-h2 font-bold text-navy-900 tracking-tight">
                  {editId ? "Edit Data Klien" : "Formulir Tambah Klien"}
                </h2>
                <p className="text-isi text-content-muted mt-0.5">
                  Masukkan data kontak klien perseorangan maupun korporasi.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <Input
                label="Nama Lengkap Klien"
                required
                placeholder="Contoh: Budi Santoso"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />

              <Input
                label="Perusahaan / Instansi"
                placeholder="Contoh: CV Maju Jaya (Opsional)"
                value={perusahaan}
                onChange={(e) => setPerusahaan(e.target.value)}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Nomor WhatsApp"
                  required
                  placeholder="Contoh: 0812-3456-7890"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  helperText="Format nomor aktif untuk koordinasi pemesanan."
                />

                <Input
                  label="Alamat Email"
                  type="email"
                  placeholder="Contoh: klien@mail.com (Opsional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <Textarea
                label="Alamat Lengkap Klien / Proyek"
                placeholder="Contoh: Jl. Ahmad Yani No. 88, Karawang Barat..."
                rows={3}
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
              />

              <Select
                label="Status Klien"
                value={status}
                onChange={(e) => setStatus(e.target.value as StatusKlien)}
                options={[
                  { label: "Aktif", value: "Aktif" },
                  { label: "Nonaktif", value: "Nonaktif" },
                ]}
              />
            </div>

            {/* Tombol Simpan Klien (Audit Poin 8.3) */}
            <div className="pt-6 border-t border-divider flex items-center justify-end gap-3">
              <Link href="/admin/klien">
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
                Simpan Klien
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default function TambahKlienPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <TambahKlienForm />
    </Suspense>
  );
}

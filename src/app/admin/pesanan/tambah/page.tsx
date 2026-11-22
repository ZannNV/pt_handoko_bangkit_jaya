"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getClients, getProducts, createOrder } from "@/lib/data/store";
import { Klien, Produk, StatusPembayaran, StatusPesanan } from "@/lib/types";
import { ArrowLeft, Save, Sparkles } from "lucide-react";

export default function TambahPesananPage() {
  const router = useRouter();
  const [clients, setClients] = useState<Klien[]>([]);
  const [products, setProducts] = useState<Produk[]>([]);

  // Form States
  const [klienId, setKlienId] = useState("");
  const [namaProduk, setNamaProduk] = useState("");
  const [jumlah, setJumlah] = useState("1 Unit");
  const [dimensi, setDimensi] = useState("");
  const [material, setMaterial] = useState("");
  const [nominal, setNominal] = useState("");
  const [statusPembayaran, setStatusPembayaran] = useState<StatusPembayaran>("Belum Bayar");
  const [statusPesanan, setStatusPesanan] = useState<StatusPesanan>("Diajukan");
  const [targetSelesai, setTargetSelesai] = useState("");
  const [alamat, setAlamat] = useState("");
  const [catatan, setCatatan] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const cList = getClients({ status: "Aktif" });
    setClients(cList);
    if (cList.length > 0) setKlienId(cList[0].id);

    const pList = getProducts({ status: "Tayang" });
    setProducts(pList);
    if (pList.length > 0) setNamaProduk(pList[0].nama);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaProduk.trim()) return;

    setIsSubmitting(true);

    const parsedNominal = Number(nominal.replace(/\D/g, "")) || 0;

    createOrder({
      klien_id: klienId,
      nama_produk: namaProduk,
      jumlah,
      dimensi,
      material,
      nominal: parsedNominal,
      status_pembayaran: statusPembayaran,
      status: statusPesanan,
      target_selesai: targetSelesai,
      alamat,
      catatan,
    });

    router.push("/admin/pesanan");
  };

  return (
    <div className="flex flex-col min-h-screen bg-page">
      <AdminTopbar title="Tambah Pesanan" />

      <main className="p-6 lg:p-8 flex flex-col gap-6 max-w-4xl w-full mx-auto text-left">
        {/* Navigasi Kembali */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin/pesanan"
            className="inline-flex items-center gap-1.5 text-tombol font-semibold text-content-primary hover:text-orange-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Kelola Pesanan</span>
          </Link>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-500 text-kecil font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kode otomatis server: HBJ-2026-NNNN</span>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-card rounded-2xl border border-divider shadow-card p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="border-b border-divider pb-4">
              <h2 className="text-h2 font-bold text-navy-900 tracking-tight">
                Formulir Pesanan Baru
              </h2>
              <p className="text-isi text-content-muted mt-1">
                Lengkapi rincian pesanan fabrikasi besi make-to-order untuk klien.
              </p>
            </div>

            {/* Bagian 1: Data Klien & Produk */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Select
                label="Pilih Klien Terdaftar"
                required
                value={klienId}
                onChange={(e) => setKlienId(e.target.value)}
                options={clients.map((c) => ({
                  label: `${c.nama} ${c.perusahaan && c.perusahaan !== "-" ? `(${c.perusahaan})` : ""}`,
                  value: c.id,
                }))}
                helperText="Belum ada klien? Tambahkan terlebih dahulu di menu Klien."
              />

              <div className="flex flex-col gap-1.5">
                <Input
                  label="Nama Produk / Pesanan"
                  required
                  placeholder="Contoh: Pagar Minimalis Modern"
                  value={namaProduk}
                  onChange={(e) => setNamaProduk(e.target.value)}
                  helperText="Atau pilih nama produk standar dari katalog."
                />
              </div>

              <Input
                label="Jumlah Unit / Volume"
                placeholder="Contoh: 1 Unit / 14 Meter Lari"
                value={jumlah}
                onChange={(e) => setJumlah(e.target.value)}
              />

              <Input
                label="Dimensi & Ukuran"
                placeholder="Contoh: Panjang 6m, Tinggi 1.8m"
                value={dimensi}
                onChange={(e) => setDimensi(e.target.value)}
              />

              <Input
                label="Spesifikasi Material Besi / Baja"
                placeholder="Contoh: Besi Hollow Galvanis 40x60 tebal 1.6mm"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
              />

              <Input
                label="Nominal Total Kesepakatan (Rp)"
                placeholder="Contoh: 12500000"
                value={nominal}
                onChange={(e) => setNominal(e.target.value)}
                helperText="Masukkan angka tanpa titik atau koma."
              />
            </div>

            {/* Bagian 2: Status & Penjadwalan */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4 border-t border-divider">
              <Select
                label="Status Pesanan"
                value={statusPesanan}
                onChange={(e) => setStatusPesanan(e.target.value as StatusPesanan)}
                options={[
                  { label: "Diajukan", value: "Diajukan" },
                  { label: "Ditinjau", value: "Ditinjau" },
                  { label: "Diproses", value: "Diproses" },
                  { label: "Selesai", value: "Selesai" },
                  { label: "Dibatalkan", value: "Dibatalkan" },
                ]}
              />

              <Select
                label="Status Pembayaran"
                value={statusPembayaran}
                onChange={(e) =>
                  setStatusPembayaran(e.target.value as StatusPembayaran)
                }
                options={[
                  { label: "Belum Bayar", value: "Belum Bayar" },
                  { label: "DP 30%", value: "DP 30%" },
                  { label: "DP 50%", value: "DP 50%" },
                  { label: "Lunas", value: "Lunas" },
                ]}
              />

              <Input
                label="Target Selesai Pengerjaan"
                type="date"
                value={targetSelesai}
                onChange={(e) => setTargetSelesai(e.target.value)}
              />
            </div>

            {/* Bagian 3: Alamat & Catatan */}
            <div className="flex flex-col gap-5 pt-4 border-t border-divider">
              <Input
                label="Alamat Pengiriman & Pemasangan"
                placeholder="Alamat lengkap lokasi pemasangan di lokasi klien..."
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
              />

              <Textarea
                label="Catatan Khusus Pengerjaan"
                placeholder="Tambahkan catatan desain, survei, atau instruksi teknisi las..."
                rows={3}
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
              />
            </div>

            {/* Tombol Simpan */}
            <div className="pt-6 border-t border-divider flex items-center justify-end gap-3">
              <Link href="/admin/pesanan">
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
                Simpan Pesanan
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { getOrders, createDocument } from "@/lib/data/store";
import { Pesanan } from "@/lib/types";
import { ArrowLeft, Save, UploadCloud, FileText } from "lucide-react";

export default function TambahDokumenPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Pesanan[]>([]);
  const [pesananId, setPesananId] = useState("");
  const [namaFile, setNamaFile] = useState("");
  const [tipeDokumen, setTipeDokumen] = useState("Desain");
  const [status, setStatus] = useState<"Lengkap" | "Pending">("Lengkap");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const list = getOrders();
    setOrders(list);
    if (list.length > 0) setPesananId(list[0].id);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setNamaFile(file.name);
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      setFileSize(`${sizeMB} MB`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pesananId || !namaFile.trim()) return;

    setIsSubmitting(true);

    createDocument({
      pesanan_id: pesananId,
      nama_file: namaFile,
      tipe_dokumen: tipeDokumen,
      ukuran_file: fileSize || "1.5 MB",
      status,
    });

    router.push("/admin/dokumen");
  };

  return (
    <div className="flex flex-col min-h-screen bg-page">
      <AdminTopbar title="Tambah Dokumen Pesanan" />

      <main className="p-6 lg:p-8 flex flex-col gap-6 max-w-2xl w-full mx-auto text-left">
        <Link
          href="/admin/dokumen"
          className="inline-flex items-center gap-1.5 text-tombol font-semibold text-content-primary hover:text-orange-500 transition-colors self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Dokumen Pesanan</span>
        </Link>

        <div className="bg-card rounded-2xl border border-divider shadow-card p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="border-b border-divider pb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-500 shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-h2 font-bold text-navy-900 tracking-tight">
                  Formulir Upload Dokumen
                </h2>
                <p className="text-isi text-content-muted mt-0.5">
                  Unggah berkas teknis, kontrak, invoice, atau foto lapangan.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <Select
                label="Pilih Pesanan Terkait"
                required
                value={pesananId}
                onChange={(e) => setPesananId(e.target.value)}
                options={orders.map((o) => ({
                  label: `${o.kode} - ${o.nama_produk} (${o.klien?.nama})`,
                  value: o.id,
                }))}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Tipe Dokumen"
                  value={tipeDokumen}
                  onChange={(e) => setTipeDokumen(e.target.value)}
                  options={[
                    { label: "Desain CAD / Gambar Kerja", value: "Desain" },
                    { label: "Invoice Pembayaran", value: "Invoice" },
                    { label: "Kontrak Kerja Sama", value: "Kontrak" },
                    { label: "Foto Lokasi / Lapangan", value: "Foto Lokasi" },
                    { label: "Bukti Transfer / DP", value: "Bukti DP" },
                    { label: "Spesifikasi Teknis", value: "Spesifikasi" },
                    { label: "Lainnya", value: "Lainnya" },
                  ]}
                />

                <Select
                  label="Status Kelengkapan"
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as "Lengkap" | "Pending")
                  }
                  options={[
                    { label: "Lengkap", value: "Lengkap" },
                    { label: "Pending", value: "Pending" },
                  ]}
                />
              </div>

              <Input
                label="Nama File Dokumen"
                required
                placeholder="Contoh: Desain-Pagar-0012.pdf"
                value={namaFile}
                onChange={(e) => setNamaFile(e.target.value)}
              />

              {/* Upload Dropzone */}
              <div className="flex flex-col gap-1.5">
                <label className="text-label font-semibold text-content-primary">
                  Pilih File (PDF, JPG, PNG, DOCX, ZIP)
                </label>
                <div className="border-2 border-dashed border-divider hover:border-orange-500 rounded-xl p-6 flex flex-col items-center justify-center gap-3 bg-page/50 transition-colors text-center cursor-pointer relative">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.docx,.zip"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-tombol font-semibold text-navy-900 block">
                      {fileName ? fileName : "Klik atau seret berkas ke sini"}
                    </span>
                    <span className="text-kecil text-content-muted">
                      {fileSize ? `Ukuran: ${fileSize}` : "Maksimal ukuran berkas 25 MB"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-divider flex items-center justify-end gap-3">
              <Link href="/admin/dokumen">
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
                Simpan Dokumen
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { submitOrderAction } from "@/actions/customer-actions";
import {
  ChevronRight,
  Upload,
  CheckCircle2,
  Copy,
  Check,
  Search,
  MessageCircle,
  FileCheck,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

function AjukanPesananContent() {
  const searchParams = useSearchParams();
  const defaultProduct = searchParams.get("produk") || "";

  const [isLoading, setIsLoading] = useState(false);
  const [successCode, setSuccessCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Form states
  const [namaLengkap, setNamaLengkap] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [perusahaan, setPerusahaan] = useState("");
  const [alamat, setAlamat] = useState("");
  const [jenisProduk, setJenisProduk] = useState(defaultProduct || "Pagar Perumahan");
  const [material, setMaterial] = useState("Besi Hollow Galvanis");
  const [targetSelesai, setTargetSelesai] = useState("");
  const [anggaran, setAnggaran] = useState("");
  const [panjang, setPanjang] = useState("");
  const [lebar, setLebar] = useState("");
  const [tinggi, setTinggi] = useState("");
  const [jumlah, setJumlah] = useState("1 Unit");
  const [catatan, setCatatan] = useState("");
  const [persetujuan, setPersetujuan] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleReset = () => {
    setNamaLengkap("");
    setWhatsapp("");
    setEmail("");
    setPerusahaan("");
    setAlamat("");
    setTargetSelesai("");
    setAnggaran("");
    setPanjang("");
    setLebar("");
    setTinggi("");
    setJumlah("1 Unit");
    setCatatan("");
    setPersetujuan(false);
    setFile(null);
    setFieldErrors({});
    setGeneralError("");
  };

  const handleCopyCode = () => {
    if (successCode) {
      navigator.clipboard.writeText(successCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError("");
    setFieldErrors({});

    if (!persetujuan) {
      setFieldErrors({
        persetujuan: "Anda harus menyetujui penggunaan data untuk penawaran.",
      });
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("nama_lengkap", namaLengkap);
    formData.append("whatsapp", whatsapp);
    formData.append("email", email);
    formData.append("perusahaan", perusahaan);
    formData.append("alamat_pengiriman", alamat);
    formData.append("jenis_produk", jenisProduk);
    formData.append("material", material);
    formData.append("target_selesai", targetSelesai);
    formData.append("anggaran", anggaran);
    formData.append("panjang", panjang);
    formData.append("lebar", lebar);
    formData.append("tinggi", tinggi);
    formData.append("jumlah", jumlah);
    formData.append("catatan", catatan);
    formData.append("persetujuan", String(persetujuan));

    // Honeypot field (harus kosong)
    const hpInput = (document.getElementById("website_hp") as HTMLInputElement)?.value || "";
    formData.append("website_hp", hpInput);

    if (file) {
      formData.append("lampiran", file);
    }

    try {
      const res = await submitOrderAction(formData);
      if (res.success && res.kode) {
        setSuccessCode(res.kode);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setGeneralError(res.error || "Gagal mengirimkan pengajuan pesanan.");
        if (res.errors) {
          setFieldErrors(res.errors);
        }
      }
    } catch {
      setGeneralError("Terjadi gangguan server. Silakan coba sesaat lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-page flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-[1280px] w-full mx-auto px-6 lg:px-8 py-8 flex flex-col gap-8 text-left">
        {/* Breadcrumb & Header Halaman (Frame 05) */}
        <div className="flex flex-col gap-2 border-b border-divider pb-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-kecil text-content-muted">
            <Link href="/" className="hover:text-navy-900 transition-colors">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-navy-900 font-semibold">Ajukan Pesanan</span>
          </nav>
          <div className="flex flex-col gap-1">
            <h1 className="text-display-sm sm:text-display font-bold text-navy-900 tracking-tight">
              Ajukan Pesanan
            </h1>
            <p className="text-isi text-content-muted max-w-2xl">
              Isi formulir berikut. Tim kami akan menghubungi Anda untuk konfirmasi dan penawaran.
            </p>
          </div>
        </div>

        {/* Modal / Card Sukses Pengajuan */}
        {successCode ? (
          <div className="bg-card rounded-2xl border-2 border-status-success-text/30 shadow-modal p-8 sm:p-10 flex flex-col items-center text-center max-w-2xl mx-auto gap-6 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-status-success-bg text-status-success-text flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-label font-bold uppercase tracking-wider text-status-success-text">
                Pengajuan Berhasil Terkirim
              </span>
              <h2 className="text-h1 font-bold text-navy-900">
                Terima Kasih, Pesanan Anda Telah Kami Terima!
              </h2>
              <p className="text-isi text-content-muted">
                Simpan kode pesanan di bawah ini untuk memantau proses survei, penawaran RAB, hingga proses pengerjaan di workshop kami.
              </p>
            </div>

            {/* Kode Pesanan Box dengan tombol salin */}
            <div className="w-full bg-latar-halaman p-4 rounded-xl border border-divider flex items-center justify-between gap-4">
              <div className="text-left">
                <span className="text-kecil text-content-muted block">Kode Pesanan Anda:</span>
                <span className="text-h2 font-mono font-bold text-navy-900">
                  {successCode}
                </span>
              </div>
              <Button
                type="button"
                variant="sekunder"
                size="sm"
                onClick={handleCopyCode}
                leftIcon={copied ? <Check className="w-4 h-4 text-status-success-text" /> : <Copy className="w-4 h-4" />}
              >
                {copied ? "Tersalin!" : "Salin Kode"}
              </Button>
            </div>

            {/* Navigasi Lanjutan */}
            <div className="flex flex-wrap items-center justify-center gap-3 w-full pt-2">
              <Link href={`/cek-status?kode=${encodeURIComponent(successCode)}`}>
                <Button variant="utama" size="md" leftIcon={<Search className="w-4 h-4" />}>
                  Cek Status Pesanan Ini
                </Button>
              </Link>
              <Link href={`/hubungi?produk=${encodeURIComponent(jenisProduk)}`}>
                <Button
                  variant="outline-navy"
                  size="md"
                  leftIcon={<MessageCircle className="w-4 h-4 text-orange-500" />}
                >
                  Konfirmasi ke WhatsApp
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          /* Form Pengajuan Pesanan 2 Kolom (Frame 05) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Kolom Kiri: Form Utama */}
            <form onSubmit={handleSubmit} className="lg:col-span-8 flex flex-col gap-8">
              {generalError && (
                <div className="p-4 rounded-xl bg-status-danger-bg border border-status-danger-text/20 text-status-danger-text text-isi flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{generalError}</span>
                </div>
              )}

              {/* Honeypot field (anti-bot) */}
              <input
                type="text"
                id="website_hp"
                name="website_hp"
                tabIndex={-1}
                autoComplete="off"
                style={{ display: "none" }}
                aria-hidden="true"
              />

              {/* Bagian 1: Data Pemesan (Frame 05) */}
              <div className="bg-card rounded-2xl border border-divider shadow-card p-6 sm:p-8 flex flex-col gap-5">
                <div className="border-b border-divider pb-3">
                  <h2 className="text-h2 font-bold text-navy-900">
                    Data Pemesan
                  </h2>
                  <p className="text-kecil text-content-muted mt-0.5">
                    Informasi kontak Anda untuk konfirmasi jadwal survei dan penawaran teknis.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Nama Lengkap"
                    required
                    value={namaLengkap}
                    onChange={(e) => setNamaLengkap(e.target.value)}
                    placeholder="Contoh: Budi Santoso"
                    error={fieldErrors.nama_lengkap}
                  />
                  <Input
                    label="No. WhatsApp"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="Contoh: 0812-3456-7890"
                    helperText="Pastikan nomor aktif dan terhubung dengan WhatsApp."
                    error={fieldErrors.whatsapp}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Email (Opsional)"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@contoh.com"
                    error={fieldErrors.email}
                  />
                  <Input
                    label="Instansi / Perusahaan (Opsional)"
                    value={perusahaan}
                    onChange={(e) => setPerusahaan(e.target.value)}
                    placeholder="Contoh: CV Maju Jaya"
                  />
                </div>

                <Textarea
                  label="Alamat Pengiriman / Lokasi Pemasangan"
                  required
                  rows={3}
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  placeholder="Alamat lengkap lokasi pemasangan (jalan, nomor, perumahan, kelurahan, kecamatan, kota)..."
                  error={fieldErrors.alamat_pengiriman}
                />
              </div>

              {/* Bagian 2: Detail Pesanan (Frame 05) */}
              <div className="bg-card rounded-2xl border border-divider shadow-card p-6 sm:p-8 flex flex-col gap-5">
                <div className="border-b border-divider pb-3">
                  <h2 className="text-h2 font-bold text-navy-900">
                    Detail Pesanan
                  </h2>
                  <p className="text-kecil text-content-muted mt-0.5">
                    Spesifikasi pesanan custom fabrikasi besi yang Anda butuhkan.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    label="Jenis Produk *"
                    value={jenisProduk}
                    onChange={(e) => setJenisProduk(e.target.value)}
                    options={[
                      { label: "Pagar Perumahan", value: "Pagar Perumahan" },
                      { label: "Kanopi", value: "Kanopi" },
                      { label: "Railing Tangga & Balkon", value: "Railing Tangga & Balkon" },
                      { label: "Rak Besi Gudang", value: "Rak Besi Gudang" },
                      { label: "Pintu Besi & Harmonika", value: "Pintu Besi & Harmonika" },
                      { label: "Teralis Jendela Minimalis", value: "Teralis Jendela Minimalis" },
                      { label: "Fabrikasi Besi Custom Lainnya", value: "Fabrikasi Besi Custom Lainnya" },
                    ]}
                  />

                  <Select
                    label="Pilihan Material"
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    options={[
                      { label: "Besi Hollow Galvanis (Rekomendasi Anti Karat)", value: "Besi Hollow Galvanis" },
                      { label: "Pipa Galvanis & Plat Besi SNI", value: "Pipa Galvanis & Plat Besi SNI" },
                      { label: "Baja WF / H-Beam", value: "Baja WF / H-Beam" },
                      { label: "Besi Siku Lubang Tebal", value: "Besi Siku Lubang Tebal" },
                      { label: "Plat Cutting Laser", value: "Plat Cutting Laser" },
                      { label: "Konsultasikan dengan Tim HBJ", value: "Konsultasikan dengan Tim HBJ" },
                    ]}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Target Selesai (Opsional)"
                    type="date"
                    value={targetSelesai}
                    onChange={(e) => setTargetSelesai(e.target.value)}
                  />
                  <Input
                    label="Estimasi Anggaran (Opsional)"
                    value={anggaran}
                    onChange={(e) => setAnggaran(e.target.value)}
                    placeholder="Contoh: 15.000.000"
                  />
                </div>

                {/* Dimensi: Panjang, Lebar, Tinggi */}
                <div>
                  <label className="text-label font-semibold text-content-primary block mb-1.5">
                    Perkiraan Dimensi Ukuran (Opsional)
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <Input
                      label="Panjang (cm)"
                      value={panjang}
                      onChange={(e) => setPanjang(e.target.value)}
                      placeholder="600"
                    />
                    <Input
                      label="Lebar (cm)"
                      value={lebar}
                      onChange={(e) => setLebar(e.target.value)}
                      placeholder="500"
                    />
                    <Input
                      label="Tinggi (cm)"
                      value={tinggi}
                      onChange={(e) => setTinggi(e.target.value)}
                      placeholder="180"
                    />
                  </div>
                </div>

                <Input
                  label="Jumlah *"
                  required
                  value={jumlah}
                  onChange={(e) => setJumlah(e.target.value)}
                  placeholder="Contoh: 1 Unit / 14 Meter Lari"
                  error={fieldErrors.jumlah}
                />

                {/* Upload Lampiran Desain / Foto Lokasi */}
                <div>
                  <label className="text-label font-semibold text-content-primary block mb-1.5">
                    Lampiran Desain / Referensi Foto (Opsional)
                  </label>
                  <div className="border-2 border-dashed border-divider hover:border-orange-500 rounded-xl p-6 text-center bg-latar-halaman transition-colors relative">
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setFile(e.target.files[0]);
                        }
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-navy-100 text-navy-700 flex items-center justify-center">
                        <Upload className="w-5 h-5 text-orange-500" />
                      </div>
                      <span className="text-isi font-semibold text-navy-900">
                        {file ? file.name : "⬆ Klik atau seret file ke sini"}
                      </span>
                      <span className="text-kecil text-content-muted">
                        Format yang didukung: JPG, PNG, PDF (Maksimal 5MB)
                      </span>
                    </div>
                  </div>
                </div>

                <Textarea
                  label="Catatan Tambahan"
                  rows={3}
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                  placeholder="Detail kebutuhan khusus, pilihan warna finishing cat, akses lokasi, atau permintaan survei..."
                />

                {/* Checkbox Persetujuan */}
                <div className="flex flex-col gap-1 pt-2">
                  <label className="flex items-start gap-3 cursor-pointer text-isi text-content-primary">
                    <input
                      type="checkbox"
                      checked={persetujuan}
                      onChange={(e) => setPersetujuan(e.target.checked)}
                      className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500 border-divider mt-1"
                    />
                    <span>
                      Saya setuju data saya digunakan untuk keperluan verifikasi dan penyusunan penawaran teknis PT Handoko Bangkit Jaya.
                    </span>
                  </label>
                  {fieldErrors.persetujuan && (
                    <span className="text-kecil text-status-danger-text pl-7">
                      {fieldErrors.persetujuan}
                    </span>
                  )}
                </div>

                <div className="border-t border-divider pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-kecil text-content-muted">
                    * wajib diisi. Setelah dikirim, Anda akan mendapat kode pesanan untuk cek status.
                  </span>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Button
                      type="button"
                      variant="sekunder"
                      size="md"
                      onClick={handleReset}
                      className="w-full sm:w-auto"
                    >
                      Reset
                    </Button>
                    <Button
                      type="submit"
                      variant="utama"
                      size="md"
                      isLoading={isLoading}
                      className="w-full sm:w-auto"
                    >
                      Kirim Pengajuan
                    </Button>
                  </div>
                </div>
              </div>
            </form>

            {/* Kolom Kanan: Panduan Alur & Bantuan (Frame 05) */}
            <aside className="lg:col-span-4 flex flex-col gap-6">
              {/* Card 1: Alur Pengajuan (5 Tahap) */}
              <div className="bg-card rounded-2xl border border-divider shadow-card p-6 flex flex-col gap-4">
                <h3 className="text-h3 font-bold text-navy-900 border-b border-divider pb-3">
                  Alur Pengajuan
                </h3>
                <div className="flex flex-col gap-3.5">
                  {[
                    "Isi formulir pengajuan",
                    "Tim menghubungi via WhatsApp",
                    "Konfirmasi desain & penawaran",
                    "Pembayaran & produksi",
                    "Cek status dengan kode pesanan",
                  ].map((stepText, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-navy-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-isi text-content-primary">
                        {stepText}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 2: Butuh Bantuan? */}
              <div className="bg-card rounded-2xl border border-divider shadow-card p-6 flex flex-col gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-500 flex items-center justify-center">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <h3 className="text-h3 font-bold text-navy-900">
                    Butuh bantuan?
                  </h3>
                </div>
                <p className="text-isi text-content-muted leading-relaxed">
                  Konsultasikan rancangan ukuran atau kebutuhan material Anda secara gratis dengan tim teknis kami.
                </p>
                <Link href="/hubungi">
                  <Button
                    variant="outline-navy"
                    size="md"
                    className="w-full justify-center"
                    leftIcon={<MessageCircle className="w-4 h-4 text-orange-500" />}
                  >
                    Hubungi via WhatsApp
                  </Button>
                </Link>
                <span className="text-kecil text-content-muted text-center block">
                  Jam layanan: Senin–Sabtu, 08.00–16.00 WIB
                </span>
              </div>

              {/* Card 3: Sudah Punya Kode Pesanan? */}
              <div className="p-6 rounded-2xl bg-latar-halaman border border-divider flex flex-col gap-3.5">
                <h3 className="text-tombol font-bold text-navy-900">
                  Sudah punya kode pesanan?
                </h3>
                <p className="text-kecil text-content-muted">
                  Pantau perkembangan survei dan fabrikasi pesanan Anda secara real-time.
                </p>
                <Link href="/cek-status">
                  <Button
                    variant="sekunder"
                    size="sm"
                    className="w-full justify-center"
                    leftIcon={<Search className="w-4 h-4 text-navy-700" />}
                  >
                    Cek Status Pesanan
                  </Button>
                </Link>
              </div>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function AjukanPesananPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-page flex items-center justify-center">
          <div className="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <AjukanPesananContent />
    </Suspense>
  );
}

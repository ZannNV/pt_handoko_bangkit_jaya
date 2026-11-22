export const STATUS_PESANAN = [
  "Diajukan",
  "Ditinjau",
  "Diproses",
  "Selesai",
  "Dibatalkan",
] as const;

export type StatusPesanan = (typeof STATUS_PESANAN)[number];

// Aturan transisi status resmi (Bagian 4):
// Diajukan > Ditinjau > Diproses > Selesai (Dibatalkan boleh dari status mana pun sebelum Selesai)
export const ALLOWED_STATUS_TRANSITIONS: Record<StatusPesanan, readonly StatusPesanan[]> = {
  Diajukan: ["Ditinjau", "Dibatalkan"],
  Ditinjau: ["Diproses", "Dibatalkan"],
  Diproses: ["Selesai", "Dibatalkan"],
  Selesai: [],
  Dibatalkan: [],
};

export function isValidStatusTransition(
  currentStatus: StatusPesanan,
  nextStatus: StatusPesanan
): boolean {
  if (currentStatus === nextStatus) return true;
  const allowed = ALLOWED_STATUS_TRANSITIONS[currentStatus];
  return allowed ? allowed.includes(nextStatus) : false;
}

export const STATUS_PEMBAYARAN = [
  "Belum Bayar",
  "DP 30%",
  "DP 50%",
  "Lunas",
] as const;

export type StatusPembayaran = (typeof STATUS_PEMBAYARAN)[number];

export type StatusKlien = "Aktif" | "Nonaktif";
export type StatusProduk = "Tayang" | "Draft";
export type StatusDokumen = "Lengkap" | "Pending";

export interface Kategori {
  id: string;
  nama: string;
  slug: string;
  deskripsi?: string;
  urutan?: number;
  jumlah_produk?: number;
  created_at?: string;
}

export interface Produk {
  id: string;
  kategori_id: string;
  nama: string;
  slug: string;
  deskripsi: string;
  gambar_url?: string;
  status: StatusProduk;
  urutan?: number;
  created_at?: string;
  kategori?: Kategori;
}

export interface PortofolioMedia {
  id: string;
  portofolio_id: string;
  tipe: "image" | "video";
  url: string;
  urutan: number;
}

export interface Portofolio {
  id: string;
  kategori_id: string;
  judul: string;
  slug: string;
  deskripsi: string;
  tanggal_selesai: string; // YYYY-MM-DD
  status_tampil: boolean;
  gambar_utama?: string;
  media?: PortofolioMedia[];
  created_at?: string;
  kategori?: Kategori;
}

export interface Klien {
  id: string;
  nama: string;
  perusahaan?: string;
  whatsapp: string;
  email?: string;
  alamat?: string;
  status: StatusKlien;
  jumlah_pesanan?: number;
  created_at?: string;
}

export interface RiwayatStatus {
  id: string;
  pesanan_id: string;
  status: StatusPesanan;
  catatan?: string;
  diubah_oleh: string;
  created_at: string;
}

export interface DokumenPesanan {
  id: string;
  pesanan_id: string;
  kode_pesanan?: string;
  nama_klien?: string;
  nama_file: string;
  file_url: string;
  tipe_dokumen: string; // Desain, Invoice, Kontrak, Foto Lokasi, Bukti DP, Spesifikasi, Lainnya
  ukuran_file: string;
  status: StatusDokumen;
  created_at: string;
}

export interface Pesanan {
  id: string;
  kode: string; // Format: HBJ-YYYY-NNNN
  klien_id: string;
  produk_id?: string;
  nama_produk: string;
  tanggal: string; // YYYY-MM-DD
  status: StatusPesanan;
  status_pembayaran: StatusPembayaran;
  nominal: number;
  jumlah?: string;
  dimensi?: string;
  material?: string;
  target_selesai?: string;
  anggaran?: string;
  alamat?: string;
  catatan?: string;
  created_at?: string;
  klien?: Klien;
  produk?: Produk;
  riwayat?: RiwayatStatus[];
  dokumen?: DokumenPesanan[];
}

export interface KeunggulanItem {
  nomor: number;
  judul: string;
  deskripsi: string;
}

export interface AlurProduksiItem {
  tahap: number;
  judul: string;
  deskripsi: string;
}

export interface ProfilUsaha {
  id: number;
  nama_perusahaan: string;
  bidang_usaha: string;
  deskripsi: string;
  visi: string;
  misi: string[];
  keunggulan: KeunggulanItem[]; // 3 kartu keunggulan
  alur_produksi: AlurProduksiItem[]; // 4 tahap alur produksi
  whatsapp: string;
  email: string;
  alamat: string;
  jam_layanan: string;
  foto_workshop?: string;
  updated_at?: string;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  nama_lengkap: string;
  role: "admin";
}

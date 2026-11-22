# Sistem Informasi Penjualan (SIP) - PT Handoko Bangkit Jaya

Aplikasi web Sistem Informasi Penjualan (SIP) berbasis web untuk **PT Handoko Bangkit Jaya**, perusahaan fabrikasi dan konstruksi besi make-to-order yang berlokasi di Karawang, Jawa Barat.

Aplikasi ini mencakup dua sisi:
1. **Website Publik (Customer)**: Beranda produk unggulan & portofolio, katalog lengkap dengan filter/pencarian, detail produk & portofolio, profil usaha terpadu, alur pengajuan pesanan custom dengan penomoran unik otomatis (`HBJ-YYYY-NNNN`), cek status pesanan real-time, dan integrasi WhatsApp.
2. **Panel Admin (Pemilik/Admin)**: Panel terproteksi dengan Dashboard ringkasan dinamis, Kelola Pesanan (CRUD, filter, riwayat status, detail modal), Kelola Klien, Kelola Dokumen Pesanan (upload, preview, unduh), Kelola Produk & Kategori, Kelola Portofolio (multi-foto, toggle status tampil), dan Wizard 3-Langkah Profil Usaha.

---

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS dengan CSS Custom Properties (Design Tokens Figma)
- **Database & Backend**: Supabase (PostgreSQL, Auth, Storage) dengan fallback in-memory store
- **Form & Validasi**: React Hook Form + Zod
- **Icons**: Lucide React / SVG kustom berbasis Figma design

---

## Kredensial & Autentikasi Admin
- **URL Login Admin**: `/admin/login`
- **Mekanisme Keamanan**: Autentikasi server-side sungguhan menggunakan bcrypt password hash dan JWT sesi tersimpan dalam cookie aman `httpOnly` (`sameSite: lax`, `secure` di production).
- **Proteksi Rute**: Seluruh rute `/admin/*` dilindungi di tingkat Edge Runtime melalui Next.js Middleware (`src/middleware.ts`).
- **Konfigurasi Akun**: Kredensial admin dikonfigurasi di file server-only `.env.local` (tanpa prefix `NEXT_PUBLIC_`):
  - `ADMIN_USERNAME=admin`
  - `ADMIN_PASSWORD_HASH` (bcrypt hash)
  - `JWT_SECRET`
- Silakan periksa file `.env.example` untuk panduan konfigurasi variabel lingkungan yang aman.

---

## Langkah Menjalankan Proyek Secara Lokal

### 1. Prasyarat
- Node.js versi 18.17 atau lebih tinggi (disarankan Node.js 20+)
- npm versi 9 atau lebih tinggi

### 2. Instalasi Ketergantungan (Dependencies)
```bash
npm install
```

### 3. Konfigurasi Environment Variables
Salin file `.env.example` menjadi `.env.local`:
```bash
cp .env.example .env.local
```
Isi konfigurasi Supabase Anda pada `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
> *Catatan: Aplikasi telah dilengkapi layer in-memory mock store dengan seed data lengkap, sehingga seluruh fitur admin dan customer dapat dijalankan dan diuji langsung meskipun koneksi Supabase live belum dihubungkan.*

### 4. Setup Database Supabase (Opsional jika menggunakan live Supabase)
Buka SQL Editor di dashboard Supabase Anda dan jalankan file berikut secara berurutan:
1. `supabase/migrations/20261121_init.sql` — Menyiapkan schema tabel, trigger penomoran otomatis `HBJ-YYYY-NNNN`, dan kebijakan Row Level Security (RLS).
2. `supabase/seed.sql` — Memasukkan data awal realistis untuk kategori, produk, portofolio, klien, pesanan, dokumen, dan profil usaha.

### 5. Menjalankan Server Development
```bash
npm run dev
```
Buka browser dan akses: `http://localhost:3000`

### 6. Menjalankan Versi Production Build
```bash
npm run build
npm run start
```

### 7. Cara Membuka Website & VS Code Live Server

Ada beberapa cara praktis untuk mengakses dan menguji website ini:

1. **Buka via VS Code Live Server**:
   - Di VS Code, klik kanan file `index.html` lalu pilih **"Open with Live Server"** (atau klik tombol **"Go Live"** di status bar bawah VS Code).
   - Live Server akan membuka portal interaktif di `http://127.0.0.1:5500/index.html`.
   - Di dalam portal, Anda dapat langsung menguji seluruh halaman (Beranda, Katalog, Profil, Ajukan Pesanan, Admin) di dalam frame interaktif, mengganti ukuran layar (Desktop 1440px, Tablet, HP), atau membuka di tab baru.

2. **Akses Online Web (Cloudflare Edge Global - Bebas Timeout)**:
   - Buka tautan HTTPS: **`https://discover-rfc-pad-charles.trycloudflare.com`**
   - Bisa dibuka langsung dari smartphone/HP atau komputer lain di luar jaringan tanpa localhost.

3. **Akses Jaringan Wi-Fi / LAN (Satu Jaringan)**:
   - Buka: **`http://192.168.100.160:3000`** dari perangkat apa pun (HP, tablet, laptop) yang terhubung ke Wi-Fi yang sama.

4. **Klik 2x File `Buka-Website.bat`**:
   - Shortcut praktis di File Explorer untuk langsung meluncurkan portal di browser.

---

## Struktur Rute & Halaman

### Customer (Publik)
| Rute | Deskripsi | Status |
| --- | --- | --- |
| `/` | Beranda Publik (Hero, Keunggulan, Produk Populer, Portofolio Pilihan, CTA WhatsApp) | Selesai |
| `/katalog` | Katalog Produk & Portofolio (Filter kategori, pencarian nama, paginasi) | Selesai |
| `/katalog/[slug]` | Detail Produk & Portofolio (Galeri multi-foto interaktif, spesifikasi material, CTA pesanan & WA) | Selesai |
| `/profil` | Profil Usaha Web (Tentang, Visi & Misi, 3 Keunggulan, 4 Alur Produksi, Foto Workshop, Kontak) | Selesai |
| `/ajukan-pesanan` | Form Pengajuan Pesanan Custom (Honeypot, Zod validation, MIME check, auto kode unik `HBJ-YYYY-NNNN`) | Selesai |
| `/cek-status` | Pelacakan Status Pesanan (Stepper status, tanpa membocorkan data pribadi klien) | Selesai |
| `/hubungi` | Tautan langsung ke WhatsApp resmi dengan template pesan otomatis | Selesai |
| `/uji-komponen` | Halaman Pengujian Design Tokens & Komponen Reusable | Selesai |

### Panel Admin (Terproteksi)
| Rute | Frame Figma | Deskripsi |
| --- | --- | --- |
| `/admin/login` | Frame 01 | Login Admin dengan validasi kredensial dan pesan galat berbahasa Indonesia |
| `/admin/dashboard` | Frame 02 | Dashboard metrik (Total Pesanan, Dalam Proses, Selesai, Menunggu Review), 8 pesanan terbaru, riwayat status, aksi cepat |
| `/admin/pesanan` | Frame 03 | Kelola Pesanan: Filter status/pembayaran/tanggal, pencarian, detail modal, riwayat status, hapus konfirmasi |
| `/admin/pesanan/tambah` | Frame 04 | Tambah Pesanan baru dengan kode otomatis `HBJ-YYYY-NNNN` |
| `/admin/klien` | Frame 05 | Dashboard Klien: Tabel klien, hitung otomatis jumlah pesanan, status Aktif/Nonaktif |
| `/admin/klien/tambah` | Frame 06 | Tambah Klien dengan tombol `Simpan Klien` |
| `/admin/dokumen` | Frame 07 | Dashboard Dokumen: Unggah desain/invoice/kontrak, preview modal, unduh file, filter status Lengkap/Pending |
| `/admin/dokumen/tambah` | Frame 08 | Tambah Dokumen Pesanan dengan area dropzone file |
| `/admin/produk` | Frame 09 | Dashboard Produk & Kategori dengan tab switcher, hitung produk per kategori, status Tayang/Draft |
| `/admin/produk/tambah` | Frame 10 | Tambah Produk baru dengan tombol `Simpan Produk` |
| `/admin/kategori/tambah` | Frame 11 | Tambah Kategori baru dengan tombol `Simpan Kategori` |
| `/admin/portofolio` | Frame 12 | Dashboard Portofolio: Tabel portofolio, toggle status tampil interaktif, galeri foto |
| `/admin/portofolio/tambah` | Frame 13 | Tambah Portofolio dengan tanggal selesai lengkap |
| `/admin/profil` | Frame 14 | Profil Usaha: Ringkasan data usaha, visi misi, keunggulan, alur produksi |
| `/admin/profil/edit` | Frames 15-17 | Wizard 3-Langkah: (1) Tentang Usaha, (2) Visi & Keunggulan, (3) Produksi & Kontak |

---

## Design Tokens & Standar Desain
- **Warna Utama**:
  - `Navy/900`: `#10233C`
  - `Navy/700`: `#1D3A5C`
  - `Navy/100`: `#E4EAF2`
  - `Oranye/500`: `#F58220`
  - `Oranye/100`: `#FDEBD8`
- **Warna Latar & Teks**:
  - `Latar/Halaman`: `#F3F5F8`
  - `Latar/Kartu`: `#FFFFFF`
  - `Garis`: `#D5DBE3`
  - `Teks/Utama`: `#10233C`
  - `Teks/Redup`: `#566579`
  - `Teks/Di Atas Gelap`: `#FFFFFF`
  - `Teks/Redup Di Atas Gelap`: `#B8C4D4`
- **Status (Latar / Teks)**:
  - Sukses: `#DCF2E3` / `#17613A`
  - Peringatan: `#FFF0D1` / `#7A4B00`
  - Info: `#E1ECFA` / `#174E8C`
  - Bahaya: `#FBE0E0` / `#912020`
  - Netral: `#E7EBF0` / `#3F4E62`
- **Format Kode Pesanan**: `HBJ-YYYY-NNNN` (contoh: `HBJ-2026-0012`)
- **Format Tanggal**: Standar tunggal konsisten `dd-mm-yyyy` (contoh: `27-10-2026`, riwayat waktu: `27-10-2026 14:00`)
- **Format Mata Uang**: Rata kanan (`text-right`) berformat `Rp X.XXX.XXX` (contoh: `Rp 2.500.000`)

import {
  Kategori,
  Produk,
  Portofolio,
  Klien,
  Pesanan,
  RiwayatStatus,
  DokumenPesanan,
  ProfilUsaha,
  AdminUser,
  StatusPesanan,
  StatusPembayaran,
  isValidStatusTransition,
  ALLOWED_STATUS_TRANSITIONS,
} from "../types";

// Seed Data Kategori
let categoriesData: Kategori[] = [
  {
    id: "b0000000-0000-0000-0000-000000000001",
    nama: "Pagar Perumahan",
    slug: "pagar-perumahan",
    deskripsi:
      "Pagar besi minimalis, laser cut, dan tempa modern untuk hunian pribadi maupun perumahan cluster.",
    urutan: 1,
  },
  {
    id: "b0000000-0000-0000-0000-000000000002",
    nama: "Rak Besi",
    slug: "rak-besi",
    deskripsi:
      "Rak besi siku, rak gudang heavy duty, dan rak display kombinasi kayu minimalis.",
    urutan: 2,
  },
  {
    id: "b0000000-0000-0000-0000-000000000003",
    nama: "Kanopi",
    slug: "kanopi",
    deskripsi:
      "Kanopi baja ringan, hollow galvanis, atap solarflat, spandex, alderon, dan kaca tempered.",
    urutan: 3,
  },
  {
    id: "b0000000-0000-0000-0000-000000000004",
    nama: "Railing & Pintu Besi",
    slug: "railing-pintu-besi",
    deskripsi:
      "Railing tangga putar, balkon, pintu dorong folding gate, dan pintu darurat besi.",
    urutan: 4,
  },
];

// Seed Data Produk
let productsData: Produk[] = [
  {
    id: "c0000000-0000-0000-0000-000000000001",
    kategori_id: "b0000000-0000-0000-0000-000000000001",
    nama: "Pagar Minimalis Modern",
    slug: "pagar-minimalis-modern",
    deskripsi:
      "Pagar besi hollow galvanis dengan desain horizontal minimalis, dilapisi cat oven anti karat. Cocok untuk rumah modern dan cluster.",
    gambar_url:
      "https://images.unsplash.com/photo-1783267896933-ab57dc7dc59d?auto=format&fit=crop&w=800&q=80",
    status: "Tayang",
    urutan: 1,
  },
  {
    id: "c0000000-0000-0000-0000-000000000002",
    kategori_id: "b0000000-0000-0000-0000-000000000001",
    nama: "Pagar Laser Cut Plat Besi",
    slug: "pagar-laser-cut",
    deskripsi:
      "Pagar motif custom menggunakan mesin cutting CNC plat besi 2mm-3mm, memberikan estetika mewah dan privacy optimal.",
    gambar_url:
      "https://images.unsplash.com/photo-1758413351682-698f32acadc8?auto=format&fit=crop&w=800&q=80",
    status: "Tayang",
    urutan: 2,
  },
  {
    id: "c0000000-0000-0000-0000-000000000003",
    kategori_id: "b0000000-0000-0000-0000-000000000002",
    nama: "Rak Gudang Heavy Duty",
    slug: "rak-gudang-heavy-duty",
    deskripsi:
      "Rak penyimpanan beban berat untuk gudang logistik dan pabrik, kapasitas beban hingga 500kg per ambalan.",
    gambar_url:
      "https://images.unsplash.com/photo-1644079446600-219068676743?auto=format&fit=crop&w=800&q=80",
    status: "Tayang",
    urutan: 3,
  },
  {
    id: "c0000000-0000-0000-0000-000000000004",
    kategori_id: "b0000000-0000-0000-0000-000000000002",
    nama: "Rak Display Kombinasi Kayu",
    slug: "rak-display-kayu",
    deskripsi:
      "Rak estetik dengan rangka besi hollow hitam matte dan ambalan kayu solid/multiplex finishing HPL.",
    gambar_url:
      "https://images.unsplash.com/photo-1692607431259-951c39946cbf?auto=format&fit=crop&w=800&q=80",
    status: "Tayang",
    urutan: 4,
  },
  {
    id: "c0000000-0000-0000-0000-000000000005",
    kategori_id: "b0000000-0000-0000-0000-000000000003",
    nama: "Kanopi Hollow Atap Alderon",
    slug: "kanopi-hollow-alderon",
    deskripsi:
      "Rangka hollow galvanis 40x80 tebal 1.6mm dengan atap uPVC Alderon peredam panas dan suara hujan.",
    gambar_url:
      "https://images.unsplash.com/photo-1762117360944-82ad090fffb5?auto=format&fit=crop&w=800&q=80",
    status: "Tayang",
    urutan: 5,
  },
  {
    id: "c0000000-0000-0000-0000-000000000006",
    kategori_id: "b0000000-0000-0000-0000-000000000003",
    nama: "Kanopi Kaca Tempered Minimalis",
    slug: "kanopi-kaca-tempered",
    deskripsi:
      "Kanopi kaca tempered 8mm/10mm dengan rangka besi WF atau pipa galvanis kuat untuk carport eksklusif.",
    gambar_url:
      "https://images.unsplash.com/photo-1786999629449-40bf5a4f8e1d?auto=format&fit=crop&w=800&q=80",
    status: "Tayang",
    urutan: 6,
  },
  {
    id: "c0000000-0000-0000-0000-000000000007",
    kategori_id: "b0000000-0000-0000-0000-000000000004",
    nama: "Railing Tangga & Balkon Minimalis",
    slug: "railing-tangga-minimalis",
    deskripsi:
      "Railing pegangan tangga besi hollow kombinasi handrail kayu atau kaca tempered untuk keamanan dan estetika interior.",
    gambar_url:
      "https://images.unsplash.com/photo-1690661452556-7bf55de5708e?auto=format&fit=crop&w=800&q=80",
    status: "Tayang",
    urutan: 7,
  },
  {
    id: "c0000000-0000-0000-0000-000000000008",
    kategori_id: "b0000000-0000-0000-0000-000000000004",
    nama: "Pintu Besi Harmonika Heavy Duty",
    slug: "pintu-besi-harmonika",
    deskripsi:
      "Pintu besi lipat harmonika kokoh untuk proteksi ruko, toko, garasi, dan pabrik dengan sistem penguncian ganda.",
    gambar_url:
      "https://images.unsplash.com/photo-1790655571490-ede2738dd12d?auto=format&fit=crop&w=800&q=80",
    status: "Tayang",
    urutan: 8,
  },
];

// Seed Data Portofolio
let portfoliosData: Portofolio[] = [
  {
    id: "d0000000-0000-0000-0000-000000000001",
    kategori_id: "b0000000-0000-0000-0000-000000000001",
    judul: "Pagar Rumah Modern Minimalis",
    slug: "pagar-rumah-modern-minimalis",
    deskripsi:
      "Pengerjaan pagar gerbang sliding dan pintu dorong untuk perumahan Cluster Grand Taruma Karawang. Menggunakan hollow 40x60 dengan finishing cat duco hitam semi-gloss.",
    tanggal_selesai: "2026-08-04",
    status_tampil: true,
    gambar_utama:
      "https://images.unsplash.com/photo-1783267896933-ab57dc7dc59d?auto=format&fit=crop&w=1200&q=80",
    media: [
      {
        id: "m001",
        portofolio_id: "d0000000-0000-0000-0000-000000000001",
        tipe: "image",
        url: "https://images.unsplash.com/photo-1783267896933-ab57dc7dc59d?auto=format&fit=crop&w=1200&q=80",
        urutan: 1,
      },
      {
        id: "m002",
        portofolio_id: "d0000000-0000-0000-0000-000000000001",
        tipe: "image",
        url: "https://images.unsplash.com/photo-1725162066982-5e616a4bf45d?auto=format&fit=crop&w=1200&q=80",
        urutan: 2,
      },
      {
        id: "m003",
        portofolio_id: "d0000000-0000-0000-0000-000000000001",
        tipe: "image",
        url: "https://images.unsplash.com/photo-1758413351682-698f32acadc8?auto=format&fit=crop&w=1200&q=80",
        urutan: 3,
      },
    ],
  },
  {
    id: "d0000000-0000-0000-0000-000000000002",
    kategori_id: "b0000000-0000-0000-0000-000000000002",
    judul: "Rak Besi Minimalis Kayu Pajangan",
    slug: "rak-besi-minimalis-kayu-pajangan",
    deskripsi:
      "Instalasi 12 unit rak display café dan toko retail di Galuh Mas. Rangka besi hollow 30x30 finishing powder coating hitam dan ambalan jati belanda.",
    tanggal_selesai: "2026-08-26",
    status_tampil: true,
    gambar_utama:
      "https://images.unsplash.com/photo-1692607431259-951c39946cbf?auto=format&fit=crop&w=1200&q=80",
    media: [
      {
        id: "m004",
        portofolio_id: "d0000000-0000-0000-0000-000000000002",
        tipe: "image",
        url: "https://images.unsplash.com/photo-1692607431259-951c39946cbf?auto=format&fit=crop&w=1200&q=80",
        urutan: 1,
      },
      {
        id: "m005",
        portofolio_id: "d0000000-0000-0000-0000-000000000002",
        tipe: "image",
        url: "https://images.unsplash.com/photo-1790689759890-94e0c81592c6?auto=format&fit=crop&w=1200&q=80",
        urutan: 2,
      },
    ],
  },
  {
    id: "d0000000-0000-0000-0000-000000000003",
    kategori_id: "b0000000-0000-0000-0000-000000000003",
    judul: "Kanopi Modern Area Parkir Ruko",
    slug: "kanopi-modern-area-parkir-ruko",
    deskripsi:
      "Pembuatan kanopi bentang 15 meter tanpa tiang tengah menggunakan besi WF 150 dan atap solarflat transparan tahan UV.",
    tanggal_selesai: "2026-07-03",
    status_tampil: true,
    gambar_utama:
      "https://images.unsplash.com/photo-1762117360944-82ad090fffb5?auto=format&fit=crop&w=1200&q=80",
    media: [
      {
        id: "m006",
        portofolio_id: "d0000000-0000-0000-0000-000000000003",
        tipe: "image",
        url: "https://images.unsplash.com/photo-1762117360944-82ad090fffb5?auto=format&fit=crop&w=1200&q=80",
        urutan: 1,
      },
      {
        id: "m007",
        portofolio_id: "d0000000-0000-0000-0000-000000000003",
        tipe: "image",
        url: "https://images.unsplash.com/photo-1756719033808-1a61300438f2?auto=format&fit=crop&w=1200&q=80",
        urutan: 2,
      },
    ],
  },
  {
    id: "d0000000-0000-0000-0000-000000000004",
    kategori_id: "b0000000-0000-0000-0000-000000000002",
    judul: "Rak Besi Gudang Penyimpanan",
    slug: "rak-besi-gudang-penyimpanan",
    deskripsi:
      "Proyek rak susun pallet industri gudang PT Surya Abadi Karawang Barat, total 8 baris setinggi 4 meter.",
    tanggal_selesai: "2026-06-14",
    status_tampil: true,
    gambar_utama:
      "https://images.unsplash.com/photo-1644079446600-219068676743?auto=format&fit=crop&w=1200&q=80",
    media: [
      {
        id: "m008",
        portofolio_id: "d0000000-0000-0000-0000-000000000004",
        tipe: "image",
        url: "https://images.unsplash.com/photo-1644079446600-219068676743?auto=format&fit=crop&w=1200&q=80",
        urutan: 1,
      },
      {
        id: "m009",
        portofolio_id: "d0000000-0000-0000-0000-000000000004",
        tipe: "image",
        url: "https://images.unsplash.com/photo-1770910195585-825a1181a704?auto=format&fit=crop&w=1200&q=80",
        urutan: 2,
      },
    ],
  },
  {
    id: "d0000000-0000-0000-0000-000000000005",
    kategori_id: "b0000000-0000-0000-0000-000000000003",
    judul: "Kanopi Minimalis Woodplank Carport",
    slug: "kanopi-minimalis-woodplank",
    deskripsi:
      "Kanopi carport hollow galvanis dengan lisplang woodplank sintetis anti rayap dan atap spandek peredam busa.",
    tanggal_selesai: "2026-05-28",
    status_tampil: true,
    gambar_utama:
      "https://images.unsplash.com/photo-1756719033808-1a61300438f2?auto=format&fit=crop&w=1200&q=80",
    media: [
      {
        id: "m010",
        portofolio_id: "d0000000-0000-0000-0000-000000000005",
        tipe: "image",
        url: "https://images.unsplash.com/photo-1756719033808-1a61300438f2?auto=format&fit=crop&w=1200&q=80",
        urutan: 1,
      },
      {
        id: "m011",
        portofolio_id: "d0000000-0000-0000-0000-000000000005",
        tipe: "image",
        url: "https://images.unsplash.com/photo-1786999629449-40bf5a4f8e1d?auto=format&fit=crop&w=1200&q=80",
        urutan: 2,
      },
    ],
  },
  {
    id: "d0000000-0000-0000-0000-000000000006",
    kategori_id: "b0000000-0000-0000-0000-000000000001",
    judul: "Pagar Rumah Modern Kisi-Kisi Kayu",
    slug: "pagar-modern-kisi-kisi-kayu",
    deskripsi:
      "Pagar mewah kombinasi rangka besi hollow tebal dan kisi-kisi conwood serat kayu alami tahan cuaca.",
    tanggal_selesai: "2026-05-18",
    status_tampil: true,
    gambar_utama:
      "https://images.unsplash.com/photo-1758413351682-698f32acadc8?auto=format&fit=crop&w=1200&q=80",
    media: [
      {
        id: "m012",
        portofolio_id: "d0000000-0000-0000-0000-000000000006",
        tipe: "image",
        url: "https://images.unsplash.com/photo-1758413351682-698f32acadc8?auto=format&fit=crop&w=1200&q=80",
        urutan: 1,
      },
      {
        id: "m013",
        portofolio_id: "d0000000-0000-0000-0000-000000000006",
        tipe: "image",
        url: "https://images.unsplash.com/photo-1783267896933-ab57dc7dc59d?auto=format&fit=crop&w=1200&q=80",
        urutan: 2,
      },
    ],
  },
];

// Seed Data Klien
let clientsData: Klien[] = [
  {
    id: "e0000000-0000-0000-0000-000000000001",
    nama: "Budi Santoso",
    perusahaan: "-",
    whatsapp: "0812-3456-0012",
    email: "budi@mail.com",
    alamat: "Perumahan Grand Taruma Blok B No. 12, Karawang Barat",
    status: "Aktif",
  },
  {
    id: "e0000000-0000-0000-0000-000000000002",
    nama: "CV Maju Jaya",
    perusahaan: "CV Maju Jaya",
    whatsapp: "0812-3456-0013",
    email: "majujaya@mail.com",
    alamat: "Kawasan Industri KIIC Lot C-4, Karawang",
    status: "Aktif",
  },
  {
    id: "e0000000-0000-0000-0000-000000000003",
    nama: "Nadya Putri",
    perusahaan: "-",
    whatsapp: "0812-3456-0014",
    email: "nadya@mail.com",
    alamat: "Jl. Ahmad Yani No. 88, Karawang",
    status: "Aktif",
  },
  {
    id: "e0000000-0000-0000-0000-000000000004",
    nama: "PT Surya Abadi",
    perusahaan: "PT Surya Abadi",
    whatsapp: "0812-3456-0015",
    email: "surya@mail.com",
    alamat: "Kawasan Surya Cipta, Ciampel, Karawang",
    status: "Aktif",
  },
  {
    id: "e0000000-0000-0000-0000-000000000005",
    nama: "Hotel Merapi",
    perusahaan: "Hotel Merapi",
    whatsapp: "0812-3456-0016",
    email: "hotel@mail.com",
    alamat: "Jl. Jenderal Sudirman No. 10, Karawang",
    status: "Nonaktif",
  },
  {
    id: "e0000000-0000-0000-0000-000000000006",
    nama: "Ahmad Fikri",
    perusahaan: "Toko Fikri Jaya",
    whatsapp: "0812-3456-0017",
    email: "fikri@mail.com",
    alamat: "Pasar Johar Blok C No. 5, Karawang Timur",
    status: "Aktif",
  },
  {
    id: "e0000000-0000-0000-0000-000000000007",
    nama: "Aulia Rahma",
    perusahaan: "-",
    whatsapp: "0812-3456-0018",
    email: "aulia@mail.com",
    alamat: "Galuh Mas Cluster River Garden Blok D-11",
    status: "Aktif",
  },
];

// Seed Data Pesanan (Format HBJ-2026-NNNN)
let ordersData: Pesanan[] = [
  {
    id: "f0000000-0000-0000-0000-000000000001",
    kode: "HBJ-2026-0012",
    klien_id: "e0000000-0000-0000-0000-000000000001",
    nama_produk: "Pagar Minimalis",
    tanggal: "2026-10-27",
    status: "Diproses",
    status_pembayaran: "DP 50%",
    nominal: 12500000,
    jumlah: "1 Unit",
    dimensi: "Panjang 6m, Tinggi 1.8m",
    material: "Hollow Galvanis 40x60 tebal 1.6mm",
    target_selesai: "2026-11-15",
    anggaran: "Rp 12.000.000 - Rp 15.000.000",
    alamat: "Perumahan Grand Taruma Blok B No. 12, Karawang Barat",
    catatan: "Pesanan sedang dalam proses perakitan rangka dan pengelasan di workshop.",
  },
  {
    id: "f0000000-0000-0000-0000-000000000002",
    kode: "HBJ-2026-0013",
    klien_id: "e0000000-0000-0000-0000-000000000002",
    nama_produk: "Kanopi Hollow",
    tanggal: "2026-10-26",
    status: "Ditinjau",
    status_pembayaran: "Belum Bayar",
    nominal: 18000000,
    jumlah: "1 Unit",
    dimensi: "Lebar 5m, Panjang 6m",
    material: "Besi Hollow 50x100 dan Atap Alderon",
    target_selesai: "2026-11-20",
    anggaran: "Rp 17.000.000 - Rp 20.000.000",
    alamat: "Kawasan Industri KIIC Lot C-4, Karawang",
    catatan: "Admin sedang memverifikasi ukuran survei lapangan.",
  },
  {
    id: "f0000000-0000-0000-0000-000000000003",
    kode: "HBJ-2026-0014",
    klien_id: "e0000000-0000-0000-0000-000000000003",
    nama_produk: "Railing Tangga",
    tanggal: "2026-10-25",
    status: "Selesai",
    status_pembayaran: "Lunas",
    nominal: 8750000,
    jumlah: "2 Unit",
    dimensi: "Total panjang 14 meter",
    material: "Besi Plat Strip & Hollow 40x40",
    target_selesai: "2026-10-28",
    anggaran: "Rp 8.000.000 - Rp 10.000.000",
    alamat: "Jl. Ahmad Yani No. 88, Karawang",
    catatan: "Pesanan telah selesai terpasang dan serah terima tuntas.",
  },
  {
    id: "f0000000-0000-0000-0000-000000000004",
    kode: "HBJ-2026-0015",
    klien_id: "e0000000-0000-0000-0000-000000000004",
    nama_produk: "Pintu Besi Geser",
    tanggal: "2026-10-24",
    status: "Diajukan",
    status_pembayaran: "DP 30%",
    nominal: 24000000,
    jumlah: "1 Unit",
    dimensi: "Lebar 8m, Tinggi 3m",
    material: "Plat Besi 2mm & Rangka UNP 100",
    target_selesai: "2026-11-30",
    anggaran: "Rp 22.000.000 - Rp 25.000.000",
    alamat: "Gudang Surya Abadi, Jl. Interchange Karawang Barat",
    catatan: "Pengajuan pesanan baru masuk dari website.",
  },
  {
    id: "f0000000-0000-0000-0000-000000000005",
    kode: "HBJ-2026-0016",
    klien_id: "e0000000-0000-0000-0000-000000000006",
    nama_produk: "Rak Gudang Susun",
    tanggal: "2026-10-23",
    status: "Diproses",
    status_pembayaran: "DP 50%",
    nominal: 15500000,
    jumlah: "6 Unit",
    dimensi: "Tinggi 2.5m, Panjang 2m, Lebar 0.8m",
    material: "Besi Siku Lubang Tebal 3mm",
    target_selesai: "2026-11-10",
    anggaran: "Rp 15.000.000",
    alamat: "Toko Material Fikri Jaya, Telukjambe Timur",
    catatan: "Sedang dalam proses perakitan material.",
  },
  {
    id: "f0000000-0000-0000-0000-000000000006",
    kode: "HBJ-2026-0017",
    klien_id: "e0000000-0000-0000-0000-000000000007",
    nama_produk: "Pagar Laser Cut",
    tanggal: "2026-10-22",
    status: "Ditinjau",
    status_pembayaran: "Belum Bayar",
    nominal: 19500000,
    jumlah: "1 Unit",
    dimensi: "Panjang 5m, Tinggi 2m",
    material: "Plat Cutting Laser 3mm",
    target_selesai: "2026-11-18",
    anggaran: "Rp 18.000.000 - Rp 20.000.000",
    alamat: "Galuh Mas Cluster River Garden Blok D-11",
    catatan: "Menunggu persetujuan motif laser cut dari klien.",
  },
  {
    id: "f0000000-0000-0000-0000-000000000007",
    kode: "HBJ-2026-0018",
    klien_id: "e0000000-0000-0000-0000-000000000005",
    nama_produk: "Kanopi Kaca Tempered",
    tanggal: "2026-10-21",
    status: "Selesai",
    status_pembayaran: "Lunas",
    nominal: 35000000,
    jumlah: "1 Unit",
    dimensi: "Lebar 6m, Panjang 8m",
    material: "Kaca Tempered 10mm & Pipa Galvanis 3 inch",
    target_selesai: "2026-10-31",
    anggaran: "Rp 35.000.000",
    alamat: "Lobby Hotel Merapi, Karawang",
    catatan: "Instalasi selesai dan telah dilakukan uji ketahanan.",
  },
  {
    id: "f0000000-0000-0000-0000-000000000008",
    kode: "HBJ-2026-0019",
    klien_id: "e0000000-0000-0000-0000-000000000001",
    nama_produk: "Teralis Jendela Minimalis",
    tanggal: "2026-10-20",
    status: "Diajukan",
    status_pembayaran: "Belum Bayar",
    nominal: 4500000,
    jumlah: "8 Unit",
    dimensi: "120cm x 50cm per unit",
    material: "Besi Nako 12mm",
    target_selesai: "2026-11-05",
    anggaran: "Rp 4.000.000 - Rp 5.000.000",
    alamat: "Grand Taruma Blok B No. 12",
    catatan: "Klien meminta survei jadwal pengukuran jendela.",
  },
];

// Seed Data Riwayat Status
let statusHistoryData: RiwayatStatus[] = [
  {
    id: "1",
    pesanan_id: "f0000000-0000-0000-0000-000000000001",
    status: "Diproses",
    catatan: "DP 50% diterima. Perakitan rangka pagar dimulai.",
    diubah_oleh: "Edo Raihan",
    created_at: "2026-10-27 14:00",
  },
  {
    id: "2",
    pesanan_id: "f0000000-0000-0000-0000-000000000002",
    status: "Ditinjau",
    catatan: "Admin mengirimkan penawaran harga RAB kanopi.",
    diubah_oleh: "Edo Raihan",
    created_at: "2026-10-26 15:45",
  },
  {
    id: "3",
    pesanan_id: "f0000000-0000-0000-0000-000000000003",
    status: "Selesai",
    catatan: "Railing tangga selesai dipasang dan serah terima sukses.",
    diubah_oleh: "Edo Raihan",
    created_at: "2026-10-25 16:20",
  },
  {
    id: "4",
    pesanan_id: "f0000000-0000-0000-0000-000000000004",
    status: "Diajukan",
    catatan: "Pengajuan pesanan pintu besi geser baru diterima.",
    diubah_oleh: "Customer",
    created_at: "2026-10-24 10:00",
  },
];

// Seed Data Dokumen Pesanan
let documentsData: DokumenPesanan[] = [
  {
    id: "1",
    pesanan_id: "f0000000-0000-0000-0000-000000000001",
    kode_pesanan: "HBJ-2026-0012",
    nama_klien: "Budi Santoso",
    nama_file: "Desain.pdf",
    file_url: "#",
    tipe_dokumen: "Desain",
    ukuran_file: "2.4 MB",
    status: "Lengkap",
    created_at: "2026-10-27",
  },
  {
    id: "2",
    pesanan_id: "f0000000-0000-0000-0000-000000000002",
    kode_pesanan: "HBJ-2026-0013",
    nama_klien: "CV Maju Jaya",
    nama_file: "Invoice.docx",
    file_url: "#",
    tipe_dokumen: "Invoice",
    ukuran_file: "540 KB",
    status: "Lengkap",
    created_at: "2026-10-26",
  },
  {
    id: "3",
    pesanan_id: "f0000000-0000-0000-0000-000000000003",
    kode_pesanan: "HBJ-2026-0014",
    nama_klien: "Nadya Putri",
    nama_file: "Kontrak.pdf",
    file_url: "#",
    tipe_dokumen: "Kontrak",
    ukuran_file: "1.8 MB",
    status: "Pending",
    created_at: "2026-10-25",
  },
  {
    id: "4",
    pesanan_id: "f0000000-0000-0000-0000-000000000004",
    kode_pesanan: "HBJ-2026-0015",
    nama_klien: "PT Surya Abadi",
    nama_file: "Foto Lokasi.zip",
    file_url: "#",
    tipe_dokumen: "Foto Lokasi",
    ukuran_file: "14.2 MB",
    status: "Lengkap",
    created_at: "2026-10-24",
  },
  {
    id: "5",
    pesanan_id: "f0000000-0000-0000-0000-000000000005",
    kode_pesanan: "HBJ-2026-0016",
    nama_klien: "Ahmad Fikri",
    nama_file: "Bukti DP.jpg",
    file_url: "#",
    tipe_dokumen: "Bukti DP",
    ukuran_file: "820 KB",
    status: "Pending",
    created_at: "2026-10-23",
  },
  {
    id: "6",
    pesanan_id: "f0000000-0000-0000-0000-000000000006",
    kode_pesanan: "HBJ-2026-0017",
    nama_klien: "Aulia Rahma",
    nama_file: "Spesifikasi.docx",
    file_url: "#",
    tipe_dokumen: "Spesifikasi",
    ukuran_file: "1.1 MB",
    status: "Lengkap",
    created_at: "2026-10-22",
  },
];

// Seed Data Profil Usaha
let profileData: ProfilUsaha = {
  id: 1,
  nama_perusahaan: "PT Handoko Bangkit Jaya",
  bidang_usaha: "Fabrikasi Besi & Konstruksi Make-to-Order",
  deskripsi:
    "PT Handoko Bangkit Jaya adalah usaha fabrikasi dan konstruksi besi make-to-order yang berlokasi di Karawang, Jawa Barat. Kami memproduksi berbagai kebutuhan besi dan baja custom untuk perumahan, perkantoran, ruko, maupun industri dengan jaminan presisi, kekuatan material berstandar SNI, serta ketepatan waktu pengerjaan.",
  visi: "Menjadi mitra fabrikasi dan konstruksi besi terpercaya nomor satu di Jawa Barat yang unggul dalam kualitas material, presisi pengerjaan, dan kepuasan pelanggan.",
  misi: [
    "Menyediakan solusi fabrikasi besi custom yang kuat, aman, dan berestetika tinggi sesuai kebutuhan spesifik setiap klien.",
    "Menggunakan material baja dan besi berkualitas tinggi dengan standar pengelasan dan finishing anti karat terbaik.",
    "Memberikan pelayanan profesional, transparansi progres pengerjaan, dan estimasi waktu yang akurat.",
    "Membangun hubungan jangka panjang yang saling menguntungkan dengan klien perseorangan maupun instansi/korporasi.",
  ],
  keunggulan: [
    {
      nomor: 1,
      judul: "Bahan Baku Berkualitas",
      deskripsi:
        "Menggunakan besi hollow, pipa galvanis, dan baja bersertifikasi SNI dengan ketebalan presisi untuk daya tahan maksimal terhadap cuaca ekstrim.",
    },
    {
      nomor: 2,
      judul: "Tenaga Las Bersertifikat",
      deskripsi:
        "Dikerjakan oleh teknisi las berpengalaman lebih dari 8 tahun, menjamin sambungan kokoh, rapi, dan finishing cat epoxy anti karat.",
    },
    {
      nomor: 3,
      judul: "Garansi & Tepat Waktu",
      deskripsi:
        "Komitmen jadwal penyelesaian proyek yang transparan dengan garansi perbaikan struktur untuk setiap pesanan yang kami kerjakan.",
    },
  ],
  alur_produksi: [
    {
      tahap: 1,
      judul: "Konsultasi & Pengukuran",
      deskripsi:
        "Diskusi kebutuhan model, dimensi, pemilihan spesifikasi material, dan survei lokasi bila diperlukan.",
    },
    {
      tahap: 2,
      judul: "Penawaran & Desain",
      deskripsi:
        "Penyusunan estimasi anggaran biaya (RAB), sketsa teknis desain, dan kesepakatan uang muka (DP).",
    },
    {
      tahap: 3,
      judul: "Fabrikasi di Workshop",
      deskripsi:
        "Pemotongan, perakitan, pengelasan presisi, serta proses pelapisan cat dasar anti karat (zinc chromate/epoxy).",
    },
    {
      tahap: 4,
      judul: "Pemasangan & Serah Terima",
      deskripsi:
        "Instalasi di lokasi klien, pengecekan fungsi menyeluruh bersama klien, dan pelunasan pembayaran.",
    },
  ],
  whatsapp: "0895-6767-6767",
  email: "pthandokobj@gmail.com",
  alamat:
    "Jl. Pasundan No. 54, Adiarsa Barat, Karawang Barat, Kabupaten Karawang, Jawa Barat",
  jam_layanan: "Senin–Sabtu, 08.00–16.00 WIB",
  foto_workshop: "/images/building-hbj.jpg",
  updated_at: new Date().toISOString(),
};

// --- DATA ACCESS LAYER FUNCTIONS ---

// 1. DASHBOARD STATS (Dihitung langsung dari data)
export function getDashboardMetrics() {
  const diajukan = ordersData.filter((o) => o.status === "Diajukan").length;
  const ditinjau = ordersData.filter((o) => o.status === "Ditinjau").length;
  const diproses = ordersData.filter((o) => o.status === "Diproses").length;
  const selesai = ordersData.filter((o) => o.status === "Selesai").length;
  const dibatalkan = ordersData.filter((o) => o.status === "Dibatalkan").length;
  const portofolioTayang = portfoliosData.filter((p) => p.status_tampil).length;

  return {
    diajukan,
    ditinjau,
    diproses,
    selesai,
    dibatalkan,
    portofolioTayang,
    totalPesanan: ordersData.length,
    totalKlien: clientsData.length,
    // Alias untuk kompatibilitas
    kesepakatanBaru: diajukan,
    kesepakatanNegosiasi: ditinjau,
    proyekDikerjakan: diproses,
  };
}

// 2. PESANAN
export function getOrders(params?: {
  search?: string;
  status?: string;
  pembayaran?: string;
  tanggal?: string;
  limit?: number;
}) {
  let list = [...ordersData];

  // Map klien name to each order
  list = list.map((order) => {
    const klien = clientsData.find((k) => k.id === order.klien_id);
    return {
      ...order,
      klien: klien || {
        id: order.klien_id,
        nama: "Klien Umum",
        whatsapp: "-",
        status: "Aktif",
      },
    };
  });

  if (params?.search) {
    const q = params.search.toLowerCase();
    list = list.filter(
      (o) =>
        o.kode.toLowerCase().includes(q) ||
        (o.klien?.nama && o.klien.nama.toLowerCase().includes(q)) ||
        o.nama_produk.toLowerCase().includes(q)
    );
  }

  if (params?.status && params.status !== "Semua" && params.status !== "Semua Status") {
    list = list.filter((o) => o.status === params.status);
  }

  if (params?.pembayaran && params.pembayaran !== "Semua") {
    list = list.filter((o) => o.status_pembayaran === params.pembayaran);
  }

  if (params?.tanggal) {
    list = list.filter((o) => o.tanggal === params.tanggal);
  }

  if (params?.limit) {
    list = list.slice(0, params.limit);
  }

  return list;
}

export function getOrderByCode(code: string): Pesanan | null {
  const order = ordersData.find(
    (o) => o.kode.toLowerCase() === code.trim().toLowerCase()
  );
  if (!order) return null;

  const klien = clientsData.find((k) => k.id === order.klien_id);
  const riwayat = statusHistoryData.filter((r) => r.pesanan_id === order.id);
  const dokumen = documentsData.filter((d) => d.pesanan_id === order.id);

  return {
    ...order,
    klien,
    riwayat,
    dokumen,
  };
}

export function getOrderById(id: string): Pesanan | null {
  const order = ordersData.find((o) => o.id === id);
  if (!order) return null;

  const klien = clientsData.find((k) => k.id === order.klien_id);
  const riwayat = statusHistoryData.filter((r) => r.pesanan_id === order.id);
  const dokumen = documentsData.filter((d) => d.pesanan_id === order.id);

  return {
    ...order,
    klien,
    riwayat,
    dokumen,
  };
}

export function createOrder(data: {
  klien_id?: string;
  nama_klien?: string;
  whatsapp?: string;
  email?: string;
  perusahaan?: string;
  nama_produk: string;
  nominal?: number;
  jumlah?: string;
  dimensi?: string;
  material?: string;
  target_selesai?: string;
  anggaran?: string;
  alamat?: string;
  catatan?: string;
  status_pembayaran?: StatusPembayaran;
  status?: StatusPesanan;
}) {
  // If client doesn't exist, create or match by WhatsApp
  let klienId = data.klien_id;
  if (!klienId && data.nama_klien && data.whatsapp) {
    const existing = clientsData.find(
      (c) => c.whatsapp.replace(/\D/g, "") === data.whatsapp!.replace(/\D/g, "")
    );
    if (existing) {
      klienId = existing.id;
    } else {
      const newKlien: Klien = {
        id: "client-" + Date.now(),
        nama: data.nama_klien,
        whatsapp: data.whatsapp,
        email: data.email,
        perusahaan: data.perusahaan,
        alamat: data.alamat,
        status: "Aktif",
      };
      clientsData.unshift(newKlien);
      klienId = newKlien.id;
    }
  }

  // Generate automated code HBJ-YYYY-NNNN
  const year = new Date().getFullYear();
  const nextNum = ordersData.length + 12;
  const kode = `HBJ-${year}-${String(nextNum).padStart(4, "0")}`;

  const newOrder: Pesanan = {
    id: "order-" + Date.now(),
    kode,
    klien_id: klienId || "e0000000-0000-0000-0000-000000000001",
    nama_produk: data.nama_produk,
    tanggal: new Date().toISOString().split("T")[0],
    status: data.status || "Diajukan",
    status_pembayaran: data.status_pembayaran || "Belum Bayar",
    nominal: data.nominal || 0,
    jumlah: data.jumlah || "1 Unit",
    dimensi: data.dimensi || "-",
    material: data.material || "-",
    target_selesai: data.target_selesai,
    anggaran: data.anggaran || "-",
    alamat: data.alamat || "-",
    catatan: data.catatan || "-",
    created_at: new Date().toISOString(),
  };

  ordersData.unshift(newOrder);

  // Add initial status history
  statusHistoryData.unshift({
    id: "history-" + Date.now(),
    pesanan_id: newOrder.id,
    status: newOrder.status,
    catatan: "Pesanan baru berhasil dibuat dalam sistem.",
    diubah_oleh: "Admin",
    created_at: new Date().toISOString(),
  });

  return newOrder;
}

export function updateOrderStatus(
  orderId: string,
  newStatus: StatusPesanan,
  catatan?: string,
  adminName = "Edo Raihan"
): { success: boolean; error?: string } {
  const order = ordersData.find((o) => o.id === orderId);
  if (!order) return { success: false, error: "Pesanan tidak ditemukan." };

  // Validasi transisi status resmi:
  // Diajukan > Ditinjau > Diproses > Selesai (Dibatalkan boleh dari status mana pun sebelum Selesai)
  if (!isValidStatusTransition(order.status, newStatus)) {
    const allowed = ALLOWED_STATUS_TRANSITIONS[order.status];
    return {
      success: false,
      error: `Transisi status tidak diizinkan. Pesanan '${order.status}' hanya dapat diubah ke: ${
        allowed && allowed.length > 0 ? allowed.join(" atau ") : "tidak ada (status terminal)"
      }.`,
    };
  }

  order.status = newStatus;

  statusHistoryData.unshift({
    id: "history-" + Date.now(),
    pesanan_id: orderId,
    status: newStatus,
    catatan: catatan || `Status pesanan diubah menjadi ${newStatus}.`,
    diubah_oleh: adminName,
    created_at: new Date().toISOString(),
  });

  return { success: true };
}

export function deleteOrder(orderId: string) {
  const index = ordersData.findIndex((o) => o.id === orderId);
  if (index === -1) return false;
  ordersData.splice(index, 1);
  return true;
}

// 3. KLIEN
export function getClients(params?: { search?: string; status?: string }) {
  let list = clientsData.map((client) => {
    const orderCount = ordersData.filter((o) => o.klien_id === client.id).length;
    return {
      ...client,
      jumlah_pesanan: orderCount,
    };
  });

  if (params?.search) {
    const q = params.search.toLowerCase();
    list = list.filter(
      (c) =>
        c.nama.toLowerCase().includes(q) ||
        (c.perusahaan && c.perusahaan.toLowerCase().includes(q)) ||
        c.whatsapp.includes(q)
    );
  }

  if (params?.status && params.status !== "Semua") {
    list = list.filter((c) => c.status === params.status);
  }

  return list;
}

export function createClient(data: Omit<Klien, "id" | "jumlah_pesanan">) {
  const newClient: Klien = {
    id: "client-" + Date.now(),
    ...data,
    created_at: new Date().toISOString(),
  };
  clientsData.unshift(newClient);
  return newClient;
}

export function updateClient(id: string, data: Partial<Klien>) {
  const client = clientsData.find((c) => c.id === id);
  if (!client) return false;
  Object.assign(client, data);
  return true;
}

export function deleteClient(id: string) {
  const index = clientsData.findIndex((c) => c.id === id);
  if (index === -1) return false;
  clientsData.splice(index, 1);
  return true;
}

// 4. PRODUK & KATEGORI
export function getCategories() {
  return categoriesData.map((cat) => {
    const count = productsData.filter((p) => p.kategori_id === cat.id).length;
    return {
      ...cat,
      jumlah_produk: count,
    };
  });
}

export function createCategory(data: { nama: string; deskripsi?: string }) {
  const slug = data.nama.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const newCat: Kategori = {
    id: "cat-" + Date.now(),
    nama: data.nama,
    slug,
    deskripsi: data.deskripsi,
    urutan: categoriesData.length + 1,
    created_at: new Date().toISOString(),
  };
  categoriesData.push(newCat);
  return newCat;
}

export function deleteCategory(id: string) {
  const index = categoriesData.findIndex((c) => c.id === id);
  if (index === -1) return false;
  categoriesData.splice(index, 1);
  return true;
}

export function getProducts(params?: { kategori_id?: string; status?: string; search?: string }) {
  let list = productsData.map((p) => {
    const cat = categoriesData.find((c) => c.id === p.kategori_id);
    return {
      ...p,
      kategori: cat,
    };
  });

  if (params?.kategori_id && params.kategori_id !== "Semua") {
    list = list.filter((p) => p.kategori_id === params.kategori_id);
  }

  if (params?.status && params.status !== "Semua") {
    list = list.filter((p) => p.status === params.status);
  }

  if (params?.search) {
    const q = params.search.toLowerCase();
    list = list.filter((p) => p.nama.toLowerCase().includes(q));
  }

  return list;
}

export function createProduct(data: {
  kategori_id: string;
  nama: string;
  deskripsi: string;
  gambar_url?: string;
  status: "Tayang" | "Draft";
}) {
  const slug = data.nama.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const newProd: Produk = {
    id: "prod-" + Date.now(),
    ...data,
    slug,
    urutan: productsData.length + 1,
    created_at: new Date().toISOString(),
  };
  productsData.unshift(newProd);
  return newProd;
}

export function updateProduct(id: string, data: Partial<Produk>) {
  const prod = productsData.find((p) => p.id === id);
  if (!prod) return false;
  Object.assign(prod, data);
  return true;
}

export function getProductBySlug(slug: string): Produk | null {
  const p = productsData.find((item) => item.slug === slug || item.id === slug);
  if (!p) return null;
  const cat = categoriesData.find((c) => c.id === p.kategori_id);
  return { ...p, kategori: cat };
}

export function deleteProduct(id: string) {
  const index = productsData.findIndex((p) => p.id === id);
  if (index === -1) return false;
  productsData.splice(index, 1);
  return true;
}

// 5. PORTOFOLIO
export function getPortfolios(params?: {
  kategori_id?: string;
  search?: string;
  onlyVisible?: boolean;
  status_tampil?: boolean;
}) {
  let list = portfoliosData.map((p) => {
    const cat = categoriesData.find((c) => c.id === p.kategori_id);
    return {
      ...p,
      kategori: cat,
    };
  });

  if (params?.onlyVisible || params?.status_tampil) {
    list = list.filter((p) => p.status_tampil);
  }

  if (params?.kategori_id && params.kategori_id !== "Semua") {
    list = list.filter((p) => p.kategori_id === params.kategori_id);
  }

  if (params?.search) {
    const q = params.search.toLowerCase();
    list = list.filter((p) => p.judul.toLowerCase().includes(q));
  }

  return list;
}

export function createPortfolio(data: {
  kategori_id: string;
  judul: string;
  deskripsi: string;
  tanggal_selesai: string;
  status_tampil: boolean;
  gambar_utama?: string;
}) {
  const slug = data.judul.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const newPortfolio: Portofolio = {
    id: "port-" + Date.now(),
    ...data,
    slug,
    created_at: new Date().toISOString(),
  };
  portfoliosData.unshift(newPortfolio);
  return newPortfolio;
}

export function togglePortfolioVisibility(id: string) {
  const item = portfoliosData.find((p) => p.id === id);
  if (!item) return false;
  item.status_tampil = !item.status_tampil;
  return item.status_tampil;
}

export function getPortfolioBySlug(slug: string): Portofolio | null {
  const p = portfoliosData.find((item) => item.slug === slug || item.id === slug);
  if (!p) return null;
  const cat = categoriesData.find((c) => c.id === p.kategori_id);
  return { ...p, kategori: cat };
}

export function deletePortfolio(id: string) {
  const index = portfoliosData.findIndex((p) => p.id === id);
  if (index === -1) return false;
  portfoliosData.splice(index, 1);
  return true;
}

// 6. DOKUMEN PESANAN
export function getDocuments(params?: { search?: string; status?: string; tipe?: string }) {
  let list = [...documentsData];

  if (params?.search) {
    const q = params.search.toLowerCase();
    list = list.filter(
      (d) =>
        (d.kode_pesanan && d.kode_pesanan.toLowerCase().includes(q)) ||
        (d.nama_klien && d.nama_klien.toLowerCase().includes(q)) ||
        d.nama_file.toLowerCase().includes(q)
    );
  }

  if (params?.status && params.status !== "Semua") {
    list = list.filter((d) => d.status === params.status);
  }

  if (params?.tipe && params.tipe !== "Semua") {
    list = list.filter((d) => d.tipe_dokumen === params.tipe);
  }

  return list;
}

export function createDocument(data: {
  pesanan_id: string;
  nama_file: string;
  tipe_dokumen: string;
  ukuran_file?: string;
  status?: "Lengkap" | "Pending";
}) {
  const order = ordersData.find((o) => o.id === data.pesanan_id);
  const client = order ? clientsData.find((c) => c.id === order.klien_id) : null;

  const newDoc: DokumenPesanan = {
    id: "doc-" + Date.now(),
    pesanan_id: data.pesanan_id,
    kode_pesanan: order ? order.kode : "HBJ-2026-0000",
    nama_klien: client ? client.nama : "Klien",
    nama_file: data.nama_file,
    file_url: "#",
    tipe_dokumen: data.tipe_dokumen,
    ukuran_file: data.ukuran_file || "1.2 MB",
    status: data.status || "Lengkap",
    created_at: new Date().toISOString().split("T")[0],
  };

  documentsData.unshift(newDoc);
  return newDoc;
}

export function deleteDocument(id: string) {
  const index = documentsData.findIndex((d) => d.id === id);
  if (index === -1) return false;
  documentsData.splice(index, 1);
  return true;
}

// 7. PROFIL USAHA
export function getCompanyProfile(): ProfilUsaha {
  return { ...profileData };
}

export function updateCompanyProfile(updates: Partial<ProfilUsaha>): ProfilUsaha {
  profileData = {
    ...profileData,
    ...updates,
    updated_at: new Date().toISOString(),
  };
  return { ...profileData };
}

// 8. STATUS RIWAYAT TERBARU
export function getRecentStatusHistory(limit = 4) {
  return statusHistoryData.slice(0, limit).map((hist) => {
    const order = ordersData.find((o) => o.id === hist.pesanan_id);
    return {
      ...hist,
      kode_pesanan: order ? order.kode : "HBJ-2026-0012",
    };
  });
}

// 9. RESET DATABASE / STORE KE SEED ASLI
export function resetStoreToSeed(): void {
  ordersData = ordersData.filter((o) =>
    [
      "f0000000-0000-0000-0000-000000000001",
      "f0000000-0000-0000-0000-000000000002",
      "f0000000-0000-0000-0000-000000000003",
      "f0000000-0000-0000-0000-000000000004",
      "f0000000-0000-0000-0000-000000000005",
      "f0000000-0000-0000-0000-000000000006",
      "f0000000-0000-0000-0000-000000000007",
      "f0000000-0000-0000-0000-000000000008",
    ].includes(o.id)
  );
  // Restore initial status for the seed orders
  const o1 = ordersData.find((o) => o.id === "f0000000-0000-0000-0000-000000000001");
  if (o1) o1.status = "Diproses";
  const o2 = ordersData.find((o) => o.id === "f0000000-0000-0000-0000-000000000002");
  if (o2) o2.status = "Ditinjau";

  statusHistoryData = [
    {
      id: "1",
      pesanan_id: "f0000000-0000-0000-0000-000000000001",
      status: "Diproses",
      catatan: "DP 50% diterima. Perakitan rangka pagar dimulai.",
      diubah_oleh: "Edo Raihan",
      created_at: "2026-10-27 14:00",
    },
    {
      id: "2",
      pesanan_id: "f0000000-0000-0000-0000-000000000002",
      status: "Ditinjau",
      catatan: "Admin mengirimkan penawaran harga RAB kanopi.",
      diubah_oleh: "Edo Raihan",
      created_at: "2026-10-26 15:45",
    },
    {
      id: "3",
      pesanan_id: "f0000000-0000-0000-0000-000000000003",
      status: "Selesai",
      catatan: "Railing tangga selesai dipasang dan serah terima sukses.",
      diubah_oleh: "Edo Raihan",
      created_at: "2026-10-25 16:20",
    },
    {
      id: "4",
      pesanan_id: "f0000000-0000-0000-0000-000000000004",
      status: "Diajukan",
      catatan: "Pengajuan pesanan pintu besi geser baru diterima.",
      diubah_oleh: "Customer",
      created_at: "2026-10-24 10:00",
    },
  ];
}

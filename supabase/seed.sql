-- Seed Data SIP PT Handoko Bangkit Jaya
-- Data realistis usaha fabrikasi besi make-to-order

-- 1. Pengguna Admin (Password default: admin123)
INSERT INTO pengguna_admin (id, username, email, nama_lengkap, password_hash, role)
VALUES (
    'a0000000-0000-0000-0000-000000000001',
    'admin',
    'admin@handokobangkit.com',
    'Edo Raihan',
    '$2b$10$r6lwXTjeXOsTcWyUAxMygOR7Bvt52h4zWOuZ5.bqoj3wOrveS4xgi', -- bcrypt hash untuk admin123
    'admin'
) ON CONFLICT (username) DO NOTHING;

-- 2. Profil Usaha (Satu Baris Tunggal)
INSERT INTO profil_usaha (
    id, nama_perusahaan, bidang_usaha, deskripsi, visi, misi,
    keunggulan, alur_produksi, whatsapp, email, alamat, jam_layanan, foto_workshop
) VALUES (
    1,
    'PT Handoko Bangkit Jaya',
    'Fabrikasi Besi & Konstruksi Make-to-Order',
    'PT Handoko Bangkit Jaya adalah usaha fabrikasi dan konstruksi besi make-to-order yang berlokasi di Karawang, Jawa Barat. Kami memproduksi berbagai kebutuhan besi dan baja custom untuk perumahan, perkantoran, ruko, maupun industri dengan jaminan presisi, kekuatan material berstandar SNI, serta ketepatan waktu pengerjaan.',
    'Menjadi mitra fabrikasi dan konstruksi besi terpercaya nomor satu di Jawa Barat yang unggul dalam kualitas material, presisi pengerjaan, dan kepuasan pelanggan.',
    '[
        "Menyediakan solusi fabrikasi besi custom yang kuat, aman, dan berestetika tinggi sesuai kebutuhan spesifik setiap klien.",
        "Menggunakan material baja dan besi berkualitas tinggi dengan standar pengelasan dan finishing anti karat terbaik.",
        "Memberikan pelayanan profesional, transparansi progres pengerjaan, dan estimasi waktu yang akurat.",
        "Membangun hubungan jangka panjang yang saling menguntungkan dengan klien perseorangan maupun instansi/korporasi."
    ]'::jsonb,
    '[
        {
            "nomor": 1,
            "judul": "Bahan Baku Berkualitas",
            "deskripsi": "Menggunakan besi hollow, pipa galvanis, dan baja bersertifikasi SNI dengan ketebalan presisi untuk daya tahan maksimal terhadap cuaca ekstrim."
        },
        {
            "nomor": 2,
            "judul": "Tenaga Las Bersertifikat",
            "deskripsi": "Dikerjakan oleh teknisi las berpengalaman lebih dari 8 tahun, menjamin sambungan kokoh, rapi, dan finishing cat epoxy anti karat."
        },
        {
            "nomor": 3,
            "judul": "Garansi & Tepat Waktu",
            "deskripsi": "Komitmen jadwal penyelesaian proyek yang transparan dengan garansi perbaikan struktur untuk setiap pesanan yang kami kerjakan."
        }
    ]'::jsonb,
    '[
        {
            "tahap": 1,
            "judul": "Konsultasi & Pengukuran",
            "deskripsi": "Diskusi kebutuhan model, dimensi, pemilihan spesifikasi material, dan survei lokasi bila diperlukan."
        },
        {
            "tahap": 2,
            "judul": "Penawaran & Desain",
            "deskripsi": "Penyusunan estimasi anggaran biaya (RAB), sketsa teknis desain, dan kesepakatan uang muka (DP)."
        },
        {
            "tahap": 3,
            "judul": "Fabrikasi di Workshop",
            "deskripsi": "Pemotongan, perakitan, pengelasan presisi, serta proses pelapisan cat dasar anti karat (zinc chromate/epoxy)."
        },
        {
            "tahap": 4,
            "judul": "Pemasangan & Serah Terima",
            "deskripsi": "Instalasi di lokasi klien, pengecekan fungsi menyeluruh bersama klien, dan pelunasan pembayaran."
        }
    ]'::jsonb,
    '0895-6767-6767',
    'pthandokobj@gmail.com',
    'Jl. Pasundan No. 34, Adiarsa Barat, Karawang Barat, Kabupaten Karawang, Jawa Barat',
    'Senin–Sabtu, 08.00–16.00 WIB',
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80'
) ON CONFLICT (id) DO UPDATE SET
    deskripsi = EXCLUDED.deskripsi,
    visi = EXCLUDED.visi,
    misi = EXCLUDED.misi,
    keunggulan = EXCLUDED.keunggulan,
    alur_produksi = EXCLUDED.alur_produksi;

-- 3. Kategori Produk
INSERT INTO kategori (id, nama, slug, deskripsi, urutan) VALUES
('b0000000-0000-0000-0000-000000000001', 'Pagar Perumahan', 'pagar-perumahan', 'Pagar besi minimalis, laser cut, dan tempa modern untuk hunian pribadi maupun perumahan cluster.', 1),
('b0000000-0000-0000-0000-000000000002', 'Rak Besi', 'rak-besi', 'Rak besi siku, rak gudang heavy duty, dan rak display kombinasi kayu minimalis.', 2),
('b0000000-0000-0000-0000-000000000003', 'Kanopi', 'kanopi', 'Kanopi baja ringan, hollow galvanis, atap solarflat, spandex, alderon, dan kaca tempered.', 3),
('b0000000-0000-0000-0000-000000000004', 'Railing & Pintu Besi', 'railing-pintu-besi', 'Railing tangga putar, balkon, pintu dorong folding gate, dan pintu darurat besi.', 4)
ON CONFLICT (slug) DO NOTHING;

-- 4. Produk
INSERT INTO produk (id, kategori_id, nama, slug, deskripsi, gambar_url, status, urutan) VALUES
('c0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'Pagar Minimalis Modern', 'pagar-minimalis-modern', 'Pagar besi hollow galvanis dengan desain horizontal minimalis, dilapisi cat oven anti karat. Cocok untuk rumah modern dan cluster.', 'https://images.unsplash.com/photo-1783267896933-ab57dc7dc59d?auto=format&fit=crop&w=800&q=80', 'Tayang', 1),
('c0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001', 'Pagar Laser Cut Plat Besi', 'pagar-laser-cut', 'Pagar motif custom menggunakan mesin cutting CNC plat besi 2mm-3mm, memberikan estetika mewah dan privacy optimal.', 'https://images.unsplash.com/photo-1758413351682-698f32acadc8?auto=format&fit=crop&w=800&q=80', 'Tayang', 2),
('c0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000002', 'Rak Gudang Heavy Duty', 'rak-gudang-heavy-duty', 'Rak penyimpanan beban berat untuk gudang logistik dan pabrik, kapasitas beban hingga 500kg per ambalan.', 'https://images.unsplash.com/photo-1644079446600-219068676743?auto=format&fit=crop&w=800&q=80', 'Tayang', 3),
('c0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000002', 'Rak Display Kombinasi Kayu', 'rak-display-kayu', 'Rak estetik dengan rangka besi hollow hitam matte dan ambalan kayu solid/multiplex finishing HPL.', 'https://images.unsplash.com/photo-1692607431259-951c39946cbf?auto=format&fit=crop&w=800&q=80', 'Tayang', 4),
('c0000000-0000-0000-0000-000000000005', 'b0000000-0000-0000-0000-000000000003', 'Kanopi Hollow Atap Alderon', 'kanopi-hollow-alderon', 'Rangka hollow galvanis 40x80 tebal 1.6mm dengan atap uPVC Alderon peredam panas dan suara hujan.', 'https://images.unsplash.com/photo-1762117360944-82ad090fffb5?auto=format&fit=crop&w=800&q=80', 'Tayang', 5),
('c0000000-0000-0000-0000-000000000006', 'b0000000-0000-0000-0000-000000000003', 'Kanopi Kaca Tempered Minimalis', 'kanopi-kaca-tempered', 'Kanopi kaca tempered 8mm/10mm dengan rangka besi WF atau pipa galvanis kuat untuk carport eksklusif.', 'https://images.unsplash.com/photo-1786999629449-40bf5a4f8e1d?auto=format&fit=crop&w=800&q=80', 'Tayang', 6),
('c0000000-0000-0000-0000-000000000007', 'b0000000-0000-0000-0000-000000000004', 'Railing Tangga & Balkon Minimalis', 'railing-tangga-minimalis', 'Railing pegangan tangga besi hollow kombinasi handrail kayu atau kaca tempered untuk keamanan dan estetika interior.', 'https://images.unsplash.com/photo-1690661452556-7bf55de5708e?auto=format&fit=crop&w=800&q=80', 'Tayang', 7),
('c0000000-0000-0000-0000-000000000008', 'b0000000-0000-0000-0000-000000000004', 'Pintu Besi Harmonika Heavy Duty', 'pintu-besi-harmonika', 'Pintu besi lipat harmonika kokoh untuk proteksi ruko, toko, garasi, dan pabrik dengan sistem penguncian ganda.', 'https://images.unsplash.com/photo-1790655571490-ede2738dd12d?auto=format&fit=crop&w=800&q=80', 'Tayang', 8)
ON CONFLICT (slug) DO NOTHING;

-- 5. Portofolio
INSERT INTO portofolio (id, kategori_id, judul, slug, deskripsi, tanggal_selesai, status_tampil, gambar_utama) VALUES
('d0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'Pagar Rumah Modern Minimalis', 'pagar-rumah-modern-minimalis', 'Pengerjaan pagar gerbang sliding dan pintu dorong untuk perumahan Cluster Grand Taruma Karawang. Menggunakan hollow 40x60 dengan finishing cat duco hitam semi-gloss.', '2026-08-04', true, 'https://images.unsplash.com/photo-1783267896933-ab57dc7dc59d?auto=format&fit=crop&w=1200&q=80'),
('d0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000002', 'Rak Besi Minimalis Kayu Pajangan', 'rak-besi-minimalis-kayu-pajangan', 'Instalasi 12 unit rak display café dan toko retail di Galuh Mas. Rangka besi hollow 30x30 finishing powder coating hitam dan ambalan jati belanda.', '2026-08-26', true, 'https://images.unsplash.com/photo-1692607431259-951c39946cbf?auto=format&fit=crop&w=1200&q=80'),
('d0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000003', 'Kanopi Modern Area Parkir Ruko', 'kanopi-modern-area-parkir-ruko', 'Pembuatan kanopi bentang 15 meter tanpa tiang tengah menggunakan besi WF 150 dan atap solarflat transparan tahan UV.', '2026-07-03', true, 'https://images.unsplash.com/photo-1762117360944-82ad090fffb5?auto=format&fit=crop&w=1200&q=80'),
('d0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000002', 'Rak Besi Gudang Penyimpanan', 'rak-besi-gudang-penyimpanan', 'Proyek rak susun pallet industri gudang PT Surya Abadi Karawang Barat, total 8 baris setinggi 4 meter.', '2026-06-14', true, 'https://images.unsplash.com/photo-1644079446600-219068676743?auto=format&fit=crop&w=1200&q=80'),
('d0000000-0000-0000-0000-000000000005', 'b0000000-0000-0000-0000-000000000003', 'Kanopi Minimalis Woodplank Carport', 'kanopi-minimalis-woodplank', 'Kanopi carport hollow galvanis dengan lisplang woodplank sintetis anti rayap dan atap spandek peredam busa.', '2026-05-28', true, 'https://images.unsplash.com/photo-1756719033808-1a61300438f2?auto=format&fit=crop&w=1200&q=80'),
('d0000000-0000-0000-0000-000000000006', 'b0000000-0000-0000-0000-000000000001', 'Pagar Rumah Modern Kisi-Kisi Kayu', 'pagar-modern-kisi-kisi-kayu', 'Pagar mewah kombinasi rangka besi hollow tebal dan kisi-kisi conwood serat kayu alami tahan hujan dan panas matahari.', '2026-05-18', true, 'https://images.unsplash.com/photo-1758413351682-698f32acadc8?auto=format&fit=crop&w=1200&q=80')
ON CONFLICT (slug) DO NOTHING;

-- 5b. Portofolio Media
INSERT INTO portofolio_media (portofolio_id, tipe, url, urutan) VALUES
('d0000000-0000-0000-0000-000000000001', 'image', 'https://images.unsplash.com/photo-1783267896933-ab57dc7dc59d?auto=format&fit=crop&w=1200&q=80', 1),
('d0000000-0000-0000-0000-000000000001', 'image', 'https://images.unsplash.com/photo-1725162066982-5e616a4bf45d?auto=format&fit=crop&w=1200&q=80', 2),
('d0000000-0000-0000-0000-000000000001', 'image', 'https://images.unsplash.com/photo-1758413351682-698f32acadc8?auto=format&fit=crop&w=1200&q=80', 3),
('d0000000-0000-0000-0000-000000000002', 'image', 'https://images.unsplash.com/photo-1692607431259-951c39946cbf?auto=format&fit=crop&w=1200&q=80', 1),
('d0000000-0000-0000-0000-000000000002', 'image', 'https://images.unsplash.com/photo-1790689759890-94e0c81592c6?auto=format&fit=crop&w=1200&q=80', 2),
('d0000000-0000-0000-0000-000000000003', 'image', 'https://images.unsplash.com/photo-1762117360944-82ad090fffb5?auto=format&fit=crop&w=1200&q=80', 1),
('d0000000-0000-0000-0000-000000000003', 'image', 'https://images.unsplash.com/photo-1756719033808-1a61300438f2?auto=format&fit=crop&w=1200&q=80', 2),
('d0000000-0000-0000-0000-000000000004', 'image', 'https://images.unsplash.com/photo-1644079446600-219068676743?auto=format&fit=crop&w=1200&q=80', 1),
('d0000000-0000-0000-0000-000000000004', 'image', 'https://images.unsplash.com/photo-1770910195585-825a1181a704?auto=format&fit=crop&w=1200&q=80', 2),
('d0000000-0000-0000-0000-000000000005', 'image', 'https://images.unsplash.com/photo-1756719033808-1a61300438f2?auto=format&fit=crop&w=1200&q=80', 1),
('d0000000-0000-0000-0000-000000000005', 'image', 'https://images.unsplash.com/photo-1786999629449-40bf5a4f8e1d?auto=format&fit=crop&w=1200&q=80', 2),
('d0000000-0000-0000-0000-000000000006', 'image', 'https://images.unsplash.com/photo-1758413351682-698f32acadc8?auto=format&fit=crop&w=1200&q=80', 1),
('d0000000-0000-0000-0000-000000000006', 'image', 'https://images.unsplash.com/photo-1783267896933-ab57dc7dc59d?auto=format&fit=crop&w=1200&q=80', 2)
ON CONFLICT DO NOTHING;

-- 6. Klien
INSERT INTO klien (id, nama, perusahaan, whatsapp, email, status) VALUES
('e0000000-0000-0000-0000-000000000001', 'Budi Santoso', NULL, '0812-3456-0012', 'budi@mail.com', 'Aktif'),
('e0000000-0000-0000-0000-000000000002', 'CV Maju Jaya', 'CV Maju Jaya', '0812-3456-0013', 'majujaya@mail.com', 'Aktif'),
('e0000000-0000-0000-0000-000000000003', 'Nadya Putri', NULL, '0812-3456-0014', 'nadya@mail.com', 'Aktif'),
('e0000000-0000-0000-0000-000000000004', 'PT Surya Abadi', 'PT Surya Abadi', '0812-3456-0015', 'surya@mail.com', 'Aktif'),
('e0000000-0000-0000-0000-000000000005', 'Hotel Merapi', 'Hotel Merapi', '0812-3456-0016', 'hotel@mail.com', 'Nonaktif'),
('e0000000-0000-0000-0000-000000000006', 'Ahmad Fikri', NULL, '0812-3456-0017', 'fikri@mail.com', 'Aktif'),
('e0000000-0000-0000-0000-000000000007', 'Aulia Rahma', NULL, '0812-3456-0018', 'aulia@mail.com', 'Aktif')
ON CONFLICT DO NOTHING;

-- 7. Pesanan (Format HBJ-2026-NNNN)
INSERT INTO pesanan (
    id, kode, klien_id, nama_produk, tanggal, status, status_pembayaran,
    nominal, jumlah, dimensi, material, target_selesai, anggaran, alamat, catatan
) VALUES
(
    'f0000000-0000-0000-0000-000000000001',
    'HBJ-2026-0012',
    'e0000000-0000-0000-0000-000000000001',
    'Pagar Minimalis',
    '2026-10-27',
    'Diproses',
    'DP 50%',
    12500000,
    '1 Unit',
    'Panjang 6m, Tinggi 1.8m',
    'Hollow Galvanis 40x60 tebal 1.6mm',
    '2026-11-15',
    'Rp 12.000.000 - Rp 15.000.000',
    'Perumahan Grand Taruma Blok B No. 12, Karawang Barat',
    'Pengerjaan sedang berjalan di workshop tahap pengelasan dan cat dasar.'
),
(
    'f0000000-0000-0000-0000-000000000002',
    'HBJ-2026-0013',
    'e0000000-0000-0000-0000-000000000002',
    'Kanopi Hollow',
    '2026-10-26',
    'Ditinjau',
    'Belum Bayar',
    18000000,
    '1 Unit',
    'Lebar 5m, Panjang 6m',
    'Besi Hollow 50x100 dan Atap Alderon',
    '2026-11-20',
    'Rp 17.000.000 - Rp 20.000.000',
    'Kawasan Industri KIIC Lot C-4, Karawang',
    'Admin sedang memverifikasi ukuran survei lapangan.'
),
(
    'f0000000-0000-0000-0000-000000000003',
    'HBJ-2026-0014',
    'e0000000-0000-0000-0000-000000000003',
    'Railing Tangga',
    '2026-10-25',
    'Selesai',
    'Lunas',
    8750000,
    '2 Unit',
    'Total panjang 14 meter',
    'Besi Plat Strip & Hollow 40x40',
    '2026-10-28',
    'Rp 8.000.000 - Rp 10.000.000',
    'Jl. Ahmad Yani No. 88, Karawang',
    'Pesanan telah terpasang rapi dan serah terima selesai.'
),
(
    'f0000000-0000-0000-0000-000000000004',
    'HBJ-2026-0015',
    'e0000000-0000-0000-0000-000000000004',
    'Pintu Besi Geser',
    '2026-10-24',
    'Diajukan',
    'DP 30%',
    24000000,
    '1 Unit',
    'Lebar 8m, Tinggi 3m',
    'Plat Besi 2mm & Rangka UNP 100',
    '2026-11-30',
    'Rp 22.000.000 - Rp 25.000.000',
    'Gudang Surya Abadi, Jl. Interchange Karawang Barat',
    'Pengajuan pesanan baru masuk dari formulir customer.'
),
(
    'f0000000-0000-0000-0000-000000000005',
    'HBJ-2026-0016',
    'e0000000-0000-0000-0000-000000000006',
    'Rak Gudang Susun',
    '2026-10-23',
    'Diproses',
    'DP 50%',
    15500000,
    '6 Unit',
    'Tinggi 2.5m, Panjang 2m, Lebar 0.8m',
    'Besi Siku Lubang Tebal 3mm',
    '2026-11-10',
    'Rp 15.000.000',
    'Toko Material Fikri Jaya, Telukjambe Timur',
    'Sedang dalam pemotongan material di workshop.'
),
(
    'f0000000-0000-0000-0000-000000000006',
    'HBJ-2026-0017',
    'e0000000-0000-0000-0000-000000000007',
    'Pagar Laser Cut',
    '2026-10-22',
    'Ditinjau',
    'Belum Bayar',
    19500000,
    '1 Unit',
    'Panjang 5m, Tinggi 2m',
    'Plat Cutting Laser 3mm',
    '2026-11-18',
    'Rp 18.000.000 - Rp 20.000.000',
    'Galuh Mas Cluster River Garden Blok D-11',
    'Menunggu finalisasi file CAD motif batik dari klien.'
),
(
    'f0000000-0000-0000-0000-000000000007',
    'HBJ-2026-0018',
    'e0000000-0000-0000-0000-000000000005',
    'Kanopi Kaca Tempered',
    '2026-10-21',
    'Selesai',
    'Lunas',
    35000000,
    '1 Unit',
    'Lebar 6m, Panjang 8m',
    'Kaca Tempered 10mm & Rangka Pipa Galvanis 3 inch',
    '2026-10-31',
    'Rp 35.000.000',
    'Lobby Hotel Merapi, Karawang',
    'Instalasi selesai dan telah dilakukan uji kebocoran air hujan.'
)
ON CONFLICT (kode) DO NOTHING;

-- 8. Riwayat Status Pesanan
INSERT INTO riwayat_status (pesanan_id, status, catatan, diubah_oleh, created_at) VALUES
('f0000000-0000-0000-0000-000000000001', 'Diajukan', 'Pesanan berhasil dikirim oleh customer Budi Santoso.', 'Customer', '2026-10-27 09:00:00+07'),
('f0000000-0000-0000-0000-000000000001', 'Ditinjau', 'Admin memverifikasi spesifikasi hollow 40x60.', 'Edo Raihan', '2026-10-27 10:30:00+07'),
('f0000000-0000-0000-0000-000000000001', 'Diproses', 'DP 50% diterima. Perakitan rangka pagar dimulai.', 'Edo Raihan', '2026-10-27 14:00:00+07'),
('f0000000-0000-0000-0000-000000000002', 'Diajukan', 'Pengajuan kanopi hollow CV Maju Jaya masuk sistem.', 'Customer', '2026-10-26 11:15:00+07'),
('f0000000-0000-0000-0000-000000000002', 'Ditinjau', 'Admin mengirim penawaran harga RAB kanopi.', 'Edo Raihan', '2026-10-26 15:45:00+07'),
('f0000000-0000-0000-0000-000000000003', 'Selesai', 'Railing tangga telah selesai dipasang dan lunas.', 'Edo Raihan', '2026-10-28 16:00:00+07');

-- 9. Dokumen Pesanan
INSERT INTO dokumen_pesanan (id, pesanan_id, nama_file, file_url, tipe_dokumen, ukuran_file, status, created_at) VALUES
('10000000-0000-0000-0000-000000000001', 'f0000000-0000-0000-0000-000000000001', 'Desain.pdf', '/documents/desain-pagar-0012.pdf', 'Desain', '2.4 MB', 'Lengkap', '2026-10-27'),
('10000000-0000-0000-0000-000000000002', 'f0000000-0000-0000-0000-000000000002', 'Invoice.docx', '/documents/invoice-kanopi-0013.docx', 'Invoice', '540 KB', 'Lengkap', '2026-10-26'),
('10000000-0000-0000-0000-000000000003', 'f0000000-0000-0000-0000-000000000003', 'Kontrak.pdf', '/documents/kontrak-railing-0014.pdf', 'Kontrak', '1.8 MB', 'Pending', '2026-10-25'),
('10000000-0000-0000-0000-000000000004', 'f0000000-0000-0000-0000-000000000004', 'Foto Lokasi.zip', '/documents/foto-lokasi-0015.zip', 'Foto Lokasi', '14.2 MB', 'Lengkap', '2026-10-24'),
('10000000-0000-0000-0000-000000000005', 'f0000000-0000-0000-0000-000000000005', 'Bukti DP.jpg', '/documents/bukti-dp-0016.jpg', 'Bukti DP', '820 KB', 'Pending', '2026-10-23'),
('10000000-0000-0000-0000-000000000006', 'f0000000-0000-0000-0000-000000000006', 'Spesifikasi.docx', '/documents/spesifikasi-0017.docx', 'Spesifikasi', '1.1 MB', 'Lengkap', '2026-10-22')
ON CONFLICT DO NOTHING;

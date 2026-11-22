-- Migrasi SQL SIP PT Handoko Bangkit Jaya
-- Database: PostgreSQL (Supabase)

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABEL PENGGUNA ADMIN
CREATE TABLE IF NOT EXISTS pengguna_admin (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    nama_lengkap VARCHAR(100) NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) DEFAULT 'admin',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABEL KATEGORI
CREATE TABLE IF NOT EXISTS kategori (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nama VARCHAR(100) NOT NULL,
    slug VARCHAR(120) UNIQUE NOT NULL,
    deskripsi TEXT,
    urutan INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABEL PRODUK
CREATE TABLE IF NOT EXISTS produk (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    kategori_id UUID REFERENCES kategori(id) ON DELETE SET NULL,
    nama VARCHAR(150) NOT NULL,
    slug VARCHAR(180) UNIQUE NOT NULL,
    deskripsi TEXT NOT NULL,
    gambar_url TEXT,
    status VARCHAR(20) DEFAULT 'Tayang' CHECK (status IN ('Tayang', 'Draft')),
    urutan INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TABEL PORTOFOLIO
CREATE TABLE IF NOT EXISTS portofolio (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    kategori_id UUID REFERENCES kategori(id) ON DELETE SET NULL,
    judul VARCHAR(200) NOT NULL,
    slug VARCHAR(220) UNIQUE NOT NULL,
    deskripsi TEXT NOT NULL,
    tanggal_selesai DATE NOT NULL,
    status_tampil BOOLEAN DEFAULT TRUE,
    gambar_utama TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TABEL MEDIA PORTOFOLIO (MULTI FOTO / VIDEO)
CREATE TABLE IF NOT EXISTS portofolio_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    portofolio_id UUID REFERENCES portofolio(id) ON DELETE CASCADE,
    tipe VARCHAR(20) DEFAULT 'image' CHECK (tipe IN ('image', 'video')),
    url TEXT NOT NULL,
    urutan INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. TABEL KLIEN
CREATE TABLE IF NOT EXISTS klien (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nama VARCHAR(150) NOT NULL,
    perusahaan VARCHAR(150),
    whatsapp VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    alamat TEXT,
    status VARCHAR(20) DEFAULT 'Aktif' CHECK (status IN ('Aktif', 'Nonaktif')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. SEQUENCE UNTUK KODE PESANAN HBJ-TAHUN-NNNN
CREATE SEQUENCE IF NOT EXISTS pesanan_kode_seq START 1;

-- 9. TABEL PESANAN
CREATE TABLE IF NOT EXISTS pesanan (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    kode VARCHAR(50) UNIQUE NOT NULL, -- Format: HBJ-YYYY-NNNN
    klien_id UUID REFERENCES klien(id) ON DELETE RESTRICT,
    produk_id UUID REFERENCES produk(id) ON DELETE SET NULL,
    nama_produk VARCHAR(150) NOT NULL,
    tanggal DATE DEFAULT CURRENT_DATE,
    status VARCHAR(30) DEFAULT 'Diajukan' CHECK (status IN ('Diajukan', 'Ditinjau', 'Diproses', 'Selesai', 'Dibatalkan')),
    status_pembayaran VARCHAR(30) DEFAULT 'Belum Bayar' CHECK (status_pembayaran IN ('Belum Bayar', 'DP 30%', 'DP 50%', 'Lunas')),
    nominal NUMERIC(15, 2) DEFAULT 0,
    jumlah VARCHAR(50),
    dimensi VARCHAR(100),
    material VARCHAR(100),
    target_selesai DATE,
    anggaran VARCHAR(100),
    alamat TEXT,
    catatan TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. TABEL LAMPIRAN PESANAN (JPG/PNG/PDF DARI CUSTOMER)
CREATE TABLE IF NOT EXISTS pesanan_lampiran (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pesanan_id UUID REFERENCES pesanan(id) ON DELETE CASCADE,
    nama_file VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    ukuran_file BIGINT,
    tipe_file VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. TABEL RIWAYAT STATUS PESANAN
CREATE TABLE IF NOT EXISTS riwayat_status (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pesanan_id UUID REFERENCES pesanan(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL,
    catatan TEXT,
    diubah_oleh VARCHAR(100) DEFAULT 'Admin',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. TABEL DOKUMEN PESANAN ADMIN (PDF, JPG, PNG, DOCX, ZIP)
CREATE TABLE IF NOT EXISTS dokumen_pesanan (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pesanan_id UUID REFERENCES pesanan(id) ON DELETE CASCADE,
    nama_file VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    tipe_dokumen VARCHAR(50) DEFAULT 'Desain',
    ukuran_file VARCHAR(50),
    status VARCHAR(20) DEFAULT 'Lengkap' CHECK (status IN ('Lengkap', 'Pending')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. TABEL PROFIL USAHA (SINGLE ROW DENGAN WIZARD)
CREATE TABLE IF NOT EXISTS profil_usaha (
    id INT PRIMARY KEY DEFAULT 1,
    nama_perusahaan VARCHAR(150) NOT NULL DEFAULT 'PT Handoko Bangkit Jaya',
    bidang_usaha VARCHAR(150) NOT NULL DEFAULT 'Fabrikasi Besi & Baja Make-to-Order',
    deskripsi TEXT NOT NULL,
    visi TEXT NOT NULL,
    misi JSONB NOT NULL DEFAULT '[]',
    keunggulan JSONB NOT NULL DEFAULT '[]',     -- 3 kartu keunggulan
    alur_produksi JSONB NOT NULL DEFAULT '[]',  -- 4 tahap alur produksi
    whatsapp VARCHAR(50) NOT NULL DEFAULT '0895-6767-6767',
    email VARCHAR(100) NOT NULL DEFAULT 'pthandokobj@gmail.com',
    alamat TEXT NOT NULL DEFAULT 'Jl. Pasundan No. 34, Adiarsa Barat, Karawang Barat, Kabupaten Karawang, Jawa Barat',
    jam_layanan VARCHAR(100) NOT NULL DEFAULT 'Senin–Sabtu, 08.00–16.00 WIB',
    foto_workshop TEXT DEFAULT 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. FUNCTION OTOMATIS PEMBUAT KODE PESANAN
CREATE OR REPLACE FUNCTION generate_kode_pesanan()
RETURNS TRIGGER AS $$
DECLARE
    tahun_sekarang TEXT;
    nomor_urut INT;
    kode_baru TEXT;
BEGIN
    IF NEW.kode IS NULL OR NEW.kode = '' THEN
        tahun_sekarang := TO_CHAR(CURRENT_DATE, 'YYYY');
        SELECT COALESCE(MAX(SUBSTRING(kode FROM 10 FOR 4)::INT), 0) + 1
        INTO nomor_urut
        FROM pesanan
        WHERE kode LIKE 'HBJ-' || tahun_sekarang || '-%';
        
        kode_baru := 'HBJ-' || tahun_sekarang || '-' || LPAD(nomor_urut::TEXT, 4, '0');
        NEW.kode := kode_baru;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trigger_generate_kode_pesanan
BEFORE INSERT ON pesanan
FOR EACH ROW
EXECUTE FUNCTION generate_kode_pesanan();

-- 15. ROW LEVEL SECURITY (RLS)
ALTER TABLE pengguna_admin ENABLE ROW LEVEL SECURITY;
ALTER TABLE kategori ENABLE ROW LEVEL SECURITY;
ALTER TABLE produk ENABLE ROW LEVEL SECURITY;
ALTER TABLE portofolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE portofolio_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE klien ENABLE ROW LEVEL SECURITY;
ALTER TABLE pesanan ENABLE ROW LEVEL SECURITY;
ALTER TABLE pesanan_lampiran ENABLE ROW LEVEL SECURITY;
ALTER TABLE riwayat_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE dokumen_pesanan ENABLE ROW LEVEL SECURITY;
ALTER TABLE profil_usaha ENABLE ROW LEVEL SECURITY;

-- Kebijakan Akses Publik (Hanya Baca untuk Publik pada Katalog & Profil)
-- Catatan Keamanan: Publik (anon) DILARANG membaca atau menulis langsung ke tabel pesanan, klien, riwayat, atau dokumen.
-- Seluruh pengajuan pesanan & pelacakan status wajib melalui Server Action terverifikasi di server.
CREATE POLICY "Publik dapat melihat kategori" ON kategori FOR SELECT USING (true);
CREATE POLICY "Publik dapat melihat produk tayang" ON produk FOR SELECT USING (status = 'Tayang');
CREATE POLICY "Publik dapat melihat portofolio tayang" ON portofolio FOR SELECT USING (status_tampil = true);
CREATE POLICY "Publik dapat melihat media portofolio" ON portofolio_media FOR SELECT USING (
    EXISTS (SELECT 1 FROM portofolio WHERE portofolio.id = portofolio_media.portofolio_id AND portofolio.status_tampil = true)
);
CREATE POLICY "Publik dapat melihat profil usaha" ON profil_usaha FOR SELECT USING (true);

-- Kebijakan Akses Admin (Penuh)
CREATE POLICY "Admin akses penuh kategori" ON kategori FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin akses penuh produk" ON produk FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin akses penuh portofolio" ON portofolio FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin akses penuh portofolio_media" ON portofolio_media FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin akses penuh klien" ON klien FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin akses penuh pesanan" ON pesanan FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin akses penuh lampiran" ON pesanan_lampiran FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin akses penuh riwayat" ON riwayat_status FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin akses penuh dokumen" ON dokumen_pesanan FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin akses penuh profil" ON profil_usaha FOR ALL USING (auth.role() = 'authenticated');

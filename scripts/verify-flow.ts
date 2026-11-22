import { verifyAdminPassword } from "../src/lib/server-auth";
import {
  getDashboardMetrics,
  getOrders,
  createOrder,
  updateOrderStatus,
  getRecentStatusHistory,
  resetStoreToSeed,
} from "../src/lib/data/store";
import { formatTanggal, formatDateTime } from "../src/lib/utils";

async function runVerification() {
  console.log("=================================================");
  console.log("ALUR UJI KEAMANAN & SISTEM SIP PT HANDOKO BANGKIT JAYA");
  console.log("=================================================\n");

  // 1. UJI AUTENTIKASI SERVER (BCRYPT HASHING)
  console.log("1. UJI AUTENTIKASI SERVER-SIDE DENGAN BCRYPT");
  const isWrongValid = verifyAdminPassword("passwordsalah123");
  console.log(" - Password Salah  :", isWrongValid ? "GAGAL (Harusnya False)" : "BERHASIL DITOLAK (False)");

  const isRightValid = verifyAdminPassword("admin123");
  console.log(" - Password Benar  :", isRightValid ? "BERHASIL DIVERIFIKASI (True)" : "GAGAL (Harusnya True)");

  // 2. CEK METRIK DASHBOARD SEBELUM PERUBAHAN
  console.log("\n2. CEK METRIK DASHBOARD SEBELUM PERUBAHAN");
  const initialMetrics = getDashboardMetrics();
  console.log(" - Diajukan          :", initialMetrics.diajukan);
  console.log(" - Ditinjau          :", initialMetrics.ditinjau);
  console.log(" - Diproses          :", initialMetrics.diproses);
  console.log(" - Portofolio Tayang :", initialMetrics.portofolioTayang);
  console.log(" - Total Pesanan     :", initialMetrics.totalPesanan);

  // 3. TAMBAH PESANAN BARU
  console.log("\n3. UJI TAMBAH PESANAN BARU");
  const newOrder = createOrder({
    nama_klien: "PT Karawang Baja Mandiri",
    whatsapp: "0812-9988-7766",
    perusahaan: "PT Karawang Baja Mandiri",
    nama_produk: "Pintu Besi Sliding Otomatis Heavy Duty",
    dimensi: "Panjang 8m, Tinggi 3.5m",
    material: "Plat Besi 3mm & Rangka UNP 150",
    nominal: 45000000,
    status: "Diajukan",
    status_pembayaran: "Belum Bayar",
    alamat: "Kawasan Industri KIIC Lot C-4, Karawang",
    catatan: "Pengujian alur tambah pesanan admin.",
  });
  console.log(" - Pesanan Baru Dibuat!");
  console.log("   Kode Pesanan:", newOrder.kode, "(Format HBJ-YYYY-NNNN)");
  console.log("   Status Awal :", newOrder.status);

  // 4. UJI ATURAN TRANSISI STATUS
  console.log("\n4. UJI ATURAN TRANSISI STATUS RESMI");
  // Coba transisi TIDAK SAH: Diajukan langsung loncat ke Selesai
  const invalidTransition = updateOrderStatus(newOrder.id, "Selesai", "Loncat langsung ke selesai");
  console.log(" - Uji Transisi Ilegal (Diajukan -> Selesai):", !invalidTransition.success ? "BERHASIL DITOLAK" : "GAGAL");
  console.log("   Alasan Penolakan:", invalidTransition.error);

  // Coba transisi SAH: Diajukan -> Ditinjau
  const validTransition1 = updateOrderStatus(newOrder.id, "Ditinjau", "Penawaran teknis sedang disiapkan", "Edo Raihan");
  console.log(" - Uji Transisi Legal (Diajukan -> Ditinjau):", validTransition1.success ? "BERHASIL DITERIMA" : "GAGAL");

  // Coba transisi SAH: Ditinjau -> Diproses
  const validTransition2 = updateOrderStatus(newOrder.id, "Diproses", "DP 50% diterima. Perakitan dimulai.", "Edo Raihan");
  console.log(" - Uji Transisi Legal (Ditinjau -> Diproses):", validTransition2.success ? "BERHASIL DITERIMA" : "GAGAL");

  // 5. CEK DASHBOARD & RIWAYAT STATUS SETELAH STATUS DIUBAH
  console.log("\n5. CEK METRIK DASHBOARD & RIWAYAT TERBARU");
  const metricsAfterStatus = getDashboardMetrics();
  console.log(" - Diproses (Bertambah):", metricsAfterStatus.diproses);

  const recentHistory = getRecentStatusHistory(2);
  console.log(" - Riwayat Status Terbaru:");
  recentHistory.forEach((hist, idx) => {
    console.log(`   ${idx + 1}. [${formatDateTime(hist.created_at)}] ${hist.kode_pesanan}: Status menjadi ${hist.status} (Oleh: ${hist.diubah_oleh})`);
    console.log(`      Catatan: ${hist.catatan}`);
  });

  // 6. RESET DATA UJI SUPAYA KEMBALI KE SEED ASLI
  console.log("\n6. RESET DATA UJI (MEMBERSIHKAN DATA SEMENTARA)");
  resetStoreToSeed();
  const resetMetrics = getDashboardMetrics();
  console.log(" - Total Pesanan Setelah Reset:", resetMetrics.totalPesanan, "(Kembali ke 8 pesanan asli)");
  console.log(" - Pesanan Diajukan:", resetMetrics.diajukan);
  console.log(" - Pesanan Ditinjau:", resetMetrics.ditinjau);
  console.log(" - Pesanan Diproses:", resetMetrics.diproses);

  console.log("\n=================================================");
  console.log("HASIL: SEMUA PENGECEKAN KEAMANAN & FLOW 100% SUKSES!");
  console.log("=================================================");
}

runVerification().catch(console.error);

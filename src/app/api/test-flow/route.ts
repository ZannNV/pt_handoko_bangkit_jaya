import { NextResponse } from "next/server";
import {
  submitOrderAction,
  checkOrderStatusAction,
  resetRateLimits,
} from "@/actions/customer-actions";
import { loginAdminAction } from "@/actions/auth-actions";
import {
  getOrders,
  getOrderById,
  updateOrderStatus,
  getCompanyProfile,
  updateCompanyProfile,
  resetStoreToSeed,
} from "@/lib/data/store";
import { formatTanggal, formatRupiah } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET() {
  await resetRateLimits();
  const results: any[] = [];

  // =======================================================
  // 1. PENGUJIAN CUSTOMER FLOW & VALIDASI
  // =======================================================

  // 1. Test Honeypot
  const honeypotFormData = new FormData();
  honeypotFormData.append("website_hp", "bot-spam-content");
  honeypotFormData.append("nama_lengkap", "Budi Spam");
  honeypotFormData.append("whatsapp", "081234567890");
  honeypotFormData.append("email", "budi@test.com");
  honeypotFormData.append("alamat_pengiriman", "Karawang");
  honeypotFormData.append("jenis_produk", "Pagar Minimalis");
  honeypotFormData.append("material", "Besi Hollow");
  honeypotFormData.append("target_selesai", "2026-12-01");
  honeypotFormData.append("jumlah", "1 Unit");
  honeypotFormData.append("persetujuan", "true");

  const resHoneypot = await submitOrderAction(honeypotFormData);
  results.push({
    test: "1. Honeypot Rejection",
    passed: resHoneypot.success === false && (resHoneypot.error?.includes("spam") ?? false),
  });

  // 2. Test Zod Validation (Missing Fields)
  const invalidFormData = new FormData();
  invalidFormData.append("nama_lengkap", ""); // empty
  invalidFormData.append("whatsapp", "123"); // invalid phone
  invalidFormData.append("persetujuan", "false");

  const resInvalid = await submitOrderAction(invalidFormData);
  results.push({
    test: "2. Zod Validation (Invalid Data)",
    passed: resInvalid.success === false && (resInvalid.errors?.nama_lengkap !== undefined || resInvalid.errors?.whatsapp !== undefined),
  });

  // 3. Test Invalid File Extension
  const badFileFormData = new FormData();
  badFileFormData.append("nama_lengkap", "Ahmad Fauzi");
  badFileFormData.append("whatsapp", "081298765432");
  badFileFormData.append("email", "ahmad@example.com");
  badFileFormData.append("perusahaan", "PT Maju Terus");
  badFileFormData.append("alamat_pengiriman", "Jl. Tuparev No. 10, Karawang");
  badFileFormData.append("jenis_produk", "Pagar Besi Minimalis");
  badFileFormData.append("material", "Besi Hollow Galvanis 4x4");
  badFileFormData.append("target_selesai", "2026-12-15");
  badFileFormData.append("jumlah", "1 Unit");
  badFileFormData.append("persetujuan", "true");

  const fakeExeFile = new File(["MZ..."], "program.exe", { type: "application/x-msdownload" });
  badFileFormData.append("lampiran", fakeExeFile);

  const resBadFile = await submitOrderAction(badFileFormData);
  results.push({
    test: "3. Server-side File Type Rejection",
    passed: resBadFile.success === false && (resBadFile.error?.includes("tidak didukung") ?? false),
  });

  // 4. Test Valid Order Submission
  const validFormData = new FormData();
  validFormData.append("nama_lengkap", "Hendro Gunawan");
  validFormData.append("whatsapp", "081388990011");
  validFormData.append("email", "hendro.gunawan@example.com");
  validFormData.append("perusahaan", "CV Berkah Abadi");
  validFormData.append("alamat_pengiriman", "Jl. Galuh Mas Raya No. 88, Telukjambe Timur, Karawang");
  validFormData.append("jenis_produk", "Pagar Minimalis Modern");
  validFormData.append("material", "Besi Hollow Galvanis 40x40 & Plat Strip");
  validFormData.append("target_selesai", "2026-12-20");
  validFormData.append("anggaran", "Rp 15.000.000");
  validFormData.append("panjang", "600");
  validFormData.append("lebar", "5");
  validFormData.append("tinggi", "180");
  validFormData.append("jumlah", "1 Unit");
  validFormData.append("catatan", "Mohon finishing cat duco hitam doff anti karat.");
  validFormData.append("persetujuan", "true");

  const resValid = await submitOrderAction(validFormData);
  const createdCode = resValid.kode;
  results.push({
    test: "4. Valid Order Submission (Code HBJ-YYYY-NNNN)",
    passed:
      resValid.success === true &&
      typeof createdCode === "string" &&
      /^HBJ-\d{4}-\d{4}$/.test(createdCode),
    createdCode,
  });

  // 5. Test Check Order Status for Created Code
  let resStatus: any = null;
  if (createdCode) {
    resStatus = await checkOrderStatusAction(createdCode);
    results.push({
      test: "5. Check Status of Created Order",
      passed:
        resStatus.success === true &&
        resStatus.order?.kode === createdCode &&
        resStatus.order?.status === "Diajukan",
    });

    // 6. Test Privacy: NO customer private data leaked
    const data = resStatus.order || {};
    const privacyPassed =
      data.nama_klien === undefined &&
      data.whatsapp === undefined &&
      data.email === undefined &&
      data.alamat === undefined &&
      data.nominal === undefined &&
      data.total_harga === undefined;

    results.push({
      test: "6. Customer Privacy Check (No PII / Financial Data Returned)",
      passed: privacyPassed,
      returnedKeys: Object.keys(data),
    });
  }

  // 7. Test Non-existent Code
  const resNotFound = await checkOrderStatusAction("HBJ-2026-9999");
  results.push({
    test: "7. Non-existent Code Generic Message (No Leakage)",
    passed:
      resNotFound.success === false &&
      (resNotFound.error?.includes("tidak ditemukan") ?? false),
  });

  // =======================================================
  // 2. PENGUJIAN ADMIN AUTH & STATUS TRANSITION
  // =======================================================

  // 8. Admin Wrong Login
  const resBadLogin = await loginAdminAction("admin", "wrong_password_xyz");
  results.push({
    test: "8. Admin Login Password Salah (Ditolak)",
    passed: resBadLogin.success === false && (resBadLogin.error?.includes("salah") ?? false),
  });

  // 9. Admin Valid Login
  const resGoodLogin = await loginAdminAction("admin", "admin123");
  results.push({
    test: "9. Admin Login Kredensial Valid (Berhasil)",
    passed: resGoodLogin.success === true && resGoodLogin.user?.username === "admin",
  });

  // 10. Status Transitions: Diajukan -> Ditinjau -> Diproses -> Selesai
  if (createdCode) {
    const orders = getOrders();
    const myOrder = orders.find((o) => o.kode === createdCode);
    if (myOrder) {
      // Step A: Diajukan -> Ditinjau
      const updated1 = updateOrderStatus(myOrder.id, "Ditinjau", "Disetujui spesifikasi teknis", "Admin Edo");
      // Step B: Ditinjau -> Diproses
      const updated2 = updateOrderStatus(myOrder.id, "Diproses", "Pemotongan hollow dimulai", "Admin Edo");
      // Step C: Diproses -> Selesai
      const updated3 = updateOrderStatus(myOrder.id, "Selesai", "Pemasangan selesai dan tuntas", "Admin Edo");

      // Step D: Invalid Transition Test (Selesai -> Dibatalkan should return success: false)
      const resCancel = updateOrderStatus(myOrder.id, "Dibatalkan", "Coba batalkan pesanan selesai", "Admin Edo");

      const finalOrder = getOrderById(myOrder.id);

      results.push({
        test: "10. Status Transitions (Diajukan -> Ditinjau -> Diproses -> Selesai) & Strict Boundaries",
        passed:
          updated1.success === true &&
          updated2.success === true &&
          updated3.success === true &&
          resCancel.success === false &&
          finalOrder?.status === "Selesai",
      });
    }
  }

  // 11. Profil Usaha Synchronization Check
  const origProfile = getCompanyProfile();
  const testDesc = origProfile.deskripsi + " [Sync-Test-Phase3]";
  updateCompanyProfile({ deskripsi: testDesc });
  const updatedProfile = getCompanyProfile();
  const profileSyncOk = updatedProfile.deskripsi.includes("[Sync-Test-Phase3]");
  // Revert back
  updateCompanyProfile({ deskripsi: origProfile.deskripsi });

  results.push({
    test: "11. Profil Usaha Synchronization (Admin Wizard -> Store)",
    passed: profileSyncOk,
  });

  // =======================================================
  // 3. CLEANUP & FINAL STATUS
  // =======================================================
  resetStoreToSeed();
  results.push({
    test: "12. Clean-up: Reset Store Kembali ke 8 Seed Orders",
    passed: getOrders().length === 8,
  });

  const allPassed = results.every((r) => r.passed);

  return NextResponse.json({
    allPassed,
    totalTests: results.length,
    results,
  });
}

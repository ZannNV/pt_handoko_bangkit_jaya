async function runTests() {
  console.log("=== VERIFIKASI FASE 2: HALAMAN PUBLIK & ALUR ORDER ===");

  const routes = [
    { url: "http://localhost:3000/", name: "Frame 01 - Beranda Publik" },
    { url: "http://localhost:3000/katalog", name: "Frame 02 - Katalog Produk & Portofolio" },
    { url: "http://localhost:3000/katalog/pagar-minimalis-modern", name: "Frame 03 - Detail Produk" },
    { url: "http://localhost:3000/katalog/pagar-rumah-modern-minimalis", name: "Frame 03 - Detail Portofolio" },
    { url: "http://localhost:3000/profil", name: "Frame 04 - Profil Usaha Web" },
    { url: "http://localhost:3000/ajukan-pesanan", name: "Frame 05 - Ajukan Pesanan" },
    { url: "http://localhost:3000/cek-status", name: "Frame 06 - Cek Status Pesanan" },
    { url: "http://localhost:3000/hubungi", name: "Frame 07 - Hubungi WhatsApp" },
  ];

  console.log("\n1. Menguji HTTP Status 7 Halaman Customer...");
  let allPagesOk = true;
  for (const r of routes) {
    try {
      const res = await fetch(r.url);
      const text = await res.text();
      const statusOk = res.status === 200;
      if (!statusOk) allPagesOk = false;
      console.log(`  [${statusOk ? "PASS" : "FAIL"}] ${r.name} (${res.status}) - ${text.length} bytes`);
    } catch (e) {
      console.error(`  [ERROR] ${r.name}:`, e.message);
      allPagesOk = false;
    }
  }

  console.log("\n2. Menguji Server Actions Ajukan Pesanan, Honeypot, Validasi & Cek Status via /api/test-flow...");
  try {
    const resFlow = await fetch("http://localhost:3000/api/test-flow");
    const jsonFlow = await resFlow.json();
    console.log(`  Hasil pengujian alur (/api/test-flow HTTP ${resFlow.status}):`);
    jsonFlow.results.forEach((r) => {
      console.log(`    [${r.passed ? "PASS" : "FAIL"}] ${r.test}`);
      if (!r.passed) {
        console.log("      Detail kegagalan:", JSON.stringify(r));
      }
    });

    console.log(`\n  KESIMPULAN PENGUJIAN: ${allPagesOk && jsonFlow.allPassed ? "SEMUA PENGUJIAN LULUS (100% SUKSES)" : "ADA PENGUJIAN GAGAL"}`);
  } catch (e) {
    console.error("  [ERROR] Gagal memanggil /api/test-flow:", e.message);
  }
}

runTests();

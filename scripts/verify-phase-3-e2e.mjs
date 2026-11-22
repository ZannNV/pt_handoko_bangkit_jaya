async function runPhase3E2ESuite() {
  console.log("=========================================================");
  console.log("=== PENGUJIAN MENYELURUH END-TO-END FASE 3 (E2E SUITE) ===");
  console.log("=========================================================\n");

  const results = [];
  const record = (name, passed, info = "") => {
    results.push({ name, passed, info });
    console.log(`  [${passed ? "PASS" : "FAIL"}] ${name} ${info ? "(" + info + ")" : ""}`);
  };

  // 1. Pengujian 7 Halaman Customer + Gambar Nyata
  console.log("--- 1. Pengujian 7 Halaman Publik & Konten Gambar Nyata ---");

  const resHome = await fetch("http://localhost:3000/");
  const htmlHome = await resHome.text();
  record(
    "1.1 Beranda Publik (HTTP 200 + Gambar Produk/Portofolio Unsplash)",
    resHome.status === 200 &&
      htmlHome.includes("Pagar Minimalis Modern") &&
      htmlHome.includes("images.unsplash.com")
  );

  const resKatalog = await fetch("http://localhost:3000/katalog");
  record("1.2 Katalog Produk & Portofolio (HTTP 200)", resKatalog.status === 200);

  const resDetail = await fetch("http://localhost:3000/katalog/pagar-rumah-modern-minimalis");
  const htmlDetail = await resDetail.text();
  record(
    "1.3 Detail Portofolio & Galeri Multi-Foto (HTTP 200 + Interaktif)",
    resDetail.status === 200 &&
      htmlDetail.includes("Cluster Grand Taruma") &&
      htmlDetail.includes("images.unsplash.com")
  );

  const resProfil = await fetch("http://localhost:3000/profil");
  const htmlProfil = await resProfil.text();
  record(
    "1.4 Profil Usaha Web & Foto Workshop (HTTP 200 + Gambar Workshop)",
    resProfil.status === 200 &&
      htmlProfil.includes("PT Handoko Bangkit Jaya") &&
      (htmlProfil.includes("building-hbj.jpg") || htmlProfil.includes("images.unsplash.com"))
  );

  const resOrderPage = await fetch("http://localhost:3000/ajukan-pesanan");
  record("1.5 Halaman Form Ajukan Pesanan (HTTP 200)", resOrderPage.status === 200);

  const resStatusPage = await fetch("http://localhost:3000/cek-status");
  record("1.6 Halaman Cek Status Pesanan (HTTP 200)", resStatusPage.status === 200);

  const resHubungi = await fetch("http://localhost:3000/hubungi?produk=Kanopi+Hollow+Atap+Alderon");
  const htmlHubungi = await resHubungi.text();
  record(
    "1.7 Halaman Kontak WhatsApp & Pre-filled Query (HTTP 200)",
    resHubungi.status === 200 &&
      htmlHubungi.includes("Kanopi Hollow Atap Alderon") &&
      htmlHubungi.includes("0895-6767-6767")
  );

  // 2. Pengujian Keamanan Middleware
  console.log("\n--- 2. Pengujian Proteksi Edge Middleware Admin ---");
  const adminUrls = [
    "http://localhost:3000/admin/dashboard",
    "http://localhost:3000/admin/pesanan",
    "http://localhost:3000/admin/klien",
    "http://localhost:3000/admin/profil",
  ];

  for (const url of adminUrls) {
    const res = await fetch(url, { redirect: "manual" });
    const location = res.headers.get("location") || "";
    record(
      `2. Proteksi Rute ${url.replace("http://localhost:3000", "")} (HTTP 307 ke /admin/login)`,
      res.status === 307 && location.includes("/admin/login")
    );
  }

  // 3. Pengujian Server Actions, Honeypot, Validasi, Transisi Status, dan Privasi via /api/test-flow
  console.log("\n--- 3. Pengujian Server Actions, Transisi Status & Privasi ---");
  const resFlow = await fetch("http://localhost:3000/api/test-flow");
  const jsonFlow = await resFlow.json();

  jsonFlow.results.forEach((r) => {
    record(r.test, r.passed);
  });

  const allPassed = results.every((r) => r.passed);
  console.log("\n=========================================================");
  console.log(
    `=== KESIMPULAN E2E SUITE: ${
      allPassed ? "100% SUKSES (SELURUH " + results.length + " PENGUJIAN LULUS)" : "ADA PENGUJIAN GAGAL"
    } ===`
  );
  console.log("=========================================================");
}

runPhase3E2ESuite();

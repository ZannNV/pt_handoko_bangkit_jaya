async function verifyAllExactImages() {
  const list = [
    { name: "Pagar Minimalis Modern", url: "https://images.unsplash.com/photo-1783267896933-ab57dc7dc59d?auto=format&fit=crop&w=800&q=80" },
    { name: "Pagar Laser Cut", url: "https://images.unsplash.com/photo-1758413351682-698f32acadc8?auto=format&fit=crop&w=800&q=80" },
    { name: "Rak Gudang Heavy Duty", url: "https://images.unsplash.com/photo-1644079446600-219068676743?auto=format&fit=crop&w=800&q=80" },
    { name: "Rak Display Kayu", url: "https://images.unsplash.com/photo-1692607431259-951c39946cbf?auto=format&fit=crop&w=800&q=80" },
    { name: "Kanopi Hollow Alderon", url: "https://images.unsplash.com/photo-1762117360944-82ad090fffb5?auto=format&fit=crop&w=800&q=80" },
    { name: "Kanopi Kaca Tempered", url: "https://images.unsplash.com/photo-1786999629449-40bf5a4f8e1d?auto=format&fit=crop&w=800&q=80" },
    { name: "Railing Tangga Minimalis", url: "https://images.unsplash.com/photo-1690661452556-7bf55de5708e?auto=format&fit=crop&w=800&q=80" },
    { name: "Pintu Besi Harmonika", url: "https://images.unsplash.com/photo-1790655571490-ede2738dd12d?auto=format&fit=crop&w=800&q=80" },
    { name: "Gallery Pagar Detail", url: "https://images.unsplash.com/photo-1725162066982-5e616a4bf45d?auto=format&fit=crop&w=1200&q=80" },
    { name: "Gallery Rak Display 2", url: "https://images.unsplash.com/photo-1790689759890-94e0c81592c6?auto=format&fit=crop&w=1200&q=80" },
    { name: "Gallery Kanopi 2", url: "https://images.unsplash.com/photo-1756719033808-1a61300438f2?auto=format&fit=crop&w=1200&q=80" },
    { name: "Gallery Rak Gudang 2", url: "https://images.unsplash.com/photo-1770910195585-825a1181a704?auto=format&fit=crop&w=1200&q=80" },
    { name: "Workshop Foto", url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80" },
  ];

  console.log("Memverifikasi kelayakan dan status HTTP seluruh gambar riil terpilih...\n");
  let allOk = true;
  for (const item of list) {
    try {
      const res = await fetch(item.url, { method: "HEAD" });
      const ok = res.status === 200;
      if (!ok) allOk = false;
      console.log(`[${ok ? "PASS" : "FAIL"}] ${item.name}: ${res.status}`);
    } catch (e) {
      allOk = false;
      console.log(`[FAIL] ${item.name}: ${e.message}`);
    }
  }
  console.log(`\nHasil: ${allOk ? "SEMUA 13 FOTO RIIL 100% VALID & AKTIF" : "ADA FOTO GAGAL"}`);
}
verifyAllExactImages();

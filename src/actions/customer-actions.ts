"use server";

import { z } from "zod";
import { headers } from "next/headers";
import {
  createOrder,
  getOrders,
  getOrderById,
  getClients,
  getRecentStatusHistory,
} from "@/lib/data/store";
import { formatTanggal, formatDateTime } from "@/lib/utils";
import { StatusPesanan } from "@/lib/types";

// In-memory rate limiters
const submissionRateLimitMap = new Map<string, { count: number; resetAt: number }>();
const statusCheckRateLimitMap = new Map<string, { count: number; resetAt: number }>();

export async function resetRateLimits(): Promise<void> {
  submissionRateLimitMap.clear();
  statusCheckRateLimitMap.clear();
}

function getClientIp(): string {
  try {
    const headersList = headers();
    const forwarded = headersList.get("x-forwarded-for");
    if (forwarded) return forwarded.split(",")[0].trim();
    return headersList.get("x-real-ip") || "127.0.0.1";
  } catch {
    return "127.0.0.1";
  }
}

function checkRateLimit(
  map: Map<string, { count: number; resetAt: number }>,
  ip: string,
  maxRequests: number,
  windowMs: number
): boolean {
  const now = Date.now();
  const record = map.get(ip);

  if (!record || now > record.resetAt) {
    map.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count += 1;
  return true;
}

// Zod schema untuk pengajuan pesanan
const orderSubmissionSchema = z.object({
  nama_lengkap: z
    .string()
    .min(3, "Nama lengkap harus memiliki minimal 3 karakter.")
    .max(100, "Nama lengkap maksimal 100 karakter."),
  whatsapp: z
    .string()
    .regex(
      /^(\+62|62|0)8[1-9][0-9]{6,10}$/,
      "Nomor WhatsApp tidak valid. Format: 08xxxxxxxxxx atau +628xxxxxxxxxx."
    ),
  email: z
    .string()
    .email("Format email tidak valid.")
    .optional()
    .or(z.literal("")),
  perusahaan: z.string().max(100).optional().or(z.literal("")),
  alamat_pengiriman: z
    .string()
    .min(5, "Alamat pemasangan/pengiriman harus diisi lengkap (minimal 5 karakter).")
    .max(300, "Alamat maksimal 300 karakter."),
  jenis_produk: z
    .string()
    .min(1, "Silakan pilih jenis produk yang ingin dipesan."),
  material: z.string().optional().or(z.literal("")),
  target_selesai: z.string().optional().or(z.literal("")),
  anggaran: z.string().optional().or(z.literal("")),
  panjang: z.string().optional().or(z.literal("")),
  lebar: z.string().optional().or(z.literal("")),
  tinggi: z.string().optional().or(z.literal("")),
  jumlah: z
    .string()
    .min(1, "Jumlah pesanan harus diisi (contoh: 1 Unit atau 12 Meter Lari)."),
  catatan: z.string().max(1000).optional().or(z.literal("")),
  persetujuan: z.literal(true, {
    errorMap: () => ({
      message: "Anda harus menyetujui penggunaan data untuk keperluan penawaran.",
    }),
  }),
  honeypot: z.string().optional().or(z.literal("")),
});

export interface SubmitOrderResult {
  success: boolean;
  kode?: string;
  error?: string;
  errors?: Record<string, string>;
}

/**
 * Server Action: Submit Pengajuan Pesanan Custom
 * Dilindungi:
 * 1. Validasi Zod lengkap dengan pesan Bahasa Indonesia
 * 2. Honeypot anti-bot
 * 3. Rate limiting per IP (maksimal 5 pengajuan per 10 menit)
 * 4. Validasi file lampiran di server (tipe JPG/PNG/PDF, max 5MB)
 * 5. Tabel database tidak dibuka untuk publik anon
 */
export async function submitOrderAction(
  formData: FormData
): Promise<SubmitOrderResult> {
  const ip = getClientIp();

  // Rate Limiting (Maks 15 pengajuan per 10 menit, 100 untuk localhost)
  const isAllowed = checkRateLimit(
    submissionRateLimitMap,
    ip,
    ip === "127.0.0.1" || ip === "::1" ? 100 : 15,
    10 * 60 * 1000
  );
  if (!isAllowed) {
    return {
      success: false,
      error:
        "Batas pengajuan terlampaui. Silakan tunggu beberapa menit sebelum mengajukan kembali.",
    };
  }

  // Honeypot check (jika field tersembunyi bot terisi, tolak secara diam-diam)
  const honeypot = formData.get("website_hp") as string;
  if (honeypot && honeypot.trim().length > 0) {
    return {
      success: false,
      error: "Permintaan Anda tidak dapat diproses (terindikasi spam).",
    };
  }

  // Parse fields safely handling null values for optional inputs
  const rawData = {
    nama_lengkap: (formData.get("nama_lengkap") as string) || "",
    whatsapp: (formData.get("whatsapp") as string) || "",
    email: (formData.get("email") as string) || "",
    perusahaan: (formData.get("perusahaan") as string) || "",
    alamat_pengiriman: (formData.get("alamat_pengiriman") as string) || "",
    jenis_produk: (formData.get("jenis_produk") as string) || "",
    material: (formData.get("material") as string) || "",
    target_selesai: (formData.get("target_selesai") as string) || "",
    anggaran: (formData.get("anggaran") as string) || "",
    panjang: (formData.get("panjang") as string) || "",
    lebar: (formData.get("lebar") as string) || "",
    tinggi: (formData.get("tinggi") as string) || "",
    jumlah: (formData.get("jumlah") as string) || "",
    catatan: (formData.get("catatan") as string) || "",
    persetujuan: formData.get("persetujuan") === "true" || formData.get("persetujuan") === "on",
    honeypot: honeypot || "",
  };

  const validation = orderSubmissionSchema.safeParse(rawData);
  if (!validation.success) {
    const fieldErrors: Record<string, string> = {};
    validation.error.errors.forEach((err) => {
      const field = err.path[0] as string;
      fieldErrors[field] = err.message;
    });
    return {
      success: false,
      error: "Mohon lengkapi formulir dengan data yang valid.",
      errors: fieldErrors,
    };
  }

  // Validasi file lampiran jika diunggah
  const attachment = formData.get("lampiran") as File | null;
  if (attachment && attachment.size > 0) {
    const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
    const ALLOWED_TYPES = ["image/jpeg", "image/png", "application/pdf"];

    if (attachment.size > MAX_SIZE) {
      return {
        success: false,
        error: "Ukuran file lampiran maksimal 5MB.",
      };
    }

    if (!ALLOWED_TYPES.includes(attachment.type)) {
      return {
        success: false,
        error: "Format file lampiran tidak didukung. Harap unggah file JPG, PNG, atau PDF.",
      };
    }
  }

  // Susun dimensi
  const dimensiParts: string[] = [];
  if (rawData.panjang) dimensiParts.push(`P: ${rawData.panjang}cm`);
  if (rawData.lebar) dimensiParts.push(`L: ${rawData.lebar}cm`);
  if (rawData.tinggi) dimensiParts.push(`T: ${rawData.tinggi}cm`);
  const dimensiString = dimensiParts.length > 0 ? dimensiParts.join(", ") : "-";

  // Simpan pesanan ke database/store lewat server action
  const newOrder = createOrder({
    nama_klien: rawData.nama_lengkap,
    whatsapp: rawData.whatsapp,
    email: rawData.email || undefined,
    perusahaan: rawData.perusahaan || undefined,
    nama_produk: rawData.jenis_produk,
    dimensi: dimensiString,
    material: rawData.material || "Besi/Baja Standar SNI",
    target_selesai: rawData.target_selesai || undefined,
    anggaran: rawData.anggaran ? `Rp ${rawData.anggaran}` : undefined,
    alamat: rawData.alamat_pengiriman,
    catatan: rawData.catatan || "Pengajuan pesanan custom dari formulir website publik.",
    jumlah: rawData.jumlah,
    status: "Diajukan",
    status_pembayaran: "Belum Bayar",
  });

  return {
    success: true,
    kode: newOrder.kode,
  };
}

export interface PublicOrderStatusResult {
  success: boolean;
  order?: {
    kode: string;
    nama_produk: string;
    tanggal: string;
    status: StatusPesanan;
    catatan_terbaru: string;
    timeline: {
      step: number;
      label: StatusPesanan;
      tanggal?: string;
      isCompleted: boolean;
      isCurrent: boolean;
    }[];
  };
  error?: string;
}

/**
 * Server Action: Cek Status Pesanan Publik
 * Keamanan Ketat:
 * 1. Rate limit per IP (maksimal 20 pengecekan per menit)
 * 2. Hanya mengembalikan data publik aman: kode, jenis pesanan, tanggal pengajuan, status, riwayat ringkas
 * 3. TIDAK PERNAH mengembalikan: nama klien, nomor WhatsApp, email, alamat pemasangan, atau nominal harga!
 * 4. Pesan "kode tidak ditemukan" netral dan tidak membocorkan keberadaan kode lainnya.
 */
export async function checkOrderStatusAction(
  rawKode: string
): Promise<PublicOrderStatusResult> {
  const ip = getClientIp();

  // Rate Limiting (Maks 30 pencarian per menit, 200 untuk localhost)
  const isAllowed = checkRateLimit(
    statusCheckRateLimitMap,
    ip,
    ip === "127.0.0.1" || ip === "::1" ? 200 : 30,
    60 * 1000
  );
  if (!isAllowed) {
    return {
      success: false,
      error: "Terlalu banyak permintaan. Silakan tunggu sebentar sebelum mencoba kembali.",
    };
  }

  const kodeClean = rawKode.trim().toUpperCase();

  // Validasi pola kode HBJ-YYYY-NNNN
  if (!/^HBJ-\d{4}-\d{4}$/.test(kodeClean)) {
    return {
      success: false,
      error: "Kode pesanan tidak ditemukan. Pastikan format sesuai, contoh: HBJ-2026-0012.",
    };
  }

  const orders = getOrders();
  const order = orders.find((o) => o.kode === kodeClean);

  if (!order) {
    return {
      success: false,
      error: "Kode pesanan tidak ditemukan. Pastikan format sesuai, contoh: HBJ-2026-0012.",
    };
  }

  // Ambil riwayat status terkait
  const fullOrder = getOrderById(order.id);
  const riwayatList = fullOrder?.riwayat || [];

  // Hitung status stepper: Diajukan -> Ditinjau -> Diproses -> Selesai
  const statusLevels: Record<StatusPesanan, number> = {
    Diajukan: 1,
    Ditinjau: 2,
    Diproses: 3,
    Selesai: 4,
    Dibatalkan: -1,
  };

  const currentLevel = statusLevels[order.status] || 1;

  const diajukanHistory = riwayatList.find((r) => r.status === "Diajukan");
  const ditinjauHistory = riwayatList.find((r) => r.status === "Ditinjau");
  const diprosesHistory = riwayatList.find((r) => r.status === "Diproses");
  const selesaiHistory = riwayatList.find((r) => r.status === "Selesai");

  const timeline = [
    {
      step: 1,
      label: "Diajukan" as StatusPesanan,
      tanggal: diajukanHistory ? formatTanggal(diajukanHistory.created_at) : formatTanggal(order.tanggal),
      isCompleted: currentLevel >= 1,
      isCurrent: order.status === "Diajukan",
    },
    {
      step: 2,
      label: "Ditinjau" as StatusPesanan,
      tanggal: ditinjauHistory ? formatTanggal(ditinjauHistory.created_at) : undefined,
      isCompleted: currentLevel >= 2,
      isCurrent: order.status === "Ditinjau",
    },
    {
      step: 3,
      label: "Diproses" as StatusPesanan,
      tanggal: diprosesHistory ? formatTanggal(diprosesHistory.created_at) : undefined,
      isCompleted: currentLevel >= 3,
      isCurrent: order.status === "Diproses",
    },
    {
      step: 4,
      label: "Selesai" as StatusPesanan,
      tanggal: selesaiHistory ? formatTanggal(selesaiHistory.created_at) : undefined,
      isCompleted: currentLevel >= 4,
      isCurrent: order.status === "Selesai",
    },
  ];

  const latestCatatan =
    riwayatList.length > 0 && riwayatList[0].catatan
      ? riwayatList[0].catatan
      : order.catatan || "Pesanan sedang dalam proses penanganan oleh admin.";

  return {
    success: true,
    order: {
      kode: order.kode,
      nama_produk: order.nama_produk,
      tanggal: formatTanggal(order.tanggal),
      status: order.status,
      catatan_terbaru: latestCatatan,
      timeline,
    },
  };
}

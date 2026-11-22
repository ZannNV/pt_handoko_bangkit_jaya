import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { AdminUser } from "./types";
import { createSignedToken, verifySignedToken } from "./jwt";

const SESSION_COOKIE_NAME = "sip_admin_session";
const SESSION_SECRET =
  process.env.SESSION_SECRET ||
  "hbj-sip-super-secure-jwt-secret-key-32-chars-minimum-2026";

// Default Bcrypt Hash untuk admin123 jika env belum diset
const DEFAULT_ADMIN_HASH =
  "$2b$10$r6lwXTjeXOsTcWyUAxMygOR7Bvt52h4zWOuZ5.bqoj3wOrveS4xgi";

export { SESSION_COOKIE_NAME };

/**
 * Verifikasi password plain dengan bcrypt hash di server
 */
export function verifyAdminPassword(plainPassword: string, hash?: string): boolean {
  let targetHash = hash || process.env.ADMIN_PASSWORD_HASH;
  if (!targetHash || targetHash.length < 50 || !targetHash.startsWith("$2")) {
    targetHash = DEFAULT_ADMIN_HASH;
  }
  try {
    return bcrypt.compareSync(plainPassword, targetHash);
  } catch (err) {
    console.error("Gagal verifikasi password hash:", err);
    return false;
  }
}

/**
 * Menandatangani JWT session cookie
 */
export async function signAdminSession(user: AdminUser): Promise<string> {
  return await createSignedToken(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      nama_lengkap: user.nama_lengkap,
      role: user.role,
    },
    SESSION_SECRET,
    60 * 60 * 24 // 24 jam
  );
}

/**
 * Memverifikasi token JWT sesi admin
 */
export async function verifyAdminSessionToken(
  token: string
): Promise<AdminUser | null> {
  const payload = await verifySignedToken<AdminUser>(token, SESSION_SECRET);
  if (!payload || payload.role !== "admin") return null;

  return {
    id: payload.id || "a0000000-0000-0000-0000-000000000001",
    username: payload.username || "admin",
    email: payload.email || "admin@handoko.co.id",
    nama_lengkap: payload.nama_lengkap || "Edo Raihan",
    role: "admin",
  };
}

/**
 * Mengambil sesi admin aktif dari httpOnly cookie di Server Components / Server Actions
 */
export async function getServerAdminSession(): Promise<AdminUser | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return await verifyAdminSessionToken(token);
}

/**
 * Menyimpan sesi admin ke dalam httpOnly + secure + sameSite cookie
 */
export async function setServerAdminSession(user: AdminUser): Promise<void> {
  const token = await signAdminSession(user);
  const cookieStore = cookies();

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 jam
  });
}

/**
 * Menghapus sesi admin dari cookie saat logout
 */
export async function clearServerAdminSession(): Promise<void> {
  const cookieStore = cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

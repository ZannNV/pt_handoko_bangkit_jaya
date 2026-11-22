"use server";

import {
  verifyAdminPassword,
  setServerAdminSession,
  clearServerAdminSession,
  getServerAdminSession,
} from "@/lib/server-auth";
import { AdminUser } from "@/lib/types";

export interface LoginActionResult {
  success: boolean;
  user?: AdminUser;
  error?: string;
}

/**
 * Server Action untuk autentikasi login admin yang aman
 * Dilakukan 100% di server dengan password ter-hash bcrypt dan httpOnly cookie
 */
export async function loginAdminAction(
  usernameOrEmail: string,
  plainPassword: string
): Promise<LoginActionResult> {
  const inputUser = usernameOrEmail.trim().toLowerCase();
  const inputPass = plainPassword.trim();

  const validUsername = (process.env.ADMIN_USERNAME || "admin").toLowerCase();

  // Validasi kecocokan username / email
  const isUsernameMatch =
    inputUser === validUsername ||
    inputUser === "admin@handoko.co.id" ||
    inputUser === "admin@handokobangkit.com";

  if (!isUsernameMatch) {
    return {
      success: false,
      error: "Username atau password yang Anda masukkan salah. Silakan periksa kembali.",
    };
  }

  // Verifikasi hash password dengan bcrypt
  const isPasswordValid = verifyAdminPassword(inputPass);
  if (!isPasswordValid) {
    return {
      success: false,
      error: "Username atau password yang Anda masukkan salah. Silakan periksa kembali.",
    };
  }

  const user: AdminUser = {
    id: "a0000000-0000-0000-0000-000000000001",
    username: validUsername,
    email: "admin@handoko.co.id",
    nama_lengkap: "Edo Raihan",
    role: "admin",
  };

  // Simpan ke httpOnly cookie di server
  await setServerAdminSession(user);

  return {
    success: true,
    user,
  };
}

/**
 * Server Action untuk logout admin (menghapus cookie sesi)
 */
export async function logoutAdminAction(): Promise<{ success: boolean }> {
  await clearServerAdminSession();
  return { success: true };
}

/**
 * Server Action untuk memeriksa sesi admin saat ini
 */
export async function getCurrentAdminSessionAction(): Promise<AdminUser | null> {
  return await getServerAdminSession();
}

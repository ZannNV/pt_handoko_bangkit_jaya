/**
 * Auth Client Facade
 * Seluruh autentikasi ditangani secara aman di server melalui @/actions/auth-actions
 * Tidak ada kredensial, token, atau localStorage yang disimpan di sisi client.
 */

export {
  loginAdminAction as loginAdmin,
  logoutAdminAction as logoutAdmin,
  getCurrentAdminSessionAction as getCurrentAdminSession,
} from "@/actions/auth-actions";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySignedToken } from "@/lib/jwt";

const SESSION_COOKIE_NAME = "sip_admin_session";
const SESSION_SECRET =
  process.env.SESSION_SECRET ||
  "hbj-sip-super-secure-jwt-secret-key-32-chars-minimum-2026";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Hanya periksa rute yang berawalan /admin
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const isLoginPage = pathname === "/admin/login";
  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  let isValidSession = false;

  if (sessionToken) {
    const payload = await verifySignedToken<{ role?: string }>(
      sessionToken,
      SESSION_SECRET
    );
    if (payload && payload.role === "admin") {
      isValidSession = true;
    }
  }

  // Jika belum login dan mencoba mengakses panel admin -> Arahkan ke /admin/login
  if (!isValidSession && !isLoginPage) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Jika sudah login dan mencoba mengakses halaman /admin/login -> Arahkan ke /admin/dashboard
  if (isValidSession && isLoginPage) {
    const dashboardUrl = new URL("/admin/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

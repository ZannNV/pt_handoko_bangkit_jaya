import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PT Handoko Bangkit Jaya - Fabrikasi Besi & Baja Make-to-Order",
  description:
    "Solusi konstruksi dan fabrikasi besi make-to-order terpercaya. Melayani pagar, rak, kanopi, dan fabrikasi besi sesuai kebutuhan proyek Anda.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="min-h-screen bg-page text-content-primary antialiased">
        {children}
      </body>
    </html>
  );
}

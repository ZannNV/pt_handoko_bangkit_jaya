import React, { Suspense } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getCompanyProfile } from "@/lib/data/store";
import { HubungiContent } from "./hubungi-content";

export const metadata = {
  title: "Hubungi Kami | PT Handoko Bangkit Jaya",
  description:
    "Hubungi tim customer service PT Handoko Bangkit Jaya via WhatsApp resmi untuk konsultasi pesanan custom fabrikasi besi dan baja make-to-order.",
};

export default function HubungiPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const profile = getCompanyProfile();
  const initialProduk =
    typeof searchParams?.produk === "string" ? searchParams.produk : "";

  return (
    <div className="min-h-screen bg-page flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col justify-center py-12 md:py-16 px-6 lg:px-20">
        <div className="max-w-[1280px] w-full mx-auto">
          {/* Header Frame 07 */}
          <div className="mb-10 text-left">
            <h1 className="text-display sm:text-[36px] font-bold text-navy-900 tracking-tight">
              Hubungi Kami
            </h1>
            <p className="text-isi text-content-muted mt-2">
              Ada pertanyaan seputar produk, layanan, atau pemesanan? Tim kami siap membantu.
            </p>
          </div>

          {/* Suspense wrapped content for client search params */}
          <Suspense
            fallback={
              <div className="max-w-[796px] w-full mx-auto h-[480px] bg-white rounded-2xl border border-border animate-pulse flex items-center justify-center">
                <span className="text-content-muted text-isi">Memuat informasi kontak...</span>
              </div>
            }
          >
            <HubungiContent profile={profile} initialProduk={initialProduk} />
          </Suspense>
        </div>
      </main>

      <Footer
        whatsapp={profile.whatsapp}
        email={profile.email}
        address={profile.alamat}
      />
    </div>
  );
}

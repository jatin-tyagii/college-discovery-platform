import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/layout/Providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingCompareBar from "@/components/compare/FloatingCompareBar";

export const metadata: Metadata = {
  title: "EduFind — Discover Your College",
  description: "India's most honest college discovery platform. Find, compare and decide.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Providers>
          <Navbar />
          <main className="pb-20">{children}</main>
          <FloatingCompareBar />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import MobileMenuDrawer from "@/app/components/MobileMenuDrawer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "隨意空間民宿｜平溪住宿推薦｜菁桐民宿|白石腳民宿",
  description:
    "平溪住宿推薦，鄰近菁桐老街與平溪老街，提供雙人房與家庭房，附停車與早餐。",
  keywords: ["平溪住宿", "菁桐民宿", "平溪民宿推薦", "雙人房", "家庭房"],
  verification: {
    google: "CnSgzEZVV7oFzyVgzsrKoIUvac4pXYJeMtl4Wj6GZxc",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <MobileMenuDrawer />
        <Analytics />
      </body>
    </html>
  );
}

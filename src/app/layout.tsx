import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import MobileBottomNav from "@/app/components/MobileBottomNav";
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
  title: "BnB Site",
  description: "Your premier bed and breakfast experience",
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
        <div className="pb-16 md:pb-0">{children}</div>
        <MobileBottomNav />
      </body>
    </html>
  );
}

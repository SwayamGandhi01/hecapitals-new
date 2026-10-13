import type { Metadata } from "next";
import { Geist_Mono, Inter, Playfair_Display } from "next/font/google";

import { SiteFooter } from "@/components/footer/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HE Capital Markets — Global Capital Markets Advisory",
  description:
    "Investor relations, capital markets expertise, and strategic communications that help ambitious companies strengthen visibility and connect with investors.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}

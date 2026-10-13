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

/**
 * Playfair Display is a variable font (wght 400-900), so no `weight` array is
 * given: requesting static weights makes next/font emit one @font-face per
 * weight per unicode-range, and Turbopack's Google Fonts resolver fails on
 * that during Vercel builds ("next/font/google queries have exactly one
 * entry") while the single-entry fonts below compile fine. The variable font
 * covers every weight anyway, and only 400 is used in the design.
 */
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
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

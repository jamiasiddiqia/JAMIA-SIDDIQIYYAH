import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jamia Siddiqiyyah | Preserving Sacred Heritage & Spiritual Excellence",
  description: "A premier global Islamic institution, university, online academy, and charity platform dedicated to authentic scholarship, spiritual purification (Tazkiyah), and global community empowerment.",
  keywords: ["Islamic University", "Islamic Education", "Donation Platform", "Online Academy", "Alim Program", "Fiqh", "Hadith", "Arabic Calligraphy"],
  authors: [{ name: "Jamia Siddiqiyyah" }],
  openGraph: {
    title: "Jamia Siddiqiyyah | Preserving Sacred Heritage",
    description: "Upholding the Unbroken Legacy of Sacred Knowledge and Islamic Arts.",
    type: "website",
    locale: "en_US",
  },
};

import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${plusJakarta.variable} scroll-smooth`}
    >
      <body className="bg-background-warm text-on-surface antialiased min-h-screen selection:bg-secondary-fixed selection:text-on-secondary-fixed">
        {children}
        <Analytics />
      </body>
    </html>
  );
}

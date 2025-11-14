import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import StickyCTA from "@/components/sticky-cta";
import { SITE_NAME, SITE_URL } from "@/lib/config";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dm-serif",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Statewide Qualified Intermediary Network`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "1031 exchange guidance for Oklahoma property owners. Local intermediary coordination, CPA and attorney support, and deadline compliance for investors across Oklahoma City and beyond.",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "android-chrome-192x192", url: "/favicon/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { rel: "android-chrome-512x512", url: "/favicon/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    title: SITE_NAME,
    description:
      "Trusted 1031 specialists helping Oklahoma investors navigate deadlines and compliance. Local service, state coverage.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: "Learn how to defer capital gains taxes with a compliant 1031 exchange in Oklahoma.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${dmSerif.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyCTA />
        <Analytics />
      </body>
    </html>
  );
}

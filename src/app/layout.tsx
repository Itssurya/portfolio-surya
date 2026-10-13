import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { PROFILE } from "@/lib/data";

const interTight = localFont({
  src: "../fonts/InterTight-Variable.woff2",
  variable: "--font-sans",
  display: "swap",
});

const instrumentSerif = localFont({
  src: "../fonts/InstrumentSerif-Regular.woff2",
  variable: "--font-serif",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: "../fonts/JetBrainsMono-Variable.woff2",
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(PROFILE.portfolio),
  title: `${PROFILE.name} — ${PROFILE.role}`,
  description: PROFILE.resumeSummary,
  authors: [{ name: PROFILE.name }],
  openGraph: {
    title: `${PROFILE.name} — ${PROFILE.role}`,
    description: PROFILE.resumeSummary,
    url: PROFILE.portfolio,
    siteName: PROFILE.name,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: `${PROFILE.name} Portfolio`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/portrait-bust.webp",
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f2ee",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased selection:bg-[#0d0d0d] selection:text-[#f4f2ee] bg-[#f4f2ee] text-[#0d0d0d] overflow-x-hidden min-h-screen">
        {children}
      </body>
    </html>
  );
}

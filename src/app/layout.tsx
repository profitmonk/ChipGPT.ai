import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SITE_DESCRIPTION } from "@/lib/content";
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
  title: "ChipGPT — AI Co-Workers for the Semiconductor Lifecycle",
  description: SITE_DESCRIPTION,
  keywords: [
    "semiconductor AI",
    "engineering infrastructure",
    "institutional memory",
    "silicon engineering",
  ],
  openGraph: {
    title: "ChipGPT — AI Co-Workers for the Semiconductor Lifecycle",
    description: SITE_DESCRIPTION,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChipGPT — AI Co-Workers for the Semiconductor Lifecycle",
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#030303] font-sans text-white antialiased">
        {children}
      </body>
    </html>
  );
}

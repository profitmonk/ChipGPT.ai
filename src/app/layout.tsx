import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  description:
    "ChipGPT gives semiconductor teams specialized AI agents for RTL, verification, silicon bring-up, yield learning, test optimization, and FAE support.",
  openGraph: {
    title: "ChipGPT — AI Co-Workers for the Semiconductor Lifecycle",
    description:
      "Build, verify, debug, and scale chips faster with governed AI co-workers across the full semiconductor lifecycle.",
    type: "website",
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
      <body className="min-h-screen bg-zinc-950 font-sans text-white antialiased">
        {children}
      </body>
    </html>
  );
}

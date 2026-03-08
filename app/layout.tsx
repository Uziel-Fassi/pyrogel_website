import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const grotesk = Space_Grotesk({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PyroGel · Wildfire Defense Hydrogel",
  description:
    "An advanced, bio-based hydrogel for wildfire defense, validated through FDS Simulations and transitioning from TRL 2/3 to TRL 4.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${grotesk.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

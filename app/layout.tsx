import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Playfair_Display,
  Cormorant_Garamond,
  Parisienne,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
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

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const parisienne = Parisienne({
  variable: "--font-parisienne",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Mariana & Pedro — 3 Anos de Namoro ❤️",
  description: "Celebrando 3 anos de muito amor, carinho e histórias inesquecíveis.",
};

import SmoothScroll from "../components/smooth-scroll/smooth-scroll";
import CustomScrollbar from "../components/custom-scrollbar/custom-scrollbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${cormorant.variable} ${parisienne.variable} antialiased overflow-x-hidden w-full max-w-full`}
    >
      <body className="flex flex-col overflow-x-hidden w-full max-w-full bg-[#2C0000]">
        <CustomScrollbar />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

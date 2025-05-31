import React from "react";
import Header from "@/components/Header";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QualityBlinds",
  description:
    "Quality Blinds is a leading manufacturer and installer of premium blinds, curtains, shutters, and awnings in Australia. Custom solutions for homes and businesses since 1998.",
  icons: {
    icon: "/logo-big.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo-big.jpg" type="image/jpeg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${inter.className}`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}

import React from "react";
import ShuttersPageClient from "./ShuttersPageClient";
import type { Metadata } from "next";

// SEO Metadata para la página de shutters
export const metadata: Metadata = {
  title:
    "Premium Shutters Sydney | Plantation, Timber & ABS Shutters | Quality Blinds Randwick",
  description:
    "Discover premium shutters in Sydney at Quality Blinds. We offer plantation shutters, timber shutters, and waterproof ABS shutters with expert installation and repair services across Sydney from our Randwick showroom.",
  keywords: [
    "shutters sydney",
    "plantation shutters sydney",
    "timber shutters sydney",
    "abs shutters sydney",
    "waterproof shutters sydney",
    "external shutters sydney",
    "internal shutters sydney",
    "custom shutters sydney",
    "window shutters sydney",
    "shutters randwick",
    "shutters installation sydney",
    "shutters repair sydney",
    "repair shutters sydney",
    "basswood shutters sydney",
    "cedar shutters sydney",
    "polyurethane shutters sydney",
    "hinged shutters sydney",
    "bi-fold shutters sydney",
    "fixed shutters sydney",
    "louvre shutters sydney",
    "quality shutters sydney",
    "premium shutters sydney",
  ],
  openGraph: {
    title:
      "Premium Shutters Sydney | Plantation, Timber & ABS | Quality Blinds",
    description:
      "Premium shutters in Sydney. Plantation, timber and ABS shutters with expert installation and repair services.",
    url: "https://www.qualityblinds.com.au/shutters",
    images: [
      {
        url: "/images/og-shutters-sydney.webp",
        width: 1200,
        height: 630,
        alt: "Premium Shutters Sydney - Plantation, Timber & ABS Shutters",
      },
    ],
  },
};

export default function ShuttersPage() {
  return <ShuttersPageClient />;
}

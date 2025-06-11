import React from "react";
import BlindsPageClient from "./BlindsPageClient";
import type { Metadata } from "next";

// SEO Metadata para la página de blinds
export const metadata: Metadata = {
  title:
    "Premium Blinds Sydney | Roller, Venetian & Roman Blinds | Quality Blinds Randwick",
  description:
    "Discover our premium blinds collection in Sydney. Quality Blinds offers roller blinds, venetian blinds, roman blinds with motorised options. Expert installation and repair services across Sydney from our Randwick showroom.",
  keywords: [
    "blinds sydney",
    "roller blinds sydney",
    "venetian blinds sydney",
    "roman blinds sydney",
    "motorised blinds sydney",
    "electric blinds sydney",
    "automated blinds sydney",
    "custom blinds sydney",
    "blinds randwick",
    "blinds showroom sydney",
    "window treatments sydney",
    "blockout blinds sydney",
    "sunscreen blinds sydney",
    "translucent blinds sydney",
    "timber blinds sydney",
    "aluminium blinds sydney",
    "blind installation sydney",
    "blind repairs sydney",
    "quality blinds sydney",
    "premium blinds sydney",
  ],
  openGraph: {
    title:
      "Premium Blinds Sydney | Roller, Venetian & Roman Blinds | Quality Blinds",
    description:
      "Premium blinds collection in Sydney. Roller blinds, venetian blinds, roman blinds with motorised options and expert repair services.",
    url: "https://www.qualityblinds.com.au/blinds",
    images: [
      {
        url: "/images/og-blinds-sydney.webp",
        width: 1200,
        height: 630,
        alt: "Premium Blinds Sydney - Roller, Venetian & Roman Blinds",
      },
    ],
  },
};

export default function BlindsPage() {
  return <BlindsPageClient />;
}

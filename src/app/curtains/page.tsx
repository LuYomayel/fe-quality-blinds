import React from "react";
import CurtainsPageClient from "./CurtainsPageClient";
import type { Metadata } from "next";

// SEO Metadata para la página de curtains
export const metadata: Metadata = {
  title:
    "Premium Curtains Sydney | Blockout, Sheer & Custom Curtains | Quality Blinds Randwick",
  description:
    "Quality Blinds Sydney offers premium curtains including blockout curtains, sheer curtains and custom curtains. Motorised options available. Expert installation and curtain repair services across Sydney from our Randwick showroom.",
  keywords: [
    "curtains sydney",
    "blockout curtains sydney",
    "sheer curtains sydney",
    "custom curtains sydney",
    "motorised curtains sydney",
    "electric curtains sydney",
    "automated curtains sydney",
    "curtain installation sydney",
    "curtain repairs sydney",
    "repair curtains sydney",
    "curtain maintenance sydney",
    "thermal curtains sydney",
    "blackout curtains sydney",
    "curtain tracks sydney",
    "curtain rods sydney",
    "designer curtains sydney",
    "luxury curtains sydney",
    "office curtains sydney",
    "residential curtains sydney",
    "commercial curtains sydney",
    "curtains randwick",
    "quality curtains sydney",
  ],
  openGraph: {
    title:
      "Premium Curtains Sydney | Blockout, Sheer & Custom | Quality Blinds",
    description:
      "Premium curtains in Sydney. Blockout, sheer and custom curtains with motorised options and expert repair services.",
    url: "https://www.qualityblinds.com.au/curtains",
    images: [
      {
        url: "/images/og-curtains-sydney.webp",
        width: 1200,
        height: 630,
        alt: "Premium Curtains Sydney - Blockout, Sheer & Custom Curtains",
      },
    ],
  },
};

export default function CurtainsPage() {
  return <CurtainsPageClient />;
}

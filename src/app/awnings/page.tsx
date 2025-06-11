import React from "react";
import AwningsPageClient from "./AwningsPageClient";
import type { Metadata } from "next";

// SEO Metadata para la página de awnings
export const metadata: Metadata = {
  title:
    "Premium Awnings Sydney | Folding Arm, Canopy & Retractable Awnings | Quality Blinds Randwick",
  description:
    "Quality Blinds Sydney offers premium awnings including folding arm awnings, canopy awnings, straight drop awnings and retractable awnings. Motorised options available. Expert installation and repair services across Sydney from our Randwick showroom.",
  keywords: [
    "awnings sydney",
    "folding arm awnings sydney",
    "canopy awnings sydney",
    "canopies sydney",
    "retractable awnings sydney",
    "straight drop awnings sydney",
    "motorised awnings sydney",
    "electric awnings sydney",
    "automated awnings sydney",
    "outdoor awnings sydney",
    "awning installation sydney",
    "awning repairs sydney",
    "repair awnings sydney",
    "awning maintenance sydney",
    "conservatory awnings sydney",
    "patio awnings sydney",
    "deck awnings sydney",
    "waterproof awnings sydney",
    "shade awnings sydney",
    "commercial awnings sydney",
    "residential awnings sydney",
    "custom awnings sydney",
    "awnings randwick",
    "quality awnings sydney",
  ],
  openGraph: {
    title:
      "Premium Awnings Sydney | Folding Arm, Canopy & Retractable | Quality Blinds",
    description:
      "Premium awnings in Sydney. Folding arm, canopy, retractable and motorised awnings with expert installation and repair services.",
    url: "https://www.qualityblinds.com.au/awnings",
    images: [
      {
        url: "/images/og-awnings-sydney.webp",
        width: 1200,
        height: 630,
        alt: "Premium Awnings Sydney - Folding Arm, Canopy & Retractable Awnings",
      },
    ],
  },
};

export default function AwningsPage() {
  return <AwningsPageClient />;
}

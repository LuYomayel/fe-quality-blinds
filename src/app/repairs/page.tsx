import React from "react";
import RepairsPageClient from "./RepairsPageClient";
import type { Metadata } from "next";

// SEO Metadata para la página de reparaciones
export const metadata: Metadata = {
  title:
    "Repair Services Sydney | Blind Repairs, Awning Repairs & Curtain Repairs | Quality Blinds Randwick",
  description:
    "Quality Blinds Sydney offers expert repair services for blinds, awnings, curtains and shutters. With 30 years experience in Sydney and Randwick. Fast, reliable repairs for all brands and types.",
  keywords: [
    "blind repairs sydney",
    "awning repairs sydney",
    "curtain repairs sydney",
    "shutter repairs sydney",
    "repair blinds sydney",
    "repair awnings sydney",
    "repair curtains sydney",
    "repair shutters sydney",
    "blind repair service sydney",
    "awning repair service sydney",
    "curtain repair service sydney",
    "window treatment repairs sydney",
    "motorised blind repairs sydney",
    "roller blind repairs sydney",
    "venetian blind repairs sydney",
    "roman blind repairs sydney",
    "plantation shutter repairs sydney",
    "outdoor blind repairs sydney",
    "commercial blind repairs sydney",
    "residential repairs sydney",
    "blind maintenance sydney",
    "awning maintenance sydney",
    "curtain maintenance sydney",
    "emergency repairs sydney",
    "same day repairs sydney",
    "professional repairs sydney",
    "quality repairs sydney",
    "affordable repairs sydney",
    "repairs randwick",
    "30 years experience repairs",
  ],
  openGraph: {
    title:
      "Expert Repair Services Sydney | Blinds, Awnings & Curtains | Quality Blinds",
    description:
      "Professional repair services in Sydney. Expert repairs for blinds, awnings, curtains and shutters with 30 years experience.",
    url: "https://www.qualityblinds.com.au/repairs",
    images: [
      {
        url: "/images/og-repairs-sydney.webp",
        width: 1200,
        height: 630,
        alt: "Expert Repair Services Sydney - Blinds, Awnings & Curtains",
      },
    ],
  },
};

export default function RepairsPage() {
  return <RepairsPageClient />;
}

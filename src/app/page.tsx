import React from "react";
import Home from "../components/Home";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Quality Blinds Australia Sydney | Premium Blinds Randwick | Roller Blinds, Awnings & Curtains",
  description:
    "Quality Blinds Australia - Sydney's premier blinds specialists since 1989. Located in Randwick, we manufacture and install roller blinds, venetian blinds, roman blinds, curtains, shutters, awnings, canopies and motorised blinds. Expert repair services for blinds, awnings and curtains across Sydney. Free consultation and professional installation.",
  keywords: [
    "blinds sydney",
    "blinds randwick",
    "roller blinds sydney",
    "venetian blinds sydney",
    "roman blinds sydney",
    "curtains sydney",
    "shutters sydney",
    "awnings sydney",
    "canopies sydney",
    "motorised blinds sydney",
    "motorized blinds sydney",
    "electric blinds sydney",
    "automated blinds sydney",
    "repair blinds sydney",
    "repair awnings sydney",
    "repair curtains sydney",
    "blind repairs randwick",
    "awning repairs sydney",
    "curtain repairs sydney",
    "Quality Blinds Randwick",
    "blinds showroom sydney",
    "custom blinds sydney",
    "window treatments sydney",
    "blind installation sydney",
    "awning installation sydney",
    "curtain installation sydney",
    "sydney blind company",
    "eastern suburbs blinds",
    "professional blind repairs",
    "blind maintenance sydney",
    "awning maintenance sydney",
    "curtain maintenance sydney",
    "blockout blinds sydney",
    "sunscreen blinds sydney",
    "outdoor awnings sydney",
    "retractable awnings sydney",
    "folding arm awnings sydney",
    "straight drop awnings sydney",
    "canopy awnings sydney",
    "waterproof shutters sydney",
    "timber shutters sydney",
    "plantation shutters sydney",
  ],
  openGraph: {
    title:
      "Quality Blinds Australia Sydney | Premium Blinds Randwick | Roller Blinds, Awnings & Curtains",
    description:
      "Sydney's premier blinds specialists since 1989. Located in Randwick, we offer roller blinds, venetian blinds, roman blinds, curtains, shutters, awnings, canopies, motorised blinds and expert repair services across Sydney.",
    url: "https://www.qualityblinds.com.au/",
    type: "website",
    images: [
      {
        url: "/images/og-quality-blinds-home.webp",
        width: 1200,
        height: 630,
        alt: "Quality Blinds Australia Sydney - Premium Blinds, Awnings & Curtains Randwick Showroom",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Quality Blinds Australia Sydney | Premium Blinds & Awnings Randwick",
    description:
      "Sydney's premier blinds specialists since 1989. Roller blinds, awnings, curtains, shutters, motorised blinds and repair services across Sydney.",
    images: ["/images/og-quality-blinds-home.webp"],
  },
  alternates: {
    canonical: "https://www.qualityblinds.com.au/",
  },
};

export default function HomePage() {
  return (
    <>
      <main role="main">
        <Home />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://www.qualityblinds.com.au/#webpage",
            url: "https://www.qualityblinds.com.au/",
            name: "Quality Blinds Australia | Premium Window Treatments & Custom Solutions",
            description:
              "Quality Blinds is Australia's leading manufacturer and installer of premium blinds, curtains, shutters, and awnings. Custom window treatment solutions since 1998.",
            inLanguage: "en-AU",
            isPartOf: {
              "@type": "WebSite",
              "@id": "https://www.qualityblinds.com.au/#website",
            },
            about: {
              "@type": "Organization",
              "@id": "https://www.qualityblinds.com.au/#organization",
            },
            mainEntity: {
              "@type": "ItemList",
              name: "Window Treatment Categories",
              description:
                "Complete range of premium window treatments available from Quality Blinds Australia",
              numberOfItems: 6,
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  item: {
                    "@type": "Product",
                    name: "Roller Blinds",
                    description:
                      "Elegant and functional roller blinds perfect for any space",
                    url: "https://www.qualityblinds.com.au/blinds/roller",
                    image:
                      "https://www.qualityblinds.com.au/images/roller-blind-1.webp",
                  },
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  item: {
                    "@type": "Product",
                    name: "Roman Blinds",
                    description:
                      "Classic and sophisticated Roman blinds ideal for elegant interiors",
                    url: "https://www.qualityblinds.com.au/blinds/roman",
                    image:
                      "https://www.qualityblinds.com.au/images/roman-blind-1.webp",
                  },
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  item: {
                    "@type": "Product",
                    name: "Venetian Blinds",
                    description:
                      "Versatile and durable Venetian blinds with complete light control",
                    url: "https://www.qualityblinds.com.au/blinds/venetian",
                    image:
                      "https://www.qualityblinds.com.au/images/venetian-blind-1.webp",
                  },
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  item: {
                    "@type": "Product",
                    name: "Curtains",
                    description:
                      "High-quality fabric curtains for an elegant touch",
                    url: "https://www.qualityblinds.com.au/curtains",
                    image:
                      "https://www.qualityblinds.com.au/images/curtain-1.webp",
                  },
                },
                {
                  "@type": "ListItem",
                  position: 5,
                  item: {
                    "@type": "Product",
                    name: "Shutters",
                    description:
                      "Permanent and elegant window shutter solutions",
                    url: "https://www.qualityblinds.com.au/shutters",
                    image:
                      "https://www.qualityblinds.com.au/images/shutter-1.webp",
                  },
                },
                {
                  "@type": "ListItem",
                  position: 6,
                  item: {
                    "@type": "Product",
                    name: "Awnings",
                    description: "Stylish exterior sun protection awnings",
                    url: "https://www.qualityblinds.com.au/awnings",
                    image:
                      "https://www.qualityblinds.com.au/images/awning-1.webp",
                  },
                },
              ],
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://www.qualityblinds.com.au/",
                },
              ],
            },
          }),
        }}
      />
    </>
  );
}

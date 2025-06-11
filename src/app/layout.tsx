import React from "react";
import Header from "@/components/Header";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import { LoadingProvider } from "@/components/LoadingProvider";
import Chatbot from "@/components/Chatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "Quality Blinds Australia | Premium Blinds Sydney | Randwick Showroom | Roller Blinds & Awnings",
    template: "%s | Quality Blinds Australia Sydney",
  },
  description:
    "Quality Blinds Australia - Sydney's premier blinds specialists since 1989. Located in Randwick, we offer roller blinds, venetian blinds, roman blinds, curtains, shutters, awnings, canopies and motorised blinds. Expert repair services for blinds, awnings and curtains across Sydney. Free consultation and professional installation.",
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
    "motorized blinds sydney",
    "electric blinds sydney",
    "automated blinds sydney",
    "blind installation sydney",
    "awning installation sydney",
    "curtain installation sydney",
    "sydney blind company",
    "randwick blinds",
    "eastern suburbs blinds",
    "professional blind repairs",
    "blind maintenance sydney",
    "awning maintenance sydney",
  ],
  authors: [{ name: "Quality Blinds Australia" }],
  creator: "Quality Blinds Australia",
  publisher: "Quality Blinds Australia",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.qualityblinds.com.au"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Quality Blinds Australia | Premium Blinds Sydney | Randwick Showroom | Roller Blinds & Awnings",
    description:
      "Sydney's premier blinds specialists since 1989. Located in Randwick, we offer roller blinds, venetian blinds, roman blinds, curtains, shutters, awnings, canopies and motorised blinds. Expert repair services across Sydney.",
    url: "https://www.qualityblinds.com.au",
    siteName: "Quality Blinds Australia Sydney",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "/images/og-quality-blinds.webp",
        width: 1200,
        height: 630,
        alt: "Quality Blinds Australia Sydney - Premium Blinds, Awnings & Curtains in Randwick",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Quality Blinds Australia Sydney | Premium Blinds & Awnings Randwick",
    description:
      "Sydney's premier blinds specialists since 1989. Roller blinds, awnings, curtains, shutters, motorised blinds and repair services across Sydney.",
    images: ["/images/og-quality-blinds.webp"],
    creator: "@QualityBlindsAU",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "google-site-verification-code-here",
    yandex: "yandex-verification-code-here",
    yahoo: "yahoo-verification-code-here",
  },
  category: "Home Improvement",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <meta name="theme-color" content="#1e40af" />
        <meta name="color-scheme" content="light" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Quality Blinds" />
        <meta name="application-name" content="Quality Blinds Australia" />
        <meta name="msapplication-TileColor" content="#1e40af" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${inter.className}`}
      >
        <LoadingProvider>
          <Header />
          <Chatbot />
          {children}
          <Footer />
        </LoadingProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://www.qualityblinds.com.au/#organization",
              name: "Quality Blinds Australia",
              alternateName: [
                "Quality Blinds Sydney",
                "Quality Blinds Randwick",
                "QB Australia",
              ],
              url: "https://www.qualityblinds.com.au",
              logo: {
                "@type": "ImageObject",
                url: "https://www.qualityblinds.com.au/images/logo-quality-blinds.webp",
                width: 300,
                height: 100,
              },
              description:
                "Sydney's leading manufacturer and installer of premium blinds, curtains, shutters, awnings and motorised blinds since 1989. Located in Randwick, serving all of Sydney with expert repair services for blinds, awnings and curtains.",
              foundingDate: "1989",
              founder: {
                "@type": "Person",
                name: "Quality Blinds Founder",
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "131 Botany Street",
                addressLocality: "Randwick",
                addressRegion: "NSW",
                postalCode: "2031",
                addressCountry: "AU",
              },
              areaServed: [
                {
                  "@type": "City",
                  name: "Sydney",
                  "@id": "https://www.wikidata.org/wiki/Q3130",
                },
                {
                  "@type": "State",
                  name: "New South Wales",
                },
              ],
              serviceArea: [
                {
                  "@type": "City",
                  name: "Sydney",
                },
                {
                  "@type": "City",
                  name: "Randwick",
                },
                {
                  "@type": "State",
                  name: "New South Wales",
                },
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Blinds, Awnings and Curtain Services Sydney",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Roller Blinds Sydney - Manufacturing and Installation",
                      description:
                        "Custom roller blinds including blockout, sunscreen and translucent options",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Venetian Blinds Sydney - Aluminium and Timber",
                      description:
                        "Premium venetian blinds in aluminium and timber finishes",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Roman Blinds Sydney - Custom Fabric Solutions",
                      description:
                        "Elegant roman blinds with blockout and translucent fabric options",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Curtains Sydney - Premium Fabrics and Installation",
                      description:
                        "Custom curtains including blockout curtains, sheer curtains and veri-shades",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Shutters Sydney - ABS and Timber Installation",
                      description:
                        "Window shutters including waterproof ABS and premium timber options",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Awnings Sydney - Folding Arm and Fixed Canopies",
                      description:
                        "Outdoor awnings including folding arm, straight drop and canopy awnings",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Motorised Blinds Sydney - Electric and Smart Controls",
                      description:
                        "Automated and motorised blinds with remote and smart home integration",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Blind Repairs Sydney - Professional Maintenance",
                      description:
                        "Expert repair services for all types of blinds, awnings and curtains",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Awning Repairs Sydney - Maintenance and Parts",
                      description:
                        "Professional awning repair and maintenance services across Sydney",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Curtain Repairs Sydney - Restoration Services",
                      description:
                        "Expert curtain repair and restoration services",
                    },
                  },
                ],
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+61-2-9340-5050",
                contactType: "Customer Service",
                areaServed: ["Sydney", "NSW"],
                availableLanguage: "English",
              },
              sameAs: [
                "https://www.facebook.com/QualityBlindsAustralia",
                "https://www.instagram.com/qualityblindsau",
                "https://www.linkedin.com/company/quality-blinds-australia",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}

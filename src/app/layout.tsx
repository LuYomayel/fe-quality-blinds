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
      "Quality Blinds Australia | Premium Window Treatments & Custom Solutions",
    template: "%s | Quality Blinds Australia",
  },
  description:
    "Quality Blinds is Australia's leading manufacturer and installer of premium blinds, curtains, shutters, and awnings. Custom window treatment solutions for homes and businesses since 1998. Free consultation and professional installation across Australia.",
  keywords: [
    "blinds Australia",
    "custom blinds",
    "window treatments",
    "curtains",
    "shutters",
    "awnings",
    "roller blinds",
    "venetian blinds",
    "roman blinds",
    "Quality Blinds",
    "window coverings",
    "custom shutters",
    "professional installation",
    "home improvement",
    "interior design",
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
      "Quality Blinds Australia | Premium Window Treatments & Custom Solutions",
    description:
      "Australia's leading manufacturer of premium blinds, curtains, shutters, and awnings. Custom window treatment solutions with professional installation since 1998.",
    url: "https://www.qualityblinds.com.au",
    siteName: "Quality Blinds Australia",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "/images/og-quality-blinds.webp",
        width: 1200,
        height: 630,
        alt: "Quality Blinds Australia - Premium Window Treatments",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quality Blinds Australia | Premium Window Treatments",
    description:
      "Australia's leading manufacturer of premium blinds, curtains, shutters, and awnings. Custom solutions with professional installation.",
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
          {children}
          <Footer />
          {/* <Chatbot /> */}
        </LoadingProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://www.qualityblinds.com.au/#organization",
              name: "Quality Blinds Australia",
              alternateName: ["Quality Blinds", "QB Australia"],
              url: "https://www.qualityblinds.com.au",
              logo: {
                "@type": "ImageObject",
                url: "https://www.qualityblinds.com.au/images/logo-quality-blinds.webp",
                width: 300,
                height: 100,
              },
              description:
                "Australia's leading manufacturer and installer of premium blinds, curtains, shutters, and awnings. Custom window treatment solutions since 1998.",
              foundingDate: "1998",
              founder: {
                "@type": "Person",
                name: "Quality Blinds Founder",
              },
              areaServed: [
                {
                  "@type": "Country",
                  name: "Australia",
                },
              ],
              serviceArea: {
                "@type": "Country",
                name: "Australia",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Window Treatment Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Custom Blinds Manufacturing and Installation",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Premium Curtains and Drapes",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Window Shutters Installation",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Outdoor Awnings Solutions",
                    },
                  },
                ],
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+61-XXX-XXX-XXX",
                contactType: "Customer Service",
                areaServed: "AU",
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

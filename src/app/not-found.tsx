import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Quality Blinds Australia",
  description:
    "The page you're looking for doesn't exist. Explore our premium blinds, curtains, shutters, and awnings collection instead.",
  robots: {
    index: false,
    follow: true,
  },
};

const popularPages = [
  {
    name: "Roller Blinds",
    href: "/blinds/roller/blockout-roller-blinds",
    description:
      "Premium blockout roller blinds for complete privacy and light control",
    image: "/images/roller-blind-1.webp",
  },
  {
    name: "Roman Blinds",
    href: "/blinds/roman/blockout-roman-blinds",
    description: "Elegant Roman blinds perfect for sophisticated interiors",
    image: "/images/roman-blind-1.webp",
  },
  {
    name: "Venetian Blinds",
    href: "/blinds/venetian/aluminium-venetian-blinds",
    description: "Durable aluminium venetian blinds with precise light control",
    image: "/images/venetian-blind-1.webp",
  },
  {
    name: "Shutters",
    href: "/shutters/abs-shutters",
    description: "Premium ABS shutters with lifetime warranty",
    image: "/images/shutter-1.webp",
  },
  {
    name: "Curtains",
    href: "/curtains/blockout-curtains",
    description: "High-quality blockout curtains for elegant window treatments",
    image: "/images/curtain-1.webp",
  },
  {
    name: "Awnings",
    href: "/awnings/conservatory-awnings",
    description: "Stylish conservatory awnings for outdoor protection",
    image: "/images/awning-1.webp",
  },
];

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Error Section */}
        <section className="text-center mb-16" aria-labelledby="error-heading">
          <div className="max-w-2xl mx-auto">
            <h1
              id="error-heading"
              className="text-6xl font-bold text-gray-900 mb-4"
            >
              404
            </h1>
            <h2 className="text-3xl font-semibold text-gray-700 mb-6">
              Page Not Found
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Sorry, we couldn&apos;t find the page you&apos;re looking for. The
              page may have been moved, deleted, or the URL might be incorrect.
            </p>

            {/* Primary Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 transition-colors"
                aria-label="Return to Quality Blinds Australia homepage"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Go to Homepage
              </Link>
              <Link
                href="#contact-quality-blinds"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                aria-label="Contact Quality Blinds Australia for assistance"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        {/* Popular Products Section */}
        <section aria-labelledby="popular-products-heading">
          <div className="max-w-6xl mx-auto">
            <h2
              id="popular-products-heading"
              className="text-3xl font-bold text-gray-900 text-center mb-4"
            >
              Explore Our Popular Window Treatments
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              While you&apos;re here, discover our most popular premium blinds,
              curtains, shutters, and awnings. Each product is custom-made with
              professional installation across Australia.
            </p>

            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              role="list"
            >
              {popularPages.map((product, index) => (
                <article
                  key={product.name}
                  className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                  role="listitem"
                >
                  <Link
                    href={product.href}
                    aria-label={`View ${product.name} - ${product.description}`}
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={product.image}
                        alt={`${product.name} - Premium window treatment by Quality Blinds Australia`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        loading={index < 3 ? "eager" : "lazy"}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-xl font-bold mb-2">
                          {product.name}
                        </h3>
                        <p className="text-sm opacity-90 line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section
          className="mt-20 bg-white rounded-2xl p-8"
          aria-labelledby="help-heading"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2
              id="help-heading"
              className="text-2xl font-bold text-gray-900 mb-4"
            >
              Need Help Finding What You&apos;re Looking For?
            </h2>
            <p className="text-gray-600 mb-8">
              Our team of window treatment experts is here to help you find the
              perfect solution for your home or business.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-600 text-sm">
                  Speak with our experts for personalized advice
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-600 text-sm">
                  Get detailed information about our products
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Visit Showroom
                </h3>
                <p className="text-gray-600 text-sm">
                  See our products in person and get expert advice
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Structured Data for 404 page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Page Not Found - Quality Blinds Australia",
            description:
              "The requested page could not be found. Explore our premium window treatments collection instead.",
            url: "https://www.qualityblinds.com.au/404",
            mainEntity: {
              "@type": "Organization",
              "@id": "https://www.qualityblinds.com.au/#organization",
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
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "404 - Page Not Found",
                  item: "https://www.qualityblinds.com.au/404",
                },
              ],
            },
          }),
        }}
      />
    </main>
  );
}

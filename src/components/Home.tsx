"use client";

import React from "react";
import Header from "./Header";
import Image from "next/image";
import ContactForm from "./ContactForm";
import Link from "next/link";

const productCategories = [
  {
    name: "Roller Blinds",
    image: "/roller-blind-1.webp",
    description: "Elegant and functional, perfect for any space",
  },
  {
    name: "Roman Blinds",
    image: "/roman-blind-1.webp",
    description: "Classic and sophisticated, ideal for elegant interiors",
  },
  {
    name: "Venetian Blinds",
    image: "/venetian-blind-1.webp",
    description: "Versatile and durable, complete light control",
  },
  {
    name: "Curtains",
    image: "/curtain-1.webp",
    description: "High-quality fabrics for an elegant touch",
  },
  {
    name: "Shutters",
    image: "/shutter-1.webp",
    description: "Permanent and elegant solutions for your windows",
  },
  {
    name: "Awnings",
    image: "/awning-1.webp",
    description: "Stylish exterior sun protection",
  },
];

export default function Home() {
  return (
    <>
      <Header />

      {/* Hero con video de fondo */}
      <header
        className="relative h-[50vh] w-full overflow-hidden"
        role="banner"
        aria-label="Quality Blinds hero"
      >
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/videos/quality-blinds-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-label="Quality Blinds hero background video"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-lg">
              Quality Blinds
            </h1>
            <p className="text-2xl max-w-2xl mx-auto text-white drop-shadow">
              Premium blinds, curtains, shutters, and awnings tailored for your
              home and business.
            </p>
          </div>
        </div>
      </header>

      <main className="bg-white">
        {/* Sección “About Quality Blinds” */}
        <section
          className="py-16 px-4 max-w-7xl mx-auto"
          aria-labelledby="about-quality-blinds"
        >
          <div className="text-center mb-16">
            <h2
              id="about-quality-blinds"
              className="text-4xl font-bold text-gray-900 mb-6"
            >
              About Quality Blinds
            </h2>
            <p className="text-xl text-gray-900 max-w-3xl mx-auto">
              Since 1998, Quality Blinds has been a leading manufacturer and
              installer of premium window coverings across Australia. Our
              experienced team delivers custom solutions for roller blinds,
              roman blinds, Venetian blinds, curtains, shutters, and awnings—
              combining style, durability, and functionality for both
              residential and commercial spaces.
            </p>
          </div>

          {/* Galería de categorías */}
          <section
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            aria-label="Product Categories"
          >
            {productCategories.map((category) => (
              <article
                key={category.name}
                className="group relative rounded-xl bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 cursor-pointer overflow-hidden border border-gray-200"
                style={{ minHeight: "320px" }}
              >
                {/* Contenedor de imagen con zoom en hover */}
                <div className="w-full h-48 bg-gray-100 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={`${category.name} - ${category.description}`}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    width={400}
                    height={200}
                    priority={category.name === "Roller Blinds"}
                  />
                </div>

                {/* Caption con el nombre (sin repetir en hover) */}
                <div className="p-4 border-t text-center bg-gray-50">
                  <span className="text-xl font-semibold text-gray-900">
                    {category.name}
                  </span>
                </div>

                {/* Overlay al posar el cursor: solo se muestra la descripción */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/60 transition-opacity duration-300">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-6">
                    <p className="text-white text-lg drop-shadow-lg">
                      {category.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </section>

        {/* Sección “Contact Quality Blinds” */}
        <section
          className="py-16 px-4 bg-gray-50"
          aria-labelledby="contact-quality-blinds"
        >
          <div className="max-w-3xl mx-auto">
            <h2
              id="contact-quality-blinds"
              className="text-3xl font-bold text-gray-900 mb-8 text-center"
            >
              Contact Quality Blinds
            </h2>
            <ContactForm />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className="py-8 text-center text-gray-900 bg-gray-100"
        role="contentinfo"
      >
        <p>
          &copy; {new Date().getFullYear()} Quality Blinds. All rights reserved.
        </p>
        <nav aria-label="Footer navigation" className="mt-4">
          <Link href="/" className="mx-2 text-blue-800 hover:underline">
            Home
          </Link>
          <Link href="/about" className="mx-2 text-blue-800 hover:underline">
            About Us
          </Link>
          <Link href="/shop" className="mx-2 text-blue-800 hover:underline">
            Shop
          </Link>
          <Link href="/contact" className="mx-2 text-blue-800 hover:underline">
            Contact
          </Link>
        </nav>
      </footer>

      {/* Chat button fijo */}
      <div
        className="fixed bottom-8 right-8 w-16 h-16 bg-blue-700 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-blue-800 transition-colors cursor-pointer"
        aria-label="Open Chat"
      >
        <span className="sr-only">Open Chat</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-3.582 8-8 8a8.001 8.001 0 01-7.938-7H3l4-4h2.062A7.97 7.97 0 0113 4c4.418 0 8 3.582 8 8z"
          />
        </svg>
      </div>
    </>
  );
}

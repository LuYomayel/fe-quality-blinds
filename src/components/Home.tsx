"use client";

import React from "react";
import Image from "next/image";
import ContactForm from "./ContactForm";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Configuración de scroll suave
const smoothScroll = (
  e: React.MouseEvent<HTMLAnchorElement>,
  targetId: string
) => {
  e.preventDefault();
  const element = document.getElementById(targetId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const featuredCollections = [
  {
    name: "Roller Blinds",
    image: "/roller-blind-1.webp",
    description: "Elegant and functional, perfect for any space",
    link: "/blinds/roller/blockout",
  },
  {
    name: "Roman Blinds",
    image: "/roman-blind-1.webp",
    description: "Classic and sophisticated, ideal for elegant interiors",
    link: "/blinds/roller/blockout",
  },
  {
    name: "Venetian Blinds",
    image: "/venetian-blind-1.webp",
    description: "Versatile and durable, complete light control",
    link: "/blinds/roller/blockout",
  },
  {
    name: "Curtains",
    image: "/curtain-1.webp",
    description: "High-quality fabrics for an elegant touch",
    link: "/blinds/roller/blockout",
  },
  {
    name: "Shutters",
    image: "/shutter-1.webp",
    description: "Permanent and elegant solutions for your windows",
    link: "/blinds/roller/blockout",
  },
  {
    name: "Awnings",
    image: "/awning-1.webp",
    description: "Stylish exterior sun protection",
    link: "/blinds/roller/blockout",
  },
];

const Home: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="relative h-screen md:h-screen w-full overflow-hidden"
        aria-label="Quality Blinds Hero"
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
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center px-4 text-center">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={heroInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white text-5xl md:text-7xl font-extrabold drop-shadow-lg max-w-4xl"
          >
            Quality Blinds
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={heroInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-4 text-white text-xl max-w-3xl drop-shadow-md"
          >
            Premium blinds, curtains, shutters, and awnings tailored for your
            home and business.
          </motion.p>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={heroInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a
              href="#featured-collections"
              onClick={(e) => smoothScroll(e, "featured-collections")}
              className="mt-8 inline-block bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Shop Now
            </a>
          </motion.div>
        </div>
      </motion.section>

      <main className="bg-white max-w-7xl mx-auto px-4">
        {/* Featured Collections */}
        <section id="featured-collections" className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center mb-12 text-gray-900"
            >
              Featured Collections
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredCollections.map((collection, index) => (
                <motion.div
                  key={collection.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link href={collection.link}>
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={collection.image}
                        alt={collection.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-xl font-bold mb-2">
                          {collection.name}
                        </h3>
                        <p className="text-sm opacity-90">
                          {collection.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Quality Blinds */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          aria-labelledby="why-choose-us"
          className="py-16"
        >
          <div className="text-center mb-12">
            <h2
              id="why-choose-us"
              className="text-4xl font-bold text-blue-700 mb-6"
            >
              Why Choose Quality Blinds
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We combine over 25 years of expertise with top-notch materials to
              deliver window solutions that stand the test of time.
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 12l6 6L20 6"
                  />
                ),
                title: "Custom Fit",
                description:
                  "Precision measurements ensure a perfect fit for every window.",
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M12 20v-2m0-8v2m0 4v2"
                  />
                ),
                title: "Superior Quality",
                description:
                  "We use only premium materials to ensure longevity and elegance.",
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h4l3-3 4 4 3-3 4 4m0 6h-4l-3 3-4-4-3 3H3"
                  />
                ),
                title: "Expert Installation",
                description:
                  "Our certified installers guarantee a flawless setup on every job.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="mx-auto">
                  <span className="inline-block bg-blue-100 text-blue-700 rounded-full p-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 h-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {feature.icon}
                    </svg>
                  </span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Form Section */}
        <motion.section
          id="contact-quality-blinds"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          aria-labelledby="contact-quality-blinds-heading"
          className="py-16"
        >
          <div className="max-w-3xl mx-auto">
            <h2
              id="contact-quality-blinds-heading"
              className="text-3xl font-bold text-gray-900 mb-8 text-center"
            >
              Contact Quality Blinds
            </h2>
            <ContactForm />
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-12 bg-gray-100 text-gray-900"
        role="contentinfo"
      >
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <nav aria-label="Footer Quick Links" className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/shop", label: "Shop" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-blue-800 hover:text-blue-600 transition-colors duration-300 block"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Address */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Our Address</h3>
            <address className="not-italic text-gray-700">
              131 Bottany St
              <br />
              Randwick, NSW 2031
              <br />
              Australia
              <br />
              <a
                href="tel:+61234567890"
                className="text-blue-700 hover:text-blue-900 transition-colors duration-300"
              >
                +61 2 3456 7890
              </a>
              <br />
              <a
                href="mailto:info@qualityblinds.com.au"
                className="text-blue-700 hover:text-blue-900 transition-colors duration-300"
              >
                info@qualityblinds.com.au
              </a>
            </address>
          </div>

          {/* Social Icons */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-6">
              {[
                {
                  href: "https://facebook.com/qualityblinds",
                  label: "Facebook",
                  icon: (
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.462h-1.26c-1.243 0-1.63.772-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
                  ),
                },
                {
                  href: "https://twitter.com/qualityblinds",
                  label: "Twitter",
                  icon: (
                    <path d="M23 3a10.9 10.9 0 01-3.14.86 4.48 4.48 0 001.98-2.48 9.03 9.03 0 01-2.88 1.1 4.52 4.52 0 00-7.72 4.12A12.83 12.83 0 013 4.16a4.52 4.52 0 001.4 6.04 4.48 4.48 0 01-2.05-.57v.06a4.52 4.52 0 003.63 4.43 4.52 4.52 0 01-2.04.08 4.52 4.52 0 004.22 3.14A9.05 9.05 0 012 19.54 12.7 12.7 0 008.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.35-.02-.53A8.18 8.18 0 0023 3z" />
                  ),
                },
                {
                  href: "https://instagram.com/qualityblinds",
                  label: "Instagram",
                  icon: (
                    <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-3a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  ),
                },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-blue-700 hover:text-blue-900 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    {social.icon}
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-left text-gray-700 mt-8 md:mt-0 md:col-span-4">
            &copy; {new Date().getFullYear()} Quality Blinds. All rights
            reserved.
          </div>
        </div>
      </motion.footer>
    </>
  );
};

export default Home;

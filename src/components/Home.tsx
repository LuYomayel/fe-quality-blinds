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
    image: "/images/roller-blind-1.webp",
    description: "Elegant and functional, perfect for any space",
    link: "/blinds/roller/blockout-roller-blinds",
  },
  {
    name: "Roman Blinds",
    image: "/images/roman-blind-1.webp",
    description: "Classic and sophisticated, ideal for elegant interiors",
    link: "/blinds/roman/blockout-roman-blinds",
  },
  {
    name: "Venetian Blinds",
    image: "/images/venetian-blind-1.webp",
    description: "Versatile and durable, complete light control",
    link: "/blinds/venetian/aluminium-venetian-blinds",
  },
  {
    name: "Curtains",
    image: "/images/curtain-1.webp",
    description: "High-quality fabrics for an elegant touch",
    link: "/curtains/blockout-curtains",
  },
  {
    name: "Shutters",
    image: "/images/shutter-1.webp",
    description: "Permanent and elegant solutions for your windows",
    link: "/shutters/abs-shutters",
  },
  {
    name: "Awnings",
    image: "/images/awning-1.webp",
    description: "Stylish exterior sun protection",
    link: "/awnings/conservatory-awnings",
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
        className="relative h-[80vh] bg-gray-900"
      >
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.webp"
            alt="Quality Blinds Hero"
            fill
            priority
            className="object-cover opacity-50"
          />
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={
                heroInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }
              }
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Transform Your Space with Quality Blinds
            </motion.h1>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={
                heroInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }
              }
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-200 mb-8"
            >
              Premium window treatments for your home and office
            </motion.p>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={
                heroInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }
              }
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                href="#featured-collections"
                onClick={(e) => smoothScroll(e, "featured-collections")}
                className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded-md transition"
              >
                Explore Our Collection
              </Link>
            </motion.div>
          </div>
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
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        loading={index < 3 ? "eager" : "lazy"}
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
          className="py-16 bg-gray-50"
        >
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Why Choose Quality Blinds?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {feature.icon}
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Contact Form */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          id="contact-quality-blinds"
          className="py-16"
        >
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Get in Touch
            </h2>
            <ContactForm />
          </div>
        </motion.section>
      </main>
    </>
  );
};

export default Home;

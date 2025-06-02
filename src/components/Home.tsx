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
    description:
      "Elegant and functional, perfect for any space. Custom-made roller blinds with superior light control and privacy options.",
    link: "/blinds/roller/blockout-roller-blinds",
    category: "Blinds",
  },
  {
    name: "Roman Blinds",
    image: "/images/roman-blind-1.webp",
    description:
      "Classic and sophisticated, ideal for elegant interiors. Premium fabric Roman blinds with precise tailoring.",
    link: "/blinds/roman/blockout-roman-blinds",
    category: "Blinds",
  },
  {
    name: "Venetian Blinds",
    image: "/images/venetian-blind-1.webp",
    description:
      "Versatile and durable, complete light control. Aluminium and timber venetian blinds for modern homes.",
    link: "/blinds/venetian/aluminium-venetian-blinds",
    category: "Blinds",
  },
  {
    name: "Curtains",
    image: "/images/curtain-1.webp",
    description:
      "High-quality fabrics for an elegant touch. Custom curtains and drapes with professional installation.",
    link: "/curtains/blockout-curtains",
    category: "Curtains",
  },
  {
    name: "Shutters",
    image: "/images/shutter-1.webp",
    description:
      "Permanent and elegant solutions for your windows. Timber and ABS shutters with lifetime warranties.",
    link: "/shutters/abs-shutters",
    category: "Shutters",
  },
  {
    name: "Awnings",
    image: "/images/awning-1.webp",
    description:
      "Stylish exterior sun protection. Retractable and fixed awnings for outdoor living spaces.",
    link: "/awnings/conservatory-awnings",
    category: "Awnings",
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
      {/* Progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50"
        style={{ scaleX }}
        role="progressbar"
        aria-label="Page scroll progress"
      />

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="relative h-[80vh] bg-gray-900 overflow-hidden"
        aria-labelledby="hero-heading"
      >
        <div className="absolute inset-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Quality Blinds Australia - Premium window treatments showcase video"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
            {/* Fallback image if video fails to load */}
            <Image
              src="/images/hero-bg.webp"
              alt="Modern living room with premium quality blinds showcasing elegant window treatments by Quality Blinds Australia"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </video>
          {/* Subtle overlay for button visibility */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Hidden heading for SEO and accessibility */}
        <h1 id="hero-heading" className="sr-only">
          Quality Blinds Australia - Premium Window Treatments and Custom
          Solutions
        </h1>

        {/* Call-to-action button positioned at bottom */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={heroInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link
              href="#featured-collections"
              onClick={(e) => smoothScroll(e, "featured-collections")}
              className="inline-flex items-center bg-blue-700/90 hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded-md transition-all backdrop-blur-sm hover:backdrop-blur-md shadow-lg hover:shadow-xl"
              aria-label="Explore our featured window treatment collections"
            >
              <span>Explore Our Collection</span>
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <div className="bg-white max-w-7xl mx-auto px-4">
        {/* Featured Collections */}
        <section
          id="featured-collections"
          className="py-16"
          aria-labelledby="collections-heading"
        >
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2
              id="collections-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900"
            >
              Featured Window Treatment Collections
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto"
            >
              Discover our comprehensive range of premium blinds, curtains,
              shutters, and awnings. Each product is custom-made to fit your
              windows perfectly with professional installation guaranteed.
            </motion.p>
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              role="list"
            >
              {featuredCollections.map((collection, index) => (
                <motion.article
                  key={collection.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
                  role="listitem"
                >
                  <Link
                    href={collection.link}
                    aria-label={`Learn more about ${collection.name} - ${collection.description}`}
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={collection.image}
                        alt={`Premium ${collection.name} by Quality Blinds Australia - ${collection.description}`}
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
                        <p className="text-sm opacity-90 line-clamp-2">
                          {collection.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.article>
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
          className="py-16 bg-gray-50 rounded-2xl"
          aria-labelledby="benefits-heading"
        >
          <div className="max-w-7xl mx-auto px-4">
            <h2
              id="benefits-heading"
              className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900"
            >
              Why Choose Quality Blinds Australia?
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              With over 30 years of experience serving Australian homes and
              businesses, we&apos;re committed to delivering exceptional quality
              and service that exceeds expectations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8" role="list">
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
                  title: "Custom Fit Guarantee",
                  description:
                    "Precision measurements and custom manufacturing ensure a perfect fit for every window. No standard sizes - everything made to your exact specifications.",
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
                  title: "Superior Quality Materials",
                  description:
                    "We use only premium Australian and international materials with rigorous quality testing to ensure longevity, elegance, and optimal performance.",
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
                  title: "Expert Professional Installation",
                  description:
                    "Our certified installers with 25+ years experience guarantee flawless setup. Full warranty coverage and ongoing support included with every installation.",
                },
              ].map((feature, index) => (
                <motion.article
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  role="listitem"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      {feature.icon}
                    </svg>
                  </div>
                  <h3 className="text-xl text-gray-900 font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.article>
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
          aria-labelledby="contact-heading"
        >
          <div className="max-w-7xl mx-auto px-4">
            <h2
              id="contact-heading"
              className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900"
            >
              Get Your Free Consultation Today
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Ready to transform your space? Contact our experts for a free
              in-home consultation and quote. We&apos;ll help you choose the
              perfect window treatments for your needs and budget.
            </p>
            <ContactForm />
          </div>
        </motion.section>
      </div>
    </>
  );
};

export default Home;

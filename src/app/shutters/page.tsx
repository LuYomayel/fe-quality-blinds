"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import QuoteDialog from "../../components/QuoteDialog";
import type { Metadata } from "next";

// SEO Metadata para la página de shutters
export const metadata: Metadata = {
  title:
    "Premium Shutters Sydney | Plantation, Timber & ABS Shutters | Quality Blinds Randwick",
  description:
    "Quality Blinds Sydney offers premium shutters including plantation shutters, timber shutters, ABS waterproof shutters and basswood shutters. Expert installation and repair services across Sydney from our Randwick showroom.",
  keywords: [
    "shutters sydney",
    "plantation shutters sydney",
    "timber shutters sydney",
    "basswood shutters sydney",
    "ABS shutters sydney",
    "waterproof shutters sydney",
    "phoenixwood shutters sydney",
    "window shutters sydney",
    "shutter installation sydney",
    "shutter repairs sydney",
    "repair shutters sydney",
    "shutter maintenance sydney",
    "custom shutters sydney",
    "interior shutters sydney",
    "exterior shutters sydney",
    "shutters randwick",
    "quality shutters sydney",
    "premium shutters sydney",
    "white shutters sydney",
    "painted shutters sydney",
    "stained shutters sydney",
    "hardwood shutters sydney",
    "cedar shutters sydney",
    "louvre shutters sydney",
  ],
  openGraph: {
    title:
      "Premium Shutters Sydney | Plantation, Timber & ABS | Quality Blinds",
    description:
      "Premium shutters in Sydney. Plantation, timber, ABS waterproof shutters with expert installation and repair services.",
    url: "https://www.qualityblinds.com.au/shutters",
    images: [
      {
        url: "/images/og-shutters-sydney.webp",
        width: 1200,
        height: 630,
        alt: "Premium Shutters Sydney - Plantation, Timber & ABS Shutters",
      },
    ],
  },
};

const ShuttersPage = () => {
  const [showQuoteDialog, setShowQuoteDialog] = useState(false);

  const heroRef = useRef(null);
  const categoriesRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isCategoriesInView = useInView(categoriesRef, {
    once: true,
    margin: "-100px",
  });

  const shuttersCategories = [
    {
      title: "ABS Waterproof Shutters",
      description:
        "100% waterproof ABS shutters perfect for bathrooms, kitchens and high-moisture areas. Stainless steel hardware and 23 color options.",
      image: "/images/abs-shutter-1.webp",
      href: "/shutters/abs-waterproof-shutters",
      features: [
        "100% Waterproof",
        "Stainless Steel Hardware",
        "23 Color Options",
      ],
    },
    {
      title: "Basswood Shutters",
      description:
        "Real timber basswood shutters offering excellent value with 27 paint color options. Perfect for most interior applications.",
      image: "/images/basswood-shutter-1.webp",
      href: "/shutters/basswood-shutters",
      features: ["Real Timber", "27 Paint Colors", "Great Value"],
    },
    {
      title: "Phoenixwood Shutters",
      description:
        "Premium hardwood shutters with furniture-quality finish. Available in 51 colors for the ultimate luxury window treatment.",
      image: "/images/phoenixwood-shutter-1.webp",
      href: "/shutters/phoenixwood-shutters",
      features: ["Premium Hardwood", "51 Color Options", "Furniture Quality"],
    },
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const handleQuoteRequest = () => {
    setShowQuoteDialog(true);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative bg-gradient-to-r from-amber-600 to-orange-600 text-white py-20"
        initial="hidden"
        animate={isHeroInView ? "visible" : "hidden"}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          {/* Breadcrumbs */}
          <motion.div variants={fadeInUp}>
            <nav
              className="flex justify-center lg:justify-start mb-8"
              aria-label="Breadcrumb"
            >
              <ol className="flex items-center space-x-2 text-amber-200">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li className="flex items-center">
                  <ArrowRightIcon className="w-4 h-4 mx-2" />
                  <span className="text-white font-medium">
                    Shutters Sydney
                  </span>
                </li>
              </ol>
            </nav>
          </motion.div>

          <div className="text-center">
            <motion.h1 variants={fadeInUp} className="text-5xl font-bold mb-6">
              Premium Shutters Sydney
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-xl text-amber-100 max-w-3xl mx-auto leading-relaxed"
            >
              Transform your windows with our premium shutters collection. From
              waterproof ABS shutters to luxury hardwood plantation shutters, we
              offer expert installation and repair services across Sydney.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Categories Section */}
      <motion.section
        ref={categoriesRef}
        className="py-20 bg-gray-50"
        initial="hidden"
        animate={isCategoriesInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Choose Your Perfect Shutters
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From waterproof ABS shutters for bathrooms to premium hardwood
              plantation shutters, find the perfect permanent window solution
              for your Sydney home.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {shuttersCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <Link href={category.href}>
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={`${category.title} Sydney - Premium window shutters by Quality Blinds Australia`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {category.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      {category.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center space-x-2"
                        >
                          <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                          <span className="text-sm text-gray-700">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center text-amber-600 font-semibold group-hover:text-amber-700">
                      <span>Explore {category.title}</span>
                      <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Features Section */}
          <motion.div
            className="mt-20 bg-white rounded-2xl p-8 shadow-lg"
            variants={fadeInUp}
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose Our Sydney Shutters?
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Quality Blinds has been Sydney&apos;s trusted shutter specialist
                since 1989, offering premium materials with expert installation
                and repair services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-amber-600 text-2xl font-bold">∞</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Lifetime Value
                </h4>
                <p className="text-gray-600">
                  Premium shutters are a permanent addition that increases
                  property value and lasts for decades.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-amber-600 text-2xl font-bold">R</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Repair Services
                </h4>
                <p className="text-gray-600">
                  Expert shutter repairs and maintenance services across Sydney.
                  We service all brands and materials.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-amber-600 text-2xl font-bold">C</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Custom Made
                </h4>
                <p className="text-gray-600">
                  All shutters are custom made to your exact window
                  specifications with premium hardware.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="mt-16 text-center bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-8 text-white"
            variants={fadeInUp}
          >
            <h3 className="text-2xl font-bold mb-4">
              Ready for Premium Shutters?
            </h3>
            <p className="text-amber-100 mb-6 max-w-2xl mx-auto">
              Get a free consultation for your Sydney shutter project. Our
              experts will help you choose the perfect material and style with
              professional installation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={handleQuoteRequest}
                className="bg-white text-amber-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Free Quote
              </motion.button>
              <Link
                href="/shop"
                className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-amber-600 transition-colors"
              >
                View All Shutters
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Quote Dialog */}
      <QuoteDialog
        isOpen={showQuoteDialog}
        onClose={() => setShowQuoteDialog(false)}
        productName="Quality Shutters"
        productCategory="shutters"
      />
    </div>
  );
};

export default ShuttersPage;

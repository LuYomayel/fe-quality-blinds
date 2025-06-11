"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import QuoteDialog from "../../components/QuoteDialog";
import type { Metadata } from "next";

// SEO Metadata para la página de curtains
export const metadata: Metadata = {
  title:
    "Premium Curtains Sydney | Blockout, Sheer & Custom Curtains | Quality Blinds Randwick",
  description:
    "Quality Blinds Sydney offers premium curtains including blockout curtains, sheer curtains, veri-shades and custom drapes. Motorised options available. Expert installation and repair services across Sydney from our Randwick showroom.",
  keywords: [
    "curtains sydney",
    "blockout curtains sydney",
    "sheer curtains sydney",
    "custom curtains sydney",
    "motorised curtains sydney",
    "electric curtains sydney",
    "automated curtains sydney",
    "curtain installation sydney",
    "curtain repairs sydney",
    "repair curtains sydney",
    "curtain maintenance sydney",
    "drapes sydney",
    "window curtains sydney",
    "bedroom curtains sydney",
    "living room curtains sydney",
    "thermal curtains sydney",
    "soundproof curtains sydney",
    "curtains randwick",
    "quality curtains sydney",
    "premium curtains sydney",
    "fabric curtains sydney",
    "designer curtains sydney",
    "custom drapes sydney",
    "curtain cleaning sydney",
    "curtain alteration sydney",
  ],
  openGraph: {
    title:
      "Premium Curtains Sydney | Blockout, Sheer & Custom | Quality Blinds",
    description:
      "Premium curtains in Sydney. Blockout, sheer, custom curtains and drapes with motorised options and expert repair services.",
    url: "https://www.qualityblinds.com.au/curtains",
    images: [
      {
        url: "/images/og-curtains-sydney.webp",
        width: 1200,
        height: 630,
        alt: "Premium Curtains Sydney - Blockout, Sheer & Custom Curtains",
      },
    ],
  },
};

const CurtainsPage = () => {
  const [showQuoteDialog, setShowQuoteDialog] = useState(false);

  const heroRef = useRef(null);
  const categoriesRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isCategoriesInView = useInView(categoriesRef, {
    once: true,
    margin: "-100px",
  });

  const curtainsCategories = [
    {
      title: "Blockout Curtains",
      description:
        "Premium blockout curtains for complete light control and privacy. Perfect for bedrooms and media rooms with energy-saving properties.",
      image: "/images/curtain-1.webp",
      href: "/curtains/blockout-curtains",
      features: ["100% Light Block", "Energy Efficient", "Sound Dampening"],
    },
    {
      title: "Sheer Curtains",
      description:
        "Elegant sheer curtains that filter natural light while maintaining privacy during the day. Perfect for living areas.",
      image: "/images/sheer-curtain-1.webp",
      href: "/curtains/sheer-curtains",
      features: ["Light Filtering", "Day Privacy", "Elegant Design"],
    },
    {
      title: "Veri-Shades",
      description:
        "Innovative veri-shades combining the beauty of curtains with the functionality of blinds. Adjustable light control.",
      image: "/images/veri-shade-1.webp",
      href: "/curtains/veri-shades",
      features: ["Dual Functionality", "Adjustable Light", "Modern Design"],
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
        className="relative bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20"
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
              <ol className="flex items-center space-x-2 text-purple-200">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li className="flex items-center">
                  <ArrowRightIcon className="w-4 h-4 mx-2" />
                  <span className="text-white font-medium">
                    Curtains Sydney
                  </span>
                </li>
              </ol>
            </nav>
          </motion.div>

          <div className="text-center">
            <motion.h1 variants={fadeInUp} className="text-5xl font-bold mb-6">
              Premium Curtains Sydney
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed"
            >
              Transform your living spaces with our premium curtains collection.
              From blockout curtains to elegant sheers, we offer motorised
              solutions with expert installation and repair services across
              Sydney.
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
              Choose Your Perfect Curtains
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From energy-efficient blockout curtains to elegant sheer fabrics,
              find the perfect window treatment for your Sydney home.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {curtainsCategories.map((category, index) => (
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
                      alt={`${category.title} Sydney - Premium window curtains by Quality Blinds Australia`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
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
                          <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                          <span className="text-sm text-gray-700">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center text-purple-600 font-semibold group-hover:text-purple-700">
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
                Why Choose Our Sydney Curtains?
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Quality Blinds has been Sydney&apos;s trusted curtain specialist
                since 1989, offering premium fabrics with expert installation
                and repair services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 text-2xl font-bold">M</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Motorised Options
                </h4>
                <p className="text-gray-600">
                  Advanced motorised curtains with remote control and smart home
                  integration for ultimate convenience.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 text-2xl font-bold">R</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Repair Services
                </h4>
                <p className="text-gray-600">
                  Expert curtain repairs, cleaning and alteration services
                  across Sydney. We service all brands and fabrics.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 text-2xl font-bold">F</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Premium Fabrics
                </h4>
                <p className="text-gray-600">
                  Extensive range of premium fabrics including blockout,
                  thermal, and designer options from leading manufacturers.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="mt-16 text-center bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-8 text-white"
            variants={fadeInUp}
          >
            <h3 className="text-2xl font-bold mb-4">
              Ready to Transform Your Windows?
            </h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Get a free consultation for your Sydney curtain project. Our
              experts will help you choose the perfect motorised or manual
              curtain solution with professional installation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={handleQuoteRequest}
                className="bg-white text-purple-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Free Quote
              </motion.button>
              <Link
                href="/shop"
                className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-purple-600 transition-colors"
              >
                View All Curtains
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Quote Dialog */}
      <QuoteDialog
        isOpen={showQuoteDialog}
        onClose={() => setShowQuoteDialog(false)}
        productName="Quality Curtains"
        productCategory="curtains"
      />
    </div>
  );
};

export default CurtainsPage;

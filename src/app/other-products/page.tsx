"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  WrenchScrewdriverIcon,
  StarIcon as StarIconSolid,
  ChevronRightIcon,
  ShieldCheckIcon,
  SparklesIcon,
  CogIcon,
} from "@heroicons/react/24/solid";
import { productData } from "@/data/productData";

// Get "Other Products"
const otherProducts = productData.filter((product) =>
  ["louvers", "polycarbonate-roofings", "shade-sails", "umbrellas"].includes(
    product.id
  )
);

const benefits = [
  {
    title: "Versatile Solutions",
    description:
      "Comprehensive range of specialty products for unique outdoor needs",
    icon: SparklesIcon,
  },
  {
    title: "Quality Materials",
    description: "Premium materials engineered for Australian conditions",
    icon: ShieldCheckIcon,
  },
  {
    title: "Custom Design",
    description: "Tailored solutions to match your specific requirements",
    icon: CogIcon,
  },
];

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
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function OtherProductsPage() {
  const heroRef = useRef(null);
  const productsRef = useRef(null);
  const benefitsRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isProductsInView = useInView(productsRef, {
    once: true,
    margin: "-100px",
  });
  const isBenefitsInView = useInView(benefitsRef, {
    once: true,
    margin: "-100px",
  });

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <StarIconSolid
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative bg-gradient-to-br from-slate-900 via-gray-800 to-zinc-900 text-white py-20 sm:py-24 lg:py-32"
        initial="hidden"
        animate={isHeroInView ? "visible" : "hidden"}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.png')] opacity-10"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center" variants={fadeInUp}>
            <div className="flex justify-center mb-6">
              <WrenchScrewdriverIcon className="h-16 w-16 text-blue-400" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Other Products
            </h1>

            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Additional outdoor solutions including louvers, shade sails, and
              specialty products for complete home coverage.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#products"
                className="bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Products
                <ChevronRightIcon className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="/shop"
                className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Full Catalogue
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        ref={benefitsRef}
        className="py-16 bg-gray-50"
        initial="hidden"
        animate={isBenefitsInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Specialty Products?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Innovative solutions designed to complement and enhance your
              outdoor living spaces.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.title}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                variants={cardVariants}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 mx-auto">
                  <benefit.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Products Section */}
      <motion.section
        id="products"
        ref={productsRef}
        className="py-16 bg-white"
        initial="hidden"
        animate={isProductsInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Specialty Products
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover our complete range of specialty outdoor products.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {otherProducts.map((product) => (
              <motion.article
                key={product.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Link href={`/other-product/${product.id}`}>
                  <div className="relative h-64 overflow-hidden">
                    {product.images && product.images.length > 0 ? (
                      <Image
                        src={product.images[0].src}
                        alt={product.images[0].alt}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
                        No image available
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-gray-600 line-clamp-3 mb-4">
                      {product.shortDescription}
                    </p>

                    {product.rating > 0 && (
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex">
                          {renderStars(product.rating)}
                        </div>
                        <span className="text-sm text-gray-500">
                          ({product.rating}/5)
                        </span>
                        {product.reviewCount > 0 && (
                          <span className="text-sm text-gray-500">
                            • {product.reviewCount} reviews
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <span className="text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                        View Details
                      </span>
                      <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white"
        initial="hidden"
        animate={isProductsInView ? "visible" : "hidden"}
        variants={fadeInUp}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Can&apos;t Find What You&apos;re Looking For?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Our team of experts can help you find the perfect solution for your
            specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/shop"
              className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Full Catalogue
            </motion.a>
            <motion.a
              href="/contact"
              className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Expert
            </motion.a>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

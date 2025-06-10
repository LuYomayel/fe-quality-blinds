"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  HomeIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  PaintBrushIcon,
  SwatchIcon,
} from "@heroicons/react/24/outline";
import { categoryConfigs } from "@/data/productData";

const RomanBlindsPage = () => {
  const heroRef = useRef(null);
  const categoriesRef = useRef(null);
  const benefitsRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isCategoriesInView = useInView(categoriesRef, {
    once: true,
    margin: "-100px",
  });
  const isBenefitsInView = useInView(benefitsRef, {
    once: true,
    margin: "-100px",
  });

  // Get data from centralized config
  const config = categoryConfigs.romanBlinds;
  const romanBlindCategories = config.products.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.shortDescription,
    image:
      product.heroImage || product.images[0]?.src || "/images/placeholder.webp",
    features: product.features,
    href: `/blinds/roman/${product.id}`,
  }));

  const benefits = config.benefits.map((benefit) => ({
    ...benefit,
    icon:
      benefit.icon === "PaintBrushIcon" ? (
        <PaintBrushIcon className="h-8 w-8" />
      ) : benefit.icon === "SwatchIcon" ? (
        <SwatchIcon className="h-8 w-8" />
      ) : (
        <ShieldCheckIcon className="h-8 w-8" />
      ),
  }));

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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative bg-gradient-to-br from-amber-900 via-orange-800 to-red-900 text-white pt-20 pb-20"
        initial="hidden"
        animate={isHeroInView ? "visible" : "hidden"}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-[url('/images/fabric-texture.png')] opacity-10"></div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              className="flex-1 text-center lg:text-left"
              variants={fadeInUp}
            >
              {/* Breadcrumbs */}
              <nav
                className="flex justify-center lg:justify-start mb-8"
                aria-label="Breadcrumb"
              >
                <ol className="flex items-center space-x-2 text-orange-200">
                  <li>
                    <Link
                      href="/"
                      className="hover:text-white transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <ArrowRightIcon className="w-4 h-4 mx-2" />
                    <Link
                      href="/blinds"
                      className="hover:text-white transition-colors"
                    >
                      Blinds
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <ArrowRightIcon className="w-4 h-4 mx-2" />
                    <span className="text-white font-medium">Roman Blinds</span>
                  </li>
                </ol>
              </nav>

              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                {config.title}
              </h1>
              <p className="text-xl text-orange-100 mb-8 max-w-2xl">
                {config.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.button
                  className="bg-white text-amber-900 font-semibold px-8 py-3 rounded-lg hover:bg-orange-50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Free Quote
                </motion.button>
                <motion.button
                  className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-amber-900 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Fabric Options
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              className="flex-1"
              variants={fadeInUp}
              transition={{ delay: 0.3 }}
            >
              <div className="relative">
                <motion.div
                  className="aspect-square max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.02, rotate: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={config.heroImage}
                    alt={`Elegant ${config.title} by Quality Blinds Australia`}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>

                {/* Floating feature badges - Hidden on mobile */}
                <motion.div
                  className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-white text-amber-900 p-2 sm:p-4 rounded-lg sm:rounded-xl shadow-lg hidden sm:block"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                >
                  <PaintBrushIcon className="h-4 w-4 sm:h-6 sm:w-6 mb-1" />
                  <div className="text-xs sm:text-sm font-semibold">
                    Designer Fabrics
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 bg-white text-amber-900 p-2 sm:p-4 rounded-lg sm:rounded-xl shadow-lg hidden sm:block"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, type: "spring" }}
                >
                  <HomeIcon className="h-4 w-4 sm:h-6 sm:w-6 mb-1" />
                  <div className="text-xs sm:text-sm font-semibold">
                    Classic Style
                  </div>
                </motion.div>
              </div>
            </motion.div>
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
              Discover Roman Blind Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our carefully curated collection of roman blinds, each
              designed to add elegance and functionality to your space.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto"
            variants={staggerContainer}
          >
            {romanBlindCategories.map((category) => (
              <motion.div
                key={category.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                variants={cardVariants}
                whileHover={{ y: -8 }}
              >
                <Link href={category.href}>
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <motion.div
                      className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ y: 20 }}
                      whileHover={{ y: 0 }}
                    >
                      <button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                        Explore Collection
                        <ArrowRightIcon className="h-5 w-5" />
                      </button>
                    </motion.div>
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-amber-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                      {category.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {category.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="inline-block bg-amber-50 text-amber-700 text-sm px-4 py-2 rounded-full font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        ref={benefitsRef}
        className="py-20 bg-white"
        initial="hidden"
        animate={isBenefitsInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              The Roman Blind Advantage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience unmatched quality and style with our handcrafted roman
              blinds, designed for the discerning Australian homeowner.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="text-center p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl hover:from-amber-100 hover:to-orange-100 transition-all duration-300"
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-600 to-orange-600 text-white rounded-full mb-6"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {benefit.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-lg">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 bg-gradient-to-br from-amber-600 to-orange-600 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            className="text-4xl font-bold mb-6"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Create Your Perfect Space
          </motion.h2>
          <motion.p
            className="text-xl text-orange-100 mb-8"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Let our experts help you choose the perfect roman blinds for your
            home. Book your free consultation today.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.button
              className="bg-white text-amber-600 font-semibold px-8 py-4 rounded-lg hover:bg-orange-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Consultation
            </motion.button>
            <motion.button
              className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-amber-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Fabric Samples
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default RomanBlindsPage;

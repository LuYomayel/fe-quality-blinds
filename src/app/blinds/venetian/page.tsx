"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  AdjustmentsVerticalIcon,
  EyeIcon,
  ArrowRightIcon,
  CogIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { categoryConfigs } from "@/data/productData";
import QuoteDialog from "../../../components/QuoteDialog";

const VenetianBlindsPage = () => {
  const [showQuoteDialog, setShowQuoteDialog] = useState(false);

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
  const config = categoryConfigs.venetianBlinds;
  const venetianBlindCategories = config.products.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.shortDescription,
    image:
      product.heroImage || product.images[0]?.src || "/images/placeholder.webp",
    features: product.features,
    href: `/blinds/venetian/${product.id}`,
  }));

  const benefits = config.benefits.map((benefit) => ({
    ...benefit,
    icon:
      benefit.icon === "AdjustmentsVerticalIcon" ? (
        <AdjustmentsVerticalIcon className="h-8 w-8" />
      ) : benefit.icon === "CogIcon" ? (
        <CogIcon className="h-8 w-8" />
      ) : (
        <SparklesIcon className="h-8 w-8" />
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

  const handleQuoteRequest = () => {
    setShowQuoteDialog(true);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative bg-gradient-to-br from-slate-900 via-gray-800 to-zinc-900 text-white pt-20 pb-20"
        initial="hidden"
        animate={isHeroInView ? "visible" : "hidden"}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-[url('/images/wood-grain-pattern.png')] opacity-10"></div>

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
                <ol className="flex items-center space-x-2 text-gray-300">
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
                    <span className="text-white font-medium">
                      Venetian Blinds
                    </span>
                  </li>
                </ol>
              </nav>

              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                {config.title}
              </h1>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl">
                {config.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.button
                  onClick={handleQuoteRequest}
                  className="bg-white text-blue-900 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Free Quote
                </motion.button>
                <motion.button
                  className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-slate-900 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Materials
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
                    alt={`Premium ${config.title} by Quality Blinds Australia`}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>

                {/* Floating feature badges - Hidden on mobile */}
                <motion.div
                  className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-white text-slate-900 p-2 sm:p-4 rounded-lg sm:rounded-xl shadow-lg hidden sm:block"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                >
                  <AdjustmentsVerticalIcon className="h-4 w-4 sm:h-6 sm:w-6 mb-1" />
                  <div className="text-xs sm:text-sm font-semibold">
                    Precise Control
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 bg-white text-slate-900 p-2 sm:p-4 rounded-lg sm:rounded-xl shadow-lg hidden sm:block"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, type: "spring" }}
                >
                  <EyeIcon className="h-4 w-4 sm:h-6 sm:w-6 mb-1" />
                  <div className="text-xs sm:text-sm font-semibold">
                    Light Control
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
              Choose Your Venetian Style
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From sleek aluminium to rich natural wood, find the perfect
              venetian blinds to match your style and functional needs.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {venetianBlindCategories.map((category) => (
              <motion.div
                key={category.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                variants={cardVariants}
                whileHover={{ y: -8 }}
              >
                <Link href={category.href}>
                  <div className="relative h-64 overflow-hidden">
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
                      <button className="w-full bg-slate-600 hover:bg-slate-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                        View Collection
                        <ArrowRightIcon className="h-4 w-4" />
                      </button>
                    </motion.div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-slate-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {category.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {category.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="inline-block bg-slate-50 text-slate-700 text-sm px-3 py-1 rounded-full"
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
              Venetian Blind Benefits
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover why venetian blinds remain one of the most popular and
              versatile window treatment choices for Australian homes.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="text-center p-8 bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl hover:from-slate-100 hover:to-gray-100 transition-all duration-300"
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-slate-600 to-gray-600 text-white rounded-full mb-6"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {benefit.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 bg-gradient-to-br from-slate-600 to-gray-600 text-white"
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
            Perfect Light Control Awaits
          </motion.h2>
          <motion.p
            className="text-xl text-gray-200 mb-8"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Experience the precision and elegance of venetian blinds. Get your
            personalised quote today.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.button
              onClick={handleQuoteRequest}
              className="bg-white text-slate-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Free Measure
            </motion.button>
            <motion.button
              className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-slate-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Material Options
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Quote Dialog */}
      <QuoteDialog
        isOpen={showQuoteDialog}
        onClose={() => setShowQuoteDialog(false)}
        productName="Venetian Blinds"
        productCategory="venetian-blinds"
      />
    </div>
  );
};

export default VenetianBlindsPage;

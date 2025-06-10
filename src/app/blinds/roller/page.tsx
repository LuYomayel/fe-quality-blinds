"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  SunIcon,
  EyeSlashIcon,
  SparklesIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  CogIcon,
} from "@heroicons/react/24/outline";
// import { productData } from "@/data/productData";

const RollerBlindsPage = () => {
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

  // Filter roller blind products from productData
  // const rollerBlindProducts = productData.filter(
  //   (product) =>
  //     product.id.includes("roller") ||
  //     product.name.toLowerCase().includes("roller")
  // );

  const rollerBlindCategories = [
    {
      id: "blockout-roller-blinds",
      name: "Blockout Roller Blinds",
      description:
        "Complete light control and privacy with our premium blockout roller blinds. Perfect for bedrooms and media rooms.",
      image: "/images/blockout-roller-blinds.webp",
      features: ["100% Light Blocking", "Energy Efficient", "Various Colours"],
      href: "/blinds/roller/blockout-roller-blinds",
    },
    {
      id: "sunscreen-roller-blinds",
      name: "Sunscreen Roller Blinds",
      description:
        "Reduce glare while maintaining your view. Ideal for living areas and offices with UV protection.",
      image: "/images/sunscreen-roller-blinds.webp",
      features: ["UV Protection", "Glare Reduction", "View Preservation"],
      href: "/blinds/roller/sunscreen-roller-blinds",
    },
    {
      id: "translucent-roller-blinds",
      name: "Translucent Roller Blinds",
      description:
        "Soft, filtered light with privacy. Perfect balance of natural light and discretion.",
      image: "/images/translucent-roller-blinds.webp",
      features: ["Soft Light Filtering", "Privacy Control", "Elegant Finish"],
      href: "/blinds/roller/translucent-roller-blinds",
    },
  ];

  const benefits = [
    {
      icon: <CogIcon className="h-8 w-8" />,
      title: "Easy Operation",
      description:
        "Smooth chain or motorised operation for effortless daily use",
    },
    {
      icon: <ShieldCheckIcon className="h-8 w-8" />,
      title: "Durable Quality",
      description:
        "Premium materials and construction for long-lasting performance",
    },
    {
      icon: <SparklesIcon className="h-8 w-8" />,
      title: "Clean Design",
      description: "Sleek, minimalist appearance that complements any décor",
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
        className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white pt-20 pb-20"
        initial="hidden"
        animate={isHeroInView ? "visible" : "hidden"}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-[url('/images/roller-blind-pattern.png')] opacity-10"></div>

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
                <ol className="flex items-center space-x-2 text-blue-200">
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
                      Roller Blinds
                    </span>
                  </li>
                </ol>
              </nav>

              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                Roller Blinds
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl">
                Simple, stylish, and functional. Our roller blinds offer the
                perfect combination of practicality and elegance for any space.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.button
                  className="bg-white text-blue-900 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Free Quote
                </motion.button>
                <motion.button
                  className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-blue-900 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View All Products
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
                    src="/images/roller-blinds-hero.webp"
                    alt="Premium Roller Blinds by Quality Blinds Australia"
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>

                {/* Floating feature badges */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-white text-blue-900 p-4 rounded-xl shadow-lg"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                >
                  <SunIcon className="h-6 w-6 mb-1" />
                  <div className="text-sm font-semibold">UV Protection</div>
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 bg-white text-blue-900 p-4 rounded-xl shadow-lg"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, type: "spring" }}
                >
                  <EyeSlashIcon className="h-6 w-6 mb-1" />
                  <div className="text-sm font-semibold">Privacy Control</div>
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
              Choose Your Perfect Roller Blind
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From complete blackout to light filtering, we have the right
              solution for every room and requirement.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {rollerBlindCategories.map((category) => (
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
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                        View Details
                        <ArrowRightIcon className="h-4 w-4" />
                      </button>
                    </motion.div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {category.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {category.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="inline-block bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full"
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
              Why Choose Our Roller Blinds?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the perfect blend of functionality, style, and
              Australian craftsmanship.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.title}
                className="text-center p-8 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors duration-300"
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-6"
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
        className="py-20 bg-blue-600 text-white"
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
            Ready to Transform Your Windows?
          </motion.h2>
          <motion.p
            className="text-xl text-blue-100 mb-8"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Get a free consultation and quote for your perfect roller blind
            solution.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.button
              className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Free Quote
            </motion.button>
            <motion.button
              className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Call (02) 1234 5678
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default RollerBlindsPage;

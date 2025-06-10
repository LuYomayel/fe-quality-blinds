"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const BlindsPage = () => {
  const heroRef = useRef(null);
  const categoriesRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isCategoriesInView = useInView(categoriesRef, {
    once: true,
    margin: "-100px",
  });

  const blindsCategories = [
    {
      title: "Roller Blinds",
      description:
        "Premium roller blinds for modern homes with exceptional light control and privacy.",
      image: "/images/roller-blind-1.webp",
      href: "/blinds/roller",
      features: [
        "Blockout Options",
        "Sunscreen Fabrics",
        "Translucent Materials",
      ],
    },
    {
      title: "Roman Blinds",
      description:
        "Elegant roman blinds that add sophistication and style to any interior.",
      image: "/images/roman-blind-1.webp",
      href: "/blinds/roman",
      features: ["Blockout Fabrics", "Translucent Options", "Custom Designs"],
    },
    {
      title: "Venetian Blinds",
      description:
        "Classic venetian blinds offering precise light control and timeless appeal.",
      image: "/images/venetian-blind-1.webp",
      href: "/blinds/venetian",
      features: [
        "Aluminium Construction",
        "Basswood Options",
        "Cedar Variants",
      ],
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

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20"
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
              <ol className="flex items-center space-x-2 text-blue-200">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li className="flex items-center">
                  <ArrowRightIcon className="w-4 h-4 mx-2" />
                  <span className="text-white font-medium">Blinds</span>
                </li>
              </ol>
            </nav>
          </motion.div>

          <div className="text-center">
            <motion.h1 variants={fadeInUp} className="text-5xl font-bold mb-6">
              Premium Blinds Collection
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
            >
              Discover our comprehensive range of premium blinds designed to
              enhance your home with style, functionality, and exceptional
              quality.
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
              Choose Your Perfect Blinds
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From modern roller blinds to elegant roman blinds and classic
              venetian styles, find the perfect window treatment for every room
              in your home.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {blindsCategories.map((category, index) => (
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
                      alt={`${category.title} - Premium window treatment by Quality Blinds Australia`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
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
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span className="text-sm text-gray-700">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                      <span>Explore {category.title}</span>
                      <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            className="mt-16 text-center bg-white rounded-2xl p-8 shadow-lg"
            variants={fadeInUp}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need Help Choosing the Right Blinds?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our experts are here to help you find the perfect blinds for your
              space. Get a free consultation and quote today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/about#contact"
                className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Free Quote
              </Link>
              <Link
                href="/shop"
                className="border-2 border-blue-600 text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
              >
                View All Products
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default BlindsPage;

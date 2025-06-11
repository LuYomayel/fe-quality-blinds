"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  PhoneIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import QuoteDialog from "../../components/QuoteDialog";

const RepairsPageClient = () => {
  const [showQuoteDialog, setShowQuoteDialog] = useState(false);

  const heroRef = useRef(null);
  const servicesRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isServicesInView = useInView(servicesRef, {
    once: true,
    margin: "-100px",
  });

  const repairServices = [
    {
      title: "Blind Repairs Sydney",
      description:
        "Expert repair services for all types of blinds including roller blinds, venetian blinds, roman blinds and motorised blinds. Fast diagnosis and professional repairs.",
      image: "/images/blind-repair-service.webp",
      href: "/repairs/blind-repairs",
      services: [
        "Cord & Chain Replacement",
        "Motor Repairs & Replacement",
        "Slat Replacement",
        "Mechanism Repairs",
        "Fabric Replacement",
        "Remote Control Issues",
      ],
    },
    {
      title: "Awning Repairs Sydney",
      description:
        "Professional awning repair services for folding arm awnings, straight drop awnings, canopy awnings and motorised awnings across Sydney.",
      image: "/images/awning-repair-service.webp",
      href: "/repairs/awning-repairs",
      services: [
        "Fabric Replacement",
        "Arm Mechanism Repairs",
        "Motor Servicing",
        "Sensor Calibration",
        "Frame Repairs",
        "Weatherproofing",
      ],
    },
    {
      title: "Curtain Repairs Sydney",
      description:
        "Comprehensive curtain repair and alteration services including track repairs, fabric restoration, motorised curtain servicing and professional cleaning.",
      image: "/images/curtain-repair-service.webp",
      href: "/repairs/curtain-repairs",
      services: [
        "Track & Hardware Repairs",
        "Hem Adjustments",
        "Fabric Restoration",
        "Motor Repairs",
        "Professional Cleaning",
        "Custom Alterations",
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

  const handleQuoteRequest = () => {
    setShowQuoteDialog(true);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white py-20"
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
              <ol className="flex items-center space-x-2 text-green-200">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li className="flex items-center">
                  <ArrowRightIcon className="w-4 h-4 mx-2" />
                  <span className="text-white font-medium">
                    Repair Services Sydney
                  </span>
                </li>
              </ol>
            </nav>
          </motion.div>

          <div className="text-center">
            <motion.h1 variants={fadeInUp} className="text-5xl font-bold mb-6">
              Expert Repair Services Sydney
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed"
            >
              Professional repair services for blinds, awnings and curtains
              across Sydney. Based in Randwick, we offer fast, reliable repairs
              with warranty on all work. Expert technicians servicing all brands
              and types since 1989.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              transition={{ delay: 0.4 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="tel:0293405050"
                className="bg-white text-green-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                <PhoneIcon className="w-5 h-5 mr-2" />
                Call (02) 9340 5050
              </Link>
              <button
                onClick={handleQuoteRequest}
                className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-green-600 transition-colors"
              >
                Get Repair Quote
              </button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        ref={servicesRef}
        className="py-20 bg-gray-50"
        initial="hidden"
        animate={isServicesInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Sydney Repair Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From simple adjustments to complex motor repairs, our experienced
              technicians can repair all types of blinds, awnings and curtains
              across Sydney.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {repairServices.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={`${service.title} - Professional repair services by Quality Blinds Australia`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {service.services.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex items-center space-x-2"
                      >
                        <CheckCircleIcon className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={service.href}
                    className="flex items-center text-green-600 font-semibold group-hover:text-green-700"
                  >
                    <span>Learn More</span>
                    <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Why Choose Us Section */}
          <motion.div
            className="mt-20 bg-white rounded-2xl p-8 shadow-lg"
            variants={fadeInUp}
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose Our Sydney Repair Services?
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Quality Blinds has been Sydney&apos;s trusted repair specialist
                since 1989. We service all brands with professional expertise
                and genuine parts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 text-2xl font-bold">30+</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Years Experience
                </h4>
                <p className="text-gray-600">
                  Over 30 years servicing Sydney with expert repairs for all
                  window treatment brands.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 text-2xl font-bold">✓</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Warranty Guarantee
                </h4>
                <p className="text-gray-600">
                  All repair work comes with warranty guarantee for your peace
                  of mind.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 text-2xl font-bold">24</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Fast Turnaround
                </h4>
                <p className="text-gray-600">
                  Most repairs completed within 24-48 hours. Emergency services
                  available.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 text-2xl font-bold">$</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Fair Pricing
                </h4>
                <p className="text-gray-600">
                  Transparent, competitive pricing with no hidden costs. Free
                  quotes provided.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="mt-16 text-center bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white"
            variants={fadeInUp}
          >
            <h3 className="text-2xl font-bold mb-4">
              Need Repairs? We&apos;re Here to Help!
            </h3>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Don&apos;t replace when you can repair! Our Sydney repair
              specialists can fix most blind, awning and curtain issues at a
              fraction of replacement cost.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:0293405050"
                className="bg-white text-green-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                <PhoneIcon className="w-5 h-5 mr-2" />
                Call (02) 9340 5050
              </Link>
              <button
                onClick={handleQuoteRequest}
                className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-green-600 transition-colors"
              >
                Get Free Repair Quote
              </button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Quote Dialog */}
      <QuoteDialog
        isOpen={showQuoteDialog}
        onClose={() => setShowQuoteDialog(false)}
        productName="Repair Services"
        productCategory="repairs"
      />
    </div>
  );
};

export default RepairsPageClient;

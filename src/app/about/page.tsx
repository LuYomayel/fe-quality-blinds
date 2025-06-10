"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  UserGroupIcon,
  HeartIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { BuildingOfficeIcon } from "@heroicons/react/24/solid";
import ContactForm from "../../components/ContactForm";
import QuoteDialog from "../../components/QuoteDialog";

const AboutUs = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showQuoteDialog, setShowQuoteDialog] = useState(false);

  // Refs para las animaciones basadas en scroll
  const heroRef = useRef(null);
  const experienceRef = useRef(null);
  const historyRef = useRef(null);
  const pillarsRef = useRef(null);
  const partnersRef = useRef(null);
  const ctaRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isExperienceInView = useInView(experienceRef, {
    once: true,
    margin: "-100px",
  });
  const isHistoryInView = useInView(historyRef, {
    once: true,
    margin: "-100px",
  });
  const isPillarsInView = useInView(pillarsRef, {
    once: true,
    margin: "-100px",
  });
  const isPartnersInView = useInView(partnersRef, {
    once: true,
    margin: "-100px",
  });
  const isCtaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  const coreValues = [
    {
      title: "INTEGRITY",
      description:
        "We measure and understand the key drivers in our business on which we exclusively focus.",
      icon: <ShieldCheckIcon className="h-8 w-8 text-blue-600" />,
    },
    {
      title: "PRECISION",
      description:
        "We measure and understand the key drivers in our business on which we exclusively focus.",
      icon: <ShieldCheckIcon className="h-8 w-8 text-blue-600" />,
    },
    {
      title: "CONSISTENCY",
      description:
        "We develop and maintain uniform positive habits and actions that deliver high levels of personal satisfaction and business success.",
      icon: <CheckCircleIcon className="h-8 w-8 text-blue-600" />,
    },
  ];

  const pillars = [
    {
      title: "COMMUNITY AND THE ENVIRONMENT",
      description:
        "Shutters are made from an eco-friendly Engineered Wood Composite (EWC) core coated with a medical grade polypropylene, providing the perfect finish for good looks, durability and water resistance.",
      icon: "🌱",
    },
    {
      title: "OUR VALUES - PROFESSIONALISM",
      description:
        "We understand that our business is a true reflection of who we are and what we stand for and as such we always measure ourselves against the highest standards.",
      icon: "⭐",
    },
    {
      title: "SERVICES",
      description:
        "We value each and every one of our clients, providing them with an outstanding experience from start to finish.",
      icon: "🛠️",
    },
  ];

  const partners = [
    { name: "ACMEDA", logo: "/images/partners/acmeda.png" },
    { name: "ALUXOR", logo: "/images/partners/aluxor.png" },
    { name: "Carbolite", logo: "/images/partners/carbolite.png" },
    { name: "ESR Blinds", logo: "/images/partners/esr-blinds.png" },
    { name: "FOREST", logo: "/images/partners/forest.png" },
  ];

  // Variantes de animación
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
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
    <div className="bg-white overflow-hidden">
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
                  <span className="text-white font-medium">About Us</span>
                </li>
              </ol>
            </nav>
          </motion.div>

          <div className="text-center">
            <motion.h1 variants={fadeInUp} className="text-5xl font-bold mb-6">
              About Quality Blinds
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
            >
              Creating memories through exceptional window treatments since
              1989. A family-owned business dedicated to excellence and
              innovation.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Experience Section */}
      <motion.section
        ref={experienceRef}
        className="py-20 bg-gray-50"
        initial="hidden"
        animate={isExperienceInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeInLeft}>
              <motion.h2
                className="text-4xl font-bold text-gray-900 mb-8"
                whileInView={{ scale: [0.9, 1] }}
                transition={{ duration: 0.5 }}
              >
                Experience
              </motion.h2>
              <div className="space-y-6 text-gray-700">
                <motion.p
                  className="text-lg leading-relaxed"
                  variants={fadeInUp}
                >
                  The evolving, high-speed nature of our industry has been met
                  with the expertise & knowledge of our team. Having members of
                  our team with{" "}
                  <span className="font-semibold text-blue-600">
                    30+ years of experience
                  </span>
                  , you can be sure to have a professional solution to all and
                  any enquiries.
                </motion.p>

                <motion.div
                  className="space-y-6 mt-8"
                  variants={staggerContainer}
                >
                  {coreValues.map((value, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-4"
                      variants={fadeInUp}
                      whileHover={{ x: 10, transition: { duration: 0.2 } }}
                    >
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {value.icon}
                      </motion.div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">
                          {value.title}:
                        </h3>
                        <p className="text-gray-600">{value.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            <motion.div className="relative" variants={fadeInRight}>
              <motion.div
                className="aspect-square rounded-2xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02, rotate: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/images/blinds-experience.jpg"
                  alt="Quality Blinds Experience - Professional window treatments"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
              {/* Floating stats card */}
              <motion.div
                className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                }}
              >
                <div className="text-center">
                  <motion.div
                    className="text-3xl font-bold text-blue-600"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7, duration: 0.3, type: "spring" }}
                  >
                    30+
                  </motion.div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* History & Team Section */}
      <motion.section
        ref={historyRef}
        className="py-20 bg-white"
        initial="hidden"
        animate={isHistoryInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <motion.h2
              className="text-4xl font-bold text-gray-900 mb-6"
              whileInView={{ y: [20, 0], opacity: [0, 1] }}
              transition={{ duration: 0.6 }}
            >
              HISTORY & TEAM
            </motion.h2>
            <div className="max-w-4xl mx-auto">
              <motion.p
                className="text-lg text-gray-700 leading-relaxed mb-6"
                variants={fadeInUp}
              >
                <span className="font-semibold">
                  ESTABLISHED IN SYDNEY IN 1989.
                </span>{" "}
                QUALITY BLINDS CONTINUES TO EXCEL IN THE SERVICE WE PROVIDE.
                SUCCESSFULLY ESTABLISHING OURSELVES AS AN INDUSTRY LEADER WITH A
                REPUTABLE BRAND IMAGE.
              </motion.p>
              <motion.p
                className="text-lg text-blue-600 font-medium"
                variants={fadeInUp}
              >
                THIS HAS BEEN MADE POSSIBLE DUE TO A PASSIONATE AND ENTHUSIASTIC
                TEAM.
              </motion.p>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            variants={staggerContainer}
          >
            {[
              {
                icon: BuildingOfficeIcon,
                value: "35+",
                label: "Years in Business",
              },
              {
                icon: UserGroupIcon,
                value: "1000+",
                label: "Happy Clients",
              },
              {
                icon: HeartIcon,
                value: "100%",
                label: "Family Owned",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-8 bg-blue-50 rounded-xl"
                variants={fadeInUp}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#dbeafe",
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <stat.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                </motion.div>
                <motion.div
                  className="text-3xl font-bold text-blue-600 mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-700">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Our Pillars Section */}
      <motion.section
        ref={pillarsRef}
        className="py-20 bg-gray-900 text-white"
        initial="hidden"
        animate={isPillarsInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl font-bold mb-6">Our Foundation</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built on strong values and commitment to excellence in every
              aspect of our business.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {pillars.map((pillar, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-8 rounded-xl hover:bg-gray-700 transition-colors cursor-pointer"
                variants={fadeInUp}
                whileHover={{
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="text-4xl mb-4"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {pillar.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-4 text-blue-400">
                  {pillar.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Partners Section */}
      <motion.section
        ref={partnersRef}
        className="py-20 bg-white"
        initial="hidden"
        animate={isPartnersInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Who We Work With
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We&rsquo;re proud to be working with some of Australia&rsquo;s
              leading suppliers
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center"
            variants={staggerContainer}
          >
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                variants={fadeInUp}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#f9fafb",
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-center">
                  {/* Placeholder para logos - reemplazar con imágenes reales */}
                  <motion.div
                    className="h-16 w-24 bg-gray-300 rounded flex items-center justify-center mb-2"
                    whileHover={{ backgroundColor: "#d1d5db" }}
                  >
                    <span className="text-xs text-gray-600">LOGO</span>
                  </motion.div>
                  <div className="text-sm font-medium text-gray-700">
                    {partner.name}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        ref={ctaRef}
        className="py-20 bg-blue-600 text-white"
        initial="hidden"
        animate={isCtaInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2 className="text-4xl font-bold mb-6" variants={fadeInUp}>
            Ready to Transform Your Space?
          </motion.h2>
          <motion.p className="text-xl text-blue-100 mb-8" variants={fadeInUp}>
            Experience the Quality Blinds difference. Get your free consultation
            today.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={staggerContainer}
          >
            <motion.button
              onClick={handleQuoteRequest}
              className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
              variants={fadeInLeft}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Get Free Quote
            </motion.button>
            <motion.button
              onClick={() => setShowContactForm(true)}
              className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
              variants={fadeInRight}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Form Modal */}
      {showContactForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setShowContactForm(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-black">Contact Us</h2>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="text-gray-400 hover:text-gray-600 transition"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>
              <ContactForm />
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Quote Dialog */}
      <QuoteDialog
        isOpen={showQuoteDialog}
        onClose={() => setShowQuoteDialog(false)}
        productName="Quality Blinds Services"
        productCategory="consultation"
      />
    </div>
  );
};

export default AboutUs;

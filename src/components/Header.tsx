"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import ContactForm from "./ContactForm";
import Link from "next/link";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Shop", href: "/shop" },
  {
    name: "Blinds",
    href: "/blinds",
    subItems: [
      {
        name: "Roller Blinds",
        href: "/blinds/roller",
        subItems: [
          { name: "Blockout", href: "/blinds/roller/blockout" },
          { name: "Sunscreen", href: "/blinds/roller/sunscreen" },
          { name: "Translucent", href: "/blinds/roller/translucent" },
        ],
      },
      {
        name: "Roman Blinds",
        href: "/blinds/roman",
        subItems: [
          { name: "Blockout", href: "/blinds/roman/blockout" },
          { name: "Translucent", href: "/blinds/roman/translucent" },
        ],
      },
      {
        name: "Venetian Blinds",
        href: "/blinds/venetian",
        subItems: [
          { name: "Cedar", href: "/blinds/venetian/cedar" },
          { name: "Basswood", href: "/blinds/venetian/basswood" },
          { name: "Aluminium", href: "/blinds/venetian/aluminium" },
        ],
      },
    ],
  },
  { name: "Curtains", href: "/curtains" },
  { name: "Shutters", href: "/shutters" },
  { name: "Awnings", href: "/awnings" },
  { name: "Other Products", href: "/other-products" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuButton = () => setIsMenuOpen((open) => !open);

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "-100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      {/* Contact Us button */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => setShowContact(true)}
        className={`fixed top-6 right-6 z-50 bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
          scrolled ? "shadow-lg" : ""
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Contact Us
      </motion.button>

      {/* Menu button */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        onClick={handleMenuButton}
        className={`fixed top-6 left-6 z-50 text-white bg-blue-700 bg-opacity-90 rounded-lg p-2 hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
          scrolled ? "shadow-lg" : ""
        }`}
        aria-label="Open main menu"
        aria-expanded={isMenuOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Bars3Icon className="h-8 w-8" />
      </motion.button>

      {/* Menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 left-0 bottom-0 w-80 bg-white shadow-2xl overflow-y-auto z-50"
            >
              <div className="p-8 space-y-8">
                {menuItems.map((item) => (
                  <div key={item.name}>
                    {item.subItems ? (
                      <div className="space-y-3">
                        <Link
                          href={item.href || "#"}
                          className="block text-2xl font-bold text-gray-900 hover:text-blue-700 transition-all duration-300 tracking-wide border-b-2 border-transparent hover:border-blue-700 pb-1"
                        >
                          {item.name}
                        </Link>
                        <ul className="pl-4 space-y-3 border-l-2 border-blue-200">
                          {item.subItems.map((subItem) => (
                            <li key={subItem.name}>
                              <Link
                                href={subItem.href}
                                className="block text-lg text-gray-800 hover:text-blue-700 transition-all duration-300 pl-2 hover:translate-x-1"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {subItem.name}
                              </Link>
                              {subItem.subItems && (
                                <ul className="pl-4 mt-2 space-y-2 border-l-2 border-blue-100">
                                  {subItem.subItems.map((subSubItem) => (
                                    <li key={subSubItem.name}>
                                      <Link
                                        href={subSubItem.href}
                                        className="block text-base text-gray-600 hover:text-blue-700 transition-all duration-300 pl-3 hover:translate-x-1 italic hover:not-italic"
                                        onClick={() => setIsMenuOpen(false)}
                                      >
                                        {subSubItem.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="block text-2xl font-bold text-gray-900 hover:text-blue-700 transition-all duration-300 tracking-wide border-b-2 border-transparent hover:border-blue-700 pb-1"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />
          </>
        )}
      </AnimatePresence>

      {/* Contact Us Modal */}
      <AnimatePresence>
        {showContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-xl relative mx-4"
            >
              <motion.button
                onClick={() => setShowContact(false)}
                className="absolute top-4 right-4 text-gray-900 hover:text-blue-700 z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <XMarkIcon className="h-7 w-7" />
              </motion.button>
              <ContactForm />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

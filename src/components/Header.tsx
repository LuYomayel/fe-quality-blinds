"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  InformationCircleIcon,
  ShoppingBagIcon,
  WindowIcon,
  CursorArrowRaysIcon,
  BuildingOffice2Icon,
  SunIcon,
  WrenchScrewdriverIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import ContactForm from "./ContactForm";
import Link from "next/link";
import Image from "next/image";

interface MenuItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  subItems?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "About Us", href: "/about", icon: InformationCircleIcon },
  { name: "Shop", href: "/shop", icon: ShoppingBagIcon },
  {
    name: "Blinds",
    href: "/blinds",
    icon: WindowIcon,
    subItems: [
      {
        name: "Roller Blinds",
        href: "/blinds/roller",
        subItems: [
          {
            name: "Blockout Roller Blinds",
            href: "/blinds/roller/blockout-roller-blinds",
          },
          {
            name: "Sunscreen Roller Blinds",
            href: "/blinds/roller/sunscreen-roller-blinds",
          },
          {
            name: "Translucent Roller Blinds",
            href: "/blinds/roller/translucent-roller-blinds",
          },
        ],
      },
      {
        name: "Roman Blinds",
        href: "/blinds/roman",
        subItems: [
          {
            name: "Blockout Roman Blinds",
            href: "/blinds/roman/blockout-roman-blinds",
          },
          {
            name: "Translucent Roman Blinds",
            href: "/blinds/roman/translucent-roman-blinds",
          },
        ],
      },
      {
        name: "Venetian Blinds",
        href: "/blinds/venetian",
        subItems: [
          {
            name: "Aluminium Venetian Blinds",
            href: "/blinds/venetian/aluminium-venetian-blinds",
          },
          {
            name: "Basswood Venetian Blinds",
            href: "/blinds/venetian/basswood-venetian-blinds",
          },
        ],
      },
    ],
  },
  {
    name: "Curtains",
    href: "/curtains",
    icon: CursorArrowRaysIcon,
    subItems: [
      { name: "Blockout Curtains", href: "/curtains/blockout-curtains" },
      { name: "Sheer Curtains", href: "/curtains/sheer-curtains" },
      { name: "Veri Shades", href: "/curtains/veri-shades" },
    ],
  },
  {
    name: "Shutters",
    href: "/shutters",
    icon: BuildingOffice2Icon,
    subItems: [
      { name: "ABS Shutters", href: "/shutters/abs-shutters" },
      {
        name: "ABS Waterproof Shutters",
        href: "/shutters/abs-waterproof-shutters",
      },
      { name: "Basswood Shutters", href: "/shutters/basswood-shutters" },
      { name: "Phoenixwood Shutters", href: "/shutters/phoenixwood-shutters" },
    ],
  },
  {
    name: "Awnings",
    href: "/awnings",
    icon: SunIcon,
    subItems: [
      { name: "Conservatory Awnings", href: "/awnings/conservatory-awnings" },
      { name: "Folding Arm Awnings", href: "/awnings/folding-arm-awnings" },
      { name: "Straight Drop Awnings", href: "/awnings/straight-drop-awnings" },
      { name: "Canopy Awning", href: "/awnings/canopy-awning" },
    ],
  },
  {
    name: "Other Products",
    href: "/other-products",
    icon: WrenchScrewdriverIcon,
    subItems: [
      { name: "Louvers", href: "/other-product/louvers" },
      {
        name: "Polycarbonate Roofings",
        href: "/other-product/polycarbonate-roofings",
      },
      { name: "Shade Sails", href: "/other-product/shade-sails" },
      { name: "Umbrellas", href: "/other-product/umbrellas" },
    ],
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuButton = () => setIsMenuOpen((open) => !open);

  const toggleExpanded = (itemName: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemName)) {
      newExpanded.delete(itemName);
    } else {
      newExpanded.add(itemName);
    }
    setExpandedItems(newExpanded);
  };

  const menuVariants = {
    closed: {
      x: "-100%",
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    open: {
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const menuItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
  };

  const subItemVariants = {
    closed: { opacity: 0, height: 0, y: -10 },
    open: {
      opacity: 1,
      height: "auto",
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
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
        className={`fixed top-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
          scrolled ? "shadow-xl" : ""
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
        className={`fixed top-6 left-6 z-50 flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
          scrolled ? "shadow-xl" : ""
        }`}
        aria-label="Open main menu"
        aria-expanded={isMenuOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Bars3Icon className="h-7 w-7" />
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
              className="fixed top-0 left-0 bottom-0 w-80 bg-gradient-to-br from-slate-50 via-white to-blue-50 shadow-2xl overflow-y-auto z-50 border-r border-gray-200/50"
            >
              {/* Header del menú */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Image
                      src="/logo/logo-no-bg.webp"
                      alt="Quality Blinds Australia Logo"
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                    <div>
                      <h2 className="text-lg font-bold">Quality Blinds</h2>
                      <p className="text-blue-100 text-xs">Australia</p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </motion.button>
                </div>
              </div>

              {/* Menu items */}
              <div className="p-6 space-y-2">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    variants={menuItemVariants}
                    initial="closed"
                    animate="open"
                    custom={index}
                  >
                    {item.subItems ? (
                      <div className="space-y-1">
                        <button
                          onClick={() => toggleExpanded(item.name)}
                          className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 transition-all duration-200 group"
                        >
                          <div className="flex items-center space-x-3">
                            {item.icon && (
                              <item.icon className="h-5 w-5 text-blue-600 group-hover:text-blue-700" />
                            )}
                            <span className="font-semibold text-gray-800 group-hover:text-blue-800">
                              {item.name}
                            </span>
                          </div>
                          <motion.div
                            animate={{
                              rotate: expandedItems.has(item.name) ? 90 : 0,
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRightIcon className="h-4 w-4 text-gray-500" />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {expandedItems.has(item.name) && (
                            <motion.div
                              variants={subItemVariants}
                              initial="closed"
                              animate="open"
                              exit="closed"
                              className="ml-8 space-y-1 border-l-2 border-blue-200 pl-4"
                            >
                              {/* Link principal de la categoría */}
                              {/*}
                              <Link
                                href={item.href}
                                className="block p-2 text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                View All {item.name}
                              </Link>
                              */}

                              {item.subItems.map((subItem) => (
                                <div key={subItem.name}>
                                  <Link
                                    href={subItem.href}
                                    className="block p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    {subItem.name}
                                  </Link>
                                  {subItem.subItems && (
                                    <div className="ml-4 mt-1 space-y-1 border-l border-gray-200 pl-3">
                                      {subItem.subItems.map((subSubItem) => (
                                        <Link
                                          key={subSubItem.name}
                                          href={subSubItem.href}
                                          className="block p-1 text-sm text-gray-500 hover:text-blue-500 hover:bg-blue-25 rounded transition-all duration-200"
                                          onClick={() => setIsMenuOpen(false)}
                                        >
                                          {subSubItem.name}
                                        </Link>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 transition-all duration-200 group"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.icon && (
                          <item.icon className="h-5 w-5 text-blue-600 group-hover:text-blue-700" />
                        )}
                        <span className="font-semibold text-gray-800 group-hover:text-blue-800">
                          {item.name}
                        </span>
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Footer del menú */}
              <div className="p-6 border-t border-gray-200/50 bg-gradient-to-r from-gray-50 to-blue-50">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Need help?</p>
                  <a
                    href="tel:+61293405050"
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-sm font-medium"
                  >
                    Call us: +61 (02) 9340 5050
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
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
                className="absolute top-4 right-4 text-gray-900 hover:text-blue-700 z-10 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <XMarkIcon className="h-5 w-5" />
              </motion.button>
              <ContactForm />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

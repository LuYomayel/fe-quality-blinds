"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import ContactForm from "./ContactForm";

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

  return (
    <>
      {/* Contact Us button */}
      <button
        onClick={() => setShowContact(true)}
        className="fixed top-6 right-6 z-50 bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow hover:bg-blue-800 transition-colors border border-blue-800"
      >
        Contact Us
      </button>
      {/* Menu button */}
      <button
        onClick={() => setIsMenuOpen(true)}
        className="fixed top-6 left-6 z-50 text-white bg-blue-700 bg-opacity-90 rounded-full p-2 hover:bg-blue-800 transition-colors border border-blue-800"
      >
        <Bars3Icon className="h-8 w-8" />
      </button>
      {/* Menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 left-0 w-80 bg-white shadow-xl z-40 border-r border-gray-200"
          >
            <div className="relative h-full w-full">
              {/* Close button */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-6 right-6 text-gray-900 hover:text-blue-700 transition-colors"
              >
                <XMarkIcon className="h-8 w-8" />
              </button>
              {/* Menu list */}
              <nav className="h-full pt-20 px-6 overflow-y-auto">
                <ul className="space-y-6">
                  {menuItems.map((item) => (
                    <li key={item.name}>
                      {item.subItems ? (
                        <div className="space-y-2">
                          <a
                            href={item.href}
                            className="block text-xl font-bold text-gray-900 hover:text-blue-700 transition-colors"
                          >
                            {item.name}
                          </a>
                          <ul className="pl-4 space-y-2 border-l-2 border-blue-100">
                            {item.subItems.map((subItem) => (
                              <li key={subItem.name}>
                                <a
                                  href={subItem.href}
                                  className="block text-lg text-gray-800 hover:text-blue-700 transition-colors"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {subItem.name}
                                </a>
                                {subItem.subItems && (
                                  <ul className="pl-4 mt-2 space-y-1 border-l-2 border-blue-100">
                                    {subItem.subItems.map((subSubItem) => (
                                      <li key={subSubItem.name}>
                                        <a
                                          href={subSubItem.href}
                                          className="block text-base text-gray-700 hover:text-blue-700 transition-colors"
                                          onClick={() => setIsMenuOpen(false)}
                                        >
                                          {subSubItem.name}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <a
                          href={item.href}
                          className="block text-xl font-bold text-gray-900 hover:text-blue-700 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Contact Us Modal */}
      <AnimatePresence>
        {showContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          >
            <div className="w-full max-w-xl relative">
              <button
                onClick={() => setShowContact(false)}
                className="absolute top-4 right-4 text-gray-900 hover:text-blue-700 z-10"
              >
                <XMarkIcon className="h-7 w-7" />
              </button>
              <ContactForm />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

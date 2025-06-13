"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import ContactForm from "./ContactForm";

const Footer = () => {
  const [showContactForm, setShowContactForm] = useState(false);

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/shop" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "#", action: () => setShowContactForm(true) },
    { name: "Terms & Conditions", href: "/terms" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://facebook.com/qualityblinds",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://instagram.com/qualityblinds",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348 2.348 1.051 2.348 2.348S9.746 16.988 8.449 16.988zM12.017 7.729c-2.321 0-4.211 1.89-4.211 4.211s1.89 4.211 4.211 4.211s4.211-1.89 4.211-4.211S14.338 7.729 12.017 7.729z" />
        </svg>
      ),
    },
    {
      name: "Pinterest",
      href: "https://pinterest.com/qualityblinds",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.219-.359-1.219c0-1.142.662-1.995 1.488-1.995.219 0 .979.219.979 1.095 0 .979-.662 2.441-.979 3.798-.219.937.469 1.714 1.406 1.714 1.687 0 2.98-1.781 2.98-4.328 0-2.26-1.625-3.798-3.945-3.798-2.686 0-4.328 2.012-4.328 4.09 0 .979.359 1.625.832 2.12.09.104.104.195.077.301-.077.323-.25 1.011-.287 1.152-.05.188-.188.229-.437.188-1.406-.662-2.324-2.686-2.324-4.328 0-3.798 2.686-7.618 7.955-7.618 4.176 0 7.432 2.979 7.432 6.959 0 4.176-2.324 7.432-5.406 7.432-1.104 0-2.12-.573-2.441-1.297 0 0-.573 2.17-.693 2.686-.25.937-.937 2.12-1.406 2.841 1.011.323 2.12.469 3.198.469 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* About Us */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-bold mb-6 text-white">About Us</h3>
              <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
                <p>
                  <span className="font-semibold text-blue-400">
                    &ldquo;Create Memories!&rdquo;
                  </span>{" "}
                  24/7 Blinds is a family-owned and operated business since
                  1990. Our highly valued reputation grows with each window
                  treatment we sell.
                </p>
                <p>
                  Our customer referrals and repeat business have greatly
                  contributed to us becoming one of the leaders in the window
                  treatment industry!
                </p>
                <p>
                  We are committed to giving our clients excellent service and
                  superior finishes – this distinguishes us and our quality
                  products.
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-bold mb-6 text-white">Quick Links</h3>
              <nav className="space-y-3">
                {quickLinks.map((link) =>
                  link.action ? (
                    <button
                      key={link.name}
                      onClick={link.action}
                      className="block text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm text-left"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="block text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </Link>
                  )
                )}
              </nav>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-bold mb-6 text-white">
                Contact Info
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPinIcon className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-gray-300 text-sm">
                    <p className="font-semibold text-white">Address</p>
                    <p>131 Botany St Randwick</p>
                    <p>NSW 2031</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <EnvelopeIcon className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-gray-300 text-sm">
                    <p className="font-semibold text-white">Email</p>
                    <a
                      href="mailto:sales@qualityblinds.com.au"
                      className="hover:text-blue-400 transition-colors"
                    >
                      sales@qualityblinds.com.au
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <PhoneIcon className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-gray-300 text-sm">
                    <p className="font-semibold text-white">Mobile</p>
                    <a
                      href="tel:+61029340505"
                      className="hover:text-blue-400 transition-colors"
                    >
                      +61 (02) 9340 5050
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="mt-16 pt-8 border-t border-gray-800">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-6">
                <span className="text-white">FOLLOW US</span>{" "}
                <span className="text-blue-400">TO GET A DISCOUNT</span>
              </h3>
              <div className="flex justify-center space-x-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-gray-900 p-3 rounded-full hover:bg-blue-50 hover:scale-110 transition-all duration-300 shadow-lg"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
              <p>© 2024 Quality Blinds Australia. All rights reserved.</p>
              <p className="mt-2 md:mt-0">
                Made with ❤️ for better window treatments
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-30">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
              <button
                onClick={() => setShowContactForm(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <ContactForm />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;

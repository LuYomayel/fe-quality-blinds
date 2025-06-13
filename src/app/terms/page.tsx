"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowRightIcon,
  DocumentArrowDownIcon,
  EyeIcon,
  ArrowTopRightOnSquareIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

export default function TermsPage() {
  const [viewMode, setViewMode] = useState<
    "redirect" | "embed" | "newTab" | "download"
  >("redirect");
  const [hasRedirected, setHasRedirected] = useState(false);

  // Refs para las animaciones basadas en scroll
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  // Variantes de animación
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Auto-redirect to PDF on page load
  useEffect(() => {
    if (!hasRedirected && viewMode === "redirect") {
      const timer = setTimeout(() => {
        window.open("/terms-and-con-qb-1.pdf", "_blank", "noopener,noreferrer");
        setHasRedirected(true);
      }, 1500); // Wait 1.5 seconds for page to load

      return () => clearTimeout(timer);
    }
  }, [hasRedirected, viewMode]);

  const handleViewModeChange = (
    mode: "redirect" | "embed" | "newTab" | "download"
  ) => {
    if (mode === "newTab") {
      window.open("/terms-and-con-qb-1.pdf", "_blank", "noopener,noreferrer");
    } else if (mode === "download") {
      const link = document.createElement("a");
      link.href = "/terms-and-con-qb-1.pdf";
      link.download = "Terms-and-Conditions-Quality-Blinds.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (mode === "redirect") {
      window.open("/terms-and-con-qb-1.pdf", "_blank", "noopener,noreferrer");
    } else {
      setViewMode(mode);
    }
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
                  <span className="text-white font-medium">
                    Terms & Conditions
                  </span>
                </li>
              </ol>
            </nav>
          </motion.div>

          <div className="text-center">
            <motion.h1 variants={fadeInUp} className="text-5xl font-bold mb-6">
              Terms & Conditions
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
            >
              Our comprehensive terms of service and commercial conditions. The
              PDF will open automatically in a new tab for the best viewing
              experience.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* PDF Container */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Auto-redirect notification */}
        {viewMode === "redirect" && !hasRedirected && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900">
                  Opening PDF in New Tab...
                </h3>
                <p className="text-blue-800">
                  The Terms & Conditions PDF will open automatically. If it
                  doesn&apos;t open, use the options below.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* PDF Header with View Options */}
          <div className="bg-blue-600 text-white p-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h2 className="text-xl font-semibold">
                  Quality Blinds Australia - Terms and Conditions
                </h2>
                <p className="text-blue-100 mt-1">
                  Official terms of service document
                </p>
              </div>

              {/* View Options */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleViewModeChange("newTab")}
                  className="inline-flex items-center px-3 py-2 bg-white text-blue-600 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100"
                >
                  <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-2" />
                  Open in New Tab
                </button>
                <button
                  onClick={() => handleViewModeChange("embed")}
                  className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    viewMode === "embed"
                      ? "bg-white text-blue-600"
                      : "bg-white/20 hover:bg-white/30 text-white"
                  }`}
                >
                  <EyeIcon className="h-4 w-4 mr-2" />
                  View Here
                </button>
                <button
                  onClick={() => handleViewModeChange("download")}
                  className="inline-flex items-center px-3 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
                  Download
                </button>
              </div>
            </div>
          </div>

          {/* PDF Viewer */}
          {viewMode === "embed" && (
            <div
              className="relative w-full bg-gray-100"
              style={{ height: "800px" }}
            >
              <object
                data="/terms-and-con-qb-1.pdf#zoom=page-width"
                type="application/pdf"
                width="100%"
                height="100%"
                aria-label="Terms and Conditions – Quality Blinds Australia"
              >
                {/* Fallback – rendered automatically if the PDF cannot be shown */}
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <ExclamationTriangleIcon className="h-16 w-16 text-amber-500 mb-4" />
                  <h3 className="text-lg font-semibold mb-4">
                    PDF viewer not available
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Your browser cannot display this document directly. Please
                    open it in a new tab or download it.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => handleViewModeChange("newTab")}
                      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <ArrowTopRightOnSquareIcon className="h-5 w-5 mr-2" />
                      Open in New Tab
                    </button>
                    <button
                      onClick={() => handleViewModeChange("download")}
                      className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                      Download PDF
                    </button>
                  </div>
                </div>
              </object>
            </div>
          )}
          {/* Default view when not embedding */}
          {viewMode !== "embed" && (
            <div className="p-8 text-center bg-gray-50">
              <DocumentArrowDownIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Terms & Conditions PDF
              </h3>
              <p className="text-gray-600 mb-6">
                Our terms and conditions document is available as a PDF. Choose
                your preferred viewing method below.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => handleViewModeChange("newTab")}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ArrowTopRightOnSquareIcon className="h-5 w-5 mr-2" />
                  Open in New Tab
                </button>
                <button
                  onClick={() => handleViewModeChange("embed")}
                  className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <EyeIcon className="h-5 w-5 mr-2" />
                  View on This Page
                </button>
                <button
                  onClick={() => handleViewModeChange("download")}
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                  Download PDF
                </button>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="border-t bg-gray-50 p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <p className="text-gray-600 text-sm">
                  Having trouble viewing the document?
                </p>
                <button
                  onClick={() => handleViewModeChange("newTab")}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Try opening in new tab
                </button>
              </div>
              <button
                onClick={() => handleViewModeChange("download")}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
                Download PDF
              </button>
            </div>
          </div>
        </div>

        {/* Recommended Action */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <ArrowTopRightOnSquareIcon className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Best Viewing Experience
              </h3>
              <p className="text-blue-800 mb-4">
                For optimal viewing with full PDF functionality, we recommend
                opening the document in a new browser tab. This ensures
                compatibility across all devices and browsers.
              </p>
              <button
                onClick={() => handleViewModeChange("newTab")}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-2" />
                Open PDF in New Tab
              </button>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Important Information
          </h3>
          <div className="space-y-4 text-gray-600">
            <p>
              • These terms and conditions apply to all Quality Blinds Australia
              services
            </p>
            <p>
              • By engaging our services, you automatically accept these terms
            </p>
            <p>
              • If you have questions about these terms, please contact us at
              (02) 9340 5050
            </p>
            <p>
              • Last updated: Please refer to the document for the most current
              version
            </p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg text-white p-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">
              Questions about our terms?
            </h3>
            <p className="text-blue-100 mb-4">
              Our team is here to help with any enquiries
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/about#contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Contact Us
              </Link>
              <a
                href="tel:0293405050"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                (02) 9340 5050
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { useState } from "react";
import { productData } from "@/data/productData"; // Assumes productData.ts or .js exports an array of product objects.
import Image from "next/image";

type Product = {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  images: { src: string; alt: string }[];
  relatedProducts: {
    id: string;
    name: string;
    image: string;
    alt: string;
    href: string;
    shortDescription: string;
  }[];
  variants: {
    width: string[];
    height: string[];
    color: string[];
  };
  rating: number;
  reviewCount: number;
  stock: number;
  features: string[];
  specifications: Record<string, string>;
};

const categories = [
  {
    name: "Awnings",
    subcategories: [
      "Conservatory Awnings",
      "Folding Arm Awnings",
      "Straight Drop Awnings",
      "Traditional Awnings",
      "Canopy Awning",
    ],
  },
  {
    name: "Blinds",
    subcategories: [
      "Blockout Roller Blinds",
      "Sunscreen Roller Blinds",
      "Translucent Roller Blinds",
      "Blockout Roman Blinds",
      "Translucent Roman Blinds",
      "Aluminium Venetian Blinds",
      "Basswood Venetian Blinds",
      "Cedar Venetian Blinds",
    ],
  },
  {
    name: "Curtains",
    subcategories: [
      "Blockout Curtains",
      "Curtains",
      "Sheer Curtains",
      "Veri Shades",
    ],
  },
  {
    name: "Shutters",
    subcategories: [
      "ABS",
      "ABS Waterproof",
      "Basswood Shutters",
      "Phoenixwood",
    ],
  },
  {
    name: "Other Products",
    subcategories: [
      "Louvers",
      "Polycarbonate Roofings",
      "Shade Sails",
      "Umbrellas",
      "Roller Shutters",
      "External Venetians",
    ],
  },
];

const Shop: React.FC = () => {
  // State to track which subcategories are expanded in the sidebar
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // State to track which subcategory filter is active
  const [activeFilter, setActiveFilter] = useState<string>("");

  // Filtered list of products based on activeFilter
  const filteredProducts = activeFilter
    ? (productData as Product[]).filter((prod) => prod.name === activeFilter)
    : (productData as Product[]);

  //console.log(filteredProducts);
  return (
    <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen pt-20">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 lg:w-1/5 bg-white border-r border-gray-200">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Product Categories
          </h2>
          {/* "Show filters" header (collapsible functionality is optional) */}
          <button
            className="mb-6 text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={() => setExpandedCategory(expandedCategory ? null : "all")}
          >
            {expandedCategory ? "Hide Filters" : "Show Filters"}
          </button>

          <div>
            {categories.map((cat) => (
              <div key={cat.name} className="mb-4">
                <button
                  className="w-full flex justify-between items-center text-left text-lg font-medium text-gray-700 hover:text-gray-900 focus:outline-none"
                  onClick={() =>
                    setExpandedCategory(
                      expandedCategory === cat.name ? null : cat.name
                    )
                  }
                >
                  <span>{cat.name}</span>
                  <svg
                    className={`w-5 h-5 transform transition-transform ${
                      expandedCategory === cat.name ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {expandedCategory === cat.name && (
                  <ul className="mt-2 ml-4 space-y-2">
                    {cat.subcategories.map((sub) => (
                      <li key={sub}>
                        <button
                          className={`block text-gray-600 hover:text-gray-800 focus:outline-none ${
                            activeFilter === sub
                              ? "font-semibold text-teal-600"
                              : ""
                          }`}
                          onClick={() =>
                            setActiveFilter(activeFilter === sub ? "" : sub)
                          }
                        >
                          {sub}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            {/* "Clear Filters" button */}
            {activeFilter && (
              <button
                className="mt-4 text-teal-600 hover:text-teal-800 font-medium focus:outline-none"
                onClick={() => setActiveFilter("")}
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Shop All Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="relative bg-white shadow-md rounded-lg overflow-hidden group"
            >
              {/* Product Image Container */}
              <div className="w-full h-48 overflow-hidden">
                <Image
                  src={
                    product.images[0]?.src || "/images/aluminium-shutter-1.webp"
                  }
                  alt={product.images[0]?.alt || product.name}
                  width={400}
                  height={192}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  loading={index < 3 ? "eager" : "lazy"}
                />
              </div>

              {/* Overlay on hover */}
              <div className="absolute inset-0 z-0 bg-black/0 group-hover:bg-black/50 transition-opacity duration-200 flex items-center justify-center px-4 text-center pointer-events-none">
                <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {product.shortDescription}
                </p>
              </div>

              {/* Product Name */}
              <div className="relative z-10 p-4">
                <h2 className="text-lg font-medium text-gray-800">
                  {product.name}
                </h2>
              </div>
            </div>
          ))}
        </div>

        {/* If no products match filter */}
        {filteredProducts.length === 0 && (
          <p className="mt-8 text-center text-gray-500">
            No products found in this category.
          </p>
        )}
      </main>
    </div>
  );
};

export default Shop;

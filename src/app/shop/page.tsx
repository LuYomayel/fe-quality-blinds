"use client";
import React, { useState } from "react";
import { productData } from "@/data/productData"; // Assumes productData.ts or .js exports an array of product objects.
import Image from "next/image";
import Link from "next/link";

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

// Helper function to generate the correct product route
const getProductRoute = (productId: string): string => {
  // Determine the main category based on product ID
  if (productId.includes("awning")) {
    return `/awnings/${productId}`;
  } else if (
    productId.includes("curtain") ||
    productId.includes("sheer") ||
    productId.includes("veri-shade")
  ) {
    return `/curtains/${productId}`;
  } else if (productId.includes("shutter")) {
    return `/shutters/${productId}`;
  } else if (productId.includes("roman")) {
    return `/blinds/roman/${productId}`;
  } else if (productId.includes("roller")) {
    return `/blinds/roller/${productId}`;
  } else if (
    productId.includes("venetian") ||
    productId.includes("aluminium") ||
    productId.includes("basswood")
  ) {
    return `/blinds/venetian/${productId}`;
  } else {
    // Default fallback - could be improved based on your product structure
    return `/shop/${productId}`;
  }
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
            <article
              key={product.id}
              className="relative bg-white shadow-md rounded-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
            >
              <Link
                href={getProductRoute(product.id)}
                aria-label={`View details for ${product.name} - ${product.shortDescription}`}
                className="block"
              >
                {/* Product Image Container */}
                <div className="w-full h-48 overflow-hidden">
                  <Image
                    src={
                      product.images[0]?.src ||
                      "/images/aluminium-shutter-1.webp"
                    }
                    alt={`${product.name} - Premium window treatment by Quality Blinds Australia`}
                    width={400}
                    height={192}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    loading={index < 8 ? "eager" : "lazy"}
                  />
                </div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 z-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center px-4 text-center">
                  <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm mb-2">{product.shortDescription}</p>
                    <span className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1 rounded-full transition-colors">
                      View Details
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="relative z-10 p-4 bg-white">
                  <h2 className="text-lg font-medium text-gray-800 group-hover:text-blue-700 transition-colors">
                    {product.name}
                  </h2>

                  {product.rating > 0 && (
                    <div className="flex items-center mt-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">
                        ({product.rating})
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* If no products match filter */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No products found
            </h3>
            <p className="mt-1 text-gray-500">
              No products match the selected filter. Try clearing filters or
              selecting a different category.
            </p>
            <button
              onClick={() => setActiveFilter("")}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Shop;

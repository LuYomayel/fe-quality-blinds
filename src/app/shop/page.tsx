"use client";
import React, { useState, useRef } from "react";
import { productData } from "@/data/productData"; // Assumes productData.ts or .js exports an array of product objects.
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  Squares2X2Icon,
  ListBulletIcon,
  FunnelIcon,
  EyeIcon,
  HeartIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import {
  StarIcon as StarIconSolid,
  HeartIcon as HeartIconSolid,
} from "@heroicons/react/24/solid";

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

  // New states for improved functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [favoriteProducts, setFavoriteProducts] = useState<Set<string>>(
    new Set()
  );
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  // Refs for animations
  const heroRef = useRef(null);
  const filtersRef = useRef(null);
  const productsRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isFiltersInView = useInView(filtersRef, {
    once: true,
    margin: "-100px",
  });
  const isProductsInView = useInView(productsRef, {
    once: true,
    margin: "-50px",
  });

  // Enhanced filtering logic
  const filteredProducts = (productData as Product[]).filter((product) => {
    const matchesCategory = !activeFilter || product.name === activeFilter;
    const matchesSearch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.shortDescription
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Toggle favorite
  const toggleFavorite = (productId: string) => {
    const newFavorites = new Set(favoriteProducts);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavoriteProducts(newFavorites);
  };

  // Animation variants
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

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const productCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white pt-20 pb-16"
        initial="hidden"
        animate={isHeroInView ? "visible" : "hidden"}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('/images/blinds-pattern.png')] opacity-10"></div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center">
            <motion.div variants={fadeInUp}>
              <nav className="flex justify-center mb-8" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2 text-blue-200">
                  <li>
                    <Link
                      href="/"
                      className="hover:text-white transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 mx-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-white font-medium">Shop</span>
                  </li>
                </ol>
              </nav>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              Our Store
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8"
            >
              Discover our extensive range of blinds, curtains, awnings and
              more. Premium quality to transform your home.
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              className="flex flex-wrap justify-center gap-8 mt-12"
              variants={staggerContainer}
            >
              {[
                { number: `${productData.length}+`, label: "Products" },
                { number: "5", label: "Categories" },
                { number: "30+", label: "Years Experience" },
                { number: "1000+", label: "Happy Clients" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl font-bold text-white">
                    {stat.number}
                  </div>
                  <div className="text-blue-200 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
        {/* Enhanced Sidebar */}
        <motion.aside
          ref={filtersRef}
          className="w-full lg:w-80 bg-white shadow-lg lg:sticky lg:top-20 lg:h-fit"
          initial="hidden"
          animate={isFiltersInView ? "visible" : "hidden"}
          variants={fadeInLeft}
        >
          <div className="p-6">
            {/* Search Bar */}
            <motion.div className="mb-8" variants={fadeInUp}>
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </motion.div>

            {/* Filter Header */}
            <motion.div
              className="flex items-center justify-between mb-6"
              variants={fadeInUp}
            >
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                <FunnelIcon className="h-6 w-6 mr-2 text-blue-600" />
                Categories
              </h2>
              <button
                className="lg:hidden flex items-center text-gray-600 hover:text-gray-800 focus:outline-none"
                onClick={() =>
                  setExpandedCategory(expandedCategory ? null : "all")
                }
              >
                <AdjustmentsHorizontalIcon className="h-5 w-5 mr-1" />
                {expandedCategory ? "Hide" : "Show"}
              </button>
            </motion.div>

            {/* Categories */}
            <motion.div variants={staggerContainer}>
              {categories.map((cat) => (
                <motion.div
                  key={cat.name}
                  className="mb-4 border-b border-gray-100 pb-4"
                  variants={fadeInUp}
                >
                  <button
                    className="w-full flex justify-between items-center text-left text-lg font-medium text-gray-700 hover:text-blue-600 focus:outline-none group transition-colors"
                    onClick={() =>
                      setExpandedCategory(
                        expandedCategory === cat.name ? null : cat.name
                      )
                    }
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {cat.name}
                    </span>
                    <motion.svg
                      className="w-5 h-5 text-gray-400 group-hover:text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{
                        rotate: expandedCategory === cat.name ? 180 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </motion.svg>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedCategory === cat.name ? "auto" : 0,
                      opacity: expandedCategory === cat.name ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <ul className="mt-3 ml-4 space-y-3">
                      {cat.subcategories.map((sub) => (
                        <motion.li
                          key={sub}
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <button
                            className={`block text-gray-600 hover:text-blue-600 focus:outline-none transition-colors ${
                              activeFilter === sub
                                ? "font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-md"
                                : ""
                            }`}
                            onClick={() =>
                              setActiveFilter(activeFilter === sub ? "" : sub)
                            }
                          >
                            {sub}
                          </button>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Clear Filters */}
            {(activeFilter || searchQuery) && (
              <motion.button
                className="w-full mt-6 bg-red-50 text-red-600 hover:bg-red-100 font-medium py-3 px-4 rounded-lg transition-colors"
                onClick={() => {
                  setActiveFilter("");
                  setSearchQuery("");
                }}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Clear Filters
              </motion.button>
            )}
          </div>
        </motion.aside>

        {/* Enhanced Main Content */}
        <main className="flex-1 p-6">
          {/* Header with view controls */}
          <motion.div
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {activeFilter || "All Products"}
              </h1>
              <p className="text-gray-600">
                {filteredProducts.length} product
                {filteredProducts.length !== 1 ? "s" : ""} found
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-white rounded-lg border shadow-sm">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 rounded-l-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                title="Grid view"
              >
                <Squares2X2Icon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 rounded-r-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                title="List view"
              >
                <ListBulletIcon className="h-5 w-5" />
              </button>
            </div>
          </motion.div>

          {/* Products Grid */}
          <motion.div
            ref={productsRef}
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            }`}
            initial="hidden"
            animate={isProductsInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            {filteredProducts.map((product, index) => (
              <motion.article
                key={product.id}
                className={`group relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                  viewMode === "list" ? "flex items-center" : ""
                }`}
                variants={productCardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                onHoverStart={() => setHoveredProduct(product.id)}
                onHoverEnd={() => setHoveredProduct(null)}
              >
                <Link
                  href={getProductRoute(product.id)}
                  className={`block ${
                    viewMode === "list" ? "flex w-full" : ""
                  }`}
                >
                  {/* Product Image */}
                  <div
                    className={`relative overflow-hidden ${
                      viewMode === "list"
                        ? "w-48 h-32 flex-shrink-0"
                        : "w-full h-64"
                    }`}
                  >
                    <Image
                      src={
                        product.images[0]?.src ||
                        "/images/aluminium-shutter-1.webp"
                      }
                      alt={`${product.name} - Premium window treatment by Quality Blinds Australia`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      loading={index < 8 ? "eager" : "lazy"}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Quick Actions */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <motion.button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(product.id);
                        }}
                        className="p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Add to favourites"
                      >
                        {favoriteProducts.has(product.id) ? (
                          <HeartIconSolid className="h-5 w-5 text-red-500" />
                        ) : (
                          <HeartIcon className="h-5 w-5 text-gray-600" />
                        )}
                      </motion.button>

                      <motion.button
                        className="p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-colors opacity-0 group-hover:opacity-100"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Quick view"
                      >
                        <EyeIcon className="h-5 w-5 text-gray-600" />
                      </motion.button>
                    </div>

                    {/* Quick View Button */}
                    {hoveredProduct === product.id && viewMode === "grid" && (
                      <motion.div
                        className="absolute bottom-4 left-4 right-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                          <ShoppingBagIcon className="h-4 w-4" />
                          Request Quote
                        </button>
                      </motion.div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                    <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                      {product.name}
                    </h2>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.shortDescription}
                    </p>

                    {/* Rating */}
                    {product.rating > 0 && (
                      <div className="flex items-center mb-4">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <StarIconSolid
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 ml-2">
                          ({product.rating}) • {product.reviewCount || 0}{" "}
                          reviews
                        </span>
                      </div>
                    )}

                    {/* Features Preview */}
                    {product.features && product.features.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {product.features.slice(0, 2).map((feature, idx) => (
                            <span
                              key={idx}
                              className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                          {product.features.length > 2 && (
                            <span className="inline-block text-gray-500 text-xs px-2 py-1">
                              +{product.features.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {viewMode === "list" && (
                      <motion.button
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ShoppingBagIcon className="h-4 w-4" />
                        View Details
                      </motion.button>
                    )}
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>

          {/* No Products Found */}
          {filteredProducts.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <MagnifyingGlassIcon className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  No products found
                </h3>
                <p className="text-gray-600 mb-8">
                  No products match your selected filters. Try adjusting your
                  search criteria.
                </p>
                <motion.button
                  onClick={() => {
                    setActiveFilter("");
                    setSearchQuery("");
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear Filters
                </motion.button>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;

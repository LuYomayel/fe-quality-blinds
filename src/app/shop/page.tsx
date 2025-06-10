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

  // Advanced filter states
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(
    new Set()
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  // New states for improved functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [favoriteProducts, setFavoriteProducts] = useState<Set<string>>(
    new Set()
  );

  // Filter visibility state
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

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

  // Advanced filter options
  const roomTypes = [
    "Living Room",
    "Bedroom",
    "Kitchen",
    "Bathroom",
    "Office",
    "Dining Room",
    "Outdoor",
    "Conservatory",
    "Study",
    "Children's Room",
  ];

  const materialTypes = [
    "Fabric",
    "Aluminum",
    "Wood",
    "PVC",
    "Bamboo",
    "Vinyl",
    "Canvas",
    "Acrylic",
    "Sunscreen",
    "Blockout",
  ];

  const colorOptions = [
    "White",
    "Black",
    "Grey",
    "Brown",
    "Beige",
    "Blue",
    "Green",
    "Red",
    "Natural",
    "Cream",
  ];

  const featureOptions = [
    "UV Protection",
    "Blockout",
    "Light Filtering",
    "Easy Clean",
    "Water Resistant",
    "Fire Retardant",
    "Energy Efficient",
    "Motorized",
    "Remote Control",
    "Child Safe",
  ];

  // Enhanced filtering logic with advanced filters
  const filteredProducts = (productData as Product[]).filter((product) => {
    // Basic category filter
    const matchesCategory = !activeFilter || product.name === activeFilter;

    // Search filter
    const matchesSearch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.shortDescription
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    // Room filter - check if product is suitable for selected room
    const matchesRoom =
      !selectedRoom ||
      product.description.toLowerCase().includes(selectedRoom.toLowerCase()) ||
      product.features.some((feature) =>
        feature.toLowerCase().includes(selectedRoom.toLowerCase())
      );

    // Material filter - check product name, description, or specifications
    const matchesMaterial =
      !selectedMaterial ||
      product.name.toLowerCase().includes(selectedMaterial.toLowerCase()) ||
      product.description
        .toLowerCase()
        .includes(selectedMaterial.toLowerCase()) ||
      Object.values(product.specifications).some((spec) =>
        spec.toLowerCase().includes(selectedMaterial.toLowerCase())
      );

    // Color filter - check variants or description
    const matchesColor =
      !selectedColor ||
      product.variants.color.some((color) =>
        color.toLowerCase().includes(selectedColor.toLowerCase())
      ) ||
      product.description.toLowerCase().includes(selectedColor.toLowerCase());

    // Features filter - all selected features must be present
    const matchesFeatures =
      selectedFeatures.size === 0 ||
      Array.from(selectedFeatures).every(
        (feature) =>
          product.features.some((productFeature) =>
            productFeature.toLowerCase().includes(feature.toLowerCase())
          ) || product.description.toLowerCase().includes(feature.toLowerCase())
      );

    return (
      matchesCategory &&
      matchesSearch &&
      matchesRoom &&
      matchesMaterial &&
      matchesColor &&
      matchesFeatures
    );
  });

  // Helper functions for advanced filters
  const toggleFeature = (feature: string) => {
    const newFeatures = new Set(selectedFeatures);
    if (newFeatures.has(feature)) {
      newFeatures.delete(feature);
    } else {
      newFeatures.add(feature);
    }
    setSelectedFeatures(newFeatures);
  };

  const clearAllFilters = () => {
    setActiveFilter("");
    setSearchQuery("");
    setSelectedRoom("");
    setSelectedMaterial("");
    setSelectedColor("");
    setSelectedFeatures(new Set());
    setPriceRange([0, 1000]);
  };

  const hasActiveFilters =
    activeFilter ||
    searchQuery ||
    selectedRoom ||
    selectedMaterial ||
    selectedColor ||
    selectedFeatures.size > 0;

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
      {/* Hero Section - Optimizado para móvil */}
      <motion.section
        ref={heroRef}
        className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white pt-16 sm:pt-20 pb-12 sm:pb-16"
        initial="hidden"
        animate={isHeroInView ? "visible" : "hidden"}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('/images/blinds-pattern.png')] opacity-10"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div variants={fadeInUp}>
              <nav
                className="flex justify-center mb-6 sm:mb-8"
                aria-label="Breadcrumb"
              >
                <ol className="flex items-center space-x-2 text-blue-200">
                  <li>
                    <Link
                      href="/"
                      className="hover:text-white transition-colors text-sm sm:text-base"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 mx-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-white font-medium text-sm sm:text-base">
                      Shop
                    </span>
                  </li>
                </ol>
              </nav>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
            >
              Our Store
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg lg:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4"
            >
              Discover our extensive range of blinds, curtains, awnings and
              more. Premium quality to transform your home.
            </motion.p>

            {/* Quick Stats - Optimizado para móvil */}
            <motion.div
              className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-4 sm:gap-8 mt-8 sm:mt-12"
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
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                    {stat.number}
                  </div>
                  <div className="text-blue-200 text-xs sm:text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Main Content - Layout responsivo mejorado */}
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Enhanced Sidebar - Optimizado para móvil */}
        <motion.aside
          ref={filtersRef}
          className="w-full lg:w-80 xl:w-96 bg-white shadow-lg rounded-lg lg:sticky lg:top-20 lg:h-fit order-2 lg:order-1"
          initial="hidden"
          animate={isFiltersInView ? "visible" : "hidden"}
          variants={fadeInLeft}
        >
          <div className="p-4 sm:p-6">
            {/* Search Bar - Mejorado para móvil */}
            <motion.div className="mb-6 sm:mb-8" variants={fadeInUp}>
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                />
              </div>
            </motion.div>

            {/* View Mode Toggle - Solo móvil/tablet */}
            <motion.div
              className="mb-6 sm:mb-8 lg:hidden flex items-center justify-between"
              variants={fadeInUp}
            >
              <h3 className="text-lg font-semibold text-gray-800">View Mode</h3>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === "grid"
                      ? "bg-white shadow text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Squares2X2Icon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === "list"
                      ? "bg-white shadow text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <ListBulletIcon className="h-4 w-4" />
                </button>
              </div>
            </motion.div>

            {/* Filter Header - Mejorado */}
            <motion.div
              className="flex items-center justify-between mb-4 sm:mb-6"
              variants={fadeInUp}
            >
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 flex items-center">
                <FunnelIcon className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-blue-600" />
                Filters
              </h2>
              <button
                className="lg:hidden flex items-center text-gray-600 hover:text-gray-800 focus:outline-none text-sm touch-manipulation"
                onClick={() =>
                  setExpandedCategory(expandedCategory ? null : "all")
                }
              >
                <AdjustmentsHorizontalIcon className="h-4 w-4 mr-1" />
                {expandedCategory ? "Hide" : "Show"}
              </button>
            </motion.div>

            {/* Advanced Filters Toggle */}
            <motion.div className="mb-4 sm:mb-6" variants={fadeInUp}>
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="w-full flex items-center justify-between p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <span className="font-medium">Advanced Filters</span>
                <motion.svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: showAdvancedFilters ? 180 : 0 }}
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
            </motion.div>

            {/* Advanced Filters Section */}
            <motion.div
              initial={false}
              animate={{
                height: showAdvancedFilters ? "auto" : 0,
                opacity: showAdvancedFilters ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden mb-6"
            >
              <div className="space-y-4 sm:space-y-6">
                {/* Room Filter */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-700">
                      Room Type
                    </h3>
                    <span className="text-xs text-gray-500 italic">
                      Perfect for...
                    </span>
                  </div>
                  <select
                    value={selectedRoom}
                    onChange={(e) => setSelectedRoom(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="">All Rooms</option>
                    {roomTypes.map((room) => (
                      <option key={room} value={room}>
                        {room}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Material Filter */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-700">
                      Material
                    </h3>
                    <span className="text-xs text-gray-500 italic">
                      Quality matters
                    </span>
                  </div>
                  <select
                    value={selectedMaterial}
                    onChange={(e) => setSelectedMaterial(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="">All Materials</option>
                    {materialTypes.map((material) => (
                      <option key={material} value={material}>
                        {material}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Color Filter */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-700">
                      Color
                    </h3>
                    <span className="text-xs text-gray-500 italic">
                      Match your style
                    </span>
                  </div>
                  <select
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="">All Colors</option>
                    {colorOptions.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range Filter */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-700">
                      Price Range
                    </h3>
                    <span className="text-xs text-gray-500 italic">
                      Budget friendly
                    </span>
                  </div>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      step="50"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([0, parseInt(e.target.value)])
                      }
                      className="w-full accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>$0</span>
                      <span className="font-medium text-blue-600">
                        ${priceRange[1]}+
                      </span>
                    </div>
                  </div>
                </div>

                {/* Features Filter */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-700">
                      Features
                    </h3>
                    <span className="text-xs text-gray-500 italic">
                      {selectedFeatures.size > 0 &&
                        `${selectedFeatures.size} selected`}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-2">
                    {featureOptions.map((feature) => (
                      <label
                        key={feature}
                        className="flex items-center space-x-2 text-sm cursor-pointer hover:bg-blue-50 p-2 rounded transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={selectedFeatures.has(feature)}
                          onChange={() => toggleFeature(feature)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                        />
                        <span className="text-gray-700 flex-1">{feature}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Basic Categories - Mejorado para móvil */}
            <motion.div
              variants={staggerContainer}
              className={`space-y-3 sm:space-y-4 ${
                expandedCategory ? "block" : "hidden lg:block"
              }`}
            >
              {categories.map((cat) => (
                <motion.div
                  key={cat.name}
                  className="pb-3 sm:pb-4 border-b border-gray-100 last:border-b-0"
                  variants={fadeInUp}
                >
                  <button
                    className="w-full flex justify-between items-center text-left text-base sm:text-lg font-medium text-gray-700 hover:text-blue-600 focus:outline-none group transition-colors touch-manipulation"
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
                      className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-blue-600"
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
                    <div className="pt-3 space-y-2">
                      {cat.subcategories.map((subcat) => (
                        <button
                          key={subcat}
                          onClick={() =>
                            setActiveFilter(
                              activeFilter === subcat ? "" : subcat
                            )
                          }
                          className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors touch-manipulation ${
                            activeFilter === subcat
                              ? "bg-blue-50 text-blue-700 font-medium"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                          }`}
                        >
                          {subcat}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full mt-4 sm:mt-6 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium touch-manipulation border border-red-200"
                onClick={clearAllFilters}
              >
                Clear All Filters (
                {
                  [
                    activeFilter,
                    searchQuery,
                    selectedRoom,
                    selectedMaterial,
                    selectedColor,
                    ...(selectedFeatures.size > 0
                      ? [`${selectedFeatures.size} features`]
                      : []),
                  ].filter(Boolean).length
                }
                )
              </motion.button>
            )}
          </div>
        </motion.aside>

        {/* Products Grid - Optimizado para móvil */}
        <motion.main
          ref={productsRef}
          className="flex-1 order-1 lg:order-2"
          initial="hidden"
          animate={isProductsInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          {/* Products Header con filtros activos */}
          <motion.div
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8"
            variants={fadeInUp}
          >
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                Our Products
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-gray-600">
                  {filteredProducts.length} products found
                </span>
                {hasActiveFilters && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {[
                      activeFilter && "Category",
                      searchQuery && "Search",
                      selectedRoom && "Room",
                      selectedMaterial && "Material",
                      selectedColor && "Color",
                      selectedFeatures.size > 0 &&
                        `${selectedFeatures.size} Features`,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                )}
              </div>
            </div>

            {/* View Toggle - Solo desktop */}
            <div className="hidden lg:flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-all ${
                  viewMode === "grid"
                    ? "bg-white shadow text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Squares2X2Icon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-all ${
                  viewMode === "list"
                    ? "bg-white shadow text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <ListBulletIcon className="h-5 w-5" />
              </button>
            </div>
          </motion.div>

          {/* Products Grid/List - Layout responsivo */}
          {filteredProducts.length > 0 ? (
            <motion.div
              className={`gap-4 sm:gap-6 ${
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                  : "flex flex-col space-y-4"
              }`}
              variants={staggerContainer}
            >
              {filteredProducts.map((product) => (
                <motion.article
                  key={product.id}
                  variants={productCardVariants}
                  whileHover={{ y: -4 }}
                  className={`bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 group ${
                    viewMode === "list"
                      ? "flex flex-col sm:flex-row overflow-hidden"
                      : ""
                  }`}
                >
                  <Link href={getProductRoute(product.id)} className="block">
                    <div
                      className={`relative overflow-hidden ${
                        viewMode === "list"
                          ? "sm:w-48 sm:h-48 aspect-square sm:aspect-auto"
                          : "aspect-[4/3]"
                      } ${
                        viewMode === "grid"
                          ? "rounded-t-lg"
                          : "sm:rounded-l-lg sm:rounded-t-none rounded-t-lg"
                      }`}
                    >
                      <Image
                        src={
                          product.images[0]?.src || "/images/placeholder.webp"
                        }
                        alt={product.images[0]?.alt || product.name}
                        fill
                        sizes={
                          viewMode === "list"
                            ? "(max-width: 640px) 100vw, 192px"
                            : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        }
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />

                      {/* Overlay Actions */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleFavorite(product.id);
                            }}
                            className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors touch-manipulation"
                            aria-label={`${
                              favoriteProducts.has(product.id)
                                ? "Remove from"
                                : "Add to"
                            } favorites`}
                          >
                            {favoriteProducts.has(product.id) ? (
                              <HeartIconSolid className="h-4 w-4 text-red-500" />
                            ) : (
                              <HeartIcon className="h-4 w-4 text-gray-600" />
                            )}
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors touch-manipulation"
                            aria-label="Quick view"
                          >
                            <EyeIcon className="h-4 w-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`p-4 sm:p-6 ${
                        viewMode === "list" ? "flex-1" : ""
                      }`}
                    >
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-3 leading-relaxed">
                        {product.shortDescription}
                      </p>

                      {/* Features */}
                      {product.features && product.features.length > 0 && (
                        <div className="mb-3 sm:mb-4">
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            {product.features
                              .slice(0, 3)
                              .map((feature, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium"
                                >
                                  {feature}
                                </span>
                              ))}
                          </div>
                        </div>
                      )}

                      {/* Rating and Stock */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <StarIconSolid className="h-4 w-4 text-yellow-400" />
                          <span className="font-medium">
                            {product.rating || "New"}
                          </span>
                          {product.reviewCount > 0 && (
                            <span className="text-gray-500">
                              ({product.reviewCount})
                            </span>
                          )}
                        </div>
                        <span className="text-green-600 font-medium">
                          In Stock
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 sm:py-16"
            >
              <div className="max-w-md mx-auto">
                <div className="mb-4">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-3-3v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or filter criteria.
                </p>
                <button
                  onClick={() => {
                    setActiveFilter("");
                    setSearchQuery("");
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium touch-manipulation"
                >
                  Clear all filters
                </button>
              </div>
            </motion.div>
          )}
        </motion.main>
      </div>
    </div>
  );
};

export default Shop;

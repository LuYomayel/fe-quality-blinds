"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/24/solid";
import {
  StarIcon as StarOutlineIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import QuoteDialog from "./QuoteDialog";
import { Product } from "@/data/productData";

interface ProductDetailProps {
  product: Product;
}

const smoothScroll = (
  e: React.MouseEvent<HTMLAnchorElement>,
  targetId: string
) => {
  e.preventDefault();
  const element = document.getElementById(targetId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [visibleThumbnails, setVisibleThumbnails] = useState(4);
  const [imageLoading, setImageLoading] = useState(false);

  const heroRef = useRef(null);
  const galleryRef = useRef(null);
  const detailsRef = useRef(null);
  const relatedRef = useRef(null);
  const mainImageRef = useRef<HTMLDivElement>(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isGalleryInView = useInView(galleryRef, {
    once: true,
    margin: "-100px",
  });
  const isDetailsInView = useInView(detailsRef, {
    once: true,
    margin: "-100px",
  });
  const isRelatedInView = useInView(relatedRef, {
    once: true,
    margin: "-100px",
  });

  // Calcular tamaños responsive
  const getThumbnailSize = () => {
    if (containerWidth === 0) return 80;
    if (containerWidth < 640) return 60; // mobile
    if (containerWidth < 1024) return 70; // tablet
    return 80; // desktop
  };

  const thumbnailSize = getThumbnailSize();
  const gap = 12;
  const arrowSpace = 64;

  // Calcular cuántas miniaturas caben
  useEffect(() => {
    const calculateVisibleThumbnails = () => {
      if (containerWidth === 0) return;
      const availableWidth = containerWidth - arrowSpace;
      const thumbnailWithGap = thumbnailSize + gap;
      const maxThumbnails = Math.floor(
        (availableWidth + gap) / thumbnailWithGap
      );
      setVisibleThumbnails(
        Math.max(1, Math.min(maxThumbnails, product.images?.length || 0))
      );
    };
    calculateVisibleThumbnails();
  }, [containerWidth, thumbnailSize, product.images?.length]);

  // Medir el ancho del contenedor
  useEffect(() => {
    const measureContainer = () => {
      if (mainImageRef.current) {
        setContainerWidth(mainImageRef.current.offsetWidth);
      }
    };
    measureContainer();
    window.addEventListener("resize", measureContainer);
    return () => window.removeEventListener("resize", measureContainer);
  }, []);

  // Reset thumbnail index when visible thumbnails change
  useEffect(() => {
    setThumbnailStartIndex(0);
  }, [visibleThumbnails]);

  // Memoize breadcrumbs calculation
  const breadcrumbs = useMemo(() => {
    const crumbs = [{ name: "Home", href: "/" }];

    // Determine category and routes based on product ID
    if (product.id.includes("roller") && product.id.includes("blind")) {
      crumbs.push(
        { name: "Blinds", href: "/blinds" }, // Now use /blinds since the page exists
        { name: "Roller Blinds", href: "/blinds/roller" }
      );
    } else if (product.id.includes("roman") && product.id.includes("blind")) {
      crumbs.push(
        { name: "Blinds", href: "/blinds" },
        { name: "Roman Blinds", href: "/blinds/roman" }
      );
    } else if (
      product.id.includes("venetian") &&
      product.id.includes("blind")
    ) {
      crumbs.push(
        { name: "Blinds", href: "/blinds" },
        { name: "Venetian Blinds", href: "/blinds/venetian" }
      );
    } else if (product.id.includes("awning")) {
      crumbs.push({ name: "Awnings", href: "/shop" });
    } else if (
      product.id.includes("curtain") ||
      product.id.includes("sheer") ||
      product.id.includes("veri-shade")
    ) {
      crumbs.push({ name: "Curtains", href: "/shop" });
    } else if (product.id.includes("shutter")) {
      crumbs.push({ name: "Shutters", href: "/shop" });
      // No intermediate categories for shutters since ABS, Basswood pages don't exist
    } else {
      crumbs.push({ name: "Other Products", href: "/shop" });
    }

    // Add current product as final breadcrumb
    crumbs.push({ name: product.name, href: "#" });

    return crumbs;
  }, [product.id, product.name]);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className="text-yellow-400">
        {index < Math.floor(rating) ? (
          <StarIcon className="h-5 w-5" aria-hidden="true" />
        ) : (
          <StarOutlineIcon className="h-5 w-5" aria-hidden="true" />
        )}
      </span>
    ));
  };

  const handleThumbnailScroll = (direction: "left" | "right") => {
    if (!product.images) return;
    if (direction === "left") {
      setThumbnailStartIndex(Math.max(0, thumbnailStartIndex - 1));
    } else {
      setThumbnailStartIndex(
        Math.min(
          product.images.length - visibleThumbnails,
          thumbnailStartIndex + 1
        )
      );
    }
  };

  const needsNavigation =
    product.images && product.images.length > visibleThumbnails;
  const canScrollLeft = thumbnailStartIndex > 0;
  const canScrollRight =
    product.images &&
    thumbnailStartIndex < product.images.length - visibleThumbnails;

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <article
      className="bg-white min-h-screen"
      itemScope
      itemType="https://schema.org/Product"
    >
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white pb-16 pt-20"
        initial="hidden"
        animate={isHeroInView ? "visible" : "hidden"}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-[url('/images/product-hero-pattern.png')] opacity-10"></div>

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div variants={fadeInUp}>
            {/* Breadcrumbs */}
            <nav
              className="flex justify-center lg:justify-start mb-6"
              aria-label="Breadcrumb"
            >
              <ol
                className="flex items-center space-x-2 text-blue-200"
                itemScope
                itemType="https://schema.org/BreadcrumbList"
              >
                {breadcrumbs.map((crumb, index) => (
                  <li
                    key={crumb.href}
                    className="flex items-center"
                    itemProp="itemListElement"
                    itemScope
                    itemType="https://schema.org/ListItem"
                  >
                    {index > 0 && <ArrowRightIcon className="w-4 h-4 mx-2" />}
                    <Link
                      href={crumb.href}
                      className={`hover:text-white transition-colors ${
                        index === breadcrumbs.length - 1
                          ? "text-white font-medium"
                          : ""
                      }`}
                      itemProp="item"
                    >
                      <span itemProp="name">{crumb.name}</span>
                    </Link>
                    <meta itemProp="position" content={String(index + 1)} />
                  </li>
                ))}
              </ol>
            </nav>

            {/* Hero Content */}
            <div className="text-center lg:text-left max-w-4xl">
              <motion.h1
                className="text-5xl lg:text-6xl font-bold mb-6"
                itemProp="name"
                variants={fadeInUp}
              >
                {product.name}
              </motion.h1>

              <motion.p
                className="text-xl text-blue-100 mb-6 max-w-3xl"
                itemProp="description"
                variants={fadeInUp}
              >
                {product.shortDescription}
              </motion.p>

              {product.rating > 0 && (
                <motion.div
                  className="flex items-center justify-center lg:justify-start space-x-2 mb-6"
                  itemProp="aggregateRating"
                  itemScope
                  itemType="https://schema.org/AggregateRating"
                  variants={fadeInUp}
                >
                  <div
                    className="flex"
                    role="img"
                    aria-label={`${product.rating} out of 5 stars`}
                  >
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-blue-200 ml-2">
                    ({product.rating}/5)
                  </span>
                  <meta
                    itemProp="ratingValue"
                    content={String(product.rating)}
                  />
                  <meta itemProp="bestRating" content="5" />
                  <meta itemProp="worstRating" content="1" />
                  <meta itemProp="reviewCount" content="1" />
                </motion.div>
              )}

              <motion.div
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
                variants={fadeInUp}
              >
                <motion.button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="bg-white text-blue-900 font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-lg hover:bg-blue-50 transition-colors text-sm sm:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Get a free quote for ${product.name}`}
                >
                  Get Free Quote & Consultation
                </motion.button>
                <motion.a
                  href="#gallery"
                  onClick={(e) => smoothScroll(e, "gallery")}
                  className="border-2 border-white text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-lg hover:bg-white hover:text-blue-900 transition-colors inline-flex items-center justify-center gap-2 text-sm sm:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Gallery
                  <ArrowRightIcon className="w-4 h-4" />
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Product Gallery Section */}
      <motion.section
        id="gallery"
        ref={galleryRef}
        className="py-12 bg-gray-50"
        initial="hidden"
        animate={isGalleryInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-8 sm:mb-10" variants={fadeInUp}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Product Gallery
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Explore detailed images of {product.name} to see the quality and
              craftsmanship up close.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start"
            variants={cardVariants}
          >
            {/* Main Image */}
            <div className="space-y-3 sm:space-y-4">
              {product.images && product.images.length > 0 ? (
                <>
                  <motion.div
                    ref={mainImageRef}
                    className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      key={selectedImage}
                      src={product.images[selectedImage].src}
                      alt={`${product.name} - ${product.images[selectedImage].alt}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                      className={`object-cover transition-opacity duration-300 ${
                        imageLoading ? "opacity-0" : "opacity-100"
                      }`}
                      priority={selectedImage === 0}
                      itemProp="image"
                      onLoad={() => setImageLoading(false)}
                    />
                  </motion.div>

                  {/* Thumbnail Navigation */}
                  <div className="relative w-full">
                    {needsNavigation && canScrollLeft && (
                      <button
                        onClick={() => handleThumbnailScroll("left")}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white shadow-lg rounded-full p-1.5 sm:p-2 transition-all duration-200 hover:shadow-xl"
                      >
                        <ChevronLeftIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                      </button>
                    )}

                    <div
                      className={`flex justify-center gap-2 sm:gap-3 overflow-hidden ${
                        needsNavigation ? "px-6 sm:px-8" : "px-0"
                      }`}
                    >
                      {product.images
                        .slice(
                          thumbnailStartIndex,
                          thumbnailStartIndex + visibleThumbnails
                        )
                        .map((image, index) => {
                          const actualIndex = thumbnailStartIndex + index;
                          return (
                            <motion.button
                              key={actualIndex}
                              onClick={() => {
                                setImageLoading(true);
                                setSelectedImage(actualIndex);
                              }}
                              className={`relative flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                                selectedImage === actualIndex
                                  ? "border-blue-500 ring-2 ring-blue-200 shadow-lg"
                                  : "border-transparent hover:border-gray-300 hover:shadow-md"
                              }`}
                              style={{
                                width: `${thumbnailSize}px`,
                                height: `${thumbnailSize}px`,
                              }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Image
                                src={image.src}
                                alt={`${product.name} miniatura ${
                                  actualIndex + 1
                                }`}
                                fill
                                className="object-cover"
                                loading="lazy"
                              />
                            </motion.button>
                          );
                        })}
                    </div>

                    {needsNavigation && canScrollRight && (
                      <button
                        onClick={() => handleThumbnailScroll("right")}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white shadow-lg rounded-full p-1.5 sm:p-2 transition-all duration-200 hover:shadow-xl"
                      >
                        <ChevronRightIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    No images available for {product.name}
                  </div>
                </div>
              )}
            </div>

            {/* Product Information */}
            <div className="space-y-4 sm:space-y-6">
              <motion.div
                className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200"
                variants={cardVariants}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Product Features
                </h3>
                <ul className="space-y-3 sm:space-y-4">
                  {product.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm sm:text-base">
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-blue-200"
                variants={cardVariants}
              >
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Quality Guarantee
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700 text-sm sm:text-base">
                      Free measure and quote
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700 text-sm sm:text-base">
                      Professional installation
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700 text-sm sm:text-base">
                      Lifetime warranty
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Product Details Section */}
      <motion.section
        ref={detailsRef}
        className="py-12 bg-white"
        initial="hidden"
        animate={isDetailsInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-8 sm:mb-10" variants={fadeInUp}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Product Details
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Get all the technical information and specifications you need to
              make an informed decision.
            </p>
          </motion.div>

          <motion.div className="mb-4 sm:mb-6" variants={cardVariants}>
            <div className="border-b border-gray-200 overflow-x-auto">
              <nav
                className="flex space-x-6 sm:space-x-8 justify-center min-w-max px-4"
                role="tablist"
              >
                {["description", "specifications"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-3 sm:py-4 px-4 sm:px-6 border-b-2 font-medium text-base sm:text-lg transition-all duration-200 whitespace-nowrap ${
                      activeTab === tab
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    role="tab"
                    aria-selected={activeTab === tab}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          <motion.div variants={cardVariants}>
            <AnimatePresence mode="wait">
              {activeTab === "description" && (
                <motion.div
                  key="description"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8"
                >
                  <div className="prose max-w-none">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                      Product Description
                    </h3>
                    <div className="text-gray-700 text-base sm:text-lg leading-relaxed space-y-3 sm:space-y-4">
                      {product.description
                        .split("\n")
                        .map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "specifications" && (
                <motion.div
                  key="specifications"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8"
                >
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                    Technical Specifications
                  </h3>
                  <div className="bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-sm border border-gray-200">
                    <div className="divide-y divide-gray-200">
                      {Object.entries(product.specifications).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center hover:bg-gray-50 transition-colors gap-1 sm:gap-0"
                          >
                            <span className="font-medium text-gray-900 text-sm sm:text-base">
                              {key}
                            </span>
                            <span className="text-gray-700 text-sm sm:text-base">
                              {value}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.section>

      {/* Related Products Section */}
      <motion.section
        ref={relatedRef}
        className="py-12 bg-gradient-to-br from-gray-50 to-blue-50"
        initial="hidden"
        animate={isRelatedInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-8 sm:mb-10" variants={fadeInUp}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              You May Also Like
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Discover other premium window treatments that complement your
              style.
            </p>
          </motion.div>

          {product.relatedProducts && product.relatedProducts.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              variants={staggerContainer}
            >
              {product.relatedProducts.map((relatedProduct) => (
                <motion.article
                  key={relatedProduct.id}
                  className="group bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                  variants={cardVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  itemScope
                  itemType="https://schema.org/Product"
                >
                  <Link href={relatedProduct.href}>
                    <div className="relative h-48 sm:h-64 overflow-hidden">
                      {relatedProduct.image ? (
                        <Image
                          src={relatedProduct.image}
                          alt={`${relatedProduct.name} - Premium window treatment`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                          itemProp="image"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
                          No image available
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-4 sm:p-6">
                      <h3
                        className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors"
                        itemProp="name"
                      >
                        {relatedProduct.name}
                      </h3>
                      <p
                        className="text-gray-600 line-clamp-2 text-sm sm:text-base"
                        itemProp="description"
                      >
                        {relatedProduct.shortDescription}
                      </p>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-center text-gray-500 py-8"
              variants={fadeInUp}
            >
              <p>No related products available at the moment.</p>
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-800 underline mt-2 inline-block"
              >
                Browse our full collection
              </Link>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Schema.org Product Data */}
      <div className="hidden">
        <span itemProp="brand" itemScope itemType="https://schema.org/Brand">
          <meta itemProp="name" content="Quality Blinds Australia" />
        </span>
        <span
          itemProp="manufacturer"
          itemScope
          itemType="https://schema.org/Organization"
        >
          <meta itemProp="name" content="Quality Blinds Australia" />
        </span>
        <span itemProp="offers" itemScope itemType="https://schema.org/Offer">
          <meta itemProp="availability" content="https://schema.org/InStock" />
          <meta itemProp="priceCurrency" content="AUD" />
          <meta itemProp="seller" content="Quality Blinds Australia" />
        </span>
        <meta itemProp="sku" content={product.id} />
        <meta itemProp="category" content="Window Treatments" />
      </div>

      {/* Quote Dialog Component */}
      <QuoteDialog
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        productName={product.name}
      />
    </article>
  );
};

export default ProductDetail;

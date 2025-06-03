"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import QuoteDialog from "./QuoteDialog";

interface ProductImage {
  src: string;
  alt: string;
}

interface ProductVariant {
  id: string;
  name: string;
  stock: number;
}

interface ProductDetailProps {
  product: {
    id: string;
    name: string;
    shortDescription: string;
    description: string;
    images: ProductImage[];
    variants: {
      width: ProductVariant[];
      height: ProductVariant[];
      color: ProductVariant[];
    };
    rating: number;
    stock: number;
    features: string[];
    specifications: Record<string, string>;
    relatedProducts: {
      id: string;
      name: string;
      shortDescription: string;
      image: string;
      href: string;
    }[];
  };
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [visibleThumbnails, setVisibleThumbnails] = useState(4);
  const [imageLoading, setImageLoading] = useState(false);

  const mainImageRef = useRef<HTMLDivElement>(null);
  const thumbnailsContainerRef = useRef<HTMLDivElement>(null);

  // Calcular tamaños responsive
  const getThumbnailSize = () => {
    if (containerWidth === 0) return 80;

    // Responsive thumbnail sizes
    if (containerWidth < 640) return 60; // mobile
    if (containerWidth < 1024) return 70; // tablet
    return 80; // desktop
  };

  const thumbnailSize = getThumbnailSize();
  const gap = 12; // gap entre miniaturas
  const arrowSpace = 64; // espacio para las flechas (32px cada lado)

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
    const getProductCategory = (id: string) => {
      if (id.includes("blinds")) return "Blinds";
      if (id.includes("curtains")) return "Curtains";
      if (id.includes("shutters")) return "Shutters";
      if (id.includes("awnings")) return "Awnings";
      return "Other Products";
    };

    const getProductSubCategory = (id: string) => {
      if (id.includes("roller")) return "Roller Blinds";
      if (id.includes("roman")) return "Roman Blinds";
      if (id.includes("venetian")) return "Venetian Blinds";
      if (id.includes("blockout")) return "Blockout";
      if (id.includes("abs")) return "ABS";
      if (id.includes("basswood")) return "Basswood";
      if (id.includes("conservatory")) return "Conservatory";
      if (id.includes("folding-arm")) return "Folding Arm";
      if (id.includes("straight-drop")) return "Straight Drop";
      return "";
    };

    const category = getProductCategory(product.id);
    const subCategory = getProductSubCategory(product.id);

    return [
      { name: "Home", href: "/" },
      { name: category, href: `/${category.toLowerCase()}` },
      ...(subCategory
        ? [
            {
              name: subCategory,
              href: `/${category.toLowerCase()}/${subCategory
                .toLowerCase()
                .replace(" ", "-")}`,
            },
          ]
        : []),
      { name: product.name, href: "#" },
    ];
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

  return (
    <article
      className="bg-white"
      itemScope
      itemType="https://schema.org/Product"
    >
      {/* Breadcrumbs */}
      <nav className="max-w-7xl mx-auto px-4 py-4" aria-label="Breadcrumb">
        <ol
          className="flex items-center space-x-2 text-sm text-gray-500"
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
              {index > 0 && (
                <span className="mx-2" aria-hidden="true">
                  ›
                </span>
              )}
              <Link
                href={crumb.href}
                className={`hover:text-blue-700 transition-colors ${
                  index === breadcrumbs.length - 1
                    ? "text-gray-900 font-medium"
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

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Galería de Imágenes */}
          <section
            className="space-y-4"
            aria-labelledby="product-images-heading"
          >
            <h2 id="product-images-heading" className="sr-only">
              Product Images
            </h2>
            {product.images && product.images.length > 0 ? (
              <>
                <div
                  ref={mainImageRef}
                  className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 w-full"
                >
                  <Image
                    key={selectedImage}
                    src={product.images[selectedImage].src}
                    alt={`${product.name} - ${product.images[selectedImage].alt} - Premium window treatment by Quality Blinds Australia`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    className={`object-cover transition-opacity duration-300 ease-in-out ${
                      imageLoading ? "opacity-0" : "opacity-100"
                    }`}
                    priority={selectedImage === 0}
                    loading={selectedImage === 0 ? "eager" : "lazy"}
                    itemProp="image"
                    onLoadingComplete={() => setImageLoading(false)}
                    onLoad={() => setImageLoading(false)}
                  />
                </div>

                {/* Slider de miniaturas responsive */}
                <div className="relative w-full">
                  {/* Botón izquierdo */}
                  {needsNavigation && canScrollLeft && (
                    <button
                      onClick={() => handleThumbnailScroll("left")}
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200 hover:shadow-xl backdrop-blur-sm"
                      aria-label="Ver imágenes anteriores"
                    >
                      <ChevronLeftIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                    </button>
                  )}

                  {/* Contenedor de miniaturas */}
                  <div
                    ref={thumbnailsContainerRef}
                    className={`flex justify-center gap-3 overflow-hidden transition-all duration-300 ${
                      needsNavigation ? "px-8" : "px-0"
                    }`}
                    role="list"
                    aria-label="Product image thumbnails"
                  >
                    {product.images
                      .slice(
                        thumbnailStartIndex,
                        thumbnailStartIndex + visibleThumbnails
                      )
                      .map((image, index) => {
                        const actualIndex = thumbnailStartIndex + index;
                        return (
                          <button
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
                            aria-label={`Ver ${product.name} imagen ${
                              actualIndex + 1
                            }${
                              selectedImage === actualIndex
                                ? " (actualmente seleccionada)"
                                : ""
                            }`}
                          >
                            <div className="relative w-full h-full">
                              <Image
                                src={image.src}
                                alt={`${product.name} miniatura ${
                                  actualIndex + 1
                                } - ${image.alt}`}
                                fill
                                sizes={`${thumbnailSize}px`}
                                className="object-cover transition-all duration-300 hover:brightness-110"
                                loading="lazy"
                              />
                              {selectedImage === actualIndex && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="absolute inset-0 bg-blue-500/15 ring-1 ring-inset ring-blue-500/30"
                                />
                              )}

                              {/* Efecto de selección activa */}
                              {selectedImage === actualIndex && (
                                <motion.div
                                  layoutId="selectedThumbnail"
                                  className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg -z-10"
                                  transition={{
                                    type: "spring",
                                    bounce: 0.15,
                                    duration: 0.4,
                                  }}
                                />
                              )}
                            </div>
                          </button>
                        );
                      })}
                  </div>

                  {/* Botón derecho */}
                  {needsNavigation && canScrollRight && (
                    <button
                      onClick={() => handleThumbnailScroll("right")}
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200 hover:shadow-xl backdrop-blur-sm"
                      aria-label="Ver más imágenes"
                    >
                      <ChevronRightIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                    </button>
                  )}
                </div>

                {/* Indicador de posición - solo cuando hay navegación */}
                {needsNavigation && (
                  <div className="flex justify-center space-x-1 mt-2">
                    {Array.from({
                      length: Math.ceil(
                        product.images.length / visibleThumbnails
                      ),
                    }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          setThumbnailStartIndex(index * visibleThumbnails)
                        }
                        className={`h-2 w-2 rounded-full transition-all duration-200 ${
                          Math.floor(
                            thumbnailStartIndex / visibleThumbnails
                          ) === index
                            ? "bg-blue-500 shadow-sm"
                            : "bg-gray-300 hover:bg-gray-400"
                        }`}
                        aria-label={`Ir a página ${index + 1} de miniaturas`}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  No images available for {product.name}
                </div>
              </div>
            )}
          </section>

          {/* Product Summary */}
          <section className="space-y-6" aria-labelledby="product-info-heading">
            <header>
              <h1
                id="product-info-heading"
                className="text-4xl font-bold text-gray-900"
                itemProp="name"
              >
                {product.name}
              </h1>
            </header>

            {product.rating > 0 && (
              <div
                className="flex items-center space-x-2"
                itemProp="aggregateRating"
                itemScope
                itemType="https://schema.org/AggregateRating"
              >
                <div
                  className="flex"
                  role="img"
                  aria-label={`${product.rating} out of 5 stars`}
                >
                  {renderStars(product.rating)}
                </div>
                <meta itemProp="ratingValue" content={String(product.rating)} />
                <meta itemProp="bestRating" content="5" />
                <meta itemProp="worstRating" content="1" />
                <meta itemProp="reviewCount" content="1" />
              </div>
            )}

            <p className="text-gray-700 text-lg" itemProp="description">
              {product.shortDescription}
            </p>

            <div className="space-y-4">
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-4 rounded-md transition text-lg"
                aria-label={`Get a free quote for ${product.name}`}
              >
                Get Free Quote & Consultation
              </button>
              <p className="text-sm text-gray-600 text-center">
                Free measure and quote • Professional installation • Lifetime
                warranty
              </p>
            </div>

            {/* Schema.org Product Data */}
            <div className="hidden">
              <span
                itemProp="brand"
                itemScope
                itemType="https://schema.org/Brand"
              >
                <meta itemProp="name" content="Quality Blinds Australia" />
              </span>
              <span
                itemProp="manufacturer"
                itemScope
                itemType="https://schema.org/Organization"
              >
                <meta itemProp="name" content="Quality Blinds Australia" />
              </span>
              <span
                itemProp="offers"
                itemScope
                itemType="https://schema.org/Offer"
              >
                <meta
                  itemProp="availability"
                  content="https://schema.org/InStock"
                />
                <meta itemProp="priceCurrency" content="AUD" />
                <meta itemProp="seller" content="Quality Blinds Australia" />
              </span>
              <meta itemProp="sku" content={product.id} />
              <meta itemProp="category" content="Window Treatments" />
            </div>
          </section>
        </div>

        {/* Product Information Tabs */}
        <section className="mt-16" aria-labelledby="product-details-heading">
          <h2 id="product-details-heading" className="sr-only">
            Product Details
          </h2>
          <div className="border-b border-gray-200">
            <nav
              className="flex space-x-8"
              role="tablist"
              aria-label="Product information"
            >
              {["description", "specifications"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  role="tab"
                  aria-selected={activeTab === tab}
                  aria-controls={`${tab}-panel`}
                  id={`${tab}-tab`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            <AnimatePresence mode="wait">
              {activeTab === "description" && (
                <motion.div
                  key="description"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="prose max-w-none"
                  role="tabpanel"
                  id="description-panel"
                  aria-labelledby="description-tab"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Product Description
                  </h3>
                  <div
                    className="text-gray-700 text-lg leading-relaxed mb-6"
                    itemProp="description"
                  >
                    {product.description}
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">
                    Key Features & Benefits
                  </h4>
                  <ul className="list-disc pl-5 mt-4 space-y-2" role="list">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-gray-700" role="listitem">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {activeTab === "specifications" && (
                <motion.div
                  key="specifications"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  role="tabpanel"
                  id="specifications-panel"
                  aria-labelledby="specifications-tab"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Technical Specifications
                  </h3>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table
                      className="min-w-full divide-y divide-gray-200"
                      role="table"
                    >
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            scope="col"
                          >
                            Specification
                          </th>
                          <th
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            scope="col"
                          >
                            Details
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {Object.entries(product.specifications).map(
                          ([key, value]) => (
                            <tr key={key}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                                {key}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {value}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Related Products */}
        <section className="mt-20" aria-labelledby="related-products-heading">
          <h2
            id="related-products-heading"
            className="text-3xl font-bold text-gray-900 mb-8 text-center"
          >
            You May Also Like These Window Treatments
          </h2>
          {product.relatedProducts && product.relatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8" role="list">
              {product.relatedProducts.map((relatedProduct) => (
                <article
                  key={relatedProduct.id}
                  className="group relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  role="listitem"
                  itemScope
                  itemType="https://schema.org/Product"
                >
                  <Link
                    href={relatedProduct.href}
                    aria-label={`View details for ${relatedProduct.name}`}
                  >
                    <div className="aspect-w-16 aspect-h-9 relative h-48">
                      {relatedProduct.image ? (
                        <Image
                          src={relatedProduct.image}
                          alt={`${relatedProduct.name} - Premium window treatment by Quality Blinds Australia`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          itemProp="image"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
                          No image available for {relatedProduct.name}
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3
                        className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors"
                        itemProp="name"
                      >
                        {relatedProduct.name}
                      </h3>
                      <p
                        className="text-gray-600 line-clamp-2"
                        itemProp="description"
                      >
                        {relatedProduct.shortDescription}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p>No related products available at the moment.</p>
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-800 underline mt-2 inline-block"
              >
                Browse our full collection
              </Link>
            </div>
          )}
        </section>
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

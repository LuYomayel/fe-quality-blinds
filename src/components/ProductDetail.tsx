"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";

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
  const [selectedVariants, setSelectedVariants] = useState({
    width: "",
    height: "",
    color: "",
  });
  const [activeTab, setActiveTab] = useState("description");

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

  //console.log(product.images);
  const handleVariantChange = (type: string, value: string) => {
    setSelectedVariants((prev) => ({ ...prev, [type]: value }));
  };

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
                <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={product.images[selectedImage].src}
                    alt={`${product.name} - ${product.images[selectedImage].alt} - Premium window treatment by Quality Blinds Australia`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority={selectedImage === 0}
                    loading={selectedImage === 0 ? "eager" : "lazy"}
                    itemProp="image"
                  />
                </div>
                <div
                  className="grid grid-cols-4 gap-4"
                  role="list"
                  aria-label="Product image thumbnails"
                >
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? "border-blue-500 ring-2 ring-blue-200"
                          : "border-transparent hover:border-gray-300"
                      }`}
                      aria-label={`View ${product.name} image ${index + 1}`}
                      aria-pressed={selectedImage === index}
                      role="listitem"
                    >
                      <Image
                        src={image.src}
                        alt={`${product.name} thumbnail ${index + 1} - ${
                          image.alt
                        }`}
                        fill
                        sizes="(max-width: 768px) 25vw, 12vw"
                        className="object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
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

            {/* Product Variants */}
            <fieldset className="space-y-4">
              <legend className="text-lg font-medium text-gray-900 mb-4">
                Customization Options
              </legend>
              {Object.entries(product.variants).map(([type, variants]) => (
                <div key={type} className="space-y-2">
                  <label
                    htmlFor={`variant-${type}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </label>
                  <select
                    id={`variant-${type}`}
                    name={`variant-${type}`}
                    value={
                      selectedVariants[type as keyof typeof selectedVariants]
                    }
                    onChange={(e) => handleVariantChange(type, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    aria-describedby={`variant-${type}-description`}
                  >
                    <option value="">Select {type}</option>
                    {variants.map((variant) => (
                      <option key={variant.id} value={variant.id}>
                        {variant.name}
                      </option>
                    ))}
                  </select>
                  <p
                    id={`variant-${type}-description`}
                    className="text-xs text-gray-500"
                  >
                    Choose your preferred {type} option for custom fitting
                  </p>
                </div>
              ))}
            </fieldset>

            <div className="space-y-4">
              <Link
                href="#contact-quality-blinds"
                className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-md transition"
                aria-label={`Get a quote for ${product.name}`}
              >
                Get Free Quote & Consultation
              </Link>
              <p className="text-sm text-gray-600">
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
    </article>
  );
};

export default ProductDetail;

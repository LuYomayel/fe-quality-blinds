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
          <StarIcon className="h-5 w-5" />
        ) : (
          <StarOutlineIcon className="h-5 w-5" />
        )}
      </span>
    ));
  };

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <nav className="max-w-7xl mx-auto px-4 py-4" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.href} className="flex items-center">
              {index > 0 && <span className="mx-2">›</span>}
              <Link
                href={crumb.href}
                className={`hover:text-blue-700 transition-colors ${
                  index === breadcrumbs.length - 1
                    ? "text-gray-900 font-medium"
                    : ""
                }`}
              >
                {crumb.name}
              </Link>
            </li>
          ))}
        </ol>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Galería de Imágenes */}
          <div className="space-y-4">
            {product.images && product.images.length > 0 ? (
              <>
                <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={product.images[selectedImage].src}
                    alt={product.images[selectedImage].alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority={selectedImage === 0}
                    loading={selectedImage === 0 ? "eager" : "lazy"}
                  />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? "border-blue-500"
                          : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
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
                  No images available
                </div>
              </div>
            )}
          </div>

          {/* Resumen del Producto */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>

            {product.rating > 0 && (
              <div className="flex items-center space-x-2">
                <div className="flex">{renderStars(product.rating)}</div>
              </div>
            )}

            <p className="text-gray-700 text-lg">{product.shortDescription}</p>

            {/* Selectores de Variantes */}
            <div className="space-y-4">
              {Object.entries(product.variants).map(([type, variants]) => (
                <div key={type} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </label>
                  <select
                    value={
                      selectedVariants[type as keyof typeof selectedVariants]
                    }
                    onChange={(e) => handleVariantChange(type, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select {type}</option>
                    {variants.map((variant) => (
                      <option key={variant.id} value={variant.id}>
                        {variant.name}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <Link
              href="#contact-quality-blinds"
              className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-md transition"
            >
              Enquire for Details
            </Link>
          </div>
        </div>

        {/* Tabs de Información */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {["description", "specifications"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
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
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Product Description
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    {product.description}
                  </p>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Key Features
                  </h3>
                  <ul className="list-disc pl-5 mt-4 space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-gray-700">
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
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Specifications
                  </h2>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
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
        </div>

        {/* Productos Relacionados */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            You May Also Like
          </h2>
          {product.relatedProducts && product.relatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {product.relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="group relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <Link href={relatedProduct.href}>
                    <div className="aspect-w-16 aspect-h-9 relative h-48">
                      {relatedProduct.image ? (
                        <Image
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
                          No image available
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-gray-600 line-clamp-2">
                        {relatedProduct.shortDescription}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              No related products available at the moment.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

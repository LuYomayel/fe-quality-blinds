"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Product } from "@/data/productData";
import {
  SwatchIcon,
  CubeIcon,
  Cog6ToothIcon,
  WrenchScrewdriverIcon,
  CheckBadgeIcon,
  SparklesIcon,
  ShieldCheckIcon,
  EyeIcon,
  BeakerIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

interface VariantsGalleryProps {
  product: Product;
}

type VariantTab =
  | "fabrics"
  | "colors"
  | "materials"
  | "slatSizes"
  | "controls"
  | "mountings";

// Union type for all variant types
type VariantItem =
  | NonNullable<Product["variants"]["colors"]>[number]
  | NonNullable<Product["variants"]["fabrics"]>[number]
  | NonNullable<Product["variants"]["materials"]>[number]
  | NonNullable<Product["variants"]["slatSizes"]>[number]
  | NonNullable<Product["variants"]["controls"]>[number]
  | NonNullable<Product["variants"]["mountings"]>[number];

interface TabConfig {
  id: VariantTab;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  count: number;
  data: VariantItem[];
}

const VariantsGallery: React.FC<VariantsGalleryProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState<VariantTab>("fabrics");
  const [selectedVariant, setSelectedVariant] = useState<VariantItem | null>(
    null
  );

  // Configurar tabs disponibles basado en los datos del producto
  const availableTabs: TabConfig[] = [
    {
      id: "fabrics" as const,
      label: "Fabrics",
      icon: SwatchIcon,
      count: product.variants.fabrics?.length || 0,
      data: (product.variants.fabrics || []) as VariantItem[],
    },
    {
      id: "colors" as const,
      label: "Colors",
      icon: BeakerIcon,
      count: product.variants.colors?.length || 0,
      data: (product.variants.colors || []) as VariantItem[],
    },
    {
      id: "materials" as const,
      label: "Materials",
      icon: CubeIcon,
      count: product.variants.materials?.length || 0,
      data: (product.variants.materials || []) as VariantItem[],
    },
    {
      id: "slatSizes" as const,
      label: "Slat Sizes",
      icon: WrenchScrewdriverIcon,
      count: product.variants.slatSizes?.length || 0,
      data: (product.variants.slatSizes || []) as VariantItem[],
    },
    {
      id: "controls" as const,
      label: "Controls",
      icon: Cog6ToothIcon,
      count: product.variants.controls?.length || 0,
      data: (product.variants.controls || []) as VariantItem[],
    },
    {
      id: "mountings" as const,
      label: "Mounting",
      icon: WrenchScrewdriverIcon,
      count: product.variants.mountings?.length || 0,
      data: (product.variants.mountings || []) as VariantItem[],
    },
  ].filter((tab) => tab.count > 0);

  // Establecer tab inicial si fabrics no está disponible
  React.useEffect(() => {
    if (
      availableTabs.length > 0 &&
      !availableTabs.find((tab) => tab.id === activeTab)
    ) {
      setActiveTab(availableTabs[0].id);
    }
  }, [availableTabs, activeTab]);

  const activeTabData = availableTabs.find((tab) => tab.id === activeTab);

  const getOpacityColor = (opacity: number) => {
    if (opacity >= 90) return "text-gray-900";
    if (opacity >= 60) return "text-gray-700";
    if (opacity >= 30) return "text-gray-500";
    return "text-gray-300";
  };

  const getOpacityLabel = (opacity: number) => {
    if (opacity >= 90) return "Blockout";
    if (opacity >= 60) return "Light Filtering";
    if (opacity >= 30) return "Translucent";
    return "Sheer";
  };

  // Type guards
  const isFabric = (
    item: VariantItem
  ): item is NonNullable<Product["variants"]["fabrics"]>[number] => {
    return "opacity" in item;
  };

  const isColor = (
    item: VariantItem
  ): item is NonNullable<Product["variants"]["colors"]>[number] => {
    return "value" in item;
  };

  const isSlatSize = (
    item: VariantItem
  ): item is NonNullable<Product["variants"]["slatSizes"]>[number] => {
    return "recommended" in item;
  };

  const isMount = (
    item: VariantItem
  ): item is NonNullable<Product["variants"]["mountings"]>[number] => {
    return "compatibility" in item;
  };

  const getItemId = (item: VariantItem) => {
    return ("id" in item ? item.id : "") || item.name;
  };

  const getItemImage = (item: VariantItem): string | undefined => {
    if ("image" in item && item.image) return item.image;
    if ("thumbnail" in item && item.thumbnail) return item.thumbnail;
    return undefined;
  };

  const getItemThumbnail = (item: VariantItem): string | undefined => {
    if ("thumbnail" in item && item.thumbnail) return item.thumbnail;
    if ("image" in item && item.image) return item.image;
    return undefined;
  };

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200">
        {availableTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSelectedVariant(null);
              }}
              className={`flex items-center space-x-2 px-4 py-3 rounded-t-lg font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  activeTab === tab.id
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {activeTabData && (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[400px]"
          >
            {/* Grid Layout */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
              {activeTabData.data.map((item, index) => (
                <motion.div
                  key={getItemId(item) || index}
                  className={`relative group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 ${
                    !item.available
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:shadow-lg hover:scale-105"
                  } ${
                    selectedVariant &&
                    getItemId(selectedVariant) === getItemId(item)
                      ? "ring-2 ring-blue-500 shadow-lg"
                      : "border border-gray-200"
                  }`}
                  onClick={() => item.available && setSelectedVariant(item)}
                  whileHover={{ y: item.available ? -2 : 0 }}
                  layout
                >
                  {/* Image */}
                  <div className="aspect-square relative overflow-hidden bg-gray-100">
                    {getItemImage(item) || getItemThumbnail(item) ? (
                      <Image
                        src={
                          getItemThumbnail(item) ||
                          getItemImage(item) ||
                          "/images/placeholder.jpg"
                        }
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    ) : isColor(item) ? (
                      // Color swatch para colores
                      <div
                        className="w-full h-full"
                        style={{ backgroundColor: item.value }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <SwatchIcon className="h-8 w-8 text-gray-400" />
                      </div>
                    )}

                    {/* Overlays */}
                    {!item.available && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          Not Available
                        </span>
                      </div>
                    )}

                    {"premium" in item && item.premium && (
                      <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        <SparklesIcon className="h-3 w-3 inline mr-1" />
                        Premium
                      </div>
                    )}

                    {/* Fabric specific: Opacity indicator */}
                    {isFabric(item) && item.opacity !== undefined && (
                      <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
                        <EyeIcon
                          className={`h-3 w-3 inline mr-1 ${getOpacityColor(
                            item.opacity
                          )}`}
                        />
                        {getOpacityLabel(item.opacity)}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <h4 className="font-semibold text-gray-900 text-sm truncate mb-1">
                      {item.name}
                    </h4>

                    {/* Type/Size info */}
                    {(("type" in item && item.type) ||
                      ("size" in item && item.size)) && (
                      <p className="text-xs text-gray-600 mb-2">
                        {"type" in item
                          ? item.type
                          : "size" in item
                          ? item.size
                          : ""}
                      </p>
                    )}

                    {/* Features badges */}
                    {"features" in item &&
                      item.features &&
                      item.features.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {item.features.slice(0, 2).map((feature: string) => (
                            <span
                              key={feature}
                              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-blue-50 text-blue-700"
                            >
                              <CheckBadgeIcon className="h-3 w-3 mr-1" />
                              {feature}
                            </span>
                          ))}
                          {item.features.length > 2 && (
                            <span className="text-xs text-gray-500">
                              +{item.features.length - 2} more
                            </span>
                          )}
                        </div>
                      )}

                    {/* Sample availability */}
                    {"sampleAvailable" in item && item.sampleAvailable && (
                      <div className="flex items-center text-xs text-green-600 mt-1">
                        <TagIcon className="h-3 w-3 mr-1" />
                        Sample Available
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Detailed View */}
            <AnimatePresence>
              {selectedVariant && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-gray-200 pt-6"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Large Image */}
                    <div className="aspect-square relative rounded-xl overflow-hidden bg-gray-100">
                      {getItemImage(selectedVariant) ? (
                        <Image
                          src={
                            getItemImage(selectedVariant) ||
                            "/images/placeholder.jpg"
                          }
                          alt={selectedVariant.name}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover"
                        />
                      ) : isColor(selectedVariant) ? (
                        <div
                          className="w-full h-full"
                          style={{ backgroundColor: selectedVariant.value }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <SwatchIcon className="h-16 w-16 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {selectedVariant.name}
                        </h3>

                        {"type" in selectedVariant && selectedVariant.type && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-3">
                            {selectedVariant.type}
                          </span>
                        )}

                        {"size" in selectedVariant && selectedVariant.size && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 mb-3 ml-2">
                            {selectedVariant.size}
                          </span>
                        )}
                      </div>

                      {"description" in selectedVariant && (
                        <p className="text-gray-700 leading-relaxed">
                          {selectedVariant.description}
                        </p>
                      )}

                      {/* Features */}
                      {"features" in selectedVariant &&
                        selectedVariant.features &&
                        selectedVariant.features.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                              <ShieldCheckIcon className="h-4 w-4 mr-2 text-green-600" />
                              Features
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {selectedVariant.features.map(
                                (feature: string) => (
                                  <div
                                    key={feature}
                                    className="flex items-center text-sm text-gray-700"
                                  >
                                    <CheckBadgeIcon className="h-4 w-4 mr-2 text-green-500" />
                                    {feature}
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}

                      {/* Fabric specific info */}
                      {isFabric(selectedVariant) &&
                        selectedVariant.opacity !== undefined && (
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                              <EyeIcon className="h-4 w-4 mr-2 text-blue-600" />
                              Light Control
                            </h4>
                            <div className="flex items-center space-x-4">
                              <div className="flex-1">
                                <div className="text-sm text-gray-700 mb-1">
                                  {getOpacityLabel(selectedVariant.opacity)} (
                                  {selectedVariant.opacity}% opacity)
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                                    style={{
                                      width: `${selectedVariant.opacity}%`,
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                      {/* Recommended rooms (for slat sizes) */}
                      {isSlatSize(selectedVariant) &&
                        selectedVariant.recommended &&
                        selectedVariant.recommended.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">
                              Recommended for
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedVariant.recommended.map(
                                (room: string) => (
                                  <span
                                    key={room}
                                    className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm"
                                  >
                                    {room}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        )}

                      {/* Compatibility (for mountings) */}
                      {isMount(selectedVariant) &&
                        selectedVariant.compatibility &&
                        selectedVariant.compatibility.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">
                              Compatible with
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedVariant.compatibility.map(
                                (item: string) => (
                                  <span
                                    key={item}
                                    className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                                  >
                                    {item}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        )}

                      {/* Sample request button */}
                      {"sampleAvailable" in selectedVariant &&
                        selectedVariant.sampleAvailable && (
                          <button className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                            Request Free Sample
                          </button>
                        )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* No variants message */}
      {availableTabs.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <SwatchIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>No variants available for this product</p>
        </div>
      )}
    </div>
  );
};

export default VariantsGallery;

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  InformationCircleIcon,
  ShoppingBagIcon,
  WindowIcon,
  CursorArrowRaysIcon,
  BuildingOffice2Icon,
  SunIcon,
  WrenchScrewdriverIcon,
  ChevronRightIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import ContactForm from "./ContactForm";
import LoadingLink from "./LoadingLink";
import Image from "next/image";

interface MenuItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  subItems?: MenuItem[];
  preview?: {
    image: string;
    description: string;
    features: string[];
  };
}

const menuItems: MenuItem[] = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "About Us", href: "/about", icon: InformationCircleIcon },
  { name: "Shop", href: "/shop", icon: ShoppingBagIcon },
  {
    name: "Blinds",
    href: "/blinds",
    icon: WindowIcon,
    subItems: [
      {
        name: "Roller Blinds",
        href: "/blinds/roller",
        preview: {
          image: "/images/roller-blind-1.webp",
          description:
            "Simple, stylish, and functional roller blinds that offer the perfect combination of practicality and elegance for any space.",
          features: [
            "Easy Operation",
            "Multiple Light Control Options",
            "Modern Design",
          ],
        },
        subItems: [
          {
            name: "Blockout Roller Blinds",
            href: "/blinds/roller/blockout-roller-blinds",
            preview: {
              image: "/images/blockout-roller-blind-1.webp",
              description:
                "Complete light control and privacy with our premium blockout roller blinds. Perfect for bedrooms and media rooms where total darkness is essential.",
              features: [
                "100% Light Blocking",
                "Energy Efficient",
                "Premium Fabrics",
                "Perfect for Bedrooms",
              ],
            },
          },
          {
            name: "Sunscreen Roller Blinds",
            href: "/blinds/roller/sunscreen-roller-blinds",
            preview: {
              image: "/images/sunscreen-roller-blind-1.webp",
              description:
                "Reduce glare while maintaining your view. Ideal for living areas and offices with excellent UV protection and view preservation.",
              features: [
                "UV Protection",
                "Glare Reduction",
                "View Preservation",
                "Office & Living Areas",
              ],
            },
          },
          {
            name: "Translucent Roller Blinds",
            href: "/blinds/roller/translucent-roller-blinds",
            preview: {
              image: "/images/translucent-roller-blind-1.webp",
              description:
                "Soft, filtered light with privacy. Perfect balance of natural light and discretion for any room in your home.",
              features: [
                "Light Filtering",
                "Privacy Control",
                "Elegant Finish",
                "Versatile Design",
              ],
            },
          },
        ],
      },
      {
        name: "Roman Blinds",
        href: "/blinds/roman",
        preview: {
          image: "/images/roman-blind-1.webp",
          description:
            "Timeless elegance meets modern functionality. Classic folding design that brings sophisticated style to your windows.",
          features: [
            "Premium Fabrics",
            "Elegant Folding Design",
            "Luxury Finish",
          ],
        },
        subItems: [
          {
            name: "Blockout Roman Blinds",
            href: "/blinds/roman/blockout-roman-blinds",
            preview: {
              image: "/images/blockout-roman-blind-1.webp",
              description:
                "Classic elegance with complete privacy. Premium blockout roman blinds perfect for bedrooms and formal living areas requiring total light control.",
              features: [
                "Total Privacy",
                "Light Blocking",
                "Premium Fabrics",
                "Elegant Design",
              ],
            },
          },
          {
            name: "Translucent Roman Blinds",
            href: "/blinds/roman/translucent-roman-blinds",
            preview: {
              image: "/images/translucent-roman-blind-1.webp",
              description:
                "Soft, filtered light with sophisticated style. Ideal for living spaces where gentle illumination meets timeless elegance.",
              features: [
                "Light Filtering",
                "Decorative Appeal",
                "Versatile Design",
                "Sophisticated Style",
              ],
            },
          },
        ],
      },
      {
        name: "Venetian Blinds",
        href: "/blinds/venetian",
        preview: {
          image: "/images/venetian-blind-1.webp",
          description:
            "Precision meets style. Adjustable slats provide unmatched control over light and privacy with timeless elegance.",
          features: [
            "Precise Light Control",
            "Multiple Materials",
            "Classic Design",
          ],
        },
        subItems: [
          {
            name: "Aluminium Venetian Blinds",
            href: "/blinds/venetian/aluminium-venetian-blinds",
            preview: {
              image: "/images/aluminium-venetian-blind-1.webp",
              description:
                "Sleek, modern, and durable. Perfect for contemporary spaces requiring precise light control and easy maintenance.",
              features: [
                "Lightweight",
                "Easy Clean",
                "Modern Design",
                "Durable Construction",
              ],
            },
          },
          {
            name: "Basswood Venetian Blinds",
            href: "/blinds/venetian/basswood-venetian-blinds",
            preview: {
              image: "/images/basswood-venetian-blind-1.webp",
              description:
                "Natural warmth and elegance. Premium basswood slats bring organic beauty and sophisticated charm to any room.",
              features: [
                "Natural Wood",
                "Premium Quality",
                "Elegant Finish",
                "Organic Beauty",
              ],
            },
          },
        ],
      },
    ],
  },
  {
    name: "Curtains",
    href: "/curtains",
    icon: CursorArrowRaysIcon,
    preview: {
      image: "/images/curtain-1.webp",
      description:
        "Elegant curtains and drapes that add warmth, style, and functionality to any room in your home.",
      features: [
        "Premium Fabrics",
        "Custom Sizing",
        "Professional Installation",
      ],
    },
    subItems: [
      {
        name: "Blockout Curtains",
        href: "/curtains/blockout-curtains",
        preview: {
          image: "/images/blockout-curtain-1.webp",
          description:
            "Complete room darkening with luxurious curtains. Perfect for bedrooms and media rooms requiring total light control.",
          features: [
            "Complete Light Blocking",
            "Thermal Insulation",
            "Premium Fabrics",
            "Noise Reduction",
          ],
        },
      },
      {
        name: "Sheer Curtains",
        href: "/curtains/sheer-curtains",
        preview: {
          image: "/images/sheer-curtain-1.webp",
          description:
            "Delicate and airy sheer curtains that filter light beautifully while maintaining privacy and elegance.",
          features: [
            "Light Filtering",
            "Elegant Drape",
            "Privacy Control",
            "Versatile Styling",
          ],
        },
      },
      {
        name: "Veri Shades",
        href: "/curtains/veri-shades",
        preview: {
          image: "/images/veri-shades-curtain-1.webp",
          description:
            "Innovative combination of blinds and shades offering versatile light control and contemporary style.",
          features: [
            "Dual Functionality",
            "Modern Design",
            "Light Control",
            "Easy Operation",
          ],
        },
      },
    ],
  },
  {
    name: "Shutters",
    href: "/shutters",
    icon: BuildingOffice2Icon,
    preview: {
      image: "/images/shutter-1.webp",
      description:
        "Premium shutters that provide excellent insulation, privacy, and a sophisticated architectural element to your home.",
      features: [
        "Energy Efficient",
        "Durable Construction",
        "Premium Materials",
      ],
    },
    subItems: [
      {
        name: "ABS Shutters",
        href: "/shutters/abs-shutters",
        preview: {
          image: "/images/pvc-shutter-1.webp",
          description:
            "Durable and lightweight ABS shutters offering excellent value and performance for any home interior.",
          features: [
            "Lightweight",
            "Cost Effective",
            "Easy Maintenance",
            "Durable Construction",
          ],
        },
      },
      {
        name: "ABS Waterproof Shutters",
        href: "/shutters/abs-waterproof-shutters",
        preview: {
          image: "/images/pvc-shutter-1.webp",
          description:
            "Waterproof ABS shutters perfect for bathrooms, kitchens, and humid environments with superior moisture resistance.",
          features: [
            "100% Waterproof",
            "Humidity Resistant",
            "Easy Clean",
            "Bathroom Safe",
          ],
        },
      },
      {
        name: "Basswood Shutters",
        href: "/shutters/basswood-shutters",
        preview: {
          image: "/images/basswood-shutter-1.webp",
          description:
            "Premium basswood shutters combining natural beauty with superior craftsmanship for the discerning homeowner.",
          features: [
            "Natural Wood",
            "Premium Quality",
            "Elegant Grain",
            "Handcrafted",
          ],
        },
      },
      {
        name: "Phoenixwood Shutters",
        href: "/shutters/phoenixwood-shutters",
        preview: {
          image: "/images/phoenixwood-shutter.webp",
          description:
            "Luxury phoenixwood shutters offering exceptional durability and stunning natural beauty for premium interiors.",
          features: [
            "Luxury Wood",
            "Superior Durability",
            "Rich Grain",
            "Premium Finish",
          ],
        },
      },
    ],
  },
  {
    name: "Awnings",
    href: "/awnings",
    icon: SunIcon,
    preview: {
      image: "/images/awning-1.webp",
      description:
        "High-quality awnings that provide excellent sun protection and weather resistance for outdoor living spaces.",
      features: ["UV Protection", "Weather Resistant", "Motorised Options"],
    },
    subItems: [
      {
        name: "Conservatory Awnings",
        href: "/awnings/conservatory-awnings",
        preview: {
          image: "/images/conservatory-awning-1.webp",
          description:
            "Specialized awnings designed for conservatories, providing excellent sun protection and temperature control.",
          features: [
            "Temperature Control",
            "UV Protection",
            "Custom Fit",
            "Energy Saving",
          ],
        },
      },
      {
        name: "Folding Arm Awnings",
        href: "/awnings/folding-arm-awnings",
        preview: {
          image: "/images/folding-arm-awning-1.webp",
          description:
            "Versatile folding arm awnings that extend your outdoor living space with style and functionality.",
          features: [
            "Retractable Design",
            "Weather Resistant",
            "Large Coverage",
            "Easy Operation",
          ],
        },
      },
      {
        name: "Straight Drop Awnings",
        href: "/awnings/straight-drop-awnings",
        preview: {
          image: "/images/straight-drop-awning-1.webp",
          description:
            "Straight drop awnings perfect for windows and outdoor areas, providing excellent sun and weather protection.",
          features: [
            "Vertical Protection",
            "Wind Resistant",
            "Versatile Use",
            "Privacy Screen",
          ],
        },
      },
      {
        name: "Canopy Awning",
        href: "/awnings/canopy-awning",
        preview: {
          image: "/images/canopy-1.webp",
          description:
            "Fixed canopy awnings that provide permanent sun protection and architectural enhancement to your property.",
          features: [
            "Permanent Solution",
            "Architectural Feature",
            "Durable Frame",
            "Weather Protection",
          ],
        },
      },
    ],
  },
  {
    name: "Other Products",
    href: "/other-products",
    icon: WrenchScrewdriverIcon,
    preview: {
      image: "/images/louver-2.webp",
      description:
        "Additional outdoor solutions including louvers, shade sails, and specialty products for complete home coverage.",
      features: ["Versatile Solutions", "Quality Materials", "Custom Design"],
    },
    subItems: [
      {
        name: "Louvers",
        href: "/other-product/louvers",
        preview: {
          image: "/images/louver-1.webp",
          description:
            "Adjustable louvers for perfect airflow and light control, ideal for privacy screens and architectural features.",
          features: [
            "Airflow Control",
            "Privacy Screen",
            "Weather Resistant",
            "Modern Design",
          ],
        },
      },
      {
        name: "Polycarbonate Roofings",
        href: "/other-product/polycarbonate-roofings",
        preview: {
          image: "/images/polycarbonate-roofing-1.webp",
          description:
            "Durable polycarbonate roofing solutions that provide excellent weather protection while allowing natural light.",
          features: [
            "Weather Protection",
            "Light Transmission",
            "Impact Resistant",
            "Easy Installation",
          ],
        },
      },
      {
        name: "Shade Sails",
        href: "/other-product/shade-sails",
        preview: {
          image: "/images/shade-sail-1.webp",
          description:
            "Stylish shade sails that create comfortable outdoor spaces with excellent UV protection and modern aesthetics.",
          features: [
            "UV Protection",
            "Modern Aesthetics",
            "Flexible Installation",
            "Durable Fabric",
          ],
        },
      },
      {
        name: "Umbrellas",
        href: "/other-product/umbrellas",
        preview: {
          image: "/images/umbrella-1.webp",
          description:
            "Premium outdoor umbrellas designed for Australian conditions, providing portable shade and style.",
          features: [
            "Portable Shade",
            "Weather Resistant",
            "Stylish Design",
            "Easy Setup",
          ],
        },
      },
    ],
  },
  { name: "Terms & Conditions", href: "/terms", icon: DocumentTextIcon },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [hoveredPreview, setHoveredPreview] = useState<MenuItem | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuButton = () => setIsMenuOpen((open) => !open);

  const toggleExpanded = (itemName: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemName)) {
      newExpanded.delete(itemName);
    } else {
      newExpanded.add(itemName);
    }
    setExpandedItems(new Set([itemName])); // Solo permite uno expandido a la vez en móvil
  };

  const handleSubItemHover = (subItem: MenuItem) => {
    if (
      window.matchMedia(
        "(hover: hover) and (pointer: fine) and (min-width: 1024px)"
      ).matches &&
      subItem.preview
    ) {
      setHoveredPreview(subItem);
    }
  };

  const handleItemHover = (item: MenuItem) => {
    if (
      window.matchMedia(
        "(hover: hover) and (pointer: fine) and (min-width: 1024px)"
      ).matches &&
      item.preview
    ) {
      setHoveredPreview(item);
    }
  };

  const handleHoverEnd = () => {
    setHoveredPreview(null);
  };

  const menuVariants = {
    closed: {
      x: "-100%",
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    open: {
      x: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const menuItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.2,
        ease: "easeOut",
      },
    }),
  };

  const subItemVariants = {
    closed: { opacity: 0, height: 0, y: -10 },
    open: {
      opacity: 1,
      height: "auto",
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const previewVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  return (
    <>
      {/* Contact Us button - Optimizado para móvil */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => setShowContact(true)}
        className={`fixed top-3 right-3 sm:top-4 sm:right-4 lg:top-6 lg:right-6 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-3 py-2 sm:px-4 sm:py-2.5 lg:px-6 lg:py-3 rounded-lg lg:rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-xs sm:text-sm lg:text-base ${
          scrolled ? "shadow-xl" : ""
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="hidden sm:inline lg:hidden">Contact</span>
        <span className="sm:hidden lg:inline">Contact</span>
        <span className="hidden lg:inline"> Us</span>
      </motion.button>

      {/* Menu button - Optimizado para móvil */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        onClick={handleMenuButton}
        className={`fixed top-3 left-3 sm:top-4 sm:left-4 lg:top-6 lg:left-6 z-50 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg lg:rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
          scrolled ? "shadow-xl" : ""
        }`}
        aria-label="Open main menu"
        aria-expanded={isMenuOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Bars3Icon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
      </motion.button>

      {/* Preview Overlay - Solo desktop (lg+) */}
      <AnimatePresence mode="wait">
        {hoveredPreview && isMenuOpen && (
          <motion.div
            key={hoveredPreview.name}
            className="fixed inset-0 z-[9999] lg:flex items-center justify-center pointer-events-none p-4 hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={previewVariants}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-lg xl:max-w-xl border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Preview Image */}
              <div className="relative h-64 xl:h-80 overflow-hidden">
                <motion.div
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full h-full"
                >
                  <Image
                    src={
                      hoveredPreview.preview?.image ||
                      "/images/placeholder.webp"
                    }
                    alt={hoveredPreview.name}
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <motion.h3
                    className="text-xl xl:text-2xl font-bold text-white mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                  >
                    {hoveredPreview.name}
                  </motion.h3>
                </div>
              </div>

              {/* Preview Content */}
              <div className="p-6">
                <motion.p
                  className="text-gray-600 mb-4 leading-relaxed"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                >
                  {hoveredPreview.preview?.description}
                </motion.p>

                {/* Features */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
                >
                  <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                    Key Features:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {hoveredPreview.preview?.features.map((feature, idx) => (
                      <motion.span
                        key={idx}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.4 + idx * 0.05,
                          ease: "easeOut",
                        }}
                      >
                        {feature}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu overlay - Optimizado para móvil */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 left-0 bottom-0 w-full sm:w-80 lg:w-96 bg-gradient-to-br from-slate-50 via-white to-blue-50 shadow-2xl overflow-y-auto z-[9998] border-r border-gray-200/50"
            >
              {/* Header del menú - Mejorado para móvil */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 lg:p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 lg:space-x-3">
                    <Image
                      src="/logo/logo-no-bg.webp"
                      alt="Quality Blinds Australia Logo"
                      width={28}
                      height={28}
                      className="object-contain sm:w-8 sm:h-8 lg:w-10 lg:h-10"
                    />
                    <div>
                      <h2 className="text-sm sm:text-base lg:text-lg font-bold">
                        Quality Blinds
                      </h2>
                      <p className="text-blue-100 text-xs">Australia</p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <XMarkIcon className="h-5 w-5 lg:h-6 lg:w-6" />
                  </motion.button>
                </div>
              </div>

              {/* Menu items - Mejorado para móvil */}
              <div className="p-3 sm:p-4 lg:p-6 space-y-1">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    variants={menuItemVariants}
                    initial="closed"
                    animate="open"
                    custom={index}
                  >
                    {item.subItems ? (
                      <div className="space-y-1">
                        <button
                          onClick={() => toggleExpanded(item.name)}
                          onMouseEnter={() => handleItemHover(item)}
                          onMouseLeave={handleHoverEnd}
                          className="w-full flex items-center justify-between p-3 lg:p-3 rounded-lg lg:rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 transition-all duration-200 group touch-manipulation"
                        >
                          <div className="flex items-center space-x-3">
                            {item.icon && (
                              <item.icon className="h-5 w-5 lg:h-5 lg:w-5 text-blue-600 group-hover:text-blue-700 flex-shrink-0" />
                            )}
                            <span className="font-semibold text-sm sm:text-base text-gray-800 group-hover:text-blue-800 text-left">
                              {item.name}
                            </span>
                          </div>
                          <motion.div
                            animate={{
                              rotate: expandedItems.has(item.name) ? 90 : 0,
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRightIcon className="h-4 w-4 text-gray-500 flex-shrink-0" />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {expandedItems.has(item.name) && (
                            <motion.div
                              variants={subItemVariants}
                              initial="closed"
                              animate="open"
                              exit="closed"
                              className="ml-4 sm:ml-6 lg:ml-8 space-y-1 border-l-2 border-blue-200 pl-3 lg:pl-4"
                            >
                              {item.subItems.map((subItem) => (
                                <div key={subItem.name}>
                                  <LoadingLink
                                    href={subItem.href}
                                    className="block p-2.5 lg:p-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 touch-manipulation"
                                    onClick={() => setIsMenuOpen(false)}
                                    onMouseEnter={() =>
                                      handleSubItemHover(subItem)
                                    }
                                    onMouseLeave={handleHoverEnd}
                                  >
                                    {subItem.name}
                                  </LoadingLink>
                                  {subItem.subItems && (
                                    <div className="ml-3 lg:ml-4 mt-1 space-y-1 border-l border-gray-200 pl-2 lg:pl-3">
                                      {subItem.subItems.map((subSubItem) => (
                                        <LoadingLink
                                          key={subSubItem.name}
                                          href={subSubItem.href}
                                          className="block p-2 text-xs sm:text-sm text-gray-500 hover:text-blue-500 hover:bg-blue-25 rounded transition-all duration-200 touch-manipulation"
                                          onClick={() => setIsMenuOpen(false)}
                                          onMouseEnter={() =>
                                            handleSubItemHover(subSubItem)
                                          }
                                          onMouseLeave={handleHoverEnd}
                                        >
                                          {subSubItem.name}
                                        </LoadingLink>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <LoadingLink
                        href={item.href}
                        className="flex items-center space-x-3 p-3 lg:p-3 rounded-lg lg:rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 transition-all duration-200 group touch-manipulation"
                        onClick={() => setIsMenuOpen(false)}
                        onMouseEnter={() => handleItemHover(item)}
                        onMouseLeave={handleHoverEnd}
                      >
                        {item.icon && (
                          <item.icon className="h-5 w-5 lg:h-5 lg:w-5 text-blue-600 group-hover:text-blue-700 flex-shrink-0" />
                        )}
                        <span className="font-semibold text-sm sm:text-base text-gray-800 group-hover:text-blue-800">
                          {item.name}
                        </span>
                      </LoadingLink>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Footer del menú - Mejorado para móvil */}
              <div className="p-4 lg:p-6 border-t border-gray-200/50 bg-gradient-to-r from-gray-50 to-blue-50">
                <div className="text-center">
                  <p className="text-xs sm:text-sm text-gray-600 mb-2">
                    Need help?
                  </p>
                  <a
                    href="tel:+61293405050"
                    className="inline-flex items-center px-4 py-2.5 lg:px-4 lg:py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-xs sm:text-sm font-medium touch-manipulation"
                  >
                    Call us: +61 (02) 9340 5050
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9997] bg-black/40 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />
          </>
        )}
      </AnimatePresence>

      {/* Contact Us Modal - Optimizado para móvil */}
      <AnimatePresence>
        {showContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl relative max-h-[90vh] overflow-y-auto"
            >
              <motion.button
                onClick={() => setShowContact(false)}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-900 hover:text-blue-700 z-10 w-8 h-8 sm:w-8 sm:h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors touch-manipulation"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <XMarkIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              </motion.button>
              <ContactForm />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

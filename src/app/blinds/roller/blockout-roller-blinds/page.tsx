"use client";

import { useEffect, useState } from "react";
import ProductDetail from "@/components/ProductDetail";
import { productData } from "@/data/productData";

interface Product {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  images: { src: string; alt: string }[];
  relatedProducts: {
    id: string;
    name: string;
    image: string;
    href: string;
    shortDescription: string;
  }[];
  variants: {
    width: { id: string; name: string; stock: number }[];
    height: { id: string; name: string; stock: number }[];
    color: { id: string; name: string; stock: number }[];
  };
  rating: number;
  stock: number;
  features: string[];
  specifications: Record<string, string>;
}

export default function BlockoutRollerBlindsPage() {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const foundProduct = productData.find(
      (p) => p.id === "blockout-roller-blinds"
    );
    if (foundProduct) {
      setProduct(foundProduct as Product);
    }
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-xl text-gray-600">Cargando...</div>
      </div>
    );
  }

  return (
    <main className="pt-20">
      <ProductDetail product={product} />
    </main>
  );
}

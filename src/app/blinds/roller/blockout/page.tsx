"use client";

import React from "react";
import ProductDetail from "@/components/ProductDetail";
import { productData } from "@/data/productData";

export default function BlockoutRollerPage() {
  return (
    <main className="pt-20">
      <ProductDetail product={productData} />
    </main>
  );
}

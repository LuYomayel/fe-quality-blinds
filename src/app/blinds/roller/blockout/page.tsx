"use client";

import React from "react";
import ProductDetail from "@/components/ProductDetail";
import { productData } from "@/data/productData";

export default function BlockoutRollerPage() {
  return (
    <main>
      <ProductDetail product={productData[0]} />
    </main>
  );
}

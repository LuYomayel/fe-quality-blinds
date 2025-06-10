"use client";

import { useEffect, useState } from "react";
import ProductDetail from "@/components/ProductDetail";
import { productData, Product } from "@/data/productData";

// This would typically be generated dynamically based on the product
const productId = "blockout-roller-blinds";

export default function BlockoutRollerBlindsPage() {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const foundProduct = productData.find((p) => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-xl text-gray-600">
          Loading premium blockout roller blinds...
        </div>
      </div>
    );
  }

  return (
    <>
      <main>
        <ProductDetail product={product} />
      </main>

      {/* Product-specific structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "@id": `https://www.qualityblinds.com.au/blinds/roller/blockout-roller-blinds#product`,
            name: product.name,
            description: product.description,
            brand: {
              "@type": "Brand",
              name: "Quality Blinds Australia",
            },
            manufacturer: {
              "@type": "Organization",
              name: "Quality Blinds Australia",
              url: "https://www.qualityblinds.com.au",
            },
            category: "Roller Blinds",
            image:
              product.images?.map(
                (img) => `https://www.qualityblinds.com.au${img.src}`
              ) || [],
            sku: product.id,
            aggregateRating:
              product.rating > 0
                ? {
                    "@type": "AggregateRating",
                    ratingValue: product.rating,
                    reviewCount: 1,
                    bestRating: 5,
                    worstRating: 1,
                  }
                : undefined,
            offers: {
              "@type": "Offer",
              url: "https://www.qualityblinds.com.au/blinds/roller/blockout-roller-blinds",
              availability: "https://schema.org/InStock",
              priceCurrency: "AUD",
              priceSpecification: {
                "@type": "PriceSpecification",
                price: "Contact for Quote",
                priceCurrency: "AUD",
              },
              seller: {
                "@type": "Organization",
                name: "Quality Blinds Australia",
              },
              priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0], // 1 year from now
            },
            additionalProperty:
              product.features?.map((feature, index) => ({
                "@type": "PropertyValue",
                name: `Feature ${index + 1}`,
                value: feature,
              })) || [],
            isRelatedTo:
              product.relatedProducts?.map((related) => ({
                "@type": "Product",
                name: related.name,
                url: `https://www.qualityblinds.com.au${related.href}`,
              })) || [],
          }),
        }}
      />

      {/* Breadcrumb structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.qualityblinds.com.au/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blinds",
                item: "https://www.qualityblinds.com.au/blinds",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Roller Blinds",
                item: "https://www.qualityblinds.com.au/blinds/roller",
              },
              {
                "@type": "ListItem",
                position: 4,
                name: product.name,
                item: "https://www.qualityblinds.com.au/blinds/roller/blockout-roller-blinds",
              },
            ],
          }),
        }}
      />
    </>
  );
}

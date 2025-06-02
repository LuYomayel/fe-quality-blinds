import ProductDetail from "@/components/ProductDetail";
import { productData } from "@/data/productData";
import { notFound } from "next/navigation";

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

// Generate static params for all Shutters products
export async function generateStaticParams() {
  const shutterProducts = productData.filter(
    (product) =>
      product.id.includes("shutter") ||
      product.name.toLowerCase().includes("shutter")
  );

  return shutterProducts.map((product) => ({
    productId: product.id,
  }));
}

export default function ShuttersProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const foundProduct = productData.find((p) => p.id === params.productId);

  if (!foundProduct) {
    notFound();
  }

  const product = foundProduct as Product;

  return (
    <main className="pt-20">
      <ProductDetail product={product} />
    </main>
  );
}

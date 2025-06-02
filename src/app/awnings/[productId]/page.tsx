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

// Generate static params for all Awnings products
export async function generateStaticParams() {
  const awningProducts = productData.filter(
    (product) =>
      product.id.includes("awning") ||
      product.name.toLowerCase().includes("awning")
  );

  return awningProducts.map((product) => ({
    productId: product.id,
  }));
}

export default async function AwningsProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const foundProduct = productData.find((p) => p.id === productId);

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

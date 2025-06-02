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

// Generate static params for all Roller blinds products
export async function generateStaticParams() {
  const rollerBlindProducts = productData.filter(
    (product) =>
      product.id.includes("roller") ||
      product.name.toLowerCase().includes("roller")
  );

  return rollerBlindProducts.map((product) => ({
    productId: product.id,
  }));
}

export default function RollerBlindsProductPage({
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

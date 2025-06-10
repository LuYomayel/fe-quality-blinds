import ProductDetail from "@/components/ProductDetail";
import { productData } from "@/data/productData";
import { notFound } from "next/navigation";

// Generate static params for all Curtains products
export async function generateStaticParams() {
  const curtainProducts = productData.filter(
    (product) =>
      product.id.includes("curtain") ||
      product.name.toLowerCase().includes("curtain") ||
      product.id.includes("sheer") ||
      product.id.includes("veri-shade") ||
      product.category === "Curtains"
  );

  return curtainProducts.map((product) => ({
    productId: product.id,
  }));
}

export default async function CurtainsProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const foundProduct = productData.find((p) => p.id === productId);

  if (!foundProduct) {
    notFound();
  }

  return (
    <main>
      <ProductDetail product={foundProduct} />
    </main>
  );
}

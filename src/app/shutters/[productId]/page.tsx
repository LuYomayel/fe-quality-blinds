import ProductDetail from "@/components/ProductDetail";
import { productData } from "@/data/productData";
import { notFound } from "next/navigation";

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

export default async function ShuttersProductPage({
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

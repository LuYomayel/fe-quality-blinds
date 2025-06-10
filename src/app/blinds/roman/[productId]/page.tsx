import ProductDetail from "@/components/ProductDetail";
import { productData } from "@/data/productData";
import { notFound } from "next/navigation";

// Generate static params for all Roman Blinds products
export async function generateStaticParams() {
  const romanBlindProducts = productData.filter(
    (product) =>
      product.id.includes("roman") ||
      product.name.toLowerCase().includes("roman")
  );

  return romanBlindProducts.map((product) => ({
    productId: product.id,
  }));
}

export default async function RomanBlindsProductPage({
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

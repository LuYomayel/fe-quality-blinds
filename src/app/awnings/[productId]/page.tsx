import ProductDetail from "@/components/ProductDetail";
import { productData } from "@/data/productData";
import { notFound } from "next/navigation";

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

  return (
    <main>
      <ProductDetail product={foundProduct} />
    </main>
  );
}

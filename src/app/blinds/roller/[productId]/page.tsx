import ProductDetail from "@/components/ProductDetail";
import { productData } from "@/data/productData";
import { notFound } from "next/navigation";

// Generate static params for all Roller Blinds products
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

export default async function RollerBlindsProductPage({
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

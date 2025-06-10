import ProductDetail from "@/components/ProductDetail";
import { productData } from "@/data/productData";
import { notFound } from "next/navigation";

// Generate static params for all Venetian Blinds products
export async function generateStaticParams() {
  const venetianBlindProducts = productData.filter(
    (product) =>
      product.id.includes("venetian") ||
      product.name.toLowerCase().includes("venetian")
  );

  return venetianBlindProducts.map((product) => ({
    productId: product.id,
  }));
}

export default async function VenetianBlindsProductPage({
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

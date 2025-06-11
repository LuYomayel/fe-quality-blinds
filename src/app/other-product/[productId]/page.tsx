import ProductDetail from "@/components/ProductDetail";
import { productData } from "@/data/productData";
import { notFound } from "next/navigation";

// Generate static params for all Other Products
export async function generateStaticParams() {
  const otherProducts = productData.filter((product) =>
    ["louvers", "polycarbonate-roofings", "shade-sails", "umbrellas"].includes(
      product.id
    )
  );

  return otherProducts.map((product) => ({
    productId: product.id,
  }));
}

// Generate metadata for each product page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const foundProduct = productData.find((p) => p.id === productId);

  if (!foundProduct) {
    return {
      title: "Product Not Found | Quality Blinds Australia",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: `${foundProduct.name} | Quality Blinds Australia`,
    description: foundProduct.shortDescription,
    openGraph: {
      title: `${foundProduct.name} | Quality Blinds Australia`,
      description: foundProduct.shortDescription,
      images: foundProduct.images?.[0]?.src ? [foundProduct.images[0].src] : [],
    },
  };
}

export default async function OtherProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const foundProduct = productData.find((p) => p.id === productId);

  if (!foundProduct) {
    notFound();
  }

  // Ensure it's actually an "other product"
  const isOtherProduct = [
    "louvers",
    "polycarbonate-roofings",
    "shade-sails",
    "umbrellas",
  ].includes(foundProduct.id);

  if (!isOtherProduct) {
    notFound();
  }

  return (
    <main>
      <ProductDetail product={foundProduct} />
    </main>
  );
}

import { Metadata } from "next";
import { ProductInterface } from "@/lib/models";

async function getProduct(productId: string): Promise<ProductInterface> {
  console.log(`Fetching product with ID: ${productId}`);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/fetch/products?product_id=${productId}`
  );
  const data = await response.json();
  console.log("Fetched product data:", data[0]);
  return data[0];
}

export async function generateMetadata({
  params,
}: {
  params: { product: string };
}): Promise<Metadata> {
  console.log("Generating metadata for product:", params.product);
  const product = await getProduct(params.product);

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [`/product/${params.product}/opengraph-image`],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [`/product/${params.product}/opengraph-image`],
    },
  };
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import { ImageResponse } from "@vercel/og";
import { ProductInterface } from "@/lib/models";

export const runtime = "edge";

export const alt = "Product Image";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

async function getProduct(productId: string): Promise<ProductInterface> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/fetch/products?product_id=${productId}`
  );
  const data = await response.json();
  return data[0];
}

export default async function Image({
  params,
}: {
  params: { product: string };
}) {
  const product = await getProduct(params.product);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: "#f1f5f9", // Light gray background
          overflow: "hidden",
        }}
      >
        <img
          src={product.ThumbnailUrl}
          alt={product.Name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}

// <div
//         className="flex text-xl text-black bg-white h-[100%] w-[100%] flex-col justify-center items-center"
//         style={{
//           display: "flex",
//           fontSize: 60,
//           color: "black",
//           background: "#f6f6f6",
//           width: "100%",
//           height: "100%",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <img
//           src={product.ThumbnailUrl}
//           alt={product.Name}
//           width={700}
//           height={500}
//         />
//         <div style={{ marginTop: 40 }}>{product.Name}</div>
//       </div>
//     ),
//     {
//       ...size,
//     }

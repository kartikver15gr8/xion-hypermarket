"use client";

import EditProduct from "@/components/ProductPages/EditProduct";

export default function page({ params }: any) {
  const id: number = params.product_id;
  return (
    <div className="pt-16 w-full ">
      <EditProduct productId={id} />
    </div>
  );
}

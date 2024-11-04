"use client";
import PreviewProduct from "@/components/ProductPages/PreviewProduct";
import { Suspense } from "react";

export default function ProductPreview() {
  return (
    <div className="pt-16">
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <p className="text-4xl md:text-5xl xl:text-6xl font-bold italic animate-pulse opacity-0 transition-opacity duration-2000 ease-in-out delay-500">
              Loading Preview!
            </p>
          </div>
        }
      >
        <PreviewProduct />
      </Suspense>
    </div>
  );
}

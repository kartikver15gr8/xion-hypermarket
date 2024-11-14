"use client";

import { ProductInterface, ProductInterfaceTwo } from "@/lib/models";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useCallback } from "react";
import { HotProductCard } from "@/components/MainPage/ProductExhibition";
import spinnerThree from "@/public/loaders/spinnerthree.svg";
import Image from "next/image";
import { Suspense } from "react";

function SearchContent() {
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;
  const [allProducts, setAllProducts] = useState<ProductInterfaceTwo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllProducts = useCallback(async () => {
    if (typeof window === "undefined") return; // Don't run on server side

    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<ProductInterfaceTwo[]>(
        `${process.env.NEXT_PUBLIC_SWAGGER_API_V2}/products?limit=40`
      );
      setAllProducts(response.data);
    } catch (error) {
      console.error(`Error fetching products: ${error}`);
      setError("Failed to fetch products. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return allProducts;
    const lowerQuery = searchQuery.toLowerCase();
    return allProducts.filter(
      (product) =>
        product.Name.toLowerCase().includes(lowerQuery) ||
        product.Description.toLowerCase().includes(lowerQuery) ||
        product.Category.Name.toLowerCase().includes(lowerQuery)
    );
  }, [allProducts, searchQuery]);

  return (
    <div className="pt-16 pb-20 border px-[20px] sm:px-[20px] md:px-[40px] lg:px-[60px] xl:px-[100px] 2xl:px-[140px] min-h-screen">
      <div className="mt-4 flex gap-x-2 items-center">
        <h1 className="text-3xl font-medium italic">Similar Results</h1>
        <svg
          className="w-7"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
        >
          <g fill="black">
            <path
              d="M192 112a80 80 0 1 1-80-80a80 80 0 0 1 80 80"
              opacity="0.2"
            />
            <path d="m229.66 218.34l-50.06-50.06a88.21 88.21 0 1 0-11.32 11.31l50.06 50.07a8 8 0 0 0 11.32-11.32M40 112a72 72 0 1 1 72 72a72.08 72.08 0 0 1-72-72" />
          </g>
        </svg>
      </div>
      {searchQuery && (
        <p className="mt-2">Showing results for: {`"${searchQuery}"`}</p>
      )}
      <div className="mt-4">
        {isLoading ? (
          <div className="flex justify-center mt-2">
            <Image className="w-10 lg:w-12" src={spinnerThree} alt="" />
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product, key) => (
              <HotProductCard
                key={key}
                redirectHref={`/product/${product.ID}`}
                img={product.ThumbnailURL}
                category={product.Category.Name}
                productName={product.Name}
                description={product.Description}
                price={`$${product.Price} one time payment`}
              />
            ))}
          </div>
        ) : (
          <p>No products found matching your search.</p>
        )}
      </div>
    </div>
  );
}

// Wrapper component
export default function Search() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <Image className="w-10 lg:w-12" src={spinnerThree} alt="Loading..." />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}

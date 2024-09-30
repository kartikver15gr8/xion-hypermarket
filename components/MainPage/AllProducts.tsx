"use client";
import { ProductInterface } from "@/lib/models";
import axios from "axios";
import spinnerthree from "@/public/loaders/spinnerthree.svg";

import { useEffect, useState } from "react";
import Image from "next/image";
import { HotProductCard } from "./ProductExhibition";

export default function AllProducts() {
  const [allProducts, setAllProducts] = useState<ProductInterface[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      // fetching all products
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/fetch/products`
      );
      //   console.log(response.data);

      setAllProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.log(`Error while fetching products: ${error}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="pb-20 w-full">
      <div className="h-20 flex items-center">
        <p className="font-medium text-3xl italic">
          Grab your product, and pay with crypto!
        </p>
      </div>

      <div className="pt-5">
        {loading && (
          <div className="flex justify-center mt-2">
            <Image className="w-10 lg:w-12" src={spinnerthree} alt="" />
          </div>
        )}

        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-2 xl:gap-y-3 xl:gap-x-3">
          {allProducts && (
            <>
              {allProducts.map((elem, key) => (
                <HotProductCard
                  key={key}
                  redirectHref={`/product/${elem.ID}`}
                  img={elem.ThumbnailUrl}
                  category="Digital Product"
                  productName={elem.Name}
                  description={elem.Description}
                  price={`$${elem.Price} one time payment`}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

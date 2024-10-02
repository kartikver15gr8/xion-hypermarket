"use client";
import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import Image, { StaticImageData } from "next/image";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ProductInterface } from "@/lib/models";
import axios from "axios";
import { products } from "@/lib/blinksProducts";
import lushBanner from "@/public/_static/background/lushhomebanner.png";
import noisebg from "@/public/_static/background/noisebg.png";
import thunderbg from "@/public/_static/background/thunderbg.png";
import thundertwo from "@/public/_static/background/thundertwo.png";
import bglines from "@/public/_static/background/bglines.png";
import grid from "@/public/_static/illustrations/grid.svg";
import coins from "@/public/_static/illustrations/coins.svg";
import sendit_cropped_ape from "@/public/_static/illustrations/sendit_cropped_ape.svg";
import sendit_white_ape from "@/public/sendit_white_ape.svg";

export function ProductsMarquee() {
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
    <div className="relative border rounded-xl  mx-2 sm:mt-14 md:mt-10 p-5  flex flex-col items-center py-[20px] lg:py-[40px] xl:py-[50px] overflow-hidden">
      <Image
        src={thunderbg}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-[2%]"
      />
      <Image
        src={thundertwo}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-[5%] mix-blend-exclusion"
      />
      <Image
        src={grid}
        alt="Background"
        layout="fill"
        objectFit=""
        className="opacity-[21%] mix-blend-exclusion"
      />
      <Image
        src={coins}
        alt="Background"
        layout="fill"
        objectFit=""
        className="opacity-[100%]"
      />
      {allProducts.length >= 1 && (
        <p className="font-medium text-[12px] lg:text-[16px] 2xl:text-[18px] my-1 z-10">
          SIMILAR PRODUCTS
        </p>
      )}
      {allProducts.length >= 1 && (
        <p className="mt-3 mb-6 text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-medium z-10">
          Check Out Other Products
        </p>
      )}
      <div className="relative flex h-fit w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-none">
        <Marquee pauseOnHover className="[--duration:30s]">
          {allProducts.map((elem, key) => (
            <ProductCard
              key={key}
              redirectHref={`/product/${elem.ID}`}
              img={elem.ThumbnailUrl}
              category="Digital Product"
              productName={elem.Name}
              description={elem.Description}
              price={`$${elem.Price} one time payment`}
            />
          ))}
        </Marquee>

        {/* with side shadows */}
        {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background opacity-60 "></div> */}
        {/* <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background opacity-60"></div> */}
      </div>
    </div>
  );
}

export const ProductCard = ({
  img,
  category,
  productName,
  description,
  price,
  redirectHref,
}: {
  img: string | undefined;
  category: string;
  productName: string;
  description: string;
  price: string;
  redirectHref: string;
}) => {
  return (
    <Link
      href={redirectHref}
      className="p-1 bg-white bg-opacity-80 border border-[#ccccce] rounded-lg hover:bg-[#e7e7e9] hover:border-[#ababae] hover:shadow-lg transition-all duration-300 w-72 h-80"
    >
      <div className="relative w-full h-0 pb-[60%] overflow-hidden rounded border border-[#ccccce]">
        <img
          src={img}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-1">
        <p className="text-[8px] sm:text-[10px] bg-[#d0d0d3] w-fit mt-1 sm:mt-2 px-1 rounded-[2px]">
          {category}
        </p>
        <p className="font-bold text-lg mt-1 md:mt-2">{productName}</p>
        <p className="text-[9px] sm:text-[10px] md:text-[12px] w-[80%] text-[#8B8B92]">
          {description}
        </p>
        <p className="mt-1 sm:mt-2 text-[12px] md:text-[14px]">{price}</p>
      </div>
    </Link>
  );
};

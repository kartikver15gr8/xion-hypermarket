"use client";
import { useEffect, useState } from "react";
import { ProductInterface } from "@/lib/models";
import axios from "axios";
import lushBanner from "@/public/_static/background/lushhomebanner.png";
import Image from "next/image";
import { HotProductCard } from "@/components/MainPage/ProductExhibition";
import spinnerthree from "@/public/loaders/spinnerthree.svg";

export default function ProductByCategory({ params }: any) {
  const [categoryId, setCategoryId] = useState(params.categoryId);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [productsByCategory, setProductsByCategory] = useState<
    ProductInterface[]
  >([]);

  const fetchProductsByCategory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/fetch/products?category_id=${categoryId}`
      );
      //   console.log(response.data);
      setProductsByCategory(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(`Got an error while fetching the products: ${error}`);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProductsByCategory();
  }, []);

  useEffect(() => {
    if (categoryId == 7) {
      setCategoryName("How To Guides");
      setCategoryDescription("Step-by-step guides for easy learning");
    } else if (categoryId == 8) {
      setCategoryName("SaaS Apps");
      setCategoryDescription("Cloud solutions to power your business");
    } else if (categoryId == 9) {
      setCategoryName("Marketing Tools");
      setCategoryDescription("Boost your reach with powerful tools");
    } else if (categoryId == 10) {
      setCategoryName("Bots");
      setCategoryDescription("Automated solutions for seamless workflows");
    } else if (categoryId == 11) {
      setCategoryName("Game Assets");
      setCategoryDescription("Creative Assets for immersive games");
    } else if (categoryId == 12) {
      setCategoryName("Design Templates");
      setCategoryDescription("Customizable templates for any project");
    }
  }, []);

  return (
    <div className="pt-16 pb-20 border px-[20px] sm:px-[20px] md:px-[40px] lg:px-[60px] xl:px-[65px] 2xl:px-[100px] min-h-screen">
      <div className="h-40 relative flex overflow-hidden border mt-4 rounded-xl flex-col items-center justify-center">
        <Image
          src={lushBanner}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-95"
        />
        <div className="relative z-10 bg-transparent text-white flex flex-col items-center">
          <p className="text-4xl font-bold">{categoryName}</p>
          <p className="text-sm">{categoryDescription}</p>
        </div>
      </div>
      {productsByCategory && productsByCategory.length >= 1 ? (
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-2 xl:gap-y-3 xl:gap-x-3 mt-4">
          {productsByCategory.map((elem, key) => {
            return (
              <HotProductCard
                key={key}
                redirectHref={`/product/${elem.ID}`}
                img={elem.ThumbnailUrl}
                category="Digital Product"
                productName={elem.Name}
                description={elem.Description}
                price={`$${elem.Price} one time payment`}
              />
            );
          })}
        </div>
      ) : (
        <div className="">
          {loading ? (
            <div className="flex justify-center mt-2">
              <Image className="w-10 lg:w-12" src={spinnerthree} alt="" />
            </div>
          ) : (
            <div className="flex justify-center mt-2 text-lg flex-col items-center">
              <p>No Products for this category yet.</p>
              <p>
                Why don&apos;t you register as a seller and earn great
                incentives.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

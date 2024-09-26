"use client";
import BorrowUSDCBannerBtn from "@/components/BorrowUSDCBannerBtn";
import Image, { StaticImageData } from "next/image";
import React, { useEffect } from "react";
import { useState } from "react";
import kody from "@/public/kody.svg";
import noisebg from "@/public/_static/background/noisebg.png";
import { Button } from "@/components/ui/button";
import kind from "@/public/kind.svg";
import Trending_AI_UX_Patterns from "@/public/designuxone.svg";
import Design_System_UI_Kit_for_Figma from "@/public/designuxtwo.svg";
import Warp_Tools_for_Figma from "@/public/designuxthree.svg";
import How_to_Design_Better_UI from "@/public/designuxfour.svg";
import designfive from "@/public/designproductfive.svg";
import Telegram_Insiders_Group from "@/public/telegraminsider.svg";
import MEV_Bots from "@/public/mevbots.svg";
import Rain_Drops_Simulator from "@/public/raindropapeicon.svg";
import TOP_100_VCs_LIST from "@/public/hotproductone.svg";
import axios from "axios";
import { ProductInterface } from "@/lib/models";
import { useRouter } from "next/navigation";
import star from "@/public/_static/illustrations/star.svg";

export default function Product({ params }: any) {
  const router = useRouter();
  const [productId, setProductId] = useState(params.product);
  const [productById, setProductById] = useState<ProductInterface>();
  const [bannerImg, setBannerImg] = useState(TOP_100_VCs_LIST);

  // Fetch product data based on productId
  const fetchProductData = async () => {
    try {
      console.log(`Fetching product with ID: ${productId}`);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/fetch/products?product_id=${productId}`
      );
      setProductById(response.data[0]);
    } catch (error) {
      console.error(`Error fetching product data: ${error}`);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProductData();
    }
  }, [productId]);

  return (
    <div className="pt-16 w-full min-h-screen px-[11px] sm:px-[20px] md:px-[20px] lg:px-[30px] xl:px-[80px] 2xl:px-[200px] ">
      {productById && <FolderStructure product={productById.Name} />}
      {productById && (
        <ProductDetails
          bannerImg={bannerImg}
          productName={productById.Name}
          price={`$${productById.Price}`}
        />
      )}
      {productById && (
        <ProductReviews productDescription={productById.Description} />
      )}
    </div>
  );
}

const ProductDetails = ({
  bannerImg,
  productName,
  price,
}: {
  bannerImg: string;
  productName: string;
  price: string;
}) => {
  return (
    <div className="">
      {/* Top section which will show the folder structure */}

      {/* Main Product */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-5 mb-5 xl:gap-x-8 2xl:gap-x-12 px-2 pt-2 xl:justify-between 2xl:justify-evenly gap-y-4 sm:gap-y-4 md:gap-y-4 lg:gap-y-0 lg:gap-x-2">
        <div className="col-span-5 sm:col-span-5 md:col-span-5 lg:col-span-3">
          <Image
            src={bannerImg}
            className="w-full h-full"
            alt="product"
            height={300}
            width={500}
          />
        </div>
        <div className="lg:col-span-2 col-span-1 sm:col-span-1 md:col-span-1">
          <BorrowUSDCBannerBtn />
          <div className="flex items-center mt-4 justify-between">
            <p className="font-bold text-xl">{productName}</p>

            <div className="flex  items-center gap-x-2">
              <Image src={kody} className="w-5 h-5 rounded-full" alt="" />
              <p className="text-xs md:text-sm">Kody | LP Labs</p>
            </div>
          </div>
          <div className="mt-4 mb-1 flex items-center justify-between text-xs md:text-sm">
            <div className="border flex items-center w-36 h-12 rounded bg-[#F7F7F5]">
              <div className="border-r w-[50%] flex justify-center h-full items-center line-through">
                $14,99
              </div>
              <div className=" w-[50%] flex justify-center h-full items-center">
                {price}
              </div>
            </div>

            <div className="flex items-center gap-x-2">
              <p>5 Ratings</p>

              <div className="flex">
                <Image className="w-3" src={star} alt="" />
              </div>
            </div>
          </div>

          <div className="flex flex-col my-4 gap-y-1 text-sm md:text-[15px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-1">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.47203 11.2427L6.52922 12.1855C5.22748 13.4872 3.11693 13.4872 1.81518 12.1855C0.51343 10.8837 0.51343 8.77317 1.81518 7.47142L2.75799 6.52861M11.2433 7.47142L12.1861 6.52861C13.4878 5.22686 13.4878 3.11632 12.1861 1.81457C10.8843 0.51282 8.77378 0.51282 7.47203 1.81457L6.52922 2.75738M4.66729 9.33334L9.33396 4.66667"
                    stroke="#8B8B92"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <p>File size</p>
              </div>
              <p>7 MB</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-1">
                <svg
                  width="12"
                  height="16"
                  viewBox="0 0 12 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.33366 7.33337H3.33366M4.66699 10H3.33366M8.66699 4.66671H3.33366M11.3337 4.53337V11.4667C11.3337 12.5868 11.3337 13.1469 11.1157 13.5747C10.9239 13.951 10.618 14.257 10.2416 14.4487C9.81382 14.6667 9.25376 14.6667 8.13366 14.6667H3.86699C2.74689 14.6667 2.18683 14.6667 1.75901 14.4487C1.38269 14.257 1.07673 13.951 0.884979 13.5747C0.666992 13.1469 0.666992 12.5868 0.666992 11.4667V4.53337C0.666992 3.41327 0.666992 2.85322 0.884979 2.42539C1.07673 2.04907 1.38269 1.74311 1.75901 1.55136C2.18683 1.33337 2.74689 1.33337 3.86699 1.33337H8.13366C9.25376 1.33337 9.81382 1.33337 10.2416 1.55136C10.618 1.74311 10.9239 2.04907 11.1157 2.42539C11.3337 2.85322 11.3337 3.41327 11.3337 4.53337Z"
                    stroke="#8B8B92"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <p>UI Lessons</p>
              </div>
              <p>56</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-1">
                <svg
                  width="16"
                  height="14"
                  viewBox="0 0 16 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.66634 3.66667L7.92265 2.17928C7.70861 1.7512 7.60158 1.53715 7.44192 1.38078C7.30073 1.24249 7.13056 1.13732 6.94372 1.07287C6.73245 1 6.49315 1 6.01454 1H3.46634C2.7196 1 2.34624 1 2.06102 1.14532C1.81014 1.27316 1.60616 1.47713 1.47833 1.72801C1.33301 2.01323 1.33301 2.3866 1.33301 3.13333V3.66667M1.33301 3.66667H11.4663C12.5864 3.66667 13.1465 3.66667 13.5743 3.88465C13.9506 4.0764 14.2566 4.38236 14.4484 4.75869C14.6663 5.18651 14.6663 5.74656 14.6663 6.86667V9.8C14.6663 10.9201 14.6663 11.4802 14.4484 11.908C14.2566 12.2843 13.9506 12.5903 13.5743 12.782C13.1465 13 12.5864 13 11.4663 13H4.53301C3.4129 13 2.85285 13 2.42503 12.782C2.0487 12.5903 1.74274 12.2843 1.55099 11.908C1.33301 11.4802 1.33301 10.9201 1.33301 9.8V3.66667Z"
                    stroke="#8B8B92"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <p>Files Included</p>
              </div>
              <p>To be added</p>
            </div>
          </div>

          <div className="mt-1">
            <p className="text-xs md:text-[12px] font-medium">Make a price:</p>
            <div className="relative border h-12 mt-1 flex justify-between px-4 items-center shadow-[inset_5px_2px_28px_rgba(0,0,0,0.07)]">
              <Image
                src={noisebg}
                alt="Background"
                layout="fill"
                objectFit="cover"
                className="opacity-[5%]"
              />
              <p className="text-xl font-bold">Price</p>
              <div className="border bg-white z-10 flex items-center px-2 h-10 w-28">
                <p>$</p>
                <input
                  type="number"
                  className="flex items-center p-1 h-full w-full outline-none "
                />
              </div>
            </div>
            <p className="text-xs md:text-[12px] font-medium mt-1">
              Available in Wallet: 2000 USDC
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-2 h-14 mt-4 w-full">
            <Button className="text-black h-full bg-inherit border border-[#959592] hover:bg-[#dfdfdc] transition-all duration-200">
              Add to Basket!
            </Button>
            <Button className="h-full hover:bg-[#095492] transition-all duration-200">
              Buy Now!
            </Button>
          </div>
          <div className="flex p-2 mt-5 rounded border h-16 items-center relative overflow-hidden">
            <p className="text-[12px]">
              This product supports purchasing power parity. Because you&apos;re
              located in UAE, the price has been discounted by 10% to $8,99.
            </p>
            <Image
              src={kind}
              alt="svg"
              className="w-20 absolute -right-4 -bottom-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FolderStructure = ({ product }: { product: string }) => {
  return (
    <div className="flex items-center gap-x-3 mt-5 border-b pb-1 border-[##E8E7E5]">
      <svg
        className="w-4"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.5 16.5V10.3333C6.5 9.86661 6.5 9.63326 6.59083 9.455C6.67072 9.29819 6.79821 9.17071 6.95501 9.09081C7.13327 8.99999 7.36662 8.99999 7.83333 8.99999H10.1667C10.6334 8.99999 10.8667 8.99999 11.045 9.09081C11.2018 9.17071 11.3293 9.29819 11.4092 9.455C11.5 9.63326 11.5 9.86661 11.5 10.3333V16.5M8.18141 1.30333L2.52949 5.69927C2.15168 5.99312 1.96278 6.14005 1.82669 6.32405C1.70614 6.48704 1.61633 6.67065 1.56169 6.86588C1.5 7.08627 1.5 7.32558 1.5 7.80421V13.8333C1.5 14.7667 1.5 15.2335 1.68166 15.59C1.84144 15.9036 2.09641 16.1585 2.41002 16.3183C2.76654 16.5 3.23325 16.5 4.16667 16.5H13.8333C14.7668 16.5 15.2335 16.5 15.59 16.3183C15.9036 16.1585 16.1586 15.9036 16.3183 15.59C16.5 15.2335 16.5 14.7667 16.5 13.8333V7.80421C16.5 7.32558 16.5 7.08627 16.4383 6.86588C16.3837 6.67065 16.2939 6.48704 16.1733 6.32405C16.0372 6.14005 15.8483 5.99312 15.4705 5.69927L9.81859 1.30333C9.52582 1.07562 9.37943 0.961766 9.21779 0.918001C9.07516 0.879384 8.92484 0.879384 8.78221 0.918001C8.62057 0.961766 8.47418 1.07562 8.18141 1.30333Z"
          stroke="#050505"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <svg
        width="6"
        height="10"
        viewBox="0 0 6 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 9L5 5L1 1"
          stroke="#050505"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <p>Design</p>

      <svg
        width="6"
        height="10"
        viewBox="0 0 6 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 9L5 5L1 1"
          stroke="#050505"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <p className="text-[#8B8B92]">{product}</p>
    </div>
  );
};

const ProductReviews = ({
  productDescription,
}: {
  productDescription: string;
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-5 xl:gap-x-4 2xl:gap-x-8 px-2 pt-2 xl:justify-between 2xl:justify-evenly gap-y-4 sm:gap-y-4 md:gap-y-4 lg:gap-y-0 mb-10">
      <div className=" col-span-5 sm:col-span-5 md:col-span-5 lg:col-span-3">
        <p className="font-bold text-lg">Description:</p>
        <p className="text-[#8B8B92] text-[13px]">Version 3.0 is out now!</p>
        <div className="mt-4">
          <p className="text-sm md:text-[15px]">{productDescription}</p>
        </div>
      </div>
      <div className="lg:col-span-2 col-span-1 sm:col-span-1 md:col-span-1">
        <p className="font-bold text-lg">Ratings:</p>
        <div className="flex mt-4">
          <div className="flex">
            <Image className="w-3" src={star} alt="" />
          </div>
        </div>
        <p>&quot;Absolutely amazing ebook, would highly recommend&quot;</p>
        <p>Buyer&apos;s Name</p>
        <div className="flex mt-4">
          <div className="flex">
            <Image className="w-3" src={star} alt="" />
          </div>
        </div>
        <p>&quot;Absolutely amazing ebook, would highly recommend&quot;</p>
        <p>Buyer&apos;s Name</p>
        <div className="flex mt-4">
          <div className="flex">
            <Image className="w-3" src={star} alt="" />
          </div>
        </div>
        <p>&quot;Absolutely amazing ebook, would highly recommend&quot;</p>
        <p>Buyer&apos;s Name</p>
      </div>
    </div>
  );
};

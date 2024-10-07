"use client";
import { useEffect, useState } from "react";
import { ProductInterface, User } from "@/lib/models";
import axios from "axios";
import lushBanner from "@/public/_static/background/lushhomebanner.png";
import Image from "next/image";
import { HotProductCard } from "@/components/MainPage/ProductExhibition";
import spinnerthree from "@/public/loaders/spinnerthree.svg";
import Link from "next/link";
import homeIconSVG from "@/public/homeicon.svg";

export default function ProductBySeller({ params }: any) {
  const [sellerWalletAddress, setSellerWalletAddress] = useState(
    params.sellerId
  );
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [sellerDetails, setSellerDetails] = useState<User>();
  const [productsByCategory, setProductsByCategory] = useState<
    ProductInterface[]
  >([]);

  //   const fetchSellerDetails = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/fetch/user/${sellerWalletAddress}`
  //       );
  //       console.log(response.data[0]);
  //       setSellerDetails(response.data[0]);
  //     } catch (error) {
  //       console.log(`Error while fetching seller's data: ${error}`);
  //     }
  //   };

  const fetchProductsByCategory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/fetch/products?seller_wallet_address=${sellerWalletAddress}`
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

  //   useEffect(() => {
  //     if (sellerWalletAddress) {
  //       fetchSellerDetails();
  //     }
  //   }, []);

  return (
    <div className="pt-16 pb-20 border px-[20px] sm:px-[20px] md:px-[40px] lg:px-[60px] xl:px-[65px] 2xl:px-[100px] min-h-screen">
      <FolderStructure
        sellerWallet={`${sellerWalletAddress.slice(
          0,
          4
        )}…${sellerWalletAddress.slice(-4)}`}
      />
      <p className="text-2xl mt-5 font-medium">
        Available products by the Seller{" "}
      </p>
      {productsByCategory && productsByCategory.length >= 1 ? (
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-2 xl:gap-y-3 xl:gap-x-3 mt-4">
          {productsByCategory.map((elem, key) => {
            return (
              <HotProductCard
                key={key}
                redirectHref={`/product/${elem.id}`}
                img={elem.thumbnail_url}
                category="Digital Product"
                productName={elem.name}
                description={elem.description}
                price={`${elem.price} SOL one time payment`}
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

const FolderStructure = ({
  sellerWallet,
}: {
  sellerWallet: string | undefined;
}) => {
  return (
    <div className="flex items-center gap-x-3 mt-5 border-b pb-1 border-[##E8E7E5]">
      <Link href={"/"} className="w-fit">
        <Image
          className="w-4"
          src={homeIconSVG}
          alt="home"
          width={50}
          height={50}
        />
      </Link>

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

      <p className=" cursor-pointer">Seller</p>

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

      <p className="text-[#8B8B92]">{sellerWallet}</p>
    </div>
  );
};

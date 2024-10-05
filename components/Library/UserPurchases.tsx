"use client";

import Image, { StaticImageData } from "next/image";
import Design_System_UI_Kit_for_Figma from "@/public/_static/illustrations/Blinks.png";
import { useEffect, useState } from "react";
import { ProductInterface, PurchasesInterface } from "@/lib/models";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { phantomWallet } from "@/store/atom/phantomWallet";
import homeIconSVG from "@/public/homeicon.svg";
import Link from "next/link";
export default function UserLibrary() {
  const [userId, setUserId] = useState(0);
  const userWalletAddress = useRecoilValue(phantomWallet);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/fetch/user/${userWalletAddress}`
      );
      setUserId(response.data.ID);
      return response.data;
    } catch (error) {
      return `Error: ${error}`;
    }
  };

  useEffect(() => {
    if (userWalletAddress) {
      fetchUserDetails();
    }
  }, [userWalletAddress]);

  return (
    <div className="">
      <TopBar />
      <div className="flex items-center gap-x-5 mt-10">
        <p className="text-4xl font-bold">Your Recent Purchases</p>
      </div>

      {/* <PurchaseDetails
        purchaseDate="September 16, 2024, 2:35 PM UTC"
        paymentMethod="Wallet: Ox6b..3dsx"
        txId="0x...454jkx"
      /> */}
      <PurchasedProducts userId={userId} />
      {/* <div className="mt-8 justify-end flex">
        <Summary />
      </div> */}
    </div>
  );
}

const PurchaseDetails = ({
  purchaseDate,
  paymentMethod,
  txId,
}: {
  purchaseDate: string;
  paymentMethod: string;
  txId: string;
}) => {
  return (
    <div className="grid grid-cols-3 mt-5 w-[80%]">
      <div>
        <p className="text-[#8B8B93]">PURCHASE DATE</p>
        <p>{purchaseDate}</p>
      </div>
      <div>
        <p className="text-[#8B8B93]">PAYMENT METHOD</p>
        <p>{paymentMethod}</p>
      </div>
      <div>
        <p className="text-[#8B8B93]">TRANSACTION ID</p>
        <p>{txId}</p>
      </div>
    </div>
  );
};

const TopBar = () => {
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

      <p>Orders</p>
    </div>
  );
};

const PurchasedProducts = ({ userId }: { userId: number }) => {
  const [productPurchases, setProductPurchases] = useState<
    PurchasesInterface[]
  >([]);

  const fetchPurchases = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/fetch/purchases?user_id=${userId}`
      );
      // console.log(response.data);
      setProductPurchases(response.data);
    } catch (error) {
      console.log(`You got an error while fetching user purchases: ${error}`);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  return (
    <div className="border rounded-xl bg-white shadow-lg mt-14">
      <div className="grid grid-cols-10 h-14 items-center px-3 border-b text-[#8B8B93]">
        <p className="col-span-3">PRODUCT</p>
        <p className="col-span-1">PRICE</p>
        <p className="col-span-2">DETAILS</p>
        <p className="col-span-2">SELLER</p>
        <p className="col-span-2">ACTION</p>
      </div>
      {productPurchases.length > 1 ? (
        <div className="h-[50vh] overflow-y-auto  hide-scrollbar scroll-smooth">
          {productPurchases.map((elem, key) => {
            return (
              <ProductLabel
                key={key}
                redirectURI={elem.product_id.toString()}
                productImg={elem.product_thumbnail_url}
                productName={elem.product_title}
                price={elem.amount.toFixed(2)}
                fileDetails={elem.product_filename}
                sellerDetails={`${elem.seller_wallet_address.slice(
                  0,
                  4
                )}…${elem.seller_wallet_address.slice(-3)}`}
              />
            );
          })}
        </div>
      ) : (
        <div className="h-20 overflow-y-auto  hide-scrollbar scroll-smooth">
          <ProductLabel
            productImg="https://ucarecdn.com/deb46443-1cf0-4ec1-bb33-f86d93cfb949/e15545c9453e489ca7dbe8dd427b00e3.webp"
            productName="No Product"
            price=""
            fileDetails=""
            sellerDetails="None"
            redirectURI={``}
          />
        </div>
      )}
    </div>
  );
};

const ProductLabel = ({
  productImg,
  productName,
  price,
  fileDetails,
  sellerDetails,
  redirectURI,
}: {
  productImg: string | StaticImageData;
  productName: string;
  price: string;
  fileDetails: string;
  sellerDetails: string;
  redirectURI: string;
}) => {
  return (
    <div className="grid grid-cols-10 border-b  h-20 px-3 items-center">
      <Link
        href={`/product/${redirectURI}`}
        className="col-span-3 flex items-center gap-x-4 cursor-pointer"
      >
        <Image
          src={productImg}
          alt="product"
          className=" w-16 h-16 rounded-md"
          width={100}
          height={100}
        />

        <p className="text-lg font-medium">{productName}</p>
      </Link>
      <div className="col-span-1">
        <p>${price}</p>
      </div>
      <div className="col-span-2 flex items-center gap-x-2">
        <svg
          className="w-3"
          viewBox="0 0 12 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.16732 0.823933V3.23342C7.16732 3.56011 7.16732 3.72346 7.2309 3.84824C7.28682 3.958 7.37606 4.04724 7.48582 4.10317C7.6106 4.16675 7.77395 4.16675 8.10065 4.16675H10.5101M10.6673 5.32655V9.53341C10.6673 10.5135 10.6673 11.0036 10.4766 11.3779C10.3088 11.7072 10.0411 11.9749 9.7118 12.1427C9.33746 12.3334 8.84741 12.3334 7.86732 12.3334H4.13398C3.15389 12.3334 2.66385 12.3334 2.2895 12.1427C1.96022 11.9749 1.6925 11.7072 1.52472 11.3779C1.33398 11.0036 1.33398 10.5135 1.33398 9.53341V3.46675C1.33398 2.48666 1.33398 1.99661 1.52472 1.62226C1.6925 1.29298 1.96022 1.02527 2.2895 0.857487C2.66385 0.666748 3.15389 0.666748 4.13398 0.666748H6.00752C6.43555 0.666748 6.64957 0.666748 6.85097 0.715101C7.02954 0.75797 7.20024 0.828678 7.35682 0.924628C7.53342 1.03285 7.68475 1.18418 7.98742 1.48685L9.84722 3.34665C10.1499 3.64931 10.3012 3.80065 10.4094 3.97725C10.5054 4.13383 10.5761 4.30453 10.619 4.48309C10.6673 4.6845 10.6673 4.89851 10.6673 5.32655Z"
            stroke="#52525C"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <p>{fileDetails}</p>
      </div>
      <div className="col-span-2 flex items-center gap-x-2">
        <Image
          src={productImg}
          alt="product"
          className=" w-8 h-8 rounded-full"
          width={100}
          height={100}
        />

        <p className="">{sellerDetails}</p>
      </div>
      <div className="col-span-2 flex items-center bg-black text-white h-10 justify-center gap-x-2 rounded-lg">
        <svg
          className="w-3"
          viewBox="0 0 12 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.25 11.75H0.75M9.5 5.91667L6 9.41667M6 9.41667L2.5 5.91667M6 9.41667V1.25"
            stroke="#FEFEFD"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <p>Download</p>
      </div>
    </div>
  );
};

const Summary = () => {
  return (
    <div className=" w-96 flex flex-col">
      <div className="flex items-center justify-between">
        <p>Subtotal</p>
        <p>88.00</p>
      </div>
      <div className="flex items-center justify-between">
        <p>Discount</p>
        <p>88.00</p>
      </div>
      <div className="flex items-center justify-between">
        <p>Duties</p>
        <p>88.00</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-bold">Total</p>
        <p>88.00</p>
      </div>
      <button className="rounded-xl h-10 px-2 mt-5 bg-[#223D40] text-white font-medium">
        Download Invoice
      </button>
    </div>
  );
};

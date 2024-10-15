"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { phantomWallet } from "@/store/atom/phantomWallet";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { toast } from "sonner";
import spinnerthree from "@/public/loaders/spinnerthree.svg";
import { AffiliateAnalytics, PurchasesInterface } from "@/lib/models";
import ape from "@/public/ape.png";

export default function AffiliateComponent() {
  return (
    <div>
      <TopBar />
      <div className="flex items-center gap-x-5 mt-10">
        <p className="text-3xl font-bold italic">
          Affiliate Sales & Commission
        </p>
        {/* <button className="border rounded-md bg-green-300 bg-opacity-40 border-green-600 h-7 px-1">
          Completed
        </button> */}
      </div>
      <MidSection />
      <SalesOverview />
    </div>
  );
}

const TopBar = () => {
  return (
    <div className="flex items-center gap-x-3 mt-5 border-b pb-1 border-[##E8E7E5]">
      <a href="/">
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
      </a>

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

      <p>Affiliate Sales</p>
    </div>
  );
};

const SalesOverview = () => {
  const walletAddress = useRecoilValue(phantomWallet);
  const [salesData, setSalesData] = useState<PurchasesInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!walletAddress) {
      toast.error("Please connect your wallet first");
      return;
    } else {
      getSales();
    }
  }, [walletAddress]);

  const getSales = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/fetch/purchases?seller_wallet_address=${walletAddress}`
      );
      setSalesData(response.data);
      //   console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8">
      {/* <p className="font-medium text-xl">Sales Overview</p> */}
      <div className="grid grid-cols-12 mt-4 gap-x-2 md:gap-x-4 lg:gap-x-8 h-10">
        <div className="col-span-2 border rounded-lg flex items-center justify-center gap-x-1 md:gap-x-2">
          <p className="text-xs md:text-[13px] lg:text-sm">Filter</p>
          <svg
            className="w-2 md:w-3"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="#8B8B92"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="col-span-8 border rounded-lg flex items-center pl-3">
          <svg
            className="mr-3"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.49935 10.0602C10.5223 9.14471 11.166 7.81421 11.166 6.33337C11.166 3.57195 8.92743 1.33337 6.16602 1.33337C3.40459 1.33337 1.16602 3.57195 1.16602 6.33337C1.16602 9.09479 3.40459 11.3334 6.16602 11.3334C7.4466 11.3334 8.61477 10.852 9.49935 10.0602ZM9.49935 10.0602L13.2725 13.8334"
              stroke="#8B8B92"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            className="h-full w-full outline-none rounded-r-lg"
            type="text"
            placeholder="Search"
          />
        </div>
        <div className="col-span-2 gap-x-2 text-white rounded-lg flex items-center justify-center bg-[#4E6465]">
          <svg
            className="w-2 md:w-3"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 5.5L13 1.5M13 1.5H9M13 1.5L7.66667 6.83333M5.66667 2.83333H4.2C3.0799 2.83333 2.51984 2.83333 2.09202 3.05132C1.71569 3.24307 1.40973 3.54903 1.21799 3.92535C1 4.35318 1 4.91323 1 6.03333V10.3C1 11.4201 1 11.9802 1.21799 12.408C1.40973 12.7843 1.71569 13.0903 2.09202 13.282C2.51984 13.5 3.0799 13.5 4.2 13.5H8.46667C9.58677 13.5 10.1468 13.5 10.5746 13.282C10.951 13.0903 11.2569 12.7843 11.4487 12.408C11.6667 11.9802 11.6667 11.4201 11.6667 10.3V8.83333"
              stroke="#FEFEFD"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <p className="text-xs md:text-[13px] lg:text-sm">Export</p>
        </div>
      </div>
      <div className="px-2 mb-1 grid grid-cols-12 items-center mt-5 w-full h-7 rounded-lg shadow-[inset_0px_2px_10px_rgba(0,0,0,0.04)] bg-[#F7F7F7]">
        <p className="text-[11px] md:text-[13px] col-span-1">Date</p>
        <p className="text-[11px] md:text-[13px] col-span-3">Product Name</p>
        <p className="text-[11px] md:text-[13px] col-span-2">Buyer</p>
        <p className="text-[11px] md:text-[13px] col-span-1">Quantity</p>
        <p className="text-[11px] md:text-[13px] col-span-1">Price</p>
        <p className="text-[11px] md:text-[13px] col-span-1">Status</p>
        <p className="text-[11px] md:text-[13px] col-span-2">Hash</p>
        <p className="text-[11px] md:text-[13px] col-span-1">Claim</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center mt-2">
          <Image className="w-10 lg:w-12" src={spinnerthree} alt="" />
        </div>
      ) : (
        <div className="relative overflow-y-auto hide-scrollbar scroll-smooth h-96">
          {salesData.map((item: PurchasesInterface, key) => {
            return (
              <SalesLabel
                key={key}
                date={item.created_at}
                productName={item.product_title}
                productId={item.product_id}
                buyer={item.buyer_wallet_address}
                quantity={1}
                price={`${item.amount} SOL`}
                status={item.status}
                hash={item.transaction_hash}
                claim="claim"
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

const SalesLabel = ({
  date,
  productName,
  buyer,
  quantity,
  price,
  status,
  hash,
  claim,
  productId,
}: {
  date: string;
  productName: string;
  buyer: string;
  quantity: number;
  price: string;
  status: string;
  hash: string;
  claim: string;
  productId?: number;
}) => {
  const purchaseDate = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const formattedDate = purchaseDate.toLocaleString("en-US", options);

  return (
    <div className="border-b px-2 grid grid-cols-12 items-center w-full h-10">
      <p className="text-[9px] md:text-[13px] col-span-1">{formattedDate}</p>
      <p className="text-[9px] md:text-[13px] col-span-3">
        <a href={`/product/${productId}`} target="_blank">
          {productName}
        </a>
      </p>
      <p className="text-[9px] md:text-[13px] col-span-2">
        {buyer ? `${buyer.slice(0, 3)}...${buyer.slice(-4)}` : ""}
      </p>
      <p className="text-[9px] md:text-[13px] col-span-1">{quantity}</p>
      <p className="text-[9px] md:text-[13px] col-span-1">{price}</p>
      <div className="text-[9px] md:text-[13px] flex items-center col-span-1">
        {status == "confirmed" ? (
          <div className="flex text-[9px] md:text-[13px] items-center bg-opacity-45 border border-green-600 rounded-md h-6 px-1 bg-green-400 ">
            <p>{status}</p>
          </div>
        ) : (
          <div className="flex text-[9px] md:text-[13px] items-center bg-opacity-45 border border-red-600 rounded-md h-6 px-1 bg-red-400 ">
            <p>{status ? "pending" : "NA"}</p>
          </div>
        )}
      </div>
      <div className="text-[9px] md:text-[13px] col-span-2 flex items-center">
        <p className="w-10 sm:w-12 md:w-16">
          {hash ? `${hash.slice(0, 3)}…${hash.slice(-3)}` : ""}
        </p>
        <svg
          className="w-3 ml-1"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.66797 4.6665V3.03317C4.66797 2.37978 4.66797 2.05308 4.79513 1.80352C4.90698 1.58399 5.08546 1.40552 5.30498 1.29366C5.55454 1.1665 5.88124 1.1665 6.53464 1.1665H10.968C11.6214 1.1665 11.9481 1.1665 12.1976 1.29366C12.4171 1.40552 12.5956 1.58399 12.7075 1.80352C12.8346 2.05308 12.8346 2.37978 12.8346 3.03317V7.4665C12.8346 8.1199 12.8346 8.4466 12.7075 8.69616C12.5956 8.91568 12.4171 9.09416 12.1976 9.20601C11.9481 9.33317 11.6214 9.33317 10.968 9.33317H9.33464M3.03464 12.8332H7.46797C8.12136 12.8332 8.44806 12.8332 8.69762 12.706C8.91715 12.5942 9.09562 12.4157 9.20748 12.1962C9.33464 11.9466 9.33464 11.6199 9.33464 10.9665V6.53317C9.33464 5.87978 9.33464 5.55308 9.20748 5.30352C9.09562 5.08399 8.91715 4.90552 8.69762 4.79366C8.44806 4.6665 8.12136 4.6665 7.46797 4.6665H3.03464C2.38124 4.6665 2.05454 4.6665 1.80498 4.79366C1.58546 4.90552 1.40698 5.08399 1.29513 5.30352C1.16797 5.55308 1.16797 5.87978 1.16797 6.53317V10.9665C1.16797 11.6199 1.16797 11.9466 1.29513 12.1962C1.40698 12.4157 1.58546 12.5942 1.80498 12.706C2.05454 12.8332 2.38124 12.8332 3.03464 12.8332Z"
            stroke="#8B8B92"
            strokeWidth="1.1375"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <button className="text-[9px] md:text-[13px] rounded-md h-6 bg-black text-white col-span-1 hover:bg-[#5a5c5d] transition-all duration-300">
        {claim}
      </button>
    </div>
  );
};

const MidSection = () => {
  const [affiliateAnalytics, setAffiliateAnalytics] = useState<
    AffiliateAnalytics[]
  >([]);
  const affiliateWalletAddress = useRecoilValue(phantomWallet);

  const fetchAffiliateAnalytics = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/fetch/analytics/affiliate?affiliate_wallet_address=${affiliateWalletAddress}`
      );
      setAffiliateAnalytics(response.data);
      return response.data;
    } catch (error) {
      console.log(
        `You got an error while fetching affiliate analytics: ${error}`
      );
    }
  };

  useEffect(() => {
    if (affiliateWalletAddress) {
      fetchAffiliateAnalytics();
    }
  }, [affiliateWalletAddress]);

  return (
    <div className="border rounded-2xl grid grid-cols-3 bg-white mt-4">
      <div className="p-2 sm:p-3 md:p-4">
        <div className=" flex items-center gap-x-1">
          <p className="text-xs md:text-[13px]">TOTAL EARNED</p>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.545 4.5C4.66255 4.16583 4.89458 3.88405 5.19998 3.70457C5.50538 3.52508 5.86445 3.45947 6.21359 3.51936C6.56273 3.57924 6.87941 3.76076 7.10754 4.03176C7.33567 4.30277 7.46053 4.64576 7.46 5C7.46 6 5.96 6.5 5.96 6.5M6 8.5H6.005M11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6Z"
              stroke="#8B8B92"
              strokeWidth="1.125"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="font-bold text-3xl md:text-4xl my-3">$205</p>
        <div className="flex gap-x-1 text-[11px] sm:text-[12px] md:text-[14px]">
          <div className="flex items-center text-green-500">
            <svg
              className="w-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="green"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M12 20V4m0 0l6 6m-6-6l-6 6"
              />
            </svg>
            <p>15%</p>
          </div>
          <p className="text-[#A6ACB7]">over past month</p>
        </div>
      </div>
      <div className="border-r border-l p-2 sm:p-3 md:p-4">
        <div className=" flex items-center gap-x-1">
          <p className="text-xs md:text-[13px]">TODAY USERS REFERRED</p>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.545 4.5C4.66255 4.16583 4.89458 3.88405 5.19998 3.70457C5.50538 3.52508 5.86445 3.45947 6.21359 3.51936C6.56273 3.57924 6.87941 3.76076 7.10754 4.03176C7.33567 4.30277 7.46053 4.64576 7.46 5C7.46 6 5.96 6.5 5.96 6.5M6 8.5H6.005M11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6Z"
              stroke="#8B8B92"
              strokeWidth="1.125"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="font-bold text-3xl md:text-4xl my-3">40</p>

        <div className="text-[11px] sm:text-[12px] md:text-[14px]">
          <p className="text-[#A6ACB7]">Rank 1</p>
          <div className="mt-1 flex items-center gap-x-1">
            <Image
              className="w-5 border rounded-full border-black"
              src={ape}
              alt=""
              width={100}
              height={100}
            />
            <p>Alex</p>
          </div>
        </div>
      </div>
      <div className=" p-2 sm:p-3 md:p-4">
        <div className=" flex items-center gap-x-1">
          <p className="text-xs md:text-[13px]">PRODUCTS SOLD</p>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.545 4.5C4.66255 4.16583 4.89458 3.88405 5.19998 3.70457C5.50538 3.52508 5.86445 3.45947 6.21359 3.51936C6.56273 3.57924 6.87941 3.76076 7.10754 4.03176C7.33567 4.30277 7.46053 4.64576 7.46 5C7.46 6 5.96 6.5 5.96 6.5M6 8.5H6.005M11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6Z"
              stroke="#8B8B92"
              strokeWidth="1.125"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="font-bold text-3xl md:text-4xl my-3">70</p>
        <div className="mt-8 text-[10px] md:text-[12px]">
          <p className="text-[#A6ACB7]">Top Product</p>
          <p className="text-black font-medium text-[14px]">
            How to Design Better UI
          </p>
        </div>
      </div>
    </div>
  );
};

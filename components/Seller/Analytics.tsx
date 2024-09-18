"use client";
import Image from "next/image";
import hex from "@/public/hex.svg";
import randomstatic from "@/public/randomstatic.png";
import circlemedal from "@/public/circlemedal.svg";
import logodesign from "@/public/marqueeicons/logodesign.png";
import Link from "next/link";
import { useState } from "react";
import usdccoin from "@/public/_static/coinIcons/usdc.png";
import { SalesLabel } from "../SellerDashboard";
import { toast } from "sonner";

export default function Analytics() {
  return (
    <div className="w-[100%] pb-20 relative overflow-y-auto hide-scrollbar h-[90vh] scroll-smooth">
      <AnalyticsTopLabel />
      <div className="px-20 pt-8">
        <div className="">
          <p>Accounts Statistics</p>
          <MidSection />
        </div>
        <GraphWindow />
        <Affiliates />
      </div>
    </div>
  );
}

export const Affiliates = () => {
  return (
    <div className="mt-4 p-4 border rounded-xl h-64 bg-white">
      <p className="text-[13px]">AFFILIATES</p>
      <div className="px-2 mb-1 grid grid-cols-5 items-center mt-3 w-full h-7 rounded-lg shadow-[inset_0px_2px_10px_rgba(0,0,0,0.04)] bg-[#F7F7F7]">
        <p className="text-[13px] col-span-1">Source</p>
        <p className="text-[13px] col-span-1">Views</p>
        <p className="text-[13px] col-span-1">Sales</p>
        <p className="text-[13px] col-span-1">Conversion</p>
        <p className="text-[13px] col-span-1">Total</p>
      </div>
      <div className="relative overflow-y-auto hide-scrollbar scroll-smooth h-40">
        <AffiliateLabel
          source="Organic Search"
          views="1,000"
          sales="50"
          conversion="5.00%"
          total="$1343200"
        />
        <AffiliateLabel
          source="Organic Search"
          views="1,000"
          sales="50"
          conversion="5.00%"
          total="$1343200"
        />
        <AffiliateLabel
          source="Organic Search"
          views="1,000"
          sales="50"
          conversion="5.00%"
          total="$1343200"
        />
        <AffiliateLabel
          source="Organic Search"
          views="1,000"
          sales="50"
          conversion="5.00%"
          total="$1343200"
        />
        <AffiliateLabel
          source="Organic Search"
          views="1,000"
          sales="50"
          conversion="5.00%"
          total="$1343200"
        />
        <AffiliateLabel
          source="Organic Search"
          views="1,000"
          sales="50"
          conversion="5.00%"
          total="$1343200"
        />
        <AffiliateLabel
          source="Organic Search"
          views="1,000"
          sales="50"
          conversion="5.00%"
          total="$1343200"
        />
      </div>
    </div>
  );
};

export const AffiliateLabel = ({
  source,
  views,
  sales,
  conversion,
  total,
}: {
  source: string;
  views: string;
  sales: string;
  conversion: string;
  total: string;
}) => {
  return (
    <div className="border-b px-2 grid grid-cols-5 items-center w-full h-10">
      <p className="text-[13px] col-span-1">{source}</p>
      <p className="text-[13px] col-span-1">{views}</p>
      <p className="text-[13px] col-span-1">{sales}</p>
      <p className="text-[13px] col-span-1">{conversion}</p>
      <p className="text-[13px] col-span-1">{total}</p>
    </div>
  );
};

export const GraphWindow = () => {
  return (
    <div className="border rounded-xl h-72 bg-white p-4 grid grid-cols-12">
      <div className="col-span-5 flex flex-col justify-between">
        <div className="flex items-center gap-x-1">
          <p className="text-[13px]">TOTAL SALES</p>
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
        <div className="flex flex-col gap-y-2">
          <div className="flex gap-x-1">
            <p className="font-medium flex justify-end flex-col text-2xl">$</p>
            <p className="font-medium text-7xl">1240</p>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="relative">
              <Image className="w-8" src={circlemedal} alt="" />
            </div>
            <p className="w-44 text-[12px] text-wrap">
              You&apos;ve reached $1500 in total sales!
            </p>
          </div>
        </div>
      </div>

      <div className="col-span-7 flex items-center justify-center border h-full rounded-xl">
        <p className="text-2xl">You&apos;ll see the Analytics Soon!</p>
        {/* <ResponsiveLinearChart /> */}
      </div>
    </div>
  );
};

const MidSection = () => {
  return (
    <div className="grid grid-cols-3">
      <div className="p-4">
        <div className=" flex items-center gap-x-1">
          <p className="text-[13px]">TOTAL UNITS SOLD</p>
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
        <p className="font-bold text-4xl my-3">50</p>
      </div>
      <div className=" p-4">
        <div className=" flex items-center gap-x-1">
          <p className="text-[13px]">AVERAGE RATINGS</p>
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
        <div className="flex my-3 items-center gap-x-2">
          <p className="font-bold text-4xl">4.5</p>
          <div className="">
            <div className="flex">
              <svg
                className="w-[10px]"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.90919 0.196866C6.94494 0.119379 7.05506 0.119379 7.09081 0.196866L8.95151 4.23087C8.96608 4.26245 8.99601 4.2842 9.03055 4.28829L13.4421 4.81135C13.5268 4.8214 13.5609 4.92614 13.4982 4.98408L10.2366 8.00029C10.2111 8.0239 10.1997 8.05909 10.2065 8.0932L11.0722 12.4505C11.0889 12.5342 10.9998 12.5989 10.9253 12.5572L7.04884 10.3873C7.0185 10.3704 6.9815 10.3704 6.95116 10.3873L3.07468 12.5572C3.00022 12.5989 2.91112 12.5342 2.92776 12.4505L3.79354 8.0932C3.80032 8.05909 3.78889 8.0239 3.76335 8.00029L0.501775 4.98408C0.439125 4.92614 0.473156 4.8214 0.557896 4.81135L4.96946 4.28829C5.00399 4.2842 5.03392 4.26245 5.04849 4.23087L6.90919 0.196866Z"
                  fill="#6B7D7F"
                />
              </svg>
              <svg
                className="w-[10px]"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.90919 0.196866C6.94494 0.119379 7.05506 0.119379 7.09081 0.196866L8.95151 4.23087C8.96608 4.26245 8.99601 4.2842 9.03055 4.28829L13.4421 4.81135C13.5268 4.8214 13.5609 4.92614 13.4982 4.98408L10.2366 8.00029C10.2111 8.0239 10.1997 8.05909 10.2065 8.0932L11.0722 12.4505C11.0889 12.5342 10.9998 12.5989 10.9253 12.5572L7.04884 10.3873C7.0185 10.3704 6.9815 10.3704 6.95116 10.3873L3.07468 12.5572C3.00022 12.5989 2.91112 12.5342 2.92776 12.4505L3.79354 8.0932C3.80032 8.05909 3.78889 8.0239 3.76335 8.00029L0.501775 4.98408C0.439125 4.92614 0.473156 4.8214 0.557896 4.81135L4.96946 4.28829C5.00399 4.2842 5.03392 4.26245 5.04849 4.23087L6.90919 0.196866Z"
                  fill="#6B7D7F"
                />
              </svg>
              <svg
                className="w-[10px]"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.90919 0.196866C6.94494 0.119379 7.05506 0.119379 7.09081 0.196866L8.95151 4.23087C8.96608 4.26245 8.99601 4.2842 9.03055 4.28829L13.4421 4.81135C13.5268 4.8214 13.5609 4.92614 13.4982 4.98408L10.2366 8.00029C10.2111 8.0239 10.1997 8.05909 10.2065 8.0932L11.0722 12.4505C11.0889 12.5342 10.9998 12.5989 10.9253 12.5572L7.04884 10.3873C7.0185 10.3704 6.9815 10.3704 6.95116 10.3873L3.07468 12.5572C3.00022 12.5989 2.91112 12.5342 2.92776 12.4505L3.79354 8.0932C3.80032 8.05909 3.78889 8.0239 3.76335 8.00029L0.501775 4.98408C0.439125 4.92614 0.473156 4.8214 0.557896 4.81135L4.96946 4.28829C5.00399 4.2842 5.03392 4.26245 5.04849 4.23087L6.90919 0.196866Z"
                  fill="#6B7D7F"
                />
              </svg>
              <svg
                className="w-[10px]"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.90919 0.196866C6.94494 0.119379 7.05506 0.119379 7.09081 0.196866L8.95151 4.23087C8.96608 4.26245 8.99601 4.2842 9.03055 4.28829L13.4421 4.81135C13.5268 4.8214 13.5609 4.92614 13.4982 4.98408L10.2366 8.00029C10.2111 8.0239 10.1997 8.05909 10.2065 8.0932L11.0722 12.4505C11.0889 12.5342 10.9998 12.5989 10.9253 12.5572L7.04884 10.3873C7.0185 10.3704 6.9815 10.3704 6.95116 10.3873L3.07468 12.5572C3.00022 12.5989 2.91112 12.5342 2.92776 12.4505L3.79354 8.0932C3.80032 8.05909 3.78889 8.0239 3.76335 8.00029L0.501775 4.98408C0.439125 4.92614 0.473156 4.8214 0.557896 4.81135L4.96946 4.28829C5.00399 4.2842 5.03392 4.26245 5.04849 4.23087L6.90919 0.196866Z"
                  fill="#6B7D7F"
                />
              </svg>
              <svg
                className="w-[10px]"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.90919 0.196866C6.94494 0.119379 7.05506 0.119379 7.09081 0.196866L8.95151 4.23087C8.96608 4.26245 8.99601 4.2842 9.03055 4.28829L13.4421 4.81135C13.5268 4.8214 13.5609 4.92614 13.4982 4.98408L10.2366 8.00029C10.2111 8.0239 10.1997 8.05909 10.2065 8.0932L11.0722 12.4505C11.0889 12.5342 10.9998 12.5989 10.9253 12.5572L7.04884 10.3873C7.0185 10.3704 6.9815 10.3704 6.95116 10.3873L3.07468 12.5572C3.00022 12.5989 2.91112 12.5342 2.92776 12.4505L3.79354 8.0932C3.80032 8.05909 3.78889 8.0239 3.76335 8.00029L0.501775 4.98408C0.439125 4.92614 0.473156 4.8214 0.557896 4.81135L4.96946 4.28829C5.00399 4.2842 5.03392 4.26245 5.04849 4.23087L6.90919 0.196866Z"
                  fill="#6B7D7F"
                />
              </svg>
            </div>
            <p className="text-[12px]">20 Reviews</p>
          </div>
        </div>
      </div>
      <div className=" p-4">
        <div className=" flex items-center gap-x-1">
          <p className="text-[13px]">TOTAL VIEWS</p>
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
        <p className="font-bold text-4xl my-3">100</p>
      </div>
    </div>
  );
};

const AnalyticsTopLabel = () => {
  return (
    <div className="relative border-b w-[100%]">
      <Image
        src={randomstatic}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-[4%]"
      />
      <div className="h-20 grid grid-cols-2">
        <div className=" h-full flex items-center">
          <p className="text-lg font-medium ml-20">Analytics</p>
        </div>
        <div className=" h-full flex items-center gap-x-2">
          <div className="relative  flex items-center justify-center">
            <Image className="w-12" src={hex} alt="" />
            <p className="text-lg font-medium text-white absolute z-20">2</p>
          </div>
          <div>
            <p className="font-medium text-lg">Emerging Seller</p>
            <div className="flex gap-x-[1px] mt-[5px] mb-[1px]">
              <div className="w-28 h-[3px] bg-[#223D40]"></div>
              <div className="w-8 h-[3px] bg-[#E2E0D9]"></div>
            </div>
            <p className="text-[11px] text-[#959594]">Next:Establised Seller</p>
          </div>
        </div>
      </div>
    </div>
  );
};

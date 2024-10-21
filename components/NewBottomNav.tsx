"use client";
import randomstatic from "@/public/randomstatic.png";
import widgetbg from "@/public/_static/background/widgetbg.png";
import Image from "next/image";
import globe from "@/public/_static/illustrations/globe.svg";
import { useState } from "react";
import neutron from "@/public/coins/neutron.png";
import usdccoin from "@/public/coins/usdccoin.png";
import bitcoin from "@/public/coins/btc.png";
import solana from "@/public/coins/solana.png";
import WidgetDetails from "./WidgetDetails";
import sendit_white_ape from "@/public/sendit_white_ape.svg";
import senditApe from "@/public/sendit_ape.svg";

interface MenuItem {
  text: string;
  tooltip: string;
}
export default function NewBottomNav() {
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);
  const menuItems: MenuItem[] = [
    { text: "Active Bids", tooltip: "Active Bids!" },
    { text: "Borrow", tooltip: "Get cash now!" },
    {
      text: "Earn",
      tooltip: "Earn rewards and incentives!",
    },
    { text: "Lend", tooltip: "Savings Account!" },
    { text: "Portfolio", tooltip: "Check your portfolio!" },
    {
      text: "Achievements",
      tooltip: "View your accomplishments",
    },
  ];

  // console.log(activeTooltip);

  return (
    <div className="absolute bottom-0 w-full justify-center  flex h-24 p-2">
      <div className=" w-[380px] sm:w-[400px] lg:w-[500px] shadow-[inset_3px_2px_18px_rgba(0,0,0,0.1)] z-50 rounded grid grid-cols-3 gap-x-1">
        <div
          key={0}
          className="text-[14px] sm:text-[16px]  rounded-md relative flex flex-col items-center justify-center bg-[#182B2D] hover:bg-[#2b4649] transition-all duration-300 text-white"
          onMouseEnter={() => setActiveTooltip(0)}
          onMouseLeave={() => setActiveTooltip(null)}
        >
          {activeTooltip === 0 && (
            <WidgetDetails
              className="absolute left-0 mb-56 flex flex-col border border-[#a8a8ab] p-1 w-[300px] h-24 md:h-28 rounded-lg bg-white shadow-[inset_3px_2px_18px_rgba(0,0,0,0.1)]"
              classTwo="absolute top-full left-5 -translate-x-1/2 border-4 border-transparent border-t-[#a8a8ab]"
              coin={neutron}
              value="800"
              token="NTRN"
              discount="4"
            />
          )}
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={randomstatic}
              alt="Background"
              layout="fill"
              objectFit="cover"
              className="opacity-[15%]"
            />
            <Image
              src={sendit_white_ape}
              alt="Background"
              objectFit="cover"
              className="absolute rotate-[8deg] -right-8 -bottom-12 md:-bottom-14 lg:-bottom-20 w-56 opacity-60 mix-blend-overlay"
            />
          </div>
          <div className="bg-slate-300 hover:bg-blue-500 transition-all duration-200 z-20 absolute top-2 right-2 bg-opacity-40 rounded w-4 h-4 flex items-center justify-center">
            <svg
              className=" w-3"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 5L5 1L1 5"
                stroke="#FEFEFD"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="absolute left-0 bottom-0 p-1 px-2">
            <p className="text-xs font-medium">Active Bids</p>
            <p className="text-4xl font-medium">85</p>
          </div>
        </div>
        <div
          key={1}
          className=" text-[14px] sm:text-[16px] relative flex flex-col items-center justify-center bg-[#182B2D] hover:bg-[#2b4649] rounded-md transition-all duration-300 text-white"
          onMouseEnter={() => setActiveTooltip(1)}
          onMouseLeave={() => setActiveTooltip(null)}
        >
          {activeTooltip === 1 && (
            <WidgetDetails
              className="absolute  mb-56 flex flex-col border border-[#a8a8ab] p-1 w-[300px] h-24 md:h-28 rounded-lg bg-white shadow-[inset_3px_2px_18px_rgba(0,0,0,0.1)]"
              coin={solana}
              value="800"
              token="SOL"
              discount="23"
              classTwo="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#a8a8ab]"
            />
          )}
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={randomstatic}
              alt="Background"
              layout="fill"
              objectFit="cover"
              className="opacity-[15%]"
            />
            {/* <Image
              src={globe}
              alt="Background"
              objectFit="cover"
              className="absolute -right-4 -bottom-8 w-28"
            /> */}
            <Image
              src={sendit_white_ape}
              alt="Background"
              objectFit="cover"
              className="absolute rotate-[8deg] -right-8 -bottom-12 md:-bottom-14 lg:-bottom-20 w-56 opacity-60 mix-blend-overlay"
            />
          </div>
          <div className="bg-slate-300 hover:bg-blue-500 transition-all duration-200 z-20 absolute top-2 right-2 bg-opacity-40 rounded w-4 h-4 flex items-center justify-center">
            <svg
              className=" w-3"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 5L5 1L1 5"
                stroke="#FEFEFD"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="absolute left-0 bottom-0 p-1 px-2">
            <p className="text-xs font-medium">Bids Confirmed</p>
            <p className="text-4xl font-medium">$890</p>
          </div>
        </div>
        <div
          key={2}
          className=" text-[14px] sm:text-[16px]  rounded-md relative flex flex-col items-center justify-center bg-[#182B2D] hover:bg-[#2b4649] transition-all duration-300 text-white"
          onMouseEnter={() => setActiveTooltip(2)}
          onMouseLeave={() => setActiveTooltip(null)}
        >
          {activeTooltip === 2 && (
            <WidgetDetails
              className="absolute right-0 mb-56 flex flex-col border border-[#a8a8ab] p-1 w-[300px] h-24 md:h-28 rounded-lg bg-white shadow-[inset_3px_2px_18px_rgba(0,0,0,0.1)]"
              classTwo="absolute top-full right-5 -translate-x-1/2 border-4 border-transparent border-t-[#a8a8ab]"
              coin={bitcoin}
              value="800"
              token="BTC"
              discount="30"
            />
          )}
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={randomstatic}
              alt="Background"
              layout="fill"
              objectFit="cover"
              className="opacity-[15%]"
            />
            <Image
              src={sendit_white_ape}
              alt="Background"
              objectFit="cover"
              className="absolute rotate-[8deg] -right-8 -bottom-12 md:-bottom-14 lg:-bottom-20 w-56 opacity-60 mix-blend-overlay"
            />
          </div>
          <div className="bg-slate-300 hover:bg-blue-500 transition-all duration-200 z-20 absolute top-2 right-2 bg-opacity-40 rounded w-4 h-4 flex items-center justify-center">
            <svg
              className=" w-3"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 5L5 1L1 5"
                stroke="#FEFEFD"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="absolute left-0 bottom-0 p-1 px-2">
            <p className="text-xs font-medium">Bids Pending</p>
            <p className="text-4xl font-medium">$185</p>
          </div>
        </div>
      </div>
    </div>
  );
}

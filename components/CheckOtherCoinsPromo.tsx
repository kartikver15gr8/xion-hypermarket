"use client";
import LiquidationTokenCard from "./LiquidationTokenCard";
import akt from "@/public/coins/akt.png";
import btc from "@/public/coins/btc.png";
import atom from "@/public/coins/cosmos.png";
import dydx from "@/public/coins/dydx.png";
import ethereum from "@/public/coins/ethereum.png";
import injective from "@/public/coins/injective.png";
import neutron from "@/public/coins/neutron.png";
import osmo from "@/public/coins/osmo.png";
import solana from "@/public/coins/solana.png";
import tia from "@/public/coins/tia.png";
import usdc from "@/public/coins/usdccoin.png";
import Image from "next/image";

import noisebg from "@/public/_static/background/noisebg.png";
import thunderbg from "@/public/_static/background/thunderbg.png";
import thundertwo from "@/public/_static/background/thundertwo.png";
import bglines from "@/public/_static/background/bglines.png";
import grid from "@/public/_static/illustrations/grid.svg";
import coins from "@/public/_static/illustrations/coins.svg";
import sendit_cropped_ape from "@/public/_static/illustrations/sendit_cropped_ape.svg";
import sendit_white_ape from "@/public/sendit_white_ape.svg";
import Reveal from "./framerEffects/Reveal";
import BlurFade from "./magicui/blur-fade";
import { CoinPromoMarquee } from "./CoinPromoMarquee";

export default function CheckOtherCoinsPromo({
  head,
  subhead,
}: {
  head: string;
  subhead: string;
}) {
  return (
    <div className="relative  mx-2 sm:mt-14 md:mt-10 mb-10 p-5 rounded-md flex flex-col items-center py-[20px] lg:py-[40px] xl:py-[50px] overflow-hidden">
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
        className="opacity-[3%] mix-blend-exclusion"
      />
      <Image
        src={grid}
        alt="Background"
        layout="fill"
        objectFit=""
        className="opacity-[3%] mix-blend-exclusion"
      />
      <Image
        src={coins}
        alt="Background"
        layout="fill"
        objectFit=""
        className="opacity-[100%]"
      />

      <div className="relative z-10 flex flex-col items-center w-[100%]">
        <p className="font-medium text-[12px] lg:text-[16px] 2xl:text-[18px] my-1">
          {head}
        </p>
        <p className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-medium">
          {subhead}
        </p>
        <div className=" flex w-full mt-4 sm:mt-6 lg:mt-8 xl:mt-10 justify-end gap-x-1">
          <div className="w-[20px] md:w-[30px] lg:w-[40px] h-[20px] md:h-[30px] lg:h-[40px]  border border-slate-400 rounded-[2px]  flex justify-center items-center bg-[#F6F5F3] text-white hover:bg-[#CCCBCA] transition-all duration-200">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.8334 7.00033H1.16675M1.16675 7.00033L7.00008 12.8337M1.16675 7.00033L7.00008 1.16699"
                stroke="#050505"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="w-[20px] md:w-[30px] lg:w-[40px] h-[20px] md:h-[30px] lg:h-[40px] rounded-[2px]   flex justify-center items-center bg-[#F6F5F3] border border-slate-400 text-white hover:bg-[#CCCBCA] transition-all duration-200">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.16675 7.00033H12.8334M12.8334 7.00033L7.00008 1.16699M12.8334 7.00033L7.00008 12.8337"
                stroke="#050505"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="flex gap-x-1 lg:gap-x-2 xl:gap-x-4  mt-2 md:mt-3 lg:mt-5 w-[95%] lg:w-[85%]">
          <CoinPromoMarquee />
        </div>
      </div>

      <Image
        src={sendit_white_ape}
        alt="Background"
        layout=""
        objectFit=""
        className="opacity-[60%] -rotate-[17.6deg] w-[30%] absolute -bottom-[18%] -left-[11%]"
      />
    </div>
  );
}

"use client";

import Image, { StaticImageData } from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import coinbg from "@/public/_static/background/coinbg.png";

export default function LiquidationTokenCard({
  discount,
  coin,
  tokenName,
  price,
  redirectHref,
}: {
  discount: string;
  coin: StaticImageData | string;
  tokenName: string;
  price: string;
  redirectHref: string;
}) {
  //grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4
  return (
    <div className="bg-white aspect-square  rounded-[4px] border hover:border-slate-500 hover:shadow-lg transition-all   duration-700">
      <div className="relative flex w-full h-4/5 xl:h-3/4 2xl:h-4/5  items-center justify-center ">
        <Image
          src={coinbg}
          alt="Background"
          objectFit="fill"
          className="opacity-[5%]"
          layout="fill"
        />
        <div className="absolute z-10 top-1 left-1 sm:top-1 sm:left-2 md:top-2 md:left-3 w-[90px] text-[8px] sm:text-[12px] md:text-[12px] 2xl:text-[14px]">
          <p className=""> Up to:</p>
          <div className="bg-[#263039] w-fit px-1">
            <p className=" font-bold italic text-white">{discount}</p>
          </div>
        </div>
        <div className="relative flex h-full items-center justify-center  z-10">
          <Image
            className="hover:scale-105 transition-all duration-300 w-[50%] sm:w-[60%] "
            src={coin}
            width={200}
            height={200}
            alt=""
          />
        </div>
      </div>
      <div className="w-full h-1/5 xl:h-1/4 2xl:h-1/5  justify-between flex items-center px-[16px]">
        <div className="flex flex-col  w-[45%] ">
          <p className="text-[12px] sm:text-[16px] md:text-[16px] xl:text-[22px] 2xl:text-[25px]  font-bold">
            {tokenName}
          </p>
          <p className="text-[10px] sm:text-[14px] md:text-[14px] xl:text-[15px] 2xl:text-[16px] text-[#B0B0B0] hover:text-slate-800 transition-all duration-300">
            {price}
          </p>
        </div>
        <Link
          href={`/liquidation/coinpage/${redirectHref}`}
          className="rounded border  text-black font-medium font-teachers  bg-[#F9F9F7] hover:bg-slate-700 hover:text-white transition-all duration-300 w-[35%] h-[75%] flex items-center justify-center text-[12px] sm:text-[14px] md:text-[14px] xl:text-[16px]"
        >
          <button className="">Bid</button>
        </Link>
      </div>
    </div>
  );
}

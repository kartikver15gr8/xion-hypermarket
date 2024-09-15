"use client";
import Image from "next/image";
import blurbg from "@/public/_static/background/blurbg.png";
import riskmeter from "@/public/riskmeter.svg";

export default function CollateralRiskMeter({
  heading,
  subtext,
  perc,
}: {
  heading: string;
  perc: string;
  subtext: string;
}) {
  return (
    <div className="relative h-full rounded-md border">
      <Image
        src={blurbg}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-[7%] border rounded-md"
      />
      <div className="relative z-10 flex flex-col pt-2 px-3 lg:pt-1 lg:px-2 xl:pt-2 xl:px-3 h-full">
        <div className="absolute right-3 top-3 lg:right-2 lg:top-2 xl:right-3 xl:top-3 bg-[#4E6465] text-white font-medium py-1 px-2 rounded-[3px] sm:py-2 sm:px-5 md:py-1 md:px-2 hover:bg-[#5A7277] transition-all duration-300">
          <p>{perc}</p>
        </div>
        <div className="flex flex-col h-[50%] lg:w-[70%]">
          <p className="font-bold text-[#666666] sm:text-[18px] lg:text-sm xl:text-[16px]">
            {heading}
          </p>
          <p className="text-sm text-[#A5A5A9] lg:text-xs sm:text-[16px] xl:text-[14px] ">
            {subtext}
          </p>
        </div>
        <div className="flex h-[50%]">
          <Image
            className="w-full"
            src={riskmeter}
            width={300}
            height={300}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

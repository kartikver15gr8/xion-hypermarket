"use client";

import Image, { StaticImageData } from "next/image";

const left = "left-0";
const right = "right-0";
const center = "left-1/2 -translate-x-1/2";
export default function WidgetDetails({
  coin,
  token,
  value,
  discount,
  className,
  classTwo,
}: {
  coin: StaticImageData;
  token: string;
  value: string;
  discount: string;
  className: string;
  classTwo: string;
}) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between border-b h-[50%]">
        <div className="flex items-center gap-x-2">
          <Image
            className="w-8 h-8 sm:w-10 sm:h-10 xl:w-12 xl:h-12"
            src={coin}
            width={500}
            height={500}
            alt="coin"
          />
          <p className="font-bold text-xl text-[#52525C]">{token}</p>
        </div>
        <div className="flex items-center gap-x-1">
          <div className="bg-[#EEEEEF] p-2 rounded-sm font-medium h-8 items-center flex">
            <p className="text-[#52525C]">${value} USDC</p>
          </div>
          <div className="rounded-sm bg-[#4E6465] text-white flex-col p-1 h-8 justify-center flex">
            <p className="text-[10px] font-bold italic">{discount}%</p>
            <p className="text-[10px] font-bold italic">OFF</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between h-[50%]">
        <div className="flex items-center gap-x-2">
          <Image
            className="w-8 h-8 sm:w-10 sm:h-10 xl:w-12 xl:h-12"
            src={coin}
            width={500}
            height={500}
            alt="coin"
          />
          <p className="font-bold text-xl text-[#52525C]">{token}</p>
        </div>
        <div className="flex items-center gap-x-1">
          <div className="bg-[#EEEEEF] p-2 rounded-sm font-medium h-8 items-center flex">
            <p className="text-[#52525C]">${value} USDC</p>
          </div>
          <div className="rounded-sm bg-[#4E6465] text-white flex-col p-1 h-8 justify-center flex">
            <p className="text-[10px] font-bold italic">{discount}%</p>
            <p className="text-[10px] font-bold italic">OFF</p>
          </div>
        </div>
      </div>
      <div className={classTwo}></div>
    </div>
  );
}

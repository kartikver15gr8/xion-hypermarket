"use client";
import Image, { StaticImageData } from "next/image";

export default function LendCoinCard({
  coinURI,
  coinName,
  earnPerc,
  amount,
  convertedPrice,
  className,
}: {
  coinURI: string | StaticImageData;
  coinName: string;
  earnPerc: string;
  amount: string;
  convertedPrice: string;
  className: string;
}) {
  return (
    <div
      className={`${className} w-full rounded-[2px] border border-slate-400 items-center justify-between flex p-3 shadow-[inset_3px_5px_23px_rgba(0,0,0,0.08)]`}
    >
      <div>
        <Image className="w-20" src={coinURI} alt="" width={200} height={200} />
      </div>
      <div className="flex flex-col w-[50%]">
        <p className="font-medium text-xl sm:text-2xl">{coinName}</p>
        <p className="bg-[#4E6465] px-1 text-white text-[11px] sm:text-sm w-fit">
          EARN {earnPerc}
        </p>
      </div>
      <div className="flex flex-col mr-3">
        <p className="font-medium text-xl">{amount}</p>
        <p className="text-[#A0A0A4]">{convertedPrice}</p>
      </div>
    </div>
  );
}

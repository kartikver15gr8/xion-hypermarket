"use client";
import Image from "next/image";
import Link from "next/link";
import noisebg from "@/public/_static/background/noisebg.png";
import shine from "@/public/_static/background/shinegradient.png";
import usdcbanner from "@/public/usdctran.png";

export default function BorrowUSDCBannerBtn() {
  return (
    <div className="flex relative h-16 items-center  py-2 gap-x-2 mb-2 hover:shadow-xl transition-all duration-200 bg-slate-800 rounded">
      <Image
        src={noisebg}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-[5%] mix-blend-color-burn rounded"
      />
      <Image
        src={shine}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-[51%] bg-blend-color rounded"
      />
      <Image
        src={usdcbanner}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-[40%] bg-blend-luminosity rounded"
      />

      <div className="relative z-10 justify-between  font-bold w-full flex h-full items-center text-[14px] md:text-[16px]">
        <div className="w-[100%] text-white flex ml-5 flex-col">
          <p>DON&apos;T HAVE ENOUGH</p>
          <p>USDC TO BID?</p>
        </div>
        <Link
          href="/borrow"
          className="w-28 mr-5 bg-white hover:bg-[#d5d6da] transition-all duration-200 rounded-[2px]"
        >
          <button className=" font-light w-28  px-2  h-10 text-sm rounded-[2px] shadow-[inset_1px_2px_18px_rgba(0,0,0,0.1)]">
            Borrow USDC!
          </button>
        </Link>
      </div>
    </div>
  );
}

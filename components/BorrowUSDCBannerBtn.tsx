"use client";
import Image from "next/image";
import Link from "next/link";
import noisebg from "@/public/_static/background/noisebg.png";
import shine from "@/public/_static/background/shinegradient.png";
import usdcbanner from "@/public/usdctran.png";
import solanablinkImg from "@/public/_static/background/solanablinks.png";
export default function BorrowUSDCBannerBtn() {
  return (
    <div className="flex relative h-16 items-center py-2 gap-x-2 mb-2 hover:shadow-xl transition-all duration-200 bg-black rounded">
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
        className="opacity-[41%] bg-blend-color rounded"
      />
      <Image
        src={usdcbanner}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-[20%] bg-blend-luminosity rounded"
      />

      <div className="relative z-10 w-full flex justify-center h-full items-center px-4">
        <div className="flex justify-center">
          <p className="font-medium flex items-center text-[14px] md:text-[20px] text-white">
            Promote with
          </p>
          <Image className="w-60" src={solanablinkImg} alt="" />
        </div>
      </div>
    </div>
  );
}

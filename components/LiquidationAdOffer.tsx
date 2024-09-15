"use client";

import Image from "next/image";
import noisebg from "@/public/_static/background/noisebg.png";
import blurbg from "@/public/_static/background/blurbg.png";
import shinegradient from "@/public/_static/background/shinegradient.png";
import coins from "@/public/_static/background/coins.png";
import SideReveal from "./framerEffects/SideReveal";
import GradualSpacing from "./magicui/gradual-spacing";

export default function LiquidationAdOffer({
  liquidation,
  offer,
}: {
  liquidation: string;
  offer: string;
}) {
  return (
    <div className=" pt-[100px]  pb-[16px]">
      <div className="flex">
        <GradualSpacing
          className="font-display  font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl italic tracking-[-0.1em]  text-black dark:text-white md:leading-[5rem]"
          text="ASSETS ON SALE"
        />
      </div>
      {/* <p className="border font-bold text-5xl sm:text-5xl md:text-6xl lg:text-7xl italic">
        ASSETS ON SALE
      </p> */}
      <p className=" my-2">{liquidation} liquidations found</p>
      <div className="relative w-full  h-[200px] sm:h-[200px] lg:h-[262px] overflow-hidden rounded bg-gray-900">
        <Image
          src={noisebg}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-[5%] mix-blend-color-burn"
        />
        <Image
          src={blurbg}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-[10%] bg-blend-color"
        />
        <Image
          src={blurbg}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-[10%] bg-blend-color"
        />
        <Image
          src={shinegradient}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-[60%] bg-blend-difference"
        />
        <Image
          src={coins}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-[20%]"
        />

        <div className="relative z-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl  font-bold flex flex-col h-full justify-center italic">
          <div className="w-fit ml-[10px] sm:ml-[35px] text-white">
            <p>GET UP TO {offer} OFF</p>
            <p>ON YOUR FAVORITE</p>
            <p>ASSETS</p>
          </div>
        </div>
      </div>
    </div>
  );
}

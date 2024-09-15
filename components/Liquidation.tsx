"use client";
import React from "react";
import value from "@/public/value.png";
import LiquidationAdOffer from "./LiquidationAdOffer";
import RenderTokenCard from "./RenderTokenCard";
import Image from "next/image";
import noisebg from "@/public/_static/background/noisebg.png";
import thunderbg from "@/public/_static/background/thunderbg.png";
import bglines from "@/public/_static/background/bglines.png";

export default function Liquidation() {
  return (
    <div className="relative h-screen">
      {/* <Image
        src={noisebg}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-[3%]"
      />
      <Image
        src={bglines}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-[16%]"ð
      />
      <Image
        src={thunderbg}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-[5%] mix-blend-color-burn"
      /> */}
      <div className="relative z-10 h-[100vh] overflow-y-auto hide-scrollbar ">
        <div className="px-[20px] sm:px-[20px] md:px-[40px] lg:px-[60px] xl:px-[65px] 2xl:px-[100px] flex flex-col justify-center pb-10">
          <LiquidationAdOffer liquidation="42" offer="30%" />
          <RenderTokenCard />
        </div>
      </div>
    </div>
  );
}

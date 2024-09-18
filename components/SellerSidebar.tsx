"use client";
import React from "react";
import senditLogo from "@/public/sendit_logo.svg";
import Image from "next/image";
import background_noise from "@/public/background_noise.png";
import LiquidationMenuOptions from "./LiquidationMenuOptions";
import noisebg from "@/public/_static/background/noisebg.png";
import SideReveal from "./framerEffects/SideReveal";
import { useRecoilValue } from "recoil";
import { walletState } from "@/store/atom/walletDetails";
import SellerDashboardOptions from "./SellerDashboardOptions";
export default function SellerSidebar() {
  const walletAdd = useRecoilValue(walletState);
  return (
    <div
      className={`relative hidden sm:hidden md:flex lg:flex xl:flex 2xl:flex  w-[230px]  min-h-screen bg-center bg-no-repeat bg-cover`}
    >
      {/* <Image
        src={noisebg}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-[4%]"
      /> */}
      <div className="absolute inset-0 "></div>

      <SideReveal>
        <SellerDashboardOptions
          portfolio="Portfolio"
          walletAddress={walletAdd ? walletAdd : "sendit15f...vucmr"}
        />
      </SideReveal>
    </div>
  );
}
//"sendit15f...vucmr"

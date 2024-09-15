"use client";
import BorrowCard from "@/components/BorrowPageComp/BorrowCard";
import BorrowCardTwo from "@/components/BorrowPageComp/BorrowCardTwo";
import WalletConnectBtn from "@/components/BorrowPageComp/WalletConnectBtn";
import { Button } from "@/components/ui/button";
import grid from "@/public/_static/illustrations/grid.svg";
import sendit_logo from "@/public/sendit_logo.svg";
import sendit_ape from "@/public/sendit_ape.svg";
import Image from "next/image";
import BorrowBtn from "@/components/BorrowPageComp/BorrowBtn";
import noisebg from "@/public/_static/background/noisebg.png";
import coins from "@/public/_static/background/coins.png";
import thundertwo from "@/public/_static/background/thundertwo.png";

export default function BorrowCheckout() {
  return (
    <div>
      <div className="sm:border relative rounded w-[360px] sm:w-[400px] md:w-[400px] lg:w-[400px] xl:w-[450px] 2xl:[500px] h-[580px] sm:h-[600px] overflow-hidden bg-white bg-opacity-95 border-slate-300 sm:shadow-lg">
        <Image
          src={noisebg}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-[5%] mix-blend-color-burn"
        />
        <Image
          src={coins}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-[6%] bg-blend-color-burn"
        />
        <Image
          src={thundertwo}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-[6%] bg-blend-luminosity"
        />
        <Image className="absolute inset-0" src={grid} alt="" />
        <div className="relative  z-10 h-[100vh] overflow-y-auto hide-scrollbar mx-8 ">
          <div className=" flex flex-col justify-center  pt-20 items-center">
            <Image
              className="border border-b shadow-lg bg-[#F2F2F2] rounded-full"
              src={sendit_ape}
              alt=""
            />
            <p className="text-3xl font-medium mt-4">Order complete!</p>
          </div>
          <div className=" mt-10">
            <div className="flex items-center justify-between bg-gray-300 bg-opacity-45 px-8 h-12 border-b border-gray-300 text-slate-500">
              <p className="z-10">Your order</p>
              <p className="z-10">Assets</p>
            </div>
            <div className="flex items-center justify-between px-8 h-12 border-b border-gray-300 font-medium">
              <p>Deposited</p>
              <p>5,000.00 USDC</p>
            </div>
            <div className="flex items-center justify-between px-8 h-12 font-medium">
              <p>Borrow</p>
              <p>500.00 USDC</p>
            </div>
          </div>
          <BorrowBtn
            title="Check Portfolio"
            className="h-14 sm:h-16 rounded-sm mt-10"
          />
        </div>
      </div>
    </div>
  );
}

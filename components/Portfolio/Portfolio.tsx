"use client";
import Image from "next/image";
import portfolio_ape from "@/public/_static/illustrations/portfolio_ape.png";
import YouOweCard from "./YouOweCard";
import LoanBalCard from "./LoanBalCard";
import AccHealth from "./AccHealth";
import MidSecCard from "./MidSecCard";
import CollateralBal from "./CollateralBal";
import Dashboard from "./Dashboard";
import Assets from "./Assets";
import BottomLabel from "./BottomLabel";

export default function Portfolio({ status }: { status: string }) {
  return (
    <div className="absolute  overflow-y-auto hide-scrollbar scroll-smooth z-10 h-screen w-[100%] flex flex-col pt-28 px-4 sm:px-8 md:px-20 lg:px-36 xl:px-64 2xl:px-96 gap-y-6 pb-20">
      <div className="flex items-center p-2 gap-x-6">
        <Image
          className="w-20 rounded-full border border-black"
          src={portfolio_ape}
          width={500}
          height={500}
          alt="Portfolio"
        />
        <div className="flex flex-col">
          <p className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold italic">
            PORTFOLIO
          </p>
          <p className="bg-[#223C3F] text-white w-fit px-2 text-[12px] sm:text-[14px] md:text-[16px] ">
            {status}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-x-1 sm:gap-x-2 lg:gap-x-3 xl:gap-x-4">
        <YouOweCard amt="500" />
        <LoanBalCard amt="500" amtConversion="500" />
        <AccHealth amt="500" />
      </div>
      <div className=" mt-8  gap-y-4 flex flex-col">
        <div className="flex gap-x-4">
          <MidSecCard
            firstLine="EARN 5% IN USDC IN"
            secondLine="A SAVING ACCOUNT"
            btnTitle="Lend Now!"
            className="flex-col  gap-y-1"
            mainClass="h-28"
          />
          <MidSecCard
            firstLine="QUALIFY FOR A "
            secondLine="QUICK USDC LOAN"
            btnTitle="Borrow USDC!"
            className="flex-col gap-y-1"
            mainClass="h-28"
          />
        </div>
        <BottomLabel
          firstLine="GET UP TO 30% OFF ON "
          secondLine="YOUR FAVORITE ASSETS"
          btnTitle="Token sales!"
          className="justify-between mr-6 items-center"
          mainClass="h-20"
        />
      </div>
      <div>
        <Dashboard />
      </div>
      {/* <div>
        <CollateralBal bal="800" token="NTRN" tokenVal="1000" />
      </div> */}

      <div>
        <Assets coin="NTRN" balance="800.00" />
      </div>
    </div>
  );
}

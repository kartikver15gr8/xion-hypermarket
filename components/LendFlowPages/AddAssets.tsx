"use client";
import Link from "next/link";
import BorrowBtn from "../BorrowPageComp/BorrowBtn";
import BorrowCardHead from "../BorrowPageComp/BorrowCardHead";
import LendCoinCard from "./LendCoinCard";
import neutron from "@/public/coins/neutron.png";
import usdc from "@/public/coins/usdccoin.png";
import Image from "next/image";
import bglines from "@/public/_static/background/bglines.png";
import coinbg from "@/public/_static/background/coinbg.png";
import randomstatic from "@/public/randomstatic.png";
import { useState } from "react";
import { useKeplr } from "@/hooks/useKeplr";

const IS_ACTIVE = "h-28 sm:h-36 mt-4 backdrop-blur-lg bg-[rgba(0,0,0,0.15)]";
const IS_NOT_ACTIVE = "h-28 sm:h-36 mt-5";
export default function AddAssets() {
  const [isActive, setIsActive] = useState("first");
  const { userAddress, balance, add, bal } = useKeplr();

  return (
    <div className="relative w-[350px] sm:w-[450px] sm:h-[620px] flex justify-center bg-white border rounded-[2px] shadow-[inset_8px_10px_20px_rgba(0,0,0,0.1)] ">
      <Image
        src={coinbg}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-[10%]"
      />
      <div className="relative z-10 flex items-center flex-col  w-full">
        <BorrowCardHead
          title="Your Wallet"
          backHref="/lend/depositfirst"
          crossHref="/lend"
        />

        <div className="w-full h-full flex items-center flex-col px-7">
          {/* searchbar */}
          <div className="relative w-full border border-slate-400 h-14 sm:h-16 mt-5 flex bg-[#FBFBFB]">
            <Image
              src={randomstatic}
              alt="Background"
              layout="fill"
              objectFit="cover"
              className="opacity-[34%] mix-blend-color-burn"
            />
            <div className="relative z-10 flex w-full items-center px-4">
              <svg
                className="w-5 mr-3"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 19L14.65 14.65M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z"
                  stroke="#050505"
                  strokeOpacity="0.4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <input
                type="text"
                placeholder="search"
                className="w-[80%] h-[100%] p-2 text-[18px] outline-none bg-inherit"
              />
              <svg
                className="w-3 ml-5"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.33268 1.66699L1.66602 8.33366M1.66602 1.66699L8.33268 8.33366"
                  stroke="#050505"
                  strokeOpacity="0.4"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-center justify-between w-full mt-4 text-[14px] sm:text-sm font-medium">
            <p>ASSETS</p>
            <p>BALANCE</p>
          </div>
          <div
            className="w-full"
            onClick={() => {
              setIsActive("first");
            }}
          >
            <LendCoinCard
              className={isActive == "first" ? IS_ACTIVE : IS_NOT_ACTIVE}
              coinName="NTRN"
              coinURI={neutron}
              amount={bal}
              convertedPrice="=1,00,000"
              earnPerc="4,5%"
            />
          </div>
          <div
            className="w-full"
            onClick={() => {
              setIsActive("second");
            }}
          >
            <LendCoinCard
              className={isActive == "second" ? IS_ACTIVE : IS_NOT_ACTIVE}
              coinName="USDC"
              coinURI={usdc}
              amount="$1200"
              convertedPrice="=1,00,000"
              earnPerc="2,5%"
            />
          </div>
          <Link href="/lend/lendusdc" className="w-full">
            <BorrowBtn
              className="mt-4 sm:mt-6 mb-4 w-full h-14 sm:h-16 cursor-pointer"
              title="Deposit to earn"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

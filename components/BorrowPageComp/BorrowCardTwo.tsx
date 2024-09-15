"use client";

import { useState } from "react";
import BorrowBtn from "./BorrowBtn";
import BorrowCardHead from "./BorrowCardHead";
import Link from "next/link";
import Speedometer from "./Speedometer";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import noisebg from "@/public/_static/background/noisebg.png";
import circlecaution from "@/public/circlecaution.svg";
import randomstatic from "@/public/randomstatic.png";
import coins from "@/public/_static/background/coins.png";
export default function BorrowCardTwo() {
  const [healthVal, setHealthVal] = useState(4);
  const searchParams = useSearchParams();
  const deposit = searchParams.get("deposit");
  const borrow = searchParams.get("borrow");

  return (
    <div className="pt-20 sm:pt-16">
      <div className="border relative rounded w-[340px] sm:w-[400px] md:w-[400px] lg:w-[400px] xl:w-[450px] 2xl:w-[500px] h-[400px] xl:h-[400px] 2xl:h-[420px] shadow-lg bg-white">
        <Image
          src={noisebg}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-[5%]"
        />
        <div className="relative z-10 h-[100vh] overflow-y-auto hide-scrollbar ">
          <BorrowCardHead
            title="Borrow USDC"
            backHref="/borrow/borrowone"
            crossHref="/liquidation"
          />

          <div className="mx-3 sm:mx-5  mt-1 pt-1">
            <div className="flex text-xs justify-between items-center font-medium">
              <div className="flex items-center gap-x-1">
                <p>HEALTH FACTOR</p>
                <svg
                  className="w-3"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.545 4.5C4.66255 4.16583 4.89458 3.88405 5.19998 3.70457C5.50538 3.52508 5.86445 3.45947 6.21359 3.51936C6.56273 3.57924 6.87941 3.76076 7.10754 4.03176C7.33567 4.30277 7.46053 4.64576 7.46 5C7.46 6 5.96 6.5 5.96 6.5M6 8.5H6.005M11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6Z"
                    stroke="#8B8B92"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p>{healthVal}.0</p>
            </div>
          </div>

          <div className="w-full  flex justify-center mt-4 mb-8">
            <Speedometer
              value={38}
              min={0}
              max={100}
              className="w-48 h-24 2xl:w-64 2xl:h-32"
            />
          </div>

          <div className="mx-6 sm:mx-16  mb-8 mt-4">
            <div className="gap-x-3 flex border p-1 rounded border-[#DFDFDF]">
              <div className="z-10 w-fit justify-center items-center flex ">
                <Image
                  className="w-20"
                  src={circlecaution}
                  width={500}
                  height={500}
                  alt=""
                />
              </div>

              <div className="">
                <p className="text-[14px] lg:text-[16px] font-medium">
                  Keep in Mind
                </p>
                <p className="text-xs text-slate-400">
                  If the health factor drops below 1, the liquidation of your
                  collateral might be triggered.
                </p>
              </div>
            </div>

            <div className="text-xs mt-4">
              <div className="flex justify-between px-2">
                <p>LIQUIDATION PRICE</p>
                <p>$400.00</p>
              </div>
              <div className="w-full bg-slate-200 h-[1px] my-2"></div>
              <div className="flex justify-between  px-2">
                <p>CURRENT USDC PRICE</p>
                <p>$500.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex relative flex-col p-2 sm:p-4 my-1 border rounded bg-[#F7F7F7] shadow-lg overflow-hidden">
        <Image
          src={randomstatic}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-[20%]"
        />
        <Image
          src={coins}
          alt="Background"
          layout=""
          objectFit=""
          className="opacity-[10%] rotate-[17.6deg] absolute -top-10  mix-blend-luminosity"
        />
        <div className="relative z-10 overflow-y-auto hide-scrollbar ">
          <p className="font-medium text-sm">DEPOSIT</p>
          <div className="flex items-center font-medium sm:font-bold text-xl sm:text-2xl mt-2">
            <p className="mr-[2px]">$</p>
            <p className="outline-none bg-inherit w-24">{deposit}</p>
            <p className="">NTRN</p>
          </div>
          <p className="font-extralight text-md text-slate-400">= $499.8</p>
          <BorrowBtn
            title="Deposit"
            className="mt-2 h-10 sm:h-12 xl:h-10 2xl:h-12 rounded shadow-lg"
          />
        </div>
      </div>

      <div className="flex relative flex-col p-2 sm:p-4 my-1 border rounded bg-[#F7F7F7] shadow-lg">
        <Image
          src={randomstatic}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-[20%]"
        />
        <Image
          src={coins}
          alt="Background"
          layout=""
          objectFit=""
          className="opacity-[10%] rotate-[17.6deg] absolute -top-10  mix-blend-luminosity"
        />
        <div className="relative z-10 overflow-y-auto hide-scrollbar ">
          <div className="relative z-10 overflow-y-auto hide-scrollbar ">
            <p className="font-medium text-sm">BORROW</p>
            <div className="flex items-center font-medium sm:font-bold text-xl sm:text-2xl mt-2">
              <p className="mr-[2px]">$</p>
              <p className="outline-none bg-inherit w-24">{borrow}</p>
              <p className="">USDC</p>
            </div>
            <p className="font-extralight text-md text-slate-400">= $499.8</p>
            <Link href="/borrow/borrowtwo/checkout">
              <BorrowBtn
                title="Borrow"
                className="mt-2 h-10 sm:h-12 xl:h-10 2xl:h-12  rounded shadow-lg"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

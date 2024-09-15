"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Logo from "@/public/logo.png";
import { Slider2 } from "./Slider2";
import BorrowBtn from "./BorrowBtn";
import BorrowCardHead from "./BorrowCardHead";
import Link from "next/link";
import usdc from "@/public/coins/usdccoin.png";
import noisebg from "@/public/_static/background/noisebg.png";
import ape from "@/public/ape.png";

export default function BorrowCard() {
  const [sliderVal, setSliderVal] = useState(10);
  const [depositAmt, setDepositAmt] = useState(5000);
  const [borrowAmt, setBorrowAmt] = useState(500);

  const handleSliderChange = (value: any) => {
    console.log("Slider value:", value);
    // Do something with the value
  };
  return (
    <div className="flex flex-col items-center pt-12">
      <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-7xl 2xl:text-7xl font-bold mb-4 italic">
        BORROW IT
      </h1>
      <div className="border shadow-lg rounded w-[340px] sm:w-[400px] md:w-[400px] lg:w-[400px] xl:w-[480px] h-[600px] sm:h-[610px] xl:h-[600px] 2xl:h-[650px] bg-white">
        <BorrowCardHead
          title="Borrow USDC"
          backHref="/borrow"
          crossHref="/liquidation"
        />
        <div className="flex items-center mx-8">
          <Image
            className="mr-4 xl:w-28 2xl:w-32"
            src={usdc}
            width={100}
            height={100}
            alt=""
          />

          <div className="flex flex-col ">
            <div className="mr-2 flex items-center">
              <p className="font-medium text-2xl lg:text-3xl xl:text-4xl">
                8.5%
              </p>
              <p className="text-white font-medium bg-slate-500 px-1 w-fit h-fit ml-2">
                APY
              </p>
            </div>
            <p className="text-xs text-slate-500">USD Coin</p>
          </div>
        </div>
        <div className=" mx-8 mt-3 2xl:mt-4 mb-4">
          <p className="font-medium text-sm sm:text-[16px] lg:text-[14px] 2xl:text-[16px]">
            DEPOSIT FIRST:
          </p>
          <div className="relative flex border border-slate-400 bg-[#F7F7F7] justify-between px-4 py-1 my-1">
            <Image
              src={noisebg}
              alt="Background"
              layout="fill"
              objectFit="cover"
              className="opacity-[5%]"
            />
            <div className="relative z-10 flex w-full justify-between overflow-y-auto hide-scrollbar ">
              <div className="flex flex-col">
                {/* <p className="font-medium text-xl">5,000.00</p> */}
                <input
                  className="font-medium text-xl outline-none bg-inherit w-32"
                  value={depositAmt}
                  onChange={(e) => {
                    setDepositAmt(Number(e.target.value));
                  }}
                />
                <p className="text-xs text-slate-500 ">${depositAmt}.00</p>
              </div>
              <div className="flex items-center">
                <p className="mx-3 font-medium sm:font-bold text-lg sm:text-xl lg:text-2xl">
                  NTRN
                </p>
                <div className="bg-[#EBEBEC]  rounded-[2px] w-4 h-4 items-center justify-center flex">
                  <svg
                    className="w-3"
                    viewBox="0 0 13 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.08401 5.30491L10.8116 0.577287L12.1621 1.92776L6.08401 8.00586L0.00591797 1.92776L1.35639 0.577288L6.08401 5.30491Z"
                      fill="#4B4B54"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <p className="text-[10px] sm:text-xs">
            Available on Neutron: 2000 NTRN
          </p>
        </div>
        <div className=" mx-8 mt-4 mb-4">
          <p className="font-medium text-[14px] sm:text-[16px] lg:text-[14px] 2xl:text-[16px]">
            BORROW USDC:
          </p>
          <div className="relative flex border border-slate-400 bg-[#F7F7F7] justify-between px-4 py-1 my-1">
            <Image
              src={noisebg}
              alt="Background"
              layout="fill"
              objectFit="cover"
              className="opacity-[5%]"
            />
            <div className="relative z-10 flex w-full justify-between overflow-y-auto hide-scrollbar ">
              <div className="flex flex-col">
                <input
                  className="font-medium text-xl outline-none bg-inherit w-32"
                  value={borrowAmt}
                  onChange={(e) => {
                    setBorrowAmt(Number(e.target.value));
                  }}
                />
                <p className="text-xs text-slate-500 ">${borrowAmt}.00</p>
              </div>
              <div className="flex items-center">
                <p className="mx-3 font-medium sm:font-bold text-slate-400 text-lg sm:text-xl lg:text-2xl">
                  USDC
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[20px] mx-8">
          <div className="flex justify-between">
            <div className="flex gap-x-1">
              <p className="font-bold text-[14px] sm:text-[16px] lg:text-[14px] 2xl:text-[16px]">
                LOAN TO VALUE
              </p>
              <p className="font-extralight text-[14px] sm:text-[16px] lg:text-[14px] 2xl:text-[16px] text-slate-400">
                (LTV)
              </p>
            </div>
            <p className="text-[14px] sm:text-[16px]">{sliderVal}.00%</p>
          </div>
          <div className="my-4">
            {/* The thumbImage is not deployed on S3 yet, you're using localhost img, so be aware of that. */}
            <Slider2
              defaultValue={10}
              onChange={handleSliderChange}
              thumbImage={ape}
              setSliderValue={setSliderVal}
            />
          </div>
          <div className="flex ">
            <p
              className={
                sliderVal >= 0 && sliderVal < 33
                  ? `text-[10px] sm:text-[12px] w-[34%] text-black`
                  : `text-[10px] sm:text-[12px] w-[34%] text-slate-400`
              }
            >
              CONSERVATIVE
            </p>
            <p
              className={
                sliderVal >= 33 && sliderVal < 66
                  ? `text-[10px] sm:text-[12px] w-[34%] text-black`
                  : `text-[10px] sm:text-[12px] w-[34%] text-slate-400`
              }
            >
              MODERATE
            </p>
            <p
              className={
                sliderVal >= 66 && sliderVal <= 100
                  ? `text-[10px] sm:text-[12px] w-[34%] text-black`
                  : `text-[10px] sm:text-[12px] w-[34%] text-slate-400`
              }
            >
              AGGRESSIVE
            </p>
          </div>
        </div>

        <Link
          href={`/borrow/borrowtwo?deposit=${depositAmt}&borrow=${borrowAmt}`}
        >
          <BorrowBtn
            title="Borrow"
            className="mt-6 h-14 sm:h-16 xl:h-14 2xl:h-16 mx-8 rounded-sm text-lg sm:font-medium"
          />
        </Link>
      </div>
    </div>
  );
}

"use client";
import Image from "next/image";
import cube from "@/public/cube.svg";
import BorrowBtn from "../BorrowPageComp/BorrowBtn";
import Link from "next/link";
import usdc from "@/public/coins/usdccoin.png";

export default function LendUSDC({
  percent,
  className,
}: {
  percent: string;
  className: string;
}) {
  return (
    <div
      className={`${className} flex flex-col w-[320px] sm:w-[430px] h-[350px] sm:h-[450px] bg-white rounded-sm px-4 sm:px-6 md:px-8`}
    >
      <div className="relative w-full h-[45%]">
        <Image
          className="w-52 sm:w-60 md:w-72 absolute -top-16"
          src={usdc}
          width={500}
          height={500}
          alt="USDC"
        />
      </div>
      <div className="bottom-5 w-full h-[50%] flex flex-col">
        <Image
          className="w-10 sm:w-12 md:w-14"
          src={cube}
          width={200}
          height={200}
          alt=""
        />
        <div className="flex items-center gap-x-2 mt-2 sm:mt-5">
          <p className="font-medium sm:font-semibold text-4xl sm:text-5xl">
            {percent}
          </p>
          <p className="bg-[#4E6465] font-medium text-[14px] sm:text-xl px-2 text-white">
            APY
          </p>
        </div>
        <Link href="/lend/earnrate">
          <BorrowBtn
            title="SEND IT"
            className="h-14 sm:h-16 mt-[24px] w-full"
          />
        </Link>
      </div>
    </div>
  );
}

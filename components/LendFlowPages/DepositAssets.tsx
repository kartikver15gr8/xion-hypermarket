"use client";
import Link from "next/link";
import BorrowBtn from "../BorrowPageComp/BorrowBtn";
import Image from "next/image";
import bglines from "@/public/_static/background/bglines.png";

export default function DepositAssets() {
  return (
    <div className="relative w-[330px] sm:w-[430px] h-[250px] sm:h-[300px] flex justify-center bg-white border rounded-[2px] shadow-[inset_8px_10px_20px_rgba(0,0,0,0.1)] ">
      <Image
        src={bglines}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-[16%]"
      />
      <div className="absolute p-1 rounded-[2px] right-2 top-2 bg-[#EBEBEB] cursor-pointer z-20">
        <Link href="/lend" className="">
          <svg
            className="w-3  "
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 1L1 9M1 1L9 9"
              stroke="#050505"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
      <div className="relative z-10 flex items-center justify-center flex-col w-full">
        <div className="font-medium text-[25px] sm:text-3xl">
          <p>But first you need to</p>
          <p>deposit some assets</p>
        </div>
        <Link href="/lend/depositfirst/addasset">
          <BorrowBtn
            className="mt-12 w-64 sm:w-72 h-14 cursor-pointer"
            title="Deposit to earn"
          />
        </Link>
      </div>
    </div>
  );
}

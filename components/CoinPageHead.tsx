"use client";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import usdc from "@/public/_static/icons/usdccoin.png";
import TopReveal from "./framerEffects/TopReveal";
export default function CoinPageHead({
  coin,
  coinURI,
}: {
  coin: string;
  coinURI: string | StaticImageData;
}) {
  return (
    <div className="flex border-b pb-4">
      <TopReveal>
        <div className="flex items-center ">
          <Link
            href="/liquidation"
            className="hover:scale-105 transition-all duration-300 ml-2 sm:ml-4 md:ml-2"
          >
            <svg
              width="18"
              height="13"
              viewBox="0 0 18 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 4.50033H12.75C14.8211 4.50033 16.5 6.17926 16.5 8.25033C16.5 10.3214 14.8211 12.0003 12.75 12.0003H9M1.5 4.50033L4.83333 1.16699M1.5 4.50033L4.83333 7.83366"
                stroke="#050505"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          <div className="flex relative mx-2">
            <Image
              className="rounded-full"
              src={usdc}
              alt="coin"
              width={20}
              height={20}
            />
            <Image
              className="absolute ml-3 rounded-full"
              src={coinURI}
              alt="coin"
              width={20}
              height={20}
            />
          </div>
          <p className="mx-2">Bid for liquidation {coin} using USDC</p>
        </div>
      </TopReveal>
    </div>
  );
}

"use client";
import Image from "next/image";
import LendBtn from "./LendBtn";
import sendit_ape from "@/public/sendit_ape.svg";
import grid from "@/public/_static/illustrations/grid.svg";
import Link from "next/link";
import coins from "@/public/_static/background/coins.png";
import thundertwo from "@/public/_static/background/thundertwo.png";
import noisebg from "@/public/_static/background/noisebg.png";
import unlock from "@/public/unlock.svg";
import { useRecoilValue } from "recoil";
import { txsHashState } from "@/store/atom/depositTxsHash";
export default function DepositStatus({
  hash,
  depositAmt,
}: {
  hash: string;
  depositAmt: string;
}) {
  const txsHash = useRecoilValue(txsHashState);

  return (
    <div>
      <div className="border relative rounded w-[360px] sm:w-[400px] md:w-[400px] lg:w-[400px] xl:w-[450px] 2xl:[500px] h-[580px] sm:h-[680px] overflow-hidden bg-white border-slate-300 shadow-lg">
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
          className="opacity-[10%] mix-blend-luminosity"
        />
        <Image
          src={thundertwo}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-[6%] mix-blend-luminosity"
        />
        <Image className="absolute inset-0" src={grid} alt="" />

        <Link
          href="/lend"
          className="absolute right-1 top-1 p-1 bg-[#DFDFDF] cursor-pointer z-10"
        >
          <svg
            width="10"
            height="10"
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

        <div className="relative  z-10 h-[100vh] overflow-y-auto hide-scrollbar mx-10 ">
          <div className=" flex flex-col justify-center  pt-14 sm:pt-16 items-center">
            <Image
              className="border border-b shadow-lg bg-[#F2F2F2] rounded-full"
              src={sendit_ape}
              alt=""
            />
            <p className="text-xl sm:text-2xl font-medium mt-4">
              Deposit Successful!
            </p>
          </div>
          <div className="mt-5 sm:mt-10">
            <div className="flex items-center justify-between bg-[#EFEFEF] px-8 h-10 sm:h-12 border-b border-gray-300 text-slate-600 font-extralight text-[12px] sm:text-sm">
              <p className="z-10">Your order</p>
              <p className="z-10">{depositAmt} deposit</p>
            </div>
            <div className="flex items-center justify-between px-8 h-10 sm:h-12 font-medium">
              <p className="text-[12px] sm:text-sm">Hash</p>
              <div className="flex items-center gap-x-2">
                <a
                  className="text-black text-xs"
                  target="_blank"
                  href={`https://neutron.celat.one/pion-1/txs/${txsHash}`}
                >
                  {txsHash.slice(0, 7)}...${txsHash.slice(-5)}
                </a>
                <svg
                  className="w-4 hover:scale-105 transition-all duration-300"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.33398 5.33301V3.46634C5.33398 2.7196 5.33398 2.34624 5.47931 2.06102C5.60714 1.81014 5.81111 1.60616 6.062 1.47833C6.34721 1.33301 6.72058 1.33301 7.46732 1.33301H12.534C13.2807 1.33301 13.6541 1.33301 13.9393 1.47833C14.1902 1.60616 14.3942 1.81014 14.522 2.06102C14.6673 2.34624 14.6673 2.7196 14.6673 3.46634V8.53301C14.6673 9.27974 14.6673 9.65311 14.522 9.93833C14.3942 10.1892 14.1902 10.3932 13.9393 10.521C13.6541 10.6663 13.2807 10.6663 12.534 10.6663H10.6673M3.46732 14.6663H8.53398C9.28072 14.6663 9.65409 14.6663 9.93931 14.521C10.1902 14.3932 10.3942 14.1892 10.522 13.9383C10.6673 13.6531 10.6673 13.2797 10.6673 12.533V7.46634C10.6673 6.7196 10.6673 6.34624 10.522 6.06102C10.3942 5.81014 10.1902 5.60616 9.93931 5.47833C9.65409 5.33301 9.28072 5.33301 8.53398 5.33301H3.46732C2.72058 5.33301 2.34721 5.33301 2.062 5.47833C1.81111 5.60616 1.60714 5.81014 1.47931 6.06102C1.33398 6.34624 1.33398 6.7196 1.33398 7.46634V12.533C1.33398 13.2797 1.33398 13.6531 1.47931 13.9383C1.60714 14.1892 1.81111 14.3932 2.062 14.521C2.34721 14.6663 2.72058 14.6663 3.46732 14.6663Z"
                    stroke="#52525C"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full mt-4 flex flex-col">
            <div className="w-[40%] h-8 rounded-t-[27px] flex items-center justify-center bg-[#E6E6E6]">
              <p className="text-xs text-[#263039]">Congratulations</p>
            </div>
            <div className="relative bg-[#F8F8F8] border-b border-gray-300 bg-opacity-75 items-center flex h-20 sm:h-24">
              <div className="flex flex-col text-xl sm:text-2xl md:text-3xl font-bold ml-6">
                <p>YOU QUALIFY</p>
                <p>FOR A LOAN</p>
              </div>
              <Image
                className="w-16  md:w-24 bottom-0 absolute right-3 sm:right-8"
                src={unlock}
                width={200}
                height={200}
                alt="unlock"
              />
            </div>
          </div>
          <LendBtn
            title="Borrow Now"
            className="h-14 sm:h-16 rounded-sm mt-10"
          />
        </div>
      </div>
    </div>
  );
}

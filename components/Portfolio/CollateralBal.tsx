"use client";

import Image from "next/image";
import neutron from "@/public/coins/neutron.png";
export default function CollateralBal({
  bal,
  token,
  tokenVal,
}: {
  bal: string;
  token: string;
  tokenVal: string;
}) {
  return (
    <div className="w-full ">
      <p className="py-1">Collateral Balance</p>
      <div className="border rounded shadow-lg">
        <div className="flex items-center justify-between px-4 md:px-6 lg:px-8  bg-[#F4F5F7] text-[10px] sm:text-[12px] py-2 text-[#8B8B93]">
          <p>Assets</p>
          <p>Collateral Value in USDC</p>
        </div>
        <div className="py-3 px-4 md:px-6 lg:px-8 flex justify-between items-center bg-white">
          <div className="flex items-center gap-x-4">
            <Image
              className="w-8 h-8 sm:w-10 sm:h-10 xl:w-12 xl:h-12"
              src={neutron}
              width={500}
              height={500}
              alt="coin"
            />
            <div>
              <p className="font-medium text-lg md:text-xl">{tokenVal}</p>
              <p className="text-[12px] sm:text-[14px] text-[#8B8B93]">
                {token}
              </p>
            </div>
          </div>
          <div>
            <p className="font-bold text-xl md:text-2xl">$ {bal}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

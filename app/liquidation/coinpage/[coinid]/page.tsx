"use client";
import CoinPage from "@/components/CoinPage";
import React from "react";
import { useState } from "react";

export default function Coin({ params }: any) {
  const [coindetails, setCoinDetails] = useState(params.coinid);
  console.log(coindetails);

  return (
    <div className="w-full h-[100vh] overflow-y-auto hide-scrollbar px-[11px] sm:px-[20px] md:px-[20px] lg:px-[20px] xl:px-[50px] 2xl:px-[100px]">
      <CoinPage />
    </div>
  );
}

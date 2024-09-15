"use client";
import Image, { StaticImageData } from "next/image";

import solana from "@/public/coins/solana.png";
import neutron from "@/public/coins/neutron.png";
import usdccoin from "@/public/coins/usdccoin.png";
import bitcoin from "@/public/coins/btc.png";
import ethereum from "@/public/coins/ethereum.png";
import akash from "@/public/coins/akt.png";
import injective from "@/public/coins/injective.png";
import atom from "@/public/coins/cosmos.png";
import dydx from "@/public/coins/dydx.png";
import celestia from "@/public/coins/tia.png";
import osmosis from "@/public/coins/osmo.png";
export default function Assets({
  coin,
  balance,
}: {
  coin: string;
  balance: string;
}) {
  return (
    <div className="w-full ">
      <p className="py-1">Assets</p>
      <div className="border border-[#c2c2c7] rounded shadow-lg">
        <div className="flex rounded-t border-b items-center justify-between px-4 md:px-6 lg:px-8 bg-[#F4F5F7] text-[10px] sm:text-[12px] py-2 text-[#8B8B93]">
          <p>Portfolio Assets</p>
          <p>What you are Lending</p>
          <p>Remaining Balance</p>
        </div>
        <div className="w-full h-44 overflow-y-auto hide-scrollbar rounded-b">
          <CoinLabel coinImg={neutron} coin="NTRN" balance="800" />
          <CoinLabel coinImg={usdccoin} coin="USDC" balance="34000" />
          <CoinLabel coinImg={injective} coin="INJ" balance="200" />
          <CoinLabel coinImg={celestia} coin="TIA" balance="1200" />
          <CoinLabel coinImg={bitcoin} coin="BTC" balance="3" />
          <CoinLabel coinImg={ethereum} coin="ETH" balance="23" />
          <CoinLabel coinImg={solana} coin="SOL" balance="20" />
        </div>
      </div>
    </div>
  );
}

const CoinLabel = ({
  coin,
  balance,
  coinImg,
}: {
  coin: string;
  balance: string;
  coinImg: string | StaticImageData;
}) => {
  return (
    <div className="py-2 px-4 md:px-6 lg:px-8  flex justify-between items-center bg-white border-b hover:bg-[#eeeeef] transition-all duration-200">
      <div className="flex gap-x-4 items-center">
        <Image
          className="w-10 h-10"
          src={coinImg}
          width={500}
          height={500}
          alt="coin"
        />
        <p className="font-medium text-md text-[#8B8B93]">{coin}</p>
      </div>
      <div>
        <p className="font-medium text-xl sm:text-2xl ">{balance}</p>
      </div>
    </div>
  );
};

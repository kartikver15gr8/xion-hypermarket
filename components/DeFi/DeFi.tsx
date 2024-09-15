"use client";
import GradualSpacing from "../magicui/gradual-spacing";
import DefiCard from "./DefiCard";

import solana from "@/public/coins/solana.png";
import neutron from "@/public/coins/neutron.png";
import bitcoin from "@/public/coins/btc.png";
import ethereum from "@/public/coins/ethereum.png";
import akash from "@/public/coins/akt.png";
import injective from "@/public/coins/injective.png";
import atom from "@/public/coins/cosmos.png";
import dydx from "@/public/coins/dydx.png";
import celestia from "@/public/coins/tia.png";
import osmosis from "@/public/coins/osmo.png";
import usdccoin from "@/public/coins/usdccoin.png";
import EarnMoreDefi from "./EarnMoreDefi";

export default function DeFi() {
  return (
    <div className=" flex flex-col">
      <div className="flex justify-center">
        <GradualSpacing
          className="font-display text-5xl xl:text-6xl 2xl:text-7xl font-bold italic flex justify-center py-7 xl:py-10 tracking-[-0.1em]  text-black dark:text-white md:leading-[5rem]"
          text="SENDIT"
        />
      </div>
      <div className=" grid grid-cols-1 gap-y-2 sm:grid-cols-1 md:grid-cols-2 md:gap-x-4 lg:gap-x-8 justify-between p-2">
        <DefiCard
          title="What are you Lending"
          asset="Neutron"
          assetImg={neutron}
          assetSymbol="NTRN"
          collateral="520.00"
          amount="1,087.02"
        />
        <DefiCard
          title="What are you Borrowing"
          assetImg={usdccoin}
          asset="USD Coin"
          assetSymbol="USDC"
          collateral="820.00"
          amount="1,087.02"
        />
      </div>
      <EarnMoreDefi />
    </div>
  );
}

"use client";

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

import EarnMoreCard from "./EarnMoreCard";

export default function EarnMoreDefi() {
  return (
    <div className="my-5 mx-2">
      <div className="flex flex-col mb-5">
        <p className="text-xl font-medium">Earn More in DeFi</p>
        <p className="text-xs text-[#8B8B93]">
          What you earn today will be unlocked in 6 months.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4 lg:gap-x-8 gap-y-2">
        <EarnMoreCard
          coinOne={neutron}
          coinTwo={usdccoin}
          earnPercent="50.61"
          firstCoin="NTRN"
          secondCoin="USDC"
        />
        <EarnMoreCard
          coinOne={akash}
          coinTwo={celestia}
          earnPercent="15.61"
          firstCoin="AKT"
          secondCoin="TIA"
        />
        <EarnMoreCard
          coinOne={bitcoin}
          coinTwo={ethereum}
          earnPercent="3.61"
          firstCoin="BTC"
          secondCoin="ETH"
        />
        <EarnMoreCard
          coinOne={solana}
          coinTwo={usdccoin}
          earnPercent="53.61"
          firstCoin="SOL"
          secondCoin="USDC"
        />
      </div>
    </div>
  );
}

"use client";
import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState, useRef } from "react";
import Coin from "./Coin";
import CoinViews from "./CoinViews";
import ProductInfoContainer from "./ProductInfoContainer";
import ActivityContainerGraph from "./ActivityContainerGraph";
import ActivityContainer from "./ActivityContainer";
import CoinPageHead from "./CoinPageHead";

import RiskCollateralCoverage from "./RiskCollateralCoverage";
import CheckOtherCoinsPromo from "./CheckOtherCoinsPromo";
import SideReveal from "./framerEffects/SideReveal";
import LeftReveal from "./framerEffects/LeftReveal";
import { MarqueeDemo } from "./MarqueeDemo";
import { usePathname } from "next/navigation";

import sol from "@/public/_static/icons/solanacoin.png";
import ntrn from "@/public/_static/coinIcons/ntrn.png";
import btc from "@/public/_static/coinIcons/btc.png";
import eth from "@/public/_static/coinIcons/eth.png";
import akt from "@/public/_static/coinIcons/akt.png";
import inj from "@/public/_static/coinIcons/inj.png";
import atm from "@/public/_static/coinIcons/atom.png";
import Edydx from "@/public/_static/coinIcons/dydx.png";
import tia from "@/public/_static/coinIcons/tia.png";
import osmo from "@/public/_static/coinIcons/osmo.png";
import usdc from "@/public/_static/coinIcons/usdc.png";

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

export default function CoinPage() {
  const topRef = useRef<HTMLDivElement>(null);

  const scrollToTop = (): void => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const pathname = usePathname();
  // console.log(pathname);

  // console.log(pathname.split("/")[3]);
  // console.log(typeof pathname.split("/")[3]);
  const [token, setToken] = useState(pathname.split("/")[3]);
  const [productCoin, setProductCoin] = useState<string | StaticImageData>(
    neutron
  );
  const [productIcon, setProductIcon] = useState<string | StaticImageData>(
    ntrn
  );
  const [coinSymbol, setCoinSymbol] = useState("NTRN");

  useEffect(() => {
    if (token == "atom") {
      setProductCoin(atom);
      setProductIcon(atm);
      setCoinSymbol("ATOM");
    } else if (token == "solana") {
      setProductCoin(solana);
      setProductIcon(sol);
      setCoinSymbol("SOL");
    } else if (token == "bitcoin") {
      setProductCoin(bitcoin);
      setProductIcon(btc);
      setCoinSymbol("BTC");
    } else if (token == "ethereum") {
      setProductCoin(ethereum);
      setProductIcon(eth);
      setCoinSymbol("ETH");
    } else if (token == "neutron") {
      setProductCoin(neutron);
      setProductIcon(ntrn);
      setCoinSymbol("NTRN");
    } else if (token == "akash") {
      setProductCoin(akash);
      setProductIcon(akt);
      setCoinSymbol("AKT");
    } else if (token == "injective") {
      setProductCoin(injective);
      setProductIcon(inj);
      setCoinSymbol("INJ");
    } else if (token == "osmosis") {
      setProductIcon(osmo);
      setProductCoin(osmosis);
      setCoinSymbol("OSMO");
    } else if (token == "usdc") {
      setProductCoin(usdccoin);
      setProductIcon(usdc);
      setCoinSymbol("USDC");
    } else if (token == "celestia") {
      setProductCoin(celestia);
      setProductIcon(tia);
      setCoinSymbol("TIA");
    } else if (token == "ethdydx") {
      setProductCoin(dydx);
      setProductIcon(Edydx);
      setCoinSymbol("DYDX");
    }
  }, [token]);

  return (
    <div className="">
      <div className="h-[80px]" ref={topRef}></div>
      <CoinPageHead coin={token.toUpperCase()} coinURI={productIcon} />

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-5 mb-5 xl:gap-x-4 2xl:gap-x-8 px-2 pt-2 xl:justify-between 2xl:justify-evenly gap-y-4 sm:gap-y-4 md:gap-y-4 lg:gap-y-0">
        <Coin
          className="col-span-5 sm:col-span-5 md:col-span-5 lg:col-span-3"
          coinURI={productCoin}
        />

        <ProductInfoContainer
          className="lg:col-span-2 col-span-1 sm:col-span-1 md:col-span-1"
          coinIcon={productIcon}
          bidCoinName={token}
          coinSymbol={coinSymbol}
        />
      </div>

      <RiskCollateralCoverage />
      {/* <div className="flex my-5">
        <MarqueeDemo />
      </div> */}
      <ActivityContainer scrollToTop={scrollToTop} />
      <CheckOtherCoinsPromo
        head="YOU MAY ALSO LIKE"
        subhead="Check Out These Coins"
      />
    </div>
  );
}

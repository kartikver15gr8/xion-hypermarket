"use client";
import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import coinbg from "@/public/_static/background/coinbg.png";
import BlurFade from "./magicui/blur-fade";
import ATOM_1 from "@/public/coins/secRenders/ATOM_1.png";
import ATOM_2 from "@/public/coins/secRenders/ATOM_2.png";
import SOL_1 from "@/public/coins/secRenders/SOL_1.png";
import SOL_2 from "@/public/coins/secRenders/SOL_2.png";
import BTC_1 from "@/public/coins/secRenders/BTC_1.png";
import BTC_2 from "@/public/coins/secRenders/BTC_2.png";
import NTRN_1 from "@/public/coins/secRenders/NTRN_1.png";
import NTRN_2 from "@/public/coins/secRenders/NTRN_2.png";
import OSMO_1 from "@/public/coins/secRenders/OSMO_1.png";
import OSMO_2 from "@/public/coins/secRenders/OSMO_2.png";
import ETH_1 from "@/public/coins/secRenders/ETH_1.png";
import ETH_2 from "@/public/coins/secRenders/ETH_2.png";
import AKT_1 from "@/public/coins/secRenders/AKT_1.png";
import AKT_2 from "@/public/coins/secRenders/AKT_2.png";
import DYDX_1 from "@/public/coins/secRenders/DYDX_1.png";
import DYDX_2 from "@/public/coins/secRenders/DYDX_2.png";
import TIA_1 from "@/public/coins/secRenders/TIA_1.png";
import TIA_2 from "@/public/coins/secRenders/TIA_2.png";
import INJ_1 from "@/public/coins/secRenders/INJ_1.png";
import INJ_2 from "@/public/coins/secRenders/INJ_2.png";
import USDC_1 from "@/public/coins/secRenders/USDC_1.png";
import USDC_2 from "@/public/coins/secRenders/USDC_2.png";

import { usePathname } from "next/navigation";

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

export default function Coin({
  coinURI,
  className,
}: {
  coinURI: string | StaticImageData;
  className: string;
}) {
  const [orient, setOriantation] = useState("");
  const pathname = usePathname();
  const [token, setToken] = useState(pathname.split("/")[3]);
  const [coinImg, setCoinImg] = useState<string | StaticImageData>(neutron);

  const [secToken, setSecToken] = useState<string | StaticImageData>(NTRN_1);
  const [thirdToken, setThirdToken] = useState<string | StaticImageData>(
    NTRN_2
  );

  // console.log("The Pathname: ", pathname);
  // console.log(token);

  useEffect(() => {
    if (token == "bitcoin") {
      setCoinImg(bitcoin);
      setSecToken(BTC_1);
      setThirdToken(BTC_2);
    } else if (token == "atom") {
      setCoinImg(atom);
      setSecToken(ATOM_1);
      setThirdToken(ATOM_2);
    } else if (token == "solana") {
      setCoinImg(solana);
      setSecToken(SOL_1);
      setThirdToken(SOL_2);
    } else if (token == "neutron") {
      setCoinImg(neutron);
      setSecToken(NTRN_1);
      setThirdToken(NTRN_2);
    } else if (token == "ethereum") {
      setCoinImg(ethereum);
      setSecToken(ETH_1);
      setThirdToken(ETH_2);
    } else if (token == "osmosis") {
      setCoinImg(osmosis);
      setSecToken(OSMO_1);
      setThirdToken(OSMO_2);
    } else if (token == "celestia") {
      setCoinImg(celestia);
      setSecToken(TIA_1);
      setThirdToken(TIA_2);
    } else if (token == "ethdydx") {
      setCoinImg(dydx);
      setSecToken(DYDX_1);
      setThirdToken(DYDX_2);
    } else if (token == "akash") {
      setCoinImg(akash);
      setSecToken(AKT_1);
      setThirdToken(AKT_2);
    } else if (token == "injective") {
      setCoinImg(injective);
      setSecToken(INJ_1);
      setThirdToken(INJ_2);
    } else if (token == "usdc") {
      setCoinImg(usdccoin);
      setSecToken(USDC_1);
      setThirdToken(USDC_2);
    }
  }, [token]);

  //flex col-span-[60%] justify-center gap-x-4 sm:gap-x-4 md:gap-x-6 lg:gap-x-6 xl:gap-x-8 2xl:gap-x-8 h-fit
  return (
    <div
      className={`flex relative justify-center gap-x-4 sm:gap-x-4 md:gap-x-6 lg:gap-x-6 xl:gap-x-8 2xl:gap-x-8 h-[400px] sm:h-[500px] md:h-[500px] lg:h-[100%] ${className} border rounded-md`}
    >
      {/* <div className="absolute z-20 w-[60%] sm:w-[60%] md:w-[50%] xl:w-[50%] 2xl:w-[45%] flex gap-x-1 bottom-2 shadow-xl  p-1 justify-between border bg-white rounded-lg"> */}
      <div className="absolute z-20 w-fit flex gap-x-1 bottom-2 shadow-xl  p-1 justify-between border bg-white rounded-lg">
        <SideCoin
          className="p-1   border rounded"
          coinURI={coinURI}
          setCoin={setCoinImg}
        />
        <SideCoin
          className="p-1   border rounded"
          coinURI={secToken}
          setCoin={setCoinImg}
        />
        <SideCoin
          className="p-1   border rounded"
          coinURI={thirdToken}
          setCoin={setCoinImg}
        />
        {/* <SideCoin
          className="p-1  w-fit border rounded"
          coinURI={coinURI}
          orientation="-rotate-90"
          orientVal="-rotate-90"
          setCoinOrientation={setOriantation}
        />
        <SideCoin
          className="p-1  w-fit border rounded"
          coinURI={coinURI}
          orientation="-rotate-180"
          orientVal="-rotate-180"
          setCoinOrientation={setOriantation}
        /> */}
      </div>
      {/* w-[250px] sm:w-[250px] md:w-[400px] lg:w-[400px] xl:w-[450px] 2xl:w-[550px] */}
      <div className="relative flex w-full  items-center justify-center ">
        {/* <div className="absolute inset-0 bg-[url('https://s3-alpha-sig.figma.com/img/b46a/8755/9c44d2fc47e807aa16b8490886a1f725?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NwIfXZTDlB3inzOycAxOl~4Mn7QvozQyUbTXkzNfkYLjB~RxUGHrMrtqngiRZb7I-trSjXlbL2K1n20C4jwdE5lGLeSVC90R4JyRQ7iLMMpyfXwm2fhxwIAwh2fYuJg-aL0E7WBAfcQ2URbOgKMJJk6RChLtGXVbrGluCuZDuvJGFcQ6lKNzSi9n94mY7Qj8hmhVsodeAe6i6fH6b8cLmrRIdddGKEfyFU2e6Mid3ekM1AX5g~qCrth-M10QXSPxnwOH42J-Axw-rYrV-YPkGCp0ERylQFAWQLFXeQLdcsSN1m2N1PP0yy4GbiddgBXw06nDBfDNbeeAvQLvxE~8CQ__')] bg-cover bg-center opacity-[5%]"></div> */}

        <Image
          src={coinbg}
          alt="Background"
          objectFit="fill"
          className="opacity-[7%]"
          layout="fill"
        />
        {/* <div className="absolute inset-0 "></div> */}
        <div className="absolute z-10 top-3 sm:top-4 md:top-4 lg:top-4 xl:top-4 2xl:top-4 left-3 sm:left-4 md:left-4 lg:left-4 xl:left-4 2xl:left-4 w-[90px] text-[16px]">
          <p className="text-sm  md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">
            Up to:
          </p>
          <div className="bg-[#263039] w-fit px-1 hover:scale-105 transition-all duration-300">
            <p className="text-sm md:text-lg lg:text-lg xl:text-lg 2xl:text-lg font-normal italic text-white">
              30% OFF
            </p>
          </div>
        </div>
        <BlurFade delay={0.25} inView>
          <div className="relative  z-10">
            <Image
              className={`hover:opacity-85 md:w-64 xl:w-80 ${orient}  transition-all duration-300`}
              src={coinImg}
              width={200}
              height={200}
              alt=""
            />
          </div>
        </BlurFade>
      </div>
    </div>
  );
}

const SideCoin = ({
  className,
  orientation,
  coinURI,
  setCoinOrientation,
  orientVal,
  setCoin,
}: {
  className: string;
  orientation?: string;
  coinURI: string | StaticImageData;
  setCoinOrientation?: React.Dispatch<React.SetStateAction<string>>;
  orientVal?: string;
  setCoin: React.Dispatch<React.SetStateAction<string | StaticImageData>>;
}) => {
  return (
    //w-10 sm:w-12 md:w-16 lg:w-16 xl:w-20 2xl:w-24
    <div
      className={`${className} w-14 md:w-16 xl:w-20 bg-gray-300 shadow-inner shadow-slate-400 rounded-lg hover:bg-slate-400 transition-all duration-300`}
      onClick={() => {
        // setCoinOrientation(orientVal);
        setCoin(coinURI);
      }}
    >
      <Image
        className={`${orientation} `}
        src={coinURI}
        width={80}
        height={80}
        alt=""
      />
    </div>
  );
};

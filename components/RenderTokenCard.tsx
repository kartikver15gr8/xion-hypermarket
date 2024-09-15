"use client";
import LiquidationTokenCard from "./LiquidationTokenCard";
import akt from "@/public/coins/akt.png";
import btc from "@/public/coins/btc.png";
import atom from "@/public/coins/cosmos.png";
import dydx from "@/public/coins/dydx.png";
import ethereum from "@/public/coins/ethereum.png";
import injective from "@/public/coins/injective.png";
import neutron from "@/public/coins/neutron.png";
import osmo from "@/public/coins/osmo.png";
import solana from "@/public/coins/solana.png";
import tia from "@/public/coins/tia.png";
import usdc from "@/public/coins/usdccoin.png";
import Reveal from "./framerEffects/Reveal";
import { useRecoilState } from "recoil";
import { cryptoState } from "@/store/atom/cryptoState";
import { useEffect, useState } from "react";
import BlurFade from "./magicui/blur-fade";
import NumberTicker from "./magicui/number-ticker";
import Image from "next/image";
import spinner from "@/public/loaders/spinner.svg";
import spinnertwo from "@/public/loaders/spinnertwo.svg";
import loader from "@/public/loaders/loader.svg";

const coinIds = [
  "bitcoin",
  "ethereum",
  "solana",
  "neutron",
  "dydx",
  "cosmos",
  "akash-network",
  "osmosis",
  "injective-protocol",
  "celestia",
];
export default function RenderTokenCard() {
  const [cryptoPrices, setCryptoPrices] = useRecoilState(cryptoState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        setIsLoading(true);
        const ids = coinIds.join(",");
        const response = await fetch(`/api/crypto?ids=${ids}`);
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();

        setCryptoPrices(data);
      } catch (err) {
        console.log(err);
      } finally {
        // Made a forced delay of 1 seconds
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };

    fetchCryptos();
  }, [setCryptoPrices]);
  {
    console.log(cryptoPrices[0]);
  }
  return (
    <>
      {isLoading && (
        <div className="text-xl font-medium flex p-2 items-center h-16 w-full justify-center">
          <Image
            className="w-16"
            src={loader}
            alt="spinner"
            width={500}
            height={500}
          />
        </div>
      )}
      {/* This will show up when the loading is false and the api return the data */}
      <div className="mt-[16px] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-x-[10px] sm:gap-x-[10px] md:gap-x-[10px] lg:gap-x-[10px] xl:gap-x-[10px] 2xl:gap-x-[20px] gap-y-[10px] mb-14">
        {cryptoPrices[0] && !isLoading && (
          <>
            <BlurFade delay={0.5} inView>
              <LiquidationTokenCard
                discount="30% OFF"
                tokenName={cryptoPrices[0]["symbol"]}
                price={
                  "$ " + parseFloat(cryptoPrices[0]["priceUsd"]).toFixed(2)
                }
                coin={btc}
                redirectHref="bitcoin"
              />
            </BlurFade>

            <BlurFade delay={0.5} inView>
              <LiquidationTokenCard
                discount="30% OFF"
                tokenName={cryptoPrices[1]["symbol"]}
                price={
                  "$ " + parseFloat(cryptoPrices[1]["priceUsd"]).toFixed(2)
                }
                coin={ethereum}
                redirectHref="ethereum"
              />
            </BlurFade>

            <BlurFade delay={0.5} inView>
              <LiquidationTokenCard
                discount="30% OFF"
                tokenName={cryptoPrices[2]["symbol"]}
                price={
                  "$ " + parseFloat(cryptoPrices[2]["priceUsd"]).toFixed(2)
                }
                coin={solana}
                redirectHref="solana"
              />
            </BlurFade>

            <BlurFade delay={0.5} inView>
              <LiquidationTokenCard
                discount="30% OFF"
                tokenName={cryptoPrices[3]["symbol"]}
                price={
                  "$ " + parseFloat(cryptoPrices[3]["priceUsd"]).toFixed(2)
                }
                coin={injective}
                redirectHref="injective"
              />
            </BlurFade>

            <BlurFade delay={0.5} inView>
              <LiquidationTokenCard
                discount="30% OFF"
                tokenName={cryptoPrices[4]["symbol"]}
                price={
                  "$ " + parseFloat(cryptoPrices[4]["priceUsd"]).toFixed(2)
                }
                coin={atom}
                redirectHref="atom"
              />
            </BlurFade>

            <BlurFade delay={0.5} inView>
              <LiquidationTokenCard
                discount="30% OFF"
                tokenName={cryptoPrices[5]["symbol"]}
                price={
                  "$ " + parseFloat(cryptoPrices[5]["priceUsd"]).toFixed(2)
                }
                coin={akt}
                redirectHref="akash"
              />
            </BlurFade>

            <BlurFade delay={0.5} inView>
              <LiquidationTokenCard
                discount="30% OFF"
                tokenName={cryptoPrices[6]["symbol"]}
                price={
                  "$ " + parseFloat(cryptoPrices[6]["priceUsd"]).toFixed(2)
                }
                coin={dydx}
                redirectHref="ethdydx"
              />
            </BlurFade>

            <BlurFade delay={0.5} inView>
              <LiquidationTokenCard
                discount="30% OFF"
                tokenName={cryptoPrices[7]["symbol"]}
                price={
                  "$ " + parseFloat(cryptoPrices[7]["priceUsd"]).toFixed(2)
                }
                coin={neutron}
                redirectHref="neutron"
              />
            </BlurFade>

            <BlurFade delay={0.5} inView>
              <LiquidationTokenCard
                discount="30% OFF"
                tokenName={cryptoPrices[8]["symbol"]}
                price={
                  "$ " + parseFloat(cryptoPrices[8]["priceUsd"]).toFixed(2)
                }
                coin={osmo}
                redirectHref="osmosis"
              />
            </BlurFade>

            <BlurFade delay={0.5} inView>
              <LiquidationTokenCard
                discount="30% OFF"
                tokenName="USDC"
                price="$ 1.00"
                coin={usdc}
                redirectHref="usdc"
              />
            </BlurFade>

            <BlurFade delay={0.5} inView>
              <LiquidationTokenCard
                discount="30% OFF"
                tokenName="TIA"
                price="$ 6.17"
                coin={tia}
                redirectHref="celestia"
              />
            </BlurFade>
          </>
        )}
      </div>
    </>
  );
}

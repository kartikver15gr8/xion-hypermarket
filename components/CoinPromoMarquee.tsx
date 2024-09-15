"use client";
import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import Image, { StaticImageData } from "next/image";
import LiquidationTokenCard from "./LiquidationTokenCard";

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
import Link from "next/link";

const reviews = [
  {
    coin: "NTRN",
    name: "Neutron",
    imgURL: neutron,
    redirectHref: "neutron",
  },
  {
    coin: "ATOM",
    name: "Atom",
    imgURL: atom,
    redirectHref: "atom",
  },
  {
    coin: "OSMO",
    name: "Osmosis",
    imgURL: osmosis,
    redirectHref: "osmosis",
  },
  {
    coin: "SOL",
    name: "Solana",
    imgURL: solana,
    redirectHref: "solana",
  },
  {
    coin: "TIA",
    name: "Celestia",
    imgURL: celestia,
    redirectHref: "celestia",
  },
  {
    coin: "BTC",
    name: "Bitcoin",
    imgURL: bitcoin,
    redirectHref: "bitcoin",
  },
  {
    coin: "INJ",
    name: "Injective",
    imgURL: injective,
    redirectHref: "injective",
  },
  {
    coin: "ETH",
    name: "Ethereum",
    imgURL: ethereum,
    redirectHref: "ethereum",
  },
  {
    coin: "USDC",
    name: "USDC",
    imgURL: usdccoin,
    redirectHref: "usdc",
  },
  {
    coin: "AKT",
    name: "Akash",
    imgURL: akash,
    redirectHref: "akash",
  },
  {
    coin: "DYDX",
    name: "ETHDYDX",
    imgURL: dydx,
    redirectHref: "ethdydx",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  imgUrl,
  name,
  coin,
  redirectHref,
}: // body,
{
  imgUrl: string | StaticImageData;
  name: string;
  coin: string;
  redirectHref: string;
  // body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-40 md:w-56 lg:w-64 cursor-pointer overflow-hidden rounded-md border p-2 ",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className=" flex flex-col items-center gap-2 h-48 md:h-60 xl:h-72 justify-between">
        <div className="absolute z-10 top-1 left-1 sm:top-1 sm:left-2 md:top-2 md:left-3 w-[90px] text-[8px] sm:text-[12px] md:text-[12px] 2xl:text-[14px]">
          <p className=""> Up to:</p>
          <div className="bg-[#263039] w-fit px-1">
            <p className=" font-bold italic text-white">30% OFF</p>
          </div>
        </div>
        <Image
          className="rounded-full ml-2 w-[80%] pt-1 lg:pt-5 z-10 "
          width={500}
          height={500}
          alt=""
          src={imgUrl}
        />
        <div className="flex justify-between w-full">
          <div className="flex flex-col  w-full px-4">
            <figcaption className="text-lg font-bold dark:text-white">
              {coin}
            </figcaption>
            <p className="text-sm font-medium dark:text-white/40">{name}</p>
          </div>
          <Link
            href={`/liquidation/coinpage/${redirectHref}`}
            className="rounded border  text-white font-medium font-teachers  bg-[#435657] hover:bg-[#3180ca] transition-all duration-300 w-[40%] flex items-center justify-center text-[12px] sm:text-[14px] md:text-[14px] xl:text-[16px]"
          >
            <button className="">BID</button>
          </Link>
        </div>
      </div>
      {/* <blockquote className="mt-2 text-sm">{body}</blockquote> */}
    </figure>
  );
};

export function CoinPromoMarquee() {
  return (
    <div className="relative flex h-fit w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-none">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard
            key={review.name}
            {...review}
            imgUrl={review.imgURL}
            redirectHref={review.redirectHref}
          />
        ))}
      </Marquee>

      {/* with side shadows */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background opacity-80 "></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background opacity-80"></div>
    </div>
  );
}

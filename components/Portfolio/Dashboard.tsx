"use client";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

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

const isActive =
  "border-t border-l border-r  border-[#c2c2c7]  gap-x-2 justify-center rounded-t-md w-36 h-10 p-1 flex items-center bg-[#DBDBD9]  ";
const isInActive =
  "border-t border-l border-r  border-[#c2c2c7] gap-x-2 justify-center rounded-t-md w-36 h-10 p-1 flex items-center text-[#8B8B93] bg-[#EFF0EF] ";

//pass props in Dashboard for the values at the time of production
export default function Dashboard() {
  const [isOpen, setIsOpen] = useState("auctionbids");

  return (
    <div className="w-full ">
      <div className="flex gap-x-1 sm:gap-x-2 xl:gap-x-4 ">
        <div
          onClick={() => {
            setIsOpen("auctionbids");
            toast.info("Switched to Auction Bids!");
          }}
          className={isOpen == "auctionbids" ? isActive : isInActive}
        >
          <p>Auction Bids</p>
          <p className="bg-white w-5 h-5 rounded-md flex items-center justify-center text-xs border border-[#c2c2c7]">
            1
          </p>
        </div>
        <div
          onClick={() => {
            setIsOpen("defipositions");
            toast.info("Switched to DeFi Positions!");
          }}
          className={isOpen == "defipositions" ? isActive : isInActive}
        >
          <p>DeFi Positions</p>
          <p className="bg-white w-5 h-5 rounded-md flex items-center justify-center text-xs border border-[#c2c2c7]">
            2
          </p>
        </div>
      </div>
      {isOpen == "auctionbids" ? (
        <OpenBids />
      ) : (
        <DeFiPosition DeFiPositionBal="1600" currentComboAPR="43.61" />
      )}
    </div>
  );
}

const DeFiPosition = ({
  DeFiPositionBal,
  currentComboAPR,
}: {
  DeFiPositionBal: string;
  currentComboAPR: string;
}) => {
  return (
    <div className="rounded-b rounded-r  shadow-lg border border-[#c2c2c7]">
      <div className="flex items-center rounded-tr justify-between px-4 md:px-6 lg:px-8 bg-[#F4F5F7] text-[10px] sm:text-[12px] py-2 text-[#8B8B93] border-b">
        <p>Positions</p>
        <p>DeFi Position Balance</p>
        <p>Current Combined APR</p>
      </div>
      <div className=" rounded-b px-8 flex justify-between items-center bg-white h-20">
        <div className="flex gap-x-4 justify-between   w-full h-[70%] items-center">
          <div className="relative flex w-20">
            <Image
              className="w-8 h-8 sm:w-10 sm:h-10 xl:w-12 xl:h-12"
              src={neutron}
              width={500}
              height={500}
              alt="coin"
            />
            <Image
              className="absolute left-4 md:left-7 w-8 h-8 sm:w-10 sm:h-10 xl:w-12 xl:h-12"
              src={usdccoin}
              width={500}
              height={500}
              alt="coin"
            />
          </div>
          <div className="w-32">
            <p className="font-bold text-lg md:text-xl lg:text-2xl">
              $ {DeFiPositionBal}
            </p>
          </div>
          <div className="bg-[#4E6465] text-white px-2 py-1 text-sm md:text-lg lg:text-xl rounded-[2px]">
            <p>+{currentComboAPR}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const OpenBids = () => {
  return (
    <div className="rounded-b rounded-r border border-[#c2c2c7] shadow-lg">
      <div className="flex items-center rounded-tr justify-between px-4 md:px-6 lg:px-8 bg-[#F4F5F7] text-[10px] sm:text-[12px] py-2 text-[#8B8B93] border-b">
        <p>Open Bids</p>
        <p>Status</p>
        <p>Discount Bid Position</p>
        <p>Bid Amount</p>
        <p>actions</p>
      </div>

      <div className="flex flex-col h-[300px] overflow-y-auto hide-scrollbar scroll-smooth rounded-b  bg-[#fefefd]">
        <AuctionBidList
          BidAmount="3200"
          discountBidPosition="15"
          status="Pending"
          coinImg={solana}
        />
        <AuctionBidList
          BidAmount="300"
          discountBidPosition="15"
          status="Pending"
          coinImg={neutron}
        />
        <AuctionBidList
          BidAmount="200"
          discountBidPosition="15"
          status="Pending"
          coinImg={bitcoin}
        />
        <AuctionBidList
          BidAmount="1000"
          discountBidPosition="15"
          status="Pending"
          coinImg={bitcoin}
        />
        <AuctionBidList
          BidAmount="2300"
          discountBidPosition="15"
          status="Pending"
          coinImg={ethereum}
        />
        <AuctionBidList
          BidAmount="300"
          discountBidPosition="15"
          status="Pending"
          coinImg={atom}
        />
        <AuctionBidList
          BidAmount="300"
          discountBidPosition="15"
          status="Pending"
          coinImg={ethereum}
        />
        <AuctionBidList
          BidAmount="20000"
          discountBidPosition="15"
          status="Pending"
          coinImg={celestia}
        />
        <AuctionBidList
          BidAmount="23000"
          discountBidPosition="15"
          status="Pending"
          coinImg={usdccoin}
        />
      </div>
    </div>
  );
};

const AuctionBidList = ({
  discountBidPosition,
  BidAmount,
  status,
  coinImg,
}: {
  discountBidPosition: string;
  BidAmount: string;
  status: string;
  coinImg: string | StaticImageData;
}) => {
  return (
    <div className="border-b border-[#dddde1] px-4 md:px-6 lg:px-8  h-16 hover:bg-[#eeeeef] transition-all duration-200">
      <div className="grid grid-cols-5 gap-x-4 w-full h-[100%] items-center ">
        <div className="relative flex w-fit pr-4 ">
          <Image
            className="w-8 h-8 sm:w-10 sm:h-10 xl:w-12 xl:h-12"
            src={coinImg}
            width={500}
            height={500}
            alt="coin"
          />
        </div>
        <p className="text-[10px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px]">
          {status}
        </p>
        <div className=" w-fit">
          <p className=" text-white font-medium italic px-1 text-sm md:text-lg rounded-[2px] bg-[#122223]">
            {discountBidPosition}% OFF
          </p>
        </div>

        <div className="px-2 py-1  rounded-[2px]">
          <p className="text-lg md:text-xl lg:text-2xl font-medium">
            ${BidAmount}
          </p>
          <p className="text-xs md:text-sm text-[#8B8B93]">USDC</p>
        </div>
        <Button className="h-6 text-[10px] sm:text-[12px] md:text-[13px] w-fit px-2 rounded-full hover:bg-[#4e6466] transition-all duration-200">
          Withdraw
        </Button>
      </div>
    </div>
  );
};

"use client";

import { allTokens } from "@/lib/coins";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import BorrowUSDCBannerBtn from "./BorrowUSDCBannerBtn";
import graph from "@/public/graph.svg";

import sol from "@/public/_static/icons/solanacoin.png";
import randomstatic from "@/public/randomstatic.png";
import { toast } from "sonner";
import kind from "@/public/kind.svg";
import Link from "next/link";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";

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
import coinbg from "@/public/_static/background/coins.png";

export default function ProductInfoContainer({
  className,
  coinIcon,
  bidCoinName,
  coinSymbol,
}: {
  className: string;
  coinIcon: string | StaticImageData;
  bidCoinName: string;
  coinSymbol: string;
}) {
  const [discount, setDiscount] = useState(5);
  const [bidAmount, setBidAmount] = useState("500");
  const [isOpen, setIsOpen] = useState(false);
  const [biddingCoin, setBiddingCoin] = useState("SOL");
  const [biddingCoinName, setBiddingCoinName] = useState("Solana");
  const [cautionTip, setCautionTip] = useState(false);
  const [sliderVal, setSliderVal] = useState(4);

  const calculateBackground = (value: any) => {
    const percentage = (value / 30) * 100;
    return `linear-gradient(to right, #44698B 0%, #44698B ${percentage}%, #E5E7EB ${percentage}%, #E5E7EB 100%)`;
  };

  // for Arbitrage Window
  // const [coin, setCoin] = useState(bidCoinName);
  // const [coinImg, setCoinImg] = useState(coinIcon);

  // search state
  const [searchTerm, setSearchTerm] = useState("");

  const [isActivateBidEnabled, setIsActivateBidEnabled] = useState(false);
  const [isArbitrageWindowOpen, setIsArbitrageWindowOpen] = useState(false);

  const toggleIsActivateButton = () => {
    if (isActivateBidEnabled == false) {
      setIsActivateBidEnabled(true);
      toast("You may now activate your bid!");
    } else {
      setIsActivateBidEnabled(false);
    }
    console.log(isActivateBidEnabled);
  };

  // const tokens = allTokens;

  // Searching different tokens
  const tokens = allTokens.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.coin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleArbitrageWindowVisibility = () => {
    setIsArbitrageWindowOpen(!isArbitrageWindowOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = parseInt(e.target.value);
    if (isNaN(inputValue)) {
      setDiscount(0);
    } else if (inputValue < 0) {
      setDiscount(0);
    } else if (inputValue > 100) {
      setDiscount(100);
    } else {
      setDiscount(inputValue);
    }
  };
  //w-[500px] sm:w-[450px] md:w-[450px] lg:w-[450px] xl:w-[450px] 2xl:w-[450px]
  return (
    <div
      className={`relative mt-5 sm:mt-5 md:mt-2 lg:mt-0 xl:mt-0 2xl:mt-0 ${className}`}
    >
      {isArbitrageWindowOpen && (
        <ArbitrageWindow
          coinName={bidCoinName}
          coinImage={coinIcon}
          discount={discount}
          profit={(Number(bidAmount) * Number(discount)) / 100}
          amount={Number(bidAmount)}
          windowVisible={isArbitrageWindowOpen}
          setWindowVisibility={setIsArbitrageWindowOpen}
        />
      )}
      <BorrowUSDCBannerBtn />
      <div
        // onClick={toggleDropdown}
        className="w-full pl-2 border h-20 flex flex-col justify-center hover:border hover:border-black hover:rounded-md transition-all duration-200 bg-[#F7F7F5] rounded-sm "
      >
        <div className="flex items-center gap-x-2">
          <p className="font-bold text-sm sm:text-sm md:text-lg lg:text-lg xl:text-[21px] 2xl:text-xl">
            {bidCoinName.toUpperCase()}
          </p>
          <div
            onClick={toggleDropdown}
            className="border border-slate-400 p-[2px] bg-[#F3F2EF] rounded-[3px] aspect-square flex items-center hover:bg-white transition-all duration-300"
          >
            <svg
              className="w-3 "
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.9485 5.09128L12.0398 1.27144e-07L13.4941 1.45436L6.9485 8L0.402856 1.45436L1.85721 1.01733e-06L6.9485 5.09128Z"
                fill="#4B4B54"
              />
            </svg>
          </div>
        </div>
        <p className="text-[10px] md:text-[12px]">
          The secure permission-less smart contract
        </p>
        <p className="text-[10px] md:text-[12px]">platform of the interchain</p>
        {/* <div className="flex justify-between items-center gap-x-2">
        <div className="">
          <p className="font-bold text-sm sm:text-sm md:text-lg lg:text-lg xl:text-xl 2xl:text-xl">
            {biddingCoin}
          </p>
          <p className="text-[10px]">
            The secure permission-less smart contract
          </p>
          <p className="text-[10px]">platform of the interchain</p>
        </div>
        <div className="border mr-6 border-slate-400 p-[2px] bg-[#F3F2EF] rounded-[3px] aspect-square flex items-center hover:bg-white transition-all duration-300">
          <svg
            className="w-3 "
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.9485 5.09128L12.0398 1.27144e-07L13.4941 1.45436L6.9485 8L0.402856 1.45436L1.85721 1.01733e-06L6.9485 5.09128Z"
              fill="#4B4B54"
            />
          </svg>
        </div>
      </div> */}
      </div>
      {isOpen && (
        <div>
          {/* <DropDownSearch
          dropDown={isOpen}
          setDropdown={setIsOpen}
          setSearch={setSearchTerm}
        /> */}
          <div className="absolute p-1 left-0 w-full backdrop-blur-lg bg-[rgba(0,0,0,0.05)] border border-gray-300 shadow-md z-20 overflow-y-auto hide-scrollbar h-[300px] rounded-md">
            {/* <DropDownSearch /> */}
            {/* <div className="h-14"></div> */}
            {tokens.map((elem, key) => {
              return (
                <CoinOptions
                  // setBidCoin={setBiddingCoin}
                  // setBidCoinName={setBiddingCoinName}
                  dropDown={isOpen}
                  setDropdown={setIsOpen}
                  key={key}
                  coinName={elem.name}
                  coin={elem.coin}
                  imgURI={elem.imgURL}
                />
              );
            })}
          </div>
        </div>
      )}

      <div className="w-full h-[100px] rounded  my-[8px] flex justify-between hover:border hover:border-black hover:rounded-md transition-all duration-200">
        <div className="bg-[#F7F7F5] border rounded-l w-[65%] flex flex-col relative pl-2 justify-center">
          <p className=" font-bold text-sm sm:text-sm md:text-lg lg:text-[15px] xl:text-[20px] 2xl:text-lg italic">
            KEEP IN MIND
          </p>
          <p className="text-[12px] sm:text-[12px] md:text-[14px] lg:text-[12px] xl:text-[14px] 2xl:text-[14px]">
            Bidders with lower discounts
          </p>
          <p className="text-[12px] sm:text-[12px] md:text-[14px] lg:text-[12px] xl:text-[14px] 2xl:text-[14px]">
            have Priority!
          </p>
          <Image
            className="absolute z-10  bottom-0 right-3 w-[90px]"
            src={kind}
            width={100}
            height={100}
            alt="coin"
          />
        </div>
        <div className="bg-[#F7F7F5] border flex flex-col ml-1 w-[34%] rounded-r relative">
          <div className="w-full flex justify-center items-center py-1 absolute top-5 xl:top-2 2xl:top-5 gap-x-2 lg:gap-x-1">
            <Image
              className="w-7 md:w-10 lg:w-7 xl:w-8 2xl:w-7 mr-1 rounded-full"
              src={coinIcon}
              width={100}
              height={100}
              alt="coin"
            />
            <div className="flex flex-col">
              <p className="text-[18px] sm:text-[19px] md:text-[22px] lg:text-[18px] xl:text-[24px] 2xl:text-lg font-bold">
                {coinSymbol}
              </p>
              <div className="flex text-[14px] sm:text-[15px] md:text-[16px] lg:text-[14px] xl:text-[20px] font-medium text-slate-500">
                <p>$0.5212</p>
              </div>
            </div>
          </div>
          <div className="w-full absolute bottom-0 justify-center items-center ">
            <Image
              className=""
              src={graph}
              width={400}
              height={100}
              alt="graph"
            />
          </div>
        </div>
      </div>

      <div className="w-full h-[100px] flex flex-col justify-center my-[2px] ">
        <div className="flex gap-x-2 items-center">
          <p className="text-[10px] sm:text-[10px] md:text-[12px] lg:text-[12px] xl:text-[12px] 2xl:text-[12px] my-[4px]">
            PLACE YOUR BID
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4"
            viewBox="0 0 24 24"
            onMouseEnter={() => setCautionTip(true)}
            onMouseLeave={() => setCautionTip(false)}
          >
            <path
              fill="black"
              d="M12 22c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464C22 4.93 22 7.286 22 12s0 7.071-1.465 8.535C19.072 22 16.714 22 12 22"
              opacity="0.5"
            />
            <path
              fill="white"
              d="M12 17.75a.75.75 0 0 0 .75-.75v-6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75M12 7a1 1 0 1 1 0 2a1 1 0 0 1 0-2"
            />
          </svg>
          {cautionTip && (
            <div className="absolute left-[120px] px-2 py-1 bg-[#e9ecec] text-slate-700 text-sm rounded-md whitespace-nowrap border border-[#bac3c4] shadow-lg font-medium">
              CHECK BID GRAPH
            </div>
          )}
        </div>

        <div className="h-[60px] rounded relative items-center border-[#DFDFDD] border flex px-2">
          <Image
            src={randomstatic}
            alt="Background"
            objectFit="fill"
            className="opacity-[20%] "
            layout="fill"
          />
          <div className="relative z-10 flex w-full  items-center justify-between">
            <p className="font-bold">BID</p>
            <div className="flex items-center mr-4">
              <div className="flex gap-x-1 mx-4 items-center">
                {/* <p className="font-bold">500</p> */}
                <input
                  className="w-24 bg-white p-1 px-2 font-bold focus:outline-none border"
                  type="number"
                  placeholder="Bid Amt"
                  value={bidAmount}
                  onChange={(e) => {
                    setBidAmount(e.target.value);
                  }}
                />
                <p className="font-bold ml-1 mr-2 text-slate-400">USDC</p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-[12px] gap-x-1 flex my-[4px]">
          <p>Available on USDC: </p>
          <p className="font-bold">2000 USDC</p>
        </div>
      </div>

      {/* New Slider for Discount */}

      <div className="w-full h-[100px] flex flex-col justify-center mt-[2px] mb-[4px] ">
        <div className="flex justify-between items-center">
          <p className="text-[10px] sm:text-[10px] md:text-[12px] lg:text-[12px] xl:text-[12px] 2xl:text-[12px] my-[4px]">
            DISCOUNT
          </p>
          <p className="mr-1 font-bold">{sliderVal}%</p>
        </div>

        {/* slider */}
        <div className="flex rounded bg-[#FAFAFA] justify-between gap-x-2 h-20 items-center border border-[#DFDFDD] px-2 py-4">
          <p className="font-medium text-xs text-[#8B8B93]">0%</p>
          {/* <Slider defaultValue={[4]} max={30} step={1} /> */}
          <div className="relative w-full group flex items-center ">
            <style jsx>{`
              input[type="range"]::-webkit-slider-thumb {
                @apply appearance-none w-4 h-4 bg-[#304b63] rounded-full cursor-pointer;
              }
              input[type="range"]::-moz-range-thumb {
                @apply w-4 h-4 bg-[#304b63] rounded-full cursor-pointer border-none;
              }
            `}</style>

            <input
              className="w-full h-2 bg-gray-200 rounded-full outline-none appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#304b63] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#304b63] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none"
              type="range"
              value={sliderVal}
              max={30}
              min={0}
              onChange={(e) => {
                setSliderVal(Number(e.target.value));
                setDiscount(Number(e.target.value));
              }}
              style={{ background: calculateBackground(sliderVal) }}
            />
            {/* <input
              className="w-full"
              type="range"
              value={sliderVal}
              max={30}
              min={0}
              onChange={(e) => {
                setSliderVal(Number(e.target.value));
                setDiscount(Number(e.target.value));
              }}
            /> */}
            <span
              className="absolute -top-2 left-0 transform -translate-y-full -translate-x-1/2 w-7 h-5 flex items-center justify-center  pointer-events-none opacity-0 transition-opacity group-hover:opacity-100 bg-[#e9ecec] text-[#44698B] text-sm rounded-sm whitespace-nowrap border border-[#44698B] shadow-lg font-medium"
              style={{ left: `${(sliderVal / 30) * 100}%` }}
            >
              {sliderVal}
            </span>
          </div>
          <p className="font-medium text-xs text-[#8B8B93]">30%</p>
        </div>

        <div className="text-[12px] gap-x-1 flex my-[4px]">
          <p>You will save: </p>
          <p className="font-bold">
            {(Number(bidAmount) * Number(sliderVal)) / 100} USDC
          </p>
        </div>
      </div>
      <div className="w-full">
        <div className="flex h-14">
          <Button
            onClick={toggleIsActivateButton}
            className="w-[50%] relative z-10 font-medium bg-black hover:bg-[#223d40] h-full text-white mr-1 flex justify-center items-center rounded-sm hover:shadow-lg transition-all duration-300"
          >
            Make Bid
          </Button>
          {isActivateBidEnabled == true && (
            <Button
              onClick={toggleArbitrageWindowVisibility}
              className="w-[50%] bg-[#3e607e] font-medium h-full ml-1 flex justify-center items-center rounded-sm hover:shadow-lg transition-shadow duration-300"
            >
              Activate Bid
            </Button>
          )}
          {isActivateBidEnabled == false && (
            <Button
              disabled
              className="w-[50%] bg-[#3c5557] font-medium h-full ml-1 flex justify-center items-center rounded-sm hover:shadow-lg transition-shadow duration-300"
            >
              Activate Bid
            </Button>
          )}
        </div>
        <div className="flex items-center  py-2 gap-x-2 ">
          <svg
            className="w-2 sm:w-2 md:w-2 lg:w-2 xl:w-3 2xl:w-3"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="black"
              d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2"
            />
          </svg>
          <p className="text-xs ">
            NOTE: withdrawal of a successful bid will include a 0.5% fee. All
            fees are paid to SENDIT stakers.
          </p>
        </div>
      </div>
    </div>
  );
}

// Searchbox of the Dropdown menu

const DropDownSearch = ({
  dropDown,
  setDropdown,
  setSearch,
}: {
  dropDown: boolean;
  setDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="p-2 h-14 px-4 my-1 flex justify-between items-center cursor-pointer bg-slate-50  text-sm sm:text-sm md:text-lg lg:text-lg xl:text-lg 2xl:text-xl border-2 border-slate-400 rounded-md shadow-lg text-slate-500">
      <div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 19L14.65 14.65M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z"
            stroke="#050505"
            strokeOpacity="0.4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <input
        className="mx-2 bg-inherit p-2 w-[70%] mr-10 outline-none"
        placeholder="Search"
        type="text"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <div
        onClick={() => {
          setDropdown(!dropDown);
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.33341 1.66699L1.66675 8.33366M1.66675 1.66699L8.33341 8.33366"
            stroke="#050505"
            strokeOpacity="0.4"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

// This component gets rendered in the dropdown menu.
const CoinOptions = ({
  // setBidCoin,
  // setBidCoinName,
  setDropdown,
  dropDown,
  coin,
  coinName,
  imgURI,
}: {
  // setBidCoin: React.Dispatch<React.SetStateAction<string>>;
  // setBidCoinName: React.Dispatch<React.SetStateAction<string>>;
  setDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  dropDown: boolean;
  coin: string;
  coinName: string;
  imgURI: string | StaticImageData;
}) => {
  return (
    <Link
      href={`/liquidation/coinpage/${coinName.toLowerCase()}`}
      // onClick={() => {
      //   // setBidCoin(coin);
      //   // setBidCoinName(coinName);
      //   setDropdown(!dropDown);
      //   console.log(bidCoin);
      // }}
      className="p-2 h-16 pr-40
   flex justify-between items-center hover:bg-gray-100 cursor-pointer font-bold text-sm sm:text-sm md:text-lg lg:text-lg xl:text-lg 2xl:text-xl hover:border hover:border-slate-300 hover:rounded-md transition-all duration-150"
    >
      <div className="flex items-center ">
        <Image
          className="w-8 mr-8"
          src={imgURI}
          width={40}
          height={40}
          alt="coin"
        />
        <p className="w-20 mr-4">{coin}</p>
      </div>

      <div className="mr-4 font-normal flex items-center justify-left w-32 ">
        <svg
          className="w-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fill="#666666"
            d="M12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709"
          />
        </svg>
        <p className="ml-4">{coinName}</p>
      </div>
    </Link>
  );
};

const ArbitrageWindow = ({
  coinName,
  coinImage,
  amount,
  discount,
  profit,
  windowVisible,
  setWindowVisibility,
}: {
  coinName: string;
  coinImage: string | StaticImageData;
  amount: number;
  discount: number;
  profit: number;
  windowVisible: boolean;
  setWindowVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const toggleWindowVisibility = () => {
    setWindowVisibility(!windowVisible);
  };
  return (
    <div className="absolute flex items-center justify-center bg-[#F8F8F7] border rounded shadow-xl w-[100%] h-[100%] z-30 ">
      {/* <Image
        src={coinbg}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-[30%]"
      /> */}
      <div
        onClick={toggleWindowVisibility}
        className="absolute top-1 right-1 border p-[2px] rounded-sm bg-[#DDDFE0] hover:bg-[#aaacad] transition-all duration-300"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 1L1 11M1 1L11 11"
            stroke="#050505"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="border p-2 lg:p-3 w-96 rounded-lg shadow-2xl bg-white z-50">
        <div className=" flex flex-col items-center text-2xl font-medium">
          <p>Would you like to</p>
          <p>Arbitrage your position?</p>
        </div>
        <div className="border rounded shadow-[inset_15px_16px_20px_rgba(0,0,0,0.03)] lg:py-4 my-8 flex py-2 px-2 w-full">
          <div className="flex  gap-x-3 w-[50%]">
            <Image className="w-16 h-16 " src={coinImage} alt="coin" />
            <div className="flex justify-center flex-col">
              <p className="font-bold">{coinName.toUpperCase()}</p>
              <p className="text-xs">{coinName.toUpperCase()}</p>
            </div>
          </div>
          <div className=" items-center w-[50%] px-4 flex gap-x-1">
            <p className="">$49400</p>
            <p className="text-green-600">(+2.32)</p>
          </div>
        </div>
        <div className=" my-4 px-1">
          <div className="flex justify-between px-2 py-1">
            <div className="flex gap-x-2 items-center">
              <svg
                width="16"
                height="15"
                viewBox="0 0 16 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.00004 10.3333C8.00004 12.1743 9.49243 13.6667 11.3334 13.6667C13.1743 13.6667 14.6667 12.1743 14.6667 10.3333C14.6667 8.49238 13.1743 7 11.3334 7C9.49243 7 8.00004 8.49238 8.00004 10.3333ZM8.00004 10.3333C8.00004 9.58278 8.2481 8.89017 8.66671 8.33301V2.33333M8.00004 10.3333C8.00004 10.8836 8.13336 11.4027 8.36946 11.8601C7.80782 12.3345 6.5106 12.6667 5.00004 12.6667C2.975 12.6667 1.33337 12.0697 1.33337 11.3333V2.33333M8.66671 2.33333C8.66671 3.06971 7.02508 3.66667 5.00004 3.66667C2.975 3.66667 1.33337 3.06971 1.33337 2.33333M8.66671 2.33333C8.66671 1.59695 7.02508 1 5.00004 1C2.975 1 1.33337 1.59695 1.33337 2.33333M1.33337 8.33333C1.33337 9.06971 2.975 9.66667 5.00004 9.66667C6.45938 9.66667 7.71959 9.35665 8.3098 8.90785M8.66671 5.33333C8.66671 6.06971 7.02508 6.66667 5.00004 6.66667C2.975 6.66667 1.33337 6.06971 1.33337 5.33333"
                  stroke="#8B8B92"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-[#8B8B93]">Bid Amount:</p>
            </div>
            <p className="font-medium">${amount}</p>
          </div>
          <div className="flex justify-between px-2 py-1">
            <div className="flex gap-x-2 items-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.00065 6.00065H6.00732M10.0007 10.0007H10.0073M10.6673 5.33398L5.33398 10.6673M14.6673 8.00065C14.6673 11.6825 11.6825 14.6673 8.00065 14.6673C4.31875 14.6673 1.33398 11.6825 1.33398 8.00065C1.33398 4.31875 4.31875 1.33398 8.00065 1.33398C11.6825 1.33398 14.6673 4.31875 14.6673 8.00065ZM6.33398 6.00065C6.33398 6.18475 6.18475 6.33398 6.00065 6.33398C5.81656 6.33398 5.66732 6.18475 5.66732 6.00065C5.66732 5.81656 5.81656 5.66732 6.00065 5.66732C6.18475 5.66732 6.33398 5.81656 6.33398 6.00065ZM10.334 10.0007C10.334 10.1847 10.1847 10.334 10.0007 10.334C9.81656 10.334 9.66732 10.1847 9.66732 10.0007C9.66732 9.81656 9.81656 9.66732 10.0007 9.66732C10.1847 9.66732 10.334 9.81656 10.334 10.0007Z"
                  stroke="#8B8B92"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-[#8B8B93]">Discount:</p>
            </div>
            <p className="font-medium">{discount}%</p>
          </div>
          <div className="flex justify-between px-2 py-1">
            <div className="flex gap-x-2 items-center">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 13H2.06667C1.6933 13 1.50661 13 1.36401 12.9273C1.23856 12.8634 1.13658 12.7614 1.07266 12.636C1 12.4934 1 12.3067 1 11.9333V1M12.3333 4.33333L9.72075 7.12177C9.62174 7.22745 9.57224 7.28029 9.51251 7.3076C9.4598 7.3317 9.40171 7.34164 9.34398 7.33644C9.27857 7.33055 9.21431 7.29718 9.08579 7.23045L6.91421 6.10288C6.78569 6.03615 6.72143 6.00278 6.65602 5.99689C6.59829 5.99169 6.54021 6.00163 6.48749 6.02574C6.42777 6.05305 6.37826 6.10589 6.27925 6.21156L3.66667 9"
                  stroke="#8B8B92"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-[#8B8B93]">Total Profit:</p>
            </div>
            <p className="font-medium">${profit}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-2 ">
          <Button onClick={toggleWindowVisibility} className="">
            Yes
          </Button>
          <Button onClick={toggleWindowVisibility} className="">
            No
          </Button>
        </div>
      </div>
    </div>
  );
};

{
  /* <div className="w-full h-[100px] flex flex-col justify-center my-[2px] ">
        <p className="text-[10px] sm:text-[10px] md:text-[12px] lg:text-[12px] xl:text-[12px] 2xl:text-[12px] my-[4px]">
          CHOOSE YOUR DISCOUNT
        </p>
        <div className="h-[60px] relative items-center border-slate-400 border flex px-2">
          <Image
            src={randomstatic}
            alt="Background"
            objectFit="fill"
            className="opacity-[20%] "
            layout="fill"
          />
          <div className="relative z-10 flex w-full  items-center justify-between">
            <p className="font-bold">DISCOUNT</p>
            <div className="flex items-center mr-4">
              <div className="flex relative gap-x-1 mx-2 bg-white w-24 items-center border">
                {/* <p className="font-bold">{discount}%</p> */
}
//         <input
//           type="number"
//           placeholder=""
//           className="h-8 w-full font-bold px-2 outline-none "
//           onChange={handleInputChange}
//           value={discount}
//           min={0}
//           max={100}
//         />
//         <div className="font-bold flex absolute bg-white right-1">
//           <p className="text-black font-bold mr-1">%</p>
//           <p className="text-slate-400 font-bold">OFF</p>
//         </div>
//       </div>
//       <div className="flex gap-x-2 text-2xl">
//         <button
//           onClick={() => {
//             if (discount == 0) {
//               setDiscount(discount);
//             } else if (discount > 0) {
//               setDiscount(discount - 1);
//             }
//           }}
//           className="w-8 h-8 relative text-white justify-center items-center flex  hover:bg-slate-600 transition-all duration-300 rounded-sm  "
//         >
//           <div className="absolute inset-0 bg-[url('https://s3-alpha-sig.figma.com/img/8ea6/e432/6e6564e66f68b7295f71eac4bf133b3b?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EAltG6ZOq3hR8Pyy0NQANZBJq~dDkETRFggK1v-eULrMH9xS9WHIk5AvwrWmree9H8A2bA3IhN2w-gjww8k2HWhVZc9Jivt3HulR3w~aIkVuUPFuXCTpeGhX7Ia3jyKXI2E8TRee8Wtuk5IitIo1053~DMxTMtD0OqMXJb2biowxTYrUGTrfEOvtQGXyro-jDBkFW0EAv-3go02lD5HLoKEjSUrbim-XwurnXupz9~r4m~IfOLPH1DwRcmMfzhpaV9QV03NfkMqUI2BodXgjTgeL3bsoFEBF1MH~2NNaiuNwdz5OCSLR4O-LIG7pZuZ2cxFPse0UHZE9H5mD4paHNg__')] bg-cover bg-black  rounded-sm mix-blend-multiply "></div>
//           <svg
//             className="z-10"
//             width="14"
//             height="2"
//             viewBox="0 0 14 2"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M1.1665 1H12.8332"
//               stroke="white"
//               strokeWidth="1.6"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         </button>
//         <button
//           onClick={() => {
//             if (discount == 100) {
//               setDiscount(discount);
//             } else if (discount >= 0) {
//               setDiscount(discount + 1);
//             }
//           }}
//           className="w-8 h-8 relative text-white justify-center items-center flex  hover:bg-slate-600 transition-all duration-300 rounded-sm"
//         >
//           <div className="absolute inset-0 bg-[url('https://s3-alpha-sig.figma.com/img/8ea6/e432/6e6564e66f68b7295f71eac4bf133b3b?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EAltG6ZOq3hR8Pyy0NQANZBJq~dDkETRFggK1v-eULrMH9xS9WHIk5AvwrWmree9H8A2bA3IhN2w-gjww8k2HWhVZc9Jivt3HulR3w~aIkVuUPFuXCTpeGhX7Ia3jyKXI2E8TRee8Wtuk5IitIo1053~DMxTMtD0OqMXJb2biowxTYrUGTrfEOvtQGXyro-jDBkFW0EAv-3go02lD5HLoKEjSUrbim-XwurnXupz9~r4m~IfOLPH1DwRcmMfzhpaV9QV03NfkMqUI2BodXgjTgeL3bsoFEBF1MH~2NNaiuNwdz5OCSLR4O-LIG7pZuZ2cxFPse0UHZE9H5mD4paHNg__')] bg-cover   rounded-sm mix-blend-multiply bg-black"></div>
//           <svg
//             className="z-10"
//             width="14"
//             height="14"
//             viewBox="0 0 14 14"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M6.99984 1.16663V12.8333M1.1665 6.99996H12.8332"
//               stroke="white"
//               strokeWidth="1.6"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         </button>
//       </div>
//     </div>
//   </div>
// </div>
//   <p className="text-[12px] my-[4px]">Bottom label</p>
// </div> */}

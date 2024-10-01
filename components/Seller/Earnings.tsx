"use client";
import Image, { StaticImageData } from "next/image";
import hex from "@/public/hex.svg";
import randomstatic from "@/public/randomstatic.png";
import circlemedal from "@/public/circlemedal.svg";
import logodesign from "@/public/marqueeicons/logodesign.png";
import Link from "next/link";
import { useState } from "react";
import usdccoin from "@/public/_static/coinIcons/usdc.png";
import { SalesLabel } from "../SellerDashboard";
import { toast } from "sonner";
import cartIcon from "@/public/svgIcons/cart.svg";
import eyeIcon from "@/public/svgIcons/eye.svg";
import questionmark from "@/public/svgIcons/questionmark.svg";
import { Button } from "../ui/button";
import optionsSvg from "@/public/svgIcons/options.svg";

export default function Earnings() {
  return (
    <div className="w-[100%] pb-10 relative overflow-y-auto hide-scrollbar h-[90vh] scroll-smooth">
      <EarningsTopLabel />
      <div className="px-[20px] sm:px-[20px] md:px-[40px] lg:px-[60px] xl:px-20 pt-8">
        <div className="grid grid-cols-2 gap-x-2 md:gap-x-4 lg:gap-x-8   h-96">
          <div className="border rounded-xl grid grid-cols-1">
            <TopCompLabel
              className="p-2 md:p-4 border-b"
              title="AVAILABLE BALANCE"
              amount="200"
            />
            <TopCompLabel
              className="p-2 md:p-4 border-b"
              title="PENDING EARNINGS"
              amount="0.00"
            />
            <TopCompLabel
              className="p-2 md:p-4"
              title="TOTAL EARNINGS"
              amount="25,100"
            />
          </div>
          <WithdrawCard />
        </div>
        <WithdrawComp />
        <EarningOverview />
      </div>
    </div>
  );
}

const EarningOverview = () => {
  return (
    <div className="rounded-xl border bg-white h-64 mt-8 p-4">
      <div className="flex justify-between">
        <p className="font-medium text-[16px]">EARNINGS OVERVIEW</p>
        <div className="flex items-center w-40 justify-between">
          <div className="w-6 h-6 flex items-center justify-center rounded-sm p-1  hover:bg-[#e4e4e6] transition-all duration-300">
            <svg
              className=""
              width="6"
              height="11"
              viewBox="0 0 6 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.25 0.979736L0.75 5.47974L5.25 9.97974"
                stroke="#4B4B54"
                strokeWidth="1.35"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p>Last 6 Months</p>
          <div className="w-6 h-6 flex items-center justify-center rounded-sm p-1 hover:bg-[#e4e4e6] transition-all duration-300">
            <svg
              className=" rotate-180"
              width="6"
              height="11"
              viewBox="0 0 6 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.25 0.979736L0.75 5.47974L5.25 9.97974"
                stroke="#4B4B54"
                strokeWidth="1.35"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12  mt-2 h-48 gap-x-2">
        <div className="col-span-1 grid grid-rows-6 h-40 mt-8 justify-end text-[#8B8B92]">
          <p>Jan</p>
          <p>Feb</p>
          <p>Mar</p>
          <p>Apr</p>
          <p>May</p>
          <p>Jun</p>
        </div>
        <div className="col-span-11 grid grid-cols-10">
          <WeekChartCol week="Week 1" earningExtent={1} />
          <WeekChartCol week="Week 2" earningExtent={1} />
          <WeekChartCol week="Week 3" earningExtent={1} />
          <WeekChartCol week="Week 4" earningExtent={1} />
          <WeekChartCol week="Week 5" earningExtent={1} />
        </div>
      </div>
    </div>
  );
};

const WeekChartCol = ({
  week,
  earningExtent,
}: {
  week: string;
  earningExtent?: number;
}) => {
  return (
    <div className="col-span-2">
      <p>{week}</p>
      <div className="grid grid-rows-6 h-40 mt-2">
        <div className="border border-white bg-[#1F3839] row-span-1"></div>
        <div className="border  border-white bg-[#4E6465] row-span-1"></div>
        <div className="border  border-white bg-[#C8CED0] row-span-1"></div>
        <div className="border  border-white bg-[#D9D9D9] row-span-1"></div>
        <div className="border  border-white bg-[#1F3839] row-span-1"></div>
        <div className="border  border-white bg-[#D9D9D9] row-span-1"></div>
      </div>
    </div>
  );
};

const WithdrawComp = () => {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <p className="text-lg font-xl">Withdrawls</p>
        <div className="w-24 h-10 border rounded-lg flex items-center justify-center gap-x-2">
          <p>Filter</p>
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="#8B8B92"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div>
        <div className="px-2 mb-1 grid grid-cols-10 items-center mt-3 w-full h-7 rounded-lg shadow-[inset_0px_2px_10px_rgba(0,0,0,0.04)] bg-[#F7F7F7]">
          <p className="text-[11px] md:text-[13px] col-span-1">Date</p>
          <p className="text-[11px] md:text-[13px] col-span-3">Amount</p>
          <p className="text-[11px] md:text-[13px] col-span-2">Method</p>
          <p className="text-[11px] md:text-[13px] col-span-1">Status</p>
          <p className="text-[11px] md:text-[13px] col-span-3">
            Transaction ID
          </p>
        </div>
        <div className="relative overflow-y-auto hide-scrollbar scroll-smooth h-40">
          <WithdrawlsLabel
            date="10/10/24"
            amount="$450"
            method="Crypto Wallet"
            status="Confirmed"
            tnxId="TX12345789"
          />
          <WithdrawlsLabel
            date="10/10/24"
            amount="$450"
            method="Crypto Wallet"
            status="Confirmed"
            tnxId="TX12345789"
          />
          <WithdrawlsLabel
            date="10/10/24"
            amount="$450"
            method="Crypto Wallet"
            status="Confirmed"
            tnxId="TX12345789"
          />
          <WithdrawlsLabel
            date="10/10/24"
            amount="$450"
            method="Crypto Wallet"
            status="Pending"
            tnxId="TX12345789"
          />
          <WithdrawlsLabel
            date="10/10/24"
            amount="$450"
            method="Crypto Wallet"
            status="Pending"
            tnxId="TX12345789"
          />
          <WithdrawlsLabel
            date="10/10/24"
            amount="$450"
            method="Crypto Wallet"
            status="Confirmed"
            tnxId="TX12345789"
          />
          <WithdrawlsLabel
            date="10/10/24"
            amount="$450"
            method="Crypto Wallet"
            status="Confirmed"
            tnxId="TX12345789"
          />
          <WithdrawlsLabel
            date="10/10/24"
            amount="$450"
            method="Crypto Wallet"
            status="Confirmed"
            tnxId="TX12345789"
          />
        </div>
      </div>
    </div>
  );
};

export const WithdrawlsLabel = ({
  date,
  amount,
  method,
  status,
  tnxId,
}: {
  date: string;
  amount: string;
  method: string;
  status: string;
  tnxId: string;
}) => {
  return (
    <div className="border-b px-2 grid grid-cols-10 items-center w-full h-10">
      <p className="text-[11px] md:text-[13px] col-span-1">{date}</p>
      <p className="text-[11px] md:text-[13px] col-span-3">{amount}</p>
      <p className="text-[11px] md:text-[13px] col-span-2">{method}</p>
      {status == "Confirmed" ? (
        <p className="text-[11px] md:text-[13px] col-span-1 border border-[#9DFDB0] text-[#007230] w-fit px-1 rounded-sm bg-[#DFFFE4]">
          {status}
        </p>
      ) : (
        <p className="text-[11px] md:text-[13px] col-span-1 border border-[#FFD3CF] text-[#9B0015] w-fit px-1 rounded-sm bg-[#FFF3F1]">
          {status}
        </p>
      )}

      <div className="text-[11px] md:text-[13px] col-span-3 flex items-center justify-between ">
        <p className="w-fit ">{tnxId}</p>
        <Image className="w-10 h-10" src={optionsSvg} alt="Options" />
      </div>
    </div>
  );
};

const WithdrawCard = () => {
  return (
    <div className="border rounded-xl p-4">
      <p className="text-xs md:text-[13px]">WITHDRAW</p>
      <div className="flex items-center justify-between border-b h-16 border-dashed border-[#c2c0c0]">
        <p className="text-[11px] md:text-[13px]">
          Which crypto asset would you like to withdraw?
        </p>
        <div className="flex items-center gap-x-1 px-2 h-9 border rounded-md">
          <Image
            className="md:w-5 w-3 h-3 md:h-5"
            src={usdccoin}
            alt="USDC"
            width={100}
            height={100}
          />
          <p className="text-[11px] md:text-[13px] lg:text-lg">49 USDC</p>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-[11px] md:text-[13px] mb-2">Select Your Wallet</p>
        <div className="h-8 md:h-10 border rounded-lg flex items-center pl-3">
          <input
            className="h-full w-full outline-none rounded-r-lg text-[11px] md:text-[13px]"
            type="text"
            placeholder="senditvru...6nnp"
          />
          <svg
            className="mr-3 w-4"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.4993 1.14636L12.8327 3.4797M1.16602 12.813L1.91058 10.0829C1.95916 9.90484 1.98345 9.81578 2.02073 9.73273C2.05384 9.65899 2.09452 9.58889 2.14212 9.52357C2.19572 9.44999 2.261 9.38471 2.39154 9.25417L8.41937 3.22635C8.53487 3.11084 8.59262 3.05309 8.65922 3.03145C8.7178 3.01242 8.7809 3.01242 8.83948 3.03145C8.90608 3.05309 8.96383 3.11084 9.07933 3.22635L10.7527 4.89971C10.8682 5.01522 10.926 5.07297 10.9476 5.13957C10.9666 5.19815 10.9666 5.26125 10.9476 5.31983C10.926 5.38642 10.8682 5.44417 10.7527 5.55968L4.72488 11.5875C4.59433 11.718 4.52906 11.7833 4.45548 11.8369C4.39015 11.8845 4.32005 11.9252 4.24632 11.9583C4.16327 11.9956 4.07421 12.0199 3.8961 12.0685L1.16602 12.813Z"
              stroke="#8B8B92"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="mt-2">
        <p className="font-medium text-[11px] md:text-[13px]">Enter Amount</p>
        <div className="flex flex-col justify-between rounded-lg border bg-white h-20 p-2">
          <div className=" flex justify-between">
            <div className="flex items-center gap-x-1 w-fit">
              <input
                type="text"
                placeholder="20 USDC"
                className="w-20 outline-none  font-bold text-[11px] md:text-[13px] lg:text-lg"
              />
              {/* <p className="font-bold text-lg">USDC</p> */}
            </div>
            <Button className="h-6 md:h-8 text-[11px] md:text-[13px]">
              Max
            </Button>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-1">
              <p className="text-[11px] md:text-lg">≃</p>
              <p className="text-[12px] md:text-[14px]">$20</p>
            </div>
            <div className="flex items-center gap-x-1 text-[12px] md:text-[14px]">
              <p>Balance: </p>
              <p>20</p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-white h-12 md:text-14 mt-4 rounded-lg bg-[#4E6465] hover:bg-[#607779] transition-all duration-300 flex items-center justify-center gap-x-2">
        <p className="text-[12px] md:text-[14px] lg:text-lg">Withdraw</p>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.33203 5.9799H10.6654M10.6654 5.9799L5.9987 1.31323M10.6654 5.9799L5.9987 10.6466"
            stroke="#FEFEFD"
            strokeWidth="1.28"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

const TopCompLabel = ({
  title,
  amount,
  className,
}: {
  title: string;
  amount: string;
  className: string;
}) => {
  return (
    <div className={`${className}`}>
      <div className="flex items-center gap-x-1">
        <p className="text-xs md:text-[13px]">{title}</p>
        <Image className="" src={questionmark} alt="" />
      </div>
      <div className="flex items-center mt-2">
        <p className="text-md sm:text-lg md:text-xl font-medium">$</p>
        <p className="text-xl md:text-3xl lg:text-4xl font-medium">{amount}</p>
      </div>
    </div>
  );
};

const EarningsTopLabel = () => {
  return (
    <div className="relative border-b w-[100%] px-[20px] sm:px-[20px] md:px-[40px] lg:px-[60px] xl:px-20">
      <Image
        src={randomstatic}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-[4%]"
      />
      <div className="h-20 grid grid-cols-2">
        <div className=" h-full flex items-center">
          <p className="text-sm lg:text-lg font-medium">Earnings</p>
        </div>
        <div className=" h-full flex items-center gap-x-2">
          <div className="relative  flex items-center justify-center">
            <Image className="w-8 md:w-10 xl:w-12" src={hex} alt="" />
            <p className="text-lg font-medium text-white absolute z-20">2</p>
          </div>
          <div>
            <p className="text-sm lg:text-lg font-medium">Emerging Seller</p>
            <div className="flex gap-x-[1px] mt-[5px] mb-[1px]">
              <div className="w-28 h-[3px] bg-[#223D40]"></div>
              <div className="w-8 h-[3px] bg-[#E2E0D9]"></div>
            </div>
            <p className="text-[11px] text-[#959594]">Next:Establised Seller</p>
          </div>
        </div>
      </div>
    </div>
  );
};

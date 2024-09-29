"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import allcoinsbg from "@/public/_static/background/allcoinsbg.png";
import senditApe from "@/public/sendit_ape.svg";
import { useRecoilValue } from "recoil";
import { phantomWallet } from "@/store/atom/phantomWallet";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Transaction({ params }: any) {
  const router = useRouter();
  const walletAddress = useRecoilValue(phantomWallet);
  let tnx = params.transactionId;

  const [currentDateTime, setCurrentDateTime] = useState<string>("");

  const updateDateTime = () => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    };
    const now = new Date();
    setCurrentDateTime(now.toLocaleString("en-US", options));
  };

  useEffect(() => {
    updateDateTime();
    // const intervalId = setInterval(updateDateTime, 1000);

    // return () => clearInterval(intervalId);
  }, []);

  const pushToHome = () => {
    router.push("/");
  };

  return (
    <div className="relative pt-16 flex justify-center h-screen">
      <Image
        src={allcoinsbg}
        alt="Background"
        className="absolute opacity-[10%]"
      />

      <div className="relative z-10 flex flex-col w-[600px] p-4">
        <div className="mt-6 flex flex-col items-center">
          <Image
            className="border border-b shadow-lg bg-[#F2F2F2] rounded-full bg-opacity-45 w-28"
            src={senditApe}
            alt=""
          />
          <p className="font-medium text-xl">Transaction Confirmed!</p>
          <p className="text-sm text-[#8d8d8e]">
            Payment received, You&apos;re all set
          </p>
        </div>

        <div className="flex flex-col w-full mt-10 gap-y-2">
          <Label title="Amount Paid" value="82 US Dollar" />
          <Label title="Transaction ID" value={tnx} />
          <Label
            title="From Wallet"
            value={`${walletAddress.slice(0, 5)}...${walletAddress.slice(-4)}`}
          />
          <Label title="To Wallet" value="Seller Wallet Address" />
          <Label title="Date" value={currentDateTime} />
        </div>
        <Button className="w-full h-14 mt-6 bg-[#223D40] hover:bg-[#375c60] transition-all duration-300">
          Check Our Your Order
        </Button>
        <Button className="w-full h-14 bg-transparent text-[#375c60] hover:bg-transparent">
          View Your Order History
        </Button>
        <div
          onClick={pushToHome}
          className="mt-2 flex items-center w-fit cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <g fill="none" fill-rule="evenodd">
              <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
              <path
                fill="#223D40"
                d="M8.293 12.707a1 1 0 0 1 0-1.414l5.657-5.657a1 1 0 1 1 1.414 1.414L10.414 12l4.95 4.95a1 1 0 0 1-1.414 1.414z"
              />
            </g>
          </svg>
          <p className="text-[#223D40]">Back to Shopping</p>
        </div>
      </div>
    </div>
  );
}

const Label = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="border h-12 w-full bg-slate-200 flex items-center justify-between p-2 px-3 rounded">
      <p>{title}</p>
      <p>{value}</p>
    </div>
  );
};

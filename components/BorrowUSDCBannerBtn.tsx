"use client";
import Image from "next/image";
import Link from "next/link";
import noisebg from "@/public/_static/background/noisebg.png";
import shine from "@/public/_static/background/shinegradient.png";
import usdcbanner from "@/public/usdctran.png";
import solanablinkImg from "@/public/_static/background/solanablinks.png";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useRecoilValue } from "recoil";
import { phantomWallet } from "@/store/atom/phantomWallet";

const BorrowUSDCBannerBtn = () => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const userWalletAddress = useRecoilValue<string>(phantomWallet);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);

    const handleClickOutside = (event: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const copyUrlToClipboard = (isAffiliate: boolean): void => {
    if (!isClient) return;

    const productURL: string = window.location.href;
    const splitURL: string[] = productURL.split("/");
    const productId: string = splitURL[splitURL.length - 1];

    const urlToCopy: string =
      isAffiliate && userWalletAddress.length >= 10
        ? `https://dial.to/?action=solana-action:https://blinks.sendit.markets/api/actions/product/${productId}?a=${userWalletAddress}&cluster=devnet`
        : `https://dial.to/?action=solana-action:https://blinks.sendit.markets/api/actions/product/${productId}&cluster=devnet`;

    navigator.clipboard.writeText(urlToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      if (userWalletAddress.length >= 10) {
        toast.info(
          isAffiliate ? "Copied Affiliate Link!" : "Copied Product Link!"
        );
      } else {
        toast.info(
          isAffiliate
            ? "Please sign in to get an affiliate link!"
            : "Copied Product Link!"
        );
      }
    });

    setIsOpen(false);
  };

  if (!isClient) {
    return null; // Or a loading placeholder
  }

  return (
    <div className="flex relative h-16 items-center py-2 gap-x-2 mb-2 hover:shadow-xl transition-all duration-200 bg-black rounded">
      <Image
        src={noisebg}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-[5%] mix-blend-color-burn rounded"
      />
      <Image
        src={shine}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-[41%] bg-blend-color rounded"
      />
      <Image
        src={usdcbanner}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-[20%] bg-blend-luminosity rounded"
      />

      <div className="relative z-10 w-full flex justify-center h-full items-center px-2">
        <div className="flex justify-center items-center">
          <p className="font-medium flex items-center text-[14px] md:text-[20px] text-white ">
            Promote with
          </p>
          <Image className="w-60" src={solanablinkImg} alt="" />
          <div
            className="relative inline-block text-left ml-2"
            ref={dropdownRef}
          >
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="border border-[#807e7e] inline-flex justify-center w-full p-1 text-sm font-medium text-white bg-black bg-opacity-60 rounded hover:bg-opacity-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              <svg
                className="w-5 h-5  text-violet-200 hover:text-violet-100"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isOpen && (
              <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                  <button
                    className="text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm hover:bg-[#33555b] hover:text-white"
                    onClick={() => copyUrlToClipboard(true)}
                  >
                    Copy Affiliate Link
                  </button>
                  <button
                    className="text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm hover:bg-[#33555b] hover:text-white"
                    onClick={() => copyUrlToClipboard(false)}
                  >
                    Copy Product Link
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowUSDCBannerBtn;

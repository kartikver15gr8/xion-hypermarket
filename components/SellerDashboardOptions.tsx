"use client";
import Image from "next/image";
import senditLogo from "@/public/sendit_logo.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import walletdp from "@/public/walletdp.png";
import shinegradient from "@/public/_static/background/shinegradient.png";
import { useCallback } from "react";
import { toast } from "sonner";
import portfolio_ape from "@/public/_static/illustrations/portfolio_ape.png";
import randomstatic from "@/public/randomstatic.png";
import RegisterSeller from "./RegisterSeller";
import ShareRegisterSeller from "./ShareRegisterSeller";
import { useRecoilValue } from "recoil";
import { phantomWallet } from "@/store/atom/phantomWallet";

const isActiveTab =
  "flex  text-black hover:text-black transition-all duration-300 backdrop-blur-lg ";
const isInactiveTab =
  "flex  text-[#9b9898] hover:text-black transition-all duration-300 backdrop-blur-lg ";

export default function SellerDashboardOptions({
  portfolio,
  walletAddress,
}: {
  portfolio: string;
  walletAddress: string;
}) {
  const pathname = usePathname();
  const sellerWalletAddress = useRecoilValue(phantomWallet);
  // console.log(pathname);
  const copyToClipboard = useCallback(() => {
    navigator.clipboard
      .writeText(walletAddress)
      .then(() => {
        console.log("Wallet address copied to clipboard");
        toast.success("Wallet address copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy wallet address: ", err);
        toast.error("Failed to copy wallet address");
      });
  }, [walletAddress]);

  return (
    <div className="relative z-10 pt-16 border border-[#E5E5E5] min-h-screen">
      <Link
        href={`/product/seller/${sellerWalletAddress}`}
        className="relative flex items-center px-3 gap-x-2 border-b border-[#E5E5E5] h-20"
      >
        <Image
          src={randomstatic}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-[4%]"
        />

        <Image
          className="w-12 h-12 border border-black rounded-full"
          src={portfolio_ape}
          alt="Seller"
          width={200}
          height={200}
        />

        {/* <div className="h-12 w-12 rounded-md">
          <Image
            className="w-full h-full rounded-md"
            src={portfolio_ape}
            alt=""
            width={200}
            height={200}
          />
        </div> */}
        <div>
          <p className="font-medium text-[15px]">SELLER ID</p>
          <p className="text-[11px]">
            {`${sellerWalletAddress.slice(0, 3)}…${sellerWalletAddress.slice(
              -3
            )}
            `}
          </p>
        </div>
        <div className=" gap-y-2 ml-4">
          <svg
            className="w-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 15 15"
          >
            <path fill="black" d="m7.5 3l7.5 8H0z" />
          </svg>
          <svg
            className="w-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 15 15"
          >
            <path fill="black" d="M7.5 12L0 4h15z" />
          </svg>
        </div>
      </Link>
      <div className="flex flex-col mt-10 ml-3 p-2 h-[400px]">
        <p className="text-[14px] text-[#C9C9CB] ">PORTAL</p>
        <div className="flex gap-x-3 w-[198px] mt-2">
          <div className="h-56 w-[2px] bg-[#C9C9CB] rounded-full"></div>
          <ul className="flex flex-col font-normal gap-y-3">
            <Link href="/seller/dashboard">
              <li
                className={
                  pathname == "/seller/dashboard" ? isActiveTab : isInactiveTab
                }
              >
                <p className="">Dashboard</p>
              </li>
            </Link>
            <Link href="/seller/products">
              <li
                className={
                  pathname == "/seller/products" ? isActiveTab : isInactiveTab
                }
              >
                <p className=" ">Products</p>
              </li>
            </Link>
            <Link href="/seller/transactions">
              <li
                className={
                  pathname == "/seller/transactions"
                    ? isActiveTab
                    : isInactiveTab
                }
              >
                <p className=" ">Transactions</p>
              </li>
            </Link>
            <Link href="">
              <li
                className={
                  pathname == "/seller/analytics" ? isActiveTab : isInactiveTab
                }
              >
                <p className="">Analytics</p>
              </li>
            </Link>

            <Link href="">
              <li
                className={
                  pathname == "/seller/earnings" ? isActiveTab : isInactiveTab
                }
              >
                <p className=" ">Earnings</p>
              </li>
            </Link>
          </ul>
        </div>
        {/* <RegisterSeller /> */}
        <ShareRegisterSeller />
      </div>
    </div>
  );
}

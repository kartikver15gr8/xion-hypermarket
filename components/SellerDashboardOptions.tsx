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
      <div className="relative flex items-center px-3 gap-x-2 border-b border-[#E5E5E5] h-20">
        <Image
          src={randomstatic}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-[4%]"
        />
        <div className="h-12 w-12 rounded-md">
          <Image
            className="w-full h-full rounded-md"
            src={portfolio_ape}
            alt=""
            width={200}
            height={200}
          />
        </div>
        <div>
          <p className="font-medium text-[15px]">SELLER ID</p>
          <p className="text-[11px]">random…id</p>
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
      </div>
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
            <Link href="/">
              <li className={pathname == "/" ? isActiveTab : isInactiveTab}>
                <p className="">Analytics</p>
              </li>
            </Link>

            <Link href="/">
              <li className={pathname == "/" ? isActiveTab : isInactiveTab}>
                <p className=" ">Earnings</p>
              </li>
            </Link>
          </ul>
        </div>
        {/* <div className="flex rounded-[4px] items-center  w-[198px] h-[56px] hover:shadow-lg transition-shadow duration-300">
          <div className="flex px-[16px] items-center rounded-l-[4px]  justify-center w-[154px] h-[56px] bg-[#F3F3F2]">
            <Image
              className="border  rounded-full"
              src={walletdp}
              width={32}
              height={32}
              alt="image"
            />
            <div className="flex flex-col mx-[8px]">
              <p className="text-[16px] font-medium">{portfolio}</p>
              <p className="text-[10px] text-[#949493]">{`${walletAddress.slice(
                0,
                6
              )}...${walletAddress.slice(-5)}`}</p>
            </div>
          </div>
          <div
            onClick={copyToClipboard}
            className="w-[44px] rounded-r-[4px] flex justify-center items-center h-full  relative bg-no-repeat bg-center"
          >
            <Image
              src={shinegradient}
              alt="Background"
              objectFit="fill"
              className="opacity-[26%] rounded-r-[4px]"
              layout="fill"
            />
            <svg
              className="w-[16px] z-10 hover:scale-110 transition-all duration-300 "
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_919_3530)">
                <path
                  d="M5.33301 5.33301V3.46634C5.33301 2.7196 5.33301 2.34624 5.47833 2.06102C5.60616 1.81014 5.81014 1.60616 6.06102 1.47833C6.34624 1.33301 6.7196 1.33301 7.46634 1.33301H12.533C13.2797 1.33301 13.6531 1.33301 13.9383 1.47833C14.1892 1.60616 14.3932 1.81014 14.521 2.06102C14.6663 2.34624 14.6663 2.7196 14.6663 3.46634V8.53301C14.6663 9.27974 14.6663 9.65311 14.521 9.93833C14.3932 10.1892 14.1892 10.3932 13.9383 10.521C13.6531 10.6663 13.2797 10.6663 12.533 10.6663H10.6663M3.46634 14.6663H8.53301C9.27974 14.6663 9.65311 14.6663 9.93833 14.521C10.1892 14.3932 10.3932 14.1892 10.521 13.9383C10.6663 13.6531 10.6663 13.2797 10.6663 12.533V7.46634C10.6663 6.7196 10.6663 6.34624 10.521 6.06102C10.3932 5.81014 10.1892 5.60616 9.93833 5.47833C9.65311 5.33301 9.27974 5.33301 8.53301 5.33301H3.46634C2.7196 5.33301 2.34624 5.33301 2.06102 5.47833C1.81014 5.60616 1.60616 5.81014 1.47833 6.06102C1.33301 6.34624 1.33301 6.7196 1.33301 7.46634V12.533C1.33301 13.2797 1.33301 13.6531 1.47833 13.9383C1.60616 14.1892 1.81014 14.3932 2.06102 14.521C2.34624 14.6663 2.7196 14.6663 3.46634 14.6663Z"
                  stroke="#050505"
                  strokeOpacity="0.7"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_919_3530">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div> */}
      </div>
    </div>
  );
}

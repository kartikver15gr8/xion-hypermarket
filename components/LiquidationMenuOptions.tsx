"use client";
import Image from "next/image";
import senditLogo from "@/public/sendit_logo.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import walletdp from "@/public/walletdp.png";
import shinegradient from "@/public/_static/background/shinegradient.png";
import { useCallback } from "react";
import { toast } from "sonner";

const isActiveTab =
  "relative h-[44px] rounded-sm bg-[rgba(0,0,0,0.1)]  flex items-center hover:bg-[rgba(0,0,0,0.1)] transition-all duration-300 backdrop-blur-lg justify-between border border-slate-300";
const isInactiveTab =
  "relative h-[44px] rounded-sm    flex items-center hover:bg-[rgba(0,0,0,0.1)] transition-all duration-300 justify-between";

export default function LiquidationMenuOptions({
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
        // console.log("Wallet address copied to clipboard");
        toast.success("Wallet address copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy wallet address: ", err);
        toast.error("Failed to copy wallet address");
      });
  }, [walletAddress]);

  return (
    <div className="relative z-10">
      <div className="flex justify-center my-12 2xl:my-14">
        <Link href="/">
          <Image
            src={senditLogo}
            className="w-[145px] hover:scale-105 transition-all  duration-300  "
            alt=""
          />
        </Link>
      </div>
      <div className="flex flex-col justify-between gap-[32px]  items-center p-2 h-[400px]">
        <div className=" w-[198px]">
          <ul className="flex flex-col font-normal gap-[18px]">
            <Link href="/liquidation">
              <li
                className={
                  pathname == "/liquidation"
                    ? isActiveTab
                    : `relative h-[44px] rounded-sm flex items-center hover:bg-[rgba(0,0,0,0.1)] transition-all duration-300 justify-between bg-[#f8f8f6] `
                }
              >
                <svg
                  className="h-full absolute"
                  viewBox="0 0 4 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 0.000725269C7.5 0.000725269 2 -7.49965 0 43.5005V0.000725269Z"
                    fill="#050505"
                  />
                </svg>
                <p className="ml-[10px] font-medium">TOKEN SALES</p>
              </li>
            </Link>
            <Link href="/borrow">
              <li
                className={
                  pathname.includes("/borrow") ? isActiveTab : isInactiveTab
                }
              >
                <p className="ml-[10px] ">Borrow</p>
                <div className="flex items-center gap-x-1  mr-5">
                  <svg
                    width="14"
                    height="19"
                    viewBox="0 0 14 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.91784 7.33333H2.83366V5.66667C2.83366 3.36548 4.69914 1.5 7.00033 1.5C9.30151 1.5 11.167 3.36548 11.167 5.66667V7.33333H11.0828M7.00033 10.6667V12.3333M12.8337 11.5C12.8337 14.7217 10.222 17.3333 7.00033 17.3333C3.77866 17.3333 1.16699 14.7217 1.16699 11.5C1.16699 8.27834 3.77866 5.66667 7.00033 5.66667C10.222 5.66667 12.8337 8.27834 12.8337 11.5Z"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.05967 5.99967C6.21641 5.55412 6.52578 5.17841 6.93298 4.9391C7.34018 4.69978 7.81894 4.6123 8.28446 4.69215C8.74998 4.772 9.17222 5.01402 9.47639 5.37536C9.78057 5.7367 9.94705 6.19402 9.94634 6.66634C9.94634 7.99967 7.94634 8.66634 7.94634 8.66634M7.99967 11.333H8.00634M14.6663 7.99967C14.6663 11.6816 11.6816 14.6663 7.99967 14.6663C4.31778 14.6663 1.33301 11.6816 1.33301 7.99967C1.33301 4.31778 4.31778 1.33301 7.99967 1.33301C11.6816 1.33301 14.6663 4.31778 14.6663 7.99967Z"
                      stroke="black"
                      strokeOpacity="0.5"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </li>
            </Link>
            <Link href="/earnmore">
              <li
                className={
                  pathname == "/earnmore" ? isActiveTab : isInactiveTab
                }
              >
                <p className="ml-[10px] ">Earn More</p>
                <div className="flex items-center gap-x-1  mr-5">
                  <svg
                    width="14"
                    height="19"
                    viewBox="0 0 14 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.91784 7.33333H2.83366V5.66667C2.83366 3.36548 4.69914 1.5 7.00033 1.5C9.30151 1.5 11.167 3.36548 11.167 5.66667V7.33333H11.0828M7.00033 10.6667V12.3333M12.8337 11.5C12.8337 14.7217 10.222 17.3333 7.00033 17.3333C3.77866 17.3333 1.16699 14.7217 1.16699 11.5C1.16699 8.27834 3.77866 5.66667 7.00033 5.66667C10.222 5.66667 12.8337 8.27834 12.8337 11.5Z"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.05967 5.99967C6.21641 5.55412 6.52578 5.17841 6.93298 4.9391C7.34018 4.69978 7.81894 4.6123 8.28446 4.69215C8.74998 4.772 9.17222 5.01402 9.47639 5.37536C9.78057 5.7367 9.94705 6.19402 9.94634 6.66634C9.94634 7.99967 7.94634 8.66634 7.94634 8.66634M7.99967 11.333H8.00634M14.6663 7.99967C14.6663 11.6816 11.6816 14.6663 7.99967 14.6663C4.31778 14.6663 1.33301 11.6816 1.33301 7.99967C1.33301 4.31778 4.31778 1.33301 7.99967 1.33301C11.6816 1.33301 14.6663 4.31778 14.6663 7.99967Z"
                      stroke="black"
                      strokeOpacity="0.5"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </li>
            </Link>
            <Link href="/lend">
              <li className={pathname == "/lend" ? isActiveTab : isInactiveTab}>
                <p className="ml-[10px]">Deposit/Lend</p>
              </li>
            </Link>

            <Link href="/achievements">
              <li
                className={
                  pathname == "/achievements" ? isActiveTab : isInactiveTab
                }
              >
                <p className="ml-[10px] ">Achievements</p>
              </li>
            </Link>
          </ul>
        </div>
        <div className="flex rounded-[4px] items-center  w-[198px] h-[56px] hover:shadow-lg transition-shadow duration-300">
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
        </div>
      </div>
    </div>
  );
}

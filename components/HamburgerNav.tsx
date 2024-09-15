"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import sendit_logo from "@/public/sendit_logo.svg";
import sendit_white_ape from "@/public/sendit_white_ape.svg";
import sendit_white_logo from "@/public/sendit_white_logo.svg";
import Image from "next/image";
import portolio_ape from "@/public/_static/illustrations/portfolio_ape.png";
import shinegradient from "@/public/_static/background/shinegradient.png";
import noisebg from "@/public/_static/background/noisebg.png";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { toast } from "sonner";
import { walletState } from "@/store/atom/walletDetails";

export default function HamburgerNav() {
  const [isOpen, setIsOpen] = useState(false);
  const walletAddress = useRecoilValue(walletState);
  const copyToClipboard = useCallback(() => {
    navigator.clipboard
      .writeText(walletAddress)
      .then(() => {
        console.log("Wallet address copied to clipboard");
        toast.success("Wallet address copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy wallet address: ", err);
        toast.error("Connect your wallet first");
      });
  }, [walletAddress]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="absolute w-full flex flex-col p-2">
      <div className="md:hidden items-center flex justify-between z-40 h-14 rounded w-full border border-gray-300  backdrop-blur-md bg-[rgba(0,0,0,0.06)]">
        <div className="md:hidden   w-fit flex ml-4">
          <motion.button
            onClick={toggleMenu}
            className="text-black focus:outline-none"
            animate={isOpen ? "open" : "closed"}
          >
            <motion.svg
              className="w-7"
              viewBox="0 0 20 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              variants={iconVariants}
            >
              <path
                d="M1 7H19M1 1H19M1 13H19"
                stroke="#050505"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.button>
        </div>

        <Image
          className="w-[45px] mr-1 bg-[rgba(0,0,0,0.7)] backdrop-blur-lg rounded"
          src={sendit_white_ape}
          width={200}
          height={200}
          alt=""
        />
      </div>
      <div className="md:hidden mt-1 rounded ">
        <motion.div
          className="md:hidden z-50 relative w-full border border-gray-300 bg-gray-100 shadow-lg rounded"
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={wrapperVariants}
        >
          <div className="text-black font-medium  flex flex-col shadow-[inset_5px_2px_30px_rgba(0,0,0,0.1)]">
            <NavLink href="/" text="TOKEN SALES" />
            <NavLink href="/borrow" text="Borrow" />
            <NavLink href="/earnmore" text="Earn More" />
            <NavLink href="/lend" text="Deposit/Lend" />
            <NavLink href="/achievements" text="Achievements" />
            <motion.div
              className="flex items-center h-[70px] shadow-[inset_5px_2px_28px_rgba(0,0,0,0.1)] bg-gray-100"
              variants={itemVariants}
            >
              <div className="flex px-[16px] w-5/6 items-center rounded-l-[4px] h-full ">
                <Image
                  className="border w-10 border-gray-300 rounded-full"
                  src={portolio_ape}
                  width={200}
                  height={200}
                  alt="image"
                />
                <div className="flex flex-col mx-[8px]">
                  <p className="text-[18px] font-medium">Portfolio</p>
                  <p className="text-[12px] text-[#949493]">
                    {walletAddress
                      ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(
                          -5
                        )}`
                      : "sendit...vucmr"}
                  </p>
                </div>
              </div>
              <div
                onClick={copyToClipboard}
                className="w-1/6 flex justify-center items-center h-full  relative bg-no-repeat bg-center"
              >
                <Image
                  src={shinegradient}
                  alt="Background"
                  layout="fill"
                  objectFit="cover"
                  className="opacity-[20%]"
                />
                <Image
                  src={noisebg}
                  alt="Background"
                  layout="fill"
                  objectFit="cover"
                  className="opacity-[5%]"
                />
                <svg
                  className="w-6 rotate-90 z-10 hover:-rotate-90 transition-all duration-200"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <rect
                    width="336"
                    height="336"
                    x="128"
                    y="128"
                    fill="none"
                    stroke="#4B4B54"
                    strokeLinejoin="round"
                    strokeWidth="32"
                    rx="57"
                    ry="57"
                  />
                  <path
                    fill="none"
                    stroke="#4B4B54"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="32"
                    d="m383.5 128l.5-24a56.16 56.16 0 0 0-56-56H112a64.19 64.19 0 0 0-64 64v216a56.16 56.16 0 0 0 56 56h24"
                  />
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const NavLink = ({ href, text }: { href: string; text: string }) => (
  <motion.div variants={itemVariants}>
    <Link
      href={href}
      className="h-16 flex items-center hover:bg-[#E0E0E0] transition-all duration-500 px-5 py-2 hover:rounded-md border-b border-[#E1E1E1]"
    >
      {text}
    </Link>
  </motion.div>
);

const wrapperVariants = {
  open: {
    scaleY: 1,
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    opacity: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 90 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

"use client";

import { useKeplr } from "@/hooks/useKeplr";
import { Button } from "./ui/button";
import sendit_ape from "@/public/sendit_ape.svg";
import Image from "next/image";

export default function KeplrButton() {
  const {
    keplrConnected,
    userAddress,
    connectWallet,
    disconnectWallet,
    balance,
    add,
    bal,
  } = useKeplr();

  // console.log("User account address: ", userAddress);
  // console.log("User Neutron balance: ", balance);
  // console.log("User Balance through state mgmt: ", bal);
  // console.log("User State Address: ", add);

  return (
    <div className="w-full z-20 absolute right-5 top-20 flex flex-col items-end">
      {keplrConnected && (
        <Button
          onClick={disconnectWallet}
          className="flex items-center bg-inherit text-black border-[2px] border-black rounded-md w-fit hover:bg-white transition-all duration-300 "
        >
          <Image
            className="w-8 h-8"
            src={sendit_ape}
            width={200}
            height={200}
            alt=""
          />
          <p>{`${userAddress?.slice(0, 5)}...${userAddress?.slice(-6)}`}</p>
        </Button>
      )}
      {!keplrConnected && (
        <Button
          onClick={connectWallet}
          className="flex items-center bg-inherit text-black border-[2px] border-black rounded-md w-fit hover:bg-white transition-all duration-300 "
        >
          <svg
            className="w-4 mr-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <rect
              width="416"
              height="288"
              x="48"
              y="144"
              fill="none"
              stroke="black"
              strokeLinejoin="round"
              strokeWidth="48"
              rx="48"
              ry="48"
            />
            <path
              fill="none"
              stroke="black"
              strokeLinejoin="round"
              strokeWidth="32"
              d="M411.36 144v-30A50 50 0 0 0 352 64.9L88.64 109.85A50 50 0 0 0 48 159v49"
            />
            <path
              fill="black"
              d="M368 320a32 32 0 1 1 32-32a32 32 0 0 1-32 32"
            />
          </svg>
          <p>Connect Wallet</p>
        </Button>
      )}
    </div>
  );
}

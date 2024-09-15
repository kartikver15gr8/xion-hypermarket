"use client";
import { Button } from "../ui/button";

export default function WalletConnectBtn() {
  return (
    <div className="w-full z-20 absolute right-2 top-2 flex flex-col items-end">
      <Button className="flex items-center bg-inherit text-black border-[2px] border-black rounded-md w-fit hover:bg-white transition-all duration-300 ">
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
          <path fill="black" d="M368 320a32 32 0 1 1 32-32a32 32 0 0 1-32 32" />
        </svg>

        <p>Connect Wallet</p>
      </Button>
    </div>
  );
}

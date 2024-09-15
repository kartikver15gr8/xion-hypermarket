"use client";

import { useState, useEffect } from "react";
import { Window as KeplrWindow } from "@keplr-wallet/types";
import { Button } from "./ui/button";

declare global {
  interface Window extends KeplrWindow {}
}

export default function KeplarConnect() {
  const [keplrConnected, setKeplrConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    const keplrHandler = async () => {
      if (!window.keplr) {
        alert("Please install Keplr extension");
        return;
      }
    };
    keplrHandler();
  }, []);

  const connectKeplr = async () => {
    if (!window.keplr) {
      alert("Please install Keplr extension");
      return;
    }

    try {
      await window.keplr.enable("cosmoshub-4");
      const offlineSigner = window.keplr.getOfflineSigner("cosmoshub-4");
      const accounts = await offlineSigner.getAccounts();
      console.log("Connected accounts:", accounts);

      if (accounts.length > 0) {
        const chainInfo = await window.keplr.getKey("cosmoshub-4");
        setWalletAddress(accounts[0].address);

        const userDetails = {
          address: accounts[0].address,
          algo: accounts[0].algo,
          pubkey: Buffer.from(accounts[0].pubkey).toString("base64"),
          name: chainInfo.name,
          bech32Address: chainInfo.bech32Address,
        };

        console.log("User Details:", userDetails);
      }

      setKeplrConnected(true);
    } catch (error) {
      console.error("Error connecting to Keplr:", error);
    }
  };

  return (
    // <button
    //   onClick={connectKeplr}
    //   className="border p-2 rounded-[4px] bg-slate-600 text-white font-bold"
    // >
    //   {keplrConnected
    //     ? `${walletAddress.slice(0, 5)}...${walletAddress.slice(-6)}`
    //     : "Connect Keplr"}
    // </button>
    <div
      onClick={connectKeplr}
      className="w-full z-20 absolute right-2 top-2 flex flex-col items-end"
    >
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

        <p>
          {keplrConnected
            ? `${walletAddress.slice(0, 5)}...${walletAddress.slice(-6)}`
            : "Connect Keplr"}
        </p>
      </Button>
    </div>
  );
}

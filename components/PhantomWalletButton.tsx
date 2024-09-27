"use client";

import React, { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletName } from "@solana/wallet-adapter-base";
import { WalletNotSelectedError } from "@solana/wallet-adapter-react";
import { PhantomWalletName } from "@solana/wallet-adapter-phantom";
import { useRecoilState, useRecoilValue } from "recoil";
import { phantomWallet } from "@/store/atom/phantomWallet";
import { toast } from "sonner";

const PhantomWalletButton: React.FC = () => {
  const { select, wallet, connect, disconnect, connected, publicKey } =
    useWallet();
  const [isPhantomInstalled, setIsPhantomInstalled] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [phantomAddress, setPhantomAddress] = useRecoilState(phantomWallet);
  const walletAddr = useRecoilValue(phantomWallet);

  useEffect(() => {
    if ("solana" in window) {
      setIsPhantomInstalled(true);
    }
  }, []);

  useEffect(() => {
    if (connected && publicKey) {
      setWalletAddress(publicKey.toBase58());
      setPhantomAddress(publicKey.toBase58());
      toast.info("Successfully connected to Phantom");
    } else {
      setWalletAddress("");
    }
  }, [connected, publicKey, setPhantomAddress]);

  const handleConnect = async () => {
    try {
      if (isPhantomInstalled) {
        await select(PhantomWalletName as WalletName);
        await connect();
      } else {
        window.open("https://phantom.app/", "_blank");
      }
    } catch (error) {
      if (error instanceof WalletNotSelectedError) {
        console.error("Wallet not selected. Please select a wallet first.");
      } else {
        console.error("Failed to connect wallet:", error);
      }
    }
  };

  return (
    <div className="border w-fit rounded-md">
      {!connected && (
        <button
          onClick={handleConnect}
          className="w-24 lg:w-32 h-10 hidden sm:flex sm:items-center sm:justify-center rounded-lg bg-[#000000] p-2 text-white md:text-[12px] text-[11px] lg:text-[14px] xl:text-[16px]  hover:bg-[#474748] transition-all duration-300"
        >
          {connected
            ? "Disconnect Phantom"
            : isPhantomInstalled
            ? "Sign in"
            : "Install Phantom"}
        </button>
      )}

      {connected && (
        <button
          onClick={disconnect}
          className="w-24 lg:w-32 h-10 hidden sm:flex sm:items-center sm:justify-center rounded-lg bg-[#000000] p-2 text-white md:text-[12px] text-[11px] lg:text-[14px] xl:text-[16px]  hover:bg-[#474748] transition-all duration-300"
        >
          {`${walletAddr.slice(0, 2)}...${walletAddr.slice(-4)}`}
          {/* {`${walletAddress.slice(0, 2)}...${walletAddress.slice(-4)}`} */}
        </button>
      )}
    </div>
  );
};

export default PhantomWalletButton;

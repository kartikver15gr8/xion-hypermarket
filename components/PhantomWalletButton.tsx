"use client";

import React, { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletName } from "@solana/wallet-adapter-base";
import { WalletNotSelectedError } from "@solana/wallet-adapter-react";
import { PhantomWalletName } from "@solana/wallet-adapter-phantom";
import { useRecoilState, useRecoilValue } from "recoil";
import { phantomWallet } from "@/store/atom/phantomWallet";
import { toast } from "sonner";
import axios from "axios";
import { userIdState } from "@/store/atom/userIdState";
import Link from "next/link";

const PhantomWalletButton: React.FC = () => {
  const { select, wallet, connect, disconnect, connected, publicKey } =
    useWallet();
  const [isPhantomInstalled, setIsPhantomInstalled] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [phantomAddress, setPhantomAddress] = useRecoilState(phantomWallet);
  const walletAddr = useRecoilValue(phantomWallet);
  const [userExist, setUserExist] = useState(true);
  const [userStateId, setUserStateId] = useRecoilState(userIdState);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if ("solana" in window) {
      setIsPhantomInstalled(true);
    }
  }, []);

  useEffect(() => {
    const postUser = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/signup`,
          { wallet_address: walletAddress }
        );
        setUserStateId(response.data.rowId);
        return response.data;
      } catch (error) {
        console.log(`You got an error while creating a new user: ${error}`);
      }
    };
    if (!userExist) {
      postUser();
    }
  }, [userExist, walletAddress]);

  useEffect(() => {
    const refreshReviewAnalytics = async () => {
      try {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/analytics/refresh/seller`
        );
        // console.log(response.data);
        return response.data;
      } catch (error) {
        console.log(`You got an error while refreshing analytics: ${error}`);
      }
    };

    refreshReviewAnalytics();
  }, []);

  useEffect(() => {
    const refreshProductAnalytics = async () => {
      try {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/analytics/refresh/product`
        );
        // console.log(response.data);
        return response.data;
      } catch (error) {
        console.log(`You got an error while refreshing analytics: ${error}`);
      }
    };
    refreshProductAnalytics();
  }, []);

  useEffect(() => {
    const refreshAffiliateAnalytics = async () => {
      try {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/analytics/refresh/affiliate`
        );
        // console.log(response.data);
        return response.data;
      } catch (error) {
        console.log(`You got an error while refreshing analytics: ${error}`);
      }
    };
    refreshAffiliateAnalytics();
  }, []);

  useEffect(() => {
    const checkUserExist = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/fetch/user/${walletAddress}`
        );
        // console.log("This is the user details");

        // console.log(response.data);
        // console.log(response.data.WalletAddress);
        setUserExist(true);
        // console.log(response.data);
        setUserStateId(response.data.id);
        // console.log(response.data.id);
        return response.data;
      } catch (error) {
        setUserExist(false);
        console.log(
          `You got an error while checking the user existence: ${error}`
        );
      }
    };
    if (walletAddress !== "") {
      checkUserExist();
    }
  }, [walletAddress]);

  useEffect(() => {
    if (connected && publicKey) {
      setWalletAddress(publicKey.toBase58());
      setPhantomAddress(publicKey.toBase58());
      toast.info("Successfully connected to Phantom");
      // console.log(`This is from recoil value${phantomAddress}`);
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
  const handleLogout = async () => {
    await disconnect();
    setShowPopup(false);
    toast.info("Disconnected from Phantom");
  };

  return (
    <div className="w-fit rounded-md">
      {!connected && (
        <button
          onClick={handleConnect}
          className="w-24 h-10 hidden sm:flex sm:items-center sm:justify-center rounded-full bg-[#000000] p-2 text-white md:text-[12px] text-[11px] lg:text-[14px] xl:text-[16px]  hover:bg-[#474748] transition-all duration-300"
        >
          {connected
            ? "Disconnect Phantom"
            : isPhantomInstalled
            ? "Sign in"
            : "Install Phantom"}
        </button>
      )}

      {connected && (
        <div className="">
          <button
            onClick={() => setShowPopup(!showPopup)}
            className="w-10 h-10 bg-[#eeeeee] shadow-inner rounded-full border border-[#616161] hidden sm:flex sm:items-center sm:justify-center bg-inherit p-2 text-white md:text-[12px] text-[11px] lg:text-[14px] xl:text-[16px] hover:bg-[#9b9b9d] transition-all duration-300"
          >
            {showPopup ? (
              <svg
                className="w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 15 15"
              >
                <path
                  fill="black"
                  d="M3.64 2.27L7.5 6.13l3.84-3.84A.92.92 0 0 1 12 2a1 1 0 0 1 1 1a.9.9 0 0 1-.27.66L8.84 7.5l3.89 3.89A.9.9 0 0 1 13 12a1 1 0 0 1-1 1a.92.92 0 0 1-.69-.27L7.5 8.87l-3.85 3.85A.92.92 0 0 1 3 13a1 1 0 0 1-1-1a.9.9 0 0 1 .27-.66L6.16 7.5L2.27 3.61A.9.9 0 0 1 2 3a1 1 0 0 1 1-1c.24.003.47.1.64.27"
                />
              </svg>
            ) : (
              <svg
                className="w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#303030"
                  d="M19.652 19.405c.552-.115.882-.693.607-1.187c-.606-1.087-1.56-2.043-2.78-2.771C15.907 14.509 13.98 14 12 14s-3.907.508-5.479 1.447c-1.22.728-2.174 1.684-2.78 2.771c-.275.494.055 1.072.607 1.187a37.5 37.5 0 0 0 15.303 0"
                />
                <circle cx="12" cy="8" r="5" fill="#303030" />
              </svg>
            )}
          </button>
          {showPopup && (
            <PopupMenu
              onClose={() => setShowPopup(false)}
              onBecomeSeller={() => console.log("Become a Seller clicked")}
              onDashboard={() => console.log("Dashboard clicked")}
              onLogout={handleLogout}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default PhantomWalletButton;

interface PopupMenuProps {
  onClose: () => void;
  onBecomeSeller: () => void;
  onDashboard: () => void;
  onLogout: () => void;
}

const PopupMenu: React.FC<PopupMenuProps> = ({
  onClose,
  onBecomeSeller,
  onDashboard,
  onLogout,
}) => {
  return (
    <div className="absolute bg-white border rounded-md  p-2 right-1 md:right-5 lg:right-10 top-14 shadow-inner">
      <Link href="/seller/dashboard">
        <button className="block rounded w-full text-left py-1 px-2 hover:bg-gray-200 transition-all duration-300">
          Dashboard
        </button>
      </Link>

      <button
        onClick={onLogout}
        className="block rounded w-full text-left py-1 px-2 hover:bg-gray-200 transition-all duration-300"
      >
        Logout
      </button>
    </div>
  );
};

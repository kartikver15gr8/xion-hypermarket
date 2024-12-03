"use client";

import { cartState } from "@/store/atom/cartState";
import { phantomWallet } from "@/store/atom/phantomWallet";
import { userIdState } from "@/store/atom/userIdState";
import { usePrivy } from "@privy-io/react-auth";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { toast } from "sonner";

export default function PrivyConnection() {
  const { login, logout, user, authenticated, ready, getAccessToken } =
    usePrivy();
  const [walletAddress, setWalletAddress] = useState("");
  const [userExist, setUserExist] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [phantomAddress, setPhantomAddress] = useRecoilState(phantomWallet);
  const walletAddr = useRecoilValue(phantomWallet);
  const [userStateId, setUserStateId] = useRecoilState(userIdState);
  const [privyAccessToken, setPrivyAccessToken] = useState("");
  const [externalId, setExternalId] = useState("");

  const [showProfilePopup, setShowProfilePopup] = useState(false);

  useEffect(() => {
    const postUser = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_SWAGGER_API_V2}/admin/signup`,
          {},
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${privyAccessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        console.error(`Error creating user: ${error}`);
      }
    };

    if (privyAccessToken && !userExist) {
      postUser();
    }
  }, [privyAccessToken, userExist]);

  useEffect(() => {
    const checkUserExist = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SWAGGER_API_V2}/admin/user`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${privyAccessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        setUserExist(true);
        setUserStateId(response.data.ID);

        return response.data;
      } catch (error) {
        setUserExist(false);
      }
    };
    if (privyAccessToken && externalId) {
      checkUserExist();
    }
  }, [externalId, privyAccessToken]);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getAccessToken();
        if (user) {
          setExternalId(user.id);
        }
        if (token) {
          setPrivyAccessToken(token);
        }
        if (authenticated && user?.wallet?.address) {
          setWalletAddress(user.wallet.address);
          setPhantomAddress(user.wallet.address);

          toast.info("Successfully connected to Phantom");
        } else {
          setWalletAddress("");
        }
      } catch (error) {
        console.log(`Error while executing fetchToken: ${error}`);
      }
    };
    fetchToken();
  }, [authenticated, user, setPhantomAddress]);

  const handleLogout = async () => {
    await logout();
    setShowPopup(false);
    setUserStateId("");
    toast.info("Disconnected from Phantom");
  };
  const [cartVal, setCartVal] = useRecoilState(cartState);

  const setCartState = () => {
    setCartVal(!cartVal);
    setShowPopup(false);
  };

  const toggleShowProfilePopup = () => {
    setShowProfilePopup(false);
  };

  return (
    <>
      <div className="w-fit">
        {authenticated ? (
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
                changeCartState={setCartState}
              />
            )}
          </div>
        ) : (
          <button
            className=" h-10 hidden sm:flex sm:items-center sm:justify-center rounded bg-[#1F3839] px-4 text-white md:text-[12px] text-[11px] lg:text-[14px] xl:text-[16px]  hover:bg-[#4e6466] transition-all duration-300"
            onClick={login}
          >
            Sign Up
          </button>
        )}
      </div>
      {showProfilePopup && (
        <div className="absolute bg-black bg-opacity-40 h-screen w-full left-0 top-0">
          <div className=" h-96 rounded-xl px-4 py-2 border-[#AFAFB4] top-0 w-[500px] absolute bg-white left-1/3 mt-32">
            <div className="flex items-center justify-between ">
              <p>Add your profile</p>
              <button
                onClick={toggleShowProfilePopup}
                className="text-xl border w-7 flex justify-center"
              >
                X
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

interface PopupMenuProps {
  onClose: () => void;
  onBecomeSeller: () => void;
  onDashboard: () => void;
  onLogout: () => void;
  changeCartState: () => void;
}

const PopupMenu: React.FC<PopupMenuProps> = ({
  onClose,
  onBecomeSeller,
  onDashboard,
  onLogout,
  changeCartState,
}) => {
  return (
    <div className="absolute bg-white border rounded-md  p-2 right-1 md:right-5 lg:right-10 top-14 shadow-inner">
      <Link href="/seller/dashboard">
        <button
          onClick={onClose}
          className="block rounded w-full text-left py-1 px-2 hover:bg-gray-200 transition-all duration-300"
        >
          Dashboard
        </button>
      </Link>

      <button
        onClick={changeCartState}
        className="block rounded w-full text-left py-1 px-2 hover:bg-gray-200 transition-all duration-300"
      >
        Check Cart
      </button>
      <button
        onClick={onLogout}
        className="block rounded w-full text-left py-1 px-2 hover:bg-gray-200 transition-all duration-300"
      >
        Logout
      </button>
    </div>
  );
};
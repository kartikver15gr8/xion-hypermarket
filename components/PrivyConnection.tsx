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
              className="w-8 h-8 bg-[#eeeeee] shadow-inner rounded border border-[#616161] hidden sm:flex sm:items-center sm:justify-center bg-inherit  text-white md:text-[12px] text-[11px] lg:text-[14px] xl:text-[16px] hover:bg-[#DDD] transition-all duration-300"
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
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                >
                  <path
                    fill="black"
                    d="M10 12h30v4H10zm0 10h30v4H10zm0 10h30v4H10z"
                  />
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
    <div className="absolute bg-white border border-[#a5a5a5] rounded-md  p-2 right-1 md:right-5 lg:right-10 top-14 shadow-inner">
      <Link href="/seller/dashboard">
        <button
          onClick={onClose}
          className="flex items-center gap-x-2 border-b  rounded w-full text-left py-1 px-2 hover:bg-[#DDD] transition-all duration-300"
        >
          <svg
            className="w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="black"
              d="M9 20v-1H7q-.425 0-.712-.288T6 18t.288-.712T7 17h1V7H7q-.425 0-.712-.288T6 6t.288-.712T7 5h2V4q0-.425.288-.712T10 3t.713.288T11 4v1h2V4q0-.425.288-.712T14 3t.713.288T15 4v1.125q1.3.35 2.15 1.413T18 9q0 .725-.25 1.388t-.7 1.187q.875.525 1.413 1.425T19 15q0 1.65-1.175 2.825T15 19v1q0 .425-.287.713T14 21t-.712-.288T13 20v-1h-2v1q0 .425-.288.713T10 21t-.712-.288T9 20m1-9h4q.825 0 1.413-.587T16 9t-.587-1.412T14 7h-4zm0 6h5q.825 0 1.413-.587T17 15t-.587-1.412T15 13h-5z"
            />
          </svg>
          <p>Start Selling</p>
        </button>
      </Link>

      <button className="flex gap-x-2 border-b  items-center rounded w-full text-left py-1 px-2 hover:bg-[#DDD] transition-all duration-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5"
          viewBox="0 0 24 24"
        >
          <path
            fill="black"
            d="M15 7q-.425 0-.712-.288T14 6t.288-.712T15 5h6q.425 0 .713.288T22 6t-.288.713T21 7zm0 4q-.425 0-.712-.288T14 10t.288-.712T15 9h6q.425 0 .713.288T22 10t-.288.713T21 11zm0 4q-.425 0-.712-.288T14 14t.288-.712T15 13h6q.425 0 .713.288T22 14t-.288.713T21 15zm-7-1q-1.25 0-2.125-.875T5 11t.875-2.125T8 8t2.125.875T11 11t-.875 2.125T8 14m-6 5v-.9q0-.525.25-1t.7-.75q1.125-.675 2.388-1.012T8 15t2.663.338t2.387 1.012q.45.275.7.75t.25 1v.9q0 .425-.288.713T13 20H3q-.425 0-.712-.288T2 19"
          />
        </svg>
        <p>Profile</p>
      </button>
      <button
        onClick={changeCartState}
        className="flex gap-x-2 border-b  items-center rounded w-full text-left py-1 px-2 hover:bg-[#DDD] transition-all duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5"
          viewBox="0 0 24 24"
        >
          <path
            fill="black"
            d="M7 22q-.825 0-1.412-.587T5 20t.588-1.412T7 18t1.413.588T9 20t-.587 1.413T7 22m10 0q-.825 0-1.412-.587T15 20t.588-1.412T17 18t1.413.588T19 20t-.587 1.413T17 22M6.15 6l2.4 5h7l2.75-5zM5.2 4h14.75q.575 0 .875.513t.025 1.037l-3.55 6.4q-.275.5-.737.775T15.55 13H8.1L7 15h12v2H7q-1.125 0-1.7-.987t-.05-1.963L6.6 11.6L3 4H1V2h3.25zm3.35 7h7z"
          />
        </svg>
        <p>Cart</p>
      </button>
      <Link
        href={"/library"}
        className="flex items-center gap-x-2 border-b  rounded w-full text-left py-1 px-2 hover:bg-[#DDD] transition-all duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5"
          viewBox="0 0 24 24"
        >
          <path
            fill="black"
            d="m15.5 17.125l4.95-4.95q.275-.275.7-.275t.7.275t.275.7t-.275.7l-5.65 5.65q-.3.3-.7.3t-.7-.3l-2.85-2.85q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275zM5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h4.175q.275-.875 1.075-1.437T12 1q1 0 1.788.563T14.85 3H19q.825 0 1.413.588T21 5v4q0 .425-.288.713T20 10t-.712-.288T19 9V5h-2v2q0 .425-.288.713T16 8H8q-.425 0-.712-.288T7 7V5H5v14h5q.425 0 .713.288T11 20t-.288.713T10 21zm7-16q.425 0 .713-.288T13 4t-.288-.712T12 3t-.712.288T11 4t.288.713T12 5"
          />
        </svg>
        <p>Orders</p>
      </Link>
      <button
        onClick={onLogout}
        className="flex items-center gap-x-2 rounded w-full text-left py-1 px-2 hover:bg-[#DDD] transition-all duration-300"
      >
        <svg
          className="w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fill="black"
            d="M5 21q-.825 0-1.412-.587T3 19v-4h2v4h14V5H5v4H3V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm5.5-4l-1.4-1.45L11.65 13H3v-2h8.65L9.1 8.45L10.5 7l5 5z"
          />
        </svg>
        <p>Logout</p>
      </button>
    </div>
  );
};

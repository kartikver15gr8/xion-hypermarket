"use client";
import Image from "next/image";
import BorrowCardHead from "../BorrowPageComp/BorrowCardHead";
import { useState } from "react";
import BorrowBtn from "../BorrowPageComp/BorrowBtn";
import LendBtn from "./LendBtn";
import Link from "next/link";
import neutron from "@/public/coins/neutron.png";
import coinbg from "@/public/_static/background/coinbg.png";
import noisebg from "@/public/_static/background/noisebg.png";
import randomstatic from "@/public/randomstatic.png";

import { OfflineSigner } from "@cosmjs/proto-signing";
import { executeDepositNative } from "@/lib/cosm";
import { chains } from "chain-registry";
import loaderSVG from "@/public/loaders/loader.svg";
import { toast } from "sonner";
import { useRecoilState, useRecoilValue } from "recoil";
import { walletState } from "@/store/atom/walletDetails";
import { txsHashState } from "@/store/atom/depositTxsHash";
import { redirect } from "next/navigation";
const chain = chains.find(({ chain_name }) => chain_name === "neutrontestnet")!;

export default function DepositEarnRateCard({
  totalSupplied,
  oraclePrice,
  maxLTV,
  liquidationLTV,
  utilizationRate,
}: {
  totalSupplied: string;
  oraclePrice: string;
  maxLTV: string;
  liquidationLTV: string;
  utilizationRate: string;
}) {
  const [amount, setAmount] = useState<string>("");
  const [transactionHash, setTransactionHash] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>("");

  const [txsHash, setTxsHash] = useRecoilState(txsHashState);
  const txs = useRecoilValue(txsHashState);

  const connectWallet = async () => {
    if (window.getOfflineSigner) {
      //@ts-ignore
      const offlineSigner: OfflineSigner = await window.getOfflineSignerAuto(
        chain.chain_id
      );
      const accounts = await offlineSigner.getAccounts();
      setWalletAddress(accounts[0].address);

      console.log(accounts[0].pubkey);
      toast("Wallet connected!");
    } else {
      toast("Please install Keplr or Phantom wallet"!);
      console.error("Please install Keplr or Phantom wallet");
    }
  };

  const handleDeposit = async () => {
    setError("");

    try {
      setLoading(true);
      //@ts-ignore
      const offlineSigner: OfflineSigner = await window.getOfflineSignerAuto(
        chain.chain_id
      );

      const amt = Number(amount) * 1000000;

      const txHash = await executeDepositNative(
        offlineSigner,
        walletAdd,
        amt.toString()
      );
      setTransactionHash(txHash);
      setTxsHash(txHash);
      setLoading(false);
      redirect("/lend/earnrate/status");
    } catch (err) {
      setLoading(false);
      console.error(err);
      setError("Failed to execute deposit");
    }
  };

  const [bidAmount, setBidAmount] = useState("500");

  const walletAdd = useRecoilValue(walletState);
  return (
    <div className="relative w-[340px] sm:w-[450px] bg-white h-[580px] sm:h-[620px] mt-5 shadow-xl">
      <Image
        src={coinbg}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-[8%]"
      />
      <div className="relative z-10 flex items-center flex-col  w-full">
        <BorrowCardHead
          title="Deposit earn rate"
          backHref="/lend/lendusdc"
          crossHref="/lend"
        />
        <div className="px-5 sm:px-8 md:px-10 w-full">
          <div className=" flex w-full items-center py-4">
            <Image
              className="mr-4 w-28"
              src={neutron}
              width={100}
              height={100}
              alt=""
            />

            <div className="flex flex-col">
              <div className="mr-2 flex items-center">
                <p className="font-medium text-4xl">8.5%</p>
                <div className="text-white font-medium bg-[#4E6465] px-1 w-fit h-fit ml-2">
                  <p className="">APY</p>
                </div>
              </div>
              <p className="text-[16px] font-bold text-[#52525C]">NTRN</p>
              <div className="flex items-center gap-x-1">
                <p className="text-sm sm:text-[14px]">Detailed View</p>
                <svg
                  className="w-4 bg-[#E1E1E1] rounded-[2px]"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.8">
                    <path
                      d="M12 10.5L8 6.5L4 10.5"
                      stroke="#4B4B54"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full h-36 border shadow-[inset_1px_1px_24px_rgba(0,0,0,0.04)]">
            <div className="grid grid-cols-2 h-[50%]">
              <div className="flex flex-col items-center justify-center border-r">
                <p className="font-extralight text-[14px]">Total Supplied</p>
                <p className="font-medium text-[18px] sm:text-[22px]">
                  {totalSupplied}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="font-extralight text-[14px]">Oracle Price</p>
                <p className="font-medium text-[18px] sm:text-[22px]">
                  {oraclePrice}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 border h-[50%]">
              <div className="flex flex-col items-center justify-center border-r">
                <p className="font-extralight text-[14px]">Max LTV</p>
                <p className="font-medium text-[18px] sm:text-[22px]">
                  {maxLTV}
                </p>
              </div>
              <div className=" flex flex-col items-center justify-center border-r">
                <p className="font-extralight text-[14px]">Liquidation LTV</p>
                <p className="font-medium text-[18px] sm:text-[22px]">
                  {liquidationLTV}
                </p>
              </div>
              <div className=" flex flex-col items-center justify-center">
                <p className="font-extralight text-[14px]">Utilization Rate</p>
                <p className="font-medium text-[18px] sm:text-[22px]">
                  {utilizationRate}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col justify-center mt-4">
            <p className="font-medium text-[10px] sm:text-[10px] md:text-[12px] lg:text-[12px] xl:text-[12px] 2xl:text-[12px] my-[4px]">
              AMOUNT TO DEPOSIT
            </p>
            <div className="h-[60px] relative items-center border-slate-400 border flex">
              <Image
                src={randomstatic}
                alt="Background"
                layout="fill"
                objectFit="cover"
                className="opacity-[15%]"
              />
              <div className="relative z-10 flex w-full  items-center justify-between bg-[#F3F3F3] px-4 h-full">
                <p className="font-medium text-lg sm:text-xl">DEPOSIT</p>
                <div className="flex items-center">
                  <input
                    className="w-24 h-10 bg-white p-1 px-2 font-medium  focus:outline-none border"
                    type="number"
                    placeholder="Deposit Amt"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                  />
                  <p className="font-medium ml-2 text-slate-400 text-lg sm:text-xl">
                    USDC
                  </p>
                </div>
              </div>
            </div>
            <div className="text-[12px] h-8 items-center gap-x-1 flex my-[4px] justify-between">
              <div className="flex gap-x-1 text-[10px] sm:text-[14px]">
                <p className="">Available on USDC: </p>
                <p className="font-bold">2000 USDC</p>
              </div>
              <div className="flex gap-x-1 sm:gap-x-2">
                <LendBtn title="Add 50%" className="px-1 sm:px-2 h-6 sm:h-7" />
                <LendBtn title="Add 100%" className="px-1 sm:px-2 h-6 sm:h-7" />
              </div>
            </div>
            {/* <Link href="/lend/earnrate/status">
              <LendBtn title="Send it" className="h-14 sm:h-16 mt-4" />
            </Link> */}
            {!isLoading && (
              <button
                className="text-white font-medium p-2 mt-4 h-16 rounded bg-black"
                onClick={handleDeposit}
              >
                Deposit
              </button>
            )}
            {isLoading && (
              <div className="flex justify-center">
                <Image className="w-10" src={loaderSVG} alt="" />
              </div>
            )}

            {txs && (
              <div className="w-full  flex justify-end items-center mt-1 font-medium">
                <Link href="/lend/earnrate/status" className="rounded">
                  <div className=" w-fit flex">
                    <p className="hover:text-blue-600 transition-all duration-300">
                      Finish Deposit
                    </p>
                    <svg
                      className="w-4 ml-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1024 1024"
                    >
                      <path
                        fill="black"
                        d="M754.752 480H160a32 32 0 1 0 0 64h594.752L521.344 777.344a32 32 0 0 0 45.312 45.312l288-288a32 32 0 0 0 0-45.312l-288-288a32 32 0 1 0-45.312 45.312z"
                      />
                    </svg>
                  </div>
                </Link>
              </div>
            )}
            {/* {!walletAddress ? (
              <button
                className="mt-2 bg-yellow-300 p-2 rounded border border-black"
                onClick={connectWallet}
              >
                Connect Wallet
              </button>
            ) : (
              <p>Connected wallet: {walletAddress}</p>
            )} */}

            {/* {!walletAdd ? (
              <div className="mt-2 bg-yellow-300 p-2 flex justify-center items-center rounded border border-black">
                Not connected
              </div>
            ) : (
              <div className="mt-2 bg-yellow-300 p-2 flex justify-center items-center rounded border border-black">
                Connected wallet:{" "}
                {`${walletAdd.slice(0, 3)}...${walletAdd.slice(-4)}`}
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

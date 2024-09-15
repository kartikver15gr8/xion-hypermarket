"use client";

import Image, { StaticImageData } from "next/image";
import keplr from "@/public/walleticons/keplr-logo.svg";
import coinbase from "@/public/walleticons/coinbase.webp";
import leap from "@/public/walleticons/Leap.webp";
import metamask from "@/public/walleticons/metamask.webp";
import phantom from "@/public/walleticons/phantom.webp";
import cosmostation from "@/public/walleticons/cosmostation.webp";
import owallet from "@/public/walleticons/owallet.webp";
import rabby from "@/public/walleticons/Rabby.webp";
import solflare from "@/public/walleticons/solflare.webp";
import evm from "@/public/walleticons/Ethwall.webp";
import sol from "@/public/walleticons/Solanachain.webp";
import cosm from "@/public/walleticons/cosmoswall.webp";
import cosmos from "@/public/walleticons/cosmos.png";
import ethereum from "@/public/walleticons/eth.svg";
import solana from "@/public/walleticons/solana.svg";
import { useState } from "react";
import { useKeplr } from "@/hooks/useKeplr";

const isActive =
  "bg-[#f2f2ed] justify-center border border-[#c2c2c7] rounded-sm flex gap-x-1 items-center px-1 hover:bg-[#fefefd] transition-all duration-300";

const isInActive =
  "justify-center  rounded-sm flex gap-x-1 items-center px-1 hover:bg-[#d2d2d7] transition-all duration-300";

export default function WalletConnectWindow({
  setActive,
}: {
  setActive?: any;
}) {
  const [cosmSelected, setCosmSelected] = useState(true);
  const [ethSelected, setEthSelected] = useState(false);
  const [solSelected, setSolSelected] = useState(false);

  const cosmSelect = () => {
    setCosmSelected(true);
    setSolSelected(false);
    setEthSelected(false);
  };
  const ethSelect = () => {
    setCosmSelected(false);
    setSolSelected(false);
    setEthSelected(true);
  };
  const solSelect = () => {
    setCosmSelected(false);
    setSolSelected(true);
    setEthSelected(false);
  };

  {
    console.log(`${cosmSelected} ${solSelected} ${ethSelected} `);
  }
  return (
    <div className="absolute flex h-[100vh] w-[94vw] sm:w-[100vw] justify-center items-center">
      <div className="border border-[#c2c2c7] rounded-xl flex flex-col w-[80vw] sm:w-[60vw] md:w-[500px] h-[400px] md:h-[450px] shadow-xl bg-[#fefefd] rounded-b-xl z-50">
        <div className="h-1/6 border-b border-[#c2c2c7] flex items-center px-2 xl:px-4 justify-between">
          <p className="font-medium text-lg md:text-xl">CONNECT WALLETS</p>
          <div
            className="bg-[#c2c2c7] border border-[#c2c2c7] p-1 rounded-sm hover:bg-white hover:border-black  transition-all duration-200"
            onClick={setActive}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 1L1 9M1 1L9 9"
                stroke="#050505"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="h-5/6 pt-2 px-2 xl:px-4">
          <p className=" mb-2 font-medium text-[14px]">SELECT A NETWORK</p>
          <div className="border border-[#c2c2c7] bg-[rgba(0,0,0,0.1] backdrop-blur-lg p-[2px] h-10 mb-2 rounded-md w-[66%] grid grid-cols-3 gap-x-[2px] shadow-lg">
            <SelectChain
              className={cosmSelected ? isActive : isInActive}
              image={cosmos}
              chainName="COSMOS"
              toggleSelect={cosmSelect}
            />
            <SelectChain
              className={solSelected ? isActive : isInActive}
              image={solana}
              chainName="SOL"
              toggleSelect={solSelect}
            />
            <SelectChain
              className={ethSelected ? isActive : isInActive}
              image={ethereum}
              chainName="EVM"
              toggleSelect={ethSelect}
            />
          </div>

          {cosmSelected && (
            <div className="grid grid-cols-4 gap-x-2">
              <WalletCard walletIcon={keplr} walletName="Keplr" />
              <WalletCard walletIcon={cosmostation} walletName="Cosmostation" />
              <WalletCard walletIcon={owallet} walletName="OWallet" />
              <WalletCard walletIcon={leap} walletName="Leap" />
            </div>
          )}
          {solSelected && (
            <div className="grid grid-cols-4 gap-x-2">
              <WalletCard walletIcon={phantom} walletName="Phantom" />
              <WalletCard walletIcon={solflare} walletName="Solflare" />
            </div>
          )}
          {ethSelected && (
            <div className="grid grid-cols-4 gap-x-2">
              <WalletCard walletIcon={metamask} walletName="Metamask" />
              <WalletCard walletIcon={rabby} walletName="Rabby" />
              <WalletCard walletIcon={coinbase} walletName="Coinbase" />
            </div>
          )}
          {/* <div className="grid grid-cols-4 gap-x-2"></div> */}
        </div>
      </div>
    </div>
  );
}

const WalletCard = ({
  walletName,
  walletIcon,
}: {
  walletName: string;
  walletIcon: string | StaticImageData;
}) => {
  return (
    <div className=" flex justify-center rounded-lg p-1 items-center flex-col h-20 hover:bg-[#c2c2c7]  transition-all duration-300">
      <Image
        className="w-10 rounded-md"
        src={walletIcon}
        width={500}
        height={500}
        alt=""
      />
      <p className="text-black  text-[10px] sm:text-[14px]">{walletName}</p>
    </div>
  );
};

const SelectChain = ({
  image,
  chainName,
  toggleSelect,
  className,
}: {
  image: string | StaticImageData;
  chainName: string;
  toggleSelect: any;
  className: string;
}) => {
  return (
    <div className={`${className}`} onClick={toggleSelect}>
      <Image
        className="w-3 h-3 md:h-5 md:w-5 rounded-full"
        src={image}
        height={500}
        width={500}
        alt="EVM"
      />
      <p className="font-medium text-[10px] sm:text-[12px] md:text-[14px]">
        {chainName}
      </p>
    </div>
  );
};

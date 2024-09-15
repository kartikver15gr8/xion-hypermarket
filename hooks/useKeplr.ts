// If we want to remain the user auto connected, then we can use the below one.

// "use client";

// import { useState, useEffect } from "react";
// import { Window as KeplrWindow } from "@keplr-wallet/types";
// import { NEUTRON_CHAIN_ID, neutronChainConfig } from "./neutronConfig";

// declare global {
//   interface Window extends KeplrWindow {}
// }

// export function useKeplr() {
//   const [keplrConnected, setKeplrConnected] = useState(false);
//   const [userAddress, setUserAddress] = useState<string | null>(null);

//   useEffect(() => {
//     const connectKeplr = async () => {
//       if (typeof window === "undefined") return;

//       if (window.keplr) {
//         try {
//           await window.keplr.experimentalSuggestChain(neutronChainConfig);
//           await window.keplr.enable(NEUTRON_CHAIN_ID);

//           const offlineSigner = window.keplr.getOfflineSigner(NEUTRON_CHAIN_ID);
//           const accounts = await offlineSigner.getAccounts();

//           if (accounts.length > 0) {
//             setKeplrConnected(true);
//             setUserAddress(accounts[0].address);
//           }
//         } catch (error) {
//           console.error("Failed to connect to Keplr:", error);
//         }
//       } else {
//         console.log("Keplr not found");
//       }
//     };

//     connectKeplr();
//   }, []);

//   const connectWallet = async () => {
//     if (typeof window === "undefined") return;

//     if (window.keplr) {
//       try {
//         await window.keplr.enable(NEUTRON_CHAIN_ID);
//         const offlineSigner = window.keplr.getOfflineSigner(NEUTRON_CHAIN_ID);
//         const accounts = await offlineSigner.getAccounts();

//         if (accounts.length > 0) {
//           setKeplrConnected(true);
//           setUserAddress(accounts[0].address);
//         }
//       } catch (error) {
//         console.error("Error connecting to Keplr:", error);
//       }
//     } else {
//       alert("Please install Keplr extension");
//     }
//   };

//   const disconnectWallet = () => {
//     setKeplrConnected(false);
//     setUserAddress(null);
//   };

//   return { keplrConnected, userAddress, connectWallet, disconnectWallet };
// }

// If we want to disconnect the user when they reload the page.

"use client";

import { useCallback, useEffect, useState } from "react";
import { Window as KeplrWindow, ChainInfo } from "@keplr-wallet/types";
import { NEUTRON_CHAIN_ID, neutronChainConfig } from "./neutronConfig";
import { StargateClient } from "@cosmjs/stargate";
import { useRecoilState } from "recoil";
import { walletState } from "@/store/atom/walletDetails";
import { userBalance } from "@/store/atom/userBalance";
import { toast } from "sonner";

declare global {
  interface Window extends KeplrWindow {}
}

export function useKeplr() {
  const [keplrConnected, setKeplrConnected] = useState(false);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [add, setAddr] = useRecoilState(walletState);
  const [bal, setBal] = useRecoilState(userBalance);

  const fetchBalance = useCallback(
    async (address: string) => {
      try {
        const client = await StargateClient.connect(neutronChainConfig.rpc);
        const balances = await client.getAllBalances(address);
        const nativeCoin = balances.find(
          (coin) =>
            coin.denom === neutronChainConfig.stakeCurrency.coinMinimalDenom
        );

        const formattedBalance = nativeCoin
          ? (
              parseInt(nativeCoin.amount) /
              Math.pow(10, neutronChainConfig.stakeCurrency.coinDecimals)
            ).toFixed(6)
          : "0";

        const balanceString = `${formattedBalance} ${neutronChainConfig.stakeCurrency.coinDenom}`;
        setBalance(balanceString);
        setBal(balanceString);
      } catch (error) {
        console.error("Error fetching balance:", error);
        setBalance("");
        setBal("");
      }
    },
    [setBal]
  );

  const connectWallet = useCallback(async () => {
    if (typeof window === "undefined") return;
    if (window.keplr) {
      try {
        await window.keplr.experimentalSuggestChain(
          neutronChainConfig as ChainInfo
        );
        await window.keplr.enable(NEUTRON_CHAIN_ID);
        const offlineSigner = window.keplr.getOfflineSigner(NEUTRON_CHAIN_ID);
        const accounts = await offlineSigner.getAccounts();
        if (accounts.length > 0) {
          setKeplrConnected(true);
          setUserAddress(accounts[0].address);
          setAddr(accounts[0].address);
          fetchBalance(accounts[0].address);
          toast.success("Wallet connected!");
        }
      } catch (error) {
        console.error("Error connecting to Keplr:", error);
        toast.error("Error connecting to Keplr");
      }
    } else {
      toast.info("Please install Keplr wallet extension!");
    }
  }, [setAddr, fetchBalance]);

  const disconnectWallet = useCallback(() => {
    if (window.confirm("Are you sure you want to disconnect your wallet?")) {
      setKeplrConnected(false);
      setUserAddress(null);
      setAddr("");
      setBalance("");
      setBal("");
      toast.info("Wallet disconnected!");
    }
  }, [setAddr, setBal]);

  useEffect(() => {
    if (keplrConnected && userAddress) {
      fetchBalance(userAddress);
    }
  }, [keplrConnected, userAddress, fetchBalance]);

  return {
    keplrConnected,
    userAddress,
    connectWallet,
    disconnectWallet,
    balance,
    add,
    bal,
  };
}

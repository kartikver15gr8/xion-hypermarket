"use client";

import { useState } from "react";
import { OfflineSigner } from "@cosmjs/proto-signing";
import { executeDepositNative } from "@/lib/cosm";
import { chains } from "chain-registry";
import loaderSVG from "@/public/loaders/loader.svg";
import Image from "next/image";
import { toast } from "sonner";

const chain = chains.find(({ chain_name }) => chain_name === "neutrontestnet")!;

const DepositNative = () => {
  const [amount, setAmount] = useState<string>("");
  const [transactionHash, setTransactionHash] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>("");

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
        walletAddress,
        amt.toString()
      );
      setLoading(false);
      setTransactionHash(txHash);
    } catch (err) {
      setLoading(false);
      console.error(err);
      setError("Failed to execute deposit");
    }
  };

  return (
    <div className="border w-fit rounded-xl border-black p-5">
      <h2>Deposit Native Tokens</h2>
      {!walletAddress ? (
        <button
          className="mt-2 bg-yellow-300 p-2 rounded border border-black"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      ) : (
        <div>
          <p>Connected wallet: {walletAddress}</p>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount to deposit"
          />
          {!isLoading && (
            <button
              className="bg-blue-400 p-2 rounded-lg"
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
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {transactionHash && <p>Transaction Hash: {transactionHash}</p>}
    </div>
  );
};

export default DepositNative;

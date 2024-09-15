"use client";

import { useState } from "react";
import { OfflineSigner } from "@cosmjs/proto-signing";
import { executeWithdraw } from "@/lib/cosm";
import { chains } from "chain-registry";

const chain = chains.find(({ chain_name }) => chain_name === "neutrontestnet")!;

const WithdrawNative = () => {
  const [amount, setAmount] = useState<string>("");
  const [transactionHash, setTransactionHash] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");

  const connectWallet = async () => {
    if (window.getOfflineSigner) {
      //@ts-ignore
      const offlineSigner: OfflineSigner = await window.getOfflineSignerAuto(
        chain.chain_id
      );
      const accounts = await offlineSigner.getAccounts();
      setWalletAddress(accounts[0].address);
    } else {
      console.error("Please install Keplr or Phantom wallet");
    }
  };

  const handleWithdraw = async () => {
    setError("");
    try {
      //@ts-ignore
      const offlineSigner: OfflineSigner = await window.getOfflineSignerAuto(
        chain.chain_id
      );
      const txHash = await executeWithdraw(
        offlineSigner,
        walletAddress,
        amount
      );
      setTransactionHash(txHash);
    } catch (err) {
      console.error(err);
      setError("Failed to execute withdraw");
    }
  };

  return (
    <div>
      <h2>Withdraw Native Tokens</h2>
      {!walletAddress ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p>Connected wallet: {walletAddress}</p>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount to withdraw"
          />
          <button onClick={handleWithdraw}>Withdraw</button>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {transactionHash && <p>Transaction Hash: {transactionHash}</p>}
    </div>
  );
};

export default WithdrawNative;

"use client";
import React, { useState } from "react";
import { phantomWallet } from "@/store/atom/phantomWallet";
import {
  Connection,
  PublicKey,
  Transaction,
  clusterApiUrl,
} from "@solana/web3.js";
import { useRecoilValue } from "recoil";
import { toast } from "sonner";
import { solanaMarketplaceProgram } from "@/utils/constants";

// Creating an instance of a new connection to devnet
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export default function RegisterSeller() {
  const walletAddress = useRecoilValue(phantomWallet);
  const [isRegistering, setIsRegistering] = useState(false);

  const registerSellerTransaction = async () => {
    if (!walletAddress) {
      toast.error("Please connect your wallet first");
      return;
    }

    setIsRegistering(true);

    try {
      const publicKey = new PublicKey(walletAddress);

      const tx = await solanaMarketplaceProgram.methods
        .registerSeller()
        .accounts({
          seller: publicKey,
        })
        .transaction();

      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash();

      const transaction = new Transaction().add(tx);
      transaction.feePayer = publicKey;
      transaction.recentBlockhash = blockhash;

      const { solana } = window as any;
      if (!solana?.isPhantom) {
        throw new Error("Phantom wallet is not installed!");
      }

      const signedTransaction = await solana.signTransaction(transaction);
      const signature = await connection.sendRawTransaction(
        signedTransaction.serialize()
      );

      toast.info("Transaction sent", { description: signature });

      const confirmation = await connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight,
      });

      if (confirmation.value.err) {
        throw new Error(
          "Transaction failed: " + JSON.stringify(confirmation.value.err)
        );
      }

      toast.success("Successfully registered as a seller!", {
        description: signature,
      });
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(`Registration failed: ${error} `);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="pt-16 border p-4">
      <h2 className="text-2xl font-bold mb-4">Register as a Seller</h2>
      <p className="mb-4">
        Click the button below to register as a seller on our marketplace.
      </p>
      <button
        onClick={registerSellerTransaction}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        disabled={isRegistering || !walletAddress}
      >
        {isRegistering ? "Registering..." : "Register as Seller"}
      </button>
      {!walletAddress && (
        <p className="mt-2 text-red-500">Please connect your wallet first.</p>
      )}
    </div>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import { phantomWallet } from "@/store/atom/phantomWallet";
import {
  Connection,
  PublicKey,
  Transaction,
  clusterApiUrl,
  Commitment,
} from "@solana/web3.js";
import { useRecoilValue } from "recoil";
import { toast } from "sonner";
import { solanaMarketplaceProgram } from "@/utils/constants";

interface PhantomWindow extends Window {
  solana?: {
    isPhantom?: boolean;
    signTransaction(transaction: Transaction): Promise<Transaction>;
  };
}

declare const window: PhantomWindow;

const RegisterSellerClient: React.FC = () => {
  const [connection, setConnection] = useState<Connection | null>(null);
  const walletAddress = useRecoilValue(phantomWallet);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  useEffect(() => {
    const commitment: Commitment = "confirmed";
    setConnection(new Connection(clusterApiUrl("devnet"), commitment));
  }, []);

  const registerSellerTransaction = async (): Promise<void> => {
    if (!walletAddress) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!connection) {
      toast.error("Connection not established");
      return;
    }

    try {
      setIsRegistering(true);

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

      const { solana } = window;
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
      toast.error(
        `Registration failed: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="pt-16">
      <button
        onClick={registerSellerTransaction}
        className="px-4 py-2 bg-[#223D40] text-white rounded-lg hover:bg-[#426d72] transition-colors"
        disabled={isRegistering || !walletAddress}
      >
        {isRegistering ? "Registering..." : "Register as Seller"}
      </button>
      {!walletAddress && (
        <p className="mt-2 text-red-500 text-sm">
          Please connect your wallet first.
        </p>
      )}
    </div>
  );
};

export default RegisterSellerClient;

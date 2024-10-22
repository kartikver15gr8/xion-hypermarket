"use client";
import React, { useEffect, useState } from "react";
import { phantomWallet } from "@/store/atom/phantomWallet";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction,
  clusterApiUrl,
  Commitment,
} from "@solana/web3.js";
import { toast } from "sonner";
import { solanaMarketplaceProgram } from "@/utils/constants";
import { BN } from "@coral-xyz/anchor";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { ProductInterface } from "@/lib/models";
import { getPdas } from "@/utils/helpers";
import { useRouter } from "next/navigation";

interface PhantomWindow extends Window {
  solana?: {
    isPhantom?: boolean;
    signTransaction(transaction: Transaction): Promise<Transaction>;
  };
}

declare const window: PhantomWindow;

export default function ClaimPurchaseClient({
  buyerWalletAddress,
}: {
  buyerWalletAddress: string;
}) {
  const [connection, setConnection] = useState<Connection | null>(null);
  const walletAddress = useRecoilValue(phantomWallet);
  const [isClaiming, setIsClaiming] = useState<boolean>(false);

  useEffect(() => {
    const commitment: Commitment = "confirmed";
    setConnection(new Connection(clusterApiUrl("devnet"), commitment));
  }, []);

  const claimTransaction = async (): Promise<void> => {
    if (!walletAddress) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!connection) {
      toast.error("Connection not established");
      return;
    }

    try {
      setIsClaiming(true);

      const publicKey = new PublicKey(walletAddress);
      const tx = await solanaMarketplaceProgram.methods
        .claimPayout()
        .accounts({
          seller: publicKey, // seller is the signer
          buyer: buyerWalletAddress,
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

      toast.success("Successfully claimed!", {
        description: signature,
      });
    } catch (error) {
      console.error("Claiming error:", error);
      toast.error(
        `Claiming failed: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <button
      onClick={claimTransaction}
      className="text-[9px] md:text-[13px] w-20 rounded-md h-6 bg-black text-white col-span-1 hover:bg-[#5a5c5d] transition-all duration-300"
      disabled={isClaiming || !walletAddress}
    >
      {isClaiming ? "Claiming..." : "Claim"}
    </button>
  );
}

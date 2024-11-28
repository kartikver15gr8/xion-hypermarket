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
import { userIdState } from "@/store/atom/userIdState";
import axios from "axios";
import { usePrivy } from "@privy-io/react-auth";

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
  const userIdFromRecoil = useRecoilValue(userIdState);
  const { user, authenticated, getAccessToken } = usePrivy();

  const [accessToken, setAccessToken] = useState<string | null>("");

  useEffect(() => {
    const setAccessTokenUser = async () => {
      try {
        const token = await getAccessToken();
        if (token) {
          setAccessToken(token);
        }
      } catch (error) {
        console.log("Unable to set Access token");
      }
    };
    const commitment: Commitment = "confirmed";
    setConnection(new Connection(clusterApiUrl("devnet"), commitment));
    setAccessTokenUser();
  }, []);

  const registerSellerTransaction = async () => {
    if (!user?.wallet?.address) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!connection) {
      toast.error("Connection not established");
      return;
    }

    try {
      setIsRegistering(true);

      const publicKey = new PublicKey(user.wallet.address);
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

      return signature;
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

  const updateTransactionHash = async (tx_hash: string) => {
    try {
      const formData = new FormData();
      formData.append("seller_reg_tx_hash", tx_hash);

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_SWAGGER_API_V2}/admin/user`,
        formData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(`you got an error: ${error}`);
    }
  };

  const handleOnClick = async () => {
    setIsRegistering(true);
    try {
      const signature = await registerSellerTransaction();
      if (signature) {
        await updateTransactionHash(signature);
      } else {
        toast.error("Registration process failed. Please try again.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="">
      <button
        onClick={handleOnClick}
        className="px-4 py-2 w-full bg-[#223D40] text-white rounded-md hover:bg-[#426d72] transition-colors"
        disabled={isRegistering || !walletAddress}
      >
        {isRegistering ? "Registering..." : `Register as Seller`}
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

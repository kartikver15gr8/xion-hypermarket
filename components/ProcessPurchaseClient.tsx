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

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export default function ProcessPurchaseClient({
  productId,
}: {
  productId: number;
}) {
  const router = useRouter();

  const walletAddress = useRecoilValue(phantomWallet);
  const [productById, setProductById] = useState<ProductInterface | null>(null);
  const [sellerWalletAddress, setSellerWalletAddress] = useState("");
  const [connection, setConnection] = useState<Connection | null>(null);
  const [transactionHash, setTransactionHash] = useState("");
  const [loading, setLoading] = useState(false);

  const [buyerId, setBuyerId] = useState(0);

  const fetchBuyerId = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/fetch/user/${walletAddress}`
      );
      console.log(`This is the user credentials ${response.data}`);
      console.log(response.data.ID);

      setBuyerId(response.data.ID);
      return response.data.ID;
    } catch (error) {
      console.log(`You got an error while fetching the buyer id: ${error}`);
    }
  };

  useEffect(() => {
    const commitment: Commitment = "confirmed";
    setConnection(new Connection(clusterApiUrl("devnet"), commitment));
  }, []);

  const fetchProductData = async () => {
    try {
      console.log(`Fetching product with ID: ${productId}`);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/fetch/products?product_id=${productId}`
      );

      if (response.data && response.data.length > 0) {
        console.log("Product Details:", response.data[0]);
        setProductById(response.data[0]);
      } else {
        console.error("No product found for the given ID.");
      }
    } catch (error) {
      console.error(`Error fetching product data: ${error}`);
    }
  };

  const getSellerData = async () => {
    if (!productById) return;

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/fetch/users?user_id=${productById.UserID}`
      );

      if (response.data && response.data.length > 0) {
        console.log("Seller Details:", response.data[0]);
        setSellerWalletAddress(response.data[0].WalletAddress);
      } else {
        console.error("No seller found for the given UserID.");
      }
    } catch (error) {
      console.error(`Error fetching seller data: ${error}`);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProductData();
    }
  }, [productId]);

  useEffect(() => {
    if (productById) {
      getSellerData();
    }
  }, [productById]);

  useEffect(() => {
    if (walletAddress) {
      fetchBuyerId();
    }
  }, []);

  const buyProduct = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/purchases`,
        {
          affiliate_link_id: 0,
          amount: Number(productById?.Price),
          product_id: productId,
          status: 1,
          transaction_hash: "",
          user_id: buyerId,
        }
      );

      console.log(response.data);
      router.push(`/library/${buyerId}`);
    } catch (error) {
      console.log("Error while making the buy product function call.");
    }
  };

  const makeProcessPurchase = async () => {
    if (!walletAddress) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!connection) {
      toast.error("Connection not established");
      return;
    }

    try {
      if (productById) {
        const amount_lamports = parseInt(productById?.Price) * LAMPORTS_PER_SOL;

        const buyerPubKey = new PublicKey(walletAddress);
        const sellerPubKey = new PublicKey(sellerWalletAddress);
        console.log("buyerPubkey", buyerPubKey.toBase58());
        console.log("sellerPubkey", sellerPubKey.toBase58());
        // get PDA
        const pdas = await getPdas();
        console.log("PDAS: ", JSON.stringify(pdas));

        console.log("SellerLevelList", pdas.sellersLevelList.toBase58());

        const tx = await solanaMarketplaceProgram.methods
          .processPurchase({
            productId: new BN(productId),
            priceLamports: new BN(amount_lamports),
            affiliate: null,
          })
          .accounts({
            buyer: buyerPubKey,
            seller: sellerPubKey,
            sellersLevelList: pdas.sellersLevelList,
          })
          .transaction();

        const { blockhash, lastValidBlockHeight } =
          await connection.getLatestBlockhash();

        const transaction = new Transaction().add(tx);
        transaction.feePayer = buyerPubKey;
        transaction.recentBlockhash = blockhash;

        const { solana } = window;
        if (!solana?.isPhantom) {
          throw new Error("Phantom wallet is not installed!");
        }

        const signedTransaction = await solana.signTransaction(transaction);
        const signature = await connection.sendRawTransaction(
          signedTransaction.serialize()
        );

        if (signature) {
          setTransactionHash(signature);
        }
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

        toast.success("Transaction successful!", {
          description: signature,
        });
      } else {
        console.log("No productById");
      }
    } catch (error) {
      console.log(`Error while processing purchase: ${error}`);
      toast.error(`Registration failed: ${error} `);
    }
  };

  const handleOnClick = async () => {
    try {
      setLoading(true);
      await makeProcessPurchase();
      await buyProduct();
      setLoading(false);
    } catch (error) {
      console.log("Error while triggering handle handleOnClick!");
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full border border-black rounded-md bg-black">
      {productById && (
        <div>
          {/* <h2>Product Name: {productById.Name}</h2>
          <p>Price: {productById.Price}</p>
          <p>TransactionHash:{transactionHash}</p>
          <p>BuyerID: {buyerId}</p>
          <p>SellerWalletAddress: {sellerWalletAddress} </p>
          <p>Buyer Address: {walletAddress}</p>
          <button
            className="border p-2 rounded-lg m-1 text-white bg-black font-medium  hover:bg-[#095492] transition-all duration-200"
            onClick={handleOnClick}
          >
            Buy Now!
          </button> */}
          {buyerId && sellerWalletAddress && walletAddress ? (
            <button
              className="rounded-lg text-white bg-inherit font-medium h-14 w-full hover:bg-[#095492] transition-all duration-200"
              onClick={handleOnClick}
            >
              {loading ? "Loading…" : "Buy Now!"}
            </button>
          ) : (
            <button
              className="rounded-lg text-white bg-inherit font-medium h-14 w-full hover:bg-[#095492] transition-all duration-200"
              onClick={handleOnClick}
              disabled={true}
            >
              Buy Now!
            </button>
          )}
        </div>
      )}
    </div>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import { phantomWallet } from "@/store/atom/phantomWallet";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction,
  clusterApiUrl,
} from "@solana/web3.js";
import { toast } from "sonner";
import { solanaMarketplaceProgram } from "@/utils/constants";
import { BN } from "@coral-xyz/anchor";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { ProductInterface } from "@/lib/models";
import { getPdas } from "@/utils/helpers";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export default function ProcessPurchase({ productId }: { productId: number }) {
  const walletAddress = useRecoilValue(phantomWallet);
  const [productById, setProductById] = useState<ProductInterface | null>(null);
  const [sellerWalletAddress, setSellerWalletAddress] = useState("");

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

  const makeProcessPurchase = async () => {
    if (!walletAddress) {
      toast.error("Please connect your wallet first");
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
      } else {
        console.log("No productById");
      }
    } catch (error) {
      console.log(`Error while processing purchase: ${error}`);
      toast.error(`Registration failed: ${error} `);
    }
  };

  return (
    <div className="pt-16 border">
      <div>Hello</div>
      {productById && (
        <div>
          <h2>Product Name: {productById.Name}</h2>
          <p>Price: {productById.Price}</p>
          <p>SellerWalletAddress: {sellerWalletAddress} </p>
          <p>Buyer Address: {walletAddress}</p>
          <button
            className="border p-2 rounded-lg m-1"
            onClick={makeProcessPurchase}
          >
            process purchase
          </button>
        </div>
      )}
    </div>
  );
}
// "use client";

// import React, { useEffect, useState } from "react";
// import { phantomWallet } from "@/store/atom/phantomWallet";
// import {
//   Connection,
//   LAMPORTS_PER_SOL,
//   PublicKey,
//   Transaction,
//   clusterApiUrl,
//   SystemProgram,
// } from "@solana/web3.js";
// import { toast } from "sonner";
// import { solanaMarketplaceProgram } from "@/utils/constants";
// import { BN } from "@coral-xyz/anchor";
// import { useRecoilValue } from "recoil";
// import axios from "axios";
// import { ProductInterface } from "@/lib/models";
// import { getPdas } from "@/utils/helpers";

// const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// interface KeyBumpPair {
//   key: PublicKey;
//   bump: number;
// }

// export default function SolanaMarketplaceComponent({
//   productId,
// }: {
//   productId: number;
// }) {
//   const walletAddress = useRecoilValue(phantomWallet);
//   const [productById, setProductById] = useState<ProductInterface | null>(null);
//   const [sellerWalletAddress, setSellerWalletAddress] = useState("");
//   const [isInitialized, setIsInitialized] = useState(false);

//   useEffect(() => {
//     if (productId) {
//       fetchProductData();
//     }
//   }, [productId]);

//   useEffect(() => {
//     if (productById) {
//       getSellerData();
//     }
//   }, [productById]);

//   useEffect(() => {
//     checkInitialization();
//   }, []);

//   const fetchProductData = async () => {
//     try {
//       console.log(`Fetching product with ID: ${productId}`);
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/fetch/products?product_id=${productId}`
//       );

//       if (response.data && response.data.length > 0) {
//         console.log("Product Details:", response.data[0]);
//         setProductById(response.data[0]);
//       } else {
//         console.error("No product found for the given ID.");
//       }
//     } catch (error) {
//       console.error(`Error fetching product data: ${error}`);
//     }
//   };

//   const getSellerData = async () => {
//     if (!productById) return;

//     try {
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/fetch/users?user_id=${productById.UserID}`
//       );

//       if (response.data && response.data.length > 0) {
//         console.log("Seller Details:", response.data[0]);
//         setSellerWalletAddress(response.data[0].WalletAddress);
//       } else {
//         console.error("No seller found for the given UserID.");
//       }
//     } catch (error) {
//       console.error(`Error fetching seller data: ${error}`);
//     }
//   };

//   const checkInitialization = async () => {
//     try {
//       const pdas = await getPdas();
//       // const contractStateInfo = await connection.getAccountInfo(
//       //   pdas.contractState
//       // );
//       const contractStateInfo = await connection.getAccountInfo(
//         (pdas.contractState as KeyBumpPair).key
//       );
//       console.log("contractStateInfo", JSON.stringify(contractStateInfo));

//       const sellersLevelListInfo = await connection.getAccountInfo(
//         pdas.sellersLevelList
//       );
//       //@ts-ignore
//       const protocolFeeInfo = await connection.getAccountInfo(pdas.protocolFee);
//       console.log("protocolFeeInfo", JSON.stringify(protocolFeeInfo));
//       setIsInitialized(
//         contractStateInfo !== null &&
//           sellersLevelListInfo !== null &&
//           protocolFeeInfo !== null
//       );
//     } catch (error) {
//       console.error("Error checking initialization:", error);
//       toast.error("Failed to check initialization status");
//     }
//   };

//   const initializeMarketplace = async () => {
//     if (!walletAddress) {
//       toast.error("Please connect your wallet first");
//       return;
//     }

//     try {
//       const pdas = await getPdas();
//       const managerPubKey = new PublicKey(walletAddress);

//       const tx = await solanaMarketplaceProgram.methods
//         .initialize()
//         .accounts({
//           //@ts-ignore
//           contractState: pdas.contractState,
//           sellersLevelList: pdas.sellersLevelList,
//           manager: managerPubKey,
//           protocolFee: pdas.protocolFee,
//           systemProgram: SystemProgram.programId,
//         })
//         .transaction();

//       const { blockhash, lastValidBlockHeight } =
//         await connection.getLatestBlockhash();
//       const transaction = new Transaction().add(tx);
//       transaction.feePayer = managerPubKey;
//       transaction.recentBlockhash = blockhash;

//       const { solana } = window as any;
//       if (!solana?.isPhantom) {
//         throw new Error("Phantom wallet is not installed!");
//       }

//       const signedTransaction = await solana.signTransaction(transaction);
//       const signature = await connection.sendRawTransaction(
//         signedTransaction.serialize()
//       );

//       toast.info("Initialization transaction sent", { description: signature });

//       const confirmation = await connection.confirmTransaction({
//         signature,
//         blockhash,
//         lastValidBlockHeight,
//       });

//       if (confirmation.value.err) {
//         throw new Error(
//           "Initialization failed: " + JSON.stringify(confirmation.value.err)
//         );
//       }

//       toast.success("Marketplace initialized successfully!");
//       setIsInitialized(true);
//     } catch (error) {
//       console.error("Error initializing marketplace:", error);
//       toast.error(`Initialization failed: ${error}`);
//     }
//   };

//   const processPurchase = async () => {
//     if (!walletAddress) {
//       toast.error("Please connect your wallet first");
//       return;
//     }

//     if (!isInitialized) {
//       toast.error("Marketplace is not initialized. Please initialize first.");
//       return;
//     }

//     try {
//       if (productById) {
//         const amount_lamports = parseInt(productById?.Price) * LAMPORTS_PER_SOL;

//         const buyerPubKey = new PublicKey(walletAddress);
//         const sellerPubKey = new PublicKey(sellerWalletAddress);
//         const pdas = await getPdas();

//         const tx = await solanaMarketplaceProgram.methods
//           .processPurchase({
//             priceLamports: new BN(amount_lamports),
//             affiliate: null,
//           })
//           .accounts({
//             buyer: buyerPubKey,
//             seller: sellerPubKey,
//             sellersLevelList: pdas.sellersLevelList,
//           })
//           .transaction();

//         const { blockhash, lastValidBlockHeight } =
//           await connection.getLatestBlockhash();
//         const transaction = new Transaction().add(tx);
//         transaction.feePayer = buyerPubKey;
//         transaction.recentBlockhash = blockhash;

//         const { solana } = window as any;
//         if (!solana?.isPhantom) {
//           throw new Error("Phantom wallet is not installed!");
//         }

//         const signedTransaction = await solana.signTransaction(transaction);
//         const signature = await connection.sendRawTransaction(
//           signedTransaction.serialize()
//         );

//         toast.info("Purchase transaction sent", { description: signature });

//         const confirmation = await connection.confirmTransaction({
//           signature,
//           blockhash,
//           lastValidBlockHeight,
//         });

//         if (confirmation.value.err) {
//           throw new Error(
//             "Purchase failed: " + JSON.stringify(confirmation.value.err)
//           );
//         }

//         toast.success("Purchase processed successfully!");
//       } else {
//         console.log("No productById");
//         toast.error("Product details not available");
//       }
//     } catch (error) {
//       console.error("Error processing purchase:", error);
//       toast.error(`Purchase failed: ${error}`);
//     }
//   };

//   return (
//     <div className="pt-16 border">
//       <h1 className="text-2xl font-bold mb-4">Solana Marketplace</h1>

//       {!isInitialized && (
//         <div className="mb-4">
//           <p className="text-red-500">Marketplace is not initialized</p>
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//             onClick={initializeMarketplace}
//           >
//             Initialize Marketplace
//           </button>
//         </div>
//       )}

//       {isInitialized && productById && (
//         <div className="mb-4">
//           <h2 className="text-xl font-semibold">Product: {productById.Name}</h2>
//           <p>Price: {productById.Price} SOL</p>
//           <p>Seller: {sellerWalletAddress}</p>
//           <p>Buyer: {walletAddress}</p>
//           <button
//             className="bg-green-500 text-white px-4 py-2 rounded mt-2"
//             onClick={processPurchase}
//           >
//             Process Purchase
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

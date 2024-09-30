import {
  ActionError,
  ActionPostResponse,
  createPostResponse,
} from "@solana/actions";
import {
  agent,
  connection,
  headers,
  solanaMarketplaceProgram,
} from "./constants";
import axios from "axios";
import { PublicKey, Transaction } from "@solana/web3.js";
import { PDA } from "./pdas";

export function getDefaultThumbnail() {
  const defaultThumbnail = process.env.NEXT_PUBLIC_DEFAULT_THUMBNAIL;
  if (!defaultThumbnail) {
    throw new Error("Default thumbnail is not set");
  }
  return defaultThumbnail;
}

export function handleError(err: unknown) {
  console.error(err);
  const actionError: ActionError = {
    message: typeof err === "string" ? err : "An unknown error occurred",
  };
  return Response.json(actionError, { status: 400, headers });
}

export async function fetchProduct(productId: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/fetch/products`,
      {
        params: { product_id: productId },
        httpsAgent: agent,
      }
    );
    return response.data[0]; // Assuming we always want the first item
  } catch (err) {
    console.error(`Error fetching product: ${err}`);
    throw err; // Propagate the error
  }
}

export async function fetchUser(userId: number) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/fetch/users?user_id=${userId}`,
      {
        httpsAgent: agent,
      }
    );
    return response.data;
  } catch (err) {
    console.error(`Error fetching user: ${err}`);
    throw err; // Propagate the error
  }
}

export async function fetchUserByAddress(address: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/fetch/users?wallet_address=${address}`,
      {
        httpsAgent: agent,
      }
    );
    return response.data;
  } catch (err) {
    console.error(`Error fetching user: ${err}`);
    throw err; // Propagate the error
  }
}

export function getPublicKey(address: string) {
  let publicKey: PublicKey;
  try {
    publicKey = new PublicKey(address);

    return publicKey;
  } catch {
    console.error(`Invalid "account" provided: ${address}`);
    throw new Error(`Invalid "account" provided: ${address}`);
  }
}

export async function getPdas() {
  const managerPubkey = getPublicKey(
    process.env.NEXT_PUBLIC_MANAGER_PUBKEY || ""
  );
  if (!managerPubkey) {
    throw new Error("Manager public key is not set");
  }

  let pdas: PDA;

  try {
    pdas = await PDA.new(solanaMarketplaceProgram.programId, managerPubkey);
  } catch (error) {
    console.error("Error creating PDAs", error);
    throw error;
  }

  return pdas;
}

export async function buildPostResponse(
  tx: Transaction,
  feePayer: PublicKey,
  message: string
) {
  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash();

  const transaction = new Transaction({
    feePayer,
    blockhash,
    lastValidBlockHeight,
  }).add(tx);

  const payload: ActionPostResponse = await createPostResponse({
    fields: {
      //@ts-ignore
      type: "transaction",
      transaction,
      message,
    },
  });

  return Response.json(payload, {
    headers,
  });
}

export async function fetchPurchase(productId: string, userId: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/fetch/purchases?product_id=${productId}&user_id=${userId}`,
      {
        httpsAgent: agent,
      }
    );
    return response.data;
  } catch (err) {
    console.error(`Error fetching purchase: ${err}`);
    throw err; // Propagate the error
  }
}

export async function postReview(
  comment: string | null,
  rating: number,
  userId: string,
  productId: string
) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/reviews`,
      {
        httpsAgent: agent,
        data: {
          comment: comment || null,
          rating,
          user_id: userId,
          product_id: productId,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error(`Error posting review: ${err}`);
    throw err;
  }
}

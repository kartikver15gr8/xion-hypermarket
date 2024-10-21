import {
  ActionPostResponse,
  createPostResponse,
  ActionGetResponse,
  ActionPostRequest,
  createActionHeaders,
  ActionError,
} from "@solana/actions";
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { DEFAULT_SOL_AMOUNT, DEFAULT_SOL_ADDRESS } from "../const";

import { ACTIONS_CORS_HEADERS, MEMO_PROGRAM_ID } from "@solana/actions";
import { ComputeBudgetProgram, TransactionInstruction } from "@solana/web3.js";
import axios from "axios";

import https from "https";

const headers = createActionHeaders();

const agent = new https.Agent({
  rejectUnauthorized: false,
});

export const GET = async (req: Request) => {
  const url = req.url;
  // console.log(`this is the dynamic url: ${url}`);
  let a = url.split("/buy/");
  let productId = a[1];

  // console.log(`This is the productId: ${productId}`);
  //   http://localhost:3000/api/actions/buy/9

  let dataTwo;

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/fetch/products?product_id=${productId}`,
      {
        httpsAgent: agent,
      }
    );
    dataTwo = await response.data;
    // console.log(dataTwo);
    // console.log(dataTwo[0].Price);
  } catch (err) {
    console.log(`Error: ${err}`);
  }

  // This is the current data fetching
  let data;
  try {
    // const response = await fetch(`/api/getdata`);
    // data = await response.json();
    const apiUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api/getdata"
        : "https://hypermarket.vercel.app/api/getdata";
    const response = await axios.get(apiUrl);
    data = await response.data;
  } catch (err) {
    console.log(`Error: ${err}`);
  }

  try {
    const requestUrl = new URL(req.url);
    const { toPubkey } = validatedQueryParams(requestUrl);

    const baseHref = new URL(
      `/api/actions/buy?to=${toPubkey.toBase58()}`,
      requestUrl.origin
    ).toString();

    const payload: ActionGetResponse = {
      icon: `${dataTwo[0].ThumbnailUrl}`,
      label: dataTwo[0].Price,
      description: dataTwo[0].Description,
      title: dataTwo[0].Name,
      links: {
        actions: [
          {
            label: `${dataTwo[0].Price} SOL`,
            href: `/api/actions/buy?amount=${data.amount}`,
          },
          // {
          //   label: "0.5 SOL",
          //   href: "/api/actions/donate?amount=0.5",
          // },
          // {
          //   label: "1.0 SOL",
          //   href: "/api/actions/donate?amount=1.0",
          // },
          // {
          //   href: "/api/actions/donate?amount={amount}",
          //   label: "SEND",
          //   parameters: [
          //     {
          //       name: "amount",
          //       label: "Enter the amount",
          //     },
          //   ],
          // },
        ],
      },
    };

    return Response.json(payload, {
      headers,
    });
  } catch (err) {
    console.log(err);
    let actionError: ActionError = { message: "An unknown error occurred" };
    if (typeof err == "string") actionError.message = err;
    return Response.json(actionError, {
      status: 400,
      headers,
    });
  }
};

// DO NOT FORGET TO INCLUDE THE `OPTIONS` HTTP METHOD
// THIS WILL ENSURE CORS WORKS FOR BLINKS
export const OPTIONS = async () => Response.json(null, { headers });

export const POST = async (req: Request) => {
  try {
    const requestUrl = new URL(req.url);
    const { amount, toPubkey } = validatedQueryParams(requestUrl);

    const body: ActionPostRequest = await req.json();

    // validate the client provided input
    let account: PublicKey;
    try {
      account = new PublicKey(body.account);
    } catch (err) {
      throw 'Invalid "account" provided';
    }

    const connection = new Connection(
      process.env.SOLANA_RPC! || clusterApiUrl("devnet")
    );

    // ensure the receiving account will be rent exempt
    const minimumBalance = await connection.getMinimumBalanceForRentExemption(
      0 // note: simple accounts that just store native SOL have `0` bytes of data
    );
    if (amount * LAMPORTS_PER_SOL < minimumBalance) {
      throw `account may not be rent exempt: ${toPubkey.toBase58()}`;
    }

    // create an instruction to transfer native SOL from one wallet to another
    const transferSolInstruction = SystemProgram.transfer({
      fromPubkey: account,
      toPubkey: toPubkey,
      lamports: amount * LAMPORTS_PER_SOL,
    });

    // get the latest blockhash amd block height
    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash();

    // create a legacy transaction
    const transaction = new Transaction({
      feePayer: account,
      blockhash,
      lastValidBlockHeight,
    }).add(transferSolInstruction);

    // versioned transactions are also supported
    // const transaction = new VersionedTransaction(
    //   new TransactionMessage({
    //     payerKey: account,
    //     recentBlockhash: blockhash,
    //     instructions: [transferSolInstruction],
    //   }).compileToV0Message(),
    //   // note: you can also use `compileToLegacyMessage`
    // );

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        message: `Send ${amount} SOL to ${toPubkey.toBase58()}`,
      },
      // note: no additional signers are needed
      // signers: [],
    });

    return Response.json(payload, {
      headers,
    });
  } catch (err) {
    console.log(err);
    let actionError: ActionError = { message: "An unknown error occurred" };
    if (typeof err == "string") actionError.message = err;
    return Response.json(actionError, {
      status: 400,
      headers,
    });
  }
};

function validatedQueryParams(requestUrl: URL) {
  let toPubkey: PublicKey = DEFAULT_SOL_ADDRESS;
  let amount: number = DEFAULT_SOL_AMOUNT;

  try {
    if (requestUrl.searchParams.get("to")) {
      toPubkey = new PublicKey(requestUrl.searchParams.get("to")!);
    }
  } catch (err) {
    throw "Invalid input query parameter: to";
  }

  try {
    if (requestUrl.searchParams.get("amount")) {
      amount = parseFloat(requestUrl.searchParams.get("amount")!);
    }

    if (amount <= 0) throw "amount is too small";
  } catch (err) {
    throw "Invalid input query parameter: amount";
  }

  return {
    amount,
    toPubkey,
  };
}

// import {
//   ActionGetResponse,
//   ActionPostRequest,
//   ActionPostResponse,
//   ACTIONS_CORS_HEADERS,
//   createPostResponse,
//   MEMO_PROGRAM_ID,
// } from "@solana/actions";
// import {
//   clusterApiUrl,
//   ComputeBudgetProgram,
//   Connection,
//   LAMPORTS_PER_SOL,
//   PublicKey,
//   SystemProgram,
//   Transaction,
//   TransactionInstruction,
// } from "@solana/web3.js";
// import axios from "axios";

// export const GET = async (req: Request) => {
//   console.log(`This is the URL: ${req.url}`);

//   let data;

//   try {
//     // const response = await fetch(`/api/getdata`);
//     // data = await response.json();
//     const apiUrl =
//       process.env.NODE_ENV === "development"
//         ? "http://localhost:3000/api/getdata"
//         : "https://hypermarket.vercel.app/api/getdata";
//     const response = await axios.get(apiUrl);
//     data = await response.data;
//   } catch (err) {
//     console.log(`Error: ${err}`);
//   }

//   console.log(data);

//   const payload: ActionGetResponse = {
//     icon: data.icon,
//     label: data.label,
//     description: data.description,
//     title: data.title,
//     links: {
//       actions: [
//         {
//           label: `${data.amount} SOL`,
//           href: `/api/actions/buy?amount=${data.amount}`,
//         },
//         // {
//         //   label: "0.5 SOL",
//         //   href: "/api/actions/donate?amount=0.5",
//         // },
//         // {
//         //   label: "1.0 SOL",
//         //   href: "/api/actions/donate?amount=1.0",
//         // },
//         // {
//         //   href: "/api/actions/donate?amount={amount}",
//         //   label: "SEND",
//         //   parameters: [
//         //     {
//         //       name: "amount",
//         //       label: "Enter the amount",
//         //     },
//         //   ],
//         // },
//       ],
//     },
//   };

//   return Response.json(payload, {
//     headers: ACTIONS_CORS_HEADERS,
//   });
// };

// export const OPTIONS = GET;

// export const POST = async (req: Request) => {
//   try {
//     const url = new URL(req.url);

//     const body: ActionPostRequest = await req.json();
//     let account: PublicKey;

//     try {
//       account = new PublicKey(body.account);
//     } catch (err) {
//       return Response.json({ msg: `Invalid Account :${err}` });
//     }

//     let amount: number = 0.1;

//     if (url.searchParams.has("amount")) {
//       try {
//         amount = parseFloat(url.searchParams.get("amount") || "0.1") || amount;
//       } catch (err) {
//         throw "Invalid Amount";
//       }
//     }
//     // in production we'll be using our RPC endpoint not the devnet
//     const connection = new Connection(clusterApiUrl("devnet"));

//     const TO_PUBKEY = new PublicKey(
//       "E9sU45SWLZEJogtozasfpSRED5Km3zuov8BXunNtgxcP"
//     );

//     const transaction = new Transaction().add(
//       SystemProgram.transfer({
//         fromPubkey: account,
//         lamports: amount * LAMPORTS_PER_SOL,
//         toPubkey: TO_PUBKEY,
//         programId: SystemProgram.programId,
//       })
//     );

//     transaction.feePayer = account;
//     transaction.recentBlockhash = (
//       await connection.getLatestBlockhash()
//     ).blockhash;

//     const payload: ActionPostResponse = await createPostResponse({
//       fields: {
//         transaction,
//         message: "Thanks for the coffee fren :)",
//       },
//     });
//     return Response.json(payload, {
//       headers: ACTIONS_CORS_HEADERS,
//     });
//   } catch (err) {
//     return Response.json({ msg: `Error: ${err}` });
//   }
// };

// import {
//   ActionGetResponse,
//   ActionPostRequest,
//   ActionPostResponse,
//   ACTIONS_CORS_HEADERS,
//   createPostResponse,
//   MEMO_PROGRAM_ID,
// } from "@solana/actions";
// import {
//   clusterApiUrl,
//   ComputeBudgetProgram,
//   Connection,
//   LAMPORTS_PER_SOL,
//   PublicKey,
//   SystemProgram,
//   Transaction,
//   TransactionInstruction,
// } from "@solana/web3.js";

// export const GET = async (req: Request) => {
//   const payload: ActionGetResponse = {
//     icon: new URL("/opengraph-image.png", new URL(req.url).origin).toString(),
//     label: "Buy me a coffee",
//     description: "Buy me a coffee with SOL",
//     title: "Kartikey Verma - Buy Me a Coffee",
//     links: {
//       actions: [
//         {
//           label: "0.1 SOL",
//           href: "/api/actions/donate?amount=0.1",
//         },
//         {
//           label: "0.5 SOL",
//           href: "/api/actions/donate?amount=0.5",
//         },
//         {
//           label: "1.0 SOL",
//           href: "/api/actions/donate?amount=1.0",
//         },
//         {
//           href: "/api/actions/donate?amount={amount}",
//           label: "SEND",
//           parameters: [
//             {
//               name: "amount",
//               label: "Enter the amount",
//             },
//           ],
//         },
//       ],
//     },
//   };

//   return Response.json(payload, {
//     headers: ACTIONS_CORS_HEADERS,
//   });
// };

// export const OPTIONS = GET;

// export const POST = async (req: Request) => {
//   try {
//     const url = new URL(req.url);

//     const body: ActionPostRequest = await req.json();
//     let account: PublicKey;

//     try {
//       account = new PublicKey(body.account);
//     } catch (err) {
//       return Response.json({ msg: `Invalid Account :${err}` });
//     }

//     let amount: number = 0.1;

//     if (url.searchParams.has("amount")) {
//       try {
//         amount = parseFloat(url.searchParams.get("amount") || "0.1") || amount;
//       } catch (err) {
//         throw "Invalid Amount";
//       }
//     }
//     // in production we'll be using our RPC endpoint not the devnet
//     const connection = new Connection(clusterApiUrl("devnet"));

//     const TO_PUBKEY = new PublicKey(
//       "E9sU45SWLZEJogtozasfpSRED5Km3zuov8BXunNtgxcP"
//     );

//     const transaction = new Transaction().add(
//       SystemProgram.transfer({
//         fromPubkey: account,
//         lamports: amount * LAMPORTS_PER_SOL,
//         toPubkey: TO_PUBKEY,
//         programId: SystemProgram.programId,
//       })
//     );

//     transaction.feePayer = account;
//     transaction.recentBlockhash = (
//       await connection.getLatestBlockhash()
//     ).blockhash;

//     const payload: ActionPostResponse = await createPostResponse({
//       fields: {
//         transaction,
//         message: "Thanks for the coffee fren :)",
//       },
//     });
//     return Response.json(payload, {
//       headers: ACTIONS_CORS_HEADERS,
//     });
//   } catch (err) {
//     return Response.json({ msg: `Error: ${err}` });
//   }
// };

/**
 * Solana Actions Example
 */

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
import { DEFAULT_SOL_AMOUNT, DEFAULT_SOL_ADDRESS } from "./const";

import { ACTIONS_CORS_HEADERS, MEMO_PROGRAM_ID } from "@solana/actions";
import { ComputeBudgetProgram, TransactionInstruction } from "@solana/web3.js";
import axios from "axios";

const headers = createActionHeaders();

export const GET = async (req: Request) => {
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
      icon: data.icon,
      label: data.label,
      description: data.description,
      title: data.title,
      links: {
        actions: [
          {
            label: `${data.amount} SOL`,
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

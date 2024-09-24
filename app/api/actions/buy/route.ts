import {
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
  createPostResponse,
  MEMO_PROGRAM_ID,
} from "@solana/actions";
import {
  clusterApiUrl,
  ComputeBudgetProgram,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import axios from "axios";

export const GET = async (req: Request) => {
  console.log(`This is the URL: ${req.url}`);

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

  console.log(data);

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
    headers: ACTIONS_CORS_HEADERS,
  });
};

export const OPTIONS = GET;

export const POST = async (req: Request) => {
  try {
    const url = new URL(req.url);

    const body: ActionPostRequest = await req.json();
    let account: PublicKey;

    try {
      account = new PublicKey(body.account);
    } catch (err) {
      return Response.json({ msg: `Invalid Account :${err}` });
    }

    let amount: number = 0.1;

    if (url.searchParams.has("amount")) {
      try {
        amount = parseFloat(url.searchParams.get("amount") || "0.1") || amount;
      } catch (err) {
        throw "Invalid Amount";
      }
    }
    // in production we'll be using our RPC endpoint not the devnet
    const connection = new Connection(clusterApiUrl("devnet"));

    const TO_PUBKEY = new PublicKey(
      "E9sU45SWLZEJogtozasfpSRED5Km3zuov8BXunNtgxcP"
    );

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: account,
        lamports: amount * LAMPORTS_PER_SOL,
        toPubkey: TO_PUBKEY,
        programId: SystemProgram.programId,
      })
    );

    transaction.feePayer = account;
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        message: "Thanks for the coffee fren :)",
      },
    });
    return Response.json(payload, {
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch (err) {
    return Response.json({ msg: `Error: ${err}` });
  }
};

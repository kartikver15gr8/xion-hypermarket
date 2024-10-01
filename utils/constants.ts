import { createActionHeaders } from "@solana/actions";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import idl from "@/idl/solana_marketplace.json";
import { SolanaMarketplace } from "@/idl/solana_marketplace";
import { AnchorProvider, Program, Wallet } from "@coral-xyz/anchor";
import https from "https";

/* Constants for RPC Connection the Solana Blockchain */
export const commitmentLevel = "confirmed";
export const endpoint =
  process.env.NEXT_PUBLIC_SOLANA_RPC_URL || clusterApiUrl("devnet");
export const connection = new Connection(endpoint, commitmentLevel);

// /* Constants for the Deployed "Marketplace" Program */
export const solanaMarketplaceProgram = new Program<SolanaMarketplace>(
  idl as SolanaMarketplace,
  new AnchorProvider(connection, {} as Wallet, {})
);
export const managerPubkey = new PublicKey(
  process.env.NEXT_PUBLIC_MANAGER_PUBKEY || ""
);

/* Constants for the Action Headers */
export const headers = createActionHeaders({
  chainId: process.env.NEXT_PUBLIC_CHAIN_ID || "devnet",
});

/* Constants for the Agent */
export const agent = new https.Agent({
  rejectUnauthorized: false,
});

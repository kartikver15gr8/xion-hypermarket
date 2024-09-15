import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";
import { getOfflineSignerAmino } from "cosmjs-utils";
import { OfflineSigner } from "@cosmjs/proto-signing";
import { chains } from "chain-registry";

const rpcURL = process.env.NEXT_PUBLIC_RPC_URL || "";
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "";
const mnemonic = process.env.MNEMONIC || "";

const chain = chains.find(({ chain_name }) => chain_name === "neutrontestnet")!;

export const queryContract = async (
  queryMsg: Record<string, unknown>
): Promise<Record<string, unknown>> => {
  const client = await SigningCosmWasmClient.connect(rpcURL);
  const queryResult = await client.queryContractSmart(
    contractAddress,
    queryMsg
  );
  return queryResult;
};

// Using wallet address from client side

export const executeDepositNative = async (
  signer: OfflineSigner,
  walletAddress: string,
  amount: string
): Promise<string> => {
  const client = await SigningCosmWasmClient.connectWithSigner(rpcURL, signer, {
    gasPrice: GasPrice.fromString("0.0053untrn"),
  });

  const msg = { deposit_native: { denom: "untrn" } };
  const funds = [{ denom: "untrn", amount }];

  const fee = "auto";

  const tx = await client.execute(
    walletAddress,
    contractAddress,
    msg,
    fee,
    undefined,
    funds
  );

  return tx.transactionHash;
};

export const executeWithdraw = async (
  signer: OfflineSigner,
  walletAddress: string,
  amount: string
): Promise<string> => {
  const client = await SigningCosmWasmClient.connectWithSigner(rpcURL, signer, {
    gasPrice: GasPrice.fromString("0.0053untrn"),
  });

  const msg = { withdraw: { asset: { native: { denom: "untrn" } }, amount } };
  const funds = [{ denom: "untrn", amount: amount }];

  const fee = "auto";

  const tx = await client.execute(
    walletAddress,
    contractAddress,
    msg,
    fee,
    undefined,
    funds
  );

  return tx.transactionHash;
};

// Using Mnemonics
export const execWithdraw = async (amount: string): Promise<string> => {
  const signer = await getOfflineSignerAmino({ mnemonic, chain });
  const client = await SigningCosmWasmClient.connectWithSigner(rpcURL, signer, {
    gasPrice: GasPrice.fromString("0.0053untrn"),
  });

  const [sender] = await signer.getAccounts();
  const msg = { withdraw: { asset: { native: { denom: "untrn" } } } };
  const funds = [{ denom: "untrn", amount }];

  const fee = "auto";

  const tx = await client.execute(
    sender.address,
    contractAddress,
    msg,
    fee,
    undefined,
    funds
  );

  return tx.transactionHash;
};

export const executeDeposit = async (amount: string): Promise<string> => {
  const signer = await getOfflineSignerAmino({ mnemonic, chain });
  const client = await SigningCosmWasmClient.connectWithSigner(rpcURL, signer, {
    gasPrice: GasPrice.fromString("0.0053untrn"),
  });

  const [sender] = await signer.getAccounts();
  const msg = { deposit_native: { denom: "untrn" } };
  const funds = [{ denom: "untrn", amount }];

  const fee = "auto";

  const tx = await client.execute(
    sender.address,
    contractAddress,
    msg,
    fee,
    undefined,
    funds
  );

  return tx.transactionHash;
};

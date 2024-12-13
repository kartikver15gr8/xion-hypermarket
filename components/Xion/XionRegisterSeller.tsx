"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Abstraxion,
  useAbstraxionAccount,
  useAbstraxionSigningClient,
} from "@burnt-labs/abstraxion";
import { Button } from "@burnt-labs/ui";
import "@burnt-labs/ui/dist/index.css";
import type { ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { ExecuteMsg } from "@/utils/contract";
import { treasuryConfig } from "@/utils/contract";
import { toast } from "sonner";

const TREASURY = treasuryConfig;

type ExecuteResultOrUndefined = ExecuteResult | undefined;
export default function XionRegisterSeller(): JSX.Element {
  const { data: account } = useAbstraxionAccount();
  const { client } = useAbstraxionSigningClient();

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [executeResult, setExecuteResult] =
    useState<ExecuteResultOrUndefined>(undefined);

  const blockExplorerUrl = `https://explorer.burnt.com/xion-testnet-1/tx/${executeResult?.transactionHash}`;

  function getTimestampInSeconds(date: Date | null) {
    if (!date) return 0;
    const d = new Date(date);
    return Math.floor(d.getTime() / 1000);
  }

  const now = new Date();
  now.setSeconds(now.getSeconds() + 15);
  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

  async function claimSeat() {
    setLoading(true);
    const msg = {
      register_seller: {},
    };

    try {
      const claimRes = await client?.execute(
        account.bech32Address,
        "xion1cd6tz82s6g3yg7h0sfaghf4yf5elwnl5xk3wrcx0ral04zh6ympq4ws5k4",
        msg,
        {
          amount: [],
          gas: "500000",
          granter:
            "xion1z7yl7e7grg7lwzazky6hwhxc38vkn8k38cp964zs29x07hvvslfqlwn0mf",
        },

        "memo", // memo
        []
      );

      setExecuteResult(claimRes);
    } catch (error) {
      // eslint-disable-next-line no-console -- No UI exists yet to display errors
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (executeResult) {
      toast.info(`Transaction Hash: ${executeResult.transactionHash}`);
      console.log(executeResult.transactionHash);
    }
  }, [executeResult]);

  return (
    <div className="">
      {/* <Button
        fullWidth
        onClick={() => {
          setIsOpen(true);
        }}
        structure="base"
      >
        {account.bech32Address ? (
          <div className="flex items-center justify-center">VIEW ACCOUNT</div>
        ) : (
          "CONNECT"
        )}
      </Button> */}
      {client ? (
        <Button
          style={{ backgroundColor: "#223D40", color: "white" }}
          disabled={loading}
          fullWidth
          onClick={() => {
            claimSeat();
          }}
          structure="base"
        >
          {loading ? "LOADING..." : "Register Seller"}
        </Button>
      ) : null}
      <Abstraxion
        onClose={() => {
          setIsOpen(false);
        }}
      />
      {/* {executeResult ? (
        <div className="flex flex-col rounded border-2 border-black p-2 dark:border-white">
          <div className="mt-2">
            <p className="text-zinc-500">
              <span className="font-bold">Transaction Hash</span>
            </p>
            <p className="text-sm">{executeResult.transactionHash}</p>
          </div>
          <div className="mt-2">
            <p className=" text-zinc-500">
              <span className="font-bold">Block Height:</span>
            </p>
            <p className="text-sm">{executeResult.height}</p>
          </div>
          <div className="mt-2">
            <Link
              className="text-black underline visited:text-purple-600 dark:text-white"
              href={blockExplorerUrl}
              target="_blank"
            >
              View in Block Explorer
            </Link>
          </div>
        </div>
      ) : null} */}
    </div>
  );
}

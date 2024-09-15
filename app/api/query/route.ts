import { NextResponse } from "next/server";
import { queryContract } from "@/lib/cosm";

export async function POST(request: Request) {
  const { userAddress } = await request.json();

  try {
    const Config = { config: {} };

    const Market = { market: { asset: { native: { denom: "untrn" } } } };

    const MarketList = { markets_list: {} };

    const Scaled_Debt_Amount = {
      scaled_debt_amount: {
        asset: { native: { denom: "untrn" } },
        amount: "100",
      },
    };

    const Scaled_Liquidation_Amount = {
      scaled_liquidity_amount: {
        asset: { native: { denom: "untrn" } },
        amount: "1111",
      },
    };

    const Underlying_Debt_Amount = {
      underlying_debt_amount: {
        asset: { native: { denom: "untrn" } },
        amount_scaled: "100",
      },
    };

    const Underlying_Liquidity_Amount = {
      underlying_liquidity_amount: {
        amount_scaled: "400",
        ptoken_address:
          "neutron1uyw7kvuuag7pkpx485cujmk3nufeck3tzw0f2hls04u7uxryn3gsf9upaw",
      },
    };

    const UserAssetDebt = {
      user_asset_debt: {
        asset: { native: { denom: "untrn" } },
        user_address: userAddress,
      },
    };

    const UserCollateral = {
      user_collateral: {
        user_address: userAddress,
      },
    };

    const UserDebt = {
      user_debt: {
        user_address: userAddress,
      },
    };

    const UserPosition = { user_position: { user_address: userAddress } };

    const result = await queryContract(Config);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error querying contract:", error);
    return NextResponse.json(
      { error: "Failed to query contract" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { executeDeposit, executeDepositNative } from "@/lib/cosm";

type RequestBody = {
  amount: string;
};

export async function POST(request: Request): Promise<NextResponse> {
  const { amount }: RequestBody = await request.json();

  try {
    const transactionHash = await executeDeposit(amount);
    return NextResponse.json({ transactionHash });
  } catch (error) {
    console.error("Error executing transaction:", error);
    return NextResponse.json(
      { error: "Failed to execute transaction" },
      { status: 500 }
    );
  }
}

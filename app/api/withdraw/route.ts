import { NextResponse } from "next/server";
import { executeWithdraw, execWithdraw } from "@/lib/cosm";

type RequestBody = {
  amount: string;
};

export async function POST(request: Request): Promise<NextResponse> {
  const { amount }: RequestBody = await request.json();

  try {
    const transactionHash = await execWithdraw(amount);
    return NextResponse.json({ transactionHash });
  } catch (error) {
    console.error("Error executing withdraw:", error);
    return NextResponse.json(
      { error: "Failed to execute withdraw" },
      { status: 500 }
    );
  }
}

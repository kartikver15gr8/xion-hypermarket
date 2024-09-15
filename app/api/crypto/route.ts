import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get("ids");

  if (!ids) {
    return NextResponse.json(
      { error: "No coin IDs provided" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`${process.env.FETCH_COIN_URL}${ids}`);
    const data = await response.json();
    return NextResponse.json(data.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch crypto data" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { initiateDiscordOAuth } from "@/lib/discord-auth";

export async function GET(request: NextRequest) {
  try {
    const authorizationUrl = await initiateDiscordOAuth();
    return NextResponse.redirect(authorizationUrl);
  } catch (error) {
    return NextResponse.json(
      { error: "OAuth initiation failed" },
      { status: 500 }
    );
  }
}

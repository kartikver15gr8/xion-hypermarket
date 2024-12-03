import { NextRequest, NextResponse } from "next/server";
import {
  exchangeCodeForToken,
  fetchDiscordUser,
  storeDiscordSession,
} from "@/lib/discord-auth";
import { toast } from "sonner";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  try {
    // Exchange code for token
    const tokenResponse = await exchangeCodeForToken(code);
    console.log(`tokenResponse: ${JSON.stringify(tokenResponse)}`);

    // Fetch user information
    const discordUser = await fetchDiscordUser(tokenResponse.access_token);
    console.log(`discordUser: ${JSON.stringify(discordUser)}`);
    // Store session or user information
    await storeDiscordSession(discordUser);
    console.log(`${JSON.stringify(storeDiscordSession)}`);
    // Redirect to dashboard or profile page
    return NextResponse.redirect(new URL("/dashboard", request.url));
  } catch (error) {
    console.error("Discord authentication error:", error);
    return NextResponse.redirect(
      new URL("/login?error=discord_auth_failed", request.url)
    );
  }
}

// app/api/discord/token/route.ts

import axios from "axios";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { code, redirectUri } = await request.json();

  const body = new URLSearchParams({
    client_id: "1308052382373908491",
    client_secret: process.env.DISCORD_CLIENT_SECRET || "",
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
  });

  try {
    const response = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    const data = await response.json();
    if (!response.ok) {
      return new Response(JSON.stringify(data), { status: response.status });
    }

    if (data) {
      const access = data.access_token;
      const userinfo = await axios.get("https://discord.com/api/users/@me", {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      });

      console.log(userinfo.data);

      // const body1 = new URLSearchParams({
      //   client_id: "1308052382373908491",
      //   client_secret: process.env.DISCORD_CLIENT_SECRET || "",
      //   grant_type: "refresh_token",
      //   refresh_token: data.refresh_token,
      // });

      // const refresh = await axios.post(
      //   "https://discord.com/api/oauth2/token",
      //   body1,
      //   {
      //     headers: {
      //       "Content-Type": "application/x-www-form-urlencoded",
      //     },
      //   }
      // );

      console.log(`User Info: ${userinfo.data}`);
    }

    return new Response(`${JSON.stringify(data)}`, {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch access token" }),
      { status: 500 }
    );
  }
}

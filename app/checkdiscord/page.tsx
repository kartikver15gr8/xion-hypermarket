"use client";

import { DiscordLoginButton } from "@/components/discord/discordConnectionBtn";

export default function page() {
  return (
    <div className="pt-16">
      <p>Discord</p>
      <DiscordLoginButton />
    </div>
  );
}

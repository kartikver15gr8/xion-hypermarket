"use client";

import { useState, useEffect } from "react";

interface DiscordUser {
  id: string;
  username: string;
  email?: string;
}

export const useDiscordConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [discordUser, setDiscordUser] = useState<DiscordUser | null>(null);

  useEffect(() => {
    const checkDiscordConnection = async () => {
      try {
        const response = await fetch("/api/me");
        if (response.ok) {
          const user = await response.json();
          setIsConnected(true);
          setDiscordUser(user);
        }
      } catch (error) {
        console.error("Failed to check Discord connection", error);
      }
    };

    checkDiscordConnection();
  }, []);

  return { isConnected, discordUser };
};

"use client";
import SellerDashboard from "@/components/SellerDashboard";
import SellerProductPage from "@/components/SellerProductPage";
import { discordAccessToken } from "@/store/atom/discordAccessToken";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { toast } from "sonner";

export default function UserConnectedApps() {
  const [discordConnected, setDiscordconnected] = useState(false);
  const [teleConnected, setTeleconnected] = useState(false);

  const [discord_access_token, setDiscordAccessToken] =
    useRecoilState(discordAccessToken);

  // Function to handle fetching access token
  const fetchAccessToken = async (code: any) => {
    try {
      const response = await fetch("/api/discord/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          redirectUri: process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Access Token:", data.access_token); // Use the access token as needed
        console.log("GuildId: ", data.guild.id);
        console.log("GuildId: ", data.guild.name);

        toast.info(`You got your discord access token: ${data.access_token}`);
        setDiscordAccessToken(data.access_token);
      } else {
        console.error("Error fetching access token:", data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // Example usage of fetchAccessToken with a mock code
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      fetchAccessToken(code);
    }
  }, []);

  return (
    <div className="pt-16 w-full">
      <TopLabel />
      <div className="grid grid-cols-1 px-8 gap-y-2 md:gap-y-0 md:grid-cols-2 gap-x-4 mt-2">
        {discordConnected ? (
          <div>
            <a
              href={process.env.NEXT_PUBLIC_DISCORD_CONNECT_URI}
              className="border rounded-lg h-28 flex items-center px-4 gap-x-5 hover:bg-[#E4E4E5] transition-all duration-300"
            >
              <Image
                className="w-10 md:w-12 lg:w-16"
                src="https://s3-alpha-sig.figma.com/img/c89a/0a74/93f942f4f36a009c22adc6177b140086?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=I1WoThr8zy7FjNSbR9~Rfgi~~HrE6ELvlNSwW92RCBDspmqDI3pQ6aJb1AKXTsmYWlnTlsxjtyjvEhE9nIJLzLDO5qLSWSeWqTfuAa9vuk-IE9OOov90XPYYfETFhVED~IeK-qgEtc0wZduH9Z8mZZiW3Oq2Oz-L61Ys6cTmYRJL9GBDeBXJ07SjdkkgxK13iKKcU6SNmA-GVa702qCq4M1lsoB19JvXO7x~Fjmuxdu6LSILU~cvwaWYRtW-soGdo7oeOhbptfQJFBPedyv-A9wJ2s5ONe7lnXbWSrQ7WOIJtscN5DOCqqxTIeCzDghY2qL7shKTTCHIFSVocQWlPA__"
                width={200}
                height={200}
                alt=""
              />
              <div>
                <p className="font-medium text-[14px] md:text-[16px] lg:text-lg">
                  Discord
                </p>
                <p className="text-[10px] md:text-[11px] lg:text-[15px]">
                  Connected
                </p>
              </div>
            </a>
          </div>
        ) : (
          <div>
            <a
              href={process.env.NEXT_PUBLIC_DISCORD_CONNECT_URI}
              className="border rounded-lg h-28 flex items-center px-4 gap-x-5 hover:border-[#6f6f6f] bg-[#E4E4E5] transition-all duration-300"
            >
              <Image
                className="w-10 md:w-12 lg:w-16"
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3Cpath fill='%236f6f6f' d='M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.1.1 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.1 16.1 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02M8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12m6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12'/%3E%3C/svg%3E"
                width={200}
                height={200}
                alt=""
              />
              <div>
                <p className="font-medium text-[14px] md:text-[16px] lg:text-lg">
                  Discord
                </p>
                <p className="text-[10px] md:text-[11px] lg:text-[15px]">
                  Not Connected{" "}
                </p>
              </div>
            </a>
          </div>
        )}
        {teleConnected ? (
          <div>
            <a
              href=""
              className="border rounded-lg h-28 flex items-center px-4 gap-x-5 hover:bg-[#E4E4E5] transition-all duration-300"
            >
              <Image
                className="w-10 md:w-12 lg:w-16"
                src="https://s3-alpha-sig.figma.com/img/1d2b/bc7f/92849e7867a21edd110a2b0e8a256f6e?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CMFTdAWPEY2zRMwir~96rBNf5iuAy1T1xrpa~mX9LzAmV9yoplOm56x3BTCzFJYPBv1Sb2xwP5Yfkbe8zr9T-UHv~DRHvQsyh6KA00v9M5KmoI~apctonPhgnFxBEANmFhnWyoSCrFVioL463gDiTIjWNBpAV9txOJg-D6iKM7aeBoh6xlZai-T-rUyOjFu0Dw3XtmLJ01kouELtjKtu~doKk2q0pdXBIH1GC0J~TEx7szoylE7ERL7Va8dF0vZ9HNmJSZk~pAmBk5cChk1-BX5fFB46Pwh2OIN5wxh7~H388bnzpnqi8N8OvzqM64RkwAbrg68ouC5HwdWAw8UDOw__"
                width={200}
                height={200}
                alt=""
              />
              <div>
                <p className="font-medium text-[14px] md:text-[16px] lg:text-lg">
                  Telegram
                </p>
                <p className="text-[10px] md:text-[11px] lg:text-[15px]">
                  Connected
                </p>
              </div>
            </a>
          </div>
        ) : (
          <div>
            <a
              href=""
              className="border rounded-lg h-28 flex items-center px-4 gap-x-5 hover:border-[#6f6f6f] bg-[#E4E4E5] transition-all duration-300"
            >
              <Image
                className="w-10 md:w-12 lg:w-16"
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3Cpath fill='%236f6f6f' d='M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12a12 12 0 0 0 12-12A12 12 0 0 0 12 0zm4.962 7.224c.1-.002.321.023.465.14a.5.5 0 0 1 .171.325c.016.093.036.306.02.472c-.18 1.898-.962 6.502-1.36 8.627c-.168.9-.499 1.201-.82 1.23c-.696.065-1.225-.46-1.9-.902c-1.056-.693-1.653-1.124-2.678-1.8c-1.185-.78-.417-1.21.258-1.91c.177-.184 3.247-2.977 3.307-3.23c.007-.032.014-.15-.056-.212s-.174-.041-.249-.024q-.159.037-5.061 3.345q-.72.495-1.302.48c-.428-.008-1.252-.241-1.865-.44c-.752-.245-1.349-.374-1.297-.789q.04-.324.893-.663q5.247-2.286 6.998-3.014c3.332-1.386 4.025-1.627 4.476-1.635'/%3E%3C/svg%3E"
                width={200}
                height={200}
                alt=""
              />
              <div>
                <p className="font-medium text-[14px] md:text-[16px] lg:text-lg">
                  Telegram
                </p>
                <p className="text-[10px] md:text-[11px] lg:text-[15px]">
                  Not Connected
                </p>
              </div>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
const TopLabel = () => {
  return (
    <div className="relative border-b w-[100%] px-[20px] sm:px-[20px] md:px-[40px] lg:px-[60px] xl:px-20">
      <div className="h-20 grid grid-cols-2 items-center">
        <div>
          <p className="font-medium text-sm lg:text-lg">Manage Your Apps</p>
        </div>
      </div>
    </div>
  );
};

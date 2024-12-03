"use client";
import { useRouter } from "next/navigation";

export const DiscordLoginButton: React.FC = () => {
  const router = useRouter();

  const handleDiscordLogin = () => {
    router.push("/api/auth/discord");
  };

  return (
    <button
      onClick={handleDiscordLogin}
      className="bg-[#5865F2] text-white px-4 py-2 rounded flex items-center"
    >
      Connect Discord
    </button>
  );
};

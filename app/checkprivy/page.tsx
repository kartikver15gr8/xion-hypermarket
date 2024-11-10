"use client";

import { usePrivy } from "@privy-io/react-auth";

export default function Home() {
  const { login, logout, connectWallet } = usePrivy();
  return (
    <div className="pt-16 flex gap-x-1">
      <p>Hello</p>
      <button className="border border-black" onClick={login}>
        Login
      </button>
      <button className="border border-black" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

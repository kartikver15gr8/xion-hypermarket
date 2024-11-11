"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { toSolanaWalletConnectors } from "@privy-io/react-auth/solana";
const solanaConnectors = toSolanaWalletConnectors({
  shouldAutoConnect: false,
});

const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID || "";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={appId}
      config={{
        appearance: {
          theme: "light",
          accentColor: "#676FFF",
          logo: "https://ucarecdn.com/0e53b504-0a39-4cfb-ae1f-7466e2d43e5b/bgremovedprivy.png",
          walletChainType: "solana-only",
          landingHeader: "Connect to Sendit",
        },
        externalWallets: {
          solana: { connectors: solanaConnectors },
        },
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
        loginMethods: ["wallet", "email"],
      }}
    >
      {children}
    </PrivyProvider>
  );
}

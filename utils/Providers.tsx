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
          logo: "https://your-logo-url",
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

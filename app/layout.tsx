import type { Metadata } from "next";
import "./globals.css";
import { teachersFont } from "./fonts/fonts";
import RecoilRootWrapper from "@/components/RecoilRootWrapper";
import { Toaster } from "sonner";
import ClientToaster from "@/components/ClientToaster";
import FullNav from "@/components/FullNav";
import { siteConfig } from "@/config/site-config";
import SolanaWalletProvider from "@/components/SolanaWalletProvider";
import React, { createContext, useContext } from "react";
import Providers from "@/utils/Providers";
import { AbstraxionWrapper } from "@/components/Xion/AbstraxionWrapper";

export const metadata: Metadata = siteConfig;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={teachersFont.className}>
        <RecoilRootWrapper>
          {/* <HamburgerNav /> */}
          {/* <Navigation /> */}
          <Providers>
            <SolanaWalletProvider>
              <AbstraxionWrapper>
                <FullNav />
                {children}
              </AbstraxionWrapper>
            </SolanaWalletProvider>
          </Providers>
          {/* <BottomNav /> */}
        </RecoilRootWrapper>
        <ClientToaster />
      </body>
    </html>
  );
}

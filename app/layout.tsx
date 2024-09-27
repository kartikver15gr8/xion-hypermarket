import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { teachersFont } from "./fonts/fonts";
import RecoilRootWrapper from "@/components/RecoilRootWrapper";
import { Toaster } from "sonner";
import ClientToaster from "@/components/ClientToaster";
import HamburgerNav from "@/components/HamburgerNav";
import Navigation from "@/components/Navigation";
import FullNav from "@/components/FullNav";
import BottomNav from "@/components/BottomNav";
import { siteConfig } from "@/config/site-config";
import SolanaWalletProvider from "@/components/SolanaWalletProvider";
import React, { createContext, useContext } from "react";

const inter = Inter({ subsets: ["latin"] });

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
          <SolanaWalletProvider>
            <FullNav />
            {children}
          </SolanaWalletProvider>
          {/* <BottomNav /> */}
        </RecoilRootWrapper>
        <ClientToaster />
      </body>
    </html>
  );
}

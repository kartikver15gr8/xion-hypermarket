import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LiquidationSidebar from "@/components/LiquidationSidebar";
import { teachersFont } from "../fonts/fonts";
import HamburgerNav from "@/components/HamburgerNav";
import BottomNav from "@/components/BottomNav";
import NewBottomNav from "@/components/NewBottomNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sendit",
  description: "Sendit Zone ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <HamburgerNav /> */}
      <div className="flex ">
        {/* <LiquidationSidebar /> */}
        {children}
        {/* <BottomNav /> */}
      </div>
    </>
  );
}

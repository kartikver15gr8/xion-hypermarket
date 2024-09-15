import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LiquidationSidebar from "@/components/LiquidationSidebar";
import { teachersFont } from "../fonts/fonts";
import KeplrButton from "@/components/KeplrButton";

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
      {/* <KeplrButton /> */}
      <div className="flex ">
        {/* <LiquidationSidebar /> */}
        {children}
      </div>
    </>
  );
}

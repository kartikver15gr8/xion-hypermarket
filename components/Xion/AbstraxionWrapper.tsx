"use client";

import React from "react";
import { AbstraxionProvider } from "@burnt-labs/abstraxion";
import "@burnt-labs/abstraxion/dist/index.css";
import "@burnt-labs/ui/dist/index.css";
import { treasuryConfig } from "@/utils/contract";

const TREASURY = treasuryConfig;
export function AbstraxionWrapper({ children }: { children: React.ReactNode }) {
  return <AbstraxionProvider config={TREASURY}>{children}</AbstraxionProvider>;
}

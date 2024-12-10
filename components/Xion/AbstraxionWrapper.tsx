"use client";

import React from "react";
import { AbstraxionProvider } from "@burnt-labs/abstraxion";
import "@burnt-labs/abstraxion/dist/index.css";
import "@burnt-labs/ui/dist/index.css";

export function AbstraxionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AbstraxionProvider
      config={{
        contracts: [
          "xion1z70cvc08qv5764zeg3dykcyymj5z6nu4sqr7x8vl4zjef2gyp69s9mmdka",
        ],
      }}
    >
      {children}
    </AbstraxionProvider>
  );
}

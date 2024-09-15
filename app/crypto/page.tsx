"use client";
import CryptoList from "@/components/CrytoList";
import StaggeredDropDown from "@/components/framerEffects/StaggeredDropDown";

export default function page() {
  const coinIds = [
    "bitcoin",
    "ethereum",
    "solana",
    "neutron",
    "dydx",
    "cosmos",
    "akash-network",
    "osmosis",
    "injective-protocol",
    "celestia",
  ];
  return (
    <div className="pt-16">
      <h1>Crypto Prices</h1>
      <CryptoList coinIds={coinIds} />
      {/* <StaggeredDropDown /> */}
    </div>
  );
}

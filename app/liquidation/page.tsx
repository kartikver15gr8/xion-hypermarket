"use client";
import BottomNav from "@/components/BottomNav";
import Liquidation from "@/components/Liquidation";
import NewBottomNav from "@/components/NewBottomNav";

export default function page() {
  return (
    <div className="w-full">
      <Liquidation />
      <NewBottomNav />
    </div>
  );
}

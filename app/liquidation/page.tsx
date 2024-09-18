"use client";
import BottomNav from "@/components/BottomNav";
import Liquidation from "@/components/Liquidation";
import NewBottomNav from "@/components/NewBottomNav";
import coins from "@/public/_static/background/coins.png";

export default function page() {
  return (
    <div className="w-full">
      <Liquidation />
      <NewBottomNav />
    </div>
  );
}

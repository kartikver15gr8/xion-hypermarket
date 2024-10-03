"use client";

import ProcessPurchase from "@/components/ProcessPurchase";
import ShareProcessPurchase from "@/components/ShareProcessPurchase";

export default function page() {
  return (
    <div className="pt-16 border">
      <ShareProcessPurchase productId={20} />
    </div>
  );
}

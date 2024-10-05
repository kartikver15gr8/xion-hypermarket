"use client";

import PurchaseLibrary from "@/components/Library/PurchaseLibrary";
import UserLibrary from "@/components/Library/UserPurchases";

export default function page() {
  return (
    <div className="pt-16 pb-20 px-[20px] sm:px-[20px] md:px-[40px] lg:px-20 xl:px-44">
      <UserLibrary />
    </div>
  );
}

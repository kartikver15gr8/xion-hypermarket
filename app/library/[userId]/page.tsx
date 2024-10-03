"use client";

import PurchaseLibrary from "@/components/Library/PurchaseLibrary";
import { useState } from "react";

export default function UserPurchases({ params }: { params: any }) {
  const [userId, setUserId] = useState(params.userId);
  return (
    <div className="pt-16 pb-20 px-[20px] sm:px-[20px] md:px-[40px] lg:px-20 xl:px-44">
      <PurchaseLibrary USER_ID={userId} />
    </div>
  );
}

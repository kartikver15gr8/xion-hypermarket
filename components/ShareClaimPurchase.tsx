import dynamic from "next/dynamic";
import React from "react";

const ClaimPurchaseClient = dynamic(() => import("./ClaimPurchaseClient"), {
  ssr: false,
});

const ShareClaimPurchase = ({
  buyerWalletAddress,
}: {
  buyerWalletAddress?: string;
}) => {
  return <ClaimPurchaseClient buyerWalletAddress={buyerWalletAddress || ""} />;
};

export default ShareClaimPurchase;

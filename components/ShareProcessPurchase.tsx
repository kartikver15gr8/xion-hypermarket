import dynamic from "next/dynamic";
import React from "react";

const ProcessPurchaseClient = dynamic(() => import("./ProcessPurchaseClient"), {
  ssr: false,
});

const ShareProcessPurchase: React.FC = () => {
  return <ProcessPurchaseClient productId={20} />;
};

export default ShareProcessPurchase;

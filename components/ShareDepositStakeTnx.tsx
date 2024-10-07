import dynamic from "next/dynamic";
import React from "react";

const DepositStakeTnx = dynamic(() => import("./DepositStakeTnx"), {
  ssr: false,
});

const ShareDepositStakeTnx = () => {
  return <DepositStakeTnx />;
};

export default ShareDepositStakeTnx;

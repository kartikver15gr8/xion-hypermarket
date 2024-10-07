import dynamic from "next/dynamic";
import React from "react";

const WithdrawStakeTnx = dynamic(() => import("./WithdrawStakeTnx"), {
  ssr: false,
});

const ShareWithdrawStakeTnx = () => {
  return <WithdrawStakeTnx />;
};

export default ShareWithdrawStakeTnx;

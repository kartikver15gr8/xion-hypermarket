"use client";

import DepositStakeTnx from "@/components/DepositStakeTnx";
import WithdrawStakeTnx from "@/components/WithdrawStakeTnx";
import StakeWithSellerTnx from "@/components/WithdrawStakeTnx";

export default function page() {
  return (
    <div className="pt-16">
      <DepositStakeTnx />
      <div className="border">
        <WithdrawStakeTnx />
      </div>
    </div>
  );
}

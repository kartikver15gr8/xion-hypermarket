"use client";

import DepositStakeTnx from "@/components/DepositStakeTnx";
import ShareDepositStakeTnx from "@/components/ShareDepositStakeTnx";
import ShareWithdrawStakeTnx from "@/components/ShareWithdrawStakeTnx";
import WithdrawStakeTnx from "@/components/WithdrawStakeTnx";
import StakeWithSellerTnx from "@/components/WithdrawStakeTnx";

export default function page() {
  return (
    <div className="pt-16">
      <ShareDepositStakeTnx />
      <div className="border">
        <ShareWithdrawStakeTnx />
      </div>
    </div>
  );
}

import DepositNative from "@/components/DepositNative";
import Test from "@/components/Test";
import WithdrawFunds from "@/components/WithdrawFunds";

export default function page() {
  return (
    <div className="pt-16">
      <Test />
      <DepositNative />
      <WithdrawFunds />
    </div>
  );
}

'use client'
import BorrowBtn from "./BorrowBtn";

export default function AmountCard({}: { title: string }) {
  return (
    <div className="flex flex-col mx-6 p-4 my-4 border">
      <p className="font-medium">DEPOSIT</p>
      <div className="flex items-center font-bold text-2xl mt-2">
        <p className="mr-2">$5,000</p>
        <p className="">NTRN</p>
      </div>
      <p className="font-extralight text-slate-400">= $499.8</p>
      <BorrowBtn title="Deposit" className="mt-2 h-14 rounded-sm" />
    </div>
  );
}

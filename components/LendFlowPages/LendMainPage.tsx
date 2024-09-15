"use client";
import Link from "next/link";
import BorrowBtn from "../BorrowPageComp/BorrowBtn";
import { Button } from "../ui/button";
import LeftReveal from "../framerEffects/LeftReveal";
import SideReveal from "../framerEffects/SideReveal";

export default function LendMainPage() {
  return (
    <div className="w-[500px]  p-2 items-center flex flex-col">
      <LeftReveal>
        <div className=" flex flex-col items-center font-bold sm:italic text-7xl">
          <p>EARN IT,</p>
          <p>SPEND IT,</p>
          <p>SEND IT</p>
        </div>
      </LeftReveal>
      <Link href="/lend/depositfirst">
        <SideReveal>
          <BorrowBtn
            title="Start Earning"
            className="mt-10 h-14 w-72 sm:w-80"
          />
        </SideReveal>
      </Link>
    </div>
  );
}

"use client";
import sendit_white_ape from "@/public/sendit_white_ape.svg";
import sendit_ape from "@/public/sendit_ape.svg";
import ape from "@/public/ape.png";
import sendit_horizontal from "@/public/sendit_horizontal.svg";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";

interface MenuItem {
  text: string;
  tooltip: string;
}
export default function TopNavbar() {
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  const menuItems: MenuItem[] = [
    { text: "Sale", tooltip: "Sell your items" },
    { text: "Borrow", tooltip: "Borrow items or money" },
    { text: "Earn", tooltip: "Earn rewards and incentives" },
    { text: "Lend", tooltip: "Lend items or money" },
    { text: "Achievements", tooltip: "View your accomplishments" },
  ];
  return (
    <div className="flex border-[1.6px] border-[#ced8da] items-center px-2  w-full  rounded h-16 backdrop-blur-lg bg-[rgba(0,0,0,0.05)] justify-between">
      <Link href="/">
        <div className="flex items-center">
          <Image className="w-12 " src={ape} alt="" />
          <p className="italic font-bold text-5xl">SENDIT</p>
        </div>
      </Link>
      <div className=" h-full items-center flex px-4">
        <ul className="flex gap-x-4 text-[18px] font-medium">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="relative text-[#182b2d] px-3 py-[5px] rounded-sm hover:bg-[#d4d9da] transition-all duration-200"
              onMouseEnter={() => setActiveTooltip(index)}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              {item.text}
              {activeTooltip === index && (
                <div className="absolute left-1/2 -translate-x-1/2  mt-3 px-2 py-1 bg-[#e9ecec] text-slate-700 text-sm rounded-md whitespace-nowrap border border-[#bac3c4]">
                  {item.tooltip}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#e9ecec]"></div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <Link href="/liquidation">
        <Button>Check Liquidation</Button>
      </Link>
    </div>
  );
}

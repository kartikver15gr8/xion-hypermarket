"use client";
import React from "react";
import Image from "next/image";
import neutron from "@/public/coins/neutron.png";

export default function CoinViews() {
  return (
    <div className="flex flex-col h-full w-fit gap-y-3">
      <div className="p-1 border w-fit">
        <Image className="" src={neutron} width={80} height={80} alt="" />
      </div>
      <div className="p-1 border w-fit">
        <Image
          className=" rotate-90"
          src={neutron}
          width={80}
          height={80}
          alt=""
        />
      </div>
      <div className="p-1 border w-fit">
        <Image
          className=" rotate-180"
          src={neutron}
          width={80}
          height={80}
          alt=""
        />
      </div>
      <div className="p-1 border w-fit">
        <Image
          className=" -rotate-90"
          src={neutron}
          width={80}
          height={80}
          alt=""
        />
      </div>
      <div className="p-1 border w-fit">
        <Image
          className=" -rotate-180"
          src={neutron}
          width={80}
          height={80}
          alt=""
        />
      </div>
    </div>
  );
}

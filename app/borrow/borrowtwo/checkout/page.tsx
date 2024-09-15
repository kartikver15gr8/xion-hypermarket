"use client";

import WalletConnectBtn from "@/components/BorrowPageComp/WalletConnectBtn";
import BorrowCheckout from "@/components/BorrowPageComp/BorrowCheckout";
import whitenoise from "@/public/_static/background/whitenoise.png";
import thunderbg from "@/public/_static/background/thunderbg.png";
import bglines from "@/public/_static/background/bglines.png";
import Image from "next/image";
import KeplarConnect from "@/components/KeplarConnect";
import KeplrButton from "@/components/KeplrButton";
import Reveal from "@/components/framerEffects/Reveal";

export default function page() {
  return (
    <div className="relative h-screen pb-10 w-full">
      <Image
        src={whitenoise}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-[10%]"
      />
      <Image
        src={bglines}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-[10%]"
      />

      <Image
        src={thunderbg}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-[8%]"
      />
      <div className="relative z-10 h-[100vh] overflow-y-auto hide-scrollbar flex items-center ">
        <div className="h-fit relative w-full p-2">
          {/* <KeplrButton /> */}
          <Reveal>
            <div className=" flex flex-col justify-center items-center h-full">
              <BorrowCheckout />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

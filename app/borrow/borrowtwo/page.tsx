"use client";

import BorrowCardTwo from "@/components/BorrowPageComp/BorrowCardTwo";
import WalletConnectBtn from "@/components/BorrowPageComp/WalletConnectBtn";
import Image from "next/image";
import { Suspense } from "react";
import whitenoise from "@/public/_static/background/whitenoise.png";
import thunderbg from "@/public/_static/background/thunderbg.png";
import bglines from "@/public/_static/background/bglines.png";
import KeplarConnect from "@/components/KeplarConnect";
import KeplrButton from "@/components/KeplrButton";
import Reveal from "@/components/framerEffects/Reveal";
import BlurFade from "@/components/magicui/blur-fade";

export default function BorrowTwo() {
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
      <div className="relative z-10 h-[100vh] overflow-y-auto hide-scrollbar ">
        <div className="h-full relative w-full p-2">
          {/* <KeplrButton /> */}
          <BlurFade delay={0.5}>
            <div className=" flex flex-col justify-center items-center h-full  sm:pt-8 md:pt-7 lg:pt-5">
              <Suspense fallback={<div>Loading…</div>}>
                <BorrowCardTwo />
              </Suspense>
            </div>
          </BlurFade>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import galacticspace from "@/public/_static/background/galacticspace.png";
import finalbidslabel from "@/public/_static/background/finalbidslabel.png";

export default function FinalBidsLabel() {
  return (
    <div className="relative flex border h-16 md:h-20 bg-slate-100">
      <Image
        src={finalbidslabel}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-[40%] bg-blend-luminosity px-0 sm:px-[20px] md:px-[40px] lg:px-[60px] xl:px-[80px] 2xl:px-[100px]"
      />
      <Image
        src={galacticspace}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-[11%] bg-blend-luminosity"
      />
      <div className="w-full h-full border flex items-center justify-center flex-col">
        <p className="text-lg md:text-xl font-bold italic text-[#52525C]">
          FINAL BIDS
        </p>
        <p className="text-sm md:text-lg italic font-light text-[#8B8B92]">
          Don&apos;t Miss Out
        </p>
      </div>
    </div>
  );
}

import Image from "next/image";
import randomstatic from "@/public/randomstatic.png";
import usdc from "@/public/coins/usdccoin.png";

export default function LoanBalCard({
  amt,
  amtConversion,
}: {
  amt: string;
  amtConversion: string;
}) {
  return (
    <div className="relative flex flex-col border py-1 md:py-2 lg:py-3 px-2 md:px-3 gap-y-2 rounded-md bg-white shadow-[inset_1px_2px_10px_rgba(0,0,0,0.08)] border-white">
      {/* h-20 sm:h-24 lg:h-28 xl:h-32 */}
      <Image
        src={randomstatic}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-[10%]"
      />
      <p className="text-[9px] sm:text-[11px] xl:text-xs">LOAN BALANCE</p>
      <div className="flex items-center gap-x-1 md:gap-x-2">
        <Image
          className="w-6 h-6 sm:w-10 sm:h-10 md:w-12 md:h-12 xl:w-14 xl:h-14"
          src={usdc}
          width={500}
          height={500}
          alt=""
        />
        <div className="flex flex-col items-end w-full lg:px-2 xl:px-4">
          <p className="font-medium text-[12px] md:text-[14px] lg:text-xl xl:text-2xl w-fit">
            {amt} USDC
          </p>
          <p className="w-fit text-[#A1A1A5] text-[10px] sm:text-[12px] md:text-[14px] lg:text-xl">
            = ${amtConversion} USD
          </p>
        </div>
      </div>
    </div>
  );
}

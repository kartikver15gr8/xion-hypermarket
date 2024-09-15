import Image, { StaticImageData } from "next/image";
import thunderTwo from "@/public/_static/background/thundertwo.png";
export default function EarnMoreCard({
  earnPercent,
  coinOne,
  coinTwo,
  firstCoin,
  secondCoin,
  axl,
}: {
  coinOne: string | StaticImageData;
  coinTwo: string | StaticImageData;
  firstCoin: string;
  secondCoin: string;
  axl?: string | StaticImageData;
  earnPercent: string;
}) {
  return (
    <div className="border relative flex justify-between items-center py-4 rounded-[6px] text-white p-2 bg-[#132223] gap-x-2 shadow-lg">
      <Image
        src={thunderTwo}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-[8%] mix-blend-luminosity"
      />
      <div className="flex flex-col">
        <div className="relative flex w-32 sm:w-36">
          <Image
            className="w-16 sm:w-20"
            src={coinOne}
            alt="coinOne"
            width={200}
            height={200}
          />
          <Image
            className="absolute -rotate-45 left-14 w-16 sm:w-20"
            src={coinTwo}
            alt="coinTwo"
            width={200}
            height={200}
          />
        </div>
        <div className="flex text-xs sm:text-sm gap-x-2 sm:gap-x-3 justify-center w-full font-medium">
          <p>{firstCoin}</p>
          <p>{secondCoin}</p>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="font-medium text-xs sm:text-sm md:text-xs lg:text-sm">
          EARN
        </p>
        <p className="text-4xl sm:text-5xl md:text-4xl lg:text-6xl font-medium">
          {earnPercent}%
        </p>
      </div>
      <div className=" h-full w-28 mr-4 sm:mr-8 md:mr-4 xl:mr-8  flex flex-col justify-end">
        <div className="bg-[#3C4B4E] p-1 w-fit text-white text-xs sm:text-sm md:text-xs font-medium">
          <p>APR</p>
        </div>
        <p className="text-[10px] sm:text-[12px] md:text-[10px] text-[#cccccf]">
          Includes combined rewards
        </p>
      </div>
      <div className="absolute p-[1px] sm:p-1 md:p-[1px] lg:p-1 rounded-[2px] border-[1px] border-[#b0b2b3] right-1 top-1 bg-[#22282C]">
        <p className="text-[10px] sm:text-[12px] md:text-[10px] lg:text-[12px]">
          Provided to you by Astroport
        </p>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import ActivityContainerGraph from "./ActivityContainerGraph";
import ActivityContainerTable from "./ActivityContainerTable";
import noisebg from "@/public/_static/background/noisebg.png";
import whitenoise from "@/public/_static/background/whitenoise.png";
import shinegradient from "@/public/_static/background/shinegradient.png";
import thunderbg from "@/public/_static/background/thunderbg.png";
import blurbg from "@/public/_static/background/blurbg.png";
import RechartsGraph from "./RechartsGraph";
import Reveal from "./framerEffects/Reveal";
import { Button } from "./ui/button";
interface ActivityContainerProps {
  scrollToTop: () => void;
}
const ActivityContainer: React.FC<ActivityContainerProps> = ({
  scrollToTop,
}) => {
  const liquidityData = [
    { discountPercent: 2, usdcAmount: 1799, numberOfBidders: 1799 },
    { discountPercent: 4, usdcAmount: 2961, numberOfBidders: 2961 },
    { discountPercent: 6, usdcAmount: 0, numberOfBidders: 0 },
    { discountPercent: 8, usdcAmount: 0, numberOfBidders: 0 },
    { discountPercent: 10, usdcAmount: 0, numberOfBidders: 0 },
    { discountPercent: 12, usdcAmount: 100, numberOfBidders: 2961 },
    { discountPercent: 14, usdcAmount: 2000, numberOfBidders: 2961 },
    { discountPercent: 16, usdcAmount: 250, numberOfBidders: 250 },
    { discountPercent: 18, usdcAmount: 0, numberOfBidders: 0 },
    { discountPercent: 20, usdcAmount: 5690, numberOfBidders: 5690 },
    { discountPercent: 22, usdcAmount: 4625, numberOfBidders: 4625 },
    { discountPercent: 24, usdcAmount: 2014, numberOfBidders: 2014 },
    { discountPercent: 26, usdcAmount: 1563, numberOfBidders: 1563 },
    { discountPercent: 28, usdcAmount: 1045, numberOfBidders: 1045 },
    { discountPercent: 30, usdcAmount: 324, numberOfBidders: 324 },
  ];
  return (
    <div className="flex relative flex-wrap p-2">
      <div className="mb-2 rounded h-[350px] sm:h-[350px] md:h-[350px] lg:h-[450px] xl:h-[450px] 2xl:h-[450px] flex relative w-[100%] sm:w-[100%] md:w-[100%] lg:w-[60%] xl:w-[60%] 2xl:w-[60%]  justify-center">
        <Image
          src={whitenoise}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-[10%] rounded"
        />
        <Image
          src={blurbg}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-[5%] rounded"
        />

        <Image
          src={thunderbg}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-[5%] rounded"
        />
        <Image
          src={shinegradient}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-[2%] rounded"
        />

        <div className="relative  flex p-1 z-10 w-[100%] ">
          <Button
            onClick={scrollToTop}
            className="absolute w-20 h-8 right-2 top-2 shadow-lg  rounded hover:bg-[#4e6466] transition-all duration-200 z-50"
          >
            Place Bid
          </Button>
          {/* <ActivityContainerGraph data={liquidityData} /> */}
          <RechartsGraph data={liquidityData} />
        </div>
      </div>

      <div className=" flex relative h-[100%] w-[100%] sm:w-[100%] md:w-[100%] lg:w-[40%] xl:w-[40%] 2xl:w-[40%] justify-center">
        <ActivityContainerTable />
      </div>
    </div>
  );
};

export default ActivityContainer;

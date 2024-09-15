import Image from "next/image";
import randomstatic from "@/public/randomstatic.png";
import shinegradient from "@/public/_static/background/shinegradient.png";
import usdcbg from "@/public/_static/background/usdcbg.png";
import allcoinsbg from "@/public/_static/background/allcoinsbg.png";

export default function BottomLabel({
  firstLine,
  secondLine,
  btnTitle,
  className,
  mainClass,
}: {
  firstLine: string;
  secondLine: string;
  btnTitle: string;
  className: string;
  mainClass: string;
}) {
  return (
    <div
      className={`${mainClass} relative w-full flex items-center rounded-[3px] bg-black`}
    >
      <div className="absolute h-full w-full overflow-hidden flex justify-center">
        <Image
          src={randomstatic}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-[15%] bg-blend-color-burn rounded-[3px]"
        />
        <Image
          src={shinegradient}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-[45%] bg-blend-exclusion rounded-[3px]"
        />
        <Image
          src={allcoinsbg}
          alt="Background"
          objectFit="cover"
          className="opacity-[40%] mix-blend-luminosity absolute w-[80%] lg:w-[70%] "
        />
      </div>
      <div className={`${className} relative flex px-2 sm:px-3 md:px-5 w-full`}>
        <div>
          <p className="font-bold text-white text-xs sm:text-sm md:text-lg lg:text-xl">
            {firstLine}
          </p>
          <p className="font-bold text-white text-xs sm:text-sm md:text-lg lg:text-xl">
            {secondLine}
          </p>
        </div>
        <button className="w-fit flex items-center h-7 sm:h-8 px-2 bg-white hover:bg-slate-100 rounded-[2px] text-xs md:text-sm">
          {btnTitle}
        </button>
      </div>
    </div>
  );
}

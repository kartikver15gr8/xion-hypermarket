import Image from "next/image";
import randomstatic from "@/public/randomstatic.png";

export default function AccHealth({ amt }: { amt: string }) {
  return (
    <div className="relative flex flex-col border py-1 md:py-2 lg:py-3 px-2 md:px-3 gap-y-2 rounded-md bg-white shadow-[inset_1px_2px_10px_rgba(0,0,0,0.08)] border-white  ">
      {/* //sm:h-24 lg:h-28 xl:h-32 */}
      <Image
        src={randomstatic}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-[10%]"
      />
      <p className="text-[9px] sm:text-[11px] xl:text-xs">ACCOUNT HEALTH</p>
      <div className="flex flex-col items-center gap-x-1 md:gap-x-2">
        <div className="flex justify-between items-center w-full">
          <p className="text-[9px] sm:text-[11px] xl:text-[12px]">1.2</p>
          <div className="gap-x-1 flex items-center">
            <svg
              className="w-[5px] md:w-[7px] lg:w-[10px] xl:w-[12px]"
              viewBox="0 0 9 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.181152"
                y="5"
                width="6"
                height="6"
                transform="rotate(-45 0.181152 5)"
                fill="#223D40"
              />
            </svg>

            <p className="font-medium text-[9px] sm:text-[11px] xl:text-[14px]">
              GREAT
            </p>
          </div>
        </div>
        <div className="flex w-full sm:my-1">
          <svg
            width="215"
            height="6"
            viewBox="0 0 215 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.666504"
              width="214"
              height="6"
              rx="3"
              fill="#050505"
              fillOpacity="0.1"
            />
            <rect x="0.666504" width="46" height="6" rx="3" fill="#3A3A41" />
            <path
              d="M71.6665 0L71.6665 6"
              stroke="#050505"
              strokeOpacity="0.2"
            />
            <path
              d="M142.667 0L142.667 6"
              stroke="#050505"
              strokeOpacity="0.2"
            />
          </svg>
        </div>
        <div className="w-full text-[7px] sm:text-[9px] xl:text-xs text-[#4F4F59] mt-[2px] sm:mt-[0.5px] md:mt-[1px] lg:mt-2 xl:mt-3">
          <p>Your account is in great shape </p>
          <p>Keep Sending It</p>
        </div>
      </div>
    </div>
  );
}

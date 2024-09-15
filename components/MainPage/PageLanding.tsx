"use client";

import Image from "next/image";
import randomstatic from "@/public/randomstatic.png";
import shinebg from "@/public/_static/background/shinegradient.png";
import chattip from "@/public/_static/illustrations/chattip.svg";
import senditcoin from "@/public/coins/senditcoin.png";

export default function PageLanding() {
  return (
    <div className="pt-16 relative flex justify-center h-[500px] md:h-[570px] lg:h-[600px] xl:h-[620px] bg-slate-400 border-black overflow-hidden">
      <Image
        src={randomstatic}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-[4%] bg-blend-color-burn"
      />
      <Image
        src={shinebg}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-[40%] bg-blend-difference"
      />
      <Image
        src={chattip}
        alt="Background"
        className="hidden md:flex opacity-[30%] bg-blend-difference absolute rotate-[24deg] w-[600px] right-[180px] -bottom-[120px]"
      />
      <Image
        src={senditcoin}
        alt="Background"
        className="hidden md:flex opacity-[40%] bg-blend-difference absolute w-[280px] rotate-[14.42deg] bottom-0 right-[320px]"
      />
      <Image
        src={senditcoin}
        alt="Background"
        className="hidden md:flex opacity-[30%] bg-blend-difference absolute w-[180px] rotate-[-24.42deg] top-[140px] right-[280px]"
      />
      <Image
        src={senditcoin}
        alt="Background"
        className="hidden md:flex opacity-[20%] bg-blend-difference absolute w-[130px] rotate-[-56deg] top-[80px] right-[100px]"
      />

      <div className="w-full flex flex-col justify-center items-center z-10">
        <div className="flex flex-col items-center text-white ">
          <p className="text-4xl md:text-5xl xl:text-6xl font-bold italic">
            WELCOME
          </p>
          <p className="text-4xl md:text-5xl xl:text-6xl font-bold italic">
            TO THE JUNGLE!
          </p>
          <p className="text-2xl mt-2 font-medium italic">
            BUY AND SELL ANYTHING!
          </p>
        </div>
        <div className="flex flex-col w-fit items-center mt-16">
          <div className="border p-[3px] rounded-[8px] w-fit">
            <div className="flex border h-12 xl:h-14 p-1 w-[300px] xl:w-[550px] items-center rounded-[5px] bg-white">
              <input
                className="outline-none w-full h-full p-2"
                type="text"
                placeholder="Search anything"
              />
              <div className="flex items-center justify-center w-12 h-full rounded-[5px] bg-black hover:bg-[#52525C] transition-all duration-300">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 15 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5 13L10.6 10.1M12.1667 6.33333C12.1667 9.27885 9.77885 11.6667 6.83333 11.6667C3.88781 11.6667 1.5 9.27885 1.5 6.33333C1.5 3.38781 3.88781 1 6.83333 1C9.77885 1 12.1667 3.38781 12.1667 6.33333Z"
                    stroke="#FEFEFD"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-x-4 mt-6 w-[300px] xl:w-[550px] text-white">
            <div className="flex justify-center h-8 items-center bg-white bg-opacity-10 rounded-[2px] hover:bg-opacity-25 transition-all duration-200">
              Keyword
            </div>
            <div className="flex justify-center h-8 items-center bg-white bg-opacity-10 rounded-[2px] hover:bg-opacity-25 transition-all duration-200">
              Keyword
            </div>
            <div className="flex justify-center h-8 items-center bg-white bg-opacity-10 rounded-[2px] hover:bg-opacity-25 transition-all duration-200">
              Keyword
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// sm:px-[20px] md:px-[40px] lg:px-[60px] xl:px-[65px] 2xl:px-[100px]

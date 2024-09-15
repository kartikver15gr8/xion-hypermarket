"use client";

import WalletConnectBtn from "@/components/BorrowPageComp/WalletConnectBtn";
import Image from "next/image";
import Link from "next/link";
import whitenoise from "@/public/_static/background/whitenoise.png";
import blurbg from "@/public/_static/background/blurbg.png";
import shinegradient from "@/public/_static/background/shinegradient.png";
import noisebg from "@/public/_static/background/noisebg.png";
import thunderbg from "@/public/_static/background/thunderbg.png";
import bglines from "@/public/_static/background/bglines.png";
import usdc from "@/public/coins/usdccoin.png";
import KeplarConnect from "@/components/KeplarConnect";
import KeplrButton from "@/components/KeplrButton";
import mesh_square from "@/public/_static/illustrations/mesh_square.png";
import SideReveal from "@/components/framerEffects/SideReveal";

export default function page() {
  const arr = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
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
        className="opacity-[9%]"
      />

      <div className="relative z-10 h-[100vh] overflow-y-auto hide-scrollbar ">
        <div className="h-full relative w-full p-2">
          {/* <KeplrButton /> */}
          <div className=" flex flex-col md:flex-row justify-center items-center h-full">
            <Link
              href="/lend"
              className=" h-full flex justify-center items-center w-full hover:bg-[rgba(0,0,0,0.1)] transition-all duration-500 hover:backdrop-blur-lg rounded-md shadow-[inset_0px_2px_10px_rgba(0,0,0,0.1)]"
            >
              <CardBody first="LEND IT" second="TO EARN IT" third="3.4% APY" />
            </Link>

            {/* <div className="w-fit h-full z-20 justify-between flex flex-col">
              {arr.map((e, key) => {
                return (
                  <Image
                    key={key}
                    className="w-2 sm:w-2 md:w-3 rotate-45 bg-black"
                    src={mesh_square}
                    alt=""
                    width={10}
                    height={10}
                  />
                );
              })}
            </div> */}
            <Link
              href="/borrow/borrowone"
              className=" h-full flex justify-center items-center w-full hover:bg-[rgba(0,0,0,0.1)] transition-all duration-500 hover:backdrop-blur-lg rounded-md shadow-[inset_0px_2px_10px_rgba(0,0,0,0.1)]"
            >
              <CardBody
                first="BORROW IT"
                second="TO SPEND IT"
                third="7.4% APY"
              />
            </Link>
            <div className="absolute w-fit top-50 z-30 ">
              <Image
                className="w-32 md:w-36 lg:w-44 xl:w-52 2xl:w-56 hover:scale-110 transition-all duration-300 "
                src={usdc}
                width={200}
                height={200}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const CardBody = ({
  first,
  second,
  third,
}: {
  first: string;
  second: string;
  third: string;
}) => {
  return (
    <div className="flex flex-col font-bold italic  items-center">
      <p className="text-3xl lg:text-4xl xl:text-6xl 2xl:text-7xl">{first}</p>
      <p className="text-4xl  lg:text-4xl xl:text-6xl 2xl:text-7xl">{second}</p>
      <p className="text-3xl  lg:text-3xl xl:text-5xl 2xl:text-5xl">{third}</p>
    </div>
  );
};

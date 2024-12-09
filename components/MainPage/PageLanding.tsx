"use client";

import Image from "next/image";
import homebannertwo from "@/public/_static/background/HomeBannerTwo.png";
import shopifyHome from "@/public/_static/illustrations/shopifyHome.png";
import figmaHome from "@/public/_static/illustrations/figmaHome.png";
import xHome from "@/public/_static/illustrations/xHome.png";
import tradingHome from "@/public/_static/illustrations/tradingHome.png";
import { ProductInterface } from "@/lib/models";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { toast } from "sonner";
import herobg from "@/public/_static/background/Hero.jpeg";
import herotwo from "@/public/_static/background/newbanner.png";
import tabbg from "@/public/_static/background/tabbg.png";
import newbgsendit from "@/public/_static/background/newbgsendit.png";
import adobe from "@/public/senditbanner/adobe.png";
import tele from "@/public/senditbanner/tele.png";
import midjourney from "@/public/senditbanner/midjourney.png";
import disco from "@/public/senditbanner/discord.png";
import logodisk from "@/public/senditbanner/logodisk.png";
import cursor from "@/public/senditbanner/cursor.png";
import capsule from "@/public/senditbanner/capsule.png";
import figma from "@/public/senditbanner/figma.png";
import twitch from "@/public/senditbanner/twitch.png";
import shopify from "@/public/senditbanner/shopify.png";
import github from "@/public/senditbanner/github.png";
import chatgpt from "@/public/senditbanner/openai.png";
import homeBannerTwo from "@/public/_static/background/HeroFront.png";

import senditcoin from "@/public/senditbanner/senditCoin.png";
import basepad from "@/public/senditbanner/pad.png";
import WordRotate from "../ui/word-rotate";
import bannerdd from "@/public/_static/background/bannerrep.png";

function SearchForm({
  onSearch,
  handleSearchChange,
}: {
  onSearch: (event: React.FormEvent) => void;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <form onSubmit={onSearch} className="">
      <div className="flex  h-12 xl:h-14 p-1 w-[300px] xl:w-[550px] items-center rounded-[5px] bg-white">
        <input
          className="outline-none w-full h-full p-2"
          type="text"
          placeholder="Search anything"
          onChange={handleSearchChange}
        />
        <button
          type="submit"
          className="flex items-center justify-center w-12 h-full rounded-[5px] bg-black hover:bg-[#52525C] transition-all duration-300"
        >
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
        </button>
      </div>
    </form>
  );
}

function PageLandingContent() {
  const router = useRouter();
  const search = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const onSearch = (event: React.FormEvent) => {
    if (searchQuery.length >= 1) {
      event.preventDefault();
      const encodedSearchQuery = encodeURI(searchQuery);
      router.push(`/search?q=${encodedSearchQuery}`);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const images = [herobg, newbgsendit, herotwo];

  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((prevImg) => (prevImg + 1) % images.length);
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="pt-16 relative flex px-5 sm:px-8 lg:px-10 xl:px-24 h-[500px] justify-center md:h-[570px] lg:h-[550px] -black overflow-hidden">
      <Image
        src={homeBannerTwo}
        alt="Background"
        layout="fill"
        objectFit="cover"
      />

      <Image
        src={shopifyHome}
        className="absolute hidden lg:flex w-[50px] left-5 sm:left-5 md:left-[5%] lg:left-[7%] xl:left-[9%] sm:w-[130px] md:w-[140px] lg:w-[160px] xl:w-[130px] -rotate-6 top-28 h-fit"
        alt="shopify"
      />
      <Image
        src={figmaHome}
        className="absolute hidden lg:flex w-[50px] left-0 sm:left-5 md:left-[10%] lg:left-[13%] xl:left-16 sm:w-[120px] md:w-[130px] lg:w-[140px] xl:w-[140px] -rotate-6 bottom-10 h-fit"
        alt="x"
      />
      <Image
        src={tradingHome}
        className="absolute hidden lg:flex w-[50px] right-0 sm:right-5 md:right-[10%] lg:right-[13%] xl:right-16 sm:w-[120px] md:w-[130px] lg:w-[140px] xl:w-[140px] -rotate-6 bottom-10 h-fit"
        alt="shopify"
      />

      <Image
        src={xHome}
        className="absolute hidden lg:flex w-[50px] right-5 sm:right-5 md:right-[5%] lg:right-[7%] xl:right-[9%] sm:w-[130px] md:w-[140px] lg:w-[160px] xl:w-[130px] -rotate-6 top-28 h-fit"
        alt="figma"
      />

      {/* <Image
        src={disco}
        className="absolute hidden lg:flex sm:right-5 md:right-[5%] lg:right-[7%] xl:right-50 w-[40px] right-0 sm:w-[130px] md:w-[140px] lg:w-[160px] xl:w-[110px] rotate-6 top-28 h-fit"
        alt="trading"
        />
        
        <Image
        src={adobe}
        className="absolute hidden lg:flex sm:right-5 md:right-[5%] lg:right-[7%] xl:right-[18%] w-[50px] right-0 sm:w-[130px] md:w-[140px] lg:w-[160px] xl:w-[110px] rotate-6 -bottom-10 h-fit"
        alt="trading"
        />
        <Image
        src={shopify}
        className="absolute hidden lg:flex sm:right-5 md:right-[5%] lg:right-[7%] xl:right-[5%] w-[50px] right-0 sm:w-[100px] md:w-[140px] lg:w-[160px] xl:w-[120px] rotate-6 bottom-28 h-fit"
        alt="trading"
        />
        <Image
        src={twitch}
        className="absolute hidden lg:flex sm:right-5 md:right-[5%] lg:right-[7%] xl:right-[20%] w-[50px] right-0 sm:w-[130px] md:w-[140px] lg:w-[160px] xl:w-[110px] rotate-6 bottom-[30%] h-fit"
        alt="trading"
        /> */}
      {/* <div className=" absolute mt-20 flex  flex-col items-center">
        <p className="text-xl xl:text-6xl text-white font-bold italic mt-8 xl:mt-14">
        Start Your
        </p>
        <p className="text-xl xl:text-6xl text-white font-bold italic mt-1">
        Online Business Today!
        </p>
        <span className="text-lg xl:text-3xl text-white mt-1 italic flex items-center ml-1">
        <p>Buy and Sell</p>{" "}
        <WordRotate
        className="font-bold text-white mx-2"
        words={[
          "E-Books",
          "Leads",
          "Courses",
          "Trading Bots",
          "Services",
          "Private Groups",
          "AI Tools",
          "SaaS",
          ]}
          />
          </span>
          <div className="flex gap-x-2 items-center ">
          <button className="bg-white px-3 py-2 rounded-lg mt-4">
          Start Selling
          </button>
          <button className="bg-white px-5 py-2 rounded-lg mt-4">
          Buy Now
          </button>
          </div>
          </div> */}

      <div className="w-full flex flex-col z-10 items-center justify-center ">
        <div className="relative  flex flex-col items-center">
          <p className="text-4xl md:text-5xl xl:text-6xl text-white font-bold italic">
            Welcome To
          </p>
          <p className="text-4xl md:text-5xl xl:text-6xl text-white font-bold italic">
            The Web3 Marketplace
          </p>
          <span className="relative text-lg xl:text-2xl text-white lg:mt-2 italic flex items-center w-fit ">
            <p>Buy and Sell</p>{" "}
            <WordRotate
              className="font-bold text-white mx-2"
              words={[
                "Private Groups",
                "E-Books",
                "AI Agents",
                "Guides",
                "Leads",
                "Services",
                "Code",
                "SaaS",
              ]}
            />
            {/* <Image
              src={cursor}
              className="absolute w-[30px] -right-7 -bottom-6  md:w-[40px] rotate-6 h-fit"
              alt="trading"
            /> */}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function PageLanding() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <p className="text-4xl md:text-5xl xl:text-6xl font-bold italic animate-pulse opacity-0 transition-opacity duration-2000 ease-in-out delay-500">
            SENDIT
          </p>
        </div>
      }
    >
      <PageLandingContent />
    </Suspense>
  );
}

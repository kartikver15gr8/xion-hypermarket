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

import senditcoin from "@/public/senditbanner/senditCoin.png";
import basepad from "@/public/senditbanner/pad.png";

function SearchForm({
  onSearch,
  handleSearchChange,
}: {
  onSearch: (event: React.FormEvent) => void;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <form onSubmit={onSearch} className="">
      <div className="flex border h-12 xl:h-14 p-1 w-[300px] xl:w-[550px] items-center rounded-[5px] bg-white">
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

  return (
    <div className="pt-16 relative flex justify-center h-[500px] md:h-[570px] lg:h-[600px] border-black overflow-hidden">
      <Image
        src={newbgsendit}
        alt="Background"
        layout="fill"
        objectFit="cover"
      />

      <Image
        src={figma}
        className="absolute w-[90px] left-0 sm:left-5 md:left-[5%] lg:left-[7%] xl:left-[9%] sm:w-[130px] md:w-[140px] lg:w-[160px] xl:w-[120px] -rotate-6 top-28 h-fit"
        alt="figma"
      />

      <Image
        src={tele}
        className="absolute w-[100px] left-0 sm:left-5 md:left-[10%] lg:left-[13%] xl:left-[15%]  sm:w-[120px] md:w-[130px] lg:w-[140px] xl:w-[150px] -rotate-6 bottom-20 h-fit"
        alt="shopify"
      />
      <Image
        src={chatgpt}
        className="absolute w-[100px] left-0 sm:left-5 md:left-[10%] lg:left-[13%] xl:-left-5 sm:w-[120px] md:w-[130px] lg:w-[140px] xl:w-[90px] -rotate-6 bottom-52 h-fit"
        alt="shopify"
      />

      <Image
        src={capsule}
        className="absolute w-[100px] right-0 sm:right-5 md:right-[10%] lg:right-[13%] xl:left-[25%]  sm:w-[110px] md:w-[125px] lg:w-[130px] xl:w-[65px] -rotate-6 bottom-[50%] h-fit"
        alt="x"
      />

      {/* right side */}

      <Image
        src={disco}
        className="absolute sm:right-5 md:right-[5%] lg:right-[7%] xl:right-50 w-[100px] right-0 sm:w-[130px] md:w-[140px] lg:w-[160px] xl:w-[110px] rotate-6 top-28 h-fit"
        alt="trading"
      />

      <Image
        src={adobe}
        className="absolute sm:right-5 md:right-[5%] lg:right-[7%] xl:right-[18%] w-[100px] right-0 sm:w-[130px] md:w-[140px] lg:w-[160px] xl:w-[110px] rotate-6 -bottom-10 h-fit"
        alt="trading"
      />
      <Image
        src={shopify}
        className="absolute sm:right-5 md:right-[5%] lg:right-[7%] xl:right-[5%] w-[100px] right-0 sm:w-[100px] md:w-[140px] lg:w-[160px] xl:w-[120px] rotate-6 bottom-28 h-fit"
        alt="trading"
      />
      <Image
        src={twitch}
        className="absolute sm:right-5 md:right-[5%] lg:right-[7%] xl:right-[20%] w-[100px] right-0 sm:w-[130px] md:w-[140px] lg:w-[160px] xl:w-[110px] rotate-6 bottom-[30%] h-fit"
        alt="trading"
      />

      <div className="w-full flex flex-col justify-center items-center z-10">
        <div className=" relative flex items-center  flex-col rounded-2xl h-[300px] w-[500px] bg-[#868686] border-b-4 border-[#515151] shadow-xl shadow-black px-4">
          <Image
            src={midjourney}
            className="absolute -left-10 w-[100px] right-0   xl:w-[76px] rotate-6 bottom-20 h-fit"
            alt="trading"
          />
          <Image
            src={github}
            className="absolute -right-5 -top-10 w-[100px]  sm:w-[130px] md:w-[140px] lg:w-[160px] xl:w-[80px] rotate-6 h-fit"
            alt="trading"
          />
          <Image
            src={cursor}
            className="absolute sm:right-5 md:right-[5%] lg:right-[7%] xl:right-[16%] w-[100px]  sm:w-[130px] md:w-[140px] lg:w-[160px] xl:w-[50px] rotate-6 -bottom-5 h-fit"
            alt="trading"
          />
          <Image
            src={senditcoin}
            className="absolute w-[100px]  sm:w-[130px] md:w-[140px] lg:w-[160px] xl:w-[100px] left-[40%] rotate-3 -top-14 h-fit"
            alt="trading"
          />
          <p className="text-4xl text-white font-bold italic mt-14">
            Start Your
          </p>
          <p className="text-4xl text-white font-bold italic">
            Online Business Today!
          </p>
          <p className="text-2xl text-white mt-2 italic">
            Buy & Sell Anything!
          </p>
          <div className="bg-[#252525] grid grid-cols-2 shadow-[inset_-70px_-50px_60px_rgba(0,0,0,0.1)] h-20 w-full rounded-full mt-5 text-white">
            <div className="border-r-2 border-[#868686] flex items-center justify-center gap-x-2">
              <svg
                className="w-7"
                viewBox="0 0 38 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.9383 32.3228C18.6883 32.3228 18.5321 32.1822 18.4956 32.1509L4.25085 17.9062C0.860222 14.8384 -0.306444 10.1614 1.27689 6.28115C3.11543 1.75511 7.76647 0.578026 8.07897 0.505108C12.0686 -0.427182 16.3394 1.30719 18.9436 4.84886C21.5425 1.30719 25.8133 -0.427182 29.8029 0.505108C30.0061 0.551983 34.7456 1.70302 36.605 6.28115C38.1988 10.1926 37.0008 14.8645 33.6311 17.9062L19.3863 32.1509C19.355 32.1822 19.1883 32.3228 18.9383 32.3228ZM8.32897 1.58844C8.06856 1.65094 3.93835 2.6874 2.30293 6.69782C0.886264 10.1822 1.97481 14.3593 5.00606 17.0884L5.02689 17.1093L18.9436 31.0207L32.8758 17.0884C35.9071 14.3593 36.9956 10.1822 35.579 6.69782C33.9279 2.65094 29.73 1.63011 29.5529 1.58844C25.7665 0.703026 21.6936 2.53115 19.4123 6.13532L18.9436 6.8749L18.4696 6.13532C16.1883 2.51032 12.079 0.708234 8.32897 1.58844Z"
                  fill="white"
                />
              </svg>

              <p>Wishlist</p>
            </div>
            <div className=" flex items-center justify-center gap-x-2">
              <svg
                className="w-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="#FFF"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M16.5 21a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m-8 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M3.71 5.4h15.214c1.378 0 2.373 1.27 1.995 2.548l-1.654 5.6C19.01 14.408 18.196 15 17.27 15H8.112c-.927 0-1.742-.593-1.996-1.452zm0 0L3 3"
                />
              </svg>
              <p>Place Order</p>
            </div>
          </div>
        </div>

        {/* <div className="flex flex-col items-center text-white">
          <p className="text-4xl md:text-5xl xl:text-6xl font-bold italic">
            WELCOME
          </p>
          <p className="text-4xl md:text-5xl xl:text-6xl font-bold italic">
            TO THE JUNGLE!
          </p>
          <p className="text-2xl mt-2 font-medium italic">
            BUY AND SELL ANYTHING!
          </p>
        </div> */}
        {/* <div className="flex flex-col w-fit items-center mt-16">
          <div className="border p-[3px] rounded-[8px] w-fit">
            <SearchForm
              onSearch={onSearch}
              handleSearchChange={handleSearchChange}
            />
          </div>
        </div> */}
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

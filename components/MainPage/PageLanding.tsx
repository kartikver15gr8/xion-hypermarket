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
      <Image src={herotwo} alt="Background" layout="fill" objectFit="cover" />

      {/* <Image
        src={shopifyHome}
        className="absolute w-[100px] left-0 sm:left-5 md:left-[10%] lg:left-[13%] xl:left-[15%] opacity-20 sm:opacity-35 md:opacity-45 lg:opacity-80 sm:w-[120px] md:w-[130px] lg:w-[140px] xl:w-[150px] -rotate-6 top-20 h-fit"
        alt="shopify"
      />
      <Image
        src={figmaHome}
        className="absolute w-[120px] left-0 sm:left-5 md:left-[5%] lg:left-[7%] xl:left-[9%] opacity-15 sm:opacity-35 md:opacity-45 lg:opacity-80 sm:w-[130px] md:w-[140px] lg:w-[160px] xl:w-[200px] -rotate-6 bottom-10 h-fit"
        alt="figma"
      />
      <Image
        src={xHome}
        className="absolute w-[100px] right-0 sm:right-5 md:right-[10%] lg:right-[13%] xl:right-[15%] opacity-20 sm:opacity-35 md:opacity-45 lg:opacity-100 sm:w-[110px] md:w-[125px] lg:w-[130px] xl:w-[140px] -rotate-6 top-25 h-fit"
        alt="x"
      />
      <Image
        src={tradingHome}
        className="absolute sm:right-5 md:right-[5%] lg:right-[7%] xl:right-[10%] w-[100px] right-0 opacity-20 sm:opacity-35 md:opacity-45 lg:opacity-80 sm:w-[130px] md:w-[140px] lg:w-[160px] xl:w-[200px] rotate-6 bottom-5 h-fit"
        alt="trading"
      /> */}

      <div className="w-full flex flex-col justify-center items-center z-10">
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

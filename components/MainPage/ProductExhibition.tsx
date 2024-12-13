"use client";

import Image, { StaticImageData } from "next/image";
import { Button } from "../ui/button";
import senditcoin from "@/public/coins/senditcoin.png";

import invertcube from "@/public/invertcube.svg";
import { ProductInterface } from "@/lib/models";
import { useRouter } from "next/navigation";
import WordRotate from "../ui/word-rotate";
import galacticspace from "@/public/_static/background/galacticspace.png";
import randomstatic from "@/public/randomstatic.png";
import jungle from "@/public/_static/background/jungle.png";

import coins from "@/public/_static/background/apesbanner.png";
import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import bannerforDont from "@/public/_static/background/newbgsendit.png";
import coinbg from "@/public/_static/background/coinbg.png";
import solana from "@/public/coins/solana.png";

import bitcoin from "@/public/coins/btc.png";
import ethereum from "@/public/coins/ethereum.png";

import osmosis from "@/public/coins/osmo.png";

import Link from "next/link";
import circleshade from "@/public/circleshade.svg";
import senditape from "@/public/sendit_ape.svg";
import dontmissillu from "@/public/dontmissillu.svg";
import productone from "@/public/productone.svg";
import producttwo from "@/public/producttwo.svg";
import productthree from "@/public/productthree.svg";
import productfour from "@/public/productfour.svg";
import productfive from "@/public/productfive.svg";
import productsix from "@/public/productsix.svg";
import chingari from "@/public/chingari.svg";

import creativestrategy from "@/public/creativestrategy.svg";
import flstudio from "@/public/flstudio.svg";
import gaming from "@/public/gaming.svg";

import gamecurrency from "@/public/gamecurrency.svg";

import gamecard from "@/public/_static/illustrations/gamecard.png";
import blinkscard from "@/public/_static/illustrations/Blinks.png";
import gameski from "@/public/_static/illustrations/gameski.png";

import ecom from "@/public/_static/illustrations/ecom.png";
import shopify from "@/public/_static/illustrations/shopifyprod.png";

import bannerbgtwo from "@/public/_static/background/bannerbgtwo.png";

// marquee icons
import ecommicon from "@/public/marqueeicons/ecomautomation.png";
import aibook from "@/public/marqueeicons/aibook.png";
import ecomseomastery from "@/public/marqueeicons/ecomseomastery.png";
import finbook from "@/public/marqueeicons/finbook.png";
import psone from "@/public/marqueeicons/psone.png";
import tradinguide from "@/public/marqueeicons/tradingguide.png";
import truclassic from "@/public/marqueeicons/truclassic.png";
import socialmanager from "@/public/marqueeicons/socialmediamanager.png";
import billingmanager from "@/public/marqueeicons/billingmanager.png";
import lowpoly from "@/public/marqueeicons/lowpolygameassets.png";
import logodesignicon from "@/public/marqueeicons/logodesign.png";
import markettooling from "@/public/marqueeicons/markettool.png";
import { useEffect, useState } from "react";
import axios from "axios";
import spinnerthree from "@/public/loaders/spinnerthree.svg";

const reviews = [
  {
    name: "Ecommerce Sales Boosting",
    imgURL: ecommicon,
    redirectHref: "neutron",
  },
  {
    name: "AI Content Generator",
    imgURL: aibook,
    redirectHref: "atom",
  },
  {
    name: "UI Kits",
    imgURL: finbook,
    redirectHref: "solana",
  },
  {
    name: "Social Media Automation Tools",
    imgURL: psone,
    redirectHref: "celestia",
  },
  {
    name: "SEO Optimization",
    imgURL: ecomseomastery,
    redirectHref: "bitcoin",
  },
  {
    name: "Crypto Trading Bots",
    imgURL: tradinguide,
    redirectHref: "injective",
  },
  {
    name: "E-Commerce Store Templates",
    imgURL: truclassic,
    redirectHref: "ethereum",
  },
  {
    name: "Social Media Manager",
    imgURL: socialmanager,
    redirectHref: "ethereum",
  },
  {
    name: "Billing Manager",
    imgURL: billingmanager,
    redirectHref: "ethereum",
  },
  {
    name: "Market Analytics",
    imgURL: markettooling,
    redirectHref: "ethereum",
  },
  {
    name: "Low Poly Game Assets",
    imgURL: lowpoly,
    redirectHref: "ethereum",
  },
  {
    name: "Logo Design",
    imgURL: logodesignicon,
    redirectHref: "ethereum",
  },
];

export default function ProductExhibition() {
  return (
    <div className="mb-10">
      <div className="px-[10px] sm:px-[20px] md:px-[40px] lg:px-[60px] xl:px-[80px] 2xl:px-[100px]">
        <Trading />
        <DontMissBanner />
        <HotDigitalProducts />
        {/* <TopRanking sectionTitle="Top Ranking" /> */}
        <Category />
        {/* <NewThisWeek /> */}
        {/* <TopRanking sectionTitle="Top Deals" /> */}
        <DappCard />
        {/* <NewArrival /> */}
        {/* <DiscountTokens /> */}
        <GamingCollectibles />
      </div>
      <LiquidationBanner />
      <div className="px-[10px] sm:px-[20px] md:px-[40px] lg:px-[60px] xl:px-[80px] 2xl:px-[100px]">
        {/* <BottomBanner /> */}
        <DesignUIUX />
      </div>
    </div>
  );
}

const TopRanking = ({ sectionTitle }: { sectionTitle: string }) => {
  return (
    <div className="relative mt-10 ">
      <div className="absolute z-30  flex justify-center items-center w-10 h-10 rounded bg-black left-0 top-[45%] hover:bg-[#3e3e3e] transition-all duration-200">
        <svg
          width="8"
          height="15"
          viewBox="0 0 8 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 1.4978L0.999999 7.4978L7 13.4978"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="absolute z-30  flex justify-center items-center w-10 h-10 rounded bg-black right-0 top-[45%] hover:bg-[#3e3e3e] transition-all duration-200">
        <svg
          width="8"
          height="15"
          viewBox="0 0 8 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 13.4978L7 7.4978L1 1.4978"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="flex mb-6 justify-between items-center">
        <p className="font-medium text-lg md:text-xl xl:text-2xl">
          {sectionTitle}
        </p>
        <Button className="px-4 h-8  hover:bg-[#52525C] transition-all duration-300">
          See all
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-3 lg:gap-x-4 xl:gap-x-8 gap-y-6">
        <CoinCard
          itemImg={senditcoin}
          itemName="Sendit Coin"
          price={99}
          star={5}
          reviews={389}
        />
        <CoinCard
          itemImg={senditcoin}
          itemName="Sendit Coin"
          price={99}
          star={5}
          reviews={389}
        />
        <CoinCard
          itemImg={senditcoin}
          itemName="Sendit Coin"
          price={99}
          star={5}
          reviews={389}
        />
        <CoinCard
          itemImg={senditcoin}
          itemName="Sendit Coin"
          price={99}
          star={5}
          reviews={389}
        />
      </div>
    </div>
  );
};

const CoinCard = ({
  itemImg,
  itemName,
  reviews,
  price,
  star,
}: {
  itemImg: StaticImageData | string;
  itemName: string;
  reviews: number;
  price: number;
  star: number;
}) => {
  return (
    <div className="">
      <div className="py-[18%] flex items-center justify-center bg-[#F5F5F5] rounded-[2px] shadow-[inset_5px_7px_30px_rgba(0,0,0,0.04)] hover:bg-[#dbdbdb] transition-all duration-300">
        <Image className="w-[60%]" src={itemImg} alt="Background" />
      </div>
      <div className="mt-2">
        <p className="text-[12px] md:text-[14px] font-medium">{itemName}</p>
        <div className="flex gap-x-1 sm:gap-x-2">
          <div className="flex items-center">
            {[...Array(star)].map((_, index) => (
              <svg
                key={index}
                className="w-2 h-2 sm:w-3 sm:h-3"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.90919 0.196866C6.94494 0.119379 7.05506 0.119379 7.09081 0.196866L8.95151 4.23087C8.96608 4.26245 8.99601 4.2842 9.03055 4.28829L13.4421 4.81135C13.5268 4.8214 13.5609 4.92614 13.4982 4.98408L10.2366 8.00029C10.2111 8.0239 10.1997 8.05909 10.2065 8.0932L11.0722 12.4505C11.0889 12.5342 10.9998 12.5989 10.9253 12.5572L7.04884 10.3873C7.0185 10.3704 6.9815 10.3704 6.95116 10.3873L3.07468 12.5572C3.00022 12.5989 2.91112 12.5342 2.92776 12.4505L3.79354 8.0932C3.80032 8.05909 3.78889 8.0239 3.76335 8.00029L0.501775 4.98408C0.439125 4.92614 0.473156 4.8214 0.557896 4.81135L4.96946 4.28829C5.00399 4.2842 5.03392 4.26245 5.04849 4.23087L6.90919 0.196866Z"
                  fill="black"
                />
              </svg>
            ))}
          </div>
          <p className="text-[10px] sm:text-[12px] text-[#1B1B1B]">
            {reviews} reviews
          </p>
        </div>
        <div className="flex items-center justify-between p-1 bg-[#F7F7F7]">
          <p className="text-[12px] text-[#1B1B1B]">From:</p>
          <p className="font-medium">{price} USDC</p>
        </div>
        <div>
          <button className="text-[9px] pt-[1px] px-[3px] rounded-[2px] bg-black text-white">
            SEGMENTATION
          </button>
        </div>
      </div>
    </div>
  );
};

import { CategoryInterface, ProductInterfaceTwo } from "@/lib/models";
import { categoryImages } from "@/lib/categoryimg";

const Category = () => {
  // storing categories
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const CategoryImages = categoryImages;
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SWAGGER_API_V2}/categories`
      );
      // console.log(response.data);
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.log(`Error occured while fetching the categories: ${error}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="mt-10">
      <div className="flex mb-6 justify-between items-center">
        <p className="font-medium text-lg md:text-xl xl:text-2xl">
          Explore Category&apos;s
        </p>
        <Button
          onClick={toggleShowAll}
          className="px-4 h-8  hover:bg-[#52525C] transition-all duration-300"
        >
          {showAll ? "Show Less" : "See All"}
        </Button>
      </div>
      {loading && (
        <div className="flex justify-center mt-2">
          <Image className="w-10 lg:w-12" src={spinnerthree} alt="" />
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-2 md:gap-x-4 gap-y-2 md:gap-y-4">
        {categories && (
          <>
            {categories
              .slice(0, showAll ? categories.length : 6)
              .map((elem, key) => (
                <CategoryCard
                  id={elem.id}
                  key={key}
                  bg={elem.thumbnail_url}
                  categoryName={elem.name}
                  description={elem.description}
                  bgClass="opacity-[13%] bg-blend-luminosity absolute w-[250px] -bottom-[40px] -right-[40px]"
                />
              ))}
          </>
        )}
      </div>
    </div>
  );
};

const CategoryCard = ({
  bg,
  id,
  categoryName,
  description,
  bgClass,
}: {
  bg: StaticImageData | string;
  id: number | string;
  categoryName: string;
  description: string;
  bgClass: string;
}) => {
  return (
    <Link
      href={`/product/category/${id}`}
      className=" p-3 md:p-4 lg:p-5 relative flex justify-center flex-col h-32 xl:h-44 2xl:h-48 border border-[#E5E5E5] rounded-xl xl:rounded-2xl overflow-hidden shadow-[inset_-70px_-50px_60px_rgba(0,0,0,0.08)]  hover:bg-[#dbdbdb] transition-all duration-300"
    >
      <Image
        src={bg}
        alt="Background"
        className={`${bgClass}`}
        width={200}
        height={200}
      />
      <div className="">
        <div className="">
          <p className="text-[16px] md:text-lg lg:text-xl font-medium">
            {categoryName}
          </p>
          <p className="text-[10px] text-[#7c7d7d] md:text-xs md:mt-2">
            {description}
          </p>
        </div>
        <div className="flex items-center gap-x-1 cursor-pointer sm:gap-x-2 md:gap-x-3 mt-2 sm:mt-4 md:mt-8 lg:mt-10">
          <p className="text-sm md:text-[15px] ">Explore</p>
          <svg
            className="w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
          >
            <path
              fill="black"
              d="M754.752 480H160a32 32 0 1 0 0 64h594.752L521.344 777.344a32 32 0 0 0 45.312 45.312l288-288a32 32 0 0 0 0-45.312l-288-288a32 32 0 1 0-45.312 45.312z"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};

const DappCard = () => {
  return (
    <div className="relative bg-black rounded-xl mt-10 h-[200px] md:h-[300px] shadow-[inset_-90px_70px_90px_rgba(0,0,0,0.1)] overflow-hidden ">
      <Image
        src={coins}
        alt="Background"
        className="opacity-60"
        layout="fill"
        objectFit="cover"
      />

      <div className="relative px-4 lg:px-16 h-full flex flex-col items-center justify-center">
        <div className="w-fit flex flex-col items-center text-white ">
          <p className="font-bold text-[20px] sm:text-[25px] md:text-[30px] lg:text-[35px] xl:text-[40px]">
            Join Our Affiliates Program
          </p>
          <p className="font-medium text-[16px] sm:text-[25px] md:text-[30px] lg:text-[35px] xl:text-[25px]">
            Earn Commissions in Crypto
          </p>
        </div>
        <Button className=" h-8 md:h-10 text-[12px] lg:text-[18px] mt-2 sm:mt-4 lg:mt-6 lg:w-52 rounded-lg  bg-white text-black  hover:bg-[#e1e4e7] transition-all duration-300 ">
          Become an Affiliate
        </Button>
      </div>
    </div>
  );
};

const NewArrival = () => {
  return (
    <div className="mt-10">
      <div className="mb-6 justify-between items-center">
        <p className="font-medium text-lg md:text-xl xl:text-2xl">
          New Arrivals
        </p>
        <p className="text-[10px] md:text-[12px] md:mt-1">
          Get the inspiration you need with our curated collections adn boost
          your creativity
        </p>
      </div>
      <div className="grid grid-cols-10 gap-x-1 md:gap-x-2 lg:gap-x-4">
        <div className="col-span-4">
          <CoinCard
            itemImg={senditcoin}
            itemName="Sendit Coin"
            price={99}
            star={5}
            reviews={389}
          />
        </div>
        <div className="col-span-6">
          <div className="grid grid-cols-3 gap-x-1 md:gap-x-2 lg:gap-x-4 gap-y-1 md:gap-y-2 lg:gap-y-4 xl:gap-y-8">
            <ArrivalItem
              itemImg={senditcoin}
              itemName="Sendit Coin"
              price={99}
              star={5}
              reviews={389}
            />
            <ArrivalItem
              itemImg={senditcoin}
              itemName="Sendit Coin"
              price={99}
              star={5}
              reviews={389}
            />
            <ArrivalItem
              itemImg={senditcoin}
              itemName="Sendit Coin"
              price={99}
              star={5}
              reviews={389}
            />
            <ArrivalItem
              itemImg={senditcoin}
              itemName="Sendit Coin"
              price={99}
              star={5}
              reviews={389}
            />
            <ArrivalItem
              itemImg={senditcoin}
              itemName="Sendit Coin"
              price={99}
              star={5}
              reviews={389}
            />
            <div className="relative border rounded lg:rounded-xl flex px-1 md:px-2 xl:px-4 justify-center flex-col text-white shadow-[inset_-90px_70px_90px_rgba(0,0,0,0.8)] bg-[#666565]">
              <Image
                src={randomstatic}
                alt="Background"
                layout="fill"
                objectFit="cover"
                className="opacity-[10%] bg-blend-luminosity sm:px-[20px] md:px-[40px] lg:px-[60px] xl:px-[80px] 2xl:px-[100px] rounded-xl"
              />
              <Image
                src={galacticspace}
                alt="Background"
                layout="fill"
                objectFit="cover"
                className="opacity-[10%] bg-blend-luminosity rounded-xl"
              />
              <div className="relative z-20">
                <p className="text-[10px] sm:text-[12px] md:text-[14px] lg:text-[20px] xl:text-[28px] font-medium">
                  What&apos;s New?
                </p>
                <div className=" w-[100%] lg:w-[80%] ">
                  <p className="text-[7px] hidden md:flex md:text-[8px] lg:text-[9px] xl:text-[11px]">
                    Discover new products listed on sendit, a decentralized web3
                    store
                  </p>
                </div>

                <Button className="text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] w-full rounded lg:rounded-lg mt-1 sm:mt-2 md:mt-3 lg:mt-4 xl:mt-6 h-6 sm:h-8 lg:h-10  bg-white text-black hover:bg-[#a5a3a3] transition-all duration-300">
                  See what&apos; new
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ArrivalItem = ({
  itemImg,
  itemName,
  reviews,
  price,
  star,
}: {
  itemImg: StaticImageData | string;
  itemName: string;
  reviews: number;
  price: number;
  star: number;
}) => {
  return (
    <div className="">
      <div className="py-[15%] flex items-center justify-center bg-[#F5F5F5] rounded-[2px] shadow-[inset_5px_7px_30px_rgba(0,0,0,0.04)] hover:bg-[#dbdbdb] transition-all duration-300">
        <Image className="w-[50%]" src={itemImg} alt="Background" />
      </div>
      <div className="mt-[2px] md:mt-1 lg:mt-2">
        <p className="text-[10px] md:text-[12px] xl:text-[14px] font-medium">
          {itemName}
        </p>
        <div className="flex gap-x-1 lg:gap-x-2">
          <div className="w-full  justify-between flex">
            <div className="flex items-center">
              {[...Array(star)].map((_, index) => (
                <svg
                  key={index}
                  className="w-2 h-2 md:w-3 md:h-3"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.90919 0.196866C6.94494 0.119379 7.05506 0.119379 7.09081 0.196866L8.95151 4.23087C8.96608 4.26245 8.99601 4.2842 9.03055 4.28829L13.4421 4.81135C13.5268 4.8214 13.5609 4.92614 13.4982 4.98408L10.2366 8.00029C10.2111 8.0239 10.1997 8.05909 10.2065 8.0932L11.0722 12.4505C11.0889 12.5342 10.9998 12.5989 10.9253 12.5572L7.04884 10.3873C7.0185 10.3704 6.9815 10.3704 6.95116 10.3873L3.07468 12.5572C3.00022 12.5989 2.91112 12.5342 2.92776 12.4505L3.79354 8.0932C3.80032 8.05909 3.78889 8.0239 3.76335 8.00029L0.501775 4.98408C0.439125 4.92614 0.473156 4.8214 0.557896 4.81135L4.96946 4.28829C5.00399 4.2842 5.03392 4.26245 5.04849 4.23087L6.90919 0.196866Z"
                    fill="black"
                  />
                </svg>
              ))}
              <p className="hidden lg:flex text-[10px] sm:text-[12px] lg:ml-1 text-[#1B1B1B]">
                {reviews} reviews
              </p>
            </div>
            <div className="flex items-center gap-x-1 justify-between">
              <p className="font-medium text-[10px] md:text-[14px]">{price}</p>
              <p className="font-medium text-[8px] md:text-[14px]">USDC</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LiquidationBanner = () => {
  return (
    <div className="mt-10 bg-[#F6F6F6] h-[541px] sm:px-[20px] md:px-[40px] lg:px-[60px] xl:px-[80px] 2xl:px-[100px]">
      <div className=" w-full h-full flex flex-col items-center py-8 fade-sides">
        <div className="flex gap-x-1 items-center ">
          <svg
            className="w-4 h-4"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5 0.5C5 0.5 0.5 5 0.5 10.5C0.5 16 5 20.5 10.5 20.5C16 20.5 20.5 16 20.5 10.5C20.5 5 16 0.5 10.5 0.5ZM7.33 5.55C8.31 5.55 9.1 6.34 9.1 7.33C9.1 8.31 8.31 9.1 7.33 9.1C6.34 9.1 5.55 8.31 5.55 7.33C5.55 6.34 6.34 5.55 7.33 5.55ZM13.72 15.5C12.74 15.5 11.95 14.7 11.95 13.72C11.95 12.74 12.74 11.95 13.72 11.95C14.7 11.95 15.5 12.74 15.5 13.72C15.5 14.7 14.7 15.5 13.72 15.5ZM7 15.53L5.5 14.03L14.03 5.5L15.53 7L7 15.53Z"
              fill="#050505"
            />
          </svg>
          <p>LISTED PRODUCTS</p>
        </div>
        <p className="text-2xl font-medium mt-4">GRAB BEST DEALS</p>
        <div className="w-full sm:px-[20px] md:px-[40px] lg:px-[60px] xl:px-[80px] 2xl:px-[100px] mt-10">
          <LiquidationsTokenMarquee />
        </div>
      </div>
    </div>
  );
};

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  imgUrl,
  name,
  redirectHref,
}: // body,
{
  imgUrl: string | StaticImageData;
  name: string;
  redirectHref: string;
  // body: string;
}) => {
  return (
    <Link
      href={redirectHref}
      className="p-[5px] border-[1px] border-[#cdcdce] rounded-xl shadow-md bg-[#fefefd] "
    >
      <figure
        className={cn(
          "relative w-40 md:w-48  cursor-pointer overflow-hidden rounded-md  justify-between flex ",
          // light styles
          "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
          // dark styles
          "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
        )}
      >
        <div className=" flex items-center h-16 lg:h-20 justify-center gap-x-2">
          <div className="relative bg-white border border-[#cdcdce] flex items-center justify-center rounded-lg w-16 h-16 lg:w-20  lg:h-20 ">
            <Image
              className="w-[100%] rounded-md z-10 "
              alt=""
              src={imgUrl}
              layout="fill"
            />
          </div>
          <div className="flex flex-col  w-24">
            <div className="flex flex-col  w-full">
              <p className="text-[12px] sm:text-[14px] md:text-[14px] xl:text-[14px] text-black font-medium dark:text-white/40">
                {`${name.slice(0, 20)}…`}
              </p>
            </div>
            <div className="mt-2 font-teachers flex items-center gap-x-1 text-[12px]">
              <button className="">Buy</button>
              <svg
                width="10"
                height="7"
                viewBox="0 0 10 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 3.5H9M9 3.5L6 0.5M9 3.5L6 6.5"
                  stroke="#4B4B54"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
        {/* <blockquote className="mt-2 text-sm">{body}</blockquote> */}
      </figure>
    </Link>
  );
};

export function LiquidationsTokenMarquee() {
  const [marqueeProducts, setMarqueeProducts] = useState<ProductInterfaceTwo[]>(
    []
  );

  const fetchMarqueeProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SWAGGER_API_V2}/products?limit=20`
      );
      setMarqueeProducts(response.data);
      // console.log(response.data);
    } catch (error) {
      console.log(`You got an error: ${error}`);
    }
  };

  useEffect(() => {
    fetchMarqueeProducts();
  }, []);

  const firstRow = marqueeProducts.slice(0, marqueeProducts.length / 2);
  const secondRow = marqueeProducts.slice(marqueeProducts.length / 2);

  return (
    <div className="relative flex h-fit w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-none">
      <Marquee pauseOnHover className="[--duration:30s]">
        {firstRow.map((review) => (
          <ReviewCard
            key={review.name}
            {...review}
            imgUrl={review.thumbnail_url}
            redirectHref={`/product/${review.slug}`}
          />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:30s]">
        {secondRow.map((review) => (
          <ReviewCard
            key={review.name}
            {...review}
            imgUrl={review.thumbnail_url}
            redirectHref={`/product/${review.slug}`}
          />
        ))}
      </Marquee>
      <Marquee pauseOnHover className="[--duration:50s]">
        {marqueeProducts.map((review) => (
          <ReviewCard
            key={review.name}
            {...review}
            imgUrl={review.thumbnail_url}
            redirectHref={`/product/${review.slug}`}
          />
        ))}
      </Marquee>
      {/* with side shadows */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#F5F5F5] dark:from-background opacity-90 "></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#F5F5F5] dark:from-background opacity-90"></div>
    </div>
  );
}

const BottomBanner = () => {
  return (
    <div className=" w-full mt-10">
      {/* <NewThisWeek /> */}
      <div className="relative mt-10 border w-full h-[500px] lg:h-[700px] flex justify-center rounded-xl bg-[#adabab]">
        <Image
          src={jungle}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-[21%] bg-blend-luminosity rounded-xl"
        />
        <div className="relative z-40 flex flex-col items-center w-[40%] justify-center">
          <p className="text-4xl md:text-5xl xl:text-6xl font-bold italic">
            NOT DONE
          </p>
          <p className="mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit!
          </p>
          <p>Lorem ipsum dolor sit.</p>
          <Button className="w-48 rounded-lg mt-10 hover:bg-[#4e6466] transition-all duration-300">
            See all
          </Button>
        </div>
      </div>
    </div>
  );
};

const NewThisWeek = () => {
  return (
    <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 md:gap-x-3 lg:gap-x-4 gap-y-2">
      <div className="relative rounded-xl flex px-2 md:px-3 xl:px-4 justify-center flex-col">
        <div className="relative z-20">
          <p className="text-[20px] lg:text-[28px]  font-medium">
            New This Week
          </p>
          <div className=" w-[80%] ">
            <p className="text-[11px]">
              Get the inspiration you need with our curated collections and
              boost your creativity
            </p>
          </div>

          <Button className="w-36 lg:w-44 h-8 lg:h-10 rounded lg:rounded-lg mt-6 hover:bg-[#a5a3a3] transition-all duration-300">
            See what&apos; new
          </Button>
        </div>
      </div>
      <HotProductCard
        redirectHref="/product/uidesign"
        img={gaming}
        category="Digital Product"
        productName="Gamified Life OS"
        description="Go Zero to Hero by turning every task, habit, and goal into an EXP-earning adventure"
        price="$150 per month"
      />
      <HotProductCard
        redirectHref="/product/uidesign"
        img={flstudio}
        category="Digital Product"
        productName="FL Studio Vocal Guide"
        description="This guide covers everything from recording crystal-clear vocals to advanced mixing tips."
        price="$49 one time payment"
      />
      <HotProductCard
        redirectHref="/product/uidesign"
        img={creativestrategy}
        category="Digital Product"
        productName="Creative Strategy Course"
        description="Designed for fellow creative strategists, media buyers, and other marketing roles."
        price="$150 one time payment"
      />
    </div>
  );
};

const DontMissBanner = () => {
  const router = useRouter();

  return (
    <div className="relative overflow-hidden flex flex-col h-[200px] mt-10 rounded-xl  text-white">
      <Image
        src={bannerforDont}
        className="opacity-100"
        alt="Background"
        layout="fill"
        objectFit="cover"
      />
      <Image
        src={productone}
        className="absolute w-[100px] opacity-45 lg:opacity-100 xl:w-[150px] rotate-6 top-5 xl:left-[18%] h-fit "
        alt="osmosis"
      />
      <Image
        src={producttwo}
        className="absolute w-[100px] opacity-55 lg:opacity-100 xl:w-[150px] h-fit top-[58%] xl:top-[38%] left-[5%] xl:left-[13%]"
        alt="MeV bots"
      />
      <Image
        src={productthree}
        className="absolute w-[100px] xl:w-[150px] h-fit top-16 xl:top-6 left-[14%] xl:left-[5%] -rotate-12 opacity-35 lg:opacity-100"
        alt="bitcoin"
      />
      <Image
        src={productthree}
        className="absolute opacity-35 lg:opacity-100 w-fit h-fit -bottom-2 -right-8 xl:-right-3 z-10 rotate-6 "
        alt="bitcoin"
      />
      <Image
        src={productsix}
        className="absolute w-fit h-fit top-10 left-0 opacity-75 "
        alt="dydx"
      />
      <Image
        src={productsix}
        className="absolute w-fit h-fit top-10 right-0 z-10 rotate-180 "
        alt="dydx"
      />

      <Image
        src={productfour}
        className="absolute opacity-40 lg:opacity-100 h-fit -right-4 lg:right-14 -top-5 lg:top-4 rotate-3 z-10 w-[150px]
       "
        alt="solana"
      />
      <Image
        src={productfive}
        className="absolute w-[130px] h-fit top-[30%] -rotate-12 z-10 right-[15%] opacity-20 lg:opacity-100 "
        alt="figma"
      />

      <Image src={dontmissillu} className="absolute w-full h-full" alt="" />
      {/* <ProductBanner
        name="MEV BOT"
        productName="Trading Bot"
        imgUrl={bitcoin}
        redirectHref ="/product/uidesign"
        className="absolute"
      /> */}
      <Image
        src={circleshade}
        className="absolute h-full right-0 rotate-180 opacity-65"
        alt=""
      />

      <div className="relative  flex flex-col z-30 items-center justify-center h-full">
        <div className="flex items-center">
          <Image
            src={senditape}
            alt=""
            className="w-10 h-10 invert"
            width={200}
            height={200}
          />

          <p className="">Earn in Crypto </p>
        </div>
        <p className="text-4xl font-medium mt-1">Start Your Business Today</p>
        <Button
          onClick={() => {
            router.push("/product");
          }}
          className="text-md mt-5 bg-white text-black hover:bg-blue-500 transition-all duration-200"
        >
          Start Selling
        </Button>
      </div>
    </div>
  );
};

const HotDigitalProducts = () => {
  const [products, setProducts] = useState<ProductInterfaceTwo[]>([]);
  const [loading, setLoading] = useState(true);

  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const fetchProducts = async () => {
    try {
      // fetching by specific category
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SWAGGER_API_V2}/products?category_id=4ce9b528-3454-48ff-b0da-b5989eab5580`
      );
      // console.log(response.data);

      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.log(`Error while fetching products: ${error}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="relative overflow-hidden flex flex-col mt-10 rounded-xl  border bg-[#F7F7F7] p-2 md:p-3 lg:p-4 xl:px-5 xl:py-10">
      <Image
        src={invertcube}
        className="absolute top-0 w-[200px] right-[14%] opacity-10"
        alt="cube"
      />
      <div className="flex items-center justify-between">
        <div className="">
          <div className=" flex items-center gap-x-2">
            <Image src={chingari} alt="" className="w-5" />
            <p className="font-medium text-2xl">Hot Digital Products</p>
          </div>
          <p className="text-[12px] mt-1">Discover our digital products</p>
        </div>

        <div
          onClick={toggleShowAll}
          className="flex items-center gap-x-1 bg-black text-white rounded px-2 h-8 hover:bg-[#7e7d7d] transition-all duration-300 cursor-pointer"
        >
          <p className="text-[12px] sm:text-[14px]">
            {showAll ? "Show Less" : "Show All"}
          </p>
          <svg
            className="w-2 sm:w-3"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.33398 5.99967H10.6673M10.6673 5.99967L6.00065 1.33301M10.6673 5.99967L6.00065 10.6663"
              stroke="#ffffff"
              strokeWidth="1.28"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {loading && (
        <div className="flex justify-center mt-2">
          <Image className="w-10 lg:w-12" src={spinnerthree} alt="" />
        </div>
      )}
      <div className="mt-5 w-full grid grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-2 xl:gap-y-3 xl:gap-x-3">
        {products && (
          <>
            {products
              .slice(0, showAll ? products.length : 4)
              .map((elem, key) => (
                <HotProductCard
                  key={key}
                  redirectHref={`/product/${elem.slug}`}
                  img={elem.thumbnail_url}
                  category={elem.category.name}
                  productName={elem.name}
                  description={elem.description}
                  price={`${elem.price} XION one time payment`}
                />
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export const HotProductCard = ({
  img,
  category,
  productName,
  description,
  price,
  redirectHref,
}: {
  img: string | undefined;
  category: string;
  productName: string;
  description: string;
  price: string;
  redirectHref: string;
}) => {
  return (
    <Link
      href={redirectHref}
      className="p-1 border border-[#DEDEDE] bg-[#fefefd] rounded-lg hover:bg-[#e7e7e9] hover:border-[#ababae] hover:shadow-lg transition-all duration-300"
    >
      <div className="relative w-full h-0 pb-[60%] overflow-hidden rounded border border-[#DEDEDE]">
        <img
          src={img}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-1">
        <p className="text-[8px] sm:text-[10px] bg-[#d0d0d3] w-fit mt-1 sm:mt-2 px-1 rounded-[2px]">
          {category}
        </p>
        <p className="font-bold text-lg mt-1 md:mt-2">
          {productName.length > 50
            ? `${productName.slice(0, 50)}…`
            : `${productName}`}
        </p>
        <p className="text-[9px] sm:text-[10px] md:text-[12px] w-[80%] text-[#8B8B92]">
          {description.length > 90
            ? `${description.slice(0, 90)}…`
            : `${description}`}
        </p>
        <p className="mt-1 sm:mt-2 text-[12px] md:text-[14px]">{price}</p>
      </div>
    </Link>
  );
};

const DiscountTokens = () => {
  return (
    <div className="mt-10">
      <div className="flex justify-between items-center">
        <p className="font-medium text-lg md:text-xl xl:text-2xl">
          Discount on Tokens
        </p>
        <div className="flex items-center gap-x-1">
          <p className="text-[11px] lg:text-sm">See more</p>
          <svg
            className="w-2 lg:w-3"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.33398 5.99967H10.6673M10.6673 5.99967L6.00065 1.33301M10.6673 5.99967L6.00065 10.6663"
              stroke="#050505"
              strokeWidth="1.28"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-2 lg:gap-x-3 lg:gap-y-0 mt-3">
        <TokenCard
          coinImg={bitcoin}
          category="Discount Tokens"
          productName="BITCOIN"
          description="Get discount on your favorite crypto tokens."
          discount="30"
          price="Starting at: $150"
        />
        <TokenCard
          coinImg={solana}
          category="Discount Tokens"
          productName="SOLANA"
          description="Get discount on your favorite crypto tokens."
          discount="30"
          price="Starting at: $150"
        />
        <TokenCard
          coinImg={osmosis}
          category="Digital Tokens"
          productName="OSMOSIS"
          description="Get discount on your favorite crypto tokens."
          discount="30"
          price="Starting at: $150"
        />
        <TokenCard
          coinImg={ethereum}
          category="Digital Tokens"
          productName="ETHEREUM"
          description="Get discount on your favorite crypto tokens."
          discount="30"
          price="Starting at: $150"
        />
      </div>
    </div>
  );
};

const TokenCard = ({
  coinImg,
  category,
  productName,
  description,
  price,
  discount,
}: {
  coinImg: StaticImageData | string;
  category: string;
  productName: string;
  description: string;
  price: string;
  discount: string;
}) => {
  return (
    <div className="border rounded-md p-1 hover:border-[#a2a2a4] hover:bg-[#ececed] transition-all duration-300">
      <div className="relative overflow-hidden flex justify-center items-center border h-[140px] sm:h-[145px] md:h-[160px] xl:h-[190px] 2xl:h-[200px] rounded bg-[#FBFBFB] ">
        <Image
          src={coinbg}
          alt="Background"
          objectFit="fill"
          className="opacity-[7%]"
          layout="fill"
        />

        <Image
          src={coinImg}
          alt=""
          className="w-[110px] sm:w-[120px] md:w-[145px] lg:w-[110px] xl:w-[140px] 2xl:w-[150px]"
          height={200}
          width={200}
        />

        <div className="top-1 left-1 lg:top-2 lg:left-2 absolute flex flex-col text-[10px] sm:text-[11px] lg:text-[12px] xl:text-[14px]">
          <p>Up to:</p>
          <p className="bg-black text-white italic font-medium px-[2px] lg:px-[4px]">
            {discount}% OFF
          </p>
        </div>
      </div>
      <div className="p-1">
        <p className="text-[10px] bg-[#d0d0d3] w-fit mt-1 md:mt-2 px-1 rounded-[2px] ">
          {category}
        </p>
        <p className="font-bold text-lg mt-1 md:mt-2">{productName}</p>
        <p className="text-[10px] sm:text-[11px] md:text-[12px]  w-[80%] text-[#8B8B92]">
          {description}
        </p>
        <p className="mt-1 md:mt-2 text-[12px] md:text-[14px]">{price}</p>
      </div>
    </div>
  );
};

const GamingCollectibles = () => {
  return (
    <div className="mt-10">
      <div className="">
        <p className="font-medium text-lg md:text-xl xl:text-2xl">
          Today&apos;s Top Digital Services
        </p>
        <p className="text-[12px] mt-1">
          Get the inspiration you need with our curated collections and boost
          your creativity.
        </p>
      </div>
      <div className="grid grid-cols-12 gap-x-4 mt-6">
        <GamingCollectiblesCard
          productId={97}
          className="col-span-12 sm:col-span-4 border rounded "
          img={"https://ucarecdn.com/6e7a148e-1f3c-4dba-96b2-687d56eeab0b/"}
          category="Design Templates"
          title="Photoshop Layers and After Effects"
          description="Get the best bundle for video editing and photoshop"
          price="12 XION one time payment"
        />

        <div className="col-span-12 sm:col-span-8  grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-3">
          <HotProductCard
            key={45}
            redirectHref={`/product/45`}
            img={"https://ucarecdn.com/321c8d0f-c6be-4d00-8e26-537399b10d15/"}
            category="Marketing Tools"
            productName="Mr Woke Top 10 VCs List"
            description="its sooo goodd"
            price="$1 one time payment"
          />
          <HotProductCard
            key={36}
            redirectHref={`/product/36`}
            img={"https://ucarecdn.com/19c16028-b2c1-49c3-aceb-f4d9978f1196/"}
            category="Digital Product"
            productName="Productivity Tools"
            description="Get the best productivity tools"
            price="$12 one time payment"
          />
          <HotProductCard
            key={35}
            redirectHref={`/product/35`}
            img={"https://ucarecdn.com/9c9b5673-4a29-4b31-8298-046f80a50392/"}
            category="Digital Product"
            productName="DevTools"
            description="DevTools kit for programmers"
            price="$394 one time payment"
          />
          <HotProductCard
            key={33}
            redirectHref={`/product/33`}
            img={"https://ucarecdn.com/cf0746de-0b53-4bac-a092-95588fd3dcad/"}
            category="SaaS Product"
            productName="Notion AI"
            description="Notion AI guide"
            price="$23 one time payment"
          />
          <HotProductCard
            key={32}
            redirectHref={`/product/32`}
            img={"https://ucarecdn.com/155fe04a-921e-4487-b3a9-5ec9eeb20445/"}
            category="SaaS Apps"
            productName="Trading Guide"
            description="Get best crypto trading guide written by experts."
            price="$10 one time payment"
          />

          <div className="relative border rounded lg:rounded-xl flex px-1 md:px-2 xl:px-4 justify-center flex-col text-white shadow-[inset_-90px_70px_90px_rgba(0,0,0,0.8)] bg-[#666565]">
            <Image
              src={randomstatic}
              alt="Background"
              layout="fill"
              objectFit="cover"
              className="opacity-[10%] bg-blend-luminosity sm:px-[20px] md:px-[40px] lg:px-[60px] xl:px-[80px] 2xl:px-[100px] rounded-xl"
            />
            <Image
              src={galacticspace}
              alt="Background"
              layout="fill"
              objectFit="cover"
              className="opacity-[10%] bg-blend-luminosity rounded-xl"
            />
            <div className="relative z-20">
              <p className="text-[10px] sm:text-[12px] md:text-[14px] lg:text-[20px] xl:text-[28px] font-medium">
                What&apos;s New?
              </p>
              <div className=" w-[100%] lg:w-[80%] ">
                <p className="text-[7px] hidden md:flex md:text-[8px] lg:text-[9px] xl:text-[11px]">
                  Discover new products listed on sendit, a decentralized web3
                  store
                </p>
              </div>

              <Button className="text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] w-full rounded lg:rounded-lg mt-1 sm:mt-2 md:mt-3 lg:mt-4 xl:mt-6 h-6 sm:h-8 lg:h-10  bg-white text-black hover:bg-[#a5a3a3] transition-all duration-300">
                See what&apos; new
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GamingCollectiblesCard = ({
  img,
  category,
  title,
  description,
  price,
  className,
  productId,
}: {
  img: undefined | string;
  category: string;
  title: string;
  description: string;
  price: string;
  className: string;
  productId: number;
}) => {
  return (
    <Link
      href={`/product/${productId}`}
      className={`${className} bg-inherit hover:bg-[#e7e7e9] hover:border-[#ababae] hover:shadow-lg transition-all duration-300`}
    >
      <div className="p-1">
        {/* <Image src={img} alt="" className="rounded w-full" /> */}
        <div className="relative w-full pb-[110%] overflow-hidden rounded border border-[#DEDEDE]">
          <img
            src={img}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="p-1">
          <p className="text-[10px] bg-[#EEEEEF] w-fit mt-2">{category}</p>
          <p className="font-bold text-lg mt-2">{title}</p>
          <p className="text-[12px] w-[80%] text-[#8B8B92]">{description}</p>
          <p className="mt-2">{price}</p>
        </div>
      </div>
    </Link>
  );
};

const DesignUIUX = () => {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [loading, setLoading] = useState(true);

  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const fetchProducts = async () => {
    try {
      // fetching by specific category
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/fetch/products?category_id=11`
      );
      // console.log(response.data);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.log(`Error while fetching products: ${error}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="mt-10 mb-20">
      <div className="flex items-center justify-between">
        <p className="font-medium text-lg md:text-xl xl:text-2xl">
          Design UI/UX
        </p>
        <div
          onClick={toggleShowAll}
          className="flex items-center gap-x-1 bg-black text-white rounded px-2 h-8 hover:bg-[#7e7d7d] transition-all duration-300 cursor-pointer"
        >
          <p>{showAll ? "Show Less" : "Show All"}</p>
          <svg
            className="w-3"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.33398 5.99967H10.6673M10.6673 5.99967L6.00065 1.33301M10.6673 5.99967L6.00065 10.6663"
              stroke="#ffffff"
              strokeWidth="1.28"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {loading && (
        <div className="flex justify-center mt-2">
          <Image className="w-10 lg:w-12" src={spinnerthree} alt="" />
        </div>
      )}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-2 xl:gap-y-3 xl:gap-x-3">
        {products && (
          <>
            {products
              .slice(0, showAll ? products.length : 4)
              .map((elem, key) => (
                <HotProductCard
                  key={key}
                  redirectHref={`/product/${elem.id}`}
                  img={elem.thumbnail_url}
                  category={elem.category.name}
                  productName={elem.name}
                  description={elem.description}
                  price={`${elem.price} XION one time payment`}
                />
              ))}
          </>
        )}
      </div>
    </div>
  );
};

const Trading = () => {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="relative overflow-hidden flex flex-col mt-10 rounded-xl  border bg-[#F7F7F7] p-2 md:p-3 lg:p-4 xl:px-5 xl:py-10">
      <Image
        src={invertcube}
        className="absolute top-0 w-[200px] right-[14%] opacity-10"
        alt="cube"
      />
      <div className="flex items-center justify-between">
        <div className="">
          <div className=" flex items-center gap-x-2">
            <Image src={chingari} alt="" className="w-5" />
            <p className="font-medium text-2xl">Trading</p>
          </div>
        </div>

        <div
          onClick={toggleShowAll}
          className="flex items-center gap-x-1 bg-black text-white rounded px-2 h-8 hover:bg-[#7e7d7d] transition-all duration-300 cursor-pointer"
        >
          <p className="text-[12px] sm:text-[14px]">
            {showAll ? "Show Less" : "Show All"}
          </p>
          <svg
            className="w-2 sm:w-3"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.33398 5.99967H10.6673M10.6673 5.99967L6.00065 1.33301M10.6673 5.99967L6.00065 10.6663"
              stroke="#ffffff"
              strokeWidth="1.28"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="mt-5 w-full grid grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-2 xl:gap-y-3 xl:gap-x-3">
        <HotProductCard
          key={"the-ultimate-forext-trading-alpha-group-discord"}
          redirectHref={`/product/the-ultimate-forext-trading-alpha-group-discord`}
          img={"https://ucarecdn.com/219f9793-bdfc-4da9-9ed8-62854b907625/"}
          category={"How To Guides"}
          productName={"The ULTIMATE FOREX Trading Alpha Group *DISCORD*"}
          description={
            "😄\r\nBeginner Friendly Community\r\nLearn Forex Trading Live: We specialize in welcoming new traders. Learn how to trade forex no matter your experience\r\n🎥\r\nPrivate Livestreams\r\nGain access to our exclusive livestreams with real-time scanning memecoins\r\n🤖\r\nPotion Exclusive Bots\r\nFrom bots that check if a coins socials have been reused to bots that check who the top holders are\r\n👀\r\nTweet Trackers\r\nTrack the most notable Influencers on Forex Twitter & see what alpha they are spewing out on the timeline.\r\n💰\r\nWallet Trackers\r\nTracking the best traders on the blockchain with Hyper-Speed Trackers. Spotting INSIDER Plays before it happens.\r\n📈\r\nVolume Monitors\r\nSpot what coins are getting the most volume INSTANTLY\r\n🧑‍🤝‍🧑\r\n24/7 Support\r\nRound-the-clock assistance from our mods. We're here to help you around the clock."
          }
          price={`${0.7} XION one time payment`}
        />
        <HotProductCard
          key={"meme-coin-bot"}
          redirectHref={`/product/meme-coin-bot`}
          img={"https://ucarecdn.com/e4c58f49-7b7e-4261-a310-4f10ff1e833e/"}
          category={"Bots"}
          productName={"MEME Coin Sniper BOT on SOLANA"}
          description={
            "💰\r\nAffordable Signals\r\nWe provide Signals Access at a great price. Anyone can receive the signals and make money from their trades.\r\n📈\r\nHigh Winrate\r\nThe winrate of our signals ranges from 80 to 90%..\r\n🧑‍💻\r\nSupport\r\nYou can get assistance from our support with any queries. We are incredibly kind and cordial.\r\n🔍\r\nProfessional Traders\r\nOur skilled traders are here to assist you. They'll assist you with any issue.\r\n⭐\r\nEasy to understand\r\nOur signals are really simple to interpret. You can learn when to buy and when to sell from the signals."
          }
          price={`${2} XION one time payment`}
        />
        <HotProductCard
          key={"sendit-meme-alpha-call-group-discord"}
          redirectHref={`/product/sendit-meme-alpha-call-group-discord`}
          img={"https://ucarecdn.com/31ab51c1-e9f5-40ce-a6fc-307deae61814/"}
          category={"How To Guides"}
          productName={"SENDIT Meme Alpha Call Group *Discord*"}
          description={
            "💰\r\nAffordable Signals\r\nWe provide Signals Access at a great price. Anyone can receive the signals and make money from their trades.\r\n📈\r\nHigh Winrate\r\nThe winrate of our signals ranges from 80 to 90%..\r\n🧑‍💻\r\nSupport\r\nYou can get assistance from our support with any queries. We are incredibly kind and cordial.\r\n🔍\r\nProfessional Traders\r\nOur skilled traders are here to assist you. They'll assist you with any issue.\r\n⭐\r\nEasy to understand\r\nOur signals are really simple to interpret. You can learn when to buy and when to sell from the signals."
          }
          price={`${2.5} XION one time payment`}
        />
        <HotProductCard
          key={"pump-fun-meme-sniper-bot"}
          redirectHref={`/product/pump-fun-meme-sniper-bot`}
          img={"https://ucarecdn.com/a0a7a44a-8b44-4bff-ad65-94d3a82379f1/"}
          category={"SaaS Apps"}
          productName={"PUMP Fun MEME Sniper Bot"}
          description={
            "💰\r\nAffordable Signals\r\nWe provide Signals Access at a great price. Anyone can receive the signals and make money from their trades.\r\n📈\r\nHigh Winrate\r\nThe winrate of our signals ranges from 80 to 90%..\r\n🧑‍💻\r\nSupport\r\nYou can get assistance from our support with any queries. We are incredibly kind and cordial.\r\n🔍\r\nProfessional Traders\r\nOur skilled traders are here to assist you. They'll assist you with any issue.\r\n⭐\r\nEasy to understand\r\nOur signals are really simple to interpret. You can learn when to buy and when to sell from the signals."
          }
          price={`${3.2} XION one time payment`}
        />
      </div>
    </div>
  );
};

"use client";

import Image from "next/image";
import hex from "@/public/hex.svg";
import randomstatic from "@/public/randomstatic.png";
import circlemedal from "@/public/circlemedal.svg";

export default function SellerDashboard() {
  return (
    <div className="w-[100%] pb-20 relative overflow-y-auto hide-scrollbar h-[90vh] scroll-smooth">
      <TopLabel />
      <div className="px-20 mt-8 ">
        <MidSection />
        <TotalEarningsSection />
        <CurrentRank />
        <Sales />
      </div>
    </div>
  );
}

const TopLabel = () => {
  return (
    <div className="relative border-b w-[100%]">
      <Image
        src={randomstatic}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-[4%]"
      />
      <div className="h-20 grid grid-cols-2">
        <div className=" h-full flex items-center">
          <p className="text-lg font-medium ml-20">User Welcome Ape</p>
        </div>
        <div className=" h-full flex items-center gap-x-2">
          <div className="relative  flex items-center justify-center">
            <Image className="w-12" src={hex} alt="" />
            <p className="text-lg font-medium text-white absolute z-20">2</p>
          </div>
          <div>
            <p className="font-medium text-lg">Emerging Seller</p>
            <div className="flex gap-x-[1px] mt-[5px] mb-[1px]">
              <div className="w-28 h-[3px] bg-[#223D40]"></div>
              <div className="w-8 h-[3px] bg-[#E2E0D9]"></div>
            </div>
            <p className="text-[11px] text-[#959594]">Next:Establised Seller</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MidSection = () => {
  return (
    <div className="border rounded-2xl grid grid-cols-3 bg-white">
      <div className="p-4">
        <div className=" flex items-center gap-x-1">
          <p className="text-[13px]">AVAILABLE BALANCE</p>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.545 4.5C4.66255 4.16583 4.89458 3.88405 5.19998 3.70457C5.50538 3.52508 5.86445 3.45947 6.21359 3.51936C6.56273 3.57924 6.87941 3.76076 7.10754 4.03176C7.33567 4.30277 7.46053 4.64576 7.46 5C7.46 6 5.96 6.5 5.96 6.5M6 8.5H6.005M11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6Z"
              stroke="#8B8B92"
              strokeWidth="1.125"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="font-bold text-4xl my-3">$20</p>
        <div className="flex w-32 h-10 items-center gap-x-1 border rounded-2xl justify-center shadow-lg hover:bg-[#e9e9ec] transition-all duration-300">
          <p>Withdraw</p>
          <svg
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.16602 7.50008H12.8327M12.8327 7.50008L6.99935 1.66675M12.8327 7.50008L6.99935 13.3334"
              stroke="#050505"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="border-r border-l p-4">
        <div className=" flex items-center gap-x-1">
          <p className="text-[13px]">TODAY TOTAL SALES</p>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.545 4.5C4.66255 4.16583 4.89458 3.88405 5.19998 3.70457C5.50538 3.52508 5.86445 3.45947 6.21359 3.51936C6.56273 3.57924 6.87941 3.76076 7.10754 4.03176C7.33567 4.30277 7.46053 4.64576 7.46 5C7.46 6 5.96 6.5 5.96 6.5M6 8.5H6.005M11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6Z"
              stroke="#8B8B92"
              strokeWidth="1.125"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="font-bold text-4xl my-3">$50</p>
        <div className="flex justify-between">
          <div className="w-fit ">
            <p className="text-[12px] font-medium">Top Product</p>
            <p className="text-[11px]">How to Design Better UI</p>
          </div>
          <div className="border flex items-center w-20 justify-center rounded-lg bg-[#E8ECEC]">
            <p>5 Sales</p>
          </div>
        </div>
      </div>
      <div className=" p-4">
        <div className=" flex items-center gap-x-1">
          <p className="text-[13px]">TOTAL SALES IN 7 DAYS</p>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.545 4.5C4.66255 4.16583 4.89458 3.88405 5.19998 3.70457C5.50538 3.52508 5.86445 3.45947 6.21359 3.51936C6.56273 3.57924 6.87941 3.76076 7.10754 4.03176C7.33567 4.30277 7.46053 4.64576 7.46 5C7.46 6 5.96 6.5 5.96 6.5M6 8.5H6.005M11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6Z"
              stroke="#8B8B92"
              strokeWidth="1.125"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="font-bold text-4xl my-3">$100</p>
        <div className="mt-8 text-[12px] flex gap-x-1 ">
          <p className="text-green-700">4%</p>
          <p> vs last month</p>
        </div>
      </div>
    </div>
  );
};

const TotalEarningsSection = () => {
  return (
    <div className="bg-white flex flex-col justify-between border mt-6 rounded-2xl h-36 p-4">
      <div className=" flex items-center gap-x-1">
        <p className="text-[13px]">TOTAL EARNINGS</p>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.545 4.5C4.66255 4.16583 4.89458 3.88405 5.19998 3.70457C5.50538 3.52508 5.86445 3.45947 6.21359 3.51936C6.56273 3.57924 6.87941 3.76076 7.10754 4.03176C7.33567 4.30277 7.46053 4.64576 7.46 5C7.46 6 5.96 6.5 5.96 6.5M6 8.5H6.005M11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6Z"
            stroke="#8B8B92"
            strokeWidth="1.125"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="grid grid-cols-3 ">
        <div className="flex items-center gap-x-1">
          <p className="font-medium text-2xl">$</p>
          <p className="font-bold text-6xl">1240.00</p>
        </div>
        <div className="flex items-center gap-x-2">
          <div className="relative">
            <Image className="w-10" src={circlemedal} alt="" />
          </div>
          <p className="w-44 text-[14px] text-wrap">
            You&apos;ve reached $1500 in total sales!
          </p>
        </div>
        <div className="flex justify-end items-center">
          <div className="border shadow-lg h-10 rounded-xl w-40 flex items-center gap-x-1 justify-center hover:bg-[#E8ECEC] transition-all duration-300">
            <p>Analytics</p>
            <svg
              className="w-3 mt-1"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.16602 7.50008H12.8327M12.8327 7.50008L6.99935 1.66675M12.8327 7.50008L6.99935 13.3334"
                stroke="#050505"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

const CurrentRank = () => {
  return (
    <div className="mt-6">
      <p className="font-medium text-xl">Your Path to Level 3</p>
      <div className="grid grid-cols-2  w-[70%]">
        <div className=" p-2 gap-x-2 flex items-center ">
          <input type="checkbox" />
          <div className="">
            <p className="text-[13px]">Complete at least 10 sales</p>
            <p className="text-[11px] text-[#8B8B93]">7/10 sales completed</p>
          </div>
        </div>
        <div className=" p-2 gap-x-2 flex items-center ">
          <input type="checkbox" />
          <div className="">
            <p className="text-[13px]">Total sales of $1,750 USD equivalent</p>
            <p className="text-[11px] text-[#8B8B93]">1500/1750</p>
          </div>
        </div>
        <div className=" p-2 gap-x-2 flex items-center ">
          <input type="checkbox" />
          <div className="">
            <p className="text-[13px]">Maintain a 4.2/5.0 average rating</p>
            <p className="text-[11px] text-[#8B8B93]">Current 4.5</p>
          </div>
        </div>
        <div className=" p-2 gap-x-2 flex items-center ">
          <input type="checkbox" />
          <div className="">
            <p className="text-[13px]">Maintain a 4.2/5.0 average rating</p>
            <p className="text-[11px] text-[#8B8B93]">Current 4.5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Sales = () => {
  return (
    <div className="mt-6 border rounded-2xl p-5 h-80 bg-white">
      <div className=" flex items-center gap-x-1">
        <p className="text-[15px]">SALES</p>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.545 4.5C4.66255 4.16583 4.89458 3.88405 5.19998 3.70457C5.50538 3.52508 5.86445 3.45947 6.21359 3.51936C6.56273 3.57924 6.87941 3.76076 7.10754 4.03176C7.33567 4.30277 7.46053 4.64576 7.46 5C7.46 6 5.96 6.5 5.96 6.5M6 8.5H6.005M11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6Z"
            stroke="#8B8B92"
            strokeWidth="1.125"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="px-2 mb-1 grid grid-cols-12 items-center mt-3 w-full h-7 rounded-lg shadow-[inset_0px_2px_10px_rgba(0,0,0,0.04)] bg-[#F7F7F7]">
        <p className="text-[13px] col-span-1">Date</p>
        <p className="text-[13px] col-span-3">Product Name</p>
        <p className="text-[13px] col-span-3">Buyer</p>
        <p className="text-[13px] col-span-1">Quantity</p>
        <p className="text-[13px] col-span-1">Price</p>
        <p className="text-[13px] col-span-1">Status</p>
        <p className="text-[13px] col-span-2">Hash</p>
      </div>
      <div className="relative overflow-y-auto hide-scrollbar scroll-smooth h-52">
        <SalesLabel
          date="10/10/24"
          productName="How to Design Better UI"
          buyer="johndoe@sendit.zone"
          quantity={12}
          price="$32"
          status="confirmed"
          hash="0b3fe99b745ba2079"
        />
        <SalesLabel
          date="10/10/24"
          productName="How to Design Better UI"
          buyer="johndoe@xsy.com"
          quantity={12}
          price="$32"
          status="pending"
          hash="0b3fe99b745ba2079"
        />
        <SalesLabel
          date="10/10/24"
          productName="How to Design Better UI"
          buyer="johndoe@sendit.zone"
          quantity={12}
          price="$32"
          status="confirmed"
          hash="0b3fe99b745ba2079"
        />
        <SalesLabel
          date="10/10/24"
          productName="How to Design Better UI"
          buyer="johndoe@sendit.zone"
          quantity={12}
          price="$32"
          status="confirmed"
          hash="0b3fe99b745ba2079"
        />
        <SalesLabel
          date="10/10/24"
          productName="How to Design Better UI"
          buyer="johndoe@sendit.zone"
          quantity={12}
          price="$32"
          status="confirmed"
          hash="0b3fe99b745ba2079"
        />
        <SalesLabel
          date="10/10/24"
          productName="How to Design Better UI"
          buyer="johndoe@sendit.zone"
          quantity={12}
          price="$32"
          status="confirmed"
          hash="0b3fe99b745ba2079"
        />
        <SalesLabel
          date="10/10/24"
          productName="How to Design Better UI"
          buyer="johndoe@sendit.zone"
          quantity={12}
          price="$32"
          status="confirmed"
          hash="0b3fe99b745ba2079"
        />
        <SalesLabel
          date="10/10/24"
          productName="How to Design Better UI"
          buyer="johndoe@sendit.zone"
          quantity={12}
          price="$32"
          status="confirmed"
          hash="0b3fe99b745ba2079"
        />
        <SalesLabel
          date="10/10/24"
          productName="How to Design Better UI"
          buyer="johndoe@sendit.zone"
          quantity={12}
          price="$32"
          status="confirmed"
          hash="0b3fe99b745ba2079"
        />
        <SalesLabel
          date="10/10/24"
          productName="How to Design Better UI"
          buyer="johndoe@sendit.zone"
          quantity={12}
          price="$32"
          status="confirmed"
          hash="0b3fe99b745ba2079"
        />
      </div>
    </div>
  );
};

export const SalesLabel = ({
  date,
  productName,
  buyer,
  quantity,
  price,
  status,
  hash,
}: {
  date: string;
  productName: string;
  buyer: string;
  quantity: number;
  price: string;
  status: string;
  hash: string;
}) => {
  return (
    <div className="border-b px-2 grid grid-cols-12 items-center w-full h-10">
      <p className="text-[13px] col-span-1">{date}</p>
      <p className="text-[13px] col-span-3">{productName}</p>
      <p className="text-[13px] col-span-3">{buyer}</p>
      <p className="text-[13px] col-span-1">{quantity}</p>
      <p className="text-[13px] col-span-1">{price}</p>
      <div className="text-[13px] flex items-center col-span-1">
        {status == "confirmed" ? (
          <div className="flex items-center bg-opacity-45 border border-green-600 rounded-md h-6 px-1 bg-green-400 ">
            <p>{status}</p>
          </div>
        ) : (
          <div className="flex items-center bg-opacity-45 border border-red-600 rounded-md h-6 px-1 bg-red-400 ">
            <p>{status}</p>
          </div>
        )}
      </div>
      <div className="text-[13px] col-span-2 flex items-center">
        <p>{hash}</p>
        <svg
          className="w-3 ml-1"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.66797 4.6665V3.03317C4.66797 2.37978 4.66797 2.05308 4.79513 1.80352C4.90698 1.58399 5.08546 1.40552 5.30498 1.29366C5.55454 1.1665 5.88124 1.1665 6.53464 1.1665H10.968C11.6214 1.1665 11.9481 1.1665 12.1976 1.29366C12.4171 1.40552 12.5956 1.58399 12.7075 1.80352C12.8346 2.05308 12.8346 2.37978 12.8346 3.03317V7.4665C12.8346 8.1199 12.8346 8.4466 12.7075 8.69616C12.5956 8.91568 12.4171 9.09416 12.1976 9.20601C11.9481 9.33317 11.6214 9.33317 10.968 9.33317H9.33464M3.03464 12.8332H7.46797C8.12136 12.8332 8.44806 12.8332 8.69762 12.706C8.91715 12.5942 9.09562 12.4157 9.20748 12.1962C9.33464 11.9466 9.33464 11.6199 9.33464 10.9665V6.53317C9.33464 5.87978 9.33464 5.55308 9.20748 5.30352C9.09562 5.08399 8.91715 4.90552 8.69762 4.79366C8.44806 4.6665 8.12136 4.6665 7.46797 4.6665H3.03464C2.38124 4.6665 2.05454 4.6665 1.80498 4.79366C1.58546 4.90552 1.40698 5.08399 1.29513 5.30352C1.16797 5.55308 1.16797 5.87978 1.16797 6.53317V10.9665C1.16797 11.6199 1.16797 11.9466 1.29513 12.1962C1.40698 12.4157 1.58546 12.5942 1.80498 12.706C2.05454 12.8332 2.38124 12.8332 3.03464 12.8332Z"
            stroke="#8B8B92"
            strokeWidth="1.1375"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

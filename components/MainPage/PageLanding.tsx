"use client";

import Image from "next/image";
import randomstatic from "@/public/randomstatic.png";
import shinebg from "@/public/_static/background/shinegradient.png";
import chattip from "@/public/_static/illustrations/chattip.svg";
import senditcoin from "@/public/coins/senditcoin.png";
import homebanner from "@/public/_static/background/homebanner.png";
import homebannertwo from "@/public/_static/background/HomeBannerTwo.png";
import xHome from "@/public/_static/illustrations/xHome.png";
import tradingHome from "@/public/_static/illustrations/tradingHome.png";
import figmaHome from "@/public/_static/illustrations/figmaHome.png";
import shopifyHome from "@/public/_static/illustrations/shopifyHome.png";
import { ProductInterface } from "@/lib/models";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PageLanding() {
  const [allProducts, setAllProducts] = useState<ProductInterface[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<ProductInterface[]>(
    []
  );
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  const router = useRouter();

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const handleBlur = () => {
    setIsInputFocused(false);
  };

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/fetch/products`
      );
      // console.log(response.data);
      setAllProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.log(`Got an error while fetching the products: ${error}`);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter products based on search query
    const filtered = allProducts.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="pt-16 relative flex justify-center h-[500px] md:h-[570px] lg:h-[600px] border-black overflow-hidden">
      {/* <Image
        src={homebanner}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className=""
      /> */}
      <Image
        src={homebannertwo}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className=""
      />

      <Image
        src={shopifyHome}
        className="absolute w-[100px] left-0 sm:left-5 md:left-[10%] lg:left-[13%] xl:left-[15%] opacity-20 sm:opacity-35 md:opacity-45 lg:opacity-80 sm:w-[120px] md:w-[130px] lg:w-[140px] xl:w-[150px] -rotate-6 top-20  h-fit "
        alt="osmosis"
      />
      <Image
        src={figmaHome}
        className="absolute w-[120px] left-0 sm:left-5 md:left-[5%] lg:left-[7%] xl:left-[9%] opacity-15 sm:opacity-35 md:opacity-45 lg:opacity-80 sm:w-[130px] md:w-[140px] lg:w-[160px] xl:w-[200px] -rotate-6 bottom-10 h-fit "
        alt="osmosis"
      />

      <Image
        src={xHome}
        className="absolute w-[100px] right-0 sm:right-5 md:right-[10%] lg:right-[13%] xl:right-[15%] opacity-20 sm:opacity-35 md:opacity-45 lg:opacity-100 sm:w-[110px] md:w-[125px] lg:w-[130px] xl:w-[140px] -rotate-6 top-25  h-fit "
        alt="osmosis"
      />
      <Image
        src={tradingHome}
        className="absolute sm:right-5 md:right-[5%] lg:right-[7%] xl:right-[10%] w-[100px] right-0  opacity-20 sm:opacity-35 md:opacity-45 lg:opacity-80 sm:w-[130px] md:w-[140px] lg:w-[160px] xl:w-[200px] rotate-6 bottom-5 h-fit "
        alt="osmosis"
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
            {/* <div className="flex border h-12 xl:h-14 p-1 w-[300px] xl:w-[550px] items-center rounded-[5px] bg-white">
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
            </div> */}
            <div>
              <div className="flex border h-12 xl:h-14 p-1 w-[300px] xl:w-[550px] items-center rounded-[5px] bg-white">
                <input
                  className="outline-none w-full h-full p-2"
                  type="text"
                  placeholder="Search anything"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
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

              {/* Render filtered products only if input is focused */}
              {isInputFocused && (
                <div className="rounded-b relative overflow-y-auto hide-scrollbar scroll-smooth h-20 mt-1 backdrop-blur-md bg-[rgba(142,137,137,0.2)] text-white">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="p-2 backdrop-blur-md bg-[rgba(142,137,137,0.2)] border-b cursor-pointer"
                      >
                        {product.name}
                      </div>
                    ))
                  ) : (
                    <p className="p-2">No products found</p>
                  )}
                </div>
              )}
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

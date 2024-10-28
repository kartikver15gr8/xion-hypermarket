import senditApe from "@/public/sendit_ape.svg";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="border-t bg-black text-white  p-5 lg:p-10">
      <div className="grid grid-cols-2 md:grid-cols-4">
        <div className=" col-span-1 pb-10">
          <div className="flex gap-x-3 items-center">
            <Image
              className="w-8 rounded-lg bg-white"
              src={senditApe}
              alt="logo"
            />
            <p className="font-medium text-lg sm:text-xl lg:text-2xl">
              SENDIT ZONE
            </p>
          </div>
        </div>

        <div className=" col-span-1 pb-10 ">
          {/* heading */}
          <p className="text-[14px] lg:text-[16px] lg:text-xl font-medium">
            SENDIT
          </p>

          <ul className="flex flex-col mt-8 gap-y-4 text-[14px] lg:text-[16px] text-[#c9c9cc]">
            <li className="">About</li>
            <li className="">Careers</li>
            <li className="">Affiliates</li>
            <li className="">Services Status</li>
          </ul>
        </div>
        <div className=" col-span-1 pb-10 ">
          {/* heading */}
          <p className="text-[14px] lg:text-[16px] lg:text-xl font-medium">
            MAKE MONEY WITH US
          </p>

          <ul className="flex flex-col mt-8 gap-y-4 text-[14px] lg:text-[16px] text-[#c9c9cc]">
            <li className="">Sell on Sendit</li>
            <li className="">Earn Through Affiliates Program</li>
            <li className="">Advertise Your Products</li>
          </ul>
        </div>
        <div className=" col-span-1 pb-10 ">
          {/* heading */}
          <p className="text-[14px] lg:text-[16px] lg:text-xl font-medium">
            CONNECT WITH US
          </p>

          <ul className="flex flex-col mt-8 gap-y-4 text-[#c9c9cc]">
            <a
              href="https://x.com/SenditZone"
              target="_blank"
              className="text-lg flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="m13.081 10.712l-4.786-6.71a.6.6 0 0 0-.489-.252H5.28a.6.6 0 0 0-.488.948l6.127 8.59m2.162-2.576l6.127 8.59a.6.6 0 0 1-.488.948h-2.526a.6.6 0 0 1-.489-.252l-4.786-6.71m2.162-2.576l5.842-6.962m-8.004 9.538L5.077 20.25"
                />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/sendit-zone"
              target="_blank"
              className=" flex items-center"
            >
              <p className="mr-[2px]">Linked</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 20 20"
              >
                <path
                  fill="white"
                  d="M17.04 17.043h-2.962v-4.64c0-1.107-.023-2.531-1.544-2.531c-1.544 0-1.78 1.204-1.78 2.449v4.722H7.793V7.5h2.844v1.3h.039c.397-.75 1.364-1.54 2.808-1.54c3.001 0 3.556 1.974 3.556 4.545zM4.447 6.194c-.954 0-1.72-.771-1.72-1.72s.767-1.72 1.72-1.72a1.72 1.72 0 0 1 0 3.44m1.484 10.85h-2.97V7.5h2.97zM18.522 0H1.476C.66 0 0 .645 0 1.44v17.12C0 19.355.66 20 1.476 20h17.042c.815 0 1.482-.644 1.482-1.44V1.44C20 .646 19.333 0 18.518 0z"
                />
              </svg>
            </a>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#706f6f] pt-4">
        <p>Sendit is a registered trademark, Inc. All rights reserved 2024</p>
      </div>
    </div>
  );
}

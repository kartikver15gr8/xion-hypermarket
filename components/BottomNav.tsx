"use client";
export default function BottomNav() {
  return (
    <div className="absolute bottom-0 w-full justify-center flex h-20 p-2">
      <div className="border border-[#bcc7d0] w-[370px] sm:w-[400px] bg-white shadow-[inset_3px_2px_18px_rgba(0,0,0,0.1)] xl:w-[500px] z-50 rounded grid grid-cols-3">
        <div className="border-r text-[14px] sm:text-[16px]  rounded-l flex flex-col items-center justify-center hover:bg-[#eeeeef] transition-all duration-300  ">
          <svg
            className="w-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="#eeeef"
              d="M20.23 7.24L12 12L3.77 7.24a1.98 1.98 0 0 1 .7-.71L11 2.76c.62-.35 1.38-.35 2 0l6.53 3.77c.29.173.531.418.7.71"
              opacity="0.25"
            />
            <path
              fill="#eeeef"
              d="M12 12v9.5a2.09 2.09 0 0 1-.91-.21L4.5 17.48a2.003 2.003 0 0 1-1-1.73v-7.5a2.06 2.06 0 0 1 .27-1.01z"
              opacity="0.5"
            />
            <path
              fill="black"
              d="M20.5 8.25v7.5a2.003 2.003 0 0 1-1 1.73l-6.62 3.82c-.275.13-.576.198-.88.2V12l8.23-4.76c.175.308.268.656.27 1.01"
            />
          </svg>
          <p>Active Bids</p>
        </div>
        <div className="border-r text-[14px] sm:text-[16px] flex flex-col items-center justify-center hover:bg-[#eeeeef] transition-all duration-300">
          <svg
            className="w-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
          >
            <g
              fill="#d6d6d7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path
                stroke="#000000"
                d="m33.333 21.875l-3.979 5.208l-2.27-2.604m-10.417-9.896h-5.209a3.125 3.125 0 1 0 0 6.25h2.084a3.125 3.125 0 1 1 0 6.25H8.333m4.167 2.084v-2.084m8.333 8.334h12.5zM12.5 14.583V12.5z"
              />
              <path
                stroke="#000000"
                d="M12.5 37.5v4.167a2.083 2.083 0 0 0 2.083 2.083h25a2.083 2.083 0 0 0 2.084-2.083V8.333a2.083 2.083 0 0 0-2.084-2.083H18.75"
              />
            </g>
          </svg>
          <p>Active Confirmed</p>
        </div>
        <div className=" text-[14px] sm:text-[16px] rounded-r flex flex-col items-center justify-center hover:bg-[#eeeeef] transition-all duration-300">
          <svg
            className="w-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="#eeeef"
              d="M18.65 19.35L16.5 17.2V14h1v2.79l1.85 1.85zM17 10c.34 0 .67.03 1 .08V5h-2v3H8V5H6v15h4.68A6.995 6.995 0 0 1 17 10m-5-5c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1"
              opacity="0.3"
            />
            <path
              fill="black"
              d="M17 12c-2.76 0-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5s-2.24-5-5-5m1.65 7.35L16.5 17.2V14h1v2.79l1.85 1.85zM18 3h-3.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H6c-1.1 0-2 .9-2 2v15c0 1.1.9 2 2 2h6.11a6.743 6.743 0 0 1-1.42-2H6V5h2v3h8V5h2v5.08c.71.1 1.38.31 2 .6V5c0-1.1-.9-2-2-2m-6 2c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1"
            />
          </svg>
          <p>Bids Pending</p>
        </div>
      </div>
    </div>
  );
}

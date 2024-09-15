"use client";

import Link from "next/link";

export default function BorrowCardHead({
  title,
  backHref,
  crossHref,
}: {
  title: string;
  backHref: string;
  crossHref: string;
}) {
  return (
    <div className="w-full h-[50px] sm:h-[70px] flex items-center border-b border-slate-200 justify-between  px-8 ">
      <Link href={backHref}>
        <svg
          className="hover:scale-110 transition-all duration-200"
          width="18"
          height="13"
          viewBox="0 0 18 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.5 4.32747H12.75C14.8211 4.32747 16.5 6.00641 16.5 8.07747C16.5 10.1485 14.8211 11.8275 12.75 11.8275H9M1.5 4.32747L4.83333 0.994141M1.5 4.32747L4.83333 7.66081"
            stroke="#050505"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
      <p className="text-[14px] sm:text-lg font-medium">{title}</p>
      <Link href={crossHref}>
        <svg
          className="hover:scale-110 transition-all duration-200"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 0.828125L1 10.8281M1 0.828125L11 10.8281"
            stroke="#050505"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  );
}

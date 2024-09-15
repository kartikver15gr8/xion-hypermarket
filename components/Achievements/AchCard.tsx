"use client";
import hexagon from "@/public/hexagon.svg";
import Badge from "@/public/Badge.svg";
import Image from "next/image";
export default function AchCard({
  date,
  title,
  description,
  status,
  points,
  className,
}: {
  date?: string;
  title: string;
  description: string;
  status?: string;
  points: string;
  className?: string;
}) {
  return (
    <div
      className={`${className} relative flex flex-row border gap-x-3 py-2 xl:py-3  px-3 h-32 rounded-2xl shadow-inner shadow-white`}
    >
      <div className="relative flex items-center justify-center w-[90px] sm:w-[100px] md:w-[120px] text-white">
        <Image
          className="w-20"
          src={Badge}
          width={500}
          height={500}
          alt="Hexa"
        />
        <div className="absolute  flex flex-col items-center">
          <p className="text-4xl">{points}</p>
          <p className="font-extralight text-[10px]">PTS</p>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        {date && (
          <div className="flex gap-x-2">
            <svg
              className="w-3"
              viewBox="0 0 14 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 6.66732H1M9.66667 1.33398V4.00065M4.33333 1.33398V4.00065M4.2 14.6673H9.8C10.9201 14.6673 11.4802 14.6673 11.908 14.4493C12.2843 14.2576 12.5903 13.9516 12.782 13.5753C13 13.1475 13 12.5874 13 11.4673V5.86732C13 4.74721 13 4.18716 12.782 3.75934C12.5903 3.38301 12.2843 3.07705 11.908 2.8853C11.4802 2.66732 10.9201 2.66732 9.8 2.66732H4.2C3.0799 2.66732 2.51984 2.66732 2.09202 2.8853C1.71569 3.07705 1.40973 3.38301 1.21799 3.75934C1 4.18716 1 4.74721 1 5.86732V11.4673C1 12.5874 1 13.1475 1.21799 13.5753C1.40973 13.9516 1.71569 14.2576 2.09202 14.4493C2.51984 14.6673 3.0799 14.6673 4.2 14.6673Z"
                stroke="#52525C"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <p className="text-[14px] text-[#6a6a76]">{date}</p>
          </div>
        )}
        {status && (
          <div className="flex gap-x-2">
            <svg
              className="w-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="black"
                fillRule="evenodd"
                d="M5.25 9.303V8a6.75 6.75 0 0 1 13.5 0v1.303c.227.016.44.036.642.064c.9.12 1.658.38 2.26.981c.602.602.86 1.36.982 2.26c.116.867.116 1.97.116 3.337v.11c0 1.367 0 2.47-.116 3.337c-.122.9-.38 1.658-.982 2.26c-.602.602-1.36.86-2.26.982c-.867.116-1.97.116-3.337.116h-8.11c-1.367 0-2.47 0-3.337-.116c-.9-.122-1.658-.38-2.26-.982c-.602-.602-.86-1.36-.981-2.26c-.117-.867-.117-1.97-.117-3.337v-.11c0-1.367 0-2.47.117-3.337c.12-.9.38-1.658.981-2.26c.602-.602 1.36-.86 2.26-.981a9.55 9.55 0 0 1 .642-.064M6.75 8a5.25 5.25 0 0 1 10.5 0v1.253c-.373-.003-.772-.003-1.195-.003h-8.11c-.423 0-.821 0-1.195.003zm-3.341 3.409c.277-.277.665-.457 1.4-.556c.754-.101 1.756-.103 3.191-.103h8c1.435 0 2.436.002 3.192.103c.734.099 1.122.28 1.399.556c.277.277.457.665.556 1.4c.101.755.103 1.756.103 3.191c0 1.435-.002 2.436-.103 3.192c-.099.734-.28 1.122-.556 1.399c-.277.277-.665.457-1.4.556c-.755.101-1.756.103-3.191.103H8c-1.435 0-2.437-.002-3.192-.103c-.734-.099-1.122-.28-1.399-.556c-.277-.277-.457-.665-.556-1.4c-.101-.755-.103-1.756-.103-3.191c0-1.435.002-2.437.103-3.192c.099-.734.28-1.122.556-1.399"
                clipRule="evenodd"
              />
            </svg>

            <p className="text-[14px] text-[#6a6a76]">{status}</p>
          </div>
        )}
        <p className="font-medium text-2xl xl:text-[21px]">{title}</p>
        <p className="text-[12px] mt-[5px] text-[#5a5a61]">{description}</p>
      </div>
    </div>
  );
}

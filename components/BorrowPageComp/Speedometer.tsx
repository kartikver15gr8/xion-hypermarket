"use client";

import React from "react";

const Speedometer = ({
  value,
  min,
  max,
  className,
}: {
  value: number;
  min: number;
  max: number;
  className: string;
}) => {
  const angle = ((value - min) / (max - min)) * 180 - 90;
  const numberOfLines = 80;

  return (
    <div
      className={`relative ${className} bg-gradient-to-r from-red-500 via-yellow-600 to-green-600 rounded-t-full`}
    >
      {/* Speedometer background */}
      <div className="absolute inset-0 rounded-t-full ">
        <div className="absolute inset-0 bg-gradient-to-r from-red-700 via-yellow-500 to-green-700 rounded-t-full">
          {[...Array(numberOfLines)].map((_, index) => (
            <div
              key={index}
              className="absolute  top-0 left-1/2 w-[2px] h-full bg-white origin-bottom"
              style={{
                transform: `translateX(-50%) rotate(${
                  (index * 180) / (numberOfLines - 1) - 90
                }deg)`,
              }}
            ></div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 flex items-end justify-center">
        <div className="w-[80%] overflow-hidden relative h-[80%] bg-white rounded-t-full">
          <div className="absolute inset-0 bg-[url('https://s3-alpha-sig.figma.com/img/1691/cd52/d6e9ed0c2794e47a2bed233bb3b64852?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Uz3I5wL9eSCbsNhgyGE2HiUmcXb-dzJrYUOi5C0vYyLpcpUl6kK-1MV29cwXvVoPsHTZHRazcU0G8fHV1JJKLg8qZky~Cy3zNCktdxibP2Jbk13Iw40UmX3-Ib52THHahQFVFMMAya08VZWfZmN3lO99FjjRd1sVy5ESqgJuHkm2g3jZPNFqwzVE7Gib8CCHgnK4YV10YMhtpLgj7A57nF4IlL7yIyxwigAz3Yiqye05nIFPALKIRrN-ESID-w5RnbnBaBfjQwbNPi3UHGXjtHIqCiVUmc3v8pHhFmLsEclb34sGrM58qg9~xCb0zhswIkpr0291KOtlcydwdAXYRA__')] bg-cover bg-center opacity-[20%]"></div>
        </div>
      </div>

      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
        <div className="w-7 h-7 bg-[#E7E7E9] rounded-full relative">
          <div
            className="absolute bottom-1/2 left-1/2 w-0 h-0 origin-bottom border-l-[6px] border-r-[6px] border-b-[56px] border-l-transparent border-r-transparent border-b-[#E7E7E9]"
            style={{
              transform: `translateX(-50%) rotate(${angle}deg)`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Speedometer;

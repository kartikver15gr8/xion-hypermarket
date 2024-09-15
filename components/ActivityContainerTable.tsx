"use client";
import Image from "next/image";
import shinegradient from "@/public/_static/background/shinegradient.png";
import noisebg from "@/public/_static/background/noisebg.png";
import whitenoise from "@/public/_static/background/whitenoise.png";
import blurbg from "@/public/_static/background/blurbg.png";
import { recentLiquidations } from "@/lib/recentliquidations";

export default function ActivityContainerTable() {
  const recLiq = recentLiquidations;
  return (
    <div className="flex h-[100%] w-full md:ml-2 lg:ml-2 xl:ml-2 2xl:ml-2 flex-col ">
      <div className="h-[76px] rounded-t  px-[24px] relative flex justify-between items-center hover:border hover:border-black hover:rounded-md transition-all duration-200">
        <Image
          src={shinegradient}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-[10%] mix-blend-luminosity rounded-t"
        />
        <Image
          src={blurbg}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-[80%] mix-blend-color rounded-t"
        />

        <Image
          src={whitenoise}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-[20%] rounded-t"
        />

        <div className="flex items-center justify-between w-full relative z-10">
          <div className="flex flex-col">
            <p className="  font-bold italic text-[18px] sm:text-[18px] md:text-[18px] lg:text-[14px] xl:text-[18px] 2xl:text-[18px]">
              RECENT LIQUIDATIONS
            </p>
            <p className="text-[#8C8D8D] text-[14px] sm:text-[14px] md:text-[14px] lg:text-[12px] xl:text-[14px] 2xl:text-[14px]">
              Bidders with lower discounts have priority!
            </p>
          </div>
          <button
            className={`bg-[url('https://s3-alpha-sig.figma.com/img/8ea6/e432/6e6564e66f68b7295f71eac4bf133b3b?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EAltG6ZOq3hR8Pyy0NQANZBJq~dDkETRFggK1v-eULrMH9xS9WHIk5AvwrWmree9H8A2bA3IhN2w-gjww8k2HWhVZc9Jivt3HulR3w~aIkVuUPFuXCTpeGhX7Ia3jyKXI2E8TRee8Wtuk5IitIo1053~DMxTMtD0OqMXJb2biowxTYrUGTrfEOvtQGXyro-jDBkFW0EAv-3go02lD5HLoKEjSUrbim-XwurnXupz9~r4m~IfOLPH1DwRcmMfzhpaV9QV03NfkMqUI2BodXgjTgeL3bsoFEBF1MH~2NNaiuNwdz5OCSLR4O-LIG7pZuZ2cxFPse0UHZE9H5mD4paHNg__')] bg-black bg-cover bg-center w-[65px] h-[26px] text-white text-[12px] rounded-[2px]`}
          >
            All activity
          </button>
        </div>
      </div>
      <div className="bg-[#FFFFFF] border rounded-b mt-[8px]">
        <TableTop coin="NTRN" />
        {/* overflow-y-auto hide-scrollbar */}
        <div className="overflow-y-auto hide-scrollbar h-[400px] sm:h-[400px] md:h-[300px] lg:h-[300px] xl:h-[300px] 2xl:h-[300px]">
          {recLiq.map((elem, key) => {
            return (
              <RecentLiqTabEntry
                key={key}
                date={elem.date}
                time={elem.time}
                ntrnLiq={elem.ntrnLiq}
                usdcpaid={elem.usdcpaid}
                status={elem.status}
                avgprice={elem.avgprice}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

const TableTop = ({ coin }: { coin: string }) => {
  return (
    <div className="flex flex-row justify-center py-[20px] border-b">
      <ul className="flex font-medium justify-between px-[24px] w-full text-[10px] sm:text-[12px] md:text-[14px] lg:text-[12px] xl:text-[14px]">
        <li>TIME</li>
        <li>{coin} LIQUIDATION</li>
        <li>USDC PAID</li>
        <li>STATUS</li>
        <li>AV.PRICE</li>
      </ul>
    </div>
  );
};

function RecentLiqTabEntry({
  date,
  time,
  ntrnLiq,
  usdcpaid,
  status,
  avgprice,
}: {
  date: string;
  time: string;
  ntrnLiq: string;
  usdcpaid: string;
  status: string;
  avgprice: string;
}) {
  return (
    <div className="flex flex-row justify-center py-[20px] px-[24px] hover:bg-slate-100 transition-all duration-200">
      <ul className="flex gap-x-4 text-[10px] sm:text-[12px] md:text-[14px] lg:text-[12px] xl:text-[14px] w-full justify-between hover:text-black transition-all duration-150 text-slate-400 font-normal">
        <li className="flex flex-col">
          <p>{date}</p>
          <p>{time}</p>
        </li>
        <li>{ntrnLiq} NTRN</li>
        <li>{usdcpaid}</li>
        <li>{status}</li>
        <li className="flex flex-col">
          <p>{avgprice}</p>
          <p>NTRN</p>
        </li>
      </ul>
    </div>
  );
}

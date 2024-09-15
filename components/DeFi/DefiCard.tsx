import Image, { StaticImageData } from "next/image";

export default function DefiCard({
  title,
  asset,
  assetSymbol,
  assetImg,
  collateral,
  amount,
}: {
  title: string;
  asset: string;
  assetSymbol: string;
  assetImg: string | StaticImageData;
  collateral: string;
  amount: string;
}) {
  return (
    <div className="border border-[#EDEDED] rounded-[4px] shadow-lg">
      <div className="flex bg-[#F8F8F8] py-2 px-4">
        <p className="font-medium text-lg">{title}</p>
      </div>
      <div className=" border-t border-b border-[#EDEDED] flex justify-between px-4 py-[8px] text-xs text-[#8B8B93]">
        <p>Assets</p>
        <p>Collateral</p>
        <p>Amount</p>
      </div>
      <div className="flex px-4 md:px-2 lg:px-4 justify-between items-center py-3">
        <div className="flex gap-x-1 sm:gap-x-2 md:gap-x-1">
          <Image
            className="w-16 sm:w-20 md:w-16 lg:w-20"
            src={assetImg}
            alt="coin"
            width={200}
            height={200}
          />
          <div className="flex flex-col justify-center">
            <p className="text-lg font-bold">{assetSymbol}</p>
            <p className="text-[#8B8B93] text-xs sm:text-sm md:text-xs lg:text-sm">
              {asset}
            </p>
          </div>
        </div>
        <div>
          <p className="text-xl font-medium">${collateral}</p>
        </div>
        <div>
          <p className="text-[#8B8B93] text-xs md:text-xs sm:text-sm lg:text-sm">
            {amount} USDC
          </p>
        </div>
      </div>
    </div>
  );
}

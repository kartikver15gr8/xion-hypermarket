import Image from "next/image";
import randomstatic from "@/public/randomstatic.png";

export default function YouOweCard({ amt }: { amt: string }) {
  return (
    <div className="relative flex flex-col border py-1 md:py-2 lg:py-3 px-2 md:px-3 gap-y-2 rounded-md bg-white shadow-[inset_1px_2px_10px_rgba(0,0,0,0.08)] border-white">
      {/* h-20 sm:h-24 lg:h-28 xl:h-32 */}
      <Image
        src={randomstatic}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-[10%]"
      />
      <p className="text-[9px] sm:text-[11px] xl:text-xs">YOU OWE</p>
      <div className="flex items-center gap-x-1 md:gap-x-2">
        <p className="font-bold text-lg md:text-xl lg:text-2xl xl:text-3xl">
          $
        </p>
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
          {amt}
        </p>
      </div>
    </div>
  );
}

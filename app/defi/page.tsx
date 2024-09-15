import DeFi from "@/components/DeFi/DeFi";
import noisebg from "@/public/_static/background/noisebg.png";
import randomstatic from "@/public/randomstatic.png";
import Image from "next/image";

export default function page() {
  return (
    <div className="h-screen relative pt-16 px-4 md:px-[40px] lg:px-[60px] xl:px-[100px]">
      <Image
        src={randomstatic}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-[5%] mix-blend-luminosity"
      />
      <div className="w-full z-10">
        <DeFi />
      </div>
    </div>
  );
}

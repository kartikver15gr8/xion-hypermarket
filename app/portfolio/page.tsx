import Image from "next/image";
import thundertwo from "@/public/_static/background/thundertwo.png";
import bglines from "@/public/_static/background/bglines.png";
import coins from "@/public/_static/background/coins.png";
import noisebg from "@/public/_static/background/noisebg.png";
import randomstatic from "@/public/randomstatic.png";
import portfolio_ape from "@/public/_static/illustrations/portfolio_ape.png";
import Portfolio from "@/components/Portfolio/Portfolio";

export default function page() {
  return (
    <div className="relative w-full h-screen flex justify-center">
      <div className="relative  h-[100vh] overflow-hidden bg-[#050505] bg-opacity-10">
        <Image
          src={thundertwo}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-[10%] mix-blend-luminosity"
        />
        <Image
          src={coins}
          alt="Background"
          objectFit="cover"
          className="opacity-[16%] -rotate-[150deg] mix-blend-luminosity"
        />
      </div>
      <Portfolio status="Healthy" />
    </div>
  );
}

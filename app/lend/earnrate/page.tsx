import WalletConnectBtn from "@/components/BorrowPageComp/WalletConnectBtn";
import DepositEarnRateCard from "@/components/LendFlowPages/DepositEarnRateCard";
import LendMainPage from "@/components/LendFlowPages/LendMainPage";
import LendUSDC from "@/components/LendFlowPages/LendUSDC";
import whitenoise from "@/public/_static/background/whitenoise.png";
import thunderbg from "@/public/_static/background/thunderbg.png";
import bglines from "@/public/_static/background/bglines.png";
import Image from "next/image";
import KeplarConnect from "@/components/KeplarConnect";
import LeftReveal from "@/components/framerEffects/LeftReveal";
import SideReveal from "@/components/framerEffects/SideReveal";
import BlurFade from "@/components/magicui/blur-fade";
export default function page() {
  return (
    <div className="relative h-screen pb-10 mt-8 w-full">
      <Image
        src={whitenoise}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-[10%]"
      />
      <Image
        src={bglines}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-[8%]"
      />

      <Image
        src={thunderbg}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-[8%]"
      />
      <div className="relative z-10 h-[100vh] overflow-y-auto hide-scrollbar flex flex-col items-center justify-center">
        {/* <KeplarConnect /> */}

        <BlurFade delay={0.5}>
          <div className="flex flex-col items-center font-bold italic px-5">
            <p className="text-5xl sm:text-6xl md:text-7xl">LEND IT</p>
          </div>
        </BlurFade>

        <DepositEarnRateCard
          totalSupplied="$6.24M"
          oraclePrice="$1.00"
          maxLTV="79.50%"
          liquidationLTV="80.00%"
          utilizationRate="48.17%"
        />
      </div>
    </div>
  );
}

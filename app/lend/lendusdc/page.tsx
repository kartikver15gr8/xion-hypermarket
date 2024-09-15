import WalletConnectBtn from "@/components/BorrowPageComp/WalletConnectBtn";
import LendMainPage from "@/components/LendFlowPages/LendMainPage";
import LendUSDC from "@/components/LendFlowPages/LendUSDC";
import Image from "next/image";
import whitenoise from "@/public/_static/background/whitenoise.png";
import thunderbg from "@/public/_static/background/thunderbg.png";
import bglines from "@/public/_static/background/bglines.png";
import KeplarConnect from "@/components/KeplarConnect";
import SideReveal from "@/components/framerEffects/SideReveal";
import LeftReveal from "@/components/framerEffects/LeftReveal";
export default function page() {
  return (
    <div className="relative h-screen pb-10 w-full">
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
        <SideReveal>
          <div className="flex flex-col items-center font-bold italic px-5">
            <p className="text-5xl sm:text-7xl">LEND IT</p>
            <p className="text-3xl sm:text-4xl mt-3">TO EARN IT</p>
          </div>
        </SideReveal>
        <LeftReveal>
          <LendUSDC className="mt-14 shadow-lg" percent="2,5%" />
        </LeftReveal>
      </div>
    </div>
  );
}

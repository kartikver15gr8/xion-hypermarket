import WalletConnectBtn from "@/components/BorrowPageComp/WalletConnectBtn";
import DepositAssets from "@/components/LendFlowPages/DepositAssets";
import DepositStatus from "@/components/LendFlowPages/DepositStatus";
import Image from "next/image";
import whitenoise from "@/public/_static/background/whitenoise.png";
import thunderbg from "@/public/_static/background/thunderbg.png";
import bglines from "@/public/_static/background/bglines.png";
import KeplarConnect from "@/components/KeplarConnect";
import Reveal from "@/components/framerEffects/Reveal";
export default function page() {
  return (
    <div className="absolute w-full bg-black bg-opacity-55 z-10 justify-center flex xl:pt-8">
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
      <div className="flex w-full md:w-5/6 h-screen items-center justify-center">
        <div className="relative z-10 h-[100vh] overflow-y-auto hide-scrollbar flex items-center justify-center">
          {/* <KeplarConnect /> */}
          <Reveal>
            <DepositStatus hash="0b3fe99b745ba2079" depositAmt="$850.00" />
          </Reveal>
        </div>
      </div>
    </div>
  );
}

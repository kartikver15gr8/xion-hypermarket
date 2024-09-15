import WalletConnectBtn from "@/components/BorrowPageComp/WalletConnectBtn";
import AddAssets from "@/components/LendFlowPages/AddAssets";
import DepositAssets from "@/components/LendFlowPages/DepositAssets";
import Image from "next/image";
import whitenoise from "@/public/_static/background/whitenoise.png";
import thunderbg from "@/public/_static/background/thunderbg.png";
import bglines from "@/public/_static/background/bglines.png";
import KeplarConnect from "@/components/KeplarConnect";
import Reveal from "@/components/framerEffects/Reveal";
export default function page() {
  return (
    <div className="absolute w-full bg-black bg-opacity-55 z-10 justify-end flex">
      <div className="flex w-full h-screen items-center justify-center">
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
        <div className="relative z-10 h-[100vh] overflow-y-auto hide-scrollbar  flex items-center justify-center">
          {/* <KeplarConnect /> */}
          <Reveal>
            <AddAssets />
          </Reveal>
        </div>
      </div>
    </div>
  );
}

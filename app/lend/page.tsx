import WalletConnectBtn from "@/components/BorrowPageComp/WalletConnectBtn";
import LendMainPage from "@/components/LendFlowPages/LendMainPage";
import Image from "next/image";
import whitenoise from "@/public/_static/background/whitenoise.png";
import thunderbg from "@/public/_static/background/thunderbg.png";
import bglines from "@/public/_static/background/bglines.png";
import KeplarConnect from "@/components/KeplarConnect";
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
      <div className="relative z-10 h-[100vh] overflow-y-auto hide-scrollbar flex items-center justify-center">
        {/* <KeplarConnect /> */}
        <LendMainPage />
      </div>
    </div>
  );
}

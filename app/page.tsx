import TopNavbar from "@/components/TopNavbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import bgApe from "@/public/bgApe.svg";
import HamburgerNav from "@/components/HamburgerNav";
import BlurFade from "@/components/magicui/blur-fade";
import PageLanding from "@/components/MainPage/PageLanding";
import FinalBidsLabel from "@/components/MainPage/FinalBidsLabel";
import ProductExhibition from "@/components/MainPage/ProductExhibition";

export default function Home() {
  return (
    <div className="">
      <PageLanding />
      <FinalBidsLabel />
      <ProductExhibition />
    </div>
  );
}

// <div className="flex flex-col items-center h-screen">
// {/* <div className="fixed w-[95%] z-10">
//   <TopNavbar />
// </div> */}
// {/* <HamburgerNav /> */}
// <div className="flex flex-col items-center justify-center  h-full">
//   <Image className="absolute w-[800px]" src={bgApe} alt="bg" />
//   <BlurFade delay={0.5} inView>
//     <p className=" text-4xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-7xl 2xl:text-7xl  mx-10 italic font-bold my-4 text-black ">
//       SENDIT ZONE
//     </p>
//   </BlurFade>
//   <BlurFade delay={1.0} inView>
//     <Link href="/liquidation" className=" w-fit flex">
//       <Button className="rounded-full w-24 md:w-28 md:text-[12px] text-[11px] lg:w-32 lg:text-[14px] 2xl:w-36 2xl:text-[15px] z-30 hover:bg-[#626263] transition-all duration-300">
//         Shop Now!
//       </Button>
//     </Link>
//   </BlurFade>
// </div>
// </div>

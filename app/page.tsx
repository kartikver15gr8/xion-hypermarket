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

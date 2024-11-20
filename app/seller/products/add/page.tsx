import Image, { StaticImageData } from "next/image";
import ball from "@/public/ball.png";
import matrixcube from "@/public/matrixcube.png";
import cubeik from "@/public/cubeik.png";
import Link from "next/link";

export default function page() {
  return (
    <div className="pt-16 min-h-screen bg-[#FAF9F5] flex flex-col items-center w-full">
      <div className="w-[80%]">
        <div className="flex gap-x-1 mt-10 items-center">
          <p className="font-bold text-3xl italic">ADD PRODUCT</p>
        </div>
        <p className="text-xs text-[#52525C]">
          List your product on Hyper here.
        </p>
        <div className="rounded-xl border border-[#E5E5E5]  p-4 mt-6 bg-white">
          <p className="text-xl font-medium">Select Product&apos;s Category</p>
          <p className="text-sm mt-2 text-[#52525C]">Categories:</p>
          <div className="grid grid-cols-1 gap-y-4 md:gap-y-0 md:grid-cols-3 mt-4 gap-x-4">
            <ProductCard
              redirectHref="/seller/products/add/category/digital-products"
              img={matrixcube}
              title="Digital Products"
              examples="Things like: ebooks, skins, game skins"
            />
            <ProductCard
              redirectHref="/seller/products/add/category/private-groups"
              img={cubeik}
              title="Private Groups"
              examples="Crypto Alpha Groups!"
            />
            <ProductCard
              redirectHref=""
              img={ball}
              title="Digital Services"
              examples="COMING SOON…!"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const ProductCard = ({
  img,
  title,
  examples,
  redirectHref,
}: {
  img: string | StaticImageData;
  title: string;
  examples: string;
  redirectHref: string;
}) => {
  return (
    <Link
      href={redirectHref}
      className="border rounded-lg border-[#E5E5E5] bg-[#F5F5F5]  flex flex-col items-center justify-center h-[400px] hover:bg-[#e5e5e5] transition-all duration-300 z-50"
    >
      <Image className="w-24" src={img} alt="" />
      <p className="font-medium text-2xl mt-4">{title}</p>
      <p className="text-xs mt-3">{examples}</p>
    </Link>
  );
};

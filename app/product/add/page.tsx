import Image, { StaticImageData } from "next/image";
import ball from "@/public/ball.png";
import matrixcube from "@/public/matrixcube.png";
import Link from "next/link";

export default function page() {
  return (
    <div className="pt-16 min-h-screen bg-[#FAF9F5] flex flex-col items-center">
      <div className="w-[70%]">
        <div className="flex gap-x-1 mt-10 items-center">
          <svg
            className="w-3"
            viewBox="0 0 18 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 4.50008H12.75C14.8211 4.50008 16.5 6.17901 16.5 8.25008C16.5 10.3211 14.8211 12.0001 12.75 12.0001H9M1.5 4.50008L4.83333 1.16675M1.5 4.50008L4.83333 7.83341"
              stroke="#0A0A0B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <p className="font-bold text-3xl italic">ADD PRODUCT</p>
        </div>
        <p className="text-xs text-[#52525C]">
          List your product on Hyper here.
        </p>
        <div className="rounded-xl border border-[#E5E5E5]  p-4 mt-6 bg-white">
          <p className="text-xl font-medium">Select Product&apos;s Category</p>
          <p className="text-sm mt-2 text-[#52525C]">Categories:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-x-4">
            <ProductCard
              img={matrixcube}
              title="Digital Products"
              examples="Things like: ebooks, skins, game skins"
            />
            <ProductCard
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
}: {
  img: string | StaticImageData;
  title: string;
  examples: string;
}) => {
  return (
    <Link
      href={"/product/add/category"}
      className="border rounded-lg border-[#E5E5E5] bg-[#F5F5F5]  flex flex-col items-center justify-center h-[450px] hover:bg-[#e5e5e5] transition-all duration-300"
    >
      <Image className="w-24" src={img} alt="" />
      <p className="font-medium text-2xl mt-4">{title}</p>
      <p className="text-xs mt-3">{examples}</p>
    </Link>
  );
};

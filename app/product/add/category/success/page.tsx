"use client";
import coins from "@/public/_static/background/coins.png";
import Image from "next/image";
import senditApe from "@/public/sendit_ape.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function page() {
  return (
    <div className="pt-16 pb-20 sm:px-[20px] md:px-[40px] lg:px-[60px] xl:px-[150px] 2xl:px-[200px] min-h-screen bg-[#FAF9F5]">
      <div className="bg-white relative overflow-hidden rounded-xl border h-[650px] mt-5">
        <Image
          src={coins}
          alt="Background"
          layout=""
          objectFit=""
          className="opacity-[5%] absolute bottom-36 rotate-180"
        />
        <div className="relative z-20 w-full h-full flex flex-col items-center justify-center ">
          <Image
            className="w-32 bg-white h-32 border rounded-full"
            src={senditApe}
            alt=""
          />
          <div className="flex flex-col items-center">
            <p className="text-black font-medium text-xl mt-4">Success!</p>
            <p className="text-black font-medium text-xl mb-2">
              Your Product is Live on Sendit!
            </p>
            <p className="text-sm text-slate-400">
              Your [Item Name] is now listed and ready to find its new owner.
            </p>
            <p className="text-sm text-slate-400">
              Check your listing anytime and make any updates if needed.
            </p>
          </div>
          <div className="w-full flex  justify-center border-b pb-10 items-center my-5">
            <Button className="mr-2 border rounded w-36 bg-white text-black hover:bg-slate-200 transition-all duration-200">
              Check Dashboard
            </Button>

            <Button className="rounded w-36">List Products</Button>
          </div>
          <div className="flex flex-col items-center justify-center ">
            <p className="text-lg font-medium mb-5">
              Sharing listing on socials
            </p>
            <div className="flex gap-x-2">
              <div className="w-12 h-12 border flex items-center justify-center rounded bg-black">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.5859 19.375L12.0885 8.44715L12.1013 8.45739L18.8613 0.625H16.6023L11.0954 7L6.72227 0.625H0.797664L7.79723 10.8276L7.79638 10.8267L0.414062 19.375H2.67309L8.79548 12.2824L13.6613 19.375H19.5859ZM5.82719 2.32954L16.3466 17.6705H14.5564L4.02852 2.32954H5.82719Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="w-12 h-12 border flex items-center rounded justify-center bg-blue-500">
                <svg
                  width="20"
                  height="18"
                  viewBox="0 0 20 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.5522 -0.00306835C18.3115 0.0147873 18.0752 0.071259 17.8525 0.164182H17.8495C17.6357 0.248932 16.6195 0.676431 15.0745 1.32443L9.53797 3.65618C5.56522 5.32868 1.65997 6.97568 1.65997 6.97568L1.70647 6.95768C1.70647 6.95768 1.43722 7.04618 1.15597 7.23893C0.981825 7.349 0.832216 7.49375 0.716473 7.66418C0.578473 7.86668 0.467473 8.17643 0.508723 8.49668C0.576223 9.03818 0.927223 9.36293 1.17922 9.54218C1.43422 9.72368 1.67722 9.80843 1.67722 9.80843H1.68322L5.34547 11.0422C5.50972 11.5694 6.46147 14.6984 6.69022 15.4192C6.82522 15.8497 6.95647 16.1189 7.12072 16.3244C7.19922 16.4294 7.29397 16.5172 7.40497 16.5877C7.46263 16.6223 7.52469 16.6491 7.58947 16.6672L7.55197 16.6582C7.56322 16.6612 7.57222 16.6702 7.58047 16.6732C7.61047 16.6814 7.63072 16.6844 7.66897 16.6904C8.24872 16.8659 8.71447 16.5059 8.71447 16.5059L8.74072 16.4849L10.903 14.5162L14.527 17.2964L14.6095 17.3317C15.3647 17.6632 16.1297 17.4787 16.534 17.1532C16.9412 16.8254 17.0995 16.4062 17.0995 16.4062L17.1257 16.3387L19.9262 1.99193C20.0057 1.63793 20.026 1.30643 19.9382 0.984682C19.8482 0.658823 19.6392 0.378606 19.3525 0.199431C19.1121 0.0531815 18.8332 -0.0173751 18.5522 -0.00306835ZM18.4765 1.53443C18.4735 1.58168 18.4825 1.57643 18.4615 1.66718V1.67543L15.6872 15.8729C15.6752 15.8932 15.655 15.9374 15.5995 15.9817C15.541 16.0282 15.4945 16.0574 15.2507 15.9607L10.8182 12.5624L8.14072 15.0029L8.70322 11.4104L15.9452 4.66043C16.2437 4.38293 16.144 4.32443 16.144 4.32443C16.165 3.98393 15.6932 4.22468 15.6932 4.22468L6.56122 9.88193L6.55822 9.86693L2.18122 8.39318V8.39018L2.16997 8.38793L2.19247 8.37893L2.21647 8.36693L2.23972 8.35868C2.23972 8.35868 6.14797 6.71168 10.1207 5.03918C12.1097 4.20143 14.1137 3.35768 15.655 2.70668C16.569 2.32193 17.484 1.93943 18.4 1.55918C18.4615 1.53518 18.4322 1.53443 18.4765 1.53443Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Image, { StaticImageData } from "next/image";
import Design_System_UI_Kit_for_Figma from "@/public/_static/illustrations/Blinks.png";
import { useEffect, useState } from "react";
import { ProductInterface, PurchasesInterface } from "@/lib/models";
import axios from "axios";
export default function PurchaseLibrary({ USER_ID }: { USER_ID: number }) {
  return (
    <div className="">
      <TopBar order="12355" />
      <div className="flex items-center gap-x-5 mt-10">
        <p className="text-3xl font-bold italic">Order #12323</p>
        <button className="border rounded-md bg-green-300 bg-opacity-40 border-green-600 h-7 px-1">
          Completed
        </button>
      </div>

      <PurchaseDetails
        purchaseDate="September 16, 2024, 2:35 PM UTC"
        paymentMethod="Wallet: Ox6b..3dsx"
        txId="0x...454jkx"
      />
      <PurchasedProducts userId={USER_ID} />
      <div className="mt-8 justify-end flex">
        <Summary />
      </div>
    </div>
  );
}

const PurchaseDetails = ({
  purchaseDate,
  paymentMethod,
  txId,
}: {
  purchaseDate: string;
  paymentMethod: string;
  txId: string;
}) => {
  return (
    <div className="grid grid-cols-3 mt-5 w-[80%]">
      <div>
        <p className="text-[#8B8B93]">PURCHASE DATE</p>
        <p>{purchaseDate}</p>
      </div>
      <div>
        <p className="text-[#8B8B93]">PAYMENT METHOD</p>
        <p>{paymentMethod}</p>
      </div>
      <div>
        <p className="text-[#8B8B93]">TRANSACTION ID</p>
        <p>{txId}</p>
      </div>
    </div>
  );
};

const TopBar = ({ order }: { order: string }) => {
  return (
    <div className="flex items-center gap-x-3 mt-5 border-b pb-1 border-[##E8E7E5]">
      <svg
        className="w-4"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.5 16.5V10.3333C6.5 9.86661 6.5 9.63326 6.59083 9.455C6.67072 9.29819 6.79821 9.17071 6.95501 9.09081C7.13327 8.99999 7.36662 8.99999 7.83333 8.99999H10.1667C10.6334 8.99999 10.8667 8.99999 11.045 9.09081C11.2018 9.17071 11.3293 9.29819 11.4092 9.455C11.5 9.63326 11.5 9.86661 11.5 10.3333V16.5M8.18141 1.30333L2.52949 5.69927C2.15168 5.99312 1.96278 6.14005 1.82669 6.32405C1.70614 6.48704 1.61633 6.67065 1.56169 6.86588C1.5 7.08627 1.5 7.32558 1.5 7.80421V13.8333C1.5 14.7667 1.5 15.2335 1.68166 15.59C1.84144 15.9036 2.09641 16.1585 2.41002 16.3183C2.76654 16.5 3.23325 16.5 4.16667 16.5H13.8333C14.7668 16.5 15.2335 16.5 15.59 16.3183C15.9036 16.1585 16.1586 15.9036 16.3183 15.59C16.5 15.2335 16.5 14.7667 16.5 13.8333V7.80421C16.5 7.32558 16.5 7.08627 16.4383 6.86588C16.3837 6.67065 16.2939 6.48704 16.1733 6.32405C16.0372 6.14005 15.8483 5.99312 15.4705 5.69927L9.81859 1.30333C9.52582 1.07562 9.37943 0.961766 9.21779 0.918001C9.07516 0.879384 8.92484 0.879384 8.78221 0.918001C8.62057 0.961766 8.47418 1.07562 8.18141 1.30333Z"
          stroke="#050505"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <svg
        width="6"
        height="10"
        viewBox="0 0 6 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 9L5 5L1 1"
          stroke="#050505"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <p>Orders</p>

      <svg
        width="6"
        height="10"
        viewBox="0 0 6 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 9L5 5L1 1"
          stroke="#050505"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <p className="text-[#8B8B92] italic">#{order}</p>
    </div>
  );
};

const PurchasedProducts = ({ userId }: { userId: number }) => {
  const [productPurchases, setProductPurchases] = useState<
    PurchasesInterface[]
  >([]);

  const fetchPurchases = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/fetch/purchases?user_id=${userId}`
      );
      // console.log(response.data);
      setProductPurchases(response.data);
    } catch (error) {
      console.log(`You got an error while fetching user purchases: ${error}`);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  return (
    <div className="border rounded-xl bg-white shadow-lg mt-14">
      <div className="grid grid-cols-10 h-14 items-center px-3 border-b text-[#8B8B93]">
        <p className="col-span-3">PRODUCT</p>
        <p className="col-span-1">PRICE</p>
        <p className="col-span-2">DETAILS</p>
        <p className="col-span-2">SELLER</p>
        <p className="col-span-2">ACTION</p>
      </div>
      {productPurchases.length > 1 ? (
        <div className="h-60 overflow-y-auto  hide-scrollbar scroll-smooth">
          {productPurchases.map((elem, key) => {
            return (
              <ProductLabel
                key={key}
                productImg="https://ucarecdn.com/deb46443-1cf0-4ec1-bb33-f86d93cfb949/e15545c9453e489ca7dbe8dd427b00e3.webp"
                productName="Content Writing"
                price={elem.Amount.toString()}
                fileDetails="a.zip"
                sellerDetails="Basil Naser"
              />
            );
          })}
        </div>
      ) : (
        <div className="h-20 overflow-y-auto  hide-scrollbar scroll-smooth">
          <ProductLabel
            productImg="https://ucarecdn.com/deb46443-1cf0-4ec1-bb33-f86d93cfb949/e15545c9453e489ca7dbe8dd427b00e3.webp"
            productName="No Product"
            price=""
            fileDetails=""
            sellerDetails="None"
          />
        </div>
      )}
    </div>
  );
};

const ProductLabel = ({
  productImg,
  productName,
  price,
  fileDetails,
  sellerDetails,
}: {
  productImg: string | StaticImageData;
  productName: string;
  price: string;
  fileDetails: string;
  sellerDetails: string;
}) => {
  return (
    <div className="grid grid-cols-10 border-b  h-20 px-3 items-center">
      <div className="col-span-3 flex items-center gap-x-4">
        <Image
          src={productImg}
          alt="product"
          className=" w-16 h-16 rounded-md"
          width={100}
          height={100}
        />

        <p className="text-lg font-medium">{productName}</p>
      </div>
      <div className="col-span-1">
        <p>${price}.00</p>
      </div>
      <div className="col-span-2 flex items-center gap-x-2">
        <svg
          className="w-3"
          viewBox="0 0 12 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.16732 0.823933V3.23342C7.16732 3.56011 7.16732 3.72346 7.2309 3.84824C7.28682 3.958 7.37606 4.04724 7.48582 4.10317C7.6106 4.16675 7.77395 4.16675 8.10065 4.16675H10.5101M10.6673 5.32655V9.53341C10.6673 10.5135 10.6673 11.0036 10.4766 11.3779C10.3088 11.7072 10.0411 11.9749 9.7118 12.1427C9.33746 12.3334 8.84741 12.3334 7.86732 12.3334H4.13398C3.15389 12.3334 2.66385 12.3334 2.2895 12.1427C1.96022 11.9749 1.6925 11.7072 1.52472 11.3779C1.33398 11.0036 1.33398 10.5135 1.33398 9.53341V3.46675C1.33398 2.48666 1.33398 1.99661 1.52472 1.62226C1.6925 1.29298 1.96022 1.02527 2.2895 0.857487C2.66385 0.666748 3.15389 0.666748 4.13398 0.666748H6.00752C6.43555 0.666748 6.64957 0.666748 6.85097 0.715101C7.02954 0.75797 7.20024 0.828678 7.35682 0.924628C7.53342 1.03285 7.68475 1.18418 7.98742 1.48685L9.84722 3.34665C10.1499 3.64931 10.3012 3.80065 10.4094 3.97725C10.5054 4.13383 10.5761 4.30453 10.619 4.48309C10.6673 4.6845 10.6673 4.89851 10.6673 5.32655Z"
            stroke="#52525C"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <p>{fileDetails}</p>
      </div>
      <div className="col-span-2 flex items-center gap-x-2">
        <Image
          src={productImg}
          alt="product"
          className=" w-8 h-8 rounded-full"
          width={100}
          height={100}
        />

        <p className="">{sellerDetails}</p>
      </div>
      <div className="col-span-2 flex items-center bg-black text-white h-10 justify-center gap-x-2 rounded-lg">
        <svg
          className="w-3"
          viewBox="0 0 12 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.25 11.75H0.75M9.5 5.91667L6 9.41667M6 9.41667L2.5 5.91667M6 9.41667V1.25"
            stroke="#FEFEFD"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <p>Download</p>
      </div>
    </div>
  );
};

const Summary = () => {
  return (
    <div className=" w-96 flex flex-col">
      <div className="flex items-center justify-between">
        <p>Subtotal</p>
        <p>88.00</p>
      </div>
      <div className="flex items-center justify-between">
        <p>Discount</p>
        <p>88.00</p>
      </div>
      <div className="flex items-center justify-between">
        <p>Duties</p>
        <p>88.00</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-bold">Total</p>
        <p>88.00</p>
      </div>
      <button className="rounded-xl h-10 px-2 mt-5 bg-[#223D40] text-white font-medium">
        Download Invoice
      </button>
    </div>
  );
};

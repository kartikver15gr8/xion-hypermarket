"use client";

import Image, { StaticImageData } from "next/image";
import Design_System_UI_Kit_for_Figma from "@/public/_static/illustrations/Blinks.png";
import { useEffect, useState } from "react";
import { ProductInterface, PurchasesInterface } from "@/lib/models";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { phantomWallet } from "@/store/atom/phantomWallet";
import homeIconSVG from "@/public/homeicon.svg";
import Link from "next/link";
export default function UserLibrary() {
  const [userId, setUserId] = useState();
  const userWalletAddress = useRecoilValue(phantomWallet);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/fetch/user/${userWalletAddress}`
      );
      setUserId(response.data.id);
      // console.log(response.data.id);

      return response.data;
    } catch (error) {
      return `Error: ${error}`;
    }
  };

  useEffect(() => {
    if (userWalletAddress) {
      fetchUserDetails();
    }
  }, [userWalletAddress]);

  return (
    <div className="">
      <TopBar />
      <div className="flex items-center gap-x-5 mt-10">
        <p className="text-4xl font-bold">Your Recent Purchases</p>
      </div>

      {/* <PurchaseDetails
        purchaseDate="September 16, 2024, 2:35 PM UTC"
        paymentMethod="Wallet: Ox6b..3dsx"
        txId="0x...454jkx"
      /> */}
      {userId && <PurchasedProducts userId={userId} />}
      {/* <div className="mt-8 justify-end flex">
        <Summary />
      </div> */}
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

const TopBar = () => {
  return (
    <div className="flex items-center gap-x-3 mt-5 border-b pb-1 border-[##E8E7E5]">
      <Link href={"/"} className="w-fit">
        <Image
          className="w-4"
          src={homeIconSVG}
          alt="home"
          width={50}
          height={50}
        />
      </Link>

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
    </div>
  );
};

const PurchasedProducts = ({ userId }: { userId: number }) => {
  const [productPurchases, setProductPurchases] = useState<
    PurchasesInterface[]
  >([]);

  const fetchPurchases = async () => {
    if (userId) {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/fetch/purchases?buyer_id=${userId}`
        );
        // console.log(response.data);
        setProductPurchases(response.data);
      } catch (error) {
        console.log(`You got an error while fetching user purchases: ${error}`);
      }
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  return (
    <div className="border rounded-xl bg-white shadow-lg mt-14">
      <div className="px-2 mb-1 grid grid-cols-12 items-center w-full h-10 rounded-t-lg shadow-[inset_0px_2px_10px_rgba(0,0,0,0.04)] bg-[#F7F7F7]">
        <p className="text-[10px] md:text-[13px] col-span-3">PRODUCT</p>
        <p className="text-[10px] md:text-[13px] col-span-1">PRICE</p>
        <p className="text-[10px] md:text-[13px] col-span-2">PURCHASE DATE</p>
        <p className="text-[10px] md:text-[13px] col-span-1">FILE SIZE</p>
        <p className="text-[10px] md:text-[13px] col-span-1">FILE TYPE</p>
        <p className="text-[10px] md:text-[13px] col-span-1">CHECKSUM</p>
        <p className="text-[10px] md:text-[13px] col-span-1">SELLER</p>
        <p className="text-[10px] md:text-[13px] col-span-1">HASH</p>
        <p className="text-[10px] md:text-[13px] col-span-1">ACTION</p>
      </div>
      {productPurchases.length >= 1 ? (
        <div className="h-[50vh] overflow-y-auto  hide-scrollbar scroll-smooth">
          {productPurchases.map((elem, key) => {
            return (
              <ProductLabel
                key={key}
                productId={elem.product_id}
                productImg={elem.product_thumbnail_url}
                productName={elem.product_title}
                price={elem.amount.toFixed(2)}
                // fileDetails={elem.product_filename}
                purchaseDate={elem.created_at}
                fileSize={elem.product_file_size}
                fileType={elem.product_file_type}
                checkSum={elem.product_file_checksum}
                transactionHash={elem.transaction_hash}
                sellerDetails={elem.seller_wallet_address}
              />
            );
          })}
        </div>
      ) : (
        <div className="h-20 overflow-y-auto  hide-scrollbar scroll-smooth">
          <ProductLabel
            productImg="https://ucarecdn.com/deb46443-1cf0-4ec1-bb33-f86d93cfb949/e15545c9453e489ca7dbe8dd427b00e3.webp"
            productId={0}
            productName="string"
            price="string"
            purchaseDate="string"
            sellerDetails="string"
            fileSize="string"
            fileType="string"
            checkSum="string"
            transactionHash="string"
          />
        </div>
      )}
    </div>
  );
};

const ProductLabel = ({
  productId,
  productImg,
  productName,
  price,
  purchaseDate,
  sellerDetails,
  fileSize,
  fileType,
  checkSum,
  transactionHash,
}: {
  productId?: number;
  productImg: string | StaticImageData;
  productName: string;
  price: string;
  purchaseDate: string;
  sellerDetails: string;
  fileSize: string;
  fileType: string;
  checkSum: string;
  transactionHash: string;
}) => {
  const dateStr = purchaseDate;
  const date = new Date(dateStr);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const formattedDate = date.toLocaleString("en-US", options);

  return (
    <div className="border-b px-2 grid grid-cols-12 items-center w-full h-12">
      <Link
        href={`/product/${productId}`}
        className="col-span-3 flex items-center gap-x-2"
      >
        <Image
          src={productImg}
          alt="product"
          className=" w-8 h-8 rounded-md"
          width={20}
          height={20}
        />

        {productName.length > 20 ? (
          <p className="text-[9px] md:text-[13px]">
            {productName.slice(0, 20)}...
          </p>
        ) : (
          <p className="text-[9px] md:text-[13px]">{productName}</p>
        )}
      </Link>
      <p className="text-[9px] md:text-[13px] col-span-1">{`${price} SOL`}</p>
      <p className="text-[9px] md:text-[13px] col-span-2">{formattedDate}</p>
      <p className="text-[9px] md:text-[13px] col-span-1">{fileSize}</p>
      <p className="text-[9px] md:text-[13px] col-span-1">{fileType}</p>
      {checkSum && checkSum.length > 10 ? (
        <p className="text-[9px] md:text-[13px] col-span-1">
          {checkSum.slice(0, 10)}...
        </p>
      ) : (
        <p className="text-[9px] md:text-[13px] col-span-`">{checkSum}</p>
      )}
      {/* <p className="text-[9px] md:text-[13px] col-span-2">{sellerDetails}</p> */}
      {sellerDetails && sellerDetails.length > 10 ? (
        <p className="text-[9px] md:text-[13px] col-span-1">
          {`${sellerDetails.slice(0, 4)}…${sellerDetails.slice(-3)}`}
        </p>
      ) : (
        <p className="text-[9px] md:text-[13px] col-span-1">{sellerDetails}</p>
      )}
      <div className="text-[9px] md:text-[13px] col-span-1 flex items-center">
        {transactionHash && transactionHash.length > 16 ? (
          <p className="text-[9px] md:text-[13px]">
            {transactionHash.slice(0, 16)}...
          </p>
        ) : (
          <p className="text-[9px] md:text-[13px]">{transactionHash}</p>
        )}
        <svg
          className="w-3 ml-1"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.66797 4.6665V3.03317C4.66797 2.37978 4.66797 2.05308 4.79513 1.80352C4.90698 1.58399 5.08546 1.40552 5.30498 1.29366C5.55454 1.1665 5.88124 1.1665 6.53464 1.1665H10.968C11.6214 1.1665 11.9481 1.1665 12.1976 1.29366C12.4171 1.40552 12.5956 1.58399 12.7075 1.80352C12.8346 2.05308 12.8346 2.37978 12.8346 3.03317V7.4665C12.8346 8.1199 12.8346 8.4466 12.7075 8.69616C12.5956 8.91568 12.4171 9.09416 12.1976 9.20601C11.9481 9.33317 11.6214 9.33317 10.968 9.33317H9.33464M3.03464 12.8332H7.46797C8.12136 12.8332 8.44806 12.8332 8.69762 12.706C8.91715 12.5942 9.09562 12.4157 9.20748 12.1962C9.33464 11.9466 9.33464 11.6199 9.33464 10.9665V6.53317C9.33464 5.87978 9.33464 5.55308 9.20748 5.30352C9.09562 5.08399 8.91715 4.90552 8.69762 4.79366C8.44806 4.6665 8.12136 4.6665 7.46797 4.6665H3.03464C2.38124 4.6665 2.05454 4.6665 1.80498 4.79366C1.58546 4.90552 1.40698 5.08399 1.29513 5.30352C1.16797 5.55308 1.16797 5.87978 1.16797 6.53317V10.9665C1.16797 11.6199 1.16797 11.9466 1.29513 12.1962C1.40698 12.4157 1.58546 12.5942 1.80498 12.706C2.05454 12.8332 2.38124 12.8332 3.03464 12.8332Z"
            stroke="#8B8B92"
            strokeWidth="1.1375"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <button className="col-span-1 flex items-center bg-black text-white h-8 justify-center gap-x-2 rounded-md hover:bg-[#5a5c5d] transition-all duration-300">
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

        <p className="text-[9px] md:text-[13px]">Download</p>
      </button>
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

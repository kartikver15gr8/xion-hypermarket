"use client";
import Image from "next/image";
import hex from "@/public/hex.svg";
import randomstatic from "@/public/randomstatic.png";
import circlemedal from "@/public/circlemedal.svg";
import logodesign from "@/public/marqueeicons/logodesign.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import usdccoin from "@/public/_static/coinIcons/usdc.png";
import { SalesLabel } from "../SellerDashboard";
import { toast } from "sonner";
import { PurchasesInterface } from "@/lib/models";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { phantomWallet } from "@/store/atom/phantomWallet";
import spinnerthree from "@/public/loaders/spinnerthree.svg";
import { jsPDF } from "jspdf";
import { imageBase64 } from "@/utils/imageBase";

const Active =
  "h-10 text-[#4E6465] flex items-center justify-center gap-x-2 border-b-2 border-[#4E6465]";
const InActive =
  "h-10 text-[#8B8B92] flex items-center justify-center gap-x-2 border-b-2 border-[#EBEBF0]";

export default function Transactions() {
  const [tab, setTab] = useState("sales");

  const selectSales = () => {
    setTab("sales");
    return toast.info("Switched to Sales Overview");
  };
  const selectOrders = () => {
    setTab("orders");
    return toast.info("Switched to Order Overview");
  };

  return (
    <div className="w-[100%] pb-20 relative overflow-y-auto hide-scrollbar h-[90vh] scroll-smooth">
      <TransactionTopLabel />
      <div className="px-[20px] sm:px-[20px] md:px-[40px] lg:px-[60px] xl:px-20 mt-8 ">
        <div className="grid grid-cols-2 w-[250px]">
          <div
            className={tab == "sales" ? Active : InActive}
            onClick={selectSales}
          >
            <p className="text-md">Sales</p>
            <div className="flex items-center justify-center w-5 h-5 rounded-md bg-[#EBEBF0]">
              <p className="text-sm ">10</p>
            </div>
          </div>
          <div
            className={tab == "orders" ? Active : InActive}
            onClick={selectOrders}
          >
            <p className="text-md">Orders</p>
            <div className="flex items-center justify-center w-5 h-5 rounded-md bg-[#EBEBF0]">
              <p className="text-sm">10</p>
            </div>
          </div>
        </div>

        {tab == "sales" ? <SalesOverview /> : <OrderOverview />}
      </div>
    </div>
  );
}

export const OrderOverview = () => {
  return (
    <div className="mt-8">
      <p className="font-medium text-xl">Orders Overview</p>
      <div className="grid grid-cols-12 mt-4 gap-x-2 md:gap-x-4 lg:gap-x-8  h-10">
        <div className="col-span-2 border rounded-lg flex items-center justify-center gap-x-2">
          <p className="text-xs md:text-[13px] lg:text-sm">Filter</p>
          <svg
            className="w-2 md:w-3"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="#8B8B92"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="col-span-10 border rounded-lg flex items-center pl-3">
          <svg
            className="mr-3"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.49935 10.0602C10.5223 9.14471 11.166 7.81421 11.166 6.33337C11.166 3.57195 8.92743 1.33337 6.16602 1.33337C3.40459 1.33337 1.16602 3.57195 1.16602 6.33337C1.16602 9.09479 3.40459 11.3334 6.16602 11.3334C7.4466 11.3334 8.61477 10.852 9.49935 10.0602ZM9.49935 10.0602L13.2725 13.8334"
              stroke="#8B8B92"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            className="h-full w-full outline-none rounded-r-lg"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="">
        <OrderOveriewCard />
        <OrderOveriewCard />
        <OrderOveriewCard />
      </div>
    </div>
  );
};

export const OrderOveriewCard = () => {
  return (
    <div className="border rounded-xl bg-white mt-4 ">
      <div className="p-4">
        <p>Order #12</p>
        <div className="w-fit my-4 px-1 border-[#9DFFB2] bg-[#DFFFE4] h-6 rounded-md border flex items-center justify-center">
          <p className="text-xs text-[#007230]">Completed</p>
        </div>
        <div className="flex justify-between mt-2 items-center">
          <div className="flex items-center gap-x-3 mt-1">
            <Image className="w-12 h-12 rounded" src={logodesign} alt="" />
            <div>
              <p className="text-[10px] sm:text-[11px] font-medium">
                Digital Product
              </p>
              <p className="font-medium text-[13px] md:text-[15px]">
                How to Design better UI
              </p>
              <p className="text-[10px] sm:text-[11px]">
                Variation - Extended Version
              </p>
            </div>
          </div>
          <div className="flex items-center gap-x-1 px-2 h-9 border rounded-md">
            <Image
              className="md:w-5 md:h-5 sm:w-4 sm:h-4 w-3 h-3"
              src={usdccoin}
              alt="USDC"
              width={100}
              height={100}
            />
            <p className="text-[11px] md:text-[13px]">49 USDC</p>
          </div>
        </div>
      </div>
      <div className="border-t h-16 p-4 flex items-center justify-between shadow-[inset_5px_2px_28px_rgba(0,0,0,0.07)] rounded-b-xl">
        <div>
          <div className="flex items-center gap-x-1">
            <svg
              width="10"
              height="11"
              viewBox="0 0 10 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.5 4.5H0.5M7 0.5V2.5M3 0.5V2.5M2.9 10.5H7.1C7.94008 10.5 8.36012 10.5 8.68099 10.3365C8.96323 10.1927 9.1927 9.96323 9.33651 9.68099C9.5 9.36012 9.5 8.94008 9.5 8.1V3.9C9.5 3.05992 9.5 2.63988 9.33651 2.31901C9.1927 2.03677 8.96323 1.8073 8.68099 1.66349C8.36012 1.5 7.94008 1.5 7.1 1.5H2.9C2.05992 1.5 1.63988 1.5 1.31901 1.66349C1.03677 1.8073 0.8073 2.03677 0.66349 2.31901C0.5 2.63988 0.5 3.05992 0.5 3.9V8.1C0.5 8.94008 0.5 9.36012 0.66349 9.68099C0.8073 9.96323 1.03677 10.1927 1.31901 10.3365C1.63988 10.5 2.05992 10.5 2.9 10.5Z"
                stroke="#B0AFA9"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-[10px] sm:text-[11px] text-[#8B8B92]">
              Order Placed
            </p>
          </div>
          <p className="text-[10px] sm:text-[11px]">01 September 2024</p>
        </div>
        <div className="flex gap-x-1 sm:gap-x-2 md:gap-x-3 items-center">
          <div className="w-20 md:w-24 md:h-10 h-8 border rounded-lg flex items-center justify-center gap-x-2">
            <p className="text-[11px] md:text-[13px]">Details</p>
          </div>
          <div className="w-fit h-8 md:h-10 px-2  rounded-lg flex items-center justify-center gap-x-2 bg-[#4E6465] text-white">
            <svg
              width="14"
              height="15"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 13.5H1M11 6.83333L7 10.8333M7 10.8333L3 6.83333M7 10.8333V1.5"
                stroke="#FEFEFD"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-[11px] md:text-[13px]">Download Product</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SalesOverview = () => {
  const walletAddress = useRecoilValue(phantomWallet);
  const [sellerPurchases, setSellerPurchases] = useState<PurchasesInterface[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const fetchPurchases = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/fetch/purchases?seller_wallet_address=${walletAddress}`
      );
      setSellerPurchases(response.data);
      setIsLoading(false);
      return response.data;
    } catch (error) {
      setIsLoading(false);
      console.log(`You got an error while fetching purchases: ${error}`);
    }
  };
  useEffect(() => {
    if (walletAddress) {
      fetchPurchases();
    }
  }, [walletAddress]);

  const exportPDF = () => {
    setIsExporting(true);
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
    });

    const imageBase = imageBase64;

    const imgWidth = 15;
    const imgHeight = 15;
    doc.addImage(imageBase, "PNG", 10, 10, imgWidth, imgHeight);

    const textX = imgWidth + 12;

    doc.setFont("helvetica");
    doc.setFontSize(18);
    doc.text("SENDIT", textX, 16);
    doc.setFontSize(18);
    doc.text("MARKETPLACE", textX, 24);

    doc.setFontSize(16);
    doc.text("Transactions Summary", 10, 45);

    doc.setFontSize(12);

    sellerPurchases.forEach((product, index) => {
      const text = `${index + 1}.   Product Name: ${product.product_title},
      Buyer Address: ${product.buyer_wallet_address},
      Amount: $${product.amount}
      Tx Hash: ${product.transaction_hash.slice(
        0,
        10
      )}...${product.transaction_hash.slice(-4)}`;
      doc.text(text, 10, imgHeight + 40 + index * 24);
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    doc.setLineWidth(0.5);
    doc.rect(5, 5, pageWidth - 10, pageHeight - 10);

    doc.save("product-list.pdf");
    setIsExporting(false);
  };

  return (
    <div className="mt-8">
      <p className="font-medium text-xl">Sales Overview</p>
      <div className="grid grid-cols-12 mt-4 gap-x-2 md:gap-x-4 lg:gap-x-8 h-10">
        <div className="col-span-2 border rounded-lg flex items-center justify-center gap-x-1 md:gap-x-2">
          <p className="text-xs md:text-[13px] lg:text-sm">Filter</p>
          <svg
            className="w-2 md:w-3"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="#8B8B92"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="col-span-8 border rounded-lg flex items-center pl-3">
          <svg
            className="mr-3"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.49935 10.0602C10.5223 9.14471 11.166 7.81421 11.166 6.33337C11.166 3.57195 8.92743 1.33337 6.16602 1.33337C3.40459 1.33337 1.16602 3.57195 1.16602 6.33337C1.16602 9.09479 3.40459 11.3334 6.16602 11.3334C7.4466 11.3334 8.61477 10.852 9.49935 10.0602ZM9.49935 10.0602L13.2725 13.8334"
              stroke="#8B8B92"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            className="h-full w-full outline-none rounded-r-lg"
            type="text"
            placeholder="Search"
          />
        </div>
        <div
          onClick={exportPDF}
          className="col-span-2 gap-x-2 text-white rounded-lg flex items-center justify-center bg-[#4E6465]"
        >
          <svg
            className="w-2 md:w-3"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 5.5L13 1.5M13 1.5H9M13 1.5L7.66667 6.83333M5.66667 2.83333H4.2C3.0799 2.83333 2.51984 2.83333 2.09202 3.05132C1.71569 3.24307 1.40973 3.54903 1.21799 3.92535C1 4.35318 1 4.91323 1 6.03333V10.3C1 11.4201 1 11.9802 1.21799 12.408C1.40973 12.7843 1.71569 13.0903 2.09202 13.282C2.51984 13.5 3.0799 13.5 4.2 13.5H8.46667C9.58677 13.5 10.1468 13.5 10.5746 13.282C10.951 13.0903 11.2569 12.7843 11.4487 12.408C11.6667 11.9802 11.6667 11.4201 11.6667 10.3V8.83333"
              stroke="#FEFEFD"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <p className="text-xs md:text-[13px] lg:text-sm">Export</p>
        </div>
      </div>
      <div className="px-2 mb-1 grid grid-cols-12 items-center mt-3 w-full h-7 rounded-lg shadow-[inset_0px_2px_10px_rgba(0,0,0,0.04)] bg-[#F7F7F7]">
        <p className="text-[11px] md:text-[13px] col-span-1">Date</p>
        <p className="text-[11px] md:text-[13px] col-span-3">Product Name</p>
        <p className="text-[11px] md:text-[13px] col-span-2">Buyer</p>
        <p className="text-[11px] md:text-[13px] col-span-1">Quantity</p>
        <p className="text-[11px] md:text-[13px] col-span-1">Price</p>
        <p className="text-[11px] md:text-[13px] col-span-1">Status</p>
        <p className="text-[11px] md:text-[13px] col-span-2">Hash</p>
        <p className="text-[11px] md:text-[13px] col-span-1">Claim</p>
      </div>
      <div className="relative overflow-y-auto hide-scrollbar scroll-smooth h-96">
        {isLoading && (
          <div className="flex justify-center mt-2">
            <Image className="w-10 lg:w-12" src={spinnerthree} alt="" />
          </div>
        )}
        {sellerPurchases &&
          sellerPurchases.map((elem, key) => {
            return (
              <SalesLabel
                key={key}
                date={elem.created_at}
                productName={elem.product_title}
                buyer={elem.buyer_wallet_address}
                quantity={12}
                price={elem.amount}
                status={elem.status}
                hash={elem.transaction_hash}
                claim="claim"
              />
            );
          })}
      </div>
    </div>
  );
};

const TransactionTopLabel = () => {
  return (
    <div className="relative border-b w-[100%] px-[20px] sm:px-[20px] md:px-[40px] lg:px-[60px] xl:px-20">
      <Image
        src={randomstatic}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-[4%]"
      />
      <div className="h-20 grid grid-cols-2">
        <div className=" h-full flex items-center">
          <p className="text-sm lg:text-lg font-medium">Transactions</p>
        </div>
        <div className=" h-full flex items-center gap-x-2">
          <div className="relative  flex items-center justify-center">
            <Image className="w-8 md:w-10 xl:w-12" src={hex} alt="" />
            <p className="text-lg font-medium text-white absolute z-20">2</p>
          </div>
          <div>
            <p className="text-sm lg:text-lg font-medium">Emerging Seller</p>
            <div className="flex gap-x-[1px] mt-[5px] mb-[1px]">
              <div className="w-28 h-[3px] bg-[#223D40]"></div>
              <div className="w-8 h-[3px] bg-[#E2E0D9]"></div>
            </div>
            <p className="text-[11px] text-[#959594]">Next:Establised Seller</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// const SalesTab = ({ sellerWalletAddress }: { sellerWalletAddress: string }) => {
//   const [sellerPurchases, setSellerPurchases] = useState<PurchasesInterface[]>(
//     []
//   );

//   const [isLoading, setIsLoading] = useState(false);
//   const [isExporting, setIsExporting] = useState(false);

//   const fetchPurchases = async () => {
//     try {
//       setIsLoading(true);
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/fetch/purchases?seller_wallet_address=${sellerWalletAddress}`
//       );
//       setSellerPurchases(response.data);
//       setIsLoading(false);
//       return response.data;
//     } catch (error) {
//       setIsLoading(false);
//       console.log(`You got an error while fetching purchases: ${error}`);
//     }
//   };
//   useEffect(() => {
//     if (sellerWalletAddress) {
//       fetchPurchases();
//     }
//   }, [sellerWalletAddress]);

//   const exportPDF = () => {
//     setIsExporting(true);
//     const doc = new jsPDF({
//       orientation: "p",
//       unit: "mm",
//       format: "a4",
//     });

//     const imageBase = imageBase64;

//     const imgWidth = 15;
//     const imgHeight = 15;
//     doc.addImage(imageBase, "PNG", 10, 10, imgWidth, imgHeight);

//     const textX = imgWidth + 12;

//     doc.setFont("helvetica");
//     doc.setFontSize(18);
//     doc.text("SENDIT", textX, 16);
//     doc.setFontSize(18);
//     doc.text("MARKETPLACE", textX, 25);

//     doc.setFontSize(16);
//     doc.text("Transactions Summary", 10, 45);

//     doc.setFontSize(12);

//     sellerPurchases.forEach((product, index) => {
//       const text = `${index + 1}.   Product Name: ${product.product_title},
//       Buyer Address: ${product.buyer_wallet_address},
//       Amount: $${product.amount}
//       Tx Hash: ${product.transaction_hash.slice(
//         0,
//         10
//       )}...${product.transaction_hash.slice(-4)}`;
//       doc.text(text, 10, imgHeight + 40 + index * 24);
//     });

//     const pageWidth = doc.internal.pageSize.getWidth();
//     const pageHeight = doc.internal.pageSize.getHeight();

//     doc.setLineWidth(0.5);
//     doc.rect(5, 5, pageWidth - 10, pageHeight - 10);

//     doc.save("product-list.pdf");
//     setIsExporting(false);
//   };

//   return (
//     <div className="relative overflow-y-auto hide-scrollbar scroll-smooth h-96">
//       {isLoading && (
//         <div className="flex justify-center mt-2">
//           <Image className="w-10 lg:w-12" src={spinnerthree} alt="" />
//         </div>
//       )}
//       {sellerPurchases &&
//         sellerPurchases.map((elem, key) => {
//           return (
//             <SalesLabel
//               key={key}
//               date={elem.created_at}
//               productName={elem.product_title}
//               buyer={elem.buyer_wallet_address}
//               quantity={12}
//               price={elem.amount}
//               status={elem.status}
//               hash={elem.transaction_hash}
//               claim="claim"
//             />
//           );
//         })}
//     </div>
//   );
// };

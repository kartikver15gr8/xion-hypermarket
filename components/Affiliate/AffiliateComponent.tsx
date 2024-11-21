"use client";

import { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { phantomWallet } from "@/store/atom/phantomWallet";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { toast } from "sonner";
import spinnerthree from "@/public/loaders/spinnerthree.svg";
import {
  AffiliateAnalytics,
  AffiliateAnalyticsTwo,
  PurchasesInterface,
} from "@/lib/models";
import ape from "@/public/ape.png";
import React from "react";
import { jsPDF } from "jspdf";
import { imageBase64 } from "@/utils/imageBase";
import { usePrivy } from "@privy-io/react-auth";
import Link from "next/link";

export default function AffiliateComponent() {
  return (
    <div>
      <TopBar />
      <div className="flex items-center gap-x-5 mt-10">
        <p className="text-xl sm:text-2xl md:text-3xl font-medium">
          Affiliate Sales & Commission
        </p>
      </div>
      <MidSection />
      <SalesOverview />
    </div>
  );
}

const TopBar = () => {
  return (
    <div className="flex items-center gap-x-3 mt-5 border-b pb-1 border-[##E8E7E5]">
      <a href="/">
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
      </a>

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

      <p>Affiliate Sales</p>
    </div>
  );
};

const activeTab =
  "border-b-2 flex items-center w-28 md:w-32 h-8 justify-center border-[#114026] text-[14px] md:text-[16px] z-50";
const inActiveTab =
  "border-b-2 flex h-8 items-center w-28 md:w-32 justify-center text-[14px] md:text-[16px] z-50";

const SalesOverview = () => {
  const walletAddress = useRecoilValue(phantomWallet);
  const [salesData, setSalesData] = useState<PurchasesInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isExporting, setIsExporting] = useState(false);

  const [searchKeyTx, setSearchKeyTx] = useState("");

  const filteredSalesData = salesData.filter((sales) =>
    sales.product_title.toLowerCase().includes(searchKeyTx.toLowerCase())
  );

  const [selected, setSelected] = useState<"mylinks" | "productstosell">(
    "mylinks"
  );

  const selectProductsToSell = () => {
    setSelected("productstosell");
    toast.info("Switched to Products to Sell section");
  };
  const selectMyLinks = () => {
    setSelected("mylinks");
    toast.info("Switched to My Links section");
  };

  useEffect(() => {
    if (!walletAddress) {
      toast.error("Please connect your wallet first");
      return;
    } else {
      getSales();
    }
  }, [walletAddress]);

  const imageBase = imageBase64;

  const exportPDF = () => {
    setIsExporting(true);
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
    });

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
    doc.text("Affiliate Sales & Commission", 10, 45);

    doc.setFontSize(12);

    salesData.forEach((product, index) => {
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

  const getSales = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/fetch/purchases?seller_wallet_address=${walletAddress}`
      );
      setSalesData(response.data);
      //   console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <div className="flex items-center">
        <div
          onClick={selectMyLinks}
          className={selected == "mylinks" ? activeTab : inActiveTab}
        >
          <p>My Links</p>
        </div>
        <div
          onClick={selectProductsToSell}
          className={selected == "productstosell" ? activeTab : inActiveTab}
        >
          <p>Products to Sell</p>
        </div>
      </div>
      <p className="font-medium text-lg md:text-xl mt-8">
        Choose Products to Promote and Earn
      </p>
      {/* <p className="font-medium text-xl">Sales Overview</p> */}
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
        <div className="col-span-8 border rounded-lg flex items-center pl-3 z-50">
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
            value={searchKeyTx}
            onChange={(e) => setSearchKeyTx(e.target.value)}
          />
        </div>
        <div
          onClick={exportPDF}
          className="col-span-2 gap-x-2 text-white rounded-lg flex items-center justify-center bg-[#4E6465]  z-50"
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

          <p className="text-xs md:text-[13px] lg:text-sm">
            {isExporting ? "Exporting…" : "Export"}
          </p>
        </div>
      </div>
      {selected == "productstosell" ? (
        <>
          {/* <div className="px-2 mb-1 grid grid-cols-12 items-center mt-5 w-full h-7 rounded-lg shadow-[inset_0px_2px_10px_rgba(0,0,0,0.04)] bg-[#F7F7F7]">
            <p className="text-[11px] md:text-[13px] col-span-1">Date</p>
            <p className="text-[11px] md:text-[13px] col-span-3">
              Product Name
            </p>
            <p className="text-[11px] md:text-[13px] col-span-2">Buyer</p>
            <p className="text-[11px] md:text-[13px] col-span-1">Quantity</p>
            <p className="text-[11px] md:text-[13px] col-span-1">Price</p>
            <p className="text-[11px] md:text-[13px] col-span-1">Status</p>
            <p className="text-[11px] md:text-[13px] col-span-2">Hash</p>
            <p className="text-[11px] md:text-[13px] col-span-1">Claim</p>
          </div> */}
          <div className="px-2 mb-1 grid grid-cols-12 items-center mt-5 w-full h-7 rounded-lg shadow-[inset_0px_2px_10px_rgba(0,0,0,0.04)] bg-[#F7F7F7]">
            <p className="text-[9px] sm:text-[11px] md:text-[13px] col-span-4">
              PRODUCT
            </p>
            <p className="text-[9px] sm:text-[11px] md:text-[13px] col-span-1">
              RATINGS
            </p>
            <p className="text-[9px] sm:text-[11px] md:text-[13px] col-span-2">
              PRICE
            </p>
            <p className="text-[9px] sm:text-[11px] md:text-[13px] col-span-3">
              COMMISSION
            </p>
            <p className="text-[9px] sm:text-[11px] md:text-[13px] col-span-1">
              LINKS
            </p>
            <p className="text-[9px] sm:text-[11px] md:text-[13px] col-span-1">
              BLINKS
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center mt-2">
              <Image className="w-10 lg:w-12" src={spinnerthree} alt="" />
            </div>
          ) : (
            <div className="relative overflow-y-auto hide-scrollbar scroll-smooth h-96">
              {filteredSalesData.map((item: PurchasesInterface, key) => {
                return (
                  <SalesLabel
                    key={key}
                    productId={item.product_id}
                    productImg={item.product_thumbnail_url}
                    productName={item.product_title}
                    price={item.amount.toFixed(2)}
                    // fileDetails={item.product_filename}
                    purchaseDate={item.created_at}
                    fileSize={item.product_file_size}
                    fileType={item.product_file_type}
                    checkSum={item.product_file_checksum}
                    transactionHash={item.transaction_hash}
                    sellerDetails={item.seller_wallet_address}
                    productFile={item.product_filename}
                    ratings={4}
                    commission={"10% fixed"}
                    links="https://sendit.markets"
                    blinks="https://sendit.markets"
                    productDescription="Product description"
                  />
                );
              })}
            </div>
          )}
        </>
      ) : (
        <div className="mt-5">
          <p className=" text-lg font-medium">Your Referral Links</p>
          <p className="text-sm text-[#8B8B93]">
            Share these links to earn commissions on every sale.
          </p>
          <div className="">
            <div className="border-b grid grid-cols-2 items-center h-20 sm:h-24 md:h-28 w-[100%] md:w-[90%] lg:w-[70%]">
              <p className="font-medium">Referral Link</p>
              <div className="flex gap-x-2">
                <div className="border border-[#C9C9CB] bg-[#F7F7F7] rounded-md flex items-center px-2 w-[300px] h-8">
                  <p>sendit</p>
                </div>
                <button className="border border-[#C9C9CB] rounded-md flex items-center gap-x-1 h-8 px-2 w-[80px] justify-center">
                  <svg
                    className="w-3"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.75333 12.7728L7.69267 13.8335C6.2282 15.2979 3.85383 15.2979 2.38937 13.8335C0.924899 12.369 0.924899 9.99465 2.38937 8.53018L3.45003 7.46952M12.996 8.53018L14.0566 7.46952C15.5211 6.00506 15.5211 3.63069 14.0566 2.16622C12.5922 0.701754 10.2178 0.701755 8.75333 2.16622L7.69267 3.22688M5.598 10.6248L10.848 5.37484"
                      stroke="#4B4B54"
                      strokeWidth="1.35"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-sm">Copy</p>
                </button>
              </div>
            </div>
            <div className="border-b grid grid-cols-2 items-center h-20 sm:h-24 md:h-28 w-[100%] md:w-[90%] lg:w-[70%]">
              <p className="font-medium">Referral Code</p>
              <div className="flex gap-x-2">
                <div className="border border-[#C9C9CB] bg-[#F7F7F7] rounded-md flex items-center px-2 w-[300px] h-8">
                  <p>REF-DEDGB546</p>
                </div>
                <button className="border border-[#C9C9CB] rounded-md flex items-center gap-x-1 h-8 px-2 w-[80px] justify-center">
                  <svg
                    className="w-3"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.75333 12.7728L7.69267 13.8335C6.2282 15.2979 3.85383 15.2979 2.38937 13.8335C0.924899 12.369 0.924899 9.99465 2.38937 8.53018L3.45003 7.46952M12.996 8.53018L14.0566 7.46952C15.5211 6.00506 15.5211 3.63069 14.0566 2.16622C12.5922 0.701754 10.2178 0.701755 8.75333 2.16622L7.69267 3.22688M5.598 10.6248L10.848 5.37484"
                      stroke="#4B4B54"
                      strokeWidth="1.35"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-sm">Copy</p>
                </button>
              </div>
            </div>
            <div className="border-b grid grid-cols-2 items-center h-20 sm:h-24 md:h-28 w-[100%] md:w-[90%] lg:w-[70%]">
              <p className="font-medium">Solana Blink Referral</p>
              <div className="flex gap-x-2">
                <div className="border border-[#C9C9CB] bg-[#F7F7F7] rounded-md flex items-center px-2 w-[300px] h-8">
                  <p>Generate Blinks</p>
                </div>
                <button className="border border-[#C9C9CB] rounded-md flex items-center gap-x-1 h-8 px-2 w-[80px] justify-center">
                  <svg
                    className="w-3"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.75333 12.7728L7.69267 13.8335C6.2282 15.2979 3.85383 15.2979 2.38937 13.8335C0.924899 12.369 0.924899 9.99465 2.38937 8.53018L3.45003 7.46952M12.996 8.53018L14.0566 7.46952C15.5211 6.00506 15.5211 3.63069 14.0566 2.16622C12.5922 0.701754 10.2178 0.701755 8.75333 2.16622L7.69267 3.22688M5.598 10.6248L10.848 5.37484"
                      stroke="#4B4B54"
                      strokeWidth="1.35"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-sm">Copy</p>
                </button>
              </div>
            </div>
            <div className=" grid grid-cols-2 items-center h-20 sm:h-24 md:h-28 w-[100%] md:w-[90%] lg:w-[70%]">
              <p className="font-medium">Invitations</p>
              <div className="flex gap-x-2">
                <div className="border border-[#C9C9CB] bg-[#F7F7F7] rounded-md flex items-center px-2 w-[300px] h-8">
                  <p>Email</p>
                </div>
                <button className="border border-[#C9C9CB] rounded-md flex items-center gap-x-1 h-8 px-2 w-[80px] justify-center">
                  <svg
                    className="w-3"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.09968 8.00009H2.97469M2.91119 8.21871L1.16 13.4497C1.02243 13.8607 0.95364 14.0662 1.00301 14.1927C1.04588 14.3026 1.13795 14.3859 1.25156 14.4176C1.38239 14.4541 1.57999 14.3652 1.97519 14.1874L14.5088 8.54724C14.8945 8.37366 15.0874 8.28686 15.147 8.16629C15.1988 8.06154 15.1988 7.93863 15.147 7.83388C15.0874 7.71331 14.8945 7.62652 14.5088 7.45294L1.97082 1.81088C1.57681 1.63358 1.3798 1.54493 1.24911 1.58129C1.1356 1.61287 1.04354 1.69596 1.00052 1.80565C0.950988 1.93194 1.01904 2.13697 1.15515 2.54704L2.91168 7.83923C2.93506 7.90966 2.94675 7.94488 2.95136 7.98089C2.95545 8.01285 2.95541 8.04521 2.95124 8.07715C2.94653 8.11316 2.93475 8.14834 2.91119 8.21871Z"
                      stroke="#52525C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <p className="text-sm">Send</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// const SalesLabel = ({
//   date,
//   productName,
//   buyer,
//   quantity,
//   price,
//   status,
//   hash,
//   claim,
//   productId,
// }: {
//   date: string;
//   productName: string;
//   buyer: string;
//   quantity: number;
//   price: string;
//   status: string;
//   hash: string;
//   claim: string;
//   productId?: number;
// }) => {
//   const purchaseDate = new Date(date);

//   const options: Intl.DateTimeFormatOptions = {
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//   };

//   const formattedDate = purchaseDate.toLocaleString("en-US", options);

//   const handleCopy = () => {
//     if (hash) {
//       navigator.clipboard
//         .writeText(hash)
//         .then(() => {
//           toast.info("Copied Transaction Hash!");
//         })
//         .catch((err) => {
//           console.error("Failed to copy: ", err);
//           toast.info("Failed to copy Tnx Hash!");
//         });
//     }
//   };

//   return (
//     <div className="border-b px-2 grid grid-cols-12 items-center w-full h-10">
//       <p className="text-[9px] md:text-[13px] col-span-1">{formattedDate}</p>
//       <p className="text-[9px] md:text-[13px] col-span-3">
//         <a href={`/product/${productId}`} target="_blank">
//           {productName}
//         </a>
//       </p>
//       <p className="text-[9px] md:text-[13px] col-span-2">
//         {buyer ? `${buyer.slice(0, 3)}...${buyer.slice(-4)}` : ""}
//       </p>
//       <p className="text-[9px] md:text-[13px] col-span-1">{quantity}</p>
//       <p className="text-[9px] md:text-[13px] col-span-1">{price}</p>
//       <div className="text-[9px] md:text-[13px] flex items-center col-span-1">
//         {status == "confirmed" ? (
//           <div className="flex text-[9px] md:text-[13px] items-center bg-opacity-45 border border-green-600 rounded-md h-6 px-1 bg-green-400 ">
//             <p>{status}</p>
//           </div>
//         ) : (
//           <div className="flex text-[9px] md:text-[13px] items-center bg-opacity-45 border border-red-600 rounded-md h-6 px-1 bg-red-400 ">
//             <p>{status ? "pending" : "NA"}</p>
//           </div>
//         )}
//       </div>
//       <div
//         onClick={handleCopy}
//         className="text-[9px] md:text-[13px] col-span-2 flex items-center"
//       >
//         <p className="w-10 sm:w-12 md:w-16">
//           {hash ? `${hash.slice(0, 3)}…${hash.slice(-3)}` : ""}
//         </p>
//         <svg
//           className="w-3 ml-1"
//           viewBox="0 0 14 14"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M4.66797 4.6665V3.03317C4.66797 2.37978 4.66797 2.05308 4.79513 1.80352C4.90698 1.58399 5.08546 1.40552 5.30498 1.29366C5.55454 1.1665 5.88124 1.1665 6.53464 1.1665H10.968C11.6214 1.1665 11.9481 1.1665 12.1976 1.29366C12.4171 1.40552 12.5956 1.58399 12.7075 1.80352C12.8346 2.05308 12.8346 2.37978 12.8346 3.03317V7.4665C12.8346 8.1199 12.8346 8.4466 12.7075 8.69616C12.5956 8.91568 12.4171 9.09416 12.1976 9.20601C11.9481 9.33317 11.6214 9.33317 10.968 9.33317H9.33464M3.03464 12.8332H7.46797C8.12136 12.8332 8.44806 12.8332 8.69762 12.706C8.91715 12.5942 9.09562 12.4157 9.20748 12.1962C9.33464 11.9466 9.33464 11.6199 9.33464 10.9665V6.53317C9.33464 5.87978 9.33464 5.55308 9.20748 5.30352C9.09562 5.08399 8.91715 4.90552 8.69762 4.79366C8.44806 4.6665 8.12136 4.6665 7.46797 4.6665H3.03464C2.38124 4.6665 2.05454 4.6665 1.80498 4.79366C1.58546 4.90552 1.40698 5.08399 1.29513 5.30352C1.16797 5.55308 1.16797 5.87978 1.16797 6.53317V10.9665C1.16797 11.6199 1.16797 11.9466 1.29513 12.1962C1.40698 12.4157 1.58546 12.5942 1.80498 12.706C2.05454 12.8332 2.38124 12.8332 3.03464 12.8332Z"
//             stroke="#8B8B92"
//             strokeWidth="1.1375"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </svg>
//       </div>
//       <button className="text-[9px] md:text-[13px] rounded-md h-6 bg-black text-white col-span-1 hover:bg-[#5a5c5d] transition-all duration-300">
//         {claim}
//       </button>
//     </div>
//   );
// };

const SalesLabel = ({
  productId,
  productImg,
  productName,
  productDescription,
  price,
  purchaseDate,
  sellerDetails,
  fileSize,
  fileType,
  checkSum,
  transactionHash,
  productFile,
  ratings,
  commission,
  links,
  blinks,
}: {
  productId?: number;
  productImg: string | StaticImageData;
  productName: string;
  productDescription: string;
  price: string;
  purchaseDate: string;
  sellerDetails: string;
  fileSize: string;
  fileType: string;
  checkSum: string;
  transactionHash: string;
  productFile: string;
  ratings: number | string;
  commission: number | string;
  links: string;
  blinks: string;
}) => {
  const dateStr = purchaseDate;
  const date = new Date(dateStr);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const formattedDate = date.toLocaleString("en-US", options);

  const handleCopy = () => {
    if (transactionHash) {
      navigator.clipboard
        .writeText(transactionHash)
        .then(() => {
          toast.info("Copied Transaction Hash!");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
          toast.info("Failed to copy Tnx Hash!");
        });
    }
  };

  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    const url = `https://files.sendit.markets/products/${productFile}`;

    try {
      setIsDownloading(true);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Create a blob from the response
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = productFile; // Set the file name for download
      document.body.appendChild(link); // Append to body
      link.click(); // Trigger the download
      document.body.removeChild(link); // Clean up
      setIsDownloading(false);
    } catch (error) {
      setIsDownloading(false);
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="border-b px-2 grid grid-cols-12 items-center w-full h-16">
      <Link
        href={`/product/${productId}`}
        className="col-span-4 flex items-center gap-x-2"
      >
        <Image
          src={productImg}
          alt="product"
          className=" w-8 h-8 rounded-md"
          width={20}
          height={20}
        />

        {productName.length > 20 ? (
          <div>
            <p className="text-[11px] md:text-[15px]">
              {productName.slice(0, 20)}...
            </p>
            <p className="text-[9px] md:text-[13px] text-[#898991]">
              {productDescription.slice(0, 20)}...
            </p>
          </div>
        ) : (
          <div>
            <p className="text-[11px] md:text-[15px]">{productName}</p>
            <p className="text-[9px] md:text-[13px] text-[#898991]">
              {productDescription}
            </p>
          </div>
        )}
      </Link>
      <p className="text-[9px] md:text-[13px] col-span-1">{`${ratings} Stars`}</p>
      <p className="text-[9px] md:text-[13px] col-span-2">{`${price} SOL`}</p>
      <p className="text-[9px] md:text-[13px] col-span-3">{`${commission}`}</p>

      <button className="col-span-1 border border-[#52525C] w-7 h-7 rounded-md flex items-center justify-center bg-white hover:bg-[#E4E4E5] transition-all duration-200">
        <svg
          width="12"
          height="13"
          viewBox="0 0 12 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.41242 10.3778L5.58746 11.2027C4.44843 12.3418 2.6017 12.3418 1.46267 11.2027C0.323641 10.0637 0.323641 8.21698 1.46267 7.07795L2.28763 6.25299M9.71225 7.07795L10.5372 6.25299C11.6762 5.11396 11.6762 3.26723 10.5372 2.1282C9.39818 0.989168 7.55145 0.989169 6.41242 2.1282L5.58746 2.95316M3.95827 8.70712L8.04161 4.62379"
            stroke="#52525C"
            strokeWidth="1.05"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* <button className="col-span-1 w-10 md:w-16 rounded-md flex items-center px-2 h-8 gap-x-1 bg-gradient-to-r from-[#8E50F3] via-[#6586D7] to-[#4AC9B7]">
        <svg
          className="w-3 md:w-3"
          viewBox="0 0 12 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.41242 10.3778L5.58746 11.2027C4.44843 12.3418 2.6017 12.3418 1.46267 11.2027C0.323641 10.0637 0.323641 8.21698 1.46267 7.07795L2.28763 6.25299M9.71225 7.07795L10.5372 6.25299C11.6762 5.11396 11.6762 3.26723 10.5372 2.1282C9.39818 0.989168 7.55145 0.989169 6.41242 2.1282L5.58746 2.95316M3.95827 8.70712L8.04161 4.62379"
            stroke="white"
            strokeWidth="1.05"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="hidden sm:flex sm:relative font-medium text-white text-[10px] sm:text-[12px] lg:text-[14px]">
          copy
        </p>
      </button> */}
      <button className="border border-[#52525C] w-7 h-7 rounded-md flex items-center justify-center bg-white hover:bg-[#E4E4E5] transition-all duration-200">
        <svg
          width="12"
          height="13"
          viewBox="0 0 12 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.41242 10.3778L5.58746 11.2027C4.44843 12.3418 2.6017 12.3418 1.46267 11.2027C0.323641 10.0637 0.323641 8.21698 1.46267 7.07795L2.28763 6.25299M9.71225 7.07795L10.5372 6.25299C11.6762 5.11396 11.6762 3.26723 10.5372 2.1282C9.39818 0.989168 7.55145 0.989169 6.41242 2.1282L5.58746 2.95316M3.95827 8.70712L8.04161 4.62379"
            stroke="#52525C"
            strokeWidth="1.05"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

const MidSection = () => {
  const [affiliateAnalytics, setAffiliateAnalytics] =
    useState<AffiliateAnalyticsTwo>();
  const affiliateWalletAddress = useRecoilValue(phantomWallet);
  const { user, getAccessToken } = usePrivy();
  const [privyAccessToken, setPrivyAccessToken] = useState("");

  const fetchAccessToken = async () => {
    try {
      const token = await getAccessToken();
      if (token) {
        setPrivyAccessToken(token);
      }
    } catch (error) {
      toast.info(`Error`);
    }
  };

  const fetchAffiliateAnalytics = async () => {
    if (!user?.id) {
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SWAGGER_API_V2}/admin/analytics/affiliate?affiliate_external_id=${user.id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${privyAccessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setAffiliateAnalytics(response.data[0]);
      // console.log(response.data[0]);

      return response.data;
    } catch (error) {
      console.log(
        `You got an error while fetching affiliate analytics: ${error}`
      );
    }
  };

  useEffect(() => {
    fetchAccessToken();
    if (affiliateWalletAddress) {
      fetchAffiliateAnalytics();
    }
  }, [affiliateWalletAddress]);

  return (
    <div className="border rounded-2xl grid grid-cols-3 bg-white mt-4 shadow-lg">
      <div className="p-2 sm:p-3 md:p-4">
        <div className=" flex items-center gap-x-1">
          <p className="text-xs md:text-[13px]">TOTAL EARNED</p>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.545 4.5C4.66255 4.16583 4.89458 3.88405 5.19998 3.70457C5.50538 3.52508 5.86445 3.45947 6.21359 3.51936C6.56273 3.57924 6.87941 3.76076 7.10754 4.03176C7.33567 4.30277 7.46053 4.64576 7.46 5C7.46 6 5.96 6.5 5.96 6.5M6 8.5H6.005M11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6Z"
              stroke="#8B8B92"
              strokeWidth="1.125"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl my-3">
          {affiliateAnalytics ? `$${affiliateAnalytics.SaleAmount}` : "$0"}
        </p>
        <div className="flex gap-x-1 text-[11px] sm:text-[12px] md:text-[14px]">
          <div className="flex items-center text-green-500">
            <svg
              className="w-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="green"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M12 20V4m0 0l6 6m-6-6l-6 6"
              />
            </svg>
            <p>15%</p>
          </div>
          <p className="text-[#A6ACB7]">over past month</p>
        </div>
      </div>
      <div className="border-r border-l p-2 sm:p-3 md:p-4">
        <div className=" flex items-center gap-x-1">
          <p className="text-xs md:text-[13px]">TODAY USERS REFERRED</p>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.545 4.5C4.66255 4.16583 4.89458 3.88405 5.19998 3.70457C5.50538 3.52508 5.86445 3.45947 6.21359 3.51936C6.56273 3.57924 6.87941 3.76076 7.10754 4.03176C7.33567 4.30277 7.46053 4.64576 7.46 5C7.46 6 5.96 6.5 5.96 6.5M6 8.5H6.005M11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6Z"
              stroke="#8B8B92"
              strokeWidth="1.125"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl my-1 md:my-3">
          0
        </p>

        <div className="text-[11px] sm:text-[12px] md:text-[14px]">
          <p className="text-[#A6ACB7]">Rank 1</p>
          <div className="mt-1 flex items-center gap-x-1">
            <Image
              className=" w-4 md:w-5 border rounded-full border-black"
              src={ape}
              alt=""
              width={100}
              height={100}
            />
            <p>Alex</p>
          </div>
        </div>
      </div>
      <div className=" p-2 sm:p-3 md:p-4">
        <div className=" flex items-center gap-x-1">
          <p className="text-xs md:text-[13px]">PRODUCTS SOLD</p>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.545 4.5C4.66255 4.16583 4.89458 3.88405 5.19998 3.70457C5.50538 3.52508 5.86445 3.45947 6.21359 3.51936C6.56273 3.57924 6.87941 3.76076 7.10754 4.03176C7.33567 4.30277 7.46053 4.64576 7.46 5C7.46 6 5.96 6.5 5.96 6.5M6 8.5H6.005M11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6Z"
              stroke="#8B8B92"
              strokeWidth="1.125"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl my-3">
          {affiliateAnalytics ? affiliateAnalytics.SaleCount : "0"}
        </p>
        <div className="mt-2 md:mt-8 text-[10px] md:text-[12px]">
          <p className="text-[#A6ACB7]">Top Product</p>
          <p className="text-black font-medium text-[10px] sm:text-[11px] md:text-[14px]">
            How to Design Better UI
          </p>
        </div>
      </div>
    </div>
  );
};

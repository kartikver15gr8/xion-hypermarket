"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CategoryInterface } from "@/lib/models";
import UploadForm from "@/components/UploadForm";
import { Widget } from "@uploadcare/react-widget";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { phantomWallet } from "@/store/atom/phantomWallet";
import MarkdownEditor from "@/components/MarkdownEditor";
import { usePrivy } from "@privy-io/react-auth";
import { userIdState } from "@/store/atom/userIdState";
import Link from "next/link";

const uploadcarekey = process.env.NEXT_PUBLIC_UPLOADCARE_KEY || "";
export default function ProductUpload() {
  const { user, authenticated, getAccessToken } = usePrivy();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [comparePrice, setComparePrice] = useState("");
  const [file, setFile] = useState(null);
  const [newDescription, setNewDescription] = useState("");
  const user_id = useRecoilValue(userIdState);
  const [subscriptionMode, setSubscriptionMode] = useState("");

  const setSubscriptionPlan = (event: any) => {
    setSubscriptionMode(event.target.value);
  };

  const handleMarkdownChange = (value?: string) => {
    if (value) {
      setNewDescription(value);
    }
  };

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleFileUpload = (fileInfo: any) => {
    if (fileInfo) {
      const url = fileInfo.cdnUrl;
      setImageUrl(url);
    } else {
      console.log("No files");
    }
  };

  const [toggleWhatIncluded, setToggleWhatIncluded] = useState(false);

  const handleToggleWhatIncluded = () => {
    setToggleWhatIncluded((prevState) => !prevState);
  };

  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled((prevState) => !prevState);
  };

  const [togglePayment, setTogglePayment] = useState<
    "onetime" | "subscription"
  >("onetime");
  const togglePaymentOptions = () => {
    setTogglePayment(togglePayment == "onetime" ? "subscription" : "onetime");
  };

  // for Tags
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [categoryName, setCategoryName] = useState<string | undefined>("");
  const [categoryId, setCategoryId] = useState<string | number | undefined>();
  const userWalletAddress = useRecoilValue(phantomWallet);
  const [userId, setUserId] = useState(0);
  const [privyAccessToken, setPrivyAccessToken] = useState("");

  // const fetchUserId = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/fetch/user/${userWalletAddress}`
  //     );
  //     // console.log(response.data);

  //     setUserId(response.data.id);
  //     // console.log(response.data.id);
  //   } catch (error) {
  //     console.log(`You got error while fetching UserId: ${error}`);
  //   }
  // };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SWAGGER_API_V2}/categories`
      );
      setCategories(response.data);
    } catch (error) {
      console.log(`You got an error: ${error}`);
    }
  };

  useEffect(() => {
    // fetchUserId();
    fetchCategories();
  }, []);

  const handleChange = (event: any) => {
    const selectedCategoryId = event.target.value;
    if (categories) {
      const selectedCategory = categories.find(
        (category) => category.ID === selectedCategoryId
      );
      // @ts-ignore
      setSelectedCategory(selectedCategory);

      setCategoryId(selectedCategory?.ID);
      setCategoryName(selectedCategory?.Name);
    }
  };

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getAccessToken();
        if (token) {
          setPrivyAccessToken(token);
        }
      } catch (error) {
        console.log("You got an error while executing fetchToken()");
      }
    };
    fetchToken();
  }, []);

  const formSubmit = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SWAGGER_API_V2}/admin/upload`,
        {
          file: file,
          name: title,
          description: newDescription,
          price: price,
          compare_price: comparePrice,
          thumbnail_url: imageUrl,
          user_id: user_id,
          category_id: categoryId,
          status: 1,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${privyAccessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response.data);
      router.push("/seller/products/add/category/success");
      return response.data;
    } catch (error) {
      console.log(`You got an error: ${error}`);
    }

    console.log(selectedCategory);
  };

  return (
    <div className="pt-16 pb-20 px-[15px] sm:px-[20px] md:px-[40px] min-h-screen lg:px-[60px] xl:px-20 bg-[#FAF9F5] w-full relative overflow-y-auto hide-scrollbar h-[90vh] scroll-smooth ">
      <div className="mt-5  flex justify-between items-center">
        <div className=" w-fit">
          <div className="flex gap-x-2 items-center ">
            <p className="font-bold text-3xl italic">ADD PRODUCT</p>
          </div>
          <p>List your product on Sendit here.</p>
        </div>
        <a
          href={`/product/preview?title=${title}&price=${price}&imgurl=${imageUrl}&compareprice=${comparePrice}&category=${categoryName}`}
          target="_blank"
          className="flex justify-center shadow-md items-center gap-x-1 w-24 bg-white rounded-md border h-10"
        >
          <svg
            width="18"
            height="14"
            viewBox="0 0 18 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.01677 7.59427C0.90328 7.41457 0.846535 7.32472 0.81477 7.18614C0.79091 7.08204 0.79091 6.91788 0.81477 6.81378C0.846535 6.67519 0.90328 6.58534 1.01677 6.40564C1.95461 4.92066 4.74617 1.16663 9.00034 1.16663C13.2545 1.16663 16.0461 4.92066 16.9839 6.40564C17.0974 6.58534 17.1541 6.67519 17.1859 6.81378C17.2098 6.91788 17.2098 7.08204 17.1859 7.18614C17.1541 7.32472 17.0974 7.41457 16.9839 7.59427C16.0461 9.07926 13.2545 12.8333 9.00034 12.8333C4.74617 12.8333 1.95461 9.07926 1.01677 7.59427Z"
              stroke="#050505"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.00034 9.49996C10.381 9.49996 11.5003 8.38067 11.5003 6.99996C11.5003 5.61925 10.381 4.49996 9.00034 4.49996C7.61962 4.49996 6.50034 5.61925 6.50034 6.99996C6.50034 8.38067 7.61962 9.49996 9.00034 9.49996Z"
              stroke="#050505"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <p>Preview</p>
        </a>
      </div>
      {/* <ProductDescription /> */}
      <div className="border mt-6 h-96 rounded-xl p-4 bg-white">
        <p className="font-medium text-lg">Describe your product</p>
        <div className="grid grid-cols-1 gap-x-5 mt-4">
          <div className="">
            <p className="text-xs mb-2">Title</p>
            <input
              type="text"
              className="border w-full h-12 p-2 flex items-center rounded outline-none"
              placeholder="Enter title"
              onChange={(e: any) => {
                setTitle(e.target.value);
              }}
            />
          </div>
        </div>
        <p className="mt-3 text-xs mb-2">Description</p>

        <MarkdownEditor
          initialValue=""
          onChange={handleMarkdownChange}
          minHeight={300}
        />
      </div>

      <div className="mt-5 p-4 flex flex-col bg-white rounded-xl border">
        {categories && (
          <select
            className=" outline-none"
            id="category-select"
            //@ts-ignore
            value={selectedCategory?.ID || ""}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.ID} value={category.ID}>
                {category.Name}
              </option>
            ))}
          </select>
        )}
      </div>
      {/* <Pricing /> */}
      <div className="mt-4 p-4 rounded-xl border bg-white">
        <div className="flex items-center justify-between">
          <p className="text-lg mb-4">Pricing</p>
          <button
            onClick={togglePaymentOptions}
            className={`flex items-center justify-between w-16 h-8 rounded-full p-1 transition-colors duration-300 
                ${togglePayment == "onetime" ? "bg-blue-500" : "bg-gray-300"}`}
          >
            <span
              className={`w-6 h-6 rounded-full bg-white transition-transform duration-300 
                ${togglePayment == "onetime" ? "transform translate-x-8" : ""}`}
            ></span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-x-6">
          <div>
            <p className="text-xs mb-1">Fixed Price</p>
            <div className="border rounded flex justify-between h-12">
              <input
                className="flex p-2 items-center rounded-l  outline-none"
                type="text"
                placeholder="Enter buy now price"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
              <div className="flex items-center justify-center bg-slate-300 rounded-r w-12 h-12">
                <p>$</p>
              </div>
            </div>
          </div>
          {/* <div>
            <p className="text-xs mb-1">Compare Price</p>
            <div className="border rounded flex justify-between h-12">
              <input
                className="flex p-2 items-center rounded-l  outline-none"
                type="text"
                placeholder="Enter Limit"
                onChange={(e) => {
                  setComparePrice(e.target.value);
                }}
              />
              <div className="flex items-center justify-center bg-slate-300 rounded-r w-12 h-12">
                <svg
                  width="8"
                  height="12"
                  viewBox="0 0 8 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.667969 7.99984L4.0013 11.3332L7.33464 7.99984M0.667969 3.99984L4.0013 0.666504L7.33464 3.99984"
                    stroke="black"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div> */}
        </div>
        <div className="border rounded-xl px-4 py-5 mt-5 bg-white">
          <div className="flex items-center gap-x-2 justify-between">
            <p>Subscription</p>
            <button
              onClick={handleToggle}
              className={`flex items-center justify-between w-16 h-8 rounded-full p-1 transition-colors duration-300 
                ${isToggled ? "bg-blue-500" : "bg-gray-300"}`}
            >
              <span
                className={`w-6 h-6 rounded-full bg-white transition-transform duration-300 
                ${isToggled ? "transform translate-x-8" : ""}`}
              ></span>
            </button>
          </div>
          {isToggled ? (
            <>
              <p className="text-xs text-[#5D5D67] mt-5">
                Subscription Duration and Pricing
              </p>
              <div className="grid grid-cols-1 gap-y-2 lg:gap-y-0 lg:grid-cols-3 gap-x-3 mt-4">
                <div>
                  <div className="flex items-center gap-x-1 mb-1">
                    <input
                      type="radio"
                      id="week"
                      name="subscription"
                      value="1 Week Access"
                      checked={subscriptionMode === "1 Week Access"}
                      onChange={setSubscriptionPlan}
                    />
                    <p className="text-sm">1 Week Access</p>
                  </div>
                  <div className="border border-[#E4E4E5] flex justify-between h-12 rounded-md">
                    <input
                      className="w-full rounded-l-md px-2 outline-none"
                      type="string"
                      placeholder="Enter the price for 1-year access"
                    />
                    <button className="bg-[#E4E4E5] w-12 rounded-r-sm flex items-center justify-center">
                      <svg
                        width="8"
                        height="14"
                        viewBox="0 0 8 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.06 12.195C3.31 12.195 2.65 12.09 2.08 11.88C1.52 11.67 1.065 11.365 0.715 10.965C0.375 10.555 0.155 10.065 0.055 9.495H1.39C1.45 9.835 1.58 10.125 1.78 10.365C1.99 10.605 2.285 10.79 2.665 10.92C3.055 11.05 3.55 11.125 4.15 11.145C4.53 11.145 4.88 11.1 5.2 11.01C5.52 10.92 5.8 10.795 6.04 10.635C6.28 10.475 6.465 10.285 6.595 10.065C6.735 9.835 6.805 9.585 6.805 9.315C6.805 9.015 6.72 8.76 6.55 8.55C6.39 8.33 6.185 8.15 5.935 8.01C5.695 7.87 5.45 7.76 5.2 7.68C4.95 7.59 4.745 7.525 4.585 7.485L3.76 7.275C3.39 7.175 3.005 7.065 2.605 6.945C2.205 6.815 1.835 6.65 1.495 6.45C1.155 6.25 0.88 5.99 0.67 5.67C0.46 5.34 0.355 4.93 0.355 4.44C0.355 3.83 0.515 3.32 0.835 2.91C1.165 2.49 1.61 2.175 2.17 1.965C2.74 1.745 3.385 1.635 4.105 1.635C4.795 1.635 5.375 1.74 5.845 1.95C6.315 2.16 6.685 2.445 6.955 2.805C7.235 3.155 7.42 3.55 7.51 3.99H6.31C6.23 3.52 5.985 3.18 5.575 2.97C5.165 2.75 4.68 2.64 4.12 2.64C3.62 2.64 3.175 2.7 2.785 2.82C2.395 2.93 2.085 3.1 1.855 3.33C1.635 3.56 1.525 3.86 1.525 4.23C1.525 4.62 1.635 4.94 1.855 5.19C2.075 5.43 2.355 5.625 2.695 5.775C3.035 5.915 3.39 6.035 3.76 6.135L4.585 6.33C5.055 6.44 5.495 6.575 5.905 6.735C6.315 6.885 6.675 7.07 6.985 7.29C7.295 7.51 7.535 7.775 7.705 8.085C7.885 8.395 7.975 8.76 7.975 9.18C7.975 10.14 7.625 10.885 6.925 11.415C6.235 11.935 5.28 12.195 4.06 12.195ZM3.655 13.05V0.749999H4.735V13.05H3.655Z"
                          fill="#52525C"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-x-1 mb-1">
                    <input
                      type="radio"
                      id="month"
                      name="subscription"
                      value="1 Month Access"
                      checked={subscriptionMode === "1 Month Access"}
                      onChange={setSubscriptionPlan}
                    />
                    <p className="text-sm">1 Month Access</p>
                  </div>
                  <div className="border border-[#E4E4E5] flex justify-between h-12 rounded-md">
                    <input
                      className="w-full rounded-l-md px-2 outline-none"
                      type="string"
                      placeholder="Enter the price for 1-month access"
                    />
                    <button className="bg-[#E4E4E5] w-12 rounded-r-sm flex items-center justify-center">
                      <svg
                        width="8"
                        height="14"
                        viewBox="0 0 8 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.06 12.195C3.31 12.195 2.65 12.09 2.08 11.88C1.52 11.67 1.065 11.365 0.715 10.965C0.375 10.555 0.155 10.065 0.055 9.495H1.39C1.45 9.835 1.58 10.125 1.78 10.365C1.99 10.605 2.285 10.79 2.665 10.92C3.055 11.05 3.55 11.125 4.15 11.145C4.53 11.145 4.88 11.1 5.2 11.01C5.52 10.92 5.8 10.795 6.04 10.635C6.28 10.475 6.465 10.285 6.595 10.065C6.735 9.835 6.805 9.585 6.805 9.315C6.805 9.015 6.72 8.76 6.55 8.55C6.39 8.33 6.185 8.15 5.935 8.01C5.695 7.87 5.45 7.76 5.2 7.68C4.95 7.59 4.745 7.525 4.585 7.485L3.76 7.275C3.39 7.175 3.005 7.065 2.605 6.945C2.205 6.815 1.835 6.65 1.495 6.45C1.155 6.25 0.88 5.99 0.67 5.67C0.46 5.34 0.355 4.93 0.355 4.44C0.355 3.83 0.515 3.32 0.835 2.91C1.165 2.49 1.61 2.175 2.17 1.965C2.74 1.745 3.385 1.635 4.105 1.635C4.795 1.635 5.375 1.74 5.845 1.95C6.315 2.16 6.685 2.445 6.955 2.805C7.235 3.155 7.42 3.55 7.51 3.99H6.31C6.23 3.52 5.985 3.18 5.575 2.97C5.165 2.75 4.68 2.64 4.12 2.64C3.62 2.64 3.175 2.7 2.785 2.82C2.395 2.93 2.085 3.1 1.855 3.33C1.635 3.56 1.525 3.86 1.525 4.23C1.525 4.62 1.635 4.94 1.855 5.19C2.075 5.43 2.355 5.625 2.695 5.775C3.035 5.915 3.39 6.035 3.76 6.135L4.585 6.33C5.055 6.44 5.495 6.575 5.905 6.735C6.315 6.885 6.675 7.07 6.985 7.29C7.295 7.51 7.535 7.775 7.705 8.085C7.885 8.395 7.975 8.76 7.975 9.18C7.975 10.14 7.625 10.885 6.925 11.415C6.235 11.935 5.28 12.195 4.06 12.195ZM3.655 13.05V0.749999H4.735V13.05H3.655Z"
                          fill="#52525C"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-x-1 mb-1">
                    <input
                      type="radio"
                      id="year"
                      name="subscription"
                      value="1 Year Access"
                      checked={subscriptionMode === "1 Year Access"}
                      onChange={setSubscriptionPlan}
                    />
                    <p className="text-sm">1 Year Access</p>
                  </div>
                  <div className="border border-[#E4E4E5] flex justify-between h-12 rounded-md">
                    <input
                      className="w-full rounded-l-md px-2 outline-none"
                      type="string"
                      placeholder="Enter the price for 1-year access"
                    />
                    <button className="bg-[#E4E4E5] w-12 rounded-r-sm flex items-center justify-center">
                      <svg
                        width="8"
                        height="14"
                        viewBox="0 0 8 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.06 12.195C3.31 12.195 2.65 12.09 2.08 11.88C1.52 11.67 1.065 11.365 0.715 10.965C0.375 10.555 0.155 10.065 0.055 9.495H1.39C1.45 9.835 1.58 10.125 1.78 10.365C1.99 10.605 2.285 10.79 2.665 10.92C3.055 11.05 3.55 11.125 4.15 11.145C4.53 11.145 4.88 11.1 5.2 11.01C5.52 10.92 5.8 10.795 6.04 10.635C6.28 10.475 6.465 10.285 6.595 10.065C6.735 9.835 6.805 9.585 6.805 9.315C6.805 9.015 6.72 8.76 6.55 8.55C6.39 8.33 6.185 8.15 5.935 8.01C5.695 7.87 5.45 7.76 5.2 7.68C4.95 7.59 4.745 7.525 4.585 7.485L3.76 7.275C3.39 7.175 3.005 7.065 2.605 6.945C2.205 6.815 1.835 6.65 1.495 6.45C1.155 6.25 0.88 5.99 0.67 5.67C0.46 5.34 0.355 4.93 0.355 4.44C0.355 3.83 0.515 3.32 0.835 2.91C1.165 2.49 1.61 2.175 2.17 1.965C2.74 1.745 3.385 1.635 4.105 1.635C4.795 1.635 5.375 1.74 5.845 1.95C6.315 2.16 6.685 2.445 6.955 2.805C7.235 3.155 7.42 3.55 7.51 3.99H6.31C6.23 3.52 5.985 3.18 5.575 2.97C5.165 2.75 4.68 2.64 4.12 2.64C3.62 2.64 3.175 2.7 2.785 2.82C2.395 2.93 2.085 3.1 1.855 3.33C1.635 3.56 1.525 3.86 1.525 4.23C1.525 4.62 1.635 4.94 1.855 5.19C2.075 5.43 2.355 5.625 2.695 5.775C3.035 5.915 3.39 6.035 3.76 6.135L4.585 6.33C5.055 6.44 5.495 6.575 5.905 6.735C6.315 6.885 6.675 7.07 6.985 7.29C7.295 7.51 7.535 7.775 7.705 8.085C7.885 8.395 7.975 8.76 7.975 9.18C7.975 10.14 7.625 10.885 6.925 11.415C6.235 11.935 5.28 12.195 4.06 12.195ZM3.655 13.05V0.749999H4.735V13.05H3.655Z"
                          fill="#52525C"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div></div>
          )}
        </div>
      </div>

      {/* Subscription Section */}

      {/* <div className="border rounded-xl px-4 py-5 mt-5 bg-white">
        <p>Subscription</p>
        <p className="text-xs text-[#5D5D67] mt-2">
          Select platform and insert the invitation link
        </p>
        <div className="grid grid-cols-1 gap-y-2 md:gap-y-0 md:grid-cols-2 gap-x-4 mt-2">
          <div>
            <a
              href={process.env.NEXT_PUBLIC_DISCORD_CONNECT_URI}
              target="_blank"
              className="border rounded-lg h-24 flex items-center px-2 gap-x-3 hover:bg-[#E4E4E5] transition-all duration-300"
            >
              <Image
                className="w-10 md:w-12 lg:w-14"
                src="https://s3-alpha-sig.figma.com/img/c89a/0a74/93f942f4f36a009c22adc6177b140086?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=I1WoThr8zy7FjNSbR9~Rfgi~~HrE6ELvlNSwW92RCBDspmqDI3pQ6aJb1AKXTsmYWlnTlsxjtyjvEhE9nIJLzLDO5qLSWSeWqTfuAa9vuk-IE9OOov90XPYYfETFhVED~IeK-qgEtc0wZduH9Z8mZZiW3Oq2Oz-L61Ys6cTmYRJL9GBDeBXJ07SjdkkgxK13iKKcU6SNmA-GVa702qCq4M1lsoB19JvXO7x~Fjmuxdu6LSILU~cvwaWYRtW-soGdo7oeOhbptfQJFBPedyv-A9wJ2s5ONe7lnXbWSrQ7WOIJtscN5DOCqqxTIeCzDghY2qL7shKTTCHIFSVocQWlPA__"
                width={200}
                height={200}
                alt=""
              />
              <div>
                <p className="font-medium text-[14px] md:text-[16px] lg:text-lg">
                  Discord
                </p>
                <p className="text-[10px] md:text-[11px]">
                  Offer exclusive access to your private Discord server
                </p>
              </div>
            </a>
            <div className="border mt-2 p-1 px-2 flex items-center justify-between gap-x-1 rounded-sm border-[#E4E4E5]">
              <input
                className="w-full outline-none h-8 "
                type="text"
                placeholder="Enter your discord link"
              />
              <svg
                className="w-3 md:w-4"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.75 15.5C6.55109 15.5 6.36032 15.421 6.21967 15.2803C6.07902 15.1397 6 14.9489 6 14.75C6 14.5511 6.07902 14.3603 6.21967 14.2197C6.36032 14.079 6.55109 14 6.75 14H13C13.5304 14 14.0391 13.7893 14.4142 13.4142C14.7893 13.0391 15 12.5304 15 12V4C15 3.46957 14.7893 2.96086 14.4142 2.58579C14.0391 2.21071 13.5304 2 13 2H6.75C6.55109 2 6.36032 1.92098 6.21967 1.78033C6.07902 1.63968 6 1.44891 6 1.25C6 1.05109 6.07902 0.860322 6.21967 0.71967C6.36032 0.579018 6.55109 0.5 6.75 0.5H13C13.9283 0.5 14.8185 0.868749 15.4749 1.52513C16.1313 2.1815 16.5 3.07174 16.5 4V12C16.5 12.9283 16.1313 13.8185 15.4749 14.4749C14.8185 15.1313 13.9283 15.5 13 15.5H6.75ZM6.741 4.199C6.81335 4.13214 6.89816 4.08019 6.9906 4.04612C7.08303 4.01205 7.18127 3.99652 7.2797 4.00042C7.37813 4.00432 7.47484 4.02757 7.56428 4.06885C7.65373 4.11013 7.73417 4.16863 7.801 4.241L10.801 7.491C10.929 7.62957 11.0002 7.81132 11.0002 8C11.0002 8.18868 10.929 8.37043 10.801 8.509L7.801 11.759C7.73409 11.8313 7.6536 11.8897 7.56412 11.9309C7.47464 11.9721 7.37792 11.9952 7.27949 11.999C7.18106 12.0028 7.08284 11.9872 6.99045 11.9531C6.89806 11.9189 6.81329 11.8669 6.741 11.8C6.66871 11.7331 6.6103 11.6526 6.56912 11.5631C6.52793 11.4736 6.50477 11.3769 6.50097 11.2785C6.49328 11.0797 6.56487 10.886 6.7 10.74L8.538 8.749H0.75C0.551088 8.749 0.360322 8.66998 0.21967 8.52933C0.0790177 8.38868 0 8.19791 0 7.999C0 7.80009 0.0790177 7.60932 0.21967 7.46867C0.360322 7.32802 0.551088 7.249 0.75 7.249H8.537L6.699 5.259C6.63214 5.18665 6.58019 5.10184 6.54612 5.0094C6.51205 4.91697 6.49652 4.81873 6.50042 4.7203C6.50432 4.62187 6.52757 4.52516 6.56885 4.43572C6.61013 4.34627 6.66863 4.26583 6.741 4.199Z"
                  fill="#75757D"
                />
              </svg>
            </div>
          </div>
          <div>
            <a
              href=""
              className="border rounded-lg h-24 flex items-center px-2 gap-x-3 hover:bg-[#E4E4E5] transition-all duration-300"
            >
              <Image
                className="w-10 md:w-12 lg:w-14"
                src="https://s3-alpha-sig.figma.com/img/1d2b/bc7f/92849e7867a21edd110a2b0e8a256f6e?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CMFTdAWPEY2zRMwir~96rBNf5iuAy1T1xrpa~mX9LzAmV9yoplOm56x3BTCzFJYPBv1Sb2xwP5Yfkbe8zr9T-UHv~DRHvQsyh6KA00v9M5KmoI~apctonPhgnFxBEANmFhnWyoSCrFVioL463gDiTIjWNBpAV9txOJg-D6iKM7aeBoh6xlZai-T-rUyOjFu0Dw3XtmLJ01kouELtjKtu~doKk2q0pdXBIH1GC0J~TEx7szoylE7ERL7Va8dF0vZ9HNmJSZk~pAmBk5cChk1-BX5fFB46Pwh2OIN5wxh7~H388bnzpnqi8N8OvzqM64RkwAbrg68ouC5HwdWAw8UDOw__"
                width={200}
                height={200}
                alt=""
              />
              <div>
                <p className="font-medium text-[14px] md:text-[16px] lg:text-lg">
                  Telegram
                </p>
                <p className="text-[10px] md:text-[11px]">
                  Provide access to your private Telegram channel
                </p>
              </div>
            </a>
            <div className="border mt-2 p-1 px-2 flex items-center justify-between gap-x-1 rounded-sm border-[#E4E4E5]">
              <input
                className="w-full outline-none h-8"
                type="text"
                placeholder="Enter your telegram group link"
              />
              <svg
                className="w-3 md:w-4"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.75 15.5C6.55109 15.5 6.36032 15.421 6.21967 15.2803C6.07902 15.1397 6 14.9489 6 14.75C6 14.5511 6.07902 14.3603 6.21967 14.2197C6.36032 14.079 6.55109 14 6.75 14H13C13.5304 14 14.0391 13.7893 14.4142 13.4142C14.7893 13.0391 15 12.5304 15 12V4C15 3.46957 14.7893 2.96086 14.4142 2.58579C14.0391 2.21071 13.5304 2 13 2H6.75C6.55109 2 6.36032 1.92098 6.21967 1.78033C6.07902 1.63968 6 1.44891 6 1.25C6 1.05109 6.07902 0.860322 6.21967 0.71967C6.36032 0.579018 6.55109 0.5 6.75 0.5H13C13.9283 0.5 14.8185 0.868749 15.4749 1.52513C16.1313 2.1815 16.5 3.07174 16.5 4V12C16.5 12.9283 16.1313 13.8185 15.4749 14.4749C14.8185 15.1313 13.9283 15.5 13 15.5H6.75ZM6.741 4.199C6.81335 4.13214 6.89816 4.08019 6.9906 4.04612C7.08303 4.01205 7.18127 3.99652 7.2797 4.00042C7.37813 4.00432 7.47484 4.02757 7.56428 4.06885C7.65373 4.11013 7.73417 4.16863 7.801 4.241L10.801 7.491C10.929 7.62957 11.0002 7.81132 11.0002 8C11.0002 8.18868 10.929 8.37043 10.801 8.509L7.801 11.759C7.73409 11.8313 7.6536 11.8897 7.56412 11.9309C7.47464 11.9721 7.37792 11.9952 7.27949 11.999C7.18106 12.0028 7.08284 11.9872 6.99045 11.9531C6.89806 11.9189 6.81329 11.8669 6.741 11.8C6.66871 11.7331 6.6103 11.6526 6.56912 11.5631C6.52793 11.4736 6.50477 11.3769 6.50097 11.2785C6.49328 11.0797 6.56487 10.886 6.7 10.74L8.538 8.749H0.75C0.551088 8.749 0.360322 8.66998 0.21967 8.52933C0.0790177 8.38868 0 8.19791 0 7.999C0 7.80009 0.0790177 7.60932 0.21967 7.46867C0.360322 7.32802 0.551088 7.249 0.75 7.249H8.537L6.699 5.259C6.63214 5.18665 6.58019 5.10184 6.54612 5.0094C6.51205 4.91697 6.49652 4.81873 6.50042 4.7203C6.50432 4.62187 6.52757 4.52516 6.56885 4.43572C6.61013 4.34627 6.66863 4.26583 6.741 4.199Z"
                  fill="#75757D"
                />
              </svg>
            </div>
          </div>
        </div>
        <p className="text-xs text-[#5D5D67] mt-5">
          Subscription Duration and Pricing
        </p>
        <div className="grid grid-cols-1 gap-y-2 lg:gap-y-0 lg:grid-cols-3 gap-x-3 mt-4">
          <div>
            <div className="flex items-center gap-x-1 mb-1">
              <input
                type="radio"
                id="week"
                name="subscription"
                value="1 Week Access"
                checked={subscriptionMode === "1 Week Access"}
                onChange={setSubscriptionPlan}
              />
              <p className="text-sm">1 Week Access</p>
            </div>
            <div className="border border-[#E4E4E5] flex justify-between h-12 rounded-md">
              <input
                className="w-full rounded-l-md px-2 outline-none"
                type="string"
                placeholder="Enter the price for 1-year access"
              />
              <button className="bg-[#E4E4E5] w-12 rounded-r-sm flex items-center justify-center">
                <svg
                  width="8"
                  height="14"
                  viewBox="0 0 8 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.06 12.195C3.31 12.195 2.65 12.09 2.08 11.88C1.52 11.67 1.065 11.365 0.715 10.965C0.375 10.555 0.155 10.065 0.055 9.495H1.39C1.45 9.835 1.58 10.125 1.78 10.365C1.99 10.605 2.285 10.79 2.665 10.92C3.055 11.05 3.55 11.125 4.15 11.145C4.53 11.145 4.88 11.1 5.2 11.01C5.52 10.92 5.8 10.795 6.04 10.635C6.28 10.475 6.465 10.285 6.595 10.065C6.735 9.835 6.805 9.585 6.805 9.315C6.805 9.015 6.72 8.76 6.55 8.55C6.39 8.33 6.185 8.15 5.935 8.01C5.695 7.87 5.45 7.76 5.2 7.68C4.95 7.59 4.745 7.525 4.585 7.485L3.76 7.275C3.39 7.175 3.005 7.065 2.605 6.945C2.205 6.815 1.835 6.65 1.495 6.45C1.155 6.25 0.88 5.99 0.67 5.67C0.46 5.34 0.355 4.93 0.355 4.44C0.355 3.83 0.515 3.32 0.835 2.91C1.165 2.49 1.61 2.175 2.17 1.965C2.74 1.745 3.385 1.635 4.105 1.635C4.795 1.635 5.375 1.74 5.845 1.95C6.315 2.16 6.685 2.445 6.955 2.805C7.235 3.155 7.42 3.55 7.51 3.99H6.31C6.23 3.52 5.985 3.18 5.575 2.97C5.165 2.75 4.68 2.64 4.12 2.64C3.62 2.64 3.175 2.7 2.785 2.82C2.395 2.93 2.085 3.1 1.855 3.33C1.635 3.56 1.525 3.86 1.525 4.23C1.525 4.62 1.635 4.94 1.855 5.19C2.075 5.43 2.355 5.625 2.695 5.775C3.035 5.915 3.39 6.035 3.76 6.135L4.585 6.33C5.055 6.44 5.495 6.575 5.905 6.735C6.315 6.885 6.675 7.07 6.985 7.29C7.295 7.51 7.535 7.775 7.705 8.085C7.885 8.395 7.975 8.76 7.975 9.18C7.975 10.14 7.625 10.885 6.925 11.415C6.235 11.935 5.28 12.195 4.06 12.195ZM3.655 13.05V0.749999H4.735V13.05H3.655Z"
                    fill="#52525C"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-1 mb-1">
              <input
                type="radio"
                id="month"
                name="subscription"
                value="1 Month Access"
                checked={subscriptionMode === "1 Month Access"}
                onChange={setSubscriptionPlan}
              />
              <p className="text-sm">1 Month Access</p>
            </div>
            <div className="border border-[#E4E4E5] flex justify-between h-12 rounded-md">
              <input
                className="w-full rounded-l-md px-2 outline-none"
                type="string"
                placeholder="Enter the price for 1-month access"
              />
              <button className="bg-[#E4E4E5] w-12 rounded-r-sm flex items-center justify-center">
                <svg
                  width="8"
                  height="14"
                  viewBox="0 0 8 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.06 12.195C3.31 12.195 2.65 12.09 2.08 11.88C1.52 11.67 1.065 11.365 0.715 10.965C0.375 10.555 0.155 10.065 0.055 9.495H1.39C1.45 9.835 1.58 10.125 1.78 10.365C1.99 10.605 2.285 10.79 2.665 10.92C3.055 11.05 3.55 11.125 4.15 11.145C4.53 11.145 4.88 11.1 5.2 11.01C5.52 10.92 5.8 10.795 6.04 10.635C6.28 10.475 6.465 10.285 6.595 10.065C6.735 9.835 6.805 9.585 6.805 9.315C6.805 9.015 6.72 8.76 6.55 8.55C6.39 8.33 6.185 8.15 5.935 8.01C5.695 7.87 5.45 7.76 5.2 7.68C4.95 7.59 4.745 7.525 4.585 7.485L3.76 7.275C3.39 7.175 3.005 7.065 2.605 6.945C2.205 6.815 1.835 6.65 1.495 6.45C1.155 6.25 0.88 5.99 0.67 5.67C0.46 5.34 0.355 4.93 0.355 4.44C0.355 3.83 0.515 3.32 0.835 2.91C1.165 2.49 1.61 2.175 2.17 1.965C2.74 1.745 3.385 1.635 4.105 1.635C4.795 1.635 5.375 1.74 5.845 1.95C6.315 2.16 6.685 2.445 6.955 2.805C7.235 3.155 7.42 3.55 7.51 3.99H6.31C6.23 3.52 5.985 3.18 5.575 2.97C5.165 2.75 4.68 2.64 4.12 2.64C3.62 2.64 3.175 2.7 2.785 2.82C2.395 2.93 2.085 3.1 1.855 3.33C1.635 3.56 1.525 3.86 1.525 4.23C1.525 4.62 1.635 4.94 1.855 5.19C2.075 5.43 2.355 5.625 2.695 5.775C3.035 5.915 3.39 6.035 3.76 6.135L4.585 6.33C5.055 6.44 5.495 6.575 5.905 6.735C6.315 6.885 6.675 7.07 6.985 7.29C7.295 7.51 7.535 7.775 7.705 8.085C7.885 8.395 7.975 8.76 7.975 9.18C7.975 10.14 7.625 10.885 6.925 11.415C6.235 11.935 5.28 12.195 4.06 12.195ZM3.655 13.05V0.749999H4.735V13.05H3.655Z"
                    fill="#52525C"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-1 mb-1">
              <input
                type="radio"
                id="year"
                name="subscription"
                value="1 Year Access"
                checked={subscriptionMode === "1 Year Access"}
                onChange={setSubscriptionPlan}
              />
              <p className="text-sm">1 Year Access</p>
            </div>
            <div className="border border-[#E4E4E5] flex justify-between h-12 rounded-md">
              <input
                className="w-full rounded-l-md px-2 outline-none"
                type="string"
                placeholder="Enter the price for 1-year access"
              />
              <button className="bg-[#E4E4E5] w-12 rounded-r-sm flex items-center justify-center">
                <svg
                  width="8"
                  height="14"
                  viewBox="0 0 8 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.06 12.195C3.31 12.195 2.65 12.09 2.08 11.88C1.52 11.67 1.065 11.365 0.715 10.965C0.375 10.555 0.155 10.065 0.055 9.495H1.39C1.45 9.835 1.58 10.125 1.78 10.365C1.99 10.605 2.285 10.79 2.665 10.92C3.055 11.05 3.55 11.125 4.15 11.145C4.53 11.145 4.88 11.1 5.2 11.01C5.52 10.92 5.8 10.795 6.04 10.635C6.28 10.475 6.465 10.285 6.595 10.065C6.735 9.835 6.805 9.585 6.805 9.315C6.805 9.015 6.72 8.76 6.55 8.55C6.39 8.33 6.185 8.15 5.935 8.01C5.695 7.87 5.45 7.76 5.2 7.68C4.95 7.59 4.745 7.525 4.585 7.485L3.76 7.275C3.39 7.175 3.005 7.065 2.605 6.945C2.205 6.815 1.835 6.65 1.495 6.45C1.155 6.25 0.88 5.99 0.67 5.67C0.46 5.34 0.355 4.93 0.355 4.44C0.355 3.83 0.515 3.32 0.835 2.91C1.165 2.49 1.61 2.175 2.17 1.965C2.74 1.745 3.385 1.635 4.105 1.635C4.795 1.635 5.375 1.74 5.845 1.95C6.315 2.16 6.685 2.445 6.955 2.805C7.235 3.155 7.42 3.55 7.51 3.99H6.31C6.23 3.52 5.985 3.18 5.575 2.97C5.165 2.75 4.68 2.64 4.12 2.64C3.62 2.64 3.175 2.7 2.785 2.82C2.395 2.93 2.085 3.1 1.855 3.33C1.635 3.56 1.525 3.86 1.525 4.23C1.525 4.62 1.635 4.94 1.855 5.19C2.075 5.43 2.355 5.625 2.695 5.775C3.035 5.915 3.39 6.035 3.76 6.135L4.585 6.33C5.055 6.44 5.495 6.575 5.905 6.735C6.315 6.885 6.675 7.07 6.985 7.29C7.295 7.51 7.535 7.775 7.705 8.085C7.885 8.395 7.975 8.76 7.975 9.18C7.975 10.14 7.625 10.885 6.925 11.415C6.235 11.935 5.28 12.195 4.06 12.195ZM3.655 13.05V0.749999H4.735V13.05H3.655Z"
                    fill="#52525C"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div> */}

      {/* <AddMedia /> */}
      <div className="border rounded-xl p-4 mt-5 bg-white">
        <p>Media</p>
        <p className="text-xs mt-2 mb-1">
          Click to upload and slide to switch order:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-2">
          <div className="border flex flex-col items-center justify-center p-1 text-white bg-[#4B6161] rounded h-44 relative">
            <Widget publicKey={uploadcarekey} onChange={handleFileUpload} />
            {imageUrl && (
              <div className="absolute inset-0 rounded border border-[#ccccce] overflow-hidden">
                {/* Image container */}
                <img
                  src={imageUrl}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
          <div className="border hover:bg-[#F9F9FD] transition-all duration-200 flex items-center justify-center rounded h-44">
            <svg
              width="15"
              height="14"
              viewBox="0 0 15 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.60091 1.16675V12.8334M1.76758 7.00008H13.4342"
                stroke="black"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="border hover:bg-[#F9F9FD] transition-all duration-200 flex items-center justify-center rounded h-44">
            <svg
              width="15"
              height="14"
              viewBox="0 0 15 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.60091 1.16675V12.8334M1.76758 7.00008H13.4342"
                stroke="black"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="border hover:bg-[#F9F9FD] transition-all duration-200 flex items-center justify-center rounded h-44">
            <svg
              width="15"
              height="14"
              viewBox="0 0 15 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.60091 1.16675V12.8334M1.76758 7.00008H13.4342"
                stroke="black"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="border hover:bg-[#F9F9FD] transition-all duration-200 flex items-center justify-center rounded h-44">
            <svg
              width="15"
              height="14"
              viewBox="0 0 15 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.60091 1.16675V12.8334M1.76758 7.00008H13.4342"
                stroke="black"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* <Content /> */}
      <div className="mt-4 p-4 rounded-xl border bg-white">
        <p>What&apos;s Included</p>

        <div className="grid grid-cols-2 gap-x-4">
          <div className="border h-16 p-2 rounded-lg flex items-center justify-between px-4">
            <p>Private Group</p>
            <button
              onClick={handleToggle}
              className={`flex items-center justify-between w-16 h-8 rounded-full p-1 transition-colors duration-300 
                ${isToggled ? "bg-blue-500" : "bg-gray-300"}`}
            >
              <span
                className={`w-6 h-6 rounded-full bg-white transition-transform duration-300 
                ${isToggled ? "transform translate-x-8" : ""}`}
              ></span>
            </button>
          </div>
          <div className="border h-16 p-2 rounded-lg flex items-center justify-between px-4">
            <p>Digital Assets</p>
            <button
              onClick={handleToggleWhatIncluded}
              className={`flex items-center justify-between w-16 h-8 rounded-full p-1 transition-colors duration-300 
                ${toggleWhatIncluded ? "bg-blue-500" : "bg-gray-300"}`}
            >
              <span
                className={`w-6 h-6 rounded-full bg-white transition-transform duration-300 
                ${toggleWhatIncluded ? "transform translate-x-8" : ""}`}
              ></span>
            </button>
          </div>
        </div>
        {toggleWhatIncluded ? (
          <>
            <p className="text-[15px] md:text-lg mb-4 mt-4">Upload Content</p>
            <div className=" grid grid-cols-1 gap-x-5 rounded-md h-48">
              <div className="border rounded-md">
                <div className="h-10 p-2 border-b bg-slate-200">
                  <p>Content Being Bought</p>
                </div>
                <div className="flex flex-col items-center justify-center h-36">
                  <input
                    className="text-xs sm:text-sm lg:text-[15px]"
                    type="file"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="w-full flex justify-end items-center mt-4">
        <Link href={"/seller/dashboard"}>
          <Button className="mr-2 border rounded w-28 md:w-32 lg:w-36 text-xs md:text-sm bg-white text-black hover:bg-slate-200 transition-all duration-200">
            Check Dashboard
          </Button>
        </Link>

        <Button
          onClick={formSubmit}
          className="rounded w-28 md:w-32 lg:w-36 text-xs md:text-sm"
        >
          List Product
        </Button>
      </div>
    </div>
  );
}

const Topbar = () => {
  return (
    <div className="mt-5  flex justify-between items-center">
      <div className=" w-fit">
        <div className="flex gap-x-2 items-center ">
          <p className="font-bold text-3xl italic">ADD PRODUCT</p>
        </div>
        <p>List your product on Sendit here.</p>
      </div>
      <div className="flex justify-center shadow-md items-center gap-x-1 w-24 bg-white rounded-md border h-10">
        <svg
          width="18"
          height="14"
          viewBox="0 0 18 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.01677 7.59427C0.90328 7.41457 0.846535 7.32472 0.81477 7.18614C0.79091 7.08204 0.79091 6.91788 0.81477 6.81378C0.846535 6.67519 0.90328 6.58534 1.01677 6.40564C1.95461 4.92066 4.74617 1.16663 9.00034 1.16663C13.2545 1.16663 16.0461 4.92066 16.9839 6.40564C17.0974 6.58534 17.1541 6.67519 17.1859 6.81378C17.2098 6.91788 17.2098 7.08204 17.1859 7.18614C17.1541 7.32472 17.0974 7.41457 16.9839 7.59427C16.0461 9.07926 13.2545 12.8333 9.00034 12.8333C4.74617 12.8333 1.95461 9.07926 1.01677 7.59427Z"
            stroke="#050505"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.00034 9.49996C10.381 9.49996 11.5003 8.38067 11.5003 6.99996C11.5003 5.61925 10.381 4.49996 9.00034 4.49996C7.61962 4.49996 6.50034 5.61925 6.50034 6.99996C6.50034 8.38067 7.61962 9.49996 9.00034 9.49996Z"
            stroke="#050505"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <p>Preview</p>
      </div>
    </div>
  );
};

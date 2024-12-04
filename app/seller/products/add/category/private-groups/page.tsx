"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CategoryInterface } from "@/lib/models";
import UploadForm from "@/components/UploadForm";
import { Widget } from "@uploadcare/react-widget";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { phantomWallet } from "@/store/atom/phantomWallet";
import MarkdownEditor from "@/components/MarkdownEditor";
import { usePrivy } from "@privy-io/react-auth";
import { userIdState } from "@/store/atom/userIdState";
import Link from "next/link";
import { discordAccessToken } from "@/store/atom/discordAccessToken";
import { toast } from "sonner";

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

  const [product_id, setProduct_id] = useState("");

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
        (category) => category.id === selectedCategoryId
      );
      // @ts-ignore
      setSelectedCategory(selectedCategory);

      setCategoryId(selectedCategory?.id);
      setCategoryName(selectedCategory?.name);
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
      if (!discordGuildId) {
        toast.info("Connect your discord first");
        return;
      }
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SWAGGER_API_V2}/admin/product`,
        {
          // file: file,
          name: title,
          description: newDescription,
          price: price,
          compare_price: comparePrice,
          thumbnail_url: imageUrl,
          // user_id: user_id,
          category_id: categoryId,
          // status: 1,
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
      toast.info("product created, now you can list it.");

      setProduct_id(response.data.rowId);

      return response.data;
    } catch (error) {
      console.log(`You got an error: ${error}`);
    }

    console.log(selectedCategory);
  };

  const createDiscordCall = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SWAGGER_API_V2}/admin/discord/${product_id}/create`,
        {
          server_discord_id: discordGuildId,
          server_name: discordServerName,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${privyAccessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      router.push("/seller/products/add/category/success");
      return response.data;
    } catch (error) {
      console.log(`Error while creating discord: ${error}`);
    }
  };

  const [discord_access_token, setDiscordAccessToken] =
    useRecoilState(discordAccessToken);
  const setAaccess = useSetRecoilState(discordAccessToken);

  const [discordGuildId, setDiscordGuildId] = useState("");
  const [discordServerName, setDiscordServerName] = useState("");
  const [discordAccess, setDiscordAccess] = useState("");

  const fetchAccessToken = async (code: any) => {
    try {
      const response = await fetch("/api/discord/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          redirectUri: process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Access Token:", data.access_token);
        console.log("GuildId: ", data.guild.id);
        console.log("GuildId: ", data.guild.name);

        toast.info(`You got your discord access token: ${data.access_token}`);
        setAaccess(data.access_token);
        setDiscordAccess(data.access_token);
        setDiscordGuildId(data.guild.id);
        setDiscordServerName(data.guild.name);
        return {
          accessToken: data.access_token,
          guildId: data.guild.id,
          serverName: data.guild.name,
        };
      } else {
        console.error("Error fetching access token:", data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      fetchAccessToken(code);
    }
  }, []);

  const [telegramVerificationToken, setTelegramVerificationToken] =
    useState("");

  const generateTelegramVerificationToken = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }
    setTelegramVerificationToken(result);
    toast.info("Telegram verification token generated!");
    return result;
  };

  const copyTeleToken = async () => {
    try {
      await navigator.clipboard.writeText(telegramVerificationToken);
      toast.info("Verification Token Copied");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
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
            value={selectedCategory?.id || ""}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
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
      <div className="mt-5 flex justify-end">
        <button
          onClick={formSubmit}
          className="bg-black text-white px-2 rounded-lg h-10 hover:bg-[#4B6161] transition-all duration-300"
        >
          Create product
        </button>
      </div>
      <div className="border rounded-xl px-4 py-5 mt-5 bg-white">
        <div className="grid grid-cols-1 gap-y-2 md:gap-y-0 md:grid-cols-2 gap-x-4">
          <div>
            <a
              href={"/api/auth/discord"}
              className={
                discordGuildId && discordServerName
                  ? "border border-[#4B6161] bg-[#d9faf2] rounded-lg h-24 flex items-center px-2 gap-x-3 hover:bg-[#E4E4E5] transition-all duration-300"
                  : "border rounded-lg h-24 flex items-center px-2 gap-x-3 hover:bg-[#E4E4E5] transition-all duration-300"
              }
            >
              <Image
                className="w-10 md:w-12 lg:w-14"
                src="https://s3-alpha-sig.figma.com/img/c89a/0a74/93f942f4f36a009c22adc6177b140086?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LySqO17PCfD1vsF1049b38Kaiu1Q9R2qs4Org2J8QcaXMboKRJw~UPOYINNusCUcG~CxnQMC8sx8viEKNeKomYUGaPd9PVIIpl5eV3HaRTcSAAU6s0YJBISJM7WZsPQg-HPczVxb0-WaFBo2mGpC7OWlJ7g7FrhfmqnoAmdDb~iDOUSvHmcGsXVLtFaoyDkQC6xY1h--kEUHEqKlQ4JnGyocOw4tr3Omw8vFzEIi~F0nE7AchatNLdgF3ys7kOUsfmKhsOzeOItCDu76Pwh-cGndtwVMKyjpSshuZQ8kZF3EVYzjkbDg5xytwANpl7g8aokqwiz5CSQuCbOKqy2ycg__"
                width={200}
                height={200}
                alt=""
              />
              <div>
                <p className="font-medium text-[14px] md:text-[16px] lg:text-lg">
                  Discord
                </p>
                <p className="text-[10px] md:text-[11px]">
                  {discordGuildId
                    ? `connected server: ${discordServerName}`
                    : `Offer exclusive access to your private Discord server`}
                </p>
              </div>
            </a>
          </div>
          <div className="border rounded-lg h-24 flex items-center hover:bg-[#E4E4E5] transition-all duration-300 justify-between">
            <div className="flex items-center px-2 gap-x-3">
              <Image
                className="w-10 md:w-12 lg:w-14"
                src="https://s3-alpha-sig.figma.com/img/1d2b/bc7f/92849e7867a21edd110a2b0e8a256f6e?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KXCbXmfq1IjfOOzrGJzfWCl9Yl9UNj-SWz-mlmqH5Zfi~0-uKfDEpBVvBiLH-5N276OISTmZBs~v0XbJNwZavOwEKoZxa0S8~8nrh5irCkhsO5eSz62DTQawoVza297qf-ty8lwAUSlsj8yWkU1oHuGdNHqFnIyWju7PNN-P9jDNBrG6MUYJSMwJzG-9lTWqIOyMv3RrOeJf-nUYxIYQcTFYWy~0RPmsJYxUqYVGeH3Ivbjqim0v73LNB6~37POazuSAHUVXmbRglScZRgv4JTIrqmRhBNqjp54EEIRxsmfACjFcfiv1liKgHHi7vCM3GC34T-YcXUAJ8md9NHZ3ZQ__"
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
            </div>
            <div className="flex items-center gap-x-2 mr-4">
              <button
                onClick={generateTelegramVerificationToken}
                className="border bg-[#e0e4ea] border-[#b0b3b8] rounded px-2 hover:bg-[#586e6e] hover:text-white transition-all duration-300"
              >
                Generate
              </button>
              <button
                onClick={copyTeleToken}
                className="border bg-[#e0e4ea] border-[#b0b3b8] rounded p-1 flex items-center justify-center hover:bg-[#586e6e] transition-all duration-300"
              >
                <svg
                  className="w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M9 18q-.825 0-1.412-.587T7 16V4q0-.825.588-1.412T9 2h9q.825 0 1.413.588T20 4v12q0 .825-.587 1.413T18 18zm0-2h9V4H9zm-4 6q-.825 0-1.412-.587T3 20V6h2v14h11v2zm4-6V4z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <div>
        <p>{discordServerName}</p>
        <p>{discordGuildId}</p>
        <p>{discordAccess}</p>
        <p>{product_id}</p>
      </div> */}
      <div className="w-full flex justify-end items-center mt-4">
        <Link href={"/seller/dashboard"}>
          <Button className="mr-2 border rounded w-28 md:w-32 lg:w-36 text-xs md:text-sm bg-white text-black hover:bg-slate-200 transition-all duration-200">
            Check Dashboard
          </Button>
        </Link>

        <Button
          onClick={createDiscordCall}
          className="rounded w-28 md:w-32 lg:w-36 text-xs md:text-sm"
          disabled={!discordGuildId ? true : false}
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

"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CategoryInterface } from "@/lib/models";
import UploadForm from "@/components/UploadForm";
import { Widget } from "@uploadcare/react-widget";
import Image from "next/image";
import { useRouter } from "next/navigation";

const uploadcarekey = process.env.NEXT_PUBLIC_UPLOADCARE_KEY || "";
export default function ProductUpload() {
  const router = useRouter();
  // for Product Description
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // For Price
  const [price, setPrice] = useState("");
  const [comparePrice, setComparePrice] = useState("");
  // for Content
  const [file, setFile] = useState(null);

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };
  // For ImageBanner
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleFileUpload = (fileInfo: any) => {
    if (fileInfo) {
      // Get the uploaded file's URL
      const url = fileInfo.cdnUrl;
      setImageUrl(url);
      // console.log("Uploaded Image URL:", url); // Log or save this URL to your database
    } else {
      console.log("");
    }
  };

  // for Tags
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [categoryId, setCategoryId] = useState<number | undefined>();

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/fetch/categories`
      );
      // console.log(response.data);
      setCategories(response.data);
    } catch (error) {
      console.log(`You got an error: ${error}`);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (event: any) => {
    const selectedCategoryId = event.target.value;
    if (categories) {
      const selectedCategory = categories.find(
        (category) => category.ID === parseInt(selectedCategoryId)
      );
      // @ts-ignore
      setSelectedCategory(selectedCategory);
      setCategoryId(selectedCategory?.ID);
      // console.log(selectedCategory?.ID);
      // console.log(selectedCategory?.Name);
      // console.log(selectedCategory?.ID);
    }
  };
  const logEnvDada = () => {
    // console.log(`${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/api/v1/upload`);
    // console.log(`Category: ${categoryId}`);
    router.push("/seller/dashboard");
  };

  const formSubmit = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/upload`,
        {
          file: file,
          name: title,
          description: description,
          price: price,
          compare_price: comparePrice,
          thumbnail_url: imageUrl,
          user_id: 1,
          category_id: categoryId,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response.data);
      router.push("/product/add/category/success");
      return response.data;
    } catch (error) {
      console.log(`You got an error: ${error}`);
    }

    console.log(selectedCategory);
  };

  return (
    <div className="pt-16 pb-20 sm:px-[20px] md:px-[40px] lg:px-[60px] xl:px-[150px] 2xl:px-[200px] min-h-screen bg-[#FAF9F5]">
      <Topbar />
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
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          {/* <div className="">
          <p className="text-xs mb-2">Tags:</p>
          <input
            type="text"
            className="border w-full h-12 p-2 flex items-center rounded outline-none"
            placeholder="Enter title"
          />
        </div> */}
        </div>
        <p className="mt-4 text-xs">Description</p>
        <div className="mt-2 border rounded-sm h-48">
          <div className="w-full flex items-center border-b h-12 p-1 gap-x-2">
            <div className="border flex items-center px-2 justify-between rounded h-10 w-40">
              <p>Heading 1</p>
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
            <div className="border items-center px-2 flex justify-between rounded-md bg-[#F2F4F7] h-10 w-28 ml-2">
              <svg
                width="11"
                height="14"
                viewBox="0 0 11 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 6.99996H6.33333C7.80609 6.99996 9 5.80605 9 4.33329C9 2.86053 7.80609 1.66663 6.33333 1.66663H1V6.99996ZM1 6.99996H7C8.47276 6.99996 9.66667 8.19387 9.66667 9.66663C9.66667 11.1394 8.47276 12.3333 7 12.3333H1V6.99996Z"
                  stroke="#4B4B54"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <svg
                width="12"
                height="14"
                viewBox="0 0 12 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.6663 1.66663H4.66634M7.33301 12.3333H1.33301M7.99967 1.66663L3.99967 12.3333"
                  stroke="#4B4B54"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 10.6666C4 12.1394 5.19391 13.3333 6.66667 13.3333H9.33333C10.8061 13.3333 12 12.1394 12 10.6666C12 9.19387 10.8061 7.99996 9.33333 7.99996M12 5.33329C12 3.86053 10.8061 2.66663 9.33333 2.66663H6.66667C5.19391 2.66663 4 3.86053 4 5.33329M2 7.99996H14"
                  stroke="#4B4B54"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.9993 1.66675V6.33341C10.9993 8.54255 9.20849 10.3334 6.99935 10.3334C4.79021 10.3334 2.99935 8.54255 2.99935 6.33341V1.66675M1.66602 13.0001H12.3327"
                  stroke="#4B4B54"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="border flex justify-between rounded-md bg-[#F2F4F7] h-10 w-28 items-center px-2">
              <svg
                width="14"
                height="13"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 5.16672H1M7 1.66672L1 1.66672M13 8.83338H1M13 12.3334H1M12.1467 0.973383L9.56889 2.90672C9.37589 3.05146 9.2794 3.12384 9.24489 3.21256C9.21467 3.29027 9.21467 3.37649 9.24489 3.45421C9.2794 3.54293 9.37589 3.6153 9.56889 3.76005L12.1467 5.69338C12.4213 5.89937 12.5586 6.00237 12.6736 5.99998C12.7736 5.9979 12.8674 5.95099 12.9291 5.87222C13 5.78169 13 5.61003 13 5.26672V1.40005C13 1.05673 13 0.885076 12.9291 0.79455C12.8674 0.715772 12.7736 0.668868 12.6736 0.666789C12.5586 0.664399 12.4213 0.767394 12.1467 0.973383Z"
                  stroke="#4B4B54"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                width="14"
                height="13"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 5.16672H7M13 1.66672L7 1.66672M13 8.83338H1M13 12.3334H1M1.85333 0.973383L4.43111 2.90672C4.62411 3.05146 4.7206 3.12384 4.75511 3.21256C4.78533 3.29027 4.78533 3.37649 4.75511 3.45421C4.7206 3.54293 4.62411 3.6153 4.43111 3.76005L1.85333 5.69338C1.57868 5.89937 1.44135 6.00237 1.3264 5.99998C1.22637 5.9979 1.13256 5.95099 1.07088 5.87222C1 5.78169 1 5.61003 1 5.26672V1.40005C1 1.05673 1 0.885076 1.07088 0.79455C1.13256 0.715772 1.22637 0.668868 1.3264 0.666789C1.44135 0.664399 1.57868 0.767394 1.85333 0.973383Z"
                  stroke="#4B4B54"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                width="14"
                height="12"
                viewBox="0 0 14 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 4.66663H7.66667M13 1.99996H7.66667M13 7.33329H7.66667M13 9.99996H7.66667M3 11.3333L3 0.666626M3 11.3333L1 9.33329M3 11.3333L5 9.33329M3 0.666626L1 2.66663M3 0.666626L5 2.66663"
                  stroke="#4B4B54"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                width="14"
                height="12"
                viewBox="0 0 14 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.66667 6.66671C2.03486 6.66671 2.33333 6.36823 2.33333 6.00004C2.33333 5.63185 2.03486 5.33337 1.66667 5.33337C1.29848 5.33337 1 5.63185 1 6.00004C1 6.36823 1.29848 6.66671 1.66667 6.66671Z"
                  fill="black"
                />
                <path
                  d="M1.66667 6.66671C2.03486 6.66671 2.33333 6.36823 2.33333 6.00004C2.33333 5.63185 2.03486 5.33337 1.66667 5.33337C1.29848 5.33337 1 5.63185 1 6.00004C1 6.36823 1.29848 6.66671 1.66667 6.66671Z"
                  fill="#4B4B54"
                />
                <path
                  d="M1.66667 2.66671C2.03486 2.66671 2.33333 2.36823 2.33333 2.00004C2.33333 1.63185 2.03486 1.33337 1.66667 1.33337C1.29848 1.33337 1 1.63185 1 2.00004C1 2.36823 1.29848 2.66671 1.66667 2.66671Z"
                  fill="black"
                />
                <path
                  d="M1.66667 2.66671C2.03486 2.66671 2.33333 2.36823 2.33333 2.00004C2.33333 1.63185 2.03486 1.33337 1.66667 1.33337C1.29848 1.33337 1 1.63185 1 2.00004C1 2.36823 1.29848 2.66671 1.66667 2.66671Z"
                  fill="#4B4B54"
                />
                <path
                  d="M1.66667 10.6667C2.03486 10.6667 2.33333 10.3682 2.33333 10C2.33333 9.63185 2.03486 9.33337 1.66667 9.33337C1.29848 9.33337 1 9.63185 1 10C1 10.3682 1.29848 10.6667 1.66667 10.6667Z"
                  fill="black"
                />
                <path
                  d="M1.66667 10.6667C2.03486 10.6667 2.33333 10.3682 2.33333 10C2.33333 9.63185 2.03486 9.33337 1.66667 9.33337C1.29848 9.33337 1 9.63185 1 10C1 10.3682 1.29848 10.6667 1.66667 10.6667Z"
                  fill="#4B4B54"
                />
                <path
                  d="M13 6.00004L5 6.00004M13 2.00004L5 2.00004M13 10L5 10M2.33333 6.00004C2.33333 6.36823 2.03486 6.66671 1.66667 6.66671C1.29848 6.66671 1 6.36823 1 6.00004C1 5.63185 1.29848 5.33337 1.66667 5.33337C2.03486 5.33337 2.33333 5.63185 2.33333 6.00004ZM2.33333 2.00004C2.33333 2.36823 2.03486 2.66671 1.66667 2.66671C1.29848 2.66671 1 2.36823 1 2.00004C1 1.63185 1.29848 1.33337 1.66667 1.33337C2.03486 1.33337 2.33333 1.63185 2.33333 2.00004ZM2.33333 10C2.33333 10.3682 2.03486 10.6667 1.66667 10.6667C1.29848 10.6667 1 10.3682 1 10C1 9.63185 1.29848 9.33337 1.66667 9.33337C2.03486 9.33337 2.33333 9.63185 2.33333 10Z"
                  stroke="#4B4B54"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="border px-2 flex justify-between items-center rounded-md bg-[#F2F4F7] h-10 w-20">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.6665 7.33337L1.33313 7.33337M6.66647 2.66671L5.33313 1.33337M9.33313 14.6667L1.33313 14.6667M14.6665 10.6667C14.6665 11.4031 14.0695 12 13.3331 12C12.5968 12 11.9998 11.4031 11.9998 10.6667C11.9998 9.93033 13.3331 8.66671 13.3331 8.66671C13.3331 8.66671 14.6665 9.93033 14.6665 10.6667ZM5.9998 2.00004L10.5789 6.57913C10.8429 6.84314 10.9749 6.97514 11.0244 7.12736C11.0679 7.26126 11.0679 7.40549 11.0244 7.53939C10.9749 7.6916 10.8429 7.82361 10.5789 8.08762L7.50829 11.1582C6.98027 11.6862 6.71626 11.9502 6.41182 12.0492C6.14403 12.1362 5.85557 12.1362 5.58778 12.0492C5.28334 11.9502 5.01933 11.6862 4.4913 11.1582L2.17496 8.84187C1.64694 8.31385 1.38293 8.04984 1.28401 7.7454C1.197 7.47761 1.197 7.18914 1.28401 6.92135C1.38293 6.61691 1.64694 6.3529 2.17496 5.82488L5.9998 2.00004Z"
                  stroke="#4B4B54"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.99966 7.48151L8.51818 10M5.31624 13.9833C4.40502 14.8945 2.66634 14.6667 1.33301 14.6667C2.01641 13.3334 1.10518 11.5947 2.01641 10.6835C2.92763 9.77223 4.40502 9.77223 5.31624 10.6835C6.22746 11.5947 6.22746 13.0721 5.31624 13.9833ZM7.94741 10.6164L14.0388 4.03773C14.5753 3.45828 14.558 2.55843 13.9996 2.00003C13.4412 1.44164 12.5414 1.42434 11.9619 1.96086L5.38323 8.05226C5.04327 8.36704 4.8733 8.52443 4.77416 8.69228C4.53644 9.09479 4.52687 9.5924 4.74895 10.0037C4.84156 10.1753 5.00536 10.3391 5.33297 10.6667C5.66058 10.9943 5.82438 11.1581 5.99593 11.2507C6.40727 11.4728 6.90488 11.4632 7.30739 11.2255C7.47525 11.1264 7.63263 10.9564 7.94741 10.6164Z"
                  stroke="#4B4B54"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="border flex rounded-md items-center justify-center bg-[#F2F4F7] h-10 w-10">
              <svg
                width="10"
                height="16"
                viewBox="0 0 10 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.66634 3.50392V11C8.66634 13.0251 7.02472 14.6667 4.99967 14.6667C2.97463 14.6667 1.33301 13.0251 1.33301 11V3.77782C1.33301 2.42779 2.42742 1.33337 3.77745 1.33337C5.12748 1.33337 6.2219 2.42779 6.2219 3.77782V10.9639C6.2219 11.6389 5.67469 12.1861 4.99967 12.1861C4.32466 12.1861 3.77745 11.6389 3.77745 10.9639V4.43415"
                  stroke="#4B4B54"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <textarea
            className="outline-none w-full h-[142px] rounded-b-md p-2"
            placeholder="Start writing…"
            name=""
            id=""
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
        </div>
      </div>
      {/* <Tags /> */}
      <div className="mt-5 p-4 flex flex-col bg-white rounded-xl border">
        {/* <label htmlFor="category-select">Select a Category:</label> */}
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
        {/* {selectedCategory && (
        <div className="text-xs mt-2">
          <p>Selected Category ID: {selectedCategory.ID}</p>
          <p>Selected Category Name: {selectedCategory.Name}</p>
        </div>
      )} */}
      </div>
      {/* <Pricing /> */}
      <div className="mt-4 p-4 rounded-xl border bg-white">
        <p className="text-lg mb-4">Pricing</p>
        <div className="grid grid-cols-2 gap-x-6">
          <div>
            <p className="text-xs mb-1">Buy Now Price</p>
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
          <div>
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
          </div>
          {/* <div>
          <p className="text-xs mb-1">Accept Offers</p>
          <div className="border rounded flex justify-between h-12">
            <input
              className="flex p-2 items-center rounded-l  outline-none"
              type="text"
              placeholder="Yes/ No"
            />
          </div>
        </div> */}
        </div>
      </div>
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
        <p className="text-lg mb-4">Content</p>
        <div className=" grid grid-cols-1 gap-x-5 rounded-md h-48">
          <div className="border rounded-md">
            <div className="h-10 p-2 border-b bg-slate-200">
              <p>How to Design Better UI</p>
            </div>
            <div className="flex flex-col items-center justify-center h-36">
              <input type="file" onChange={handleFileChange} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end items-center mt-4">
        <Button
          onClick={logEnvDada}
          className="mr-2 border rounded w-36 bg-white text-black hover:bg-slate-200 transition-all duration-200"
        >
          Check Dashboard
        </Button>

        <Button onClick={formSubmit} className="rounded w-36">
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
          <svg
            className="w-4"
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

// const Content = () => {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (event: any) => {
//     const selectedFile = event.target.files[0];
//     setFile(selectedFile);
//   };

//   return (
//     <div className="mt-4 p-4 rounded-xl border bg-white">
//       <p className="text-lg mb-4">Content</p>
//       <div className=" grid grid-cols-1 gap-x-5 rounded-md h-48">
//         <div className="border rounded-md">
//           <div className="h-10 p-2 border-b bg-slate-200">
//             <p>How to Design Better UI</p>
//           </div>
//           <div className="flex flex-col items-center justify-center h-36">
//             <input type="file" onChange={handleFileChange} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Pricing = () => {
//   const [price, setPrice] = useState("");
//   const [comparePrice, setComparePrice] = useState("");
//   return (
//     <div className="mt-4 p-4 rounded-xl border bg-white">
//       <p className="text-lg mb-4">Pricing</p>
//       <div className="grid grid-cols-2 gap-x-6">
//         <div>
//           <p className="text-xs mb-1">Buy Now Price</p>
//           <div className="border rounded flex justify-between h-12">
//             <input
//               className="flex p-2 items-center rounded-l  outline-none"
//               type="text"
//               placeholder="Enter buy now price"
//               onChange={(e) => {
//                 setPrice(e.target.value);
//               }}
//             />
//             <div className="flex items-center justify-center bg-slate-300 rounded-r w-12 h-12">
//               <p>$</p>
//             </div>
//           </div>
//         </div>
//         <div>
//           <p className="text-xs mb-1">Compare Price</p>
//           <div className="border rounded flex justify-between h-12">
//             <input
//               className="flex p-2 items-center rounded-l  outline-none"
//               type="text"
//               placeholder="Enter Limit"
//               onChange={(e) => {
//                 setComparePrice(e.target.value);
//               }}
//             />
//             <div className="flex items-center justify-center bg-slate-300 rounded-r w-12 h-12">
//               <svg
//                 width="8"
//                 height="12"
//                 viewBox="0 0 8 12"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M0.667969 7.99984L4.0013 11.3332L7.33464 7.99984M0.667969 3.99984L4.0013 0.666504L7.33464 3.99984"
//                   stroke="black"
//                   strokeWidth="1.33333"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>
//         {/* <div>
//           <p className="text-xs mb-1">Accept Offers</p>
//           <div className="border rounded flex justify-between h-12">
//             <input
//               className="flex p-2 items-center rounded-l  outline-none"
//               type="text"
//               placeholder="Yes/ No"
//             />
//           </div>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// const Tags = () => {
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [categories, setCategories] = useState<CategoryInterface[]>([]);

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/fetch/categories`
//       );
//       console.log(response.data);
//       setCategories(response.data);
//     } catch (error) {
//       console.log(`You got an error: ${error}`);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const handleChange = (event: any) => {
//     const selectedCategoryId = event.target.value;
//     if (categories) {
//       const selectedCategory = categories.find(
//         (category) => category.ID === parseInt(selectedCategoryId)
//       );
//       // @ts-ignore
//       setSelectedCategory(selectedCategory);
//       console.log(selectedCategory?.ID);
//       console.log(selectedCategory?.Name);
//     }
//   };

//   return (
//     <div className="mt-5 p-4 flex flex-col bg-white rounded-xl border">
//       {/* <label htmlFor="category-select">Select a Category:</label> */}
//       {categories && (
//         <select
//           className=" outline-none"
//           id="category-select"
//           //@ts-ignore
//           value={selectedCategory?.ID || ""}
//           onChange={handleChange}
//         >
//           <option value="">Select a category</option>
//           {categories.map((category) => (
//             <option key={category.ID} value={category.ID}>
//               {category.Name}
//             </option>
//           ))}
//         </select>
//       )}
//       {/* {selectedCategory && (
//         <div className="text-xs mt-2">
//           <p>Selected Category ID: {selectedCategory.ID}</p>
//           <p>Selected Category Name: {selectedCategory.Name}</p>
//         </div>
//       )} */}
//     </div>
//   );
// };

// const AddMedia = () => {
//   const [imageUrl, setImageUrl] = useState<string>("");

//   const handleFileUpload = (fileInfo: any) => {
//     if (fileInfo) {
//       // Get the uploaded file's URL
//       const url = fileInfo.cdnUrl;
//       setImageUrl(url);
//       console.log("Uploaded Image URL:", url); // Log or save this URL to your database
//     } else {
//       console.log("");
//     }
//   };
//   return (
//     <div className="border rounded-xl p-4 mt-5 bg-white">
//       <p>Media</p>
//       <p className="text-xs mt-2 mb-1">
//         Click to upload and slide to switch order:
//       </p>
//       <div className="grid grid-cols-5 gap-x-2 h-44">
//         <div className="border flex flex-col items-center justify-center p-1 text-white  bg-[#4B6161] rounded">
//           {/* <div className="border border-dashed w-full h-full flex items-center justify-center flex-col gap-y-1">
//             <svg
//               width="15"
//               height="17"
//               viewBox="0 0 15 17"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M5.2002 12.9999H9.2002C9.7502 12.9999 10.2002 12.5499 10.2002 11.9999V6.99991H11.7902C12.6802 6.99991 13.1302 5.91991 12.5002 5.28991L7.9102 0.699915C7.81768 0.607211 7.70779 0.533664 7.58682 0.483482C7.46585 0.433301 7.33616 0.407471 7.2052 0.407471C7.07423 0.407471 6.94454 0.433301 6.82357 0.483482C6.7026 0.533664 6.59271 0.607211 6.5002 0.699915L1.9102 5.28991C1.2802 5.91991 1.7202 6.99991 2.6102 6.99991H4.2002V11.9999C4.2002 12.5499 4.6502 12.9999 5.2002 12.9999ZM1.2002 14.9999H13.2002C13.7502 14.9999 14.2002 15.4499 14.2002 15.9999C14.2002 16.5499 13.7502 16.9999 13.2002 16.9999H1.2002C0.650195 16.9999 0.200195 16.5499 0.200195 15.9999C0.200195 15.4499 0.650195 14.9999 1.2002 14.9999Z"
//                 fill="white"
//               />
//             </svg>
//             <p>Add File</p>
//           </div> */}
//           <h1>Upload an Image</h1>
//           <Widget
//             publicKey="ab4119a1f2e826f10103"
//             onChange={handleFileUpload}
//           />
//           {imageUrl && (
//             <div>
//               <h2>Uploaded Image:</h2>
//               <img src={imageUrl} alt="Uploaded" width="300" />
//               <p>Image URL: {imageUrl}</p>
//             </div>
//           )}
//         </div>
//         <div className="border hover:bg-[#F9F9FD] transition-all duration-200 flex items-center justify-center rounded">
//           <svg
//             width="15"
//             height="14"
//             viewBox="0 0 15 14"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M7.60091 1.16675V12.8334M1.76758 7.00008H13.4342"
//               stroke="black"
//               strokeWidth="1.66667"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         </div>
//         <div className="border hover:bg-[#F9F9FD] transition-all duration-200 flex items-center justify-center rounded">
//           <svg
//             width="15"
//             height="14"
//             viewBox="0 0 15 14"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M7.60091 1.16675V12.8334M1.76758 7.00008H13.4342"
//               stroke="black"
//               strokeWidth="1.66667"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         </div>
//         <div className="border hover:bg-[#F9F9FD] transition-all duration-200 flex items-center justify-center rounded">
//           <svg
//             width="15"
//             height="14"
//             viewBox="0 0 15 14"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M7.60091 1.16675V12.8334M1.76758 7.00008H13.4342"
//               stroke="black"
//               strokeWidth="1.66667"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         </div>
//         <div className="border hover:bg-[#F9F9FD] transition-all duration-200 flex items-center justify-center rounded">
//           <svg
//             width="15"
//             height="14"
//             viewBox="0 0 15 14"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M7.60091 1.16675V12.8334M1.76758 7.00008H13.4342"
//               stroke="black"
//               strokeWidth="1.66667"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ProductDescription = () => {
//   // const [title, setTitle] = useState("");
//   // const [description, setDescription] = useState("");

//   return (
//     <div className="border mt-6 h-96 rounded-xl p-4 bg-white">
//       <p className="font-medium text-lg">Describe your product</p>
//       <div className="grid grid-cols-1 gap-x-5 mt-4">
//         <div className="">
//           <p className="text-xs mb-2">Title</p>
//           <input
//             type="text"
//             className="border w-full h-12 p-2 flex items-center rounded outline-none"
//             placeholder="Enter title"
//             onChange={(e) => {
//               setTitle(e.target.value);
//             }}
//           />
//         </div>
//         {/* <div className="">
//           <p className="text-xs mb-2">Tags:</p>
//           <input
//             type="text"
//             className="border w-full h-12 p-2 flex items-center rounded outline-none"
//             placeholder="Enter title"
//           />
//         </div> */}
//       </div>
//       <p className="mt-4 text-xs">Description</p>
//       <div className="mt-2 border rounded-sm h-48">
//         <div className="w-full flex items-center border-b h-12 p-1 gap-x-2">
//           <div className="border flex items-center px-2 justify-between rounded h-10 w-40">
//             <p>Heading 1</p>
//             <svg
//               width="8"
//               height="12"
//               viewBox="0 0 8 12"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M0.667969 7.99984L4.0013 11.3332L7.33464 7.99984M0.667969 3.99984L4.0013 0.666504L7.33464 3.99984"
//                 stroke="black"
//                 strokeWidth="1.33333"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </div>
//           <div className="border items-center px-2 flex justify-between rounded-md bg-[#F2F4F7] h-10 w-28 ml-2">
//             <svg
//               width="11"
//               height="14"
//               viewBox="0 0 11 14"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M1 6.99996H6.33333C7.80609 6.99996 9 5.80605 9 4.33329C9 2.86053 7.80609 1.66663 6.33333 1.66663H1V6.99996ZM1 6.99996H7C8.47276 6.99996 9.66667 8.19387 9.66667 9.66663C9.66667 11.1394 8.47276 12.3333 7 12.3333H1V6.99996Z"
//                 stroke="#4B4B54"
//                 strokeWidth="1.4"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>

//             <svg
//               width="12"
//               height="14"
//               viewBox="0 0 12 14"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M10.6663 1.66663H4.66634M7.33301 12.3333H1.33301M7.99967 1.66663L3.99967 12.3333"
//                 stroke="#4B4B54"
//                 strokeWidth="1.4"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//             <svg
//               width="16"
//               height="16"
//               viewBox="0 0 16 16"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M4 10.6666C4 12.1394 5.19391 13.3333 6.66667 13.3333H9.33333C10.8061 13.3333 12 12.1394 12 10.6666C12 9.19387 10.8061 7.99996 9.33333 7.99996M12 5.33329C12 3.86053 10.8061 2.66663 9.33333 2.66663H6.66667C5.19391 2.66663 4 3.86053 4 5.33329M2 7.99996H14"
//                 stroke="#4B4B54"
//                 strokeWidth="1.4"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//             <svg
//               width="14"
//               height="14"
//               viewBox="0 0 14 14"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M10.9993 1.66675V6.33341C10.9993 8.54255 9.20849 10.3334 6.99935 10.3334C4.79021 10.3334 2.99935 8.54255 2.99935 6.33341V1.66675M1.66602 13.0001H12.3327"
//                 stroke="#4B4B54"
//                 strokeWidth="1.4"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </div>
//           <div className="border flex justify-between rounded-md bg-[#F2F4F7] h-10 w-28 items-center px-2">
//             <svg
//               width="14"
//               height="13"
//               viewBox="0 0 14 13"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M7 5.16672H1M7 1.66672L1 1.66672M13 8.83338H1M13 12.3334H1M12.1467 0.973383L9.56889 2.90672C9.37589 3.05146 9.2794 3.12384 9.24489 3.21256C9.21467 3.29027 9.21467 3.37649 9.24489 3.45421C9.2794 3.54293 9.37589 3.6153 9.56889 3.76005L12.1467 5.69338C12.4213 5.89937 12.5586 6.00237 12.6736 5.99998C12.7736 5.9979 12.8674 5.95099 12.9291 5.87222C13 5.78169 13 5.61003 13 5.26672V1.40005C13 1.05673 13 0.885076 12.9291 0.79455C12.8674 0.715772 12.7736 0.668868 12.6736 0.666789C12.5586 0.664399 12.4213 0.767394 12.1467 0.973383Z"
//                 stroke="#4B4B54"
//                 strokeWidth="1.2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//             <svg
//               width="14"
//               height="13"
//               viewBox="0 0 14 13"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M13 5.16672H7M13 1.66672L7 1.66672M13 8.83338H1M13 12.3334H1M1.85333 0.973383L4.43111 2.90672C4.62411 3.05146 4.7206 3.12384 4.75511 3.21256C4.78533 3.29027 4.78533 3.37649 4.75511 3.45421C4.7206 3.54293 4.62411 3.6153 4.43111 3.76005L1.85333 5.69338C1.57868 5.89937 1.44135 6.00237 1.3264 5.99998C1.22637 5.9979 1.13256 5.95099 1.07088 5.87222C1 5.78169 1 5.61003 1 5.26672V1.40005C1 1.05673 1 0.885076 1.07088 0.79455C1.13256 0.715772 1.22637 0.668868 1.3264 0.666789C1.44135 0.664399 1.57868 0.767394 1.85333 0.973383Z"
//                 stroke="#4B4B54"
//                 strokeWidth="1.2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//             <svg
//               width="14"
//               height="12"
//               viewBox="0 0 14 12"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M13 4.66663H7.66667M13 1.99996H7.66667M13 7.33329H7.66667M13 9.99996H7.66667M3 11.3333L3 0.666626M3 11.3333L1 9.33329M3 11.3333L5 9.33329M3 0.666626L1 2.66663M3 0.666626L5 2.66663"
//                 stroke="#4B4B54"
//                 strokeWidth="1.2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//             <svg
//               width="14"
//               height="12"
//               viewBox="0 0 14 12"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M1.66667 6.66671C2.03486 6.66671 2.33333 6.36823 2.33333 6.00004C2.33333 5.63185 2.03486 5.33337 1.66667 5.33337C1.29848 5.33337 1 5.63185 1 6.00004C1 6.36823 1.29848 6.66671 1.66667 6.66671Z"
//                 fill="black"
//               />
//               <path
//                 d="M1.66667 6.66671C2.03486 6.66671 2.33333 6.36823 2.33333 6.00004C2.33333 5.63185 2.03486 5.33337 1.66667 5.33337C1.29848 5.33337 1 5.63185 1 6.00004C1 6.36823 1.29848 6.66671 1.66667 6.66671Z"
//                 fill="#4B4B54"
//               />
//               <path
//                 d="M1.66667 2.66671C2.03486 2.66671 2.33333 2.36823 2.33333 2.00004C2.33333 1.63185 2.03486 1.33337 1.66667 1.33337C1.29848 1.33337 1 1.63185 1 2.00004C1 2.36823 1.29848 2.66671 1.66667 2.66671Z"
//                 fill="black"
//               />
//               <path
//                 d="M1.66667 2.66671C2.03486 2.66671 2.33333 2.36823 2.33333 2.00004C2.33333 1.63185 2.03486 1.33337 1.66667 1.33337C1.29848 1.33337 1 1.63185 1 2.00004C1 2.36823 1.29848 2.66671 1.66667 2.66671Z"
//                 fill="#4B4B54"
//               />
//               <path
//                 d="M1.66667 10.6667C2.03486 10.6667 2.33333 10.3682 2.33333 10C2.33333 9.63185 2.03486 9.33337 1.66667 9.33337C1.29848 9.33337 1 9.63185 1 10C1 10.3682 1.29848 10.6667 1.66667 10.6667Z"
//                 fill="black"
//               />
//               <path
//                 d="M1.66667 10.6667C2.03486 10.6667 2.33333 10.3682 2.33333 10C2.33333 9.63185 2.03486 9.33337 1.66667 9.33337C1.29848 9.33337 1 9.63185 1 10C1 10.3682 1.29848 10.6667 1.66667 10.6667Z"
//                 fill="#4B4B54"
//               />
//               <path
//                 d="M13 6.00004L5 6.00004M13 2.00004L5 2.00004M13 10L5 10M2.33333 6.00004C2.33333 6.36823 2.03486 6.66671 1.66667 6.66671C1.29848 6.66671 1 6.36823 1 6.00004C1 5.63185 1.29848 5.33337 1.66667 5.33337C2.03486 5.33337 2.33333 5.63185 2.33333 6.00004ZM2.33333 2.00004C2.33333 2.36823 2.03486 2.66671 1.66667 2.66671C1.29848 2.66671 1 2.36823 1 2.00004C1 1.63185 1.29848 1.33337 1.66667 1.33337C2.03486 1.33337 2.33333 1.63185 2.33333 2.00004ZM2.33333 10C2.33333 10.3682 2.03486 10.6667 1.66667 10.6667C1.29848 10.6667 1 10.3682 1 10C1 9.63185 1.29848 9.33337 1.66667 9.33337C2.03486 9.33337 2.33333 9.63185 2.33333 10Z"
//                 stroke="#4B4B54"
//                 strokeWidth="1.2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </div>
//           <div className="border px-2 flex justify-between items-center rounded-md bg-[#F2F4F7] h-10 w-20">
//             <svg
//               width="16"
//               height="16"
//               viewBox="0 0 16 16"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M10.6665 7.33337L1.33313 7.33337M6.66647 2.66671L5.33313 1.33337M9.33313 14.6667L1.33313 14.6667M14.6665 10.6667C14.6665 11.4031 14.0695 12 13.3331 12C12.5968 12 11.9998 11.4031 11.9998 10.6667C11.9998 9.93033 13.3331 8.66671 13.3331 8.66671C13.3331 8.66671 14.6665 9.93033 14.6665 10.6667ZM5.9998 2.00004L10.5789 6.57913C10.8429 6.84314 10.9749 6.97514 11.0244 7.12736C11.0679 7.26126 11.0679 7.40549 11.0244 7.53939C10.9749 7.6916 10.8429 7.82361 10.5789 8.08762L7.50829 11.1582C6.98027 11.6862 6.71626 11.9502 6.41182 12.0492C6.14403 12.1362 5.85557 12.1362 5.58778 12.0492C5.28334 11.9502 5.01933 11.6862 4.4913 11.1582L2.17496 8.84187C1.64694 8.31385 1.38293 8.04984 1.28401 7.7454C1.197 7.47761 1.197 7.18914 1.28401 6.92135C1.38293 6.61691 1.64694 6.3529 2.17496 5.82488L5.9998 2.00004Z"
//                 stroke="#4B4B54"
//                 strokeWidth="1.2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//             <svg
//               width="16"
//               height="16"
//               viewBox="0 0 16 16"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M5.99966 7.48151L8.51818 10M5.31624 13.9833C4.40502 14.8945 2.66634 14.6667 1.33301 14.6667C2.01641 13.3334 1.10518 11.5947 2.01641 10.6835C2.92763 9.77223 4.40502 9.77223 5.31624 10.6835C6.22746 11.5947 6.22746 13.0721 5.31624 13.9833ZM7.94741 10.6164L14.0388 4.03773C14.5753 3.45828 14.558 2.55843 13.9996 2.00003C13.4412 1.44164 12.5414 1.42434 11.9619 1.96086L5.38323 8.05226C5.04327 8.36704 4.8733 8.52443 4.77416 8.69228C4.53644 9.09479 4.52687 9.5924 4.74895 10.0037C4.84156 10.1753 5.00536 10.3391 5.33297 10.6667C5.66058 10.9943 5.82438 11.1581 5.99593 11.2507C6.40727 11.4728 6.90488 11.4632 7.30739 11.2255C7.47525 11.1264 7.63263 10.9564 7.94741 10.6164Z"
//                 stroke="#4B4B54"
//                 strokeWidth="1.2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </div>
//           <div className="border flex rounded-md items-center justify-center bg-[#F2F4F7] h-10 w-10">
//             <svg
//               width="10"
//               height="16"
//               viewBox="0 0 10 16"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M8.66634 3.50392V11C8.66634 13.0251 7.02472 14.6667 4.99967 14.6667C2.97463 14.6667 1.33301 13.0251 1.33301 11V3.77782C1.33301 2.42779 2.42742 1.33337 3.77745 1.33337C5.12748 1.33337 6.2219 2.42779 6.2219 3.77782V10.9639C6.2219 11.6389 5.67469 12.1861 4.99967 12.1861C4.32466 12.1861 3.77745 11.6389 3.77745 10.9639V4.43415"
//                 stroke="#4B4B54"
//                 strokeWidth="1.2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </div>
//         </div>
//         <textarea
//           className="outline-none w-full h-[142px] rounded-b-md p-2"
//           placeholder="Start writing…"
//           name=""
//           id=""
//           onChange={(e) => {
//             setDescription(e.target.value);
//           }}
//         ></textarea>
//       </div>
//     </div>
//   );
// };

// const Variants = () => {
//   return (
//     <div className="mt-4 p-4 rounded-xl border bg-white">
//       <p className="text-lg mb-4">Variants</p>
//       <div className="border rounded-md h-32 flex items-center justify-center shadow-[inset_5px_2px_28px_rgba(0,0,0,0.1)]">
//         <button className="bg-black rounded-lg h-12 w-32 text-white hover:bg-gray-600 transition-all duration-300">
//           Add Variants
//         </button>
//       </div>
//     </div>
//   );
// };

// const Sales = () => {
//   return (
//     <div className="mt-4 p-4 rounded-xl border bg-white">
//       <p className="text-lg mb-4">Sales</p>
//       <div className="grid grid-cols-3 gap-x-6">
//         <div>
//           <p className="text-xs mb-1">Enable Unlimited Sales</p>
//           <div className="border rounded flex justify-between h-12">
//             <input
//               className="flex p-2 items-center rounded-l  outline-none"
//               type="text"
//               placeholder="Enter buy now price"
//             />
//             <div className="flex items-center justify-center bg-slate-300 rounded-r w-12 h-12">
//               <p>$</p>
//             </div>
//           </div>
//         </div>
//         <div>
//           <p className="text-xs mb-1">Set Sales Limit per User</p>
//           <div className="border rounded flex justify-between h-12">
//             <input
//               className="flex p-2 items-center rounded-l  outline-none"
//               type="text"
//               placeholder="Enter Limit"
//             />
//             <div className="flex items-center justify-center bg-slate-300 rounded-r w-12 h-12">
//               <svg
//                 width="8"
//                 height="12"
//                 viewBox="0 0 8 12"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M0.667969 7.99984L4.0013 11.3332L7.33464 7.99984M0.667969 3.99984L4.0013 0.666504L7.33464 3.99984"
//                   stroke="black"
//                   strokeWidth="1.33333"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>
//         <div>
//           <p className="text-xs mb-1">End Sale On</p>
//           <div className="border rounded flex justify-between h-12">
//             <input
//               className="flex p-2 items-center rounded-l  outline-none"
//               type="text"
//               placeholder="Yes/ No"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

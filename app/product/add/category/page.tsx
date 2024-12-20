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

const uploadcarekey = process.env.NEXT_PUBLIC_UPLOADCARE_KEY || "";
export default function ProductUpload() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [comparePrice, setComparePrice] = useState("");
  const [file, setFile] = useState(null);
  const [newDescription, setNewDescription] = useState("");

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
      // Get the uploaded file's URL
      const url = fileInfo.cdnUrl;
      setImageUrl(url);
      // console.log("Uploaded Image URL:", url); // Log or save this URL to your database
    } else {
      console.log("No files");
    }
  };

  // for Tags
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [categoryName, setCategoryName] = useState<string | undefined>("");
  const [categoryId, setCategoryId] = useState<string | number | undefined>();
  const userWalletAddress = useRecoilValue(phantomWallet);
  const [userId, setUserId] = useState(0);

  const fetchUserId = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/fetch/user/${userWalletAddress}`
      );
      // console.log(response.data);
      setUserId(response.data.id);
      // console.log(response.data.id);
    } catch (error) {
      console.log(`You got error while fetching UserId: ${error}`);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SWAGGER_API_V2}/fetch/categories`
      );
      // console.log(response.data);
      setCategories(response.data);
    } catch (error) {
      console.log(`You got an error: ${error}`);
    }
  };

  useEffect(() => {
    fetchUserId();
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
          description: newDescription,
          price: price,
          compare_price: comparePrice,
          thumbnail_url: imageUrl,
          user_id: userId,
          category_id: categoryId,
          status: 1,
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
      <div className="mt-5  flex justify-between items-center">
        <div className=" w-fit">
          <div className="flex gap-x-2 items-center ">
            {/* <svg
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
          </svg> */}

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
        <p className="mt-3 text-xs mb-2">Description</p>

        <MarkdownEditor
          initialValue=""
          onChange={handleMarkdownChange}
          minHeight={300}
        />
      </div>
      {/* <Tags /> */}
      <div className="mt-5 p-4 flex flex-col bg-white rounded-xl border">
        {/* <label htmlFor="category-select">Select a Category:</label> */}
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
        {/* {selectedCategory && (
        <div className="text-xs mt-2">
          <p>Selected Category ID: {selectedcategory.ID}</p>
          <p>Selected Category Name: {selectedcategory.Name}</p>
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
        <p className="text-lg mb-4">Upload Content</p>
        <div className=" grid grid-cols-1 gap-x-5 rounded-md h-48">
          <div className="border rounded-md">
            <div className="h-10 p-2 border-b bg-slate-200">
              <p>Content Being Bought</p>
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

"use client";

import { CategoryInterface, ProductInterface } from "@/lib/models";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Widget } from "@uploadcare/react-widget";
import { useRecoilValue } from "recoil";
import { phantomWallet } from "@/store/atom/phantomWallet";
import MarkdownEditor from "../MarkdownEditor";
import { useRouter } from "next/navigation";

const uploadcarekey = process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY || "";

export default function EditProduct({ productId }: { productId: number }) {
  const router = useRouter();

  const [id, setId] = useState(productId);
  const [product, setProduct] = useState<ProductInterface>();
  const [isLoading, setLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [categoryName, setCategoryName] = useState<string | undefined>("");
  const [categoryId, setCategoryId] = useState<number | string | undefined>();

  const [userId, setUserId] = useState<number | undefined>();
  const [title, setTitle] = useState<string | undefined>("");
  const [description, setDescription] = useState<string | undefined>("");
  const [price, setPrice] = useState<string | undefined>();
  const [comparePrice, setComparePrice] = useState<string | undefined>("");
  const [currentImage, setCurrentImage] = useState<string | undefined>("");
  const [file, setFile] = useState(null);
  const [newDescription, setNewDescription] = useState<string | undefined>("");

  const [isEditing, setIsEditing] = useState(false);

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
      setCurrentImage(url);
      setImageUrl(url);
    } else {
      console.log("No files");
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/fetch/categories`
      );

      setCategories(response.data);
    } catch (error) {
      console.log(`You got an error: ${error}`);
    }
  };
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

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/fetch/products?product_id=${id}`
      );
      setProduct(response.data[0]);
      console.log(response.data[0]);
      setLoading(false);
    } catch (error) {
      console.log(
        `You got an error while fetching the product details: ${error}`
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id > 0) {
      fetchProduct();
    }
  }, [id]);

  useEffect(() => {
    if (product) {
      setTitle(product.name);
      setPrice(product.price);
      setComparePrice(product.compare_price);
      setCurrentImage(product.thumbnail_url);
      setUserId(product.user_id);
    }
  }, [product]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const editProduct = async () => {
    try {
      setIsEditing(true);
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/product/${productId}`,
        {
          name: title,
          description: newDescription,
          price: price,
          compare_price: comparePrice,
          user_id: userId,
          category_id: categoryId,
          thumbnail_url: currentImage,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setIsEditing(false);
      router.push("/seller/products");
      return response.data;
    } catch (error) {
      console.log(`Error while making the edit call: ${error}`);
      setIsEditing(false);
    }
  };

  return (
    <>
      {isLoading && <div>loading</div>}
      {product && (
        <div className="pb-20 px-5 lg:px-10 xl:px-20 relative overflow-y-auto hide-scrollbar h-[90vh] scroll-smooth ">
          <div className="mt-5  flex ">
            <div className=" w-full">
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

                <p className="font-bold text-3xl italic">EDIT PRODUCT</p>
              </div>
              <p>List your product on Sendit here.</p>
            </div>
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
                  value={title}
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
              initialValue={product.description}
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
                    value={price}
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
                    value={comparePrice}
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
            </div>
          </div>
          {/* <AddMedia /> */}
          <div className="border rounded-xl p-4 mt-5 bg-white">
            <p>Media</p>
            <p className="text-xs mt-2 mb-1">
              Click to upload and slide to switch order:
            </p>
            <div className="mt-2 mb-1 grid grid-cols-2">
              <p className="text-sm">Upload New Image</p>
              <p className="text-sm">Current Image</p>
            </div>
            <div className="grid grid-cols-2  gap-x-2 gap-y-2">
              <div className="border flex flex-col items-center justify-center p-1 text-white bg-[#4B6161] rounded relative">
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

              {currentImage && (
                <div className="relative inset-0 rounded border border-[#ccccce] overflow-hidden">
                  {/* Image container */}
                  <img
                    src={currentImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
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
            <Button className="mr-2 border rounded w-36 bg-white text-black hover:bg-slate-200 transition-all duration-200">
              Check Dashboard
            </Button>

            <Button onClick={editProduct} className="rounded w-36">
              {isEditing ? "Making Changes…" : "Edit"}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

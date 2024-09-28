"use client";

import { useState } from "react";
import axios from "axios";

import { User } from "@/lib/models";
import { ProductInterface } from "@/lib/models";
export default function TestSwagger() {
  const [walletAddress, setWalletAddress] = useState("");
  const [user, setUser] = useState<User>();
  const [categories, setCategories] = useState();
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [product, setProducts] = useState<ProductInterface[]>([]);

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/fetch/users?wallet_address=${walletAddress}`
      );
      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      console.log(`and here you got an error: ${error}`);
    }
  };

  const createUser = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/signup`,
        { wallet_address: walletAddress }
      );
      console.log(response.data);
    } catch (err) {
      console.log(`You got an error: ${err}`);
    }
  };

  // Categories
  const getCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/fetch/categories`
      );
      setCategories(response.data);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/fetch/products`
      );
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.log(`Error while fetching products: ${error}`);
    }
  };

  const createCategories = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_SWAGGER_URL}/category`,
        {
          description: description,
          name: name,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(`Error:${error}`);
    }
  };

  return (
    <div className="pt-16 border ">
      <h1>Testing Different Swagger APIs Enpoints</h1>
      {/* Testing Users Endpoints */}
      <div className="border rounded w-96 p-2">
        <p>Get User</p>
        <input
          type="text"
          placeholder="wallet address"
          className="border rounded p-1 border-black"
          onChange={(e) => {
            setWalletAddress(e.target.value);
          }}
        />
        <button
          onClick={getUser}
          className="border p-1 rounded bg-black text-white"
        >
          Get User
        </button>
        {user && <p className="w-fit text-wrap">{JSON.stringify(user)}</p>}
      </div>
      <div className="border rounded w-96 p-2">
        <p>Create User</p>
        <input
          type="text"
          placeholder="wallet address"
          className="border rounded p-1 border-black"
          onChange={(e) => {
            setWalletAddress(e.target.value);
          }}
        />
        <button
          onClick={createUser}
          className="border p-1 rounded bg-black text-white"
        >
          Create User
        </button>
        {user && <p className="w-fit text-wrap">{JSON.stringify(user)}</p>}
      </div>

      {/* Fetch Categories */}
      <div className="border rounded w-96 p-2">
        <p>Categories</p>
        <input
          type="text"
          placeholder="Category Description"
          className="border rounded p-1 border-black"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Category Name"
          className="border rounded p-1 border-black"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <button
          onClick={createCategories}
          className="border p-1 rounded bg-black text-white"
        >
          Post Category
        </button>
        <button
          onClick={getCategories}
          className="border p-1 rounded bg-black text-white"
        >
          Get Categories
        </button>
        {categories && (
          <p className="w-fit text-wrap">{JSON.stringify(categories)}</p>
        )}
      </div>
      <div className="border rounded w-96 p-2">
        <p>Products</p>
        {/* <input
          type="text"
          placeholder="Category Description"
          className="border rounded p-1 border-black"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Category Name"
          className="border rounded p-1 border-black"
          onChange={(e) => {
            setName(e.target.value);
          }}
        /> */}

        {/* <button
          onClick={createCategories}
          className="border p-1 rounded bg-black text-white"
        >
          Post Category
        </button> */}
        <button
          onClick={fetchProducts}
          className="border p-1 rounded bg-black text-white"
        >
          Get Products
        </button>
        {product &&
          product.map((elem, key) => {
            return (
              <div key={key} className="border w-96 p-1 rounded">
                <p className="w-fit text-wrap">{JSON.stringify(elem)}</p>
                <p>{`${
                  elem.ThumbnailUrl
                } and type is: ${typeof elem.ThumbnailUrl}`}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import Loader from "@/public/loaders/loader.svg";

const Test = () => {
  const [userAddress, setUserAddress] = useState("");
  const [position, setPosition] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserPosition = async () => {
    setError("");
    try {
      setIsLoading(true);
      const response = await fetch("/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userAddress }),
      });

      if (!response.ok) {
        setIsLoading(false);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setIsLoading(false);
      setPosition(data);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
      setError("Failed to fetch user position");
    }
  };

  return (
    <div className="text-black flex justify-center flex-col w-fit p-2 border border-black">
      <p>Testing Query endpoints</p>
      <input
        type="text"
        value={userAddress}
        onChange={(e) => setUserAddress(e.target.value)}
        placeholder="Enter user address"
        className="text-black my-4 border rounded-full border-black p-2 flex items-center"
      />
      <button
        className="bg-blue-300 mx-4 rounded px-2 text-black"
        onClick={fetchUserPosition}
      >
        Test
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {isLoading && (
        <div className="w-full flex justify-center">
          <Image className=" w-10" src={Loader} alt="" />
        </div>
      )}
      {position && (
        <div className=" overflow-y-auto overflow-hidden h-[300px] border">
          <pre>{JSON.stringify(position, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Test;

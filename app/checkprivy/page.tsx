"use client";

import { userIdState } from "@/store/atom/userIdState";
import { usePrivy } from "@privy-io/react-auth";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export default function CheckPrivy() {
  const { getAccessToken, user } = usePrivy();
  const [accesstoken, settoken] = useState("");
  const userId = useRecoilValue(userIdState);
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getAccessToken();
        if (token) {
          settoken(token);
        }
      } catch (error) {
        console.log("error");
      }
    };
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SWAGGER_API_V2}/fetch/categories`
        );
        console.log(response.data);
      } catch (error) {
        console.log(`Error occured while fetching the categories: ${error}`);
      }
    };
    fetchToken();
    fetchCategories();
  }, []);

  return (
    <div className="border pt-16 flex flex-col h-52 ">
      <p>{accesstoken ? accesstoken : "Nothing found"}</p>
      <p>{user?.id ? user.id : "no id"}</p>
      <p>{userId}</p>
      <p>
        {user?.wallet?.address
          ? user.wallet.address
          : "No wallet address found"}
      </p>
    </div>
  );
}

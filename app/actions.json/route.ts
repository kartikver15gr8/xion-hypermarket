import { createActionHeaders, type ActionsJson } from "@solana/actions";

export const GET = async () => {
  const payload: ActionsJson = {
    rules: [
      {
        pathPattern: "/product/TOP_100_VCs_LIST",
        apiPath: "/api/actions/buy/**",
      },
      {
        pathPattern: "/product/**",
        apiPath: "https://hypermarket.vercel.app/api/actions/buy/**",
      },
      {
        pathPattern: "/product/**",
        apiPath: "https://sendit.markets/api/actions/blinks/**",
      },
      {
        pathPattern: "/product/**",
        apiPath: "https://hypermarket.vercel.app/blinks/product/**",
      },
    ],
  };

  return Response.json(payload, {
    headers: createActionHeaders(),
  });
};

export const OPTIONS = GET;

import { createActionHeaders, type ActionsJson } from "@solana/actions";

export const GET = async () => {
  const payload: ActionsJson = {
    // rules: [
    //   {
    //     pathPattern: "/product/TOP_100_VCs_LIST",
    //     apiPath: "/api/actions/buy/**",
    //   },
    //   {
    //     pathPattern: "/product/**",
    //     apiPath: "https://hypermarket.vercel.app/api/actions/buy/**",
    //   },
    //   {
    //     pathPattern: "/product/**",
    //     apiPath: "https://sendit.markets/api/actions/blinks/**",
    //   },
    //   {
    //     pathPattern: "/product/**",
    //     apiPath: "https://hypermarket.vercel.app/blinks/product/**",
    //   },
    // {
    //   pathPattern: "/product/**",
    //   apiPath: "https://api.sendit.markets/api/v1/blinks/product/**",
    // },
    // ],

    rules: [
      {
        pathPattern: "/product/**",
        apiPath: "https://blinks.sendit.markets/api/actions/product/**",
      },
    ],
  };

  return Response.json(payload, {
    headers: createActionHeaders(),
  });
};

export const OPTIONS = GET;

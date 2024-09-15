import localFont from "next/font/local";

export const teachersFont = localFont({
  src: [
    {
      path: "./teachers/Teachers.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./teachers/Teachers-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./teachers/Teachers-Bold.ttf",
      weight: "700",
      style: "normal",
    },

    // Add other variations if available, e.g.:
    // {
    //   path: './fonts/Teachers-Bold.ttf',
    //   weight: '700',
    //   style: 'normal',
    // },
  ],
  variable: "--font-teachers",
});

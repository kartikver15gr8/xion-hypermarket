import { Metadata } from "next";

const TITLE = "Hyper Market - Sell Everything, Buy Everything";
const DESCRIPTION =
  "Hyper Market, best platform that lets you purchase any digital asset on unbelievable discounts. buy or sell anything with crypto!";

const PREVIEW_IMAGE_URL = "https://sendit-web.vercel.app/opengraph-image.png";
const ALT_TITLE = "hyper market";
const BASE_URL = "https://sendit-web.vercel.app";

export const siteConfig: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  icons: {
    icon: "/favicon.ico",
  },
  applicationName: "Sendit",
  creator: "Sendit",
  twitter: {
    creator: "@SenditZone",
    title: TITLE,
    description: DESCRIPTION,
    card: "summary_large_image",
    images: [
      {
        url: PREVIEW_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: ALT_TITLE,
      },
    ],
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Sendit zone",
    url: BASE_URL,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: PREVIEW_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: ALT_TITLE,
      },
    ],
  },
  category: "Technology",
  alternates: {
    canonical: BASE_URL,
  },
  keywords: [
    "crypto discounts",
    "crypto",
    "cryptos",
    "web3",
    "blockchain",
    "buy crypto",
    "sell crypto",
    "assets on sale",
    "bitcoin",
    "ethereum",
    "solana",
    "cosmos",
    "neutron",
    "gumroad",
    "digital assets",
    "pdfs, ebooks, skins, etc",
  ],
  metadataBase: new URL(BASE_URL),
};

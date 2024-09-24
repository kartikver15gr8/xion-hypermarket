interface BlinksProduct {
  id: number | string;
  icon: string;
  label: string;
  description: string;
  title: string;
  amount: string | number;
}

export const products: BlinksProduct[] = [
  {
    id: 0,
    icon: "https://hypermarket.vercel.app/_next/static/media/hotproductone.c08b0dfa.svg",
    label: "Buy me a coffee",
    description: "The Ultimate resource for startups & entrepreneurs",
    title: "Top 100 VCs list",
    amount: 0.2,
  },
  {
    id: 1,
    icon: "https://hypermarket.vercel.app/_next/static/media/mevbots.b8d67f73.svg",
    label: "Buy me a coffee",
    description:
      "Software tools that analyze arbitrage opportunties across DeFi",
    title: "MEV Bots",
    amount: 0.002,
  },
  {
    id: 2,
    icon: "https://hypermarket.vercel.app/_next/static/media/telegraminsider.6144f9d1.svg",
    label: "Buy me a coffee",
    description:
      "This group is your go-to hub for the latest meme coin picks, trending coins",
    title: "Telegram Group Insider",
    amount: 0.002,
  },
  {
    id: 3,
    icon: "https://hypermarket.vercel.app/_next/static/media/raindropapeicon.b1de0eb5.svg",
    label: "Buy me a coffee",
    description: "Crypto Monks",
    title: "Crypto Monks",
    amount: 0.002,
  },
];

"use client";
import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import Image from "next/image";

// const reviews = [
//   {
//     name: "Jack",
//     username: "@jack",
//     body: "I've never seen anything like this before. It's amazing. I love it.",
//     img: "https://avatar.vercel.sh/jack",
//   },
//   {
//     name: "Jill",
//     username: "@jill",
//     body: "I don't know what to say. I'm speechless. This is amazing.",
//     img: "https://avatar.vercel.sh/jill",
//   },
//   {
//     name: "John",
//     username: "@john",
//     body: "I'm at a loss for words. This is amazing. I love it.",
//     img: "https://avatar.vercel.sh/john",
//   },
//   {
//     name: "Jane",
//     username: "@jane",
//     body: "I'm at a loss for words. This is amazing. I love it.",
//     img: "https://avatar.vercel.sh/jane",
//   },
//   {
//     name: "Jenny",
//     username: "@jenny",
//     body: "I'm at a loss for words. This is amazing. I love it.",
//     img: "https://avatar.vercel.sh/jenny",
//   },
//   {
//     name: "James",
//     username: "@james",
//     body: "I'm at a loss for words. This is amazing. I love it.",
//     img: "https://avatar.vercel.sh/james",
//   },
// ];

const reviews = [
  {
    coin: "NTRN",
    name: "Neutron",
    imgURL:
      "https://s3-alpha-sig.figma.com/img/158b/5d41/0844a8804f038ded80515e2d37d89c9e?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GfktH~SI~O2sk3ldyoGPG2ncepCdB024cC8x13pMBEuW6LnLf0sxNu6B5co0f87tVekBqgkmtirZ~CDGOleNJvE68bRVWpO~5bxsfQlljCQt5ipK8aSXk6E3XrrcPzn77gS0ZQqdeN-XMNpHab8z19JppJfi39LRtQzqWSi-ZrTy0xDY25f2Zednk9lCROZeWFqvgkQvkggskIefPkD7Tlgl7FfK-YVOpH8WzS5lVP91qL8gZARtyfZGAdhJ9-E0AHv4K~UEjk25i9B0NkyoouMTbLtPHsAVTNUlM5flKT4IIlUcg7FG9CYh~Rsf4hddsEpcThOKOCGV3ASRwHzq7A__",
  },
  {
    coin: "ATOM",
    name: "Atom",
    imgURL:
      "https://s3-alpha-sig.figma.com/img/8e35/7264/d5eae1c0c75008e4a4d625edee58f3b9?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eRKswnLeCuC8zuGmviuzIn0KJR7naTfMm0VIIdjjD4BPqmJSgXgb~RiD6Ddqj2vHsiZKQQV6cLyHKDx8MJVNRAg6RJ--0nq1JKCU52To9kZNTX3TV0qCt0DNZjz4DoLKtYpl6NuJIHyUhCl562wi6r4vTp6o4StqjHaqlXQizaXC10QTN3aY7R1r-3hsO-1X8MbmaW9bzz1TIw5sBlkRctMhKnu7i60WxqyQvrFLwCgqq7hWYRdCbvmSLMPtS3i4qmNS-khFCNxepPjAlCexqDnCvJaXJRyK1ccZemr9nAvXRjMz~0Ks5P7o4bQNt60Ln9g64WTiGSLylneZXybFWA__",
  },
  {
    coin: "OSMO",
    name: "Osmosis",
    imgURL:
      "https://s3-alpha-sig.figma.com/img/e5bd/cd9e/efdfa1f9320d86ba65900f10d863ea86?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Wj5Yj0K8VCCWPXuEG6TSka0PJuD6hCQy0gAJY-jQPHo-UsP8QruQyd6hZ5kmHr2YrIORgqSZzyi7Xj~6wu4WT9W1u950pQPGrRcr7iBQTex4WHS54vMHvnEhoFa72vYgPxtBgFahpRYwXuv7kv5gVR5-PKv1FQlfh1p017lM~Q3vX1KnPTtM8vomWKp49qoPbUZnW73hPgdE~PmuqmVcdYKE9z61bhI6UBGiAJSIewpGSJ~nt6FxR3BLmayCq-lY4MTuKbxJ92zK8RaE-nVa8hiJWpXMJryZqaxQSrwrO80ZvS70ARPczCVCL18h4hFSydeSFSJFLY6hgiYBPmQXRQ__",
  },
  {
    coin: "SOL",
    name: "Solana",
    imgURL:
      "https://s3-alpha-sig.figma.com/img/e52d/6858/59e06fc72cf5593828ededd55ccdd5ce?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kW-R-38zXemX9as5x3spJpzgPsyNRswfVwIs3b4Ui8YKZDpp~eTyk1o09CqHjTTFWGh9wE~oxjAXMONFcFW48AdLX1xxQa3FsDsf1ImU16Flzb5Z9VUEDkLHibS0O7cwJK7mqT3XsmTlU2nLnpu34nUM4K-ewrZ1ivLUknnlTxhFny3hnZaksjICLjCyW6rgnu68CGo4W9bBR7ZyvmR8LFy0B2lo~K3Fc1iMLL0nE-SIPEswJqvkubYnoPT1Zn1jG0TGm-z16beuOOvGg91FlXmwJqesSLScQ~MHTnL1SAGdNL6SNStYd~tG1FAq10lgte5CZvFLMig6-8Y2jCZK~A__",
  },
  {
    coin: "TIA",
    name: "Celestia",
    imgURL:
      "https://s3-alpha-sig.figma.com/img/eb65/1c54/ccd07c2538f01379a865ccb83e021a5b?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=p4s9UujLyySt5pdxJjC0MJpzTUO0RdPa74ZmyvcsptXlWKC7T3wLClv40XLj669E~-Gs2odSHCCkwTIKi9ud50HIueEW9-iY0HbVFIM5PEeQivY-Np6-aJB67-soeh93AUah7~S47aWoNCuBJS3fGSTY6qLkzVLshOo6Hemms1y8bOnxvxY0fIPRNIlBFck1hTTMe4Fe5PGZy8N8DZNPUtN615PcF0xfOpcOefbjSWYjl2CJZwoIOWe7eFTpjAmnZDvjy0wGAwY5zLc69eYvDikRpY3hWKGAe-SgY~yY7HyuQ8HC8dSSodIny8NZJLvqSpGBuaViz3CQApRaJu~VkQ__",
  },
  {
    coin: "BTC",
    name: "Bitcoin",
    imgURL:
      "https://s3-alpha-sig.figma.com/img/1c9a/df3b/df39b496387702548ef1d93e6755c4b8?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=O0HNhKMCopVlpe7vldFZNO~IJxgetwpR5ldLOnHURONPusUe44SWHlkr~ao6oRNlW4vO1S388MfM0OeSpoHAF1soMtgZLJuCwcvgg1-dCBdy8pRT8qrJSIisusjgW8Yd~GV-fNjMLTRETsw7kKjFfnbU1iEaz9HxBvHyYhKOCU3YVyIhRkY7jtBNY7h9uFnz3QF2PLElq6XvIyhw2ms9S0DQaaXjwVouLEKIrLQQ6As~CJaZpWmdeWre8jjlfkqNryx8oGRexX0W3f16crAZWGnP~BKjZoujukj78mQersBcs7p6AvQXujSJ0dQsSeP0APVrEtY4ihDiLZCDX6-rMQ__",
  },
  {
    coin: "INJ",
    name: "Injective",
    imgURL:
      "https://s3-alpha-sig.figma.com/img/f0c1/6190/61f12b46956a48ec819cad2d370c1541?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UYHidTlhhZfeCAH1sF8ww7EN9p2khgrREZ0j1QJTlhjkiH5w0EMa1CQ8~WW8ql-~WVRhl2NnLc5u5vn4vPcVsS7~x84aXy30G1aqvtXMNLCKXY~v3saZAbjFqm4pQmsOsou4QlkPoU5eTsre4CyaRbXJoGAGm-P-xfwfhRX5K5Fue6VY6pQsEnjP5mGC-izWrYHU8qFKPjq8~eWNT3SGds6xRJ~G9DqJ7OnROWneZOrSyPeZCdMtePRl4hrRy3Y4xXlk0e2~nXFmD5zAqIRFy~1EQMS0NZ3I2r1~F-J1Af1u8R5ypb41LgAgcbh~lxgDXNoq5Ga4kYGyCHRuRq08kA__",
  },
  {
    coin: "ETH",
    name: "Ethereum",
    imgURL:
      "https://s3-alpha-sig.figma.com/img/3fb5/c6ab/77c0ed24e1b634905098cda18c0f6cdb?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZyRQ0hpTVsr0xabLXuOXufvIPlwXVU0gedCPQarzx6PMFdCMf~QugBy8G49T41SrqiGLcz6icBE11ajvTmWJ5X-kmjIHlg1bccTdjhxpE9qWzxnFWW3aiAyA2DooEv~FvkcMqkQHWancXdvr5NnxFD6S0anBOEQuXuT2WNP5WOS7lUOKGzuwXhZXNpDYeTrYXQD1IihkFzahOul4pyyGuyRpRY6~ajPt8bOlkcUuxx245PBhs2EnnssLlsF0EibX2wwHzq6ZCjyKzwrTrCg75jwofD0BemJJMsL8CJ0MEMqfrq~gq3i6cp-EwuqxnQVL98CR1yN-0tH0HKEEkNOcSQ__",
  },
  {
    coin: "USDC",
    name: "USDC",
    imgURL:
      "https://s3-alpha-sig.figma.com/img/2a41/3176/678412539145144f9eda167f0b19d568?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LIy-xVJbqZs3RMtEDPC-r5gqRnO72W7jJqaBo856BOw0Ag4gEfLVj1lML~LC-OAknk5Pgy3BhAZLiQ2Z9~8kW-JoqvcnWfcsf4tlyyiRGZT3VE1pPOG~rWxPP3mz47VEvYaTs3jT4LRIf4~x0CToBdORxVIJKfWf-FRaN7mg6PYAmc32wFpAV201xDXdsqh96tSvtK60roUktTMVOfjpxeOcJBHb4BedopC4oH3M0shaju5ZUOO2HYMCIWLv258HbhTCF1VWWl0z4jpsU5cpCicPw9SKPAw7~oeBUuDYnSNNA14Yw-3OxVvKEFFpdgACtOulCijqSijB8ypL1AcDlw__",
  },
  {
    coin: "AKT",
    name: "Akash",
    imgURL:
      "https://s3-alpha-sig.figma.com/img/c505/0df6/daba21fbc0fa3c75dd002c2a7f19e5ab?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JoiivhTtT4bbbNI8B7sJ1hba7tbylywjfLok2W195mHY2UC97Lz7UeYmvoRl31lQjW1YTeb9h9YFarwW~KzTSbTvFkGFHM3saJom2LpdtcJwiGF~vzeDoLoA09Pq43pDdHTnrZ-1O~5-wVqhqmJR3pizzd6Z272FY0dV6RVcQnmkSc5QlENJIudJYMgB06HuCco4iRTyMkHm9lDmGeBbdLwBXLMmeHYQ8Im~1hxO8wWA384NOL0UFbnlYvktp4YbPk85i3uKRMQ3Ms~V7JsKLsOECjaGTAMdh2P7xDDk6EYaRxjszGMZUhMEuJT3tvlv-BuwpoQrVdDA20peNOcErA__",
  },
  {
    coin: "DYDX",
    name: "ETHDYDX",
    imgURL:
      "https://s3-alpha-sig.figma.com/img/d56c/076c/33bc51ce8674e69b29c243f146512355?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=d-oWDivkuHNYg-QGOnl8jCx5qP0PjcHgZkcVe6cow7Sk9ZPSh0YSk9Fb-VGZdLLRla8tzQxyFClYD2K2tAoiO8zZlu~P-0SNhVKfCB-3CSvC1X9aQnwAKLON7CCPIPmMQ0q1~8kOkuVMAJ~vLf83VE0vDoKeCE7j98jqm97YOHI2~aiEAYf0wQJHWabM4waU08b7d0iJNWwN~4f16k16bZJMrcRUda9XQTFrnIGroaz61ACpcJL4ZRnDPQLM3fVIqg467J52lyF1WdsZXurFUWAD4X0B7ba2MsRANMTmKNTZXSfWkROQ4WebxUBguJg8W85ymGLy~OSx-4c3seI~Gg__",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  imgUrl,
  name,
  coin,
}: // body,
{
  imgUrl: string;
  name: string;
  coin: string;
  // body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-40 md:w-56 cursor-pointer overflow-hidden rounded-md border p-2 ",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image
          className="rounded-full ml-2"
          width="32"
          height="32"
          alt=""
          src={imgUrl}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-bold dark:text-white">
            {coin}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{name}</p>
        </div>
      </div>
      {/* <blockquote className="mt-2 text-sm">{body}</blockquote> */}
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex h-[150px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.name} {...review} imgUrl={review.imgURL} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.coin} {...review} imgUrl={review.imgURL} />
        ))}
      </Marquee>

      {/* with side shadows */}
      {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div> */}
    </div>
  );
}

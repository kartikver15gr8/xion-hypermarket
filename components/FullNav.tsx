"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import sendit_white_ape from "@/public/sendit_white_ape.svg";
import Image from "next/image";
import portolio_ape from "@/public/_static/illustrations/portfolio_ape.png";
import shinegradient from "@/public/_static/background/shinegradient.png";
import noisebg from "@/public/_static/background/noisebg.png";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { toast } from "sonner";
import { walletState } from "@/store/atom/walletDetails";
import ape from "@/public/ape.png";
// import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useKeplr } from "@/hooks/useKeplr";
import WalletConnectWindow from "./WalletConnectWindow";
import PhantomWalletButton from "./PhantomWalletButton";
import PrivyConnection from "./PrivyConnection";
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
} from "@nextui-org/react";
import { Button } from "@nextui-org/react";

const isActive =
  "relative text-[14px] md:text-[16px] bg-[#dcdfe0] lg:text-[18px] text-[#182b2d] px-3 py-[5px] rounded-sm hover:bg-[#1d2c3a] hover:text-white transition-all duration-200";
const isInactive =
  "relative text-[14px] md:text-[16px] lg:text-[18px] text-[#182b2d] px-3 py-[5px] rounded-sm hover:bg-[#1d2c3a] hover:text-white transition-all duration-200";

interface MenuItem {
  text: string;
  tooltip: string[] | string;
  href: string;
}
export default function FullNav() {
  const [isOpen, setIsOpen] = useState(false);
  const walletAddress = useRecoilValue(walletState);
  const [walletWindowActive, setWalletWindowActive] = useState(false);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard
      .writeText(walletAddress)
      .then(() => {
        // console.log("Wallet address copied to clipboard");
        toast.success("Wallet address copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy wallet address: ", err);
        toast.error("Connect your wallet first");
      });
  }, [walletAddress]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleWalletConnect = () => {
    setWalletWindowActive(!walletWindowActive);
  };

  const pathname = usePathname();

  return (
    <div className="absolute w-full flex flex-col p-2 sm:p-0">
      <div className="items-center flex justify-between border border-[#cbccce] sm:border-[#e1e2e4] z-40 h-16 w-full shadow-sm rounded sm:rounded-none sm:bg-white p-[10px] backdrop-blur-md bg-[rgba(142,137,137,0.2)] md:px-8 lg:px-14 xl:px-16 2xl:px-[85px]">
        <div className="flex gap-x-2 md:gap-x-3 lg:gap-x-5 xl:gap-x-10 items-center">
          <Link href="/" className="hidden sm:flex">
            <div className="flex items-center">
              <Image className="w-10 " src={ape} alt="" />
              <p className="italic font-bold text-2xl md:text-3xl 2xl:text-4xl ">
                SENDIT
              </p>
            </div>
          </Link>

          <div className="sm:hidden w-fit flex ml-4">
            <motion.button
              onClick={toggleMenu}
              className="text-black focus:outline-none"
              animate={isOpen ? "open" : "closed"}
            >
              <motion.svg
                className="w-7"
                viewBox="0 0 20 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                variants={iconVariants}
              >
                <path
                  d="M1 7H19M1 1H19M1 13H19"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </motion.button>
          </div>
        </div>

        {/* Navigation Items */}
        <NavItems />

        {/* <ConnectButton toggleWindow={toggleWalletConnect} /> */}
        <div className="hidden sm:flex items-center gap-x-1">
          {/* <BecomeSeller /> */}
          {/* <ConnectWithWallet /> */}
          {pathname != "/" && <SearchForm />}
          {/* <PhantomWalletButton /> */}
          <PrivyConnection />
        </div>

        {/* Below is the Ape icon for phone screen UI */}
        <Image
          className="w-[45px] mx-1 bg-[rgba(0,0,0,0.7)] backdrop-blur-lg rounded sm:hidden"
          src={sendit_white_ape}
          width={200}
          height={200}
          alt=""
        />
      </div>
      {walletWindowActive && (
        <WalletConnectWindow setActive={toggleWalletConnect} />
      )}
      <div className="sm:hidden mt-1 rounded ">
        <motion.div
          className="sm:hidden z-50 relative w-full border border-gray-300 bg-gray-100 shadow-lg rounded"
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={wrapperVariants}
        >
          <div className="text-black font-medium  flex flex-col shadow-[inset_5px_2px_30px_rgba(0,0,0,0.1)]">
            <NavLink
              href="/"
              text="Explore"
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
            <NavLink
              href="/library"
              text="Orders"
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
            {/* <NavLink
              href="/borrow"
              text="Ape Bank"
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            /> */}
            {/* <NavLink
              href="/earnmore"
              text="Earn More"
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            /> */}
            <NavLink
              href="/affiliate"
              text="Affiliate Program"
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
            <NavLink
              href="/seller/dashboard"
              text="Dashboard"
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
            <NavLink
              href="/seller/products"
              text="Products"
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
            <NavLink
              href="/seller/transactions"
              text="Transactions"
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
            <NavLink
              href="/seller/analytics"
              text="Analytics"
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
            <NavLink
              href="/seller/earnings"
              text="Earnings"
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
            <motion.div
              className="flex items-center h-[70px] shadow-[inset_5px_2px_28px_rgba(0,0,0,0.1)] bg-gray-100"
              variants={itemVariants}
            >
              <Link
                href="/seller"
                className="flex px-[16px] w-5/6 items-center rounded-l-[4px] h-full "
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                <Image
                  className="border w-10 border-gray-300 rounded-full"
                  src={portolio_ape}
                  width={200}
                  height={200}
                  alt="image"
                />
                <div className="flex flex-col mx-[8px]">
                  <p className="text-[18px] font-medium">Become a Seller</p>
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const NavLink = ({
  href,
  text,
  isOpen,
  setIsOpen,
}: {
  href: string;
  text: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <motion.div variants={itemVariants}>
    <Link
      href={href}
      className="h-16 flex items-center hover:bg-[#E0E0E0] transition-all duration-500 px-5 py-2 hover:rounded-md border-b border-[#E1E1E1]"
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      {text}
    </Link>
  </motion.div>
);

const wrapperVariants = {
  open: {
    scaleY: 1,
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    opacity: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 90 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

const NavItems = () => {
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  // const menuItems: MenuItem[] = [
  //   {
  //     text: "Explore",
  //     tooltip: "Explore wide range of digital products!",
  //     href: "/",
  //   },
  //   { text: "Orders", tooltip: "Check your purchases!", href: "/library" },
  //   {
  //     text: "Affiliate Program",
  //     tooltip: "Become affiliate, get incentivized!",
  //     href: "/affiliate",
  //   },
  // ];

  const pathname = usePathname();

  return (
    <div className="h-full items-center hidden sm:flex">
      <ul className="flex gap-x-2 lg:gap-x-8 text-[18px] font-medium">
        {/* <Link href={menuItems[0].href} key={0}>
          <li
            key={0}
            className={pathname == "/" ? isActive : isInactive}
            onMouseEnter={() => setActiveTooltip(0)}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            {menuItems[0].text}
            {activeTooltip === 0 && (
              <div className="absolute left-1/2 -translate-x-1/2  mt-3 px-2 py-1 bg-[#e9ecec] text-slate-700 text-sm rounded-md whitespace-nowrap border border-[#bac3c4]">
                {menuItems[0].tooltip}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1d2c3a]"></div>
              </div>
            )}
          </li>
        </Link> */}

        <li className="relative group">
          <span className="text-black cursor-pointer">Business Assets</span>
          <ul className="absolute left-1/2 -translate-x-1/2 pt-5 rounded-xl font-normal hidden bg-white text-black group-hover:block  group-hover:w-52 p-1">
            <DropdownList
              feat="Template"
              featSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm0 8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm10-1h6m-6 4h6m-6 4h6'/%3E%3C/svg%3E"
            />
            <DropdownList
              feat="Social Media Tools"
              featSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 48 48'%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' d='M10.211 37.789A19.5 19.5 0 0 1 24 4.5m13.789 5.711A19.5 19.5 0 0 1 24 43.5'/%3E%3Ccircle cx='34.804' cy='8.98' r='3.162' fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round'/%3E%3Ccircle cx='13.196' cy='39.02' r='3.162' fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' d='m19.872 20.299l3.163 6.325l10.54-1.054l-6.324-12.65Z'/%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' d='m19.872 20.299l-4.216 2.108c-1.267.633-1.16 2.95-.527 4.217s2.423 2.741 3.69 2.108l4.216-2.108m-.932.538l2.635 5.27l-2.108 1.054l-2.635-5.27'/%3E%3C/svg%3E"
            />
            <DropdownList
              feat="Trading Bots"
              featSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 512 512'%3E%3Cpath fill='black' d='M512 310.829v-73.154c-3.616-38.626-31.154-38.29-73.143-36.576v146.306c67.411 7.006 70.837-19.505 73.143-36.576M73.143 347.405V201.1C31.153 199.386 3.616 199.05 0 237.676v73.154c2.306 17.07 5.732 43.582 73.143 36.576m-54.857 91.442h475.428V512H18.286zM328.32 73.08c-11.526-94.655-130.877-100.188-144.64 0zM21.482 32.86c9.852-18.592 36.27-19.676 47.438-1.947c9.628 15.282 1.753 34.795-14.068 40.43l.005 111.467H36.571V71.394C21.558 66.182 13.321 48.26 21.482 32.86m325.947 195.67c0 21.04-22.93 34.26-41.174 23.74c-18.245-10.519-18.245-36.96 0-47.48s41.174 2.7 41.174 23.74m-169.174 23.74c18.244 10.52 41.174-2.7 41.174-23.74s-22.93-34.26-41.174-23.74c-18.245 10.52-18.245 36.961 0 47.48m242.316-87.749V420.56H91.43V164.522c0-40.399 32.75-73.153 73.142-73.153H347.43c40.393 0 73.142 32.754 73.142 73.153M169.091 268.1c30.408 17.532 68.623-4.502 68.623-39.568s-38.215-57.1-68.623-39.567s-30.407 61.602 0 79.135m178.338 61.018H164.57v36.577h182.86zm18.285-100.586c0-35.065-38.215-57.1-68.623-39.567s-30.407 61.602 0 79.135c30.408 17.532 68.623-4.502 68.623-39.568'/%3E%3C/svg%3E"
            />
            <DropdownList
              feat="Design Assets"
              featSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 16 16'%3E%3Cpath fill='black' d='M3.58 1.125a.5.5 0 0 1 .12.598a.3.3 0 0 0-.013.09c0 .063.016.183.167.333c.073.073.129.125.19.182c.05.046.103.094.17.16c.13.124.267.27.39.453c.255.383.396.862.396 1.559c0 .382-.063.74-.178 1.057C4.496 6.457 3.763 7 3 7s-1.496-.544-1.822-1.443A3.1 3.1 0 0 1 1 4.5c0-.326.087-.715.207-1.074s.288-.732.482-1.032c.231-.39.556-.717.808-.937a6 6 0 0 1 .432-.343l.03-.02l.009-.007l.003-.002l.002-.001a.5.5 0 0 1 .608.041M3 8a2.7 2.7 0 0 0 1.738-.628q.03.094.057.19C5 8.314 5 9.244 5 9.963V10c0 2.058-.385 3.28-.821 4.007a2.7 2.7 0 0 1-.638.747a1.7 1.7 0 0 1-.33.2S3.084 15 3 15a.8.8 0 0 1-.211-.046a1.7 1.7 0 0 1-.33-.2a2.7 2.7 0 0 1-.638-.747C1.385 13.281 1 12.058 1 10v-.036c0-.72 0-1.649.205-2.403q.026-.094.057-.19A2.7 2.7 0 0 0 3 8.002m3.998 2.973a4.5 4.5 0 0 1-1.016-.235Q6 10.362 6 9.96v-.296c.31.147.646.25.998.3V8a2 2 0 0 1 2-2h1.965a3.5 3.5 0 0 0-5.075-2.609a3.2 3.2 0 0 0-.384-.926A4.5 4.5 0 0 1 11.97 6h1.027a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2zM11.971 7a4.5 4.5 0 0 1-3.973 3.973V12a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zm-1.008 0H8.998a1 1 0 0 0-1 1v1.965A3.5 3.5 0 0 0 10.963 7'/%3E%3C/svg%3E"
            />
          </ul>
        </li>
        <li className="relative group">
          <span className="text-black cursor-pointer">Services</span>
          <ul className="absolute left-1/2 -translate-x-1/2 pt-5 rounded-xl font-normal hidden bg-white text-black group-hover:block group-hover:w-48 p-1">
            <DropdownList
              feat="Marketing"
              featSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 16 16'%3E%3Cpath fill='black' d='M14.25 2.1a1.25 1.25 0 0 0-1.17-.1L6.91 4.43a1.2 1.2 0 0 1-.46.09H2.5a1.25 1.25 0 0 0-1.25 1.25v.1H0v3h1.25V9a1.25 1.25 0 0 0 1.25 1.22L4 13.4a1.26 1.26 0 0 0 1.13.72h.63A1.25 1.25 0 0 0 7 12.87v-2.53l6.08 2.43a1.3 1.3 0 0 0 .47.09a1.3 1.3 0 0 0 .7-.22a1.25 1.25 0 0 0 .55-1V3.13a1.25 1.25 0 0 0-.55-1.03m-8.5 3.67V9H2.5V5.77zm0 7.1h-.63l-1.23-2.65h1.86zm1.62-3.72A2.3 2.3 0 0 0 7 9V5.7a2.3 2.3 0 0 0 .37-.11l6.18-2.46v8.48zm7.46-3.03v2.5a1.25 1.25 0 0 0 0-2.5'/%3E%3C/svg%3E"
            />

            <DropdownList
              feat="Development"
              featSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 20 20'%3E%3Cpath id='oouiCode0' fill='black' d='M1 10.08V8.92h1.15c1.15 0 1.15 0 1.15-1.15V5a7.4 7.4 0 0 1 .09-1.3a2 2 0 0 1 .3-.7a1.84 1.84 0 0 1 .93-.68A6.4 6.4 0 0 1 6.74 2h1.18v1.15h-.86A1.32 1.32 0 0 0 6 3.62a1.7 1.7 0 0 0-.36 1.23V7a3.2 3.2 0 0 1-.28 1.72a2 2 0 0 1-1.26.77a2.15 2.15 0 0 1 1.26.79A3.26 3.26 0 0 1 5.62 12v3.15A1.67 1.67 0 0 0 6 16.37a1.31 1.31 0 0 0 1.08.47h.87V18H6.74a6.3 6.3 0 0 1-2.12-.29a1.82 1.82 0 0 1-.93-.71a1.9 1.9 0 0 1-.3-.72A7.5 7.5 0 0 1 3.31 15v-3.77c0-1.15 0-1.15-1.15-1.15zm18 0V8.92h-1.15c-1.15 0-1.15 0-1.15-1.15V5a7.4 7.4 0 0 0-.08-1.32a2 2 0 0 0-.3-.73a1.84 1.84 0 0 0-.93-.68A6.4 6.4 0 0 0 13.26 2h-1.18v1.15h.87a1.32 1.32 0 0 1 1.05.47a1.7 1.7 0 0 1 .36 1.23V7a3.2 3.2 0 0 0 .28 1.72a2 2 0 0 0 1.26.77a2.15 2.15 0 0 0-1.26.79a3.26 3.26 0 0 0-.26 1.72v3.15a1.67 1.67 0 0 1-.38 1.22a1.31 1.31 0 0 1-1.08.47h-.87V18h1.19a6.3 6.3 0 0 0 2.12-.29a1.82 1.82 0 0 0 .93-.68a1.9 1.9 0 0 0 .3-.72a7.5 7.5 0 0 0 .1-1.31v-3.77c0-1.15 0-1.15 1.15-1.15z'/%3E%3Cuse href='%23oouiCode0' transform='matrix(-1 0 0 1 20 0)'/%3E%3C/svg%3E"
            />
            <DropdownList
              feat="Consulting"
              featSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3Cg fill='none'%3E%3Cpath stroke='black' stroke-width='1.5' d='M17 12a5 5 0 1 0-4.478-2.774a.82.82 0 0 1 .067.574l-.298 1.113a.65.65 0 0 0 .796.796l1.113-.298a.82.82 0 0 1 .574.067A5 5 0 0 0 17 12Z'/%3E%3Cpath fill='black' d='m14.1 16.027l-.543-.516zm.456-.48l.544.517zm2.417-.335l-.374.65zm1.91 1.1l-.374.65zm.539 3.446l.543.517zm-1.42 1.496l-.545-.517zm-1.326.71l.074.745zm-9.86-4.489l.543-.516zm-4.813-9.51l-.749.041zm6.475 1.538l.543.517zm.156-2.81l.613-.433zM7.374 4.91l-.613.433zM4.26 4.609l.544.516zM2.691 6.26l-.543-.516zm7.372 7.795l.544-.517zm4.582 2.488l.455-.48l-1.088-1.033l-.455.48zm1.954-.682l1.91 1.1l.749-1.3l-1.911-1.1zm2.279 3.38l-1.42 1.495l1.087 1.034l1.42-1.496zm-2.275 1.975c-1.435.141-5.18.02-9.244-4.258l-1.087 1.033c4.429 4.663 8.654 4.898 10.478 4.717zm-9.244-4.258c-3.876-4.081-4.526-7.523-4.607-9.033l-1.498.08c.1 1.85.884 5.634 5.018 9.986zm1.376-6.637l.286-.302l-1.087-1.033l-.287.302zm.512-4.062L7.986 4.477l-1.225.866l1.26 1.783zm-5.53-2.168L2.149 5.745l1.088 1.033l1.57-1.653zm4.474 5.713a38 38 0 0 0-.545-.515l-.002.002l-.003.003l-.05.058a1.6 1.6 0 0 0-.23.427c-.098.275-.15.639-.084 1.093c.13.892.715 2.091 2.242 3.7l1.088-1.034c-1.428-1.503-1.78-2.428-1.846-2.884c-.032-.22 0-.335.013-.372l.008-.019a.3.3 0 0 1-.037.047l-.005.005l-.003.003l-.001.001s-.002.002-.545-.515m1.328 4.767c1.523 1.604 2.673 2.234 3.55 2.377c.451.073.816.014 1.092-.095a1.5 1.5 0 0 0 .421-.25l.036-.034l.014-.014l.01-.01h.001c0-.002.002-.002-.542-.519c-.544-.516-.543-.517-.543-.518l.002-.001l.002-.003l.005-.005l.01-.01l.037-.032q.015-.008-.004.001c-.02.008-.11.04-.3.009c-.402-.066-1.27-.42-2.703-1.929zM7.986 4.477C6.972 3.043 4.944 2.8 3.718 4.092l1.087 1.033c.523-.55 1.444-.507 1.956.218zM2.752 7.926c-.022-.4.152-.8.484-1.148L2.148 5.745c-.536.564-.943 1.347-.894 2.261zm14.705 12.811c-.279.294-.57.452-.854.48l.147 1.492c.747-.073 1.352-.472 1.795-.939zM9.021 10.02c.969-1.02 1.036-2.613.226-3.76l-1.225.866c.422.597.357 1.392-.088 1.86zm9.488 6.942c.821.473.982 1.635.369 2.28l1.087 1.033c1.305-1.374.925-3.673-.707-4.613zm-3.409-.898c.385-.406.986-.497 1.499-.202l.748-1.3c-1.099-.632-2.46-.45-3.335.47z' opacity='1'/%3E%3C/g%3E%3C/svg%3E"
            />
            <DropdownList
              feat="Custom Solutions"
              featSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 32 32'%3E%3Cpath fill='black' d='M30 23h-5v-5h-2v5h-5v2h5v5h2v-5h5z'/%3E%3Cpath fill='black' d='m24.127 11.84l1.181.213a5.8 5.8 0 0 1 2.625 1.144A5.42 5.42 0 0 1 29.953 18h2.03a7.5 7.5 0 0 0-6.15-7.885a10.01 10.01 0 0 0-7.94-7.933a10.003 10.003 0 0 0-11.72 7.933A7.506 7.506 0 0 0 .059 18.41A7.684 7.684 0 0 0 7.773 25H14v-2H7.698a5.63 5.63 0 0 1-5.603-4.486a5.506 5.506 0 0 1 4.434-6.43l1.349-.245l.214-1.11a8.21 8.21 0 0 1 6.742-6.642a8 8 0 0 1 3.014.13a8.14 8.14 0 0 1 6.053 6.446Z'/%3E%3C/svg%3E"
            />
          </ul>
        </li>
        <li className="relative group">
          <span className="text-black cursor-pointer">Education</span>
          <ul className="absolute left-1/2 -translate-x-1/2 pt-5 rounded-xl font-normal hidden bg-white text-black group-hover:block group-hover:w-48 p-1">
            <DropdownList
              feat="Courses"
              featSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 32 32'%3E%3Cpath fill='black' d='M24 30H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v16.618l-5-2.5l-5 2.5V4H8v24h16v-4h2v4a2.003 2.003 0 0 1-2 2m-3-14.118l3 1.5V4h-6v13.382Z'/%3E%3C/svg%3E"
            />

            <DropdownList
              feat="Guides"
              featSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm7-16v6.125q0 .3.25.438t.5-.013l1.225-.75q.25-.15.525-.15t.525.15l1.225.75q.25.15.5.013t.25-.438V5z'/%3E%3C/svg%3E"
            />

            <DropdownList
              feat="Tutorials"
              featSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M21 3H3a2 2 0 0 0-2 2v3h2V5h18v14h-7v2h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2M1 18v3h3a3 3 0 0 0-3-3m0-4v2a5 5 0 0 1 5 5h2a7 7 0 0 0-7-7m0-4v2a9 9 0 0 1 9 9h2c0-6.08-4.93-11-11-11m10 1.09v2L14.5 15l3.5-1.91v-2L14.5 13zM14.5 6L9 9l5.5 3L20 9z'/%3E%3C/svg%3E"
            />
          </ul>
        </li>
        <li className="relative group">
          <span className="text-black cursor-pointer">Crypto & Trading</span>
          <ul className="absolute left-1/2 -translate-x-1/2 pt-5 rounded-xl font-normal hidden bg-white text-black group-hover:block group-hover:w-48 p-1">
            <DropdownList
              feat="Alpha Private Groups"
              featSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3Cg fill='none'%3E%3Ccircle cx='12' cy='9' r='1.5' stroke='black' stroke-linecap='round'/%3E%3Cpath stroke='black' d='M15.701 8.25a1.5 1.5 0 1 1 2.598 1.5a1.5 1.5 0 0 1-2.598-1.5Zm-10 0a1.5 1.5 0 1 1 2.598 1.5a1.5 1.5 0 0 1-2.598-1.5Z'/%3E%3Cpath fill='black' d='m20.364 15.512l.486-.116zM14.1 13.185l-.29-.406l-.533.38l.507.414zm1.28 2.325l-.489.103zm4.12.49h-5v1h5zm.378-.371a.25.25 0 0 1-.061.243a.43.43 0 0 1-.317.128v1c.8 0 1.57-.683 1.35-1.604zM16.5 13c1.226 0 1.99.409 2.482.912c.506.517.765 1.174.896 1.717l.972-.233c-.154-.642-.475-1.49-1.153-2.184C19.004 12.505 17.977 12 16.5 12zm-2.11.592c.478-.341 1.15-.592 2.11-.592v-1c-1.146 0-2.025.303-2.69.779zm-.606-.02c.653.534.964 1.362 1.107 2.04l.979-.205c-.162-.767-.54-1.863-1.454-2.609zm1.107 2.04a.28.28 0 0 1-.07.257a.44.44 0 0 1-.321.131v1c.804 0 1.561-.68 1.37-1.593zM9.9 13.185l.316.388l.507-.414l-.532-.38zm-6.264 2.327l.486.117zm4.984-.002l-.49-.103zM7.5 13c.96 0 1.631.25 2.11.592l.58-.814C9.526 12.304 8.647 12 7.5 12zm-3.378 2.629c.13-.543.39-1.2.896-1.717C5.51 13.409 6.274 13 7.5 13v-1c-1.478 0-2.504.505-3.197 1.212c-.678.693-1 1.542-1.153 2.184zM4.5 16a.43.43 0 0 1-.317-.128a.25.25 0 0 1-.06-.243l-.973-.233C2.93 16.317 3.7 17 4.5 17zm5 0h-5v1h5zm0 0a.44.44 0 0 1-.322-.13a.28.28 0 0 1-.07-.257l-.978-.206C7.938 16.319 8.696 17 9.5 17zm-.391-.387c.143-.68.454-1.507 1.107-2.04l-.632-.775c-.914.746-1.292 1.842-1.454 2.609z'/%3E%3Cpath stroke='black' stroke-linecap='round' d='M12 12.5c2.364 0 3.131 1.825 3.38 3.01c.114.54-.328.99-.88.99h-5c-.552 0-.994-.45-.88-.99c.249-1.185 1.016-3.01 3.38-3.01Zm6.5 9H20a1.5 1.5 0 0 0 1.5-1.5v-1.5m-3-16H20A1.5 1.5 0 0 1 21.5 4v1.5m-16 16H4A1.5 1.5 0 0 1 2.5 20v-1.5m3-16H4A1.5 1.5 0 0 0 2.5 4v1.5'/%3E%3C/g%3E%3C/svg%3E"
            />
            <DropdownList
              feat="Trading Tools"
              featSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3Cg fill='none' stroke='black' stroke-width='1.5'%3E%3Cpath d='M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464C22 4.93 22 7.286 22 12s0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z'/%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='m7 14l2.293-2.293a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 0 1.414 0L17 10m0 0v2.5m0-2.5h-2.5'/%3E%3C/g%3E%3C/svg%3E"
            />
            <DropdownList
              feat="Bots"
              featSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 16 16'%3E%3Cg fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3.5 5.5h9a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1'/%3E%3Cpath d='M6.5 9a.5.5 0 0 1-.5.5a.5.5 0 0 1-.5-.5a.5.5 0 0 1 .5-.5a.5.5 0 0 1 .5.5m4 0a.5.5 0 0 1-.5.5a.5.5 0 0 1-.5-.5a.5.5 0 0 1 .5-.5a.5.5 0 0 1 .5.5M8 5.5v-2m-7.5 5v3m15-3v3M9 2.5a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1a1 1 0 0 1 1 1m-2.5 10h3'/%3E%3C/g%3E%3C/svg%3E"
            />
            <DropdownList
              feat="Analytics"
              featSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M7 17v-4m5 4V7m5 10v-6M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12' color='black'/%3E%3C/svg%3E"
            />
            <DropdownList
              feat="Saas"
              featSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 32 32'%3E%3Ccircle cx='30' cy='20' r='1' fill='black'/%3E%3Ccircle cx='2' cy='20' r='1' fill='black'/%3E%3Cpath fill='black' d='M24 26a6 6 0 0 1-5.19-3.003l-1.733 1C18.46 26.387 21.04 28 24 28s5.54-1.612 6.923-4.003l-1.733-1A6 6 0 0 1 24 26'/%3E%3Cpath fill='black' d='M24 14a6.02 6.02 0 0 1 5.197 3l1.732-1.001C29.502 13.532 26.847 12 24 12s-5.502 1.532-6.938 4.015L13.197 23c-1.07 1.85-3.061 3-5.197 3s-4.127-1.15-5.197-3L1.07 24.001C2.498 26.468 5.153 28 8 28s5.502-1.532 6.938-4.015L18.803 17c1.07-1.85 3.061-3 5.197-3'/%3E%3Cpath fill='black' d='M8 14a6 6 0 0 1 5.19 3.003l1.733-1C13.54 13.613 10.96 12 8 12s-5.54 1.613-6.923 4.003l1.733 1A6 6 0 0 1 8 14m8-8a9.97 9.97 0 0 1 7.068 2.932L24.48 7.52C22.308 5.346 19.308 4 16 4S9.692 5.346 7.519 7.519l1.413 1.413A9.97 9.97 0 0 1 16 6'/%3E%3C/svg%3E"
            />
          </ul>
        </li>
        <li className="relative group">
          <span className="text-black cursor-pointer">Software</span>
          <ul className="absolute left-1/2 -translate-x-1/2 pt-5 rounded-xl font-normal hidden bg-white text-black group-hover:block group-hover:w-48 p-1">
            <DropdownList
              feat="Code"
              featSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1.05em' height='1em' viewBox='0 0 25 24'%3E%3Cpath fill='black' d='M15.058 4.163a.75.75 0 1 0-1.464-.326l-3.556 16a.75.75 0 1 0 1.465.326zM7.83 7.47a.75.75 0 0 1 0 1.06L4.36 12l3.47 3.47a.75.75 0 1 1-1.061 1.06l-4-4a.75.75 0 0 1 0-1.06l4-4a.75.75 0 0 1 1.06 0m9.44 0a.75.75 0 0 0 0 1.06l3.47 3.47l-3.47 3.47a.75.75 0 1 0 1.06 1.06l4-4a.75.75 0 0 0 0-1.06l-4-4a.75.75 0 0 0-1.06 0'/%3E%3C/svg%3E"
            />
            <DropdownList
              feat="Protocol for Sale"
              featSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3Cpath fill='black' fill-rule='evenodd' d='M9.592 3.2a6 6 0 0 1-.495.399c-.298.2-.633.338-.985.408c-.153.03-.313.043-.632.068c-.801.064-1.202.096-1.536.214a2.71 2.71 0 0 0-1.655 1.655c-.118.334-.15.735-.214 1.536a6 6 0 0 1-.068.632c-.07.352-.208.687-.408.985c-.087.13-.191.252-.399.495c-.521.612-.782.918-.935 1.238c-.353.74-.353 1.6 0 2.34c.153.32.414.626.935 1.238c.208.243.312.365.399.495c.2.298.338.633.408.985c.03.153.043.313.068.632c.064.801.096 1.202.214 1.536a2.71 2.71 0 0 0 1.655 1.655c.334.118.735.15 1.536.214c.319.025.479.038.632.068c.352.07.687.209.985.408c.13.087.252.191.495.399c.612.521.918.782 1.238.935c.74.353 1.6.353 2.34 0c.32-.153.626-.414 1.238-.935c.243-.208.365-.312.495-.399c.298-.2.633-.338.985-.408c.153-.03.313-.043.632-.068c.801-.064 1.202-.096 1.536-.214a2.71 2.71 0 0 0 1.655-1.655c.118-.334.15-.735.214-1.536c.025-.319.038-.479.068-.632c.07-.352.209-.687.408-.985c.087-.13.191-.252.399-.495c.521-.612.782-.918.935-1.238c.353-.74.353-1.6 0-2.34c-.153-.32-.414-.626-.935-1.238a6 6 0 0 1-.399-.495a2.7 2.7 0 0 1-.408-.985a6 6 0 0 1-.068-.632c-.064-.801-.096-1.202-.214-1.536a2.71 2.71 0 0 0-1.655-1.655c-.334-.118-.735-.15-1.536-.214a6 6 0 0 1-.632-.068a2.7 2.7 0 0 1-.985-.408a6 6 0 0 1-.495-.399c-.612-.521-.918-.782-1.238-.935a2.71 2.71 0 0 0-2.34 0c-.32.153-.626.414-1.238.935m6.239 4.97a.814.814 0 0 1 0 1.15L9.32 15.832a.814.814 0 1 1-1.15-1.15l6.51-6.511a.814.814 0 0 1 1.15 0m-.033 6.543a1.085 1.085 0 1 1-2.17 0a1.085 1.085 0 0 1 2.17 0m-6.51-4.34a1.085 1.085 0 1 0 0-2.17a1.085 1.085 0 0 0 0 2.17' clip-rule='evenodd'/%3E%3C/svg%3E"
            />
            <DropdownList
              feat="SaaS Tools"
              featSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 512 512'%3E%3Cpath fill='black' d='M501.1 395.7L384 278.6c-23.1-23.1-57.6-27.6-85.4-13.9L192 158.1V96L64 0L0 64l96 128h62.1l106.6 106.6c-13.6 27.8-9.2 62.3 13.9 85.4l117.1 117.1c14.6 14.6 38.2 14.6 52.7 0l52.7-52.7c14.5-14.6 14.5-38.2 0-52.7M331.7 225c28.3 0 54.9 11 74.9 31l19.4 19.4c15.8-6.9 30.8-16.5 43.8-29.5c37.1-37.1 49.7-89.3 37.9-136.7c-2.2-9-13.5-12.1-20.1-5.5l-74.4 74.4l-67.9-11.3L334 98.9l74.4-74.4c6.6-6.6 3.4-17.9-5.7-20.2c-47.4-11.7-99.6.9-136.6 37.9c-28.5 28.5-41.9 66.1-41.2 103.6l82.1 82.1c8.1-1.9 16.5-2.9 24.7-2.9m-103.9 82l-56.7-56.7L18.7 402.8c-25 25-25 65.5 0 90.5s65.5 25 90.5 0l123.6-123.6c-7.6-19.9-9.9-41.6-5-62.7M64 472c-13.2 0-24-10.8-24-24c0-13.3 10.7-24 24-24s24 10.7 24 24c0 13.2-10.7 24-24 24'/%3E%3C/svg%3E"
            />
            <DropdownList
              feat="AI Tools"
              featSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3Cpath fill='black' fill-rule='evenodd' d='M8.75 4a.75.75 0 0 0-1.5 0v1.25H7A1.75 1.75 0 0 0 5.25 7v.25H4a.75.75 0 0 0 0 1.5h1.25v2.5H4a.75.75 0 0 0 0 1.5h1.25v2.5H4a.75.75 0 0 0 0 1.5h1.25V17c0 .966.784 1.75 1.75 1.75h.25V20a.75.75 0 0 0 1.5 0v-1.25h2.5V20a.75.75 0 0 0 1.5 0v-1.25h2.5V20a.75.75 0 0 0 1.5 0v-1.25H17A1.75 1.75 0 0 0 18.75 17v-.25H20a.75.75 0 0 0 0-1.5h-1.25v-2.5H20a.75.75 0 0 0 0-1.5h-1.25v-2.5H20a.75.75 0 0 0 0-1.5h-1.25V7A1.75 1.75 0 0 0 17 5.25h-.25V4a.75.75 0 0 0-1.5 0v1.25h-2.5V4a.75.75 0 0 0-1.5 0v1.25h-2.5zm-2 3A.25.25 0 0 1 7 6.75h10a.25.25 0 0 1 .25.25v10a.25.25 0 0 1-.25.25H7a.25.25 0 0 1-.25-.25zm5.049 7.753l-.275-.772H9.497l-.275.772a.75.75 0 0 1-1.413-.504l1.7-4.77l.003-.009l.004-.01c.152-.392.516-.711.994-.711c.479 0 .842.319.995.712l.003.009l.004.01l1.7 4.77a.75.75 0 0 1-1.413.503m-1.289-3.615l.479 1.343h-.958zm3.74-1.64a.75.75 0 0 1 1.5 0v5.003a.75.75 0 1 1-1.5 0z' clip-rule='evenodd'/%3E%3C/svg%3E"
            />
          </ul>
        </li>
      </ul>
    </div>
  );
};

const DropdownList = ({ feat, featSrc }: { feat: string; featSrc: string }) => {
  return (
    <li className="p-2 hover:bg-gray-200 flex items-center rounded-lg gap-x-2">
      <Image className="w-6" src={featSrc} alt="" width={50} height={50} />

      <p className="">{feat}</p>
    </li>
  );
};

const PortfolioButton = () => {
  const walletAddress = useRecoilValue(walletState);
  const { disconnectWallet } = useKeplr();
  const copyToClipboard = useCallback(() => {
    navigator.clipboard
      .writeText(walletAddress)
      .then(() => {
        // console.log("Wallet address copied to clipboard");
        toast.success("Wallet address copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy wallet address: ", err);
        toast.error("Connect your wallet first");
      });
  }, [walletAddress]);
  return (
    <div className="hidden md:flex items-center h-11  rounded shadow-md  w-40">
      <div
        onClick={disconnectWallet}
        className="flex px-2 w-3/4 items-center rounded-l-[4px] h-full bg-[#e5e5e5] gap-x-2"
      >
        <Image
          className="border w-9 border-gray-300 rounded-full"
          src={portolio_ape}
          width={200}
          height={200}
          alt="image"
        />
        <div className="flex flex-col">
          <p className="text-[14px] font-medium">Portfolio</p>
          <p className="text-[10px] text-[#949493]">
            {walletAddress
              ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-5)}`
              : "sendit...vucmr"}
          </p>
        </div>
      </div>
      <div
        onClick={copyToClipboard}
        className="bg-gray-100 w-1/4 flex justify-center items-center h-full rounded-r relative bg-no-repeat bg-center shadow-[inset_5px_2px_28px_rgba(0,0,0,0.1)]"
      >
        <Image
          src={shinegradient}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-[20%] rounded-r"
        />
        <Image
          src={noisebg}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-[5%] rounded-r"
        />
        <svg
          className="w-5 rotate-90 z-10 hover:-rotate-90 transition-all duration-200"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <rect
            width="336"
            height="336"
            x="128"
            y="128"
            fill="none"
            stroke="#4B4B54"
            strokeLinejoin="round"
            strokeWidth="32"
            rx="57"
            ry="57"
          />
          <path
            fill="none"
            stroke="#4B4B54"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="m383.5 128l.5-24a56.16 56.16 0 0 0-56-56H112a64.19 64.19 0 0 0-64 64v216a56.16 56.16 0 0 0 56 56h24"
          />
        </svg>
      </div>
    </div>
  );
};

const ConnectButton = ({ toggleWindow }: { toggleWindow: any }) => {
  const { keplrConnected, userAddress, connectWallet, bal, balance, add } =
    useKeplr();
  // console.log("User account address: ", userAddress);
  // console.log("User Neutron balance: ", balance);
  return (
    <div className="w-fit hidden sm:flex ">
      {keplrConnected && <PortfolioButton />}
      {!keplrConnected && (
        <div className=" w-fit hidden sm:flex" onClick={toggleWindow}>
          <Button className="rounded-full w-24 md:w-28 md:text-[12px] text-[11px] lg:w-32 lg:text-[14px] xl:text-[16px] 2xl:w-36 hover:bg-[#626263] transition-all duration-300">
            Sign In
          </Button>
        </div>
      )}
    </div>
  );
};

const ConnectWithWallet = () => {
  const { keplrConnected, userAddress, connectWallet, bal, balance, add } =
    useKeplr();

  // console.log("User account address: ", userAddress);
  // console.log("User Neutron balance: ", balance);
  return (
    <div className="w-fit hidden sm:flex ">
      {keplrConnected && <PortfolioButton />}
      {!keplrConnected && (
        <div className=" w-fit hidden sm:flex" onClick={connectWallet}>
          <Button className="rounded-lg w-24 md:w-28 md:text-[12px] text-[11px] lg:w-24 lg:text-[14px] xl:text-[16px] 2xl:w-28 hover:bg-[#626263] transition-all duration-300">
            Sign In
          </Button>
        </div>
      )}
    </div>
  );
};

const BecomeSeller = () => {
  return (
    <Link href="/seller/dashboard" className=" w-fit hidden sm:flex">
      <Button className="rounded-lg bg-[#223d40] w-fit md:text-[12px] text-[11px] lg:text-[14px] xl:text-[16px]  hover:bg-[#626263] transition-all duration-300">
        Become a Seller
      </Button>
    </Link>
  );
};

function SearchForm() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState<string>("");

  const onSearch = (event: React.FormEvent) => {
    if (searchQuery.length >= 1) {
      event.preventDefault();
      const encodedSearchQuery = encodeURI(searchQuery);
      router.push(`/search?q=${encodedSearchQuery}`);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  };
  return (
    <form onSubmit={onSearch} className=" rounded-full  bg-[#EEEEEF]">
      <div className="flex border-[1.5px] border-[#303030] h-10 p-1 w-[200px] lg:w-[250px]  items-center rounded-full bg-inherit">
        <input
          className="outline-none placeholder-[#262626] w-full h-full p-2 rounded-full text-[#262626] bg-inherit"
          type="text"
          placeholder="Search"
          onChange={handleSearchChange}
        />
        <button
          type="submit"
          className="flex items-center justify-center p-2 rounded-full bg-black hover:bg-[#52525C] transition-all duration-300"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 15 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5 13L10.6 10.1M12.1667 6.33333C12.1667 9.27885 9.77885 11.6667 6.83333 11.6667C3.88781 11.6667 1.5 9.27885 1.5 6.33333C1.5 3.38781 3.88781 1 6.83333 1C9.77885 1 12.1667 3.38781 12.1667 6.33333Z"
              stroke="#FEFEFD"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}

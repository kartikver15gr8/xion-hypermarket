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
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useKeplr } from "@/hooks/useKeplr";
import WalletConnectWindow from "./WalletConnectWindow";
import PhantomWalletButton from "./PhantomWalletButton";
import PrivyConnection from "./PrivyConnection";

const isActive =
  "relative text-[14px] md:text-[16px] bg-[#dcdfe0] lg:text-[18px] text-[#182b2d] px-3 py-[5px] rounded-sm hover:bg-[#1d2c3a] hover:text-white transition-all duration-200";
const isInactive =
  "relative text-[14px] md:text-[16px] lg:text-[18px] text-[#182b2d] px-3 py-[5px] rounded-sm hover:bg-[#1d2c3a] hover:text-white transition-all duration-200";

interface MenuItem {
  text: string;
  tooltip: string;
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

  const menuItems: MenuItem[] = [
    {
      text: "Explore",
      tooltip: "Explore wide range of digital products!",
      href: "/",
    },
    { text: "Orders", tooltip: "Check your purchases!", href: "/library" },
    {
      text: "Affiliate Program",
      tooltip: "Become affiliate, get incentivized!",
      href: "/affiliate",
    },
  ];
  const pathname = usePathname();

  return (
    <div className="h-full items-center  px-4 hidden sm:flex">
      <ul className="flex gap-x-2 lg:gap-x-4 text-[18px] font-medium">
        <Link href={menuItems[0].href} key={0}>
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
        </Link>
        <Link href={menuItems[1].href} key={1}>
          <li
            key={1}
            className={pathname == "/library" ? isActive : isInactive}
            onMouseEnter={() => setActiveTooltip(1)}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            {menuItems[1].text}
            {activeTooltip === 1 && (
              <div className="absolute left-1/2 -translate-x-1/2  mt-3 px-2 py-1 bg-[#e9ecec] text-slate-700 text-sm rounded-md whitespace-nowrap border border-[#bac3c4]">
                {menuItems[1].tooltip}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1d2c3a]"></div>
              </div>
            )}
          </li>
        </Link>
        <Link href={menuItems[2].href} key={2}>
          <li
            key={2}
            className={pathname == "/affiliate" ? isActive : isInactive}
            onMouseEnter={() => setActiveTooltip(2)}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            {menuItems[2].text}
            {activeTooltip === 2 && (
              <div className="absolute left-1/2 -translate-x-1/2  mt-3 px-2 py-1 bg-[#e9ecec] text-slate-700 text-sm rounded-md whitespace-nowrap border border-[#bac3c4]">
                {menuItems[2].tooltip}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1d2c3a]"></div>
              </div>
            )}
          </li>
        </Link>
      </ul>
    </div>
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

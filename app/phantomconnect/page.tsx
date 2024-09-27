"use client";
import PhantomWalletButton from "@/components/PhantomWalletButton";
import { phantomWallet } from "@/store/atom/phantomWallet";
import { useRecoilValue } from "recoil";

const PhantomTest: React.FC = () => {
  const walletAddress = useRecoilValue(phantomWallet);
  console.log(
    `This is the wallet address coming from Recoil's State managment: ${walletAddress}`
  );

  return (
    <div className="border pt-16">
      <h1>Connect to Phantom Wallet</h1>
      <p>This is the wallet address by Recoil atom: {walletAddress}</p>
      <PhantomWalletButton />
    </div>
  );
};

export default PhantomTest;

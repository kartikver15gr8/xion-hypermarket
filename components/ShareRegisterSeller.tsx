import dynamic from "next/dynamic";
import React from "react";

const RegisterSellerClient = dynamic(() => import("./RegisterSellerClient"), {
  ssr: false,
});

const ShareRegisterSeller: React.FC = () => {
  return <RegisterSellerClient />;
};

export default ShareRegisterSeller;

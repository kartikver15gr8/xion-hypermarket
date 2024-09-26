/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3-alpha-sig.figma.com",
      },
      {
        protocol: "https",
        hostname: "imgs.search.brave.com",
      },
      {
        protocol: "https",
        hostname: "hypermarket.vercel.app",
      },
      {
        protocol: "https",
        hostname: "devnet.sendit.zone",
      },
    ],
  },
};

export default nextConfig;

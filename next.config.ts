import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["ik.imagekit.io"], // Add ImageKit domain here
  },
  devIndicators: false,
};

export default nextConfig;

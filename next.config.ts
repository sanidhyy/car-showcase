import type { NextConfig } from "next";

const prod = process.env.NODE_ENV === "production";

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: prod ? false : true,
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.imagin.studio",
      },
    ],
  },
};

module.exports = withPWA(nextConfig);

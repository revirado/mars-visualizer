import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.module.rules.push({
      test: /\.json$/,
      type: "json",
    });
    return config;
  },
  images: {
    domains: [
      "d2pn8kiwq2w21t.cloudfront.net","mars.nasa.gov","img.icons8.com"
    ]
  }
};

export default nextConfig;

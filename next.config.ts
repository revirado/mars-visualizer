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
  },
// permite orígenes de dev (ajusta la IP a la que te muestra Next)
    allowedDevOrigins: [
    "http://192.168.100.12:3000",
    "http://192.168.100.13:3000"
  ],
};


export default nextConfig;

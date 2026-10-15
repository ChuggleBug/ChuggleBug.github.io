import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
    // Conditional COORS proxy
    ...(isDev
        ? {
              async rewrites() {
                  return [
                      {
                          source: "/proxy/:path*",
                          destination:
                              "https://chugglebug.onthewifi.com/:path*",
                      },
                  ];
              },
          }
        : { output: "export" }),
    trailingSlash: true,
    distDir: "dist",
    images: {
        unoptimized: true,
    },
};

module.exports = nextConfig;

export default nextConfig;

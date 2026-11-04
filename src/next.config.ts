import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
    // Conditional COORS proxy
    ...(isDev
        ? {
              // gzip buffers proxied SSE streams, so events never reach the browser
              compress: false,
              // Rewrite proxy kills connections after 30s by default, cutting SSE streams
              experimental: { proxyTimeout: 24 * 60 * 60 * 1000 },
              async rewrites() {
                  return [
                      {
                          source: "/proxy/:path*",
                          // :path* drops the trailing slash; the API 301s to add it back,
                          // which sends the browser cross-origin and breaks CORS
                          destination: "https://api.chugglebug.dev/:path*/",
                      },
                      {
                          source: "/local/:path*",
                          destination: "http://localhost:3001/:path*",
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

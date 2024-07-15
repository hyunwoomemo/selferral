/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true /** 설정할 경우 빌드시 타입 에러 통과 */,
  },
  images: {
    /** 임시 추가  */
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "data.spolive.com",
        port: "",
        pathname: "/data/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "asset.spolive.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

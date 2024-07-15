/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true /** 설정할 경우 빌드시 타입 에러 통과 */,
  },
  images: {
    /** 임시 추가  */
    domains: ["selferraltest.vercel.app"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "selferraltest.vercel.app",
        port: "3000",
        pathname: "/**",
      },

      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

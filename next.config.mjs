/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true /** 설정할 경우 빌드시 타입 에러 통과 */,
  },
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: "/payback/process",
        destination: "/payback",
      },
    ];
  },
};

export default nextConfig;

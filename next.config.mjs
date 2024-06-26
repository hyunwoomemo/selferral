/** @type {import('next').NextConfig} */
const nextConfig = {
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

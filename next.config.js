/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "images.prismic.io",
        port: "",
        pathname: "**",
      },
    ],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;

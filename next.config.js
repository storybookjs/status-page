/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  staticPageGenerationTimeout: 900, // equivalent to netlify's timeout
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@buildforge/shared", "@buildforge/ui"],
  experimental: {
    typedRoutes: true
  }
};

export default nextConfig;

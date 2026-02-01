/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // If your repo is papalino456.github.io, you don't need basePath.
  // If it's papalino456.github.io/portfolio-2026, uncomment below:
  // basePath: '/portfolio-2026',
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  compiler: { removeConsole: { exclude: ['error'] } },
};

export default nextConfig;

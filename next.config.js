/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['lucide-react'],

  // === Required for GitHub Pages ===
  output: 'export',           // Enables static export
  images: {
    unoptimized: true,        // Required when using static export
  },
  trailingSlash: true,        // Recommended for GitHub Pages
   basePath: '/mantradevs',   // ← Uncomment & change if needed
};

export default nextConfig;
/** @type {import('next').NextConfig} */
// basePath is only needed for GitHub Pages (production build).
// In development (npm run dev) we omit it so the site loads at localhost:3000/
const isProd = process.env.NODE_ENV === 'production';
const BASE_PATH = isProd ? '/mantradevs' : '';

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['lucide-react'],

  // === Required for GitHub Pages ===
  output: 'export',           // Enables static export
  images: {
    unoptimized: true,        // Required when using static export
  },
  trailingSlash: true,        // Recommended for GitHub Pages
  ...(isProd && { basePath: BASE_PATH }),

  // Expose basePath so client-side code can prefix public asset URLs
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
  },
};

export default nextConfig;
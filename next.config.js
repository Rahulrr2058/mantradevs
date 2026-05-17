/** @type {import('next').NextConfig} */
// basePath is only needed when deploying to GitHub Pages (subpath /mantradevs).
// In root-domain deployments (Vercel, Netlify, custom domains) we omit it so that assets resolve from '/'.
const isGitHubPages = process.env.GH_PAGES === 'true' || process.env.GITHUB_ACTIONS === 'true';
const BASE_PATH = isGitHubPages ? '/mantradevs' : '';

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['lucide-react'],

  // === Required for Static Export ===
  output: 'export',           // Enables static export
  images: {
    unoptimized: true,        // Required when using static export
  },
  trailingSlash: true,        // Recommended for static routing
  ...(BASE_PATH && { basePath: BASE_PATH }),

  // Expose basePath so client-side code can prefix public asset URLs
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
  },
};

export default nextConfig;
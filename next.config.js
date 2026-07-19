import { spawn } from 'child_process';
import path from 'path';

// Automatically spawn the background WhatsApp cron worker during local development
if (process.env.NODE_ENV !== 'production') {
  console.log("⚙️ Starting Mantra CRM Background WhatsApp Cron Worker...");
  const workerProcess = spawn('node', [path.resolve('scripts/whatsapp-worker.js')], {
    stdio: 'inherit',
    shell: false
  });
  
  process.on('exit', () => {
    workerProcess.kill();
  });
}

/** @type {import('next').NextConfig} */
// We omit basePath because your production deployment is served from your custom domain (mantradevs.com).
// Custom domains resolve directly from the root '/', so no subpath prefix is needed.
const BASE_PATH = '';

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
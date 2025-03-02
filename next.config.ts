// next.config.ts
import { NextConfig } from 'next';

const config: NextConfig = {
  output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      }
    ],
    unoptimized: true, // Add this for static exports
  },
}

export default config;
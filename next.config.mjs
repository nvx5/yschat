/** @type {import('next').NextConfig} */
const nextConfig = {
  // Completely disable ESLint during production build
  eslint: {
    // This setting will completely disable the ESLint build step
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript type checking during build
  typescript: {
    // This setting will completely disable TypeScript type checking during build
    ignoreBuildErrors: true,
  },
  // Include other settings from the original config
  experimental: {
    webpackMemoryOptimizations: true,
  },
  // Allow importing typescript config 
  transpilePackages: ['pdfjs-dist', 'mermaid'],
  
  // Fix webpack issues with missing modules
  webpack(config) {
    // Fix epub2/zipfile module issue
    config.resolve.fallback = {
      ...config.resolve.fallback,
      zipfile: false,
    };
    return config;
  },
}

export default nextConfig; 
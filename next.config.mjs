/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize output
  output: 'standalone',
  
  // Disable source maps in production
  productionBrowserSourceMaps: false,
  
  // Use SWC minifier
  swcMinify: true,
  
  // Reduce image optimization memory usage
  images: {
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  
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
    
    // Add memory optimization for webpack
    config.optimization.nodeEnv = 'production';
    
    return config;
  },
}

export default nextConfig; 
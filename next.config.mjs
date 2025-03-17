/** @type {import('next').NextConfig} */
const nextConfig = {
  // Completely disable ESLint during production build
  eslint: {
    // This setting will completely disable the ESLint build step
    ignoreDuringBuilds: true,
  },
  // Include other settings from the original config
  experimental: {
    webpackMemoryOptimizations: true,
  },
  // Allow importing typescript config 
  transpilePackages: ['pdfjs-dist', 'mermaid'],
}

export default nextConfig; 
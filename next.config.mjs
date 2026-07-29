/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],   // ← add this line
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'github-readme-stats.vercel.app' },
      { protocol: 'https', hostname: 'opengraph.githubassets.com' }
    ]
  }
};
export default nextConfig;
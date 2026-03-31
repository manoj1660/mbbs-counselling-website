/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,

  // 👈 Ye wala part add karo Unsplash images ke liye
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
      // Agar aapne koi aur website ki image use ki hai, toh uska block bhi yahan aayega
    ],
  },
};

export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // Google
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "maps.gstatic.com",
      },
      {
        hostname: "maps.google.com",
      },
      {
        hostname: "maps.googleapis.com",
      },
    ],
  },
};

export default nextConfig;

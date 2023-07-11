/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "localhost",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "picsum.photos",
      "platform-lookaside.fbsbx.com",
    ],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['robohash.org'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/auth/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
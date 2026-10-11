/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.tcdn.com.br',
        port: '',
        pathname: '/img/img_prod/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        port: '',
        pathname: '/images/**',
        search: '',
      },
    ],
  },
};

module.exports = nextConfig

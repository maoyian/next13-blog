/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oss.lixiaoxu.cn',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig

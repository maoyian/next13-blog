/** @type {import('next').NextConfig} */
const nextConfig = {
  styledComponents: true,
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

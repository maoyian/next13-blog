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
      {
        protocol: 'https',
        hostname: 'threejs.org',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig

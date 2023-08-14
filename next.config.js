/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['antd-mobile'],
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

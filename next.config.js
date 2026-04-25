/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/smart/:path*',
        destination: process.env.NEXT_PUBLIC_API_URL + '/:path*',
      },
      {
        source: '/api/fast/:path*',
        destination: process.env.NEXT_PUBLIC_CNN_API_URL + '/:path*',
      },
    ]
  },
}
module.exports = nextConfig

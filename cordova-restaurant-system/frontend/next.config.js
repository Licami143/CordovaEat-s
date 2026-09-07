/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: '**' },
    ],
  },
  async rewrites() {
    const rawApi = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const backendBase = rawApi.replace(/\/api\/?$/, '');
    return [
      {
        source: '/uploads/:path*',
        destination: `${backendBase}/uploads/:path*`,
      },
      {
        source: '/api/uploads/:path*',
        destination: `${backendBase}/uploads/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;

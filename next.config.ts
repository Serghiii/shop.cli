import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    STATIC_URL: process.env.STATIC_URL,
    GOOGLE_ID: process.env.GOOGLE_AUTH_CLIENT_ID,
  },
  images: {
    localPatterns: [
      {
        pathname: 'http://localhost:3000/',
        search: ''
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '194.44.130.38',
        pathname: '**',
        port: '',
        search: ''
      },
    ]
  }
}

export default nextConfig
module.exports = {
  reactStrictMode: true,
  // for react 18 to use suspense
  // experimental: {
  //   concurrentFeatures: true,
  //   serverComponents: true,
  // },
  i18n: {
    locales: ['uk', 'ru'],
    defaultLocale: 'uk',
    localeDetection: true
  },
  env: {
    API_URL: process.env.API_URL,
    STATIC_URL: process.env.STATIC_URL,
    GOOGLE_ID: process.env.GOOGLE_AUTH_CLIENT_ID,
  },
  images: {
    domains: ['localhost', '194.44.130.38'],
  }
}

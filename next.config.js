module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ['uk', 'ru'],
    defaultLocale: 'uk',
    localeDetection: false
  },
  env: {
    API_URL: process.env.API_URL,
    STATIC_URL: process.env.STATIC_URL,
  },
  images: {
    domains: ['localhost', '194.44.130.38'],
  }
}

const path = require('path')

const nextTranslate = require('next-translate')

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_INTERCOM_ID: process.env.NEXT_PUBLIC_INTERCOM_ID,
    NEXT_PUBLIC_HOTJAR_ID: process.env.NEXT_PUBLIC_HOTJAR_ID,
    NEXT_PUBLIC_HOTJAR_SV: process.env.NEXT_PUBLIC_HOTJAR_SV,
    urlSunlight: process.env.SUNLIGHT_URL,
    urlSunrise: process.env.SUNRISE_URL
  },
  sassOptions: {
    includePaths: [path.resolve(__dirname, './src/styles/')],
    prependData: `@import "helpers/helpers-dir.scss";`
  },
  experimental: {
    // this config is recommended for docker builds
    outputStandalone: true
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true
  },
  ...nextTranslate()
}

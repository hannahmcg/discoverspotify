/** @type {import('next').NextConfig} */
module.exports = {
  extends: [
    'plugin:@next/next/recommended',
  ],
  reactStrictMode: true,
  images: {
    domains: ["i.scdn.co"],
  }
}

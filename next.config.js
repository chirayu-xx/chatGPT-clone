/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    domains: ['links.papareact.com', 'www.freepnglogos.com', 'github.com']
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig

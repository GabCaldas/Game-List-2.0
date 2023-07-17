/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/',
            destination: '/pages/auth/sign-in',
            permanent: true,
          },
        ]
      },
}

module.exports = nextConfig

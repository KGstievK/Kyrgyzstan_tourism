/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["13.61.175.49", "13.49.68.103"],
    // formats: ['image/jpeg', 'image/png', 'image/webp', 'image/jfif'], // Поддерживаемые форматы
    path: '/_next/image',
  },
};

module.exports = nextConfig;

import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/config/i18n.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flizimages.s3.eu-central-1.amazonaws.com',
        port: '',
        pathname: '/**',
        search: ''
      }
    ]
  }
};

export default withNextIntl(nextConfig);

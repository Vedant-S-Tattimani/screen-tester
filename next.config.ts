import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:locale/tests/display-info',
        destination: '/:locale/tests/resolution-checker',
        permanent: true,
      },
      {
        source: '/:locale/resolution-checker',
        destination: '/:locale/tests/resolution-checker',
        permanent: true,
      },
      {
        source: '/resolution-checker',
        destination: '/en/tests/resolution-checker',
        permanent: true,
      },
      {
        source: '/:locale/resolution-test',
        destination: '/:locale/tests/resolution-checker',
        permanent: true,
      },
      {
        source: '/resolution-test',
        destination: '/en/tests/resolution-checker',
        permanent: true,
      },
      {
        source: '/:locale/display-info',
        destination: '/:locale/tests/resolution-checker',
        permanent: true,
      },
      {
        source: '/display-info',
        destination: '/en/tests/resolution-checker',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);

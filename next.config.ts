import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  ...(process.env.NODE_ENV === 'production' ? { output: 'export' } : {}),
  allowedDevOrigins: ['10.216.177.85', 'localhost'],
  images: {
    unoptimized: true,
  },
  experimental: {
    turbopackFileSystemCacheForDev: false,
  },
  async redirects() {
    return [
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
        destination: '/:locale/tests/display-info',
        permanent: true,
      },
      {
        source: '/display-info',
        destination: '/en/tests/display-info',
        permanent: true,
      },
      // Short test route aliases
      {
        source: '/:locale/tests/dead-pixel',
        destination: '/:locale/tests/dead-pixel-test',
        permanent: true,
      },
      {
        source: '/:locale/tests/color',
        destination: '/:locale/tests/color-test',
        permanent: true,
      },
      {
        source: '/:locale/tests/brightness',
        destination: '/:locale/tests/brightness-test',
        permanent: true,
      },
      {
        source: '/:locale/tests/ghosting',
        destination: '/:locale/tests/ghosting-test',
        permanent: true,
      },
      {
        source: '/:locale/tests/refresh-rate',
        destination: '/:locale/tests/refresh-rate-test',
        permanent: true,
      },
      {
        source: '/:locale/tests/resolution',
        destination: '/:locale/tests/resolution-checker',
        permanent: true,
      },
      {
        source: '/:locale/tests/reaction-time',
        destination: '/:locale/tests/reaction-time-test',
        permanent: true,
      },
      // Inspection aliases
      {
        source: '/:locale/diagnostic',
        destination: '/:locale/monitor-inspection/diagnostic',
        permanent: true,
      },
      {
        source: '/diagnostic',
        destination: '/en/monitor-inspection/diagnostic',
        permanent: true,
      },
      {
        source: '/:locale/inspection/diagnostic',
        destination: '/:locale/monitor-inspection/diagnostic',
        permanent: true,
      },
      {
        source: '/:locale/inspection/new-monitor',
        destination: '/:locale/monitor-inspection/new',
        permanent: true,
      },
      {
        source: '/:locale/inspection/new',
        destination: '/:locale/monitor-inspection/new',
        permanent: true,
      },
      {
        source: '/:locale/inspection/used-monitor',
        destination: '/:locale/monitor-inspection/used',
        permanent: true,
      },
      {
        source: '/:locale/inspection/used',
        destination: '/:locale/monitor-inspection/used',
        permanent: true,
      },
      {
        source: '/:locale/inspection/gaming',
        destination: '/:locale/monitor-inspection/gaming',
        permanent: true,
      },
      {
        source: '/:locale/inspection/oled',
        destination: '/:locale/monitor-inspection/oled',
        permanent: true,
      },
      {
        source: '/:locale/inspection/laptop',
        destination: '/:locale/monitor-inspection/laptop',
        permanent: true,
      },
      {
        source: '/:locale/inspection/tv',
        destination: '/:locale/monitor-inspection/tv',
        permanent: true,
      },
      {
        source: '/:locale/inspection',
        destination: '/:locale/monitor-inspection',
        permanent: true,
      },
      // P0: Calculators redirect
      {
        source: '/:locale/tests/calculators',
        destination: '/:locale/tests/compare-displays',
        permanent: true,
      },
      {
        source: '/tests/calculators',
        destination: '/en/tests/compare-displays',
        permanent: true,
      },
      // P1: Consolidated Concept Guides to Knowledge Base Articles (Direct, No Chains)
      {
        source: '/:locale/guides/dead-pixel-vs-stuck-pixel',
        destination: '/:locale/knowledge-base/dead-pixel-vs-stuck-pixel',
        permanent: true,
      },
      {
        source: '/guides/dead-pixel-vs-stuck-pixel',
        destination: '/en/knowledge-base/dead-pixel-vs-stuck-pixel',
        permanent: true,
      },
      {
        source: '/:locale/guides/dead-pixels',
        destination: '/:locale/knowledge-base/dead-pixel-vs-stuck-pixel',
        permanent: true,
      },
      {
        source: '/guides/dead-pixels',
        destination: '/en/knowledge-base/dead-pixel-vs-stuck-pixel',
        permanent: true,
      },
      {
        source: '/:locale/guides/how-to-check-backlight-bleed',
        destination: '/:locale/knowledge-base/backlight-bleed-vs-ips-glow',
        permanent: true,
      },
      {
        source: '/guides/how-to-check-backlight-bleed',
        destination: '/en/knowledge-base/backlight-bleed-vs-ips-glow',
        permanent: true,
      },
      {
        source: '/:locale/guides/backlight-bleed',
        destination: '/:locale/knowledge-base/backlight-bleed-vs-ips-glow',
        permanent: true,
      },
      {
        source: '/guides/backlight-bleed',
        destination: '/en/knowledge-base/backlight-bleed-vs-ips-glow',
        permanent: true,
      },
      {
        source: '/:locale/guides/how-to-check-monitor-ghosting',
        destination: '/:locale/knowledge-base/monitor-ghosting-and-motion-blur',
        permanent: true,
      },
      {
        source: '/guides/how-to-check-monitor-ghosting',
        destination: '/en/knowledge-base/monitor-ghosting-and-motion-blur',
        permanent: true,
      },
      {
        source: '/:locale/guides/ghosting',
        destination: '/:locale/knowledge-base/monitor-ghosting-and-motion-blur',
        permanent: true,
      },
      {
        source: '/guides/ghosting',
        destination: '/en/knowledge-base/monitor-ghosting-and-motion-blur',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);

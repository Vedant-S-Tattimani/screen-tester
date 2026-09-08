import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { monitorTests } from '@/data/tests';
import { monitorGuides } from '@/data/guides';
import { BASE_URL } from '@/lib/seo';

const baseUrl = BASE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  const coreRoutes = [
    { path: '', priority: 1.0, changeFrequency: 'monthly' as const },
    { path: '/tests', priority: 1.0, changeFrequency: 'monthly' as const },
    { path: '/tools', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/monitor-inspection', priority: 1.0, changeFrequency: 'monthly' as const },
    { path: '/monitor-inspection/diagnostic', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/monitor-inspection/new', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/monitor-inspection/general', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/monitor-inspection/used', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/monitor-inspection/gaming', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/monitor-inspection/oled', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/monitor-inspection/laptop', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/monitor-inspection/tv', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/monitor-inspection/summary', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/guides', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/knowledge-base', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/faq', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/about', priority: 0.5, changeFrequency: 'yearly' as const },
    { path: '/contact', priority: 0.5, changeFrequency: 'yearly' as const },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  const testRoutes = monitorTests.map(test => ({
    path: `/tests/${test.id}`,
    priority: 0.8,
    changeFrequency: 'monthly' as const
  }));

  const guideRoutes = monitorGuides.map(guide => ({
    path: `/guides/${guide.id}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const
  }));

  const allRoutes = [...coreRoutes, ...testRoutes, ...guideRoutes];

  allRoutes.forEach((route) => {
    routing.locales.forEach((locale) => {
      const alternates = routing.locales.reduce((acc, altLocale) => {
        acc[altLocale] = `${baseUrl}/${altLocale}${route.path}`;
        return acc;
      }, {} as Record<string, string>);

      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: alternates,
        },
      });
    });
  });

  return sitemapEntries;
}

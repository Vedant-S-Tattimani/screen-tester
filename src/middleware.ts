import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host') || url.host;

  // 1. Enforce canonical non-www hostname (301)
  if (host.startsWith('www.')) {
    const cleanHost = host.replace(/^www\./, '');
    const redirectUrl = new URL(url.pathname + url.search, `https://${cleanHost}`);
    return NextResponse.redirect(redirectUrl, 301);
  }

  // 2. Calculators redirect (301)
  const calcMatch = url.pathname.match(/^\/([a-z]{2})\/tests\/calculators\/?$/);
  if (calcMatch) {
    url.pathname = `/${calcMatch[1]}/tests/compare-displays`;
    return NextResponse.redirect(url, 301);
  }
  if (url.pathname === '/tests/calculators' || url.pathname === '/tests/calculators/') {
    url.pathname = '/en/tests/compare-displays';
    return NextResponse.redirect(url, 301);
  }

  // 3. Consolidated Guides to Knowledge Base redirects (301)
  const deadPixelMatch = url.pathname.match(/^\/([a-z]{2})\/guides\/(?:dead-pixel-vs-stuck-pixel|dead-pixels)\/?$/);
  if (deadPixelMatch) {
    url.pathname = `/${deadPixelMatch[1]}/knowledge-base/dead-pixel-vs-stuck-pixel`;
    return NextResponse.redirect(url, 301);
  }
  if (url.pathname === '/guides/dead-pixel-vs-stuck-pixel' || url.pathname === '/guides/dead-pixels') {
    url.pathname = '/en/knowledge-base/dead-pixel-vs-stuck-pixel';
    return NextResponse.redirect(url, 301);
  }

  const bleedMatch = url.pathname.match(/^\/([a-z]{2})\/guides\/(?:how-to-check-backlight-bleed|backlight-bleed)\/?$/);
  if (bleedMatch) {
    url.pathname = `/${bleedMatch[1]}/knowledge-base/backlight-bleed-vs-ips-glow`;
    return NextResponse.redirect(url, 301);
  }
  if (url.pathname === '/guides/how-to-check-backlight-bleed' || url.pathname === '/guides/backlight-bleed') {
    url.pathname = '/en/knowledge-base/backlight-bleed-vs-ips-glow';
    return NextResponse.redirect(url, 301);
  }

  const ghostingMatch = url.pathname.match(/^\/([a-z]{2})\/guides\/(?:how-to-check-monitor-ghosting|ghosting)\/?$/);
  if (ghostingMatch) {
    url.pathname = `/${ghostingMatch[1]}/knowledge-base/monitor-ghosting-and-motion-blur`;
    return NextResponse.redirect(url, 301);
  }
  if (url.pathname === '/guides/how-to-check-monitor-ghosting' || url.pathname === '/guides/ghosting') {
    url.pathname = '/en/knowledge-base/monitor-ghosting-and-motion-blur';
    return NextResponse.redirect(url, 301);
  }

  // 4. Ensure any non-localized path automatically 301 redirects to /en/...
  const pathnameHasLocale = routing.locales.some(
    (loc) => url.pathname === `/${loc}` || url.pathname.startsWith(`/${loc}/`)
  );

  if (!pathnameHasLocale && !url.pathname.startsWith('/api') && !url.pathname.includes('.')) {
    url.pathname = `/en${url.pathname === '/' ? '' : url.pathname}`;
    return NextResponse.redirect(url, 301);
  }

  return intlMiddleware(request);
}


export const config = {
  // Match only internationalized pathnames and non-asset routes
  matcher: ['/', '/(hi|es|fr|de|pt|ja|ko|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)']
};

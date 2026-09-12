export const onRequest = async (context: { request: Request; next: () => Promise<Response> }) => {
  const url = new URL(context.request.url);

  // 1. Canonical hostname enforcement: redirect www and staging to apex domain (301)
  if (url.hostname === 'www.screen-tester.com' || url.hostname.startsWith('www.') || url.hostname.endsWith('.pages.dev')) {
    url.hostname = 'screen-tester.com';
    return Response.redirect(url.toString(), 301);
  }

  // 2. Calculators redirect: /:locale/tests/calculators -> /:locale/tests/compare-displays (301)
  const calcLocaleMatch = url.pathname.match(/^\/([a-z]{2})\/tests\/calculators\/?$/);
  if (calcLocaleMatch) {
    url.pathname = `/${calcLocaleMatch[1]}/tests/compare-displays`;
    return Response.redirect(url.toString(), 301);
  }
  if (url.pathname === '/tests/calculators' || url.pathname === '/tests/calculators/') {
    url.pathname = '/en/tests/compare-displays';
    return Response.redirect(url.toString(), 301);
  }

  // 3. Consolidated Guides to Knowledge Base redirects (301)
  // dead-pixel-vs-stuck-pixel & aliases -> /knowledge-base/dead-pixel-vs-stuck-pixel
  const deadPixelMatch = url.pathname.match(/^\/([a-z]{2})\/guides\/(?:dead-pixel-vs-stuck-pixel|dead-pixels)\/?$/);
  if (deadPixelMatch) {
    url.pathname = `/${deadPixelMatch[1]}/knowledge-base/dead-pixel-vs-stuck-pixel`;
    return Response.redirect(url.toString(), 301);
  }
  if (url.pathname === '/guides/dead-pixel-vs-stuck-pixel' || url.pathname === '/guides/dead-pixels') {
    url.pathname = '/en/knowledge-base/dead-pixel-vs-stuck-pixel';
    return Response.redirect(url.toString(), 301);
  }

  // how-to-check-backlight-bleed & aliases -> /knowledge-base/backlight-bleed-vs-ips-glow
  const bleedMatch = url.pathname.match(/^\/([a-z]{2})\/guides\/(?:how-to-check-backlight-bleed|backlight-bleed)\/?$/);
  if (bleedMatch) {
    url.pathname = `/${bleedMatch[1]}/knowledge-base/backlight-bleed-vs-ips-glow`;
    return Response.redirect(url.toString(), 301);
  }
  if (url.pathname === '/guides/how-to-check-backlight-bleed' || url.pathname === '/guides/backlight-bleed') {
    url.pathname = '/en/knowledge-base/backlight-bleed-vs-ips-glow';
    return Response.redirect(url.toString(), 301);
  }

  // how-to-check-monitor-ghosting & aliases -> /knowledge-base/monitor-ghosting-and-motion-blur
  const ghostingMatch = url.pathname.match(/^\/([a-z]{2})\/guides\/(?:how-to-check-monitor-ghosting|ghosting)\/?$/);
  if (ghostingMatch) {
    url.pathname = `/${ghostingMatch[1]}/knowledge-base/monitor-ghosting-and-motion-blur`;
    return Response.redirect(url.toString(), 301);
  }
  if (url.pathname === '/guides/how-to-check-monitor-ghosting' || url.pathname === '/guides/ghosting') {
    url.pathname = '/en/knowledge-base/monitor-ghosting-and-motion-blur';
    return Response.redirect(url.toString(), 301);
  }

  return context.next();
};

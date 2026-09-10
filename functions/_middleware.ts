export const onRequest = async (context: { request: Request; next: () => Promise<Response> }) => {
  const url = new URL(context.request.url);

  // If request comes from a Cloudflare Pages domain (*.pages.dev)
  if (url.hostname.endsWith('.pages.dev')) {
    url.hostname = 'screen-tester.com';
    return Response.redirect(url.toString(), 301);
  }

  return context.next();
};

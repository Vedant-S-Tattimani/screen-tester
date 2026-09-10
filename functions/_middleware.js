export async function onRequest(context) {
  const url = new URL(context.request.url);

  // Redirect any *.pages.dev staging hostname to screen-tester.com
  if (url.hostname.endsWith('.pages.dev')) {
    url.hostname = 'screen-tester.com';
    return Response.redirect(url.toString(), 301);
  }

  return context.next();
}

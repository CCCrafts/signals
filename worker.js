export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const needsCors = path.startsWith('/raw/') || path === '/llms.txt' || path === '/llms-full.txt';

    // CORS preflight
    if (request.method === 'OPTIONS' && needsCors) {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': '*',
        },
      });
    }

    // Serve from assets
    const response = await env.ASSETS.fetch(request);

    // Add CORS headers for AI-readable paths
    if (needsCors) {
      const newResponse = new Response(response.body, response);
      newResponse.headers.set('Access-Control-Allow-Origin', '*');
      return newResponse;
    }

    return response;
  },
};

/**
 * Deploy Cloudflare Dynamic Redirect Rule via Cloudflare Rulesets API
 * 
 * Usage:
 *   CLOUDFLARE_API_TOKEN="your-api-token" CLOUDFLARE_ZONE_ID="your-zone-id" node scripts/deploy-cloudflare-redirect-rule.js
 */

const https = require('https');

const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const ZONE_ID = process.env.CLOUDFLARE_ZONE_ID;

if (!API_TOKEN || !ZONE_ID) {
  console.error('Error: Please provide CLOUDFLARE_API_TOKEN and CLOUDFLARE_ZONE_ID environment variables.');
  process.exit(1);
}

const rulePayload = {
  rules: [
    {
      action: 'redirect',
      action_parameters: {
        from_value: {
          status_code: 301,
          target_url: {
            expression: 'concat("https://screen-tester.com", http.request.uri.path)'
          },
          preserve_query_string: true
        }
      },
      description: 'Redirect Pages.dev Staging to Production',
      enabled: true,
      expression: 'http.host eq "screen-tester-bsf.pages.dev"'
    }
  ]
};

const data = JSON.stringify(rulePayload);

const options = {
  hostname: 'api.cloudflare.com',
  port: 443,
  path: `/client/v4/zones/${ZONE_ID}/rulesets/phases/http_request_dynamic_redirect/entry`,
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    try {
      const response = JSON.parse(body);
      if (response.success) {
        console.log('✓ Cloudflare Dynamic Redirect Rule successfully deployed!');
        console.log(JSON.stringify(response.result, null, 2));
      } else {
        console.error('✗ Failed to deploy Cloudflare rule:', response.errors);
      }
    } catch (e) {
      console.error('Error parsing response:', e, body);
    }
  });
});

req.on('error', (e) => {
  console.error('Network error:', e);
});

req.write(data);
req.end();

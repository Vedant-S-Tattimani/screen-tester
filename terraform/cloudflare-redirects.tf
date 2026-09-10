terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }
}

variable "cloudflare_zone_id" {
  type        = string
  description = "The Cloudflare Zone ID for screen-tester.com"
}

resource "cloudflare_ruleset" "redirect_pages_dev_to_production" {
  zone_id     = var.cloudflare_zone_id
  name        = "Redirect Pages.dev Staging to Production"
  description = "Redirect screen-tester-bsf.pages.dev to screen-tester.com preserving path and query string"
  kind        = "zone"
  phase       = "http_request_dynamic_redirect"

  rules {
    action      = "redirect"
    description = "Redirect Pages.dev Staging to Production"
    enabled     = true
    expression  = "http.host eq \"screen-tester-bsf.pages.dev\""

    action_parameters {
      from_value {
        status_code = 301
        target_url {
          expression = "concat(\"https://screen-tester.com\", http.request.uri.path)"
        }
        preserve_query_string = true
      }
    }
  }
}

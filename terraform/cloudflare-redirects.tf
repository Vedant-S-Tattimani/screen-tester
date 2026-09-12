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

resource "cloudflare_ruleset" "canonical_hostname_and_staging_redirects" {
  zone_id     = var.cloudflare_zone_id
  name        = "Canonical Hostname and Staging Redirects"
  description = "Redirect www.screen-tester.com and staging domains to canonical screen-tester.com preserving path and query string"
  kind        = "zone"
  phase       = "http_request_dynamic_redirect"

  rules {
    action      = "redirect"
    description = "Redirect www.screen-tester.com to screen-tester.com"
    enabled     = true
    expression  = "http.host eq \"www.screen-tester.com\""

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

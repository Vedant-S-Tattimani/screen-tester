"use client";

import { Link } from "@/i18n/routing";
import { ChevronRight, Home } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { getBaseUrl } from "@/lib/seo";

interface BreadcrumbItem {
  label: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const t = useTranslations("Breadcrumbs");
  const locale = useLocale();
  const baseUrl = getBaseUrl();
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": t("home"),
        "item": `${baseUrl}/${locale}`
      },
      ...items.map((item, index) => {
        const cleanHref = item.href.startsWith('/') ? item.href : `/${item.href}`;
        return {
          "@type": "ListItem",
          "position": index + 2,
          "name": item.label,
          "item": `${baseUrl}/${locale}${cleanHref}`
        };
      })
    ]
  };

  return (
    <nav aria-label={t("ariaLabel")} className="mb-8 w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
        <li>
          <Link href="/" className="hover:text-foreground transition-colors flex items-center">
            <Home className="w-4 h-4" />
            <span className="sr-only">{t("home")}</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center space-x-2">
            <ChevronRight className="w-4 h-4 text-border" />
            <Link 
              href={item.href}
              className={`transition-colors ${index === items.length - 1 ? "text-foreground font-medium pointer-events-none" : "hover:text-foreground"}`}
              aria-current={index === items.length - 1 ? "page" : undefined}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

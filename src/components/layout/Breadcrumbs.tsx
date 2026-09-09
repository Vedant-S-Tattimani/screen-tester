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
  
  const filteredItems = items.filter(item => item.href !== "/" && item.href !== "");

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
      ...filteredItems.map((item, index) => {
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
    <nav aria-label={t("ariaLabel")} className="mb-8 w-full overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs sm:text-sm text-muted-foreground">
        <li className="shrink-0">
          <Link href="/" className="hover:text-foreground transition-colors flex items-center">
            <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="sr-only">{t("home")}</span>
          </Link>
        </li>
        {filteredItems.map((item, index) => (
          <li key={item.href} className="flex items-center gap-x-2 min-w-0 max-w-full">
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-border shrink-0" />
            <Link 
              href={item.href}
              className={`transition-colors truncate max-w-[180px] sm:max-w-sm md:max-w-none ${index === filteredItems.length - 1 ? "text-foreground font-medium pointer-events-none" : "hover:text-foreground"}`}
              aria-current={index === filteredItems.length - 1 ? "page" : undefined}
              title={item.label}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

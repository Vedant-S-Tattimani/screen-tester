"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { TestRow } from "@/components/layout/TestRow";

interface TestItem {
  href: string;
  title: string;
  description: string;
}

interface TestCategory {
  id: string;
  title: string;
  tests: TestItem[];
}

export function TestLibrary({ categories, searchPlaceholder }: { categories: TestCategory[], searchPlaceholder: string }) {
  const t = useTranslations("TestLibrary");
  const [query, setQuery] = useState("");

  const filteredCategories = categories.map(cat => ({
    ...cat,
    tests: cat.tests.filter(test => 
      test.title.toLowerCase().includes(query.toLowerCase()) || 
      test.description.toLowerCase().includes(query.toLowerCase())
    )
  })).filter(cat => cat.tests.length > 0);

  return (
    <div className="space-y-16">
      {/* Search Bar */}
      <div className="relative max-w-xl">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground">
          <Search className="h-5 w-5" />
        </div>
        <input
          type="text"
          className="block w-full pl-12 pr-4 py-4 bg-background border border-border/50 rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground transition-shadow"
          placeholder={searchPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Categories */}
      {filteredCategories.length > 0 ? (
        <div className="space-y-24">
          {filteredCategories.map(cat => (
            <div key={cat.id}>
              <div className="flex items-center gap-6 mb-8">
                <h2 className="text-sm font-mono font-semibold uppercase tracking-[0.2em] text-foreground whitespace-nowrap">
                  {cat.title}
                </h2>
                <div className="h-px w-full bg-border/60"></div>
              </div>
              <div className="flex flex-col">
                {cat.tests.map(test => (
                  <TestRow 
                    key={test.href}
                    href={test.href}
                    title={test.title}
                    description={test.description}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center text-muted-foreground">
          {t("noResults", { query })}
        </div>
      )}
    </div>
  );
}

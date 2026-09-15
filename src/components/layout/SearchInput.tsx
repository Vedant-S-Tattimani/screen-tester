"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { Search, Monitor, BookOpen, Layers, HelpCircle, ChevronRight } from "lucide-react";
import { monitorTests } from "@/data/tests";
import { monitorGuides } from "@/data/guides";
import { getInspectionWorkflows } from "@/data/workflows";

interface SearchResultItem {
  type: "test" | "workflow" | "guide" | "resource";
  id: string;
  title: string;
  subtitle: string;
  href: string;
}

interface SearchInputProps {
  onSelect?: () => void;
  placeholder?: string;
  id?: string;
  name?: string;
}

export function SearchInput({ 
  onSelect, 
  placeholder,
  id = "header-search-input",
  name = "q"
}: SearchInputProps = {}) {
  const router = useRouter();
  const locale = useLocale();
  const tHeader = useTranslations("Header");
  const tTestPages = useTranslations("TestPages");
  const tInspection = useTranslations("Inspection.workflowUi");

  const effectivePlaceholder = placeholder || (tHeader.has("searchPlaceholder") ? tHeader("searchPlaceholder") : "Search tests or guides...");

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter items across all categories
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const matchedTests: SearchResultItem[] = monitorTests
      .filter(t => {
        const title = tTestPages.has(`${t.id}.title`) ? tTestPages(`${t.id}.title`) : "";
        return (
          t.id.toLowerCase().includes(q) || 
          title.toLowerCase().includes(q) ||
          t.primaryIntent.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
        );
      })
      .slice(0, 5)
      .map(t => {
        const title = tTestPages.has(`${t.id}.title`) ? tTestPages(`${t.id}.title`) : t.id.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
        return {
          type: "test" as const,
          id: t.id,
          title,
          subtitle: `${t.category.toUpperCase()} TEST`,
          href: `/tests/${t.id}`
        };
      });

    const workflows = getInspectionWorkflows(locale);
    const workflowSubtitle = tInspection.has("workflowEyebrow") ? tInspection("workflowEyebrow") : "INSPECTION WORKFLOW";

    const matchedWorkflows: SearchResultItem[] = workflows
      .filter(w =>
        w.title.toLowerCase().includes(q) ||
        w.shortDescription.toLowerCase().includes(q) ||
        w.id.toLowerCase().includes(q) ||
        w.sequence.some(s => s.toLowerCase().includes(q))
      )
      .slice(0, 3)
      .map(w => ({
        type: "workflow" as const,
        id: w.id,
        title: w.title,
        subtitle: workflowSubtitle,
        href: w.route
      }));

    const matchedGuides: SearchResultItem[] = monitorGuides
      .filter(g => 
        g.id.toLowerCase().includes(q) || 
        g.primaryIntent.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q)
      )
      .slice(0, 3)
      .map(g => ({
        type: "guide" as const,
        id: g.id,
        title: g.id.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
        subtitle: "GUIDE",
        href: `/guides/${g.id}`
      }));

    const staticResources: SearchResultItem[] = [
      {
        type: "resource",
        id: "knowledge-base",
        title: tHeader.has("dropdown.knowledgeBase") ? tHeader("dropdown.knowledgeBase") : "Display Knowledge Base",
        subtitle: "KNOWLEDGE BASE",
        href: "/knowledge-base"
      },
      {
        type: "resource",
        id: "troubleshooting",
        title: tHeader.has("dropdown.troubleshooting") ? tHeader("dropdown.troubleshooting") : "Troubleshooting Guide",
        subtitle: "TROUBLESHOOTING",
        href: "/knowledge-base/troubleshooting"
      },
      {
        type: "resource",
        id: "resolution-checker",
        title: tHeader.has("dropdown.displayInfo") ? tHeader("dropdown.displayInfo") : "Display Information & Capabilities",
        subtitle: "DISPLAY INFO",
        href: "/tests/resolution-checker"
      }
    ];

    const matchedResources: SearchResultItem[] = staticResources
      .filter(r => 
        r.title.toLowerCase().includes(q) || 
        r.id.toLowerCase().includes(q) ||
        (q.includes("trouble") && r.id === "troubleshooting") ||
        (q.includes("hilfe") && r.id === "troubleshooting") ||
        (q.includes("ayuda") && r.id === "troubleshooting") ||
        (q.includes("know") && r.id === "knowledge-base") ||
        (q.includes("info") && r.id === "resolution-checker") ||
        (q.includes("dpr") && r.id === "resolution-checker")
      );

    return [...matchedTests, ...matchedWorkflows, ...matchedGuides, ...matchedResources];
  }, [query, locale, tTestPages, tInspection, tHeader]);

  const navigateOrOpen = (item: SearchResultItem) => {
    const isTestOrTool = item.type === "test" || item.href.startsWith("/tests/") || item.href.startsWith("/tools/");
    if (isTestOrTool) {
      const url = locale ? `/${locale}${item.href}` : item.href;
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      router.push(item.href);
    }
    setIsOpen(false);
    setQuery("");
    onSelect?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = results[selectedIndex] || results[0];
      if (selected) {
        navigateOrOpen(selected);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      onSelect?.();
    }
  };

  const handleSelect = (item: SearchResultItem) => {
    navigateOrOpen(item);
  };

  const getItemIcon = (type: SearchResultItem["type"]) => {
    switch (type) {
      case "test": return <Monitor className="w-3.5 h-3.5 text-blue-600 shrink-0" />;
      case "workflow": return <Layers className="w-3.5 h-3.5 text-purple-600 shrink-0" />;
      case "guide": return <BookOpen className="w-3.5 h-3.5 text-emerald-600 shrink-0" />;
      case "resource": return <HelpCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />;
    }
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="flex items-center bg-[#f1f2f4] hover:bg-[#eaebed] focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-gray-300 border border-transparent rounded-full px-3 py-1.5 transition-all w-full">
        <Search className="w-3.5 h-3.5 text-gray-500 mr-2 shrink-0" />
        <input
          id={id}
          name={name}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(0);
          }}
          onFocus={() => {
            if (query.trim()) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={effectivePlaceholder}
          aria-label={effectivePlaceholder}
          className="w-full bg-transparent text-gray-900 placeholder:text-gray-500 text-xs focus:outline-none"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
            className="p-0.5 text-gray-500 hover:text-gray-700 rounded-full ml-1"
            aria-label="Clear query"
          >
            <span className="text-xs font-bold leading-none">&times;</span>
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200/90 rounded-2xl shadow-xl overflow-hidden z-50 py-1 max-h-96 overflow-y-auto">
          {results.map((item, idx) => (
            <button
              key={`${item.type}-${item.id}`}
              onClick={() => handleSelect(item)}
              onMouseEnter={() => setSelectedIndex(idx)}
              className={`w-full text-left px-4 py-2.5 flex items-center justify-between transition-colors cursor-pointer ${
                selectedIndex === idx ? "bg-gray-100/70" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                {getItemIcon(item.type)}
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-gray-900 truncate">
                    {item.title}
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
                    {item.subtitle}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-3 h-3 text-gray-500 shrink-0 ml-2" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
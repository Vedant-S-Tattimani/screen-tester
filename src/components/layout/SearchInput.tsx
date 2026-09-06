"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "@/i18n/routing";
import { Search, X, Monitor, BookOpen, ChevronRight } from "lucide-react";
import { monitorTests } from "@/data/tests";
import { monitorGuides } from "@/data/guides";

export function SearchInput() {
  const router = useRouter();
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

  // Filter items
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const matchedTests = monitorTests
      .filter(t => 
        t.id.toLowerCase().includes(q) || 
        t.primaryIntent.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      )
      .slice(0, 5)
      .map(t => ({
        type: "test" as const,
        id: t.id,
        title: t.id.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
        subtitle: t.category.toUpperCase(),
        href: `/tests/${t.id}`
      }));

    const matchedGuides = monitorGuides
      .filter(g => 
        g.id.toLowerCase().includes(g.id) && (
          g.id.toLowerCase().includes(q) || 
          g.primaryIntent.toLowerCase().includes(q)
        )
      )
      .slice(0, 4)
      .map(g => ({
        type: "guide" as const,
        id: g.id,
        title: g.id.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
        subtitle: "GUIDE",
        href: `/guides/${g.id}`
      }));

    return [...matchedTests, ...matchedGuides];
  }, [query]);

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
        router.push(selected.href);
        setIsOpen(false);
        setQuery("");
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleSelect = (href: string) => {
    router.push(href);
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div className="relative" ref={containerRef}>
      <div className="flex items-center bg-[#f1f2f4] hover:bg-[#eaebed] focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-gray-300 border border-transparent rounded-full px-3 py-1.5 transition-all w-48 sm:w-60 lg:w-64">
        <Search className="w-3.5 h-3.5 text-gray-400 mr-2 shrink-0" />
        <input
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
          placeholder="Search tests or guides..."
          aria-label="Search tests or guides"
          className="w-full bg-transparent text-gray-900 placeholder:text-gray-400 text-xs focus:outline-none"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
            className="p-0.5 text-gray-400 hover:text-gray-600 rounded-full ml-1"
            aria-label="Clear search query"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {isOpen && query.trim() && (
        <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50 py-2 animate-in fade-in-50 slide-in-from-top-1 duration-150">
          {results.length > 0 ? (
            <div className="space-y-1">
              <div className="px-3 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-gray-400">
                Matches
              </div>
              {results.map((item, idx) => (
                <button
                  key={item.href}
                  onClick={() => handleSelect(item.href)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs transition-colors ${
                    selectedIndex === idx ? "bg-blue-50 text-blue-950 font-medium" : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {item.type === "test" ? (
                      <Monitor className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    ) : (
                      <BookOpen className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    )}
                    <span className="truncate">{item.title}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
                      {item.subtitle}
                    </span>
                    <ChevronRight className="w-3 h-3 text-gray-400" />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-4 py-3 text-xs text-gray-500 text-center">
              No matching tests or guides found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
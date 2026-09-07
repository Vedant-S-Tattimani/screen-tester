"use client";

import { useState, useEffect } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { SearchInput } from "./SearchInput";
import { Search, Menu, X } from "lucide-react";

export function Header() {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const isActive = (path: string) => pathname.startsWith(path);

  const testsActive = isActive("/tests");
  const inspectionActive = isActive("/monitor-inspection");
  const guidesActive = isActive("/guides");

  // Handle ESC key to close search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200/80 h-16 sm:h-[68px]">
        <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-6 sm:px-10 lg:px-16">
          
          {/* Brand with subtle underline */}
          <Link 
            href="/" 
            className="inline-block group focus-visible:ring-2 focus-visible:ring-blue-500 rounded select-none py-1" 
            onClick={() => setMobileOpen(false)}
          >
            <span className="font-mono text-[13px] sm:text-[14px] font-bold uppercase tracking-[0.16em] text-gray-950 block leading-none">
              MONITOR TESTER
            </span>
            <span className="block h-[1px] w-full bg-gray-950 mt-1" />
          </Link>

          {/* Center Navigation Links - Understated, editorial */}
          <nav className="hidden md:flex items-center gap-9 h-full" aria-label="Main Navigation">
            <Link 
              href="/tests"
              className={`text-[14px] transition-colors py-2 focus-visible:ring-2 focus-visible:ring-blue-500 rounded ${
                testsActive ? "text-gray-950 font-semibold" : "text-gray-600 hover:text-gray-950 font-normal"
              }`}
            >
              {t("nav.tests")}
            </Link>

            <Link 
              href="/monitor-inspection"
              className={`text-[14px] transition-colors py-2 focus-visible:ring-2 focus-visible:ring-blue-500 rounded ${
                inspectionActive ? "text-gray-950 font-semibold" : "text-gray-600 hover:text-gray-950 font-normal"
              }`}
            >
              {t("nav.inspection")}
            </Link>

            <Link 
              href="/guides"
              className={`text-[14px] transition-colors py-2 focus-visible:ring-2 focus-visible:ring-blue-500 rounded ${
                guidesActive ? "text-gray-950 font-semibold" : "text-gray-600 hover:text-gray-950 font-normal"
              }`}
            >
              {t("nav.guides")}
            </Link>
          </nav>

          {/* Right Section: Minimal Search Icon + Language Switcher */}
          <div className="flex items-center gap-4 sm:gap-5">
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-1.5 text-gray-600 hover:text-gray-950 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md cursor-pointer"
              aria-label="Search tests and guides"
            >
              <Search className="w-[17px] h-[17px] stroke-[1.8]" />
            </button>

            <LanguageSwitcher />

            {/* Mobile Menu Toggle Button */}
            <button
              className="md:hidden p-1.5 text-gray-600 hover:text-gray-950 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg flex flex-col py-4 px-6 space-y-4 z-50 animate-in fade-in duration-150">
            <div className="mb-1">
              <SearchInput onSelect={() => setMobileOpen(false)} />
            </div>

            <div className="border-b border-gray-100 pb-3">
              <Link 
                href="/tests" 
                className="block text-sm font-semibold text-gray-950 mb-2"
                onClick={() => setMobileOpen(false)}
              >
                {t("nav.tests")}
              </Link>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 pl-2">
                <Link href="/tests" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1">{t("tests.pixels")}</Link>
                <Link href="/tests" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1">{t("tests.color")}</Link>
                <Link href="/tests" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1">{t("tests.luminance")}</Link>
                <Link href="/tests" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1">{t("tests.motion")}</Link>
              </div>
            </div>

            <div className="border-b border-gray-100 pb-3">
              <Link 
                href="/monitor-inspection" 
                className="block text-sm font-semibold text-gray-950 mb-2"
                onClick={() => setMobileOpen(false)}
              >
                {t("nav.inspection")}
              </Link>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 pl-2">
                <Link href="/monitor-inspection/new" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1">{t("inspection.new")}</Link>
                <Link href="/monitor-inspection/used" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1">{t("inspection.used")}</Link>
                <Link href="/monitor-inspection/gaming" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1">{t("inspection.gaming")}</Link>
                <Link href="/monitor-inspection/oled" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1">{t("inspection.oled")}</Link>
              </div>
            </div>

            <div>
              <Link 
                href="/guides" 
                className="block text-sm font-semibold text-gray-950 mb-2"
                onClick={() => setMobileOpen(false)}
              >
                {t("nav.guides")}
              </Link>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 pl-2">
                <Link href="/guides" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1">All Guides</Link>
                <Link href="/guides/dead-pixel-vs-stuck-pixel" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1">Dead vs Stuck</Link>
                <Link href="/guides/how-to-check-monitor-ghosting" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1">Ghosting</Link>
                <Link href="/guides/how-to-check-backlight-bleed" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1">Backlight Bleed</Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Quick Search Overlay Modal */}
      {searchModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px] flex items-start justify-center pt-20 px-4 animate-in fade-in duration-150"
          onClick={() => setSearchModalOpen(false)}
        >
          <div 
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400">
                Search Diagnostic Suite
              </span>
              <button 
                onClick={() => setSearchModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-700 rounded-md transition-colors"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4">
              <SearchInput onSelect={() => setSearchModalOpen(false)} />
            </div>
            <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100 text-[11px] text-gray-400 flex items-center justify-between">
              <span>Press ESC to close</span>
              <span>Search across 29 display tests & guides</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
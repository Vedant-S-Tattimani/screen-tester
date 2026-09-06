"use client";

import { useState } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { SearchInput } from "./SearchInput";
import { ChevronDown, Menu, X } from "lucide-react";

export function Header() {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => pathname.startsWith(path);

  const testsActive = isActive("/tests");
  const inspectionActive = isActive("/monitor-inspection");
  const guidesActive = isActive("/guides");

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-xs border-b border-gray-150/80 h-16">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand & Sub-identity */}
        <Link 
          href="/" 
          className="flex flex-col justify-center group focus-visible:ring-2 focus-visible:ring-blue-500 rounded p-1" 
          onClick={() => setMobileOpen(false)}
        >
          <span className="font-sans text-[14px] sm:text-[15px] font-bold uppercase tracking-wider text-gray-950 group-hover:opacity-85 transition-opacity">
            {t("title")}
          </span>
          <span className="text-[9px] font-mono font-medium tracking-[0.22em] text-gray-400 block -mt-0.5">
            CHECK · INSPECT · UNDERSTAND
          </span>
        </Link>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 h-full">
          {/* Tests */}
          <div className="relative h-full flex items-center group">
            <Link 
              href="/tests"
              className={`text-[13px] font-medium tracking-wide transition-colors py-4 flex items-center gap-1 h-full focus-visible:ring-2 focus-visible:ring-blue-500 rounded ${
                testsActive ? "text-gray-950 font-semibold" : "text-gray-600 hover:text-gray-950"
              }`}
            >
              <span>{t("nav.tests")}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-700 transition-transform group-hover:rotate-180" />
            </Link>
            <div className="absolute top-full left-0 hidden group-hover:block group-focus-within:block pt-1 z-50">
              <div className="bg-white border border-gray-200 rounded-xl shadow-lg py-2 min-w-44 text-xs">
                <Link href="/tests" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-colors">{t("tests.pixels")}</Link>
                <Link href="/tests" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-colors">{t("tests.color")}</Link>
                <Link href="/tests" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-colors">{t("tests.luminance")}</Link>
                <Link href="/tests" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-colors">{t("tests.display")}</Link>
                <Link href="/tests" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-colors">{t("tests.motion")}</Link>
                <Link href="/tests" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-colors">{t("tests.advanced")}</Link>
              </div>
            </div>
          </div>

          {/* Inspection */}
          <div className="relative h-full flex items-center group">
            <Link 
              href="/monitor-inspection"
              className={`text-[13px] font-medium tracking-wide transition-colors py-4 flex items-center gap-1 h-full focus-visible:ring-2 focus-visible:ring-blue-500 rounded ${
                inspectionActive ? "text-gray-950 font-semibold" : "text-gray-600 hover:text-gray-950"
              }`}
            >
              <span>{t("nav.inspection")}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-700 transition-transform group-hover:rotate-180" />
            </Link>
            <div className="absolute top-full left-0 hidden group-hover:block group-focus-within:block pt-1 z-50">
              <div className="bg-white border border-gray-200 rounded-xl shadow-lg py-2 min-w-48 text-xs">
                <Link href="/monitor-inspection/used" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-colors">Used Monitor</Link>
                <Link href="/monitor-inspection/gaming" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-colors">Gaming Display</Link>
                <Link href="/monitor-inspection/oled" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-colors">OLED Display</Link>
              </div>
            </div>
          </div>

          {/* Guides */}
          <div className="relative h-full flex items-center group">
            <Link 
              href="/guides/monitor-screen-test"
              className={`text-[13px] font-medium tracking-wide transition-colors py-4 flex items-center gap-1 h-full focus-visible:ring-2 focus-visible:ring-blue-500 rounded ${
                guidesActive ? "text-gray-950 font-semibold" : "text-gray-600 hover:text-gray-950"
              }`}
            >
              <span>{t("nav.guides")}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-700 transition-transform group-hover:rotate-180" />
            </Link>
            <div className="absolute top-full left-0 hidden group-hover:block group-focus-within:block pt-1 z-50">
              <div className="bg-white border border-gray-200 rounded-xl shadow-lg py-2 min-w-48 text-xs">
                <Link href="/guides/monitor-screen-test" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-colors">{t("guides.monitor")}</Link>
                <Link href="/guides/laptop-screen-test" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-colors">{t("guides.laptop")}</Link>
                <Link href="/guides/tv-screen-test" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-colors">{t("guides.tv")}</Link>
                <Link href="/guides/oled-screen-test" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-colors">{t("guides.oled")}</Link>
                <Link href="/guides/mobile-screen-test" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-colors">{t("guides.mobile")}</Link>
                <Link href="/guides/lcd-screen-test" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-colors">{t("guides.lcd")}</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Right Section: Search & Language Switcher */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <SearchInput />
          </div>
          <LanguageSwitcher />

          {/* Mobile Menu Button */}
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

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-xl flex flex-col py-4 px-4 space-y-4 z-50 animate-in fade-in-50 slide-in-from-top-2 duration-150">
          <div className="sm:hidden mb-2">
            <SearchInput />
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
              <Link href="/tests" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1">{t("tests.display")}</Link>
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
            <div className="flex flex-col gap-1.5 text-xs text-gray-600 pl-2">
              <Link href="/monitor-inspection/used" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1">Used Monitor</Link>
              <Link href="/monitor-inspection/gaming" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1">Gaming Display</Link>
              <Link href="/monitor-inspection/oled" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1">OLED Display</Link>
            </div>
          </div>

          <div>
            <Link 
              href="/guides/monitor-screen-test" 
              className="block text-sm font-semibold text-gray-950 mb-2"
              onClick={() => setMobileOpen(false)}
            >
              {t("nav.guides")}
            </Link>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 pl-2">
              <Link href="/guides/monitor-screen-test" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1">{t("guides.monitor")}</Link>
              <Link href="/guides/laptop-screen-test" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1">{t("guides.laptop")}</Link>
              <Link href="/guides/tv-screen-test" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1">{t("guides.tv")}</Link>
              <Link href="/guides/oled-screen-test" onClick={() => setMobileOpen(false)} className="hover:text-gray-950 py-1">{t("guides.oled")}</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
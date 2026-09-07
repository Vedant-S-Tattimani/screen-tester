"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Laptop, ShieldCheck, Smartphone, Globe, ArrowRight } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Footer() {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200/80 bg-white text-gray-600">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16 xl:px-20 pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16">
        
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-6 xl:gap-8">
          
          {/* Column 1: Brand & Product Attributes (Full-width on tablet, 4 columns on desktop) */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-4 xl:col-span-4 pr-0 lg:pr-6">
            {/* Brand with subtle underline */}
            <Link 
              href="/" 
              className="inline-block group focus-visible:ring-2 focus-visible:ring-blue-500 rounded select-none py-1"
            >
              <span className="font-mono text-[13px] sm:text-[14px] font-bold uppercase tracking-[0.16em] text-gray-950 block leading-none">
                MONITOR TESTER
              </span>
              <span className="block h-[1px] w-full bg-gray-950 mt-1" />
            </Link>

            {/* Editorial summary */}
            <p className="text-[12px] sm:text-[13px] text-gray-500 leading-relaxed mt-4 max-w-sm">
              {t("description")}
            </p>

            {/* 4 Product Attributes Stack */}
            <div className="mt-7 sm:mt-8 space-y-4">
              {/* 1. Works in browser */}
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 text-gray-800">
                  <Laptop className="w-4 h-4 stroke-[1.8]" />
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-gray-900 leading-tight">
                    {t("attributes.browserTitle")}
                  </div>
                  <div className="text-[11px] sm:text-[12px] text-gray-500 mt-0.5 leading-snug">
                    {t("attributes.browserDesc")}
                  </div>
                </div>
              </div>

              {/* 2. Private and secure */}
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 text-gray-800">
                  <ShieldCheck className="w-4 h-4 stroke-[1.8]" />
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-gray-900 leading-tight">
                    {t("attributes.privacyTitle")}
                  </div>
                  <div className="text-[11px] sm:text-[12px] text-gray-500 mt-0.5 leading-snug">
                    {t("attributes.privacyDesc")}
                  </div>
                </div>
              </div>

              {/* 3. Works on any device */}
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 text-gray-800">
                  <Smartphone className="w-4 h-4 stroke-[1.8]" />
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-gray-900 leading-tight">
                    {t("attributes.deviceTitle")}
                  </div>
                  <div className="text-[11px] sm:text-[12px] text-gray-500 mt-0.5 leading-snug">
                    {t("attributes.deviceDesc")}
                  </div>
                </div>
              </div>

              {/* 4. Multi-language */}
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 text-gray-800">
                  <Globe className="w-4 h-4 stroke-[1.8]" />
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-gray-900 leading-tight">
                    {t("attributes.i18nTitle")}
                  </div>
                  <div className="text-[11px] sm:text-[12px] text-gray-500 mt-0.5 leading-snug">
                    {t("attributes.i18nDesc")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Tests */}
          <div className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-2">
            <h3 className="text-[14px] font-semibold text-gray-950 mb-4 tracking-tight">
              {t("columns.tests")}
            </h3>
            <ul className="space-y-2.5 text-[13px] text-gray-600">
              <li>
                <Link href="/tests" className="hover:text-gray-950 transition-colors py-0.5 block focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                  {t("links.allTests")}
                </Link>
              </li>
              <li>
                <Link href="/tests/dead-pixel-test" className="hover:text-gray-950 transition-colors py-0.5 block focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                  {t("links.deadPixel")}
                </Link>
              </li>
              <li>
                <Link href="/tests/color-test" className="hover:text-gray-950 transition-colors py-0.5 block focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                  {t("links.color")}
                </Link>
              </li>
              <li>
                <Link href="/tests/brightness-test" className="hover:text-gray-950 transition-colors py-0.5 block focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                  {t("links.brightness")}
                </Link>
              </li>
              <li>
                <Link href="/tests/ghosting-test" className="hover:text-gray-950 transition-colors py-0.5 block focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                  {t("links.ghosting")}
                </Link>
              </li>
              <li>
                <Link href="/tests/refresh-rate-test" className="hover:text-gray-950 transition-colors py-0.5 block focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                  {t("links.refreshRate")}
                </Link>
              </li>
              <li>
                <Link href="/tests/resolution-checker" className="hover:text-gray-950 transition-colors py-0.5 block focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                  {t("links.resolution")}
                </Link>
              </li>
              <li>
                <Link href="/tests/hdr-capability-test" className="hover:text-gray-950 transition-colors py-0.5 block focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                  {t("links.hdr")}
                </Link>
              </li>
              <li>
                <Link href="/tests/uniformity-test" className="hover:text-gray-950 transition-colors py-0.5 block focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                  {t("links.uniformity")}
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/tests" className="inline-flex items-center gap-1 font-medium text-gray-700 hover:text-gray-950 group transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                  <span>{t("links.moreTests")}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Inspection */}
          <div className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-2">
            <h3 className="text-[14px] font-semibold text-gray-950 mb-4 tracking-tight">
              {t("columns.inspection")}
            </h3>
            <ul className="space-y-2.5 text-[13px] text-gray-600">
              <li>
                <Link href="/monitor-inspection/new" className="hover:text-gray-950 transition-colors py-0.5 block focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                  {t("links.newMonitor")}
                </Link>
              </li>
              <li>
                <Link href="/monitor-inspection/used" className="hover:text-gray-950 transition-colors py-0.5 block focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                  {t("links.usedMonitor")}
                </Link>
              </li>
              <li>
                <Link href="/monitor-inspection/gaming" className="hover:text-gray-950 transition-colors py-0.5 block focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                  {t("links.gamingDisplay")}
                </Link>
              </li>
              <li>
                <Link href="/monitor-inspection/oled" className="hover:text-gray-950 transition-colors py-0.5 block focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                  {t("links.oledDisplay")}
                </Link>
              </li>
              <li>
                <Link href="/monitor-inspection/laptop" className="hover:text-gray-950 transition-colors py-0.5 block focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                  {t("links.laptopDisplay")}
                </Link>
              </li>
              <li>
                <Link href="/monitor-inspection/tv" className="hover:text-gray-950 transition-colors py-0.5 block focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                  {t("links.tvDisplay")}
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/monitor-inspection" className="inline-flex items-center gap-1 font-medium text-gray-700 hover:text-gray-950 group transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                  <span>{t("links.allWorkflows")}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Guides */}
          <div className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-2">
            <h3 className="text-[14px] font-semibold text-gray-950 mb-4 tracking-tight">
              {t("columns.guides")}
            </h3>
            <ul className="space-y-2.5 text-[13px] text-gray-600">
              <li>
                <Link href="/guides" className="hover:text-gray-950 transition-colors py-0.5 block focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                  {t("links.displayGuides")}
                </Link>
              </li>
              <li>
                <Link href="/knowledge-base" className="hover:text-gray-950 transition-colors py-0.5 block focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                  {t("links.knowledgeBase")}
                </Link>
              </li>
              <li>
                <Link href="/tests/resolution-checker" className="hover:text-gray-950 transition-colors py-0.5 block focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                  {t("links.displayInfo")}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-gray-950 transition-colors py-0.5 block focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                  {t("links.faq")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: About */}
          <div className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-2">
            <h3 className="text-[14px] font-semibold text-gray-950 mb-4 tracking-tight">
              {t("columns.about")}
            </h3>
            <ul className="space-y-2.5 text-[13px] text-gray-600">
              <li>
                <Link href="/about" className="hover:text-gray-950 transition-colors py-0.5 block focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                  {t("links.about")}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-gray-950 transition-colors py-0.5 block focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                  {t("links.privacy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gray-950 transition-colors py-0.5 block focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                  {t("links.terms")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-950 transition-colors py-0.5 block focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                  {t("links.contact")}
                </Link>
              </li>
              <li>
                <a 
                  href="https://github.com/Vedant-S-Tattimani/screen-tester" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-gray-950 transition-colors py-0.5 block focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                >
                  {t("links.contribute")}
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/Vedant-S-Tattimani/screen-tester/issues" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-gray-950 transition-colors py-0.5 block focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                >
                  {t("links.reportIssue")}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar Divider */}
        <div className="border-t border-gray-200/80 mt-14 sm:mt-16 lg:mt-20 pt-7 sm:pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            {/* Left: Dynamic Copyright */}
            <p className="text-[12px] sm:text-[13px] text-gray-500 text-center sm:text-left">
              © {currentYear} {t("copyright")}
            </p>

            {/* Right: Social & Language Switcher */}
            <div className="flex items-center gap-4 sm:gap-5">
              {/* GitHub */}
              <a
                href="https://github.com/Vedant-S-Tattimani/screen-tester"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-950 transition-colors p-1 rounded focus-visible:ring-2 focus-visible:ring-blue-500"
                aria-label="GitHub Repository"
                title="GitHub Repository"
              >
                <svg 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  aria-hidden="true"
                  className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
                >
                  <path 
                    fillRule="evenodd" 
                    clipRule="evenodd" 
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" 
                  />
                </svg>
              </a>

              {/* Vertical Separator */}
              <div className="h-4 w-[1px] bg-gray-200" aria-hidden="true" />

              {/* Language Selector */}
              <LanguageSwitcher dropUp={true} />
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
"use client";

import Image from "next/image";
import logoImg from "../../../public/logo.png";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";

const DIRECTORY_BADGES = [
  {
    name: "TheDevToolsIndex",
    href: "https://thedevtoolsindex.com/product/screen-tester?ref=badge",
    rel: "dofollow",
    src: "https://thedevtoolsindex.com/badge/screen-tester.svg",
    alt: "Featured on TheDevToolsIndex",
    width: 160,
    height: 44,
  },
  {
    name: "ToolDirs",
    href: "https://tooldirs.com",
    src: "https://tooldirs.com/badge/badge_transparent.svg",
    alt: "Featured on ToolDirs",
    width: 200,
    height: 54,
  },
  {
    name: "We Like Tools",
    href: "https://weliketools.com/tool/screen-tester",
    src: "https://weliketools.com/assets/images/badge.png",
    alt: "We Like Tools",
    height: 54,
    loading: "lazy" as const,
  },
  {
    name: "DodoDirectory",
    href: "https://dododirectory.com",
    rel: "dofollow",
    src: "https://dododirectory.com/badge-light.png",
    alt: "Featured on DodoDirectory",
    width: 200,
    height: 54,
  },
  {
    name: "TheMicroSaaSDir",
    href: "https://themicrosaasdir.com/product/screen-tester?ref=badge",
    rel: "dofollow",
    src: "https://themicrosaasdir.com/badge/screen-tester.svg",
    alt: "Featured on TheMicroSaaSDir",
    width: 160,
    height: 44,
  },
  {
    name: "SaaSLineup",
    href: "https://saaslineup.com/product/screen-tester?ref=badge",
    rel: "dofollow",
    src: "https://saaslineup.com/badge/screen-tester.svg",
    alt: "Featured on SaaSLineup",
    width: 160,
    height: 44,
  },
  {
    name: "UnoDirectory",
    href: "https://uno.directory",
    rel: "noopener",
    src: "https://uno.directory/uno-directory.svg",
    alt: "Listed on Uno Directory",
    width: 120,
    height: 30,
  },
  {
    name: "ToolFame",
    href: "https://toolfame.com/item/screen-tester",
    rel: "noopener noreferrer",
    src: "https://toolfame.com/badge-dark.svg",
    alt: "Featured on toolfame.com",
    height: 54,
  },
  {
    name: "NextBigProduct",
    href: "https://nextbigproduct.com/product/screen-tester",
    rel: "noopener noreferrer",
    src: "https://nextbigproduct.com/assets/badge/screen-tester.svg?theme=light",
    alt: "Featured on NextBigProduct",
    width: 250,
    height: 54,
  },
  {
    name: "EasyDoFollow",
    href: "https://easydofollow.dev/dev-tools/screen-tester",
    rel: "noopener",
    src: "https://easydofollow.dev/badge/easydofollow-badge-light.svg",
    alt: "Featured on EasyDoFollow",
    width: 188,
    height: 56,
  },
  {
    name: "Find Top Tools",
    href: "https://findtop.tools/projects/screen-tester?utm_source=badge",
    rel: "noopener noreferrer",
    src: "https://findtop.tools/findtoptools/images/badges/featured-on-light.svg",
    alt: "Featured on Find Top Tools",
    width: 150,
    height: 44,
  },
  {
    name: "IndexOfAI",
    href: "https://indexof.ai/tool/screen-tester?ref=screen-tester",
    rel: "noopener",
    src: "https://indexof.ai/badge-light.svg",
    alt: "Featured on IndexOf.AI",
    width: 200,
    height: 40,
  },
  {
    name: "Launch Llama",
    href: "https://tools.launchllama.co?utm_source=badge&utm_medium=referral",
    rel: "noopener noreferrer",
    src: "https://tools.launchllama.co/featured-badge.png?v=2",
    alt: "As seen on Launch Llama Newsletter",
    width: 200,
    height: 52,
  },
  {
    name: "Wired Business",
    href: "https://wired.business",
    rel: "noopener noreferrer",
    src: "https://wired.business/badge1-dark.svg",
    alt: "Featured on Wired Business",
    width: 200,
    height: 54,
  },
  {
    name: "SaaS Field",
    href: "https://saasfield.com/ai/screen-tester",
    src: "https://saasfield.com/assets/images/badge.png",
    alt: "SaaS Field",
    height: 54,
    loading: "lazy" as const,
  },
  {
    name: "Founder.best",
    href: "https://www.founder.best",
    rel: "noopener noreferrer",
    src: "https://www.founder.best/api/badge/featured/screen-tester",
    alt: "Screen Tester - Featured on Founder.best",
    width: 1195,
    height: 390,
    loading: "lazy" as const,
  },
  {
    name: "Appa List",
    href: "https://appalist.com/ai/screen-tester",
    src: "https://appalist.com/assets/images/badge.png",
    alt: "Appa List",
    height: 54,
    loading: "lazy" as const,
  },
];

export function Footer() {
  const t = useTranslations("Footer");
  const tHeader = useTranslations("Header");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200/80 bg-white text-gray-600">
      <div className="mx-auto max-w-[1360px] px-6 sm:px-8 lg:px-12 pt-12 sm:pt-14 pb-10">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 border-b border-gray-100">
          
          {/* Column 1: Brand & Description (4 cols) */}
          <div className="lg:col-span-4 pr-0 lg:pr-6">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2.5 group select-none py-0.5 focus-visible:ring-2 focus-visible:ring-gray-900 rounded"
            >
              <Image
                src={logoImg}
                alt="Screen Tester Logo"
                width={36}
                height={36}
                unoptimized
                className="w-8 h-8 object-contain shrink-0 aspect-square"
              />
              <div className="flex flex-col">
                <span className="font-mono text-[13px] sm:text-[14px] font-bold uppercase tracking-[0.14em] text-gray-950 block leading-tight">
                  SCREEN TESTER
                </span>
                <span className="text-[8.5px] font-mono font-medium tracking-[0.2em] text-gray-500 block uppercase mt-0.5">
                  CHECK · INSPECT · UNDERSTAND
                </span>
              </div>
            </Link>

            <p className="text-xs text-gray-500 leading-relaxed mt-3.5 max-w-sm">
              {t("description")}
            </p>
          </div>

          {/* Column 2: Tests (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-gray-900 mb-3.5">
              {t("columns.tests")}
            </h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li>
                <Link href="/tests/dead-pixel-test" className="hover:text-gray-950 transition-colors block py-0.5">
                  {tHeader("dropdown.deadPixels")}
                </Link>
              </li>
              <li>
                <Link href="/tests/color-test" className="hover:text-gray-950 transition-colors block py-0.5">
                  {tHeader("dropdown.colorTest")}
                </Link>
              </li>
              <li>
                <Link href="/tests/brightness-test" className="hover:text-gray-950 transition-colors block py-0.5">
                  {tHeader("dropdown.brightness")}
                </Link>
              </li>
              <li>
                <Link href="/tests/contrast-test" className="hover:text-gray-950 transition-colors block py-0.5">
                  {tHeader("dropdown.contrast")}
                </Link>
              </li>
              <li>
                <Link href="/tests/ghosting-test" className="hover:text-gray-950 transition-colors block py-0.5">
                  {tHeader("dropdown.ghosting")}
                </Link>
              </li>
              <li>
                <Link href="/tests/refresh-rate-test" className="hover:text-gray-950 transition-colors block py-0.5">
                  {tHeader("dropdown.refreshRate")}
                </Link>
              </li>
              <li>
                <Link href="/tests" className="font-medium text-gray-950 hover:underline flex items-center gap-1 pt-1">
                  <span>{tHeader("dropdown.viewAllTests")}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Inspection (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-gray-900 mb-3.5">
              {t("columns.inspection")}
            </h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li>
                <Link href="/monitor-inspection/general" className="hover:text-gray-950 transition-colors block py-0.5 font-medium text-gray-900">
                  {tHeader("dropdown.generalCheckup")}
                </Link>
              </li>
              <li>
                <Link href="/monitor-inspection/used" className="hover:text-gray-950 transition-colors block py-0.5">
                  {tHeader("dropdown.usedMonitor")}
                </Link>
              </li>
              <li>
                <Link href="/monitor-inspection/gaming" className="hover:text-gray-950 transition-colors block py-0.5">
                  {tHeader("dropdown.gamingDisplay")}
                </Link>
              </li>
              <li>
                <Link href="/monitor-inspection/oled" className="hover:text-gray-950 transition-colors block py-0.5">
                  {tHeader("dropdown.oledDisplay")}
                </Link>
              </li>
              <li>
                <Link href="/monitor-inspection/laptop" className="hover:text-gray-950 transition-colors block py-0.5">
                  {tHeader("dropdown.laptopDisplay")}
                </Link>
              </li>
              <li>
                <Link href="/monitor-inspection/tv" className="hover:text-gray-950 transition-colors block py-0.5">
                  {tHeader("inspection.tv")}
                </Link>
              </li>
              <li>
                <Link href="/monitor-inspection" className="font-medium text-gray-950 hover:underline flex items-center gap-1 pt-1">
                  <span>{tHeader("dropdown.inspectionHub")}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Guides & Tools (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-gray-900 mb-3.5">
              {t("columns.guidesAndTools")}
            </h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li>
                <Link href="/guides" className="hover:text-gray-950 transition-colors block py-0.5">
                  {t("links.displayGuides")}
                </Link>
              </li>
              <li>
                <Link href="/tests/display-info" className="hover:text-gray-950 transition-colors block py-0.5 font-medium text-gray-900">
                  {tHeader("dropdown.displayInfo")}
                </Link>
              </li>
              <li>
                <Link href="/tests/resolution-checker" className="hover:text-gray-950 transition-colors block py-0.5">
                  {tHeader("dropdown.resolutionPpi")}
                </Link>
              </li>
              <li>
                <Link href="/tests/compare-displays" className="hover:text-gray-950 transition-colors block py-0.5">
                  {tHeader("dropdown.compareDisplays")}
                </Link>
              </li>
              <li>
                <Link href="/tests/custom-pattern" className="hover:text-gray-950 transition-colors block py-0.5">
                  {tHeader("dropdown.customPattern")}
                </Link>
              </li>
              <li>
                <a 
                  href="https://keyboardtester1.com/" 
                  className="hover:text-gray-950 transition-colors block py-0.5 font-medium text-gray-900"
                >
                  Keyboard Tester
                </a>
              </li>
              <li>
                <Link href="/knowledge-base" className="hover:text-gray-950 transition-colors block py-0.5">
                  {t("links.knowledgeBase")}
                </Link>
              </li>
              <li>
                <Link href="/knowledge-base/troubleshooting" className="hover:text-gray-950 transition-colors block py-0.5">
                  {t("links.troubleshooting")}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-gray-950 transition-colors block py-0.5">
                  {t("links.faq")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Legal & About (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-gray-900 mb-3.5">
              {t("columns.about")}
            </h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li>
                <Link href="/about" className="hover:text-gray-950 transition-colors block py-0.5">
                  {t("links.about")}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-gray-950 transition-colors block py-0.5">
                  {t("links.privacy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gray-950 transition-colors block py-0.5">
                  {t("links.terms")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-950 transition-colors block py-0.5">
                  {t("links.contact")}
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Directory Badges Train Animation */}
        <div className="py-6 border-b border-gray-100 overflow-hidden">
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            <div className="animate-train items-center">
              {/* Track 1 */}
              <div className="flex shrink-0 items-center gap-8 sm:gap-12 pr-8 sm:pr-12">
                {[...DIRECTORY_BADGES, ...DIRECTORY_BADGES, ...DIRECTORY_BADGES].map((badge, idx) => (
                  <a
                    key={`train-1-${idx}`}
                    href={badge.href}
                    target="_blank"
                    rel={badge.rel || "noopener noreferrer"}
                    className="inline-flex items-center shrink-0 hover:opacity-75 transition-opacity"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={badge.src}
                      alt={badge.alt}
                      width={badge.width}
                      height={badge.height}
                      loading={badge.loading}
                      className="h-9 sm:h-10 w-auto object-contain shrink-0"
                    />
                  </a>
                ))}
              </div>

              {/* Track 2 (Duplicate for infinite seamless loop) */}
              <div className="flex shrink-0 items-center gap-8 sm:gap-12 pr-8 sm:pr-12" aria-hidden="true">
                {[...DIRECTORY_BADGES, ...DIRECTORY_BADGES, ...DIRECTORY_BADGES].map((badge, idx) => (
                  <a
                    key={`train-2-${idx}`}
                    href={badge.href}
                    target="_blank"
                    rel={badge.rel || "noopener noreferrer"}
                    tabIndex={-1}
                    className="inline-flex items-center shrink-0 hover:opacity-75 transition-opacity"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={badge.src}
                      alt={badge.alt}
                      width={badge.width}
                      height={badge.height}
                      loading={badge.loading}
                      className="h-9 sm:h-10 w-auto object-contain shrink-0"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, GitHub, and Language Switcher */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 text-center sm:text-left">
            © {currentYear} {t("copyright")}
          </p>

          <div className="flex items-center gap-4">
            {/* GitHub */}
            <a
              href="https://github.com/Vedant-S-Tattimani/screen-tester"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-950 transition-colors p-1 rounded focus-visible:ring-2 focus-visible:ring-gray-900"
              aria-label="GitHub Repository"
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                aria-hidden="true"
              >
                <path 
                  fillRule="evenodd" 
                  clipRule="evenodd" 
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" 
                />
              </svg>
            </a>

            <div className="h-3.5 w-[1px] bg-gray-200" aria-hidden="true" />

            {/* Language Switcher Dropup */}
            <LanguageSwitcher dropUp={true} />
          </div>
        </div>

      </div>
    </footer>
  );
}
"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface LanguageSwitcherProps {
  dropUp?: boolean;
}

export function LanguageSwitcher({ dropUp = false }: LanguageSwitcherProps = {}) {
  const t = useTranslations("LanguageSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const locales = ["en", "hi", "es", "fr", "de", "pt", "ja", "ko"] as const;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (nextLocale: string) => {
    router.replace(pathname, { locale: nextLocale });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-xs font-semibold text-gray-700 hover:text-gray-950 transition-colors px-1.5 py-1 rounded focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden cursor-pointer"
        aria-expanded={isOpen}
        aria-label={t("label")}
      >
        <span className="uppercase tracking-wider">{locale}</span>
        <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className={`absolute right-0 ${dropUp ? "bottom-full mb-2" : "top-full mt-2"} w-36 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50 py-1`}>
          <ul className="flex flex-col" role="listbox">
            {locales.map((l) => (
              <li key={l} role="none">
                <button
                  role="option"
                  aria-selected={locale === l}
                  onClick={() => handleSelect(l)}
                  className={`w-full text-left px-3.5 py-1.5 text-xs transition-colors flex items-center justify-between ${
                    locale === l 
                      ? "bg-blue-50 text-blue-900 font-semibold" 
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <span>{t(l as "en" | "hi" | "es" | "fr" | "de" | "pt" | "ja" | "ko")}</span>
                  <span className="uppercase text-[10px] font-mono text-gray-400">{l}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
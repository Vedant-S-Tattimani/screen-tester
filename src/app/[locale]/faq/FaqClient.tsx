"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useTranslations } from "next-intl";

const FAQ_KEYS = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"] as const;

export function FaqClient() {
  const t = useTranslations("Faq");
  const [openIndices, setOpenIndices] = useState<number[]>([0, 1]); // Open first two by default

  const toggleIndex = (index: number) => {
    setOpenIndices(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="space-y-4">
      {FAQ_KEYS.map((key, index) => {
        const isOpen = openIndices.includes(index);
        const question = t(`items.${key}.question`);
        const answer = t(`items.${key}.answer`);

        return (
          <div 
            key={key}
            className="border border-gray-200/80 rounded-2xl bg-white overflow-hidden transition-colors"
          >
            <button
              onClick={() => toggleIndex(index)}
              aria-expanded={isOpen}
              className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 group focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none cursor-pointer"
            >
              <h2 className="text-[15px] sm:text-[16px] font-semibold text-gray-900 group-hover:text-gray-950 transition-colors">
                {question}
              </h2>
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 bg-gray-100/80 group-hover:bg-gray-200/70 transition-colors">
                {isOpen ? (
                  <Minus className="w-3.5 h-3.5 text-gray-700" />
                ) : (
                  <Plus className="w-3.5 h-3.5 text-gray-700" />
                )}
              </div>
            </button>
            {isOpen && (
              <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100/80 animate-in fade-in duration-150">
                <p>{answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

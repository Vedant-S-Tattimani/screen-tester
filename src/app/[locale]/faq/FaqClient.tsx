"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
  category: "browser" | "hardware" | "privacy" | "troubleshooting";
}

const FAQ_DATA: FaqItem[] = [
  {
    question: "Can a browser detect dead pixels automatically?",
    answer: "No. A web browser has no optical sensor or camera to inspect physical hardware subpixels. Instead, Monitor Tester renders edge-to-edge, single-wavelength primary color fields (red, green, blue, black, white, magenta, cyan, yellow) allowing the human eye to immediately identify dark (dead) or permanently bright (stuck) subpixels with 100% precision.",
    category: "browser"
  },
  {
    question: "Does this work on laptops and TVs?",
    answer: "Yes. Monitor Tester is built entirely on standard Web APIs (Canvas, requestAnimationFrame, Fullscreen API, MatchMedia) and runs in any modern HTML5 browser on Windows, macOS, ChromeOS, Linux, Android, and iOS. When testing TVs via HDMI, ensure your TV's picture aspect ratio is set to 'Just Scan' / 1:1 and picture mode is set to 'PC' or 'Game' to avoid overscan cropping or heavy sharpening post-processing.",
    category: "hardware"
  },
  {
    question: "Is my display data or test results collected?",
    answer: "No. Monitor Tester is an entirely client-side web utility. Zero diagnostic observations, hardware identifiers, or screen metrics are transmitted to any remote server or third-party tracking service. When you record test observations (PASS, CHECK, ISSUE), they are stored locally in your browser's private localStorage and can be purged at any time.",
    category: "privacy"
  },
  {
    question: "Can this replace a hardware colorimeter or spectrophotometer?",
    answer: "No. A web browser cannot generate an ICC color profile or calibrate Delta-E accuracy without physical optical sensor hardware (e.g., Calibrite or Datacolor Spyder). Monitor Tester provides visual gradient test patterns, grayscale ramps, and color gamut boundaries (sRGB, Display P3) to tune contrast clipping, gamma, and color saturation by eye, but it is not a replacement for hardware sensor calibration.",
    category: "hardware"
  },
  {
    question: "Can a browser measure display brightness (nits)?",
    answer: "No. Browsers cannot measure the physical photometric luminance (candela per square meter / nits) emitted by your screen's backlight or OLED organic emitters. The browser displays stepped 0% to 100% grayscale patches so you can adjust your monitor's hardware brightness and contrast dials until near-black (1–5%) and near-white (95–99%) steps are visibly distinct without clipping.",
    category: "browser"
  },
  {
    question: "Can a browser measure pixel response time (GtG / MPRT)?",
    answer: "No. Gray-to-Gray (GtG) transition speed requires specialized high-speed optical photodiode oscilloscopes or pursuit cameras. The browser measures frame presentation timing via requestAnimationFrame, but cannot determine how many milliseconds physical liquid crystals take to transition. The Ghosting Test provides variable-speed motion tracking blocks to help you visually tune your monitor's overdrive setting.",
    category: "browser"
  },
  {
    question: "Why is my reported resolution different from my monitor's advertised spec?",
    answer: "Modern operating systems use display scaling factors (such as 125%, 150%, or 200% on Retina/4K laptops) so that UI elements remain readable. The browser's window.screen dimensions report logical CSS pixels. Multiplying logical resolution by window.devicePixelRatio (DPR) reveals your screen's true physical native resolution. You can view both logical and physical values in our Display Information tool.",
    category: "troubleshooting"
  },
  {
    question: "Why is my refresh rate different from what my monitor supports?",
    answer: "If your 144Hz or 240Hz monitor is only reporting 60Hz in the test, common causes include: (1) Windows/macOS display settings default to 60Hz until manually set to high refresh rate in Advanced Display Settings; (2) HDMI cable bandwidth limitations (DisplayPort or HDMI 2.1 is required for high refresh at 1440p/4K); (3) Browser hardware acceleration is disabled; or (4) Battery power-saving mode is capping frame rate.",
    category: "troubleshooting"
  }
];

export function FaqClient() {
  const [openIndices, setOpenIndices] = useState<number[]>([0, 1]); // Open first two by default

  const toggleIndex = (index: number) => {
    setOpenIndices(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="space-y-4">
      {FAQ_DATA.map((item, index) => {
        const isOpen = openIndices.includes(index);
        return (
          <div 
            key={index}
            className="border border-gray-200/80 rounded-2xl bg-white overflow-hidden transition-colors"
          >
            <button
              onClick={() => toggleIndex(index)}
              aria-expanded={isOpen}
              className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 group focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none cursor-pointer"
            >
              <h2 className="text-[15px] sm:text-[16px] font-semibold text-gray-900 group-hover:text-gray-950 transition-colors">
                {item.question}
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
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { Maximize, ShieldAlert, Info, Move } from "lucide-react";

interface BacklightBleedPatternProps {
  testId?: string;
}

type BlackFieldLevel = "0%" | "2%" | "5%";

export function BacklightBleedPattern({ testId = "backlight-bleed-test" }: BacklightBleedPatternProps) {
  const { toggleFullscreen } = useTestContext();
  const [level, setLevel] = useState<BlackFieldLevel>("0%");
  const [showCornerMarkers, setShowCornerMarkers] = useState(true);
  const [showAngleGuide, setShowAngleGuide] = useState(false);

  const getBackgroundColor = () => {
    switch (level) {
      case "0%": return "#000000";
      case "2%": return "rgb(5, 5, 5)";
      case "5%": return "rgb(13, 13, 13)";
      default: return "#000000";
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Visual Inspection Screen */}
      <div
        className="relative w-full aspect-video min-h-[460px] max-h-[75vh] rounded-2xl overflow-hidden border border-slate-900 shadow-2xl flex items-center justify-center p-6 select-none transition-colors duration-200"
        style={{ backgroundColor: getBackgroundColor() }}
      >
        {/* Optional Corner Calibration Markers */}
        {showCornerMarkers && (
          <>
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-slate-700/60 rounded-tl-lg pointer-events-none" />
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-slate-700/60 rounded-tr-lg pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-slate-700/60 rounded-bl-lg pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-slate-700/60 rounded-br-lg pointer-events-none" />
          </>
        )}

        {/* Center Viewing Angle / Diagnostic Target */}
        {showAngleGuide ? (
          <div className="p-6 max-w-lg bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-700/80 text-center space-y-4 shadow-2xl text-slate-200">
            <div className="w-12 h-12 mx-auto rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400">
              <Move className="w-6 h-6 animate-pulse" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-mono uppercase font-bold text-white tracking-wider">
                Viewing Angle Discrimination Test
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Step back 1 meter from your display and slowly shift your head 30° to the left, right, and upwards.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-left text-[11px] pt-2 border-t border-slate-800">
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <strong className="text-amber-400 block mb-1">IPS Glow Characteristic:</strong>
                <span className="text-slate-400">Glow shifts in intensity, shape, and color tint as your angle changes.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <strong className="text-rose-400 block mb-1">Backlight Bleed Characteristic:</strong>
                <span className="text-slate-400">Fixed bright leakage along edges/corners that stays stationary regardless of head position.</span>
              </div>
            </div>
            <button
              onClick={() => setShowAngleGuide(false)}
              className="w-full py-2 bg-foreground text-background text-xs font-semibold rounded-xl hover:opacity-90"
            >
              Hide Guide & Return to Full Screen
            </button>
          </div>
        ) : (
          <div className="text-center space-y-2 opacity-20 hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block">
              Pure Dark Field Inspection ({level})
            </span>
            <span className="text-[11px] font-mono text-slate-600 block">
              Hover to view controls • Press Fullscreen for dark room testing
            </span>
          </div>
        )}
      </div>

      {/* Control Strip */}
      <div className="mt-6 w-full max-w-4xl bg-card border border-border/70 rounded-2xl p-5 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Level Switcher */}
          <div className="flex items-center gap-1.5 bg-muted/60 p-1 rounded-xl border border-border/60">
            <span className="text-[11px] font-mono px-2 text-amber-500 dark:text-amber-300 font-bold uppercase tracking-wider">Background:</span>
            {(["0%", "2%", "5%"] as BlackFieldLevel[]).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevel(lvl)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  level === lvl
                    ? "bg-amber-500 dark:bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-300 font-extrabold"
                    : "text-slate-700 dark:text-cyan-100 hover:text-foreground hover:bg-muted font-semibold"
                }`}
              >
                {lvl === "0%" ? "0% Pure Black" : `${lvl} Dark Gray`}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCornerMarkers(prev => !prev)}
              className="px-3.5 py-2 bg-muted hover:bg-muted/80 text-foreground text-xs font-medium rounded-xl transition-colors"
            >
              {showCornerMarkers ? "Hide Corner Markers" : "Show Corner Markers"}
            </button>
            <button
              onClick={() => setShowAngleGuide(prev => !prev)}
              className="px-3.5 py-2 bg-muted hover:bg-muted/80 text-foreground text-xs font-medium rounded-xl transition-colors"
            >
              {showAngleGuide ? "Close Angle Guide" : "Viewing Angle Guide"}
            </button>
            <button
              onClick={toggleFullscreen}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-muted hover:bg-muted/80 text-foreground text-xs font-medium rounded-xl transition-colors"
            >
              <Maximize className="w-3.5 h-3.5" />
              Fullscreen
            </button>
          </div>
        </div>

        {/* Technical Honesty Disclaimer Banner */}
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-900 dark:text-amber-200 leading-relaxed space-y-1">
          <div className="flex items-center gap-2 font-semibold">
            <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Hardware Boundary Notice</span>
          </div>
          <p>
            Smartphone cameras and long exposures drastically exaggerate both backlight bleed and IPS glow due to camera sensor gain. <strong>Never judge backlight uniformity from photos</strong>. Furthermore, nearly all in-plane switching (IPS) panels have inherent optical glow when viewed off-angle; this is normal liquid crystal physics, not a manufacturing defect.
          </p>
        </div>

        {/* Diagnostic Guidance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-muted-foreground">
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">1. Dark Room Requirement:</strong> Perform this inspection in a completely dark room at your standard calibrated brightness (typically 120–150 nits).
            </div>
          </div>
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">2. Distinguish Fixed vs Moving:</strong> Fixed torch-like light beams along edges indicate mechanical bezel pinch (bleed). Diffuse corner sheen that disappears as you move directly in front of the corner is IPS glow.
            </div>
          </div>
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">3. Step Back 1 Meter:</strong> Sit at standard operating distance. Severe corner glow viewed from 12 inches away is often optical perspective rather than panel failure.
            </div>
          </div>
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">4. OLED Comparison:</strong> True self-emissive OLED panels have complete pixel shut-off at 0% with zero glow or bleed.
            </div>
          </div>
        </div>
      </div>

      <TestControlBar testId={testId} title="Backlight Bleed vs. IPS Glow" />
    </div>
  );
}

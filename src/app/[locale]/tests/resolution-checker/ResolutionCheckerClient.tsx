"use client";

import { useEffect, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { AlertCircle, Info } from "lucide-react";

// --- Helpers for formatting and calculations ---

function calculatePPI(width: number, height: number, inches: number): number {
  if (!inches || inches <= 0) return 0;
  return Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / inches;
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function getAspectRatio(w: number, h: number): string {
  if (w === 0 || h === 0) return "";
  // Check common approximate ratios first (e.g. 1366x768 is ~16:9 but math gives 683:384)
  const ratio = w / h;
  if (Math.abs(ratio - 16/9) < 0.05) return "16:9";
  if (Math.abs(ratio - 16/10) < 0.05) return "16:10";
  if (Math.abs(ratio - 21/9) < 0.05) return "21:9";
  if (Math.abs(ratio - 32/9) < 0.05) return "32:9";
  if (Math.abs(ratio - 4/3) < 0.05) return "4:3";
  
  const divisor = gcd(w, h);
  return `${w / divisor}:${h / divisor}`;
}

function classifyResolution(w: number, h: number, t: (key: string) => string): string {
  const pixels = w * h;
  if (pixels >= 33000000) return "8K";
  if (pixels >= 14000000) return "5K";
  if (pixels >= 8200000) return "UHD / 4K";
  if (w >= 3440 && h >= 1440) return "UWQHD";
  if (pixels >= 3600000) return "QHD";
  if (pixels >= 2000000) return "FHD";
  if (pixels >= 900000) return "HD";
  if (pixels > 0) return t("values.custom");
  return t("values.unknown");
}

const InfoRow = ({ label, value, unit = "" }: { label: string, value: React.ReactNode, unit?: string }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-border/30 last:border-0">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="font-mono text-[13px] font-medium text-foreground mt-1 sm:mt-0">
      {value} {unit && <span className="text-muted-foreground opacity-60 ml-1">{unit}</span>}
    </span>
  </div>
);

export function ResolutionCheckerClient() {
  const t = useTranslations("Tests.resolution-checker");
  
  // -- State for Live Info --
  const [liveInfo, setLiveInfo] = useState({
    w: 0, h: 0, 
    availW: 0, availH: 0,
    innerW: 0, innerH: 0,
    dpr: 1,
    colorDepth: 0,
    pixelDepth: 0,
    orientation: "",
    touch: false,
    hdr: false,
    p3: false,
    refreshRate: 0,
  });

  const updateInfo = useCallback(() => {
    if (typeof window === "undefined") return;

    setLiveInfo(prev => ({
      ...prev,
      w: window.screen.width,
      h: window.screen.height,
      availW: window.screen.availWidth,
      availH: window.screen.availHeight,
      innerW: window.innerWidth,
      innerH: window.innerHeight,
      dpr: window.devicePixelRatio || 1,
      colorDepth: window.screen.colorDepth,
      pixelDepth: window.screen.pixelDepth,
      orientation: window.screen.orientation?.type?.includes("landscape") ? t("values.landscape") : (window.screen.orientation?.type?.includes("portrait") ? t("values.portrait") : t("values.unknown")),
      touch: navigator.maxTouchPoints > 0,
      hdr: window.matchMedia("(dynamic-range: high)").matches,
      p3: window.matchMedia("(color-gamut: p3)").matches,
    }));
  }, [t]);

  useEffect(() => {
    queueMicrotask(updateInfo);
    window.addEventListener("resize", updateInfo);
    window.addEventListener("orientationchange", updateInfo);
    
    let frameCount = 0;
    let frameStart = 0;
    let animId: number;

    const measureLoop = (time: number) => {
      if (!frameStart) frameStart = time;
      frameCount++;

      if (time - frameStart >= 1000) {
        const fps = Math.round((frameCount * 1000) / (time - frameStart));
        setLiveInfo(prev => ({ ...prev, refreshRate: fps }));
        frameCount = 0;
        frameStart = time;
      }

      animId = requestAnimationFrame(measureLoop);
    };

    animId = requestAnimationFrame(measureLoop);
    
    return () => {
      window.removeEventListener("resize", updateInfo);
      window.removeEventListener("orientationchange", updateInfo);
      cancelAnimationFrame(animId);
    };
  }, [updateInfo]);

  // -- State for PPI / My Display --
  const [userInches, setUserInches] = useState<string>("");
  const [userRes, setUserRes] = useState<string>("");

  const estimatedPpi = userInches ? calculatePPI(liveInfo.w * liveInfo.dpr, liveInfo.h * liveInfo.dpr, parseFloat(userInches)) : 0;
  
  let matchStatus = null;
  if (userRes && userRes.includes("x")) {
    const [uw, uh] = userRes.toLowerCase().split("x").map(s => parseInt(s.trim()));
    if (uw && uh) {
      const physicalW = liveInfo.w * liveInfo.dpr;
      const physicalH = liveInfo.h * liveInfo.dpr;
      if (Math.abs(uw - physicalW) < 5 && Math.abs(uh - physicalH) < 5) {
        matchStatus = true;
      } else {
        matchStatus = false;
      }
    }
  }

  // Derived values
  const aspect = getAspectRatio(liveInfo.w, liveInfo.h);
  const totalPixels = liveInfo.w * liveInfo.h;
  const millionPixels = (totalPixels / 1000000).toFixed(2);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 w-full flex-1 flex flex-col items-start pb-24">
      {/* HEADER */}
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-foreground">{t("title")}</h1>
      <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl">
        {t("description")}
      </p>

      {/* 1. LIVE DISPLAY INFO */}
      <div className="w-full mb-16">
        <div className="text-[11px] font-mono font-bold tracking-[0.2em] text-muted-foreground uppercase mb-4 border-b border-border/50 pb-2">
          {t("infoTitle")}
        </div>
        
        {liveInfo.w > 0 ? (
          <div className="bg-muted/10 rounded-lg p-1">
            <InfoRow label={t("labels.logicalRes")} value={`${liveInfo.w} × ${liveInfo.h}`} unit="CSS px" />
            <InfoRow label={t("labels.viewport")} value={`${liveInfo.innerW} × ${liveInfo.innerH}`} unit="CSS px" />
            <InfoRow label={t("labels.dpr")} value={liveInfo.dpr.toFixed(2)} />
            <InfoRow label={t("labels.aspectRatio")} value={aspect} />
            <InfoRow label={t("labels.colorDepth")} value={liveInfo.colorDepth} unit="-bit" />
            <InfoRow label={t("labels.orientation")} value={liveInfo.orientation} />
            <InfoRow label={t("labels.refreshRate")} value={`~${liveInfo.refreshRate || "--"}`} unit="Hz" />
            <InfoRow label={t("labels.totalPixels")} value={`≈ ${millionPixels}`} unit="million" />
            <InfoRow label={t("labels.classification")} value={classifyResolution(liveInfo.w, liveInfo.h, t)} />
          </div>
        ) : (
          <div className="py-8 text-center text-muted-foreground">{t("values.notExposed")}</div>
        )}

        <div className="mt-4 flex items-start gap-3 p-4 bg-muted/20 border border-border/40 rounded-md text-sm text-muted-foreground">
          <Info className="w-4 h-4 shrink-0 mt-0.5" />
          <p>{t("disclaimer")}</p>
        </div>
      </div>

      {/* 2. MY DISPLAY (PPI CALCULATOR) */}
      <div className="w-full mb-16">
        <div className="text-[11px] font-mono font-bold tracking-[0.2em] text-muted-foreground uppercase mb-4 border-b border-border/50 pb-2">
          {t("myDisplay.title")}
        </div>
        
        <p className="text-sm text-muted-foreground mb-6">{t("myDisplay.prompt")}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-muted/10 p-6 rounded-lg border border-border/40">
          <div>
            <label className="block text-sm font-medium mb-2">{t("myDisplay.sizeLabel")}</label>
            <input 
              type="number" 
              placeholder={t("myDisplay.sizePlaceholder")}
              value={userInches}
              onChange={(e) => setUserInches(e.target.value)}
              className="w-full bg-background border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">{t("myDisplay.resLabel")} <span className="text-muted-foreground font-normal">(optional)</span></label>
            <input 
              type="text" 
              placeholder={t("myDisplay.resPlaceholder")}
              value={userRes}
              onChange={(e) => setUserRes(e.target.value)}
              className="w-full bg-background border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
            />
          </div>

          <div className="sm:col-span-2 mt-4 pt-4 border-t border-border/40 flex flex-col sm:flex-row gap-6">
            <div>
              <span className="block text-xs text-muted-foreground uppercase tracking-widest mb-1">{t("myDisplay.ppiLabel")}</span>
              <span className="text-2xl font-mono font-semibold">{estimatedPpi > 0 ? `~${Math.round(estimatedPpi)}` : "--"} <span className="text-sm text-muted-foreground font-sans">PPI</span></span>
            </div>
            
            {userRes && matchStatus !== null && (
              <div>
                <span className="block text-xs text-muted-foreground uppercase tracking-widest mb-1">{t("myDisplay.statusLabel")}</span>
                <span className={matchStatus ? "text-sm font-medium text-green-600 dark:text-green-400" : "text-sm font-medium text-amber-600 dark:text-amber-400 flex items-center gap-2"}>
                  {!matchStatus && <AlertCircle className="w-4 h-4" />}
                  {matchStatus ? t("myDisplay.statusMatches") : t("myDisplay.statusDiffers")}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. EXPLANATIONS */}
      <div className="w-full mb-16">
        <div className="text-[11px] font-mono font-bold tracking-[0.2em] text-muted-foreground uppercase mb-6 border-b border-border/50 pb-2">
          {t("explain.title")}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          <div>
            <h3 className="font-semibold mb-2 text-foreground">{t("explain.logicalResTitle")}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("explain.logicalResDesc")}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-foreground">{t("explain.physicalResTitle")}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("explain.physicalResDesc")}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-foreground">{t("explain.dprTitle")}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("explain.dprDesc")}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-foreground">{t("explain.ppiTitle")}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("explain.ppiDesc")}</p>
          </div>
        </div>
      </div>

      {/* 4. STANDARDS TABLE */}
      <div className="w-full mb-16">
        <div className="text-[11px] font-mono font-bold tracking-[0.2em] text-muted-foreground uppercase mb-6 border-b border-border/50 pb-2">
          {t("standards.title")}
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-border/60">
                <th className="py-3 font-medium text-muted-foreground uppercase tracking-wider text-xs">{t("standards.colStandard")}</th>
                <th className="py-3 font-medium text-muted-foreground uppercase tracking-wider text-xs">{t("standards.colRes")}</th>
                <th className="py-3 font-medium text-muted-foreground uppercase tracking-wider text-xs">{t("standards.colPixels")}</th>
                <th className="py-3 font-medium text-muted-foreground uppercase tracking-wider text-xs">{t("standards.colUse")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30 text-muted-foreground">
              <tr><td className="py-3 font-medium text-foreground">HD</td><td className="py-3 font-mono text-[13px]">1280 × 720</td><td className="py-3">0.9M</td><td className="py-3">Older laptops, budget TVs</td></tr>
              <tr><td className="py-3 font-medium text-foreground">FHD</td><td className="py-3 font-mono text-[13px]">1920 × 1080</td><td className="py-3">2.1M</td><td className="py-3">Standard monitors, laptops, TVs</td></tr>
              <tr><td className="py-3 font-medium text-foreground">QHD (1440p)</td><td className="py-3 font-mono text-[13px]">2560 × 1440</td><td className="py-3">3.7M</td><td className="py-3">Gaming monitors, premium laptops</td></tr>
              <tr><td className="py-3 font-medium text-foreground">UWQHD</td><td className="py-3 font-mono text-[13px]">3440 × 1440</td><td className="py-3">5.0M</td><td className="py-3">Ultrawide monitors</td></tr>
              <tr><td className="py-3 font-medium text-foreground">UHD / 4K</td><td className="py-3 font-mono text-[13px]">3840 × 2160</td><td className="py-3">8.3M</td><td className="py-3">Premium monitors, modern TVs</td></tr>
              <tr><td className="py-3 font-medium text-foreground">5K</td><td className="py-3 font-mono text-[13px]">5120 × 2880</td><td className="py-3">14.7M</td><td className="py-3">Apple Studio Display, iMac</td></tr>
              <tr><td className="py-3 font-medium text-foreground">8K</td><td className="py-3 font-mono text-[13px]">7680 × 4320</td><td className="py-3">33.2M</td><td className="py-3">High-end specialized TVs/monitors</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. TROUBLESHOOTING & FAQ */}
      <div className="w-full mb-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <div className="text-[11px] font-mono font-bold tracking-[0.2em] text-muted-foreground uppercase mb-6 border-b border-border/50 pb-2">
            {t("troubleshoot.title")}
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-sm text-foreground mb-1">{t("troubleshoot.q1")}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{t("troubleshoot.a1")}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-foreground mb-1">{t("troubleshoot.q2")}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{t("troubleshoot.a2")}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-foreground mb-1">{t("troubleshoot.q3")}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{t("troubleshoot.a3")}</p>
            </div>
          </div>
        </div>

        <div>
          <div className="text-[11px] font-mono font-bold tracking-[0.2em] text-muted-foreground uppercase mb-6 border-b border-border/50 pb-2">
            {t("faq.title")}
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-sm text-foreground mb-1">{t("faq.q1")}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{t("faq.a1")}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-foreground mb-1">{t("faq.q2")}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{t("faq.a2")}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-foreground mb-1">{t("faq.q3")}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{t("faq.a3")}</p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

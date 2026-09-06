"use client";

import { useWorkflowLauncher } from "@/components/test-runner/TestContext";
import { useTranslations } from "next-intl";
import { ArrowRight, Play, LayoutList } from "lucide-react";
import { Link } from "@/i18n/routing";

export function InspectionHub() {
  const tHub = useTranslations("Inspection.hub");
  const { startWorkflow } = useWorkflowLauncher();

  const NEW_MONITOR_QUICK = [
    "/tests/resolution-checker",
    "/tests/dead-pixel-test",
    "/tests/solid-color-test",
    "/tests/grayscale-test",
    "/tests/black-level-test",
    "/tests/white-level-test",
    "/tests/uniformity-test",
    "/tests/ghosting-test",
    "/tests/refresh-rate-test"
  ];

  const NEW_MONITOR_FULL = [
    "/tests/resolution-checker",
    "/tests/sharpness-test",
    "/tests/dead-pixel-test",
    "/tests/color-test",
    "/tests/grayscale-test",
    "/tests/brightness-test",
    "/tests/contrast-test",
    "/tests/black-level-test",
    "/tests/white-level-test",
    "/tests/uniformity-test",
    "/tests/backlight-bleed-test",
    "/tests/ghosting-test",
    "/tests/refresh-rate-test",
    "/tests/screen-tearing-test",
    "/tests/hdr-capability-test"
  ];

  const USED_MONITOR_QUICK = [
    "/tests/resolution-checker",
    "/tests/dead-pixel-test",
    "/tests/burn-in-test",
    "/tests/brightness-test",
    "/tests/uniformity-test",
    "/tests/ghosting-test",
    "/tests/refresh-rate-test"
  ];

  const USED_MONITOR_FULL = [
    "/tests/resolution-checker",
    "/tests/dead-pixel-test",
    "/tests/stuck-pixel-test",
    "/tests/burn-in-test",
    "/tests/brightness-test",
    "/tests/black-level-test",
    "/tests/uniformity-test",
    "/tests/backlight-bleed-test",
    "/tests/ghosting-test",
    "/tests/refresh-rate-test",
    "/tests/color-banding-test"
  ];

  return (
    <div className="space-y-16">
      
      {/* New Monitor */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">{tHub("newMonitor")}</h2>
          <p className="text-muted-foreground">{tHub("newMonitorDesc")}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button 
            onClick={() => startWorkflow(NEW_MONITOR_QUICK)}
            className="flex items-center p-6 border border-border/50 rounded-xl hover:bg-muted/20 hover:border-foreground/20 transition-colors text-left group cursor-pointer"
          >
            <Play className="w-6 h-6 text-foreground mr-4 opacity-70 group-hover:opacity-100" />
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{tHub("fiveMinuteCheck")}</h3>
              <p className="text-sm text-muted-foreground mt-1">9 core tests</p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-transform group-hover:translate-x-1" />
          </button>
          
          <button 
            onClick={() => startWorkflow(NEW_MONITOR_FULL)}
            className="flex items-center p-6 border border-border/50 rounded-xl hover:bg-muted/20 hover:border-foreground/20 transition-colors text-left group cursor-pointer"
          >
            <LayoutList className="w-6 h-6 text-foreground mr-4 opacity-70 group-hover:opacity-100" />
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{tHub("fullInspection")}</h3>
              <p className="text-sm text-muted-foreground mt-1">15 detailed tests</p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* Used Monitor */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">{tHub("usedMonitor")}</h2>
          <p className="text-muted-foreground">{tHub("usedMonitorDesc")}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button 
            onClick={() => startWorkflow(USED_MONITOR_QUICK)}
            className="flex items-center p-6 border border-border/50 rounded-xl hover:bg-muted/20 hover:border-foreground/20 transition-colors text-left group cursor-pointer"
          >
            <Play className="w-6 h-6 text-foreground mr-4 opacity-70 group-hover:opacity-100" />
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{tHub("fiveMinuteCheck")}</h3>
              <p className="text-sm text-muted-foreground mt-1">7 core tests</p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-transform group-hover:translate-x-1" />
          </button>
          
          <button 
            onClick={() => startWorkflow(USED_MONITOR_FULL)}
            className="flex items-center p-6 border border-border/50 rounded-xl hover:bg-muted/20 hover:border-foreground/20 transition-colors text-left group cursor-pointer"
          >
            <LayoutList className="w-6 h-6 text-foreground mr-4 opacity-70 group-hover:opacity-100" />
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{tHub("fullInspection")}</h3>
              <p className="text-sm text-muted-foreground mt-1">11 detailed tests</p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* Specialized Workflows */}
      <section>
        <div className="w-full h-px bg-border/50 mb-12"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link 
            href="/monitor-inspection/gaming"
            className="flex items-center justify-between p-6 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors group"
          >
            <span className="font-medium text-foreground">{tHub("gamingMonitor")}</span>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-transform group-hover:translate-x-1" />
          </Link>
          <Link 
            href="/monitor-inspection/oled"
            className="flex items-center justify-between p-6 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors group"
          >
            <span className="font-medium text-foreground">{tHub("oledMonitor")}</span>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

    </div>
  );
}
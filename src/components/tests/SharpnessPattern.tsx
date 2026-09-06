"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { getDevicePixelRatio } from "@/lib/browserCapabilities";

interface SharpnessPatternProps {
  testId?: string;
}

export function SharpnessPattern({ testId }: SharpnessPatternProps) {
  const { registerNavigation } = useTestContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [inverted, setInverted] = useState(false);

  const toggleInverted = useCallback(() => setInverted(v => !v), []);

  useEffect(() => {
    registerNavigation({
      next: toggleInverted,
      prev: toggleInverted,
      reset: () => setInverted(false),
    });
  }, [registerNavigation, toggleInverted]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const draw = () => {
      const bg = inverted ? "#222222" : "#808080";
      const primary = inverted ? "#FFFFFF" : "#000000";
      const secondary = inverted ? "#000000" : "#FFFFFF";

      // Background
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = Math.floor(canvas.width / 2);
      const centerY = Math.floor(canvas.height / 2);
      
      const cbSize = Math.min(220, Math.floor(canvas.width * 0.3));
      const cbStartX = centerX - cbSize / 2;
      const cbStartY = centerY - cbSize / 2;

      // Section 1: 1px checkerboard in the center
      ctx.fillStyle = primary;
      ctx.fillRect(cbStartX, cbStartY, cbSize, cbSize);
      ctx.fillStyle = secondary;
      for (let y = 0; y < cbSize; y++) {
        for (let x = (y % 2); x < cbSize; x += 2) {
          ctx.fillRect(cbStartX + x, cbStartY + y, 1, 1);
        }
      }

      // Section 2: Fine lines (Horizontal and Vertical)
      ctx.fillStyle = primary;
      const lineSpan = Math.min(100, Math.floor(canvas.width * 0.15));
      // Vertical lines to the left
      for (let x = 0; x < lineSpan; x += 2) {
        ctx.fillRect(centerX - cbSize/2 - lineSpan - 20 + x, centerY - 50, 1, 100);
      }
      // Horizontal lines to the right
      for (let y = 0; y < 100; y += 2) {
        ctx.fillRect(centerX + cbSize/2 + 20, centerY - 50 + y, lineSpan, 1);
      }

      // Section 3: Fine text rendering
      ctx.fillStyle = primary;
      ctx.textAlign = "center";
      
      ctx.font = "10px sans-serif";
      ctx.fillText("10px Sans: The quick brown fox jumps over the lazy dog (Subpixel Check)", centerX, Math.max(25, cbStartY - 40));
      
      ctx.font = "14px sans-serif";
      ctx.fillText("14px Sans: Sharp text should show clean edges without color halos or ringing artifacts", centerX, Math.max(45, cbStartY - 15));
    };

    const resize = () => {
      const dpr = getDevicePixelRatio();
      const rect = canvas.parentElement?.getBoundingClientRect() || canvas.getBoundingClientRect();
      
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      
      draw();
    };

    window.addEventListener("resize", resize);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [inverted]);

  return (
    <>
      <div className="absolute inset-0 bg-[#808080] overflow-hidden">
        <canvas ref={canvasRef} className="block w-full h-full" />
      </div>

      <TestControlBar testId={testId} title="Sharpness & Subpixel Clarity">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleInverted}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              inverted ? "bg-foreground text-background border-foreground" : "bg-muted/50 text-muted-foreground hover:text-foreground border-border/50"
            }`}
          >
            {inverted ? "High Contrast Theme" : "50% Gray Neutral Theme"}
          </button>
          <span className="text-xs text-muted-foreground hidden sm:inline">
            1px Checkerboard & Fine Line Grids
          </span>
        </div>
      </TestControlBar>
    </>
  );
}

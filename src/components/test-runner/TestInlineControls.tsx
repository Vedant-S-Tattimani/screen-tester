"use client";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface TestInlineControlsProps {
  children: ReactNode;
}

export function TestInlineControls({ children }: TestInlineControlsProps) {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Finds the container outside the viewport to render inline controls
    const container = document.getElementById("test-controls-container");
    if (container) {
      setTarget(container);
    }
  }, []);

  if (!target) return null;

  return createPortal(children, target);
}

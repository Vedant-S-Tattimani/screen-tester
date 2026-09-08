"use client";

// Execute immediately during client module evaluation — before React hydration begins!
if (typeof window !== "undefined") {
  // 1. Intercept console.error using defineProperty to filter extension hydration noise before Next.js Dev Overlay captures it
  try {
    let originalConsoleError = console.error;
    Object.defineProperty(console, "error", {
      configurable: true,
      enumerable: true,
      get: function () {
        return function (...args: unknown[]) {
          const message = args
            .map((a) => {
              try {
                return typeof a === "object" && a !== null ? JSON.stringify(a) : String(a);
              } catch {
                return String(a);
              }
            })
            .join(" ");

          if (
            message.includes("bis_skin_checked") ||
            message.includes("bis_register") ||
            message.includes("__processed_")
          ) {
            return;
          }
          return originalConsoleError.apply(console, args);
        };
      },
      set: function (newErrorFn) {
        originalConsoleError = newErrorFn;
      },
    });
  } catch {}

  // 2. Strip already-injected extension attributes from the DOM before and during hydration
  try {
    const stripExtensionAttributes = (root: ParentNode = document) => {
      const badElements = root.querySelectorAll("[bis_skin_checked], [bis_register]");
      for (let i = 0; i < badElements.length; i++) {
        badElements[i].removeAttribute("bis_skin_checked");
        badElements[i].removeAttribute("bis_register");
      }
    };

    stripExtensionAttributes();

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => stripExtensionAttributes(), { once: true });
    }

    // 3. Continuous MutationObserver to strip any attributes added or injected by extensions
    const observer = new MutationObserver((mutations) => {
      for (let i = 0; i < mutations.length; i++) {
        const m = mutations[i];
        if (
          m.type === "attributes" &&
          (m.attributeName === "bis_skin_checked" || m.attributeName === "bis_register")
        ) {
          (m.target as Element).removeAttribute(m.attributeName);
        } else if (m.type === "childList") {
          for (let j = 0; j < m.addedNodes.length; j++) {
            const node = m.addedNodes[j];
            if (node.nodeType === 1) {
              const el = node as Element;
              if (el.hasAttribute("bis_skin_checked")) el.removeAttribute("bis_skin_checked");
              if (el.hasAttribute("bis_register")) el.removeAttribute("bis_register");
              const nested = el.querySelectorAll?.("[bis_skin_checked], [bis_register]");
              if (nested) {
                for (let k = 0; k < nested.length; k++) {
                  nested[k].removeAttribute("bis_skin_checked");
                  nested[k].removeAttribute("bis_register");
                }
              }
            }
          }
        }
      }
    });

    if (document.documentElement) {
      observer.observe(document.documentElement, {
        attributes: true,
        childList: true,
        subtree: true,
        attributeFilter: ["bis_skin_checked", "bis_register"],
      });
    }
  } catch {}

  // 4. Unregister legacy Service Workers & clear CacheStorage from previous localhost projects (e.g. Orca)
  try {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const reg of registrations) {
          reg.unregister().catch(() => {});
        }
      }).catch(() => {});
    }
    if ("caches" in window) {
      caches.keys().then((keys) => {
        for (const key of keys) {
          caches.delete(key).catch(() => {});
        }
      }).catch(() => {});
    }
  } catch {}
}

export function ExtensionCleanup() {
  return null;
}

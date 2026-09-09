export type CompatibilityStatus = 
  | "SUPPORTED" 
  | "PARTIAL" 
  | "NOT AVAILABLE" 
  | "REQUIRES USER PERMISSION" 
  | "BROWSER DEPENDENT";

export interface BrowserCapabilityEntry {
  id: string;
  name: string;
  category: "display" | "graphics" | "input" | "platform";
  apiSpec: string;
  description: string;
  hardwareDistinction: string;
  supportMatrix: {
    chromium: CompatibilityStatus;
    firefox: CompatibilityStatus;
    safariDesktop: CompatibilityStatus;
    iosSafari: CompatibilityStatus;
    androidBrowsers: CompatibilityStatus;
  };
  notes?: string;
}

export const BROWSER_CAPABILITIES_DATA: BrowserCapabilityEntry[] = [
  {
    id: "screen-orientation",
    name: "Screen Orientation API",
    category: "display",
    apiSpec: "screen.orientation",
    description: "Detects active display orientation type (portrait-primary, landscape-primary) and angle.",
    hardwareDistinction: "Browser detects OS compositor orientation angle; cannot detect physical monitor pivot rotation sensor without OS notification.",
    supportMatrix: {
      chromium: "SUPPORTED",
      firefox: "SUPPORTED",
      safariDesktop: "PARTIAL",
      iosSafari: "NOT AVAILABLE",
      androidBrowsers: "SUPPORTED"
    },
    notes: "iOS Safari exposes window.orientation (deprecated) rather than standard screen.orientation."
  },
  {
    id: "fullscreen-api",
    name: "Fullscreen API",
    category: "display",
    apiSpec: "Element.requestFullscreen()",
    description: "Expands the active visual test pattern across the entire physical display viewport without browser toolbars.",
    hardwareDistinction: "Renders pattern across active desktop resolution; does not bypass OS desktop compositing window managers.",
    supportMatrix: {
      chromium: "SUPPORTED",
      firefox: "SUPPORTED",
      safariDesktop: "SUPPORTED",
      iosSafari: "NOT AVAILABLE",
      androidBrowsers: "SUPPORTED"
    },
    notes: "iOS Safari on iPhones does not support Fullscreen API on standard DOM elements (supported on iPadOS and video elements)."
  },
  {
    id: "device-pixel-ratio",
    name: "Device Pixel Ratio (DPR)",
    category: "display",
    apiSpec: "window.devicePixelRatio",
    description: "Ratio of the resolution in physical display pixels to the resolution in CSS pixels.",
    hardwareDistinction: "Reflects operating system display scaling setting (e.g., 125%, 150%, 200%), NOT absolute physical panel pixel density (PPI).",
    supportMatrix: {
      chromium: "SUPPORTED",
      firefox: "SUPPORTED",
      safariDesktop: "SUPPORTED",
      iosSafari: "SUPPORTED",
      androidBrowsers: "SUPPORTED"
    }
  },
  {
    id: "screen-details",
    name: "Window Management (Multi-Screen)",
    category: "display",
    apiSpec: "window.getScreenDetails()",
    description: "Queries detailed information about all connected multi-monitor displays, primary screen identification, and relative spatial geometry.",
    hardwareDistinction: "Reports connected displays enumerated by OS desktop manager; does not measure physical monitor panel diagonal dimensions.",
    supportMatrix: {
      chromium: "REQUIRES USER PERMISSION",
      firefox: "NOT AVAILABLE",
      safariDesktop: "NOT AVAILABLE",
      iosSafari: "NOT AVAILABLE",
      androidBrowsers: "NOT AVAILABLE"
    },
    notes: "Supported in modern Chromium browsers upon explicit user permission prompt. Other browsers report only single active screen."
  },
  {
    id: "raf-timing",
    name: "requestAnimationFrame (V-Sync Timing)",
    category: "graphics",
    apiSpec: "window.requestAnimationFrame()",
    description: "Schedules visual repaints synchronized with display refresh intervals, allowing high-frame-rate animation testing.",
    hardwareDistinction: "Measures browser execution frame timing; browser timing may throttle during background tab execution or power-saving modes.",
    supportMatrix: {
      chromium: "SUPPORTED",
      firefox: "SUPPORTED",
      safariDesktop: "SUPPORTED",
      iosSafari: "SUPPORTED",
      androidBrowsers: "SUPPORTED"
    }
  },
  {
    id: "canvas-2d",
    name: "HTML5 Canvas 2D Context",
    category: "graphics",
    apiSpec: "canvas.getContext('2d')",
    description: "High-performance pixel-level rendering used for rapid color cycling, grayscale luminance steps, and sharpness charts.",
    hardwareDistinction: "Renders mathematical sRGB color buffers; output light is subject to monitor hardware color profile and ambient lighting.",
    supportMatrix: {
      chromium: "SUPPORTED",
      firefox: "SUPPORTED",
      safariDesktop: "SUPPORTED",
      iosSafari: "SUPPORTED",
      androidBrowsers: "SUPPORTED"
    }
  },
  {
    id: "webgl",
    name: "WebGL 1.0 & 2.0 (GPU Telemetry)",
    category: "graphics",
    apiSpec: "canvas.getContext('webgl2')",
    description: "Hardware-accelerated 3D graphics context used to query unmasked graphics card renderer and driver vendor details.",
    hardwareDistinction: "Reports the GPU rendering device (e.g., NVIDIA GeForce, AMD Radeon, Apple Silicon), NOT the attached monitor model.",
    supportMatrix: {
      chromium: "SUPPORTED",
      firefox: "SUPPORTED",
      safariDesktop: "SUPPORTED",
      iosSafari: "SUPPORTED",
      androidBrowsers: "SUPPORTED"
    }
  },
  {
    id: "webgpu",
    name: "WebGPU API",
    category: "graphics",
    apiSpec: "navigator.gpu",
    description: "Next-generation low-level GPU compute and graphics interface delivering direct hardware pipeline access.",
    hardwareDistinction: "Direct GPU compute pipeline; does not establish monitor hardware color gamut or physical response times.",
    supportMatrix: {
      chromium: "SUPPORTED",
      firefox: "PARTIAL",
      safariDesktop: "PARTIAL",
      iosSafari: "NOT AVAILABLE",
      androidBrowsers: "PARTIAL"
    },
    notes: "Enabled by default in modern Chromium browsers; under active implementation in Firefox and Safari behind developer flags."
  },
  {
    id: "pointer-events",
    name: "Pointer Events & Multitouch",
    category: "input",
    apiSpec: "window.PointerEvent",
    description: "Unified hardware input event interface handling mouse clicks, touch points, stylus pressure, and multi-finger gestures.",
    hardwareDistinction: "Detects digital input coordinates reported by digitizer driver; cannot measure optical touch layer parallax or physical glass friction.",
    supportMatrix: {
      chromium: "SUPPORTED",
      firefox: "SUPPORTED",
      safariDesktop: "SUPPORTED",
      iosSafari: "SUPPORTED",
      androidBrowsers: "SUPPORTED"
    }
  },
  {
    id: "web-audio",
    name: "Web Audio API",
    category: "platform",
    apiSpec: "window.AudioContext",
    description: "Synthesizes precision audio test tones and frequency sweeps to verify external monitor integrated speakers.",
    hardwareDistinction: "Outputs PCM audio stream to default OS audio device; does not calibrate acoustic speaker SPL decibels.",
    supportMatrix: {
      chromium: "SUPPORTED",
      firefox: "SUPPORTED",
      safariDesktop: "SUPPORTED",
      iosSafari: "SUPPORTED",
      androidBrowsers: "SUPPORTED"
    }
  },
  {
    id: "media-devices",
    name: "Media Devices (Audio/Video Enumeration)",
    category: "platform",
    apiSpec: "navigator.mediaDevices.enumerateDevices()",
    description: "Queries attached audio output hardware endpoints and cameras to identify monitor built-in speaker and webcam links.",
    hardwareDistinction: "Lists devices recognized by operating system driver stack; requires permission to query hardware device labels.",
    supportMatrix: {
      chromium: "SUPPORTED",
      firefox: "SUPPORTED",
      safariDesktop: "SUPPORTED",
      iosSafari: "SUPPORTED",
      androidBrowsers: "SUPPORTED"
    }
  },
  {
    id: "wake-lock",
    name: "Screen Wake Lock API",
    category: "platform",
    apiSpec: "navigator.wakeLock",
    description: "Prevents the computer or mobile display from dimming or locking screen during prolonged inspection workflows.",
    hardwareDistinction: "Sends software keep-alive request to OS power manager; does not alter hardware monitor sleep timers in monitor OSD.",
    supportMatrix: {
      chromium: "SUPPORTED",
      firefox: "NOT AVAILABLE",
      safariDesktop: "SUPPORTED",
      iosSafari: "SUPPORTED",
      androidBrowsers: "SUPPORTED"
    },
    notes: "Supported in Chromium and Safari 16.4+; currently not supported in Firefox."
  },
  {
    id: "local-storage",
    name: "Web Storage API (localStorage)",
    category: "platform",
    apiSpec: "window.localStorage",
    description: "Provides zero-telemetry, 100% client-side persistent storage for monitor profiles, test checklists, and inspection history.",
    hardwareDistinction: "Stores data locally in the browser sandbox profile on your device; zero data is transmitted to cloud servers.",
    supportMatrix: {
      chromium: "SUPPORTED",
      firefox: "SUPPORTED",
      safariDesktop: "SUPPORTED",
      iosSafari: "SUPPORTED",
      androidBrowsers: "SUPPORTED"
    }
  },
  {
    id: "print-api",
    name: "Print & PDF Generation",
    category: "platform",
    apiSpec: "window.print()",
    description: "Triggers native operating system print subsystem with custom print stylesheet to produce clean PDF inspection reports.",
    hardwareDistinction: "Formats CSS layout for physical paper or PDF page boundaries; does not communicate with physical printers directly.",
    supportMatrix: {
      chromium: "SUPPORTED",
      firefox: "SUPPORTED",
      safariDesktop: "SUPPORTED",
      iosSafari: "SUPPORTED",
      androidBrowsers: "SUPPORTED"
    }
  }
];

export interface TestRequirementEntry {
  testId: string;
  testName: string;
  orientation: "Desktop-oriented" | "Universal" | "Mobile-oriented";
  touchCapable: boolean;
  fullscreenRecommended: boolean;
  webglRequired: boolean;
  notes: string;
}

export const TEST_REQUIREMENTS_MATRIX: TestRequirementEntry[] = [
  {
    testId: "dead-pixel-test",
    testName: "Dead Pixel Test",
    orientation: "Universal",
    touchCapable: true,
    fullscreenRecommended: true,
    webglRequired: false,
    notes: "Requires Fullscreen for edge-to-edge subpixel inspection without browser chrome interference."
  },
  {
    testId: "stuck-pixel-fixer",
    testName: "Stuck Pixel Fixer",
    orientation: "Universal",
    touchCapable: true,
    fullscreenRecommended: true,
    webglRequired: false,
    notes: "Uses high-performance Canvas 2D animation loop. Arrow keys or touch dragging for 1px positioning."
  },
  {
    testId: "touch-screen-test",
    testName: "Touch Screen & Pointer Test",
    orientation: "Universal",
    touchCapable: true,
    fullscreenRecommended: true,
    webglRequired: false,
    notes: "Requires touch digitizer hardware or mouse pointer for multi-point coordinate tracking."
  },
  {
    testId: "refresh-rate-test",
    testName: "Refresh Rate Test",
    orientation: "Desktop-oriented",
    touchCapable: false,
    fullscreenRecommended: false,
    webglRequired: false,
    notes: "Best evaluated on desktop monitors to observe 120Hz, 144Hz, 240Hz, 360Hz+ frame pacing."
  },
  {
    testId: "screen-tearing-test",
    testName: "Screen Tearing Test",
    orientation: "Desktop-oriented",
    touchCapable: false,
    fullscreenRecommended: true,
    webglRequired: false,
    notes: "High-contrast horizontal motion blocks. Best viewed in Fullscreen mode with V-Sync toggled."
  },
  {
    testId: "ghosting-test",
    testName: "Ghosting & Motion Blur Test",
    orientation: "Universal",
    touchCapable: true,
    fullscreenRecommended: false,
    webglRequired: false,
    notes: "Evaluates liquid crystal response time and overdrive overshoot coronas under continuous motion."
  },
  {
    testId: "viewing-angle-test",
    testName: "Viewing Angle Test",
    orientation: "Desktop-oriented",
    touchCapable: true,
    fullscreenRecommended: true,
    webglRequired: false,
    notes: "Requires physical movement around the display to observe off-axis color shifts and IPS glow."
  },
  {
    testId: "resolution-checker",
    testName: "Resolution Checker",
    orientation: "Universal",
    touchCapable: true,
    fullscreenRecommended: true,
    webglRequired: false,
    notes: "Compares active browser CSS layout area against physical OS compositor screen dimensions."
  },
  {
    testId: "display-info",
    testName: "Display Information Tool",
    orientation: "Universal",
    touchCapable: true,
    fullscreenRecommended: false,
    webglRequired: true,
    notes: "Utilizes WebGL debug extension to query unmasked graphics card vendor and renderer string."
  },
  {
    testId: "vrr-test",
    testName: "VRR / Adaptive Sync Inspection",
    orientation: "Desktop-oriented",
    touchCapable: false,
    fullscreenRecommended: true,
    webglRequired: false,
    notes: "Evaluates frame pacing and judder across configurable animation loads in Fullscreen mode."
  },
  {
    testId: "hdr-test",
    testName: "HDR Visual Inspection",
    orientation: "Desktop-oriented",
    touchCapable: false,
    fullscreenRecommended: true,
    webglRequired: false,
    notes: "Inspects specular highlight clipping, tone curves, and wide gamut color swatches."
  },
  {
    testId: "near-black-test",
    testName: "Near-Black & Shadow Detail Test",
    orientation: "Universal",
    touchCapable: true,
    fullscreenRecommended: true,
    webglRequired: false,
    notes: "Best inspected in a fully darkened room to verify low-luminance grayscale step visibility."
  },
  {
    testId: "gradient-banding-test",
    testName: "Gradient & Banding Test",
    orientation: "Universal",
    touchCapable: true,
    fullscreenRecommended: true,
    webglRequired: false,
    notes: "Smooth full-screen gradients for detecting bit-depth quantization and color stepping."
  },
  {
    testId: "text-clarity-test",
    testName: "Text Clarity & Subpixel Test",
    orientation: "Universal",
    touchCapable: true,
    fullscreenRecommended: false,
    webglRequired: false,
    notes: "Evaluates font edge sharpness and subpixel color fringing across sizes and contrast pairs."
  },
  {
    testId: "backlight-bleed-test",
    testName: "Backlight Bleed vs. IPS Glow",
    orientation: "Universal",
    touchCapable: true,
    fullscreenRecommended: true,
    webglRequired: false,
    notes: "Examines black-field corner glow and bezel pinch leakage at varying head angles."
  },
  {
    testId: "uniformity-test",
    testName: "Screen Uniformity Test",
    orientation: "Universal",
    touchCapable: true,
    fullscreenRecommended: true,
    webglRequired: false,
    notes: "Multi-point solid grayscale and primary fields to inspect luminance falloff and DSE."
  },
  {
    testId: "tv-overscan-test",
    testName: "TV Overscan & 1:1 Pixel Mapping",
    orientation: "Desktop-oriented",
    touchCapable: false,
    fullscreenRecommended: true,
    webglRequired: false,
    notes: "Verifies 1-pixel outer edge boundary lines and corner markers to detect overscan cropping on TVs."
  },
  {
    testId: "scaling-aspect-test",
    testName: "Scaling & Aspect Ratio Test",
    orientation: "Universal",
    touchCapable: true,
    fullscreenRecommended: true,
    webglRequired: false,
    notes: "Concentric circular geometry and square aspect grids to detect non-uniform stretching."
  }
];

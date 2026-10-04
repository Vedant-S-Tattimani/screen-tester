# Screen Tester 🖥️

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![i18n](https://img.shields.io/badge/i18n-8%20Languages-emerald)](https://next-intl-docs.vercel.app/)
[![License](https://img.shields.io/badge/License-MIT-purple)](#license)

> **The ultimate browser-based screen diagnostic, display calibration, and hardware inspection suite.**  
> Test monitors, laptops, TVs, phones, and tablets with zero software installation.

---

## 📖 Table of Contents

- [What is Screen Tester?](#-what-is-screen-tester)
- [For Everyone (Non-Technical Guide)](#-for-everyone-non-technical-guide)
  - [Why and When to Use This](#why-and-when-to-use-this)
  - [How to Test Your Screen in 3 Easy Steps](#how-to-test-your-screen-in-3-easy-steps)
  - [Guided Inspection Workflows](#guided-inspection-workflows)
- [Comprehensive Diagnostic Suite (60+ Tools)](#-comprehensive-diagnostic-suite-60-tools)
- [For Developers & Engineers (Technical Guide)](#-for-developers--engineers-technical-guide)
  - [Architecture & Tech Stack](#architecture--tech-stack)
  - [Key Technical Implementations](#key-technical-implementations)
  - [Hardware & Browser APIs Utilized](#hardware--browser-apis-utilized)
  - [Internationalization (i18n)](#internationalization-i18n)
  - [Project Directory Structure](#project-directory-structure)
- [Getting Started & Local Development](#-getting-started--local-development)
- [Browser Compatibility & Limitations](#-browser-compatibility--limitations)
- [Contributing & License](#-license)

---

## 🌟 What is Screen Tester?

**Screen Tester** is an open-source, private, web-native display diagnostics laboratory. It allows anyone—from everyday consumers unboxing a new laptop to competitive esports players and hardware technicians—to inspect, benchmark, and calibrate any monitor, TV, or mobile screen directly within any modern web browser.

No software downloads, no admin permissions, and zero tracking: **all tests run 100% locally on your machine.**

---

## 👥 For Everyone (Non-Technical Guide)

### Why and When to Use This

| Scenario | What Screen Tester Does For You |
| :--- | :--- |
| **📦 Bought a New Monitor or Laptop?** | Catch dead pixels, backlight bleed, and screen flaws immediately so you can get a free replacement within your return window. |
| **🤝 Buying or Selling a Used Screen?** | Run a step-by-step diagnostic to ensure the panel has no hidden burn-in, scratches, color degradation, or flickering. Generate a printable condition report! |
| **🎮 Gaming Performance Check** | Test your true refresh rate (144Hz, 240Hz, 360Hz+), detect screen tearing, and check for ghosting or motion blur trails. |
| **📺 OLED & TV Health Check** | Detect permanent burn-in, temporary image retention, dirty screen effect (DSE), and HDR highlight capabilities. |
| **🎨 Designers & Video Editors** | Check color gradients for banding, test gamma curves (1.8–2.4), verify contrast, and calibrate black levels so shadows don't crush. |
| **🩹 Stuck Pixel Emergency?** | Use the built-in **Stuck Pixel Fixer** to rapidly cycle subpixels and attempt to unstick unresponsive pixels without touching the screen. |

---

### How to Test Your Screen in 3 Easy Steps

1. **Open the App**: Visit Screen Tester in any browser (Chrome, Edge, Firefox, Safari) on any computer, laptop, tablet, or phone.
2. **Choose a Test or Guided Workflow**: Pick an individual test (e.g., *Dead Pixel Test*) or choose a 5-minute automated walkthrough (e.g., *New Monitor Inspection*).
3. **Press Fullscreen & Observe**:
   - The test canvas expands to fill 100% of your screen.
   - Use your mouse, arrow keys, or spacebar to switch colors and patterns.
   - Look closely at your panel. You can flag tests as **PASS**, **CHECK**, or **ISSUE** to generate a diagnostic certificate.

---

### 📋 Guided Inspection Workflows

Rather than guessing which tests to run, choose a pre-configured inspection sequence:

- **🟢 General Display Checkup**: Balanced 9-test routine checking resolution, dead pixels, uniformity, contrast, gradients, and refresh rate.
- **📦 New Monitor Unboxing Wizard**: 15-test acceptance checklist designed to detect factory flaws before your store return policy expires.
- **🏷️ Used Monitor Inspection**: 10-test inspection tailored for second-hand purchases; includes physical defect tracking and exportable condition certificate.
- **⚡ High-Refresh Gaming Monitor**: Evaluates Variable Refresh Rate (VRR / G-Sync / FreeSync), screen tearing, ghosting trails, pixel overdrive overshoot, and motion persistence.
- **🖤 OLED & QD-OLED Inspection**: Special dark-room tests for near-black vertical banding, ABL (Automatic Brightness Limiter), subpixel text fringing, and burn-in.
- **💻 Laptop Display Check**: Inspects high-DPI retina scaling, battery profile brightness limits, viewing angles, and bezel pinch marks.
- **📺 Living Room TV Check**: Inspects living room viewing angles, 1:1 pixel mapping (overscan disable), local dimming blooming, and HDMI black levels.

---

## 🧪 Comprehensive Diagnostic Suite (60+ Tools)

Screen Tester provides over 60 purpose-built diagnostic patterns, utilities, and device sensors:

### 1. 🎯 Pixel & Subpixel Testing
- **Dead Pixel Test**: Pure solid primary and neutral fields (Red, Green, Blue, White, Black) to spot non-functioning subpixels.
- **Stuck & Bright Pixel Locator**: High-contrast backgrounds to reveal permanently energized, glowing subpixels.
- **Stuck Pixel Fixer**: High-frequency subpixel cycling tool to stimulate sluggish liquid crystals into unsticking.
- **Pixel Inversion (VCOM) Flicker**: Alternating dot-inversion patterns to check panel voltage balancing and eliminate static image bias.
- **Temporal Dithering & FRC**: High-frequency sub-frame strobe detection to reveal hardware dithering that causes eye fatigue.
- **Subpixel Layout Inspector**: Identifies standard RGB, BGR, QD-OLED triangular, and LG WOLED subpixel geometries that cause text fringing.

### 2. 🎨 Color Accuracy & Gamut
- **Color Gamut Inspector**: Evaluates color space coverage across sRGB, DCI-P3, and Adobe RGB primaries.
- **256-Step Grayscale Ramp**: Inspects smooth transitions from 0% to 100% luminance without clipping or color tints.
- **Color Banding & Bit Depth**: Detects 6-bit vs 8-bit vs 10-bit quantization steps in smooth gradient transitions.
- **Color Temperature Comparator**: Compares standard illuminants (D65 6500K daylight, D50 warm print, 9300K cool Asian broadcast).
- **Color Vision Deficiency Simulator**: Simulates Protanopia, Deuteranopia, and Tritanopia color blindness on your display.

### 3. ☀️ Luminance, Contrast & Black Levels
- **Black Level & Shadow Detail**: Stepped 0.5%–5% near-black swatches to calibrate brightness without crushing shadow details.
- **White Level & Highlight Clipping**: Stepped 95%–100% white swatches to tune contrast without blowing out bright details.
- **Gamma Curve Calibration**: Visual pattern matches to determine exact gamma tracking (1.8, 2.0, 2.2, 2.4).
- **OLED ABL (Auto Brightness Limiter) Test**: Variable window-size brightness benchmark to observe power-throttling on self-emissive panels.
- **Backlight Bleed vs. IPS Glow**: Distinguishes mechanical bezel pressure leaks from natural optical angle glow.
- **Local Dimming Blooming Test**: Moving high-intensity elements on pitch-black backdrops to measure Mini-LED haloing.

### 4. 🚀 Motion, Gaming & Frame Pacing
- **Refresh Rate & Frame Timing**: Millisecond-accurate browser rendering clock benchmarked against panel refresh rates (60Hz–500Hz).
- **Ghosting & Overdrive (Inverse Ghosting)**: Multi-speed contrasting blocks to calibrate monitor overdrive without overshoot coronas.
- **MPRT & Motion Blur Persistence**: Eye-tracking persistence blur evaluation against native panel response.
- **Screen Tearing & V-Sync**: High-velocity visual sweeps to verify vertical sync and buffer swapping.
- **Strobe Crosstalk & Backlight Strobing**: Evaluates clarity when using Blur Reduction, ELMB, DyAc, or ULMB backlight strobing.
- **Pursuit Camera Tracking Pattern**: Synchronized tracking markers compatible with pursuit camera rail rigs for scientific MPRT capture.
- **VRR Brightness Flicker & Gamma Shift**: Simulates fluctuating frame times to test G-Sync/FreeSync gamma stability.
- **PWM Backlight Flicker**: High-speed alternating frequency test to detect pulse-width modulation backlight flicker.

### 5. 🛠️ Display Utilities & Hardware Calculators
- **Display Info & GPU Inspector**: Queries browser viewport, device pixel ratio (DPR), color depth, WebGL renderer, and GPU capabilities.
- **DPI / PPI & Retina Viewing Distance**: Calculates exact pixel density and the optimal distance where pixels become imperceptible.
- **Dead Pixel RMA Coordinate Mapper**: Pinpoints and records defect coordinates on your panel to submit with manufacturer warranty claims.
- **Display Inspection Certificate Generator**: Generates an exportable, printable PDF/report documenting PASS/FAIL inspection results.
- **OLED Longevity & Burn-In Calculator**: Calculates cumulative panel aging risks based on daily usage hours, static UI, and brightness.
- **OSD Hardware Calibration Guide**: Step-by-step instructions on adjusting physical monitor hardware buttons.
- **E-Ink Anti-Ghosting Screen Flasher**: High-contrast flashing utility to clear e-paper ghost images on devices like Remarkable or Kindle browsers.
- **WebGL 3D GPU Stress Benchmark**: Real-time 3D graphics test to verify GPU hardware acceleration and thermal stability under load.

### 6. 🎮 Device, Sensor & Peripheral Diagnostics
- **Touch Screen & Multi-Touch Grid**: Tracks 10-finger touch points, gestures, drag accuracy, and digitizer dead zones.
- **Gamepad & Controller Tester**: Real-time stick drift analyzer, deadzone mapper, and trigger/button response test for USB & Bluetooth controllers.
- **Mouse Polling Rate & Jitter**: Real-time USB polling rate tracker (125Hz–8000Hz) with jitter distribution graphs.
- **Audio/Video Lip Sync**: Flash-and-beep visual/auditory pulse to calibrate external speaker and soundbar latency.
- **Webcam & Microphone Stream Tester**: Live video feed, resolution detection, audio spectrum visualizer, and microphone input level test.
- **Sensors**: Device accelerometer, gyroscope orientation, vibration haptics, battery health status, and network ping latency.

---

## 💻 For Developers & Engineers (Technical Guide)

### Architecture & Tech Stack

```
screen-tester/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── [locale]/             # Localized routes (en, de, es, fr, hi, ja, ko, pt)
│   │   │   ├── layout.tsx        # Dynamic i18n layout, metadata & fonts
│   │   │   ├── page.tsx          # Homepage with test grid, categories & workflows
│   │   │   ├── tests/[testId]/   # Dynamic test canvas runner
│   │   │   ├── monitor-inspection/ # Guided multi-step workflows
│   │   │   ├── guides/           # Technical display guides
│   │   │   └── tools/            # Standalone calculators & generators
│   ├── components/
│   │   ├── test-runner/          # Fullscreen canvas engine, HUD controls, overlays
│   │   ├── tests/                # 60+ individual test pattern components
│   │   ├── inspection-report/    # PDF/printable report generator
│   │   ├── layout/               # Header, Footer, navigation drawers
│   │   └── tools/                # Audio/Video recorders, calculators
│   ├── data/
│   │   ├── tests.ts              # Master catalog of tests, categories & intents
│   │   ├── workflows/            # Workflow definitions & steps across locales
│   │   ├── guides.ts             # Display guides and references
│   │   └── knowledgeBase/        # Extensive technical display knowledge base
│   ├── i18n/                     # next-intl configuration & locale routing
│   └── lib/                      # Math, WebGL utilities, report generators, SEO
└── messages/                     # Translation dictionaries (8 languages)
```

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Library**: [React 19](https://react.dev/)
- **Type Safety**: [TypeScript 5](https://www.typescriptlang.org/) in strict mode
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with pure CSS variables and `@tailwindcss/postcss`
- **Typography**: `next/font` with Inter & JetBrains Mono (subsets preloaded)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/) with statically rendered locale paths
- **Icons**: [Lucide React](https://lucide.dev/)

---

### Key Technical Implementations

#### 1. Zero-Clipping Borderless Fullscreen Canvas
Every test pattern is rendered inside a centralized [`TestWrapper`](src/components/test-runner/TestWrapper.tsx) harness.
- Utilizes the **HTML5 Fullscreen API** (`requestFullscreen`).
- Maintains mathematical 1:1 pixel ratios without browser viewport scaling distortions.
- Uses the **Screen Wake Lock API** (`navigator.wakeLock`) to prevent the operating system from dimming the screen or sleeping during lengthy diagnostic sessions.
- Automatically handles keyboard navigation (`Space`, `ArrowLeft`, `ArrowRight`, `Esc`, `F11`) with accessible HUD popups that auto-hide to prevent OLED burn-in during tests.

#### 2. Refresh Rate & Frame Timing Accuracy
Rather than relying on basic interval timers, refresh rate detection uses a high-resolution sliding-window delta calculation over `window.requestAnimationFrame`:
```typescript
const delta = performance.now() - lastFrameTime;
const instantHz = 1000 / delta;
// Multi-frame circular buffer with variance and standard deviation rejection
```
This isolates OS compositor jitter and browser scheduler hiccups to reliably report 60Hz, 120Hz, 144Hz, 240Hz, and 360Hz refresh frequencies.

#### 3. Diagnostic State & Defect Observation Logger
Users can tag tests with observations (`PASS`, `CHECK`, `ISSUE`). The observation state is managed through React Context and serialized into localStorage:
- Retains coordinates of dead pixels clicked directly on the canvas.
- Compiles the recorded data into an exportable, printable **Inspection Certificate** with panel serial metadata, browser environment telemetry, and timestamped pass/fail matrices.

---

### Hardware & Browser APIs Utilized

| Browser API | Implementation Purpose |
| :--- | :--- |
| **HTML5 Canvas 2D** | Real-time rendering of moiré patterns, subpixel matrices, gamma calibration ramps, and motion lines. |
| **WebGL 2.0** | 3D GPU stress benchmarking, shader-driven color gamut conversions, and hardware acceleration detection. |
| **Web Audio API** | Real-time audio waveform synthesis, stereo channel phase cancellation, and millisecond-accurate audio/video sync pulses. |
| **Gamepad API** | High-polling access to connected gamepads for stick drift and deadzone visualization. |
| **Screen Wake Lock API** | Keeps display active without screen timeouts during manual inspection sessions. |
| **MediaDevices API** | Direct camera stream testing and microphone input level monitoring. |
| **Device Motion / Orientation** | Direct access to hardware accelerometer and gyroscope on mobile and convertible devices. |

---

### 🌐 Internationalization (i18n)

The project features comprehensive localization across **8 languages**:
- 🇺🇸 English (`en`)
- 🇩🇪 German (`de`)
- 🇪🇸 Spanish (`es`)
- 🇫🇷 French (`fr`)
- 🇮🇳 Hindi (`hi`)
- 🇯🇵 Japanese (`ja`)
- 🇰🇷 Korean (`ko`)
- 🇧🇷 Portuguese (`pt`)

All route segments are prefixed with the locale (`/[locale]/...`). Hreflang alternates, OpenGraph metadata, and structured JSON-LD schemas are automatically emitted for full international SEO support.

---

## 🚀 Getting Started & Local Development

### Prerequisites
- **Node.js**: v18.18.0 or newer (Node.js 20+ recommended)
- **Package Manager**: npm, pnpm, or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/screen-tester.git
   cd screen-tester
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000). The application will automatically redirect to your preferred language (e.g., `http://localhost:3000/en`).

### Available NPM Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server with Webpack. |
| `npm run build` | Compiles the production build with type checking and static page generation. |
| `npm run start` | Runs the compiled production server. |
| `npm run lint` | Runs ESLint 9 to verify code styling and syntax rules. |

---

## 🌐 Browser Compatibility & Limitations

### Fully Supported Browsers
- **Google Chrome** & Chromium-based browsers (Edge, Brave, Opera, Vivaldi) — *Full feature support including Wake Lock & Gamepad.*
- **Mozilla Firefox** — *Full display and test pattern support.*
- **Apple Safari (macOS & iOS)** — *Full display and test pattern support.*

### ⚠️ Technical Limitations of Browser-Based Diagnostics
Because Screen Tester runs within the secure browser sandbox, certain physical hardware parameters cannot be measured through software alone:
1. **Absolute Nits / Lux Luminance**: While the tests can accurately display full-scale white and black steps, measuring actual physical brightness (e.g., whether your monitor hits 1,000 nits) requires an external optical colorimeter (like an X-Rite or Spyder).
2. **Physical I/O Ports & Cables**: The browser cannot detect physical pin damage or cable bandwidth limitations on HDMI or DisplayPort connections.
3. **Internal Power Supply & Backlight Inverter**: Hardware power supply fluctuations require physical hardware multimeter diagnostics.
4. **Variable Refresh Rate Dynamics**: Browsers run on the desktop compositor; testing fluctuating variable refresh rates (G-Sync/FreeSync) in real-time requires native DirectX/Vulkan game execution.

---

## 📄 License

This project is licensed under the **MIT License**. Feel free to use, modify, and distribute it for personal, commercial, or educational purposes.
export type KnowledgeBaseCategory = 
  | "display-basics"
  | "display-problems"
  | "tv-and-display-setup"
  | "device-and-input"
  | "browser-and-testing";

export interface KnowledgeCategoryInfo {
  id: KnowledgeBaseCategory;
  title: string;
  shortTitle: string;
  description: string;
  iconName: "Layers" | "AlertTriangle" | "Tv" | "Smartphone" | "ShieldCheck";
}

export interface KnowledgeArticleSection {
  title: string;
  content: string[];
  bullets?: string[];
  callout?: {
    type: "note" | "warning" | "tip";
    text: string;
  };
}

export interface KnowledgeFaqItem {
  question: string;
  answer: string;
}

export interface KnowledgeArticle {
  slug: string;
  category: KnowledgeBaseCategory;
  title: string;
  subtitle: string;
  description: string; // for meta description
  directAnswer: string; // concise 1-2 sentence definition
  whyItMatters: string;
  whatToLookFor: string[];
  howToTest: string[];
  whatScreenTesterCanObserve: string[];
  whatScreenTesterCannotDetermine: string[];
  commonCauses: string[];
  whatToDoNext: string[];
  sections: KnowledgeArticleSection[];
  faq: KnowledgeFaqItem[];
  relatedTestIds: string[];
  relatedTroubleshootingIds: string[];
  relatedArticleSlugs: string[];
  primarySearchIntent: string;
  readingTimeMinutes: number;
}

export const KNOWLEDGE_CATEGORIES: KnowledgeCategoryInfo[] = [
  {
    id: "display-basics",
    title: "Display Basics & Architecture",
    shortTitle: "Display Basics",
    description: "Core physical and optical fundamentals: resolution, refresh rates, HDR pipelines, color depth, black levels, and panel uniformity.",
    iconName: "Layers"
  },
  {
    id: "display-problems",
    title: "Display Defects & Artifacts",
    shortTitle: "Display Problems",
    description: "Diagnosing visual flaws: dead vs. stuck pixels, backlight bleed, IPS glow, ghosting, screen tearing, text fringing, and burn-in.",
    iconName: "AlertTriangle"
  },
  {
    id: "tv-and-display-setup",
    title: "TV & Display Setup",
    shortTitle: "TV & Setup",
    description: "Configuration guidance: TV overscan, 1:1 pixel mapping, non-native scaling artifacts, and aspect ratio calibration.",
    iconName: "Tv"
  },
  {
    id: "device-and-input",
    title: "Device & Input Testing",
    shortTitle: "Device & Input",
    description: "Input peripherals and sensors: multi-touch digitizers, webcam streaming pipelines, stereo audio balance, and motion sensors.",
    iconName: "Smartphone"
  },
  {
    id: "browser-and-testing",
    title: "Browser Testing Boundaries",
    shortTitle: "Browser & Testing",
    description: "Technical honesty: what web browsers can measure, hardware API limitations, permission sandboxes, and client-side privacy.",
    iconName: "ShieldCheck"
  }
];

export const KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  // =========================================================================
  // CATEGORY 1: DISPLAY BASICS (6 Articles)
  // =========================================================================
  {
    slug: "resolution-and-scaling",
    category: "display-basics",
    title: "Monitor Resolution, Aspect Ratio & OS Scaling",
    subtitle: "Understanding physical pixels, logical viewports, DPI scaling, and integer pixel mapping.",
    description: "Learn how display resolution, aspect ratios, and operating system scaling settings affect desktop sharpness, text clarity, and 1:1 pixel rendering.",
    directAnswer: "Display resolution represents the physical grid of horizontal and vertical pixels on your screen, while OS scaling scales desktop UI elements to maintain readability at high pixel densities (PPI).",
    whyItMatters: "Running a display at a non-native resolution or using unoptimized fractional scaling causes blurry text, fuzzy application icons, and interpolation moiré artifacts because individual digital pixels no longer map 1:1 to physical panel subpixels.",
    whatToLookFor: [
      "Fuzzy or smudged font edges across desktop applications",
      "Stretched or squashed circles and squares indicating aspect ratio mismatch",
      "Moiré interference patterns on fine checkerboard or grid patterns",
      "Uneven line thickness across spreadsheet cells or software toolbars"
    ],
    howToTest: [
      "Open the Resolution Checker test in Screen Tester to inspect physical canvas pixels vs. CSS logical pixels",
      "Verify that your operating system display resolution is set to the panel's native specification",
      "Run the Scaling & Aspect Ratio test to inspect concentric circles for circular symmetry (no oval elongation)"
    ],
    whatScreenTesterCanObserve: [
      "Browser viewport width and height in CSS pixels (`window.innerWidth`, `window.innerHeight`)",
      "Device Pixel Ratio (`window.devicePixelRatio`) reported by the browser environment",
      "Screen dimensions reported by the operating system window manager (`screen.width`, `screen.height`)",
      "Visual rendering of 1-pixel alternating line gratings and calibrated geometric shapes"
    ],
    whatScreenTesterCannotDetermine: [
      "Physical diagonal monitor size in inches (unless manually input by the user)",
      "Physical panel pixel pitch (sub-millimeter distance between phosphor dots or subpixels)",
      "Hardware scaling filters implemented inside the monitor chassis scaler chip"
    ],
    commonCauses: [
      "Operating system set to a non-native resolution (e.g., 1080p selected on a 1440p panel)",
      "Fractional UI scaling (e.g., 125% or 175%) without integer scaling support in legacy Win32 apps",
      "Incorrect monitor OSD aspect ratio setting (e.g., '16:9 Wide' forced on a 16:10 or 4:3 input signal)",
      "GPU driver display scaling configured to 'Stretch' instead of 'Aspect Ratio' or 'No Scaling'"
    ],
    whatToDoNext: [
      "Set your operating system display resolution to 'Recommended (Native)' in Windows or macOS settings",
      "If text is too small, use integer scaling (e.g., 200% on a 4K display) or calibrate system text antialiasing",
      "Check your monitor on-screen display (OSD) and set Aspect Ratio to 'Auto', 'Original', or '1:1'"
    ],
    sections: [
      {
        title: "Physical Resolution vs. Logical Viewport",
        content: [
          "Physical resolution describes the exact count of microscopic physical light-emitting elements manufactured into the display substrate (e.g., 3840 × 2160 physical subpixel triads).",
          "Logical resolution (CSS pixels) is the abstraction presented to web browsers and desktop software. On high-density screens (such as 4K monitors or Retina laptops), the operating system applies a scale multiplier (Device Pixel Ratio). At 200% scaling, a 3840 × 2160 screen behaves like a 1920 × 1080 logical canvas, with each logical coordinate backed by a 2 × 2 grid of physical pixels."
        ]
      },
      {
        title: "The Problem of Fractional Scaling",
        content: [
          "Integer scaling (100%, 200%, 300%) maps single digital pixels cleanly onto exact whole physical pixels (1:1 or 2:2).",
          "Fractional scaling (125%, 150%, 175%) requires software renderers to split single digital pixels across fractional hardware boundaries (e.g., 1 digital pixel spans 1.25 physical pixels). Without advanced vector rendering, bitmap elements must be resampled and interpolated, causing subtle blurriness."
        ]
      }
    ],
    faq: [
      {
        question: "Why does my 4K monitor look blurry in some desktop applications?",
        answer: "Legacy desktop applications that do not support modern Per-Monitor DPI scaling are stretched as low-resolution bitmaps by the operating system window manager, leading to fuzzy fonts and soft window borders."
      },
      {
        question: "Is 1080p content sharp on a 4K display?",
        answer: "Because 3840 × 2160 is exactly 2× the width and height of 1920 × 1080, integer scaling allows 4 physical pixels to represent 1 source pixel cleanly without bilinear blur. However, standard bilinear scalers may soften the image unless integer scaling is explicitly enabled in GPU drivers."
      }
    ],
    relatedTestIds: ["resolution-checker", "scaling-aspect-test", "display-info"],
    relatedTroubleshootingIds: ["wrong-resolution", "blurry-text"],
    relatedArticleSlugs: ["text-clarity-and-subpixel-rendering", "aspect-ratio-and-scaling-artifacts"],
    primarySearchIntent: "monitor resolution and scaling explained",
    readingTimeMinutes: 5
  },
  {
    slug: "refresh-rate-and-frame-rates",
    category: "display-basics",
    title: "Refresh Rate, Frame Pacing & Variable Refresh Rate (VRR)",
    subtitle: "How panel refresh cycles, GPU frame delivery, and browser animation timing interact.",
    description: "Understand monitor refresh rate (Hz), frame rate (FPS), browser animation timing limitations, and variable refresh rate technologies like G-Sync and FreeSync.",
    directAnswer: "Refresh rate (measured in Hertz, Hz) is how many times per second your monitor draws a new image, while frame rate (FPS) is the speed at which your graphics card generates frames.",
    whyItMatters: "If your monitor is set to a lower refresh rate than it supports (such as running a 144Hz gaming display at default 60Hz), you lose motion fluidity, increase perceived input lag, and fail to benefit from your display hardware.",
    whatToLookFor: [
      "Choppy mouse cursor motion when sweeping across the desktop",
      "Stutter or frame skipping during fast scrolling or high-speed gaming",
      "Mismatch between advertised monitor refresh rate (e.g., 144Hz) and browser-observed frame timing",
      "Screen tearing when frame delivery is unsynchronized with the display scanout"
    ],
    howToTest: [
      "Run the Refresh Rate Test in Screen Tester to observe real-time `requestAnimationFrame` render intervals",
      "Inspect the frame pacing histogram for jitter, dropped animation frames, or micro-stutters",
      "Run the VRR Visual Inspection test under dynamic motion workloads to inspect tearlines and frame cadence"
    ],
    whatScreenTesterCanObserve: [
      "Timestamp intervals between successive browser rendering cycles via `requestAnimationFrame`",
      "Estimated active display refresh rate derived from mathematical frame delta statistical averaging",
      "Frame pacing consistency (jitter standard deviation, dropped frame counts during animation loops)"
    ],
    whatScreenTesterCannotDetermine: [
      "Hardware panel G-Sync module state or VESA Adaptive-Sync handshake protocol over DisplayPort/HDMI",
      "Hardware backlight strobe frequency (ULMB, DyAc, or ELMB black frame insertion)",
      "Physical pixel liquid crystal rise/fall response times (GtG transition milliseconds)"
    ],
    commonCauses: [
      "Operating system display settings left at default 60Hz after connecting a high-refresh monitor",
      "Using an older HDMI 1.4 or uncertified video cable that lacks bandwidth for high refresh rates at native resolution",
      "Browser hardware acceleration disabled, forcing software CPU composition capped at 60 FPS",
      "Secondary low-refresh display (e.g., 60Hz screen alongside 144Hz) forcing browser compositor downclocking"
    ],
    whatToDoNext: [
      "Open Windows Display Settings > Advanced Display and verify the Refresh Rate dropdown is set to maximum",
      "Ensure your GPU control panel (NVIDIA Control Panel or AMD Software) has G-Sync/FreeSync enabled",
      "Verify your video cable is DisplayPort 1.4 or HDMI 2.1 capable of full native bandwidth"
    ],
    sections: [
      {
        title: "Hz vs. FPS: The Crucial Difference",
        content: [
          "Refresh rate (Hz) is a fixed physical cycle of the display hardware: a 120Hz panel refreshes its scanout lines every 8.33 milliseconds, regardless of whether the source image changed.",
          "Frame rate (FPS) is variable: it reflects the computational speed of the graphics pipeline rendering completed image frames to the front frame buffer.",
          "When FPS exceeds Hz or falls out of synchronization, screen tearing occurs. When FPS drops below Hz without VRR, duplicate frames produce motion stutter and judder."
        ]
      },
      {
        title: "Browser requestAnimationFrame Mechanics",
        content: [
          "Web browsers align animation loops with the monitor vertical blanking interval using the `requestAnimationFrame` API. On properly configured high-refresh systems, browsers fire callbacks at 120Hz, 144Hz, or 240Hz.",
          "However, browsers will throttle frame rates to 60 FPS if running on battery power, if background video playback dictates a 30/60 FPS cadence, or if hardware acceleration is unavailable."
        ]
      }
    ],
    faq: [
      {
        question: "Why does my 144Hz monitor only show 60Hz in the test?",
        answer: "The most common cause is that Windows or macOS has not been configured to output 144Hz. Open your OS display settings to verify the output refresh rate, and ensure hardware acceleration is toggled ON in your browser settings."
      },
      {
        question: "Can a browser test prove that G-Sync is actively working?",
        answer: "No web application can read internal GPU hardware registers to certify G-Sync engagement. Screen Tester provides visual pendulum patterns to observe whether tearing and judder are absent."
      }
    ],
    relatedTestIds: ["refresh-rate-test", "vrr-test"],
    relatedTroubleshootingIds: ["wrong-refresh-rate", "screen-tearing", "flickering"],
    relatedArticleSlugs: ["screen-tearing-and-v-sync", "monitor-ghosting-and-motion-blur"],
    primarySearchIntent: "monitor refresh rate test and explanation",
    readingTimeMinutes: 6
  },
  {
    slug: "hdr-display-fundamentals",
    category: "display-basics",
    title: "HDR Fundamentals, Tone Mapping & Peak Luminance",
    subtitle: "Dynamic range, specular highlight roll-off, 10-bit color pipelines, and browser HDR detection.",
    description: "Learn how High Dynamic Range (HDR) displays work, how tone mapping curves compress highlights, and what browser APIs can detect about HDR capabilities.",
    directAnswer: "High Dynamic Range (HDR) displays present a significantly wider range of luminance (from inky blacks to bright specular highlights) and richer wide-gamut colors (DCI-P3 / Rec. 2020) than standard SDR displays.",
    whyItMatters: "Enabling HDR on an uncalibrated or budget display can wash out desktop colors, clip highlight details into solid white glare, or crush dark shadow details into pitch black due to poor tone mapping.",
    whatToLookFor: [
      "Washed-out, gray desktop colors when HDR is enabled in operating system settings",
      "Specular highlights (such as sun reflections or clouds) blending into flat white blocks with zero texture",
      "Dark scenes becoming excessively dark and losing shadow gradations",
      "Flickering or abrupt brightness shifting when bright elements open on desktop"
    ],
    howToTest: [
      "Run the HDR Capability Test to query browser media query support for dynamic range and wide color gamut (`(dynamic-range: high)` and `(color-gamut: p3)`)",
      "Run the HDR Visual Inspection test in Screen Tester to evaluate stepped luminance highlight roll-off and near-black tone separation"
    ],
    whatScreenTesterCanObserve: [
      "Browser CSS media query evaluation for High Dynamic Range (`dynamic-range: high`)",
      "Wide color gamut browser support flags (`color-gamut: p3`, `color-gamut: rec2020`)",
      "Visual rendering of high-bit-depth gradient sweeps and specular highlight stepped blocks"
    ],
    whatScreenTesterCannotDetermine: [
      "Physical peak nit luminance (e.g., whether a panel genuinely hits 600 or 1,000 nits)",
      "Local dimming zone count, physical array layout, or mini-LED halo blooming severity",
      "Hardware monitor tone-mapping algorithm curves (HGIG vs. static clipping vs. dynamic tone mapping)"
    ],
    commonCauses: [
      "Windows HDR toggle disabled in OS settings, forcing the monitor into SDR emulation mode",
      "Using a 'DisplayHDR 400' edge-lit monitor with no local dimming, resulting in elevated black levels",
      "Browser color profile flag misconfigured, failing to negotiate wide color gamut buffers with the GPU",
      "Monitor HDR picture mode set to an uncalibrated vivid profile rather than accurate reference mode"
    ],
    whatToDoNext: [
      "Run the Windows HDR Calibration app (available from Microsoft Store) to create an accurate OS profile",
      "Ensure your video cable supports HDMI 2.0/2.1 or DisplayPort 1.4 for full 10-bit RGB uncompressed signal",
      "For OLED displays, enable HGIG or reference clipping modes for gaming to avoid double tone-mapping"
    ],
    sections: [
      {
        title: "SDR vs. HDR: Luminance & Color Space",
        content: [
          "Standard Dynamic Range (SDR) is mastered to the legacy sRGB / Rec. 709 color space and standard ~100 nit reference luminance target using 8-bit precision (256 luminance steps per channel).",
          "HDR content uses the Rec. 2020 wide color container and Perceptual Quantizer (PQ / ST.2084) electro-optical transfer function, supporting up to 10,000 nits peak luminance and 10-bit or 12-bit color depths (1,024 to 4,096 steps per channel)."
        ]
      },
      {
        title: "The Reality of Tone Mapping",
        content: [
          "Because consumer monitors rarely output 10,000 or even 2,000 nits, the display processor must perform tone mapping: compressing the wider dynamic range of the source signal down into the physical capabilities of the panel.",
          "Hard clipping preserves accurate midtones but blows out highlights above the panel maximum. Soft roll-off compresses highlights smoothly, maintaining texture at the expense of overall specular contrast."
        ]
      }
    ],
    faq: [
      {
        question: "Why does my desktop look dull or gray when I turn on HDR in Windows?",
        answer: "Windows maps SDR desktop elements to a specific paper-white slider setting in display settings. If this SDR Content Brightness slider is set too low or your monitor lacks adequate peak brightness, desktop windows appear dim."
      },
      {
        question: "Can a web browser display true 10-bit HDR video?",
        answer: "Yes, modern browsers on Windows and macOS support HDR video playback and CSS wide-gamut colors when hardware acceleration is enabled and the operating system is in HDR mode."
      }
    ],
    relatedTestIds: ["hdr-test", "hdr-capability-test"],
    relatedTroubleshootingIds: ["hdr-not-working", "washed-out-colors"],
    relatedArticleSlugs: ["color-depth-and-banding", "black-levels-and-shadow-detail"],
    primarySearchIntent: "hdr display explained test",
    readingTimeMinutes: 7
  },
  {
    slug: "color-depth-and-banding",
    category: "display-basics",
    title: "Color Depth, Quantization & Color Banding",
    subtitle: "6-bit, 8-bit, 10-bit color pipelines, temporal dithering (FRC), and gradient transitions.",
    description: "Explore color depth, bits per channel, temporal dithering (FRC), quantization artifacts, and how to spot harsh color banding across subtle gradients.",
    directAnswer: "Color depth specifies the number of binary bits used to represent the color of each individual subpixel, directly dictating how many distinct color shades a display can produce.",
    whyItMatters: "Lower bit depths (such as 6-bit or 8-bit without dithering) produce visible stair-stepping lines called 'color banding' across subtle gradients (like sunsets, sky scenes, or dark shadows) instead of smooth transitions.",
    whatToLookFor: [
      "Distinct vertical or concentric rings in smooth skies or shadows instead of seamless gradation",
      "Harsh boundary lines separating dark gray tones from pure black",
      "Coarse, noisy checkerboard grain on subtle colors caused by aggressive spatial dithering",
      "Posterization where gradual color changes turn into flat blocks of uniform color"
    ],
    howToTest: [
      "Run the Gradient & Banding Test in Screen Tester to inspect smooth 24-bit linear RGB and grayscale ramps",
      "Toggle between Horizontal, Vertical, and Dark Shadow (0%–25%) ramps to expose bit-depth truncation",
      "Inspect the 64-step quantization simulator to contrast artificial digital stepping against your panel's native performance"
    ],
    whatScreenTesterCanObserve: [
      "HTML5 Canvas 2D and WebGL rendering of continuous 32-bit floating-point or 8-bit integer gradients",
      "Screen color depth reported by the windowing environment (`window.screen.colorDepth`, typically 24 or 30)",
      "Visual display of reference stepped gradients and smooth tonal sweeps"
    ],
    whatScreenTesterCannotDetermine: [
      "Physical panel driver IC bit depth (e.g., true 8-bit native silicon vs. 6-bit + FRC subpixel pulsing)",
      "Temporal Frame Rate Control (FRC) hardware flicker cycles operating at 60Hz or 120Hz sub-frequencies",
      "GPU video output color format quantization (RGB Full 0-255 vs. YCbCr 4:2:2 chroma subsampling)"
    ],
    commonCauses: [
      "Monitor panel uses a budget 6-bit+FRC architecture that struggles with fine dark-tone gradation",
      "GPU output color format accidentally set to 'Limited (16-235)' or 8-bit instead of 10-bit in graphics drivers",
      "Compressed source content (e.g., highly compressed streaming video or 8-bit JPEG images) with pre-baked banding",
      "Monitor internal gamma or contrast settings pushed beyond native linearity limits"
    ],
    whatToDoNext: [
      "Open your GPU control panel and ensure Output Color Depth is set to 10 bpc (bits per channel) if supported",
      "Set Output Dynamic Range to 'Full (0-255)' rather than 'Limited (16-235)'",
      "Reset monitor OSD picture settings to factory default gamma to eliminate artificial quantization"
    ],
    sections: [
      {
        title: "Understanding Color Bit Depths",
        content: [
          "Standard 8-bit color provides 2^8 = 256 shades per primary color (Red, Green, Blue), producing 256 × 256 × 256 = 16.7 million total colors.",
          "Professional 10-bit color provides 2^10 = 1,024 shades per channel, producing over 1.07 billion colors. This 64-fold increase in tonal resolution dramatically reduces color banding.",
          "Many affordable displays use 8-bit + FRC (Frame Rate Control): cycling adjacent pixel colors rapidly across successive refresh cycles to simulate intermediate shades through human visual persistence."
        ]
      }
    ],
    faq: [
      {
        question: "Is 8-bit + FRC noticeably worse than true native 10-bit?",
        answer: "For general productivity, gaming, and casual viewing, modern high-frequency FRC algorithms are virtually indistinguishable from native 10-bit. In dark near-black gradients, high-speed camera analysis or close visual inspection may reveal subtle temporal shimmer."
      },
      {
        question: "Why do I see banding in YouTube videos even on an expensive monitor?",
        answer: "Video compression algorithms (like AVC, VP9, or AV1) aggressively quantize subtle color changes in dark scenes to save streaming bandwidth. In many cases, the banding is already baked into the video stream rather than caused by your monitor."
      }
    ],
    relatedTestIds: ["gradient-banding-test", "color-banding-test", "color-gamut-test"],
    relatedTroubleshootingIds: ["washed-out-colors", "uneven-brightness"],
    relatedArticleSlugs: ["hdr-display-fundamentals", "black-levels-and-shadow-detail"],
    primarySearchIntent: "color banding test 8 bit vs 10 bit",
    readingTimeMinutes: 5
  },
  {
    slug: "black-levels-and-shadow-detail",
    category: "display-basics",
    title: "Black Levels, Contrast & Near-Black Shadow Detail",
    subtitle: "Static contrast ratios, black crush, gamma tracking, and dark room viewing.",
    description: "Learn how display black levels and contrast ratios affect image depth, why black crush hides shadow details, and how to calibrate brightness for dark scenes.",
    directAnswer: "Black level represents the darkest luminance value a display can produce when commanded to display pure black (RGB 0, 0, 0), determining the display's perceived contrast and visual depth.",
    whyItMatters: "If black levels are set too high, dark scenes appear milky gray and washed out. If set too low (black crush), subtle shadow gradations merge into pure black, obliterating textures in dark gaming scenes and movies.",
    whatToLookFor: [
      "Milky, glowing dark gray backgrounds in letterbox movie bars or dark scenes",
      "Inability to discern subtle shadow details (like clothing folds or night textures) in games",
      "Sudden, harsh steps between pure black and dark gray rather than a smooth ramp",
      "Uneven gray clouding across the panel when displaying an all-black screen"
    ],
    howToTest: [
      "Run the Black Level Test to calibrate monitor Brightness until step +1% or +2% is just barely visible against black",
      "Run the Near-Black Test in Screen Tester under dim ambient lighting to inspect 0.25% to 10% dark luminance steps",
      "Inspect the PLUGE (Picture Line-Up Generation Equipment) reference bars to ensure sub-black and above-black separation"
    ],
    whatScreenTesterCanObserve: [
      "Display of calibrated digital RGB low-luminance steps (from RGB 1 to RGB 25)",
      "PLUGE bar patterns with distinct relative percentage luminance offsets",
      "Visual near-black gradient steps across user-inspected full-screen canvas views"
    ],
    whatScreenTesterCannotDetermine: [
      "Absolute minimum black floor in physical nits (e.g., 0.000 nits on OLED vs. 0.15 nits on IPS)",
      "True static hardware contrast ratio (e.g., 1,000:1 on IPS vs. 3,000:1 on VA vs. infinite on OLED)",
      "Ambient room light reflections and anti-glare matte coating light scatter"
    ],
    commonCauses: [
      "Monitor physical Brightness or Black Level setting adjusted too low, causing black crush",
      "Operating system or GPU video dynamic range mismatch (Limited 16-235 input displayed as Full 0-255)",
      "IPS panel physical contrast limitation (~1,000:1) viewed in a pitch-black room without bias lighting",
      "Incorrect gamma preset in monitor OSD (e.g., Gamma 1.8 instead of standard Gamma 2.2)"
    ],
    whatToDoNext: [
      "Calibrate the monitor Brightness OSD control in a darkened room using the PLUGE pattern",
      "Set your monitor OSD Gamma to 2.2 or sRGB",
      "Verify GPU output dynamic range is configured to 'Full Range (0-255)' over HDMI and DisplayPort"
    ],
    sections: [
      {
        title: "Panel Technology and Black Floors",
        content: [
          "OLED and QD-OLED displays turn off individual subpixels completely, achieving absolute true black (0.000 nits) and theoretically infinite contrast.",
          "VA (Vertical Alignment) LCD panels physically block backlight light more effectively than IPS, delivering static contrast between 3,000:1 and 5,000:1.",
          "IPS panels keep liquid crystals parallel to the glass, allowing microscopic backlight bleed-through that caps static contrast around 1,000:1 to 1,500:1."
        ]
      }
    ],
    faq: [
      {
        question: "What is 'black crush'?",
        answer: "Black crush occurs when near-black grayscale steps (e.g., RGB values 1 through 10) are all displayed at 0 nits pure black, destroying shadow texture and fine details in dark scenes."
      },
      {
        question: "Should I set monitor Brightness to 100% for better contrast?",
        answer: "No. On LCD monitors, increasing the 'Brightness' slider typically raises the backlight power, which elevates the black floor and washes out dark scenes. Contrast is the ratio between white and black, not maximum brightness alone."
      }
    ],
    relatedTestIds: ["black-level-test", "near-black-test", "brightness-test", "contrast-test"],
    relatedTroubleshootingIds: ["uneven-brightness", "washed-out-colors"],
    relatedArticleSlugs: ["backlight-bleed-vs-ips-glow", "hdr-display-fundamentals"],
    primarySearchIntent: "monitor black level test shadow detail",
    readingTimeMinutes: 6
  },
  {
    slug: "display-uniformity",
    category: "display-basics",
    title: "Display Uniformity & Luminance Distribution",
    subtitle: "Edge-lit, direct-lit, and self-emissive panel uniformity, dirty screen effect, and vignetting.",
    description: "Learn how display backlights distribute light, what causes Dirty Screen Effect (DSE) and edge vignetting, and how to inspect full-panel uniformity.",
    directAnswer: "Display uniformity measures how evenly brightness (luminance) and color temperature (chromaticity) are maintained across the entire physical surface of a display panel.",
    whyItMatters: "Uneven uniformity causes noticeable bright or dark patches, yellow or pink color tinting across white documents, and cloudy smudges ('Dirty Screen Effect') visible during camera panning in sports and gaming.",
    whatToLookFor: [
      "Vignetting (darkened corners or edges) when viewing full-screen white or light gray documents",
      "Dirty Screen Effect (DSE): subtle cloudy or streaky smudges visible when panning across solid backgrounds",
      "Color temperature shifts: one side of the screen looking noticeably warmer (yellowish) or cooler (bluish)",
      "Center hotspotting where the center of the panel is substantially brighter than the perimeter"
    ],
    howToTest: [
      "Run the Screen Uniformity test in Screen Tester and cycle between 5%, 20%, 50%, and 100% full-screen grayscale fields",
      "On 50% and 100% white, inspect for color temperature shifts between the left, center, and right zones",
      "On 5% and 20% gray, scan for cloudy patches, vertical banding, or Dirty Screen Effect"
    ],
    whatScreenTesterCanObserve: [
      "Full-screen flat fields across stepped grayscale luminance levels (5% to 100%)",
      "Full-screen primary color fields (Red, Green, Blue) to inspect color purity uniformity",
      "User visual observation of luminance falloff under controlled ambient lighting"
    ],
    whatScreenTesterCannotDetermine: [
      "Delta E color temperature deviation across panel quadrants without a physical colorimeter",
      "Numerical luminance uniformity percentages (e.g., ANSI 9-point lux distribution measurement)",
      "Thermal expansion warping inside internal light guide diffuser plates"
    ],
    commonCauses: [
      "Edge-lit LED backlight arrays with uneven light guide plate diffusion",
      "Manufacturing variations in liquid crystal gap thickness across large panel surfaces",
      "Physical chassis bezel pressure pinching the outer layers of the panel assembly",
      "OLED factory subpixel deposition variations resulting in subtle vertical banding in near-black scenes"
    ],
    whatToDoNext: [
      "If evaluating a newly purchased monitor, inspect uniformity within your return/exchange window",
      "Ensure ambient room light is balanced: avoid strong side lighting that creates the illusion of uneven panel tint",
      "For creative professional work, calibrate near the center zone where uniformity is most consistent"
    ],
    sections: [
      {
        title: "Backlight Architecture & Uniformity",
        content: [
          "Edge-lit displays place LEDs along the bottom or sides, using acrylic light guide plates to distribute light across the panel. This often causes brighter edges and darker centers.",
          "Full-Array Local Dimming (FALD) and mini-LED displays place thousands of LEDs directly behind the LCD substrate, dramatically improving contrast but potentially introducing local dimming blooming around bright objects.",
          "OLED displays have zero backlight, providing near-perfect pixel-level luminance uniformity, though early-generation panels may exhibit faint vertical banding on 5% dark gray slides."
        ]
      }
    ],
    faq: [
      {
        question: "Is 100% perfect screen uniformity possible on an LCD monitor?",
        answer: "No commercial LCD panel has 100% perfect uniformity. A 10% to 15% brightness falloff from center to corners is standard across consumer displays. Only expensive professional graphics displays with built-in digital uniformity compensation (DUC) achieve near-uniform output."
      },
      {
        question: "Does Dirty Screen Effect (DSE) get worse over time?",
        answer: "Typically no. DSE is a physical characteristic of the diffuser sheet and liquid crystal sandwich created during factory assembly. It remains stable throughout the life of the display."
      }
    ],
    relatedTestIds: ["uniformity-test", "white-level-test", "solid-color-test"],
    relatedTroubleshootingIds: ["uneven-brightness", "washed-out-colors"],
    relatedArticleSlugs: ["backlight-bleed-vs-ips-glow", "black-levels-and-shadow-detail"],
    primarySearchIntent: "screen uniformity test dirty screen effect",
    readingTimeMinutes: 5
  },

  // =========================================================================
  // CATEGORY 2: DISPLAY PROBLEMS (6 Articles)
  // =========================================================================
  {
    slug: "dead-pixel-vs-stuck-pixel",
    category: "display-problems",
    title: "Dead Pixels vs. Stuck Pixels: Identification & Repair Limits",
    subtitle: "Transistor failure, subpixel color stagnation, ISO 9241-307 standards, and flashing tools.",
    description: "Learn the difference between a permanently dead pixel and a stuck subpixel, how to inspect your screen for defective pixels, and what software tools can realistically achieve.",
    directAnswer: "A dead pixel is a permanently unpowered pixel that appears as a persistent black dot on light backgrounds, while a stuck pixel has one or more subpixels locked open, glowing brightly as a red, green, or blue dot on dark backgrounds.",
    whyItMatters: "Display warranties classify pixel defects strictly according to international standards (ISO 9241-307). Knowing whether a flaw is a dead pixel or a stuck subpixel determines whether software cycling tools can revive it and whether your manufacturer will replace the unit.",
    whatToLookFor: [
      "Dead pixel: A microscopic black square that remains black even on pure white, yellow, or cyan backgrounds",
      "Stuck pixel: A tiny red, green, or blue dot that glows intensely against black and dark gray screens",
      "Hot / Bright pixel: An entire pixel triad stuck in the fully energized white state on a black screen",
      "Surface debris / dust: Specks that shift position relative to pixels when you change your viewing angle"
    ],
    howToTest: [
      "Thoroughly clean your monitor surface with a clean microfiber cloth to eliminate dust specks",
      "Launch the Dead Pixel Test in Screen Tester and toggle full-screen solid Red, Green, Blue, White, and Black backgrounds",
      "Carefully scan the panel in a grid pattern to locate defective subpixels and mark their coordinates"
    ],
    whatScreenTesterCanObserve: [
      "Rendering of pure full-screen chromatic fields (RGB), pure white, and pure black",
      "User marking of observed defect coordinates and classification on the inspection grid",
      "High-frequency color cycling routines via the Stuck Pixel Fixer tool"
    ],
    whatScreenTesterCannotDetermine: [
      "Physical subpixel electrical circuit continuity (transistor gate burnout vs. trace fracture)",
      "Microscopic optical inspection of color filter alignment without a magnifying loupe",
      "Guaranteed mechanical or thermal revival of physically damaged subpixels"
    ],
    commonCauses: [
      "Thin-Film Transistor (TFT) manufacturing defects during cleanroom lithography",
      "Liquid crystal material contamination or physical bonding failure at the subpixel well",
      "Physical impact, localized pressure, or flex damage to the glass substrate during transit",
      "Electrostatic discharge (ESD) during assembly or power supply surge"
    ],
    whatToDoNext: [
      "If you identify a stuck (colored) pixel, run the Stuck Pixel Fixer over the affected zone for 15–30 minutes",
      "If the pixel is dead (black), software flashing cannot fix it; check your manufacturer's ISO 9241-307 warranty policy",
      "If within the 14-to-30-day retailer return window, consider an exchange if the defect is centrally located"
    ],
    sections: [
      {
        title: "Dead vs. Stuck: The Technical Difference",
        content: [
          "In modern Active-Matrix LCDs (TFT), each pixel consists of three subpixels (Red, Green, Blue) driven by microscopic transistors.",
          "When a transistor fails completely and delivers no voltage, the liquid crystal blocks light (or passes light, depending on whether it is normally black or normally white). On typical modern panels, a dead pixel receives no power and stays black.",
          "A stuck pixel occurs when the liquid crystal remains locked in an energized state, allowing continuous light through one color filter. Because the transistor is still delivering charge, rapid color cycling can sometimes shock the liquid crystal back into normal mobility."
        ]
      },
      {
        title: "ISO 9241-307 Defect Classes",
        content: [
          "Most consumer monitors are sold under ISO 9241-307 Class II standards. Under Class II, manufacturers allow up to 2 permanently bright pixels, 2 permanently dark pixels, and up to 5 defective subpixels per million pixels before considering the panel defective.",
          "On a 4K display (8.3 million pixels), manufacturer warranty policies may permit over 15 defective subpixels before approving a warranty return."
        ]
      }
    ],
    faq: [
      {
        question: "Can rubbing or applying pressure to a stuck pixel fix it?",
        answer: "Applying physical pressure with a stylus or cloth is risky and strongly discouraged. It can crack the brittle indium tin oxide (ITO) electrodes or damage neighboring subpixels, turning a single stuck dot into permanent spiderweb damage."
      },
      {
        question: "Can a dead pixel spread to other pixels?",
        answer: "No. Individual pixels are electrically isolated in discrete transistor wells. A single dead pixel cannot 'infect' or spread to neighboring pixels unless the display suffers progressive liquid ingress or physical impact damage."
      }
    ],
    relatedTestIds: ["dead-pixel-test", "stuck-pixel-test", "bright-pixel-test", "stuck-pixel-fixer"],
    relatedTroubleshootingIds: ["dead-stuck-bright-pixel"],
    relatedArticleSlugs: ["oled-burn-in-and-image-retention", "display-uniformity"],
    primarySearchIntent: "dead pixel vs stuck pixel test and fix",
    readingTimeMinutes: 6
  },
  {
    slug: "backlight-bleed-vs-ips-glow",
    category: "display-problems",
    title: "Backlight Bleed vs. IPS Glow: How to Tell the Difference",
    subtitle: "Bezel pinch, reflector leakage, liquid crystal birefringence, and darkroom diagnosis.",
    description: "Learn how to tell backlight bleed apart from IPS glow, why viewing angles change what you see, and how to verify both using darkroom visual inspection.",
    directAnswer: "Backlight bleed is physical light leaking around the monitor bezel that remains in the exact same spot regardless of where you sit, while IPS glow is an inherent optical characteristic of IPS panels that changes intensity and shifts position as you move your head.",
    whyItMatters: "Returning an IPS monitor because of 'IPS glow' will result in receiving a replacement with the exact same characteristic, as all IPS panels exhibit off-axis glow. Backlight bleed, however, is an assembly defect that warrants a replacement if severe.",
    whatToLookFor: [
      "Backlight Bleed: Bright white or yellowish torch-like light patches radiating inward from bezel edges and corners that stay fixed in place",
      "IPS Glow: A silvery, golden, or purplish sheen across the corners of the panel that brightens or disappears as you step backward or change viewing angles",
      "Clouding / Flashlighting: Diffuse cloudy patches across the center of edge-lit panels in dark scenes"
    ],
    howToTest: [
      "Perform the test in a completely dark room at night with all room lights turned off",
      "Set monitor brightness to your normal working level (typically 20% to 40%, ~120 nits; do not force 100% brightness)",
      "Launch the Backlight Bleed Test in Screen Tester to display an all-black fullscreen canvas",
      "Observe the corners, then step back 2 meters (6 feet): if the corner glow diminishes significantly, it is IPS glow; if it remains bright and localized, it is backlight bleed"
    ],
    whatScreenTesterCanObserve: [
      "Display of a pure 100% digital black canvas (RGB 0, 0, 0) across the entire display surface",
      "Optional center reticle crosshair to help keep your eyes focused perpendicular to the panel center",
      "Stepped low-luminance dark backgrounds (1% to 5%) to contrast localized light leakage against panel black floors"
    ],
    whatScreenTesterCannotDetermine: [
      "Photometric candela per square meter (nits) emitted by the light leak",
      "Physical torque tension of the monitor bezel screws or chassis assembly clamps",
      "Distinction between panel glass pressure warping and optical polarization sheet leakage without physical movement"
    ],
    commonCauses: [
      "Backlight Bleed: Excessive physical clamping pressure during factory bezel assembly pinching the panel edge",
      "Backlight Bleed: Thermal expansion warping the internal light guide plate (LGP) under prolonged high brightness",
      "IPS Glow: Natural off-axis light leakage caused by the horizontal crystal orientation of In-Plane Switching technology",
      "IPS Glow: Sitting too close to a large monitor (e.g., 27\" or 32\" at 50cm distance) where the corners exceed a 30° viewing angle"
    ],
    whatToDoNext: [
      "Increase your viewing distance: sitting 70–80cm away significantly reduces perceived IPS glow on large panels",
      "Add subtle bias lighting behind your monitor (a 6500K LED strip on the wall) to constrict your pupils and deepen perceived black levels",
      "If severe yellow/white torching persists even from 2 meters away, contact your retailer for a replacement"
    ],
    sections: [
      {
        title: "The Physical Mechanics of Light Leakage",
        content: [
          "LCD monitors cannot generate their own light. Powerful LED arrays along the edge or back of the chassis shine light through a sandwich of diffuser plates, polarizing sheets, and liquid crystals.",
          "Backlight bleed occurs when the mechanical frame pinches the sandwich unevenly, creating microscopic gaps where light escapes around the edges unmodulated by the liquid crystals.",
          "IPS glow occurs because liquid crystal molecules in IPS panels are aligned horizontally parallel to the substrate. Light passing through crystals at sharp off-axis angles experiences slight phase retardation, emitting as visible diffuse glow to off-axis viewers."
        ]
      }
    ],
    faq: [
      {
        question: "Can backlight bleed be fixed at home?",
        answer: "Generally no. Loosening chassis screws or flexing the frame can void your warranty and risks cracking the delicate LCD glass. Severe backlight bleed is an assembly defect covered under retailer return policies."
      },
      {
        question: "Do OLED monitors suffer from backlight bleed or IPS glow?",
        answer: "No. OLED panels are self-emissive with no backlight and no diffuser sheets. Every subpixel turns off completely, producing 0.000 nits pure black with zero backlight bleed and zero IPS glow."
      }
    ],
    relatedTestIds: ["backlight-bleed-test", "uniformity-test", "black-level-test"],
    relatedTroubleshootingIds: ["backlight-bleed-ips-glow", "uneven-brightness"],
    relatedArticleSlugs: ["black-levels-and-shadow-detail", "display-uniformity"],
    primarySearchIntent: "backlight bleed vs ips glow difference test",
    readingTimeMinutes: 6
  },
    {
    slug: "monitor-ghosting-and-motion-blur",
    category: "display-problems",
    title: "Monitor Ghosting, Motion Blur & Overdrive Overshoot",
    subtitle: "VA dark-level smearing, response-time overdrive tuning, inverse ghosting coronas, and motion persistence.",
    description: "Understand why VA monitors show dark-level smearing, how aggressive overdrive causes bright halos or inverse ghosting, and how to visually diagnose motion artifacts.",
    directAnswer: "Monitor ghosting is a trailing artifact caused by slow liquid crystal transitions, particularly on dark-to-dark and near-black shades on VA panels. Conversely, overdrive overshoot (inverse ghosting) produces bright or dark glowing halos (coronas) when excessive voltage drives liquid crystals past their intended luminance target.",
    whyItMatters: "Overdrive tuning represents a fundamental engineering trade-off: insufficient acceleration causes sluggish transitions and visible dark smearing, while overly aggressive overdrive drives liquid crystals past their target shade, producing distracting glowing coronas. Achieving optimal motion clarity requires balancing these forces across your monitor's refresh rate and operating temperature.",
    whatToLookFor: [
      "Dark trailing or purple/black smearing lagging behind dark graphics moving across dark-gray or mid-tone backgrounds (characteristic dark-level smearing on VA panels)",
      "Bright, glowing white or inverted color halos (coronas) trailing or outlining moving objects (overdrive overshoot / inverse ghosting)",
      "Faint trailing silhouettes matching the object's original color without glowing edges (conventional GtG ghosting from slow transitions)",
      "Uniform softness and edge blur across the entire scene during motion caused by human retinal persistence across sample-and-hold display frames (MPRT)",
      "Changes in trailing length or the sudden appearance of overshoot coronas when operating at lower refresh rates or during Variable Refresh Rate (VRR) frame drops",
      "Discontinuous positional jumping, stuttering, or judder stemming from GPU frame delivery rather than physical display panel pixel response"
],
    howToTest: [
      "Open the [Ghosting Test](/tests/ghosting-test) in Screen Tester and observe moving blocks against both high-contrast and dark-contrast gray backgrounds.",
      "Test across low, medium, and high velocities to evaluate how trailing length scales with motion speed.",
      "Access your monitor's On-Screen Display (OSD) and navigate to the Overdrive / Response Time setting (consult our [Monitor OSD Settings Guide](/guides/monitor-osd-settings-explained)).",
      "Step systematically through each available overdrive level (e.g., Off, Normal, Fast, Extreme); identify the setting that suppresses trailing without generating bright halos.",
      "Launch the [Motion Blur Test](/tests/motion-blur-test) to distinguish sample-and-hold retinal persistence from physical pixel response limitations.",
      "If using G-Sync or FreeSync, evaluate motion behavior across varying frame rates using the [VRR Test](/tests/vrr-test) to check for lower-refresh overshoot.",
      "Repeat observations at your normal operating refresh rate and after the display has warmed up to normal operating temperature."
],
    whatScreenTesterCanObserve: [
      "Visual observation of dark trails, color silhouettes, and glowing overshoot coronas behind moving patterns",
      "Rendering of calibrated test patterns across diverse contrast pairs (including dark-gray-on-black and cyan-on-gray)",
      "Relative visual changes in trailing length and corona intensity across different monitor OSD overdrive presets",
      "User-observed variations in motion clarity when testing across different configured refresh rates",
      "Comparative observation between sample-and-hold eye tracking persistence and liquid crystal transition delay"
],
    whatScreenTesterCannotDetermine: [
      "Laboratory oscilloscope photodiode Gray-to-Gray (GtG) response times measured in milliseconds",
      "Complete 256-level pixel transition matrices across all starting and ending luminance levels",
      "Certified Moving Picture Response Time (MPRT) captured with a synchronized high-speed pursuit camera",
      "Internal panel timing controller (T-Con) drive voltage waveforms or exact percentage overshoot",
      "Total display input latency or scaler image processing delay"
],
    commonCauses: [
      "Sluggish liquid crystal reorientation on dark-to-dark and near-black transitions (a known physical characteristic of VA panel architecture)",
      "Monitor Overdrive / Trace Free / AMA set to an aggressive 'Extreme' mode, producing excessive voltage overshoot",
      "Monitor Overdrive completely disabled or set to 'Off', leaving slow liquid crystals with zero voltage acceleration",
      "Static overdrive tuning without variable overdrive compensation, causing severe coronas when VRR frame rates drop",
      "Low ambient room temperature temporarily increasing liquid crystal fluid viscosity before the display warms up",
      "GPU frame pacing hiccups, V-Sync dropouts, or irregular frame delivery mistaken for panel response limitations"
],
    whatToDoNext: [
      "Open your monitor's OSD and set the picture mode to a neutral preset; avoid artificial sharpness or extreme 'FPS' modes.",
      "Locate the Overdrive setting and select a balanced middle setting (typically 'Normal' or 'Fast'); avoid 'Extreme'.",
      "Ensure your monitor is configured to its intended native refresh rate in your operating system display settings.",
      "Test motion clarity in the [Ghosting Test](/tests/ghosting-test) and [Motion Blur Test](/tests/motion-blur-test) to verify trailing reduction.",
      "If gaming with VRR (G-Sync or FreeSync), test at lower refresh rates using the [VRR Test](/tests/vrr-test) to ensure overshoot stays controlled.",
      "If stutter or judder persists independently of pixel trailing, inspect your graphics pipeline using the [Troubleshooting Guide](/knowledge-base/troubleshooting)."
],
    sections: [
        {
                "title": "VA Dark-Level Smearing: Why Near-Black Transitions Lag",
                "content": [
                        "Vertical Alignment (VA) panels orient liquid crystal molecules perpendicular to the glass substrate in their uncharged resting state. In this position, they block backlight illumination exceptionally well; VA displays commonly provide higher native static contrast than many IPS displays, but exact characteristics vary by panel and model.",
                        "However, transitioning liquid crystals between deep black (RGB 0,0,0) and dark gray involves very small electric potential differences. Reorienting molecules under low voltage differentials requires significantly more physical time than larger transitions, such as switching from black to pure white. When dark graphics move across dark or mid-gray backgrounds, the delayed liquid crystal transitions produce elongated black or purple streaks—a phenomenon known as dark-level smearing.",
                        "Crucially, dark-level transition behavior varies substantially across panel generations, specific monitor models, scaler firmware, overdrive tuning, refresh rate, and operating temperature. Modern 'Fast VA' panels with high-voltage driving have markedly reduced this gap compared to legacy designs. Quoted manufacturer response times (e.g., '1ms GtG') reflect cherry-picked best-case transitions and do not describe all pixel transitions equally."
                ],
                "bullets": [
                        "Near-black and dark-to-dark transitions involve subtle voltage steps that reorient crystals slower than full-voltage white transitions.",
                        "Visible black smearing is most noticeable when scrolling white-on-black text or panning cameras across shadowy environments.",
                        "Magnitude varies significantly by panel generation, scaler tuning, firmware, and temperature; there is no universal response-time figure for all VA panels.",
                        "Manufacturer '1ms' specifications do not represent full-matrix response times and often require unusable overdrive settings."
                ]
        },
        {
                "title": "Response-Time Overshoot & Inverse Ghosting: The Cost of Overdrive",
                "content": [
                        "To accelerate sluggish liquid crystal transitions, monitor manufacturers implement overdrive (also branded as Trace Free, AMA, Response Time, or Ramp Up). Overdrive applies a temporary voltage spike at the beginning of a refresh cycle to force liquid crystals into their new alignment faster than native voltage allows.",
                        "When overdrive is tuned conservatively, crystals reach their target shade within the active refresh interval. However, if the overdrive voltage is overly aggressive, the crystals surge past the target luminance before rebounding. This optical error produces response-time overshoot, commonly called inverse ghosting or coronas.",
                        "Inverse ghosting manifests as bright, glowing, or inverted halos trailing moving objects. Overdrive is a fundamental engineering compromise: reducing overdrive reduces overshoot while potentially increasing conventional trailing, whereas increasing overdrive speeds up transitions but risks distracting coronas. Increasing overdrive indefinitely does not improve response time; beyond an optimal threshold, it severely degrades visual fidelity."
                ],
                "bullets": [
                        "Overdrive accelerates liquid crystal rotation by delivering a brief higher-voltage surge at the start of the frame interval.",
                        "Excessive voltage drives crystals past their intended luminance target before settling, generating bright glowing halos (coronas).",
                        "Overdrive tuning is a direct engineering trade-off between standard trailing blur and inverse ghosting halos.",
                        "Setting overdrive to maximum or 'Extreme' almost universally introduces severe overshoot artifacts that ruin motion clarity."
                ]
        },
        {
                "title": "Distinguishing the Five Core Motion Artifacts",
                "content": [
                        "Motion clarity defects are frequently conflated because users perceive any visual imperfection during movement as generic 'blur'. However, effective diagnosis requires distinguishing between five distinct physical phenomena, which can occur simultaneously on the same display:",
                        "1. Dark-Level Smearing: Elongated dark or purple streaks trailing dark objects across dark backgrounds, caused specifically by slow near-black liquid crystal transitions (prevalent on VA panels).",
                        "2. Conventional Ghosting / Trailing: Soft silhouettes matching the moving object's original color, caused by liquid crystal transition times that exceed the refresh frame interval across standard color pairs.",
                        "3. Overdrive Overshoot / Inverse Ghosting: Bright glowing or inverted color halos (coronas) outlining moving edges, caused by excessive overdrive voltage boosting pixels past their target luminance.",
                        "4. Eye Tracking Persistence (Sample-and-Hold / MPRT): Full-scene uniform motion softness caused by the human eye smoothly tracking moving imagery while each frame is held statically on screen. This affects all sample-and-hold displays (including OLED displays with near-instantaneous pixel transitions) and is mitigated primarily by higher refresh rates or backlight strobing.",
                        "5. Low Frame Rate & Frame Pacing Issues: Discrete positional stutter, hitching, or judder caused by irregular GPU frame delivery or V-Sync mismatch, entirely independent of display panel pixel response."
                ],
                "bullets": [
                        "Dark-Level Smearing: Sluggish near-black crystal transitions; visible as dark trailing against dark backgrounds.",
                        "Conventional Ghosting: Faint color-matched silhouettes; caused by slow overall liquid crystal GtG response.",
                        "Inverse Ghosting (Overshoot): Bright glowing or inverted halos; caused by excessive monitor overdrive voltage.",
                        "Retinal Persistence (MPRT): Uniform motion softness on sample-and-hold screens; reduced by higher refresh rates, not liquid crystal overdrive.",
                        "Frame Pacing / Stutter: Jerky positional jumps; caused by GPU frame delivery or refresh synchronization, not panel physics."
                ]
        },
        {
                "title": "VRR & Refresh-Rate Overdrive Interactions",
                "content": [
                        "A monitor's overdrive calibration is optimized for a specific frame duration. At 165Hz, each frame lasts approximately 6.06ms, requiring an aggressive voltage pulse to complete transitions quickly. At 60Hz, however, the frame duration expands to 16.67ms, giving liquid crystals nearly three times as long to transition naturally.",
                        "Monitors with premium scalers implement 'variable overdrive', which dynamically attenuates the overdrive voltage as refresh rate decreases during Variable Refresh Rate (VRR, G-Sync, FreeSync) operation. This maintains crisp transitions at 165Hz while avoiding overshoot when framerates fluctuate.",
                        "Conversely, many budget or mainstream monitors utilize fixed overdrive tables. An overdrive setting that delivers clean motion at 165Hz can generate aggressive overshoot coronas when demanding gameplay causes the frame rate to drop into the 60–80Hz range. Browser tools cannot certify internal scaler voltage curves, but users can visually evaluate refresh-rate-dependent behavior using the [VRR Test](/tests/vrr-test) and [Ghosting Test](/tests/ghosting-test)."
                ],
                "bullets": [
                        "Frame duration increases dramatically as refresh rates drop (e.g., 6.06ms at 165Hz versus 16.67ms at 60Hz).",
                        "Displays lacking dynamic variable overdrive can exhibit severe overshoot coronas during lower-framerate VRR gameplay.",
                        "Monitors with variable overdrive dynamically scale voltage pulses across the refresh spectrum to maintain balanced motion.",
                        "Test both at maximum refresh rate and at lower rates (e.g., 60Hz–80Hz) to choose an overdrive setting that remains stable during frame dips."
                ]
        },
        {
                "title": "Temperature, Operating Conditions & Panel Variations",
                "content": [
                        "Liquid crystals are suspended in a fluid matrix whose physical viscosity changes with ambient operating temperature. When a monitor is first turned on in a cold room, the fluid is denser, temporarily slowing down molecular rotation.",
                        "Users may observe pronounced dark smearing or trailing upon a cold boot that gradually diminishes as internal backlight warmth raises the panel to normal operating temperature. Pixel-transition behavior can vary with operating conditions including temperature; do not prescribe a universal warm-up duration. For accurate evaluation, test motion performance after the display has reached thermal equilibrium.",
                        "Furthermore, two monitors utilizing the identical panel family can exhibit noticeably different motion characteristics. Differences in scaler hardware, firmware algorithms, factory overdrive look-up tables (LUTs), and manufacturing tolerances mean that motion clarity cannot be judged solely by panel type or datasheet specifications."
                ],
                "bullets": [
                        "Cold ambient temperatures increase liquid crystal fluid viscosity, temporarily slowing transitions until the display warms up.",
                        "Evaluate motion clarity after the display has reached stable operating temperature in your ambient environment; do not assume a fixed warm-up duration.",
                        "Identical panel families behave differently across monitor models due to proprietary scaler firmware and overdrive tuning.",
                        "Avoid categorizing temporary cold-start trailing as a permanent hardware defect."
                ]
        },
        {
                "title": "Practical OSD Investigation Routine",
                "content": [
                        "To determine the optimal overdrive setting for your monitor without laboratory equipment, conduct a disciplined visual investigation in Screen Tester:",
                        "1. Configure a neutral picture profile (e.g., Standard or Custom) in your monitor's OSD and ensure your target refresh rate is active in your operating system display settings.",
                        "2. Launch the [Ghosting Test](/tests/ghosting-test) in Screen Tester and observe moving blocks across both dark-gray and medium-contrast backgrounds.",
                        "3. Open your monitor's OSD, locate Overdrive / Response Time (see our [Monitor OSD Settings Guide](/guides/monitor-osd-settings-explained)), and cycle systematically from Off to Normal, Fast, and Extreme.",
                        "4. Identify the transition boundary: note the setting where trailing trails recede before glowing overshoot halos (coronas) become prominent.",
                        "5. Repeat the test at lower refresh rates if you use G-Sync or FreeSync, ensuring that overshoot does not become distracting during lower-framerate VRR gaming.",
                        "Do not prescribe a universal setting such as 'Always use High'. The ideal overdrive level is monitor-specific and represents a balanced trade-off between trailing and overshoot."
                ],
                "bullets": [
                        "Step 1: Set a neutral picture preset and confirm native refresh rate in operating system settings.",
                        "Step 2: Run the [Ghosting Test](/tests/ghosting-test) to observe block trailing across dark and light backgrounds.",
                        "Step 3: Toggle OSD Overdrive settings from Off through Normal, Fast, and Extreme.",
                        "Step 4: Select the highest setting that suppresses trailing without creating visible bright or dark coronas.",
                        "Step 5: Verify stability across both high and lower refresh rates for VRR workloads."
                ]
        },
        {
                "title": "Visual Interpretation Guide: What Your Eyes Are Seeing",
                "content": [
                        "When visually assessing moving test patterns, use this reference guide to correlate observed symptoms with their underlying physical mechanisms:",
                        "Visible Dark Trail Behind Dark Objects: May indicate slower dark-level transition behavior (characteristic of near-black transitions on VA panels). Test one level higher overdrive if halos do not appear, and ensure the display has reached normal operating temperature.",
                        "Bright or Dark Corona Around Moving Objects: May indicate overdrive overshoot (inverse ghosting) from excessive voltage acceleration. Reduce your monitor's OSD overdrive by one level.",
                        "General Softness Across the Entire Scene: Involves human retinal persistence across sample-and-hold display frames (MPRT) rather than pixel transition speed alone. Increase display refresh rate or evaluate backlight strobing if supported.",
                        "Inconsistent Behavior at Different Refresh Rates: May indicate refresh-rate-dependent overdrive tuning (lack of dynamic variable overdrive during VRR). Select a balanced setting that remains stable at lower frame rates.",
                        "Stuttering or Discrete Judder During Motion: Investigate frame delivery, GPU frame pacing, V-Sync configuration, or browser rendering performance rather than assuming physical pixel response is the cause. Consult the [Troubleshooting Guide](/knowledge-base/troubleshooting) for step-by-step diagnostic checks."
                ],
                "bullets": [
                        "Dark trailing → Slower dark-level transitions; test moderate overdrive boost and verify room temperature.",
                        "Glowing bright/dark halos → Overdrive overshoot; decrease OSD overdrive preset by one step.",
                        "Full-scene softness → Sample-and-hold retinal persistence (MPRT); increase refresh rate or test strobing.",
                        "Overshoot only at lower FPS → Fixed overdrive table in VRR; pick a setting tuned for lower refresh stability.",
                        "Jerky stuttering → Frame pacing or pipeline sync issue; consult the [Troubleshooting Guide](/knowledge-base/troubleshooting)."
                ]
        }
],
    faq: [
        {
                "question": "Why do VA monitors show more dark-level smearing than IPS or TN monitors?",
                "answer": "VA (Vertical Alignment) pixels orient crystals vertically at rest to block backlight effectively, creating high static contrast. However, transitions between near-black shades involve small voltage steps, making crystal reorientation slower than larger transitions. The exact severity depends on panel generation, monitor firmware, overdrive tuning, and temperature."
        },
        {
                "question": "What causes bright or dark 'coronas' (overshoot / inverse ghosting)?",
                "answer": "Overshoot occurs when a monitor applies an overly aggressive overdrive voltage spike to accelerate liquid crystal transitions. Instead of smoothly stopping at the target shade, the crystals surge past the target luminance, creating glowing bright or dark inverted halos around moving objects."
        },
        {
                "question": "Should I always set my monitor's overdrive to the maximum setting?",
                "answer": "No. Setting overdrive to maximum or 'Extreme' almost universally introduces severe response-time overshoot (inverse ghosting). The best overdrive setting is monitor-dependent and represents a deliberate balance between reducing conventional trailing and avoiding distracting overshoot coronas."
        },
        {
                "question": "Why do glowing coronas appear when my frame rate drops during VRR gaming?",
                "answer": "At lower refresh rates (e.g., 60Hz), each frame is displayed for a longer duration (16.7ms vs. 6ms at 165Hz). If the monitor lacks dynamic variable overdrive, the fixed high-voltage pulse designed for 165Hz causes severe overshoot during longer 60Hz frame intervals."
        },
        {
                "question": "Can cold ambient room temperatures make ghosting worse?",
                "answer": "Yes. Liquid crystal molecules operate in a fluid whose viscosity increases at lower temperatures. When first powered on in a cold room, pixel transitions can be noticeably slower until internal backlight warmth raises the panel to normal operating temperature."
        },
        {
                "question": "Can Screen Tester measure my monitor's exact response time in milliseconds?",
                "answer": "No. Web browsers cannot interface with hardware photodiodes or oscilloscopes. Screen Tester enables visual observation of motion trailing and overshoot, but certified millisecond response-time measurements require specialized physical laboratory equipment."
        }
],
    relatedTestIds: ["ghosting-test", "motion-blur-test", "vrr-test", "refresh-rate-test"],
    relatedTroubleshootingIds: ["wrong-refresh-rate", "flickering"],
    relatedArticleSlugs: ["refresh-rate-and-frame-rates", "screen-tearing-and-v-sync"],
    primarySearchIntent: "monitor ghosting test overdrive overshoot va smearing",
    readingTimeMinutes: 8
  },
  {
    slug: "screen-tearing-and-v-sync",
    category: "display-problems",
    title: "Screen Tearing & V-Sync Technologies",
    subtitle: "Buffer swaps, horizontal tear lines, input latency trade-offs, and adaptive sync.",
    description: "Learn what causes horizontal screen tearing, how V-Sync prevents tearlines at the cost of input lag, and how G-Sync and FreeSync eliminate both.",
    directAnswer: "Screen tearing is a visual distortion where a display shows information from multiple frames in a single screen refresh, appearing as a horizontal seam or 'tear' across the image.",
    whyItMatters: "Screen tearing ruins visual immersion in fast-paced motion and games. While traditional V-Sync eliminates tearing, it introduces noticeable mouse latency and stutter when frame rates dip below your monitor refresh rate.",
    whatToLookFor: [
      "Horizontal split lines where the top half of the screen does not align with the bottom half during camera pans",
      "Multiple horizontal tear seams cascading down the display during rapid motion",
      "Stutter and mouse latency spikes when frame rate fluctuates below native refresh rate",
      "Pacing judder when watching 24 FPS video on a 60Hz display (3:2 pulldown judder)"
    ],
    howToTest: [
      "Run the Screen Tearing Test in Screen Tester to watch high-speed vertical bars sweep across the display",
      "Run the VRR Visual Inspection test under dynamic workloads to observe frame pacing stability",
      "Verify whether horizontal tearlines appear when sweeping test objects at maximum browser framerates"
    ],
    whatScreenTesterCanObserve: [
      "High-velocity vertical bar animation loops timed against the browser compositor",
      "Animation frame delivery intervals via `requestAnimationFrame`",
      "Visual tearing seams visible to user inspection across full-screen canvas viewports"
    ],
    whatScreenTesterCannotDetermine: [
      "GPU driver frame buffer swapchain latency in milliseconds",
      "Hardware VESA Adaptive-Sync or NVIDIA G-Sync chip hardware handshake packets",
      "Direct mouse-to-display end-to-end system input latency"
    ],
    commonCauses: [
      "V-Sync disabled while running games at frame rates that do not match the monitor refresh rate",
      "Variable Refresh Rate (G-Sync / FreeSync) not enabled in both GPU drivers and monitor OSD",
      "Game frame rate exceeding the maximum VRR range of the monitor (e.g., rendering 180 FPS on a 144Hz screen)",
      "Windowed mode desktop composition conflicts between multiple monitors with mismatched refresh rates"
    ],
    whatToDoNext: [
      "Enable G-Sync or FreeSync in your GPU control panel and monitor OSD",
      "When using VRR, enable V-Sync in the GPU driver control panel and cap your frame rate 3 FPS below your max Hz (e.g., cap at 141 FPS on a 144Hz monitor) to stay within the VRR window",
      "If you do not have a VRR monitor, use FastSync (NVIDIA) or Enhanced Sync (AMD) to reduce tearing with minimal latency"
    ],
    sections: [
      {
        title: "Why Screen Tearing Happens",
        content: [
          "Monitors draw images line-by-line from top to bottom at a fixed refresh rate (e.g., 60 or 144 times per second).",
          "Your graphics card renders frames to an internal buffer. Without synchronization, the GPU copies a newly finished frame into the display memory mid-scanout. The monitor draws the top half from the old frame and the bottom half from the new frame, creating a visible horizontal split."
        ]
      }
    ],
    faq: [
      {
        question: "Does V-Sync add input lag?",
        answer: "Yes. Traditional double-buffered V-Sync forces the GPU to wait until the monitor finishes its refresh cycle before rendering the next frame. This backpressure can add 16 to 50 milliseconds of input latency."
      },
      {
        question: "Why should I cap my FPS 3 below my refresh rate with G-Sync?",
        answer: "If your FPS reaches or exceeds your monitor's maximum refresh rate (e.g., 144 FPS on 144Hz), G-Sync disengages and reverts to standard V-Sync (adding lag) or no sync (causing tearing). A 3 FPS limiter keeps you permanently inside the tear-free G-Sync window."
      }
    ],
    relatedTestIds: ["screen-tearing-test", "vrr-test", "refresh-rate-test"],
    relatedTroubleshootingIds: ["screen-tearing", "wrong-refresh-rate"],
    relatedArticleSlugs: ["refresh-rate-and-frame-rates", "monitor-ghosting-and-motion-blur"],
    primarySearchIntent: "screen tearing test vsync gsync explanation",
    readingTimeMinutes: 5
  },
  {
    slug: "text-clarity-and-subpixel-rendering",
    category: "display-problems",
    title: "Text Clarity, Subpixel Layout & Font Rendering",
    subtitle: "Standard RGB, BGR, triangular QD-OLED subpixels, ClearType, and color fringing.",
    description: "Learn why text can appear blurry or show colored fringing, how subpixel geometry (RGB vs BGR vs QD-OLED) affects font rendering, and how to optimize text sharpness.",
    directAnswer: "Text clarity describes the sharpness and legibility of typography on screen, which depends heavily on pixel density (PPI), operating system font antialiasing, and the physical arrangement of subpixels inside each pixel.",
    whyItMatters: "Displays with non-standard subpixel layouts (like BGR panels, WOLED, or triangular QD-OLED arrays) cause colored red, green, or blue fringes along letter edges because standard font engines (like Windows ClearType) assume standard RGB stripe geometry.",
    whatToLookFor: [
      "Colored red, yellow, or blue fringes on vertical stems of black text against white backgrounds",
      "Soft, blurry, or washed-out typography across word processors and code editors",
      "Uneven horizontal stroke weights where some letter stems appear thicker than others",
      "Eyestrain or fatigue after reading documents for extended periods"
    ],
    howToTest: [
      "Run the Text Clarity Test in Screen Tester to inspect font rendering across sizes from 8px to 32px",
      "Evaluate positive polarity (dark text on white) and negative polarity (light text on dark)",
      "Inspect high-frequency 1-pixel line gratings to observe subpixel anti-aliasing color halos"
    ],
    whatScreenTesterCanObserve: [
      "Rendering of system typography across diverse font sizes, weights, and high-contrast pairings",
      "Single-pixel vertical and horizontal line grid sharpness",
      "User visual observation of subpixel fringing halos on letter boundaries"
    ],
    whatScreenTesterCannotDetermine: [
      "Physical microscopic subpixel layout geometry (standard RGB stripe vs. BGR vs. PenTile vs. QD-OLED)",
      "Operating system registry ClearType configuration parameters",
      "Physical panel anti-glare matte coating grain / sparkle dispersion"
    ],
    commonCauses: [
      "Display uses a BGR (Blue-Green-Red) subpixel layout instead of standard RGB stripe",
      "OLED or QD-OLED display with non-standard subpixel arrangements (e.g., triangular subpixel arrays)",
      "Windows ClearType antialiasing disabled or calibrated for the wrong subpixel orientation",
      "Display running at low pixel density (under 90 PPI) where individual subpixels are physically large"
    ],
    whatToDoNext: [
      "If using a BGR monitor, run the Windows ClearType Text Tuner (search 'ClearType' in Windows Start) and select the options that look sharpest",
      "Alternatively, use utility tools like BetterClearTypeTuner or MacType to configure BGR antialiasing",
      "Increase font size or set OS scaling to a higher density level (e.g., 125% or 150%)"
    ],
    sections: [
      {
        title: "How Subpixel Antialiasing Works",
        content: [
          "Standard LCD pixels consist of three vertical stripes: Red, Green, and Blue, from left to right. Because subpixels are 1/3 the width of a full pixel, text rendering engines (like ClearType) illuminate individual subpixels to triple effective horizontal text resolution.",
          "If your monitor has BGR subpixels (Blue on left, Red on right), ClearType illuminates the wrong side of the physical pixel, turning what should be subtle antialiasing into bright colored fringes."
        ]
      }
    ],
    faq: [
      {
        question: "Why does text on my QD-OLED or WOLED gaming monitor look slightly blurry?",
        answer: "First- and second-generation OLED monitors do not use standard rectangular RGB stripes. QD-OLED uses a triangular layout, while WOLED includes an extra white subpixel (WRGB). Font smoothing engines designed for rectangular RGB stripes cause colored halos on high-contrast text edges."
      },
      {
        question: "Does higher PPI solve subpixel text fringing?",
        answer: "Yes. On high-density screens (like 4K at 27\" or 32\", ~140–163 PPI), individual subpixels are so microscopic that colored fringing drops below the threshold of human visual acuity at normal viewing distances."
      }
    ],
    relatedTestIds: ["text-clarity-test", "sharpness-test", "resolution-checker"],
    relatedTroubleshootingIds: ["blurry-text", "wrong-resolution"],
    relatedArticleSlugs: ["resolution-and-scaling", "tv-overscan-and-pixel-mapping"],
    primarySearchIntent: "text clarity test subpixel fringing bgr",
    readingTimeMinutes: 6
  },
  {
    slug: "oled-burn-in-and-image-retention",
    category: "display-problems",
    title: "OLED ABL, Pixel Shifting & Image Retention",
    subtitle: "Automatic Brightness Limiting, window-size luminance variations, pixel orbiting, and static-content protection.",
    description: "Learn how OLED Automatic Brightness Limiting (ABL) operates across different window sizes, why pixel shifting occurs, and how to safely inspect display behavior.",
    directAnswer: "OLED Automatic Brightness Limiting (ABL) is an internal display protection mechanism that regulates overall panel luminance based on the average picture level (APL) to manage power and thermal loads, while pixel shifting (orbiting) periodically shifts static imagery by small increments to distribute subpixel luminance across neighboring emitters.",
    whyItMatters: "Because OLED pixels are self-emissive organic diodes, managing cumulative thermal and electrical stress is essential for panel longevity. Users unfamiliar with ABL often mistake normal window-size dimming for a hardware defect or failing power supply, while intentional pixel-shift movements can be misdiagnosed as display jitter. Understanding these mechanisms helps users optimize their OSD settings, choose appropriate HDR modes, and distinguish normal protection cycles from actual hardware defects.",
    whatToLookFor: [
      "Noticeable dimming when expanding a bright document or browser window from a compact box to fullscreen (standard Automatic Brightness Limiting)",
      "Bright, punchy highlights in small specular areas (like torches or neon signs) that appear significantly more vivid than large white expanses",
      "Subtle, periodic movement of the entire active desktop image by a few pixels, occasionally revealing a narrow inactive border on one edge (pixel shifting / orbiting)",
      "Gradual, progressive dimming of the display when static desktop elements, taskbars, or paused videos remain stationary for minutes (static-content dimming / ASBL)",
      "Faint ghost outlines of static UI icons or HUD elements that slowly clear after switching to dynamic full-screen media (temporary image retention)",
      "Permanent dark silhouettes or color shifts that persist across all solid-color and uniform gray test slides despite running panel refresh cycles (differential subpixel wear)"
    ],
    howToTest: [
      "Open the [Brightness Test](/tests/brightness-test) in Screen Tester and observe test patches while resizing the active browser window from compact to fullscreen.",
      "Launch the [HDR Test](/tests/hdr-test) to visually observe how your display handles small highlight patterns versus broad high-APL test scenes in HDR.",
      "Run the [Uniformity Test](/tests/uniformity-test) across 5%, 20%, 50%, and 100% full-screen grayscale slides to inspect for retention silhouettes or dirty screen effect (DSE).",
      "Evaluate low-end shadow detail with the [Near-Black Test](/tests/near-black-test) to verify that dark steps (shades 1\u201316) remain discernible without black crushing.",
      "Inspect smooth tone transitions and bit-depth performance using the [Gradient Banding Test](/tests/gradient-banding-test).",
      "Examine text edge clarity across light and dark modes with the [Text Clarity Test](/tests/text-clarity-test) to observe subpixel rendering behavior.",
      "Check your browser's reported display color depth and HDR capabilities using [Display Information](/tests/display-info).",
      "Consult our [Monitor OSD Settings Guide](/guides/monitor-osd-settings-explained) to explore whether your monitor provides a 'Uniform Brightness' or 'Constant Brightness' mode."
    ],
    whatScreenTesterCanObserve: [
      "Visual observation of perceived brightness variations as bright test areas expand across the screen",
      "Comparative inspection of solid full-screen 5%, 20%, 50%, and 100% grayscale fields for retention shadows",
      "Rendering of low-luminance near-black step gradients (shades 1 to 16) to verify shadow visibility",
      "Browser-reported color gamut, color depth, and HDR media query support via web APIs",
      "Visual checks of subpixel text fringing across high-contrast typography patterns"
    ],
    whatScreenTesterCannotDetermine: [
      "Photodiode-calibrated absolute luminance measurements in candelas per square meter (cd/m\u00b2 or nits)",
      "Internal power supply wattage, electrical current draw, or panel controller thermal sensor telemetry",
      "Exact factory ABL trigger thresholds, look-up tables (LUTs), or firmware limiter curves",
      "Remaining organic emitter lifespan, wear-leveling percentage, or long-term burn-in probability",
      "Internal pixel-compensation cycle history, factory diagnostic counters, or exact pixel-shift coordinate offsets"
    ],
    commonCauses: [
      "High Average Picture Level (APL) content triggering Automatic Brightness Limiting to protect power delivery and thermal components",
      "Active 'Pixel Shift' / 'Pixel Orbiting' routines moving the picture geometry by small offsets to prevent edge burn-in",
      "Firmware Auto Static Brightness Limiter (ASBL / TPC) engaging during prolonged static desktop or document work",
      "Operating in an aggressive HDR peak picture preset rather than a clamped or uniform luminance mode",
      "Displaying stationary high-contrast UI elements (taskbars, browser headers, streaming tickers) continuously at high brightness",
      "Powering down the display via a switched wall outlet or power strip, preventing automatic standby pixel refresh cycles from completing"
    ],
    whatToDoNext: [
      "Check your monitor's OSD for a 'Uniform Brightness' or 'Constant Brightness' option if window-resizing brightness changes are distracting during productivity.",
      "Keep manufacturer protection features enabled, including Pixel Shift, Logo Brightness Limiter, and automatic standby maintenance cycles.",
      "Configure your operating system to auto-hide the taskbar and set a reasonable display sleep timer (such as an inactivity sleep timer).",
      "If faint ghost outlines appear after extended static work, run varied full-screen video content or allow the monitor to enter standby to run a pixel refresh cycle.",
      "If brightness swings feel jarring or erratic, consult our [Monitor OSD Settings Guide](/guides/monitor-osd-settings-explained) and [Troubleshooting Guide](/knowledge-base/troubleshooting)."
    ],
    sections: [
      {
        title: "Understanding OLED Automatic Brightness Limiting (ABL)",
        content: [
          "Organic Light-Emitting Diode (OLED) displays differ fundamentally from conventional liquid crystal displays because every individual subpixel generates its own light. In this self-emissive architecture, illuminating a few pixels requires minimal electrical power, but driving the entire display surface at maximum luminance simultaneously demands immense power draw and creates substantial thermal buildup within the thin organic layers.",
          "To operate safely within electrical and thermal envelopes, monitor and television manufacturers incorporate Automatic Brightness Limiting (ABL). ABL is an integrated hardware and firmware control loop that monitors the Average Picture Level (APL)\u2014the proportion of the screen that is illuminated and the intensity of those pixels\u2014and progressively reduces overall panel luminance as the illuminated area grows larger.",
          "Crucially, ABL behavior is not uniform across the display industry. The threshold at which limiting begins, the steepness of the attenuation curve, and the maximum full-screen luminance vary significantly by OLED panel family (such as WOLED, QD-OLED, or AMOLED), display generation, scaler firmware, thermal dissipation design, and configured picture preset. There is no universal ABL curve, and behavior must always be evaluated relative to manufacturer specifications."
        ],
        bullets: [
          "Self-emissive pixels require power and generate heat proportionally to the number of lit pixels and their target brightness.",
          "ABL continuously calculates Average Picture Level (APL) and dynamically throttles luminance to manage thermal and electrical loads.",
          "Limiting behavior varies across panel types (WOLED vs QD-OLED), heatsink designs, scaler firmware, and picture presets.",
          "ABL is an intentional hardware protective measure, not a backlight defect or power supply malfunction."
        ]
      },
      {
        title: "Why OLED Brightness Changes Across Content & Window Sizes",
        content: [
          "Users new to OLED displays frequently notice unexpected luminance fluctuations during ordinary computer tasks. When a bright white application window is small, the panel's overall APL remains low, allowing the display to drive those pixels with relatively high luminance without exceeding thermal thresholds. As the user drags the window border to expand it across the full screen, the APL surges, prompting ABL to gently lower the luminance across the entire visible surface.",
          "This dynamic behavior creates noticeable differences between content types. Small specular highlights\u2014such as glistening stars, streetlamps, or UI badges\u2014can appear brilliantly vibrant because their tiny surface area imposes negligible power demand. Conversely, full-screen white documents, web browsers, or snowy gaming landscapes represent the highest possible APL, resulting in the most pronounced brightness reduction.",
          "Furthermore, operating mode heavily dictates ABL aggression. In High Dynamic Range (HDR) modes, displays often allow elevated peak highlight brightness but enforce aggressive ABL dimming on large bright patches to protect the panel. In Standard Dynamic Range (SDR), many modern OLED monitors provide an optional 'Uniform Brightness' or 'Constant Brightness' setting that intentionally caps peak luminance at a lower, consistent ceiling across all window sizes, completely eliminating brightness shifting during desktop productivity."
        ],
        bullets: [
          "Small bright windows maintain higher luminance because low APL keeps total panel heat and power draw minimal.",
          "Expanding windows to full-screen triggers ABL throttling, visibly attenuating perceived luminance.",
          "HDR profiles prioritize dynamic punch on specular highlights with aggressive full-screen dimming.",
          "Many desktop OLED monitors offer an SDR 'Uniform Brightness' toggle to lock luminance and eliminate shifts."
        ]
      },
      {
        title: "How to Visually Observe ABL (Safe Procedure & Browser Boundaries)",
        content: [
          "You can safely observe your monitor's ABL behavior using ordinary web browser windows without specialized software. Set your desktop background to a dark or neutral gray tone, open a browser window displaying an empty white page or the [Brightness Test](/tests/brightness-test), and resize the window from a compact quarter-screen box to maximized full-screen. Watch whether the perceived luminance of the white field stays constant or smoothly attenuates as the surface area expands.",
          "Next, open the [HDR Test](/tests/hdr-test) to observe how high-contrast HDR test patches behave under varying APL loads, comparing small central test squares against broader illumination fields. Repeat these checks in both SDR and HDR modes, and with any 'Uniform Brightness' OSD setting toggled on and off.",
          "When conducting these visual observations, it is critical to understand the measurement capabilities of web software. Screen Tester can render calibrated geometric patterns and display user-facing visual comparisons. However, web browsers have no direct physical connection to laboratory photodiodes or colorimeters. Screen Tester classifications are based on user observation, browser-reported API capabilities, and manufacturer specifications\u2014never laboratory-certified nit measurements."
        ],
        bullets: [
          "Observation Step 1: Open the [Brightness Test](/tests/brightness-test) in a small window against a dark background.",
          "Observation Step 2: Resize the window toward fullscreen to visually identify when and how smoothly luminance attenuates.",
          "Observation Step 3: Test both SDR and HDR modes using the [HDR Test](/tests/hdr-test) to evaluate mode-specific curve differences.",
          "Measurement Reality: Web browsers cannot measure absolute luminance in nits, electrical wattage, or exact ABL thresholds."
        ]
      },
      {
        title: "Pixel Shifting & Pixel Orbiting: Intentional Geometry Movement",
        content: [
          "Pixel shifting (frequently branded as Pixel Orbiting, Screen Shift, or Image Shift) is a foundational preventive feature engineered into modern OLED monitors and televisions. The display scaler periodically shifts the entire rendered image by a small offset\u2014typically one or several pixels\u2014in horizontal and vertical directions over time.",
          "The engineering purpose of pixel shifting is to prevent high-contrast static boundaries\u2014such as the edge of an application window, a taskbar border, or a persistent video game HUD\u2014from continuously activating the exact same subpixels. By subtly cycling the image across neighboring organic diodes, the cumulative luminous workload is distributed over a broader cluster of emitters, significantly delaying localized differential wear.",
          "Because pixel shifting is designed to be imperceptible during active media viewing, the transition occurs gradually. However, observant PC users in desktop environments may notice that text appears to shift position slightly over several hours, or that a narrow inactive black border occasionally appears along one edge of the panel. This subtle movement is an intentional hardware protection mechanism and must not be misinterpreted as display jitter, loose video cables, or scaler instability."
        ],
        bullets: [
          "Pixel shifting periodically displaces the entire active picture by a few pixels in horizontal and vertical directions.",
          "Moving static edges across neighboring subpixels distributes luminous stress and prevents localized subpixel fatigue.",
          "Users may observe a tiny inactive black margin shifting along screen edges as orbiting cycles progress.",
          "Subtle positional shifts are an intentional protective feature, not hardware instability or signal jitter."
        ]
      },
      {
        title: "Static-Content Protection: Disentangling Four Distinct Mechanisms",
        content: [
          "To safeguard organic emitters, modern OLED displays implement multiple overlapping protective systems that users frequently conflate. Effective diagnosis requires distinguishing between four distinct mechanisms:",
          "1. Pixel Shifting / Orbiting: The continuous, gradual geometric displacement of the active screen image described above, operating while the display is in full use.",
          "2. Static-Content Dimming (ASBL / TPC / Logo Dimming): Firmware algorithms that continuously monitor the video feed for stationary content (such as television channel logos, static desktop taskbars, or paused videos). When static imagery is detected for several consecutive minutes, the firmware progressively dims the entire panel or the localized static zone to reduce thermal accumulation.",
          "3. Operating System Sleep & Screen Savers: Software-level power management initiated by Windows, macOS, or Linux after input inactivity (e.g., turning off video output or engaging a black screen saver), completely removing drive signal to the monitor.",
          "4. Panel Protection & Compensation Cycles: Internal maintenance routines run by the display's timing controller (T-Con). Short compensation cycles run automatically when the monitor enters standby after a few hours of cumulative use, measuring subpixel resistance and balancing drive voltages. Deeper refresh cycles run periodically after several hundred hours to rebalance overall panel uniformity.",
          "Manufacturers implement these mechanisms differently: televisions often enforce aggressive static dimming suited for cinema, whereas dedicated gaming monitors often provide OSD toggles to moderate dimming sensitivity for uninterrupted desktop productivity."
        ],
        bullets: [
          "Pixel Orbiting: Gentle geometric image displacement during active use to distribute static border wear.",
          "Static Dimming (ASBL/TPC): Automatic luminance throttling when stationary content or logos remain on screen.",
          "OS Power Management: System-level inactivity timers that sleep the display or engage blank screen savers.",
          "Standby Compensation Cycles: Essential automatic firmware routines that calibrate subpixel voltages in standby."
        ]
      },
      {
        title: "Temporary Image Retention vs. Permanent Burn-In",
        content: [
          "A vital distinction in OLED technology is the difference between temporary image retention and permanent burn-in. Image retention is a transient optical artifact caused by temporary electrical charge buildup in the thin-film transistor (TFT) backplane or organic emitter layers after displaying a high-contrast element for an extended period. When switching to a uniform gray background, a faint shadow of the previous image may linger temporarily, but it naturally dissipates as varied content is displayed or after a standard standby compensation cycle.",
          "Permanent burn-in (also known as differential subpixel aging), by contrast, represents cumulative, irreversible physical degradation of the organic electroluminescent compounds. If specific subpixels\u2014such as those displaying a bright red game health bar\u2014are driven intensely for thousands of cumulative hours while adjacent pixels display varied video, the heavily worn subpixels permanently lose luminous efficiency. On uniform color slides, these worn clusters emit less light, producing a permanent dark silhouette.",
          "Modern OLED panels incorporate advanced multilayer emitter materials, integrated graphene and aluminum heatsinks, real-time thermal monitoring, and intelligent wear-leveling that make permanent burn-in rare under typical mixed gaming, media, and general computer usage. Importantly, no browser-based test can inspect subpixel wear telemetry or predict future burn-in probability; Screen Tester provides visual inspection tools to help users observe their panel's current uniformity."
        ],
        bullets: [
          "Image Retention: Temporary charge stagnation in driver circuits; completely reversible with varied media or standby cycles.",
          "Permanent Burn-In: Irreversible differential degradation of organic subpixels after thousands of hours of static exposure.",
          "Modern Protection: Heatsinks, deuterium compounds, and wear-leveling algorithms have drastically reduced burn-in risks.",
          "Browser Testing Limits: Web software cannot inspect subpixel chemical degradation or predict panel lifespan."
        ]
      },
      {
        title: "Evaluating OLED Display Characteristics in Screen Tester",
        content: [
          "Screen Tester provides a suite of specialized browser tools designed to help you visually evaluate various aspects of OLED display performance. Understanding what each tool can and cannot establish ensures disciplined, realistic testing:",
          "[HDR Test](/tests/hdr-test): Visually verifies browser HDR metadata decoding, dynamic range presentation, and highlight clipping across calibrated test scenes. It cannot measure absolute peak nit values or certify calibrated EOTF tracking.",
          "[Uniformity Test](/tests/uniformity-test): Renders full-screen solid 5%, 20%, 50%, and 100% grayscale and primary color slides, ideal for visually identifying retention shadows, dirty screen effect (DSE), or spatial tinting. It cannot generate laboratory colorimetric delta-E uniformity maps.",
          "[Near-Black Test](/tests/near-black-test): Steps through low-luminance grayscale levels (shades 1 through 16 above zero black) to help verify shadow detail and check for near-black crushing or chrominance overshoot. It cannot measure physical subpixel black-floor voltage.",
          "[Gradient Banding Test](/tests/gradient-banding-test): Visually checks for smooth, contour-free transitions across 8-bit and 10-bit color gradients to identify dithering or posterization artifacts. It cannot inspect internal scaler bit-depth pipeline processing.",
          "[Brightness Test](/tests/brightness-test): Allows visual comparison of perceived brightness across different window dimensions, helping you observe how your display's ABL reacts to varying APL loads. It cannot measure physical candelas per square meter (cd/m\u00b2).",
          "[Text Clarity Test](/tests/text-clarity-test): Displays typography patterns on dark and light backgrounds to visually inspect subpixel color fringing caused by non-standard OLED subpixel arrangements (such as WOLED R-W-G-B or QD-OLED triangular layouts). It cannot modify operating system font rasterization engines.",
          "[Display Information](/tests/display-info): Queries browser APIs to report screen resolution, color depth, and media query capabilities. It cannot access proprietary internal panel controller firmware."
        ],
        bullets: [
          "[HDR Test](/tests/hdr-test): Inspects highlight tone mapping visually; cannot measure peak nits.",
          "[Uniformity Test](/tests/uniformity-test): Exposes retention shadows across 5%\u201350% gray fields; cannot calculate delta-E maps.",
          "[Near-Black Test](/tests/near-black-test): Evaluates shadow detail visibility; cannot measure subpixel black-floor voltage.",
          "[Gradient Banding Test](/tests/gradient-banding-test): Verifies smooth 10-bit color transitions; cannot inspect scaler bit depth.",
          "[Brightness Test](/tests/brightness-test): Shows relative ABL dimming across window sizes; cannot measure physical cd/m\u00b2.",
          "[Text Clarity Test](/tests/text-clarity-test): Observes subpixel font fringing; cannot alter OS font rendering engines.",
          "[Display Information](/tests/display-info): Queries browser display capabilities; cannot read internal T-Con telemetry."
        ]
      },
      {
        title: "Interpreting Your Observations: Normal vs. Attention Needed",
        content: [
          "When evaluating an OLED display, visual observations should be categorized using disciplined technical criteria rather than arbitrary health scores. Screen Tester structures evaluations into three practical categories:",
          "1. Looks Normal: Perceived brightness decreases smoothly when expanding a bright window to full-screen (standard ABL operation). The desktop image shifts subtly by several pixels over hours of use, occasionally revealing a tiny black margin along one bezel (standard pixel orbiting). Faint ghost outlines of static windows disappear after several minutes of dynamic video playback or an automatic standby compensation cycle (standard temporary image retention).",
          "2. Needs Attention: The display dims aggressively during normal productivity tasks with mixed content, making text uncomfortably dark to read (check for overly sensitive ASBL / TPC settings, ambient light sensor interference, or HDR desktop configuration mismatches). Permanent dark silhouettes, icons, or letterbox borders remain visible across all uniform grayscale and solid color slides even after multiple manual panel refresh cycles (differential subpixel aging / burn-in).",
          "3. Unsure: Sudden, erratic brightness fluctuations occur while gaming or watching video. These shifts may stem from in-game dynamic tone mapping, Windows Auto HDR, GPU driver settings, or the display's internal ABL. Because browser software cannot evaluate internal electrical limits or scaler compliance, consult your monitor's user manual and official firmware release notes to verify expected behavior."
        ],
        bullets: [
          "Looks Normal: Window-resizing ABL dimming, subtle pixel orbiting, and transient retention that clears with varied media.",
          "Needs Attention: Aggressive dimming during mixed desktop tasks or permanent silhouettes visible across all solid color slides.",
          "Unsure: Irregular brightness shifts during games; may involve GPU tone mapping, Windows Auto HDR, or display firmware.",
          "Diagnostic Boundary: Browser tools cannot determine whether ABL behavior complies with manufacturer electrical tolerances."
        ]
      },
      {
        title: "Practical OLED Inspection & Care Checklist",
        content: [
          "To maintain optimal performance and visually inspect your OLED panel over time, follow this disciplined 10-point inspection routine:",
          "1. SDR vs. HDR Mode Selection: Use SDR with a comfortable, moderate brightness level for standard productivity tasks; reserve HDR for HDR-mastered games and media to prevent unnecessary full-screen ABL throttling.",
          "2. Window-Size Luminance Check: Observe how your display handles expanding bright windows in the [Brightness Test](/tests/brightness-test) to understand its ABL threshold.",
          "3. Uniform Brightness Evaluation: If your monitor includes a 'Uniform Brightness' or 'Constant Brightness' OSD toggle, test whether enabling it delivers a more comfortable desktop experience.",
          "4. Pixel Shifting Verification: Confirm that 'Pixel Shift' or 'Screen Move' is enabled in your monitor's OSD maintenance menu.",
          "5. Static Logo Dimmer Configuration: Set the monitor's logo brightness limiter to low or medium to protect against broadcast and HUD elements without overly dimming games.",
          "6. Shadow Detail Verification: Run the [Near-Black Test](/tests/near-black-test) to confirm that low-end dark steps remain visible and are not crushed into total black.",
          "7. Full-Screen Uniformity Audit: Periodically inspect 5% gray and 50% gray fields in the [Uniformity Test](/tests/uniformity-test) in a darkened room to check for retention shadows.",
          "8. Color Gradient Inspection: Use the [Gradient Banding Test](/tests/gradient-banding-test) to confirm smooth color ramps without severe digital banding.",
          "9. Text Clarity Evaluation: Check font appearance in both dark and light modes with the [Text Clarity Test](/tests/text-clarity-test) to adapt OS font settings to your subpixel layout.",
          "10. Standby Power Discipline: Never cut mains power via a smart plug or power strip switch immediately after use. Allow the display to enter standby mode so it can complete its automatic pixel compensation cycle."
        ],
        bullets: [
          "Step 1: Choose SDR for desktop productivity and HDR for HDR-mastered media and gaming.",
          "Step 2: Inspect window-resizing ABL behavior in the [Brightness Test](/tests/brightness-test).",
          "Step 3: Test OSD 'Uniform Brightness' modes to eliminate desktop luminance fluctuations.",
          "Step 4: Ensure Pixel Shift and static logo protection routines remain enabled in the OSD.",
          "Step 5: Verify shadow detail and low-end visibility in the [Near-Black Test](/tests/near-black-test).",
          "Step 6: Audit full-screen grayscale uniformity in the [Uniformity Test](/tests/uniformity-test).",
          "Step 7: Confirm smooth color transitions in the [Gradient Banding Test](/tests/gradient-banding-test).",
          "Step 8: Check subpixel text fringing using the [Text Clarity Test](/tests/text-clarity-test).",
          "Step 9: Review display configuration and API capabilities with [Display Information](/tests/display-info).",
          "Step 10: Always leave the display connected to mains power in standby for automatic compensation cycles."
        ]
      },
      {
        title: "Troubleshooting & Recommended Next Steps",
        content: [
          "If your OLED display exhibits unexpected brightness changes or visual artifacts, use this structured troubleshooting workflow to identify the root cause:",
          "Sudden Dimming During Desktop Use: If the screen dims while reading long articles or editing documents, the display's Auto Static Brightness Limiter (ASBL) may have engaged. Wiggle your mouse or open a dynamic window to see if brightness recovers. Consult our [Monitor OSD Settings Guide](/guides/monitor-osd-settings-explained) to explore whether your display allows adjusting static dimming sensitivity.",
          "Distracting Brightness Fluctuations When Resizing Windows: Check your monitor's OSD for a 'Uniform Brightness' feature, or reduce overall SDR brightness so that full-screen APL remains below the ABL triggering threshold.",
          "Apparent Image Shifting or Uneven Borders: Verify that Pixel Shift is enabled in your OSD. A slight positional offset or a few dark pixels along one edge is evidence of healthy pixel orbiting, not a defective scaler.",
          "Persistent Ghost Outlines: If a faint UI silhouette does not clear after varied full-screen video playback, place the monitor into standby mode to let it execute an automatic pixel refresh cycle.",
          "For comprehensive guidance on resolving display connectivity, color mismatch, or power state concerns, consult the interactive [Troubleshooting Guide](/knowledge-base/troubleshooting)."
        ],
        bullets: [
          "Static dimming while reading text \u2192 ASBL engagement; move mouse or check OSD logo protection settings.",
          "Luminance jumping during window resizing \u2192 Normal ABL; test 'Uniform Brightness' OSD toggle.",
          "Image shifting position or edge borders \u2192 Normal Pixel Orbiting; hardware protection is functioning correctly.",
          "Faint lingering UI outlines \u2192 Run varied media or place monitor into standby for a compensation cycle.",
          "Comprehensive hardware and connection diagnostics \u2192 Consult the [Troubleshooting Guide](/knowledge-base/troubleshooting)."
        ]
      }
    ],
    faq: [
      {
        question: "Why does my OLED monitor get dimmer when I maximize a white browser window?",
        answer: "This is standard Automatic Brightness Limiting (ABL). When a bright window expands to cover the entire screen, the Average Picture Level (APL) surges. To prevent excessive electrical current draw and manage internal panel heat, the monitor's control loop throttles overall luminance."
      },
      {
        question: "Is it normal for my OLED desktop image to shift slightly to one side?",
        answer: "Yes. This is pixel shifting (pixel orbiting), an intentional hardware protection feature. The monitor periodically moves the active image by a small pixel offset to prevent static high-contrast edges from wearing down the exact same subpixels continuously."
      },
      {
        question: "How can I prevent my OLED monitor from constantly changing brightness while working?",
        answer: "Operate in SDR mode with a moderate brightness setting, or enable your monitor's 'Uniform Brightness' / 'Constant Brightness' OSD setting if available. This caps peak luminance to a level the panel can sustain across all window sizes without triggering ABL."
      },
      {
        question: "What is the difference between temporary image retention and permanent burn-in?",
        answer: "Image retention is temporary charge buildup in the driver circuits that dissipates with varied video playback or a standby compensation cycle. Burn-in is irreversible physical wear of organic subpixels resulting from thousands of hours of static high-luminance exposure."
      },
      {
        question: "Why should I never unplug my OLED monitor immediately after turning it off?",
        answer: "OLED monitors perform automatic pixel compensation cycles while in standby after several hours of cumulative use. These cycles measure subpixel resistance and calibrate drive voltages to maintain uniformity. Cutting power at the wall interrupts these critical maintenance routines."
      },
      {
        question: "Can Screen Tester measure my OLED monitor's exact peak nits or burn-in lifespan?",
        answer: "No. Web browsers cannot interface with laboratory colorimeters, photodiodes, or internal panel wear-leveling telemetry. Screen Tester provides visual inspection test patterns, but certified luminance and hardware diagnostics require physical laboratory equipment."
      }
    ],
    relatedTestIds: ["burn-in-test", "brightness-test", "hdr-test", "uniformity-test", "near-black-test"],
    relatedTroubleshootingIds: ["uneven-brightness", "hdr-not-working"],
    relatedArticleSlugs: ["display-uniformity", "black-levels-and-shadow-detail", "hdr-display-fundamentals"],
    primarySearchIntent: "oled abl pixel shifting burn in image retention test",
    readingTimeMinutes: 10
  },

  // =========================================================================
  // CATEGORY 3: TV & DISPLAY SETUP (2 Articles)
  // =========================================================================
  {
    slug: "tv-overscan-and-pixel-mapping",
    category: "tv-and-display-setup",
    title: "TV Overscan & 1:1 Pixel Mapping",
    subtitle: "Edge cropping, HDMI scaling, Just Scan settings, and desktop sharpness degradation.",
    description: "Learn what causes television overscan, why it cuts off desktop edges and blurs computer text, and how to configure 1:1 pixel mapping over HDMI.",
    directAnswer: "Overscan is a legacy television processing behavior that crops 2% to 5% off the outer edges of an incoming video signal and scales the remaining picture up, cutting off taskbars and blurring desktop pixels.",
    whyItMatters: "Connecting a PC, laptop, or gaming console to a television with overscan enabled ruins text sharpness and UI usability because single digital pixels are stretched across multiple physical display pixels instead of mapping 1:1.",
    whatToLookFor: [
      "The Windows taskbar, start button, or window close buttons cut off by the television frame",
      "Blurry, smudged desktop fonts that look far softer than on a standard computer monitor",
      "A fuzzy halo or ringing artifacts along the edges of high-contrast text and icons",
      "Outer 1-pixel border test lines completely invisible when viewing in fullscreen"
    ],
    howToTest: [
      "Open the TV Overscan & 1:1 Pixel Mapping Test in Screen Tester and toggle Fullscreen mode (press F11)",
      "Check if all four colored 1px, 2px, and 5px outer border lines are fully visible around the top, bottom, left, and right edges",
      "Inspect the central and corner checkerboard patches for moiré shimmering or distortion"
    ],
    whatScreenTesterCanObserve: [
      "Fullscreen calibrated 1-pixel outer border boundaries and corner registration arrows",
      "High-frequency 1:1 alternating black and white checkerboard test patches",
      "User visual verification of edge cut-off under unscaled browser canvas presentation"
    ],
    whatScreenTesterCannotDetermine: [
      "Television internal EDID profile negotiation or manufacturer picture preset mode names",
      "HDMI port hardware input labeling (e.g., whether the port is labeled 'PC' or 'Game')",
      "Internal scaler spatial filtering algorithms inside the television SoC"
    ],
    commonCauses: [
      "Television picture aspect ratio set to '16:9' or 'Standard' instead of 'Just Scan', 'Screen Fit', or '1:1'",
      "HDMI input port on the television not renamed or designated as 'PC' in television input settings",
      "GPU driver control panel (NVIDIA/AMD/Intel) has 'Desktop Resizing' or underscan scaling enabled",
      "AV receiver or HDMI switch applying secondary video processing to the pass-through signal"
    ],
    whatToDoNext: [
      "On your TV remote, open Picture / Screen Settings, find Aspect Ratio, and change it to 'Just Scan', 'Screen Fit', 'Dot by Dot', or 'Original'",
      "In the TV input source list, edit the HDMI icon and name to 'PC' (this automatically disables overscan and post-processing on LG, Samsung, and Sony TVs)",
      "Open your GPU control panel and reset desktop size / scaling adjustments to 100% with no underscan"
    ],
    sections: [
      {
        title: "The Historical Origin of Overscan",
        content: [
          "In the cathode-ray tube (CRT) era, analogue broadcast video signals contained electrical timing noise, blanking intervals, and broadcast data (like closed captions) along the extreme outer edges of the frame.",
          "Television manufacturers engineered CRT electron beams to intentionally scan 5% beyond the visible tube bezel (overscan) to hide this ugly edge noise from viewers.",
          "When digital flat panels arrived, manufacturers kept overscan enabled by default on TV HDMI inputs to maintain backwards compatibility with analogue cable broadcasts, creating a headache for modern digital PC inputs."
        ]
      }
    ],
    faq: [
      {
        question: "Why does my PC desktop look blurry when connected to a 4K TV?",
        answer: "If overscan is active, the TV crops the outer edge of your 3840 × 2160 signal and scales the remaining ~3650 × 2050 image up to fill the glass, forcing bilinear interpolation across every single pixel. Enabling 1:1 pixel mapping restores crisp, sharp text."
      },
      {
        question: "What is the overscan setting called on different TV brands?",
        answer: "LG calls it 'Just Scan: On'. Samsung calls it 'Picture Size: Screen Fit'. Sony calls it 'Wide Mode: Full' with 'Display Area: Full Pixel'. Panasonic calls it '1:1 Pixel Mapping' or 'HD Size: 2'."
      }
    ],
    relatedTestIds: ["tv-overscan-test", "scaling-aspect-test", "resolution-checker"],
    relatedTroubleshootingIds: ["tv-overscan-fit", "wrong-resolution"],
    relatedArticleSlugs: ["resolution-and-scaling", "aspect-ratio-and-scaling-artifacts"],
    primarySearchIntent: "tv overscan test 1 to 1 pixel mapping fix",
    readingTimeMinutes: 5
  },
  {
    slug: "aspect-ratio-and-scaling-artifacts",
    category: "tv-and-display-setup",
    title: "Aspect Ratio, Letterboxing & Non-Native Scaling Artifacts",
    subtitle: "16:9, 16:10, 21:9 ultrawide, geometric distortion, and GPU vs. display scaling.",
    description: "Learn how display aspect ratios work, why non-native resolutions look blurry, how to avoid geometric stretching, and when to use GPU vs display scaling.",
    directAnswer: "Aspect ratio is the proportional relationship between a display's width and height (such as 16:9, 16:10, or 21:9), while non-native scaling occurs when an incoming image resolution does not match the physical pixel grid of the panel.",
    whyItMatters: "Sending an image with the wrong aspect ratio causes circular elements to stretch into ovals and makes human faces look unnaturally wide. Scaling non-native resolutions without integer scaling introduces fuzzy interpolation blur.",
    whatToLookFor: [
      "Geometric distortion: Circles appearing as squashed or stretched ovals",
      "Stretching: 4:3 retro games or 16:9 console video stretched unnaturally across a 21:9 ultrawide monitor",
      "Letterboxing (black bars on top and bottom) or pillarboxing (black bars on left and right sides)",
      "Moiré interference patterns across fine text, hatch patterns, or checkerboards"
    ],
    howToTest: [
      "Run the Scaling & Aspect Ratio test in Screen Tester to inspect concentric geometric circles and calibrated square grids",
      "Verify that circles appear perfectly round with a physical ruler or visual calibration across all axes",
      "Switch between 16:9, 16:10, 4:3, and 21:9 framing overlays to test how your monitor handles varied input ratios"
    ],
    whatScreenTesterCanObserve: [
      "Rendering of precision concentric geometric circles and square aspect grids",
      "Reference framing boundaries for standard display aspect ratios",
      "Browser viewport aspect ratio calculations (`window.innerWidth / window.innerHeight`)"
    ],
    whatScreenTesterCannotDetermine: [
      "Monitor chassis internal scaler chip interpolation algorithms (bicubic vs. bilinear vs. nearest neighbor)",
      "Hardware GPU scaling pipeline latency overhead in microseconds",
      "Physical panel curvature geometry distortion on curved ultrawide displays"
    ],
    commonCauses: [
      "Monitor OSD aspect ratio setting forced to 'Wide / Full' instead of 'Auto' or 'Aspect'",
      "GPU control panel scaling mode configured to 'Stretch' instead of 'Perform scaling on: GPU - Aspect Ratio'",
      "Playing a console (like PS5 or Nintendo Switch) locked to 16:9 output on a 21:9 ultrawide or 16:10 laptop screen",
      "Operating system display resolution set to an incompatible aspect ratio (e.g., 1920 × 1080 selected on a 1920 × 1200 panel)"
    ],
    whatToDoNext: [
      "Open your monitor OSD and set Aspect Ratio to 'Aspect' or 'Original' so black bars preserve true geometry",
      "In NVIDIA Control Panel or AMD Software, set scaling to 'Aspect ratio' or 'No scaling'",
      "Ensure games and desktop applications are configured to your display's native aspect ratio in graphics settings"
    ],
    sections: [
      {
        title: "Common Aspect Ratios Explained",
        content: [
          "16:9 (1.78:1): The ubiquitous consumer standard for televisions, YouTube video, and modern gaming (1920×1080, 2560×1440, 3840×2160).",
          "16:10 (1.60:1): Common in modern productivity laptops (MacBook, Dell XPS) and office monitors, providing extra vertical height for documents and code (1920×1200, 2560×1600).",
          "21:9 (2.39:1): Ultrawide format matching anamorphic cinema film, offering expansive peripheral vision for gaming and multitasking (2560×1080, 3440×1440, 5120×2160)."
        ]
      }
    ],
    faq: [
      {
        question: "Should I perform scaling on the GPU or on the Display?",
        answer: "In general, GPU scaling is preferred because modern graphics cards have powerful hardware scalers that support integer scaling and preserve aspect ratios reliably across multiple monitors."
      },
      {
        question: "Will black bars (letterboxing) damage my OLED screen?",
        answer: "Black bars turn off OLED pixels completely (0 nits), so they do not cause wear. However, over thousands of hours, the active center image will age slightly faster than the black bar areas, potentially leaving a subtle boundary line. Avoid permanently running 16:9 content on a 21:9 OLED without varied full-screen use."
      }
    ],
    relatedTestIds: ["scaling-aspect-test", "tv-overscan-test", "resolution-checker"],
    relatedTroubleshootingIds: ["tv-overscan-fit", "wrong-resolution"],
    relatedArticleSlugs: ["resolution-and-scaling", "tv-overscan-and-pixel-mapping"],
    primarySearchIntent: "aspect ratio scaling test letterbox stretch check",
    readingTimeMinutes: 5
  },

  // =========================================================================
  // CATEGORY 4: DEVICE & INPUT (4 Articles)
  // =========================================================================
  {
    slug: "multi-touch-and-touchscreen-testing",
    category: "device-and-input",
    title: "Multi-Touch & Touchscreen Digitizer Testing",
    subtitle: "Projected capacitive digitizers, pointer events, contact tracking, and touch latency.",
    description: "Learn how touchscreen digitizers detect simultaneous contact points, what navigator.maxTouchPoints reports, and how to test for dead touch zones.",
    directAnswer: "Multi-touch describes a digitizer's ability to recognize and track multiple simultaneous finger contact points on a touchscreen surface, enabling gestures like pinching, zooming, and rotating.",
    whyItMatters: "Faulty digitizers can develop dead touch zones, ghost touches (erratic phantom taps registered without physical contact), or drop contact tracking when multiple fingers touch the glass.",
    whatToLookFor: [
      "Dead touch zones: Areas on the screen where finger contact fails to register or breaks during drags",
      "Ghost touches: Phantom touches registered automatically when the screen is idle, opening apps or moving menus",
      "Dropped touch points: The contact counter decreasing when placing additional fingers on the surface",
      "Edge touch rejection: Inability to register taps near the extreme perimeter or corners of the glass"
    ],
    howToTest: [
      "Launch the Multi-Touch Test in Screen Tester on your phone, tablet, or touch-enabled laptop",
      "Place 2, 3, 5, and 10 fingers on the glass simultaneously to observe active contact IDs and peak counters",
      "Switch to Grid Mode and touch every quadrant to verify that all digitizer zones register contacts cleanly",
      "Perform the Hold Challenge to verify that simultaneous contacts remain stable without flickering"
    ],
    whatScreenTesterCanObserve: [
      "DOM Pointer Events (`pointerdown`, `pointermove`, `pointerup`, `pointercancel`) and Touch Events",
      "Active contact count, individual Pointer IDs, coordinate positions (X/Y), and contact pressure (if exposed)",
      "Peak simultaneous contact count registered during the test session",
      "`navigator.maxTouchPoints` reported by the browser environment"
    ],
    whatScreenTesterCannotDetermine: [
      "Physical digitizer sensor matrix hardware polling rate in Hertz (e.g., 120Hz vs 240Hz touch sampling)",
      "Capacitive electrical resistance changes across raw ITO electrode diamond grids",
      "Hardware palm-rejection firmware algorithms operating beneath the operating system driver"
    ],
    commonCauses: [
      "Damaged digitizer flex cable or cracked glass breaking electrical matrix continuity",
      "Poor-quality third-party USB charger introducing high-frequency AC electrical noise, causing ghost touches",
      "Operating system or browser gesture engines intercepting edge swipes (like back/forward navigation gestures)",
      "Thick or damaged screen protector creating excessive capacitive standoff distance"
    ],
    whatToDoNext: [
      "Unplug your device from the charger to test if erratic ghost touches stop (isolating noisy ground loop power adapters)",
      "Clean the glass surface thoroughly: moisture, oil, or water drops register as continuous capacitive contacts",
      "Remove damaged screen protectors that may have air bubbles or adhesive separation"
    ],
    sections: [
      {
        title: "How Projected Capacitive (PCAP) Touch Works",
        content: [
          "Modern smartphones, tablets, and touch laptops use Projected Capacitive (PCAP) digitizers: an ultra-thin grid of transparent conductive traces (Indium Tin Oxide) laminated beneath the cover glass.",
          "When a conductive human finger approaches the glass, it draws a minute electrical current, altering the local electrostatic capacitance. The digitizer controller scans the grid hundreds of times per second to triangulate the exact X/Y position of each touch."
        ]
      }
    ],
    faq: [
      {
        question: "Why does my phone only show 5 touches when it supports 10?",
        answer: "Certain mobile browsers or battery-saver operating system modes cap active pointer event tracking to conserve CPU resources, or built-in multi-finger gesture listeners (like 3-finger screenshot gestures) consume contacts before passing them to the web page."
      },
      {
        question: "Can software fix a dead touch zone?",
        answer: "If a specific physical stripe across the screen never registers touch, the ITO trace or digitizer controller ribbon cable is physically fractured. This requires physical screen replacement."
      }
    ],
    relatedTestIds: ["multi-touch-test", "touch-screen-test"],
    relatedTroubleshootingIds: ["multi-touch-issues"],
    relatedArticleSlugs: ["mobile-motion-sensors-accelerometer-gyroscope", "what-browser-display-tests-can-and-cannot-measure"],
    primarySearchIntent: "multi touch test screen contact points online",
    readingTimeMinutes: 5
  },
  {
    slug: "webcam-diagnostics-and-privacy",
    category: "device-and-input",
    title: "Webcam Diagnostics, Frame Rates & Video Pipelines",
    subtitle: "WebRTC getUserMedia, negotiated resolutions, exposure frame drops, and client-side privacy.",
    description: "Learn how web browsers access cameras via getUserMedia, why exposure affects frame rates, how to test video streams, and why client-side testing ensures privacy.",
    directAnswer: "Webcam testing evaluates camera hardware availability, negotiated video resolution, aspect ratio, frame rate stability, and color balance through secure browser WebRTC media streams.",
    whyItMatters: "Webcams frequently suffer from choppy frame rates in dim lighting, incorrect default resolutions, or software permission locks. Verifying your video stream in a private, client-side utility ensures your video is reliable before professional meetings.",
    whatToLookFor: [
      "Choppy, stuttering video feeds that drop from 30 FPS down to 15 FPS in normal room lighting",
      "Distorted aspect ratios where your face looks stretched horizontally or squeezed vertically",
      "Grainy, noisy video caused by high digital sensor gain (ISO) compensating for inadequate lighting",
      "Browser permission errors or 'Camera in use by another application' blocking access"
    ],
    howToTest: [
      "Open the Webcam Test in Screen Tester and grant camera permission when prompted by your browser",
      "Inspect the live stream resolution badge (e.g., 1920 × 1080 at 30 FPS) and real-time frame counter",
      "Toggle the mirror preview and capture a freeze-frame to check focus sharpness and color reproduction"
    ],
    whatScreenTesterCanObserve: [
      "Negotiated video stream dimensions (`videoWidth`, `videoHeight`) from the active MediaStreamTrack",
      "Real-time frame delivery rate calculated from `requestVideoFrameCallback` or canvas frame rendering",
      "Available video input device labels and device IDs enumerated via `navigator.mediaDevices.enumerateDevices()`",
      "Camera permission state (`granted`, `prompt`, `denied`) via the Permissions API"
    ],
    whatScreenTesterCannotDetermine: [
      "Physical lens optical resolving power (optical glass sharpness vs. digital sharpening filters)",
      "True sensor pixel dimensions (e.g., physical 720p sensor software-upscaled to 1080p by driver)",
      "Microphone hardware sensitivity, background noise floor, or acoustic frequency response"
    ],
    commonCauses: [
      "Camera auto-exposure increasing shutter time to brighten dark rooms, automatically cutting frame rate in half",
      "Another application (Zoom, Teams, OBS, Discord) holding an exclusive lock on the camera hardware",
      "Operating system privacy toggle (Windows Settings > Privacy > Camera) globally blocking camera access",
      "Connecting an external webcam through an unpowered USB 2.0 hub, causing bandwidth throttling"
    ],
    whatToDoNext: [
      "Add direct front-facing light (a desk lamp or ring light) to allow the camera to run at full 30/60 FPS shutter speeds",
      "Close background video calling applications if you receive a 'Device in use' error",
      "Check browser site permissions by clicking the padlock / tune icon in the browser address bar"
    ],
    sections: [
      {
        title: "Client-Side Processing & Privacy Guarantee",
        content: [
          "Screen Tester processes webcam video streams strictly in local device memory (RAM) within your active browser tab.",
          "Video frames are drawn onto a client-side HTML5 canvas for real-time diagnostic rendering. Zero video frames, thumbnails, or telemetry data are ever transmitted to external servers or stored in cookies. When you stop the test or close the tab, all media tracks are immediately destroyed."
        ]
      }
    ],
    faq: [
      {
        question: "Why does my 1080p webcam only show 720p in the browser?",
        answer: "Browsers request video using resolution constraints. If USB bandwidth is constrained or the operating system driver negotiates standard compatibility modes, the browser defaults to 720p. You can select specific resolution constraints in advanced software."
      },
      {
        question: "Does the Webcam Test access my microphone?",
        answer: "No. Screen Tester explicitly requests `{ video: true, audio: false }`. Your microphone is never accessed, initialized, or monitored during the webcam test."
      }
    ],
    relatedTestIds: ["webcam-test"],
    relatedTroubleshootingIds: ["webcam-issues"],
    relatedArticleSlugs: ["browser-compatibility-and-hardware-apis", "what-browser-display-tests-can-and-cannot-measure"],
    primarySearchIntent: "webcam test online check camera fps resolution",
    readingTimeMinutes: 5
  },
  {
    slug: "audio-channel-testing-and-stereo-separation",
    category: "device-and-input",
    title: "Audio Channel Separation & Stereo Testing",
    subtitle: "Web Audio API, stereo panning, phase alignment, frequency sweeps, and acoustic limits.",
    description: "Learn how stereo audio separation works, how to test left and right audio channels, and how to verify speaker frequency response using the Web Audio API.",
    directAnswer: "Stereo audio testing verifies that the left and right audio channels are wired correctly, operate with clean separation, and reproduce balanced sound without phase cancellation or channel crosstalk.",
    whyItMatters: "Reversed stereo channels (left playing on right) disorient gamers who rely on directional cues, while channel bleed or broken stereo panners make stereo music sound flat and mono.",
    whatToLookFor: [
      "Reversed channels: Test tones intended for the left speaker playing from the right speaker",
      "Channel crosstalk: Audio bleeding into the right speaker when testing the left channel exclusively",
      "Phase cancellation: Sound becoming thin, hollow, or disappearing when both channels play simultaneously",
      "Distortion or rattling at specific low frequencies during continuous tone sweeps"
    ],
    howToTest: [
      "Open the Speaker Test in Screen Tester and set your system volume to a comfortable listening level",
      "Click 'Test Left Channel' to verify sound emerges exclusively from your left speaker or earphone",
      "Click 'Test Right Channel' to verify sound emerges exclusively from your right speaker or earphone",
      "Run the Frequency Sweep (20Hz to 20,000Hz) to test your audio setup across the audible acoustic spectrum"
    ],
    whatScreenTesterCanObserve: [
      "Web Audio API sound generation via pure mathematical oscillator nodes (`OscillatorNode`)",
      "Precise stereo coordinate panning using `StereoPannerNode` set to full left (-1.0) and full right (+1.0)",
      "Generation of calibrated white noise, pink noise, and linear/logarithmic continuous frequency sweeps"
    ],
    whatScreenTesterCannotDetermine: [
      "Physical sound pressure level (SPL) in decibels (dB) without a calibrated measurement microphone",
      "Total Harmonic Distortion (THD) of the physical speaker cone or amplifier circuitry",
      "Physical acoustic room reflections, standing waves, or acoustic phase cancelation in your room"
    ],
    commonCauses: [
      "Headphones or auxiliary audio cables plugged in backwards or reversed",
      "Operating system 'Mono Audio' accessibility toggle turned ON, forcing all audio into a merged mono signal",
      "Loose or partially inserted 3.5mm audio jack, causing ground loop humming or missing channels",
      "Surround sound virtualization software (Dolby Atmos, Sonic, Nahimic) blending channels for simulated 3D audio"
    ],
    whatToDoNext: [
      "Ensure your 3.5mm or USB audio connector is fully seated into the jack",
      "Open Windows Sound Settings > Accessibility > Audio and ensure 'Mono Audio' is turned OFF",
      "If using external desktop speakers, check the physical RCA or 3.5mm audio cable connections on the rear sub"
    ],
    sections: [
      {
        title: "The Web Audio API Pipeline",
        content: [
          "Screen Tester generates audio directly in software using the browser's native Web Audio API. When you initiate a test, an `AudioContext` is created with a sample rate of 44.1kHz or 48kHz.",
          "An `OscillatorNode` generates a pure mathematical sine wave with zero harmonic distortion. The signal routes through a `StereoPannerNode` that adjusts the left/right gain matrix before feeding into the destination output. When stopped, oscillators and audio contexts are closed immediately to free audio threads."
        ]
      }
    ],
    faq: [
      {
        question: "Why can't I hear frequencies below 40Hz in the sweep test?",
        answer: "Most laptop speakers, small desktop monitors, and budget earphones cannot physically reproduce frequencies below 50Hz. Low bass reproduction requires large speaker cones or subwoofers capable of moving substantial air volumes."
      },
      {
        question: "Why can't I hear frequencies above 15,000Hz?",
        answer: "Human high-frequency hearing naturally declines with age (presbycusis). While healthy children can hear up to 20,000Hz, most adults above age 25 have a natural hearing cutoff between 14,000Hz and 17,000Hz."
      }
    ],
    relatedTestIds: ["speaker-test", "microphone-test"],
    relatedTroubleshootingIds: ["speaker-issues", "microphone-issues"],
    relatedArticleSlugs: ["webcam-diagnostics-and-privacy", "what-browser-display-tests-can-and-cannot-measure"],
    primarySearchIntent: "speaker test stereo channel separation check",
    readingTimeMinutes: 5
  },
  {
    slug: "mobile-motion-sensors-accelerometer-gyroscope",
    category: "device-and-input",
    title: "Mobile Motion Sensors: Accelerometer & Gyroscope Diagnostics",
    subtitle: "DeviceMotionEvent, DeviceOrientationEvent, 3-axis vectors, and permission sandboxing.",
    description: "Learn how mobile devices detect motion and orientation, how browser motion APIs function, and why permission sandboxes restrict sensors.",
    directAnswer: "Accelerometers measure linear acceleration and gravitational forces along three axes (X, Y, Z), while gyroscopes measure the rate of angular rotation around those axes (Alpha, Beta, Gamma).",
    whyItMatters: "Motion and orientation sensors power mobile gaming, virtual reality headsets, camera image stabilization, and fitness tracking. Diagnosing sensor telemetry helps isolate hardware sensor faults from software permission blocks.",
    whatToLookFor: [
      "Orientation bubble failing to move when you tilt your phone or tablet",
      "Erratic sensor jumping or drift when the device is placed on a completely flat, stationary table",
      "Browser permission prompts failing or silently blocking motion event delivery on iOS devices",
      "Sensor unavailable notices on desktop PCs that lack physical motion hardware"
    ],
    howToTest: [
      "Open the Accelerometer Test or Gyroscope Test in Screen Tester on a smartphone or tablet",
      "Tap 'Start Sensor' and tap 'Allow' if your browser prompts for permission (required on iOS Safari)",
      "Tilt your device along all axes to observe real-time G-force reticle displacement and degree angles"
    ],
    whatScreenTesterCanObserve: [
      "Real-time linear acceleration values (`acceleration.x`, `y`, `z`) in m/s² from `DeviceMotionEvent`",
      "Total acceleration including gravity (`accelerationIncludingGravity`) along all three axes",
      "Rotational rate angles (`rotationRate.alpha`, `beta`, `gamma`) in degrees per second",
      "Device orientation angles (`alpha`, `beta`, `gamma`) from `DeviceOrientationEvent`"
    ],
    whatScreenTesterCannotDetermine: [
      "Internal microelectromechanical (MEMS) sensor chip calibration tolerances",
      "Compass magnetic declination offsets or geomagnetic interference levels",
      "Presence of physical accelerometer silicon on desktop PCs lacking sensor hardware"
    ],
    commonCauses: [
      "Testing on a desktop computer: standard desktop PCs and external monitors have no accelerometer hardware",
      "iOS Safari permission requirement: Apple requires explicit user gesture permission via `DeviceMotionEvent.requestPermission()`",
      "Browser security sandbox: sensors are completely blocked inside non-secure HTTP connections (HTTPS is required)",
      "Sensor disabled in mobile browser settings (e.g., Chrome Mobile 'Motion Sensors' toggle set to Blocked)"
    ],
    whatToDoNext: [
      "Ensure you are accessing Screen Tester over a secure HTTPS connection",
      "On iPhone or iPad, tap 'Allow' when the system dialog asks if you want to allow motion sensors",
      "Perform a device restart if sensors become unresponsive across all operating system applications"
    ],
    sections: [
      {
        title: "Accelerometer vs. Gyroscope: How They Cooperate",
        content: [
          "An accelerometer detects gravity: when resting flat on a table, it measures 9.8 m/s² along the vertical Z axis and 0 m/s² on X and Y.",
          "A gyroscope detects rotational velocity: it measures how fast your phone is spinning around each axis in degrees per second.",
          "Operating systems use sensor fusion algorithms (such as Kalman filters) to combine accelerometer and gyroscope data into stable 3D orientation tracking."
        ]
      }
    ],
    faq: [
      {
        question: "Why does the motion test say 'Sensor Unavailable' on my laptop?",
        answer: "Most traditional desktop computers and standard clamshell laptops do not have MEMS accelerometers installed on their motherboards. These sensors are standard in smartphones, tablets, and 2-in-1 convertible convertibles."
      },
      {
        question: "Why does iOS require permission for motion sensors?",
        answer: "Apple introduced explicit permission requirements in iOS 13 to prevent web tracking scripts from fingerprinting users or estimating keystrokes based on microscopic table vibration telemetry."
      }
    ],
    relatedTestIds: ["accelerometer-test", "gyroscope-test", "vibration-test"],
    relatedTroubleshootingIds: ["accelerometer-issues", "gyroscope-issues"],
    relatedArticleSlugs: ["multi-touch-and-touchscreen-testing", "browser-compatibility-and-hardware-apis"],
    primarySearchIntent: "accelerometer gyroscope test online mobile sensors",
    readingTimeMinutes: 5
  },

  // =========================================================================
  // CATEGORY 5: BROWSER & TESTING LIMITS (2 Articles)
  // =========================================================================
  {
    slug: "what-browser-display-tests-can-and-cannot-measure",
    category: "browser-and-testing",
    title: "What Browser-Based Display Tests Can and Cannot Measure",
    subtitle: "A technical reference on Web API capabilities, client-side observation, and hardware boundaries.",
    description: "Understand the technical boundaries of browser-based display testing: what Web APIs can mathematically verify versus what requires physical laboratory equipment.",
    directAnswer: "Web browsers can render mathematically exact color coordinates, generate synchronized animation frames, and query operating system window manager metrics, but they cannot physically measure emitted light, color accuracy, or hardware response times.",
    whyItMatters: "Many online testing tools make unscientific, exaggerated claims (like claiming to measure Delta E or monitor brightness in nits). Understanding true technical boundaries helps users diagnose displays accurately without falling for false marketing.",
    whatToLookFor: [
      "Websites claiming to measure physical monitor brightness in nits without a photometer probe (scientifically impossible)",
      "Tools claiming to certify Delta E color accuracy through a web browser (requires a spectrophotometer)",
      "Tools claiming to measure 1ms GtG response times without a high-speed optical pursuit camera",
      "Websites claiming to repair physically broken liquid crystal transistors through software flashing"
    ],
    howToTest: [
      "Use browser tests for what they excel at: high-contrast visual defect screening, stepped grayscale calibration, and frame pacing diagnostics",
      "Combine browser reference patterns with controlled ambient room lighting and careful human visual inspection",
      "Check the Display Information tool to review exactly what properties your browser environment exposes"
    ],
    whatScreenTesterCanObserve: [
      "Exact 24-bit and 32-bit RGB color values rendered to HTML5 canvas and WebGL frame buffers",
      "Browser animation timing intervals (`performance.now()`, `requestAnimationFrame`) to estimate refresh rates",
      "Operating system logical viewport dimensions and device pixel scaling ratios (`devicePixelRatio`)",
      "User-reported visual defect markings and interactive diagnostic pass/fail notes"
    ],
    whatScreenTesterCannotDetermine: [
      "Physical photometric luminance in nits (cd/m²) emitted by the panel backlight or OLED pixels",
      "Color accuracy errors (Delta E) or color gamut volume percentages without a colorimeter sensor",
      "Physical pixel response time (GtG milliseconds) without high-speed photodiode optical oscilloscopes",
      "Hardware monitor internal scalar LUT (Look-Up Table) calibration curves"
    ],
    commonCauses: [
      "Unscientific marketing claims made by legacy display testing websites",
      "Confusion between digital canvas pixel values (e.g., RGB 255, 255, 255) and physical emitted brightness (nits)",
      "Assuming browser window resolution matches physical panel pixel grid when OS display scaling is active"
    ],
    whatToDoNext: [
      "Use Screen Tester for visual inspection, panel defect screening, and baseline calibration",
      "If you require certified laboratory calibration for color-critical prepress or film grading, invest in a hardware colorimeter (Calibrite Display Plus or Datacolor Spyder)",
      "Always inspect display patterns with operating system scaling at 100% and ambient lighting properly controlled"
    ],
    sections: [
      {
        title: "The Sandbox Principle of Web Browsers",
        content: [
          "Web browsers are secure application sandboxes designed to protect user privacy and system security. They intentionally isolate web pages from low-level GPU registers, I2C bus monitor communications (DDC/CI), and raw physical hardware sensors.",
          "A browser can command the GPU to draw a solid white box, but it has no physical sensor or photodiode to know how much light actually leaves the glass. That observation belongs to the human user."
        ]
      }
    ],
    faq: [
      {
        question: "Can any website measure my monitor's true brightness in nits?",
        answer: "No. Emitted luminance in nits (candela per square meter) is a physical measurement of photons. Without an external optical sensor placed against the glass, no web browser or software tool can measure nits."
      },
      {
        question: "What makes Screen Tester different from other test tools?",
        answer: "Screen Tester adheres strictly to technical honesty: we explain exactly what is observed in browser memory versus what requires physical measurement, eliminating marketing exaggerations."
      }
    ],
    relatedTestIds: ["display-info", "color-test", "brightness-test", "ghosting-test"],
    relatedTroubleshootingIds: ["no-image", "washed-out-colors"],
    relatedArticleSlugs: ["browser-compatibility-and-hardware-apis", "hdr-display-fundamentals"],
    primarySearchIntent: "what can browser screen test measure limitations",
    readingTimeMinutes: 6
  },
  {
    slug: "browser-compatibility-and-hardware-apis",
    category: "browser-and-testing",
    title: "Browser Compatibility & Web Hardware APIs",
    subtitle: "Engine differences across Chromium, Gecko, WebKit, and hardware API availability.",
    description: "Explore how different browser engines (Chromium, Gecko, WebKit) support display, audio, sensor, and input APIs, and how permissions are sandboxed.",
    directAnswer: "Browser compatibility refers to how consistently different web browser engines (Blink in Chrome/Edge, Gecko in Firefox, WebKit in Safari) implement modern Web APIs for graphics, media, touch, and hardware sensors.",
    whyItMatters: "A test that works seamlessly in Google Chrome on Windows (such as vibration or gamepad access) may be intentionally unsupported in Apple Safari on iOS due to platform security policies and privacy sandboxing.",
    whatToLookFor: [
      "Vibration API (`navigator.vibrate`) not functioning on desktop browsers or iOS Safari",
      "Motion sensor events requiring explicit permission taps on iOS Safari but running automatically on Android Chrome",
      "Fullscreen API behaving differently on mobile phones versus desktop monitors",
      "Color gamut negotiation differing between macOS Safari (Display P3) and Windows Chrome"
    ],
    howToTest: [
      "Open the Browser Compatibility tool in Screen Tester to inspect support status across 16 core Web APIs",
      "Review the compatibility status table for your specific active browser and operating system",
      "Test hardware features on alternate browsers (such as Firefox or Edge) if an API is unavailable"
    ],
    whatScreenTesterCanObserve: [
      "Feature detection of global API objects in the `window` and `navigator` namespaces",
      "Support flags for Web Audio, WebRTC, Pointer Events, Fullscreen, Vibration, and Motion APIs",
      "User agent and browser engine characteristics for diagnostic compatibility grouping"
    ],
    whatScreenTesterCannotDetermine: [
      "Unreleased or experimental browser flag toggles (`chrome://flags` or `about:config`)",
      "Operating-system level firewall or enterprise group policy restrictions",
      "Third-party privacy extension script blocking behavior"
    ],
    commonCauses: [
      "Safari / WebKit policy omitting non-standard hardware APIs (like Web Vibration API) for privacy reasons",
      "Accessing a website over unencrypted HTTP: modern browsers disable camera, microphone, and motion APIs on non-HTTPS origins",
      "Strict browser tracking protection or privacy extensions blocking sensor event listeners",
      "Running an outdated browser version lacking modern WebRTC or Canvas 2D color space extensions"
    ],
    whatToDoNext: [
      "Keep your web browser updated to the latest stable release",
      "Always connect via secure HTTPS to ensure all modern browser Web APIs are unlocked",
      "Use Chrome or Edge on Android when testing physical vibration and haptic feedback"
    ],
    sections: [
      {
        title: "API Support Across Major Engines",
        content: [
          "Chromium (Google Chrome, Microsoft Edge, Brave): Broadest hardware API implementation, including Vibration API, Screen Wake Lock, and Fullscreen API.",
          "Gecko (Mozilla Firefox): Strong standards compliance, excellent canvas rendering and Web Audio support, conservative hardware sensor implementation.",
          "WebKit (Apple Safari): Strict privacy sandboxing, requires explicit user gestures for sensors, omits Vibration API, but provides leading Color Management and Display P3 wide gamut support on Apple displays."
        ]
      }
    ],
    faq: [
      {
        question: "Why doesn't the Vibration Test vibrate my iPhone?",
        answer: "Apple has intentionally never implemented the Web Vibration API in WebKit/Safari to prevent web advertisements and spam sites from triggering intrusive device haptics. Physical vibration testing requires an Android device running Chrome or Firefox."
      },
      {
        question: "Do I need to install any browser extensions to use Screen Tester?",
        answer: "No. Screen Tester is 100% zero-install and client-side. It operates entirely on native standard W3C Web APIs supported natively by modern web browsers."
      }
    ],
    relatedTestIds: ["display-info", "vibration-test", "webcam-test", "microphone-test"],
    relatedTroubleshootingIds: ["vibration-issues", "webcam-issues", "microphone-issues"],
    relatedArticleSlugs: ["what-browser-display-tests-can-and-cannot-measure", "webcam-diagnostics-and-privacy"],
    primarySearchIntent: "browser compatibility display test web hardware apis",
    readingTimeMinutes: 5
  }
];

// Helper utilities
export function getAllArticles(): KnowledgeArticle[] {
  return KNOWLEDGE_ARTICLES;
}

export function getArticleBySlug(slug: string): KnowledgeArticle | undefined {
  return KNOWLEDGE_ARTICLES.find(article => article.slug === slug);
}

export function getArticlesByCategory(category: KnowledgeBaseCategory): KnowledgeArticle[] {
  return KNOWLEDGE_ARTICLES.filter(article => article.category === category);
}

export function getCategoryInfo(category: KnowledgeBaseCategory): KnowledgeCategoryInfo | undefined {
  return KNOWLEDGE_CATEGORIES.find(c => c.id === category);
}

export function getArticleByTestId(testId: string): KnowledgeArticle | undefined {
  return KNOWLEDGE_ARTICLES.find(article => article.relatedTestIds.includes(testId));
}

export function getArticleByTroubleshootingId(topicId: string): KnowledgeArticle | undefined {
  return KNOWLEDGE_ARTICLES.find(article => article.relatedTroubleshootingIds.includes(topicId));
}

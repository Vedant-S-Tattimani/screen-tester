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
    relatedTestIds: ["refresh-rate-test", "vrr-test", "ghosting-test"],
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
    relatedTestIds: ["hdr-test", "hdr-capability-test", "gradient-banding-test"],
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
    subtitle: "Pixel response time (GtG), eye persistence (MPRT), overdrive tuning, and corona artifacts.",
    description: "Understand the differences between slow pixel response ghosting, human eye persistence blur, and monitor overdrive overshoot (inverse ghosting).",
    directAnswer: "Monitor ghosting is a visual trailing artifact caused by slow liquid crystals struggling to transition to new colors quickly enough, while inverse ghosting (overshoot) is caused by excessive voltage that pushes crystals past their target shade.",
    whyItMatters: "Misconfiguring your monitor's overdrive setting can severely degrade motion clarity. Setting overdrive too low creates dark smearing, while setting it too high creates distracting bright glowing halos behind moving objects.",
    whatToLookFor: [
      "Dark smearing or colored trails lagging behind high-contrast moving objects (ghosting)",
      "Bright, glowing white or inverted colored halos preceding or following moving objects (overshoot / corona)",
      "Severe black smearing on VA panels when dark objects move across dark gray backgrounds",
      "Loss of text readability when scrolling quickly through documents or web pages"
    ],
    howToTest: [
      "Launch the Ghosting Test in Screen Tester to watch calibrated blocks move across high-contrast backgrounds",
      "Switch between low, medium, and high velocity to inspect trail persistence",
      "Open your monitor OSD menu and toggle through your monitor's Overdrive / Response Time settings (e.g., Off, Normal, Fast, Extreme) to find the optimal balance with zero overshoot"
    ],
    whatScreenTesterCanObserve: [
      "Rendering of high-velocity moving test blocks synchronized with display refresh intervals",
      "Visual display of various color contrast pairings (e.g., dark gray on black vs. bright cyan on dark gray)",
      "User visual tracking of trail length and halo intensity"
    ],
    whatScreenTesterCannotDetermine: [
      "Physical pixel transition times in milliseconds (Gray-to-Gray, GtG)",
      "Moving Picture Response Time (MPRT) measured with a laboratory high-speed pursuit camera",
      "Exact voltage waveforms delivered by the panel timing controller (T-Con)"
    ],
    commonCauses: [
      "Monitor Overdrive / Trace Free / AMA set to 'Extreme' or 'Ultra-Fast', inducing severe voltage overshoot",
      "Monitor Overdrive disabled or set to 'Off', leaving slow liquid crystals with no voltage acceleration",
      "VA panel architecture with inherently slow dark-level liquid crystal transitions (black smearing)",
      "Monitor running at low ambient room temperatures, which physically slows liquid crystal viscosity"
    ],
    whatToDoNext: [
      "Open your monitor's on-screen display (OSD) and locate 'Overdrive', 'Response Time', or 'Trace Free'",
      "Select the middle setting (typically 'Fast' or 'Normal'). Avoid 'Extreme' as it almost universally causes overshoot",
      "Ensure your monitor is running at its maximum advertised refresh rate (e.g., 144Hz or 240Hz)"
    ],
    sections: [
      {
        title: "GtG vs. MPRT: Two Different Types of Motion Blur",
        content: [
          "Gray-to-Gray (GtG) response time measures how long it takes a physical liquid crystal to rotate and change color (e.g., 1ms to 10ms). Slow GtG causes ghosting trails.",
          "Moving Picture Response Time (MPRT) is caused by human eye tracking across a sample-and-hold display. Even if GtG was 0ms (as on an OLED), an image held on screen for 16.7ms (60Hz) smears on the human retina as your eye moves. Higher refresh rates (120Hz, 240Hz, 360Hz) or backlight strobing reduce MPRT."
        ]
      }
    ],
    faq: [
      {
        question: "What is inverse ghosting or 'coronas'?",
        answer: "Inverse ghosting (overshoot) occurs when a monitor over-accelerates liquid crystals using excessive voltage. Instead of settling at the target color, the crystal overshoots, creating a bright glowing halo that mirrors the moving object."
      },
      {
        question: "Can an OLED monitor suffer from ghosting?",
        answer: "OLED pixels transition in approximately 0.03 milliseconds, completely eliminating GtG ghosting. Any motion blur observed on an OLED is pure sample-and-hold eye tracking persistence (MPRT), solved by running at higher refresh rates."
      }
    ],
    relatedTestIds: ["ghosting-test", "motion-blur-test", "refresh-rate-test"],
    relatedTroubleshootingIds: ["wrong-refresh-rate"],
    relatedArticleSlugs: ["refresh-rate-and-frame-rates", "screen-tearing-and-v-sync"],
    primarySearchIntent: "monitor ghosting test overdrive overshoot",
    readingTimeMinutes: 6
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
    title: "OLED Burn-In & Image Retention: Causes & Prevention",
    subtitle: "Organic subpixel degradation, differential aging, temporary retention, and protection cycles.",
    description: "Understand the difference between temporary image retention and permanent OLED burn-in, how subpixel wear occurs, and how to inspect your panel.",
    directAnswer: "Image retention is a temporary ghost image caused by electrical charge stagnation in liquid crystals or OLED driver circuits that fades away, whereas burn-in is permanent differential degradation of organic subpixels caused by displaying static elements for thousands of hours.",
    whyItMatters: "OLED panels produce unmatched contrast and response times, but their organic compounds degrade with cumulative luminous exposure. Knowing how to detect early image retention and configure prevention mechanisms protects your investment.",
    whatToLookFor: [
      "Faint ghost outlines of static UI elements (such as taskbars, browser headers, or game HUDs) visible on uniform backgrounds",
      "Shadow silhouettes visible specifically on full-screen red, orange, or 50% gray slides",
      "Uneven panel brightness in letterbox bar zones from viewing 16:9 movies on an ultrawide screen",
      "Temporary shadow outlines that disappear after a panel refresh cycle or 10 minutes of varied video playback"
    ],
    howToTest: [
      "Launch the OLED Burn-In Test in Screen Tester to inspect solid full-screen Red, Green, Blue, Magenta, Cyan, and 50% Gray fields",
      "Solid Red and Gray slides are the most sensitive for exposing early differential subpixel wear",
      "If a ghost image appears, run full-screen dynamic video content for 30 minutes to see if it clears (retention vs. permanent burn-in)"
    ],
    whatScreenTesterCanObserve: [
      "Full-screen solid primary and secondary chromatic color slides for visual inspection",
      "Full-screen 5%, 10%, 20%, and 50% uniform grayscale slides",
      "High-contrast rapid cycling patterns via the Stuck Pixel Fixer to stimulate stalled subpixels"
    ],
    whatScreenTesterCannotDetermine: [
      "Total cumulative operating hours of individual organic subpixel zones",
      "Internal panel compensation cycle telemetry or wear leveling lookup tables",
      "Whether an organic emitter has permanently lost luminous efficiency without longitudinal tracking"
    ],
    commonCauses: [
      "Leaving static desktop elements (Windows taskbar, desktop icons, browser navigation bars) on screen for hundreds of consecutive hours",
      "Running the display at 100% maximum brightness (OLED Light / Luminance) on full-screen white documents",
      "Disabling built-in panel protection features (Pixel Shift, Logo Brightness Limiter, Auto Static Dimming)",
      "Unplugging the monitor from the wall socket, preventing it from running automatic standby pixel compensation cycles"
    ],
    whatToDoNext: [
      "Auto-hide the Windows or macOS taskbar and set a dark or rotating desktop wallpaper",
      "Enable built-in monitor protection features (Pixel Orbiting / Shift, Logo Dimming, Screen Saver)",
      "Never cut mains power directly: allow the monitor to enter standby so it can complete automatic pixel cleaning cycles",
      "Run the monitor's manual 'Pixel Refresh' or 'Panel Clean' cycle if temporary retention persists"
    ],
    sections: [
      {
        title: "How Organic Burn-In Physically Occurs",
        content: [
          "In an OLED display, each subpixel is made of organic electroluminescent material that emits light when current passes through it.",
          "Over thousands of hours of emission, organic compounds gradually lose luminous efficiency. If certain subpixels (such as a red health bar or a static white taskbar icon) remain brightly lit while surrounding pixels display moving content, the static subpixels age faster.",
          "When the display subsequently attempts to show a solid uniform color, the worn subpixels emit slightly less light, leaving a visible darker silhouette (permanent burn-in)."
        ]
      }
    ],
    faq: [
      {
        question: "Is modern OLED burn-in as common as it used to be?",
        answer: "No. Modern QD-OLED and WOLED panels use advanced heat sinks, multi-layer deuterium compounds, real-time thermal sensors, and aggressive pixel-shifting algorithms that make burn-in rare under normal mixed gaming and media consumption."
      },
      {
        question: "Can software fix permanent OLED burn-in?",
        answer: "No software tool can physically restore degraded organic emitter compounds. Software tools can only clear temporary image retention or exercise liquid crystals."
      }
    ],
    relatedTestIds: ["burn-in-test", "solid-color-test", "stuck-pixel-fixer"],
    relatedTroubleshootingIds: ["uneven-brightness"],
    relatedArticleSlugs: ["dead-pixel-vs-stuck-pixel", "display-uniformity"],
    primarySearchIntent: "oled burn in test image retention check",
    readingTimeMinutes: 7
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

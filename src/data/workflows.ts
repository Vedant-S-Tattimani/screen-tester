export interface WorkflowStepItem {
  title: string;
  description: string;
}

export interface InspectionWorkflow {
  id: string; // URL slug e.g. 'new'
  route: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  inspectionTip: string;
  browserLimitations?: string;
  sequence: string[];
  steps: WorkflowStepItem[];
}

export const inspectionWorkflows: InspectionWorkflow[] = [
  {
    id: "general",
    route: "/monitor-inspection/general",
    title: "General Display Checkup",
    shortDescription: "Essential all-around visual checkup for any screen.",
    longDescription: "A balanced, essential diagnostic sequence designed to inspect any desktop monitor, laptop screen, or external display for dead pixels, color accuracy, brightness, contrast, screen uniformity, and refresh rate.",
    inspectionTip: "Set your display to its native resolution and recommended scaling setting before beginning the checkup.",
    browserLimitations: "Browser tests evaluate client-rendered patterns and cannot inspect internal power supply stability or physical video input ports.",
    sequence: [
      "/tests/resolution-checker",
      "/tests/dead-pixel-test",
      "/tests/uniformity-test",
      "/tests/near-black-test",
      "/tests/gradient-banding-test",
      "/tests/text-clarity-test",
      "/tests/scaling-aspect-test",
      "/tests/ghosting-test",
      "/tests/refresh-rate-test"
    ],
    steps: [
      { title: "Resolution & Display Info", description: "Verify native resolution, DPR scaling, and display parameters." },
      { title: "Dead Pixel Locator", description: "Cycle through pure solid fields to locate dead or stuck subpixels." },
      { title: "Screen Uniformity", description: "Inspect neutral gray and solid fields for clouding, vignetting, or dirty screen effect." },
      { title: "Near-Black Shadow Detail", description: "Verify dark tone step separation and shadow detail near true black." },
      { title: "Gradient & Banding", description: "Inspect tonal transitions from black to white without quantization banding." },
      { title: "Text Clarity & Subpixels", description: "Evaluate font anti-aliasing and subpixel edge sharpness across font sizes." },
      { title: "Scaling & Aspect Ratio", description: "Check geometric circles and square grids for stretching or squashing." },
      { title: "Ghosting & Motion Trails", description: "Observe moving contrast blocks to test pixel response time." },
      { title: "Refresh Rate & Frame Timing", description: "Benchmark browser animation timing against panel refresh rate." }
    ]
  },
  {
    id: "used",
    route: "/monitor-inspection/used",
    title: "Used Monitor Inspection",
    shortDescription: "Focused 10-test inspection with notes and report generation, optimized before purchasing a used display.",
    longDescription: "A rigorous, pre-purchase inspection workflow designed specifically for evaluating second-hand, refurbished, or used monitors. Systematically covers hardware display parameters, pixel defects, backlight decay, color fidelity, motion clarity, and saves findings directly into an inspection report.",
    inspectionTip: "Set monitor brightness to 100% when inspecting a pre-owned display to expose dormant burn-in, uneven fluorescent/LED decay, and bezel pressure damage.",
    browserLimitations: "Power-on hours and internal thermal sensor telemetry require accessing the physical monitor's factory Service Menu via hardware chassis buttons.",
    sequence: [
      "/tests/display-info",
      "/tests/resolution-checker",
      "/tests/dead-pixel-test",
      "/tests/stuck-pixel-test",
      "/tests/color-test",
      "/tests/brightness-test",
      "/tests/uniformity-test",
      "/tests/backlight-bleed-test",
      "/tests/ghosting-test",
      "/tests/refresh-rate-test"
    ],
    steps: [
      { title: "1. Display Information", description: "Query browser-reported display parameters, color depth, and graphics capabilities." },
      { title: "2. Resolution & Geometry", description: "Verify native resolution, scaling ratio (DPR), and full desktop viewport." },
      { title: "3. Dead Pixels", description: "Scan white and primary color fields for permanently dark, inactive subpixels." },
      { title: "4. Stuck Pixels", description: "Inspect dark and neutral fields for permanently energized, glowing subpixels." },
      { title: "5. Color Reproduction", description: "Check RGB primaries and CMY secondaries for color shift, tinting, or channel degradation." },
      { title: "6. Brightness & Shadow Separation", description: "Confirm the backlight delivers sufficient luminance without crushing shadow steps." },
      { title: "7. Screen Uniformity", description: "Check 25%, 50%, and 75% gray fields for backlight aging, vignetting, or yellowing." },
      { title: "8. Backlight Bleed & Frame Pinch", description: "Inspect in a dark environment for bezel pressure damage and edge light leaks." },
      { title: "9. Ghosting & Response Degradation", description: "Evaluate pixel response trails and overdrive performance under motion." },
      { title: "10. Refresh Rate Stability", description: "Confirm the panel runs at its rated refresh rate without micro-stutter or dropped frames." },
      { title: "11. Inspection Notes", description: "Record physical cosmetic condition, port functionality, and visual findings in the report." },
      { title: "12. Final Monitor Test Report", description: "Generate a complete, printable, and exportable report documenting all observed results." }
    ]
  },
  {
    id: "gaming",
    route: "/monitor-inspection/gaming",
    title: "Gaming Display Inspection",
    shortDescription: "Verify refresh rate, ghosting, overdrive, tearing, black smearing, flicker, HDR, and motion.",
    longDescription: "A specialized testing workflow engineered for high-refresh-rate gaming monitors (120Hz, 144Hz, 240Hz, 360Hz+). Evaluates refresh rate sync, ghosting, pixel overdrive overshoot (inverse ghosting), screen tearing, VA black smearing, panel flicker/strobing, HDR peak response, and motion persistence without duplicating underlying tests.",
    inspectionTip: "Test your monitor at its advertised maximum refresh rate with Overdrive set to 'Normal' before testing 'Extreme/Faster' to identify inverse ghosting (pixel overshoot halos).",
    browserLimitations: "Variable Refresh Rate (G-Sync / FreeSync) dynamic variable frame pacing requires native DirectX/Vulkan game execution to test dynamic fluctuating refresh rate floors.",
    sequence: [
      "/tests/vrr-test",
      "/tests/screen-tearing-test",
      "/tests/refresh-rate-test",
      "/tests/ghosting-test",
      "/tests/hdr-test",
      "/tests/text-clarity-test"
    ],
    steps: [
      { title: "VRR & Adaptive Sync Inspection", description: "Observe variable frame pacing stability and judder across changing workload levels." },
      { title: "Screen Tearing & V-Sync", description: "Stress-test scanline tearing across high-velocity horizontal and vertical motion." },
      { title: "Refresh Rate Verification", description: "Benchmark browser requestAnimationFrame timing against native gaming panel refresh rate." },
      { title: "Ghosting, Overdrive & Black Smearing", description: "Evaluate pixel response transitions, overshoot halos (inverse ghosting), and VA dark-level smearing." },
      { title: "HDR Visual Inspection", description: "Inspect specular highlights, clipping, and wide gamut rendering." },
      { title: "Text & In-Game UI Clarity", description: "Assess small font legibility and subpixel edge rendering for HUD and text." }
    ]
  },
  {
    id: "oled",
    route: "/monitor-inspection/oled",
    title: "OLED Display Inspection",
    shortDescription: "Inspect near-black fields, uniformity, banding, image retention, burn-in, HDR, and motion clarity.",
    longDescription: "A specialized diagnostic workflow tailored for self-emissive OLED, QD-OLED, and WOLED panels. Evaluates near-black chrominance steps, vertical banding, panel uniformity, temporary image retention vs. permanent burn-in, HDR dynamic range, and sample-and-hold motion clarity.",
    inspectionTip: "Observe dark gray patterns (1%, 2%, 5% gray) in a pitch-black room to inspect OLED near-black vertical banding and panel uniformity without ambient reflections.",
    browserLimitations: "OLED Automatic Brightness Limiter (ABL) dims large 100% white browser windows; laboratory burn-in quantification requires optical luminance meters. Temporary electronic charge accumulation (image retention) should be distinguished from permanent subpixel emitter degradation (burn-in).",
    sequence: [
      "/tests/near-black-test",
      "/tests/uniformity-test",
      "/tests/hdr-test",
      "/tests/text-clarity-test",
      "/tests/motion-blur-test",
      "/tests/dead-pixel-test"
    ],
    steps: [
      { title: "Near-Black & Shadow Separation", description: "Inspect 0.25% to 5% dark steps to evaluate subtle shadow detail and OLED turn-on behavior." },
      { title: "Luminance & Dark Uniformity", description: "Check panel-wide uniformity across 5%, 20%, and 50% neutral gray fields for vertical banding." },
      { title: "HDR & Specular Highlights", description: "Verify wide color gamut presentation and peak highlight roll-off without ABL clipping." },
      { title: "Text Rendering & Triangular Subpixels", description: "Inspect subpixel font rendering (RGB/WRGB/QD-OLED) for color fringing on text edges." },
      { title: "Sample-and-Hold Motion Clarity", description: "Observe instantaneous OLED subpixel transitions alongside eye tracking persistence blur." },
      { title: "Subpixel Dropout & Burn-In Check", description: "Scan primary solid fields for inactive subpixels or static UI retention." }
    ]
  },
  {
    id: "laptop",
    route: "/monitor-inspection/laptop",
    title: "Laptop Display Inspection",
    shortDescription: "Check resolution, brightness, uniformity, color, text rendering, refresh rate, and HDR.",
    longDescription: "A focused inspection workflow for built-in laptop displays (MacBook Retina, Windows Ultrabooks, gaming laptops). Validates high-DPI scaling, maximum brightness reserve, panel uniformity, color fidelity, ClearType subpixel text rendering, refresh rate, and HDR capability where applicable.",
    inspectionTip: "Connect your laptop to AC mains power and disable automatic brightness sensors to prevent battery power-saving profiles from dimming the backlight during testing.",
    browserLimitations: "Laptop color gamut coverage percentages (e.g., 100% sRGB or DCI-P3) are physical panel characteristics requiring hardware colorimeter calibration.",
    sequence: [
      "/tests/resolution-checker",
      "/tests/brightness-test",
      "/tests/uniformity-test",
      "/tests/solid-color-test",
      "/tests/sharpness-test",
      "/tests/refresh-rate-test",
      "/tests/hdr-capability-test"
    ],
    steps: [
      { title: "Resolution & High-DPI Scaling", description: "Verify logical viewport scaling, device pixel ratio (DPR), and native panel resolution." },
      { title: "Brightness & Dynamic Range", description: "Verify maximum backlight output and shadow step visibility for indoor/outdoor usability." },
      { title: "Screen Uniformity & Bezel Pinch", description: "Inspect for bezel pinch marks, edge light leakage, or uneven corner luminance." },
      { title: "Color Vibrancy & Uniformity", description: "Verify primary and secondary color fields for uniform rendition across the display." },
      { title: "Text Rendering & Subpixel Clarity", description: "Inspect subpixel font rendering (RGB ClearType) across multiple font scales (8px–24px)." },
      { title: "Refresh Rate Verification", description: "Confirm high refresh rates (90Hz, 120Hz ProMotion, 144Hz+) are properly engaged." },
      { title: "HDR & Wide Gamut (Where Applicable)", description: "Verify HDR capability and wide color gamut support on compatible HDR laptop panels." }
    ]
  },
  {
    id: "new",
    route: "/monitor-inspection/new",
    title: "New Monitor Inspection",
    shortDescription: "Essential checks before first use and within return window.",
    longDescription: "A comprehensive out-of-the-box verification checklist designed to inspect newly purchased external monitors for manufacturing defects, pixel flaws, backlight bleed, and panel performance before the retailer return window closes.",
    inspectionTip: "Inspect in both a brightly lit room (for physical panel finish, reflections, and micro-scratches) and a completely dark room (for backlight bleed and IPS glow).",
    browserLimitations: "Browsers cannot test physical I/O ports (DisplayPort, HDMI, USB-C Power Delivery) or proprietary hardware G-Sync modules. Perform manual physical cable testing as well.",
    sequence: [
      "/tests/resolution-checker",
      "/tests/sharpness-test",
      "/tests/dead-pixel-test",
      "/tests/stuck-pixel-test",
      "/tests/solid-color-test",
      "/tests/grayscale-test",
      "/tests/brightness-test",
      "/tests/contrast-test",
      "/tests/black-level-test",
      "/tests/white-level-test",
      "/tests/uniformity-test",
      "/tests/backlight-bleed-test",
      "/tests/ghosting-test",
      "/tests/refresh-rate-test",
      "/tests/hdr-capability-test"
    ],
    steps: [
      { title: "Display Resolution & Capabilities", description: "Verify native resolution, device pixel ratio, and reported refresh rate." },
      { title: "Text Sharpness & Subpixel Clarity", description: "Check text rendering, font anti-aliasing, and panel sharpness without artifacts." },
      { title: "Dead Pixel Check", description: "Cycle through pure primary color fields to detect inactive, black subpixels." },
      { title: "Stuck Pixel Fixer & Inspection", description: "Check for permanently illuminated RGB subpixels that fail to switch off." },
      { title: "Solid Color Uniformity", description: "Verify red, green, blue, cyan, magenta, and yellow color fields across the panel." },
      { title: "Grayscale Gradient Steps", description: "Inspect tonal transitions from 0% to 100% luminance without harsh banding." },
      { title: "Brightness & Dynamic Range", description: "Ensure full spectrum luminance from black to white is clearly distinguishable." },
      { title: "Contrast Steps", description: "Verify distinct separation across stepped contrast reference swatches." },
      { title: "Black Level Clipping", description: "Tune black level so dark shadows don't crush into pure black." },
      { title: "White Level Clipping", description: "Tune contrast so bright highlights don't blow out into pure white." },
      { title: "Screen Luminance Uniformity", description: "Look for clouding, vignetting, or dirty screen effect across gray fields." },
      { title: "Backlight Bleed & IPS Glow", description: "Test in a dark room to isolate bezel light leakage from angular IPS glow." },
      { title: "Ghosting & Pixel Response", description: "Observe moving high-contrast shapes to detect panel trailing or smearing." },
      { title: "Refresh Rate & Frame Timing", description: "Confirm browser requestAnimationFrame timing matches the panel's refresh rate." },
      { title: "HDR & Wide Color Gamut", description: "Check OS HDR reporting and P3 color space support where applicable." }
    ]
  },
  {
    id: "tv",
    route: "/monitor-inspection/tv",
    title: "TV Display Inspection",
    shortDescription: "Inspect your TV's display quality, local dimming, and performance.",
    longDescription: "A specialized test suite for living room TVs and large-format displays connected via HDMI. Identifies local dimming blooming, dirty screen effect (DSE), 24p judder, overscan cropping, and HDR processing.",
    inspectionTip: "Switch your TV picture preset to 'PC', 'Game', or 'Filmmaker' mode and set aspect ratio to 'Just Scan' / 1:1 to disable sharpness edge enhancement and overscan cropping.",
    browserLimitations: "TV picture processing features (such as motion interpolation / soap opera effect) must be enabled or disabled directly in the TV's hardware settings menu.",
    sequence: [
      "/tests/hdr-test",
      "/tests/near-black-test",
      "/tests/uniformity-test",
      "/tests/tv-overscan-test",
      "/tests/scaling-aspect-test",
      "/tests/viewing-angle-test"
    ],
    steps: [
      { title: "HDR Visual Inspection", description: "Verify high dynamic range highlight roll-off and wide color gamut rendering." },
      { title: "Near-Black Shadow Detail", description: "Check HDMI black level to avoid shadow crush or washed-out elevated blacks." },
      { title: "Uniformity & Dirty Screen Effect (DSE)", description: "Pan across gray fields to detect vertical banding or dark spots common in large panels." },
      { title: "TV Overscan & 1:1 Pixel Mapping", description: "Verify full 4K/1080p display output without edge pixels cropped by television overscan." },
      { title: "Aspect Ratio & Scaling Geometry", description: "Confirm circular and square test patterns retain mathematically correct aspect proportions." },
      { title: "Living Room Viewing Angles", description: "Assess off-axis color and contrast degradation from wide seating positions." }
    ]
  }
];

export function getWorkflowById(id: string): InspectionWorkflow | undefined {
  return inspectionWorkflows.find(w => w.id === id);
}

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
    id: "used",
    route: "/monitor-inspection/used",
    title: "Used Monitor Inspection",
    shortDescription: "Look for common issues, age wear, and hidden defects.",
    longDescription: "A specialized diagnostic sequence for second-hand, refurbished, or pre-owned displays. Focuses on aging artifacts such as permanent burn-in, backlight decay, stuck pixels, and panel wear.",
    inspectionTip: "Turn monitor brightness to maximum when testing used panels to expose dormant burn-in, uneven fluorescent/LED aging, and capacitor flickering.",
    browserLimitations: "Power-on hours and internal thermal sensor data require accessing the monitor's factory Service Menu via hardware buttons.",
    sequence: [
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
    ],
    steps: [
      { title: "Resolution & Display Specs", description: "Verify native resolution and reported display capabilities." },
      { title: "Dead Pixels", description: "Scan for permanently dark or dead pixels across white and color fields." },
      { title: "Stuck Pixels", description: "Look for permanently bright subpixels that fail to turn off." },
      { title: "Burn-in & Image Retention", description: "Inspect uniform gray and color screens for ghosted static UI elements or taskbars." },
      { title: "Brightness Reserve", description: "Check if the backlight still delivers adequate luminance and dynamic range." },
      { title: "Black Levels & Contrast", description: "Verify deep black level performance and dark shadow separation." },
      { title: "Luminance Uniformity", description: "Detect uneven backlight aging or yellowing across panel corners." },
      { title: "Backlight Bleed", description: "Inspect edges for frame pinching, pressure damage, or light leakage." },
      { title: "Ghosting & Motion Blur", description: "Evaluate pixel response time degradation or overdrive decay." },
      { title: "Refresh Rate Stability", description: "Check for frame drops or timing inconsistencies." },
      { title: "Color Banding & Gradients", description: "Check for posterization or banding across smooth tone transitions." }
    ]
  },
  {
    id: "gaming",
    route: "/monitor-inspection/gaming",
    title: "Gaming Display Inspection",
    shortDescription: "Check refresh rate, tearing, overdrive and motion clarity.",
    longDescription: "A high-performance testing workflow tailored for high-refresh-rate gaming monitors (120Hz, 144Hz, 240Hz, 360Hz+). Optimizes overdrive settings, verifies motion clarity, and tests frame synchronization.",
    inspectionTip: "Test your monitor at its advertised maximum refresh rate with Overdrive/Response Time set to Normal before testing Extreme/Faster to avoid inverse ghosting (pixel overshoot).",
    browserLimitations: "Variable Refresh Rate (G-Sync/FreeSync) dynamic sync ranges require native GPU 3D acceleration to fully stress-test frame rate fluctuations.",
    sequence: [
      "/tests/resolution-checker",
      "/tests/sharpness-test",
      "/tests/refresh-rate-test",
      "/tests/screen-tearing-test",
      "/tests/ghosting-test",
      "/tests/motion-blur-test",
      "/tests/black-level-test",
      "/tests/contrast-test",
      "/tests/hdr-capability-test"
    ],
    steps: [
      { title: "Resolution & Refresh Rate Config", description: "Verify Windows/macOS display adapter is correctly set to full gaming refresh rate." },
      { title: "Sharpness & Text Rendering", description: "Ensure sharpness settings are not causing ringing or edge haloing." },
      { title: "High Refresh Rate Verification", description: "Benchmark browser frame timing against native panel refresh rate." },
      { title: "Screen Tearing & V-Sync", description: "Test visual tear line behavior during horizontal and vertical scrolling." },
      { title: "Ghosting & Overdrive Tuning", description: "Evaluate trailing artifacts at multiple velocity speeds to tune monitor overdrive." },
      { title: "Motion Blur & Persistence", description: "Assess backlight strobing (ULMB, ELMB, DyAc) or motion blur reduction." },
      { title: "Black Level (Black Equalizer)", description: "Calibrate shadow visibility so competitive opponents aren't hidden in dark scenes." },
      { title: "Contrast Balance", description: "Ensure competitive visibility without washing out highlight detail." },
      { title: "HDR & Dynamic Range", description: "Verify HDR signal handshake and peak highlight brightness." }
    ]
  },
  {
    id: "oled",
    route: "/monitor-inspection/oled",
    title: "OLED Display Inspection",
    shortDescription: "Test for burn-in, uniformity, true black levels and HDR performance.",
    longDescription: "A specialized testing suite engineered for self-emissive OLED, QD-OLED, and WOLED panels. Isolates permanent burn-in, temporary image retention, near-black chrominance overshoot, and true per-pixel black levels.",
    inspectionTip: "Observe dark gray patterns (5% and 10% gray) in a pitch-black room to inspect OLED near-black vertical banding and panel uniformity.",
    browserLimitations: "OLED Automatic Brightness Limiter (ABL) will dynamically dim large full-white windows in browsers. Use smaller test patches to evaluate peak highlights.",
    sequence: [
      "/tests/black-level-test",
      "/tests/burn-in-test",
      "/tests/solid-color-test",
      "/tests/dead-pixel-test",
      "/tests/uniformity-test",
      "/tests/hdr-capability-test",
      "/tests/brightness-test",
      "/tests/grayscale-test"
    ],
    steps: [
      { title: "True Infinite Black Level", description: "Verify complete pixel shutoff in pure black scenes with zero light emission." },
      { title: "Burn-in & Image Retention", description: "Carefully inspect 5%, 15%, and 50% gray fields for static logo or HUD ghosting." },
      { title: "Subpixel Tint & Uniformity", description: "Check full-field magenta, red, and yellow for subpixel unevenness." },
      { title: "Dead / Inactive Subpixels", description: "Inspect high-density OLED subpixel matrices for failed individual emitters." },
      { title: "Near-Black Uniformity (5% Gray)", description: "Evaluate OLED vertical banding lines in low-light environments." },
      { title: "HDR Dynamic Range", description: "Test peak specular highlight response and wide color gamut presentation." },
      { title: "ABL & Brightness Curve", description: "Inspect luminance behavior across small vs. full-screen white windows." },
      { title: "Grayscale Tone Mapping", description: "Ensure smooth gradation without chrominance quantization or crush." }
    ]
  },
  {
    id: "laptop",
    route: "/monitor-inspection/laptop",
    title: "Laptop Display Inspection",
    shortDescription: "Quick checks for built-in laptop screens, scaling, and battery brightness.",
    longDescription: "A targeted inspection workflow for integrated laptop displays (MacBook Retina, Windows Ultrabooks, gaming laptops). Checks High-DPI display scaling, outdoor brightness, viewing angles, and optional touchscreen digitizers.",
    inspectionTip: "Connect your laptop to AC power when testing to prevent battery power-saving profiles from dimming the backlight or lowering refresh rates.",
    browserLimitations: "Laptop panel manufacturer specs (e.g. sRGB vs DCI-P3 percentage) are physical panel characteristics that require hardware colorimeter profiling.",
    sequence: [
      "/tests/resolution-checker",
      "/tests/dead-pixel-test",
      "/tests/solid-color-test",
      "/tests/brightness-test",
      "/tests/grayscale-test",
      "/tests/viewing-angle-test",
      "/tests/uniformity-test",
      "/tests/touch-screen-test",
      "/tests/refresh-rate-test"
    ],
    steps: [
      { title: "Resolution & Scaling (DPR)", description: "Verify logical viewport scaling vs. physical native panel resolution." },
      { title: "Dead Pixels on Compact Panel", description: "Check high-density laptop screens for microscopic dead or stuck subpixels." },
      { title: "Color Vibrancy & Saturation", description: "Check RGB saturation and color balance across standard display primaries." },
      { title: "Brightness & Contrast", description: "Verify maximum backlight output for indoor and outdoor usability." },
      { title: "Grayscale Steps", description: "Ensure shadow and highlight details are clearly distinguishable." },
      { title: "Viewing Angle Stability", description: "Check IPS vs TN contrast shifting as the laptop lid angle is tilted." },
      { title: "Edge Uniformity", description: "Inspect for bezel pinch marks or light leakage along thin laptop bezels." },
      { title: "Touchscreen Digitizer Check", description: "If equipped with a touchscreen, verify multi-touch responsiveness and tracking." },
      { title: "Refresh Rate (60Hz / 120Hz+)", description: "Confirm laptop high-refresh rate (e.g., ProMotion or 144Hz) is engaged." }
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
      "/tests/resolution-checker",
      "/tests/dead-pixel-test",
      "/tests/color-test",
      "/tests/grayscale-test",
      "/tests/black-level-test",
      "/tests/white-level-test",
      "/tests/uniformity-test",
      "/tests/blooming-test",
      "/tests/hdr-capability-test",
      "/tests/motion-blur-test",
      "/tests/refresh-rate-test"
    ],
    steps: [
      { title: "Resolution & Aspect Ratio (Overscan)", description: "Verify full 4K/1080p display output without edges cropped by TV overscan." },
      { title: "Dead Pixels on Large Screen", description: "Scan the large panel surface for cluster or isolated subpixel defects." },
      { title: "Color Rendition & Saturation", description: "Check primary and secondary color rendering across full screen." },
      { title: "Grayscale Tone Balance", description: "Ensure neutral color temperature without unwanted green or magenta tinting." },
      { title: "Black Level Calibration", description: "Tune HDMI black level (Full 0-255 vs Limited 16-235) to prevent shadow crush." },
      { title: "White Level & Highlights", description: "Ensure bright areas retain detail without blooming or clipping." },
      { title: "Uniformity & Dirty Screen Effect (DSE)", description: "Pan across a gray field to detect vertical banding or dark spots common in TVs." },
      { title: "Local Dimming & Blooming", description: "Evaluate haloing around bright objects against deep black backgrounds." },
      { title: "HDR Capabilities", description: "Verify TV HDR10 dynamic range handshake from the connected device." },
      { title: "Motion Blur & Judder", description: "Check motion clarity with native refresh rate before post-processing." },
      { title: "Frame Timing Verification", description: "Check stability and frame drops at 60Hz or 120Hz." }
    ]
  }
];

export function getWorkflowById(id: string): InspectionWorkflow | undefined {
  return inspectionWorkflows.find(w => w.id === id);
}

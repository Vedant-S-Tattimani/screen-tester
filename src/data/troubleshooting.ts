export type TroubleshootingCategory = "display" | "pixels" | "imageQuality" | "tv";

export interface TroubleshootingTestLink {
  label: string;
  testId: string;
  testPath: string;
}

export interface TroubleshootingTopic {
  id: string;
  title: string;
  category: TroubleshootingCategory;
  categoryTitle: string;
  symptom: string;
  possibleCauses: string[];
  checks: string[];
  whatScreenTesterCanTest: {
    description: string;
    links: TroubleshootingTestLink[];
  };
  whatScreenTesterCannotDetermine: string[];
  actions: string[];
  whenToStop: string;
}

export const TROUBLESHOOTING_CATEGORIES: Array<{ id: TroubleshootingCategory; label: string }> = [
  { id: "display", label: "Display Problems" },
  { id: "pixels", label: "Pixel Problems" },
  { id: "imageQuality", label: "Image Quality" },
  { id: "tv", label: "TV Problems" }
];

export const TROUBLESHOOTING_TOPICS: TroubleshootingTopic[] = [
  // =========================================================================
  // DISPLAY PROBLEMS
  // =========================================================================
  {
    id: "no-image",
    title: "No Image (Black / Blank Screen)",
    category: "display",
    categoryTitle: "Display Problems",
    symptom: "The monitor power LED may illuminate, but the panel remains pitch-black with zero image, desktop icons, or backlight illumination.",
    possibleCauses: [
      "Display power supply cord or external AC adapter disconnected or loose",
      "Monitor switched to wrong physical input source (e.g., HDMI 2 instead of DisplayPort 1)",
      "Loose, unlatched, or damaged video cable between GPU and monitor",
      "Source device in deep system sleep, hibernation, or GPU driver crash state",
      "Unsupported resolution/refresh rate combination sent by operating system during boot",
      "Internal panel backlight inverter, power delivery board, or T-Con logic board failure"
    ],
    checks: [
      "Observe the monitor power indicator LED: Is it off (no AC power), amber/orange (sleep/standby), or steady white/blue (active)?",
      "Press the monitor physical OSD menu buttons on the chassis: Does the built-in manufacturer menu appear on-screen? (If OSD appears, the panel and backlight work; the fault lies in the video source or cable)",
      "Reseat both ends of the DisplayPort or HDMI cable firmly into the GPU and monitor",
      "Ensure the video cable is plugged directly into the dedicated graphics card (GPU) PCIe bracket, NOT the motherboard integrated video port (unless using an APU/iGPU)",
      "Test with an alternate verified video cable or different physical input port"
    ],
    whatScreenTesterCanTest: {
      description: "Once basic video display is restored, Screen Tester can benchmark video signal stability and render continuous test patterns to ensure the link remains stable.",
      links: [
        { label: "Display Information", testId: "display-info", testPath: "/tests/display-info" },
        { label: "Resolution Checker", testId: "resolution-checker", testPath: "/tests/resolution-checker" }
      ]
    },
    whatScreenTesterCannotDetermine: [
      "Physical AC mains voltage or power brick DC output",
      "Motherboard PCIe slot lane negotiation or GPU hardware power rail faults",
      "Internal panel inverter circuit or backlight LED strip continuity"
    ],
    actions: [
      "Power cycle the monitor: Unplug AC power cord for 30 seconds, hold the monitor power button for 10 seconds, then reconnect",
      "Use Windows shortcut Win + Ctrl + Shift + B to restart the graphics driver subsystem",
      "Boot into OS Safe Mode or UEFI BIOS to force a basic 1024x768 60Hz video signal",
      "Test the monitor with a secondary video source (e.g., gaming console, laptop) to isolate whether the PC or the monitor is at fault"
    ],
    whenToStop: "Stop troubleshooting if you smell burnt electronics, hear high-pitched electrical capacitor whining, or if the built-in monitor OSD fails to appear when all video cables are disconnected."
  },
  {
    id: "no-signal",
    title: "No Signal / Cable Not Connected",
    category: "display",
    categoryTitle: "Display Problems",
    symptom: "The monitor powers on and displays an on-screen warning such as 'No Signal', 'Check Signal Cable', or enters power-saving sleep immediately.",
    possibleCauses: [
      "Incorrect physical input port selected in monitor OSD menu",
      "Video cable bandwidth exceeded or faulty pin contacts (bent DisplayPort pins or loose HDMI connector)",
      "USB-C / Thunderbolt dock, KVM switch, or display adapter failing to negotiate handshake",
      "Operating system outputting an unsupported pixel clock, refresh rate, or resolution",
      "GPU driver disabled or failing during Windows display initialization"
    ],
    checks: [
      "Cycle through monitor input sources manually using the chassis buttons (DisplayPort 1, DP 2, HDMI 1, HDMI 2, USB-C)",
      "Bypass any hubs, adapters, KVM switches, or passive dongles: connect the monitor directly to the PC",
      "Check DisplayPort version setting in monitor OSD (try toggling DP 1.4 down to DP 1.2 for older GPUs)",
      "Verify HDMI Deep Color / Enhanced format is supported by your GPU if using 4K 120Hz/144Hz"
    ],
    whatScreenTesterCanTest: {
      description: "Screen Tester verifies browser layout dimensions, detected color depth, and graphics compositor parameters once the video handshake is active.",
      links: [
        { label: "Display Information", testId: "display-info", testPath: "/tests/display-info" },
        { label: "Refresh Rate Test", testId: "refresh-rate-test", testPath: "/tests/refresh-rate-test" }
      ]
    },
    whatScreenTesterCannotDetermine: [
      "DisplayPort Display Stream Compression (DSC) handshake state",
      "HDMI TMDS / FRL signal integrity or physical eye diagram measurements",
      "Hardware KVM switch electronic switching states"
    ],
    actions: [
      "Ensure the cable is firmly seated until the DisplayPort latch clicks",
      "Swap to an officially certified VESA-certified DisplayPort or Ultra High Speed HDMI cable",
      "Connect a secondary monitor to access OS display settings and adjust refresh rate down to 60Hz",
      "Update your graphics card drivers via clean installation (e.g., DDU utility in Safe Mode)"
    ],
    whenToStop: "If multiple certified cables and multiple known-working video sources (e.g., laptop and desktop) all result in 'No Signal' while the OSD works, the monitor's input scalar board or physical port solder joints may be damaged."
  },
  {
    id: "wrong-resolution",
    title: "Wrong Resolution / Stretched / Letterboxed Display",
    category: "display",
    categoryTitle: "Display Problems",
    symptom: "Desktop appears fuzzy, text looks soft or pixelated, screen elements are stretched horizontally or vertically, or black borders (letterboxing/pillarboxing) appear around the desktop.",
    possibleCauses: [
      "Operating system set to a non-native resolution (e.g., 1080p on a 1440p or 4K panel)",
      "Operating system HiDPI scaling factor set too high or low (e.g., 150% scaling causing blur in non-integer scaled apps)",
      "GPU display scaling setting set to 'Maintain Aspect Ratio' with mismatched resolution input",
      "Video cable or adapter (HDMI 1.4 or passive converter) lacking bandwidth for native panel resolution at maximum refresh",
      "Monitor OSD aspect ratio mode set to '4:3', '1:1', or 'Fill' rather than 'Original / Auto'"
    ],
    checks: [
      "Check Windows Display Settings: Confirm the resolution matches the manufacturer rated native resolution marked with '(Recommended)'",
      "Inspect browser active viewport vs. physical panel pixel matrix",
      "Check GPU Control Panel (NVIDIA Control Panel / AMD Software / Intel Graphics): Ensure desktop scaling is handled by GPU or Display with correct aspect ratio",
      "Verify whether the cable protocol supports the native resolution (e.g., HDMI 1.4 is limited to 4K at 30Hz or 1440p at 75Hz)"
    ],
    whatScreenTesterCanTest: {
      description: "Screen Tester provides real-time resolution verification, pixel ratio detection, and high-frequency sharpness grids to instantly expose non-native scaling interpolation.",
      links: [
        { label: "Resolution Checker", testId: "resolution-checker", testPath: "/tests/resolution-checker" },
        { label: "Sharpness & Scaling Test", testId: "sharpness-test", testPath: "/tests/sharpness-test" },
        { label: "Display Information", testId: "display-info", testPath: "/tests/display-info" }
      ]
    },
    whatScreenTesterCannotDetermine: [
      "Physical panel glass pixel pitch in millimeters without user-provided diagonal dimensions",
      "Internal hardware scalar interpolation algorithms used by monitor firmware"
    ],
    actions: [
      "In Windows: Settings → System → Display → Set Display Resolution to the panel's native specification",
      "In macOS: System Settings → Displays → Select 'Default' or hold Option and click 'Scaled' to verify native mode",
      "Reset monitor OSD picture settings to factory default",
      "Replace legacy HDMI or DVI cables with a VESA-certified DisplayPort 1.4 or HDMI 2.1 cable"
    ],
    whenToStop: "If the native resolution option is completely absent from the OS display settings list even after updating GPU drivers and using certified cables, the monitor's EDID chip may be corrupted or unreadable over the cable's DDC pins."
  },
  {
    id: "wrong-refresh-rate",
    title: "Wrong Refresh Rate / Stuck at 60Hz",
    category: "display",
    categoryTitle: "Display Problems",
    symptom: "High-refresh monitor (144Hz, 240Hz, 360Hz) is running at 60Hz; cursor motion and fast scrolling feel sluggish, or higher refresh rates are missing from display settings.",
    possibleCauses: [
      "Operating system default refresh rate not updated after plugging in monitor",
      "Cable bandwidth limitation (e.g., HDMI 1.4 cable, low-grade DisplayPort cable without HBR3 support)",
      "Multi-monitor setup with mismatched refresh rates where OS desktop compositor synchronizes to lowest common denominator",
      "Monitor OSD internal setting requiring high refresh or overclock mode to be explicitly enabled in hardware menu",
      "GPU output port revision limitation (e.g., older GPU HDMI port limited to HDMI 2.0 while 4K 144Hz requires HDMI 2.1 or DP 1.4 with DSC)"
    ],
    checks: [
      "Open Windows Advanced Display Settings: Check 'Choose a refresh rate' dropdown",
      "Check monitor OSD settings: Is 'Overclocking' or 'High Refresh' enabled in the Gaming/Display menu?",
      "Verify cable specification: High-refresh 1440p/4K requires DisplayPort 1.4 or HDMI 2.1",
      "Test running a single monitor with all secondary monitors disconnected"
    ],
    whatScreenTesterCanTest: {
      description: "Screen Tester benchmarks browser requestAnimationFrame intervals against display vsync timestamps to observe the active operating refresh rate.",
      links: [
        { label: "Refresh Rate Test", testId: "refresh-rate-test", testPath: "/tests/refresh-rate-test" },
        { label: "Frame Rate & Motion Test", testId: "frame-rate-test", testPath: "/tests/frame-rate-test" }
      ]
    },
    whatScreenTesterCannotDetermine: [
      "Exact monitor physical hardware crystal oscillator frequency",
      "Variable Refresh Rate (VRR) dynamic minimum/maximum sync floors (which require native 3D DirectX/Vulkan execution)"
    ],
    actions: [
      "In Windows: Settings → System → Display → Advanced Display → Set 'Choose a refresh rate' to maximum advertised rate",
      "In NVIDIA Control Panel / AMD Software: Under 'Change Resolution', ensure the resolution is selected under the 'PC' section (not 'Ultra HD, HD, SD')",
      "Switch connection from HDMI to DisplayPort",
      "Update graphics card driver to latest official release"
    ],
    whenToStop: "If the monitor drops video signal (black screen) or flickers violently whenever selected at rated refresh rate, the video cable lacks required signal integrity or the monitor's mainboard cannot maintain high pixel clock stability."
  },
  {
    id: "screen-tearing",
    title: "Screen Tearing / Horizontal Line Splits",
    category: "display",
    categoryTitle: "Display Problems",
    symptom: "Horizontal shearing or 'split lines' appear across the screen during fast camera panning, video playback, or moving patterns, where upper and lower halves of the screen show different frames.",
    possibleCauses: [
      "Graphics card rendering frames out of sync with the monitor's refresh cycle (V-Sync disabled)",
      "Variable Refresh Rate (G-Sync / AMD FreeSync / VESA Adaptive-Sync) disabled or failing to engage",
      "Browser hardware acceleration disabled, forcing CPU software compositing",
      "Multi-monitor desktop window spanning across displays with differing refresh rates",
      "GPU framerate exceeding the monitor's maximum refresh ceiling"
    ],
    checks: [
      "Observe the tearing line: Does it occur continuously during video/browser animation, or only in full-screen games?",
      "Check browser settings: Confirm 'Use graphics acceleration when available' is turned ON",
      "Check GPU Control Panel: Ensure G-Sync / FreeSync is enabled for full-screen and windowed modes",
      "Check monitor OSD: Ensure Adaptive-Sync / FreeSync is toggled ON"
    ],
    whatScreenTesterCanTest: {
      description: "Screen Tester provides high-contrast horizontal moving bar patterns specifically engineered to reveal tearing boundaries across browser compositor cycles.",
      links: [
        { label: "Screen Tearing Test", testId: "screen-tearing-test", testPath: "/tests/screen-tearing-test" },
        { label: "Ghosting & Motion Test", testId: "ghosting-test", testPath: "/tests/ghosting-test" }
      ]
    },
    whatScreenTesterCannotDetermine: [
      "Direct VESA Adaptive-Sync DisplayPort auxiliary channel handshake states",
      "Real-time frametime variance of external DirectX/Vulkan game engines"
    ],
    actions: [
      "Enable V-Sync in global graphics control panel settings",
      "If using VRR (G-Sync/FreeSync): Set GPU framerate cap 3 FPS below monitor max refresh (e.g., 141 FPS for 144Hz) and enable V-Sync in driver settings",
      "Verify DisplayPort connection (G-Sync Compatible often requires DisplayPort on older GTX/RTX cards)",
      "Restart browser with hardware graphics acceleration enabled"
    ],
    whenToStop: "If screen tearing persists uniformly as a stationary static line across the exact same vertical coordinate regardless of video source or refresh rate, the panel's internal T-Con buffer memory may be defective."
  },
  {
    id: "flickering",
    title: "Display Flickering / Intermittent Blackouts",
    category: "display",
    categoryTitle: "Display Problems",
    symptom: "The screen rapidly flashes in brightness, micro-stutters, produces horizontal flashing scanlines, or intermittently cuts to complete black for 1-2 seconds before restoring.",
    possibleCauses: [
      "Substandard, unshielded, or excessively long video cable suffering from high-bandwidth signal attenuation",
      "Pulse Width Modulation (PWM) backlight dimming operating at low frequencies",
      "G-Sync / FreeSync brightness flickering near lower refresh rate floor (LFC transition zone)",
      "Mismatched ground loop or electrical interference from nearby heavy appliances / AC power bars",
      "Outdated or corrupt GPU display drivers",
      "Failing monitor power supply capacitors or thermal overheating of internal scalar chip"
    ],
    checks: [
      "Does the blackout occur when you stand up or touch your desk? (Indicates electrostatic discharge traveling through an unshielded video cable)",
      "Does flickering worsen at low monitor brightness settings? (Suggests PWM backlight modulation)",
      "Does flickering occur only in games with fluctuating framerates? (Suggests VRR gamma curve fluctuation)",
      "Check video cable connection: Ensure cables are not tightly coiled near high-voltage AC power strips"
    ],
    whatScreenTesterCanTest: {
      description: "Screen Tester renders high-contrast solid fields, stepped grayscale, and alternating line patterns to help observe optical flicker and PWM sensitivity safely.",
      links: [
        { label: "Screen Flicker Test", testId: "screen-flicker-test", testPath: "/tests/screen-flicker-test" },
        { label: "Uniformity Test", testId: "uniformity-test", testPath: "/tests/uniformity-test" }
      ]
    },
    whatScreenTesterCannotDetermine: [
      "Physical PWM switching frequency in Hertz (requires an oscilloscope and photodiode sensor)",
      "AC mains ripple voltage or capacitor equivalent series resistance (ESR)"
    ],
    actions: [
      "Replace video cable with an independently certified, shielded VESA DisplayPort or HDMI cable under 2 meters in length",
      "In monitor OSD: Disable VRR / FreeSync temporarily to isolate whether panel gamma instability is the root cause",
      "Increase monitor brightness above 40-50% if the panel uses low-frequency PWM dimming",
      "Plug the monitor and computer into the same surge protector to eliminate ground potential differences"
    ],
    whenToStop: "IMPORTANT: Stop testing immediately if visual flicker causes dizziness, headache, or eye strain. Seek professional hardware service if the monitor makes audible buzzing, clicking, or smells of hot components."
  },

  // =========================================================================
  // PIXEL PROBLEMS
  // =========================================================================
  {
    id: "dead-stuck-bright-pixel",
    title: "Dead, Stuck & Bright Pixel Flaws",
    category: "pixels",
    categoryTitle: "Pixel Problems",
    symptom: "A tiny pinpoint dot remains permanently black, glowing bright white, or frozen on a single color (red, green, blue) regardless of what is displayed.",
    possibleCauses: [
      "Dead Pixel: Complete loss of electrical power to the pixel transistor, rendering it permanently unlit (appears black on white/bright backgrounds)",
      "Stuck Pixel: Thin-film transistor (TFT) frozen in an open/energized state, keeping one subpixel permanently illuminated (appears bright red, green, or blue on dark backgrounds)",
      "Bright Pixel (Hot Pixel): All three RGB subpixels stuck open together, appearing as a permanent pinpoint white dot on dark fields",
      "Subpixel Defect: One individual red, green, or blue sub-element out of the three composing a pixel is defective",
      "Debris / Dust Particle: Foreign particle trapped between the LCD liquid crystal substrate and the backlight diffuser during factory cleanroom assembly"
    ],
    checks: [
      "Distinguish dust from dead pixels: View the dot from a sharp side angle. If the dark dot appears to sit slightly above the illuminated pixel grid and casts a parallax shadow, it is trapped dust, not an electrical dead pixel.",
      "Check background contrast: Is the flaw visible on pure white (dead pixel) or on pure black (stuck/bright pixel)?",
      "Count defect locations: Record precise screen coordinates for comparison against your manufacturer's ISO 9241-307 pixel defect warranty class."
    ],
    whatScreenTesterCanTest: {
      description: "Screen Tester offers solid primary and monochrome fields to inspect subpixel states, allows recording exact coordinate markers, and provides an experimental localized rapid color cycling tool.",
      links: [
        { label: "Dead Pixel Test", testId: "dead-pixel-test", testPath: "/tests/dead-pixel-test" },
        { label: "Stuck Pixel Fixer", testId: "stuck-pixel-fixer", testPath: "/tests/stuck-pixel-fixer" },
        { label: "Bright Pixel Test", testId: "bright-pixel-test", testPath: "/tests/bright-pixel-test" }
      ]
    },
    whatScreenTesterCannotDetermine: [
      "Microscopic physical transistor gate breakdown inside panel substrate",
      "Eligibility for manufacturer replacement without consulting specific vendor warranty terms"
    ],
    actions: [
      "Use Screen Tester's Stuck Pixel Fixer to cycle rapid high-contrast color stimulation directly over temporarily stuck subpixels",
      "Gently clean the screen surface with a microfiber cloth to ensure the mark is not an external surface smudge",
      "Do NOT apply aggressive mechanical pressure or rub the glass with hard objects, as this can permanently crack the delicate liquid crystal cell array",
      "Consult your monitor warranty policy (many brands offer Zero Bright Dot warranties within the first 30 to 90 days)"
    ],
    whenToStop: "If visual cycling patterns do not revive the pixel within 30 to 60 minutes, the transistor gate has suffered permanent physical breakdown and cannot be repaired by software."
  },

  // =========================================================================
  // IMAGE QUALITY
  // =========================================================================
  {
    id: "washed-out-colors",
    title: "Washed Out Colors / Incorrect Contrast & Tint",
    category: "imageQuality",
    categoryTitle: "Image Quality",
    symptom: "Colors appear faded, milky, or grayed out; blacks look like dark gray, highlights lack vibrancy, or the display has an unnatural greenish/yellowish color cast.",
    possibleCauses: [
      "RGB Output Dynamic Range mismatch: GPU outputting 'Limited Range' (16-235) while monitor expects 'Full Range' (0-255), causing elevated black levels",
      "Windows HDR toggle enabled while viewing Standard Dynamic Range (SDR) content on a display with low peak luminance (<400 nits)",
      "Mismatched ICC color profile installed by operating system or third-party calibration software",
      "Monitor OSD color preset set to an inaccurate mode (e.g., 'Cool', 'Vivid', 'FPS' instead of 'sRGB' or 'Standard')",
      "Color bit depth set to 6-bit with aggressive temporal dithering (FRC) rather than 8-bit or 10-bit"
    ],
    checks: [
      "Check GPU Control Panel: Under 'Output Dynamic Range', verify whether it is set to 'Full' (0-255) rather than 'Limited'",
      "In Windows: Toggle HDR off (Win + Alt + B) to check whether SDR colors immediately regain depth and punch",
      "Check monitor OSD: Reset color temperature to 6500K / Warm or sRGB mode"
    ],
    whatScreenTesterCanTest: {
      description: "Screen Tester renders stepped grayscale, 256-step contrast ramps, and primary color swatches to identify clipping, black crush, or color cast visually.",
      links: [
        { label: "Colour Contrast Test", testId: "contrast-test", testPath: "/tests/contrast-test" },
        { label: "Color Test", testId: "color-test", testPath: "/tests/color-test" },
        { label: "Color Banding Test", testId: "color-banding-test", testPath: "/tests/color-banding-test" }
      ]
    },
    whatScreenTesterCannotDetermine: [
      "Laboratory Delta E (ΔE) color deviation without hardware colorimeter or spectrophotometer",
      "Absolute CIE 1931 xy coordinate chromaticity values"
    ],
    actions: [
      "In NVIDIA/AMD Control Panel: Change Output Dynamic Range from 'Limited' to 'Full'",
      "In Windows Color Management: Remove any corrupt custom ICC profiles and set system profile to 'sRGB IEC61966-2.1'",
      "If using HDR: Adjust the 'SDR content brightness' slider in Windows Display Settings to match room lighting",
      "Switch monitor OSD color temperature from 'Cool' (9300K) to 'Warm / D65' (6500K)"
    ],
    whenToStop: "If the screen has a severe uniform pink, magenta, or green tint that persists across all inputs and cables, the monitor's scalar color processing matrix or internal ribbon cable has experienced physical hardware failure."
  },
  {
    id: "blurry-text",
    title: "Blurry / Soft Text & Subpixel Fringing",
    category: "imageQuality",
    categoryTitle: "Image Quality",
    symptom: "Text appears fuzzy, edges have colored halos (red/cyan or blue/yellow fringes), or letters appear soft and difficult to read across desktop applications.",
    possibleCauses: [
      "Display running below native resolution, causing bilinear scaling blur",
      "Non-integer operating system scaling factor (e.g., 125% or 175% scaling causing pixel interpolation in legacy Win32 apps)",
      "Subpixel layout mismatch: Operating system ClearType tuned for standard RGB subpixel stripes on a panel with BGR, WRGB, or QD-OLED triangular subpixel geometry",
      "Monitor OSD 'Sharpness' setting set too low (causing artificial blur) or too high (causing white halos around black letters)",
      "Browser page zoom not set to 100% (Ctrl + 0)"
    ],
    checks: [
      "Verify display native resolution: Ensure operating system resolution matches the exact physical panel resolution",
      "Check monitor OSD Sharpness: Set sharpness to 50% (neutral default on most modern monitors)",
      "Inspect text edges closely: Are there colored red or blue fringes on the left and right edges of black text characters?",
      "Verify browser zoom is at exactly 100%"
    ],
    whatScreenTesterCanTest: {
      description: "Screen Tester provides fine 1-pixel alternating line patterns, subpixel orientation grids, and high-frequency sharpness charts to inspect text and edge rendering.",
      links: [
        { label: "Sharpness Test", testId: "sharpness-test", testPath: "/tests/sharpness-test" },
        { label: "Resolution Checker", testId: "resolution-checker", testPath: "/tests/resolution-checker" }
      ]
    },
    whatScreenTesterCannotDetermine: [
      "Direct physical subpixel arrangement without optical microscope inspection",
      "Operating system internal ClearType gamma registry parameters"
    ],
    actions: [
      "In Windows: Run 'Adjust ClearType text' wizard from the Start menu and select the sharpest sample tiles",
      "Set Windows Display Scaling to an integer multiple (100%, 200%) or recommended scaling",
      "In monitor OSD: Adjust Sharpness back to neutral (usually 50% or off) to eliminate edge ringing halos",
      "For QD-OLED or WOLED displays: Consider third-party font rendering tools (e.g., MacType or BetterClearType) designed for non-standard subpixel layouts"
    ],
    whenToStop: "If text is sharp in some applications but blurry in others, the issue is software-level DPI scaling inside legacy applications, not a monitor hardware defect."
  },
  {
    id: "uneven-brightness",
    title: "Uneven Brightness / Vignetting / Dirty Screen Effect",
    category: "imageQuality",
    categoryTitle: "Image Quality",
    symptom: "One side or corner of the screen is visibly dimmer than the center, dark cloudy patches appear across solid backgrounds, or vertical/horizontal bands are visible when scrolling.",
    possibleCauses: [
      "Natural panel luminance falloff: Most consumer LCD monitors have 10-15% luminance falloff toward the outer edges",
      "Diffuser sheet warpage or aging fluorescent/LED light guide plates",
      "Dirty Screen Effect (DSE): Microscopic manufacturing irregularities in the anti-glare matte coating or liquid crystal substrate",
      "Room ambient lighting: Harsh directional desk lamps or windows casting reflections that create the illusion of uneven panel brightness"
    ],
    checks: [
      "Display a solid 50% neutral gray field: Observe whether the center is brighter than the corners (standard edge falloff) or whether irregular cloud patches exist",
      "Eliminate room reflections: Turn off ambient desk lamps and draw window shades to evaluate the panel in balanced dim lighting",
      "Check viewing position: Ensure your eyes are positioned perpendicular to the center of the display"
    ],
    whatScreenTesterCanTest: {
      description: "Screen Tester displays uniform monochrome and neutral gray fields (25%, 50%, 75%) to allow thorough visual inspection across the entire panel surface.",
      links: [
        { label: "Uniformity Test", testId: "uniformity-test", testPath: "/tests/uniformity-test" },
        { label: "Brightness Test", testId: "brightness-test", testPath: "/tests/brightness-test" }
      ]
    },
    whatScreenTesterCannotDetermine: [
      "ANSI 9-point or 25-point photometric luminance measurement in nits across the panel grid",
      "Delta L* lightness uniformity percentages without a robotic positioning colorimeter"
    ],
    actions: [
      "In monitor OSD: Check whether a 'Uniformity Compensation' (DUC) setting exists and toggle it ON",
      "Adjust monitor tilt and height so your line of sight is centered perpendicular to the screen",
      "If the issue consists of a single completely dark edge or quadrant, an edge-lit LED backlight strip segment may have failed"
    ],
    whenToStop: "If a distinct horizontal or vertical strip of the backlight is completely unlit (pitch dark), a backlight driver channel or LED zone has suffered physical hardware failure requiring panel replacement."
  },
  {
    id: "backlight-bleed-ips-glow",
    title: "Backlight Bleed vs. IPS Glow",
    category: "imageQuality",
    categoryTitle: "Image Quality",
    symptom: "Light leaks into dark scenes in a dimly lit room, appearing as bright patches along the bezel borders or silvery/golden sheen in the screen corners.",
    possibleCauses: [
      "Backlight Bleed: Mechanical bezel frame pinching the panel edges during assembly, causing light from the backlight LEDs to escape around the liquid crystal layer",
      "IPS Glow: An inherent optical characteristic of In-Plane Switching liquid crystals where light escapes at oblique viewing angles due to crystal orientation",
      "Camera exposure exaggeration: Smartphone cameras in night mode automatically overexpose dark scenes, making normal glow look catastrophic"
    ],
    checks: [
      "Perform the Angle Test: Look at the glowing patch from directly in front, then move your head 30-40 degrees to the side. If the glow shifts position, changes color, or diminishes, it is IPS GLOW. If the bright patch remains locked in the exact same spot regardless of head position, it is BACKLIGHT BLEED.",
      "Check viewing distance: Sit at an arm's length (50-70cm) from the monitor. IPS glow naturally increases when sitting too close to large panels."
    ],
    whatScreenTesterCanTest: {
      description: "Screen Tester renders pure black fields to allow structured dark-room visual inspection of edge pinching and off-axis optical glow.",
      links: [
        { label: "Backlight Bleed Test", testId: "backlight-bleed-test", testPath: "/tests/backlight-bleed-test" },
        { label: "Viewing Angle Test", testId: "viewing-angle-test", testPath: "/tests/viewing-angle-test" }
      ]
    },
    whatScreenTesterCannotDetermine: [
      "Measured mechanical bezel pressure in Newtons/cm²",
      "Absolute minimum black floor luminance (nits) without an optical spectrophotometer"
    ],
    actions: [
      "Lower monitor brightness to appropriate dark-room levels (usually 80-120 nits, roughly 20-30% on most monitors)",
      "Increase distance between your eyes and the display to reduce the viewing angle to the corners",
      "Ensure the monitor chassis is not twisted or pinched by an overtightened monitor arm mounting plate",
      "Understand that 100% zero glow is optically impossible on standard IPS panels without an expensive polarizing filter (ATW polarizer)"
    ],
    whenToStop: "If severe backlight bleed is visible during daytime room lighting on non-black content (such as web browsing or games), the bezel frame has sustained physical pressure damage and should be returned under warranty."
  },
  {
    id: "hdr-not-working",
    title: "HDR Not Working / Washed Out or Gray in HDR",
    category: "imageQuality",
    categoryTitle: "Image Quality",
    symptom: "Toggling HDR in Windows or games causes the desktop to look dull, foggy, or dark; HDR videos do not trigger high brightness; or the HDR toggle is grayed out in settings.",
    possibleCauses: [
      "Windows 'Use HDR' toggle disabled in Display Settings",
      "Video cable connection bandwidth insufficient for 10-bit HDR (requires HDMI 2.0b/2.1 or DisplayPort 1.4)",
      "Monitor OSD HDR mode disabled or set to an incompatible emulation preset",
      "Display has low peak brightness (e.g., 'HDR400' certification with 350-400 nits and no local dimming), which cannot deliver true high dynamic range",
      "Browser hardware acceleration disabled, preventing OS HDR metadata passthrough"
    ],
    checks: [
      "In Windows: Settings → System → Display → HDR: Verify 'HDR video streaming' and 'Use HDR' are supported",
      "Inspect monitor specifications: Does the display feature true local dimming (Mini-LED / OLED), or is it an edge-lit SDR panel with software HDR emulation?",
      "In monitor OSD: Confirm HDR is set to 'Auto' or 'Enabled'"
    ],
    whatScreenTesterCanTest: {
      description: "Screen Tester tests whether the browser environment reports CSS high dynamic range query support and renders high-contrast luminance step charts.",
      links: [
        { label: "HDR Capability Test", testId: "hdr-capability-test", testPath: "/tests/hdr-capability-test" },
        { label: "Colour Contrast Test", testId: "contrast-test", testPath: "/tests/contrast-test" }
      ]
    },
    whatScreenTesterCannotDetermine: [
      "Peak specular highlight luminance in nits (e.g., 600 vs 1000 nits)",
      "Number and switching latency of physical local dimming zones"
    ],
    actions: [
      "In Windows HDR settings: Adjust the 'SDR content brightness slider' so desktop applications look natural when HDR is active",
      "Download the official 'Windows HDR Calibration' app from Microsoft Store to create an accurate HDR color profile",
      "Switch from HDMI to a certified DisplayPort 1.4 cable with DSC support",
      "In Chromium browsers: Ensure 'Hardware-accelerated video decode' is enabled in chrome://flags"
    ],
    whenToStop: "If your monitor is an edge-lit panel with no local dimming (DisplayHDR 400), disabling HDR for standard desktop use is often recommended by display experts for superior daily contrast and color accuracy."
  },

  // =========================================================================
  // TV PROBLEMS
  // =========================================================================
  {
    id: "tv-overscan-fit",
    title: "Image Doesn't Fit TV Screen (Overscan / Cropped Edges)",
    category: "tv",
    categoryTitle: "TV Problems",
    symptom: "When connecting a PC, Mac, or laptop to a television, the Windows taskbar or Mac menu bar is cut off at the screen edges, or a thick black border surrounds the image.",
    possibleCauses: [
      "Television 'Overscan' legacy feature enabled: Designed for analog broadcast signals, overscan zooms the picture by 2-5%, cropping desktop borders",
      "TV picture aspect ratio mode set to '16:9' or 'Zoom' instead of 'Just Scan', 'Screen Fit', or '1:1'",
      "PC graphics driver outputting underscan/overscan software compensation"
    ],
    checks: [
      "Examine television remote control: Look for a 'P.SIZE', 'Aspect Ratio', or 'Format' button",
      "Look at the taskbar clock and start button: Are they partially cut off by the television frame?",
      "Verify GPU control panel has scaling set to 100% without software underscan sliders adjusted"
    ],
    whatScreenTesterCanTest: {
      description: "Screen Tester renders corner boundary boxes and 1-pixel edge registration markers to immediately verify whether 1:1 pixel mapping is active.",
      links: [
        { label: "Resolution Checker", testId: "resolution-checker", testPath: "/tests/resolution-checker" },
        { label: "Sharpness Test", testId: "sharpness-test", testPath: "/tests/sharpness-test" }
      ]
    },
    whatScreenTesterCannotDetermine: [
      "Television proprietary firmware picture mode settings without physical remote control access"
    ],
    actions: [
      "On the TV: Open Picture Settings → Aspect Ratio / Screen Fit → Select 'Just Scan' (LG/Samsung), 'Full 100%' / 'Dot by Dot' (Sony/Panasonic), or 'Direct'",
      "On Samsung TVs: Label the HDMI input as 'PC' or 'PC DVI' in the TV source list to automatically force 4:4:4 chroma and 1:1 pixel mapping",
      "On LG TVs: In Home Dashboard → Edit Inputs → Change the input icon to 'PC'",
      "In GPU Control Panel: Ensure desktop resizing is set to 'No Scaling' at native 1080p/4K resolution"
    ],
    whenToStop: "Once 'Just Scan' or PC mode is engaged on the television, the full desktop boundary will snap precisely to the outer bezel edges with zero cropping."
  }
];

export function getTroubleshootingById(id: string): TroubleshootingTopic | undefined {
  return TROUBLESHOOTING_TOPICS.find(topic => topic.id === id);
}

export function getTroubleshootingByCategory(category: TroubleshootingCategory): TroubleshootingTopic[] {
  return TROUBLESHOOTING_TOPICS.filter(topic => topic.category === category);
}

export function getTroubleshootingByTestId(testId: string): TroubleshootingTopic | undefined {
  const cleanId = testId.replace(/^\//, "").replace(/^tests\//, "");
  return TROUBLESHOOTING_TOPICS.find(topic => 
    topic.whatScreenTesterCanTest.links.some(link => link.testId === cleanId)
  );
}

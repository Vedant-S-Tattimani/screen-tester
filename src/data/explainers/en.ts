import { ExplainerData, ExplainerLabels } from "./types";

export const EN_LABELS: ExplainerLabels = {
  overviewHeading: "Display Inspection Overview",
  whatToLookForHeading: "What to Look For During Inspection",
  boundariesHeading: "Measurement Boundaries & Technical Honesty",
  canObserveLabel: "What Screen Tester Can Observe",
  cannotMeasureLabel: "What the Browser Cannot Reliably Measure",
  interpretationHeading: "Interpreting Your Observations",
  nextStepsHeading: "Recommended Next Steps",
};

export const EN_EXPLAINERS: Record<string, ExplainerData> = {
  "dead-pixel-test": {
    overview: "A dead pixel is a permanently unpowered liquid crystal subpixel or OLED emitter that remains completely dark regardless of the signal sent to it. On bright backgrounds—especially pure white, cyan, and yellow—dead pixels stand out as sharp, static black or darkened specks.",
    whatToLookFor: [
      {
        label: "Static Dark Dots on White/Light Screens",
        description: "A tiny black point that does not change or illuminate as you cycle through bright solid backgrounds indicates a dead pixel."
      },
      {
        label: "Distinguishing Dead Pixels from Dust",
        description: "Surface dust shifts when viewed from different angles and can be gently wiped off. A true dead pixel sits behind the outer polarizing filter."
      },
      {
        label: "Subpixel vs Full Pixel Defects",
        description: "If only one subpixel (red, green, or blue) has failed, the pixel will appear slightly discolored rather than pitch black on white."
      },
      {
        label: "Cluster Defects",
        description: "Multiple dead pixels clustered in a small area represent a severe panel defect and generally qualify for immediate manufacturer warranty replacement."
      }
    ],
    canObserve: [
      "Visual identification of unlit pixels across solid primary and secondary backgrounds",
      "Exact screen coordinates and count of suspect dark specks across display zones",
      "Contrast validation between background luminance and unpowered subpixels"
    ],
    cannotMeasure: [
      "Underlying thin-film transistor (TFT) electrical continuity or voltage state",
      "Automatic detection without user human visual inspection",
      "Physical manufacturing defect classification under glass layers"
    ],
    interpretation: "Dead pixels are caused by microscopic transistor failures during panel fabrication or physical impact. Most display manufacturers follow ISO 9241-307 Class 1 or Class 2 guidelines, which define acceptable thresholds (usually 2 to 5 dead subpixels per million).",
    nextSteps: {
      text: "If you detect stuck subpixels that remain lit instead of black, use our dedicated exerciser tool to attempt recovery.",
      actionLabel: "Launch Stuck Pixel Fixer",
      actionHref: "/tests/stuck-pixel-fixer"
    }
  },

  "stuck-pixel-test": {
    overview: "Unlike a dead pixel that stays permanently dark, a stuck pixel is caused by a liquid crystal cell stuck in an open state, allowing backlight to pass through continuously. It appears as a persistent bright colored dot—typically red, green, blue, cyan, magenta, or pure white—most visible against solid black and dark backgrounds.",
    whatToLookFor: [
      {
        label: "Bright Colored Points on Pure Black",
        description: "Inspect a pure black screen in a darkened room. Any sharp dot glowing red, green, blue, or yellow is a stuck subpixel."
      },
      {
        label: "Complementary Color Testing",
        description: "A green stuck subpixel will disappear against a green background but glow intensely against red, blue, or black backgrounds."
      },
      {
        label: "Hot White Pixels",
        description: "If all three subpixels (RGB) are permanently stuck open, the point will appear as a static white dot on dark backgrounds."
      },
      {
        label: "Distinction from Backlight Bleed",
        description: "Stuck pixels are single-pixel pinpricks of light, whereas backlight bleed produces diffuse, cloud-like patches along display edges."
      }
    ],
    canObserve: [
      "Visual identification of illuminated subpixels against dark and complementary backgrounds",
      "Isolation of individual defective subpixel color channels (R, G, or B)",
      "Screen quadrant mapping of defective pixels"
    ],
    cannotMeasure: [
      "Liquid crystal chemical viscosity or physical alignment state",
      "Transistor gate switching speed or electrical resistance",
      "Guaranteed permanence of the defect without prolonged observation"
    ],
    interpretation: "Stuck pixels frequently occur when a liquid crystal molecule fails to return to its relaxed state, often due to manufacturing irregularities or microscopic electrical charges. Unlike dead pixels, temporarily stuck pixels can sometimes be loosened using visual stimulation.",
    nextSteps: {
      text: "Have you located a stuck pixel? Attempt rapid visual subpixel stimulation with our localized color exerciser.",
      actionLabel: "Try Stuck Pixel Fixer",
      actionHref: "/tests/stuck-pixel-fixer"
    }
  },

  "stuck-pixel-fixer": {
    overview: "The Stuck Pixel Fixer uses localized high-frequency color cycling and visual noise patterns to rapidly excite liquid crystal molecules. Rapidly alternating primary and secondary colors forces subpixel transistors and liquid crystal cells to toggle states at high speed, which can occasionally release a temporarily stuck subpixel.",
    whatToLookFor: [
      {
        label: "Targeted Box Alignment",
        description: "Position the animated stimulation box directly over the stuck pixel to avoid distracting screen-wide strobing."
      },
      {
        label: "Pattern Selection",
        description: "Alternate between RGB Cycle (broad stimulation) and Color Noise (high-frequency random excitation) for optimal results."
      },
      {
        label: "Session Duration",
        description: "Run stimulation for 15 to 30 minutes, then pause and inspect against pure black to verify if the pixel has freed itself."
      },
      {
        label: "Visual Sensitivity Notice",
        description: "If you experience dizziness, headache, or eye strain, stop stimulation immediately. Never use if photosensitive."
      }
    ],
    canObserve: [
      "Real-time visual playback of high-speed RGB cycling and randomized subpixel noise patterns",
      "Precise localized positioning and timer duration tracking directly in your browser",
      "Visual confirmation of whether pixel responsiveness changes before and after stimulation"
    ],
    cannotMeasure: [
      "Hardware-level electrical repair of physically damaged or burned out TFT transistors",
      "Any guaranteed recovery percentage—success depends entirely on physical panel chemistry",
      "Automatic software repair of dead (permanently unpowered black) pixels"
    ],
    interpretation: "Software exercisers work exclusively on temporarily stuck liquid crystal cells. If a subpixel is physically detached, fractured, or completely dead (unpowered), software stimulation cannot revive it. If stimulation fails after repeated sessions, consult manufacturer warranty terms.",
    nextSteps: {
      text: "After running stimulation, switch back to the Stuck Pixel Test to inspect the area against pure black.",
      actionLabel: "Verify with Stuck Pixel Test",
      actionHref: "/tests/stuck-pixel-test"
    }
  },

  "refresh-rate-test": {
    overview: "Your display refresh rate (measured in Hertz, Hz) indicates how many times per second the screen reconstructs the image. This test uses the browser's high-resolution animation clock (requestAnimationFrame) to observe frame delivery pacing, detect dropped frames, and verify whether the browser is matching your operating system's configured refresh rate.",
    whatToLookFor: [
      {
        label: "Reported vs Configured Refresh Rate",
        description: "Verify that the reported value matches your display's target (e.g. 60Hz, 120Hz, 144Hz, 240Hz, or 360Hz)."
      },
      {
        label: "Frame Pacing & Jitter",
        description: "Watch the inter-frame time delta graph. A stable 144Hz display should deliver frames at consistent ~6.94ms intervals."
      },
      {
        label: "Browser Frame Capping",
        description: "If a 144Hz monitor reports exactly 60Hz, your browser or OS display settings may be capped to save battery or missing GPU flags."
      },
      {
        label: "Moving Indicator Smoothness",
        description: "Inspect the moving bar. On high-refresh displays, the animation should glide with minimal judder or stutter."
      }
    ],
    canObserve: [
      "Browser requestAnimationFrame callback frequency and delta-time variance",
      "Calculated browser animation FPS and frame pacing consistency",
      "Windowed compositor sync delivery in the active browser tab"
    ],
    cannotMeasure: [
      "Physical panel hardware refresh rate independent of browser compositor limits",
      "DisplayPort or HDMI cable link bandwidth and packet timing",
      "Oscilloscope-level vertical blanking intervals (VBLANK) or panel overdrive timing"
    ],
    interpretation: "Web browsers sync their rendering loops to the display compositor via vsync. However, power-saving profiles, multi-monitor setups with mismatched refresh rates, or background tab throttling can cause the browser to render below the monitor's native capability.",
    nextSteps: {
      text: "Is your refresh rate capped at 60Hz on a gaming monitor? Check our guide on configuring OS and GPU display refresh rates.",
      actionLabel: "Read Refresh Rate Troubleshooting",
      actionHref: "/knowledge-base/troubleshooting#refresh-rate-capped"
    }
  },

  "ghosting-test": {
    overview: "Motion ghosting appears as trailing shadows or smeared replicas behind moving objects. It occurs when liquid crystal molecules take longer to transition between color states (pixel response time) than the duration of a single refresh frame. This test renders moving blocks against various background shades to expose response-time trailing and overdrive coronas.",
    whatToLookFor: [
      {
        label: "Dark Trailing Shadows (Traditional Ghosting)",
        description: "A dark smear trailing behind a moving object indicates slow dark-to-light liquid crystal transitions, common on VA panels."
      },
      {
        label: "Bright Halos / Coronas (Inverse Ghosting)",
        description: "A bright, glowing trail behind the object means monitor Overdrive (OD) or Response Time setting is too aggressive (overshoot)."
      },
      {
        label: "Color-Specific Trailing",
        description: "Notice whether trailing is worse on red, green, or dark gray backgrounds. Transition times vary greatly across color pairs."
      },
      {
        label: "Pursuit Camera Observation",
        description: "Track the moving object with your eyes or a moving camera to isolate panel response trailing from retinal motion blur."
      }
    ],
    canObserve: [
      "Visual presence of trailing edges, smearing, and overshoot coronas across customizable speeds",
      "Color-pair contrast sensitivity comparison (light-on-dark vs dark-on-light transitions)",
      "Visual impact of adjusting your monitor's physical Overdrive / Response Time OSD settings"
    ],
    cannotMeasure: [
      "Laboratory Gray-to-Gray (GtG) response time in exact milliseconds",
      "Photometric pursuit camera light-intensity decay curves",
      "Subpixel liquid crystal voltage response curves"
    ],
    interpretation: "Ghosting is fundamentally determined by panel technology (TN is fast but poor color, IPS is balanced, VA often exhibits dark-level smearing, OLED has near-instant response). Tuning your monitor's OSD 'Response Time' or 'Overdrive' setting to Medium usually achieves the best balance between ghosting and overshoot.",
    nextSteps: {
      text: "Want to learn how monitor overdrive works and how to eliminate inverse ghosting halos?",
      actionLabel: "Read Ghosting & Motion Blur Guide",
      actionHref: "/knowledge-base/monitor-ghosting-and-motion-blur"
    }
  },

  "motion-blur-test": {
    overview: "Unlike ghosting (which stems from slow pixel response), motion blur on modern flat panels is predominantly caused by sample-and-hold display mechanics. Because the display holds each image frame continuously until the next refresh, your eyes track smooth motion across a static image, creating perceived retinal blur.",
    whatToLookFor: [
      {
        label: "Detail Retention at High Velocity",
        description: "Observe fine vertical lines and text as they travel across the screen. Notice where fine detail blends together."
      },
      {
        label: "Speed Comparison",
        description: "Compare low-speed (240 px/s) vs high-speed (960 px/s) motion to see how eye tracking blur scales with velocity."
      },
      {
        label: "Black Frame Insertion (BFI) Effects",
        description: "If your monitor has a backlight strobing feature (ULMB, ELMB, DyAc), enabling it dramatically sharpens moving patterns."
      },
      {
        label: "OLED Sample-and-Hold Blur",
        description: "Even with 0.1ms instant pixel response, sample-and-hold blur will still occur at 60Hz or 120Hz without strobing."
      }
    ],
    canObserve: [
      "Perceptual motion blur differences across varying horizontal velocities and refresh rates",
      "Visual sharpness improvements when using hardware backlight strobing / BFI modes",
      "Contrast between sharp static edges and blurred moving contours"
    ],
    cannotMeasure: [
      "Physical Moving Picture Response Time (MPRT) in exact milliseconds",
      "Retinal light integration curves of human vision",
      "Backlight strobing duty cycle percentage"
    ],
    interpretation: "To reduce sample-and-hold blur, displays must either increase refresh rate (shortening each frame's display duration) or implement backlight strobing (inserting dark intervals to clear retinal persistence).",
    nextSteps: {
      text: "Compare with the Refresh Rate Test to understand how higher Hz reduces motion blur.",
      actionLabel: "Inspect Refresh Rate",
      actionHref: "/tests/refresh-rate-test"
    }
  },

  "vrr-test": {
    overview: "Variable Refresh Rate (VRR)—including NVIDIA G-Sync, AMD FreeSync, and VESA Adaptive-Sync—dynamically synchronizes your monitor's refresh cycles to the GPU's frame rendering rate. This test modulates animation delivery rates to visually inspect adaptive frame pacing, tearing, and judder in your browser.",
    whatToLookFor: [
      {
        label: "Screen Tearing Artifacts",
        description: "Look for horizontal split lines where the top and bottom of the image display different frames simultaneously."
      },
      {
        label: "Frame Judder & Stutter",
        description: "Observe whether the moving indicator glides smoothly or exhibits micro-pauses as rendering frequency shifts."
      },
      {
        label: "Windowed vs Fullscreen VRR",
        description: "Many GPU drivers only activate G-Sync/FreeSync in true fullscreen applications unless configured for windowed mode."
      },
      {
        label: "LFC (Low Framerate Compensation)",
        description: "When framerate drops below your monitor's minimum VRR range (e.g. below 48Hz), observe whether frames duplicate smoothly."
      }
    ],
    canObserve: [
      "Visual tearing lines and micro-stuttering during variable-interval rendering",
      "Animation pacing smoothness under fluctuating frame delivery rates",
      "User-perceived difference between windowed and fullscreen display behavior"
    ],
    cannotMeasure: [
      "GPU driver internal handshake with monitor scaler hardware",
      "Hardware-level G-Sync / FreeSync module activation status",
      "Real-time DisplayPort AUX channel metadata communication"
    ],
    interpretation: "Because web browsers execute within the OS window compositor, VRR engagement depends on OS-level settings (such as Windows Hardware Accelerated GPU Scheduling and GPU driver windowed G-Sync settings).",
    nextSteps: {
      text: "Experiencing micro-stutter or tearing? Review our step-by-step VRR troubleshooting guide.",
      actionLabel: "Read VRR Troubleshooting",
      actionHref: "/knowledge-base/troubleshooting#vrr-stutter-tearing"
    }
  },

  "backlight-bleed-test": {
    overview: "Backlight bleed occurs in LCD displays when the liquid crystal layer fails to completely block light emitted by the CCFL or LED backlight, allowing light to leak around the edges or corners. This full-screen pure black test allows you to inspect edge leakage, cloudy patches, and distinguish bleed from viewing-angle IPS glow.",
    whatToLookFor: [
      {
        label: "Edge and Corner Light Flares",
        description: "Bright yellow or white light pooling along the outer frame edges that remains visible regardless of your viewing angle."
      },
      {
        label: "IPS Glow vs Backlight Bleed",
        description: "Move your head side to side. If the glow shifts position or changes intensity with your angle, it is normal IPS glow, not bleed."
      },
      {
        label: "Clouding / Murafanning",
        description: "Diffuse, patchy areas of elevated brightness scattered across the panel caused by uneven diffusion sheets or mechanical pressure."
      },
      {
        label: "OLED / Mini-LED Comparison",
        description: "OLED displays emit light per-pixel and exhibit zero backlight bleed (pure 0 nits). FALD Mini-LEDs may show localized haloing."
      }
    ],
    canObserve: [
      "Visual edge leakage, localized bezel pinch points, and clouding patterns against black",
      "Relative severity of light leakage across display corners in a darkened environment",
      "Viewing-angle sensitivity differences (distinguishing static bleed from dynamic IPS glow)"
    ],
    cannotMeasure: [
      "Absolute panel luminance in cd/m² (nits) without a spectrophotometer",
      "Native static contrast ratio (e.g. 1000:1 vs 3000:1)",
      "ANSI 16-zone contrast compliance certification"
    ],
    interpretation: "Mild IPS glow is an inherent optical characteristic of wide-angle in-plane switching panels. Severe backlight bleed, however, is a mechanical assembly defect where the monitor bezel pinches the internal light guide plate.",
    nextSteps: {
      text: "Learn the crucial differences between IPS glow, backlight bleed, and OLED black levels.",
      actionLabel: "Read Backlight Bleed vs IPS Glow Guide",
      actionHref: "/knowledge-base/backlight-bleed-vs-ips-glow"
    }
  },

  "near-black-test": {
    overview: "Near-black testing evaluates a display's ability to delineate subtle dark gray shades immediately above pure black (0% to 5% luminance). If a monitor crushes dark shades into pure black, critical shadow detail in movies, games, and photo editing is permanently lost.",
    whatToLookFor: [
      {
        label: "Black Crush (Premature Clipping)",
        description: "If step 1 (0.5% or 1%) is completely invisible and merges into pure black, your monitor is suffering from black crush."
      },
      {
        label: "Individual Step Distinction",
        description: "You should be able to perceive faint boundary outlines between consecutive low-luminance gray swatches in a dim room."
      },
      {
        label: "Viewing Angle Gamma Shift",
        description: "On VA panels, look for 'black crush on-axis'—shadow detail that appears only when viewed slightly off-angle."
      },
      {
        label: "Ambient Light Reflection",
        description: "Turn off overhead room lights; ambient glare severely impairs human eye perception of near-black shades."
      }
    ],
    canObserve: [
      "Visual visibility thresholds for 0.5%, 1%, 2%, 3%, 4%, and 5% near-black luminance patches",
      "Perceptual shadow detail separation across dark color swatches",
      "Impact of monitor Gamma, Black Equalizer, and HDMI Dynamic Range settings"
    ],
    cannotMeasure: [
      "Photometric luminance values below 0.05 nits without a laboratory colorimeter",
      "Exact mathematical gamma curve conformity (BT.1886 vs 2.2 vs sRGB)",
      "Hardware panel native black point in absolute candelas per square meter"
    ],
    interpretation: "Black crush is commonly caused by an incorrect GPU color output dynamic range (Limited 16–235 vs Full 0–255), an overly aggressive monitor Black Equalizer, or non-linear low-end gamma curves.",
    nextSteps: {
      text: "Losing shadow detail in games and videos? Follow our troubleshooting guide to correct black crush.",
      actionLabel: "Read Black Crush Troubleshooting",
      actionHref: "/knowledge-base/troubleshooting#black-crush"
    }
  },

  "gradient-banding-test": {
    overview: "Smooth color gradients require fine gradations across thousands of intermediate tonal values. When a display panel, graphics driver, or image pipeline has insufficient bit depth or poor color processing, smooth gradients degrade into visible stepped bands or harsh posterization lines.",
    whatToLookFor: [
      {
        label: "Visible Stepping Lines",
        description: "Look for distinct vertical or horizontal stripe boundaries across smooth grayscale and RGB color transitions."
      },
      {
        label: "Channel-Specific Banding",
        description: "Notice whether banding is more pronounced on blue or dark shadow gradients compared to midtone grayscale."
      },
      {
        label: "Bit-Depth Quantization",
        description: "True 8-bit and 10-bit panels render smooth ramps. 6-bit panels relying on Frame Rate Control (FRC) show subtle grain or banding."
      },
      {
        label: "Limited vs Full Dynamic Range",
        description: "If your GPU is transmitting a Limited (16–235) signal over HDMI, dark and bright gradient ends will be sharply clipped."
      }
    ],
    canObserve: [
      "Visual presence of color banding steps across grayscale and primary/secondary color gradients",
      "Comparison between horizontal, vertical, and multi-channel color ramps",
      "Visual artifacts resulting from software color profiles or GPU dynamic range settings"
    ],
    cannotMeasure: [
      "Direct hardware bit depth (6-bit, 8-bit, 10-bit) independent of GPU reporting",
      "Quantized Delta E color deviation between adjacent color steps",
      "Spatial dithering algorithm performance at the hardware scaler level"
    ],
    interpretation: "Banding can stem from hardware limitations (6-bit panels), driver misconfigurations (Limited RGB dynamic range), or aggressive ICC calibration profiles that truncate digital color values.",
    nextSteps: {
      text: "Want to simulate specific 6-bit, 8-bit, and dithering steps? Try our dedicated Color Banding & Bit-Depth tool.",
      actionLabel: "Try Bit-Depth & Dither Test",
      actionHref: "/tests/color-banding-test"
    }
  },

  "uniformity-test": {
    overview: "Screen uniformity measures how consistently a monitor reproduces brightness and color temperature across its entire surface. Imperfections in manufacturing, backlight diffusion sheets, or edge-lighting often lead to dimmer corners, center hot-spots, or the Dirty Screen Effect (DSE).",
    whatToLookFor: [
      {
        label: "Corner & Edge Vignetting",
        description: "Inspect outer corners and perimeter edges against 25%, 50%, and 75% gray. Notice if corners appear noticeably darker."
      },
      {
        label: "Dirty Screen Effect (DSE)",
        description: "Look for faint cloudy or blotchy texture patterns across the middle of the screen, noticeable when panning across solid tones."
      },
      {
        label: "Color Temperature Tinting",
        description: "Observe whether one side of the screen appears warmer (reddish/yellowish) and the opposite side cooler (bluish)."
      },
      {
        label: "Zone-by-Zone Comparison",
        description: "Compare the 5x5 grid cells to assess relative luminance variance from center to perimeter."
      }
    ],
    canObserve: [
      "Visual luminance drop-offs, edge vignetting, and center hot-spots across solid grays and whites",
      "Visual color temperature shifts between left, center, and right panel regions",
      "Inspection across multiple standardized neutral gray and primary color luminance levels"
    ],
    cannotMeasure: [
      "Percentage uniformity metrics (e.g. '98.5% uniform') without multi-point spectrophotometer grids",
      "Correlated Color Temperature (CCT in Kelvin) variations across panel coordinates",
      "Factory uniformity compensation (DUC) circuit activation state"
    ],
    interpretation: "Consumer monitors generally tolerate 10% to 15% luminance falloff towards edges. Professional graphics monitors employ Digital Uniformity Compensation (DUC) to achieve under 5% variance.",
    nextSteps: {
      text: "Learn why dirty screen effect and vignetting happen and when panel replacement is warranted.",
      actionLabel: "Read Screen Uniformity Guide",
      actionHref: "/knowledge-base/backlight-bleed-vs-ips-glow"
    }
  },

  "text-clarity-test": {
    overview: "Text clarity depends on monitor pixel density (PPI), display scaling settings, subpixel physical geometry (RGB vs BGR vs QD-OLED pentile), and operating system font smoothing algorithms. This test evaluates legibility, color fringing, and font rendering across multiple sizes and weights.",
    whatToLookFor: [
      {
        label: "Color Fringing on Font Edges",
        description: "Inspect high-contrast black text on white. Faint red or cyan halos along vertical strokes indicate subpixel layout mismatch."
      },
      {
        label: "BGR Subpixel Inversion",
        description: "Some monitors use BGR subpixel layouts rather than standard RGB, causing blurry text unless Windows ClearType is reconfigured."
      },
      {
        label: "OLED Text Fringing",
        description: "WOLED and triangular QD-OLED subpixel arrangements produce subtle green or magenta fringes along horizontal text edges."
      },
      {
        label: "Fractional Scaling Blurriness",
        description: "Non-integer display scaling (such as 125% or 150%) can cause subtle font rasterization softness in legacy desktop apps."
      }
    ],
    canObserve: [
      "Visual color fringing and haloing on fine text contours across font sizes from 8px to 32px",
      "Subpixel rendering differences across font weights, serif vs sans-serif, and invert modes",
      "Impact of browser zoom and operating system display scaling on font crispness"
    ],
    cannotMeasure: [
      "Microscopic physical subpixel geometry without a macro lens or microscope",
      "Operating system internal DirectWrite / ClearType font rasterizer configuration flags",
      "Acoustic or optical sharpness modulation transfer function (MTF)"
    ],
    interpretation: "If text appears fuzzy with colored outlines, re-running the Windows ClearType Tuner or adjusting macOS font smoothing often resolves RGB/BGR layout incompatibilities.",
    nextSteps: {
      text: "Seeing blurry fonts or colored fringes around text? Follow our guide to tune ClearType and display scaling.",
      actionLabel: "Read Text Clarity Troubleshooting",
      actionHref: "/knowledge-base/troubleshooting#blurry-text-scaling"
    }
  },

  "hdr-test": {
    overview: "High Dynamic Range (HDR) displays provide wider peak brightness ranges and expanded color volumes. This test checks browser HDR support via CSS media queries and renders specular highlight gradients and shadow swatches to visually inspect tone mapping and highlight clipping.",
    whatToLookFor: [
      {
        label: "Browser HDR Active Detection",
        description: "Verify that the browser reports '(dynamic-range: high)' as active. If not, HDR is disabled in Windows or browser flags."
      },
      {
        label: "Highlight Detail Retention",
        description: "Inspect the 90%, 94%, 97%, 99%, and 100% white highlight cards. Reticle symbols inside near-peak cards should remain visible."
      },
      {
        label: "Peak Highlight Clipping",
        description: "If 94% through 100% white blend into an identical blown-out white patch, your monitor is clipping highlights rather than tone-mapping."
      },
      {
        label: "Color Gamut Expansion",
        description: "Observe whether vibrant saturated swatches appear richer when viewing wide color gamut (Display P3) content."
      }
    ],
    canObserve: [
      "Browser environment reporting for high dynamic range and screen color depth APIs",
      "Visual highlight detail separation and tone mapping behavior up to peak white",
      "Shadow detail visibility across low-luminance HDR test swatches"
    ],
    cannotMeasure: [
      "Peak panel luminance in cd/m² (nits) without a hardware light meter",
      "VESA DisplayHDR tier compliance (e.g. DisplayHDR 400 vs 600 vs 1000)",
      "Strict PQ (ST 2084) electro-optical transfer function tracking accuracy"
    ],
    interpretation: "Budget monitors advertised as 'HDR400' often lack local dimming and cannot exceed standard SDR brightness, resulting in washed-out images or blown-out highlights when HDR is toggled on.",
    nextSteps: {
      text: "HDR looks washed out, dim, or blown out? Review our guide on proper OS and display HDR configuration.",
      actionLabel: "Read HDR Troubleshooting",
      actionHref: "/knowledge-base/troubleshooting#hdr-not-working"
    }
  },

  "resolution-checker": {
    overview: "Modern operating systems use display scaling to keep UI elements legible on high-density screens. This creates a difference between logical CSS viewport pixels and physical panel pixels. This tool reports browser-accessible screen dimensions, device pixel ratio (DPR), and orientation.",
    whatToLookFor: [
      {
        label: "Native vs Logical Resolution",
        description: "A 4K monitor at 150% scaling reports a logical viewport of 2560×1440 with a DPR of 1.5, totaling 3840×2160 physical pixels."
      },
      {
        label: "Device Pixel Ratio (DPR)",
        description: "DPR indicates the scaling multiplier between CSS pixels and hardware screen dots (e.g. 1.0 = 100%, 1.25 = 125%, 2.0 = 200%)."
      },
      {
        label: "Available Desktop Area",
        description: "Screen.availWidth and availHeight reveal the usable desktop workspace after subtracting OS taskbars and dock bars."
      },
      {
        label: "Viewport vs Screen Size",
        description: "Window.innerWidth/innerHeight shows current browser window dimensions, distinct from your full monitor screen size."
      }
    ],
    canObserve: [
      "Browser-reported screen.width, screen.height, and screen.availWidth/Height",
      "window.devicePixelRatio (DPR) and calculated physical render resolution",
      "CSS layout viewport dimensions and orientation metadata"
    ],
    cannotMeasure: [
      "Physical panel matrix dimensions if the GPU or external scaler downsamples the signal",
      "External video capture card or TV downscaling overrides",
      "Physical panel aspect ratio when non-square pixel modes are forced by hardware"
    ],
    interpretation: "If your reported resolution does not match your monitor's advertised spec, check Windows Display Settings > Scale and Layout. Changing scaling from 125% or 150% back to 100% will restore 1:1 logical-to-physical reporting.",
    nextSteps: {
      text: "Compare multiple monitor resolutions, diagonal sizes, and PPI side-by-side in our Display Comparison tool.",
      actionLabel: "Compare Displays & Calculate PPI",
      actionHref: "/tests/compare-displays"
    }
  },

  "display-info": {
    overview: "Your web browser exposes environment telemetry about your active display, window boundaries, color depth, pixel density, and input capabilities. This diagnostic panel aggregates all browser-accessible hardware and display parameters into a single view.",
    whatToLookFor: [
      {
        label: "Color Depth Reporting",
        description: "Screen.colorDepth indicates bit-plane depth (typically 24-bit for 8-bit RGB, or 30-bit for 10-bit wide color pipelines)."
      },
      {
        label: "Touch Support Indicators",
        description: "Navigator.maxTouchPoints reveals whether the browser detects an active touch digitizer on your device."
      },
      {
        label: "Multi-Monitor Detection",
        description: "Browser sandbox restrictions prevent web apps from enumerating physical display model names without explicit Window Management permissions."
      },
      {
        label: "High Refresh Frame Pacing",
        description: "Live animation clock telemetry provides an active estimate of browser frame delivery synchronization."
      }
    ],
    canObserve: [
      "All standard DOM Screen, Window, Navigator, and Media Query parameters",
      "Device pixel ratio, color depth, pixel depth, and orientation",
      "Touch contact support and pointer media capabilities"
    ],
    cannotMeasure: [
      "Monitor manufacturer EDID serial numbers or model strings without experimental permissions",
      "Physical HDMI or DisplayPort connection bandwidth and cable revision",
      "Native physical panel refresh rate independent of OS compositor limitations"
    ],
    interpretation: "Web browsers run in a secure sandbox that deliberately abstracts low-level hardware details. Parameters shown reflect what your operating system and browser compositor expose to web applications.",
    nextSteps: {
      text: "Want to inspect physical pixel geometry and aspect ratio distortion? Run our Scaling & Aspect Ratio test.",
      actionLabel: "Test Aspect Ratio & Scaling",
      actionHref: "/tests/scaling-aspect-test"
    }
  },

  "scaling-aspect-test": {
    overview: "Incorrect display scaling or GPU aspect ratio settings can stretch or compress images, distorting circles into ovals and causing blurry text. This test displays reference geometry (circles, squares, and crosshairs) alongside aspect ratio guides (16:9, 16:10, 21:9, 4:3) to verify 1:1 square pixel rendering.",
    whatToLookFor: [
      {
        label: "Geometric Circularity",
        description: "Verify that the center reference circle is perfectly round. If it appears oblong or oval, your display aspect is distorted."
      },
      {
        label: "Square Pixel Ratio (1:1)",
        description: "Check the grid checkerboard. Each grid square should measure equally in width and height without horizontal stretching."
      },
      {
        label: "Aspect Ratio Guide Match",
        description: "Confirm whether your screen content aligns with standard 16:9 (widescreen), 16:10, or 21:9 (ultrawide) bounding frames."
      },
      {
        label: "GPU Scaling Mode",
        description: "If letterbox bars (black bars) appear on native resolution content, inspect GPU control panel scaling settings."
      }
    ],
    canObserve: [
      "Visual circularity and square pixel grid geometry within the browser viewport",
      "Bounding box alignment with standard 16:9, 16:10, 21:9, and 4:3 aspect ratios",
      "Browser window viewport aspect ratio calculation"
    ],
    cannotMeasure: [
      "Physical panel bezel millimeter dimensions using a tape measure",
      "Anamorphic lens distortion on projected optical displays",
      "External video scaler hardware aspect ratio override modes"
    ],
    interpretation: "Geometric distortion usually happens when non-native resolutions are selected without enabling 'Preserve Aspect Ratio' in NVIDIA Control Panel, AMD Radeon Software, or Intel Graphics Command Center.",
    nextSteps: {
      text: "Connecting a PC to a television? Check for overscan cropping along screen edges with our TV Overscan test.",
      actionLabel: "Test TV Overscan",
      actionHref: "/tests/tv-overscan-test"
    }
  },

  "compare-displays": {
    overview: "Monitor diagonal size, resolution, and pixel density (Pixels Per Inch - PPI) determine visual workspace and sharpness. This tool calculates exact physical display dimensions, total pixel counts, and pixel densities, providing a visual side-by-side comparison between any two display configurations.",
    whatToLookFor: [
      {
        label: "Pixel Density (PPI)",
        description: "Higher PPI produces sharper text and graphics. ~110 PPI is standard for desktop monitors, while ~220 PPI represents Retina-grade sharpness."
      },
      {
        label: "Physical Width & Height",
        description: "Compare total screen real estate. A 27-inch 16:9 display has significantly more vertical height than a 29-inch ultrawide (21:9)."
      },
      {
        label: "Total Pixel Count",
        description: "A 4K display (8.29 megapixels) packs four times as many pixels as standard 1080p Full HD (2.07 megapixels)."
      },
      {
        label: "Viewing Distance Sweet Spot",
        description: "Higher PPI allows you to sit closer without distinguishing individual pixel grids (the screen-door effect)."
      }
    ],
    canObserve: [
      "Mathematical calculation of PPI, aspect ratios, and surface areas based on user specifications",
      "Side-by-side proportional visual layout scaling between two display models",
      "Dot pitch (pixel size in millimeters) comparison"
    ],
    cannotMeasure: [
      "Physical measurement of an unknown monitor connected without user input of diagonal size",
      "Automatic optical panel dimension detection via browser APIs",
      "Physical panel bezel thickness or stand footprint dimensions"
    ],
    interpretation: "Pixel density is calculated using the Pythagorean theorem dividing diagonal pixel resolution by physical diagonal inches. Because browser APIs cannot read physical diagonal screen size from EDID, user input is required.",
    nextSteps: {
      text: "Find out how pixel density directly impacts text clarity and subpixel rendering across operating systems.",
      actionLabel: "Read Text Clarity Guide",
      actionHref: "/knowledge-base/text-clarity-and-subpixel-rendering"
    }
  },

  "tv-overscan-test": {
    overview: "Overscan is a legacy television standard where the outer 2% to 5% of the video frame is cropped off and zoomed in. When connecting a PC, Mac, or game console to a TV, overscan cuts off the taskbar, hides window edges, and severely blurs text by ruining 1:1 pixel mapping.",
    whatToLookFor: [
      {
        label: "0% Boundary Box Visibility",
        description: "If you cannot see the outermost white border and arrows labeled '0%', your TV is cropping the image with active overscan."
      },
      {
        label: "Overscan Percentage Markers",
        description: "Check which boundary box aligns with your TV frame (2.5% or 5%) to determine how much of your desktop is being discarded."
      },
      {
        label: "Corner Crosshair Alignment",
        description: "The corner crosshairs should terminate precisely at the physical edge of your television screen panel."
      },
      {
        label: "1:1 Pixel Mapping Sharpness",
        description: "Look at the fine alternating 1-pixel checkerboard ruler. If it flickers or looks blurry, your TV is interpolating pixels."
      }
    ],
    canObserve: [
      "Visual edge visibility and percentage cutoff markers (0%, 2.5%, 5%) around the screen perimeter",
      "1:1 pixel mapping ruler integrity to detect scaler interpolation blur",
      "Visual verification before and after adjusting television picture size settings"
    ],
    cannotMeasure: [
      "Direct software control over television internal OSD firmware settings",
      "Automatic detection of television picture mode presets via HDMI CEC",
      "Physical television bezel overlap versus electronic image cropping"
    ],
    interpretation: "To achieve crystal-clear text and restore your full desktop, navigate to your TV's Picture Size or Aspect Ratio settings and change it from '16:9' or 'Standard' to 'Just Scan', '1:1 Pixel', 'Screen Fit', 'Full', or 'Dot-by-Dot'.",
    nextSteps: {
      text: "Need help finding the 1:1 mapping setting on Samsung, LG, Sony, or TCL TVs? Follow our overscan guide.",
      actionLabel: "Read TV Overscan & 1:1 Mapping Guide",
      actionHref: "/knowledge-base/tv-overscan-and-pixel-mapping"
    }
  },

  "multi-touch-test": {
    overview: "This test tracks simultaneous touch contacts on touchscreens, tablets, and interactive whiteboards. It visualizes touch contact coordinates, tracks active point counts, and verifies that multi-finger gestures are correctly received by your browser engine.",
    whatToLookFor: [
      {
        label: "Simultaneous Contact Count",
        description: "Place multiple fingers on the screen simultaneously. Verify that the counter accurately tracks 2, 5, or 10 active contacts."
      },
      {
        label: "Contact Tracking Smoothness",
        description: "Drag multiple fingers across the surface to verify that touch paths remain uninterrupted without dropped contacts."
      },
      {
        label: "OS Gesture Interception",
        description: "Notice if placing 3 or 4 fingers triggers operating system gestures (such as app switching) instead of browser touch points."
      },
      {
        label: "Palm Rejection Behavior",
        description: "Rest the heel of your hand on the screen while touching with fingers to inspect how the digitizer handles large contact areas."
      }
    ],
    canObserve: [
      "Active pointer and touch events dispatched to the browser window in real time",
      "Simultaneous active touch point coordinates, IDs, and aggregate contact count",
      "Browser-reported navigator.maxTouchPoints capability indicator"
    ],
    cannotMeasure: [
      "Physical digitizer report rate in Hertz (e.g. 120Hz vs 240Hz touch sampling rate)",
      "Touch sensor capacitive pressure levels without specialized hardware APIs",
      "Physical digitizer grid mesh defects beneath glass that do not register in the OS driver"
    ],
    interpretation: "The number of simultaneous points recognized depends on your screen's digitizer hardware, OS driver limits, and whether system-level multi-touch gestures intercept contacts before passing them to the browser.",
    nextSteps: {
      text: "Want to test touch digitizer dead zones and draw continuity across your entire screen surface?",
      actionLabel: "Try Touch Screen Surface Test",
      actionHref: "/tests/touch-screen-test"
    }
  },

  "webcam-test": {
    overview: "This tool connects directly to your camera via the browser's WebRTC media stream API (getUserMedia). It lets you inspect real-time video feed quality, verify supported camera stream resolutions (720p, 1080p, 4K), monitor stream framerates, and troubleshoot permission issues locally.",
    whatToLookFor: [
      {
        label: "Video Stream Resolution",
        description: "Verify that the reported stream resolution matches your camera's advertised capability (e.g. 1920×1080 Full HD)."
      },
      {
        label: "Framerate Stability",
        description: "Monitor the live stream FPS counter. Low lighting often causes camera sensors to drop to 15-20 FPS to compensate for exposure."
      },
      {
        label: "Color Balance & Exposure",
        description: "Check for blown-out highlights on faces, color balance accuracy under room lighting, and shadow digital noise."
      },
      {
        label: "Camera Permission Prompts",
        description: "Verify that your browser correctly triggers and retains camera access permissions without system conflicts."
      }
    ],
    canObserve: [
      "Real-time video feed playback processed entirely locally within your browser tab",
      "Browser-negotiated video stream track dimensions (width, height) and frame rate",
      "MediaDeviceInfo labels and device enumeration capabilities"
    ],
    cannotMeasure: [
      "Physical optical sensor resolution independent of OS camera driver limits",
      "Lens distortion coefficients, optical chromatic aberration, or optical zoom state",
      "Lux-calibrated optical sensitivity in varying ambient lighting environments"
    ],
    interpretation: "Webcam video streams are negotiated through your operating system camera driver. If high resolutions are unavailable, check whether USB hub bandwidth, privacy switches, or third-party camera software are restricting output.",
    nextSteps: {
      text: "Camera not detected or permissions blocked? Follow our webcam troubleshooting guide.",
      actionLabel: "Read Webcam Troubleshooting",
      actionHref: "/knowledge-base/troubleshooting#webcam-access-denied"
    }
  },

  "speaker-test": {
    overview: "This tool utilizes the Web Audio API to test computer speakers, headphones, and external sound systems. It verifies stereo channel separation (Left, Right, Both), performs frequency sweeps (20Hz to 20,000Hz) to inspect acoustic range, and identifies audio distortion or channel imbalance.",
    whatToLookFor: [
      {
        label: "Stereo Channel Separation",
        description: "When playing the Left Channel tone, sound should emerge exclusively from your left speaker or headphone driver."
      },
      {
        label: "Low-Frequency Bass Extension (20Hz–100Hz)",
        description: "Listen for sub-bass tones. Small laptop speakers typically cut off completely below 80Hz–100Hz."
      },
      {
        label: "High-Frequency Treble Limit (10kHz–20kHz)",
        description: "Notice where high-frequency sweeps become inaudible due to speaker driver limits or natural human hearing attenuation."
      },
      {
        label: "Chassis Vibration & Rattling",
        description: "Mid-bass sweeps (100Hz–300Hz) often reveal loose desk objects or vibrating monitor speaker enclosures."
      }
    ],
    canObserve: [
      "Synthesized audio playback and stereo panning across Left, Right, and Center channels",
      "Continuous frequency sweeps across the human audible spectrum (20Hz to 20,000Hz)",
      "AudioContext sample rate and Web Audio API output capability"
    ],
    cannotMeasure: [
      "Physical acoustic sound pressure level (SPL in decibels, dB) without a calibrated microphone",
      "Physical speaker total harmonic distortion (THD) or driver electrical impedance",
      "Acoustic room frequency response curves or speaker frequency response charts"
    ],
    interpretation: "Stereo testing confirms that your OS audio output device is properly mapped and not downmixing to mono. Frequency sweeps help detect speaker driver clipping or loose enclosure vibration.",
    nextSteps: {
      text: "Audio silent or playing from the wrong speaker? Check our speaker troubleshooting guide.",
      actionLabel: "Read Speaker Troubleshooting",
      actionHref: "/knowledge-base/troubleshooting#speaker-no-sound"
    }
  }
};

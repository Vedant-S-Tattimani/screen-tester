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

    "hdr-capability-test": {
    "overview": "The HDR Hardware & Signal Detector audits whether your operating system window compositor, display driver, and browser pipeline are communicating high dynamic range signals. It probes CSS Media Queries Level 4 (dynamic-range: high), Wide Color Gamut (Rec.2020 / Display-P3), Canvas P3 color buffers, WebGL floating-point render targets, and hardware-accelerated 10-bit HDR video codecs.",
    "whatToLookFor": [
        {
            "label": "Compositor HDR Signal State",
            "description": "Confirms whether the operating system window compositor outputs an HDR signal to the browser. If inactive, HDR is disabled in Windows or macOS settings."
        },
        {
            "label": "Buffer Bit-Depth & Pipeline",
            "description": "Detects reported screen colorDepth (24-bit SDR vs 30-bit+ HDR) and checks whether HTML5 Canvas and WebGL2 can allocate float and P3 color buffers."
        },
        {
            "label": "Wide Color Gamut (Rec.2020 & P3)",
            "description": "Evaluates whether your monitor reports extended color volume beyond standard sRGB, unlocking vivid crimson reds and deep emerald greens."
        },
        {
            "label": "HDR Video Codec Acceleration",
            "description": "Probes hardware decoding support for HDR10 (HEVC Main 10), AV1 10-bit (YouTube HDR), and VP9 Profile 2."
        }
    ],
    "canObserve": [
        "Real-time operating system compositor HDR output state",
        "Hardware and browser support for Display-P3 and Rec.2020 color gamuts",
        "Browser-accessible screen buffer color depth and floating-point buffer support",
        "Hardware-accelerated 10-bit video codec playback capability"
    ],
    "cannotMeasure": [
        "Physical panel peak luminance (nits) without a hardware colorimeter",
        "VESA DisplayHDR certification compliance (e.g. DisplayHDR 400 vs 600 vs 1000)",
        "Physical local dimming zone count on Mini-LED backlights"
    ],
    "interpretation": "If dynamic-range reports standard (inactive), press Win + Alt + B on Windows or enable HDR in System Settings on macOS. If 10-bit video codecs report software decoding, verify that Hardware Acceleration is turned ON in your browser.",
    "nextSteps": {
        "text": "Want to inspect physical highlight clipping, tone curves, and peak nits? Run our companion optical test.",
        "actionLabel": "Launch HDR Visual Inspection",
        "actionHref": "/tests/hdr-test"
    }
},

  "hdr-test": {
    "overview": "The HDR Visual Calibration & Highlight Inspection test provides controlled optical patterns to evaluate how your display panel physically responds to HDR content. It tests specular highlight clipping points, tone-mapping roll-off, 10% APL peak luminance burst capability, PQ/EOTF tone curve ramps, and near-black shadow detail.",
    "whatToLookFor": [
        {
            "label": "Specular Highlight Roll-Off & Clipping",
            "description": "Inspect the 90% through 100% Peak White highlight swatches. Concentric circular reticle targets should remain distinguishable without blending into blown-out white."
        },
        {
            "label": "10% APL Peak Luminance Burst",
            "description": "A standard 10% window against a pitch-black background tests your display's peak nit headroom, local dimming aggressiveness, and halo blooming."
        },
        {
            "label": "PQ / EOTF Tone Curve Gradation",
            "description": "Compares smooth 10-bit gradients against 8-bit quantized ramps to expose banding artifacts and aggressive tone-mapping compression."
        },
        {
            "label": "Near-Black Shadow Detail (Black Crush)",
            "description": "Verifies whether low-luminance dark steps (0.5% through 5%) remain distinct from true 0% black without muddy elevated black floors."
        }
    ],
    "canObserve": [
        "Point of specular highlight clipping across stepped white luminance levels",
        "Local dimming blooming and peak brightness headroom in the 10% APL window",
        "Smoothness of 10-bit tonal transitions vs 8-bit quantization banding",
        "Near-black shadow detail separation and black crush behavior"
    ],
    "cannotMeasure": [
        "Exact photometric peak luminance in nits (cd/m²) without laboratory sensors",
        "Color temperature (Kelvin) accuracy without a spectrophotometer",
        "Panel response time or pixel overshoot"
    ],
    "interpretation": "Displays with poor HDR tone mapping will clip highlights prematurely above 94% or crush near-black shadow details into solid black. Premium OLED and Mini-LED panels maintain highlight reticles up to 99% and preserve subtle shadow steps.",
    "nextSteps": {
        "text": "Need to verify if your operating system compositor and video codecs support HDR? Check the hardware detector.",
        "actionLabel": "Check HDR Hardware & Signal",
        "actionHref": "/tests/hdr-capability-test"
    }
},

  "strobe-crosstalk-test": {
    "overview": "Backlight strobing (ULMB, DyAc, ELMB, LightBoost) eliminates eye-tracking motion blur by pulsing the backlight on only when liquid crystals have finished transitioning. However, because displays scan pixels from top to bottom while backlights flash globally across the entire screen, pixel transitions at the very top or bottom may be incomplete when the pulse fires. This timing mismatch creates duplicate phantom images known as strobe crosstalk.",
    "whatToLookFor": [
      {
        "label": "Double-Image Silhouettes",
        "description": "Watch the moving bars in the top, center, and bottom tracks. Notice whether you see a single sharp bar or a faint duplicate ghost trailing or leading it."
      },
      {
        "label": "Top vs Center vs Bottom Clarity",
        "description": "Most monitors optimize strobe phase for the screen center. The center zone should show crisp, single-image motion, while top and bottom zones typically show varying degrees of crosstalk."
      },
      {
        "label": "Strobe Pulse Width & Brightness",
        "description": "Shorter strobe pulses yield sharper motion but lower overall display brightness. Adjust your monitor's strobe duty cycle in its OSD to balance clarity vs luminance."
      }
    ],
    "canObserve": [
      "Relative strobe crosstalk visibility across vertical screen zones",
      "Identification of optimal strobe phase calibration point on your panel",
      "Comparison of motion blur reduction at various panning velocities"
    ],
    "cannotMeasure": [
      "Exact backlight strobe flash duration in microseconds",
      "Photometric strobe luminance peak in nits without a photodiode",
      "Hardware panel scan-out velocity and VSYNC timing interval"
    ],
    "interpretation": "A small amount of strobe crosstalk at the extreme top and bottom edges is normal on LCD monitors. Severe crosstalk across the center zone indicates mismatched strobe phase or refresh rate desync.",
    "nextSteps": {
      "text": "Compare strobed motion against native sample-and-hold motion blur.",
      "actionLabel": "Run Motion Blur Test",
      "actionHref": "/tests/motion-blur-test"
    }
  },
  "vrr-flicker-test": {
    "overview": "Variable Refresh Rate (VRR / G-Sync / FreeSync) dynamically matches screen refresh rate to GPU rendering output. However, liquid crystal relaxation and OLED pixel luminance curves vary depending on the duration of the refresh cycle. When framerates swing rapidly—especially between high FPS and lower boundary thresholds—luminance curves shift dynamically, producing noticeable brightness flicker in dark and near-black areas.",
    "whatToLookFor": [
      {
        "label": "Near-Black Brightness Pumping",
        "description": "Observe the 10% near-black and 25% dark gray patches as the automated framerate sweep cycles. Look for subtle rhythmic pulsations in overall darkness."
      },
      {
        "label": "LFC (Low Framerate Compensation) Transition Jolt",
        "description": "When framerates dip below the minimum VRR threshold (e.g., below 48Hz), graphics drivers double frame presentation (LFC). This rapid Hz shift can cause a momentary luminance flicker."
      },
      {
        "label": "OLED Gamma Shift",
        "description": "OLED displays are particularly prone to VRR gamma flicker because subpixel charge times depend heavily on frame length. Dark scene textures may pulse visibly during framerate drops."
      }
    ],
    "canObserve": [
      "Visual identification of gamma curve shifts across dark gray luminance levels",
      "Detection of brightness pumping during simulated framerate oscillation",
      "Comparison between subtle midtone gray vs near-black flicker sensitivity"
    ],
    "cannotMeasure": [
      "Hardware GPU-to-display Adaptive-Sync timing packets",
      "Exact millivolt OLED subpixel voltage fluctuations",
      "Automatic detection without user visual evaluation"
    ],
    "interpretation": "If you observe strong brightness pulsing, your display has sensitive VRR gamma curves. Cap your framerate slightly below max refresh rate or disable VRR in games with unstable frame times to prevent flicker.",
    "nextSteps": {
      "text": "Verify your display's variable refresh rate support and range.",
      "actionLabel": "Run VRR Capability Test",
      "actionHref": "/tests/vrr-test"
    }
  },
  "pursuit-camera-test": {
    "overview": "Human eyes track moving on-screen objects with continuous smooth pursuit motion. Standard stationary camera photographs cannot capture true display motion blur because they don't move with the eye. A pursuit camera tracks the moving pattern at exact matched speed, allowing photographic capture of true perceived Motion Picture Response Time (MPRT) and ghosting smear.",
    "whatToLookFor": [
      {
        "label": "Temporal Graduation Alignment",
        "description": "The top track contains vertical white graduation ticks. When tracking smoothly with your camera or phone, these ticks will merge into a single sharp vertical line in your photo."
      },
      {
        "label": "Ghosting & Trailing Artifacts",
        "description": "Once tracking sync is verified by crisp vertical ticks, examine the trailing edge of the moving object to see phosphor decay, overdrive coronas, or ghost trails."
      },
      {
        "label": "Overdrive Overshoot (Coronas)",
        "description": "A bright glowing outline trailing behind the moving object indicates excessive monitor pixel overdrive (inverse ghosting)."
      }
    ],
    "canObserve": [
      "Camera panning synchronization via temporal graduation track verification",
      "Visual smear width directly proportional to perceived MPRT",
      "Distinction between pixel transition blur (GtG) and sample-and-hold eye-tracking blur (MPRT)"
    ],
    "cannotMeasure": [
      "Automatic MPRT calculation without taking and measuring a tracking photograph",
      "Sub-millisecond photodiode optical response curves",
      "Optical tracking rail velocity without calibrated hardware"
    ],
    "interpretation": "When temporal graduation marks form a clean vertical line in your exposure, tracking was synchronized. The width of trailing smear on the object reflects the display's true MPRT motion blur.",
    "nextSteps": {
      "text": "Compare motion performance across different overdrive settings in your monitor OSD.",
      "actionLabel": "Run Ghosting Test",
      "actionHref": "/tests/ghosting-test"
    }
  },
  "audio-sync-test": {
    "overview": "Modern visual processing (frame scaling, HDR dynamic tone mapping, and motion smoothing) introduces video latency. Meanwhile, soundbars, AV receivers, and Bluetooth audio devices (A2DP codec buffers) introduce audio latency. If video and audio diverge by more than ITU-R perceptual thresholds (+45ms to -125ms), speech lip-sync becomes noticeably disjointed.",
    "whatToLookFor": [
      {
        "label": "Simultaneous Flash and Beep",
        "description": "Watch the rotating needle pass the top 12 o'clock zero mark. The instant visual white/green flash should align perfectly with the audible 1 kHz pulse."
      },
      {
        "label": "Audio Leading Video (Negative Offset)",
        "description": "If you hear the beep before you see the visual flash, the display is lagging behind the audio. Audio needs to be delayed."
      },
      {
        "label": "Video Leading Audio (Positive Offset)",
        "description": "If you see the flash before you hear the beep, audio processing (e.g., Bluetooth lag or soundbar processing) is delayed relative to the display."
      }
    ],
    "canObserve": [
      "Human perceptual synchronization between optical visual flashes and acoustic pulses",
      "Measurement of required millisecond compensation offset (+/- 200ms)",
      "Audio output channel verification via Web Audio API 1 kHz synthesized pulses"
    ],
    "cannotMeasure": [
      "Hardware electrical acoustic sound wave arrival times with microsecond laboratory precision",
      "Microphone acoustic feedback loop without audio input authorization",
      "Bluetooth packet retransmission delays at the operating system driver level"
    ],
    "interpretation": "Perceptual lip-sync alignment within +/- 20ms is considered excellent and imperceptible to human audiences. Latencies greater than 50ms should be corrected using audio delay settings in your soundbar or media player.",
    "nextSteps": {
      "text": "Test your speakers for stereo channel separation and frequency range.",
      "actionLabel": "Run Speaker Test",
      "actionHref": "/tests/speaker-test"
    }
  },
  "gamepad-test": {
    "overview": "Game controllers use analog potentiometers or Hall-effect magnetic sensors to translate thumbstick movement into directional coordinates. Over time, internal carbon wiper wear, spring degradation, and dust contamination cause the stick to register off-center coordinates when resting untouched—a defect known as stick drift.",
    "whatToLookFor": [
      {
        "label": "Resting Stick Drift",
        "description": "Release both thumbsticks completely. If the crosshair indicator sits outside the central zero point or drifts continuously, stick drift is present."
      },
      {
        "label": "Circularity Error",
        "description": "Rotate the sticks along their outer boundaries. Quality gamepads produce a clean, smooth circle without clipping flat at the diagonal corners."
      },
      {
        "label": "Deadzone Thresholding",
        "description": "Check how far you must nudge the stick before the coordinate responds. Excessive deadzones make aiming sluggish, while too-small deadzones cause drift."
      },
      {
        "label": "Analog Trigger Smoothness",
        "description": "Gradually squeeze LT and RT triggers. The percentage readout should climb smoothly from 0% to 100% without jumping or sticking."
      }
    ],
    "canObserve": [
      "Real-time analog stick X/Y coordinate readouts and resting drift values",
      "Full 16-button digital actuation matrix and analog trigger pressure percentages",
      "Controller connection status, device ID name, and polling rate via HTML5 Gamepad API"
    ],
    "cannotMeasure": [
      "Physical potentiometer wiper resistance in ohms",
      "Internal battery voltage level (unless supported by proprietary browser extensions)",
      "Wireless Bluetooth radio interference or packet drop rates"
    ],
    "interpretation": "A resting coordinate value below 0.05 (5%) is typically absorbed by standard game deadzones. Values exceeding 0.10 (10%) will cause visible in-game camera drift and suggest recalibration or cleaning.",
    "nextSteps": {
      "text": "Test your display's input latency and your personal reaction time.",
      "actionLabel": "Run Reaction Time Test",
      "actionHref": "/tests/reaction-time-test"
    }
  }
  ,
  "battery-test": {
    "overview": "The Battery Health & Power Status inspector reads battery metrics using the W3C Battery Status API. It provides real-time visibility into your device's battery charge level, charging state, estimated charging time, and discharging endurance.",
    "whatToLookFor": [
        {
            "label": "Real-time Charge Level",
            "description": "Monitors the current battery percentage reported by the operating system power subsystem."
        },
        {
            "label": "AC Adapter Connection State",
            "description": "Identifies whether your device is actively drawing AC wall power or running on internal DC battery reserves."
        },
        {
            "label": "Charging & Discharging Time",
            "description": "Calculates the estimated duration required to reach 100% capacity or time remaining until system depletion."
        },
        {
            "label": "Discharge Slope History",
            "description": "Tracks power drain across active screen workloads to identify heavy battery consumption."
        }
    ],
    "canObserve": [
        "Real-time battery percentage reported by OS power management",
        "Charging vs discharging state transitions via levelchange and chargingchange events",
        "Estimated seconds remaining until full charge or complete discharge",
        "Historical charging level trends over the active session"
    ],
    "cannotMeasure": [
        "Physical milliamp-hour (mAh) chemical capacity degradation without root diagnostic tools",
        "Internal battery temperature, impedance, or cycle count",
        "Battery health metrics on browsers that restrict Battery API for privacy (e.g. Firefox/Safari)"
    ],
    "interpretation": "If your browser reports battery metrics as unsupported, your browser vendor has restricted the API for fingerprinting mitigation. When supported, a rapid drop in percentage under light display testing indicates battery aging.",
    "nextSteps": {
        "text": "Want to check your system's network throughput and connection performance?",
        "actionLabel": "Launch Network Speed Test",
        "actionHref": "/tests/network-speed-test"
    }
},

  "network-speed-test": {
    "overview": "The Network Speed & Latency Test evaluates your internet connection's ping latency, jitter, connection type, and download throughput directly through your browser pipeline using timing APIs and the Network Information API.",
    "whatToLookFor": [
        {
            "label": "Ping Latency (RTT)",
            "description": "Measures round-trip time in milliseconds for packets traveling from your browser to the testing server."
        },
        {
            "label": "Download Throughput (Mbps)",
            "description": "Calculates maximum sustained bandwidth when streaming high-resolution payload packets."
        },
        {
            "label": "Connection Profile & Type",
            "description": "Detects reported effective connection type (4g, wifi, ethernet) and downlink ceiling."
        },
        {
            "label": "Connection Stability & Jitter",
            "description": "Observes variance between successive ping bursts to identify packet queueing or bufferbloat."
        }
    ],
    "canObserve": [
        "HTTP/HTTPS request-response round-trip round trip time (RTT) in milliseconds",
        "Effective connection speed class via navigator.connection",
        "Download throughput calculated via fetch stream bytes divided by transfer time",
        "Data Saver flag status reported by user agent"
    ],
    "cannotMeasure": [
        "Direct raw TCP socket synchronization without browser HTTP stack overhead",
        "ISP physical line attenuation, SNR margins, or optical fiber power levels",
        "Local Wi-Fi radio frequency channel interference"
    ],
    "interpretation": "Latencies under 30ms are ideal for competitive online gaming and cloud display streaming. Speeds above 50 Mbps ensure buffer-free 4K HDR streaming.",
    "nextSteps": {
        "text": "Test whether your display and graphics pipeline introduce click-to-photon latency.",
        "actionLabel": "Launch Input Lag Test",
        "actionHref": "/tests/input-lag-test"
    }
},

  "color-blindness-test": {
    "overview": "The Color Blindness Simulator applies mathematically calibrated SVG color-matrix filters to emulate 8 distinct types of Color Vision Deficiency (CVD). It enables developers and designers to evaluate UI readability, contrast ratios, and color-coded information accessibility.",
    "whatToLookFor": [
        {
            "label": "Protanopia & Protanomaly (Red-Weak)",
            "description": "L-cone deficiency makes pure reds appear dark brown or charcoal; red-green distinctions diminish."
        },
        {
            "label": "Deuteranopia & Deuteranomaly (Green-Weak)",
            "description": "M-cone deficiency blurs greens and reds into yellowish hues; the most prevalent form of CVD."
        },
        {
            "label": "Tritanopia & Tritanomaly (Blue-Weak)",
            "description": "S-cone deficiency makes blues appear greenish and yellows appear light violet or gray."
        },
        {
            "label": "Achromatopsia (Total Monochromacy)",
            "description": "Complete absence of functional cone photoreceptors, perceiving the display in pure shades of gray."
        }
    ],
    "canObserve": [
        "Real-time optical transformation of text, icons, charts, and swatches across 8 CVD matrices",
        "Side-by-side comparison of normal trichromatic vision vs simulated color deficiency",
        "Contrast degradation between key UI status indicators (success green vs error red)",
        "Text legibility against background tones under each color vision variant"
    ],
    "cannotMeasure": [
        "Clinical diagnosis of human user genetic color vision capability (e.g. Farnsworth-Munsell 100-Hue test)",
        "Exact individual rod/cone retinal sensitivity variations",
        "Physical display spectral emission peaks without a spectroradiometer"
    ],
    "interpretation": "If your critical UI indicators (such as error alerts, charts, or primary action buttons) become indistinguishable under Deuteranopia or Protanopia, supplement color cues with icons, bold typography, and distinct shape outlines to comply with WCAG 2.2 guidelines.",
    "nextSteps": {
        "text": "Inspect your monitor's physical color gamut coverage across sRGB and DCI-P3.",
        "actionLabel": "Check Color Gamut",
        "actionHref": "/tests/color-gamut-test"
    }
},

  "screen-recorder": {
    "overview": "The Screen Recorder & Screenshot utility utilizes the Screen Capture API and MediaRecorder API to record desktop screens, application windows, or browser tabs, and capture pixel-accurate PNG snapshots directly without software installation.",
    "whatToLookFor": [
        {
            "label": "Display Stream Resolution",
            "description": "Verifies whether the captured video track matches your monitor's native canvas pixel dimensions."
        },
        {
            "label": "Capture Frame Rate",
            "description": "Monitors frame rate smoothness and recording duration in real-time."
        },
        {
            "label": "Audio Track Integration",
            "description": "Captures optional system audio or tab audio alongside the display stream."
        },
        {
            "label": "Lossless PNG Snapshot Quality",
            "description": "Captures instant single-frame bitmap buffers rendered directly to a download-ready PNG image."
        }
    ],
    "canObserve": [
        "Stream track video dimensions, aspect ratio, and frame rate settings",
        "Recording elapsed time, pause/resume states, and generated WebM video blob size",
        "Instant freeze-frame rendering to an HTML5 Canvas for PNG export",
        "Browser permission grants for display media capture"
    ],
    "cannotMeasure": [
        "Hardware GPU encoding latency inside operating system video encoders",
        "Capture of protected DRM media content (Netflix, Disney+, etc. which output black screens)",
        "Physical monitor refresh synchronization without capture buffer scaling"
    ],
    "interpretation": "Screen recordings are generated locally in your browser memory and never uploaded to any remote server, preserving absolute privacy for sensitive application testing.",
    "nextSteps": {
        "text": "Want to test your webcam and front-facing camera resolution?",
        "actionLabel": "Launch Webcam Test",
        "actionHref": "/tests/webcam-test"
    }
},

  "dark-mode-test": {
    "overview": "The Dark Mode & Theme Compatibility inspector evaluates your system's prefers-color-scheme media query, CSS color-scheme rendering properties, theme-color meta headers, and component contrast ratios across dark and light palettes.",
    "whatToLookFor": [
        {
            "label": "OS Preference Synchronization",
            "description": "Tests whether your browser automatically detects dark or light mode toggles in Windows, macOS, Android, or iOS."
        },
        {
            "label": "CSS color-scheme Support",
            "description": "Inspects native browser scrollbars, form controls, and selection highlights in dark mode."
        },
        {
            "label": "Component Contrast Legibility",
            "description": "Evaluates contrast ratios for text, cards, buttons, and badges across both color modes."
        },
        {
            "label": "Pure Black OLED Efficiency",
            "description": "Assesses whether dark mode surfaces use true #000000 black to maximize battery savings on OLED panels."
        }
    ],
    "canObserve": [
        "Real-time status of window.matchMedia('(prefers-color-scheme: dark)')",
        "Browser support for native CSS color-scheme property and system form controls",
        "Interactive theme switching (System, Light, Dark) for instant visual comparison",
        "Contrast and legibility of typography across light and dark surface tokens"
    ],
    "cannotMeasure": [
        "Hardware OLED subpixel milliamp power savings without physical measurement",
        "Ambient room light adaptation without an active ambient light sensor",
        "Night Light or f.lux blue-light reduction color shifts"
    ],
    "interpretation": "Modern displays with OLED or Mini-LED backlights save substantial power when rendering true dark backgrounds, while reducing blue-light exposure in dim ambient environments.",
    "nextSteps": {
        "text": "Evaluate your display brightness in relation to room lighting conditions.",
        "actionLabel": "Launch Ambient Light Test",
        "actionHref": "/tests/ambient-light-test"
    }
},

  "input-lag-test": {
    "overview": "The Input Lag Visualizer provides a statistical 10-trial reaction and pipeline latency benchmark. It measures the delta between a randomized visual stimulus and the registration of your mouse click or keyboard actuation, graphing average, standard deviation, and a response distribution histogram.",
    "whatToLookFor": [
        {
            "label": "Visual Stimulus Reaction Time",
            "description": "Measures elapsed milliseconds from the exact frame of color shift to your pointer click."
        },
        {
            "label": "Statistical Consistency (Std Dev)",
            "description": "Low standard deviation (< 25ms) indicates consistent perceptual and hardware pipeline timing."
        },
        {
            "label": "Outlier Spikes & False Starts",
            "description": "Detects preemptive clicks made before the green visual trigger appears."
        },
        {
            "label": "Distribution Histogram",
            "description": "Visualizes latency clustering to distinguish biological reaction from system queuing delays."
        }
    ],
    "canObserve": [
        "High-resolution millisecond timestamps via performance.now() from stimulus render to event dispatch",
        "Statistical metrics: Average, Best (fastest), Worst (slowest), and Standard Deviation across 10 trials",
        "Real-time visual state machine preventing false clicks",
        "Response time histogram mapping latency buckets"
    ],
    "cannotMeasure": [
        "Isolated optical photodiode click-to-photon latency without external hardware probes (e.g., LDAT)",
        "Internal USB polling micro-intervals separate from OS interrupt scheduling",
        "Physical monitor overdrive response time"
    ],
    "interpretation": "A combined human reaction plus display pipeline score of 180ms to 240ms is typical for high-refresh gaming setups. Scores above 300ms suggest display post-processing lag (Game Mode disabled) or higher input latency.",
    "nextSteps": {
        "text": "Check your display's actual hardware refresh rate and frame delivery pacing.",
        "actionLabel": "Launch Refresh Rate Test",
        "actionHref": "/tests/refresh-rate-test"
    }
},

  "ambient-light-test": {
    "overview": "The Ambient Light Sensor Inspector reads illuminance levels in lux (lx) using the AmbientLightSensor API. It evaluates room lighting conditions, provides ergonomic display brightness recommendations, and graphs light fluctuations over time.",
    "whatToLookFor": [
        {
            "label": "Real-time Lux Illuminance",
            "description": "Monitors ambient light intensity in lux captured by integrated device photodetectors."
        },
        {
            "label": "Ergonomic Brightness Advice",
            "description": "Recommends optimal monitor nit / brightness slider levels for your current room conditions."
        },
        {
            "label": "Glare Risk Warning",
            "description": "Identifies whether intense ambient lighting (> 1000 lx) requires anti-glare shading or peak brightness."
        },
        {
            "label": "Ambient Lighting Stability",
            "description": "Tracks room lighting changes over time to identify flickering bulbs or shifting daylight."
        }
    ],
    "canObserve": [
        "Real-time ambient illuminance values in lux from hardware photodetectors",
        "Lighting zone categorization (Pitch Dark, Dim Room, Office, Bright Indoors, Daylight)",
        "Recommended display brightness percentage based on ISO ergonomics guidelines",
        "Historical light level chart over the active session"
    ],
    "cannotMeasure": [
        "Ambient light readings on browsers or operating systems lacking Generic Sensor API support",
        "Color temperature (Kelvin) or CRI rating of room lighting without an RGB ambient sensor",
        "Directional glare vector angles hitting the panel surface"
    ],
    "interpretation": "For comfortable reading without eye strain, an office environment should range between 300 lx and 500 lx with display brightness set to approximately 120-150 nits. Values below 50 lx require lowering display brightness to minimize fatigue.",
    "nextSteps": {
        "text": "Calibrate your screen's brightness and black-level threshold.",
        "actionLabel": "Launch Brightness Test",
        "actionHref": "/tests/brightness-test"
    }
},

  "dpi-calculator": {
    "overview": "The DPI & PPI Calculator computes pixel density, subpixel pitch, total megapixels, and Apple-defined Retina visual threshold distances based on physical screen diagonal and pixel resolution specifications.",
    "whatToLookFor": [
        {
            "label": "Pixels Per Inch (PPI)",
            "description": "Measures spatial pixel density across the diagonal of your display panel."
        },
        {
            "label": "Dot Pitch (Pixel Spacing)",
            "description": "Calculates the physical distance between adjacent subpixel centers in millimeters."
        },
        {
            "label": "Retina Viewing Distance",
            "description": "Determines the exact distance where human 20/20 visual acuity can no longer distinguish individual pixels (60 PPD)."
        },
        {
            "label": "Aspect Ratio & Megapixels",
            "description": "Calculates panel surface area, aspect ratio proportions, and total million pixels rendered."
        }
    ],
    "canObserve": [
        "Calculated PPI, dot pitch in millimeters, and total megapixel count",
        "Optimal ergonomic and Retina visual threshold viewing distances in inches and centimeters",
        "Instant preset selection for standard monitors (24\" 1080p, 27\" 1440p, 32\" 4K, 16\" MacBook Pro)",
        "Interactive resolution and diagonal slider inputs"
    ],
    "cannotMeasure": [
        "Physical tape measurement of your monitor's outer plastic bezel without user input",
        "Optical subpixel rendering sharpness affected by matte anti-glare coatings",
        "Non-standard aspect ratio anamorphic distortion without exact dimensions"
    ],
    "interpretation": "A pixel density above 110 PPI provides comfortable desktop text clarity without aggressive scaling, while densities exceeding 220 PPI achieve true Retina clarity at typical desk distances (50–60 cm).",
    "nextSteps": {
        "text": "Verify font sharpness and subpixel rendering across different text sizes.",
        "actionLabel": "Launch Text Clarity Test",
        "actionHref": "/tests/text-clarity-test"
    }
},

  "subpixel-layout-test": {
    "overview": "Subpixel layout testing analyzes the microscopic physical geometry of red, green, and blue emitter strips within each pixel. Variations between standard RGB, inverted BGR, triangular QD-OLED, and WOLED layouts directly determine whether operating system text antialiasing (such as Windows ClearType) appears crisp or suffers from magenta/green color halos.",
    "whatToLookFor": [
        {
            "label": "Subpixel Geometry Structure",
            "description": "Identifies whether your panel uses standard RGB vertical stripes, BGR stripes, or non-standard triangular subpixels."
        },
        {
            "label": "High-Contrast Text Fringing",
            "description": "Inspects black-on-white and white-on-black text for colored halos (green on top, magenta below)."
        },
        {
            "label": "1px Grid Alignment",
            "description": "Verifies whether 1-pixel alternating lines render as completely neutral grey without color artifacts."
        },
        {
            "label": "ClearType Antialiasing Calibration",
            "description": "Evaluates whether running Windows cttune or font smoothing eliminates edge discoloration."
        }
    ],
    "canObserve": [
        "Color fringing artifacts rendered across high-contrast serif, sans-serif, and monospace fonts",
        "Subpixel alignment against calibrated 1-pixel alternating vertical and horizontal line gratings",
        "Visual simulation of subpixel emission structures across 6 major panel architectures"
    ],
    "cannotMeasure": [
        "Physical microscope optical verification of sub-millimeter silicon emitter geometry",
        "Direct registry settings of the host operating system's font rasterizer",
        "Hardware scaler subpixel interpolation inside external video capture cards"
    ],
    "interpretation": "If text shows faint green or magenta borders on a 1440p or 4K screen, your display likely features a BGR or QD-OLED subpixel layout. Running the Windows ClearType Tuner or switching to grayscale antialiasing will resolve the fringing.",
    "nextSteps": {
        "text": "Want to inspect overall display sharpness and resolution scaling?",
        "actionLabel": "Launch Text Clarity Test",
        "actionHref": "/tests/text-clarity-test"
    }
},

  "pwm-flicker-test": {
    "overview": "Pulse-Width Modulation (PWM) is a dimming technique used by certain LCD backlights and OLED panels that rapidly strobes the light source on and off to achieve lower brightness. While invisible to the naked eye at high frequencies, low-frequency PWM (120Hz–480Hz) causes severe eye strain, dry eyes, headaches, and migraines.",
    "whatToLookFor": [
        {
            "label": "Stroboscopic Phantom Beads",
            "description": "Moving your eyes or waving an object in front of the screen breaks moving lines into distinct phantom beads if PWM is present."
        },
        {
            "label": "Smartphone Shutter Scanlines",
            "description": "Using a phone camera at 1/1000s or faster reveals dark scrolling horizontal bands caused by duty-cycle modulation."
        },
        {
            "label": "Flicker-Free Brightness Threshold",
            "description": "Identifies at what monitor OSD brightness percentage the display switches from DC dimming to PWM."
        },
        {
            "label": "Duty Cycle Luminescence",
            "description": "Measures the optical ratio between ON duration and OFF duration during each dimming cycle."
        }
    ],
    "canObserve": [
        "Visual stroboscopic interference patterns generated by high-velocity scrolling gratings",
        "Optical interaction between user saccadic eye movements and panel refresh cycles",
        "Guidelines for smartphone camera verification of PWM frequency"
    ],
    "cannotMeasure": [
        "Exact physical pulse frequency in Hertz without an external photodiode oscilloscope probe",
        "Harmonic distortion index of the LED driver circuit",
        "Micro-voltage ripple on the backlight power rail"
    ],
    "interpretation": "Displays certified as 'Flicker-Free' or 'TÜV Eye Comfort' utilize continuous Direct Current (DC) dimming down to 0% brightness. If you see beaded ghosting trails, your panel uses PWM dimming at low brightness settings.",
    "nextSteps": {
        "text": "Want to test for high-frequency VRR luminance fluctuations?",
        "actionLabel": "Launch VRR Flicker Test",
        "actionHref": "/tests/vrr-flicker-test"
    }
},

  "dead-pixel-mapper": {
    "overview": "The Dead Pixel RMA Coordinate Mapper is an interactive inspection tool designed for documenting defective panel pixels. It allows buyers to pinpoint defective pixel coordinates, classify defects by type, calculate ISO 9241-307 warranty eligibility, and export formal RMA inspection logs for manufacturer replacement claims.",
    "whatToLookFor": [
        {
            "label": "Dead (Dark) Pixels",
            "description": "Permanently unpowered subpixel triads that remain pitch black against white, cyan, and yellow screens."
        },
        {
            "label": "Stuck (Bright) Subpixels",
            "description": "Subpixels locked in an open state, glowing red, green, blue, or white against pure black backgrounds."
        },
        {
            "label": "Defect Coordinates (X, Y)",
            "description": "Precise pixel address from the top-left origin to prove defect location to service technicians."
        },
        {
            "label": "ISO 9241-307 Class Thresholds",
            "description": "Automatic comparison against Class 1 (Zero-Defect) and Class 2 (Consumer Allowance) replacement limits."
        }
    ],
    "canObserve": [
        "Exact screen coordinates (X, Y) of logged defective points across 9 solid test backgrounds",
        "Calculation of central zone vs. peripheral zone defect clustering",
        "ISO 9241-307 Class 1 and Class 2 warranty return compliance"
    ],
    "cannotMeasure": [
        "Automatic algorithmic defect detection without manual user visual inspection",
        "Sub-surface glass dust vs. true TFT transistor failure without optical magnification",
        "Internal electrical continuity of the panel driver IC"
    ],
    "interpretation": "Most major monitor manufacturers (Dell, LG, ASUS, Samsung) adhere to ISO 9241-307 Class 2, which allows up to 2 full dead pixels or 5 stuck subpixels per million. Premium gaming and professional displays often feature Zero Bright Dot (Class 1) coverage.",
    "nextSteps": {
        "text": "Have stuck subpixels that remain lit? Try reviving them with our high-speed exerciser.",
        "actionLabel": "Launch Stuck Pixel Fixer",
        "actionHref": "/tests/stuck-pixel-fixer"
    }
},

  "gtg-response-time-test": {
    "overview": "Grey-to-Grey (GtG) response time measures the time required for a liquid crystal pixel to transition from one arbitrary intermediate grey level to another. While manufacturers advertise 1ms or 0.5ms GtG, real-world transitions vary significantly, and aggressive overdrive settings often cause severe inverse ghosting (overshoot).",
    "whatToLookFor": [
        {
            "label": "VA Panel Black Smearing",
            "description": "Inspects transitions from 0% pure black to 20% dark grey, where VA liquid crystals are slowest."
        },
        {
            "label": "Overdrive Overshoot (Coronas)",
            "description": "Checks for bright white or dark inverted halos trailing moving objects caused by excessive overdrive voltage."
        },
        {
            "label": "Leading vs Trailing Blur",
            "description": "Compares rise time (dark to light) against fall time (light to dark) across high-speed moving targets."
        },
        {
            "label": "Overdrive Mode Balancing",
            "description": "Guides selection of the optimal OSD overdrive tier (Off, Normal, Fast, Extreme)."
        }
    ],
    "canObserve": [
        "Visual ghosting trails across customizable start and end grey luminance values",
        "Simulation of overdrive corona overshoot across standard liquid crystal overdrive tiers",
        "Edge sharpness and clarity of moving objects across calibrated velocity levels"
    ],
    "cannotMeasure": [
        "Sub-millisecond photodiode oscilloscope transition curves (10% to 90% rise time)",
        "Internal overdrive voltage table lookup values inside the monitor scaler ASIC",
        "Temperature-dependent liquid crystal viscosity changes"
    ],
    "interpretation": "If moving objects show a bright halo or inverse silhouette, your monitor's OSD Overdrive is set too high ('Extreme'). Dialing back to 'Fast' or 'Normal' will deliver cleaner motion clarity without corona artifacts.",
    "nextSteps": {
        "text": "Want to benchmark moving UFO sharpness and persistence blur?",
        "actionLabel": "Launch Ghosting Test",
        "actionHref": "/tests/ghosting-test"
    }
},

  "oled-burn-in-calculator": {
    "overview": "The OLED Burn-in Risk & Longevity Calculator models organic light-emitting diode subpixel degradation based on panel technology generation, daily operating hours, static interface content ratios, and typical SDR/HDR luminance levels. It provides an actuarial forecast of panel lifespan and static HUD hazard hotspots.",
    "whatToLookFor": [
        {
            "label": "Panel Generation Resilience",
            "description": "Accounts for differences between first-gen QD-OLED, modern Gen 3 QD-OLED, and WOLED MLA micro-lens arrays."
        },
        {
            "label": "Static Content Ratio",
            "description": "Calculates cumulative static stress from Windows taskbars, browser headers, and gaming HUDs."
        },
        {
            "label": "Luminance Stress Multiplier",
            "description": "Models the exponential acceleration of organic material aging at high sustained nits."
        },
        {
            "label": "Mitigation Habits Impact",
            "description": "Evaluates the protective value of pixel shift, auto-hide taskbar, logo dimmers, and screen timeouts."
        }
    ],
    "canObserve": [
        "Actuarial estimation of cumulative static hours before uneven subpixel aging occurs",
        "Projected burn-in probability percentages across 1-year, 3-year, and 5-year ownership horizons",
        "Hazard heatmap visualization of high-risk static interface regions"
    ],
    "cannotMeasure": [
        "Real-time physical subpixel voltage degradation on your specific physical panel",
        "Ambient room operating temperature and chassis heatsink thermal dissipation efficiency",
        "Internal factory compensation cycle log data stored in panel EEPROM"
    ],
    "interpretation": "Modern OLED monitors with active pixel shift, thermal heatsinks, and auto-hide taskbars typically achieve 5+ years of daily mixed productivity and gaming without visible retention. High sustained SDR brightness on static white backgrounds accelerates aging.",
    "nextSteps": {
        "text": "Want to inspect your current panel for existing static image retention?",
        "actionLabel": "Launch Burn-In Test",
        "actionHref": "/tests/burn-in-test"
    }
},

  "mouse-polling-test": {
    "overview": "The Mouse Polling Rate & Sensor Precision test captures USB hardware event timestamps via high-precision browser timers. It measures real-time and peak polling frequency in Hertz (up to 8000Hz), checks packet interval stability (jitter), tests button actuation, and diagnoses mechanical switch double-click bouncing.",
    "whatToLookFor": [
        {
            "label": "Real-Time Polling Rate (Hz)",
            "description": "Measures actual USB event report frequency (125Hz, 500Hz, 1000Hz, 4000Hz, 8000Hz)."
        },
        {
            "label": "Interval Jitter & Stability",
            "description": "Checks consistency of delta times between movement packets (e.g. 1.0ms for 1000Hz, 0.25ms for 4000Hz)."
        },
        {
            "label": "Mechanical Double-Click Chatter",
            "description": "Detects switch bounce intervals under 60ms indicating worn mechanical microswitches."
        },
        {
            "label": "DPI Sensor Calibration",
            "description": "Verifies physical drag distance in inches against registered screen pixel movement."
        }
    ],
    "canObserve": [
        "USB mouse movement event frequency reported via performance.now() high-resolution timestamps",
        "Peak, average, and real-time polling rates across continuous motion sessions",
        "Multi-button click actuation counts and millisecond inter-click intervals"
    ],
    "cannotMeasure": [
        "Hardware USB bus polling rate when the mouse is stationary (optical sensors only report on movement)",
        "Sensor lift-off distance (LOD) in physical millimeters",
        "Direct MCU firmware polling rate when browser event loops are throttled by heavy background tasks"
    ],
    "interpretation": "A gaming mouse set to 1000Hz should sustain 950Hz–1000Hz during rapid movement with ~1.0ms interval deltas. If click intervals under 50ms register from single physical depressions, your mouse switch suffers from contact chatter.",
    "nextSteps": {
        "text": "Want to test your visual reaction speed and click latency?",
        "actionLabel": "Launch Reaction Time Test",
        "actionHref": "/tests/reaction-time-test"
    }
},

  "gpu-benchmark-test": {
    "overview": "The GPU WebGL 3D Stress & Performance Benchmark renders complex real-time 3D particle systems and rotating geometries directly in your browser. It measures sustained frame rate, 1% low FPS, frame time variance, and hardware capabilities to identify GPU bottlenecks and thermal throttling under load.",
    "whatToLookFor": [
        {
            "label": "Sustained FPS vs Display Hz",
            "description": "Evaluates whether your GPU can consistently match your monitor's native refresh rate."
        },
        {
            "label": "1% Low FPS Stutter",
            "description": "Tracks the bottom 1% of frame times to detect micro-stutters and background asset hitches."
        },
        {
            "label": "Frame Time Variance (ms)",
            "description": "Monitors frame pacing consistency (16.6ms for 60Hz, 6.9ms for 144Hz, 4.1ms for 240Hz)."
        },
        {
            "label": "Thermal Throttling Drop",
            "description": "Identifies whether frame rates degrade over the course of a 30-second sustained benchmark."
        }
    ],
    "canObserve": [
        "Client-side WebGL 3D rendering throughput across 10,000 to 200,000 active particles",
        "Real-time frame rate, average FPS, 1% low frame rates, and millisecond frame pacing",
        "Detected WebGL graphics renderer string, GPU vendor, and maximum texture dimensions"
    ],
    "cannotMeasure": [
        "Physical GPU core temperature (°C) or fan RPM without native operating system telemetry utilities",
        "GPU board power draw in Watts (TDP)",
        "VRAM memory clock frequency or memory junction temperatures"
    ],
    "interpretation": "High average FPS with low 1% low FPS indicates frame pacing stutter or background CPU thread contention. Smooth frame pacing ensures responsive, tear-free motion on high-refresh gaming displays.",
    "nextSteps": {
        "text": "Want to inspect your monitor's real-time refresh rate pacing?",
        "actionLabel": "Launch Refresh Rate Test",
        "actionHref": "/tests/refresh-rate-test"
    }
},

  "display-certificate": {
    "overview": "The Display Inspection Certificate is a formal quality documentation tool. It aggregates automatically detected hardware parameters (native resolution, color depth, wide gamut, pixel density) with manual visual inspection ratings to generate a printable, certified inspection report for resale grading or manufacturer RMA warranty claims.",
    "whatToLookFor": [
        {
            "label": "Hardware Specification Log",
            "description": "Certifies native panel resolution, color bit-depth, device pixel ratio, and wide color gamut support."
        },
        {
            "label": "Defect Audit Summary",
            "description": "Records exact counts of dead pixels, stuck subpixels, and backlight bleed severity."
        },
        {
            "label": "ISO 9241-307 Compliance",
            "description": "Documents whether the panel meets Class 1 (Zero Bright Dot) or Class 2 consumer replacement criteria."
        },
        {
            "label": "Print-Ready Verification Layout",
            "description": "Formats all data into a clean, watermark-certified certificate optimized for PDF export and printing."
        }
    ],
    "canObserve": [
        "Compilation of system-reported display parameters and user-verified quality grades",
        "Generation of unique cryptographic verification IDs and inspection timestamps",
        "Print-optimized document layout hiding navigation and interactive UI controls"
    ],
    "cannotMeasure": [
        "Automated physical panel serial number readout from internal EDID firmware (requires manual entry)",
        "Legal underwriting of manufacturer warranty claims outside official manufacturer service centers",
        "Spectroradiometer color accuracy Delta E verification without external hardware colorimeters"
    ],
    "interpretation": "Display inspection certificates provide trusted documentation when buying or selling used monitors or submitting RMA return claims during manufacturer return windows.",
    "nextSteps": {
        "text": "Need to pinpoint defective pixel coordinates before generating your certificate?",
        "actionLabel": "Launch Dead Pixel Mapper",
        "actionHref": "/tools/dead-pixel-mapper"
    }
},

  "osd-calibration-guide": {
    "overview": "The Interactive OSD Monitor Calibration Assistant is a visual guide for calibrating your display's physical On-Screen Display (OSD) hardware buttons. It walks users through 6 essential steps—Brightness, Contrast, Gamma 2.2, 6500K Color Temperature, Sharpness, and Overdrive—without requiring expensive hardware colorimeters.",
    "whatToLookFor": [
        {
            "label": "Brightness (Black Clipping)",
            "description": "Tunes OSD Brightness so patch #16 is faintly visible while patch #0 remains inky black."
        },
        {
            "label": "Contrast (White Saturation)",
            "description": "Adjusts OSD Contrast so near-white patch #253 remains distinguishable from pure white #255."
        },
        {
            "label": "Gamma 2.2 Optical Blend",
            "description": "Aligns midtone luminance using an optical pattern where the center disc blends at 2.2."
        },
        {
            "label": "Color Temperature (6500K D65)",
            "description": "Balances Red, Green, and Blue gain sliders to achieve clean, neutral white and grey tones."
        }
    ],
    "canObserve": [
        "Visual feedback targets designed specifically for standard monitor OSD adjustment ranges",
        "Optical blend checkerboards verifying sRGB Gamma 2.2 alignment without calibration probes",
        "High-contrast text and moving block targets for tuning sharpness and overdrive tiers"
    ],
    "cannotMeasure": [
        "Direct software control over physical monitor OSD buttons via DDC/CI protocol",
        "Exact color temperature in Kelvin without a spectrophotometer or colorimeter hardware probe",
        "Hardware LUT (Look-Up Table) internal calibration inside professional color-grading monitors"
    ],
    "interpretation": "Factory default monitor settings are almost always oversaturated, overly bright (100%), and too cool (8000K+). Following this 6-step OSD tuning guide brings your display significantly closer to international sRGB/Rec.709 mastering standards.",
    "nextSteps": {
        "text": "Want to verify color gamut coverage and ColorChecker accuracy?",
        "actionLabel": "Launch Color Accuracy Test",
        "actionHref": "/tests/color-accuracy-test"
    }
},

  "bright-pixel-test": {
  "overview": "Bright or hot pixels are subpixels (red, green, blue, or white) that remain stuck in an illuminated or partially energized state, visible against pure black and dark backgrounds.",
  "whatToLookFor": [
    {
      "label": "Hot Subpixel Dots",
      "description": "Isolated glowing pinpricks of color visible against dark frames in a dimmed room."
    },
    {
      "label": "Chromatic Subpixel Glow",
      "description": "Single red, green, or blue subpixel channels stuck open while neighboring subpixels are off."
    },
    {
      "label": "Clustered Hot Pixels",
      "description": "Multiple defective bright pixels grouped closely together, typically qualifying for warranty return."
    },
    {
      "label": "Bleed vs Bright Pixels",
      "description": "Distinguish sharp 1-pixel pinpricks from diffuse, cloudy edge backlight bleed."
    }
  ],
  "canObserve": [
    "Exact pixel coordinates on pitch black (#000000) and dark backgrounds",
    "Color channel isolation across primary RGB and white test frames",
    "Contrast ratio between hot subpixels and dark surrounding canvas"
  ],
  "cannotMeasure": [
    "Silicon transistor gate leakage current",
    "Physical silicon crystal defect depth under glass substrate",
    "Thermal drift characteristics of panel backplane"
  ],
  "interpretation": "ISO 9241-307 Class 1 displays permit zero bright pixels, while Class 2 panels typically allow up to 2 permanently bright pixels per million.",
  "nextSteps": {
    "text": "Have you located a stuck subpixel? Attempt rapid visual stimulation to unstick it.",
    "actionLabel": "Launch Stuck Pixel Fixer",
    "actionHref": "/tests/stuck-pixel-fixer"
  }
},
  "burn-in-test": {
  "overview": "Screen burn-in (permanent image retention) occurs when organic OLED compounds or phosphors degrade unevenly due to static high-luminance elements such as taskbars, channel logos, or HUD meters.",
  "whatToLookFor": [
    {
      "label": "Ghosted Taskbar Silhouettes",
      "description": "Faint outlines of operating system taskbars or browser navigation bars visible on full-screen gray."
    },
    {
      "label": "HUD & Logo Shadows",
      "description": "Persistent shadows of static video game health bars or television news banners."
    },
    {
      "label": "50% Gray Field Shading",
      "description": "Uneven mottled patches or brightness non-uniformity across mid-gray canvases."
    },
    {
      "label": "Temporary vs Permanent Retention",
      "description": "Check if the shadow dissipates after running non-static video content for 15 minutes."
    }
  ],
  "canObserve": [
    "After-image faint silhouettes across 50% gray and solid primary colors",
    "Quadrant luminescence consistency across the entire display area",
    "Static boundary footprint detection on uniform color fields"
  ],
  "cannotMeasure": [
    "Chemical degradation percentage of OLED organic emissive subpixels",
    "Internal panel total power-on hours (POH)",
    "Factory compensation cycle counter and voltage offsets"
  ],
  "interpretation": "Temporary image retention (TIR) fades within minutes, whereas permanent burn-in remains visible indefinitely across uniform gray and colored backgrounds.",
  "nextSteps": {
    "text": "Calculate your panel's long-term burn-in risk based on your daily usage habits.",
    "actionLabel": "Launch OLED Burn-in Calculator",
    "actionHref": "/tools/oled-burn-in-calculator"
  }
},
  "color-test": {
  "overview": "Display color testing evaluates primary and secondary color reproduction, subpixel spectral purity, and digital-to-analog canvas rendering consistency across full-screen color fields.",
  "whatToLookFor": [
    {
      "label": "Color Purity & Saturation",
      "description": "Ensure solid red, green, blue, cyan, magenta, and yellow fill the screen uniformly without blotches."
    },
    {
      "label": "Edge Chromatic Uniformity",
      "description": "Check that colors do not shift in hue or tone near the outer bezel boundaries."
    },
    {
      "label": "Banding in Saturated Colors",
      "description": "Inspect whether intense pure colors trigger contour banding or posterization."
    },
    {
      "label": "Subpixel Defect Isolation",
      "description": "Observe single dark or off-color specks that become visible only on specific color fields."
    }
  ],
  "canObserve": [
    "Full-screen display of calibrated sRGB and P3 hex color fields",
    "Visual edge-to-edge color temperature and tint consistency",
    "Color channel switching response without persistent after-images"
  ],
  "cannotMeasure": [
    "Absolute spectrophotometric color coordinates (CIE 1931 xy)",
    "Optical peak nits per individual color channel",
    "Physical backlight phosphor spectral spikes"
  ],
  "interpretation": "Quality IPS and OLED displays render uniform color saturation from edge to edge without blotchy color temperature shifts or tinting.",
  "nextSteps": {
    "text": "Want to inspect precise color accuracy and delta deviations?",
    "actionLabel": "Launch Color Accuracy Test",
    "actionHref": "/tests/color-accuracy-test"
  }
},
  "grayscale-test": {
  "overview": "The grayscale test evaluates a monitor's ability to render smooth, neutral luminance steps from absolute black (0%) to peak white (100%) without chromatic color casts or step clipping.",
  "whatToLookFor": [
    {
      "label": "Neutral Gray Tone Balance",
      "description": "Gray steps should appear completely neutral without pink, green, or blue tinting."
    },
    {
      "label": "Distinct Step Separation",
      "description": "Every block in the 16 or 32 step ramp should be individually distinguishable from its neighbor."
    },
    {
      "label": "Dark Step Crush",
      "description": "Verify that steps 1, 2, and 3 do not collapse into pure black."
    },
    {
      "label": "Highlight Step Clipping",
      "description": "Verify that the brightest steps below 100% are clearly visible against pure white."
    }
  ],
  "canObserve": [
    "Stepwise luminance discrimination across standardized 16/32/64 block ramps",
    "Optical neutrality and color balance between neighboring grayscale patches",
    "Browser canvas rendering of linear and sRGB grayscale steps"
  ],
  "cannotMeasure": [
    "Physical transfer function gamma curve exponent without a colorimeter",
    "Black floor luminance in candelas per square meter (cd/m²)",
    "Hardware internal Look-Up Table (1D/3D LUT) bit-depth"
  ],
  "interpretation": "Even steps with neutral color balance indicate proper factory calibration. Tinted gray blocks indicate white point drift or unbalanced RGB gain settings.",
  "nextSteps": {
    "text": "Evaluate your display's mathematical luminance transfer curve.",
    "actionLabel": "Launch Gamma Test",
    "actionHref": "/tests/gamma-test"
  }
},
  "saturation-test": {
  "overview": "Saturation testing verifies how cleanly a display transitions from completely desaturated neutral gray (0%) to fully saturated pure color (100%) across primary and secondary channels.",
  "whatToLookFor": [
    {
      "label": "Linear Saturation Steps",
      "description": "Each 10% increment from 0% to 100% should show an equal and distinct jump in color intensity."
    },
    {
      "label": "Premature Color Clipping",
      "description": "Ensure colors do not reach maximum saturation prematurely at 80% or 90%."
    },
    {
      "label": "Hue Shifts During Desaturation",
      "description": "Watch for color shifts (e.g. red turning orange as saturation decreases)."
    },
    {
      "label": "Wide-Gamut Oversaturation",
      "description": "Verify whether colors appear naturally balanced or unnaturally neon."
    }
  ],
  "canObserve": [
    "10-step saturation ramps across Red, Green, Blue, Cyan, Magenta, and Yellow",
    "Visual step boundary clarity and progression smoothness",
    "Browser color space clamping consistency"
  ],
  "cannotMeasure": [
    "Spectrophotometric purity percentage",
    "Spectral power distribution of color emissions",
    "Physical optical gamut volume in CIELAB units"
  ],
  "interpretation": "Displays with good color management show clean, distinct saturation increments without flattening into solid color blocks before 100%.",
  "nextSteps": {
    "text": "Inspect whether your display supports wide color spaces beyond sRGB.",
    "actionLabel": "Launch Color Gamut Test",
    "actionHref": "/tests/color-gamut-test"
  }
},
  "color-banding-test": {
  "overview": "Color banding occurs when subtle gradients break into visible stepped bands or posterization contours due to insufficient bit-depth, GPU quantization, or poor monitor image processing.",
  "whatToLookFor": [
    {
      "label": "Stepped Banding Contours",
      "description": "Visible harsh lines across smooth gradients instead of a seamless transition."
    },
    {
      "label": "Dark Gradient Posterization",
      "description": "Blocky step artifacts in dark shadow regions of the gradient."
    },
    {
      "label": "Dithering Noise Grain",
      "description": "Fine spatial noise grain visible when temporal or spatial dithering (FRC) is active."
    },
    {
      "label": "Color Tinting in Gradients",
      "description": "Chromatic streaks appearing within supposedly neutral gray or monochrome gradients."
    }
  ],
  "canObserve": [
    "Visual gradient smoothness across 8-bit and 10-bit RGB gradients",
    "Presence of spatial dithering noise and step quantization artifacts",
    "Linear and radial gradient rendering consistency"
  ],
  "cannotMeasure": [
    "Native hardware panel bit-depth (true 8-bit vs 6-bit+FRC)",
    "GPU output color format (RGB 4:4:4 vs 4:2:2/4:2:0 subsampling)",
    "Internal scaler dithering matrix algorithms"
  ],
  "interpretation": "Smooth gradients without harsh lines indicate proper 8-bit or 10-bit color transmission. Visible banding suggests 6-bit FRC limitations or limited dynamic range settings.",
  "nextSteps": {
    "text": "Test multi-channel gradient ramps across custom RGB spectra.",
    "actionLabel": "Launch Gradient Banding Test",
    "actionHref": "/tests/gradient-banding-test"
  }
},
  "color-gamut-test": {
  "overview": "Color gamut testing evaluates whether your display, GPU driver, and browser support wide color spaces such as DCI-P3 and Rec. 2020 beyond standard sRGB.",
  "whatToLookFor": [
    {
      "label": "P3 Gamut Extension Target",
      "description": "A hidden symbol or number visible only on screens capable of displaying Display P3 colors."
    },
    {
      "label": "sRGB Clamping Boundary",
      "description": "Observe whether colors outside sRGB are clipped or accurately rendered."
    },
    {
      "label": "Deep Red & Green Saturation",
      "description": "Check if reds and greens look significantly richer than on standard office monitors."
    },
    {
      "label": "Browser Color Management State",
      "description": "Verify that your web browser is actively utilizing OS color management profiles."
    }
  ],
  "canObserve": [
    "Browser CSS color gamut media query detection (@media (color-gamut: p3))",
    "Visual differentiation between sRGB and Display P3 color patches",
    "Canvas wide-gamut color profile rendering"
  ],
  "cannotMeasure": [
    "Percentage coverage of DCI-P3 or AdobeRGB without a spectrophotometer",
    "Optical volume in CIELAB units",
    "Physical phosphor emission wavelengths"
  ],
  "interpretation": "If the P3 indicator logo is clearly distinguishable from the sRGB background, your display hardware, operating system, and browser actively support wide color gamuts.",
  "nextSteps": {
    "text": "Check high dynamic range peak brightness and metadata handling.",
    "actionLabel": "Launch HDR Capability Test",
    "actionHref": "/tests/hdr-capability-test"
  }
},
  "color-accuracy-test": {
  "overview": "Color accuracy inspection utilizes standardized reference color patches to visually detect hue shifts, perceptual color errors, and skin tone distortion across your display.",
  "whatToLookFor": [
    {
      "label": "Reference Patch Uniformity",
      "description": "Inspect standard ColorChecker-style patches for balance and neutrality."
    },
    {
      "label": "Skin Tone Naturalness",
      "description": "Verify that portrait skin tones do not appear artificially sunburned (too red) or jaundiced (too yellow)."
    },
    {
      "label": "Neutral Gray Axis Alignment",
      "description": "Check that the neutral gray row shows zero chromatic tinting."
    },
    {
      "label": "Secondary Color Balance",
      "description": "Ensure cyan, magenta, and yellow maintain pure hues without drifting toward primaries."
    }
  ],
  "canObserve": [
    "Standard 24-patch reference color palette rendering",
    "Visual alignment against standardized digital reference values",
    "Side-by-side patch consistency across screen regions"
  ],
  "cannotMeasure": [
    "Numerical Delta E (ΔE 2000) deviation values without an external sensor",
    "Absolute CIE L*a*b* coordinates",
    "Ambient light flare impact on perception"
  ],
  "interpretation": "Well-calibrated displays maintain accurate hue and saturation across all test patches without excessive redness in skin tones or greenish grays.",
  "nextSteps": {
    "text": "Learn how to calibrate your monitor using hardware on-screen display controls.",
    "actionLabel": "Launch OSD Calibration Guide",
    "actionHref": "/tools/osd-calibration-guide"
  }
},
  "brightness-test": {
  "overview": "Brightness testing inspects near-black shadow detail (levels 1% to 10%) to ensure dark elements in games, movies, and photos are not crushed into impenetrable pitch black.",
  "whatToLookFor": [
    {
      "label": "Near-Black Square Visibility",
      "description": "Square patches with luminance values from 1% to 5% should be barely distinguishable from the black background."
    },
    {
      "label": "Dark Step Separation",
      "description": "Each successive square should be visibly brighter than the previous one."
    },
    {
      "label": "Black Level Floor",
      "description": "The background should remain deep black and not wash out into charcoal gray."
    },
    {
      "label": "Room Lighting Impact",
      "description": "Turn off room lights to verify that subtle dark squares remain discernible."
    }
  ],
  "canObserve": [
    "Visual distinction of near-black squares against pure black",
    "Step visibility threshold across subtle luminance increments",
    "Contrast between black floor and lowest gray levels"
  ],
  "cannotMeasure": [
    "Absolute peak or minimum luminance in candelas per square meter (nits)",
    "Backlight voltage regulation curves",
    "Ambient reflected glare percentage"
  ],
  "interpretation": "An optimal display reveals step 2% or 3% without washing out the 0% reference black background into a hazy gray.",
  "nextSteps": {
    "text": "Now verify that bright highlights are not clipping into pure white.",
    "actionLabel": "Launch Contrast Test",
    "actionHref": "/tests/contrast-test"
  }
},
  "contrast-test": {
  "overview": "Contrast testing verifies the dynamic ratio between the brightest whites and darkest blacks, ensuring both highlight textures and shadow details remain simultaneously visible.",
  "whatToLookFor": [
    {
      "label": "White Step Differentiation",
      "description": "Verify that squares from 90% to 99% luminance are distinguishable from the pure white background."
    },
    {
      "label": "Black Step Separation",
      "description": "Verify that dark squares from 1% to 10% remain visible against black."
    },
    {
      "label": "Highlight Blooming",
      "description": "Ensure bright white blocks do not bleed optical glare into adjacent dark areas."
    },
    {
      "label": "Washed-Out Midtones",
      "description": "Check that contrast is not artificially boosted, which crushes color gradients."
    }
  ],
  "canObserve": [
    "Simultaneous visibility of near-white and near-black test patches",
    "Boundary separation across multi-step contrast ramps",
    "Visual dynamic range balance across the screen"
  ],
  "cannotMeasure": [
    "Static ANSI contrast ratio (e.g. 1000:1 vs 3000:1) without optical probe",
    "Dynamic contrast modulation speed",
    "Panel reflectance ratio"
  ],
  "interpretation": "Properly set contrast allows near-white squares (up to 98%) to be visible without clipping into pure white, while keeping near-black squares distinct.",
  "nextSteps": {
    "text": "Examine deep shadow detail in dark room viewing environments.",
    "actionLabel": "Launch Black Level Test",
    "actionHref": "/tests/black-level-test"
  }
},
  "black-level-test": {
  "overview": "The black level test measures shadow detail reproduction and black floor depth, ensuring the lowest luminance signals are rendered accurately without black crush or gray haze.",
  "whatToLookFor": [
    {
      "label": "Lowest Visible Gray Step",
      "description": "Locate the lowest percentage box (1%, 2%, or 3%) you can distinguish from true black."
    },
    {
      "label": "Pure Black Background Stability",
      "description": "Confirm the outer background is rendered at 0% (RGB 0,0,0)."
    },
    {
      "label": "Glow vs Black Depth",
      "description": "Note whether the background is truly dark or elevated by IPS glow / backlight bleed."
    },
    {
      "label": "Corner Non-Uniformity",
      "description": "Check if black level rises near the screen corners compared to the center."
    }
  ],
  "canObserve": [
    "Exact threshold of lowest visible near-black step (1% to 8%)",
    "Visual black depth against a darkened viewing room",
    "Corner glow interference affecting shadow perception"
  ],
  "cannotMeasure": [
    "Absolute minimum black luminance in cd/m² (nits)",
    "Liquid crystal light-blocking polarization ratio",
    "Panel light seal integrity"
  ],
  "interpretation": "On OLED panels, true black emits 0 nits. On LCD panels, a faint glow is normal, but steps 1%–2% should remain distinct from the background.",
  "nextSteps": {
    "text": "Test low-luminance grayscale response near 0% to 5%.",
    "actionLabel": "Launch Near-Black Test",
    "actionHref": "/tests/near-black-test"
  }
},
  "white-level-test": {
  "overview": "White level testing inspects the upper highlights of your display to ensure bright white details (levels 240 through 254 in 8-bit) do not clip into a featureless white wash.",
  "whatToLookFor": [
    {
      "label": "Near-White Square Boundaries",
      "description": "Check if squares 250, 252, and 254 are visibly distinct from the pure white background (255)."
    },
    {
      "label": "Discoloration in Bright Highlights",
      "description": "Ensure peak white squares do not take on a yellowish or cyan color cast."
    },
    {
      "label": "Eye Fatigue / Glare",
      "description": "Check if maximum white causes eye discomfort in your current room lighting."
    },
    {
      "label": "Highlight Blooming",
      "description": "Observe whether high-brightness white blocks bleed light into neighboring borders."
    }
  ],
  "canObserve": [
    "Distinguishable boundaries of high-luminance squares against pure white (255)",
    "Color neutrality of peak white across screen quadrants",
    "Edge highlight clipping threshold"
  ],
  "cannotMeasure": [
    "Peak sustained luminance in nits without a light meter",
    "Optical color temperature of peak white (e.g. 6500K) without a colorimeter",
    "Automatic Brightness Limiter (ABL) throttle curves"
  ],
  "interpretation": "If near-white squares up to 253 or 254 are distinguishable from the white background, your monitor avoids highlight clipping and preserves cloud and specular detail.",
  "nextSteps": {
    "text": "Inspect overall luminance uniformity across the full display surface.",
    "actionLabel": "Launch Uniformity Test",
    "actionHref": "/tests/uniformity-test"
  }
},
  "gamma-test": {
  "overview": "Gamma testing uses optical halftone dither fields to visually calibrate display luminance curves to standard 2.2 without requiring an expensive hardware colorimeter.",
  "whatToLookFor": [
    {
      "label": "Solid vs Dithered Pattern Blending",
      "description": "Notice where the inner solid circles blend completely into the alternating striped background."
    },
    {
      "label": "Viewing Distance Adjustment",
      "description": "Step back or squint slightly so fine 1-pixel lines blur into a solid tone."
    },
    {
      "label": "Gamma Curve Blend Point",
      "description": "Identify which numerical value (1.8, 2.0, 2.2, 2.4, 2.6) matches the background."
    },
    {
      "label": "Color Drift in Gray",
      "description": "Observe if the blend point differs between Red, Green, and Blue channels."
    }
  ],
  "canObserve": [
    "Perceptual match point between 50% luminance dither fields and solid gray swatches",
    "Visual approximation of effective gamma curve exponent",
    "Color balance and chromatic neutrality of midtones"
  ],
  "cannotMeasure": [
    "Exact multi-point 10-point/20-point parametric gamma curve",
    "Hardware LUT profile data inside monitor scalar",
    "Digital-to-optical conversion transfer function in millicandelas"
  ],
  "interpretation": "For general computing and sRGB mastering, the pattern should seamlessly blend into the background at the 2.2 indicator mark when viewed from normal distance.",
  "nextSteps": {
    "text": "Calibrate your monitor settings using on-screen hardware buttons.",
    "actionLabel": "Launch OSD Calibration Guide",
    "actionHref": "/tools/osd-calibration-guide"
  }
},
  "solid-color-test": {
  "overview": "Solid color field testing presents full-screen primary, secondary, black, white, and gray backgrounds to inspect panel uniformity, color purity, and subpixel defects.",
  "whatToLookFor": [
    {
      "label": "Edge Color Shifts",
      "description": "Check if the color temperature shifts near the perimeter edges of the screen."
    },
    {
      "label": "Dirty Screen Effect (DSE)",
      "description": "On gray and white fields, inspect for blotchy, cloudy, or banded patches."
    },
    {
      "label": "Subpixel Defect Isolation",
      "description": "Spot dead or stuck subpixels that only reveal themselves on specific primary color fields."
    },
    {
      "label": "Vignetting / Corner Shadowing",
      "description": "Observe whether extreme corners appear slightly darkened compared to the center."
    }
  ],
  "canObserve": [
    "Full-screen visual color consistency across 8 standardized color fields",
    "Edge-to-center brightness shifts and vignetting",
    "Visual detection of dust particles and defective subpixels"
  ],
  "cannotMeasure": [
    "Photometric 9-point or 25-point ANSI uniformity percentage",
    "Panel thickness variation in micrometers",
    "Backlight diffuser optical transmission efficiency"
  ],
  "interpretation": "Uniform solid colors indicate high panel quality and even backlight distribution. Uneven patches or corner vignetting are common on budget LCD displays.",
  "nextSteps": {
    "text": "Inspect 9-zone panel luminance and color temperature uniformity.",
    "actionLabel": "Launch Uniformity Test",
    "actionHref": "/tests/uniformity-test"
  }
},
  "viewing-angle-test": {
  "overview": "Viewing angle testing evaluates how color saturation, brightness, and contrast degrade when the display is viewed from off-center, oblique, and vertical angles.",
  "whatToLookFor": [
    {
      "label": "Color Washout at Angles",
      "description": "Move your head side to side and observe if vibrant colors fade into pastel shades."
    },
    {
      "label": "Gamma Shift / Contrast Loss",
      "description": "Notice if dark shadow details wash out and black levels elevate into milky gray."
    },
    {
      "label": "IPS Glow vs VA Gamma Shift",
      "description": "IPS panels show a silver/white sheen at wide angles; VA panels lose center contrast."
    },
    {
      "label": "Vertical Inversion (TN Panels)",
      "description": "View from below to check if colors invert into negative images on budget TN panels."
    }
  ],
  "canObserve": [
    "Perceived color and contrast shift as viewing angle increases relative to normal",
    "Radial gradient uniformity when viewed off-axis",
    "Angular stability of text and high-contrast lines"
  ],
  "cannotMeasure": [
    "Exact VESA-defined 178°/178° viewing angle contrast threshold (10:1 CR)",
    "Optical polarizing filter extinction ratio",
    "Refractive index of panel glass substrate"
  ],
  "interpretation": "IPS and OLED panels maintain high color fidelity across wide angles. VA panels suffer contrast loss and gamma shift, while TN panels invert colors vertically.",
  "nextSteps": {
    "text": "Check if off-angle viewing exposes corner backlight bleed.",
    "actionLabel": "Launch Backlight Bleed Test",
    "actionHref": "/tests/backlight-bleed-test"
  }
},
  "blooming-test": {
  "overview": "Blooming testing inspects halo artifacts on Full-Array Local Dimming (FALD) and Mini-LED displays where light leaks from active backlight zones into surrounding dark pixels.",
  "whatToLookFor": [
    {
      "label": "Glowing Halos Around Targets",
      "description": "Inspect small white boxes on black for a diffuse glowing aura around their perimeters."
    },
    {
      "label": "Subtitle Blooming on Black Bars",
      "description": "Check if white text causes distracting light flare into black letterbox areas."
    },
    {
      "label": "Starfield Flare",
      "description": "Observe tiny 1px white stars to see if adjacent backlight zones illuminate unnecessarily."
    },
    {
      "label": "Zone Transition Pulsing",
      "description": "Move high-contrast objects across the screen to check for delayed backlight zone brightening."
    }
  ],
  "canObserve": [
    "Visual halo extent and luminance contrast across calibrated target diameters (1px, 5px, 20px, 100px)",
    "Dynamic tracking of moving high-contrast elements across screen quadrants",
    "Sub-pixel boundary sharpness against true black (RGB 0,0,0) canvases"
  ],
  "cannotMeasure": [
    "Total physical Mini-LED dimming zone count inside the chassis",
    "Zone microcontroller algorithm response time in milliseconds",
    "Absolute optical halo luminance without a spot photometer"
  ],
  "interpretation": "Blooming is a physical characteristic of Mini-LED zone count resolution. Reducing local dimming intensity or adding ambient bias lighting minimizes the effect.",
  "nextSteps": {
    "text": "Compare edge backlight bleed vs local dimming performance.",
    "actionLabel": "Launch Backlight Bleed Test",
    "actionHref": "/tests/backlight-bleed-test"
  }
},
  "tv-overscan-test": {
  "overview": "TV overscan testing verifies whether your television or external display renders images with exact 1:1 pixel mapping or artificially zooms in and cuts off perimeter edges.",
  "whatToLookFor": [
    {
      "label": "0% Edge Border Visibility",
      "description": "White boundary lines marked 0% must perfectly touch the physical screen bezel on all four sides."
    },
    {
      "label": "Cropped Indicator Arrows",
      "description": "Check if arrowheads at the outer edges are truncated or hidden behind the bezel."
    },
    {
      "label": "Scaling Blurriness",
      "description": "Inspect whether text and single-pixel borders appear soft and fuzzy due to scaling interpolation."
    },
    {
      "label": "1px Line Sharpness",
      "description": "Alternating 1px border lines should render crisply without moiré interference."
    }
  ],
  "canObserve": [
    "Percentage of edge cropping (0%, 2.5%, 5%) on all four display borders",
    "Boundary arrow visibility and exact pixel-to-bezel alignment",
    "Pixel-to-pixel sharpness against canvas edges"
  ],
  "cannotMeasure": [
    "Internal TV scaler DSP chip registers",
    "Video HDMI EDID overscan flags",
    "Chassis bezel optical overlap dimensions"
  ],
  "interpretation": "If the 0% boundary lines are fully visible and 1px borders are razor-sharp, your display has 1:1 pixel mapping enabled ('Just Scan', 'Fit to Screen', or 'Dot by Dot').",
  "nextSteps": {
    "text": "Verify aspect ratio scaling across circular geometric shapes.",
    "actionLabel": "Launch Scaling & Aspect Ratio Test",
    "actionHref": "/tests/scaling-aspect-test"
  }
},
  "scaling-aspect-test": {
  "overview": "Scaling and aspect ratio testing validates geometric symmetry across standard display ratios (16:9, 16:10, 21:9, 32:9, 4:3), ensuring circles remain perfectly round and unwarped.",
  "whatToLookFor": [
    {
      "label": "Concentric Circle Symmetry",
      "description": "Check that circles are perfectly round with no oval distortion, stretching, or squashing."
    },
    {
      "label": "Square Aspect Uniformity",
      "description": "Verify that square grids have identical pixel width and height."
    },
    {
      "label": "Linear Grid Orthogonality",
      "description": "Ensure horizontal and vertical lines meet at exact 90-degree right angles."
    },
    {
      "label": "Interpolation Moiré",
      "description": "Inspect concentric rings for jagged aliasing or moiré shimmer."
    }
  ],
  "canObserve": [
    "Visual circular symmetry against pixel grids across standard aspect ratios",
    "Aspect ratio distortion caused by incorrect GPU or display scaling modes",
    "Canvas resolution scaling behavior"
  ],
  "cannotMeasure": [
    "Physical panel aspect ratio in millimeters",
    "GPU hardware scaling interpolation filter kernels",
    "Anamorphic lens optical distortion"
  ],
  "interpretation": "Elongated or squashed circles indicate an aspect ratio mismatch in the OS display settings, GPU control panel, or monitor OSD aspect mode.",
  "nextSteps": {
    "text": "Check your display's physical and logical resolution settings.",
    "actionLabel": "Launch Resolution Checker",
    "actionHref": "/tests/resolution-checker"
  }
},
  "screen-tearing-test": {
  "overview": "Screen tearing occurs when the graphics card frame rate is out of sync with the monitor's fixed refresh cycles, causing consecutive frames to render in split horizontal slices.",
  "whatToLookFor": [
    {
      "label": "Horizontal Split Lines",
      "description": "Look for horizontal fracture lines slicing across moving vertical bars."
    },
    {
      "label": "Discontinuous Motion",
      "description": "Notice when the top portion of a moving element is displaced ahead of the bottom portion."
    },
    {
      "label": "Multi-Tear Artifacts",
      "description": "At high framerates, look for multiple simultaneous tears across the screen height."
    },
    {
      "label": "V-Sync Stutter vs Tearing",
      "description": "Check whether enabling V-Sync trades tearing for periodic micro-stutters."
    }
  ],
  "canObserve": [
    "Visual horizontal tearing artifacts on high-velocity moving bars",
    "Frame synchronization stability across user refresh rates",
    "Impact of browser vsync lock on animation smoothness"
  ],
  "cannotMeasure": [
    "GPU hardware scanout line timing",
    "DisplayPort/HDMI vertical blanking interval micro-timings",
    "Direct G-Sync/FreeSync hardware module handshake registers"
  ],
  "interpretation": "Horizontal tear lines confirm disabled or mismatched V-Sync. Variable Refresh Rate (VRR / FreeSync / G-Sync) eliminates tearing without input lag.",
  "nextSteps": {
    "text": "Test variable refresh rate smoothness and tear-free motion.",
    "actionLabel": "Launch VRR Test",
    "actionHref": "/tests/vrr-test"
  }
},
  "screen-flicker-test": {
  "overview": "Screen flicker testing exposes rapid periodic luminance fluctuations caused by low-frequency PWM backlights, voltage ripple, or panel driver timing instability.",
  "whatToLookFor": [
    {
      "label": "Visual Strobing or Shimmering",
      "description": "Detect subtle high-frequency buzzing or flashing on fine striped patterns."
    },
    {
      "label": "Stroboscopic Phantom Lines",
      "description": "Move your eyes rapidly across the screen; lines will appear beaded if flicker is present."
    },
    {
      "label": "Peripheral Vision Sensitivity",
      "description": "Look slightly away from the monitor to see if flicker is more pronounced in peripheral vision."
    },
    {
      "label": "Brightness Threshold",
      "description": "Adjust monitor brightness down to see if flicker begins only below a certain level."
    }
  ],
  "canObserve": [
    "Visual perception of flicker patterns across fine gratings and alternating fields",
    "Stroboscopic interaction with human saccadic eye movements",
    "Pattern shimmer across high-frequency luminance masks"
  ],
  "cannotMeasure": [
    "Precise electrical pulse frequency in Hertz without an oscilloscope photodiode",
    "Backlight driver duty cycle percentage",
    "Harmonic flicker index"
  ],
  "interpretation": "Visible flicker on solid or patterned backgrounds indicates low-frequency PWM dimming or refresh instability, a primary cause of eye fatigue and headaches.",
  "nextSteps": {
    "text": "Perform a dedicated test for pulse-width modulation dimming.",
    "actionLabel": "Launch PWM Flicker Test",
    "actionHref": "/tests/pwm-flicker-test"
  }
},
  "resolution-checker": {
  "overview": "The Resolution Checker provides real-time diagnostics of physical display resolution, CSS viewport dimensions, Device Pixel Ratio (DPR), and pixel density.",
  "whatToLookFor": [
    {
      "label": "Native Resolution Match",
      "description": "Verify that reported physical screen pixels match your monitor manufacturer's specification."
    },
    {
      "label": "High-DPI DPR Scaling Factor",
      "description": "Check whether your Device Pixel Ratio is set to 1.0x (100%), 1.25x (125%), 1.5x (150%), or 2.0x (200%)."
    },
    {
      "label": "Logical Viewport Dimensions",
      "description": "Observe the available CSS pixel space presented to web pages and applications."
    },
    {
      "label": "Aspect Ratio Classification",
      "description": "Confirm that the calculated aspect ratio matches standard 16:9, 16:10, or ultra-wide dimensions."
    }
  ],
  "canObserve": [
    "Browser viewport dimensions (`window.innerWidth`, `window.innerHeight`)",
    "Operating system screen dimensions (`screen.width`, `screen.height`)",
    "Device Pixel Ratio (`window.devicePixelRatio`) reported by the browser environment",
    "Screen orientation and available desktop workspace"
  ],
  "cannotMeasure": [
    "Physical monitor diagonal measurement in inches without user input",
    "Physical dot pitch in millimeters",
    "Multi-monitor topology outside browser scope"
  ],
  "interpretation": "Operating at the panel's native resolution ensures razor-sharp text and graphics. Fractional scaling (e.g. 125%) may cause subtle softness in legacy desktop applications.",
  "nextSteps": {
    "text": "Inspect detailed WebGL graphics capabilities and hardware display info.",
    "actionLabel": "Launch Display Info Diagnostics",
    "actionHref": "/tests/display-info"
  }
},
  "touch-screen-test": {
  "overview": "Touchscreen diagnostics test touch sensor accuracy, responsiveness, dead zones, and edge sensitivity across mobile devices, tablets, and touchscreen monitors.",
  "whatToLookFor": [
    {
      "label": "Touch Tracking Accuracy",
      "description": "Drawn lines should follow directly beneath your fingertip without offset or lag."
    },
    {
      "label": "Unresponsive Dead Zones",
      "description": "Test all corners and borders to ensure every quadrant registers touch inputs."
    },
    {
      "label": "Touch Latency / Trailing",
      "description": "Notice the trailing distance between your moving finger and the drawn ink trail."
    },
    {
      "label": "Edge Registration",
      "description": "Verify that touches along the extreme outer edge of the display register reliably."
    }
  ],
  "canObserve": [
    "Real-time touch coordinates on the screen canvas",
    "Active touch point tracking and drawing continuity",
    "Touch event firing frequency and responsiveness"
  ],
  "cannotMeasure": [
    "Capacitive touch digitizer sampling rate in Hertz (e.g. 120Hz/240Hz polling)",
    "Physical glass surface impedance and anti-fingerprint coating condition",
    "Pressure sensitivity levels in grams without pressure-sensitive hardware"
  ],
  "interpretation": "Smooth, continuous lines across the entire display area verify that the capacitive digitizer has no dead spots, ghost touch issues, or boundary clipping.",
  "nextSteps": {
    "text": "Test multi-finger gesture tracking and maximum touch points.",
    "actionLabel": "Launch Multi-Touch Test",
    "actionHref": "/tests/multi-touch-test"
  }
},
  "sharpness-test": {
  "overview": "Sharpness testing evaluates font rendering, edge clarity, and artificial edge enhancement ringing caused by excessive monitor on-screen display sharpness settings.",
  "whatToLookFor": [
    {
      "label": "White Halo Ringing",
      "description": "Look for bright white borders or fringes around black text and high-contrast lines."
    },
    {
      "label": "Siemens Star Spurious Resolution",
      "description": "Check if spoke lines converge cleanly to the center without circular moiré artifacts."
    },
    {
      "label": "1px Fine Line Raster Clarity",
      "description": "Alternating black and white lines should appear sharp without muddy gray blurring."
    },
    {
      "label": "Text Edge Smudging",
      "description": "Inspect small text samples to ensure letters are crisp without artificial sharpening noise."
    }
  ],
  "canObserve": [
    "High-contrast fine detail rendering across varying font sizes",
    "Presence of artificial white contour halos and edge ringing",
    "Radial spoke resolution on Siemens star patterns"
  ],
  "cannotMeasure": [
    "Optical lens MTF (Modulation Transfer Function) curve",
    "Panel subpixel aperture ratio",
    "Anti-glare matte coating graininess"
  ],
  "interpretation": "Excessive sharpness produces white halos around text and lines, creating visual noise. Lowering monitor OSD sharpness to neutral restores clean, natural edges.",
  "nextSteps": {
    "text": "Evaluate subpixel font smoothing and ClearType rendering.",
    "actionLabel": "Launch Text Clarity Test",
    "actionHref": "/tests/text-clarity-test"
  }
},
  "compare-displays": {
  "overview": "The Display Comparison & Calculator suite calculates Pixel Density (PPI), optimal viewing distances, and aspect ratios, and provides side-by-side monitor evaluation tools.",
  "whatToLookFor": [
    {
      "label": "PPI & PPD Calculations",
      "description": "Compare pixel density and pixels per degree to determine true sharpness."
    },
    {
      "label": "Visual Acuity Limit",
      "description": "Check the distance at which individual pixels become imperceptible to the human eye ('Retina')."
    },
    {
      "label": "Aspect Ratio Proportion",
      "description": "Preview wireframe boxes comparing 16:9, 16:10, 21:9, and 32:9 screen shapes."
    },
    {
      "label": "Dual Screen Matching",
      "description": "Evaluate color, white point, and resolution parity between multiple monitors."
    }
  ],
  "canObserve": [
    "Mathematical PPI and Retina distance calculations based on user dimensions",
    "Interactive aspect ratio wireframe previews and dimension comparisons",
    "Multi-display specification matching matrices"
  ],
  "cannotMeasure": [
    "Colorimeter delta differences between two separate physical panels in real-time",
    "Physical manufacturing bezel tolerances"
  ],
  "interpretation": "Displays exceeding 60 Pixels Per Degree (PPD) at normal viewing distances reach the human visual acuity limit ('Retina'), rendering individual pixels invisible.",
  "nextSteps": {
    "text": "Match color and white point between two side-by-side monitors.",
    "actionLabel": "Launch Dual Monitor Matcher",
    "actionHref": "/tools/dual-monitor-matcher"
  }
},
  "display-info": {
  "overview": "Display Information Diagnostics queries web platform and hardware APIs to inspect GPU vendor, WebGL renderer capabilities, HDR support, color depth, and screen geometry.",
  "whatToLookFor": [
    {
      "label": "GPU Hardware Model & Vendor",
      "description": "Check the unmasked WebGL graphics card string reported by your system."
    },
    {
      "label": "WebGL 1 & WebGL 2 Support",
      "description": "Verify that 3D canvas acceleration and modern shader profiles are active."
    },
    {
      "label": "Wide Color Gamut Capability",
      "description": "Inspect whether your browser detects sRGB, Display-P3, or Rec. 2020 color support."
    },
    {
      "label": "Multi-Screen Window Placement",
      "description": "Check multi-monitor placement API availability for multi-display setups."
    }
  ],
  "canObserve": [
    "System color depth and bits per pixel",
    "Browser screen dimensions and available workspace",
    "WebGL unmasked renderer and vendor strings",
    "CSS color gamut media query capabilities"
  ],
  "cannotMeasure": [
    "Internal GPU core clocks and VRAM bandwidth",
    "Physical monitor firmware version",
    "Physical HDMI/DisplayPort cable revision"
  ],
  "interpretation": "Comprehensive hardware detection confirms whether hardware acceleration and modern web graphics capabilities are fully enabled in your browser.",
  "nextSteps": {
    "text": "Benchmark 3D WebGL rendering frame stability and FPS.",
    "actionLabel": "Launch GPU Benchmark Test",
    "actionHref": "/tests/gpu-benchmark-test"
  }
},
  "custom-pattern": {
  "overview": "The Custom Pattern Generator allows you to configure 12 precision test patterns—including 2D grids, checkerboards, line rasters, and moiré circles—to inspect display geometry and optical alignment.",
  "whatToLookFor": [
    {
      "label": "Grid Line Straightness",
      "description": "Inspect outer boundary lines for barrel distortion or pincushioning on curved displays."
    },
    {
      "label": "Checkerboard Contrast & Bloom",
      "description": "Check for light bleed from bright white squares into adjacent dark squares."
    },
    {
      "label": "1px Horizontal/Vertical Lines",
      "description": "Confirm that fine line gratings render with razor-sharp 1:1 pixel phase tracking."
    },
    {
      "label": "Moiré Interference Rings",
      "description": "Look for circular aliasing rings on fine concentric line patterns."
    }
  ],
  "canObserve": [
    "Real-time rendering of adjustable line densities, colors, and checkerboard sizes",
    "Custom text rendering across serif and sans-serif styles",
    "Visual crosshair convergence and boundary alignment"
  ],
  "cannotMeasure": [
    "External optical distortion from projector lenses or cameras",
    "Internal video scaler clock jitter on analog VGA inputs",
    "Physical chassis bezel frame alignment tolerances"
  ],
  "interpretation": "Precision geometric grids instantly reveal curvature distortions, scaler phase issues, and contrast limitations that natural images hide.",
  "nextSteps": {
    "text": "Read our comprehensive guide to display inspection standards.",
    "actionLabel": "Read Test Patterns Guide",
    "actionHref": "/knowledge-base/display-test-patterns-and-visual-inspection-standards"
  }
},
  "multi-touch-test": {
  "overview": "Multi-touch testing evaluates simultaneous contact tracking, maximum touch point limits, and gesture registration across touchscreen laptops, tablets, and phones.",
  "whatToLookFor": [
    {
      "label": "Maximum Touch Point Count",
      "description": "Place 2, 5, or 10 fingers on the screen to verify how many simultaneous points register."
    },
    {
      "label": "Individual Point Drift / Jitter",
      "description": "Hold fingers stationary and check if reported coordinates stay rock-solid or wobble."
    },
    {
      "label": "Ghost Touch Artifacts",
      "description": "Ensure no phantom touches appear in areas where you are not touching the glass."
    },
    {
      "label": "Smooth Multi-Finger Tracking",
      "description": "Move multiple fingers across the screen and verify all trails update without dropped frames."
    }
  ],
  "canObserve": [
    "Simultaneous active touch point count and identifiers",
    "Individual touch coordinates, radius, and rotation angle",
    "Gesture interaction responsiveness and event firing rates"
  ],
  "cannotMeasure": [
    "Hardware capacitive controller scan rate in Hertz",
    "Palm rejection threshold algorithms in device firmware",
    "Pen/stylus electromagnetic digitizer layers"
  ],
  "interpretation": "Quality modern touch screens support 5 to 10 simultaneous touches with zero cross-talk jitter or dropped contacts.",
  "nextSteps": {
    "text": "Test single-touch accuracy and edge dead zone boundaries.",
    "actionLabel": "Launch Touch Screen Test",
    "actionHref": "/tests/touch-screen-test"
  }
},
  "accelerometer-test": {
  "overview": "Accelerometer diagnostics inspect internal 3-axis motion sensors (X, Y, Z acceleration) on mobile devices, laptops, and tablets using the DeviceMotion API.",
  "whatToLookFor": [
    {
      "label": "Gravity Vector Tracking",
      "description": "Verify that the Z-axis registers approximately 9.8 m/s² when the device is resting flat on a table."
    },
    {
      "label": "Real-Time Tilt Sensitivity",
      "description": "Tilt the device forward, backward, left, and right to observe smooth acceleration changes."
    },
    {
      "label": "Sensor Noise Floor",
      "description": "Check how stable the readings remain when the device is completely stationary."
    },
    {
      "label": "Movement Responsiveness",
      "description": "Shake or move the device to confirm instant acceleration response."
    }
  ],
  "canObserve": [
    "Real-time 3-axis acceleration including gravity (`accelerationIncludingGravity.x/y/z`)",
    "Linear acceleration without gravity (`acceleration.x/y/z`)",
    "Sensor update rate in Hertz reported by the browser"
  ],
  "cannotMeasure": [
    "MEMS physical silicon spring calibration",
    "Temperature coefficient drift inside sensor package",
    "Direct analog voltage levels from sensor circuitry"
  ],
  "interpretation": "A flat, stationary device should register approximately 9.81 m/s² on the Z-axis and near 0 m/s² on X and Y. Excessive fluctuation indicates sensor noise.",
  "nextSteps": {
    "text": "Inspect rotational velocity and angular orientation.",
    "actionLabel": "Launch Gyroscope Test",
    "actionHref": "/tests/gyroscope-test"
  }
},
  "gyroscope-test": {
  "overview": "Gyroscope diagnostics measure rotational velocity (Alpha, Beta, Gamma angular rates) to evaluate orientation tracking and VR/motion sensor fidelity.",
  "whatToLookFor": [
    {
      "label": "Rotational Velocity Tracking",
      "description": "Spin or rotate the device along each axis and observe responsive rate curves in deg/s."
    },
    {
      "label": "Zero-Rate Bias Drift",
      "description": "Verify that rotation values return to 0 deg/s when the device stops moving."
    },
    {
      "label": "Axis Orientation Alignment",
      "description": "Confirm that Pitch, Roll, and Yaw correctly map to physical device rotations."
    },
    {
      "label": "Sensor Jitter",
      "description": "Observe if readings vibrate or remain calm during steady holding."
    }
  ],
  "canObserve": [
    "Real-time 3-axis rotational velocity (`rotationRate.alpha/beta/gamma`)",
    "Absolute or relative orientation angles (`alpha`, `beta`, `gamma`)",
    "Motion event dispatch frequency"
  ],
  "cannotMeasure": [
    "Optical gyroscopic ring laser precision",
    "Hardware compass magnetic field interference",
    "Factory calibration matrix inside sensor chip"
  ],
  "interpretation": "A stationary phone or tablet should report zero or near-zero rotational velocity. Constant non-zero values indicate zero-rate bias drift.",
  "nextSteps": {
    "text": "Test 3-axis linear acceleration and tilt response.",
    "actionLabel": "Launch Accelerometer Test",
    "actionHref": "/tests/accelerometer-test"
  }
},
  "vibration-test": {
  "overview": "Vibration testing verifies haptic feedback motors and vibration actuators on mobile devices using the Web Vibration API.",
  "whatToLookFor": [
    {
      "label": "Haptic Pulse Sharpness",
      "description": "Feel whether the vibration starts and stops crisply without lingering buzz."
    },
    {
      "label": "Sustained Motor Intensity",
      "description": "Verify steady vibration force during continuous vibration pulses."
    },
    {
      "label": "Rhythmic Pattern Accuracy",
      "description": "Listen and feel for distinct rhythm cadences during SOS or custom pattern playback."
    },
    {
      "label": "Chassis Resonance",
      "description": "Check if the vibration causes excessive mechanical rattling in device buttons."
    }
  ],
  "canObserve": [
    "Execution of single pulse and rhythmic vibration pattern arrays",
    "Browser Web Vibration API feature support (`navigator.vibrate`)",
    "User-triggered haptic tactile responses"
  ],
  "cannotMeasure": [
    "Actuator physical G-force acceleration",
    "ERM (Eccentric Rotating Mass) vs LRA (Linear Resonant Actuator) motor architecture",
    "Acoustic noise emission in decibels"
  ],
  "interpretation": "Clear, distinct haptic pulses verify that the device vibration motor and operating system permissions are functioning correctly.",
  "nextSteps": {
    "text": "Inspect device touchscreen responsiveness and accuracy.",
    "actionLabel": "Launch Touch Screen Test",
    "actionHref": "/tests/touch-screen-test"
  }
},
  "webcam-test": {
  "overview": "Webcam diagnostics evaluate video capture resolution, frame rate, focus, exposure, and color accuracy across integrated and USB web cameras.",
  "whatToLookFor": [
    {
      "label": "Optical Sharpness & Focus",
      "description": "Inspect fine text and facial details for clean focus without digital blur."
    },
    {
      "label": "Auto-Exposure Hunting",
      "description": "Check if brightness continuously pumps or stays steady when lighting shifts."
    },
    {
      "label": "Low-Light Sensor Noise",
      "description": "Observe whether dark areas develop heavy colored grain or mosquito noise."
    },
    {
      "label": "Color Balance & Skin Tones",
      "description": "Verify that white balance looks natural rather than yellowish or sickly blue."
    }
  ],
  "canObserve": [
    "Real-time video stream resolution and aspect ratio",
    "Camera device selection and switching",
    "Canvas snapshot capture and preview"
  ],
  "cannotMeasure": [
    "CMOS image sensor physical pixel size in microns",
    "Hardware ISP lens distortion correction algorithms",
    "Signal-to-Noise Ratio (SNR) in decibels"
  ],
  "interpretation": "High frame rates and sharp, noise-free capture indicate adequate ambient lighting and proper camera driver configuration.",
  "nextSteps": {
    "text": "Test microphone input levels and audio clarity.",
    "actionLabel": "Launch Microphone Test",
    "actionHref": "/tests/microphone-test"
  }
},
  "speaker-test": {
  "overview": "Speaker testing verifies left and right stereo channel separation, frequency response, phase alignment, and audio driver playback balance.",
  "whatToLookFor": [
    {
      "label": "Left Channel Isolation",
      "description": "Verify sound plays exclusively from the left physical speaker."
    },
    {
      "label": "Right Channel Isolation",
      "description": "Verify sound plays exclusively from the right physical speaker."
    },
    {
      "label": "Stereo Center Imaging",
      "description": "Both speakers playing simultaneously should create the illusion of sound originating in the center."
    },
    {
      "label": "Rattling or Distortion",
      "description": "Listen for buzzing, clipping, or chassis vibration during frequency sweeps."
    }
  ],
  "canObserve": [
    "Independent left, right, and center synthesized tone playback",
    "Web Audio API stereo panner routing and volume gain",
    "Frequency sweep tone generation from 20Hz to 20,000Hz"
  ],
  "cannotMeasure": [
    "Acoustic frequency response curve in dB SPL without an external calibrated microphone",
    "Total Harmonic Distortion (THD) percentage",
    "Speaker voice coil temperature and impedance"
  ],
  "interpretation": "Sound should emit exclusively from the designated speaker during channel testing. Sound leaking to the opposite speaker indicates mono downmixing.",
  "nextSteps": {
    "text": "Verify video and audio synchronization latency.",
    "actionLabel": "Launch Audio Sync Test",
    "actionHref": "/tests/audio-sync-test"
  }
},
  "microphone-test": {
  "overview": "Microphone testing evaluates audio input levels, background noise floor, frequency response, and microphone sensitivity using the Web Audio API.",
  "whatToLookFor": [
    {
      "label": "VU Meter Activity",
      "description": "Speak into the microphone and confirm the volume meter responds dynamically."
    },
    {
      "label": "Background Noise Floor",
      "description": "When remaining silent, the volume meter should drop down to near-zero."
    },
    {
      "label": "Clipping / Peaking",
      "description": "Loud speech should not peg the meter permanently into red overload."
    },
    {
      "label": "Frequency Spectrum Range",
      "description": "Observe whether bass, mid, and treble voice frequencies register on the visualizer."
    }
  ],
  "canObserve": [
    "Real-time audio waveform and frequency spectrum visualizer",
    "Peak volume input levels and decibel thresholds",
    "Microphone hardware device selection and permission state"
  ],
  "cannotMeasure": [
    "Capsule acoustic frequency response curve in Hertz",
    "Absolute sound pressure level (dBA)",
    "Self-noise floor of analog preamp circuitry"
  ],
  "interpretation": "Clear waveform peaks during speech and a quiet baseline during silence verify healthy microphone sensitivity and proper gain settings.",
  "nextSteps": {
    "text": "Verify stereo speaker channel separation and output balance.",
    "actionLabel": "Launch Speaker Test",
    "actionHref": "/tests/speaker-test"
  }
},
  "reaction-time-test": {
  "overview": "Reaction time testing measures human visual reflex latency combined with display input lag and browser event processing delays.",
  "whatToLookFor": [
    {
      "label": "Instant Visual State Change",
      "description": "Focus intently on the target box as it changes from waiting red to trigger green."
    },
    {
      "label": "Click Response Timing",
      "description": "Click or tap as rapidly as possible the moment green appears."
    },
    {
      "label": "False Start Detection",
      "description": "Clicking too early triggers a warning and resets the trial."
    },
    {
      "label": "Latency Distribution",
      "description": "Complete 5 trials to observe your mean reaction speed and consistency."
    }
  ],
  "canObserve": [
    "Millisecond latency from visual state transition to pointer/keyboard event trigger",
    "Statistical average, median, and variance across multiple consecutive trials",
    "False start timing violations"
  ],
  "cannotMeasure": [
    "Isolated human neural synaptic transmission time separate from display input lag and mouse USB polling latency",
    "Display panel internal frame processing delay in isolation"
  ],
  "interpretation": "Typical visual human reaction times range from 200ms to 260ms. Total measured time includes monitor refresh delay and peripheral input latency.",
  "nextSteps": {
    "text": "Evaluate input lag and click-to-photon latency factors.",
    "actionLabel": "Launch Input Lag Test",
    "actionHref": "/tests/input-lag-test"
  }
},
  "pixel-inversion-test": {
  "overview": "Pixel inversion (interlace flicker) tests how well the monitor's VCOM voltage balances liquid crystal polarity, preventing visible flicker and pixel crosstalk.",
  "whatToLookFor": [
    {
      "label": "Flickering Pattern Blocks",
      "description": "Look for patches that buzz, flicker, or vibrate while other patches remain static."
    },
    {
      "label": "Solid Gray Stability",
      "description": "Patterns should appear as calm, uniform gray blocks without pulsating intensity."
    },
    {
      "label": "Pixel Inversion Crosstalk",
      "description": "Check if moving lines create vertical or horizontal ghost bands on striped backgrounds."
    },
    {
      "label": "Color Tinting on Inversion",
      "description": "Observe whether fine alternating patterns take on a green or purple color cast."
    }
  ],
  "canObserve": [
    "Visual flickering on calibrated subpixel checkerboards and dot-inversion patterns",
    "VCOM voltage balance stability across 6 standardized inversion test patterns",
    "Subpixel crosstalk under high-frequency electrical polarity switching"
  ],
  "cannotMeasure": [
    "Internal LCD panel VCOM bias voltage in millivolts",
    "Liquid crystal polarity switching micro-currents",
    "Hardware panel driver timing registers"
  ],
  "interpretation": "If any pattern flickers noticeably, your display has slight VCOM voltage imbalance, common on high-refresh budget gaming panels.",
  "nextSteps": {
    "text": "Test variable refresh rate brightness fluctuations.",
    "actionLabel": "Launch VRR Flicker Test",
    "actionHref": "/tests/vrr-flicker-test"
  }
},
};


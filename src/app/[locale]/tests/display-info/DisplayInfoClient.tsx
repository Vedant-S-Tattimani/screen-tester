"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { Link, useRouter } from "@/i18n/routing";
import { 
  ArrowLeft, ArrowRight, Monitor, Maximize2, Minimize2, Cpu, 
  Palette, ShieldAlert, CheckCircle2, XCircle, 
  Play, Pause, RefreshCw
} from "lucide-react";
import { 
  supportsFullscreen, supportsTouch, supportsWebGL, supportsWebGL2, 
  supportsWebGPU, supportsScreenDetails, supportsScreenOrientation, 
  supportsCanvas2D, supportsHDR, supportsP3, supportsRec2020, 
  getWebGLDiagnostics, getDevicePixelRatio 
} from "@/lib/browserCapabilities";
import { recordTestObservation, ObservationResult } from "@/lib/inspectionStorage";

interface ScreenDetailInfo {
  label?: string;
  isPrimary?: boolean;
  isCurrent?: boolean;
  width: number;
  height: number;
  availWidth: number;
  availHeight: number;
  devicePixelRatio: number;
  orientation?: string;
}

export function DisplayInfoClient() {
  const router = useRouter();
  const [workflowSequence, setWorkflowSequence] = useState<string[]>([]);
  const [workflowIndex, setWorkflowIndex] = useState(-1);
  const [obsChoice, setObsChoice] = useState<ObservationResult>("LOOKS_NORMAL");

  useEffect(() => {
    queueMicrotask(() => {
      try {
        if (typeof window !== "undefined") {
          const raw = sessionStorage.getItem("monitor-tester-workflow");
          if (raw) {
            const seq = JSON.parse(raw);
            if (Array.isArray(seq) && seq.length > 0) {
              setWorkflowSequence(seq);
              const idx = seq.findIndex((s: string) => s.includes("display-info"));
              setWorkflowIndex(idx !== -1 ? idx : 0);
            }
          }
        }
      } catch {}
    });
  }, []);

  const handleNextStep = (forcedResult?: ObservationResult) => {
    const resultToRecord = forcedResult !== undefined ? forcedResult : obsChoice;
    recordTestObservation("display-info", resultToRecord);

    if (workflowIndex !== -1 && workflowSequence.length > 0) {
      const nextIdx = workflowIndex + 1;
      if (nextIdx < workflowSequence.length) {
        router.push(workflowSequence[nextIdx]);
      } else {
        router.push("/monitor-inspection/summary");
      }
    }
  };

  const [screenInfo, setScreenInfo] = useState({
    w: 0,
    h: 0,
    availW: 0,
    availH: 0,
    innerW: 0,
    innerH: 0,
    dpr: 1,
    colorDepth: 0,
    pixelDepth: 0,
    orientationType: "Unknown",
    orientationAngle: 0,
    refreshRate: 0,
  });

  const capabilities = useMemo(() => {
    return [
      { name: "Fullscreen API", supported: supportsFullscreen(), desc: "Full display immersion without browser chrome" },
      { name: "HTML5 Canvas 2D", supported: supportsCanvas2D(), desc: "Hardware-accelerated 2D rasterization context" },
      { name: "WebGL 1.0", supported: supportsWebGL(), desc: "OpenGL ES 2.0 graphics pipeline in browser" },
      { name: "WebGL 2.0", supported: supportsWebGL2(), desc: "OpenGL ES 3.0 advanced shaders & floating textures" },
      { name: "WebGPU API", supported: supportsWebGPU(), desc: "Next-gen low-overhead GPU compute & rendering API" },
      { name: "Screen Orientation API", supported: supportsScreenOrientation(), desc: "Orientation lock & change event tracking" },
      { name: "Window Management (Multi-Screen)", supported: supportsScreenDetails(), desc: "Cross-screen topology & multi-display placement" },
      { name: "High Dynamic Range (HDR)", supported: supportsHDR(), desc: "dynamic-range: high media query matches OS pipeline" },
      { name: "Wide Color Gamut (P3)", supported: supportsP3(), desc: "Display P3 color space supported by display chain" },
      { name: "Rec. 2020 Wide Gamut", supported: supportsRec2020(), desc: "Ultra-wide Rec. 2020 gamut signaling" },
      { name: "Touch Input Points", supported: supportsTouch(), desc: "Capacitive touch / stylus digitizer input detected" },
    ];
  }, []);

  const webglInfo = useMemo(() => {
    return getWebGLDiagnostics();
  }, []);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenError, setFullscreenError] = useState<string | null>(null);

  // Multi-monitor state
  const [isExtended, setIsExtended] = useState<boolean | null>(null);
  const [screensList, setScreensList] = useState<ScreenDetailInfo[]>([]);
  const [multiMonitorError, setMultiMonitorError] = useState<string | null>(null);
  const [detectingScreens, setDetectingScreens] = useState(false);

  // WebGL Render animation state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRendering, setIsRendering] = useState(true);
  const [webglFps, setWebglFps] = useState(0);

  // Update screen metrics
  const updateMetrics = useCallback(() => {
    if (typeof window === "undefined") return;

    const dpr = getDevicePixelRatio();
    setScreenInfo((prev) => ({
      ...prev,
      w: window.screen.width,
      h: window.screen.height,
      availW: window.screen.availWidth,
      availH: window.screen.availHeight,
      innerW: window.innerWidth,
      innerH: window.innerHeight,
      dpr,
      colorDepth: window.screen.colorDepth,
      pixelDepth: window.screen.pixelDepth,
      orientationType: window.screen.orientation?.type || "Standard",
      orientationAngle: window.screen.orientation?.angle || 0,
    }));

    setIsFullscreen(!!document.fullscreenElement);
    const screenAny = window.screen as unknown as { isExtended?: boolean };
    if ('isExtended' in screenAny) {
      setIsExtended(!!screenAny.isExtended);
    }
  }, []);

  // Initialize metrics & capabilities
  useEffect(() => {
    queueMicrotask(updateMetrics);
    window.addEventListener("resize", updateMetrics);
    window.addEventListener("orientationchange", updateMetrics);
    document.addEventListener("fullscreenchange", updateMetrics);

    // Measure refresh rate via requestAnimationFrame
    let frameCount = 0;
    let startTime = performance.now();
    let animId: number;

    const measureHz = (time: number) => {
      frameCount++;
      if (time - startTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (time - startTime));
        setScreenInfo((prev) => ({ ...prev, refreshRate: fps }));
        frameCount = 0;
        startTime = time;
      }
      animId = requestAnimationFrame(measureHz);
    };
    animId = requestAnimationFrame(measureHz);

    return () => {
      window.removeEventListener("resize", updateMetrics);
      window.removeEventListener("orientationchange", updateMetrics);
      document.removeEventListener("fullscreenchange", updateMetrics);
      cancelAnimationFrame(animId);
    };
  }, [updateMetrics]);

  // Fullscreen action
  const toggleFullscreen = async () => {
    setFullscreenError(null);
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error("Fullscreen toggle failed:", err);
      setFullscreenError("Fullscreen request was blocked by browser permissions or sandbox policy.");
    }
  };

  // Multi-screen detection action
  const handleDetectScreens = async () => {
    setDetectingScreens(true);
    setMultiMonitorError(null);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const win = window as any;
      if (typeof win.getScreenDetails === "function") {
        const screenDetails = await win.getScreenDetails();
        if (screenDetails && screenDetails.screens) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const parsed: ScreenDetailInfo[] = screenDetails.screens.map((s: any, i: number) => ({
            label: s.label || `Display #${i + 1}`,
            isPrimary: s.isPrimary,
            isCurrent: s === screenDetails.currentScreen,
            width: s.width,
            height: s.height,
            availWidth: s.availWidth,
            availHeight: s.availHeight,
            devicePixelRatio: s.devicePixelRatio,
            orientation: s.orientation?.type,
          }));
          setScreensList(parsed);
          setIsExtended(screenDetails.screens.length > 1);
        }
      } else {
        setMultiMonitorError("Window Management API (getScreenDetails) is not supported in this browser engine.");
      }
    } catch (err) {
      console.warn("Screen details permission denied or failed", err);
      setMultiMonitorError("Permission to query multi-display layout was denied. The browser cannot inspect other displays without explicit permission.");
    } finally {
      setDetectingScreens(false);
    }
  };

  // Controlled WebGL 3D Render Canvas (3D rotating polyhedron with ambient + directional shading)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    let animId: number;
    let angle = 0;
    let lastTime = performance.now();
    let frames = 0;
    let lastFpsTime = performance.now();

    // Shaders
    const vsSource = `
      attribute vec3 position;
      attribute vec3 color;
      uniform mat4 uMatrix;
      varying vec3 vColor;
      void main() {
        gl_Position = uMatrix * vec4(position, 1.0);
        vColor = color;
      }
    `;

    const fsSource = `
      precision mediump float;
      varying vec3 vColor;
      void main() {
        gl_FragColor = vec4(vColor, 1.0);
      }
    `;

    const createShader = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      return shader;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, vsSource);
    const fragShader = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Cube vertices & colors
    const vertices = new Float32Array([
      // Front face (Reddish)
      -0.6, -0.6,  0.6,   0.9, 0.2, 0.3,
       0.6, -0.6,  0.6,   0.9, 0.2, 0.3,
       0.6,  0.6,  0.6,   0.9, 0.3, 0.4,
      -0.6,  0.6,  0.6,   0.9, 0.3, 0.4,
      // Back face (Blueish)
      -0.6, -0.6, -0.6,   0.2, 0.4, 0.9,
       0.6, -0.6, -0.6,   0.2, 0.4, 0.9,
       0.6,  0.6, -0.6,   0.3, 0.5, 0.9,
      -0.6,  0.6, -0.6,   0.3, 0.5, 0.9,
      // Top face (Greenish)
      -0.6,  0.6, -0.6,   0.2, 0.8, 0.4,
       0.6,  0.6, -0.6,   0.2, 0.8, 0.4,
       0.6,  0.6,  0.6,   0.3, 0.9, 0.5,
      -0.6,  0.6,  0.6,   0.3, 0.9, 0.5,
      // Bottom face (Yellowish)
      -0.6, -0.6, -0.6,   0.9, 0.8, 0.2,
       0.6, -0.6, -0.6,   0.9, 0.8, 0.2,
       0.6, -0.6,  0.6,   0.9, 0.8, 0.3,
      -0.6, -0.6,  0.6,   0.9, 0.8, 0.3,
    ]);

    const indices = new Uint16Array([
      0, 1, 2,  0, 2, 3,
      4, 6, 5,  4, 7, 6,
      8, 9, 10, 8, 10, 11,
      12, 14, 13, 12, 15, 14,
    ]);

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, "position");
    const colLoc = gl.getAttribLocation(program, "color");
    const matLoc = gl.getUniformLocation(program, "uMatrix");

    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 24, 0);

    gl.enableVertexAttribArray(colLoc);
    gl.vertexAttribPointer(colLoc, 3, gl.FLOAT, false, 24, 12);

    gl.enable(gl.DEPTH_TEST);

    const renderLoop = (time: number) => {
      animId = requestAnimationFrame(renderLoop);

      frames++;
      if (time - lastFpsTime >= 500) {
        setWebglFps(Math.round((frames * 1000) / (time - lastFpsTime)));
        frames = 0;
        lastFpsTime = time;
      }

      if (!isRendering) return;

      const delta = (time - lastTime) / 1000;
      lastTime = time;
      angle += delta * 1.2;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0.05, 0.05, 0.07, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      // Simple 3D projection & rotation matrix
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const cosB = Math.cos(angle * 0.7);
      const sinB = Math.sin(angle * 0.7);

      // Model-View-Projection combined
      const aspect = canvas.width / canvas.height;
      const fov = 1.0 / Math.tan((45 * Math.PI) / 360);
      const zNear = 0.1;
      const zFar = 100.0;
      const zDist = 2.4;

      const matrix = new Float32Array([
        (fov / aspect) * cosA,   sinA * sinB * fov,              -sinA * cosB * (zFar / (zNear - zFar)),   0,
        0,                       fov * cosB,                     sinB * (zFar / (zNear - zFar)),           0,
        (fov / aspect) * sinA,   -cosA * sinB * fov,             cosA * cosB * (zFar / (zNear - zFar)),    -1,
        0,                       0,                              (zNear * zFar) / (zNear - zFar) - zDist,  zDist
      ]);

      gl.uniformMatrix4fv(matLoc, false, matrix);
      gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isRendering]);

  const physicalW = Math.round(screenInfo.w * screenInfo.dpr);
  const physicalH = Math.round(screenInfo.h * screenInfo.dpr);
  const totalMegapixels = ((physicalW * physicalH) / 1000000).toFixed(2);

  return (
    <div className="bg-white min-h-screen py-10 sm:py-14 text-gray-900">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* WORKFLOW BANNER IF ACTIVE */}
        {workflowIndex !== -1 && workflowSequence.length > 0 && (
          <div className="w-full mb-8 p-4 sm:p-5 bg-blue-50/90 border border-blue-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-blue-950 shadow-2xs">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-blue-700 font-semibold mb-1">
                INSPECTION WORKFLOW • STEP {workflowIndex + 1} OF {workflowSequence.length}
              </div>
              <div className="text-sm font-semibold text-blue-950 flex items-center gap-2">
                <span>Display Information &amp; Browser Query</span>
                <span className="text-xs font-normal text-blue-700">· Verify browser reported parameters match expectations</span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {/* Observation status selector */}
              <div className="inline-flex rounded-xl bg-white/90 p-1 border border-blue-200">
                <button
                  onClick={() => setObsChoice("LOOKS_NORMAL")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    obsChoice === "LOOKS_NORMAL"
                      ? "bg-emerald-600 text-white font-semibold shadow-2xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Normal (Observed)
                </button>
                <button
                  onClick={() => setObsChoice("NEEDS_ATTENTION")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    obsChoice === "NEEDS_ATTENTION"
                      ? "bg-amber-600 text-white font-semibold shadow-2xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Needs Attention
                </button>
              </div>

              <button
                onClick={() => handleNextStep("UNSURE")}
                className="text-xs text-blue-700 hover:text-blue-950 font-medium px-2 py-1.5 transition-colors cursor-pointer"
              >
                Skip →
              </button>

              <button
                onClick={() => handleNextStep()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Save &amp; Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-gray-400 mb-6">
          <Link href="/tests" className="hover:text-gray-900 flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>ALL TESTS</span>
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">DISPLAY INFORMATION & CAPABILITIES</span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-[11px] font-mono font-medium uppercase tracking-[0.2em] text-gray-400 mb-2">
              BROWSER REPORTED DIAGNOSTIC QUERY
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-950">
              Display Information & Capabilities
            </h1>
            <p className="text-gray-500 text-sm sm:text-base mt-1.5 max-w-2xl leading-relaxed">
              Legitimate display parameters, graphics APIs, and browser window metrics queried directly from your browser environment.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleFullscreen}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-950 text-white text-xs sm:text-sm font-medium hover:bg-black transition-colors"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              <span>{isFullscreen ? "Exit Fullscreen" : "Test Fullscreen (F)"}</span>
            </button>
          </div>
        </div>

        {/* Prominent Disclaimer Banner */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 mb-10 flex items-start gap-3.5 text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
          <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold block mb-1">
              Browser-Reported Information — Not Hardware Telemetry
            </strong>
            Web browsers operate within a secure operating system sandbox. All values shown below reflect what the browser and OS compositor expose to web APIs. This test does not pretend to access direct hardware sensor telemetry (such as physical monitor EEPROM, factory EDID ROM, internal panel voltage, or subpixel stripe arrangements).
          </div>
        </div>

        {fullscreenError && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 text-xs flex items-center gap-2">
            <XCircle className="w-4 h-4" />
            <span>{fullscreenError}</span>
          </div>
        )}

        {/* ========================================================= */}
        {/* SECTION 1: CORE SCREEN & VIEWPORT GEOMETRY                */}
        {/* ========================================================= */}
        <div className="mb-12">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-6">
            <h2 className="text-sm font-mono font-bold tracking-[0.15em] text-gray-400 uppercase">
              1. Screen & Viewport Geometry
            </h2>
            <span className="text-xs font-mono text-gray-400">Live Browser Context</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1: Logical Resolution */}
            <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50/70">
              <span className="text-xs text-gray-400 font-mono uppercase block mb-1">Logical Resolution</span>
              <span className="text-2xl font-bold font-mono text-gray-950 block tabular-nums">
                {screenInfo.w > 0 ? `${screenInfo.w} × ${screenInfo.h}` : "Probing..."}
              </span>
              <span className="text-xs text-gray-500 mt-1 block">CSS Layout Pixels</span>
            </div>

            {/* Card 2: Estimated Physical Pixels */}
            <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50/70">
              <span className="text-xs text-gray-400 font-mono uppercase block mb-1">Estimated Physical Res</span>
              <span className="text-2xl font-bold font-mono text-gray-950 block tabular-nums">
                {screenInfo.w > 0 ? `${physicalW} × ${physicalH}` : "Probing..."}
              </span>
              <span className="text-xs text-gray-500 mt-1 block">≈ {totalMegapixels} Megapixels (W×H×DPR)</span>
            </div>

            {/* Card 3: Viewport Dimensions */}
            <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50/70">
              <span className="text-xs text-gray-400 font-mono uppercase block mb-1">Current Viewport</span>
              <span className="text-2xl font-bold font-mono text-gray-950 block tabular-nums">
                {screenInfo.innerW > 0 ? `${screenInfo.innerW} × ${screenInfo.innerH}` : "Probing..."}
              </span>
              <span className="text-xs text-gray-500 mt-1 block">window.innerWidth × innerHeight</span>
            </div>

            {/* Card 4: Device Pixel Ratio */}
            <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50/70">
              <span className="text-xs text-gray-400 font-mono uppercase block mb-1">Device Pixel Ratio (DPR)</span>
              <span className="text-2xl font-bold font-mono text-blue-600 block tabular-nums">
                {screenInfo.dpr.toFixed(2)}x
              </span>
              <span className="text-xs text-gray-500 mt-1 block">
                {screenInfo.dpr >= 2 ? "High-DPI / Retina Scaling" : screenInfo.dpr === 1 ? "Standard 100% 1:1 Scaling" : "Custom Fractional OS Scaling"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
            {/* Available Screen Area */}
            <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50/50">
              <span className="text-xs text-gray-400 font-mono uppercase block mb-1">Available Screen Area</span>
              <span className="text-xl font-semibold font-mono text-gray-900 block tabular-nums">
                {screenInfo.availW} × {screenInfo.availH}
              </span>
              <span className="text-xs text-gray-500 mt-1 block">Excluding OS Taskbars / Menubars</span>
            </div>

            {/* Color & Pixel Depth */}
            <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50/50">
              <span className="text-xs text-gray-400 font-mono uppercase block mb-1">Color & Pixel Depth</span>
              <span className="text-xl font-semibold font-mono text-gray-900 block tabular-nums">
                {screenInfo.colorDepth}-bit / {screenInfo.pixelDepth}-bit
              </span>
              <span className="text-xs text-gray-500 mt-1 block">24-bit True Color (8-bit per channel)</span>
            </div>

            {/* Screen Orientation */}
            <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50/50">
              <span className="text-xs text-gray-400 font-mono uppercase block mb-1">Screen Orientation</span>
              <span className="text-xl font-semibold font-mono text-gray-900 block capitalize">
                {screenInfo.orientationType.replace("-", " ")}
              </span>
              <span className="text-xs text-gray-500 mt-1 block">{screenInfo.orientationAngle}° Angle</span>
            </div>

            {/* Observed Refresh Rate */}
            <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50/50">
              <span className="text-xs text-gray-400 font-mono uppercase block mb-1">Observed Frame Timing</span>
              <span className="text-xl font-semibold font-mono text-emerald-600 block tabular-nums">
                {screenInfo.refreshRate > 0 ? `~${screenInfo.refreshRate} Hz` : "Measuring..."}
              </span>
              <span className="text-xs text-gray-500 mt-1 block">requestAnimationFrame hardware sync</span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 2: BROWSER CAPABILITY MATRIX                      */}
        {/* ========================================================= */}
        <div className="mb-12">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-6">
            <h2 className="text-sm font-mono font-bold tracking-[0.15em] text-gray-400 uppercase">
              2. Browser Capability & API Matrix
            </h2>
            <span className="text-xs font-mono text-gray-400">Standardized API Feature Probing</span>
          </div>

          <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/80">
                  <th className="py-3 px-4 font-mono text-xs font-semibold text-gray-500 uppercase tracking-wider">Feature / Standard</th>
                  <th className="py-3 px-4 font-mono text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-4 font-mono text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {capabilities.map((c) => (
                  <tr key={c.name} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 px-4 font-medium text-gray-900">{c.name}</td>
                    <td className="py-3 px-4">
                      {c.supported ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Supported</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Not Supported</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-xs text-gray-500 hidden sm:table-cell">{c.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 3: WEBGL 3D CONTROLLED RENDERING TEST             */}
        {/* ========================================================= */}
        <div className="mb-12">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-6">
            <h2 className="text-sm font-mono font-bold tracking-[0.15em] text-gray-400 uppercase">
              3. WebGL Diagnostics & Controlled Render Test
            </h2>
            <span className="text-xs font-mono text-gray-400">GPU Pipeline Verification</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Interactive 3D Canvas */}
            <div className="lg:col-span-6 border border-gray-200 rounded-2xl p-5 bg-gray-950 text-white flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                    <Cpu className="w-4 h-4 text-blue-400" />
                    <span>CONTROLLED 3D POLYHEDRON RENDER</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-black/60 px-2.5 py-1 rounded-md border border-white/10">
                    <span>{webglFps > 0 ? `${webglFps} FPS` : "-- FPS"}</span>
                  </div>
                </div>

                <div className="w-full aspect-video rounded-xl overflow-hidden bg-black/90 relative flex items-center justify-center border border-white/10">
                  <canvas ref={canvasRef} width={640} height={360} className="w-full h-full block" />
                  {!webglInfo?.supported && (
                    <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400 bg-black/80">
                      WebGL context unavailable in this environment
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={() => setIsRendering(!isRendering)}
                  className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white flex items-center gap-1.5 transition-colors"
                >
                  {isRendering ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isRendering ? "Pause Render" : "Resume Render"}</span>
                </button>

                <span className="text-[11px] text-gray-500 font-mono">
                  Controlled 3D transform • Zero overhead
                </span>
              </div>
            </div>

            {/* WebGL Technical Telemetry Table */}
            <div className="lg:col-span-6 border border-gray-200 rounded-2xl p-6 bg-gray-50/70 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-950 mb-4 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-gray-600" />
                  <span>Graphics Pipeline Query Parameters</span>
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-2 border-b border-gray-200/60">
                    <span className="text-gray-500">WebGL Version</span>
                    <span className="font-mono font-medium text-gray-900">{webglInfo?.version || "Probing..."}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200/60">
                    <span className="text-gray-500">Reported GPU Vendor</span>
                    <span className="font-mono font-medium text-gray-900 text-right max-w-xs truncate">{webglInfo?.vendor || "Unavailable"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200/60">
                    <span className="text-gray-500">Reported GPU Renderer</span>
                    <span className="font-mono font-medium text-gray-900 text-right max-w-xs truncate">{webglInfo?.renderer || "Unavailable"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200/60">
                    <span className="text-gray-500">Max 2D Texture Size</span>
                    <span className="font-mono font-medium text-gray-900 tabular-nums">
                      {webglInfo?.maxTextureSize ? `${webglInfo.maxTextureSize} × ${webglInfo.maxTextureSize} px` : "Unavailable"}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200/60">
                    <span className="text-gray-500">Max Renderbuffer Size</span>
                    <span className="font-mono font-medium text-gray-900 tabular-nums">
                      {webglInfo?.maxRenderBufferSize ? `${webglInfo.maxRenderBufferSize} px` : "Unavailable"}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200/60">
                    <span className="text-gray-500">Hardware Antialiasing (MSAA)</span>
                    <span className="font-mono font-medium text-gray-900">{webglInfo?.antialias ? "Enabled (Direct)" : "Disabled / Default"}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 p-3 rounded-xl bg-gray-100 text-[11px] text-gray-600 leading-relaxed border border-gray-200">
                <strong>Measurement Boundary:</strong> WebGL diagnostics report the driver abstraction layer (e.g. ANGLE Direct3D/Metal/Vulkan wrapper) presented by the browser. It does not reflect physical silicon temperatures, fan speeds, or memory clock frequencies.
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 4: MULTI-MONITOR TOPOLOGY DETECTION               */}
        {/* ========================================================= */}
        <div className="mb-12">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-6">
            <h2 className="text-sm font-mono font-bold tracking-[0.15em] text-gray-400 uppercase">
              4. Multi-Monitor Display Detection
            </h2>
            <span className="text-xs font-mono text-gray-400">Window Management API</span>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50/70">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-base font-semibold text-gray-950">
                  Cross-Display Topology & Screen Placement
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm mt-1">
                  Query the browser for multi-monitor setups using the W3C Window Management API.
                </p>
              </div>

              <button
                onClick={handleDetectScreens}
                disabled={detectingScreens}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${detectingScreens ? "animate-spin" : ""}`} />
                <span>{detectingScreens ? "Requesting Permission..." : "Query Display Topology"}</span>
              </button>
            </div>

            {/* Extended Status indicator */}
            <div className="flex items-center gap-3 mb-4 text-xs font-mono">
              <span className="text-gray-500">Screen Is Extended:</span>
              <span className={`px-2.5 py-0.5 rounded-md font-semibold ${
                isExtended === true 
                  ? "bg-blue-100 text-blue-800" 
                  : isExtended === false 
                    ? "bg-gray-200 text-gray-700" 
                    : "bg-gray-100 text-gray-500"
              }`}>
                {isExtended === true ? "Multi-Monitor (Extended Desktop)" : isExtended === false ? "Single Display Active" : "Unspecified / Single Screen"}
              </span>
            </div>

            {multiMonitorError && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs leading-relaxed mb-4">
                <strong>Multi-Screen Privacy Limitation:</strong> {multiMonitorError}
              </div>
            )}

            {screensList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {screensList.map((screen, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-xl p-4 bg-white shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Monitor className="w-4 h-4 text-blue-600" />
                        <span className="font-semibold text-sm text-gray-900">{screen.label}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {screen.isPrimary && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                            PRIMARY
                          </span>
                        )}
                        {screen.isCurrent && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            THIS WINDOW
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-xs space-y-1 font-mono text-gray-600">
                      <div>Dimensions: {screen.width} × {screen.height} px</div>
                      <div>Available: {screen.availWidth} × {screen.availHeight} px</div>
                      <div>Device Pixel Ratio: {screen.devicePixelRatio}x</div>
                      <div>Orientation: {screen.orientation || "Standard"}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-gray-500 bg-white border border-gray-200 rounded-xl p-4">
                Click <strong>&quot;Query Display Topology&quot;</strong> above. If your browser supports the Window Management API and you grant permission, individual physical display resolutions and secondary screen properties will be enumerated here. If unsupported or denied, the browser operates strictly within its standard single-screen sandbox.
              </div>
            )}
          </div>
        </div>

        {/* Quick Links to Calculators */}
        <div className="border-t border-gray-200 pt-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase text-gray-400 block mb-1">RELATED UTILITIES</span>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/tests/resolution-checker"
                className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors flex items-center gap-1"
              >
                <span>Resolution Checker</span>
                <span className="text-gray-400">→</span>
              </Link>
              <span className="text-gray-300">•</span>
              <Link
                href="/tests/compare-displays"
                className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors flex items-center gap-1"
              >
                <span>Display Calculators (PPI, Distance, Aspect Ratio)</span>
                <span className="text-gray-400">→</span>
              </Link>
              <span className="text-gray-300">•</span>
              <Link
                href="/tests/custom-pattern"
                className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors flex items-center gap-1"
              >
                <span>Custom Pattern Generator</span>
                <span className="text-gray-400">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

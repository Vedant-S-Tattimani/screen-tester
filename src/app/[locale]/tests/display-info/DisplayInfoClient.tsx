"use client";

import { useEffect, useState, useRef, useCallback, useMemo, useSyncExternalStore } from "react";
import { Link, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
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

const emptySubscribe = () => () => {};

export function DisplayInfoClient() {
  const router = useRouter();
  const t = useTranslations("DisplayInfo");
  const tTools = useTranslations("Tools");
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
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
      { name: "Fullscreen API", supported: supportsFullscreen(), desc: t("capabilities.desc.fullscreen") },
      { name: "HTML5 Canvas 2D", supported: supportsCanvas2D(), desc: t("capabilities.desc.canvas2d") },
      { name: "WebGL 1.0", supported: supportsWebGL(), desc: t("capabilities.desc.webgl1") },
      { name: "WebGL 2.0", supported: supportsWebGL2(), desc: t("capabilities.desc.webgl2") },
      { name: "WebGPU API", supported: supportsWebGPU(), desc: t("capabilities.desc.webgpu") },
      { name: "Screen Orientation API", supported: supportsScreenOrientation(), desc: t("capabilities.desc.orientation") },
      { name: "Window Management (Multi-Screen)", supported: supportsScreenDetails(), desc: t("capabilities.desc.multiScreen") },
      { name: "High Dynamic Range (HDR)", supported: supportsHDR(), desc: t("capabilities.desc.hdr") },
      { name: "Wide Color Gamut (P3)", supported: supportsP3(), desc: t("capabilities.desc.p3") },
      { name: "Rec. 2020 Wide Gamut", supported: supportsRec2020(), desc: t("capabilities.desc.rec2020") },
      { name: "Touch Input Points", supported: supportsTouch(), desc: t("capabilities.desc.touch") },
    ];
  }, [t]);

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
      setFullscreenError(t("header.fullscreenError"));
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
        setMultiMonitorError(t("multiScreen.apiNotSupported"));
      }
    } catch (err) {
      console.warn("Screen details permission denied or failed", err);
      setMultiMonitorError(t("multiScreen.permissionDenied"));
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
                {t("workflow.step", { current: workflowIndex + 1, total: workflowSequence.length })}
              </div>
              <div className="text-sm font-semibold text-blue-950 flex items-center gap-2">
                <span>{t("workflow.title")}</span>
                <span className="text-xs font-normal text-blue-700">{t("workflow.desc")}</span>
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
                  {t("workflow.obsNormal")}
                </button>
                <button
                  onClick={() => setObsChoice("NEEDS_ATTENTION")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    obsChoice === "NEEDS_ATTENTION"
                      ? "bg-amber-600 text-white font-semibold shadow-2xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {t("workflow.obsNeedsAttention")}
                </button>
              </div>

              <button
                onClick={() => handleNextStep("UNSURE")}
                className="text-xs text-blue-700 hover:text-blue-950 font-medium px-2 py-1.5 transition-colors cursor-pointer"
              >
                {t("workflow.skip")}
              </button>

              <button
                onClick={() => handleNextStep()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{t("workflow.saveAndContinue")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-gray-500 mb-6">
          <Link href="/tests" className="hover:text-gray-900 flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t("breadcrumb.allTests")}</span>
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">{t("breadcrumb.current")}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-[11px] font-mono font-medium uppercase tracking-[0.2em] text-gray-600 mb-2">
              {t("header.eyebrow")}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-950">
              {t("header.title")}
            </h1>
            <p className="text-gray-500 text-sm sm:text-base mt-1.5 max-w-2xl leading-relaxed">
              {t("header.subtitle")}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleFullscreen}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-950 text-white text-xs sm:text-sm font-medium hover:bg-black transition-colors cursor-pointer"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              <span>{isFullscreen ? t("header.exitFullscreen") : t("header.enterFullscreen")}</span>
            </button>
          </div>
        </div>

        {/* Prominent Disclaimer Banner */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 mb-10 flex items-start gap-3.5 text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
          <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold block mb-1">
              {t("disclaimer.title")}
            </strong>
            {t("disclaimer.body")}
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
            <h2 className="text-sm font-mono font-bold tracking-[0.15em] text-gray-600 uppercase">
              {t("geometry.title")}
            </h2>
            <span className="text-xs font-mono text-gray-500">{t("geometry.subtitle")}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1: Logical Resolution */}
            <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50/70">
              <span className="text-xs text-gray-600 font-mono uppercase block mb-1">{t("geometry.logicalRes")}</span>
              <span className="text-2xl font-bold font-mono text-gray-950 block tabular-nums">
                {screenInfo.w > 0 ? `${screenInfo.w} × ${screenInfo.h}` : t("geometry.probing")}
              </span>
              <span className="text-xs text-gray-500 mt-1 block">{t("geometry.cssPixels")}</span>
            </div>

            {/* Card 2: Estimated Physical Pixels */}
            <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50/70">
              <span className="text-xs text-gray-600 font-mono uppercase block mb-1">{t("geometry.estimatedPhysicalRes")}</span>
              <span className="text-2xl font-bold font-mono text-gray-950 block tabular-nums">
                {screenInfo.w > 0 ? `${physicalW} × ${physicalH}` : t("geometry.probing")}
              </span>
              <span className="text-xs text-gray-500 mt-1 block">{t("geometry.megapixelsFormula", { megapixels: totalMegapixels })}</span>
            </div>

            {/* Card 3: Viewport Dimensions */}
            <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50/70">
              <span className="text-xs text-gray-600 font-mono uppercase block mb-1">{t("geometry.currentViewport")}</span>
              <span className="text-2xl font-bold font-mono text-gray-950 block tabular-nums">
                {screenInfo.innerW > 0 ? `${screenInfo.innerW} × ${screenInfo.innerH}` : t("geometry.probing")}
              </span>
              <span className="text-xs text-gray-500 mt-1 block">{t("geometry.viewportFormula")}</span>
            </div>

            {/* Card 4: Device Pixel Ratio */}
            <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50/70">
              <span className="text-xs text-gray-600 font-mono uppercase block mb-1">{t("geometry.dprLabel")}</span>
              <span className="text-2xl font-bold font-mono text-blue-600 block tabular-nums">
                {screenInfo.dpr.toFixed(2)}x
              </span>
              <span className="text-xs text-gray-500 mt-1 block">
                {screenInfo.dpr >= 2 ? t("geometry.dprRetina") : screenInfo.dpr === 1 ? t("geometry.dprStandard") : t("geometry.dprCustom")}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
            {/* Available Screen Area */}
            <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50/50">
              <span className="text-xs text-gray-600 font-mono uppercase block mb-1">{t("geometry.availScreenArea")}</span>
              <span className="text-xl font-semibold font-mono text-gray-900 block tabular-nums">
                {screenInfo.availW} × {screenInfo.availH}
              </span>
              <span className="text-xs text-gray-500 mt-1 block">{t("geometry.availScreenDesc")}</span>
            </div>

            {/* Color & Pixel Depth */}
            <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50/50">
              <span className="text-xs text-gray-600 font-mono uppercase block mb-1">{t("geometry.colorDepth")}</span>
              <span className="text-xl font-semibold font-mono text-gray-900 block tabular-nums">
                {screenInfo.colorDepth}-bit / {screenInfo.pixelDepth}-bit
              </span>
              <span className="text-xs text-gray-500 mt-1 block">{t("geometry.colorDepthDesc")}</span>
            </div>

            {/* Screen Orientation */}
            <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50/50">
              <span className="text-xs text-gray-600 font-mono uppercase block mb-1">{t("geometry.screenOrientation")}</span>
              <span className="text-xl font-semibold font-mono text-gray-900 block capitalize">
                {screenInfo.orientationType.replace("-", " ")}
              </span>
              <span className="text-xs text-gray-500 mt-1 block">{t("geometry.orientationAngle", { angle: screenInfo.orientationAngle })}</span>
            </div>

            {/* Observed Refresh Rate */}
            <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50/50">
              <span className="text-xs text-gray-600 font-mono uppercase block mb-1">{t("geometry.frameTiming")}</span>
              <span className="text-xl font-semibold font-mono text-emerald-600 block tabular-nums">
                {screenInfo.refreshRate > 0 ? `~${screenInfo.refreshRate} Hz` : t("geometry.measuring")}
              </span>
              <span className="text-xs text-gray-500 mt-1 block">{t("geometry.frameTimingDesc")}</span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 2: BROWSER CAPABILITY MATRIX                      */}
        {/* ========================================================= */}
        <div className="mb-12">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-6">
            <h2 className="text-sm font-mono font-bold tracking-[0.15em] text-gray-600 uppercase">
              {t("capabilities.title")}
            </h2>
            <span className="text-xs font-mono text-gray-500">{t("capabilities.subtitle")}</span>
          </div>

          <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/80">
                  <th className="py-3 px-4 font-mono text-xs font-semibold text-gray-500 uppercase tracking-wider">{t("capabilities.colFeature")}</th>
                  <th className="py-3 px-4 font-mono text-xs font-semibold text-gray-500 uppercase tracking-wider">{t("capabilities.colStatus")}</th>
                  <th className="py-3 px-4 font-mono text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">{t("capabilities.colDesc")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {capabilities.map((c) => (
                  <tr key={c.name} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 px-4 font-medium text-gray-900">{c.name}</td>
                    <td className="py-3 px-4" suppressHydrationWarning>
                      {mounted && c.supported ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{t("capabilities.supported")}</span>
                        </span>
                      ) : mounted ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>{t("capabilities.notSupported")}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-50 text-gray-600 border border-gray-100">
                          <span>{t("capabilities.checking")}</span>
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
            <h2 className="text-sm font-mono font-bold tracking-[0.15em] text-gray-600 uppercase">
              {t("webgl.title")}
            </h2>
            <span className="text-xs font-mono text-gray-500">{t("webgl.subtitle")}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Interactive 3D Canvas */}
            <div className="lg:col-span-6 border border-gray-200 rounded-2xl p-5 bg-gray-950 text-white flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                    <Cpu className="w-4 h-4 text-blue-400" />
                    <span>{t("webgl.cardTitle")}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-black/60 px-2.5 py-1 rounded-md border border-white/10">
                    <span>{webglFps > 0 ? `${webglFps} FPS` : "-- FPS"}</span>
                  </div>
                </div>

                <div className="w-full aspect-video rounded-xl overflow-hidden bg-black/90 relative flex items-center justify-center border border-white/10">
                  <canvas ref={canvasRef} width={640} height={360} className="w-full h-full block" />
                  {mounted && !webglInfo?.supported && (
                    <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400 bg-black/80">
                      {t("webgl.unavailable")}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={() => setIsRendering(!isRendering)}
                  className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {isRendering ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isRendering ? t("webgl.pauseRender") : t("webgl.resumeRender")}</span>
                </button>

                <span className="text-[11px] text-gray-500 font-mono">
                  {t("webgl.zeroOverhead")}
                </span>
              </div>
            </div>

            {/* WebGL Technical Telemetry Table */}
            <div className="lg:col-span-6 border border-gray-200 rounded-2xl p-6 bg-gray-50/70 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-950 mb-4 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-gray-600" />
                  <span>{t("webgl.pipelineParams")}</span>
                </h3>

                <div className="space-y-3 text-xs" suppressHydrationWarning>
                  <div className="flex justify-between py-2 border-b border-gray-200/60">
                    <span className="text-gray-500">{t("webgl.version")}</span>
                    <span className="font-mono font-medium text-gray-900" suppressHydrationWarning>{mounted ? (webglInfo?.version || t("webgl.probing")) : t("webgl.probing")}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200/60">
                    <span className="text-gray-500">{t("webgl.vendor")}</span>
                    <span className="font-mono font-medium text-gray-900 text-right max-w-xs truncate" suppressHydrationWarning>{mounted ? (webglInfo?.vendor || t("webgl.unavailableVal")) : t("webgl.probing")}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200/60">
                    <span className="text-gray-500">{t("webgl.renderer")}</span>
                    <span className="font-mono font-medium text-gray-900 text-right max-w-xs truncate" suppressHydrationWarning>{mounted ? (webglInfo?.renderer || t("webgl.unavailableVal")) : t("webgl.probing")}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200/60">
                    <span className="text-gray-500">{t("webgl.maxTexture")}</span>
                    <span className="font-mono font-medium text-gray-900 tabular-nums" suppressHydrationWarning>
                      {mounted && webglInfo?.maxTextureSize ? `${webglInfo.maxTextureSize} × ${webglInfo.maxTextureSize} px` : t("webgl.unavailableVal")}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200/60">
                    <span className="text-gray-500">{t("webgl.maxRenderbuffer")}</span>
                    <span className="font-mono font-medium text-gray-900 tabular-nums" suppressHydrationWarning>
                      {mounted && webglInfo?.maxRenderBufferSize ? `${webglInfo.maxRenderBufferSize} px` : t("webgl.unavailableVal")}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200/60">
                    <span className="text-gray-500">{t("webgl.msaa")}</span>
                    <span className="font-mono font-medium text-gray-900" suppressHydrationWarning>{mounted ? (webglInfo?.antialias ? t("webgl.msaaEnabled") : t("webgl.msaaDisabled")) : t("webgl.probing")}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 p-3 rounded-xl bg-gray-100 text-[11px] text-gray-600 leading-relaxed border border-gray-200">
                <strong>{t("webgl.boundaryTitle")}</strong> {t("webgl.boundaryBody")}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 4: MULTI-MONITOR TOPOLOGY DETECTION               */}
        {/* ========================================================= */}
        <div className="mb-12">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-6">
            <h2 className="text-sm font-mono font-bold tracking-[0.15em] text-gray-600 uppercase">
              {t("multiScreen.title")}
            </h2>
            <span className="text-xs font-mono text-gray-500">{t("multiScreen.subtitle")}</span>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50/70">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-base font-semibold text-gray-950">
                  {t("multiScreen.heading")}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm mt-1">
                  {t("multiScreen.desc")}
                </p>
              </div>

              <button
                onClick={handleDetectScreens}
                disabled={detectingScreens}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium transition-colors disabled:opacity-50 cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 ${detectingScreens ? "animate-spin" : ""}`} />
                <span>{detectingScreens ? t("multiScreen.requesting") : t("multiScreen.queryBtn")}</span>
              </button>
            </div>

            {/* Extended Status indicator */}
            <div className="flex items-center gap-3 mb-4 text-xs font-mono">
              <span className="text-gray-500">{t("multiScreen.isExtendedLabel")}</span>
              <span className={`px-2.5 py-0.5 rounded-md font-semibold ${
                isExtended === true 
                  ? "bg-blue-100 text-blue-800" 
                  : isExtended === false 
                    ? "bg-gray-200 text-gray-700" 
                    : "bg-gray-100 text-gray-500"
              }`}>
                {isExtended === true ? t("multiScreen.extendedYes") : isExtended === false ? t("multiScreen.extendedNo") : t("multiScreen.extendedUnspecified")}
              </span>
            </div>

            {multiMonitorError && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs leading-relaxed mb-4">
                <strong>{t("multiScreen.limitationTitle")}</strong> {multiMonitorError}
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
                            {t("multiScreen.primaryBadge")}
                          </span>
                        )}
                        {screen.isCurrent && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {t("multiScreen.thisWindowBadge")}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-xs space-y-1 font-mono text-gray-600">
                      <div>{t("multiScreen.dimensions", { width: screen.width, height: screen.height })}</div>
                      <div>{t("multiScreen.available", { width: screen.availWidth, height: screen.availHeight })}</div>
                      <div>{t("multiScreen.dpr", { dpr: screen.devicePixelRatio })}</div>
                      <div>{t("multiScreen.orientation", { orientation: screen.orientation || t("multiScreen.orientationStandard") })}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-gray-500 bg-white border border-gray-200 rounded-xl p-4">
                {t("multiScreen.emptyState")}
              </div>
            )}
          </div>
        </div>

        {/* Quick Links to Calculators */}
        <div className="border-t border-gray-200 pt-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase text-gray-600 block mb-1">{t("related.title")}</span>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/tests/resolution-checker"
                className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors flex items-center gap-1"
              >
                <span>{tTools("items.resolutionChecker.title")}</span>
                <span className="text-gray-500">→</span>
              </Link>
              <span className="text-gray-300">•</span>
              <Link
                href="/tests/compare-displays"
                className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors flex items-center gap-1"
              >
                <span>{t("related.compareDisplays")}</span>
                <span className="text-gray-500">→</span>
              </Link>
              <span className="text-gray-300">•</span>
              <Link
                href="/tests/custom-pattern"
                className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors flex items-center gap-1"
              >
                <span>{tTools("items.customPattern.title")}</span>
                <span className="text-gray-500">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

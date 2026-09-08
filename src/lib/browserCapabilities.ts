/**
 * Shared utility for feature detection and browser capabilities.
 * 
 * Prefer feature detection ("does this API exist?") over browser string sniffing.
 */

export function supportsFullscreen(): boolean {
  if (typeof document === 'undefined') return false;
  return (
    'fullscreenEnabled' in document ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (document as any).webkitFullscreenEnabled ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (document as any).mozFullScreenEnabled ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (document as any).msFullscreenEnabled
  );
}

export function supportsTouch(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (navigator as any).msMaxTouchPoints > 0
  );
}

export function getDevicePixelRatio(): number {
  if (typeof window === 'undefined') return 1;
  return window.devicePixelRatio || 1;
}

export function supportsWebGL(): boolean {
  if (typeof document === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

export function supportsWebGL2(): boolean {
  if (typeof document === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGL2RenderingContext && canvas.getContext('webgl2'));
  } catch {
    return false;
  }
}

export function supportsWebGPU(): boolean {
  if (typeof navigator === 'undefined') return false;
  return 'gpu' in navigator;
}

export function supportsScreenDetails(): boolean {
  if (typeof window === 'undefined') return false;
  return 'getScreenDetails' in window || 'getScreens' in window;
}

export function supportsScreenOrientation(): boolean {
  if (typeof window === 'undefined') return false;
  return 'screen' in window && 'orientation' in window.screen;
}

export function supportsCanvas2D(): boolean {
  if (typeof document === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!canvas.getContext('2d');
  } catch {
    return false;
  }
}

export function supportsHDR(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(dynamic-range: high)').matches;
}

export function supportsP3(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(color-gamut: p3)').matches;
}

export function supportsRec2020(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(color-gamut: rec2020)').matches;
}

export interface WebGLDiagnosticInfo {
  supported: boolean;
  version: "WebGL 2.0" | "WebGL 1.0" | "None";
  vendor: string;
  renderer: string;
  maxTextureSize: number;
  maxRenderBufferSize: number;
  shadingLanguageVersion: string;
  antialias: boolean;
}

export function getWebGLDiagnostics(): WebGLDiagnosticInfo {
  const fallback: WebGLDiagnosticInfo = {
    supported: false,
    version: "None",
    vendor: "Unavailable",
    renderer: "Unavailable",
    maxTextureSize: 0,
    maxRenderBufferSize: 0,
    shadingLanguageVersion: "Unavailable",
    antialias: false,
  };

  if (typeof document === 'undefined') return fallback;
  try {
    const canvas = document.createElement('canvas');
    const gl2 = canvas.getContext('webgl2') as WebGL2RenderingContext | null;
    const gl = (gl2 || canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as (WebGLRenderingContext | WebGL2RenderingContext) | null;

    if (!gl) return fallback;

    const isGl2 = !!gl2;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ext = gl.getExtension('WEBGL_debug_renderer_info') as any;

    let unmaskedVendor = "Generic / Protected";
    let unmaskedRenderer = "Generic / Protected";

    if (ext) {
      unmaskedVendor = gl.getParameter(ext.UNMASKED_VENDOR_WEBGL) || unmaskedVendor;
      unmaskedRenderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) || unmaskedRenderer;
    }

    const maxTextureSize = (gl.getParameter(gl.MAX_TEXTURE_SIZE) as number) || 0;
    const maxRenderBufferSize = (gl.getParameter(gl.MAX_RENDERBUFFER_SIZE) as number) || 0;
    const shadingLanguageVersion = (gl.getParameter(gl.SHADING_LANGUAGE_VERSION) as string) || "Unknown";
    const contextAttrs = gl.getContextAttributes();

    return {
      supported: true,
      version: isGl2 ? "WebGL 2.0" : "WebGL 1.0",
      vendor: unmaskedVendor,
      renderer: unmaskedRenderer,
      maxTextureSize,
      maxRenderBufferSize,
      shadingLanguageVersion,
      antialias: contextAttrs?.antialias ?? false,
    };
  } catch (e) {
    console.warn("Failed to probe WebGL diagnostics", e);
    return fallback;
  }
}

/**
 * Safely parse a value from localStorage without throwing exceptions.
 */
export function safeStorageGet<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    return JSON.parse(item) as T;
  } catch (e) {
    console.warn(`Failed to parse storage key: ${key}`, e);
    return defaultValue;
  }
}

/**
 * Safely write a value to localStorage without throwing exceptions.
 */
export function safeStorageSet(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.warn(`Failed to write storage key: ${key}`, e);
    return false;
  }
}

/**
 * Safely parse a value from sessionStorage without throwing exceptions.
 */
export function safeSessionGet<T>(key: string, defaultValue: T): T {
  try {
    const item = sessionStorage.getItem(key);
    if (item === null) return defaultValue;
    return JSON.parse(item) as T;
  } catch (e) {
    console.warn(`Failed to parse session storage key: ${key}`, e);
    return defaultValue;
  }
}

/**
 * Safely write a value to sessionStorage without throwing exceptions.
 */
export function safeSessionSet(key: string, value: unknown): boolean {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.warn(`Failed to write session storage key: ${key}`, e);
    return false;
  }
}

/**
 * Safely remove a key from sessionStorage without throwing exceptions.
 */
export function safeSessionRemove(key: string): boolean {
  try {
    sessionStorage.removeItem(key);
    return true;
  } catch (e) {
    console.warn(`Failed to remove session storage key: ${key}`, e);
    return false;
  }
}



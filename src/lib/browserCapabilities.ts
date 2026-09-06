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

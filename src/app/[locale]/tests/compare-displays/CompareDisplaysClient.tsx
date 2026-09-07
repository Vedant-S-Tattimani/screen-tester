"use client";

import { useState, useMemo } from "react";
import { Link } from "@/i18n/routing";
import { ArrowLeft, Sliders, Ruler, Eye, ArrowRight } from "lucide-react";

interface DisplayPreset {
  name: string;
  inches: number;
  width: number;
  height: number;
  aspect: string;
}

const PRESETS: DisplayPreset[] = [
  { name: "24\" Full HD (1080p)", inches: 24, width: 1920, height: 1080, aspect: "16:9" },
  { name: "27\" Quad HD (1440p)", inches: 27, width: 2560, height: 1440, aspect: "16:9" },
  { name: "27\" 4K Ultra HD", inches: 27, width: 3840, height: 2160, aspect: "16:9" },
  { name: "32\" 4K Ultra HD", inches: 32, width: 3840, height: 2160, aspect: "16:9" },
  { name: "34\" Ultrawide (UWQHD)", inches: 34, width: 3440, height: 1440, aspect: "21:9" },
  { name: "49\" Super Ultrawide", inches: 49, width: 5120, height: 1440, aspect: "32:9" },
  { name: "14\" Laptop (Retina)", inches: 14.2, width: 3024, height: 1964, aspect: "16:10" },
  { name: "16\" Laptop (Retina)", inches: 16.2, width: 3456, height: 2234, aspect: "16:10" },
  { name: "55\" 4K Living Room TV", inches: 55, width: 3840, height: 2160, aspect: "16:9" },
  { name: "65\" 4K Living Room TV", inches: 65, width: 3840, height: 2160, aspect: "16:9" },
];

function calculateSpecs(inches: number, width: number, height: number) {
  const ppi = Math.sqrt(width * width + height * height) / inches;
  // Aspect ratio diagonal theta
  const theta = Math.atan(height / width);
  const physicalWidthInches = inches * Math.cos(theta);
  const physicalHeightInches = inches * Math.sin(theta);
  const physicalWidthCm = physicalWidthInches * 2.54;
  const physicalHeightCm = physicalHeightInches * 2.54;
  const totalMegapixels = (width * height) / 1000000;
  // Retina distance: distance where 1 pixel = 1 arcminute (1/60 degree) = 20/20 vision limit
  // Distance = (1 / (2 * tan(0.5 arcmin))) * pixel pitch
  // Approx: Distance in inches = 3438 / PPI
  const retinaDistanceInches = Math.round(3438 / ppi);
  const retinaDistanceCm = Math.round(retinaDistanceInches * 2.54);

  return {
    ppi: Math.round(ppi),
    physicalWidthInches: physicalWidthInches.toFixed(1),
    physicalHeightInches: physicalHeightInches.toFixed(1),
    physicalWidthCm: physicalWidthCm.toFixed(1),
    physicalHeightCm: physicalHeightCm.toFixed(1),
    totalMegapixels: totalMegapixels.toFixed(2),
    retinaDistanceInches,
    retinaDistanceCm,
    aspectRatio: `${width / gcd(width, height)}:${height / gcd(width, height)}`
  };
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export function CompareDisplaysClient() {
  const [selectedA, setSelectedA] = useState<number>(1); // 27" 1440p
  const [selectedB, setSelectedB] = useState<number>(2); // 27" 4K

  const displayA = PRESETS[selectedA];
  const displayB = PRESETS[selectedB];

  const specsA = useMemo(() => calculateSpecs(displayA.inches, displayA.width, displayA.height), [displayA]);
  const specsB = useMemo(() => calculateSpecs(displayB.inches, displayB.width, displayB.height), [displayB]);

  // Max width in inches for scale visualization
  const maxW = Math.max(parseFloat(specsA.physicalWidthInches), parseFloat(specsB.physicalWidthInches), 30);

  return (
    <div className="bg-white min-h-screen py-10 sm:py-14 text-gray-900">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-gray-400 mb-6">
          <Link href="/tests" className="hover:text-gray-900 flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>ALL TESTS</span>
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">COMPARE DISPLAYS</span>
        </div>

        {/* Title */}
        <div className="mb-10">
          <div className="text-[11px] font-mono font-medium uppercase tracking-[0.2em] text-gray-400 mb-2">
            DISPLAY BENCHMARK & CALCULATION
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-950">
            Compare Display Sizes & Resolutions
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            Direct side-by-side comparison of physical dimensions, pixel density (PPI), aspect ratios, and retina viewing distance thresholds.
          </p>
        </div>

        {/* Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Display A */}
          <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50/50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                DISPLAY A
              </span>
              <span className="text-xs text-gray-400">{displayA.aspect}</span>
            </div>
            <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
              Select Preset
            </label>
            <select
              value={selectedA}
              onChange={(e) => setSelectedA(Number(e.target.value))}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-950"
            >
              {PRESETS.map((preset, idx) => (
                <option key={idx} value={idx}>
                  {preset.name} ({preset.width} × {preset.height})
                </option>
              ))}
            </select>
          </div>

          {/* Display B */}
          <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50/50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                DISPLAY B
              </span>
              <span className="text-xs text-gray-400">{displayB.aspect}</span>
            </div>
            <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
              Select Preset
            </label>
            <select
              value={selectedB}
              onChange={(e) => setSelectedB(Number(e.target.value))}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-950"
            >
              {PRESETS.map((preset, idx) => (
                <option key={idx} value={idx}>
                  {preset.name} ({preset.width} × {preset.height})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white mb-12 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {/* Metric: Pixel Density */}
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-gray-400 mb-3">
                <Sliders className="w-4 h-4 text-gray-700" />
                <span>PIXEL DENSITY (PPI)</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <span className="text-xs text-gray-400 block mb-1">Display A</span>
                  <span className="text-2xl sm:text-3xl font-bold font-mono text-gray-950">{specsA.ppi}</span>
                  <span className="text-xs text-gray-500 block mt-1">pixels / inch</span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block mb-1">Display B</span>
                  <span className="text-2xl sm:text-3xl font-bold font-mono text-gray-950">{specsB.ppi}</span>
                  <span className="text-xs text-gray-500 block mt-1">pixels / inch</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500">
                {specsB.ppi > specsA.ppi ? (
                  <span className="text-emerald-700 font-medium">
                    Display B has {Math.round(((specsB.ppi - specsA.ppi) / specsA.ppi) * 100)}% higher pixel density.
                  </span>
                ) : specsB.ppi < specsA.ppi ? (
                  <span className="text-blue-700 font-medium">
                    Display A has {Math.round(((specsA.ppi - specsB.ppi) / specsB.ppi) * 100)}% higher pixel density.
                  </span>
                ) : (
                  <span>Both displays have identical pixel density.</span>
                )}
              </div>
            </div>

            {/* Metric: Physical Size */}
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-gray-400 mb-3">
                <Ruler className="w-4 h-4 text-gray-700" />
                <span>PHYSICAL DIMENSIONS</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <span className="text-xs text-gray-400 block mb-1">Display A</span>
                  <div className="font-mono text-sm font-semibold text-gray-900">
                    {specsA.physicalWidthInches}&quot; × {specsA.physicalHeightInches}&quot;
                  </div>
                  <span className="text-xs text-gray-400 block mt-1">
                    {specsA.physicalWidthCm} × {specsA.physicalHeightCm} cm
                  </span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block mb-1">Display B</span>
                  <div className="font-mono text-sm font-semibold text-gray-900">
                    {specsB.physicalWidthInches}&quot; × {specsB.physicalHeightInches}&quot;
                  </div>
                  <span className="text-xs text-gray-400 block mt-1">
                    {specsB.physicalWidthCm} × {specsB.physicalHeightCm} cm
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500">
                <span>Total pixels: A has {specsA.totalMegapixels} MP vs B with {specsB.totalMegapixels} MP.</span>
              </div>
            </div>

            {/* Metric: Retina Viewing Distance */}
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-gray-400 mb-3">
                <Eye className="w-4 h-4 text-gray-700" />
                <span>RETINA VIEWING DISTANCE</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <span className="text-xs text-gray-400 block mb-1">Display A</span>
                  <span className="text-2xl sm:text-3xl font-bold font-mono text-gray-950">
                    {specsA.retinaDistanceInches}&quot;
                  </span>
                  <span className="text-xs text-gray-500 block mt-1">~{specsA.retinaDistanceCm} cm</span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block mb-1">Display B</span>
                  <span className="text-2xl sm:text-3xl font-bold font-mono text-gray-950">
                    {specsB.retinaDistanceInches}&quot;
                  </span>
                  <span className="text-xs text-gray-500 block mt-1">~{specsB.retinaDistanceCm} cm</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500">
                <span>Beyond this distance, individual pixels cannot be resolved by standard 20/20 vision.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Scale Comparison */}
        <div className="border border-gray-200 rounded-2xl p-6 sm:p-8 bg-gray-50/50 mb-12">
          <div className="text-xs font-mono uppercase text-gray-400 mb-6">
            PHYSICAL SCALE COMPARISON (SIDE-BY-SIDE)
          </div>
          <div className="flex flex-col sm:flex-row items-end justify-center gap-8 min-h-[220px] pt-4">
            {/* Box A */}
            <div className="flex flex-col items-center">
              <div
                className="border-2 border-blue-500 bg-blue-100/40 rounded flex items-center justify-center text-xs font-mono font-medium text-blue-900 transition-all"
                style={{
                  width: `${(parseFloat(specsA.physicalWidthInches) / maxW) * 320}px`,
                  height: `${(parseFloat(specsA.physicalHeightInches) / maxW) * 320}px`,
                  minWidth: "80px",
                  minHeight: "50px"
                }}
              >
                Display A ({displayA.inches}&quot;)
              </div>
              <span className="text-xs text-gray-500 mt-2">{displayA.name}</span>
            </div>

            {/* Box B */}
            <div className="flex flex-col items-center">
              <div
                className="border-2 border-emerald-500 bg-emerald-100/40 rounded flex items-center justify-center text-xs font-mono font-medium text-emerald-900 transition-all"
                style={{
                  width: `${(parseFloat(specsB.physicalWidthInches) / maxW) * 320}px`,
                  height: `${(parseFloat(specsB.physicalHeightInches) / maxW) * 320}px`,
                  minWidth: "80px",
                  minHeight: "50px"
                }}
              >
                Display B ({displayB.inches}&quot;)
              </div>
              <span className="text-xs text-gray-500 mt-2">{displayB.name}</span>
            </div>
          </div>
        </div>

        {/* Back / Related links */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <Link
            href="/tests/resolution-checker"
            className="text-xs sm:text-sm text-gray-600 hover:text-gray-950 font-medium flex items-center gap-1.5 transition-colors"
          >
            <span>Open Display Resolution &amp; Capabilities Checker</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/monitor-inspection"
            className="text-xs sm:text-sm text-gray-600 hover:text-gray-950 font-medium flex items-center gap-1.5 transition-colors"
          >
            <span>Monitor Inspection Workflows</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  PixelDefectMarker, 
  PixelDefectType, 
  addPixelDefectMarker, 
  removePixelDefectMarker, 
  updatePixelDefectMarker, 
  getTestObservation 
} from "@/lib/inspectionStorage";
import { Trash2, X, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PixelDefectOverlayProps {
  testId: string;
  isActive: boolean;
  onToggleActive: () => void;
  viewportRef: React.RefObject<HTMLDivElement | null>;
  isFullscreen: boolean;
}

export function PixelDefectOverlay({
  testId,
  isActive,
  onToggleActive,
  viewportRef,
  isFullscreen
}: PixelDefectOverlayProps) {
  const [markers, setMarkers] = useState<PixelDefectMarker[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<PixelDefectMarker | null>(null);
  const [showListModal, setShowListModal] = useState(false);

  // Load existing markers for this test
  const loadMarkers = useCallback(() => {
    if (!testId) return;
    const obs = getTestObservation(testId);
    if (obs && Array.isArray(obs.pixelDefects)) {
      setMarkers(obs.pixelDefects);
    } else {
      setMarkers([]);
    }
  }, [testId]);

  useEffect(() => {
    queueMicrotask(() => {
      loadMarkers();
    });
  }, [loadMarkers]);

  // Handle clicking on viewport when marker mode is active
  const handleViewportClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive || !viewportRef.current) return;

    // Prevent dropping pin if clicking an existing marker or dialog
    if ((e.target as HTMLElement).closest(".defect-pin") || (e.target as HTMLElement).closest(".defect-dialog")) {
      return;
    }

    const rect = viewportRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));

    const newMarker = addPixelDefectMarker(
      testId,
      x,
      y,
      Math.round(rect.width),
      Math.round(rect.height),
      "dead"
    );

    loadMarkers();
    setSelectedMarker(newMarker);
  };

  const handleDeleteMarker = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    removePixelDefectMarker(testId, id);
    loadMarkers();
    if (selectedMarker?.id === id) {
      setSelectedMarker(null);
    }
  };

  const handleUpdateType = (type: PixelDefectType) => {
    if (!selectedMarker) return;
    updatePixelDefectMarker(testId, selectedMarker.id, { type });
    const updated = { ...selectedMarker, type };
    setSelectedMarker(updated);
    loadMarkers();
  };

  const handleUpdateNotes = (notes: string) => {
    if (!selectedMarker) return;
    updatePixelDefectMarker(testId, selectedMarker.id, { notes });
    const updated = { ...selectedMarker, notes };
    setSelectedMarker(updated);
    loadMarkers();
  };

  const getTypeColor = (type: PixelDefectType) => {
    switch (type) {
      case "dead": return "bg-red-500 border-white text-white";
      case "stuck": return "bg-emerald-500 border-white text-white";
      case "bright": return "bg-amber-400 border-slate-900 text-slate-950";
      default: return "bg-blue-500 border-white text-white";
    }
  };

  return (
    <>
      {/* Interactive Overlay Layer */}
      <div 
        onClick={handleViewportClick}
        className={cn(
          "absolute inset-0 z-30 transition-colors pointer-events-none select-none",
          isActive && "pointer-events-auto cursor-crosshair bg-black/10 backdrop-brightness-95"
        )}
      >
        {/* Active Tool Banner in full screen or inline */}
        {isActive && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 bg-black/90 text-white px-4 py-2 rounded-full border border-white/20 shadow-2xl flex items-center gap-3 backdrop-blur-md text-xs font-mono">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span>Click anywhere to mark pixel defect</span>
            <span className="text-white/40">|</span>
            <button 
              onClick={(e) => { e.stopPropagation(); onToggleActive(); }}
              className="text-white/70 hover:text-white underline text-[11px]"
            >
              Done Marking
            </button>
          </div>
        )}

        {/* Render Defect Markers */}
        {markers.map((marker, idx) => {
          const isSelected = selectedMarker?.id === marker.id;
          return (
            <div
              key={marker.id}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedMarker(marker);
              }}
              style={{
                left: `${marker.xPercent}%`,
                top: `${marker.yPercent}%`
              }}
              className="defect-pin absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto cursor-pointer group"
              title={`USER-MARKED: ${marker.type.toUpperCase()} pixel defect at X: ${marker.x}, Y: ${marker.y}`}
            >
              {/* Pin Ring Target */}
              <div className="relative flex items-center justify-center">
                <span className={cn(
                  "absolute h-7 w-7 rounded-full border border-dashed border-red-400 animate-spin-slow opacity-80",
                  isSelected ? "h-9 w-9 border-amber-300 border-2" : ""
                )} />
                <span className={cn(
                  "w-4 h-4 rounded-full border-2 shadow-lg flex items-center justify-center text-[8px] font-bold",
                  getTypeColor(marker.type)
                )}>
                  {idx + 1}
                </span>
              </div>

              {/* Pin Hover Badge */}
              <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 whitespace-nowrap bg-black/90 text-white text-[10px] font-mono px-2 py-1 rounded shadow-xl border border-white/10 pointer-events-none">
                <div className="text-red-400 font-bold uppercase">USER-MARKED</div>
                <div>X: {marker.x} px | Y: {marker.y} px</div>
                <div className="capitalize text-white/70">{marker.type} defect</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Marker Edit Popover Dialog */}
      {selectedMarker && (
        <div 
          className={cn(
            "defect-dialog fixed z-50 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 p-5 w-80 font-sans animate-in fade-in zoom-in-95 duration-150",
            isFullscreen ? "bottom-24 left-1/2 -translate-x-1/2" : "bottom-6 right-6"
          )}
        >
          <div className="flex items-start justify-between border-b border-slate-100 pb-3 mb-3">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-amber-600 font-bold flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                USER-MARKED / OBSERVED
              </div>
              <div className="text-sm font-semibold text-slate-900 mt-0.5">
                Pixel Flaw Marker
              </div>
            </div>
            <button 
              onClick={() => setSelectedMarker(null)}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/80 font-mono text-[11px] space-y-1">
              <div className="flex justify-between text-slate-600">
                <span>Location (CSS X, Y):</span>
                <span className="font-bold text-slate-900">{selectedMarker.x}px, {selectedMarker.y}px</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Relative Position:</span>
                <span className="font-bold text-slate-900">{selectedMarker.xPercent}%, {selectedMarker.yPercent}%</span>
              </div>
              <div className="flex justify-between text-slate-500 text-[10px]">
                <span>Canvas Size:</span>
                <span>{selectedMarker.viewportWidth} × {selectedMarker.viewportHeight}</span>
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1.5">Defect Type:</label>
              <div className="grid grid-cols-2 gap-1.5">
                {(["dead", "stuck", "bright", "unknown"] as PixelDefectType[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => handleUpdateType(t)}
                    className={cn(
                      "px-2.5 py-1.5 rounded-md border text-center font-medium capitalize transition-colors",
                      selectedMarker.type === t 
                        ? "bg-slate-900 text-white border-slate-900 shadow-xs" 
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    )}
                  >
                    {t === "dead" && "● Dead (Black)"}
                    {t === "stuck" && "● Stuck (Color)"}
                    {t === "bright" && "● Bright Pixel"}
                    {t === "unknown" && "○ Other Flaw"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Observation Note (optional):</label>
              <input 
                type="text"
                value={selectedMarker.notes || ""}
                onChange={(e) => handleUpdateNotes(e.target.value)}
                placeholder="e.g., Noticeable on white background"
                className="w-full px-2.5 py-1.5 border border-slate-200 rounded-md text-xs focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => handleDeleteMarker(selectedMarker.id)}
                className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors text-xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Marker</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedMarker(null)}
                className="px-3 py-1 bg-slate-900 text-white rounded hover:bg-slate-800 text-xs font-medium"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Markers List Modal */}
      {showListModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <div>
                <h3 className="font-bold text-slate-900">User-Observed Pixel Defects</h3>
                <p className="text-xs text-amber-600 font-mono">USER-MARKED / OBSERVED</p>
              </div>
              <button 
                onClick={() => setShowListModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {markers.length === 0 ? (
              <p className="text-sm text-slate-500 py-6 text-center">No pixel defects marked on this screen.</p>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {markers.map((m, i) => (
                  <div key={m.id} className="flex items-center justify-between p-2.5 bg-slate-50 border rounded-lg text-xs font-mono">
                    <div>
                      <span className="font-bold text-slate-900">#{i + 1} {m.type.toUpperCase()}</span>
                      <span className="text-slate-500 ml-2">({m.x}px, {m.y}px)</span>
                      {m.notes && <div className="text-[11px] font-sans text-slate-600 mt-0.5">{m.notes}</div>}
                    </div>
                    <button 
                      onClick={() => handleDeleteMarker(m.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Delete marker"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 pt-3 border-t flex justify-end">
              <button
                onClick={() => setShowListModal(false)}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-medium rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

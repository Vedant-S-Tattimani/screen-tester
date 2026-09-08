"use client";

import { useState, useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { monitorTests } from "@/data/tests";
import { normalizeWorkflowPath } from "@/lib/workflow";
import { 
  reorderQueue, 
  removeTestFromQueue, 
  addTestToQueue,
  getActiveInspectionSession
} from "@/lib/inspectionStorage";
import { 
  X, 
  CheckCircle2, 
  ArrowUp, 
  ArrowDown, 
  Trash2, 
  Plus, 
  RotateCcw, 
  Flag 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface QueueDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  workflowSequence: string[];
  workflowIndex: number;
  completedTestIds: string[];
}

export function QueueDrawer({
  isOpen,
  onClose,
  workflowSequence,
  workflowIndex,
  completedTestIds
}: QueueDrawerProps) {
  const t = useTranslations("TestWrapper");
  const router = useRouter();
  const [selectedToAdd, setSelectedToAdd] = useState("");
  const [localSequence, setLocalSequence] = useState<string[]>(workflowSequence);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    queueMicrotask(() => {
      if (workflowSequence && workflowSequence.length > 0) {
        setLocalSequence(workflowSequence);
      } else {
        const session = getActiveInspectionSession();
        if (session && session.queue.length > 0) {
          setLocalSequence(session.queue);
        }
      }
    });
  }, [workflowSequence]);

  if (!isOpen) return null;

  const currentSequence = localSequence.length > 0 
    ? localSequence 
    : (workflowSequence.length > 0 ? workflowSequence : (getActiveInspectionSession()?.queue || []));

  const formatTestTitle = (path: string) => {
    const slug = path.replace(/^\//, "").replace(/^tests\//, "");
    const parts = slug.replace("-test", "").split("-");
    return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
  };

  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    const newSeq = [...currentSequence];
    const temp = newSeq[index - 1];
    newSeq[index - 1] = newSeq[index];
    newSeq[index] = temp;
    setLocalSequence(newSeq);
    reorderQueue(newSeq);
  };

  const handleMoveDown = (index: number) => {
    if (index >= currentSequence.length - 1) return;
    const newSeq = [...currentSequence];
    const temp = newSeq[index + 1];
    newSeq[index + 1] = newSeq[index];
    newSeq[index] = temp;
    setLocalSequence(newSeq);
    reorderQueue(newSeq);
  };

  const handleRemove = (index: number) => {
    const pathToRemove = currentSequence[index];
    const newSeq = currentSequence.filter((_, i) => i !== index);
    setLocalSequence(newSeq);
    removeTestFromQueue(pathToRemove);
  };

  const handleAdd = () => {
    if (!selectedToAdd) return;
    const pathToAdd = `/tests/${selectedToAdd}`;
    if (!currentSequence.includes(pathToAdd)) {
      const newSeq = [...currentSequence, pathToAdd];
      setLocalSequence(newSeq);
      addTestToQueue(pathToAdd);
    }
    setSelectedToAdd("");
  };

  const handleJumpToTest = (path: string) => {
    const target = typeof normalizeWorkflowPath === "function" ? normalizeWorkflowPath(path) : path;
    router.push(target);
    onClose();
  };

  const handleRestartQueue = () => {
    if (currentSequence.length > 0) {
      const target = typeof normalizeWorkflowPath === "function" ? normalizeWorkflowPath(currentSequence[0]) : currentSequence[0];
      router.push(target);
      onClose();
    }
  };

  const handleCompleteQueue = () => {
    router.push("/monitor-inspection/summary");
    onClose();
  };

  const completedCount = completedTestIds.length;
  const totalCount = currentSequence.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Available tests to add
  const availableTests = monitorTests.filter(
    t => !currentSequence.some(seq => seq.includes(t.id))
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end" role="dialog" aria-modal="true" aria-labelledby="queue-drawer-title">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col font-sans animate-in slide-in-from-right duration-200">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
              {t("queue.eyebrow")}
            </div>
            <h2 id="queue-drawer-title" className="text-lg font-bold text-gray-900 mt-0.5">
              {t("queue.title")}
            </h2>
          </div>
          <button 
            onClick={onClose}
            aria-label={t("queue.closeAria")}
            title={t("queue.close")}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inspection Progress Bar & Stats */}
        <div className="px-6 py-4 bg-white border-b border-gray-100">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-gray-700">{t("queue.completedStats", { completed: completedCount, total: totalCount })}</span>
            <span className="font-mono text-gray-500">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-blue-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-gray-500 mt-2 font-mono">
            <span>{t("queue.currentStep", { step: workflowIndex + 1 })}</span>
            <span>{t("queue.remaining", { count: Math.max(0, totalCount - workflowIndex - 1) })}</span>
          </div>
        </div>

        {/* Add Test to Queue Toolbar */}
        <div className="px-6 py-3 bg-slate-50/80 border-b border-gray-100 flex items-center gap-2">
          <select
            value={selectedToAdd}
            onChange={(e) => setSelectedToAdd(e.target.value)}
            className="flex-1 px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
          >
            <option value="">{t("queue.addPlaceholder")}</option>
            {availableTests.map((t) => (
              <option key={t.id} value={t.id}>
                {t.primaryIntent.replace("monitor", "").trim()} ({t.category})
              </option>
            ))}
          </select>
          <button
            onClick={handleAdd}
            disabled={!selectedToAdd}
            className="px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-gray-800 disabled:opacity-40 transition-colors shrink-0 flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t("queue.addBtn")}</span>
          </button>
        </div>

        {/* Queue List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-2">
          {currentSequence.map((path, index) => {
            const isCurrent = index === workflowIndex;
            const slug = path.replace(/^\//, "").replace(/^tests\//, "");
            const isCompleted = completedTestIds.includes(slug);

            return (
              <div 
                key={path}
                className={cn(
                  "flex items-center justify-between p-3 rounded-xl border transition-all text-xs",
                  isCurrent 
                    ? "bg-blue-50/60 border-blue-300 shadow-xs ring-1 ring-blue-400/40" 
                    : "bg-white border-gray-200 hover:border-gray-300"
                )}
              >
                <div 
                  onClick={() => handleJumpToTest(path)}
                  className="flex items-center gap-2.5 flex-1 cursor-pointer pr-2"
                >
                  <span className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold shrink-0",
                    isCurrent 
                      ? "bg-blue-600 text-white" 
                      : isCompleted 
                        ? "bg-emerald-100 text-emerald-700" 
                        : "bg-gray-100 text-gray-600"
                  )}>
                    {isCompleted ? <CheckCircle2 className="w-3 h-3" /> : index + 1}
                  </span>
                  
                  <div>
                    <div className="font-medium text-gray-900 flex items-center gap-1.5">
                      {formatTestTitle(path)}
                      {isCurrent && (
                        <span className="text-[9px] font-mono uppercase bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold">
                          {t("queue.activeBadge")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Queue Controls: Up, Down, Delete */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                    className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-20 rounded"
                    title={t("queue.moveUp")}
                    aria-label={t("queue.moveUp")}
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleMoveDown(index)}
                    disabled={index === localSequence.length - 1}
                    className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-20 rounded"
                    title={t("queue.moveDown")}
                    aria-label={t("queue.moveDown")}
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleRemove(index)}
                    className="p-1 text-gray-500 hover:text-red-600 rounded"
                    title={t("queue.remove")}
                    aria-label={t("queue.remove")}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-6 border-t border-gray-100 bg-slate-50/50 flex items-center justify-between gap-3">
          <button
            onClick={handleRestartQueue}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg border border-gray-200 hover:bg-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t("queue.restart")}</span>
          </button>
          <button
            onClick={handleCompleteQueue}
            className="flex items-center gap-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors ml-auto shadow-xs"
          >
            <Flag className="w-3.5 h-3.5" />
            <span>{t("queue.completeReport")}</span>
          </button>
        </div>

      </div>
    </div>
  );
}

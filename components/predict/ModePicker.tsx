"use client";

import React from "react";
import { Zap, Brain, CheckCircle2, AlertTriangle } from "lucide-react";
import { ClassificationMode } from "@/lib/types";

interface ModePickerProps {
  selectedMode: ClassificationMode;
  onChange: (mode: ClassificationMode) => void;
  disabled: boolean;
}

const ModePicker: React.FC<ModePickerProps> = ({
  selectedMode,
  onChange,
  disabled,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Fast Mode Card */}
      <div
        onClick={() => !disabled && onChange("fast")}
        className={`relative full-width cursor-pointer rounded-xl p-5 transition-all duration-200 border-2 ${
          selectedMode === "fast"
            ? "border-orange-400 bg-orange-50 shadow-md scale-[1.02]"
            : "border-brand-border bg-white hover:border-orange-300 hover:bg-orange-50/50"
        } ${disabled ? "pointer-events-none opacity-60" : ""}`}
      >
        <div className="flex justify-between items-start">
          <Zap className="w-6 h-6 text-orange-500" />
          {selectedMode === "fast" && (
            <span className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full font-medium">
              Selected
            </span>
          )}
        </div>
        <h3 className="font-semibold text-brand-navy text-base mt-3">
          Fast Response
        </h3>
        <p className="text-xs text-brand-muted mt-0.5">
          CNN-based · Instant results
        </p>
        <div className="border-t border-brand-border my-3"></div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-brand-muted">
            <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />
            <span>~instant inference</span>
          </div>
          {/* <div className="flex items-center gap-2 text-xs text-brand-muted">
            <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />
            <span>No API key needed</span>
          </div> */}
          <div className="flex items-center gap-2 text-xs text-brand-muted">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Lower accuracy</span>
          </div>
        </div>
        <p className="small italic text-[11px] text-brand-muted/70 mt-3">
          "CNN-generated. May be inaccurate."
        </p>
      </div>

      {/* Smart Mode Card */}
      <div
        onClick={() => !disabled && onChange("smart")}
        className={`relative full-width cursor-pointer rounded-xl p-5 transition-all duration-200 border-2 ${
          selectedMode === "smart"
            ? "border-blue-400 bg-blue-50 shadow-md scale-[1.02]"
            : "border-brand-border bg-white hover:border-blue-300 hover:bg-blue-50/50"
        } ${disabled ? "pointer-events-none opacity-60" : ""}`}
      >
        <div className="flex justify-between items-start">
          <Brain className="w-6 h-6 text-blue-500" />
          {selectedMode === "smart" && (
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">
              Selected
            </span>
          )}
        </div>
        <h3 className="font-semibold text-brand-navy text-base mt-3">
          Smart Response
        </h3>
        <p className="text-xs text-brand-muted mt-0.5">
          Enforced CNN result · High accuracy
        </p>
        <div className="border-t border-brand-border my-3"></div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-brand-muted">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
            <span>Feature extraction + reasoning</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-brand-muted">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
            <span>Confidence scoring + override logic</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-brand-muted">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
            <span>Detailed observations & reasoning</span>
          </div>
        </div>
        <p className="text-[11px] text-brand-muted/70 mt-3 italic">
          "Uses forced renforcing multiple times. Slightly slower (~2-4s)."
        </p>
      </div>
    </div>
  );
};

export default ModePicker;

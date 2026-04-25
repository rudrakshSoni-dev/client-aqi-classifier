"use client";

import React from "react";
import { AlertTriangle, ChevronRight } from "lucide-react";
import { FastAQIResult } from "@/lib/types";
import { getAQIMeta } from "@/lib/aqi";

interface CNNResultCardProps {
  result: FastAQIResult;
}

const CNNResultCard: React.FC<CNNResultCardProps> = ({ result }) => {
  const meta = getAQIMeta(result.prediction.label);
  const pct = Math.round(result.prediction.confidence * 100);

  const handleSwitchToSmart = () => {
    window.dispatchEvent(new CustomEvent("switch-to-smart"));
  };

  return (
    <div className="bg-white rounded-xl border border-brand-border shadow-sm overflow-hidden">
      {/* Mode badge strip */}
      <div
        className="h-1 w-full"
        style={{ backgroundColor: meta.color }}
      ></div>

      {/* Header */}
      <div className="p-5 border-b border-brand-border">
        <div className="flex justify-between items-start">
          <div>
            <div className="bg-orange-100 text-orange-700 border border-orange-200 text-xs px-2 py-0.5 rounded-full font-medium inline-block">
              ⚡ Fast Mode — CNN Prediction
            </div>
            <h2
              className="text-2xl font-semibold mt-2"
              style={{ color: meta.textColor }}
            >
              {meta.label}
            </h2>
            <p className="text-sm text-brand-muted mt-0.5">
              AQI Range: {meta.range}
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div
              className="w-16 h-16 border-4 rounded-full flex items-center justify-center relative"
              style={{ borderColor: meta.borderColor }}
            >
              <span className="text-lg font-bold" style={{ color: meta.textColor }}>
                {pct}%
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-brand-muted font-bold mt-1">
              Confidence
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="mb-6">
          <div className="flex justify-between text-xs text-brand-muted mb-1.5">
            <span className="font-medium">Model Certainty</span>
            <span className="font-bold">{pct}%</span>
          </div>
          <div className="h-2 w-full bg-brand-border rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-1000 ease-out"
              style={{
                width: `${pct}%`,
                backgroundColor: meta.color,
              }}
            ></div>
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-wider text-brand-muted font-semibold mb-1">
            Health Implication
          </h4>
          <p className="text-sm text-brand-navy leading-relaxed">
            {meta.description}
          </p>
          <p className="text-sm text-brand-muted mt-2 italic leading-relaxed">
            {meta.cautionary}
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-6 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            {result.prediction.disclaimer}
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-brand-border flex items-center justify-between">
          <span className="text-xs text-brand-muted">Want more accurate results?</span>
          <button
            onClick={handleSwitchToSmart}
            className="text-xs text-blue-600 font-medium hover:underline flex items-center gap-0.5"
          >
            Switch to Smart Mode
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CNNResultCard;

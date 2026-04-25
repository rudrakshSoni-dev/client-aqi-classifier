"use client";

import React from "react";
import { AlertTriangle, Info } from "lucide-react";
import { SmartAQIResult } from "@/lib/types";
import { getAQIMeta } from "@/lib/aqi";
import ConfidenceBadge from "./ConfidenceBadge";

interface ResultCardProps {
  result: SmartAQIResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const meta = getAQIMeta(result.category);

  return (
    <div className="bg-white rounded-xl border border-brand-border shadow-sm overflow-hidden">
      {/* Mode badge strip */}
      <div className="h-1 w-full bg-[#3B82F6]"></div>

      {/* Header */}
      <div
        className="p-5 border-b"
        style={{
          backgroundColor: meta.bgColor,
          borderColor: meta.borderColor,
        }}
      >
        <div className="flex justify-between items-start">
          <div>
            <div className="bg-blue-100 text-blue-700 border border-blue-200 text-xs px-2 py-0.5 rounded-full font-medium inline-block">
              🧠 Smart Mode — LLM Analysis
            </div>
            <h2
              className="text-2xl font-semibold mt-2"
              style={{ color: meta.textColor }}
            >
              {meta.label}
            </h2>
            <p className="text-sm mt-0.5" style={{ color: `${meta.textColor}B3` }}>
              AQI Range: {meta.range}
            </p>
          </div>

          <div className="flex flex-col items-end">
            <ConfidenceBadge confidence={result.confidence} />
            {result.llm_overridden && (
              <div
                className="flex items-center gap-1.5 bg-amber-100 text-amber-800 border border-amber-200 text-[10px] px-2 py-0.5 rounded-full font-bold mt-2 cursor-help"
                title={result.override_reason ?? ""}
              >
                <AlertTriangle className="w-3 h-3" />
                RULE OVERRIDE
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-brand-muted font-semibold mb-1">
              Health Implication
            </h4>
            <p className="text-sm text-brand-navy leading-relaxed">
              {result.health_implication}
            </p>

            <div className="border-t border-brand-border my-4"></div>

            <h4 className="text-xs uppercase tracking-wider text-brand-muted font-semibold mb-1">
              AI Reasoning
            </h4>
            <p className="text-sm text-brand-muted leading-relaxed italic">
              {result.reasoning}
            </p>
          </div>

          {/* Right Column */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-brand-muted font-semibold mb-2">
              Key Observations
            </h4>
            <ul className="space-y-3">
              {result.feature_observations.map((obs, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
                  <span className="text-sm text-brand-navy leading-snug">
                    {obs}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {result.llm_overridden && result.override_reason && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-6 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 leading-relaxed">
              <span className="font-bold">Classification Override:</span>{" "}
              {result.override_reason}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultCard;

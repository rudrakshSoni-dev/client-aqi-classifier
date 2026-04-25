"use client";

import React from "react";
import { AQICategory } from "@/lib/types";
import { AQI_LEVELS, getAQIMeta } from "@/lib/aqi";

interface AQIScaleProps {
  activeCategory: AQICategory;
}

const AQIScale: React.FC<AQIScaleProps> = ({ activeCategory }) => {
  return (
    <div className="mt-8">
      <h4 className="text-xs uppercase tracking-wider text-brand-muted font-semibold mb-3">
        AQI Scale Reference
      </h4>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5">
        {AQI_LEVELS.map((category) => {
          const meta = getAQIMeta(category);
          const isActive = activeCategory === category;

          return (
            <div
              key={category}
              className={`rounded-lg p-2 text-center cursor-default transition-all border-[1.5px] ${
                isActive
                  ? "scale-105 shadow-sm font-semibold"
                  : "opacity-40 grayscale-[0.5] hover:opacity-60"
              }`}
              style={{
                backgroundColor: meta.bgColor,
                borderColor: isActive ? meta.borderColor : "transparent",
              }}
            >
              <div
                className="text-[10px] font-bold uppercase truncate"
                style={{ color: meta.textColor }}
              >
                {meta.label}
              </div>
              <div
                className="text-[9px] mt-0.5 opacity-80"
                style={{ color: meta.textColor }}
              >
                {meta.range}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AQIScale;

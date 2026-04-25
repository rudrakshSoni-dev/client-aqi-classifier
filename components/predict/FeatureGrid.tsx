"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageFeatures } from "@/lib/types";

interface FeatureGridProps {
  features: ImageFeatures;
}

const FeatureGrid: React.FC<FeatureGridProps> = ({ features }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getBarColor = (name: string, value: number) => {
    if (name === "visibility_score") {
      if (value < 0.3) return "bg-red-500";
      if (value < 0.6) return "bg-amber-500";
      return "bg-green-500";
    }
    if (name === "haze_index" || name === "dark_channel_mean") {
      if (value < 0.3) return "bg-green-500";
      if (value < 0.6) return "bg-amber-500";
      return "bg-red-500";
    }
    return "bg-blue-500";
  };

  const FeatureCard = ({
    label,
    value,
    name,
    isPill = false,
  }: {
    label: string;
    value: number | string;
    name: string;
    isPill?: boolean;
  }) => (
    <div className="bg-white rounded-lg border border-brand-border p-3 flex flex-col justify-between">
      <span className="text-[10px] uppercase tracking-wider text-brand-muted font-bold mb-1">
        {label}
      </span>
      {isPill ? (
        <div className="mt-1">
          <span className="text-xs px-2 py-1 rounded-full bg-brand-light border border-brand-border text-brand-navy font-medium">
            {value}
          </span>
        </div>
      ) : (
        <>
          <span className="text-lg font-semibold text-brand-navy">
            {typeof value === "number" ? value.toFixed(3) : value}
          </span>
          {(name === "haze_index" ||
            name === "dark_channel_mean" ||
            name === "visibility_score") && (
            <div className="h-1 w-full bg-brand-border rounded-full mt-2 overflow-hidden">
              <div
                className={`h-full ${getBarColor(name, value as number)}`}
                style={{ width: `${Math.min(100, (value as number) * 100)}%` }}
              ></div>
            </div>
          )}
        </>
      )}
    </div>
  );

  return (
    <div className="mt-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-center gap-2 text-sm text-brand-muted border border-brand-border rounded-lg px-4 py-2 hover:bg-brand-light transition-colors"
      >
        {isExpanded ? (
          <>
            <ChevronUp className="w-4 h-4" />
            Hide Advanced Features
          </>
        ) : (
          <>
            <ChevronDown className="w-4 h-4" />
            View Raw Atmospheric Features
          </>
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
              <FeatureCard
                label="Dark Channel"
                value={features.dark_channel_mean}
                name="dark_channel_mean"
              />
              <FeatureCard
                label="Haze Index"
                value={features.haze_index}
                name="haze_index"
              />
              <FeatureCard
                label="Visibility"
                value={features.visibility_score}
                name="visibility_score"
              />
              <FeatureCard
                label="Contrast"
                value={features.contrast_score}
                name="contrast_score"
              />
              <FeatureCard
                label="Edge Density"
                value={features.edge_density}
                name="edge_density"
              />
              <FeatureCard
                label="Saturation"
                value={features.mean_saturation}
                name="mean_saturation"
              />
              <FeatureCard
                label="Mean Red"
                value={features.mean_r}
                name="mean_r"
              />
              <FeatureCard
                label="Mean Green"
                value={features.mean_g}
                name="mean_g"
              />
              <FeatureCard
                label="Mean Blue"
                value={features.mean_b}
                name="mean_b"
              />
              <FeatureCard
                label="Brightness"
                value={features.brightness_p50}
                name="brightness_p50"
              />
              <FeatureCard
                label="Sky Tone"
                value={features.sky_tone}
                name="sky_tone"
                isPill
              />
              <FeatureCard
                label="Color Cast"
                value={features.color_cast}
                name="color_cast"
                isPill
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FeatureGrid;

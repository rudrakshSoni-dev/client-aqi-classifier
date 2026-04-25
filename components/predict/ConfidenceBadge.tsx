"use client";

import React from "react";
import { ShieldCheck, Shield, ShieldAlert } from "lucide-react";
import { Confidence } from "@/lib/types";

interface ConfidenceBadgeProps {
  confidence: Confidence;
}

const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({ confidence }) => {
  const styles = {
    HIGH: {
      bg: "bg-green-100",
      text: "text-green-800",
      border: "border-green-200",
      icon: ShieldCheck,
    },
    MEDIUM: {
      bg: "bg-amber-100",
      text: "text-amber-800",
      border: "border-amber-200",
      icon: Shield,
    },
    LOW: {
      bg: "bg-red-100",
      text: "text-red-800",
      border: "border-red-200",
      icon: ShieldAlert,
    },
  };

  const current = styles[confidence];
  const Icon = current.icon;

  return (
    <div
      className={`rounded-full px-3 py-1 text-xs font-semibold border flex items-center gap-1.5 ${current.bg} ${current.text} ${current.border}`}
    >
      <Icon className="w-3.5 h-3.5" />
      <span className="capitalize">{confidence.toLowerCase()} Confidence</span>
    </div>
  );
};

export default ConfidenceBadge;

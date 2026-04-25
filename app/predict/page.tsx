"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wind,
  Zap,
  Brain,
  AlertCircle,
  Loader2,
  RefreshCcw,
} from "lucide-react";
import {
  ClassificationMode,
  SmartAQIResult,
  FastAQIResult,
} from "@/lib/types";
import { checkHealth, classifyImageSmart, classifyImageFast } from "@/lib/api";
import ModePicker from "@/components/predict/ModePicker";
import DropZone from "@/components/predict/DropZone";
import ResultCard from "@/components/predict/ResultCard";
import CNNResultCard from "@/components/predict/CNNResultCard";
import AQIScale from "@/components/predict/AQIScale";
import FeatureGrid from "@/components/predict/FeatureGrid";

export default function PredictPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [mode, setMode] = useState<ClassificationMode>("smart");
  const [pendingMode, setPendingMode] = useState<ClassificationMode | null>(
    null
  );
  const [smartResult, setSmartResult] = useState<SmartAQIResult | null>(null);
  const [fastResult, setFastResult] = useState<FastAQIResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<"checking" | "online" | "offline">(
    "checking"
  );

  useEffect(() => {
    checkHealth()
      .then(() => setApiStatus("online"))
      .catch(() => setApiStatus("offline"));

    const handleSwitch = () => {
      setMode("smart");
      handleReset(false); // Reset results but keep file
    };

    window.addEventListener("switch-to-smart", handleSwitch);
    return () => window.removeEventListener("switch-to-smart", handleSwitch);
  }, []);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setSmartResult(null);
    setFastResult(null);
    setError(null);
  };

  const handleReset = (full = true) => {
    if (full) {
      setFile(null);
      setPreview(null);
    }
    setSmartResult(null);
    setFastResult(null);
    setError(null);
    setPendingMode(null);
  };

  const handleModeChange = (newMode: ClassificationMode) => {
    if ((smartResult || fastResult) && newMode !== mode) {
      setPendingMode(newMode);
    } else {
      setMode(newMode);
    }
  };

  const handleClassify = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);
    setSmartResult(null);
    setFastResult(null);
    setPendingMode(null);

    try {
      if (mode === "fast") {
        const result = await classifyImageFast(file);
        setFastResult(result);
      } else {
        const result = await classifyImageSmart(file);
        setSmartResult(result);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Section 1 - Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 text-brand-accent border border-brand-accent/20 text-xs font-bold mb-4">
          <Wind className="w-3.5 h-3.5" />
          AI-POWERED ANALYSIS
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold text-brand-navy tracking-tight mt-3">
          Classify Air Quality
        </h1>
        <p className="text-brand-muted text-base max-w-2xl mx-auto mt-3 leading-relaxed">
          Upload any environmental photo and choose your classification mode.
          Fast mode uses a CNN for instant results. Smart mode uses enforced CNN result that might take some more time.
        </p>

        <div className="flex items-center justify-center gap-2 mt-4 text-xs">
          <div
            className={`w-2 h-2 rounded-full ${
              apiStatus === "online"
                ? "bg-green-500"
                : apiStatus === "offline"
                ? "bg-red-500"
                : "bg-amber-500 animate-pulse"
            }`}
          ></div>
          <span className="text-brand-muted uppercase tracking-wider font-bold">
            Backend Status: {apiStatus}
          </span>
        </div>
      </div>

      {/* Section 2 - Mode Picker */}
      <div className="mb-8">
        <ModePicker
          selectedMode={mode}
          onChange={handleModeChange}
          disabled={loading}
        />

        {pendingMode && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-brand-light border border-brand-border rounded-xl flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3 text-sm text-brand-navy">
              <RefreshCcw className="w-5 h-5 text-blue-500" />
              <span>
                You have a result in{" "}
                <span className="font-bold capitalize">{mode} Mode</span>.
                Switch and re-classify?
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setMode(pendingMode);
                  handleClassify();
                }}
                className="px-4 py-2 bg-brand-navy text-white text-xs font-bold rounded-lg hover:bg-brand-slate transition-colors"
              >
                Yes, Re-classify
              </button>
              <button
                onClick={() => setPendingMode(null)}
                className="px-4 py-2 bg-white border border-brand-border text-brand-muted text-xs font-bold rounded-lg hover:bg-brand-light transition-colors"
              >
                Keep Current
              </button>
            </div>
          </motion.div>
        )}

        <div className="flex items-center justify-center gap-2 mt-4 text-[11px] text-brand-muted italic">
          {mode === "fast" ? (
            <>
              <Zap className="w-3.5 h-3.5 text-orange-500" />
              <span>
                Results in under a second. CNN-based prediction with a
                disclaimer.
              </span>
            </>
          ) : (
            <>
              <Brain className="w-3.5 h-3.5 text-blue-500" />
              <span>
                Get More Reliable results, with high reasoning time.
              </span>
            </>
          )}
        </div>
      </div>

      {/* Section 3 & 4 - Upload & Action */}
      <div className="mb-10">
        {!smartResult && !fastResult ? (
          <>
            <DropZone
              onFileSelect={handleFileSelect}
              preview={preview}
              file={file}
              onReset={() => handleReset(true)}
              mode={mode}
            />

            {file && (
              <button
                onClick={handleClassify}
                disabled={loading}
                className={`mt-6 w-full h-12 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-sm ${
                  mode === "fast"
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "bg-brand-navy hover:bg-brand-slate text-white"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing Image...</span>
                  </>
                ) : mode === "fast" ? (
                  <>
                    <Zap className="w-5 h-5" />
                    <span>Get Fast Prediction</span>
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5" />
                    <span>Run Smart Analysis</span>
                  </>
                )}
              </button>
            )}
          </>
        ) : null}
      </div>

      {/* Section 5 - Error Display */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-10 bg-red-50 border border-red-200 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3 text-red-800">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="px-4 py-2 bg-red-100 text-red-800 text-xs font-bold rounded-lg hover:bg-red-200 transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section 6 - Results */}
      <AnimatePresence>
        {(smartResult || fastResult) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {fastResult && <CNNResultCard result={fastResult} />}
            {smartResult && <ResultCard result={smartResult} />}

            {fastResult && <AQIScale activeCategory={fastResult.prediction.label} />}
            {smartResult && <AQIScale activeCategory={smartResult.category} />}

            {smartResult && <FeatureGrid features={smartResult.features} />}

            <div className="mt-8 flex justify-center">
              <button
                onClick={() => handleReset(true)}
                className="px-6 py-3 border-2 border-brand-border rounded-xl text-brand-navy font-bold hover:bg-brand-light transition-all flex items-center gap-2"
              >
                <RefreshCcw className="w-4 h-4" />
                Classify Another Image
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, RefreshCw, AlertCircle } from "lucide-react";
import { ClassificationMode } from "@/lib/types";

interface DropZoneProps {
  onFileSelect: (file: File) => void;
  preview: string | null;
  file: File | null;
  onReset: () => void;
  mode: ClassificationMode;
}

const DropZone: React.FC<DropZoneProps> = ({
  onFileSelect,
  preview,
  file,
  onReset,
  mode,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (selectedFile: File) => {
    setError(null);
    if (!selectedFile.type.startsWith("image/")) {
      setError("Please upload an image file (JPG, PNG, WEBP)");
      return;
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit");
      return;
    }
    onFileSelect(selectedFile);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const onInputSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  if (preview && file) {
    return (
      <div className="relative group">
        <div className="rounded-xl overflow-hidden max-h-80 w-full relative">
          <Image
            src={preview}
            alt="Upload Preview"
            width={800}
            height={400}
            className="w-full h-80 object-cover"
          />
          <div
            onClick={() => inputRef.current?.click()}
            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer"
          >
            <RefreshCw className="w-8 h-8 mb-2" />
            <span className="font-medium">Change Image</span>
          </div>
        </div>

        <button
          onClick={onReset}
          className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-white text-brand-navy rounded-full shadow-md z-10 transition-transform hover:scale-110"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mt-3 flex items-center justify-between text-xs text-brand-muted px-1">
          <div className="flex items-center gap-2 truncate max-w-[70%]">
            <span className="font-medium text-brand-navy truncate">
              {file.name.length > 30
                ? file.name.substring(0, 27) + "..."
                : file.name}
            </span>
            <span>•</span>
            <span>{(file.size / 1024).toFixed(1)} KB</span>
          </div>
          <span className="uppercase">{file.type.split("/")[1]}</span>
        </div>
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={onInputSelect}
          className="hidden"
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative border-2 border-dashed transition-all rounded-xl p-12 text-center cursor-pointer flex flex-col items-center justify-center ${
          mode === "fast"
            ? "border-orange-200 hover:border-orange-400 hover:bg-orange-50/30"
            : "border-brand-border hover:border-blue-300 hover:bg-blue-50/30"
        } ${isDragging ? "border-blue-400 bg-blue-50/50" : ""}`}
      >
        <Upload
          className={`w-10 h-10 mb-4 transition-colors ${
            mode === "fast" ? "text-orange-400" : "text-brand-muted"
          }`}
        />
        <h3 className="text-brand-navy font-semibold text-lg">
          Drop your image here
        </h3>
        <p className="text-sm text-brand-muted mt-1">or click to browse files</p>
        <span className="text-[10px] uppercase tracking-wider font-bold bg-brand-light text-brand-muted px-3 py-1 rounded-full mt-6 border border-brand-border">
          JPG, PNG, WEBP — up to 10MB
        </span>

        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={onInputSelect}
          className="hidden"
        />
      </div>
      {error && (
        <div className="mt-3 flex items-center gap-2 text-red-500 text-sm px-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  );
};

export default DropZone;

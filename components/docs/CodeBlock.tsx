"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = "json" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-brand-border my-4">
      <div className="bg-brand-slate px-4 py-2 flex justify-between items-center">
        <span className="text-xs text-white/50 font-mono uppercase">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="text-white/50 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copy
            </>
          )}
        </button>
      </div>
      <div className="bg-[#0F172A] px-5 py-4 overflow-x-auto">
        <pre className="text-sm text-green-400 font-mono leading-relaxed whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;

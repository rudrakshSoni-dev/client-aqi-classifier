"use client";

import React from "react";

interface DocSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

const DocSection: React.FC<DocSectionProps> = ({ id, title, children }) => {
  return (
    <section id={id} className="scroll-mt-24 mb-12 pb-12 border-b border-brand-border">
      <h2 className="text-xl font-semibold text-brand-navy mb-4">{title}</h2>
      <div className="prose prose-slate max-w-none text-brand-muted leading-relaxed">
        {children}
      </div>
    </section>
  );
};

export default DocSection;

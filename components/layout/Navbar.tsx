"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, FileText, GitBranch, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";


const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Predict", href: "/predict", icon: Home },
    { label: "Docs", href: "/docs", icon: BookOpen },
    {
      label: "Report",
      href: "#",
      icon: FileText,
      onClick: () =>
        window.open(process.env.NEXT_PUBLIC_REPORT_PATH || "/report.pdf", "_blank"),
    },
    {
      label: "GitHub",
      href: "https://github.com",
      icon: GitBranch, 
      external: true,
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-brand-border shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        <Link href="/predict" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-brand-accent text-white text-xs font-bold rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
            <Image src="/logo.jpeg" alt="AQI Vision" width={100} height={100} className="object-contain rounded-full" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-brand-navy">AQI Vision</span>
            <span className="text-brand-border">|</span>
            <span className="text-sm text-brand-muted">Classifier</span>
          </div>
        </Link>

        {/* Right - Desktop Nav */}
        <div className="hidden md:flex gap-1 items-center">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            if (item.onClick) {
              return (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-brand-muted transition-all hover:bg-brand-light hover:text-brand-navy"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-brand-light text-brand-navy"
                    : "text-brand-muted hover:bg-brand-light hover:text-brand-navy"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-brand-muted hover:text-brand-navy"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-b border-brand-border overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                const content = (
                  <>
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </>
                );

                if (item.onClick) {
                  return (
                    <button
                      key={item.label}
                      onClick={() => {
                        item.onClick?.();
                        setIsOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-brand-muted hover:bg-brand-light hover:text-brand-navy transition-all"
                    >
                      {content}
                    </button>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-brand-light text-brand-navy"
                        : "text-brand-muted hover:bg-brand-light hover:text-brand-navy"
                    }`}
                  >
                    {content}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

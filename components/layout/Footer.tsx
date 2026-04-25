"use client";

import React from "react";
import Image from "next/image";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-brand-slate text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 - College Identity */}
          <div>
            <div className="relative w-20 h-20 mb-3 bg-white/10 rounded-lg flex items-center justify-center overflow-hidden">
              <Image
                src="/bit-logo.jpeg"
                alt="BIT Mesra"
                width={80}
                height={80}
                className="rounded-lg object-contain"
                onError={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    const placeholder = document.createElement("div");
                    placeholder.className =
                      "text-[10px] font-bold text-white/40 text-center px-1";
                    placeholder.innerText = "BIT Mesra";
                    parent.appendChild(placeholder);
                  }
                }}
              />
            </div>
            <h3 className="font-semibold text-lg">BIT Mesra</h3>
            <p className="text-sm text-white/60">
              Birla Institute of Technology, Mesra
            </p>
            <p className="text-xs text-white/40 mt-1">
              Ranchi, Jharkhand — 835215
            </p>
          </div>

          {/* Column 2 - Team */}
          <div>
            <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">
              Project Team
            </h4>
            <div className="mb-4">
              <span className="text-xs text-white/40 uppercase tracking-wider mb-1 block">
                Faculty Advisor
              </span>
              <p className="text-white font-medium">Md. Afaque Azam</p>
              <p className="text-xs text-white/50 italic mt-0.5">
                Department of Electronics & Communication
              </p>
            </div>
            <div className="border-t border-white/10 my-3"></div>
            <div>
              <span className="text-xs text-white/40 uppercase tracking-wider mb-2 block">
                Students
              </span>
              <ul className="space-y-1">
                {[
                  "Rudraksh Soni     | BTECH/10210/23",
                  "Abhay Singh       | BTECH/10222/23",
                  "Arka Prabha Bauri | BTECH/10200/23",
                ].map((name, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm text-white/80"
                  >
                    <div className="w-1 h-1 rounded-full bg-white/30"></div>
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3 - Project Info */}
          <div>
            <h3 className="font-semibold text-lg mb-1">AQI Vision</h3>
            <p className="text-sm text-white/60 mb-4">
              Air Quality Classification System
            </p>

            <div className="flex gap-2 mb-4">
              <span className="text-xs px-3 py-1 rounded-full font-medium bg-orange-500/20 text-orange-300 border border-orange-500/30">
                ⚡ Fast Mode
              </span>
              <span className="text-xs px-3 py-1 rounded-full font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
                🧠 Smart Mode
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {[

                "CNN",
                "MobileNetV2",
                "OpenCV",
                "Python",
                "Next.js 14",
                "FastAPI",
              ].map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70 border border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>

            <p className="text-xs text-white/50 mt-4">Minor Project Submission</p>
            <p className="text-xs text-white/40 mt-0.5">BIT Mesra — {new Date().getFullYear()}</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} AQI Classifier. BIT Mesra. All rights reserved.
          </p>
          <div className="text-xs text-white/60 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> by
            BIT Mesra students
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

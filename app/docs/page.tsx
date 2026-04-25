"use client";

import React, { useEffect, useState } from "react";
import {
  BookOpen,
  Image as ImageIcon,
  BrainCircuit,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Layers,
  Search
} from "lucide-react";
import DocSection from "@/components/docs/DocSection";
import CodeBlock from "@/components/docs/CodeBlock";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const menuItems = [
    { id: "overview", label: "Overview" },
    { id: "problem", label: "Problem Statement" },
    { id: "architecture", label: "Deep Learning Architecture" },
    { id: "representations", label: "Input Representations" },
    { id: "enhancements", label: "Model Enhancements" },
    { id: "explainability", label: "Explainability (Grad-CAM)" },
  ];

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const architectureCode = `// Conceptual Forward Pass: Hybrid Multi-Input CNN
function predictAQI(image) {
  // 1. Generate multi-stream representations
  const rgb_input = preprocess(image);
  const sat_input = extractSaturation(image);
  const sp_input = applySuperpixelSegmentation(image);

  // 2. Feature Extraction using pre-trained EfficientNetB0 backbones
  const f_rgb = EfficientNetB0_Branch(rgb_input);
  const f_sat = EfficientNetB0_Branch(sat_input);
  const f_sp = EfficientNetB0_Branch(sp_input);

  // 3. Feature Fusion 
  const f_fused = concatenate([f_rgb, f_sat, f_sp]);

  // 4. Classification Head with Regularization
  const normalized = BatchNormalization(f_fused);
  const regularized = Dropout(normalized);
  const logits = DenseWeights(regularized) + Bias;

  // 5. Final categorical prediction
  return Softmax(logits);
}`;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Hero */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5" />
          TECHNICAL DOCUMENTATION
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold text-brand-navy mt-4 tracking-tight">
          AQI Classification Using Hybrid Multi-Input CNN
        </h1>
        <p className="text-brand-muted text-lg mt-3 max-w-2xl leading-relaxed">
          A computer vision and deep learning approach to estimating air pollution 
          levels directly from environmental images[cite: 10, 11].
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mt-10">
        {/* Sidebar */}
        <aside className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24 space-y-1 border-l border-brand-border">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`w-full text-left px-4 py-2 text-sm transition-all border-l-2 -ml-[2px] ${
                  activeSection === item.id
                    ? "border-brand-accent text-brand-navy font-bold"
                    : "border-transparent text-brand-muted hover:text-brand-navy hover:border-brand-border"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3 space-y-16">
          <DocSection id="overview" title="System Overview">
            <p className="text-brand-muted leading-relaxed">
              This system leverages deep learning to predict the Air Quality Index (AQI) using environmental images[cite: 11]. By combining transfer learning with a Hybrid Multi-Input Convolutional Neural Network (CNN) architecture, the model interprets atmospheric conditions—such as haze and visibility reduction—to output categorical AQI predictions[cite: 11, 208]. The model achieves a validation accuracy of approximately 98.67%[cite: 13].
            </p>
          </DocSection>

          <DocSection id="problem" title="Problem Statement">
            <div className="space-y-4">
              <p className="text-brand-muted leading-relaxed">
                Traditional AQI monitoring systems rely heavily on physical air quality sensors that measure pollutants such as PM2.5 and PM10[cite: 7]. While accurate, these systems pose significant challenges:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span className="text-brand-muted text-sm leading-relaxed">
                    <strong>Infrastructure Costs:</strong> Physical sensors are expensive to install, operate, and maintain, requiring continuous calibration and substantial financial investment[cite: 8, 39, 40].
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span className="text-brand-muted text-sm leading-relaxed">
                    <strong>Limited Spatial Coverage:</strong> Deployments are typically restricted to selected locations within major cities, leading to significant gaps in geographical coverage[cite: 29, 41].
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span className="text-brand-muted text-sm leading-relaxed">
                    <strong>Subjective Manual Estimation:</strong> While humans can notice haze or reduced visibility, manually estimating pollution levels from visual observations is highly subjective and inconsistent[cite: 43].
                  </span>
                </li>
              </ul>
            </div>
          </DocSection>

          <DocSection id="architecture" title="Deep Learning Architecture">
             <p className="text-brand-muted leading-relaxed mb-6">
              The core of the solution is a Hybrid Multi-Input CNN that processes three distinct representations of a single image[cite: 95, 97]. The architecture utilizes EfficientNetB0 as the backbone for feature extraction via transfer learning[cite: 105, 107].
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
              <h4 className="text-sm font-bold text-blue-800 uppercase tracking-widest mb-4">
                Forward Pass Flow
              </h4>
              <div className="flex flex-col md:flex-row items-center gap-4">
                {[
                  "3x Image Inputs",
                  "EfficientNetB0 Backbones",
                  "Feature Fusion (Concat)",
                  "Dense Layers + Softmax",
                ].map((step, i, arr) => (
                  <React.Fragment key={step}>
                    <div className="w-full md:w-auto flex-1 bg-white border border-blue-200 shadow-sm rounded-xl p-4 text-center">
                      <span className="block text-[10px] font-black text-blue-400 mb-1">
                        STAGE 0{i + 1}
                      </span>
                      <span className="text-xs font-bold text-blue-900">
                        {step}
                      </span>
                    </div>
                    {i < arr.length - 1 && (
                      <ArrowRight className="hidden md:block w-4 h-4 text-blue-300" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <CodeBlock
              language="javascript"
              code={architectureCode}
            />
          </DocSection>

          <DocSection id="representations" title="Input Representations">
            <p className="text-brand-muted leading-relaxed mb-6">
              To provide the neural network with complementary atmospheric information, the system generates three separate image streams[cite: 97]:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-brand-border rounded-xl p-5">
                <ImageIcon className="w-6 h-6 text-brand-accent mb-3" />
                <h3 className="font-bold text-brand-navy mb-2">1. RGB Image</h3>
                <p className="text-xs text-brand-muted leading-relaxed">
                  Serves as the primary input stream, preserving the natural visual appearance of the environment and capturing the overall atmospheric scene[cite: 98].
                </p>
              </div>

              <div className="border border-brand-border rounded-xl p-5">
                <Layers className="w-6 h-6 text-brand-accent mb-3" />
                <h3 className="font-bold text-brand-navy mb-2">2. Saturation Image</h3>
                <p className="text-xs text-brand-muted leading-relaxed">
                  Highlights color intensity variations caused by suspended particulate matter scattering light, helping the model detect subtle visual patterns[cite: 99, 100, 101].
                </p>
              </div>

              <div className="border border-brand-border rounded-xl p-5">
                <BrainCircuit className="w-6 h-6 text-brand-accent mb-3" />
                <h3 className="font-bold text-brand-navy mb-2">3. Superpixel Image</h3>
                <p className="text-xs text-brand-muted leading-relaxed">
                  Groups pixels with similar visual characteristics. This allows the network to focus on broader atmospheric patterns like haze distribution while reducing noise[cite: 102, 103].
                </p>
              </div>
            </div>
          </DocSection>

          <DocSection id="enhancements" title="Model Enhancements">
            <p className="text-brand-muted leading-relaxed mb-4">
              The initial baseline model processing a single RGB input achieved an accuracy of approximately 52%[cite: 119, 140]. The model was highly optimized through several deep learning strategies to achieve its final performance of 98.67%[cite: 137, 140]:
            </p>
            <ul className="space-y-4 list-none pl-0">
              <li className="flex items-center gap-3 bg-brand-light p-3 rounded-lg border border-brand-border">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-sm text-brand-navy">
                  <strong>Transfer Learning:</strong> Utilizing EfficientNetB0 pretrained weights to leverage rich visual feature extraction (textures, edges, shapes)[cite: 125, 126].
                </span>
              </li>
              <li className="flex items-center gap-3 bg-brand-light p-3 rounded-lg border border-brand-border">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-sm text-brand-navy">
                  <strong>Regularization:</strong> Integration of Dropout layers to prevent specific neuron dependency, and Batch Normalization to stabilize training[cite: 132, 133].
                </span>
              </li>
              <li className="flex items-center gap-3 bg-brand-light p-3 rounded-lg border border-brand-border">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-sm text-brand-navy">
                  <strong>Class Imbalance Handling:</strong> Implementation of class weighting during the training phase, assigning higher weights to minority AQI categories[cite: 89, 91, 92].
                </span>
              </li>
            </ul>
          </DocSection>

          <DocSection id="explainability" title="Explainability (Grad-CAM)">
             <div className="flex items-start gap-4 p-5 bg-purple-50 border border-purple-200 rounded-xl mb-6">
                <Search className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-purple-900 text-sm mb-2">Gradient-weighted Class Activation Mapping</h4>
                  <p className="text-sm text-purple-800 leading-relaxed">
                    To increase model transparency and address the "black box" nature of deep neural networks, Grad-CAM was incorporated[cite: 164, 165]. It analyzes the gradients flowing into the final convolutional layers to generate heatmaps highlighting the most influential regions for a prediction[cite: 168, 169].
                  </p>
                </div>
              </div>
              <p className="text-brand-muted leading-relaxed">
                Visualizations confirmed that the model effectively targets regions of the sky with apparent haze concentration and areas where distant objects (buildings, skylines) exhibit visibility degradation and blur, validating that predictions are based on relevant environmental features rather than arbitrary patterns[cite: 183, 186, 188].
              </p>
          </DocSection>

        </main>
      </div>
    </div>
  );
}
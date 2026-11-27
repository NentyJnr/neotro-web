import React, { lazy, Suspense } from 'react';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';

const AIBlocksCanvas = lazy(() => import('./AIBlocksCanvas').then(m => ({ default: m.AIBlocksCanvas })));
const AfricaMotionMap = lazy(() => import('./AfricaMotionMap').then(m => ({ default: m.AfricaMotionMap })));

interface HeroSectionProps {
  onBookDemo: () => void;
  onExploreSolutions: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onBookDemo, onExploreSolutions }) => {
  return (
    <section id="top" className="w-full relative border-b border-[#E5E7EB] bg-[#F7F9F8] py-14 sm:py-20 lg:py-24 overflow-hidden">
      {/* Subtle Architectural Crosshair Lines */}
      <div className="absolute inset-0 grid-crosshair-lines-light opacity-50 pointer-events-none" />

      {/* 3D Motion Canvas: Confined strictly to Right Hemisphere as background depth */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none opacity-30">
        <Suspense fallback={null}>
          <AIBlocksCanvas colorTheme="light" />
        </Suspense>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-6 flex flex-col items-start">
            {/* Eyebrow Badge Pill */}
            <span className="bg-[#DCFCE7] text-[#093824] text-xs font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-md inline-block mb-4 border border-[#BBF7D0]">
              AI-EMPOWERED SOFTWARE &amp; DIGITAL INFRASTRUCTURE
            </span>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold font-display text-[#0B1F17] leading-[1.12] tracking-tight mb-5 uppercase">
              BUILDING INTELLIGENT SYSTEMS THAT MAKE WORK EFFORTLESS.
            </h1>

            {/* Subheadline */}
            <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed mb-8 max-w-[540px]">
              Neotro engineers purpose-built software platforms and custom business portals for schools, construction firms, and growing enterprises across Africa—turning complex daily operations into seamless digital workflows.
            </p>

            {/* CTA Button Row */}
            <div className="flex items-center gap-4 flex-wrap mb-10">
              <button
                type="button"
                onClick={onBookDemo}
                className="bg-[#093824] hover:bg-[#0D4A30] text-white font-semibold text-base rounded-lg px-6 py-3.5 transition-all shadow-md inline-flex items-center gap-2 hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Book a Demo</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={onExploreSolutions}
                className="bg-white border border-[#D1D5DB] text-[#0B1F17] hover:bg-slate-50 font-semibold text-base rounded-lg px-6 py-3.5 transition-all shadow-xs cursor-pointer"
              >
                Explore our Solutions
              </button>
            </div>

            {/* Credibility Chips Bar */}
            <div className="flex items-center gap-6 flex-wrap text-xs font-semibold text-slate-600 pt-2 border-t border-slate-200/80 w-full max-w-xl">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                <span>99.9% Platform Availability</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                <span>NDPA 2023 Aligned</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                <span>Sub-4h Support SLA</span>
              </div>
            </div>
          </div>

          {/* Right Column: Pan-African Motion Map */}
          <div className="lg:col-span-6 w-full flex items-center justify-center">
            <Suspense fallback={
              <div className="w-full aspect-[4/3] rounded-2xl bg-white/50 border border-slate-200/60 flex items-center justify-center text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin text-[#059669]" />
              </div>
            }>
              <AfricaMotionMap />
            </Suspense>
          </div>

        </div>
      </div>
    </section>
  );
};

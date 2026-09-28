import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Layers } from 'lucide-react';

interface HeroProps {
  onStartProject: () => void;
  projectCount: number;
}

export const Hero: React.FC<HeroProps> = ({ onStartProject, projectCount }) => {
  const [animatedCount, setAnimatedCount] = useState(1);

  useEffect(() => {
    const target = projectCount || 6;
    let count = 1;
    const interval = setInterval(() => {
      if (count < target) {
        count += 1;
        setAnimatedCount(count);
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [projectCount]);

  return (
    <section className="relative overflow-hidden bg-[#07090e] pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-slate-800/80">
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Tagline Badge */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-slate-800 text-xs sm:text-sm font-medium text-slate-200 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Lagos, Nigeria — software &amp; systems</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Empowered Production Code</span>
          </div>
        </div>

        {/* Hero Title */}
        <div className="max-w-4xl text-left mb-8">
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.12]">
            We build the systems <br />
            <span className="text-amber-400 drop-shadow-[0_0_25px_rgba(245,158,11,0.25)]">
              Nigerian institutions run on.
            </span>
          </h1>
        </div>

        {/* Lede Description */}
        <div className="max-w-3xl text-left mb-10">
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
            Neotro Ltd designs and ships AI-empowered, scalable software for schools, churches, construction firms and local businesses — tools built to solve one real problem well, not to look good in a pitch deck.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-16">
          <a
            href="#work"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base transition-all duration-200 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5 cursor-pointer"
          >
            See what we've built
            <ArrowRight className="w-5 h-5" />
          </a>

          <button
            onClick={onStartProject}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-base border border-slate-700 hover:border-slate-600 transition-all duration-200 cursor-pointer shadow-md"
          >
            Start a project
          </button>
        </div>

        {/* Full-Width 3-Column Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-slate-800/80 text-left">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800/90 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 text-amber-500/10 group-hover:text-amber-500/20 transition-colors">
              <Layers className="w-12 h-12" />
            </div>
            <b id="statCount" className="font-display text-4xl sm:text-5xl font-extrabold text-amber-400 block mb-2">
              {animatedCount}+
            </b>
            <span className="text-sm sm:text-base font-medium text-slate-300 block">
              products &amp; portals live
            </span>
            <span className="text-xs text-slate-500 block mt-1">
              Active across Nigerian institutions
            </span>
          </div>

          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800/90 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 text-amber-500/10 group-hover:text-amber-500/20 transition-colors">
              <Zap className="w-12 h-12" />
            </div>
            <b className="font-display text-4xl sm:text-5xl font-extrabold text-white block mb-2">
              4
            </b>
            <span className="text-sm sm:text-base font-medium text-slate-300 block">
              key sectors served
            </span>
            <span className="text-xs text-slate-500 block mt-1">
              Schools, Churches, QS &amp; Enterprises
            </span>
          </div>

          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800/90 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 text-amber-500/10 group-hover:text-amber-500/20 transition-colors">
              <ShieldCheck className="w-12 h-12" />
            </div>
            <b className="font-display text-4xl sm:text-5xl font-extrabold text-amber-400 block mb-2">
              1
            </b>
            <span className="text-sm sm:text-base font-medium text-slate-300 block">
              problem at a time, done properly
            </span>
            <span className="text-xs text-slate-500 block mt-1">
              Narrow scope, daily operational use
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

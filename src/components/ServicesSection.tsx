import React from 'react';
import { GraduationCap, QrCode, Building2, Ruler, Briefcase, CheckCircle2, ArrowRight } from 'lucide-react';
import { SERVICES } from '../data/initialData';

const ICON_MAP: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap className="w-7 h-7 text-amber-400" />,
  QrCode: <QrCode className="w-7 h-7 text-amber-400" />,
  Building2: <Building2 className="w-7 h-7 text-amber-400" />,
  Ruler: <Ruler className="w-7 h-7 text-amber-400" />,
  Briefcase: <Briefcase className="w-7 h-7 text-amber-400" />
};

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-[#07090e] border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 text-left">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 block">
              Core Institutional Capabilities
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
              What we do
            </h2>
          </div>
          <p className="text-base sm:text-lg text-slate-300 max-w-md leading-relaxed">
            We're a small team that designs, builds and ships software end to end — from the first conversation about a problem to a product staff use every day.
          </p>
        </div>

        {/* 2/3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 text-left">
          {SERVICES.map((svc, idx) => (
            <div
              key={svc.id}
              className="glass-card p-8 rounded-2xl flex flex-col justify-between border border-slate-800/90 relative group hover:border-amber-500/40"
            >
              {/* Card Number Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 group-hover:scale-110 transition-transform">
                  {ICON_MAP[svc.iconName] || <Briefcase className="w-7 h-7 text-amber-400" />}
                </div>
                <span className="font-display text-xs font-bold text-slate-500 tracking-widest uppercase">
                  0{idx + 1}
                </span>
              </div>

              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
                  {svc.title}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  {svc.description}
                </p>
              </div>

              {/* Highlight Bullets */}
              <div className="pt-6 border-t border-slate-800/80 space-y-2">
                {svc.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Callout Card */}
          <div className="glass-panel p-8 rounded-2xl flex flex-col justify-between border-2 border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950 text-left relative">
            <div>
              <span className="inline-block px-3 py-1 rounded-md bg-amber-500/20 text-amber-300 text-xs font-bold mb-4 border border-amber-500/30">
                Custom Institutional Software
              </span>
              <h3 className="font-display text-2xl font-bold text-white mb-3">
                Have a unique operational problem?
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                We engineer bespoke systems tailored to the exact workflows of your Nigerian school, church, QS firm, or enterprise.
              </p>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center justify-between px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/20"
            >
              <span>Discuss Your Requirements</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Target, ShieldCheck, Zap, Layers } from 'lucide-react';

export const ApproachSection: React.FC = () => {
  return (
    <section id="approach" className="py-24 bg-[#07090e] border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
          {/* Left Column: Heading & Highlight Quote */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400">
              <Target className="w-3.5 h-3.5" /> Our Engineering Philosophy
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              How we work
            </h2>

            <p className="text-slate-300 text-lg leading-relaxed font-normal">
              Software shouldn't exist to win design awards or pad pitch decks. It has to solve a tangible problem staff face every day.
            </p>

            <div className="p-6 rounded-2xl bg-amber-500/10 border-l-4 border-amber-500 text-white font-display text-xl font-bold leading-snug">
              "Software has to earn its place in someone's routine."
            </div>
          </div>

          {/* Right Column: Narrative Panel */}
          <div className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-3xl space-y-8 border border-slate-800/90">
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Most of what we build starts from a problem someone is already living with — a school still taking attendance on paper, a QS firm re-typing the same takeoff into three spreadsheets, a church losing track of who actually showed up.
            </p>

            <p className="text-base sm:text-lg text-amber-200 font-semibold leading-relaxed">
              We'd rather ship something narrow that a team uses every day than something broad that impresses once and gets abandoned.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-800/80">
              <div className="space-y-2">
                <div className="p-2.5 w-fit rounded-lg bg-amber-500/10 text-amber-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">Auditable &amp; Secure</h4>
                <p className="text-xs text-slate-400 leading-relaxed">Built for institutional compliance and financial audit trails.</p>
              </div>

              <div className="space-y-2">
                <div className="p-2.5 w-fit rounded-lg bg-amber-500/10 text-amber-400">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">Nigerian Infra Ready</h4>
                <p className="text-xs text-slate-400 leading-relaxed">Optimized for local networks, offline sync &amp; SMS gateways.</p>
              </div>

              <div className="space-y-2">
                <div className="p-2.5 w-fit rounded-lg bg-amber-500/10 text-amber-400">
                  <Layers className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">Zero Placeholders</h4>
                <p className="text-xs text-slate-400 leading-relaxed">Production-ready React code delivered on day one.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

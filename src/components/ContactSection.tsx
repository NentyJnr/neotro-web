import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

interface ContactSectionProps {
  onOpenContactModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenContactModal }) => {
  return (
    <section id="contact" className="py-24 bg-[#05070b] text-white border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-14 rounded-3xl border border-slate-800 text-left relative overflow-hidden bg-gradient-to-br from-[#0c1220] via-[#080b13] to-[#040609]">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 blur-[150px] pointer-events-none rounded-full" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 block">
                Start a Conversation
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
                Have a problem worth solving properly?
              </h2>

              <p className="text-slate-300 text-base sm:text-lg mb-8 max-w-2xl leading-relaxed">
                Whether you need a school portal, smart attendance system, QS takeoff tool, or a custom portal for your business, let's talk about the exact problem your team faces.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenContactModal}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base transition-all shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5 cursor-pointer"
                >
                  <Send className="w-5 h-5" />
                  Start a Project Inquiry
                </button>

                <a
                  href="mailto:info@neotroltd.com"
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-base font-semibold border border-slate-700 transition-colors"
                >
                  <Mail className="w-4 h-4 text-amber-400" />
                  info@neotroltd.com
                </a>
              </div>
            </div>

            {/* Direct Contact Card Details */}
            <div className="lg:col-span-4 bg-slate-900/90 p-8 rounded-2xl border border-slate-800/90 space-y-6">
              <h3 className="font-display text-lg font-bold text-white border-b border-slate-800 pb-3">
                Direct Contact Details
              </h3>

              <a
                href="mailto:info@neotroltd.com"
                className="flex items-center gap-3 text-slate-300 hover:text-amber-400 transition-colors text-sm font-medium"
              >
                <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="truncate">info@neotroltd.com</span>
              </a>

              <a
                href="tel:+2348030930762"
                className="flex items-center gap-3 text-slate-300 hover:text-amber-400 transition-colors text-sm font-medium"
              >
                <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+234 803 093 0762</span>
              </a>

              <div className="flex items-start gap-3 text-slate-300 text-xs sm:text-sm font-medium">
                <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="leading-relaxed">18 Kokoro Street, Awoyaya, Ajah, Lagos State, Nigeria</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

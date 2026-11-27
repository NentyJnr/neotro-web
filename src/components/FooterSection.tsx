import React from 'react';
import { NeotroLogo } from './NeotroLogo';

interface FooterSectionProps {
  scrollToSection: (id: string) => void;
  onOpenCareers: () => void;
  onOpenPrivacyPolicy: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  scrollToSection,
  onOpenCareers,
  onOpenPrivacyPolicy
}) => {
  return (
    <footer className="w-full bg-[#093824] border-t border-[#0D4A30] text-white pt-16 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Subtle Ambient Depth */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-96 bg-[radial-gradient(ellipse_at_right,rgba(16,185,129,0.14)_0%,transparent_75%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* Column 1: Brand & Lagos Office (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Brand Logo */}
            <div className="inline-flex items-center bg-white rounded-xl px-3.5 py-1.5 shadow-sm">
              <NeotroLogo size="sm" variant="green" />
            </div>

            <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed max-w-sm">
              Enterprise technology partner building secure, scalable digital infrastructure for governments, institutions, and businesses across Africa.
            </p>

            {/* Lagos Office Address Block */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold font-mono tracking-wider text-[#FBBF24] uppercase block">
                LAGOS OFFICE
              </span>
              <p className="text-white/95 text-xs sm:text-sm leading-relaxed max-w-xs">
                18 Kokoro Street, Awoyaya, Ajah, Lekki Corridor, Lagos, Nigeria.
              </p>
              <div className="pt-2 space-y-1 text-xs sm:text-sm">
                <a 
                  href="tel:+2348030930762" 
                  className="text-emerald-100 hover:text-white transition-colors block font-mono"
                >
                  0800NEOTRO (+234 803 093 0762)
                </a>
                <a 
                  href="mailto:info@neotroltd.com" 
                  className="text-emerald-100 hover:text-white transition-colors block font-mono"
                >
                  info@neotroltd.com
                </a>
              </div>
            </div>

          </div>

          {/* Column 2: NEOTRO Navigation Links (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-xs font-bold font-mono tracking-wider text-[#FBBF24] uppercase block">
              NEOTRO
            </span>
            <ul className="space-y-3 text-xs sm:text-sm font-normal text-emerald-100/90">
              <li>
                <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors cursor-pointer">
                  About us
                </button>
              </li>
              <li>
                <button onClick={onOpenCareers} className="hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1.5">
                  <span>Careers</span>
                  <span className="px-1.5 py-0.2 text-[9px] font-bold rounded bg-emerald-700/60 text-emerald-200">
                    Hiring
                  </span>
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contact us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: INFO / Policies (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-xs font-bold font-mono tracking-wider text-[#FBBF24] uppercase block">
              INFO
            </span>
            <ul className="space-y-3 text-xs sm:text-sm font-normal text-emerald-100/90">
              <li>
                <button onClick={onOpenPrivacyPolicy} className="hover:text-white transition-colors cursor-pointer text-left">
                  Data protection policy
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Channels & Community Connect (4 Cols) */}
          <div className="lg:col-span-4">
            <div className="bg-[#062618] border border-[#0F4A32] rounded-2xl p-6 shadow-2xl space-y-4">
              
              <div className="space-y-2">
                <span className="text-xs font-bold font-mono tracking-wider text-[#FBBF24] uppercase block">
                  CONNECT WITH US
                </span>
                <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed">
                  Connect with our engineering team, explore platform capabilities, or reach out directly on WhatsApp for institutional consultations.
                </p>
              </div>

              {/* Social Connect Icons */}
              <div className="pt-2 border-t border-[#0F4A32] flex items-center gap-2.5">
                
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-[#0A3321] border border-emerald-700/40 flex items-center justify-center text-emerald-300 hover:text-white hover:bg-[#059669] hover:border-emerald-400 transition-all cursor-pointer shadow-xs"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                  </svg>
                </a>

                {/* X (Twitter) */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-[#0A3321] border border-emerald-700/40 flex items-center justify-center text-emerald-300 hover:text-white hover:bg-[#059669] hover:border-emerald-400 transition-all cursor-pointer shadow-xs"
                  aria-label="X Twitter"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/neotro-ltd"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-[#0A3321] border border-emerald-700/40 flex items-center justify-center text-emerald-300 hover:text-white hover:bg-[#059669] hover:border-emerald-400 transition-all cursor-pointer shadow-xs"
                  aria-label="Neotro Ltd on LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.89 0-1.61.72-1.61 1.61 0 .89.72 1.61 1.61 1.61.89 0 1.61-.72 1.61-1.61 0-.89-.72-1.61-1.61-1.61Z" />
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/2348030930762"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-[#0A3321] border border-emerald-700/40 flex items-center justify-center text-emerald-300 hover:text-white hover:bg-[#059669] hover:border-emerald-400 transition-all cursor-pointer shadow-xs"
                  aria-label="WhatsApp"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.83a8.21 8.21 0 0 1-5.82 2.41c-1.45 0-2.87-.38-4.11-1.11l-.3-.18-3.11.82.83-3.03-.2-.31a8.16 8.16 0 0 1-1.25-4.43c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3" />
                  </svg>
                </a>

              </div>

            </div>
          </div>

        </div>

        {/* Sub-Footer Copyright Bar */}
        <div className="pt-8 border-t border-[#0D4A30] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/80">
          <div>
            &copy; {new Date().getFullYear()} Neotro. All rights reserved.
          </div>

          <div className="text-xs text-emerald-200/80">
            Enterprise technology for African institutions.
          </div>
        </div>

      </div>
    </footer>
  );
};

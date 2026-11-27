import React from 'react';
import { GraduationCap, HardHat, Globe, ArrowRight } from 'lucide-react';

interface SolutionsSectionProps {
  platformCategory: 'education' | 'construction' | 'websites';
  onSelectCategory: (category: 'education' | 'construction' | 'websites') => void;
  onSelectService: (service: string) => void;
  onDiscussProject: () => void;
}

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({
  platformCategory,
  onSelectCategory,
  onSelectService,
  onDiscussProject
}) => {
  return (
    <section id="sectors" className="w-full bg-[#F7F9F8] py-16 sm:py-24 border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 text-left">
          <span className="bg-[#DCFCE7] text-[#093824] text-xs font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-md inline-block mb-4 border border-[#BBF7D0]">
            FEATURED WORK &amp; PLATFORMS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#0B1F17] leading-tight mb-3">
            Software &amp; Platforms We've Built
          </h2>
          <p className="text-[#4B5563] text-base max-w-[640px] leading-relaxed">
            Explore our ready-to-deploy platforms and custom digital products—built to solve real operational challenges across education, construction, and growing businesses.
          </p>
        </div>

        {/* 3 Sector Tabs: Education, Construction, Websites */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap mb-10 pb-4 border-b border-[#E5E7EB]">
          <button
            type="button"
            onClick={() => onSelectCategory('education')}
            className={`px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all inline-flex items-center gap-2 cursor-pointer ${
              platformCategory === 'education'
                ? 'bg-[#093824] text-white shadow-md ring-2 ring-[#059669]/30'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-[#093824] hover:bg-slate-50'
            }`}
          >
            <GraduationCap className={`w-4 h-4 ${platformCategory === 'education' ? 'text-[#34D399]' : 'text-slate-500'}`} />
            <span>Education</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectCategory('construction')}
            className={`px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all inline-flex items-center gap-2 cursor-pointer ${
              platformCategory === 'construction'
                ? 'bg-[#093824] text-white shadow-md ring-2 ring-[#059669]/30'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-[#093824] hover:bg-slate-50'
            }`}
          >
            <HardHat className={`w-4 h-4 ${platformCategory === 'construction' ? 'text-[#34D399]' : 'text-slate-500'}`} />
            <span>Construction</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectCategory('websites')}
            className={`px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all inline-flex items-center gap-2 cursor-pointer ${
              platformCategory === 'websites'
                ? 'bg-[#093824] text-white shadow-md ring-2 ring-[#059669]/30'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-[#093824] hover:bg-slate-50'
            }`}
          >
            <Globe className={`w-4 h-4 ${platformCategory === 'websites' ? 'text-[#34D399]' : 'text-slate-500'}`} />
            <span>Websites</span>
          </button>
        </div>

        {/* TAB 1: EDUCATION PROJECTS SECTION */}
        {platformCategory === 'education' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex items-center justify-between flex-wrap gap-2 pb-2">
              <div>
                <span className="text-xs font-bold text-[#059669] uppercase tracking-wider font-mono">
                  EDUCATION SOLUTIONS
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-[#0B1F17] mt-0.5">
                  School Management, AI Assessment &amp; Smart Attendance
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Built for primary, secondary, and tertiary institutions
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* PLATFORM 1: Neotro School Portal */}
              <div className="bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group">
                <div>
                  <div className="bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-bold tracking-wider uppercase text-[#093824] bg-[#DCFCE7] px-2.5 py-0.5 rounded border border-[#BBF7D0]">
                      EDUCATION
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 font-semibold">Academic ERP &amp; Result Engine</span>
                  </div>

                  <div className="p-4 sm:p-5 bg-gradient-to-br from-emerald-900/5 via-slate-50 to-emerald-50/20 border-b border-slate-200">
                    <a
                      href="https://neotro-portal.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-white aspect-[1024/466] group/preview"
                    >
                      <img 
                        src="/images/neotro-academy-portal.png" 
                        alt="Neotro Academy - Enterprise Academic System" 
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/preview:scale-[1.03]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-xl pointer-events-none" />
                    </a>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="text-xl font-bold font-display text-[#0B1F17]">
                        Neotro School Portal
                      </h3>
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/70 whitespace-nowrap">
                        Neotro Academy
                      </span>
                    </div>
                    <p className="text-[#4B5563] text-sm leading-relaxed mb-6">
                      Automate terminal report compilation, eliminate manual grading errors, reconcile school tuition receipts, and give parents instant real-time academic access from one unified multi-tenant platform.
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <a
                    href="https://neotro-portal.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-lg bg-[#093824] hover:bg-[#0D4A30] text-white font-semibold text-xs transition-all shadow-xs inline-flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Launch School Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* PLATFORM 2: Lecturra AI Assessment Generator */}
              <div className="bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group">
                <div>
                  <div className="bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-bold tracking-wider uppercase text-[#093824] bg-[#DCFCE7] px-2.5 py-0.5 rounded border border-[#BBF7D0]">
                      AI &amp; EDTECH
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 font-semibold">Assessment &amp; Question Bank</span>
                  </div>

                  <div className="p-4 sm:p-5 bg-gradient-to-br from-teal-900/10 via-slate-50 to-emerald-50 border-b border-slate-200">
                    <a 
                      href="https://lecturra.vercel.app/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block relative rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-white aspect-[1024/464] group/preview"
                    >
                      <img 
                        src="/images/lecturra-portal.png" 
                        alt="Lecturra AI - Academic Assessment Engine" 
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/preview:scale-[1.03]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-xl pointer-events-none" />
                    </a>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="text-xl font-bold font-display text-[#0B1F17]">
                        Lecturra
                      </h3>
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/70 whitespace-nowrap">
                        Live Assessment Engine
                      </span>
                    </div>
                    <p className="text-[#4B5563] text-sm leading-relaxed mb-6">
                      An AI-empowered assessment generation engine that ingests syllabus documents and lecture notes to produce structured, schema-validated exam questions, marking guides, and interactive quizzes in seconds.
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <a
                    href="https://lecturra.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-lg bg-[#093824] hover:bg-[#0D4A30] text-white font-semibold text-xs transition-all shadow-xs inline-flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Test Lecturra AI</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* PLATFORM 3: SmartCheck Campus Attendance & RFID Relay */}
              <div className="bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group">
                <div>
                  <div className="bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-bold tracking-wider uppercase text-[#093824] bg-[#DCFCE7] px-2.5 py-0.5 rounded border border-[#BBF7D0]">
                      CAMPUS ACCESS
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 font-semibold">RFID &amp; Real-Time Verification</span>
                  </div>

                  <div className="p-5 bg-gradient-to-br from-slate-100 via-emerald-50/50 to-[#DCFCE7]/30 border-b border-slate-200">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded bg-[#093824] text-white font-black text-xs flex items-center justify-center">A</div>
                          <span className="font-bold text-xs text-[#0B1F17]">Neotro Check-in Relay</span>
                        </div>
                        <span className="bg-emerald-100 text-[#093824] text-[11px] font-bold px-2 py-0.5 rounded border border-emerald-200">
                          Live Sync
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-[#F7F9F8] p-2 rounded-lg border border-slate-200">
                          <span className="text-slate-400 block text-[10px] font-medium">Verified Today</span>
                          <span className="font-bold text-[#059669] block">1,842 Check-ins</span>
                        </div>
                        <div className="bg-[#F7F9F8] p-2 rounded-lg border border-slate-200">
                          <span className="text-slate-400 block text-[10px] font-medium">Proxy Rate</span>
                          <span className="font-bold text-[#093824] block">0.00% (Strict)</span>
                        </div>
                      </div>

                      <div className="border border-slate-200 rounded-lg p-2.5 bg-[#F7F9F8] text-xs space-y-1">
                        <div className="flex justify-between items-center text-slate-700 font-medium">
                          <span>Adebayo O. (Gate A)</span>
                          <span className="text-[#059669] font-bold font-mono">08:14 AM — NFC Verified</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="text-xl font-bold font-display text-[#0B1F17]">
                        SmartCheck Attendance
                      </h3>
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/70 whitespace-nowrap">
                        Hardware Sync
                      </span>
                    </div>
                    <p className="text-[#4B5563] text-sm leading-relaxed mb-6">
                      A hardware-synchronized attendance verification system for schools, corporate facilities, and events—eliminating proxy check-ins, triggering automated parent SMS alerts, and producing verified attendance audits.
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <button
                    type="button"
                    onClick={() => onSelectService('Attendance & ID systems')}
                    className="w-full py-2.5 px-4 rounded-lg bg-[#093824] hover:bg-[#0D4A30] text-white font-semibold text-xs transition-all shadow-xs inline-flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Inquire Attendance Setup</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CONSTRUCTION PROJECTS SECTION */}
        {platformCategory === 'construction' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex items-center justify-between flex-wrap gap-2 pb-2">
              <div>
                <span className="text-xs font-bold text-[#059669] uppercase tracking-wider font-mono">
                  CONSTRUCTION &amp; ESTIMATING SUITE
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-[#0B1F17] mt-0.5">
                  Quantity Surveying, Digital Takeoff &amp; Rate Intelligence
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                2 precision engines for quantity surveyors, civil contractors &amp; developers
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* PLATFORM 1: Neoppe QS Takeoff Engine */}
              <div className="bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group">
                <div>
                  <div className="bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-bold tracking-wider uppercase text-[#093824] bg-[#DCFCE7] px-2.5 py-0.5 rounded border border-[#BBF7D0]">
                      CONSTRUCTION &amp; QS
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 font-semibold">Digital Takeoff &amp; BOQ Engine</span>
                  </div>

                  <div className="p-5 bg-[#091E15] border-b border-slate-200 text-white">
                    <div className="bg-black/40 rounded-xl border border-emerald-900/60 p-4 space-y-3">
                      <div className="flex items-center justify-between border-b border-emerald-800/40 pb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded bg-[#10B981] text-[#093824] font-black text-xs flex items-center justify-center">N</div>
                          <span className="font-bold text-xs text-white">Neoppe BOQ Takeoff</span>
                        </div>
                        <span className="bg-emerald-500/20 text-emerald-300 text-[11px] font-bold px-2 py-0.5 rounded border border-emerald-500/40">
                          Live Calc
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="bg-emerald-950/60 p-2 rounded-lg border border-emerald-800/30">
                          <span className="text-emerald-400/80 block text-[10px] font-medium">Wall Area</span>
                          <span className="font-bold text-white block">342.8 m²</span>
                        </div>
                        <div className="bg-emerald-950/60 p-2 rounded-lg border border-emerald-800/30">
                          <span className="text-emerald-400/80 block text-[10px] font-medium">Volume</span>
                          <span className="font-bold text-white block">48.5 m³</span>
                        </div>
                        <div className="bg-emerald-950/60 p-2 rounded-lg border border-emerald-800/30">
                          <span className="text-emerald-400/80 block text-[10px] font-medium">Efficiency</span>
                          <span className="font-bold text-[#10B981] block">85% Faster</span>
                        </div>
                      </div>

                      <div className="bg-black/60 rounded-lg p-2 border border-emerald-900/40 font-mono text-[10.5px] text-emerald-300">
                        <div>[TAKEOFF 04-A] 225mm Blockwall: 342.8m² @ ₦2,450/m²</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="text-xl font-bold font-display text-[#0B1F17]">
                        Neoppe
                      </h3>
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/70 whitespace-nowrap">
                        QS Takeoff Platform
                      </span>
                    </div>
                    <p className="text-[#4B5563] text-sm leading-relaxed mb-6">
                      A quantity surveying takeoff platform that turns architectural drawings into live Bills of Quantities (BOQ), automated unit rate analyses, and precise material estimates in a fraction of traditional manual time.
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <button
                    type="button"
                    onClick={() => onSelectService('Construction & QS technology')}
                    className="w-full py-2.5 px-4 rounded-lg bg-[#093824] hover:bg-[#0D4A30] text-white font-semibold text-xs transition-all shadow-xs inline-flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Explore Neoppe Takeoff</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* PLATFORM 2: TakeoffPro Digital Estimating Suite */}
              <div className="bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group">
                <div>
                  <div className="bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-bold tracking-wider uppercase text-[#093824] bg-[#DCFCE7] px-2.5 py-0.5 rounded border border-[#BBF7D0]">
                      ESTIMATING &amp; TENDER
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 font-semibold">Market Rates &amp; Cost Hub</span>
                  </div>

                  <div className="p-5 bg-gradient-to-br from-emerald-950 via-[#0B251A] to-slate-900 border-b border-slate-200 text-white">
                    <div className="bg-black/50 rounded-xl border border-emerald-800/40 p-4 space-y-3">
                      <div className="flex items-center justify-between border-b border-emerald-800/30 pb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded bg-[#10B981] text-[#093824] font-black text-xs flex items-center justify-center">T</div>
                          <span className="font-bold text-xs text-white">TakeoffPro Cost Intelligence</span>
                        </div>
                        <span className="bg-emerald-500/20 text-emerald-300 text-[11px] font-bold px-2 py-0.5 rounded border border-emerald-500/40">
                          Audited Rates
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="bg-emerald-950/70 p-2 rounded-lg border border-emerald-800/30">
                          <span className="text-emerald-400/80 block text-[10px] font-medium">Concrete (G25)</span>
                          <span className="font-bold text-white block">₦185k/m³</span>
                        </div>
                        <div className="bg-emerald-950/70 p-2 rounded-lg border border-emerald-800/30">
                          <span className="text-emerald-400/80 block text-[10px] font-medium">Rebar (16mm)</span>
                          <span className="font-bold text-white block">₦950k/t</span>
                        </div>
                        <div className="bg-emerald-950/70 p-2 rounded-lg border border-emerald-800/30">
                          <span className="text-emerald-400/80 block text-[10px] font-medium">Tender Parity</span>
                          <span className="font-bold text-[#10B981] block">±1.2% Var</span>
                        </div>
                      </div>

                      <div className="bg-black/60 rounded-lg p-2 border border-emerald-900/40 font-mono text-[10.5px] text-emerald-300">
                        <div>[BESMM4 AUDIT] 4-Storey Faculty Block: Bill 3 Substructure Verified</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="text-xl font-bold font-display text-[#0B1F17]">
                        TakeoffPro Estimating
                      </h3>
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/70 whitespace-nowrap">
                        Tender Intelligence
                      </span>
                    </div>
                    <p className="text-[#4B5563] text-sm leading-relaxed mb-6">
                      A cloud-based quantity surveying and cost-modelling suite converting CAD/PDF blueprints directly into auditable Bills of Quantities (BOQ) with live market rate analyses and subcontractor tender comparison.
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <button
                    type="button"
                    onClick={() => onSelectService('Construction & QS technology')}
                    className="w-full py-2.5 px-4 rounded-lg bg-[#093824] hover:bg-[#0D4A30] text-white font-semibold text-xs transition-all shadow-xs inline-flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Request Estimating Demo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: WEBSITES PROJECTS SECTION */}
        {platformCategory === 'websites' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex items-center justify-between flex-wrap gap-2 pb-2">
              <div>
                <span className="text-xs font-bold text-[#059669] uppercase tracking-wider font-mono">
                  CUSTOM WEBSITES &amp; ENTERPRISE PORTALS
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-[#0B1F17] mt-0.5">
                  High-Performance Institutional Websites &amp; Operations Portals
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                2 bespoke web solutions engineered from scratch with zero generic templates
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* PLATFORM 1: Bespoke Institutional & Corporate Websites */}
              <div className="bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group">
                <div>
                  <div className="bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-bold tracking-wider uppercase text-[#093824] bg-[#DCFCE7] px-2.5 py-0.5 rounded border border-[#BBF7D0]">
                      CUSTOM WEBSITES
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 font-semibold">Modern React &amp; Next.js</span>
                  </div>

                  <div className="p-5 bg-gradient-to-br from-slate-900 via-emerald-950/80 to-[#093824] border-b border-slate-200 text-white">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 space-y-3">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                          <span className="text-[11px] font-mono text-emerald-200/80 ml-2">https://client.neotro.com</span>
                        </div>
                        <span className="bg-emerald-500/20 text-emerald-300 text-[11px] font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                          99/100 Perf
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="bg-black/40 p-2 rounded-lg border border-white/10">
                          <span className="text-emerald-400/80 block text-[10px] font-medium">Lighthouse</span>
                          <span className="font-bold text-white block">100% SEO</span>
                        </div>
                        <div className="bg-black/40 p-2 rounded-lg border border-white/10">
                          <span className="text-emerald-400/80 block text-[10px] font-medium">Speed (LCP)</span>
                          <span className="font-bold text-emerald-300 block">0.68s Load</span>
                        </div>
                        <div className="bg-black/40 p-2 rounded-lg border border-white/10">
                          <span className="text-emerald-400/80 block text-[10px] font-medium">Architecture</span>
                          <span className="font-bold text-white block">React / Next</span>
                        </div>
                      </div>

                      <div className="bg-black/50 rounded-lg p-2 border border-white/10 font-mono text-[10.5px] text-emerald-200 flex items-center justify-between">
                        <span>NDPA 2023 Statutory Aligned</span>
                        <span className="text-emerald-400 font-bold">Zero-Template Code</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="text-xl font-bold font-display text-[#0B1F17]">
                        Institutional Websites
                      </h3>
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/70 whitespace-nowrap">
                        Bespoke Engineering
                      </span>
                    </div>
                    <p className="text-[#4B5563] text-sm leading-relaxed mb-6">
                      Custom-engineered corporate and institutional web applications designed from scratch—zero generic templates. Features tailored design systems, ultra-fast CDN delivery, and custom administrative control panels.
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <button
                    type="button"
                    onClick={() => onSelectService('Business portals')}
                    className="w-full py-2.5 px-4 rounded-lg bg-[#093824] hover:bg-[#0D4A30] text-white font-semibold text-xs transition-all shadow-xs inline-flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Request Website Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* PLATFORM 2: OmniBiz Merchant Order & B2B Inventory Hub */}
              <div className="bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group">
                <div>
                  <div className="bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-bold tracking-wider uppercase text-[#093824] bg-[#DCFCE7] px-2.5 py-0.5 rounded border border-[#BBF7D0]">
                      ENTERPRISE PORTALS
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 font-semibold">B2B Order &amp; Inventory Hub</span>
                  </div>

                  <div className="p-5 bg-gradient-to-br from-emerald-900/10 via-slate-50 to-emerald-50 border-b border-slate-200">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded bg-[#093824] text-[#BBF7D0] font-black text-xs flex items-center justify-center">O</div>
                          <span className="font-bold text-xs text-[#0B1F17]">OmniBiz B2B Order Console</span>
                        </div>
                        <span className="bg-emerald-100 text-[#093824] text-[11px] font-bold px-2 py-0.5 rounded border border-emerald-200">
                          Live Gateway
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="bg-[#F7F9F8] p-2 rounded-lg border border-slate-200">
                          <span className="text-slate-400 block text-[10px] font-medium">Monthly Volume</span>
                          <span className="font-bold text-[#0B1F17] block">₦450M+ GMV</span>
                        </div>
                        <div className="bg-[#F7F9F8] p-2 rounded-lg border border-slate-200">
                          <span className="text-slate-400 block text-[10px] font-medium">Distributors</span>
                          <span className="font-bold text-[#059669] block">120+ Active</span>
                        </div>
                        <div className="bg-[#F7F9F8] p-2 rounded-lg border border-slate-200">
                          <span className="text-slate-400 block text-[10px] font-medium">Payment Sync</span>
                          <span className="font-bold text-[#093824] block">Paystack/NIBSS</span>
                        </div>
                      </div>

                      <div className="border border-slate-200 rounded-lg p-2.5 bg-[#F7F9F8] text-xs space-y-1">
                        <div className="flex justify-between items-center text-slate-700 font-medium">
                          <span>[DISPATCH #189] Apapa Terminal Hub</span>
                          <span className="text-[#059669] font-bold font-mono">1,400 Units Dispatched</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="text-xl font-bold font-display text-[#0B1F17]">
                        Enterprise Web Portals
                      </h3>
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/70 whitespace-nowrap">
                        B2B Operations Hub
                      </span>
                    </div>
                    <p className="text-[#4B5563] text-sm leading-relaxed mb-6">
                      Custom digital portals enabling distributors and FMCG wholesalers to inspect live inventory levels, issue automated e-invoices, manage vendor credit terms, and reconcile settlements securely online.
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <button
                    type="button"
                    onClick={() => onSelectService('Business portals')}
                    className="w-full py-2.5 px-4 rounded-lg bg-[#093824] hover:bg-[#0D4A30] text-white font-semibold text-xs transition-all shadow-xs inline-flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Explore Enterprise Portals</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Callout Banner */}
        <div className="mt-12 bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1 max-w-2xl text-left">
            <p className="text-sm sm:text-base text-[#0B1F17] font-semibold">
              Need a custom platform for your business or industry?
            </p>
            <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
              We design and build tailored web apps, portals, and automation tools.
            </p>
          </div>
          <button
            type="button"
            onClick={onDiscussProject}
            className="px-6 py-3 rounded-xl bg-[#093824] hover:bg-[#0D4A30] text-white font-bold text-xs sm:text-sm transition-all shadow-sm hover:shadow-md inline-flex items-center gap-2 cursor-pointer shrink-0 active:scale-95"
          >
            <span>Discuss Your Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

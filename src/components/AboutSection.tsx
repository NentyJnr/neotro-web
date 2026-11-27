import React from 'react';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="w-full bg-[#F7F9F8] py-16 sm:py-24 border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-stretch">
          
          {/* Left Column: Purpose & Concrete Assurance */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <span className="bg-[#DCFCE7] text-[#093824] text-xs font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-md inline-block mb-4 border border-[#BBF7D0]">
                ABOUT NEOTRO LTD
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#0B1F17] leading-tight mb-4">
                Building reliable software for modern organizations.
              </h2>
              <p className="text-[#4B5563] text-base leading-relaxed mb-6">
                Neotro Ltd designs and deploys scalable digital platforms for growing businesses, enterprises, and institutions—helping teams automate daily operations with dependable 99.9% uptime.
              </p>
              <div className="space-y-3.5">
                <div className="flex items-start gap-3 text-sm font-semibold text-[#0B1F17]">
                  <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" />
                  <div>
                    <span>NDPA Compliant (Nigeria Data Protection Act)</span>
                    <p className="text-xs text-[#6B7280] font-normal mt-0.5">
                      Built with strict data privacy controls, secure handling standards, and clear user consent management.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm font-semibold text-[#0B1F17]">
                  <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" />
                  <div>
                    <span>Automated Daily Backups</span>
                    <p className="text-xs text-[#6B7280] font-normal mt-0.5">
                      Your data is automatically backed up every 24 hours to secure offsite storage for fast, reliable recovery.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm font-semibold text-[#0B1F17]">
                  <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" />
                  <div>
                    <span>Role-Based Access Control</span>
                    <p className="text-xs text-[#6B7280] font-normal mt-0.5">
                      Custom permissions that keep management, staff, finance, and client data properly separated and secure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Balanced Enterprise Compliance Card */}
          <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-2xl p-7 sm:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-[#DCFCE7] text-[#093824] flex items-center justify-center font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#059669]" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1F17]">Security &amp; Reliability Built In</h3>
              </div>
              <p className="text-sm text-[#4B5563] leading-relaxed mb-6">
                Every platform we build follows strict security practices—combining isolated data storage, strong encryption, and full activity logs for complete accountability.
              </p>
            </div>

            {/* Concrete 4-Metric Grid */}
            <div className="grid grid-cols-2 gap-3.5 pt-2">
              <div className="p-4 rounded-xl bg-[#F7F9F8] border border-slate-200">
                <div className="text-xs font-bold text-[#093824] uppercase tracking-wider">UPTIME</div>
                <div className="text-2xl font-bold font-display text-[#0B1F17] mt-1">99.9%</div>
                <span className="text-[11px] text-slate-500 block mt-0.5">Monitored 24/7</span>
              </div>
              <div className="p-4 rounded-xl bg-[#F7F9F8] border border-slate-200">
                <div className="text-xs font-bold text-[#093824] uppercase tracking-wider">SUPPORT RESPONSE</div>
                <div className="text-2xl font-bold font-display text-[#0B1F17] mt-1">&lt; 4 Hrs</div>
                <span className="text-[11px] text-slate-500 block mt-0.5">Dedicated support team</span>
              </div>
              <div className="p-4 rounded-xl bg-[#F7F9F8] border border-slate-200">
                <div className="text-xs font-bold text-[#093824] uppercase tracking-wider">DATA STANDARD</div>
                <div className="text-2xl font-bold font-display text-[#0B1F17] mt-1">NDPA</div>
                <span className="text-[11px] text-slate-500 block mt-0.5">Nigeria Data Protection Act</span>
              </div>
              <div className="p-4 rounded-xl bg-[#F7F9F8] border border-slate-200">
                <div className="text-xs font-bold text-[#093824] uppercase tracking-wider">BACKUPS</div>
                <div className="text-2xl font-bold font-display text-[#0B1F17] mt-1">Daily</div>
                <span className="text-[11px] text-slate-500 block mt-0.5">Encrypted offsite storage</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Layers, CheckCircle2, ShieldCheck } from 'lucide-react';

export const WhyNeotroSection: React.FC = () => {
  return (
    <section id="why-neotro" className="w-full bg-[#F7F9F8] border-b border-[#E5E7EB] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        
        {/* Eyebrow and Heading with standard pill badge */}
        <div className="mb-12">
          <span className="bg-[#DCFCE7] text-[#093824] text-xs font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-md inline-block mb-4 border border-[#BBF7D0]">
            WHY NEOTRO
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-tight tracking-tight text-[#0B1F17] font-display">
            Why Organizations Choose Neotro
          </h2>
          <p className="text-[#4B5563] text-base max-w-[620px] mt-3">
            We replace rigid, one-size-fits-all software with custom platforms built around how your organization actually operates.
          </p>
        </div>

        {/* 3-Column Differentiated Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Built Around Your Workflows */}
          <div className="bg-white border border-[#D1D5DB] rounded-xl p-8 hover:border-[#059669] hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#DCFCE7] text-[#093824] flex items-center justify-center mb-6">
                <Layers className="w-6 h-6 text-[#059669]" />
              </div>
              <h3 className="text-xl font-bold text-[#0B1F17] mb-3 font-display">
                Built Around Your Workflows
              </h3>
              <p className="text-sm leading-relaxed text-[#4B5563]">
                Whether you run a growing business, an enterprise, or an institution, we tailor every platform to fit your exact daily operations, local requirements, and long-term goals.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 mt-6 text-xs font-semibold text-[#093824]">
              Tailored to Any Industry
            </div>
          </div>

          {/* Card 2: Reliable Automation & Accuracy */}
          <div className="bg-white border border-[#D1D5DB] rounded-xl p-8 hover:border-[#059669] hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#DCFCE7] text-[#093824] flex items-center justify-center mb-6">
                <CheckCircle2 className="w-6 h-6 text-[#059669]" />
              </div>
              <h3 className="text-xl font-bold text-[#0B1F17] mb-3 font-display">
                Reliable Automation &amp; Accuracy
              </h3>
              <p className="text-sm leading-relaxed text-[#4B5563]">
                Eliminate repetitive manual work and human error. Our systems automate your core processes—from data tracking and reporting to billing and record management—with complete precision.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 mt-6 text-xs font-semibold text-[#093824]">
              Zero Manual Errors
            </div>
          </div>

          {/* Card 3: Fast, Reliable Support */}
          <div className="bg-white border border-[#D1D5DB] rounded-xl p-8 hover:border-[#059669] hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#DCFCE7] text-[#093824] flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-[#059669]" />
              </div>
              <h3 className="text-xl font-bold text-[#0B1F17] mb-3 font-display">
                Fast, Reliable Support
              </h3>
              <p className="text-sm leading-relaxed text-[#4B5563]">
                Get direct help from our support team within 4 business hours, backed by automated daily backups and continuous security updates to keep your operations running smoothly.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 mt-6 text-xs font-semibold text-[#093824]">
              4-Hour Business Response
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { Star } from 'lucide-react';
import { DEFAULT_PARTNERS, type PartnerItem } from '../data/partnersData';

interface ProvenAtScaleSectionProps {
  partners?: PartnerItem[];
}

export const ProvenAtScaleSection: React.FC<ProvenAtScaleSectionProps> = ({
  partners = DEFAULT_PARTNERS
}) => {
  return (
    <section id="partners" className="w-full bg-[#F7F9F8] py-16 sm:py-24 border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <span className="bg-[#DCFCE7] text-[#093824] text-xs font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-md inline-block mb-4 border border-[#BBF7D0]">
            PROVEN AT SCALE
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#0B1F17]">
            Trusted by Growing Businesses &amp; Organizations
          </h2>
          <p className="text-[#4B5563] text-sm sm:text-base max-w-xl mx-auto mt-2">
            Powering over 25,000 automated records, reports, and daily workflows across our client network.
          </p>
        </div>

        {/* Hard Impact Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white border border-slate-200 rounded-xl p-5 text-center shadow-xs">
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-[#093824]">25,000+</div>
            <div className="text-xs text-[#4B5563] mt-1 font-semibold">Records &amp; Reports Processed</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5 text-center shadow-xs">
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-[#093824]">100%</div>
            <div className="text-xs text-[#4B5563] mt-1 font-semibold">Data Accuracy</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5 text-center shadow-xs">
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-[#093824]">&lt; 4 Hrs</div>
            <div className="text-xs text-[#4B5563] mt-1 font-semibold">Business-Hour Response</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5 text-center shadow-xs">
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-[#093824]">NDPA</div>
            <div className="text-xs text-[#4B5563] mt-1 font-semibold">Data Compliant</div>
          </div>
        </div>

        {/* High-Contrast Partner Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-12">
          {partners.map((partner, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E5E7EB] rounded-xl p-4 flex flex-col items-center text-center justify-between hover:border-[#093824] hover:shadow-sm transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-[#DCFCE7] flex items-center justify-center mb-2.5 border border-[#BBF7D0]">
                {partner.icon}
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0B1F17] leading-tight">{partner.name}</h4>
                <span className="text-[10px] text-slate-500 block mt-0.5">{partner.type}</span>
              </div>
              <span className="mt-2.5 px-2 py-0.5 rounded-full bg-slate-100 text-[9.5px] font-mono font-medium text-slate-600 border border-slate-200">
                {partner.tag}
              </span>
            </div>
          ))}
        </div>

        {/* Featured Institutional Testimonial Card */}
        <div className="bg-gradient-to-r from-[#093824] to-[#0D4A30] rounded-2xl p-8 sm:p-10 text-white shadow-md relative overflow-hidden">
          <div className="max-w-3xl">
            <div className="flex items-center gap-1 text-amber-400 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <blockquote className="text-lg sm:text-xl font-medium leading-relaxed mb-6 font-display">
              “Neotro's School Portal transformed our terminal result compilation from a 2-week manual ordeal into a 2-hour automated process with 100% computational accuracy. The parents appreciate the instant mobile access and transparent report cards.”
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#BBF7D0] text-[#093824] font-black text-sm flex items-center justify-center">
                AS
              </div>
              <div>
                <div className="font-bold text-sm text-white">Academic Director</div>
                <div className="text-xs text-emerald-300">Attwool Schools, Lagos</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

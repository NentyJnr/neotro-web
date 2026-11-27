import React from 'react';
import { ArrowRight, Mail, Phone, MapPin, Clock, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  institution: string;
  service: string;
  message: string;
  website_hp?: string;
}

interface ContactSectionProps {
  formData: ContactFormData;
  onChangeFormData: (data: ContactFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  submitError: string | null;
  formSubmitted: boolean;
  onResetForm: () => void;
  onOpenPrivacyModal: (type: 'privacy' | 'terms') => void;
  scrollToContactElement: (elementId: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  formData,
  onChangeFormData,
  onSubmit,
  isSubmitting,
  submitError,
  formSubmitted,
  onResetForm,
  onOpenPrivacyModal,
  scrollToContactElement
}) => {
  return (
    <section id="contact" className="w-full bg-[#F7F9F8] relative overflow-hidden border-t border-b border-[#E5E7EB] selection:bg-[#BBF7D0] selection:text-[#093824]">
      
      {/* Subtle Architectural Crosshairs Grid Pattern */}
      <div className="absolute inset-0 grid-crosshair-lines-light opacity-50 pointer-events-none" />

      {/* Soft Ambient Emerald Glow on the Left */}
      <div className="absolute -left-32 top-24 w-[520px] h-[520px] bg-[radial-gradient(circle,rgba(16,185,129,0.08)_0%,rgba(5,150,105,0.03)_40%,transparent_70%)] blur-3xl pointer-events-none" />

      {/* Subtle Warm Ambient Glow on the Right */}
      <div className="absolute -right-32 top-32 w-[480px] h-[480px] bg-[radial-gradient(circle,rgba(245,158,11,0.05)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      {/* Hero Banner Callout */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-14 text-center relative z-10">
        
        {/* Eyebrow Label */}
        <div className="inline-block text-[#B45309] bg-[#FEF3C7] border border-[#FDE68A] text-xs font-bold font-mono tracking-[0.2em] uppercase px-3.5 py-1.5 rounded-md mb-5 select-none shadow-xs">
          CONTACT NEOTRO
        </div>

        {/* Large Bold Headline */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-[#0B1F17] tracking-tight leading-[1.12] mb-6">
          Let's Talk About What You're Building
        </h2>

        {/* Focused Subtitle */}
        <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10 font-normal">
          Connect with Neotro for enterprise technology solutions, partnerships, careers, and regional delivery conversations across Africa.
        </p>

        {/* Action CTAs */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={() => scrollToContactElement('contact-form')}
            className="bg-[#093824] hover:bg-[#0D4A30] text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-lg transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <span>Send A Message</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>

          <button
            onClick={() => scrollToContactElement('direct-channels')}
            className="bg-white hover:bg-slate-50 text-[#0B1F17] border border-slate-300 font-semibold text-sm sm:text-base px-6 py-3.5 rounded-lg shadow-xs transition-all cursor-pointer active:scale-95"
          >
            Direct Channels
          </button>
        </div>

      </div>

      {/* Interactive Form & Direct Channels Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28 relative z-10 border-t border-[#E5E7EB] pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Direct Contact Details */}
          <div id="direct-channels" className="lg:col-span-5 space-y-6 scroll-mt-28">
            <div>
              <span className="text-xs font-bold text-[#059669] font-mono tracking-wider uppercase block mb-2">
                DIRECT CHANNELS
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#0B1F17] leading-tight mb-3">
                Connect with our team directly
              </h3>
              <p className="text-[#4B5563] text-sm leading-relaxed">
                Have an urgent project, partnership inquiry, or proposal request? Use our direct channels to connect with our leadership and client solutions team.
              </p>
            </div>

            {/* Verified Contact Details with Official Domain Email */}
            <div className="space-y-3.5 pt-2">
              
              {/* Email Card */}
              <a 
                href="mailto:info@neotroltd.com"
                className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 hover:border-[#093824]/40 hover:shadow-sm transition-all group block shadow-xs"
              >
                <div className="w-11 h-11 rounded-lg bg-[#DCFCE7] text-[#093824] flex items-center justify-center shrink-0 border border-[#BBF7D0] group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider block">Official Inquiries</span>
                  <span className="text-[#093824] group-hover:underline transition-colors font-bold text-base">info@neotroltd.com</span>
                </div>
              </a>

              {/* Phone / WhatsApp Card */}
              <a 
                href="tel:+2348030930762"
                className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 hover:border-[#093824]/40 hover:shadow-sm transition-all group block shadow-xs"
              >
                <div className="w-11 h-11 rounded-lg bg-[#DCFCE7] text-[#093824] flex items-center justify-center shrink-0 border border-[#BBF7D0] group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider block">Direct Line &amp; WhatsApp</span>
                  <span className="text-[#093824] group-hover:underline transition-colors font-bold text-base">+234 803 093 0762</span>
                </div>
              </a>

              {/* Physical Headquarters */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="w-11 h-11 rounded-lg bg-[#DCFCE7] text-[#093824] flex items-center justify-center shrink-0 border border-[#BBF7D0]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider block">Office Address</span>
                  <span className="text-slate-800 font-medium text-sm">18 Kokoro Street, Awoyaya, Ajah, Lagos, Nigeria</span>
                </div>
              </div>

            </div>

            {/* SLA Response Guarantee Box */}
            <div className="p-4 rounded-xl bg-white border border-emerald-200 text-xs text-slate-600 flex items-center gap-3 shadow-xs">
              <Clock className="w-5 h-5 text-[#059669] shrink-0" />
              <span><strong className="text-[#0B1F17] font-semibold">Fast Response Guarantee:</strong> All business inquiries and demo requests are reviewed within 4 business hours.</span>
            </div>
          </div>

          {/* Right Column: Send A Message Interactive Form */}
          <div id="contact-form" className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-7 sm:p-10 shadow-md scroll-mt-28">
            {formSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#DCFCE7] border border-[#BBF7D0] flex items-center justify-center mx-auto mb-4 text-[#059669]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B1F17] mb-2 font-display">Inquiry Received</h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed mb-6">
                  Thank you, <strong className="text-[#093824]">{formData.name}</strong>. We have received your message, and a member of our team will reach out via email or WhatsApp within 4 business hours.
                </p>
                <button
                  type="button"
                  onClick={onResetForm}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#093824] hover:bg-[#0D4A30] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  Send Another Inquiry &rarr;
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                {/* Honeypot field (hidden from humans, detects automated bots) */}
                <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                  <input
                    type="text"
                    name="website_hp"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website_hp || ''}
                    onChange={(e) => onChangeFormData({ ...formData, website_hp: e.target.value })}
                  />
                </div>

                <div className="border-b border-slate-200 pb-3 mb-2">
                  <h4 className="text-lg font-bold text-[#0B1F17] font-display">Send A Message</h4>
                  <p className="text-xs text-slate-500">Fill out your requirements below to initiate custom software scoping or a platform demo.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0B1F17] mb-1.5 uppercase tracking-wider">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => onChangeFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Dr. Emmanuel Okafor"
                      className="w-full px-4 py-3 rounded-lg bg-[#F7F9F8] border border-slate-300 text-[#0B1F17] text-sm focus:border-[#093824] focus:outline-none transition-colors placeholder:text-slate-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0B1F17] mb-1.5 uppercase tracking-wider">
                      Official Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => onChangeFormData({ ...formData, email: e.target.value })}
                      placeholder="name@institution.com"
                      className="w-full px-4 py-3 rounded-lg bg-[#F7F9F8] border border-slate-300 text-[#0B1F17] text-sm focus:border-[#093824] focus:outline-none transition-colors placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0B1F17] mb-1.5 uppercase tracking-wider">
                      Phone / WhatsApp <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => onChangeFormData({ ...formData, phone: e.target.value })}
                      placeholder="+234 800 000 0000"
                      className="w-full px-4 py-3 rounded-lg bg-[#F7F9F8] border border-slate-300 text-[#0B1F17] text-sm focus:border-[#093824] focus:outline-none transition-colors placeholder:text-slate-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0B1F17] mb-1.5 uppercase tracking-wider">
                      Institution / Company <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.institution}
                      onChange={(e) => onChangeFormData({ ...formData, institution: e.target.value })}
                      placeholder="School or Company Name"
                      className="w-full px-4 py-3 rounded-lg bg-[#F7F9F8] border border-slate-300 text-[#0B1F17] text-sm focus:border-[#093824] focus:outline-none transition-colors placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B1F17] mb-1.5 uppercase tracking-wider">
                    What would you like to build? / Project Requirements <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => onChangeFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you want to build or your project requirements (e.g. school portal, biometric attendance, custom takeoff system, or workflow software)..."
                    className="w-full px-4 py-3 rounded-lg bg-[#F7F9F8] border border-slate-300 text-[#0B1F17] text-sm focus:border-[#093824] focus:outline-none transition-colors resize-none placeholder:text-slate-400"
                  />
                </div>

                <p className="text-[11px] text-slate-500 leading-normal">
                  By submitting, you agree to our{' '}
                  <button 
                    type="button" 
                    onClick={() => onOpenPrivacyModal('privacy')} 
                    className="text-[#093824] underline font-medium hover:text-[#059669] cursor-pointer"
                  >
                    Privacy Policy
                  </button>{' '}
                  in accordance with the Nigeria Data Protection Act (NDPA 2023).
                </p>

                {submitError && (
                  <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold block mb-0.5">Unable to send message:</strong>
                      <span>{submitError}</span>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-lg bg-[#093824] hover:bg-[#0D4A30] disabled:bg-[#093824]/75 disabled:cursor-not-allowed text-white font-bold text-sm transition-all shadow-md hover:shadow-lg cursor-pointer inline-flex items-center justify-center gap-2 active:scale-98"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Submit</span>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { NeotroLogo } from './NeotroLogo';
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  FileText,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Printer,
  ChevronRight,
  ExternalLink,
  Building,
  UserCheck,
  AlertCircle,
  Clock,
  Globe2,
  Database,
  ArrowUp
} from 'lucide-react';

interface DataProtectionPolicyPageProps {
  onBack: () => void;
}

export const DataProtectionPolicyPage: React.FC<DataProtectionPolicyPageProps> = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState<string>('about-neotro');
  const [hasAgreed, setHasAgreed] = useState<boolean>(false);

  const sections = [
    { id: 'about-neotro', label: 'About Neotro' },
    { id: 'introduction', label: 'Introduction' },
    { id: 'scope-and-consent', label: 'Scope and Consent' },
    { id: 'collection-of-personal-information', label: 'Collection of Personal Information' },
    { id: 'how-we-collect-personal-information', label: 'How We Collect Personal Information' },
    { id: 'how-we-use-collected-information', label: 'How We Use Collected Information' },
    { id: 'protection-and-storage', label: 'Protection and Storage' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'sharing-personal-information', label: 'Sharing Personal Information' },
    { id: 'cross-border-transfers', label: 'Cross Border Transfers' },
    { id: 'customer-data-protection-rights', label: 'Customer Data Protection Rights' },
    { id: 'cookies', label: 'Cookies & Local Storage' },
    { id: 'privacy-policies-of-other-websites', label: 'Privacy Policies of Other Websites' },
    { id: 'customer-consent', label: 'Customer Consent & Minors' },
    { id: 'changes-to-privacy-policy', label: 'Changes to Privacy Policy' },
    { id: 'contact-us', label: 'Contact Us / DPO' },
    { id: 'declaration', label: 'Declaration' }
  ];

  // Scroll spy to highlight active TOC item
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSectionId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F7F9F8] text-[#0B1F17] font-sans antialiased selection:bg-[#BBF7D0] selection:text-[#093824]">
      
      {/* ========================================================================= */}
      {/* 1. STICKY TOP NAVIGATION BAR WITH BACK BUTTON */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#EAECEF] w-full shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo & Back Action */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#093824]/5 hover:bg-[#093824]/10 text-[#093824] font-semibold text-xs sm:text-sm border border-[#093824]/15 transition-all cursor-pointer group shadow-2xs"
              aria-label="Return to website"
            >
              <ArrowLeft className="w-4 h-4 text-[#059669] group-hover:-translate-x-1 transition-transform" />
              <span>Back to Website</span>
            </button>

            <div className="h-6 w-px bg-slate-200 hidden sm:block" />

            {/* Brand Logo */}
            <div 
              onClick={onBack} 
              className="cursor-pointer focus:outline-none flex items-center"
              title="Return to Neotro Homepage"
            >
              <NeotroLogo size="sm" variant="green" />
            </div>
          </div>

          {/* Right Header Badges & Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-[11px] font-mono font-medium text-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
              <span>NDPA 2023 STATUTORY COMPLIANCE</span>
            </div>

            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
              title="Print policy"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Policy</span>
            </button>

            <a
              href="mailto:info@neotroltd.com"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#093824] hover:bg-[#0D4A30] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-300" />
              <span className="hidden sm:inline">Contact DPO</span>
              <span className="sm:hidden">DPO</span>
            </a>
          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION & KEY HIGHLIGHTS */}
      {/* ========================================================================= */}
      <section className="bg-gradient-to-b from-[#093824] to-[#0D4A30] text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.2)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 space-y-8">
          
          {/* Breadcrumb & Subtitle Tag */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-emerald-200 font-mono tracking-wider uppercase">
            <button onClick={onBack} className="hover:text-white transition-colors cursor-pointer">
              Company
            </button>
            <ChevronRight className="w-3 h-3 text-emerald-400" />
            <span className="text-emerald-300">Compliance • Privacy • Trust</span>
            <ChevronRight className="w-3 h-3 text-emerald-400" />
            <span className="text-white font-bold">Data Protection Policy</span>
          </div>

          {/* Hero Titles */}
          <div className="space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>NDPA 2023 Statutory Governance</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-white">
              Data Protection &amp; Privacy Policy
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-emerald-100/90 leading-relaxed font-normal">
              Your privacy matters to us. This policy explains how Neotro Ltd collects, uses, stores, protects, and processes personal information when you interact with our products, services, client portals, and digital platforms.
            </p>
          </div>

          {/* Quick CTA Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => scrollToSectionId('about-neotro')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#059669] hover:bg-[#10B981] text-white text-xs sm:text-sm font-semibold transition-all shadow-md cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Read Policy</span>
            </button>

            <a
              href="mailto:info@neotroltd.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold border border-white/20 transition-all cursor-pointer backdrop-blur-xs"
            >
              <Mail className="w-4 h-4 text-emerald-300" />
              <span>Contact Our Data Protection Officer</span>
            </a>
          </div>

          {/* 4 Summary Cards (Exact from User Requirements) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
            
            {/* Card 1 */}
            <div className="bg-[#062618]/80 border border-emerald-800/60 rounded-2xl p-5 backdrop-blur-xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Database className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white font-display">
                Information We Collect
              </h4>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                Personal and institutional information collected through our products, services, portals, and website.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#062618]/80 border border-emerald-800/60 rounded-2xl p-5 backdrop-blur-xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Lock className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white font-display">
                How We Use Your Data
              </h4>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                To provide secure services, improve customer experience, process transactions, and meet legal obligations.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#062618]/80 border border-emerald-800/60 rounded-2xl p-5 backdrop-blur-xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <UserCheck className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white font-display">
                Your Rights
              </h4>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                Understand your rights regarding access, correction, portability, restriction, and deletion of your personal data.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-[#062618]/80 border border-emerald-800/60 rounded-2xl p-5 backdrop-blur-xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Mail className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white font-display">
                DPO Contact
              </h4>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                Reach our Data Protection Officer directly with questions, requests, or statutory rights notices.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. MAIN CONTENT: 2-COLUMN LAYOUT (TOC SIDEBAR + POLICY SECTIONS) */}
      {/* ========================================================================= */}
      <div id="policy-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* ----------------------------------------------------------------------- */}
          {/* Left Sidebar: "On This Page" Table of Contents (Sticky) */}
          {/* ----------------------------------------------------------------------- */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <span className="text-xs font-bold font-mono tracking-wider text-[#059669] uppercase flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  On This Page
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {sections.length} Sections
                </span>
              </div>

              <nav className="space-y-1 max-h-[70vh] overflow-y-auto pr-1 text-xs">
                {sections.map((section, idx) => {
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSectionId(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                        isActive
                          ? 'bg-[#093824] text-white font-bold shadow-xs'
                          : 'text-slate-600 hover:text-[#093824] hover:bg-emerald-50/60 font-medium'
                      }`}
                    >
                      <span className={`text-[10px] font-mono shrink-0 ${isActive ? 'text-emerald-300' : 'text-slate-400'}`}>
                        {String(idx + 1).padStart(2, '0')}.
                      </span>
                      <span className="truncate">{section.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Quick Contact Box in Sidebar */}
              <div className="mt-6 pt-5 border-t border-slate-100 space-y-3">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block font-mono">
                  DPO Office Notice
                </span>
                <div className="text-[11px] text-slate-600 leading-relaxed bg-[#F7F9F8] p-3 rounded-xl border border-slate-200/60 space-y-1.5">
                  <div className="font-semibold text-[#093824]">Statutory Resolution Window</div>
                  <div>Subject Access Requests (SAR) are processed within 2 to 4 working weeks.</div>
                  <a href="mailto:info@neotroltd.com" className="text-[#059669] font-bold hover:underline block pt-1">
                    info@neotroltd.com →
                  </a>
                </div>
              </div>

            </div>

            {/* Back to Website Button in Sidebar */}
            <button
              onClick={onBack}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-slate-50 text-[#093824] font-bold text-xs border border-slate-200 shadow-2xs transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#059669]" />
              <span>Return to Main Website</span>
            </button>

          </aside>

          {/* ----------------------------------------------------------------------- */}
          {/* Right Column: Full Comprehensive Policy Body */}
          {/* ----------------------------------------------------------------------- */}
          <main className="lg:col-span-8 space-y-12 text-slate-700 leading-relaxed text-sm sm:text-[15px]">

            {/* 1. About Neotro */}
            <article id="about-neotro" className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#059669] uppercase tracking-wider">
                <Building className="w-4 h-4" />
                <span>Section 01</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F17] font-display">
                About Neotro
              </h2>
              <p>
                <strong>Neotro Ltd</strong> is an Information Systems and Technology organization with a visible footprint in the ICT industry across Nigeria, the West Africa sub-region, and key countries in the rest of Africa. Over the years, the organization has repeatedly succeeded in delivering enterprise IT systems and turnkey portal solutions to both public and private sectors within its strategic focus areas which include <strong>Education (Neotro School Portal), Construction Estimation &amp; BOQ Takeoff (Neoppe QS), AI Assessment Engines (Lecturra), Attendance/RFID Biometric Tracking, Payments, and Collections</strong> inter alia.
              </p>
              <p>
                This privacy policy will explain how our organization uses the personal data we collect from our customers, institutional clients, educators, students, parents, and related commercial partners when you use our website or subscribe to use any of our enterprise products and turnkey services.
              </p>
            </article>

            {/* 2. Introduction */}
            <article id="introduction" className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#059669] uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Section 02</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F17] font-display">
                Introduction
              </h2>
              <p>
                Neotro conducts business in a responsible and sustainable manner and ensures customer information is securely collected, processed, and stored strictly based on legitimate business requirements. In furtherance to this and in strict compliance with industry regulations — including the <strong>Nigeria Data Protection Act (NDPA 2023)</strong> and enterprise data security principles — Neotro has formulated appropriate documentation, which includes this comprehensive privacy policy.
              </p>
              <p>
                Neotro, therefore, provides notice about this policy, applicable operating procedures, and identifies the purposes for which personal information is collected, used, processed, disclosed, retained, and safely disposed of.
              </p>
              <div className="p-4 rounded-xl bg-emerald-50/70 border-l-4 border-[#059669] text-xs text-emerald-950 space-y-1">
                <strong className="block font-semibold">Definition of Personal Data:</strong>
                Throughout this Privacy Policy, we use the term <em>"personal information or data"</em> to describe information that can be associated with a specific individual and can be used to identify that person. We do not consider personal information to include information that has been made anonymous so that it does not identify a specific user.
              </div>
            </article>

            {/* 3. Scope and Consent */}
            <article id="scope-and-consent" className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#059669] uppercase tracking-wider">
                <UserCheck className="w-4 h-4" />
                <span>Section 03</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F17] font-display">
                Scope and Consent
              </h2>
              <p>
                As a Customer or authorized representative of an institution, you accept this Privacy Policy when you sign up for, access, or use our products, services, content, features, technologies, or functions offered on our website and all related sites, applications, and services (collectively referred to as <strong>"Neotro Services"</strong>).
              </p>
              <p>
                This Privacy Policy is intended to govern the use of Neotro Services by users (including, without limitation, those who use these Neotro Services in the daily course of their trade, academic practice, or institutional administration) unless otherwise agreed through formal contract. Users reserve the right to exercise their data protection rights as listed under the Customer Data Protection Rights section.
              </p>
            </article>

            {/* 4. Collection of Personal Information */}
            <article id="collection-of-personal-information" className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#059669] uppercase tracking-wider">
                <Database className="w-4 h-4" />
                <span>Section 04</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F17] font-display">
                Collection of Personal Information
              </h2>
              <p>
                We collect Personally Identifiable Information (PII), otherwise known as Personal Information or Personal Data. They include:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm pt-1">
                {[
                  'Full Legal Name and Title',
                  'Institutional / Official Email Address',
                  'Telephone / WhatsApp Contact Numbers',
                  'Institutional Contact Address & Physical Location',
                  'Student, Parent, & Staff Registry Identifiers',
                  'Device Identifiers & Browser Fingerprints',
                  'IP Addresses & Network Telemetry Data',
                  'Billing, Invoice & Settlement References'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                    <span className="font-medium text-slate-800">{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            {/* 5. How We Collect Personal Information */}
            <article id="how-we-collect-personal-information" className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#059669] uppercase tracking-wider">
                <Globe2 className="w-4 h-4" />
                <span>Section 05</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F17] font-display">
                How We Collect Personal Information
              </h2>
              <p>
                Customers' data is collected electronically and manually when they visit our website and register to use any of our services:
              </p>
              <div className="space-y-3 pt-1">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <h4 className="text-xs font-bold font-mono text-[#093824] uppercase">1. Electronic Channels</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Collected electronically with exchanges between your system (Computer, Server, Mobile Device) or service provider's system and our secure cloud infrastructure during web portal browsing, demo scheduling, and API interactions.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <h4 className="text-xs font-bold font-mono text-[#093824] uppercase">2. Manual &amp; Physical Forms</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Collected manually when customers complete our product onboarding forms, service level agreements, or when visitors visit our physical offices for inquiries and consultative business relationships.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <h4 className="text-xs font-bold font-mono text-[#093824] uppercase">3. Customer Support &amp; Stakeholder Touchpoints</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Collected through contact with our Customer Support interfaces — email, ticketing portal, phone calls, social media, surveys, training workshops, and corporate outreach events.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <h4 className="text-xs font-bold font-mono text-[#093824] uppercase">4. Verified Third Parties</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    We may also obtain information about you from trusted third parties such as institutional sponsors, authorized verification services, and credit reference bureaus where permitted by law.
                  </p>
                </div>
              </div>
            </article>

            {/* 6. How We Use Collected Information */}
            <article id="how-we-use-collected-information" className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#059669] uppercase tracking-wider">
                <Lock className="w-4 h-4" />
                <span>Section 06</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F17] font-display">
                How We Use Collected Information
              </h2>
              <p>
                We collect personal information to provide users of our services with a secure, smooth, efficient, and customized experience. Furthermore, the information collected may also be used to:
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm pt-1">
                {[
                  'Provide Neotro Services, custom portal operations, and responsive institutional customer support;',
                  'Process academic, commercial, and financial transactions and send real-time notices about your transactions;',
                  'Verify your identity, including during account creation, role provisioning, and password reset processes;',
                  'Resolve disputes, collect fees, reconcile payments, and troubleshoot operational problems;',
                  'Manage risk, or detect, prevent, and/or remediate fraud or other potentially prohibited or illegal activities;',
                  'Detect, prevent or remediate violations of company policies or applicable Master Services Agreements;',
                  'Improve Services by customizing your user experience and optimizing software layout and responsiveness;',
                  'Manage, benchmark, and protect our information technology and cloud infrastructure;',
                  'Provide targeted service update notices, regulatory advisories, and promotional offers based on communication preferences;',
                  'Contact you via phone, SMS, or email as necessary to service your institutional account or enforce our policies.'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#059669] shrink-0 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            {/* 7. Protection and Storage of Personal Information */}
            <article id="protection-and-storage" className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#059669] uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Section 07</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F17] font-display">
                Protection and Storage of Personal Information
              </h2>
              <p>
                We store and process your personal information on our secure enterprise infrastructure in <strong>Lagos, Nigeria</strong> and certified cloud data centers. We protect your information using rigorous physical, technical, and administrative security measures to mitigate the risks of loss, misuse, unauthorized access, disclosure, and alteration.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="font-bold text-xs text-[#093824] uppercase font-mono">1. Encryption In-Transit &amp; At-Rest</div>
                  <p className="text-xs text-slate-600">
                    Mandatory TLS 1.3 protocol encryption for all data in transit, coupled with AES-256 database column encryption.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="font-bold text-xs text-[#093824] uppercase font-mono">2. Physical Facility Controls</div>
                  <p className="text-xs text-slate-600">
                    Multi-factor biometric access controls, 24/7 video surveillance, and environmental protection at all hosting nodes.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="font-bold text-xs text-[#093824] uppercase font-mono">3. Least-Privilege Authorization</div>
                  <p className="text-xs text-slate-600">
                    Strict Role-Based Access Control (RBAC) ensuring only vetted personnel access systems on a verified need-to-know basis.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="font-bold text-xs text-[#093824] uppercase font-mono">4. Enterprise Security Standards</div>
                  <p className="text-xs text-slate-600">
                    Operational alignment with international best practices for Information Security and IT Service Management.
                  </p>
                </div>
              </div>
            </article>

            {/* 8. Marketing */}
            <article id="marketing" className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#059669] uppercase tracking-wider">
                <Mail className="w-4 h-4" />
                <span>Section 08</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F17] font-display">
                Marketing
              </h2>
              <p>
                <strong>We do not sell or rent your personal information to third parties for their marketing purposes without your explicit consent.</strong> We may combine customer's information with information collected from other entities and use it to improve and personalize Neotro Services, content, and system communications.
              </p>
              <p>
                We have also included an opportunity for customers that had initially subscribed to receiving notifications or information about their activities in relation to the use of Neotro's service to unsubscribe or request to be removed from applicable promotional databases at any time.
              </p>
            </article>

            {/* 9. Sharing Personal Information */}
            <article id="sharing-personal-information" className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#059669] uppercase tracking-wider">
                <Globe2 className="w-4 h-4" />
                <span>Section 09</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F17] font-display">
                Sharing Personal Information
              </h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-[#0B1F17]">
                    Sharing with Other Authorized Users &amp; Institutional Clients
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    We work with institutional partners and merchants to enable integrated portal operations and payment settlements. In doing so, authorized parties may share identifiers to confirm enrollment, verify identity, or validate transactions.
                  </p>
                  <p className="text-xs text-slate-600 font-semibold bg-emerald-50/60 p-3 rounded-lg border border-emerald-100">
                    Neotro will never keep nor disclose your credit/debit card numbers or sensitive payment credentials to anyone, except as required by PCI-DSS compliance or lawful judicial subpoena.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <h3 className="text-base font-bold text-[#0B1F17]">
                    Sharing with Third Parties
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    We may share customers' personal information strictly under lawful criteria with:
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                    <li>• <strong>Neotro Group Entities:</strong> To provide joint content, infrastructure, and customer support.</li>
                    <li>• <strong>Partner Financial Institutions:</strong> To settle transactions and facilitate authorized disbursement.</li>
                    <li>• <strong>Credit &amp; Identity Bureaus:</strong> As required by statutory banking and AML/CFT regulations.</li>
                    <li>• <strong>Regulatory &amp; Law Enforcement Bodies:</strong> Pursuant to court orders, subpoenas, or statutory oversight.</li>
                    <li>• <strong>Contracted Service Providers:</strong> Specialized infrastructure partners under strict non-disclosure obligations.</li>
                  </ul>
                </div>
              </div>
            </article>

            {/* 10. Cross Border Transfers of Personal Information */}
            <article id="cross-border-transfers" className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#059669] uppercase tracking-wider">
                <Globe2 className="w-4 h-4" />
                <span>Section 10</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F17] font-display">
                Cross Border Transfers of Personal Information
              </h2>
              <p>
                Neotro is committed to adequately protecting customers' personal information regardless of where the data resides and to providing appropriate protection where such data is transferred across borders, including outside of Nigeria.
              </p>
              <p>
                We have further taken measures to ensure our relationships are with providers governed by data protection regulations with equivalent or higher adequacy standards than the <strong>Nigeria Data Protection Act (NDPA 2023)</strong>. Assessments are continuously undertaken to provide reasonable assurance of the safety and sovereignty of customer information.
              </p>
            </article>

            {/* 11. Customer Data Protection Rights (NDPA 2023) */}
            <article id="customer-data-protection-rights" className="bg-white rounded-2xl border-2 border-emerald-500/40 p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-emerald-100">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#059669] uppercase tracking-wider">
                  <UserCheck className="w-4 h-4" />
                  <span>Section 11 • Statutory NDPA Rights</span>
                </div>
                <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#093824]">
                  Response: 2 to 4 Working Weeks
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F17] font-display">
                Customer Data Protection Rights
              </h2>

              <p className="text-xs sm:text-sm text-slate-600">
                Our customers, staff, students, and institutional users have specific data protection rights under the Nigeria Data Protection Act (NDPA 2023) and are entitled to the following:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                
                {/* 1. Right to Access */}
                <div className="p-4 rounded-xl bg-[#F7F9F8] border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-xs text-[#093824]">
                    <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                    <span>Right to Access</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Customer has the right to request copies of their personal data. Neotro may charge a statutory fee if fulfilling the request requires substantial resource mobilization.
                  </p>
                </div>

                {/* 2. Right to Rectification */}
                <div className="p-4 rounded-xl bg-[#F7F9F8] border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-xs text-[#093824]">
                    <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                    <span>Right to Rectification</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Customers have the right to request that Neotro correct any information proven to be inaccurate, and to complete information they believe is incomplete.
                  </p>
                </div>

                {/* 3. Right to Erasure */}
                <div className="p-4 rounded-xl bg-[#F7F9F8] border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-xs text-[#093824]">
                    <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                    <span>Right to Erasure ("Forgotten")</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Customers have the right to request erasure of their personal data, subject to lawful retention conditions (such as tax compliance, AML requirements, or system integrity).
                  </p>
                </div>

                {/* 4. Right to Restrict Processing */}
                <div className="p-4 rounded-xl bg-[#F7F9F8] border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-xs text-[#093824]">
                    <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                    <span>Right to Restrict Processing</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Customers have the right to request that Neotro restrict the processing of their personal data under statutory grounds recognized by the NDPA.
                  </p>
                </div>

                {/* 5. Right to Object to Processing */}
                <div className="p-4 rounded-xl bg-[#F7F9F8] border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-xs text-[#093824]">
                    <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                    <span>Right to Object to Processing</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Customers have the right to object to our company's processing of personal data for direct marketing, automated profiling, or legitimate interest grounds.
                  </p>
                </div>

                {/* 6. Right to Data Portability */}
                <div className="p-4 rounded-xl bg-[#F7F9F8] border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-xs text-[#093824]">
                    <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                    <span>Right to Data Portability</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Customers have the right to request that Neotro transfer the collected structured data directly to another designated organization or to themselves.
                  </p>
                </div>

              </div>

              {/* Handling Window Box */}
              <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950 space-y-1.5">
                <p>
                  <strong>Statutory Response Timeline:</strong> Customer requests based on any of the rights above shall be processed and handled between <strong>2 to 4 working weeks</strong>.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-1 font-mono text-[11px]">
                  <span>Email: <a href="mailto:info@neotroltd.com" className="font-bold underline text-[#093824]">info@neotroltd.com</a></span>
                  <span>Call: <a href="tel:+2348030930762" className="font-bold underline text-[#093824]">+234 803 093 0762</a></span>
                </div>
              </div>
            </article>

            {/* 12. The Use of Cookies and Similar Technologies */}
            <article id="cookies" className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#059669] uppercase tracking-wider">
                <Database className="w-4 h-4" />
                <span>Section 12</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F17] font-display">
                The Use of Cookies and Similar Technologies
              </h2>
              <p>
                When Customers access our websites or use Neotro Services, we may place small data files on your computer or other devices. These data files may be cookies, pixel tags, or local storage tokens provided by your browser or associated applications (collectively referred to as <strong>"Cookies"</strong>).
              </p>
              <p>
                These technologies are used to recognize users as customers, customize Neotro Services, content, and advertising, measure promotional effectiveness, help ensure account security is not compromised, mitigate risk, and prevent fraud across Neotro Services and related portal sites.
              </p>
              <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <em>Users can freely decline our non-essential Cookies if the web browser permits. However, declining essential security Cookies may interfere with your authentication and operation on our portals.</em>
              </p>
            </article>

            {/* 13. Privacy Policies of Other Websites */}
            <article id="privacy-policies-of-other-websites" className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#059669] uppercase tracking-wider">
                <ExternalLink className="w-4 h-4" />
                <span>Section 13</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F17] font-display">
                Privacy Policies of Other Websites
              </h2>
              <p>
                This privacy policy applies exclusively to Neotro Ltd and Neotro-managed platforms, and not to any third-party brands even if referenced on our website. Neither does it apply to independent merchants, vendors, or external partner sites.
              </p>
              <p>
                If customers open or access third-party integrations outside the direct Neotro ecosystem, these services are governed by their respective privacy policies. Neotro is not responsible for the content or information practices of such independent third parties.
              </p>
            </article>

            {/* 14. Customer Consent & Minors */}
            <article id="customer-consent" className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#059669] uppercase tracking-wider">
                <UserCheck className="w-4 h-4" />
                <span>Section 14</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F17] font-display">
                Customer Consent &amp; Protection of Minors
              </h2>
              <p>
                Your consent to personal data collection and processing may be revoked at any time by notifying us via our contact channels or through your institutional administrator.
              </p>
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-1.5">
                <div className="flex items-center gap-2 font-bold">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Users Below Age 16:</span>
                </div>
                <p>
                  For users below the age of 16 (including primary and secondary school students using the Neotro School Portal), consent must be provided by the educational institution acting <em>in loco parentis</em> under statutory authority or directly by the holder of parental responsibility for the child.
                </p>
              </div>
              <p className="text-xs text-slate-500">
                Please note: in case you choose not to provide consent or withdraw consent at any given point, Neotro may be unable to provision certain cloud services, portals, or features to your institution.
              </p>
            </article>

            {/* 15. Changes to Our Privacy Policy */}
            <article id="changes-to-privacy-policy" className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#059669] uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>Section 15</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F17] font-display">
                Changes to Our Privacy Policy
              </h2>
              <p>
                We review our privacy policy periodically and whenever there is any substantial change to business operations or statutory regulatory requirements. At the minimum, we review this policy <strong>annually</strong> and communicate updates through official channels such as our website, client administrative newsletters, and institutional stakeholder portals.
              </p>
              <p className="text-xs text-slate-500 font-mono">
                Current Revision: 2026.11 • Effective Date: November 12, 2026.
              </p>
            </article>

            {/* 16. How to Contact Us / DPO Office */}
            <article id="contact-us" className="bg-white rounded-2xl border-2 border-[#093824]/20 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#059669] uppercase tracking-wider">
                <Mail className="w-4 h-4" />
                <span>Section 16</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F17] font-display">
                How to Contact Us &amp; Our DPO
              </h2>
              <p>
                Customers and data subjects who have concerns or questions regarding this Privacy Policy, or who wish to exercise their statutory data protection rights under the NDPA 2023, can contact our Data Protection Officer through the following official channels:
              </p>

              {/* Contact Card */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                
                <div className="bg-[#093824] text-white p-5 rounded-2xl space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-300">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-mono uppercase tracking-wider text-emerald-300 font-bold">Email Inquiries &amp; DPO</div>
                  <a href="mailto:info@neotroltd.com" className="text-sm font-semibold hover:underline block truncate">
                    info@neotroltd.com
                  </a>
                </div>

                <div className="bg-[#093824] text-white p-5 rounded-2xl space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-300">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-mono uppercase tracking-wider text-emerald-300 font-bold">Direct Phone</div>
                  <a href="tel:+2348030930762" className="text-sm font-semibold hover:underline block">
                    +234 803 093 0762
                  </a>
                  <div className="text-xs text-emerald-200/80">
                    0800NEOTRO Contact Desk
                  </div>
                </div>

                <div className="bg-[#093824] text-white p-5 rounded-2xl space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-300">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-mono uppercase tracking-wider text-emerald-300 font-bold">Lagos Office</div>
                  <div className="text-xs leading-relaxed text-emerald-100">
                    Neotro Limited, 18 Kokoro Street, Awoyaya, Ajah, Lekki Corridor, Lagos, Nigeria.
                  </div>
                </div>

              </div>
            </article>

            {/* 17. Declaration */}
            <article id="declaration" className="bg-gradient-to-br from-[#062618] to-[#093824] text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-300 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Section 17</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                Declaration
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                By accessing, using, or registering for Neotro Services, you declare that you have read and understood all the terms, safeguards, and statutory rights stipulated in this Data Protection and Privacy Policy Notice.
              </p>

              <div className="pt-2">
                <label className="flex items-start gap-3 p-4 rounded-xl bg-white/10 border border-white/20 cursor-pointer hover:bg-white/15 transition-colors">
                  <input
                    type="checkbox"
                    checked={hasAgreed}
                    onChange={(e) => setHasAgreed(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-[#059669] focus:ring-emerald-400 bg-white/20 border-white/30 cursor-pointer"
                  />
                  <span className="text-xs sm:text-sm text-white font-medium leading-relaxed">
                    I have read and acknowledged the terms and conditions within this Notice regarding the processing of personal data for the specified enterprise purposes.
                  </span>
                </label>
              </div>

              {hasAgreed && (
                <div className="p-3 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Acknowledgment recorded for this browsing session. Thank you for partnering with Neotro Ltd.</span>
                </div>
              )}
            </article>

            {/* Bottom Actions Banner */}
            <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={onBack}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#093824] hover:bg-[#0D4A30] text-white font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer group"
              >
                <ArrowLeft className="w-4 h-4 text-emerald-300 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Main Website</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={scrollToTop}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-all cursor-pointer"
                >
                  <ArrowUp className="w-4 h-4 text-[#059669]" />
                  <span>Back to Top</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-slate-500" />
                  <span>Print Document</span>
                </button>
              </div>
            </div>

          </main>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. DEDICATED FOOTER BAR FOR POLICY PAGE */}
      {/* ========================================================================= */}
      <footer className="bg-[#093824] text-white border-t border-[#0D4A30] py-8 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/80">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-lg px-2 py-1 inline-flex items-center">
              <NeotroLogo size="sm" variant="green" />
            </div>
            <span>&copy; {new Date().getFullYear()} Neotro Ltd. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button onClick={onBack} className="hover:text-white transition-colors cursor-pointer">
              Home
            </button>
            <span>•</span>
            <button onClick={() => scrollToSectionId('customer-data-protection-rights')} className="hover:text-white transition-colors cursor-pointer">
              NDPA Rights
            </button>
            <span>•</span>
            <a href="mailto:info@neotroltd.com" className="hover:text-white transition-colors">
              info@neotroltd.com
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
};

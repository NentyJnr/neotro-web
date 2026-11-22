import { useState, useEffect } from 'react';
import { AIBlocksCanvas } from './components/AIBlocksCanvas';
import { AdminModal } from './components/AdminModal';
import { NeotroLogo } from './components/NeotroLogo';
import { AfricaMotionMap } from './components/AfricaMotionMap';
import { DataProtectionPolicyPage } from './components/DataProtectionPolicyPage';
import { INITIAL_PROJECTS } from './data/initialData';
import type { Project } from './types';
import { 
  CheckCircle2, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  GraduationCap,
  ShieldCheck,
  X,
  Star,
  Clock,
  MessageSquare,
  Briefcase,
  HardHat,
  Globe,
  Loader2,
  AlertCircle
} from 'lucide-react';

export function App() {
  const [activeSection, setActiveSection] = useState<'top' | 'about' | 'sectors' | 'why-neotro' | 'partners' | 'contact'>('top');
  const [platformCategory, setPlatformCategory] = useState<'education' | 'construction' | 'websites'>('education');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState<'privacy' | 'terms' | null>(null);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);

  // Admin Project state
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('neotro_projects');
    if (saved) {
      try { return JSON.parse(saved); } catch { return INITIAL_PROJECTS; }
    }
    return INITIAL_PROJECTS;
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution: '',
    service: 'Custom Project Inquiry',
    message: ''
  });

  const navigationItems = [
    { id: 'about', label: 'About' },
    { id: 'sectors', label: 'Solutions' },
    { id: 'why-neotro', label: 'Why Us' },
    { id: 'partners', label: 'Partners' },
    { id: 'contact', label: 'Contact' }
  ];

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as any);
          }
        });
      },
      { threshold: 0.25 }
    );

    navigationItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Listen for direct URL navigation to /admin, /privacy-policy, /data-protection-policy, etc.
  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname.toLowerCase().replace(/\/+$/, '');
      const hash = window.location.hash.toLowerCase();

      // Admin route check
      if (path === '/admin' || hash === '#admin' || hash === '#/admin') {
        setAdminModalOpen(true);
      } else {
        setAdminModalOpen(false);
      }

      // Data protection policy route check
      if (
        path === '/data-protection-policy' ||
        path === '/privacy-policy' ||
        path === '/privacy' ||
        hash === '#data-protection-policy' ||
        hash === '#/data-protection-policy' ||
        hash === '#privacy-policy' ||
        hash === '#/privacy-policy'
      ) {
        setIsPrivacyPolicyOpen(true);
      } else {
        setIsPrivacyPolicyOpen(false);
      }
    };

    // Check on initial load
    handleRouteChange();

    // Listen for browser forward/back or hash changes
    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []);

  // Synchronize document title with route for optimal SEO and bookmarking
  useEffect(() => {
    if (isPrivacyPolicyOpen) {
      document.title = 'Data Protection & Privacy Policy — Neotro Ltd';
    } else {
      document.title = 'Neotro Ltd — Intelligent Software Systems & Digital Portals for Nigerian Institutions';
    }
  }, [isPrivacyPolicyOpen]);

  const handleOpenPrivacyPolicy = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsPrivacyPolicyOpen(true);
    window.history.pushState(null, '', '/data-protection-policy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToSite = () => {
    setIsPrivacyPolicyOpen(false);
    const path = window.location.pathname.toLowerCase().replace(/\/+$/, '');
    if (path === '/data-protection-policy' || path === '/privacy-policy' || path === '/privacy') {
      window.history.pushState(null, '', '/');
    } else if (window.location.hash.includes('privacy') || window.location.hash.includes('data-protection')) {
      window.history.pushState(null, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseAdminModal = () => {
    setAdminModalOpen(false);
    const path = window.location.pathname.toLowerCase().replace(/\/+$/, '');
    const hash = window.location.hash.toLowerCase();
    if (path === '/admin') {
      window.history.pushState(null, '', '/');
    } else if (hash === '#admin' || hash === '#/admin') {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  const scrollToSection = (id: string, preselectedService?: string) => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, service: preselectedService }));
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContactElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      if (elementId === 'contact-form') {
        const input = element.querySelector('input');
        if (input) setTimeout(() => (input as HTMLInputElement).focus(), 400);
      }
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        throw new Error('The /api/contact endpoint is not active or returned HTML. Please ensure the latest Vercel deployment with serverless functions has completed.');
      }

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to dispatch inquiry. Please email info@neotroltd.com directly.');
      }

      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: '', email: '', phone: '', institution: '', service: 'Custom Project Inquiry', message: '' });
      }, 6000);
    } catch (err: any) {
      setSubmitError(err.message || 'An error occurred while transmitting your inquiry. Please reach out to info@neotroltd.com.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem('neotro_projects', JSON.stringify(newProjects));
  };

  const partnersList = [
    {
      name: "Attwool Schools",
      subtitle: "Skills, Ethos & Excellence",
      type: "K-12 Educational Institution",
      logoUrl: "/logos/attwool-logo.png",
      tag: "School Portal & Results",
      icon: (
        <svg className="w-5 h-5 text-[#059669]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      )
    },
    {
      name: "Tosphy Geo-Spatial",
      subtitle: "Nigeria Limited",
      type: "Geospatial & Land Systems",
      logoUrl: "/logos/tosphy-logo.png",
      tag: "GIS & Surveying",
      icon: (
        <svg className="w-5 h-5 text-[#059669]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      )
    },
    {
      name: "EduFacts360",
      subtitle: "Global Education Academy",
      type: "Academy & Research",
      logoUrl: "/logos/edufacts-logo.png",
      tag: "Curriculum & Analytics",
      icon: (
        <svg className="w-5 h-5 text-[#093824]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      )
    },
    {
      name: "Dotmond School",
      subtitle: "Primary & Secondary",
      type: "Academic Institution",
      tag: "Tuition & Grading",
      icon: (
        <svg className="w-5 h-5 text-[#093824]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      )
    },
    {
      name: "BuildCore QS Partners",
      subtitle: "Quantity Surveying Consultants",
      type: "Construction Estimation",
      tag: "Neoppe Takeoff Partner",
      icon: (
        <svg className="w-5 h-5 text-[#059669]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18" />
          <path d="M5 21V7l8-4v18" />
          <path d="M19 21V11l-6-3" />
          <path d="M9 9h1" />
          <path d="M9 13h1" />
          <path d="M9 17h1" />
        </svg>
      )
    },
    {
      name: "CrownGate College",
      subtitle: "Secondary Academic Academy",
      type: "College Education",
      tag: "Result Compilations",
      icon: (
        <svg className="w-5 h-5 text-[#10B981]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
          <path d="M5 20h14" />
        </svg>
      )
    }
  ];

  if (isPrivacyPolicyOpen) {
    return (
      <div className="w-full bg-[#F7F9F8] text-[#0B1F17] font-sans relative selection:bg-[#BBF7D0] selection:text-[#093824] min-h-screen">
        <DataProtectionPolicyPage onBack={handleBackToSite} />
        <AdminModal
          isOpen={adminModalOpen}
          onClose={handleCloseAdminModal}
          projects={projects}
          onAddProject={(p) => handleSaveProjects([p, ...projects])}
          onUpdateProject={(p) => handleSaveProjects(projects.map(item => item.id === p.id ? p : item))}
          onDeleteProject={(id) => handleSaveProjects(projects.filter(item => item.id !== id))}
          onResetProjects={() => handleSaveProjects(INITIAL_PROJECTS)}
        />
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F7F9F8] text-[#0B1F17] font-sans relative selection:bg-[#BBF7D0] selection:text-[#093824] min-h-screen">
      
      {/* ========================================================================= */}
      {/* 1. STICKY TOP NAVIGATION BAR */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#EAECEF] w-full shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a 
            href="#top" 
            onClick={(e) => { e.preventDefault(); scrollToSection('top'); }} 
            className="flex items-center shrink-0 focus:outline-none"
          >
            <NeotroLogo size="md" variant="green" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`transition-colors py-1 cursor-pointer ${
                  activeSection === item.id 
                    ? 'text-[#093824] border-b-2 border-[#093824]' 
                    : 'text-[#4B5563] hover:text-[#093824]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action CTA: Talk To Our Team */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-white hover:bg-slate-50 text-[#0B1F17] font-semibold text-sm rounded-lg px-4 sm:px-5 py-2 sm:py-2.5 border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-sm transition-all inline-flex items-center justify-center cursor-pointer active:scale-95 whitespace-nowrap"
            >
              Talk To Our Team
            </button>
          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION (CONTAINED 3D DEPTH + INTERACTIVE LIVE PRODUCT SHOWCASE) */}
      {/* ========================================================================= */}
      <section id="top" className="w-full relative border-b border-[#E5E7EB] bg-[#F7F9F8] py-14 sm:py-20 lg:py-24 overflow-hidden">
        
        {/* Subtle Architectural Crosshair Lines */}
        <div className="absolute inset-0 grid-crosshair-lines-light opacity-50 pointer-events-none" />

        {/* 3D Motion Canvas: Confined Strictly to Right Hemisphere as subtle background depth */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none opacity-30">
          <AIBlocksCanvas colorTheme="light" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Column: Hero Copy & Actions */}
            <div className="lg:col-span-6 flex flex-col items-start">
              
              {/* Eyebrow Badge Pill */}
              <span className="bg-[#DCFCE7] text-[#093824] text-xs font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-md inline-block mb-4 border border-[#BBF7D0]">
                AI-EMPOWERED SOFTWARE &amp; DIGITAL INFRASTRUCTURE
              </span>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold font-display text-[#0B1F17] leading-[1.12] tracking-tight mb-5 uppercase">
                BUILDING INTELLIGENT SYSTEMS THAT MAKE WORK EFFORTLESS.
              </h1>

              {/* Subheadline */}
              <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed mb-8 max-w-[540px]">
                Neotro engineers purpose-built software platforms and custom business portals for schools, construction firms, and growing enterprises across Africa—turning complex daily operations into seamless digital workflows.
              </p>

              {/* CTA Button Row */}
              <div className="flex items-center gap-4 flex-wrap mb-10">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="bg-[#093824] hover:bg-[#0D4A30] text-white font-semibold text-base rounded-lg px-6 py-3.5 transition-all shadow-md inline-flex items-center gap-2 hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Book a Demo</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => scrollToSection('sectors')}
                  className="bg-white border border-[#D1D5DB] text-[#0B1F17] hover:bg-slate-50 font-semibold text-base rounded-lg px-6 py-3.5 transition-all shadow-xs cursor-pointer"
                >
                  Explore our Solutions
                </button>
              </div>

              {/* Credibility Chips Bar */}
              <div className="flex items-center gap-6 flex-wrap text-xs font-semibold text-slate-600 pt-2 border-t border-slate-200/80 w-full max-w-xl">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                  <span>99.9% Platform Availability</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                  <span>NDPA 2023 Aligned</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                  <span>Sub-4h Support SLA</span>
                </div>
              </div>

            </div>

            {/* Right Column: Pan-African Motion Map */}
            <div className="lg:col-span-6 w-full flex items-center justify-center">
              <AfricaMotionMap />
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. ABOUT NEOTRO LTD SECTION (MEASURABLE GUARANTEES & NDPA COMPLIANCE) */}
      {/* ========================================================================= */}
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
                  Engineering reliable software infrastructure for institutions.
                </h2>
                <p className="text-[#4B5563] text-base leading-relaxed mb-6">
                  Neotro Ltd designs and deploys robust, multi-tenant digital systems. We work closely with educational institutions, construction engineering partners, and enterprise clients to automate mission-critical operations with an audited 99.9% uptime SLA.
                </p>
                <div className="space-y-3.5">
                  <div className="flex items-start gap-3 text-sm font-semibold text-[#0B1F17]">
                    <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" />
                    <div>
                      <span>NDPA (Nigeria Data Protection Act 2023) Aligned</span>
                      <p className="text-xs text-[#6B7280] font-normal mt-0.5">Strict data sovereignty protocols, lawful processing criteria, and automated consent tracking.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-sm font-semibold text-[#0B1F17]">
                    <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" />
                    <div>
                      <span>Automated Daily Encrypted Offsite Backups</span>
                      <p className="text-xs text-[#6B7280] font-normal mt-0.5">Immutable snapshots with tested point-in-time recovery runbooks executed every 24 hours.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-sm font-semibold text-[#0B1F17]">
                    <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" />
                    <div>
                      <span>Granular Role-Based Access Control (RBAC)</span>
                      <p className="text-xs text-[#6B7280] font-normal mt-0.5">Scoped permissions isolating administrative, teacher, student, and finance roles.</p>
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
                  <h3 className="text-xl font-bold text-[#0B1F17]">Enterprise Security &amp; Compliance</h3>
                </div>
                <p className="text-sm text-[#4B5563] leading-relaxed mb-6">
                  Every portal and engine engineered by Neotro adheres to enterprise-grade data isolation, encrypted database partitioning, and verified audit logging for full accountability.
                </p>
              </div>

              {/* Concrete 4-Metric Grid */}
              <div className="grid grid-cols-2 gap-3.5 pt-2">
                <div className="p-4 rounded-xl bg-[#F7F9F8] border border-slate-200">
                  <div className="text-xs font-bold text-[#093824] uppercase tracking-wider">Uptime SLA</div>
                  <div className="text-2xl font-bold font-display text-[#0B1F17] mt-1">99.9%</div>
                  <span className="text-[11px] text-slate-500 block mt-0.5">Monitored 24/7/365</span>
                </div>
                <div className="p-4 rounded-xl bg-[#F7F9F8] border border-slate-200">
                  <div className="text-xs font-bold text-[#093824] uppercase tracking-wider">Support SLA</div>
                  <div className="text-2xl font-bold font-display text-[#0B1F17] mt-1">&lt; 4 Hours</div>
                  <span className="text-[11px] text-slate-500 block mt-0.5">Dedicated engineering channel</span>
                </div>
                <div className="p-4 rounded-xl bg-[#F7F9F8] border border-slate-200">
                  <div className="text-xs font-bold text-[#093824] uppercase tracking-wider">Data Standard</div>
                  <div className="text-2xl font-bold font-display text-[#0B1F17] mt-1">NDPA</div>
                  <span className="text-[11px] text-slate-500 block mt-0.5">Nigeria Data Protection Act</span>
                </div>
                <div className="p-4 rounded-xl bg-[#F7F9F8] border border-slate-200">
                  <div className="text-xs font-bold text-[#093824] uppercase tracking-wider">Backup Schedule</div>
                  <div className="text-2xl font-bold font-display text-[#0B1F17] mt-1">Daily</div>
                  <span className="text-[11px] text-slate-500 block mt-0.5">Encrypted offsite replication</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. UNIFIED SOLUTIONS SHOWCASE (CONSOLIDATED PRODUCT PORTFOLIO) */}
      {/* ========================================================================= */}
      <section id="sectors" className="w-full bg-[#F7F9F8] py-16 sm:py-24 border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="mb-12 text-left">
            <span className="bg-[#DCFCE7] text-[#093824] text-xs font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-md inline-block mb-4 border border-[#BBF7D0]">
              OUR SOFTWARE PLATFORMS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#0B1F17] leading-tight mb-3">
              Purpose-Built Platforms Powering Critical Sectors
            </h2>
            <p className="text-[#4B5563] text-base max-w-[640px] leading-relaxed">
              From academic institutions and quantity surveying consultancies to enterprise check-in systems, Neotro engineers scalable digital products tailored to domain-specific workflows.
            </p>
          </div>

          {/* 3 Sector Tabs: Education, Construction, Websites */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap mb-10 pb-4 border-b border-[#E5E7EB]">
            <button
              type="button"
              onClick={() => setPlatformCategory('education')}
              className={`px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all inline-flex items-center gap-2 cursor-pointer ${
                platformCategory === 'education'
                  ? 'bg-[#093824] text-white shadow-md ring-2 ring-[#059669]/30'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-[#093824] hover:bg-slate-50'
              }`}
            >
              <GraduationCap className={`w-4 h-4 ${platformCategory === 'education' ? 'text-[#34D399]' : 'text-slate-500'}`} />
              <span>Education</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                platformCategory === 'education' ? 'bg-white/20 text-[#BBF7D0]' : 'bg-slate-100 text-slate-600'
              }`}>
                3 Platforms
              </span>
            </button>

            <button
              type="button"
              onClick={() => setPlatformCategory('construction')}
              className={`px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all inline-flex items-center gap-2 cursor-pointer ${
                platformCategory === 'construction'
                  ? 'bg-[#093824] text-white shadow-md ring-2 ring-[#059669]/30'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-[#093824] hover:bg-slate-50'
              }`}
            >
              <HardHat className={`w-4 h-4 ${platformCategory === 'construction' ? 'text-[#34D399]' : 'text-slate-500'}`} />
              <span>Construction</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                platformCategory === 'construction' ? 'bg-white/20 text-[#BBF7D0]' : 'bg-slate-100 text-slate-600'
              }`}>
                2 Platforms
              </span>
            </button>

            <button
              type="button"
              onClick={() => setPlatformCategory('websites')}
              className={`px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all inline-flex items-center gap-2 cursor-pointer ${
                platformCategory === 'websites'
                  ? 'bg-[#093824] text-white shadow-md ring-2 ring-[#059669]/30'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-[#093824] hover:bg-slate-50'
              }`}
            >
              <Globe className={`w-4 h-4 ${platformCategory === 'websites' ? 'text-[#34D399]' : 'text-slate-500'}`} />
              <span>Websites</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                platformCategory === 'websites' ? 'bg-white/20 text-[#BBF7D0]' : 'bg-slate-100 text-slate-600'
              }`}>
                2 Platforms
              </span>
            </button>
          </div>

          {/* ================================================================= */}
          {/* TAB 1: EDUCATION PROJECTS SECTION */}
          {/* ================================================================= */}
          {platformCategory === 'education' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex items-center justify-between flex-wrap gap-2 pb-2">
                <div>
                  <span className="text-xs font-bold text-[#059669] uppercase tracking-wider font-mono">
                    ACADEMIC &amp; EDTECH SUITE
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-[#0B1F17] mt-0.5">
                    Education Infrastructure, AI Assessment &amp; Campus Access
                  </h3>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  3 specialized platforms for Nigerian primary, secondary &amp; tertiary institutions
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* PLATFORM 1: Neotro School Portal */}
                <div className="bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group">
                  <div>
                    {/* Visual Window Header */}
                    <div className="bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                      <span className="text-xs font-bold tracking-wider uppercase text-[#093824] bg-[#DCFCE7] px-2.5 py-0.5 rounded border border-[#BBF7D0]">
                        EDUCATION
                      </span>
                      <span className="text-[11px] font-mono text-slate-500 font-semibold">Academic ERP &amp; Result Engine</span>
                    </div>

                    {/* Fully Framed Application Preview Window */}
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

                    {/* Card Body & Description */}
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

                  {/* Action Button */}
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
                    {/* Visual Window Header */}
                    <div className="bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                      <span className="text-xs font-bold tracking-wider uppercase text-[#093824] bg-[#DCFCE7] px-2.5 py-0.5 rounded border border-[#BBF7D0]">
                        AI &amp; EDTECH
                      </span>
                      <span className="text-[11px] font-mono text-slate-500 font-semibold">Assessment &amp; Question Bank</span>
                    </div>

                    {/* Fully Framed Application Preview Window */}
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

                    {/* Card Body & Description */}
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

                  {/* Action Button */}
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
                    {/* Visual Window Header */}
                    <div className="bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                      <span className="text-xs font-bold tracking-wider uppercase text-[#093824] bg-[#DCFCE7] px-2.5 py-0.5 rounded border border-[#BBF7D0]">
                        CAMPUS ACCESS
                      </span>
                      <span className="text-[11px] font-mono text-slate-500 font-semibold">RFID &amp; Real-Time Verification</span>
                    </div>

                    {/* Fully Framed Application Preview Window */}
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

                    {/* Card Body & Description */}
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

                  {/* Action Button */}
                  <div className="px-6 pb-6 pt-0">
                    <button
                      onClick={() => scrollToSection('contact', 'Attendance & ID systems')}
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

          {/* ================================================================= */}
          {/* TAB 2: CONSTRUCTION PROJECTS SECTION */}
          {/* ================================================================= */}
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
                    {/* Visual Window Header */}
                    <div className="bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                      <span className="text-xs font-bold tracking-wider uppercase text-[#093824] bg-[#DCFCE7] px-2.5 py-0.5 rounded border border-[#BBF7D0]">
                        CONSTRUCTION &amp; QS
                      </span>
                      <span className="text-[11px] font-mono text-slate-500 font-semibold">Digital Takeoff &amp; BOQ Engine</span>
                    </div>

                    {/* Fully Framed Application Preview Window */}
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

                    {/* Card Body & Description */}
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

                  {/* Action Button */}
                  <div className="px-6 pb-6 pt-0">
                    <button
                      onClick={() => scrollToSection('contact', 'Construction & QS technology')}
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
                    {/* Visual Window Header */}
                    <div className="bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                      <span className="text-xs font-bold tracking-wider uppercase text-[#093824] bg-[#DCFCE7] px-2.5 py-0.5 rounded border border-[#BBF7D0]">
                        ESTIMATING &amp; TENDER
                      </span>
                      <span className="text-[11px] font-mono text-slate-500 font-semibold">Market Rates &amp; Cost Hub</span>
                    </div>

                    {/* Fully Framed Application Preview Window */}
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

                    {/* Card Body & Description */}
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

                  {/* Action Button */}
                  <div className="px-6 pb-6 pt-0">
                    <button
                      onClick={() => scrollToSection('contact', 'Construction & QS technology')}
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

          {/* ================================================================= */}
          {/* TAB 3: WEBSITES PROJECTS SECTION */}
          {/* ================================================================= */}
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
                    {/* Visual Window Header */}
                    <div className="bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                      <span className="text-xs font-bold tracking-wider uppercase text-[#093824] bg-[#DCFCE7] px-2.5 py-0.5 rounded border border-[#BBF7D0]">
                        CUSTOM WEBSITES
                      </span>
                      <span className="text-[11px] font-mono text-slate-500 font-semibold">Modern React &amp; Next.js</span>
                    </div>

                    {/* Fully Framed Application Preview Window */}
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

                    {/* Card Body & Description */}
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

                  {/* Action Button */}
                  <div className="px-6 pb-6 pt-0">
                    <button
                      onClick={() => scrollToSection('contact', 'Business portals')}
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
                    {/* Visual Window Header */}
                    <div className="bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                      <span className="text-xs font-bold tracking-wider uppercase text-[#093824] bg-[#DCFCE7] px-2.5 py-0.5 rounded border border-[#BBF7D0]">
                        ENTERPRISE PORTALS
                      </span>
                      <span className="text-[11px] font-mono text-slate-500 font-semibold">B2B Order &amp; Inventory Hub</span>
                    </div>

                    {/* Fully Framed Application Preview Window */}
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

                    {/* Card Body & Description */}
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

                  {/* Action Button */}
                  <div className="px-6 pb-6 pt-0">
                    <button
                      onClick={() => scrollToSection('contact', 'Business portals')}
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

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. WHY NEOTRO (CONCRETE INSTITUTIONAL DIFFERENTIATORS) */}
      {/* ========================================================================= */}
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
              We replace generic, one-size-fits-all software with institutional platforms engineered around specific Nigerian regulatory standards and workflows.
            </p>
          </div>

          {/* 3-Column Differentiated Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Institutional Domain Specialization */}
            <div className="bg-white border border-[#D1D5DB] rounded-xl p-8 hover:border-[#059669] hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#DCFCE7] text-[#093824] flex items-center justify-center mb-6">
                  <GraduationCap className="w-6 h-6 text-[#059669]" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1F17] mb-3 font-display">
                  Institutional Specialization
                </h3>
                <p className="text-sm leading-relaxed text-[#4B5563]">
                  Built specifically for West African schools, QS consultancies, and enterprises—tailored to local grading systems (WAEC/NERDC standards), construction rate analyses, and Nigerian business practices.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 mt-6 text-xs font-semibold text-[#093824]">
                Local Curriculum &amp; BESMM4 Aligned
              </div>
            </div>

            {/* Card 2: Automated Verification Pipelines */}
            <div className="bg-white border border-[#D1D5DB] rounded-xl p-8 hover:border-[#059669] hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#DCFCE7] text-[#093824] flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-6 h-6 text-[#059669]" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1F17] mb-3 font-display">
                  Automated Verification Math
                </h3>
                <p className="text-sm leading-relaxed text-[#4B5563]">
                  Custom computational engines guarantee arithmetic precision across terminal score summaries, GPA conversions, unit rate computations, and attendance roll-ups.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 mt-6 text-xs font-semibold text-[#093824]">
                Zero Calculation Discrepancies
              </div>
            </div>

            {/* Card 3: Enterprise Engineering & Support SLA */}
            <div className="bg-white border border-[#D1D5DB] rounded-xl p-8 hover:border-[#059669] hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#DCFCE7] text-[#093824] flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6 text-[#059669]" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1F17] mb-3 font-display">
                  Dedicated Support SLA
                </h3>
                <p className="text-sm leading-relaxed text-[#4B5563]">
                  Direct access to dedicated software engineers with guaranteed sub-4-hour turnaround on operational inquiries, automated daily backups, and continuous security patching.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 mt-6 text-xs font-semibold text-[#093824]">
                Rapid Engineering Response
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. TRUSTED INSTITUTIONS, VERIFIED IMPACT & TESTIMONIAL */}
      {/* ========================================================================= */}
      <section id="partners" className="w-full bg-[#F7F9F8] py-16 sm:py-24 border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="bg-[#DCFCE7] text-[#093824] text-xs font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-md inline-block mb-4 border border-[#BBF7D0]">
              PROVEN AT SCALE
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#0B1F17]">
              Trusted By Leading Schools &amp; Organizations
            </h2>
            <p className="text-[#4B5563] text-sm sm:text-base max-w-xl mx-auto mt-2">
              Over 25,000+ student terminal reports and multi-tenant operations computed across our partner network.
            </p>
          </div>

          {/* Hard Impact Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white border border-slate-200 rounded-xl p-5 text-center shadow-xs">
              <div className="text-2xl sm:text-3xl font-extrabold font-display text-[#093824]">25,000+</div>
              <div className="text-xs text-[#4B5563] mt-1 font-semibold">Reports Computed</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-5 text-center shadow-xs">
              <div className="text-2xl sm:text-3xl font-extrabold font-display text-[#093824]">100%</div>
              <div className="text-xs text-[#4B5563] mt-1 font-semibold">Arithmetic Accuracy</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-5 text-center shadow-xs">
              <div className="text-2xl sm:text-3xl font-extrabold font-display text-[#093824]">&lt; 4 Hours</div>
              <div className="text-xs text-[#4B5563] mt-1 font-semibold">Support Resolution</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-5 text-center shadow-xs">
              <div className="text-2xl sm:text-3xl font-extrabold font-display text-[#093824]">NDPA</div>
              <div className="text-xs text-[#4B5563] mt-1 font-semibold">Statutory Compliant</div>
            </div>
          </div>

          {/* High-Contrast Partner Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-12">
            {partnersList.map((partner, idx) => (
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

      {/* ========================================================================= */}
      {/* 7. CONTACT & HEROIC CONSULTATION SECTION (INITIAL BRAND PALETTE) */}
      {/* ========================================================================= */}
      <section id="contact" className="w-full bg-[#F7F9F8] relative overflow-hidden border-t border-b border-[#E5E7EB] selection:bg-[#BBF7D0] selection:text-[#093824]">
        
        {/* Subtle Architectural Crosshairs Grid Pattern */}
        <div className="absolute inset-0 grid-crosshair-lines-light opacity-50 pointer-events-none" />

        {/* Soft Ambient Emerald Glow on the Left */}
        <div className="absolute -left-32 top-24 w-[520px] h-[520px] bg-[radial-gradient(circle,rgba(16,185,129,0.08)_0%,rgba(5,150,105,0.03)_40%,transparent_70%)] blur-3xl pointer-events-none" />

        {/* Subtle Warm Ambient Glow on the Right */}
        <div className="absolute -right-32 top-32 w-[480px] h-[480px] bg-[radial-gradient(circle,rgba(245,158,11,0.05)_0%,transparent_70%)] blur-3xl pointer-events-none" />

        {/* ----------------------------------------------------------------------- */}
        {/* HERO BANNER CALLOUT (MATCHING SPECIFICATION WITH INITIAL BG) */}
        {/* ----------------------------------------------------------------------- */}
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
              onClick={() => scrollToContactElement('contact-options')}
              className="bg-white hover:bg-slate-50 text-[#0B1F17] border border-slate-300 font-semibold text-sm sm:text-base px-6 py-3.5 rounded-lg shadow-xs transition-all cursor-pointer active:scale-95"
            >
              Contact Options
            </button>
          </div>

        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* INTERACTIVE FORM & DIRECT CHANNELS CONTAINER */}
        {/* ----------------------------------------------------------------------- */}
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
                  <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-[#093824]">{formData.name}</strong>. We have received your message, and a member of our team will reach out via email or WhatsApp within 4 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
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
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                        onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us what you want to build or your project requirements (e.g. school portal, biometric attendance, custom takeoff system, or workflow software)..."
                      className="w-full px-4 py-3 rounded-lg bg-[#F7F9F8] border border-slate-300 text-[#0B1F17] text-sm focus:border-[#093824] focus:outline-none transition-colors resize-none placeholder:text-slate-400"
                    />
                  </div>

                  <p className="text-[11px] text-slate-500 leading-normal">
                    By submitting, you agree to our{' '}
                    <button 
                      type="button" 
                      onClick={() => setPrivacyModalOpen('privacy')} 
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

        {/* ----------------------------------------------------------------------- */}
        {/* CONTACT OPTIONS: REACH THE RIGHT TEAM (BELOW ENQUIRY SECTION) */}
        {/* ----------------------------------------------------------------------- */}
        <div id="contact-options" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28 relative z-10 border-t border-[#E5E7EB] pt-16 scroll-mt-24">
          
          <div className="mb-10 text-left">
            <span className="text-xs font-bold text-[#059669] font-mono tracking-wider uppercase block mb-2">
              CONTACT OPTIONS
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold font-display text-[#0B1F17] tracking-tight mb-2">
              Reach The Right Team
            </h3>
            <p className="text-[#4B5563] text-sm sm:text-base">
              Choose the conversation that best matches what you need from Neotro.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: General Enquiries */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-7 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-11 h-11 rounded-lg bg-[#DCFCE7] text-[#059669] flex items-center justify-center mb-6 border border-[#BBF7D0] group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-bold font-display text-[#0B1F17] mb-3">
                  General Enquiries
                </h4>
                <p className="text-sm text-[#4B5563] leading-relaxed mb-6">
                  Speak with our team about Neotro, partnerships, and enterprise technology needs.
                </p>
              </div>
              <a 
                href="mailto:info@neotroltd.com"
                className="text-sm font-bold text-[#0B1F17] group-hover:text-[#093824] inline-flex items-center gap-1.5 transition-colors pt-3 border-t border-slate-100"
              >
                <span>info@neotroltd.com</span>
                <ArrowRight className="w-4 h-4 text-[#059669] group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Card 2: Business Conversations */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-7 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-11 h-11 rounded-lg bg-[#DCFCE7] text-[#059669] flex items-center justify-center mb-6 border border-[#BBF7D0] group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-bold font-display text-[#0B1F17] mb-3">
                  Business Conversations
                </h4>
                <p className="text-sm text-[#4B5563] leading-relaxed mb-6">
                  Start a conversation about solutions, implementation, or digital transformation.
                </p>
              </div>
              <a 
                href="mailto:info@neotroltd.com"
                className="text-sm font-bold text-[#0B1F17] group-hover:text-[#093824] inline-flex items-center gap-1.5 transition-colors pt-3 border-t border-slate-100"
              >
                <span>info@neotroltd.com</span>
                <ArrowRight className="w-4 h-4 text-[#059669] group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Card 3: Careers */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-7 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-11 h-11 rounded-lg bg-[#DCFCE7] text-[#059669] flex items-center justify-center mb-6 border border-[#BBF7D0] group-hover:scale-105 transition-transform">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-bold font-display text-[#0B1F17] mb-3">
                  Careers
                </h4>
                <p className="text-sm text-[#4B5563] leading-relaxed mb-6">
                  Reach our people team about careers and internships.
                </p>
              </div>
              <a 
                href="mailto:info@neotroltd.com"
                className="text-sm font-bold text-[#0B1F17] group-hover:text-[#093824] inline-flex items-center gap-1.5 transition-colors pt-3 border-t border-slate-100"
              >
                <span>info@neotroltd.com</span>
                <ArrowRight className="w-4 h-4 text-[#059669] group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. ENTERPRISE FOOTER (BRAND GREEN PALETTE & REFINED SPECIFICATION) */}
      {/* ========================================================================= */}
      <footer className="w-full bg-[#093824] border-t border-[#0D4A30] text-white pt-16 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        
        {/* Subtle Ambient Depth */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-[radial-gradient(ellipse_at_right,rgba(16,185,129,0.14)_0%,transparent_75%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-12">
          
          {/* Main 4-Column Grid: Col 1 (4), Col 2 (2), Col 3 (2), Col 4 (4) = 12 */}
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

              {/* Lagos Office Address Block (Clean Typography) */}
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
                  <button onClick={handleOpenPrivacyPolicy} className="hover:text-white transition-colors cursor-pointer text-left">
                    Data protection policy
                  </button>
                </li>
                <li>
                  <a href="/admin" onClick={(e) => { e.preventDefault(); setAdminModalOpen(true); }} className="hover:text-white transition-colors text-emerald-200/80">
                    Admin portal
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Social Channels & Community Connect (4 Cols) */}
            <div className="lg:col-span-4">
              <div className="bg-[#062618] border border-[#0F4A32] rounded-2xl p-6 shadow-2xl space-y-4">
                
                {/* CONNECT WITH US */}
                <div className="space-y-2">
                  <span className="text-xs font-bold font-mono tracking-wider text-[#FBBF24] uppercase block">
                    CONNECT WITH US
                  </span>
                  <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed">
                    Connect with our engineering team, explore platform capabilities, or reach out directly on WhatsApp for institutional consultations.
                  </p>
                </div>

                {/* SOCIAL CONNECT ICONS (GREEN ACCENTS ON REFINED BUTTONS) */}
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
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-lg bg-[#0A3321] border border-emerald-700/40 flex items-center justify-center text-emerald-300 hover:text-white hover:bg-[#059669] hover:border-emerald-400 transition-all cursor-pointer shadow-xs"
                    aria-label="LinkedIn"
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

      {/* ========================================================================= */}
      {/* 9. PRIVACY POLICY & TERMS MODAL (NDPA 2023 COMPLIANT) */}
      {/* ========================================================================= */}
      {privacyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#059669]" />
                <h3 className="text-xl font-bold text-[#0B1F17] font-display">
                  {privacyModalOpen === 'privacy' ? 'Privacy Policy & NDPA Governance' : 'Terms of Service & SLAs'}
                </h3>
              </div>
              <button 
                onClick={() => setPrivacyModalOpen(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {privacyModalOpen === 'privacy' ? (
              <div className="text-xs text-slate-600 leading-relaxed space-y-4">
                <p>
                  <strong>1. Commitment to Data Protection:</strong> Neotro Ltd is committed to protecting the privacy and personal data of institutional clients, students, parents, and partners in full alignment with the <strong>Nigeria Data Protection Act (NDPA 2023)</strong> and applicable global data sovereignty guidelines.
                </p>
                <p>
                  <strong>2. Information We Collect:</strong> When you submit an inquiry or schedule a demo on this website, we collect your name, institutional email, phone/WhatsApp number, and operational requirements solely to facilitate communication and demo scheduling.
                </p>
                <p>
                  <strong>3. Purpose of Processing:</strong> Data collected through this site is never sold, leased, or transferred to third-party marketing services. It is utilized exclusively for institutional consultation, service configuration, and lawful software provisioning.
                </p>
                <p>
                  <strong>4. Security Safeguards:</strong> Institutional records stored across Neotro platforms utilize encrypted database partitioning (AES-256), TLS 1.3 in-transit encryption, daily offsite snapshots, and strict Role-Based Access Control (RBAC).
                </p>
                <p>
                  <strong>5. Data Subject Rights:</strong> In accordance with the NDPA 2023, you have the right to request access to, correction of, or complete deletion of your information by contacting our Data Protection Officer at <a href="mailto:info@neotroltd.com" className="text-[#093824] underline font-bold">info@neotroltd.com</a>.
                </p>
              </div>
            ) : (
              <div className="text-xs text-slate-600 leading-relaxed space-y-4">
                <p>
                  <strong>1. Service Provisioning:</strong> Neotro Ltd provides enterprise cloud software, custom portal development, and educational management platforms governed by formal service level agreements (SLAs).
                </p>
                <p>
                  <strong>2. Uptime Guarantee:</strong> Enterprise production tiers are covered by our contractual 99.9% availability commitment, supported by redundant cloud infrastructure and proactive telemetry monitoring.
                </p>
                <p>
                  <strong>3. Support Turnaround:</strong> Contracted institutional clients receive access to dedicated engineering channels with guaranteed response times under 4 business hours for operational inquiries.
                </p>
                <p>
                  <strong>4. Intellectual Property:</strong> All algorithms, takeoff engines, assessment generators, and trademarks associated with Neotro School Portal, Neoppe, and Lecturra remain the intellectual property of Neotro Ltd.
                </p>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
              {privacyModalOpen === 'privacy' && (
                <button
                  onClick={() => {
                    setPrivacyModalOpen(null);
                    handleOpenPrivacyPolicy();
                  }}
                  className="text-xs text-[#059669] hover:text-[#093824] font-semibold hover:underline cursor-pointer"
                >
                  View Full Policy Document &rarr;
                </button>
              )}
              <button
                onClick={() => setPrivacyModalOpen(null)}
                className="px-5 py-2 rounded-lg bg-[#093824] hover:bg-[#0D4A30] text-white font-semibold text-xs transition-colors cursor-pointer ml-auto"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 10. ADMIN MODAL (PROJECTS & TESTIMONIALS MANAGEMENT) */}
      {/* ========================================================================= */}
      <AdminModal
        isOpen={adminModalOpen}
        onClose={handleCloseAdminModal}
        projects={projects}
        onAddProject={(p) => handleSaveProjects([p, ...projects])}
        onUpdateProject={(p) => handleSaveProjects(projects.map(item => item.id === p.id ? p : item))}
        onDeleteProject={(id) => handleSaveProjects(projects.filter(item => item.id !== id))}
        onResetProjects={() => handleSaveProjects(INITIAL_PROJECTS)}
      />

    </div>
  );
}

export default App;

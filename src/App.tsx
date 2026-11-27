import React, { useState, useEffect } from 'react';
import { AdminModal } from './components/AdminModal';
import { NeotroLogo } from './components/NeotroLogo';
import { DataProtectionPolicyPage } from './components/DataProtectionPolicyPage';
import { CareersPage } from './components/CareersPage';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SolutionsSection } from './components/SolutionsSection';
import { WhyNeotroSection } from './components/WhyNeotroSection';
import { ProvenAtScaleSection } from './components/ProvenAtScaleSection';
import { DEFAULT_PARTNERS } from './data/partnersData';
import { ContactSection, type ContactFormData } from './components/ContactSection';
import { FooterSection } from './components/FooterSection';
import { INITIAL_PROJECTS } from './data/initialData';
import type { Project } from './types';
import { ShieldCheck, X } from 'lucide-react';

const NAVIGATION_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'sectors', label: 'Solutions' },
  { id: 'why-neotro', label: 'Why Us' },
  { id: 'partners', label: 'Partners' },
  { id: 'contact', label: 'Contact' }
];

export function App() {
  const [activeSection, setActiveSection] = useState<'top' | 'about' | 'sectors' | 'why-neotro' | 'partners' | 'contact'>('top');
  const [platformCategory, setPlatformCategory] = useState<'education' | 'construction' | 'websites'>('education');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState<'privacy' | 'terms' | null>(null);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const [isCareersOpen, setIsCareersOpen] = useState(false);

  // Admin Project state
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('neotro_projects');
    if (saved) {
      try { return JSON.parse(saved); } catch { return INITIAL_PROJECTS; }
    }
    return INITIAL_PROJECTS;
  });

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    institution: '',
    service: 'Custom Project Inquiry',
    message: ''
  });

  const navigationItems = NAVIGATION_ITEMS;

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

    NAVIGATION_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    const topEl = document.getElementById('top');
    if (topEl) observer.observe(topEl);

    return () => observer.disconnect();
  }, []);

  // Sync client routes for direct routing, refresh, and browser history
  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname.toLowerCase().replace(/\/+$/, '');
      const hash = window.location.hash.toLowerCase();

      // Admin route detection
      if (path === '/admin' || hash === '#admin' || hash === '#/admin') {
        setAdminModalOpen(true);
      } else {
        setAdminModalOpen(false);
      }

      // Careers route detection
      if (
        path === '/careers' ||
        path === '/career' ||
        path === '/jobs' ||
        path === '/openings' ||
        hash === '#careers' ||
        hash === '#/careers' ||
        hash === '#career' ||
        hash === '#/career'
      ) {
        setIsCareersOpen(true);
      } else {
        setIsCareersOpen(false);
      }

      // Data Protection Policy route detection
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
    } else if (isCareersOpen) {
      document.title = 'Careers & Openings — Neotro Ltd';
    } else {
      document.title = 'Neotro Ltd — Intelligent Software Systems & Digital Portals for Nigerian Institutions';
    }
  }, [isPrivacyPolicyOpen, isCareersOpen]);

  const handleOpenPrivacyPolicy = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsPrivacyPolicyOpen(true);
    setIsCareersOpen(false);
    window.history.pushState(null, '', '/data-protection-policy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCareers = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsCareersOpen(true);
    setIsPrivacyPolicyOpen(false);
    window.history.pushState(null, '', '/careers');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToSite = () => {
    setIsPrivacyPolicyOpen(false);
    setIsCareersOpen(false);
    const path = window.location.pathname.toLowerCase().replace(/\/+$/, '');
    if (
      path === '/data-protection-policy' ||
      path === '/privacy-policy' ||
      path === '/privacy' ||
      path === '/careers' ||
      path === '/career' ||
      path === '/jobs' ||
      path === '/openings'
    ) {
      window.history.pushState(null, '', '/');
    } else if (
      window.location.hash.includes('privacy') ||
      window.location.hash.includes('data-protection') ||
      window.location.hash.includes('career') ||
      window.location.hash.includes('job')
    ) {
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
        throw new Error(result.message || 'Failed to submit inquiry. Please try again.');
      }

      setFormSubmitted(true);
    } catch (err: any) {
      setSubmitError(err.message || 'An unexpected error occurred. Please reach out to info@neotroltd.com directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem('neotro_projects', JSON.stringify(newProjects));
  };

  const partnersList = DEFAULT_PARTNERS;

  if (isCareersOpen) {
    return (
      <div className="w-full bg-[#F7F9F8] text-[#0B1F17] font-sans relative selection:bg-[#BBF7D0] selection:text-[#093824] min-h-screen">
        <CareersPage onBack={handleBackToSite} />
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
      
      {/* 1. STICKY TOP NAVIGATION BAR */}
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
            <button
              onClick={handleOpenCareers}
              className="transition-colors py-1 cursor-pointer text-[#4B5563] hover:text-[#093824] inline-flex items-center gap-1.5"
            >
              <span>Careers</span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-800">
                Hiring
              </span>
            </button>
          </nav>

          {/* Right Action CTA: Talk To Our Team */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenCareers}
              className="md:hidden text-xs font-semibold text-[#093824] px-2.5 py-1.5 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Careers
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-white hover:bg-slate-50 text-[#0B1F17] font-semibold text-xs sm:text-sm rounded-lg px-3.5 sm:px-5 py-2 sm:py-2.5 border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-sm transition-all inline-flex items-center justify-center cursor-pointer active:scale-95 whitespace-nowrap"
            >
              Talk To Our Team
            </button>
          </div>

        </div>
      </header>

      {/* 2. HERO SECTION */}
      <HeroSection
        onBookDemo={() => scrollToSection('contact')}
        onExploreSolutions={() => scrollToSection('sectors')}
      />

      {/* 3. ABOUT NEOTRO LTD SECTION */}
      <AboutSection />

      {/* 4. UNIFIED SOLUTIONS SHOWCASE */}
      <SolutionsSection
        platformCategory={platformCategory}
        onSelectCategory={setPlatformCategory}
        onSelectService={(service) => scrollToSection('contact', service)}
        onDiscussProject={() => scrollToSection('contact')}
      />

      {/* 5. WHY NEOTRO */}
      <WhyNeotroSection />

      {/* 6. PROVEN AT SCALE */}
      <ProvenAtScaleSection partners={partnersList} />

      {/* 7. CONTACT & CONSULTATION SECTION */}
      <ContactSection
        formData={formData}
        onChangeFormData={setFormData}
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
        submitError={submitError}
        formSubmitted={formSubmitted}
        onResetForm={() => {
          setFormSubmitted(false);
          setFormData({ name: '', email: '', phone: '', institution: '', service: 'Custom Project Inquiry', message: '' });
        }}
        onOpenPrivacyModal={setPrivacyModalOpen}
        scrollToContactElement={scrollToContactElement}
      />

      {/* 8. ENTERPRISE FOOTER */}
      <FooterSection
        scrollToSection={scrollToSection}
        onOpenCareers={handleOpenCareers}
        onOpenPrivacyPolicy={handleOpenPrivacyPolicy}
      />

      {/* 9. PRIVACY POLICY & TERMS MODAL */}
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

      {/* 10. ADMIN MODAL */}
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

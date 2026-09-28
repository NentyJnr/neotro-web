import { useState, useEffect } from 'react';
import { AIBlocksCanvas } from './components/AIBlocksCanvas';
import { 
  CheckCircle2, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  GraduationCap,
  HardHat,
  Building2
} from 'lucide-react';

export function App() {
  const [activeSection, setActiveSection] = useState<'top' | 'company' | 'services' | 'partners' | 'contact'>('top');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    service: 'School management systems',
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', institution: '', service: 'School management systems', message: '' });
    }, 3500);
  };

  const partnersList = [
    {
      name: "Attwool Schools",
      subtitle: "Skills, Ethos & Excellence",
      logoUrl: "/logos/attwool-logo.png",
      icon: (
        <svg className="w-6 h-6 text-[#10B981]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      )
    },
    {
      name: "Tosphy Geo-Spatial",
      subtitle: "Nigeria Limited",
      logoUrl: "/logos/tosphy-logo.png",
      icon: (
        <svg className="w-6 h-6 text-[#059669]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      )
    },
    {
      name: "EduFacts360",
      subtitle: "Global Education & Academy",
      logoUrl: "/logos/edufacts-logo.png",
      icon: (
        <svg className="w-6 h-6 text-[#093824]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      )
    },
    {
      name: "Dotmond School",
      subtitle: "Primary & Secondary Institution",
      icon: (
        <svg className="w-6 h-6 text-[#093824]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      )
    },
    {
      name: "EL-Perez Int'l School",
      subtitle: "K-12 Educational Institution",
      icon: (
        <svg className="w-6 h-6 text-[#059669]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14z" />
          <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
        </svg>
      )
    },
    {
      name: "CrownGate College",
      subtitle: "Secondary Academy",
      icon: (
        <svg className="w-6 h-6 text-[#10B981]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
          <path d="M5 20h14" />
        </svg>
      )
    },
    {
      name: "BuildCore QS Partners",
      subtitle: "Construction & Estimation",
      icon: (
        <svg className="w-6 h-6 text-[#093824]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      name: "GraceLife Assembly",
      subtitle: "Community & CMS Partner",
      icon: (
        <svg className="w-6 h-6 text-[#059669]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3.5z" />
        </svg>
      )
    }
  ];

  return (
    <div className="w-full bg-[#F7F9F8] text-[#0B1F17] font-sans relative selection:bg-[#BBF7D0] selection:text-[#093824] min-h-screen">
      
      {/* ========================================================================= */}
      {/* 2. CLEAN LIGHT NAVBAR (TOP BAR) */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 bg-[#FFFFFF] border-b border-[#EAECEF] w-full shadow-xs">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 h-[76px] flex items-center justify-between">
          
          {/* Left: Deep Forest Green Rounded Square Logo Mark + Dark Bold Text */}
          <a 
            href="#top" 
            onClick={(e) => { e.preventDefault(); scrollToSection('top'); }} 
            className="flex items-center gap-3 shrink-0 group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#093824] flex items-center justify-center shadow-sm group-hover:bg-[#0D4A30] transition-colors">
              <span className="text-xs font-black text-[#BBF7D0] tracking-wider">N</span>
            </div>
            <span className="text-xl font-bold font-display tracking-tight text-[#0B1F17]">Neotro</span>
          </a>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`transition-colors py-1 ${
                  activeSection === item.id 
                    ? 'text-[#093824] border-b-2 border-[#093824]' 
                    : 'text-[#374151] hover:text-[#093824]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* 3. HERO SECTION (LIGHT PEARL-ASH #F7F9F8 + HIGH-DENSITY 3D GREEN STARS & BOXES) */}
      {/* ========================================================================= */}
      <section id="top" className="w-full relative border-b border-[#E5E7EB] bg-[#F7F9F8] py-16 lg:py-24 overflow-hidden min-h-[560px]">
        
        {/* Architectural Grid Overlay */}
        <div className="absolute inset-0 grid-crosshair-lines-light opacity-60 pointer-events-none" />

        {/* FULL-SCREEN IMMERSIVE 3D MOTION CANVAS (HIGH DENSITY GREEN FALLING STARS & 3D CUBES) */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
          <AIBlocksCanvas colorTheme="light" />
        </div>

        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 relative z-10 pointer-events-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Typography & CTAs */}
            <div className="lg:col-span-7 flex flex-col items-start">
              
              {/* Eyebrow Badge Pill */}
              <span className="bg-[#DCFCE7] text-[#093824] text-xs font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-md inline-block mb-5 border border-[#BBF7D0]">
                AI-EMPOWERED SOFTWARE &amp; DIGITAL INFRASTRUCTURE
              </span>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold font-display text-[#0B1F17] leading-[1.12] tracking-tight mb-5">
                Building intelligent systems that make work effortless.
              </h1>

              {/* Subheadline */}
              <p className="text-[#4B5563] text-lg leading-relaxed mb-8 max-w-[560px]">
                Neotro engineers AI-powered software platforms and custom business portals for schools, construction firms, and growing enterprises—turning complex daily operations into seamless digital workflows.
              </p>

              {/* CTA Button Row */}
              <div className="flex items-center gap-4 flex-wrap">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="bg-[#093824] hover:bg-[#0D4A30] text-white font-semibold text-base rounded-lg px-6 py-3.5 transition-all shadow-md inline-flex items-center gap-2 hover:scale-[1.01]"
                >
                  <span>Book a Demo</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => scrollToSection('sectors')}
                  className="bg-white border border-[#D1D5DB] text-[#0B1F17] hover:bg-slate-50 font-semibold text-base rounded-lg px-6 py-3.5 transition-all shadow-xs"
                >
                  Explore our Solutions
                </button>
              </div>
            </div>

            {/* Right Column: Clean Open Space for 3D Green Wireframe Cubes & Falling Stars */}
            <div className="hidden lg:block lg:col-span-5 pointer-events-none min-h-[300px]" />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. ABOUT NEOTRO LTD SECTION */}
      {/* ========================================================================= */}
      <section id="about" className="w-full bg-[#F7F9F8] py-20 px-6 sm:px-10 border-b border-[#E5E7EB]">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-[#093824] uppercase tracking-wider bg-[#DCFCE7] px-3 py-1 rounded border border-[#BBF7D0]">
              ABOUT NEOTRO LTD
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#0B1F17] leading-tight">
              Engineering reliable software infrastructure for institutions.
            </h2>
            <p className="text-[#4B5563] text-base leading-relaxed">
              Neotro Ltd designs and deploys robust, multi-tenant digital systems. We work closely with educational institutions, construction engineering partners, and enterprise clients to automate mission-critical operations with zero downtime.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm font-semibold text-[#0B1F17]">
                <CheckCircle2 className="w-5 h-5 text-[#059669]" />
                <span>100% Data Sovereignty &amp; Encrypted Backup Architecture</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold text-[#0B1F17]">
                <CheckCircle2 className="w-5 h-5 text-[#059669]" />
                <span>AI-Assisted Assessment Parsing &amp; Grading Pipelines</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold text-[#0B1F17]">
                <CheckCircle2 className="w-5 h-5 text-[#059669]" />
                <span>Seamless Hardware &amp; RFID Attendance Integration</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white border border-slate-200/80 rounded-2xl p-8 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-[#0B1F17]">Enterprise Security &amp; Compliance</h3>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              Every portal developed by Neotro undergoes rigorous security audits, strict role-based access control (RBAC), and encrypted database partitioning.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#F7F9F8] border border-slate-200">
                <div className="text-xs font-bold text-[#093824]">Uptime SLA</div>
                <div className="text-2xl font-bold font-display text-[#0B1F17] mt-1">99.9%</div>
              </div>
              <div className="p-4 rounded-xl bg-[#F7F9F8] border border-slate-200">
                <div className="text-xs font-bold text-[#093824]">Support SLA</div>
                <div className="text-2xl font-bold font-display text-[#0B1F17] mt-1">&lt; 4 Hours</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. "SOLUTIONS ACROSS SECTORS" 2-COLUMN SHOWCASE GRID SECTION */}
      {/* ========================================================================= */}
      <section id="sectors" className="w-full bg-[#F7F9F8] py-12 sm:py-16 px-6 sm:px-10 border-b border-[#E5E7EB]">
        <div className="max-w-[1280px] mx-auto">
          
          {/* Section Header */}
          <div className="mb-10 text-left">
            <span className="bg-[#DCFCE7] text-[#093824] text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-md inline-block mb-3 border border-[#BBF7D0]">
              SOLUTIONS BY SECTOR
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-[#0B1F17] leading-tight mb-2">
              Purpose-Built Platforms Powering Critical Sectors
            </h2>
            <p className="text-[#4B5563] text-sm sm:text-base max-w-[640px] leading-relaxed">
              From academic institutions and quantity surveying firms to enterprise operations, Neotro builds scalable digital products tailored to industry-specific workflows.
            </p>
          </div>

          {/* 2-Column Showcase Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* CARD 1: EDUCATION - Neotro School Portal */}
            <div className="bg-white rounded-xl overflow-hidden border border-[#E5E7EB] shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all group">
              
              {/* Top Visual / Device Mockup Container */}
              <div className="h-[210px] relative overflow-hidden bg-gradient-to-br from-emerald-900/10 via-[#093824]/5 to-slate-100 p-4 flex items-center justify-center">
                
                {/* Sector Pill Badge (Top-Right) */}
                <span className="absolute top-3 right-3 z-10 bg-white text-[#0B1F17] text-[0.65rem] font-bold tracking-wider uppercase px-2.5 py-1 rounded shadow-xs border border-slate-200/80">
                  EDUCATION
                </span>

                {/* Sleek Laptop Mockup */}
                <div className="w-[78%] sm:w-[70%] bg-[#1E293B] rounded-t-lg p-1.5 pt-2 border border-slate-700 shadow-xl transform group-hover:scale-[1.02] transition-transform">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600 mx-auto mb-1" />
                  <div className="bg-white rounded overflow-hidden aspect-[16/10] p-2 text-[0.55rem] space-y-1.5 border border-slate-200">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 rounded bg-[#093824] text-[#BBF7D0] font-black text-[0.5rem] flex items-center justify-center">N</div>
                        <span className="font-bold text-[#0B1F17] text-[0.55rem]">School ERP | Academic Terminal Report</span>
                      </div>
                      <span className="bg-emerald-100 text-emerald-800 text-[0.48rem] font-bold px-1 py-0.2 rounded">Approved</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1 pt-0.5">
                      <div className="bg-slate-50 p-1 rounded border border-slate-100">
                        <span className="text-slate-400 block text-[0.45rem]">Student</span>
                        <span className="font-bold text-[#0B1F17] block text-[0.5rem]">Adebayo A.</span>
                      </div>
                      <div className="bg-slate-50 p-1 rounded border border-slate-100">
                        <span className="text-slate-400 block text-[0.45rem]">Class</span>
                        <span className="font-bold text-[#0B1F17] block text-[0.5rem]">SS3 Science</span>
                      </div>
                      <div className="bg-slate-50 p-1 rounded border border-slate-100">
                        <span className="text-slate-400 block text-[0.45rem]">GPA</span>
                        <span className="font-bold text-[#059669] block text-[0.5rem]">3.92 (Dist.)</span>
                      </div>
                    </div>
                    <div className="border border-slate-100 rounded overflow-hidden text-[0.48rem]">
                      <div className="bg-slate-100 px-1.5 py-0.5 font-bold text-slate-700 flex justify-between">
                        <span>Subject</span>
                        <span>CA</span>
                        <span>Exam</span>
                        <span>Grade</span>
                      </div>
                      <div className="px-1.5 py-0.5 flex justify-between border-t border-slate-100 text-slate-600">
                        <span>Mathematics</span>
                        <span>38</span>
                        <span>54</span>
                        <span className="font-bold text-emerald-700">A1</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom White Text Panel */}
              <div className="p-5 sm:p-6 bg-white">
                <h3 className="text-lg sm:text-xl font-bold font-display text-[#0B1F17] mb-1.5">
                  Neotro School Portal
                </h3>
                <p className="text-[#4B5563] text-xs sm:text-sm leading-relaxed">
                  Neotro School Portal helps primary and secondary institutions automate terminal result computation, manage student records, track tuition fees, and connect parents and teachers from one unified multi-tenant platform.
                </p>
              </div>

            </div>

            {/* CARD 2: CONSTRUCTION & QS - Neoppe */}
            <div className="bg-white rounded-xl overflow-hidden border border-[#E5E7EB] shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all group">
              
              {/* Top Visual / Device Mockup Container */}
              <div className="h-[210px] relative overflow-hidden bg-gradient-to-br from-slate-900 via-[#093824] to-emerald-950 p-4 flex items-center justify-center">
                
                {/* Sector Pill Badge (Top-Right) */}
                <span className="absolute top-3 right-3 z-10 bg-white text-[#0B1F17] text-[0.65rem] font-bold tracking-wider uppercase px-2.5 py-1 rounded shadow-xs border border-slate-200/80">
                  CONSTRUCTION &amp; QS
                </span>

                {/* Sleek Laptop Mockup */}
                <div className="w-[78%] sm:w-[70%] bg-[#0F172A] rounded-t-lg p-1.5 pt-2 border border-slate-700 shadow-xl transform group-hover:scale-[1.02] transition-transform">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600 mx-auto mb-1" />
                  <div className="bg-[#092318] rounded overflow-hidden aspect-[16/10] p-2 text-[0.55rem] text-slate-200 space-y-1.5 border border-emerald-900/60">
                    <div className="flex items-center justify-between border-b border-emerald-800/40 pb-1">
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 rounded bg-[#10B981] text-[#093824] font-black text-[0.5rem] flex items-center justify-center">N</div>
                        <span className="font-bold text-white text-[0.55rem]">Neoppe Takeoff &amp; BOQ Engine</span>
                      </div>
                      <span className="bg-[#10B981]/20 text-[#10B981] text-[0.48rem] font-bold px-1 py-0.2 rounded border border-[#10B981]/40">Live</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1 pt-0.5">
                      <div className="bg-emerald-950/60 p-1 rounded border border-emerald-800/30">
                        <span className="text-emerald-400/70 block text-[0.45rem]">Wall Area</span>
                        <span className="font-bold text-white block text-[0.5rem]">342.8 m²</span>
                      </div>
                      <div className="bg-emerald-950/60 p-1 rounded border border-emerald-800/30">
                        <span className="text-emerald-400/70 block text-[0.45rem]">Volume</span>
                        <span className="font-bold text-white block text-[0.5rem]">48.5 m³</span>
                      </div>
                      <div className="bg-emerald-950/60 p-1 rounded border border-emerald-800/30">
                        <span className="text-emerald-400/70 block text-[0.45rem]">Speed</span>
                        <span className="font-bold text-[#10B981] block text-[0.5rem]">85% Faster</span>
                      </div>
                    </div>
                    <div className="bg-black/40 p-1.5 rounded border border-emerald-900/40 font-mono text-[0.48rem] text-emerald-300">
                      <div>[TAKEOFF] Wall 01-A: 24.5m x 3.2m = 78.4m²</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom White Text Panel */}
              <div className="p-5 sm:p-6 bg-white">
                <h3 className="text-lg sm:text-xl font-bold font-display text-[#0B1F17] mb-1.5">
                  Neoppe
                </h3>
                <p className="text-[#4B5563] text-xs sm:text-sm leading-relaxed">
                  An enterprise quantity surveying and digital takeoff platform that transforms architectural drawings into live Bills of Quantities (BOQ), automated unit rate analyses, and precise material estimates in a fraction of the time.
                </p>
              </div>

            </div>

            {/* CARD 3: AI & EDTECH - Lecturra */}
            <div className="bg-white rounded-xl overflow-hidden border border-[#E5E7EB] shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all group">
              
              {/* Top Visual / Device Mockup Container */}
              <div className="h-[210px] relative overflow-hidden bg-gradient-to-br from-emerald-950 via-[#059669]/10 to-teal-100 p-4 flex items-center justify-center">
                
                {/* Sector Pill Badge (Top-Right) */}
                <span className="absolute top-3 right-3 z-10 bg-white text-[#0B1F17] text-[0.65rem] font-bold tracking-wider uppercase px-2.5 py-1 rounded shadow-xs border border-slate-200/80">
                  AI &amp; EDTECH
                </span>

                {/* Sleek Laptop Mockup */}
                <div className="w-[78%] sm:w-[70%] bg-[#1E293B] rounded-t-lg p-1.5 pt-2 border border-slate-700 shadow-xl transform group-hover:scale-[1.02] transition-transform">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600 mx-auto mb-1" />
                  <div className="bg-white rounded overflow-hidden aspect-[16/10] p-2 text-[0.55rem] space-y-1.5 border border-slate-200">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 rounded bg-[#059669] text-white font-black text-[0.5rem] flex items-center justify-center">L</div>
                        <span className="font-bold text-[#0B1F17] text-[0.55rem]">Lecturra AI Assessment Gen</span>
                      </div>
                      <span className="bg-emerald-100 text-emerald-800 text-[0.48rem] font-bold px-1 py-0.2 rounded">Validated</span>
                    </div>
                    <div className="bg-emerald-50/70 p-1.5 rounded border border-emerald-100">
                      <span className="text-emerald-900 font-bold block text-[0.52rem]">Upload: Physics_Ch4.pdf</span>
                      <span className="text-slate-500 block text-[0.45rem]">Generated 40 MCQs in 4.2s</span>
                    </div>
                    <div className="p-1.5 bg-slate-50 rounded border border-slate-200 space-y-0.5 text-slate-700">
                      <div className="font-bold text-[0.5rem] text-[#0B1F17]">Q1. Kinetic energy of 2.5kg at 12m/s...</div>
                      <div className="text-[0.45rem] text-slate-500">A) 180J  B) 360J  (Ans: A)</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom White Text Panel */}
              <div className="p-5 sm:p-6 bg-white">
                <h3 className="text-lg sm:text-xl font-bold font-display text-[#0B1F17] mb-1.5">
                  Lecturra
                </h3>
                <p className="text-[#4B5563] text-xs sm:text-sm leading-relaxed">
                  An AI-empowered assessment generation and question bank platform that turns lecture notes and curriculum documents into structured, schema-validated examinations and quizzes in seconds.
                </p>
              </div>

            </div>

            {/* CARD 4: OPERATIONS & SECURITY - Neotro Attendance */}
            <div className="bg-white rounded-xl overflow-hidden border border-[#E5E7EB] shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all group">
              
              {/* Top Visual / Device Mockup Container */}
              <div className="h-[210px] relative overflow-hidden bg-gradient-to-br from-slate-100 via-emerald-50 to-[#DCFCE7] p-4 flex items-center justify-center">
                
                {/* Sector Pill Badge (Top-Right) */}
                <span className="absolute top-3 right-3 z-10 bg-white text-[#0B1F17] text-[0.65rem] font-bold tracking-wider uppercase px-2.5 py-1 rounded shadow-xs border border-slate-200/80">
                  OPERATIONS &amp; SECURITY
                </span>

                {/* Smartphone Device Mockup */}
                <div className="w-[135px] bg-[#0F172A] rounded-[18px] p-1.5 border-2 border-slate-700 shadow-xl transform group-hover:scale-[1.03] transition-transform">
                  <div className="w-8 h-1.5 bg-slate-800 rounded-full mx-auto mb-1" />
                  <div className="bg-white rounded-[14px] overflow-hidden p-2 text-[0.55rem] space-y-1.5 border border-slate-200">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                      <span className="font-bold text-[#093824] text-[0.52rem]">Neotro Check-in</span>
                      <span className="bg-emerald-100 text-emerald-800 text-[0.45rem] font-bold px-1 py-0.2 rounded">Live</span>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-200 p-1 rounded-md text-center">
                      <div className="w-4 h-4 rounded-full bg-[#059669] text-white flex items-center justify-center mx-auto mb-0.5 text-[0.5rem]">✓</div>
                      <div className="font-bold text-[#0B1F17] text-[0.5rem]">QR Verified</div>
                    </div>
                    <div className="space-y-0.5 pt-0.5 text-[0.48rem]">
                      <div className="p-0.5 bg-slate-50 rounded border border-slate-100 flex items-center justify-between">
                        <span>Adebayo O.</span>
                        <span className="text-[#059669] font-bold">08:14 AM</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom White Text Panel */}
              <div className="p-5 sm:p-6 bg-white">
                <h3 className="text-lg sm:text-xl font-bold font-display text-[#0B1F17] mb-1.5">
                  Neotro Attendance
                </h3>
                <p className="text-[#4B5563] text-xs sm:text-sm leading-relaxed">
                  A smart digital attendance and real-time check-in system that makes it easy for schools, corporate teams, and events to verify attendance, eliminate proxy sign-ins, and generate instant compliance reports.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. "WHY ORGANIZATIONS CHOOSE NEOTRO" SECTION */}
      {/* ========================================================================= */}
      <section id="why-neotro" className="w-full bg-[#F7F9F8] border-b border-[#E5E7EB]">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 py-[5.5rem] text-left">
          
          {/* Left-Aligned Header */}
          <div className="mb-12">
            <span className="text-[0.8rem] font-bold tracking-[0.16em] uppercase text-[#059669] block mb-[0.85rem]">
              WHY NEOTRO
            </span>
            <h2 className="text-[clamp(2.25rem,3.8vw,3.25rem)] font-extrabold leading-[1.12] tracking-[-0.02em] text-[#0B1F17] font-display">
              Why Organizations Choose<br />Neotro
            </h2>
          </div>

          {/* 3-Column Clean Bordered Cards (No Icon Badges) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Customer Experience */}
            <div className="bg-white border border-[#D1D5DB] rounded-[8px] p-8 sm:p-[2.25rem_2rem] hover:border-[#059669] hover:shadow-[0_10px_25px_-5px_rgba(9,56,36,0.07)] transition-all duration-300">
              <h3 className="text-xl font-bold text-[#0B1F17] mb-4 font-display">
                Customer Experience
              </h3>
              <p className="text-[0.95rem] leading-[1.65] text-[#4B5563] m-0">
                Multidisciplinary engineering teams combine deep industry knowledge, applied AI expertise, and modern product design to deliver seamless software tailored to your operations.
              </p>
            </div>

            {/* Card 2: Quality Assurance */}
            <div className="bg-white border border-[#D1D5DB] rounded-[8px] p-8 sm:p-[2.25rem_2rem] hover:border-[#059669] hover:shadow-[0_10px_25px_-5px_rgba(9,56,36,0.07)] transition-all duration-300">
              <h3 className="text-xl font-bold text-[#0B1F17] mb-4 font-display">
                Quality Assurance
              </h3>
              <p className="text-[0.95rem] leading-[1.65] text-[#4B5563] m-0">
                Every platform and custom portal undergoes rigorous automated testing, multi-tenant security reviews, and real-world performance validation.
              </p>
            </div>

            {/* Card 3: Trusted & Reliable */}
            <div className="bg-white border border-[#D1D5DB] rounded-[8px] p-8 sm:p-[2.25rem_2rem] hover:border-[#059669] hover:shadow-[0_10px_25px_-5px_rgba(9,56,36,0.07)] transition-all duration-300">
              <h3 className="text-xl font-bold text-[#0B1F17] mb-4 font-display">
                Trusted &amp; Reliable
              </h3>
              <p className="text-[0.95rem] leading-[1.65] text-[#4B5563] m-0">
                Proven cloud-native delivery methodologies support rapid execution while maintaining enterprise-grade stability and 99.9% uptime.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. TRUSTED INSTITUTIONS & PARTNERS STRIP */}
      {/* ========================================================================= */}
      <section id="partners" className="w-full bg-[#F7F9F8] py-20 px-6 sm:px-10 border-b border-[#E5E7EB]">
        <div className="max-w-[1360px] mx-auto">
          
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-[#093824] uppercase tracking-widest bg-[#DCFCE7] px-3.5 py-1.5 rounded border border-[#BBF7D0]">
              TRUSTED INSTITUTIONS &amp; PARTNERS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#0B1F17] mt-3">
              Trusted By Leading Schools &amp; Organizations
            </h2>
          </div>

          {/* Continuous Marquee Track */}
            <div className="relative w-full overflow-hidden py-3">
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#F7F9F8] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#F7F9F8] to-transparent z-10 pointer-events-none" />

              <div className="marquee-track hover:[animation-play-state:paused]">
                {[...partnersList, ...partnersList].map((partner, idx) => (
                  <div
                    key={idx}
                    className="min-w-[290px] sm:min-w-[320px] bg-white border border-[#E5E7EB] rounded-xl p-4 flex items-center gap-4 transition-all hover:border-[#093824] hover:shadow-md shrink-0 group"
                  >
                    {partner.logoUrl ? (
                      <div className="h-12 px-3 py-1 bg-white border border-slate-200 rounded-lg flex items-center justify-center shrink-0 shadow-xs">
                        <img 
                          src={partner.logoUrl} 
                          alt={partner.name} 
                          className="h-8 w-auto max-w-[130px] object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-[#DCFCE7] border border-[#BBF7D0] flex items-center justify-center shrink-0 group-hover:bg-[#093824] transition-colors">
                        <div className="group-hover:text-white transition-colors">
                          {partner.icon}
                        </div>
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-bold text-[#0B1F17] group-hover:text-[#093824] transition-colors">{partner.name}</h4>
                      <span className="text-[0.72rem] text-[#4B5563] block mt-0.5">{partner.subtitle}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

      {/* ========================================================================= */}
      {/* PRODUCTS & SERVICES GRID (LIGHT SAAS DESIGN) */}
      {/* ========================================================================= */}
      <section id="services" className="w-full bg-[#F7F9F8] py-20 px-6 sm:px-10 border-b border-[#E5E7EB]">
        <div className="max-w-[1360px] mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-bold text-[#093824] uppercase tracking-wider bg-[#DCFCE7] px-3 py-1 rounded border border-[#BBF7D0]">
                Our Software Ecosystem
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#0B1F17] mt-3">
                Purpose-built platforms &amp; engineering services
              </h2>
            </div>
            <p className="text-[#4B5563] text-sm max-w-[480px]">
              Whether deploying one of our proprietary products or building a custom digital portal, Neotro delivers secure, scalable infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Service Card 1: School ERP & EdTech */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-7 shadow-xs hover:shadow-md hover:border-[#093824] transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#DCFCE7] border border-[#BBF7D0] text-[#093824] flex items-center justify-center mb-6">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1F17] mb-2">School ERP &amp; Result Engines</h3>
                <p className="text-sm text-[#4B5563] leading-relaxed mb-6">
                  Complete academic result computation, student record management, fee tracking, and automated report card generation.
                </p>
              </div>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-xs font-bold text-[#093824] hover:underline flex items-center gap-1.5"
              >
                <span>Request School Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Service Card 2: Neoppe QS & Construction Tech */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-7 shadow-xs hover:shadow-md hover:border-[#093824] transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#DCFCE7] border border-[#BBF7D0] text-[#093824] flex items-center justify-center mb-6">
                  <HardHat className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1F17] mb-2">Neoppe Quantity Surveying Engine</h3>
                <p className="text-sm text-[#4B5563] leading-relaxed mb-6">
                  Digital takeoff, wall area calculations, structural material estimations, and automated Bill of Quantities (BOQ).
                </p>
              </div>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-xs font-bold text-[#093824] hover:underline flex items-center gap-1.5"
              >
                <span>Explore Neoppe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Service Card 3: Custom Portals & Church CMS */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-7 shadow-xs hover:shadow-md hover:border-[#093824] transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#DCFCE7] border border-[#BBF7D0] text-[#093824] flex items-center justify-center mb-6">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1F17] mb-2">Custom Portals &amp; CMS Systems</h3>
                <p className="text-sm text-[#4B5563] leading-relaxed mb-6">
                  Bespoke digital platforms for churches, member organizations, attendance tracking, and enterprise workflows.
                </p>
              </div>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-xs font-bold text-[#093824] hover:underline flex items-center gap-1.5"
              >
                <span>Discuss Custom Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </section>



      {/* ========================================================================= */}
      {/* CONTACT & BOOK A DEMO FORM SECTION */}
      {/* ========================================================================= */}
      <section id="contact" className="w-full bg-[#F7F9F8] py-20 px-6 sm:px-10 border-b border-[#E5E7EB]">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold text-[#093824] uppercase tracking-wider bg-[#DCFCE7] px-3 py-1 rounded border border-[#BBF7D0]">
              GET IN TOUCH
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#0B1F17]">
              Ready to streamline your operational workflows?
            </h2>
            <p className="text-[#4B5563] text-base leading-relaxed">
              Talk to our software engineering team to schedule a custom institutional demo or begin your next project.
            </p>

            <div className="space-y-4 pt-4 text-sm font-semibold text-[#0B1F17]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#DCFCE7] text-[#093824] flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <a href="mailto:neotroltd@gmail.com" className="hover:text-[#093824] transition-colors">neotroltd@gmail.com</a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#DCFCE7] text-[#093824] flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <a href="tel:+2348030930762" className="hover:text-[#093824] transition-colors">+234 803 093 0762</a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#DCFCE7] text-[#093824] flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>18 Kokoro Street, Awoyaya, Ajah, Lagos</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-md">
            {formSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-[#059669] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#0B1F17] mb-2">Demo Request Received</h3>
                <p className="text-slate-600 text-sm">Our institutional team will respond within 4 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0B1F17] mb-1.5 uppercase tracking-wider">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Dr. Emmanuel Okafor"
                      className="w-full px-4 py-3 rounded-lg bg-[#F7F9F8] border border-slate-300 text-[#0B1F17] text-sm focus:border-[#093824] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0B1F17] mb-1.5 uppercase tracking-wider">Official Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@institution.com"
                      className="w-full px-4 py-3 rounded-lg bg-[#F7F9F8] border border-slate-300 text-[#0B1F17] text-sm focus:border-[#093824] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0B1F17] mb-1.5 uppercase tracking-wider">Institution / Company</label>
                    <input
                      type="text"
                      required
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      placeholder="School / Firm Name"
                      className="w-full px-4 py-3 rounded-lg bg-[#F7F9F8] border border-slate-300 text-[#0B1F17] text-sm focus:border-[#093824] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0B1F17] mb-1.5 uppercase tracking-wider">Primary System Interest</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-[#F7F9F8] border border-slate-300 text-[#0B1F17] text-sm focus:border-[#093824] focus:outline-none transition-colors"
                    >
                      <option value="School management systems">School ERP &amp; Result System</option>
                      <option value="Attendance & ID systems">Neoppe QS &amp; Takeoff Engine</option>
                      <option value="Church & institution management">Lecturra AI Assessment Gen</option>
                      <option value="Construction & QS technology">Attendance &amp; RFID Hardware</option>
                      <option value="Business portals">Custom Enterprise Portal</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B1F17] mb-1.5 uppercase tracking-wider">Project Details</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your current operational challenge or workflow requirement..."
                    className="w-full px-4 py-3 rounded-lg bg-[#F7F9F8] border border-slate-300 text-[#0B1F17] text-sm focus:border-[#093824] focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-lg bg-[#093824] hover:bg-[#0D4A30] text-white font-bold text-sm transition-all shadow-md"
                >
                  Schedule Demo / Submit Inquiry
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* FOOTER SECTION (LIGHT SAAS) */}
      {/* ========================================================================= */}
      <footer className="w-full bg-white border-t border-[#EAECEF] py-12 px-6 sm:px-10">
        <div className="max-w-[1360px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#093824] flex items-center justify-center text-[#BBF7D0] font-black text-xs">N</div>
            <span className="font-bold text-lg font-display text-[#0B1F17]">Neotro Ltd</span>
            <span className="text-xs text-slate-400 font-mono">| Intelligent Institutional Software</span>
          </div>

          <div className="text-xs text-[#4B5563]">
            &copy; {new Date().getFullYear()} Neotro Ltd. All rights reserved.
          </div>

        </div>
      </footer>

    </div>
  );
}

export default App;

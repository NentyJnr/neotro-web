import React, { useState } from 'react';
import { NeotroLogo } from './NeotroLogo';
import { JobApplicationModal } from './JobApplicationModal';
import { CULTURE_PILLARS, INITIAL_JOB_OPENINGS } from '../data/careersData';
import type { JobOpening, JobDepartment } from '../types';
import { 
  ArrowLeft, 
  Briefcase, 
  MapPin, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Sparkles, 
  Send,
  Building2,
  Users
} from 'lucide-react';

interface CareersPageProps {
  onBack: () => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ onBack }) => {
  const [selectedDepartment, setSelectedDepartment] = useState<JobDepartment>('all');
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const [applicationModalOpen, setApplicationModalOpen] = useState(false);
  const [selectedJobForModal, setSelectedJobForModal] = useState<JobOpening | null>(null);

  const departments: JobDepartment[] = ['all', 'Engineering', 'Product & Design', 'Client Solutions'];

  const filteredJobs = selectedDepartment === 'all'
    ? INITIAL_JOB_OPENINGS
    : INITIAL_JOB_OPENINGS.filter(j => j.department === selectedDepartment);

  const handleOpenApplication = (job: JobOpening | null) => {
    setSelectedJobForModal(job);
    setApplicationModalOpen(true);
  };

  const toggleJobExpansion = (jobId: string) => {
    setExpandedJobId(prev => prev === jobId ? null : jobId);
  };

  return (
    <div className="min-h-screen bg-[#F7F9F8] text-[#0B1F17] font-sans antialiased">
      
      {/* 1. STICKY TOP HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#093824] hover:text-[#059669] transition-colors py-2 px-3 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
            <div className="h-6 w-px bg-slate-200 hidden sm:block" />
            <div onClick={onBack} className="cursor-pointer">
              <NeotroLogo size="sm" variant="green" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#openings"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#093824] hover:bg-[#0D4A30] text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer shadow-xs"
            >
              <Briefcase className="w-4 h-4 text-[#10B981]" />
              <span>View Openings</span>
            </a>
          </div>
        </div>
      </header>

      {/* 2. HERO BANNER */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="bg-[#DCFCE7] text-[#093824] text-xs font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-md inline-flex items-center gap-2 mb-4 border border-[#BBF7D0]">
              <Sparkles className="w-3.5 h-3.5 text-[#059669]" />
              CAREERS AT NEOTRO LTD
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold font-display text-[#0B1F17] leading-tight mb-5">
              Build reliable software for modern organizations.
            </h1>
            <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed mb-8">
              Join our team of software engineers, system architects, and implementation specialists. We engineer custom digital platforms and domain engines designed around how Nigerian institutions and growing businesses actually operate.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-semibold text-[#0B1F17]">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#F7F9F8] border border-slate-200">
                <Building2 className="w-4 h-4 text-[#059669]" />
                <span>Lagos Headquarters &bull; Ajah / Lekki Corridor</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#F7F9F8] border border-slate-200">
                <Users className="w-4 h-4 text-[#059669]" />
                <span>Hybrid &bull; Outcome-Driven Teams</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CULTURE & WHY WORK AT NEOTRO */}
      <section className="py-16 sm:py-20 border-b border-slate-200 bg-[#F7F9F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold font-mono tracking-wider text-[#059669] uppercase block mb-1">
              ENGINEERING CULTURE &amp; VALUES
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0B1F17]">
              Why Build Your Career at Neotro
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CULTURE_PILLARS.map((pillar, idx) => (
              <div 
                key={idx}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-emerald-300 transition-colors"
              >
                <div>
                  <span className="inline-block px-2.5 py-1 rounded bg-[#DCFCE7] text-[#093824] text-[11px] font-bold uppercase tracking-wider mb-3">
                    {pillar.badge}
                  </span>
                  <h3 className="text-base font-bold text-[#0B1F17] mb-2 font-display">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CURRENT OPENINGS SECTION */}
      <section id="openings" className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="bg-[#DCFCE7] text-[#093824] text-xs font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-md inline-block mb-3 border border-[#BBF7D0]">
                ACTIVE OPENINGS
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold font-display text-[#0B1F17]">
                Open Roles Across Teams
              </h2>
              <p className="text-sm text-[#4B5563] mt-2">
                Explore available roles. All positions offer competitive compensation, hybrid flexibility, and room to grow.
              </p>
            </div>

            {/* Department Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedDepartment === dept
                      ? 'bg-[#093824] text-white shadow-xs'
                      : 'bg-[#F7F9F8] text-[#4B5563] border border-slate-200 hover:bg-slate-100 hover:text-[#0B1F17]'
                  }`}
                >
                  {dept === 'all' ? 'All Roles' : dept}
                </button>
              ))}
            </div>
          </div>

          {/* Jobs Listing Grid */}
          <div className="space-y-4">
            {filteredJobs.map((job) => {
              const isExpanded = expandedJobId === job.id;
              return (
                <div 
                  key={job.id}
                  className="bg-[#F7F9F8] border border-slate-200/90 rounded-2xl overflow-hidden transition-all hover:border-slate-300"
                >
                  {/* Job Header Bar */}
                  <div className="p-6 sm:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="space-y-2 max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#DCFCE7] text-[#093824] uppercase tracking-wide">
                          {job.department}
                        </span>
                        <span className="px-2.5 py-0.5 rounded text-[11px] font-medium bg-white text-slate-600 border border-slate-200">
                          {job.experienceLevel}
                        </span>
                        <span className="px-2.5 py-0.5 rounded text-[11px] font-medium bg-white text-slate-600 border border-slate-200 inline-flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {job.location}
                        </span>
                        <span className="px-2.5 py-0.5 rounded text-[11px] font-medium bg-white text-slate-600 border border-slate-200 inline-flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {job.type}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold font-display text-[#0B1F17]">
                        {job.title}
                      </h3>
                      <p className="text-sm text-[#4B5563] leading-relaxed">
                        {job.summary}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        type="button"
                        onClick={() => toggleJobExpansion(job.id)}
                        className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenApplication(job)}
                        className="px-5 py-2 rounded-lg bg-[#093824] hover:bg-[#0D4A30] text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <span>Apply Now</span>
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details Drawer */}
                  {isExpanded && (
                    <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-2 border-t border-slate-200 bg-white">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                        
                        {/* Responsibilities */}
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#093824] mb-3">
                            Key Responsibilities
                          </h4>
                          <ul className="space-y-2">
                            {job.responsibilities.map((resp, i) => (
                              <li key={i} className="text-xs sm:text-sm text-[#4B5563] flex items-start gap-2 leading-relaxed">
                                <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Requirements */}
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#093824] mb-3">
                            Qualifications &amp; Requirements
                          </h4>
                          <ul className="space-y-2">
                            {job.requirements.map((req, i) => (
                              <li key={i} className="text-xs sm:text-sm text-[#4B5563] flex items-start gap-2 leading-relaxed">
                                <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>

                          {job.techStack && (
                            <div className="mt-5">
                              <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                                Primary Tech Stack
                              </h5>
                              <div className="flex flex-wrap gap-1.5">
                                {job.techStack.map((tech, i) => (
                                  <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-medium">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                        <button
                          type="button"
                          onClick={() => handleOpenApplication(job)}
                          className="px-6 py-2.5 rounded-lg bg-[#093824] hover:bg-[#0D4A30] text-white text-xs font-bold transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
                        >
                          <span>Apply for {job.title} &rarr;</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 5. OPEN APPLICATION BANNER */}
          <div className="mt-12 bg-linear-to-r from-[#093824] to-[#0A3321] rounded-2xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="px-3 py-1 rounded bg-emerald-800/60 text-emerald-200 text-xs font-bold uppercase tracking-wider inline-block mb-3 border border-emerald-700/50">
                GENERAL TALENT POOL
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-2">
                Don&rsquo;t see a role matching your exact profile?
              </h3>
              <p className="text-sm text-emerald-100/90 leading-relaxed">
                We are always seeking exceptional engineers, technical writers, security analysts, and client specialists. Submit a spontaneous application and our leadership team will review your portfolio for future openings.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleOpenApplication(null)}
              className="px-6 py-3 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white text-sm font-bold transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md shrink-0"
            >
              <Send className="w-4 h-4" />
              <span>Submit Open Application</span>
            </button>
          </div>

        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="bg-[#093824] text-white py-12 border-t border-emerald-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-emerald-200/80">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="hover:text-white transition-colors cursor-pointer font-bold">
              &larr; Return to Neotro Homepage
            </button>
            <span>&bull;</span>
            <span>Careers &amp; Opportunities</span>
          </div>

          <div>
            &copy; {new Date().getFullYear()} Neotro Limited. All rights reserved.
          </div>
        </div>
      </footer>

      {/* 7. APPLICATION MODAL */}
      <JobApplicationModal
        key={selectedJobForModal?.id || 'general'}
        isOpen={applicationModalOpen}
        onClose={() => setApplicationModalOpen(false)}
        selectedJob={selectedJobForModal}
        allJobs={INITIAL_JOB_OPENINGS}
      />

    </div>
  );
};

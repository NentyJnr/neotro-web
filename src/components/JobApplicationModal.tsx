import React, { useState, useEffect } from 'react';
import type { JobOpening, JobApplicationPayload } from '../types';
import { X, Briefcase, CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedJob: JobOpening | null;
  allJobs: JobOpening[];
}

export const JobApplicationModal: React.FC<JobApplicationModalProps> = ({
  isOpen,
  onClose,
  selectedJob,
  allJobs
}) => {
  const [formData, setFormData] = useState<JobApplicationPayload>({
    jobId: selectedJob?.id || 'general-application',
    jobTitle: selectedJob?.title || 'Open / General Application',
    fullName: '',
    email: '',
    phone: '',
    experienceLevel: 'Mid-Level',
    portfolioUrl: '',
    resumeUrl: '',
    coverNote: '',
    website_hp: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleJobSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const chosenId = e.target.value;
    if (chosenId === 'general-application') {
      setFormData(prev => ({
        ...prev,
        jobId: 'general-application',
        jobTitle: 'Open / General Application'
      }));
    } else {
      const match = allJobs.find(j => j.id === chosenId);
      if (match) {
        setFormData(prev => ({
          ...prev,
          jobId: match.id,
          jobTitle: match.title
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    // Validate URL format for resume
    if (!formData.resumeUrl.startsWith('http://') && !formData.resumeUrl.startsWith('https://')) {
      setSubmitError('Please provide a valid web link (https://...) to your resume on Google Drive, Dropbox, or OneDrive.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'career_application',
          ...formData
        })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to submit application. Please email careers@neotroltd.com directly.');
      }

      setSubmitted(true);
    } catch (err: any) {
      setSubmitError(err.message || 'An error occurred while submitting. Please reach out to careers@neotroltd.com directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setSubmitError(null);
    setFormData({
      jobId: 'general-application',
      jobTitle: 'Open / General Application',
      fullName: '',
      email: '',
      phone: '',
      experienceLevel: 'Mid-Level',
      portfolioUrl: '',
      resumeUrl: '',
      coverNote: '',
      website_hp: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="career-modal-title"
      >
        {/* Modal Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[#DCFCE7] border border-[#BBF7D0] flex items-center justify-center mx-auto mb-4 text-[#059669]">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 id="career-modal-title" className="text-2xl font-bold text-[#0B1F17] mb-2 font-display">
              Application Received!
            </h3>
            <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed mb-6">
              Thank you, <strong className="text-[#093824]">{formData.fullName}</strong>. We have received your application for <strong className="text-[#093824]">{formData.jobTitle}</strong>. Our engineering &amp; leadership team reviews every candidate profile and will follow up via email within 5 business days.
            </p>
            <button
              type="button"
              onClick={handleResetAndClose}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#093824] hover:bg-[#0D4A30] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              Done / Return to Openings
            </button>
          </div>
        ) : (
          <div>
            <div className="border-b border-slate-200 pb-4 mb-5 pr-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#DCFCE7] text-[#093824] text-xs font-bold uppercase tracking-wider mb-2 border border-[#BBF7D0]">
                <Briefcase className="w-3.5 h-3.5 text-[#059669]" />
                Job Application
              </div>
              <h3 id="career-modal-title" className="text-xl sm:text-2xl font-bold text-[#0B1F17] font-display">
                {formData.jobTitle}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Fill out the application below. Please ensure your CV link is set to public / anyone with the link can view.
              </p>
            </div>

            {submitError && (
              <div className="mb-5 p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
                <span>{submitError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {/* Anti-bot Honeypot */}
              <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                <input
                  type="text"
                  name="website_hp"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website_hp || ''}
                  onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
                />
              </div>

              {/* Target Role Dropdown */}
              <div>
                <label className="block text-xs font-bold text-[#0B1F17] mb-1 uppercase tracking-wider">
                  Applying For <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.jobId}
                  onChange={handleJobSelectChange}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F9F8] border border-slate-300 text-[#0B1F17] text-sm focus:border-[#093824] focus:outline-none"
                >
                  <option value="general-application">Open / General Application (Talent Pool)</option>
                  {allJobs.map(j => (
                    <option key={j.id} value={j.id}>
                      {j.title} ({j.department})
                    </option>
                  ))}
                </select>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#0B1F17] mb-1 uppercase tracking-wider">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Adeola Adeleke"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F9F8] border border-slate-300 text-[#0B1F17] text-sm focus:border-[#093824] focus:outline-none placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0B1F17] mb-1 uppercase tracking-wider">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F9F8] border border-slate-300 text-[#0B1F17] text-sm focus:border-[#093824] focus:outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Phone & Experience Level */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#0B1F17] mb-1 uppercase tracking-wider">
                    Phone / WhatsApp <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+234 800 000 0000"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F9F8] border border-slate-300 text-[#0B1F17] text-sm focus:border-[#093824] focus:outline-none placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0B1F17] mb-1 uppercase tracking-wider">
                    Experience Level <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.experienceLevel}
                    onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F9F8] border border-slate-300 text-[#0B1F17] text-sm focus:border-[#093824] focus:outline-none"
                  >
                    <option value="Entry">Entry-Level (0 - 2 years)</option>
                    <option value="Mid-Level">Mid-Level (3 - 5 years)</option>
                    <option value="Senior">Senior (5+ years)</option>
                    <option value="Lead">Lead / Architect</option>
                  </select>
                </div>
              </div>

              {/* Resume Link */}
              <div>
                <label className="block text-xs font-bold text-[#0B1F17] mb-1 uppercase tracking-wider">
                  Resume / CV Link <span className="text-rose-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  value={formData.resumeUrl}
                  onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                  placeholder="https://drive.google.com/file/... or Dropbox link"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F9F8] border border-slate-300 text-[#0B1F17] text-sm focus:border-[#093824] focus:outline-none placeholder:text-slate-400"
                />
                <span className="text-[11px] text-slate-500 block mt-1">
                  Ensure the link is publicly viewable (e.g. &ldquo;Anyone with the link can view&rdquo;).
                </span>
              </div>

              {/* Portfolio / LinkedIn / GitHub */}
              <div>
                <label className="block text-xs font-bold text-[#0B1F17] mb-1 uppercase tracking-wider">
                  Portfolio, LinkedIn or GitHub <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="url"
                  value={formData.portfolioUrl || ''}
                  onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                  placeholder="https://linkedin.com/in/... or https://github.com/..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F9F8] border border-slate-300 text-[#0B1F17] text-sm focus:border-[#093824] focus:outline-none placeholder:text-slate-400"
                />
              </div>

              {/* Cover Note / Brief Introduction */}
              <div>
                <label className="block text-xs font-bold text-[#0B1F17] mb-1 uppercase tracking-wider">
                  Why Neotro / What excites you? <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={3}
                  value={formData.coverNote || ''}
                  onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                  placeholder="Tell us briefly about relevant projects, systems you've built, or what you'd like to achieve at Neotro..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F9F8] border border-slate-300 text-[#0B1F17] text-sm focus:border-[#093824] focus:outline-none resize-none placeholder:text-slate-400"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-lg bg-[#093824] hover:bg-[#0D4A30] text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Transmitting Application...
                    </>
                  ) : (
                    <>
                      Submit Application <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

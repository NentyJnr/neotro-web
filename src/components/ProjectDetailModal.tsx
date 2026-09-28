import React from 'react';
import type { Project } from '../types';
import { X, MapPin, Tag, Calendar, Layers, ShieldCheck } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onStartInquiry: (projectName: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onStartInquiry
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#111827] border border-slate-700 w-full max-w-2xl rounded-2xl p-6 sm:p-8 text-left shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Sector Tag & Status */}
        <div className="flex items-center gap-2.5 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-semibold border border-amber-500/20">
            <Tag className="w-3.5 h-3.5" />
            {project.sectorLabel}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {project.status.toUpperCase()}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
          {project.title}
        </h3>

        {/* Client & Location */}
        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-400 mb-6 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-1.5 text-slate-300 font-medium">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            {project.client}
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-slate-500" />
            {project.location}
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-slate-500" />
            Deployed {project.year}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-4 mb-6 text-slate-300 text-sm sm:text-base leading-relaxed">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Problem &amp; Solution
          </h4>
          <p>{project.description}</p>
        </div>

        {/* Key Impact Metric */}
        <div className="mb-6 p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 block">Demonstrated Impact Metric</span>
            <span className="text-base font-bold text-white">{project.metrics}</span>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-8">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Technology Stack &amp; Integrations
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, i) => (
              <span key={i} className="px-3 py-1 rounded-md bg-slate-800 text-xs font-medium text-amber-300 border border-slate-700">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onStartInquiry(project.title);
            }}
            className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-colors"
          >
            Inquire About Similar Solution
          </button>
        </div>
      </div>
    </div>
  );
};

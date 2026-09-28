import React, { useState } from 'react';
import type { Project, SectorType } from '../types';
import { ExternalLink, Layers, MapPin, Tag } from 'lucide-react';

interface WorkShowcaseProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

const SECTOR_FILTERS: { key: SectorType; label: string }[] = [
  { key: 'all', label: 'All Projects' },
  { key: 'school', label: 'School Systems' },
  { key: 'attendance', label: 'Attendance & ID' },
  { key: 'church', label: 'Church & Institution' },
  { key: 'construction', label: 'Construction & QS' },
  { key: 'business', label: 'Business Portals' }
];

export const WorkShowcase: React.FC<WorkShowcaseProps> = ({ projects, onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<SectorType>('all');

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.sector === activeFilter);

  return (
    <section id="work" className="py-24 bg-[#0a0d16] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 block">
              Auditable Institutional Portals
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
              Selected work
            </h2>
          </div>
          <p className="text-base sm:text-lg text-slate-300 max-w-md leading-relaxed">
            Products and portals we've built and shipped for real institutions across Nigeria.
          </p>
        </div>

        {/* Sector Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2.5 mb-12 pb-2">
          {SECTOR_FILTERS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeFilter === tab.key
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 scale-105'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Project Card Grid (3 Columns) */}
        <div id="projectGrid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="glass-card p-7 rounded-2xl flex flex-col justify-between cursor-pointer group text-left relative overflow-hidden border border-slate-800/90 hover:border-amber-500/50 bg-[#0e1424]"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Sector & Year Header */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20">
                    <Tag className="w-3.5 h-3.5 text-amber-400" />
                    {project.sectorLabel}
                  </span>
                  <span className="text-xs font-bold text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                    {project.year}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors mb-2 leading-snug">
                  {project.title}
                </h3>

                {/* Client & Location */}
                <p className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 mb-4">
                  <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  {project.client}
                </p>

                {/* Summary */}
                <p className="text-slate-300 text-sm leading-relaxed mb-6 line-clamp-3">
                  {project.summary}
                </p>
              </div>

              <div>
                {/* Impact Metric Badge */}
                <div className="mb-5 py-2.5 px-4 bg-slate-900/90 rounded-xl text-xs font-bold text-slate-200 flex items-center gap-2 border border-slate-800/80">
                  <Layers className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{project.metrics}</span>
                </div>

                {/* Tech Stack & Arrow */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 3).map((tech, i) => (
                      <span key={i} className="px-2.5 py-1 rounded bg-slate-800 text-[11px] font-medium text-slate-300 border border-slate-700/60">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <span className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">
                    <ExternalLink className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-20 text-center text-slate-400 glass-panel rounded-2xl">
            <p className="text-lg">No projects listed in this sector yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

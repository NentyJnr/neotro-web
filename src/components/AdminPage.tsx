import React, { useState, useRef } from 'react';
import type { Project } from '../types';
import { ArrowLeft, Download, Upload, Plus, Trash2, Edit3, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';

interface AdminPageProps {
  projects: Project[];
  onBackToSite: () => void;
  onAddProject: (project: Project) => void;
  onUpdateProject: (project: Project) => void;
  onDeleteProject: (id: string) => void;
  onImportProjects: (imported: Project[]) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  projects,
  onBackToSite,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
  onImportProjects
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields matching admin.html spec
  const [pName, setPName] = useState('');
  const [pTag, setPTag] = useState('');
  const [pDesc, setPDesc] = useState('');
  const [pImg, setPImg] = useState('');
  const [pLink, setPLink] = useState('');

  const showMsg = (text: string, type: 'success' | 'error' = 'success') => {
    setMsg({ text, type });
    setTimeout(() => setMsg(null), 4000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!pName.trim() || !pDesc.trim()) {
      showMsg('Project name and description are required.', 'error');
      return;
    }

    if (editingId) {
      // Edit existing project
      const existing = projects.find((p) => p.id === editingId);
      if (existing) {
        const updated: Project = {
          ...existing,
          title: pName.trim(),
          sectorLabel: pTag.trim() || 'General',
          summary: pDesc.trim(),
          description: pDesc.trim(),
          link: pLink.trim() || undefined
        };
        onUpdateProject(updated);
        showMsg(`Updated "${pName}" successfully.`);
      }
      setEditingId(null);
    } else {
      // Add new project
      const newProj: Project = {
        id: `proj-${Date.now()}`,
        title: pName.trim(),
        client: 'Neotro Client Institution',
        sector: 'school',
        sectorLabel: pTag.trim() || 'School Management',
        summary: pDesc.trim(),
        description: pDesc.trim(),
        metrics: '100% Deployed',
        location: 'Lagos, Nigeria',
        techStack: ['React', 'TypeScript'],
        featured: true,
        status: 'live',
        link: pLink.trim() || undefined,
        year: new Date().getFullYear().toString()
      };
      onAddProject(newProj);
      showMsg(`Added "${pName}" to the list.`);
    }

    // Reset Form
    setPName('');
    setPTag('');
    setPDesc('');
    setPImg('');
    setPLink('');
  };

  const handleEditClick = (project: Project) => {
    setEditingId(project.id);
    setPName(project.title);
    setPTag(project.sectorLabel);
    setPDesc(project.summary || project.description);
    setPImg('');
    setPLink(project.link || '');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleExportJSON = () => {
    const exportData = projects.map((p) => ({
      id: p.id,
      name: p.title,
      category: p.sectorLabel,
      description: p.summary || p.description,
      img: p.link ? '' : '',
      link: p.link || '',
      client: p.client,
      metrics: p.metrics,
      year: p.year
    }));

    const jsonStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'projects.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showMsg('projects.json downloaded successfully!');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          const importedProjects: Project[] = parsed.map((item, index) => ({
            id: item.id || `imported-${index}-${Date.now()}`,
            title: item.name || item.title || 'Untitled Project',
            client: item.client || 'Institution',
            sector: 'school',
            sectorLabel: item.category || item.sectorLabel || 'School Systems',
            summary: item.description || item.summary || '',
            description: item.description || item.summary || '',
            metrics: item.metrics || 'Verified',
            location: 'Lagos',
            techStack: ['React', 'TypeScript'],
            featured: true,
            status: 'live',
            link: item.link || undefined,
            year: item.year || '2026'
          }));
          onImportProjects(importedProjects);
          showMsg(`Loaded ${importedProjects.length} projects from ${file.name}`);
        } else {
          showMsg('Invalid JSON format. Expected an array of projects.', 'error');
        }
      } catch (err) {
        showMsg('Error parsing JSON file.', 'error');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0b0f19]/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <button
            onClick={onBackToSite}
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <span className="brand-dot group-hover:scale-125 transition-transform" />
            <span className="font-display text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
              Neotro
            </span>
          </button>

          <button
            onClick={onBackToSite}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            Back to site
          </button>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <main className="flex-1 py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-8 text-left">
          {/* Admin Header Title */}
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
              Manage projects
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              This page is not linked from search or shared publicly — bookmark it. It edits the project list in your browser only; nothing here is public until you export and redeploy the file.
            </p>
          </div>

          {/* Panel 1: How this works */}
          <section className="glass-panel p-6 sm:p-8 rounded-2xl space-y-4">
            <h2 className="font-display text-xl font-bold text-white pb-2 border-b border-slate-800">
              How this works
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 font-bold text-sm flex items-center justify-center shrink-0 border border-amber-500/30">
                  1
                </span>
                <p className="text-slate-300 text-sm sm:text-base pt-0.5">
                  This loads the site's current <code className="text-amber-300 bg-slate-900 px-2 py-0.5 rounded">data/projects.json</code>. Add, edit or remove projects below.
                </p>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 font-bold text-sm flex items-center justify-center shrink-0 border border-amber-500/30">
                  2
                </span>
                <p className="text-slate-300 text-sm sm:text-base pt-0.5">
                  Click <strong className="text-white">Export projects.json</strong> to download the updated file.
                </p>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 font-bold text-sm flex items-center justify-center shrink-0 border border-amber-500/30">
                  3
                </span>
                <p className="text-slate-300 text-sm sm:text-base pt-0.5">
                  Replace <code className="text-amber-300 bg-slate-900 px-2 py-0.5 rounded">data/projects.json</code> on your host with the downloaded file (upload via your hosting dashboard, FTP, or your Git repo) and the live site updates.
                </p>
              </div>
            </div>
          </section>

          {/* Panel 2: Add / Edit Project Form */}
          <section className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h2 className="font-display text-xl font-bold text-white">
                {editingId ? 'Edit project' : 'Add a project'}
              </h2>
              {editingId && (
                <button
                  onClick={() => {
                    setEditingId(null);
                    setPName('');
                    setPTag('');
                    setPDesc('');
                    setPImg('');
                    setPLink('');
                  }}
                  className="text-xs text-amber-400 hover:underline"
                >
                  Cancel editing
                </button>
              )}
            </div>

            <form id="projectForm" onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pName" className="block text-xs font-semibold text-slate-300 mb-1">
                    Project name *
                  </label>
                  <input
                    id="pName"
                    type="text"
                    required
                    maxLength={80}
                    value={pName}
                    onChange={(e) => setPName(e.target.value)}
                    placeholder="e.g. EduCore School Portal"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label htmlFor="pTag" className="block text-xs font-semibold text-slate-300 mb-1">
                    Category
                  </label>
                  <input
                    id="pTag"
                    type="text"
                    maxLength={40}
                    value={pTag}
                    onChange={(e) => setPTag(e.target.value)}
                    placeholder="e.g. School systems"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="pDesc" className="block text-xs font-semibold text-slate-300 mb-1">
                  What problem does it solve? *
                </label>
                <textarea
                  id="pDesc"
                  required
                  rows={3}
                  maxLength={240}
                  value={pDesc}
                  onChange={(e) => setPDesc(e.target.value)}
                  placeholder="Describe the institutional problem solved in 240 characters or less..."
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pImg" className="block text-xs font-semibold text-slate-300 mb-1">
                    Image URL (optional)
                  </label>
                  <input
                    id="pImg"
                    type="url"
                    value={pImg}
                    onChange={(e) => setPImg(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label htmlFor="pLink" className="block text-xs font-semibold text-slate-300 mb-1">
                    Link (optional)
                  </label>
                  <input
                    id="pLink"
                    type="url"
                    value={pLink}
                    onChange={(e) => setPLink(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  {editingId ? 'Update project' : 'Add to list'}
                </button>
              </div>
            </form>

            {/* Notification message */}
            {msg && (
              <div
                className={`p-3 rounded-lg text-xs font-semibold flex items-center gap-2 ${
                  msg.type === 'error'
                    ? 'bg-rose-500/10 border border-rose-500/30 text-rose-400'
                    : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                }`}
              >
                {msg.type === 'error' ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                {msg.text}
              </div>
            )}
          </section>

          {/* Panel 3: Current Projects & Import/Export */}
          <section className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
              <h2 className="font-display text-xl font-bold text-white">
                Current projects ({projects.length})
              </h2>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <input
                  ref={fileInputRef}
                  id="fileInput"
                  type="file"
                  accept="application/json"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 text-amber-400" />
                  Load a projects.json file
                </button>

                <button
                  id="exportBtn"
                  onClick={handleExportJSON}
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors shadow cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export projects.json
                </button>
              </div>
            </div>

            {/* List of Projects */}
            <div id="list" className="space-y-3">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-slate-700 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-base">{project.title}</span>
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-xs font-semibold border border-amber-500/20">
                        {project.sectorLabel}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 max-w-xl">{project.summary}</p>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-amber-400 hover:underline pt-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        {project.link}
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleEditClick(project)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 transition-colors"
                      title="Edit project"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete "${project.title}"?`)) {
                          onDeleteProject(project.id);
                          showMsg(`Deleted "${project.title}"`);
                        }
                      }}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-rose-900/50 text-rose-400 transition-colors"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {projects.length === 0 && (
                <div className="py-12 text-center text-slate-400 text-sm">
                  No projects loaded. Click "Load a projects.json file" or add a new project above.
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

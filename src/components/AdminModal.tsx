import React, { useState } from 'react';
import type { Project, SectorType } from '../types';
import { X, Plus, Trash2, Edit2, Shield, Search, RefreshCw, Check } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onAddProject: (project: Project) => void;
  onUpdateProject: (project: Project) => void;
  onDeleteProject: (id: string) => void;
  onResetProjects: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  projects,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
  onResetProjects
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Form State
  const [formState, setFormState] = useState<Partial<Project>>({
    title: '',
    client: '',
    sector: 'school',
    sectorLabel: 'School Management',
    summary: '',
    description: '',
    metrics: '',
    location: 'Lagos, Nigeria',
    techStack: ['React', 'TypeScript'],
    featured: true,
    status: 'live',
    year: '2026'
  });

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sectorLabel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startAddNew = () => {
    setFormState({
      id: `proj-${Date.now()}`,
      title: '',
      client: '',
      sector: 'school',
      sectorLabel: 'School Management',
      summary: '',
      description: '',
      metrics: '',
      location: 'Lagos, Nigeria',
      techStack: ['React', 'TypeScript'],
      featured: true,
      status: 'live',
      year: new Date().getFullYear().toString()
    });
    setEditingProject(null);
    setIsAddingNew(true);
  };

  const startEdit = (project: Project) => {
    setFormState(project);
    setEditingProject(project);
    setIsAddingNew(false);
  };

  const cancelForm = () => {
    setIsAddingNew(false);
    setEditingProject(null);
  };

  const handleSectorChange = (sector: SectorType) => {
    const sectorLabels: Record<SectorType, string> = {
      all: 'All',
      school: 'School Management',
      attendance: 'Attendance & ID',
      church: 'Church & Institution',
      construction: 'Construction & QS',
      business: 'Business Portals'
    };
    setFormState({
      ...formState,
      sector,
      sectorLabel: sectorLabels[sector]
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formState.title || !formState.client || !formState.summary) {
      alert('Please fill in required fields: Title, Client, and Summary.');
      return;
    }

    const techArray = typeof formState.techStack === 'string'
      ? (formState.techStack as string).split(',').map((t) => t.trim())
      : formState.techStack || ['React'];

    const projectToSave: Project = {
      id: formState.id || `proj-${Date.now()}`,
      title: formState.title || '',
      client: formState.client || '',
      sector: formState.sector || 'school',
      sectorLabel: formState.sectorLabel || 'School Management',
      summary: formState.summary || '',
      description: formState.description || formState.summary || '',
      metrics: formState.metrics || '100% Verified',
      location: formState.location || 'Lagos',
      techStack: techArray,
      featured: formState.featured ?? true,
      status: formState.status || 'live',
      year: formState.year || '2026'
    };

    if (editingProject) {
      onUpdateProject(projectToSave);
      showToast('Project updated successfully.');
    } else {
      onAddProject(projectToSave);
      showToast('New project created and added to showcase.');
    }

    cancelForm();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project from the showcase?')) {
      onDeleteProject(id);
      showToast('Project deleted.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0f172a] border border-slate-700 w-full max-w-5xl rounded-2xl p-6 text-left shadow-2xl relative max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-white">Neotro Admin Portal</h3>
              <p className="text-xs text-slate-400">Manage live institutional project showcase &amp; metadata</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notification Banner */}
        {notification && (
          <div className="my-3 px-4 py-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
            <Check className="w-4 h-4" />
            {notification}
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-6">
          {!isAddingNew && !editingProject ? (
            <>
              {/* Controls Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={onResetProjects}
                    className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors"
                    title="Reset to default initial projects"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Reset Data
                  </button>

                  <button
                    onClick={startAddNew}
                    className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors shadow"
                  >
                    <Plus className="w-4 h-4" />
                    Add Project
                  </button>
                </div>
              </div>

              {/* Projects Table */}
              <div className="border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900/90 text-slate-400 font-semibold border-b border-slate-800">
                    <tr>
                      <th className="px-4 py-3">Project Title</th>
                      <th className="px-4 py-3">Client</th>
                      <th className="px-4 py-3">Sector</th>
                      <th className="px-4 py-3">Impact Metric</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                    {filteredProjects.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="px-4 py-3 font-bold text-white">{p.title}</td>
                        <td className="px-4 py-3 text-slate-300">{p.client}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                            {p.sectorLabel}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-400">{p.metrics}</td>
                        <td className="px-4 py-3 text-right space-x-2">
                          <button
                            onClick={() => startEdit(p)}
                            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-400 transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="p-1.5 rounded bg-slate-800 hover:bg-rose-900/50 text-rose-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            /* Add / Edit Form */
            <form onSubmit={handleSave} className="space-y-4 bg-slate-900/60 p-5 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h4 className="font-display text-lg font-bold text-white">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h4>
                <button
                  type="button"
                  onClick={cancelForm}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={formState.title}
                    onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Client Institution *</label>
                  <input
                    type="text"
                    required
                    value={formState.client}
                    onChange={(e) => setFormState({ ...formState, client: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Sector</label>
                  <select
                    value={formState.sector}
                    onChange={(e) => handleSectorChange(e.target.value as SectorType)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:border-amber-500"
                  >
                    <option value="school">School Management</option>
                    <option value="attendance">Attendance &amp; ID</option>
                    <option value="church">Church &amp; Institution</option>
                    <option value="construction">Construction &amp; QS</option>
                    <option value="business">Business Portals</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={formState.location}
                    onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Year</label>
                  <input
                    type="text"
                    value={formState.year}
                    onChange={(e) => setFormState({ ...formState, year: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Summary (Short card excerpt) *</label>
                <input
                  type="text"
                  required
                  value={formState.summary}
                  onChange={(e) => setFormState({ ...formState, summary: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  value={formState.description}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:border-amber-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Impact Metric Badge</label>
                  <input
                    type="text"
                    value={formState.metrics}
                    onChange={(e) => setFormState({ ...formState, metrics: e.target.value })}
                    placeholder="e.g. 2,400+ Active Students"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Tech Stack (comma-separated)</label>
                  <input
                    type="text"
                    value={Array.isArray(formState.techStack) ? formState.techStack.join(', ') : formState.techStack}
                    onChange={(e) => setFormState({ ...formState, techStack: e.target.value as any })}
                    placeholder="React, Node.js, PostgreSQL"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={cancelForm}
                  className="px-4 py-2 rounded bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-amber-500 text-slate-950 text-xs font-bold shadow"
                >
                  Save Project
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

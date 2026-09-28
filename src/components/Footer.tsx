import React from 'react';
import { Lock, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="bg-[#040508] text-slate-400 py-10 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm">
        <div className="flex items-center gap-3">
          <span className="brand-dot" />
          <span className="font-display font-bold text-white text-lg">Neotro</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400 text-xs sm:text-sm">© 2026 Neotro Ltd · RC 8804422</span>
        </div>

        <div className="flex items-center gap-6 text-xs sm:text-sm font-medium">
          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-400 border border-slate-800 transition-all cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5 text-amber-500" />
            Manage projects
          </button>

          <a
            href="#top"
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

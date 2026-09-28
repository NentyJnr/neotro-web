import React, { useState } from 'react';
import { Menu, X, Shield, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#07090e]/95 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#top" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-lg p-1">
          <span className="brand-dot group-hover:scale-125 transition-transform duration-300" />
          <span className="font-display text-2xl font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
            Neotro
          </span>
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-[11px] font-medium text-slate-400">
            Lagos, NG
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#work" className="hover:text-amber-400 transition-colors py-1">
            Work
          </a>
          <a href="#services" className="hover:text-amber-400 transition-colors py-1">
            What we do
          </a>
          <a href="#approach" className="hover:text-amber-400 transition-colors py-1">
            Approach
          </a>
          <a href="#contact" className="hover:text-amber-400 transition-colors py-1">
            Contact
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-400 border border-slate-700/80 transition-all cursor-pointer"
            title="Manage Projects Portal"
          >
            <Shield className="w-3.5 h-3.5 text-amber-500" />
            Admin Portal
          </button>

          <a
            href="#contact"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20 hover:-translate-y-0.5"
          >
            Start Project
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle Navigation Menu"
          className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0e17] border-b border-slate-800 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <a
            href="#work"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-200 hover:text-amber-400 py-2 border-b border-slate-800/60"
          >
            Work
          </a>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-200 hover:text-amber-400 py-2 border-b border-slate-800/60"
          >
            What we do
          </a>
          <a
            href="#approach"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-200 hover:text-amber-400 py-2 border-b border-slate-800/60"
          >
            Approach
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-200 hover:text-amber-400 py-2 border-b border-slate-800/60"
          >
            Contact
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAdmin();
            }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 transition-colors"
          >
            <Shield className="w-4 h-4" />
            Manage Projects (Admin)
          </button>
        </div>
      )}
    </header>
  );
};

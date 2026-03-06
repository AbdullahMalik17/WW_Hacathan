import React from 'react';
import { Shield } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="h-16 border-b border-[var(--border)] bg-[var(--bg-primary)] px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold text-[var(--accent-primary)] tracking-tighter uppercase font-jetbrains">
          SafeMGM
        </h1>
        <div className="h-4 w-px bg-[var(--border)] mx-2" />
        <span className="text-xs text-[var(--text-secondary)] uppercase tracking-widest hidden sm:inline">
          Public Safety Intelligence
        </span>
      </div>

      <div className="flex items-center justify-center">
        <div className="px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] flex items-center gap-2 shadow-sm shadow-[var(--accent-primary)]/10">
          <span className="text-[10px] text-[var(--text-secondary)] uppercase font-medium">
            Powered by
          </span>
          <span className="text-xs font-bold text-[var(--text-primary)]">
            Bright Data
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-pulse" />
        </div>
      </div>

      <div className="flex items-center gap-4 text-[var(--text-primary)]">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-[var(--accent-primary)]" />
          <span className="text-sm font-semibold hidden md:inline">Montgomery, AL</span>
          <span className="text-sm font-semibold md:hidden">MGM</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

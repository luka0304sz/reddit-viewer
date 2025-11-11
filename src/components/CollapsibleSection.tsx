'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';

type CollapsibleSectionProps = {
  title: string;
  defaultCollapsed?: boolean;
  children: ReactNode;
};

export function CollapsibleSection({ title, defaultCollapsed = false, children }: CollapsibleSectionProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <div className="mb-6">
      <button
        type="button"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="mb-4 flex w-full items-center gap-4 rounded-xl border border-slate-700 bg-slate-900 px-5 py-4 text-left shadow-lg transition-all duration-200 hover:border-slate-600 hover:bg-slate-800"
        style={{ minHeight: '56px' }}
      >
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-slate-600 bg-slate-800 text-sm text-slate-300">
          {isCollapsed ? '►' : '▼'}
        </span>
        <span className="text-base font-bold text-slate-100">{title}</span>
      </button>
      {!isCollapsed && <div>{children}</div>}
    </div>
  );
}

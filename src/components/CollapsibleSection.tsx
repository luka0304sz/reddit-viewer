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
        className="mb-3 flex w-full items-center gap-3 rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-left transition-colors hover:bg-gray-100"
      >
        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded border border-gray-400 bg-white text-xs text-gray-700">
          {isCollapsed ? '►' : '▼'}
        </span>
        <span className="text-sm font-semibold text-gray-900">{title}</span>
      </button>
      {!isCollapsed && <div>{children}</div>}
    </div>
  );
}

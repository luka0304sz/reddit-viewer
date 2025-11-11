'use client';

import type { RedditComment } from '@/types/reddit';
import { useState } from 'react';
import { getHighlightBadge } from '@/utils/highlight';

type CommentProps = {
  comment: RedditComment;
  depth?: number;
};

const BORDER_COLORS = [
  'border-orange-500/60',
  'border-cyan-500/60',
  'border-emerald-500/60',
  'border-amber-500/60',
  'border-purple-500/60',
];

export function Comment({ comment, depth = 0 }: CommentProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const hasReplies = comment.replies && comment.replies.length > 0;
  const borderColor = BORDER_COLORS[Math.min(depth, BORDER_COLORS.length - 1)];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const highlightBadge = comment.highlight ? getHighlightBadge(comment.highlight) : null;

  return (
    <div className={`my-3 border-l-3 pl-4 ${borderColor}`}>
      <div className="flex gap-3">
        {hasReplies
          ? (
              <button
                type="button"
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-slate-600 bg-slate-800 text-xs text-slate-300 transition-all duration-200 hover:border-cyan-500 hover:bg-slate-700 hover:text-cyan-400"
                onClick={() => setIsCollapsed(!isCollapsed)}
                aria-label={isCollapsed ? 'Expand replies' : 'Collapse replies'}
              >
                {isCollapsed ? '►' : '▼'}
              </button>
            )
          : <div className="w-9 flex-shrink-0" />}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1.5">
            {highlightBadge && (
              <span className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-bold ${highlightBadge.bgColor} ${highlightBadge.textColor} ${highlightBadge.borderColor}`}>
                <span>{highlightBadge.icon}</span>
                <span>{highlightBadge.label}</span>
              </span>
            )}
            <span className="text-sm font-bold text-slate-200">
              u/
              {comment.author}
            </span>
            <span className="text-xs font-bold text-orange-400">
              {comment.score}
              {' '}
              points
            </span>
            {comment.zScore !== undefined && (
              <span className="text-xs font-bold text-purple-400">
                z:
                {' '}
                {comment.zScore.toFixed(2)}
              </span>
            )}
            <span className="text-xs text-slate-500">{formatDate(comment.created)}</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed whitespace-pre-wrap text-slate-300">
            {comment.body}
          </p>
        </div>
      </div>
      {hasReplies && !isCollapsed && (
        <div className="mt-3">
          {comment.replies.map((reply, index) => (
            <Comment key={index} comment={reply} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

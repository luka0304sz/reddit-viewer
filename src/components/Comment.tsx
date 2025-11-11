'use client';

import type { HighlightLevel, RedditComment } from '@/types/reddit';
import { useState } from 'react';

type CommentProps = {
  comment: RedditComment;
  depth?: number;
};

const BORDER_COLORS = [
  'border-orange-500',
  'border-blue-500',
  'border-emerald-500',
  'border-amber-500',
  'border-purple-500',
];

type HighlightBadgeConfig = {
  icon: string;
  label: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
};

const getHighlightBadge = (highlight: HighlightLevel): HighlightBadgeConfig | null => {
  switch (highlight) {
    case 'viral':
      return {
        icon: '🔥',
        label: 'VIRAL',
        bgColor: 'bg-red-100',
        textColor: 'text-red-800',
        borderColor: 'border-red-300',
      };
    case 'hot':
      return {
        icon: '🔥',
        label: 'HOT',
        bgColor: 'bg-orange-100',
        textColor: 'text-orange-800',
        borderColor: 'border-orange-300',
      };
    case 'trending':
      return {
        icon: '📈',
        label: 'TRENDING',
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-800',
        borderColor: 'border-yellow-300',
      };
    default:
      return null;
  }
};

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
    <div className={`my-3 border-l-2 pl-3 ${borderColor}`}>
      <div className="flex gap-2">
        {hasReplies
          ? (
              <button
                type="button"
                className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded border border-gray-300 bg-white text-xs text-gray-600 transition-colors hover:bg-gray-50"
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                {isCollapsed ? '►' : '▼'}
              </button>
            )
          : <div className="w-6 flex-shrink-0" />}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            {highlightBadge && (
              <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-bold ${highlightBadge.bgColor} ${highlightBadge.textColor} ${highlightBadge.borderColor}`}>
                <span>{highlightBadge.icon}</span>
                <span>{highlightBadge.label}</span>
              </span>
            )}
            <span className="text-sm font-semibold text-gray-700">
              u/
              {comment.author}
            </span>
            <span className="text-xs font-medium text-orange-600">
              {comment.score}
              {' '}
              points
            </span>
            {comment.zScore !== undefined && (
              <span className="text-xs font-medium text-purple-600">
                z:
                {' '}
                {comment.zScore.toFixed(2)}
              </span>
            )}
            <span className="text-xs text-gray-500">{formatDate(comment.created)}</span>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed whitespace-pre-wrap text-gray-800">
            {comment.body}
          </p>
        </div>
      </div>
      {hasReplies && !isCollapsed && (
        <div className="mt-2">
          {comment.replies.map((reply, index) => (
            <Comment key={index} comment={reply} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

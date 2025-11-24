'use client';

import type { RedditPost } from '@/types/reddit';
import { useState } from 'react';
import { getHighlightBadge } from '@/utils/highlight';
import { Comment } from './Comment';

type PostProps = {
  post: RedditPost;
  index: number;
  subredditName?: string;
};

export function Post({ post, index }: PostProps) {
  const [isContentCollapsed, setIsContentCollapsed] = useState(false);
  const [areCommentsCollapsed, setAreCommentsCollapsed] = useState(false);
  const hasText = post.selftext && post.selftext.trim();
  const hasComments = post.comments && post.comments.length > 0;

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

  const highlightBadge = post.highlight ? getHighlightBadge(post.highlight) : null;

  return (
    <article id={`post-${index}`} className="mb-6 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-xl transition-all duration-200 hover:border-slate-600 hover:shadow-2xl">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-5">
        <div className="flex gap-4">
          <button
            type="button"
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-slate-600 bg-slate-800 text-sm text-slate-300 transition-all duration-200 hover:border-cyan-500 hover:bg-slate-700 hover:text-cyan-400"
            onClick={() => setIsContentCollapsed(!isContentCollapsed)}
            aria-label={isContentCollapsed ? 'Expand post' : 'Collapse post'}
          >
            {isContentCollapsed ? '►' : '▼'}
          </button>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg leading-tight font-bold text-slate-100 sm:text-xl">
              <span className="mr-2 text-slate-500">
                {index + 1}
                .
              </span>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 transition-colors duration-200 hover:text-cyan-300 hover:underline"
              >
                {post.title}
              </a>
            </h2>
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
              {highlightBadge && (
                <span className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-bold ${highlightBadge.bgColor} ${highlightBadge.textColor} ${highlightBadge.borderColor}`}>
                  <span>{highlightBadge.icon}</span>
                  <span>{highlightBadge.label}</span>
                </span>
              )}
              <span className="inline-flex items-center rounded-lg bg-orange-500/20 px-3 py-1 font-bold text-orange-400 ring-1 ring-orange-500/30">
                {post.score}
                {' '}
                pts
              </span>
              {post.zScore !== undefined && (
                <span className="inline-flex items-center rounded-lg bg-purple-500/20 px-3 py-1 font-bold text-purple-400 ring-1 ring-purple-500/30">
                  z:
                  {' '}
                  {post.zScore.toFixed(2)}
                </span>
              )}
              <span className="font-semibold text-slate-300">
                u/
                {post.author}
              </span>
              <span className="text-slate-400">
                {post.commentsFilteredCnt}
                /
                {post.commentsAllCnt}
                {' '}
                comments
              </span>
              <span className="text-slate-500">{formatDate(post.created)}</span>
            </div>
          </div>
        </div>
      </div>

      {!isContentCollapsed && (
        <div>
          <div className="flex gap-4 border-t border-slate-700 bg-slate-800/50 px-5 py-3">
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-cyan-400 transition-colors duration-200 hover:text-cyan-300 hover:underline"
            >
              View Content
            </a>
            <span className="text-slate-600">•</span>
            <a
              href={`https://reddit.com${post.permalink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-cyan-400 transition-colors duration-200 hover:text-cyan-300 hover:underline"
            >
              Reddit
            </a>
          </div>

          {hasText && (
            <div className="border-t border-slate-700 bg-slate-900 p-5">
              <p className="text-base leading-relaxed whitespace-pre-wrap text-slate-300">
                {post.selftext}
              </p>
            </div>
          )}

          {hasComments && (
            <div className="border-t border-slate-700 p-5">
              <div className="mb-4 flex items-center gap-3">
                <button
                  type="button"
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-slate-600 bg-slate-800 text-sm text-slate-300 transition-all duration-200 hover:border-cyan-500 hover:bg-slate-700 hover:text-cyan-400"
                  onClick={() => setAreCommentsCollapsed(!areCommentsCollapsed)}
                  aria-label={areCommentsCollapsed ? 'Expand comments' : 'Collapse comments'}
                >
                  {areCommentsCollapsed ? '►' : '▼'}
                </button>
                <h3 className="text-lg font-bold text-slate-100">Comments</h3>
                <span className="inline-flex items-center rounded-lg bg-orange-500/20 px-2.5 py-1 text-xs font-bold text-orange-400 ring-1 ring-orange-500/30">
                  {post.commentsFilteredCnt}
                </span>
                <span className="text-sm text-slate-500">
                  (
                  {post.commentsAllCnt}
                  {' '}
                  total)
                </span>
              </div>
              {!areCommentsCollapsed && (
                <div className="space-y-2">
                  {post.comments.map((comment, commentIndex) => (
                    <Comment key={commentIndex} comment={comment} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </article>
  );
}

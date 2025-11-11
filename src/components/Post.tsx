'use client';

import type { HighlightLevel, RedditPost } from '@/types/reddit';
import { useState } from 'react';
import { Comment } from './Comment';

type PostProps = {
  post: RedditPost;
  index: number;
  subredditName?: string;
};

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
    <article id={`post-${index}`} className="mb-6 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="bg-gradient-to-r from-gray-50 to-white p-4">
        <div className="flex gap-3">
          <button
            type="button"
            className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded border border-gray-300 bg-white text-xs text-gray-600 transition-colors hover:bg-gray-50"
            onClick={() => setIsContentCollapsed(!isContentCollapsed)}
          >
            {isContentCollapsed ? '►' : '▼'}
          </button>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg leading-tight font-semibold text-gray-900">
              <span className="mr-1.5 text-gray-400">
                {index + 1}
                .
              </span>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 hover:underline"
              >
                {post.title}
              </a>
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm">
              {highlightBadge && (
                <span className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-0.5 text-xs font-bold ${highlightBadge.bgColor} ${highlightBadge.textColor} ${highlightBadge.borderColor}`}>
                  <span>{highlightBadge.icon}</span>
                  <span>{highlightBadge.label}</span>
                </span>
              )}
              <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 font-semibold text-orange-700">
                {post.score}
                {' '}
                pts
              </span>
              {post.zScore !== undefined && (
                <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 font-semibold text-purple-700">
                  z:
                  {' '}
                  {post.zScore.toFixed(2)}
                </span>
              )}
              <span className="font-medium text-gray-700">
                u/
                {post.author}
              </span>
              <span className="text-gray-500">
                {post.commentsFilteredCnt}
                /
                {post.commentsAllCnt}
                {' '}
                comments
              </span>
              <span className="text-gray-400">{formatDate(post.created)}</span>
            </div>
          </div>
        </div>
      </div>

      {!isContentCollapsed && (
        <div>
          <div className="flex gap-3 border-t border-gray-100 bg-gray-50 px-4 py-2.5">
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
            >
              View Content
            </a>
            <span className="text-gray-300">•</span>
            <a
              href={`https://reddit.com${post.permalink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
            >
              Reddit
            </a>
          </div>

          {hasText && (
            <div className="border-t border-gray-100 bg-gradient-to-b from-gray-50 to-white p-4">
              <p className="text-sm leading-relaxed whitespace-pre-wrap text-gray-700">
                {post.selftext}
              </p>
            </div>
          )}

          {hasComments && (
            <div className="border-t border-gray-100 p-4">
              <div className="mb-4 flex items-center gap-2">
                <button
                  type="button"
                  className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded border border-gray-300 bg-white text-xs text-gray-600 transition-colors hover:bg-gray-50"
                  onClick={() => setAreCommentsCollapsed(!areCommentsCollapsed)}
                >
                  {areCommentsCollapsed ? '►' : '▼'}
                </button>
                <h3 className="text-base font-semibold text-gray-900">Comments</h3>
                <span className="inline-flex items-center rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-700">
                  {post.commentsFilteredCnt}
                </span>
                <span className="text-xs text-gray-500">
                  (
                  {post.commentsAllCnt}
                  {' '}
                  total)
                </span>
              </div>
              {!areCommentsCollapsed && (
                <div className="space-y-1">
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

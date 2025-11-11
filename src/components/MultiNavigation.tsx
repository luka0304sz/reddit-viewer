'use client';

import type { MultiSubredditResponse } from '@/types/reddit';
import { useState } from 'react';
import { getHighlightIcon } from '@/utils/highlight';

type MultiNavigationProps = {
  data: MultiSubredditResponse;
};

export function MultiNavigation({ data }: MultiNavigationProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (data.subreddits.length === 0) {
    return null;
  }

  const totalPosts = data.subreddits.reduce((sum, sr) => sum + sr.posts.length, 0);

  return (
    <div className="mb-6 rounded-xl border border-cyan-500/30 bg-slate-900 shadow-xl">
      <div className="border-b border-slate-700 bg-gradient-to-r from-slate-800 to-slate-900 px-5 py-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-cyan-500/30 bg-slate-800 text-sm text-cyan-400 transition-all duration-200 hover:border-cyan-400 hover:bg-slate-700"
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? 'Expand navigation' : 'Collapse navigation'}
          >
            {isCollapsed ? '►' : '▼'}
          </button>
          <h3 className="text-base font-bold text-slate-100">
            Quick Navigation
            {' '}
            <span className="font-normal text-slate-400">
              (
              {data.subreddits.length}
              {' '}
              subreddits,
              {' '}
              {totalPosts}
              {' '}
              posts)
            </span>
          </h3>
        </div>
      </div>

      {!isCollapsed && (
        <div className="max-h-96 overflow-y-auto p-5">
          <div className="space-y-5">
            {data.subreddits.map((subreddit, srIndex) => (
              <div key={subreddit.subreddit} className="border-b border-slate-800 pb-4 last:border-0">
                <a
                  href={`#subreddit-${srIndex}`}
                  className="mb-3 block text-base font-bold text-orange-400 transition-colors duration-200 hover:text-orange-300 hover:underline"
                >
                  r/
                  {subreddit.subreddit}
                  {' '}
                  <span className="text-sm font-normal text-slate-500">
                    (
                    {subreddit.posts.length}
                    {' '}
                    posts)
                  </span>
                </a>
                <div className="ml-5 space-y-2">
                  {subreddit.posts.map((post, postIndex) => {
                    const highlightIcon = post.highlight ? getHighlightIcon(post.highlight) : null;
                    return (
                      <a
                        key={post.permalink}
                        href={`#post-${srIndex * 1000 + postIndex}`}
                        className="block text-sm text-slate-300 transition-colors duration-200 hover:text-cyan-400 hover:underline"
                      >
                        <div className="flex items-start gap-2.5">
                          <span className="flex-shrink-0 text-slate-500">
                            {postIndex + 1}
                            .
                          </span>
                          <span className="flex-1 truncate">{post.title}</span>
                          <span className="flex flex-shrink-0 items-center gap-2 text-slate-400">
                            {highlightIcon && (
                              <span className="text-base" title={post.highlight || ''}>
                                {highlightIcon}
                              </span>
                            )}
                            <span className="inline-flex items-center rounded-lg bg-orange-500/20 px-2 py-0.5 text-xs font-bold text-orange-400">
                              {post.score}
                            </span>
                            {post.zScore !== undefined && (
                              <span className="inline-flex items-center rounded-lg bg-purple-500/20 px-2 py-0.5 text-xs font-bold text-purple-400">
                                z:
                                {post.zScore.toFixed(1)}
                              </span>
                            )}
                            <span className="text-xs">
                              {post.commentsFilteredCnt}
                              /
                              {post.commentsAllCnt}
                              {' '}
                              💬
                            </span>
                          </span>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

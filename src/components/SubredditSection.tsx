'use client';

import type { SubredditResult } from '@/types/reddit';
import Link from 'next/link';
import { useState } from 'react';
import { Post } from './Post';

type SubredditSectionProps = {
  subreddit: SubredditResult;
  index: number;
};

export function SubredditSection({ subreddit, index }: SubredditSectionProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div id={`subreddit-${index}`} className="mb-12">
      <div className="mb-6 rounded-xl border-2 border-orange-500/40 bg-orange-500/10 p-5 shadow-xl">
        <div className="flex items-start gap-4">
          <button
            type="button"
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-orange-500/50 bg-slate-800 text-sm text-orange-400 transition-all duration-200 hover:border-orange-400 hover:bg-slate-700"
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? 'Expand subreddit' : 'Collapse subreddit'}
          >
            {isCollapsed ? '►' : '▼'}
          </button>
          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-bold text-slate-100 sm:text-3xl">
                r/
                {subreddit.subreddit}
              </h2>
              <Link
                href={`/?subreddit=${subreddit.subreddit}`}
                className="rounded-lg bg-purple-500/20 px-4 py-2 text-sm font-bold text-purple-400 ring-1 ring-purple-500/30 transition-all duration-200 hover:bg-purple-500/30"
                style={{ minHeight: '36px' }}
              >
                View Single
              </Link>
            </div>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-400">
              <span>
                Posts:
                {' '}
                <strong className="text-slate-200">{subreddit.posts.length}</strong>
                {' '}
                /
                {' '}
                {subreddit.stats.postsAllCnt}
              </span>
              <span>
                {subreddit.fromCache ? `Cached (${subreddit.cacheAgeMinutes}m ago)` : 'Fresh'}
              </span>
              {subreddit.stats.postScoreStats && (
                <>
                  <span>
                    Avg Score:
                    {' '}
                    <strong className="text-slate-200">{subreddit.stats.postScoreStats.mean.toFixed(1)}</strong>
                  </span>
                  <span>
                    StdDev:
                    {' '}
                    <strong className="text-slate-200">{subreddit.stats.postScoreStats.stdDev.toFixed(1)}</strong>
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {!isCollapsed && (
        <>
          {subreddit.posts.length === 0 && (
            <div className="rounded-xl border border-slate-700 bg-slate-900 p-6 text-center shadow-xl">
              <p className="text-slate-400">No posts found for this subreddit.</p>
            </div>
          )}

          {subreddit.posts.map((post, postIndex) => (
            <Post
              key={post.permalink}
              post={post}
              index={index * 1000 + postIndex}
              subredditName={subreddit.subreddit}
            />
          ))}
        </>
      )}
    </div>
  );
}

'use client';

import type { SubredditResult } from '@/types/reddit';
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
      <div className="mb-6 rounded-lg border-2 border-orange-300 bg-orange-50 p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded border border-orange-400 bg-white text-sm text-orange-700 transition-colors hover:bg-orange-100"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? '►' : '▼'}
          </button>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">
              r/
              {subreddit.subreddit}
            </h2>
            <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
              <span>
                Posts:
                {' '}
                <strong>{subreddit.posts.length}</strong>
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
                    {subreddit.stats.postScoreStats.mean.toFixed(1)}
                  </span>
                  <span>
                    StdDev:
                    {' '}
                    {subreddit.stats.postScoreStats.stdDev.toFixed(1)}
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
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center shadow-sm">
              <p className="text-gray-600">No posts found for this subreddit.</p>
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

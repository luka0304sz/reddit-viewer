'use client';

import type { MultiSubredditResponse } from '@/types/reddit';
import { useState } from 'react';

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
    <div className="mb-6 rounded-lg border border-blue-200 bg-white shadow-sm">
      <div className="border-b border-blue-200 bg-blue-50 px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded border border-blue-300 bg-white text-xs text-blue-700 transition-colors hover:bg-blue-100"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? '►' : '▼'}
          </button>
          <h3 className="text-sm font-semibold text-blue-900">
            Quick Navigation
            {' '}
            <span className="font-normal text-blue-600">
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
        <div className="max-h-96 overflow-y-auto p-4">
          <div className="space-y-4">
            {data.subreddits.map((subreddit, srIndex) => (
              <div key={subreddit.subreddit} className="border-b border-gray-100 pb-3 last:border-0">
                <a
                  href={`#subreddit-${srIndex}`}
                  className="mb-2 block font-semibold text-orange-600 hover:text-orange-700 hover:underline"
                >
                  r/
                  {subreddit.subreddit}
                  {' '}
                  <span className="text-xs font-normal text-gray-500">
                    (
                    {subreddit.posts.length}
                    {' '}
                    posts)
                  </span>
                </a>
                <div className="ml-4 space-y-1">
                  {subreddit.posts.map((post, postIndex) => (
                    <a
                      key={post.permalink}
                      href={`#post-${srIndex * 1000 + postIndex}`}
                      className="block text-xs text-gray-700 hover:text-blue-600 hover:underline"
                    >
                      <div className="flex items-start gap-2">
                        <span className="flex-shrink-0 text-gray-400">
                          {postIndex + 1}
                          .
                        </span>
                        <span className="flex-1 truncate">{post.title}</span>
                        <span className="flex flex-shrink-0 items-center gap-2 text-gray-500">
                          <span className="inline-flex items-center rounded bg-orange-100 px-1.5 py-0.5 text-xs font-semibold text-orange-700">
                            {post.score}
                          </span>
                          {post.zScore !== undefined && (
                            <span className="inline-flex items-center rounded bg-purple-100 px-1.5 py-0.5 text-xs font-semibold text-purple-700">
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
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

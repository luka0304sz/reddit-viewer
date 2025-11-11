import type { RedditPost } from '@/types/reddit';
import { getHighlightIcon } from '@/utils/highlight';

type PostNavigationProps = {
  posts: RedditPost[];
};

export function PostNavigation({ posts }: PostNavigationProps) {
  return (
    <nav className="mb-6 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-xl">
      <div className="border-b border-slate-700 bg-gradient-to-r from-slate-800 to-slate-900 px-5 py-4">
        <h3 className="text-sm font-bold tracking-wider text-slate-300 uppercase">
          Posts Navigation
        </h3>
      </div>
      <div className="divide-y divide-slate-800">
        {posts.map((post, index) => {
          const highlightIcon = post.highlight ? getHighlightIcon(post.highlight) : null;
          return (
            <a
              key={index}
              href={`#post-${index}`}
              className="flex items-center gap-4 px-5 py-3 transition-all duration-200 hover:bg-slate-800"
              style={{ minHeight: '48px' }}
            >
              <span className="flex-shrink-0 text-sm font-bold text-slate-500">
                {index + 1}
                .
              </span>
              <span className="min-w-0 flex-1 truncate text-sm font-medium text-slate-300">
                {post.title}
              </span>
              <span className="flex flex-shrink-0 items-center gap-2.5">
                {highlightIcon && (
                  <span className="text-base" title={post.highlight || ''}>
                    {highlightIcon}
                  </span>
                )}
                <span className="text-sm font-bold text-orange-400">
                  {post.score}
                  {' '}
                  pts
                </span>
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}

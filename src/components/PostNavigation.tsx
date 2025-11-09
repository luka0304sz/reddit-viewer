import type { RedditPost } from '@/types/reddit';

interface PostNavigationProps {
  posts: RedditPost[];
}

export function PostNavigation({ posts }: PostNavigationProps) {
  return (
    <nav className="mb-6 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white px-4 py-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-700">
          Posts Navigation
        </h3>
      </div>
      <div className="divide-y divide-gray-100">
        {posts.map((post, index) => (
          <a
            key={index}
            href={`#post-${index}`}
            className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-gray-50"
          >
            <span className="flex-shrink-0 text-sm font-medium text-gray-400">
              {index + 1}
              .
            </span>
            <span className="min-w-0 flex-1 truncate text-sm text-gray-700">
              {post.title}
            </span>
            <span className="flex-shrink-0 text-sm font-semibold text-orange-600">
              {post.score}
              {' '}
              pts
            </span>
          </a>
        ))}
      </div>
    </nav>
  );
}

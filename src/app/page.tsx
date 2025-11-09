import { Post } from '@/components/Post';
import { PostNavigation } from '@/components/PostNavigation';
import { Stats } from '@/components/Stats';
import { fetchRedditData } from '@/services/reddit';

interface SearchParams {
  subreddit?: string;
  channel?: string;
  apiKey?: string;
  topPostsCount?: string;
  maxComments?: string;
  minimumCommentScore?: string;
}

interface PageProps {
  searchParams: Promise<SearchParams>;
}

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const subreddit = params.subreddit || params.channel;

  if (!subreddit) {
    return (
      <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900">Reddit Posts Viewer</h1>
            <p className="mt-2 text-sm text-gray-600">
              Real-time Reddit data with comments and replies
            </p>
          </header>
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 shadow-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-semibold text-red-800">Parameter Missing</h3>
                <p className="mt-2 text-sm text-red-700">
                  Required parameter missing:
                  {' '}
                  <code className="rounded bg-red-100 px-1.5 py-0.5 font-mono text-xs">subreddit</code>
                  {' '}
                  or
                  {' '}
                  <code className="rounded bg-red-100 px-1.5 py-0.5 font-mono text-xs">channel</code>
                </p>
                <div className="mt-4">
                  <p className="text-sm font-medium text-red-800">Usage:</p>
                  <p className="mt-1 text-sm text-red-700">
                    Add
                    {' '}
                    <code className="rounded bg-red-100 px-1.5 py-0.5 font-mono text-xs">
                      ?subreddit=SUBREDDIT_NAME
                    </code>
                    {' '}
                    to the URL
                  </p>
                  <p className="mt-2 text-sm font-medium text-red-800">Example:</p>
                  <code className="mt-1 block rounded bg-red-100 px-3 py-2 font-mono text-xs text-red-700">
                    ?subreddit=ClaudeAI&maxComments=50
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  try {
    const data = await fetchRedditData({
      subreddit,
      apiKey: params.apiKey,
      topPostsCount: params.topPostsCount ? Number.parseInt(params.topPostsCount, 10) : undefined,
      maxComments: params.maxComments ? Number.parseInt(params.maxComments, 10) : undefined,
      minimumCommentScore: params.minimumCommentScore ? Number.parseInt(params.minimumCommentScore, 10) : undefined,
    });

    const subtitle = `${data.config.topPostsCount} posts · ${data.config.maxComments} max comments · min score ${data.config.minimumCommentScore}`;

    return (
      <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900">Reddit Posts Viewer</h1>
            <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
          </header>
          <Stats data={data} />
          <PostNavigation posts={data.posts} />
          {data.posts.map((post, index) => (
            <Post key={index} post={post} index={index} />
          ))}
        </div>
      </div>
    );
  }
  catch (error) {
    return (
      <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900">Reddit Posts Viewer</h1>
            <p className="mt-2 text-sm text-gray-600">
              r/
              {subreddit}
            </p>
          </header>
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 shadow-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-semibold text-red-800">Error Loading Reddit Data</h3>
                <p className="mt-2 text-sm text-red-700">
                  {error instanceof Error ? error.message : 'Unknown error occurred'}
                </p>
                <p className="mt-4 text-sm text-red-700">
                  Please try again or check the subreddit name.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

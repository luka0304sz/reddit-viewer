import Link from 'next/link';
import { ConfigForm } from '@/components/ConfigForm';
import { Post } from '@/components/Post';
import { PostNavigation } from '@/components/PostNavigation';
import { SingleSubredditStats } from '@/components/SingleSubredditStats';
import { fetchRedditData } from '@/services/reddit';

type SearchParams = {
  subreddit?: string;
  channel?: string;
  apiKey?: string;
  maxPosts?: string;
  maxComments?: string;
  minimumCommentScore?: string;
  minimumPostScore?: string;
  limit?: string;
};

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const subreddit = params.subreddit || params.channel;

  if (!subreddit) {
    return (
      <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-4 flex justify-center gap-4">
            <Link
              href="/"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white"
            >
              Single Subreddit
            </Link>
            <Link
              href="/multi"
              className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
            >
              Multi-Subreddit
            </Link>
          </div>

          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900">Reddit Posts Viewer</h1>
            <p className="mt-2 text-sm text-gray-600">
              Real-time Reddit data with comments and replies
            </p>
          </header>
          <ConfigForm mode="single" />
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
                  <p className="mt-2 text-sm font-medium text-red-800">Available Parameters:</p>
                  <ul className="mt-1 list-inside list-disc text-xs text-red-700">
                    <li>
                      <code className="rounded bg-red-100 px-1 py-0.5 font-mono">subreddit</code>
                      {' '}
                      - Subreddit name (required)
                    </li>
                    <li>
                      <code className="rounded bg-red-100 px-1 py-0.5 font-mono">apiKey</code>
                      {' '}
                      - API key (default: secret)
                    </li>
                    <li>
                      <code className="rounded bg-red-100 px-1 py-0.5 font-mono">maxPosts</code>
                      {' '}
                      - Max posts to fetch (default: 10)
                    </li>
                    <li>
                      <code className="rounded bg-red-100 px-1 py-0.5 font-mono">maxComments</code>
                      {' '}
                      - Max comments per post (default: 10)
                    </li>
                    <li>
                      <code className="rounded bg-red-100 px-1 py-0.5 font-mono">minimumCommentScore</code>
                      {' '}
                      - Min comment score (default: 3)
                    </li>
                    <li>
                      <code className="rounded bg-red-100 px-1 py-0.5 font-mono">minimumPostScore</code>
                      {' '}
                      - Min post score (default: 5)
                    </li>
                    <li>
                      <code className="rounded bg-red-100 px-1 py-0.5 font-mono">limit</code>
                      {' '}
                      - Limit (default: 25)
                    </li>
                  </ul>
                  <p className="mt-3 text-sm font-medium text-red-800">Example:</p>
                  <code className="mt-1 block rounded bg-red-100 px-3 py-2 font-mono text-xs text-red-700">
                    ?subreddit=ClaudeAI&maxPosts=10&maxComments=10&minimumCommentScore=3&minimumPostScore=5&limit=25&apiKey=secret
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
      maxPosts: params.maxPosts ? Number.parseInt(params.maxPosts, 10) : undefined,
      maxComments: params.maxComments ? Number.parseInt(params.maxComments, 10) : undefined,
      minimumCommentScore: params.minimumCommentScore ? Number.parseInt(params.minimumCommentScore, 10) : undefined,
      minimumPostScore: params.minimumPostScore ? Number.parseInt(params.minimumPostScore, 10) : undefined,
      limit: params.limit ? Number.parseInt(params.limit, 10) : undefined,
    });

    const subtitle = `${data.config.maxPosts} posts · ${data.config.maxComments} max comments · min comment score ${data.config.minimumCommentScore} · min post score ${data.config.minimumPostScore} · limit ${data.config.limit}`;

    return (
      <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-4 flex justify-center gap-4">
            <Link
              href="/"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white"
            >
              Single Subreddit
            </Link>
            <Link
              href="/multi"
              className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
            >
              Multi-Subreddit
            </Link>
          </div>

          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900">Reddit Posts Viewer</h1>
            <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
          </header>
          <ConfigForm mode="single" />
          <SingleSubredditStats data={data} />
          <PostNavigation posts={data.posts} />
          {data.posts.map((post, index) => (
            <Post key={post.permalink} post={post} index={index} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-4 flex justify-center gap-4">
            <Link
              href="/"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white"
            >
              Single Subreddit
            </Link>
            <Link
              href="/multi"
              className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
            >
              Multi-Subreddit
            </Link>
          </div>

          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900">Reddit Posts Viewer</h1>
            <p className="mt-2 text-sm text-gray-600">
              r/
              {subreddit}
            </p>
          </header>
          <ConfigForm mode="single" />
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

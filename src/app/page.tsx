import Link from 'next/link';
import { CollapsibleSection } from '@/components/CollapsibleSection';
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
  view?: string;
};

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const subreddit = params.subreddit || params.channel;
  const isSimpleView = params.view === 'simple';

  if (!subreddit) {
    return (
      <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {!isSimpleView && (
            <div className="mb-6 flex justify-center gap-4">
              <Link
                href="/"
                className="rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-cyan-500 hover:to-blue-500"
                style={{ minHeight: '44px' }}
              >
                Single Subreddit
              </Link>
              <Link
                href="/multi"
                className="rounded-lg border border-slate-600 bg-slate-800 px-6 py-3 font-semibold text-slate-300 transition-all duration-200 hover:border-slate-500 hover:bg-slate-700"
                style={{ minHeight: '44px' }}
              >
                Multi-Subreddit
              </Link>
            </div>
          )}

          <header className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-slate-100 sm:text-5xl">Reddit Posts Viewer</h1>
            <p className="mt-3 text-base text-slate-400">
              Real-time Reddit data with comments and replies
            </p>
          </header>

          {!isSimpleView && <ConfigForm mode="single" />}
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 shadow-xl">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-base font-bold text-red-300">Parameter Missing</h3>
                <p className="mt-2 text-sm text-red-200">
                  Required parameter missing:
                  {' '}
                  <code className="rounded-lg bg-red-500/20 px-2 py-1 font-mono text-xs text-red-300">subreddit</code>
                  {' '}
                  or
                  {' '}
                  <code className="rounded-lg bg-red-500/20 px-2 py-1 font-mono text-xs text-red-300">channel</code>
                </p>
                <div className="mt-4">
                  <p className="text-sm font-bold text-red-300">Usage:</p>
                  <p className="mt-1 text-sm text-red-200">
                    Add
                    {' '}
                    <code className="rounded-lg bg-red-500/20 px-2 py-1 font-mono text-xs text-red-300">
                      ?subreddit=SUBREDDIT_NAME
                    </code>
                    {' '}
                    to the URL
                  </p>
                  <p className="mt-3 text-sm font-bold text-red-300">Available Parameters:</p>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-red-200">
                    <li>
                      <code className="rounded-lg bg-red-500/20 px-1.5 py-0.5 font-mono text-xs text-red-300">subreddit</code>
                      {' '}
                      - Subreddit name (required)
                    </li>
                    <li>
                      <code className="rounded-lg bg-red-500/20 px-1.5 py-0.5 font-mono text-xs text-red-300">apiKey</code>
                      {' '}
                      - API key (default: secret)
                    </li>
                    <li>
                      <code className="rounded-lg bg-red-500/20 px-1.5 py-0.5 font-mono text-xs text-red-300">maxPosts</code>
                      {' '}
                      - Max posts to fetch (default: 10)
                    </li>
                    <li>
                      <code className="rounded-lg bg-red-500/20 px-1.5 py-0.5 font-mono text-xs text-red-300">maxComments</code>
                      {' '}
                      - Max comments per post (default: 10)
                    </li>
                    <li>
                      <code className="rounded-lg bg-red-500/20 px-1.5 py-0.5 font-mono text-xs text-red-300">minimumCommentScore</code>
                      {' '}
                      - Min comment score (default: 3)
                    </li>
                    <li>
                      <code className="rounded-lg bg-red-500/20 px-1.5 py-0.5 font-mono text-xs text-red-300">minimumPostScore</code>
                      {' '}
                      - Min post score (default: 5)
                    </li>
                    <li>
                      <code className="rounded-lg bg-red-500/20 px-1.5 py-0.5 font-mono text-xs text-red-300">limit</code>
                      {' '}
                      - Limit (default: 25)
                    </li>
                  </ul>
                  <p className="mt-4 text-sm font-bold text-red-300">Example:</p>
                  <code className="mt-2 block rounded-lg bg-red-500/20 px-4 py-3 font-mono text-xs text-red-300">
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
          {!isSimpleView && (
            <div className="mb-6 flex justify-center gap-4">
              <Link
                href="/"
                className="rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-cyan-500 hover:to-blue-500"
                style={{ minHeight: '44px' }}
              >
                Single Subreddit
              </Link>
              <Link
                href="/multi"
                className="rounded-lg border border-slate-600 bg-slate-800 px-6 py-3 font-semibold text-slate-300 transition-all duration-200 hover:border-slate-500 hover:bg-slate-700"
                style={{ minHeight: '44px' }}
              >
                Multi-Subreddit
              </Link>
            </div>
          )}

          <header className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-slate-100 sm:text-5xl">Reddit Posts Viewer</h1>
            <p className="mt-3 text-base text-slate-400">{subtitle}</p>
          </header>

          {isSimpleView
            ? (
                <>
                  <PostNavigation posts={data.posts} />
                </>
              )
            : (
                <>
                  <CollapsibleSection title="Configuration Form" defaultCollapsed>
                    <ConfigForm mode="single" />
                  </CollapsibleSection>

                  <CollapsibleSection title="Statistics" defaultCollapsed>
                    <SingleSubredditStats data={data} />
                  </CollapsibleSection>

                  <PostNavigation posts={data.posts} />
                </>
              )}

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
          {!isSimpleView && (
            <div className="mb-6 flex justify-center gap-4">
              <Link
                href="/"
                className="rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-cyan-500 hover:to-blue-500"
                style={{ minHeight: '44px' }}
              >
                Single Subreddit
              </Link>
              <Link
                href="/multi"
                className="rounded-lg border border-slate-600 bg-slate-800 px-6 py-3 font-semibold text-slate-300 transition-all duration-200 hover:border-slate-500 hover:bg-slate-700"
                style={{ minHeight: '44px' }}
              >
                Multi-Subreddit
              </Link>
            </div>
          )}

          <header className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-slate-100 sm:text-5xl">Reddit Posts Viewer</h1>
            <p className="mt-3 text-base text-slate-400">
              r/
              {subreddit}
            </p>
          </header>

          {!isSimpleView && <ConfigForm mode="single" />}
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 shadow-xl">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-base font-bold text-red-300">Error Loading Reddit Data</h3>
                <p className="mt-2 text-sm text-red-200">
                  {error instanceof Error ? error.message : 'Unknown error occurred'}
                </p>
                <p className="mt-4 text-sm text-red-200">
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

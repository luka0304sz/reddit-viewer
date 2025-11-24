import Link from 'next/link';
import { CollapsibleSection } from '@/components/CollapsibleSection';
import { ConfigForm } from '@/components/ConfigForm';
import { MultiNavigation } from '@/components/MultiNavigation';
import { ParamDocs } from '@/components/ParamDocs';
import { Stats } from '@/components/Stats';
import { SubredditSection } from '@/components/SubredditSection';
import { fetchMultiSubredditData } from '@/services/reddit';

type SearchParams = {
  subreddits?: string;
  apiKey?: string;
  hoursBack?: string;
  limit?: string;
  maxPosts?: string;
  maxComments?: string;
  minimumPostScore?: string;
  minimumCommentScore?: string;
  postZScoreThreshold?: string;
  commentZScoreThreshold?: string;
  maxPostsLimit?: string;
  maxCommentsLimit?: string;
  view?: string;
};

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function MultiSubredditPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const subredditsParam = params.subreddits;
  const isSimpleView = params.view === 'simple';

  if (!subredditsParam) {
    return (
      <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {!isSimpleView && (
            <div className="mb-6 flex justify-center gap-4">
              <Link
                href="/"
                className="rounded-lg border border-slate-600 bg-slate-800 px-6 py-3 font-semibold text-slate-300 transition-all duration-200 hover:border-slate-500 hover:bg-slate-700"
                style={{ minHeight: '44px' }}
              >
                Single Subreddit
              </Link>
              <Link
                href="/multi"
                className="rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-cyan-500 hover:to-blue-500"
                style={{ minHeight: '44px' }}
              >
                Multi-Subreddit
              </Link>
            </div>
          )}

          <header className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-slate-100 sm:text-5xl">Reddit Multi-Subreddit Viewer</h1>
            <p className="mt-3 text-base text-slate-400">
              Intelligent content aggregation from multiple subreddits using adaptive z-score selection
            </p>
          </header>

          {!isSimpleView && (
            <>
              <ParamDocs />
              <ConfigForm mode="multi" />
            </>
          )}

          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 shadow-xl">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-base font-bold text-red-300">Parameter Missing</h3>
                <p className="mt-2 text-sm text-red-200">
                  Required parameter missing:
                  {' '}
                  <code className="rounded-lg bg-red-500/20 px-2 py-1 font-mono text-xs text-red-300">subreddits</code>
                </p>
                <div className="mt-4">
                  <p className="text-sm font-bold text-red-300">Usage:</p>
                  <p className="mt-1 text-sm text-red-200">
                    Add
                    {' '}
                    <code className="rounded-lg bg-red-500/20 px-2 py-1 font-mono text-xs text-red-300">
                      ?subreddits=SUBREDDIT1,SUBREDDIT2
                    </code>
                    {' '}
                    to the URL
                  </p>
                  <p className="mt-4 text-sm font-bold text-red-300">Example:</p>
                  <code className="mt-2 block rounded-lg bg-red-500/20 px-4 py-3 font-mono text-xs text-red-300">
                    ?subreddits=ClaudeAI,programming,linux&maxPosts=2&maxComments=10
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
    const subreddits = subredditsParam.split(',').map(s => s.trim()).filter(Boolean);

    if (subreddits.length === 0) {
      throw new Error('No valid subreddits provided');
    }

    const data = await fetchMultiSubredditData({
      subreddits,
      apiKey: params.apiKey,
      hoursBack: params.hoursBack ? Number.parseInt(params.hoursBack, 10) : undefined,
      limit: params.limit ? Number.parseInt(params.limit, 10) : undefined,
      maxPosts: params.maxPosts ? Number.parseInt(params.maxPosts, 10) : undefined,
      maxComments: params.maxComments ? Number.parseInt(params.maxComments, 10) : undefined,
      minimumPostScore: params.minimumPostScore ? Number.parseInt(params.minimumPostScore, 10) : undefined,
      minimumCommentScore: params.minimumCommentScore ? Number.parseInt(params.minimumCommentScore, 10) : undefined,
      postZScoreThreshold: params.postZScoreThreshold ? Number.parseFloat(params.postZScoreThreshold) : undefined,
      commentZScoreThreshold: params.commentZScoreThreshold ? Number.parseFloat(params.commentZScoreThreshold) : undefined,
      maxPostsLimit: params.maxPostsLimit ? Number.parseInt(params.maxPostsLimit, 10) : undefined,
      maxCommentsLimit: params.maxCommentsLimit ? Number.parseInt(params.maxCommentsLimit, 10) : undefined,
    });

    const subtitle = `${data.totalSubreddits} subreddits · ${data.config.hoursBack}h back · ${data.config.maxPosts} base posts · ${data.config.maxComments} base comments · z-score ≥${data.config.postZScoreThreshold}`;

    return (
      <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {!isSimpleView && (
            <div className="mb-6 flex justify-center gap-4">
              <Link
                href="/"
                className="rounded-lg border border-slate-600 bg-slate-800 px-6 py-3 font-semibold text-slate-300 transition-all duration-200 hover:border-slate-500 hover:bg-slate-700"
                style={{ minHeight: '44px' }}
              >
                Single Subreddit
              </Link>
              <Link
                href="/multi"
                className="rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-cyan-500 hover:to-blue-500"
                style={{ minHeight: '44px' }}
              >
                Multi-Subreddit
              </Link>
            </div>
          )}

          <header className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-slate-100 sm:text-5xl">Reddit Multi-Subreddit Viewer</h1>
            <p className="mt-3 text-base text-slate-400">{subtitle}</p>
          </header>

          {isSimpleView
            ? (
                <>
                  <MultiNavigation data={data} />
                </>
              )
            : (
                <>
                  <CollapsibleSection title="Query Parameters Reference" defaultCollapsed>
                    <ParamDocs />
                  </CollapsibleSection>

                  <CollapsibleSection title="Configuration Form" defaultCollapsed>
                    <ConfigForm mode="multi" />
                  </CollapsibleSection>

                  <CollapsibleSection title="Statistics" defaultCollapsed>
                    <Stats data={data} />
                  </CollapsibleSection>

                  <MultiNavigation data={data} />
                </>
              )}

          {data.subreddits.length === 0 && (
            <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-6 text-center shadow-xl">
              <p className="text-base font-semibold text-yellow-300">No posts found matching the criteria.</p>
            </div>
          )}

          {data.subreddits.map((subreddit, srIndex) => (
            <SubredditSection key={subreddit.subreddit} subreddit={subreddit} index={srIndex} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {!isSimpleView && (
            <div className="mb-6 flex justify-center gap-4">
              <Link
                href="/"
                className="rounded-lg border border-slate-600 bg-slate-800 px-6 py-3 font-semibold text-slate-300 transition-all duration-200 hover:border-slate-500 hover:bg-slate-700"
                style={{ minHeight: '44px' }}
              >
                Single Subreddit
              </Link>
              <Link
                href="/multi"
                className="rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-cyan-500 hover:to-blue-500"
                style={{ minHeight: '44px' }}
              >
                Multi-Subreddit
              </Link>
            </div>
          )}

          <header className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-slate-100 sm:text-5xl">Reddit Multi-Subreddit Viewer</h1>
            <p className="mt-3 text-base text-slate-400">Error loading data</p>
          </header>

          {!isSimpleView && (
            <>
              <ParamDocs />
              <ConfigForm mode="multi" />
            </>
          )}

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
                  Please try again or check the subreddit names.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

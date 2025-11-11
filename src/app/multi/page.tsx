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
            <div className="mb-4 flex justify-center gap-4">
              <Link
                href="/"
                className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
              >
                Single Subreddit
              </Link>
              <Link
                href="/multi"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white"
              >
                Multi-Subreddit
              </Link>
            </div>
          )}

          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900">Reddit Multi-Subreddit Viewer</h1>
            <p className="mt-2 text-sm text-gray-600">
              Intelligent content aggregation from multiple subreddits using adaptive z-score selection
            </p>
          </header>

          {!isSimpleView && (
            <>
              <ParamDocs />
              <ConfigForm mode="multi" />
            </>
          )}

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
                  <code className="rounded bg-red-100 px-1.5 py-0.5 font-mono text-xs">subreddits</code>
                </p>
                <div className="mt-4">
                  <p className="text-sm font-medium text-red-800">Usage:</p>
                  <p className="mt-1 text-sm text-red-700">
                    Add
                    {' '}
                    <code className="rounded bg-red-100 px-1.5 py-0.5 font-mono text-xs">
                      ?subreddits=SUBREDDIT1,SUBREDDIT2
                    </code>
                    {' '}
                    to the URL
                  </p>
                  <p className="mt-3 text-sm font-medium text-red-800">Example:</p>
                  <code className="mt-1 block rounded bg-red-100 px-3 py-2 font-mono text-xs text-red-700">
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
            <div className="mb-4 flex justify-center gap-4">
              <Link
                href="/"
                className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
              >
                Single Subreddit
              </Link>
              <Link
                href="/multi"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white"
              >
                Multi-Subreddit
              </Link>
            </div>
          )}

          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900">Reddit Multi-Subreddit Viewer</h1>
            <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
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
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6 text-center shadow-sm">
              <p className="text-yellow-800">No posts found matching the criteria.</p>
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
            <div className="mb-4 flex justify-center gap-4">
              <Link
                href="/"
                className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
              >
                Single Subreddit
              </Link>
              <Link
                href="/multi"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white"
              >
                Multi-Subreddit
              </Link>
            </div>
          )}

          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900">Reddit Multi-Subreddit Viewer</h1>
            <p className="mt-2 text-sm text-gray-600">Error loading data</p>
          </header>

          {!isSimpleView && (
            <>
              <ParamDocs />
              <ConfigForm mode="multi" />
            </>
          )}

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

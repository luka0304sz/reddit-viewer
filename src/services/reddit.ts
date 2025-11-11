import type { MultiSubredditRequest, MultiSubredditResponse, RedditApiResponse, RedditFetchParams } from '@/types/reddit';

const API_BASE_URL = 'https://helper.lnservice.online/api/v1/reddit/fetch';
const API_MULTI_URL = 'https://helper.lnservice.online/api/v1/reddit/fetch-multi';

export async function fetchRedditData(params: RedditFetchParams): Promise<RedditApiResponse> {
  const {
    subreddit,
    apiKey = 'secret',
    maxPosts = 10,
    maxComments = 10,
    minimumCommentScore = 3,
    minimumPostScore = 5,
    limit = 25,
  } = params;

  const url = new URL(API_BASE_URL);
  url.searchParams.set('subreddit', subreddit);
  url.searchParams.set('apiKey', apiKey);
  url.searchParams.set('maxPosts', maxPosts.toString());
  url.searchParams.set('maxComments', maxComments.toString());
  url.searchParams.set('minimumCommentScore', minimumCommentScore.toString());
  url.searchParams.set('minimumPostScore', minimumPostScore.toString());
  url.searchParams.set('limit', limit.toString());

  const response = await fetch(url.toString(), {
    next: { revalidate: 300 }, // Cache for 5 minutes
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Reddit data: ${response.status} ${response.statusText}`);
  }

  const data: RedditApiResponse = await response.json();

  if (!data.success) {
    throw new Error(data.message || 'API returned error');
  }

  return data;
}

export async function fetchMultiSubredditData(params: MultiSubredditRequest): Promise<MultiSubredditResponse> {
  const {
    subreddits,
    apiKey = 'secret',
    hoursBack = 24,
    limit = 10,
    maxPosts = 2,
    maxComments = 10,
    minimumPostScore,
    minimumCommentScore,
    postZScoreThreshold = 0.7,
    commentZScoreThreshold = 0.7,
    maxPostsLimit = 5,
    maxCommentsLimit = 20,
    refreshCache = false,
  } = params;

  const requestBody = {
    subreddits,
    hoursBack,
    limit,
    maxPosts,
    maxComments,
    ...(minimumPostScore !== undefined && { minimumPostScore }),
    ...(minimumCommentScore !== undefined && { minimumCommentScore }),
    postZScoreThreshold,
    commentZScoreThreshold,
    maxPostsLimit,
    maxCommentsLimit,
    refreshCache,
  };

  const response = await fetch(API_MULTI_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': apiKey,
    },
    body: JSON.stringify(requestBody),
    next: { revalidate: 3600 }, // Cache for 1 hour (API caches for 1 hour)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to fetch multi-subreddit data: ${response.status} ${response.statusText}`);
  }

  const data: MultiSubredditResponse = await response.json();

  if (!data.success) {
    throw new Error('API returned error');
  }

  return data;
}

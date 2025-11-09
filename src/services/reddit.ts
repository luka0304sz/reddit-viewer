import type { RedditApiResponse, RedditFetchParams } from '@/types/reddit';

const API_BASE_URL = 'https://helper.lnservice.online/api/v1/reddit/fetch';

export async function fetchRedditData(params: RedditFetchParams): Promise<RedditApiResponse> {
  const {
    subreddit,
    apiKey = 'secret',
    topPostsCount = 25,
    maxComments = 100,
    minimumCommentScore = 1,
  } = params;

  const url = new URL(API_BASE_URL);
  url.searchParams.set('subreddit', subreddit);
  url.searchParams.set('apiKey', apiKey);
  url.searchParams.set('topPostsCount', topPostsCount.toString());
  url.searchParams.set('maxComments', maxComments.toString());
  url.searchParams.set('minimumCommentScore', minimumCommentScore.toString());

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

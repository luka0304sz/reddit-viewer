import type { RedditApiResponse, RedditFetchParams } from '@/types/reddit';

const API_BASE_URL = 'https://helper.lnservice.online/api/v1/reddit/fetch';

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

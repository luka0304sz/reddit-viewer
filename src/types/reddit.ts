export interface RedditComment {
  author: string;
  body: string;
  score: number;
  created: string;
  replies: RedditComment[];
}

export interface RedditPost {
  title: string;
  author: string;
  score: number;
  numComments?: number;
  url: string;
  permalink: string;
  created: string;
  created_timestamp: number;
  selftext: string;
  comments: RedditComment[];
  commentsAllCnt: number;
  commentsFilteredCnt: number;
}

export interface RedditConfig {
  subreddit: string;
  apiKey: string;
  topPostsCount: number;
  maxPosts: number;
  maxComments: number;
  minimumCommentScore: number;
  minimumPostScore: number;
  limit: number;
  hoursBack: number;
}

export interface RedditStats {
  postsAllCnt: number;
  postsFilteredCnt: number;
}

export interface RedditApiResponse {
  success: boolean;
  message?: string;
  subreddit: string;
  posts: RedditPost[];
  stats: RedditStats;
  config: RedditConfig;
  fromCache: boolean;
  cachedAt?: string;
  cacheAgeMinutes?: number;
  filePath?: string;
}

export interface RedditFetchParams {
  subreddit: string;
  apiKey?: string;
  maxPosts?: number;
  maxComments?: number;
  minimumCommentScore?: number;
  minimumPostScore?: number;
  limit?: number;
}

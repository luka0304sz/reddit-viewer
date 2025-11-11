export type RedditComment = {
  author: string;
  body: string;
  score: number;
  created: string;
  replies: RedditComment[];
};

export type RedditPost = {
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
  zScore?: number;
  stats?: {
    commentsAllCnt: number;
    commentsFilteredCnt: number;
    commentScoreStats: ScoreStatistics;
  };
};

export type ScoreStatistics = {
  mean: number;
  stdDev: number;
  min: number;
  max: number;
  count: number;
};

export type RedditConfig = {
  subreddit: string;
  apiKey: string;
  topPostsCount: number;
  maxPosts: number;
  maxComments: number;
  minimumCommentScore: number;
  minimumPostScore: number;
  limit: number;
  hoursBack: number;
};

export type RedditStats = {
  postsAllCnt: number;
  postsFilteredCnt: number;
  postScoreStats?: ScoreStatistics;
};

export type RedditApiResponse = {
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
};

export type RedditFetchParams = {
  subreddit: string;
  apiKey?: string;
  maxPosts?: number;
  maxComments?: number;
  minimumCommentScore?: number;
  minimumPostScore?: number;
  limit?: number;
};

// Multi-subreddit types
export type MultiSubredditRequest = {
  subreddits: string[];
  apiKey?: string;
  hoursBack?: number;
  limit?: number;
  maxPosts?: number;
  maxComments?: number;
  minimumPostScore?: number;
  minimumCommentScore?: number;
  postZScoreThreshold?: number;
  commentZScoreThreshold?: number;
  maxPostsLimit?: number;
  maxCommentsLimit?: number;
  refreshCache?: boolean;
};

export type SubredditResult = {
  subreddit: string;
  fromCache: boolean;
  cachedAt: string;
  cacheAgeMinutes: number;
  filePath: string;
  stats: RedditStats;
  posts: RedditPost[];
};

export type MultiSubredditResponse = {
  success: boolean;
  totalSubreddits: number;
  config: {
    hoursBack: number;
    limit: number;
    maxPosts: number;
    maxComments: number;
    postZScoreThreshold: number;
    commentZScoreThreshold: number;
    maxPostsLimit: number;
    maxCommentsLimit: number;
    refreshCache: boolean;
  };
  subreddits: SubredditResult[];
};

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
  numComments: number;
  url: string;
  permalink: string;
  created: string;
  selftext: string;
  comments: RedditComment[];
}

export interface RedditConfig {
  subreddit: string;
  apiKey: string;
  topPostsCount: number;
  maxComments: number;
  minimumCommentScore: number;
  hoursBack: number;
}

export interface RedditStats {
  returnedPosts: number;
  postsWithComments: number;
}

export interface RedditApiResponse {
  success: boolean;
  message?: string;
  subreddit: string;
  posts: RedditPost[];
  stats: RedditStats;
  config: RedditConfig;
  fromCache: boolean;
}

export interface RedditFetchParams {
  subreddit: string;
  apiKey?: string;
  topPostsCount?: number;
  maxComments?: number;
  minimumCommentScore?: number;
}

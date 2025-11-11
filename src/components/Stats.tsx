import type { MultiSubredditResponse } from '@/types/reddit';

type StatsProps = {
  data: MultiSubredditResponse;
};

export function Stats({ data }: StatsProps) {
  const totalPosts = data.subreddits.reduce((sum, sr) => sum + sr.posts.length, 0);
  const totalPostsAll = data.subreddits.reduce((sum, sr) => sum + sr.stats.postsAllCnt, 0);
  const totalCached = data.subreddits.filter(sr => sr.fromCache).length;

  const stats = [
    { label: 'Subreddits', value: data.totalSubreddits },
    { label: 'Posts (Filtered)', value: totalPosts },
    { label: 'Posts (All)', value: totalPostsAll },
    { label: 'Max Posts/Sub', value: data.config.maxPostsLimit },
    { label: 'Max Comments', value: data.config.maxCommentsLimit },
    { label: 'Hours Back', value: `${data.config.hoursBack}h` },
    { label: 'Post Z-Score', value: `≥${data.config.postZScoreThreshold}` },
    { label: 'Comment Z-Score', value: `≥${data.config.commentZScoreThreshold}` },
    { label: 'Cached', value: `${totalCached}/${data.totalSubreddits}` },
  ];

  return (
    <div className="mb-8">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map(stat => (
          <div
            key={stat.label}
            className="rounded-lg border border-gray-200 bg-white p-3 text-center shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="text-xs font-medium tracking-wide text-gray-500 uppercase">
              {stat.label}
            </div>
            <div className="mt-1 text-2xl font-bold text-orange-600">{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

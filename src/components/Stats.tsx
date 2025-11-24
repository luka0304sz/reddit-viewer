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
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map(stat => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-700 bg-slate-900 p-4 text-center shadow-xl transition-all duration-200 hover:border-cyan-500/50 hover:shadow-2xl"
          >
            <div className="text-xs font-bold tracking-wider text-slate-400 uppercase">
              {stat.label}
            </div>
            <div className="mt-2 text-2xl font-bold text-cyan-400">{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

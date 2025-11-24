import type { RedditApiResponse } from '@/types/reddit';

type StatsProps = {
  data: RedditApiResponse;
};

export function SingleSubredditStats({ data }: StatsProps) {
  const stats = [
    { label: 'Posts (All)', value: data.stats.postsAllCnt },
    { label: 'Posts (Filtered)', value: data.stats.postsFilteredCnt },
    { label: 'Max Comments', value: data.config.maxComments },
    { label: 'Min Score', value: data.config.minimumCommentScore },
    { label: 'Hours Back', value: `${data.config.hoursBack}h` },
    { label: 'Source', value: data.fromCache ? `Cache (${data.cacheAgeMinutes}m)` : 'Fresh' },
  ];

  return (
    <div className="mb-8">
      <h2 className="mb-6 text-center text-2xl font-bold text-slate-100 sm:text-3xl">
        r/
        {data.subreddit}
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
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

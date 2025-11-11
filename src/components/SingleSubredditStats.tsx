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
      <h2 className="mb-4 text-center text-2xl font-bold text-gray-900">
        r/
        {data.subreddit}
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
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

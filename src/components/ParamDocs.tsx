export function ParamDocs() {
  const params = [
    {
      name: 'subreddits',
      type: 'string (comma-separated)',
      required: true,
      default: '-',
      description: 'List of subreddit names to fetch',
      example: 'ClaudeAI, programming, linux',
    },
    {
      name: 'apiKey',
      type: 'string',
      required: false,
      default: 'secret',
      description: 'API key for authentication',
    },
    {
      name: 'hoursBack',
      type: 'number',
      required: false,
      default: '24',
      description: 'How many hours back to fetch posts',
    },
    {
      name: 'limit',
      type: 'number',
      required: false,
      default: '10',
      description: 'Number of top posts to fetch per subreddit',
      max: '100',
    },
    {
      name: 'maxPosts',
      type: 'number',
      required: false,
      default: '2',
      description: 'Base number of posts to return per subreddit',
    },
    {
      name: 'maxComments',
      type: 'number',
      required: false,
      default: '10',
      description: 'Base number of comments to return per post',
    },
    {
      name: 'maxPostsLimit',
      type: 'number',
      required: false,
      default: '5',
      description: 'Maximum posts per subreddit (including z-score additions)',
    },
    {
      name: 'maxCommentsLimit',
      type: 'number',
      required: false,
      default: '20',
      description: 'Maximum comments per post (including z-score additions)',
    },
    {
      name: 'postZScoreThreshold',
      type: 'number',
      required: false,
      default: '0.7',
      description: 'Z-score threshold for post selection (0.7 ≈ 75th percentile)',
    },
    {
      name: 'commentZScoreThreshold',
      type: 'number',
      required: false,
      default: '0.7',
      description: 'Z-score threshold for comment selection',
    },
    {
      name: 'minimumPostScore',
      type: 'number',
      required: false,
      default: '-',
      description: 'Absolute minimum score for posts (optional)',
    },
    {
      name: 'minimumCommentScore',
      type: 'number',
      required: false,
      default: '-',
      description: 'Absolute minimum score for comments (optional)',
    },
  ];

  return (
    <div className="mb-8 rounded-xl border border-cyan-500/30 bg-slate-900 p-6 shadow-xl">
      <h2 className="mb-6 text-xl font-bold text-slate-100">
        Query Parameters Reference
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-slate-700">
              <th className="pb-3 text-left font-bold text-slate-200">Parameter</th>
              <th className="pb-3 text-left font-bold text-slate-200">Type</th>
              <th className="pb-3 text-left font-bold text-slate-200">Default</th>
              <th className="pb-3 text-left font-bold text-slate-200">Description</th>
            </tr>
          </thead>
          <tbody>
            {params.map(param => (
              <tr key={param.name} className="border-b border-slate-800">
                <td className="py-3 pr-4">
                  <code className="rounded-lg bg-cyan-500/20 px-2.5 py-1 font-mono text-xs text-cyan-300">
                    {param.name}
                  </code>
                  {param.required && (
                    <span className="ml-1.5 text-xs text-red-400">*</span>
                  )}
                </td>
                <td className="py-3 pr-4 text-slate-400">{param.type}</td>
                <td className="py-3 pr-4">
                  <code className="rounded-lg bg-slate-800 px-2.5 py-1 font-mono text-xs text-slate-300">
                    {param.default}
                  </code>
                </td>
                <td className="py-3 text-slate-300">
                  {param.description}
                  {param.example && (
                    <div className="mt-1.5 text-xs">
                      Example:
                      {' '}
                      <code className="rounded-lg bg-slate-800 px-2 py-0.5 font-mono text-slate-400">
                        {param.example}
                      </code>
                    </div>
                  )}
                  {param.max && (
                    <span className="ml-1.5 text-xs text-slate-500">
                      (max:
                      {param.max}
                      )
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 rounded-lg border border-slate-700 bg-slate-800/50 p-4 text-sm text-slate-300">
        <p className="font-bold text-slate-200">Understanding Z-Scores:</p>
        <ul className="mt-2 ml-5 list-disc space-y-1.5">
          <li>
            Z-score = 0.0: Average (50th percentile)
          </li>
          <li>
            Z-score = 1.0: Better than 84% of posts (84th percentile)
          </li>
          <li>
            Z-score = 1.5: Better than 93% of posts (93rd percentile)
          </li>
          <li>
            Z-score = 2.0: Better than 97% of posts (very hot!)
          </li>
        </ul>
        <p className="mt-3">
          Z-scores normalize popularity across different subreddit sizes. A post with 50 upvotes might be "hot" in a small subreddit but insignificant in a large one.
        </p>
      </div>
    </div>
  );
}

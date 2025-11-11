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
    <div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-blue-900">
        Query Parameters Reference
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-blue-300">
              <th className="pb-2 text-left font-semibold text-blue-900">Parameter</th>
              <th className="pb-2 text-left font-semibold text-blue-900">Type</th>
              <th className="pb-2 text-left font-semibold text-blue-900">Default</th>
              <th className="pb-2 text-left font-semibold text-blue-900">Description</th>
            </tr>
          </thead>
          <tbody>
            {params.map(param => (
              <tr key={param.name} className="border-b border-blue-200">
                <td className="py-2 pr-4">
                  <code className="rounded bg-blue-100 px-2 py-1 font-mono text-xs text-blue-800">
                    {param.name}
                  </code>
                  {param.required && (
                    <span className="ml-1 text-xs text-red-600">*</span>
                  )}
                </td>
                <td className="py-2 pr-4 text-blue-700">{param.type}</td>
                <td className="py-2 pr-4">
                  <code className="rounded bg-blue-100 px-2 py-1 font-mono text-xs text-blue-800">
                    {param.default}
                  </code>
                </td>
                <td className="py-2 text-blue-700">
                  {param.description}
                  {param.example && (
                    <div className="mt-1 text-xs">
                      Example:
                      {' '}
                      <code className="rounded bg-blue-100 px-1 py-0.5 font-mono">
                        {param.example}
                      </code>
                    </div>
                  )}
                  {param.max && (
                    <span className="ml-1 text-xs">
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
      <div className="mt-4 text-xs text-blue-700">
        <p className="font-semibold">Understanding Z-Scores:</p>
        <ul className="mt-1 ml-4 list-disc space-y-1">
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
        <p className="mt-2">
          Z-scores normalize popularity across different subreddit sizes. A post with 50 upvotes might be "hot" in a small subreddit but insignificant in a large one.
        </p>
      </div>
    </div>
  );
}

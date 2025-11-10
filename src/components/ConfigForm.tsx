'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export function ConfigForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [subreddit, setSubreddit] = useState(searchParams.get('subreddit') || searchParams.get('channel') || '');
  const [apiKey, setApiKey] = useState(searchParams.get('apiKey') || 'secret');
  const [maxPosts, setMaxPosts] = useState(searchParams.get('maxPosts') || '10');
  const [maxComments, setMaxComments] = useState(searchParams.get('maxComments') || '10');
  const [minimumCommentScore, setMinimumCommentScore] = useState(searchParams.get('minimumCommentScore') || '3');
  const [minimumPostScore, setMinimumPostScore] = useState(searchParams.get('minimumPostScore') || '5');
  const [limit, setLimit] = useState(searchParams.get('limit') || '25');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (subreddit)
      params.set('subreddit', subreddit);
    if (apiKey)
      params.set('apiKey', apiKey);
    if (maxPosts)
      params.set('maxPosts', maxPosts);
    if (maxComments)
      params.set('maxComments', maxComments);
    if (minimumCommentScore)
      params.set('minimumCommentScore', minimumCommentScore);
    if (minimumPostScore)
      params.set('minimumPostScore', minimumPostScore);
    if (limit)
      params.set('limit', limit);

    router.push(`/?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="config-form">
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="subreddit">Subreddit</label>
          <input
            id="subreddit"
            type="text"
            value={subreddit}
            onChange={e => setSubreddit(e.target.value)}
            placeholder="ClaudeAI"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="apiKey">API Key</label>
          <input
            id="apiKey"
            type="text"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            placeholder="secret"
          />
        </div>

        <div className="form-field">
          <label htmlFor="maxPosts">Max Posts</label>
          <input
            id="maxPosts"
            type="number"
            value={maxPosts}
            onChange={e => setMaxPosts(e.target.value)}
            min="1"
            max="100"
          />
        </div>

        <div className="form-field">
          <label htmlFor="maxComments">Max Comments</label>
          <input
            id="maxComments"
            type="number"
            value={maxComments}
            onChange={e => setMaxComments(e.target.value)}
            min="1"
            max="500"
          />
        </div>

        <div className="form-field">
          <label htmlFor="minimumCommentScore">Min Comment Score</label>
          <input
            id="minimumCommentScore"
            type="number"
            value={minimumCommentScore}
            onChange={e => setMinimumCommentScore(e.target.value)}
            min="0"
          />
        </div>

        <div className="form-field">
          <label htmlFor="minimumPostScore">Min Post Score</label>
          <input
            id="minimumPostScore"
            type="number"
            value={minimumPostScore}
            onChange={e => setMinimumPostScore(e.target.value)}
            min="0"
          />
        </div>

        <div className="form-field">
          <label htmlFor="limit">Limit</label>
          <input
            id="limit"
            type="number"
            value={limit}
            onChange={e => setLimit(e.target.value)}
            min="1"
            max="100"
          />
        </div>
      </div>

      <button type="submit" className="submit-btn">
        Update Configuration
      </button>
    </form>
  );
}

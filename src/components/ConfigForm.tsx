'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export function ConfigForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [subreddits, setSubreddits] = useState(searchParams.get('subreddits') || '');
  const [apiKey, setApiKey] = useState(searchParams.get('apiKey') || 'secret');
  const [hoursBack, setHoursBack] = useState(searchParams.get('hoursBack') || '24');
  const [limit, setLimit] = useState(searchParams.get('limit') || '10');
  const [maxPosts, setMaxPosts] = useState(searchParams.get('maxPosts') || '2');
  const [maxComments, setMaxComments] = useState(searchParams.get('maxComments') || '10');
  const [minimumPostScore, setMinimumPostScore] = useState(searchParams.get('minimumPostScore') || '');
  const [minimumCommentScore, setMinimumCommentScore] = useState(searchParams.get('minimumCommentScore') || '');
  const [postZScoreThreshold, setPostZScoreThreshold] = useState(searchParams.get('postZScoreThreshold') || '0.7');
  const [commentZScoreThreshold, setCommentZScoreThreshold] = useState(searchParams.get('commentZScoreThreshold') || '0.7');
  const [maxPostsLimit, setMaxPostsLimit] = useState(searchParams.get('maxPostsLimit') || '5');
  const [maxCommentsLimit, setMaxCommentsLimit] = useState(searchParams.get('maxCommentsLimit') || '20');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (subreddits) {
      params.set('subreddits', subreddits);
    }
    if (apiKey) {
      params.set('apiKey', apiKey);
    }
    if (hoursBack) {
      params.set('hoursBack', hoursBack);
    }
    if (limit) {
      params.set('limit', limit);
    }
    if (maxPosts) {
      params.set('maxPosts', maxPosts);
    }
    if (maxComments) {
      params.set('maxComments', maxComments);
    }
    if (minimumPostScore) {
      params.set('minimumPostScore', minimumPostScore);
    }
    if (minimumCommentScore) {
      params.set('minimumCommentScore', minimumCommentScore);
    }
    if (postZScoreThreshold) {
      params.set('postZScoreThreshold', postZScoreThreshold);
    }
    if (commentZScoreThreshold) {
      params.set('commentZScoreThreshold', commentZScoreThreshold);
    }
    if (maxPostsLimit) {
      params.set('maxPostsLimit', maxPostsLimit);
    }
    if (maxCommentsLimit) {
      params.set('maxCommentsLimit', maxCommentsLimit);
    }

    router.push(`/?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="config-form">
      <div className="form-grid">
        <div className="form-field form-field-full">
          <label htmlFor="subreddits">
            Subreddits
            {' '}
            <span className="text-gray-500">(comma-separated)</span>
          </label>
          <input
            id="subreddits"
            type="text"
            value={subreddits}
            onChange={e => setSubreddits(e.target.value)}
            placeholder="ClaudeAI, programming, linux"
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
          <label htmlFor="hoursBack">Hours Back</label>
          <input
            id="hoursBack"
            type="number"
            value={hoursBack}
            onChange={e => setHoursBack(e.target.value)}
            min="1"
            max="168"
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

        <div className="form-field">
          <label htmlFor="maxPosts">Max Posts (Base)</label>
          <input
            id="maxPosts"
            type="number"
            value={maxPosts}
            onChange={e => setMaxPosts(e.target.value)}
            min="1"
            max="20"
          />
        </div>

        <div className="form-field">
          <label htmlFor="maxComments">Max Comments (Base)</label>
          <input
            id="maxComments"
            type="number"
            value={maxComments}
            onChange={e => setMaxComments(e.target.value)}
            min="1"
            max="100"
          />
        </div>

        <div className="form-field">
          <label htmlFor="maxPostsLimit">Max Posts Limit</label>
          <input
            id="maxPostsLimit"
            type="number"
            value={maxPostsLimit}
            onChange={e => setMaxPostsLimit(e.target.value)}
            min="1"
            max="50"
          />
        </div>

        <div className="form-field">
          <label htmlFor="maxCommentsLimit">Max Comments Limit</label>
          <input
            id="maxCommentsLimit"
            type="number"
            value={maxCommentsLimit}
            onChange={e => setMaxCommentsLimit(e.target.value)}
            min="1"
            max="200"
          />
        </div>

        <div className="form-field">
          <label htmlFor="postZScoreThreshold">Post Z-Score Threshold</label>
          <input
            id="postZScoreThreshold"
            type="number"
            step="0.1"
            value={postZScoreThreshold}
            onChange={e => setPostZScoreThreshold(e.target.value)}
            min="0"
            max="3"
          />
        </div>

        <div className="form-field">
          <label htmlFor="commentZScoreThreshold">Comment Z-Score Threshold</label>
          <input
            id="commentZScoreThreshold"
            type="number"
            step="0.1"
            value={commentZScoreThreshold}
            onChange={e => setCommentZScoreThreshold(e.target.value)}
            min="0"
            max="3"
          />
        </div>

        <div className="form-field">
          <label htmlFor="minimumPostScore">
            Min Post Score
            {' '}
            <span className="text-gray-500">(optional)</span>
          </label>
          <input
            id="minimumPostScore"
            type="number"
            value={minimumPostScore}
            onChange={e => setMinimumPostScore(e.target.value)}
            min="0"
            placeholder="Leave empty for none"
          />
        </div>

        <div className="form-field">
          <label htmlFor="minimumCommentScore">
            Min Comment Score
            {' '}
            <span className="text-gray-500">(optional)</span>
          </label>
          <input
            id="minimumCommentScore"
            type="number"
            value={minimumCommentScore}
            onChange={e => setMinimumCommentScore(e.target.value)}
            min="0"
            placeholder="Leave empty for none"
          />
        </div>
      </div>

      <button type="submit" className="submit-btn">
        Update Configuration
      </button>
    </form>
  );
}

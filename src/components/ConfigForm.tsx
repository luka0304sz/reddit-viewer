'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

type ConfigFormProps = {
  mode: 'single' | 'multi';
};

type FavoriteSubreddit = {
  name: string;
  starred: boolean;
};

const DEFAULT_FAVORITE_SUBREDDITS: string[] = [
  'ClaudeAI',
  'n8n',
  'node',
  'ChatGPTCoding',
  'OpenAI',
  'ChatGPT',
  'webdev',
  'react',
  'reactjs',
  'homeassistant',
];

const STORAGE_KEY = 'reddit-viewer-custom-subreddits';

export function ConfigForm({ mode }: ConfigFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Single subreddit mode state
  const [subreddit, setSubreddit] = useState(searchParams.get('subreddit') || searchParams.get('channel') || '');

  // Multi-subreddit mode state
  const [subreddits, setSubreddits] = useState(searchParams.get('subreddits') || '');
  const [selectedFavorites, setSelectedFavorites] = useState<Set<string>>(new Set());
  const [customFavorites, setCustomFavorites] = useState<FavoriteSubreddit[]>([]);
  const [hoursBack, setHoursBack] = useState(searchParams.get('hoursBack') || '24');
  const [postZScoreThreshold, setPostZScoreThreshold] = useState(searchParams.get('postZScoreThreshold') || '0.7');
  const [commentZScoreThreshold, setCommentZScoreThreshold] = useState(searchParams.get('commentZScoreThreshold') || '0.7');
  const [maxPostsLimit, setMaxPostsLimit] = useState(searchParams.get('maxPostsLimit') || '5');
  const [maxCommentsLimit, setMaxCommentsLimit] = useState(searchParams.get('maxCommentsLimit') || '20');

  // Common state
  const [apiKey, setApiKey] = useState(searchParams.get('apiKey') || 'secret');
  const [limit, setLimit] = useState(searchParams.get('limit') || mode === 'single' ? '25' : '10');
  const [maxPosts, setMaxPosts] = useState(searchParams.get('maxPosts') || mode === 'single' ? '10' : '2');
  const [maxComments, setMaxComments] = useState(searchParams.get('maxComments') || '10');
  const [minimumPostScore, setMinimumPostScore] = useState(searchParams.get('minimumPostScore') || mode === 'single' ? '5' : '');
  const [minimumCommentScore, setMinimumCommentScore] = useState(searchParams.get('minimumCommentScore') || mode === 'single' ? '3' : '');

  // Load custom favorites from localStorage
  useEffect(() => {
    if (typeof window === 'undefined' || mode !== 'multi') {
      return;
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: FavoriteSubreddit[] = JSON.parse(stored);
        setCustomFavorites(parsed);
      }
    } catch (error) {
      console.error('Failed to load custom favorites:', error);
    }
  }, [mode]);

  // Save custom favorites to localStorage
  const saveCustomFavorites = useCallback((favorites: FavoriteSubreddit[]) => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
      setCustomFavorites(favorites);
    } catch (error) {
      console.error('Failed to save custom favorites:', error);
    }
  }, []);

  // Merge and sort all favorites
  const allFavorites = useMemo(() => {
    const merged = new Map<string, FavoriteSubreddit>();

    // Add default favorites (not starred by default)
    DEFAULT_FAVORITE_SUBREDDITS.forEach((name) => {
      merged.set(name.toLowerCase(), { name, starred: false });
    });

    // Override with custom favorites (which may have starred status)
    customFavorites.forEach((fav) => {
      merged.set(fav.name.toLowerCase(), fav);
    });

    const favArray = Array.from(merged.values());

    // Sort: starred first (alphabetically), then non-starred (alphabetically)
    return favArray.sort((a, b) => {
      if (a.starred !== b.starred) {
        return a.starred ? -1 : 1;
      }
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });
  }, [customFavorites]);

  // Initialize selected favorites from URL on mount
  useEffect(() => {
    if (mode === 'multi') {
      const initialSubreddits = searchParams.get('subreddits') || '';
      if (initialSubreddits) {
        const currentSubreddits = initialSubreddits
          .split(',')
          .map(s => s.trim())
          .filter(Boolean);
        const selected = new Set(
          currentSubreddits.filter(s =>
            allFavorites.some(fav => fav.name.toLowerCase() === s.toLowerCase()),
          ),
        );
        setSelectedFavorites(selected);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleFavorite = (subreddit: string) => {
    const newSelected = new Set(selectedFavorites);
    if (newSelected.has(subreddit)) {
      newSelected.delete(subreddit);
    } else {
      newSelected.add(subreddit);
    }
    setSelectedFavorites(newSelected);

    // Update subreddits field
    const selectedArray = Array.from(newSelected);
    setSubreddits(selectedArray.join(', '));
  };

  const toggleStar = (subredditName: string) => {
    const updated = customFavorites.map(fav =>
      fav.name.toLowerCase() === subredditName.toLowerCase()
        ? { ...fav, starred: !fav.starred }
        : fav,
    );

    // If not in custom favorites, add it
    if (!customFavorites.some(fav => fav.name.toLowerCase() === subredditName.toLowerCase())) {
      updated.push({ name: subredditName, starred: true });
    }

    saveCustomFavorites(updated);
  };

  const toggleSelectAll = () => {
    if (selectedFavorites.size === allFavorites.length) {
      // Deselect all
      setSelectedFavorites(new Set());
      setSubreddits('');
    } else {
      // Select all
      const allSelected = new Set(allFavorites.map(f => f.name));
      setSelectedFavorites(allSelected);
      setSubreddits(allFavorites.map(f => f.name).join(', '));
    }
  };

  const handleSubredditsChange = (value: string) => {
    setSubreddits(value);

    // Update checkboxes based on manual input (no save yet)
    const currentSubreddits = value
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const selected = new Set(
      currentSubreddits.filter(s =>
        allFavorites.some(fav => fav.name.toLowerCase() === s.toLowerCase()),
      ),
    );
    setSelectedFavorites(selected);
  };

  const removeFromFavorites = (subredditName: string) => {
    // Remove from custom favorites
    const updated = customFavorites.filter(
      fav => fav.name.toLowerCase() !== subredditName.toLowerCase(),
    );
    saveCustomFavorites(updated);

    // Also uncheck if it was selected
    const newSelected = new Set(selectedFavorites);
    newSelected.delete(subredditName);
    setSelectedFavorites(newSelected);

    // Update subreddits field
    const selectedArray = Array.from(newSelected);
    setSubreddits(selectedArray.join(', '));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Save new subreddits to localStorage on form submit
    if (mode === 'multi' && subreddits) {
      const currentSubreddits = subreddits
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      // Find new subreddits not in allFavorites
      const newSubreddits = currentSubreddits.filter(
        sub => !allFavorites.some(fav => fav.name.toLowerCase() === sub.toLowerCase()),
      );

      if (newSubreddits.length > 0) {
        const updated = [...customFavorites];
        newSubreddits.forEach((sub) => {
          if (!updated.some(fav => fav.name.toLowerCase() === sub.toLowerCase())) {
            updated.push({ name: sub, starred: false });
          }
        });
        saveCustomFavorites(updated);
      }
    }

    const params = new URLSearchParams();

    if (mode === 'single') {
      if (subreddit) {
        params.set('subreddit', subreddit);
      }
    } else {
      if (subreddits) {
        params.set('subreddits', subreddits);
      }
      if (hoursBack) {
        params.set('hoursBack', hoursBack);
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
    }

    // Common params
    if (apiKey) {
      params.set('apiKey', apiKey);
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

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="config-form">
      <div className="form-grid">
        {mode === 'single'
          ? (
              <div className="form-field form-field-full">
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
            )
          : (
              <>
                <div className="form-field-full">
                  <div className="mb-4">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="text-sm font-semibold text-slate-300">
                        Favorite Subreddits
                        <span className="ml-2 text-xs text-slate-500">(⭐ = top of list)</span>
                      </div>
                      <button
                        type="button"
                        onClick={toggleSelectAll}
                        className="rounded-lg bg-cyan-500/20 px-4 py-2 text-xs font-bold text-cyan-400 ring-1 ring-cyan-500/30 transition-all duration-200 hover:bg-cyan-500/30"
                        style={{ minHeight: '36px' }}
                      >
                        {selectedFavorites.size === allFavorites.length ? 'Deselect All' : 'Select All'}
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-3 rounded-lg border border-slate-600 bg-slate-800 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {allFavorites.map((favorite) => {
                        const isDefault = DEFAULT_FAVORITE_SUBREDDITS.includes(favorite.name);
                        const isCustom = customFavorites.some(fav => fav.name.toLowerCase() === favorite.name.toLowerCase());
                        return (
                          <div
                            key={favorite.name}
                            className="flex items-center gap-1.5"
                          >
                            <label className="flex flex-1 cursor-pointer items-center gap-2.5 text-sm">
                              <input
                                type="checkbox"
                                checked={selectedFavorites.has(favorite.name)}
                                onChange={() => toggleFavorite(favorite.name)}
                                className="h-5 w-5 rounded border-slate-600 bg-slate-800 text-cyan-500 transition-all focus:ring-2 focus:ring-cyan-500/50"
                              />
                              <span className="font-medium text-slate-300">
                                r/
                                {favorite.name}
                              </span>
                            </label>
                            <button
                              type="button"
                              onClick={() => toggleStar(favorite.name)}
                              className={`flex-shrink-0 text-base transition-all duration-200 hover:scale-110 ${
                                favorite.starred
                                  ? 'text-yellow-400 hover:text-yellow-300'
                                  : 'text-slate-600 hover:text-yellow-500'
                              }`}
                              title={favorite.starred ? 'Remove from top' : 'Pin to top'}
                              aria-label={favorite.starred ? 'Unstar subreddit' : 'Star subreddit'}
                            >
                              {favorite.starred ? '⭐' : '☆'}
                            </button>
                            {isCustom && !isDefault && (
                              <button
                                type="button"
                                onClick={() => removeFromFavorites(favorite.name)}
                                className="flex-shrink-0 text-sm text-red-400 transition-all duration-200 hover:scale-110 hover:text-red-300"
                                title="Remove from favorites"
                                aria-label="Remove subreddit from favorites"
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="form-field form-field-full">
                  <label htmlFor="subreddits">
                    Subreddits
                    {' '}
                    <span className="text-slate-500">(comma-separated, new ones saved on submit)</span>
                  </label>
                  <input
                    id="subreddits"
                    type="text"
                    value={subreddits}
                    onChange={e => handleSubredditsChange(e.target.value)}
                    placeholder="ClaudeAI, programming, linux"
                    required
                  />
                </div>
              </>
            )}

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

        {mode === 'multi' && (
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
        )}

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
          <label htmlFor="maxPosts">
            {mode === 'multi' ? 'Max Posts (Base)' : 'Max Posts'}
          </label>
          <input
            id="maxPosts"
            type="number"
            value={maxPosts}
            onChange={e => setMaxPosts(e.target.value)}
            min="1"
            max={mode === 'single' ? '100' : '20'}
          />
        </div>

        <div className="form-field">
          <label htmlFor="maxComments">
            {mode === 'multi' ? 'Max Comments (Base)' : 'Max Comments'}
          </label>
          <input
            id="maxComments"
            type="number"
            value={maxComments}
            onChange={e => setMaxComments(e.target.value)}
            min="1"
            max={mode === 'single' ? '500' : '100'}
          />
        </div>

        {mode === 'multi' && (
          <>
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
          </>
        )}

        <div className="form-field">
          <label htmlFor="minimumPostScore">
            Min Post Score
            {' '}
            {mode === 'multi' && <span className="text-slate-500">(optional)</span>}
          </label>
          <input
            id="minimumPostScore"
            type="number"
            value={minimumPostScore}
            onChange={e => setMinimumPostScore(e.target.value)}
            min="0"
            placeholder={mode === 'multi' ? 'Leave empty for none' : '5'}
          />
        </div>

        <div className="form-field">
          <label htmlFor="minimumCommentScore">
            Min Comment Score
            {' '}
            {mode === 'multi' && <span className="text-slate-500">(optional)</span>}
          </label>
          <input
            id="minimumCommentScore"
            type="number"
            value={minimumCommentScore}
            onChange={e => setMinimumCommentScore(e.target.value)}
            min="0"
            placeholder={mode === 'multi' ? 'Leave empty for none' : '3'}
          />
        </div>
      </div>

      <button type="submit" className="submit-btn">
        Update Configuration
      </button>
    </form>
  );
}

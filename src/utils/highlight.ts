import type { HighlightLevel } from '@/types/reddit';

export type HighlightBadgeConfig = {
  icon: string;
  label: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
};

/**
 * Get badge configuration for a highlight level
 * Returns badge config with icon, label, and colors for different highlight levels:
 * - viral: 🔥 VIRAL (red) - z-score ≥ 2.5 (TOP 0.6%)
 * - hot: 🔥 HOT (orange) - z-score ≥ 2.0 (TOP 2.3%)
 * - trending: 📈 TRENDING (yellow) - z-score ≥ 1.5 (TOP 7%)
 */
export function getHighlightBadge(highlight: HighlightLevel): HighlightBadgeConfig | null {
  switch (highlight) {
    case 'viral':
      return {
        icon: '🔥',
        label: 'VIRAL',
        bgColor: 'bg-red-100',
        textColor: 'text-red-800',
        borderColor: 'border-red-300',
      };
    case 'hot':
      return {
        icon: '🔥',
        label: 'HOT',
        bgColor: 'bg-orange-100',
        textColor: 'text-orange-800',
        borderColor: 'border-orange-300',
      };
    case 'trending':
      return {
        icon: '📈',
        label: 'TRENDING',
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-800',
        borderColor: 'border-yellow-300',
      };
    default:
      return null;
  }
}

/**
 * Get icon for a highlight level (for compact display in navigation)
 * Returns just the emoji icon without full badge styling
 */
export function getHighlightIcon(highlight: HighlightLevel): string | null {
  switch (highlight) {
    case 'viral':
      return '🔥';
    case 'hot':
      return '🔥';
    case 'trending':
      return '📈';
    default:
      return null;
  }
}

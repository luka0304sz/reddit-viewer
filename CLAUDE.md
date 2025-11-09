# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a simple Next.js 16 application that fetches and displays Reddit posts with comments using server-side rendering. The app is built with TypeScript, React 19, and Tailwind CSS 4.

## Key Commands

### Development
- `npm run dev` - Start development server (runs on port 3000)
- `npm run build` - Production build
- `npm run start` - Start production server

### Code Quality
- `npm run lint` - Check for linting errors
- `npm run lint:fix` - Auto-fix linting issues
- `npm run check:types` - Type-check entire project

### Other
- `npm run clean` - Clean build artifacts

## Architecture

### App Structure (Next.js App Router)

The application uses a simplified Next.js App Router structure:

- `src/app/` - App Router pages
  - `layout.tsx` - Root layout with metadata
  - `page.tsx` - Main page that fetches and displays Reddit data

### Key Directories

- `src/components/` - React components
  - `Comment.tsx` - Displays individual Reddit comments with collapsible replies
  - `Post.tsx` - Displays Reddit posts with metadata and comments
  - `Stats.tsx` - Shows statistics about fetched Reddit data
  - `PostNavigation.tsx` - Navigation menu for quick access to posts
- `src/services/` - API service functions
  - `reddit.ts` - Fetches data from the Reddit API endpoint
- `src/types/` - TypeScript type definitions
  - `reddit.ts` - Types for Reddit data structures
- `src/styles/` - CSS files
  - `global.css` - Global styles and component styles

### Core Libraries Configuration

**Styling**
- Tailwind CSS 4 with PostCSS
- Global styles: `src/styles/global.css`
- Custom CSS for Reddit viewer components

**Type Safety**
- Strict TypeScript configuration with comprehensive checks
- No implicit any, strict null checks, unused variable checks enabled
- Absolute imports using `@/` prefix for `src/`

## Data Flow

1. User visits the page with URL parameters (e.g., `?subreddit=ClaudeAI&maxComments=50`)
2. Server-side page component (`src/app/page.tsx`) receives search parameters
3. Server calls `fetchRedditData()` from `src/services/reddit.ts`
4. Service fetches data from `https://helper.lnservice.online/api/v1/reddit/fetch`
5. Data is cached for 5 minutes using Next.js `fetch` cache
6. Components render the data server-side
7. Client-side interactivity (collapsing/expanding) is handled by 'use client' components

## URL Parameters

The app accepts the following URL parameters:

- `subreddit` or `channel` (required) - The subreddit to fetch posts from
- `apiKey` (optional, default: 'secret') - API key for the Reddit service
- `topPostsCount` (optional, default: 25) - Number of top posts to fetch
- `maxComments` (optional, default: 100) - Maximum number of comments per post
- `minimumCommentScore` (optional, default: 1) - Minimum score for comments to display

Example: `http://localhost:3000/?subreddit=ClaudeAI&maxComments=50&topPostsCount=10`

## Component Structure

### Server Components
- `src/app/page.tsx` - Main page (fetches data)
- `Stats.tsx` - Displays statistics
- `PostNavigation.tsx` - Navigation menu

### Client Components
- `Comment.tsx` - Interactive comment with collapse/expand
- `Post.tsx` - Interactive post with collapse/expand sections

## Important Patterns

### Adding New Features

When adding new features:
1. Add types to `src/types/reddit.ts` if needed
2. Update the service in `src/services/reddit.ts` if API changes are needed
3. Create or modify components in `src/components/`
4. Update styles in `src/styles/global.css`

### Error Handling

The app handles errors at two levels:
1. Missing parameters - Shows error message with usage instructions
2. API errors - Catches and displays error messages from the Reddit service

## Configuration Files

- `next.config.ts` - Minimal Next.js config
- `tsconfig.json` - Strict TypeScript with absolute imports
- `package.json` - Dependencies and scripts
- `eslint.config.mjs` - ESLint configuration

## Notes

- Uses React 19 and Next.js 16 with App Router
- Turbopack used in development with file system caching
- Server-side rendering for better performance and SEO
- Client-side interactivity for collapsible sections
- Responsive design with mobile support
- No database, authentication, or third-party services required
- Data is fetched from an external Reddit API endpoint and cached for 5 minutes

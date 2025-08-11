# News Dashboard

[![Tests](https://github.com/RaviTmg/news-dashboard/actions/workflows/test.yml/badge.svg)](https://github.com/RaviTmg/news-dashboard/actions/workflows/test.yml)


## Features

- **Latest News**: Fetch and display the latest headlines from NewsAPI
- **Smart Search**: Real-time search with debouncing and intelligent query handling
- **Infinite Scroll**: Seamless article loading with intersection observer
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Performance Optimized**: Lazy loading, code splitting, and memoization
- **Modern UI**: Clean design with Tailwind CSS v4
- **State Management**: Redux Toolkit for predictable state updates
- **Type Safe**: Full TypeScript implementation with comprehensive type definitions
- **Smart Error Handling**: Rate limit detection, graceful fallbacks, and retry mechanisms
- **Well Tested**: Comprehensive test suite with Jest and React Testing Library
- **Rate Limit Management**: Intelligent handling of NewsAPI rate limits

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **State Management**: Redux Toolkit
- **Testing**: Jest + React Testing Library
- **API Integration**: NewsAPI.org with custom service layer
- **Performance**: React.memo, intersection observer, debounced search
- **Build Tool**: Turbopack (dev mode)

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, or pnpm
- NewsAPI key (free at [newsapi.org](https://newsapi.org))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd news-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your NewsAPI key:
   ```bash
   NEXT_PUBLIC_NEWS_API_KEY=your_api_key_here
   NEXT_PUBLIC_NEWS_API_BASE_URL=https://newsapi.org/v2
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000)

## Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests once
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:ci` - Run tests in CI mode (no watch)

## Project Structure

```
src/
├── __tests__/             # Test suites
│   ├── hooks/            # Hook tests
│   ├── icons/            # Icon component tests
│   ├── layout/           # Layout component tests
│   ├── news/             # News component tests
│   ├── ui/               # UI component tests
│   └── setup.ts          # Test configuration
├── app/                   # Next.js App Router
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── icons/            # SVG icon components
│   ├── layout/           # Layout components (Header, Footer, Layout)
│   ├── news/             # News-specific components (NewsFeed, NewsCard, etc.)
│   ├── providers/        # Context providers (Redux)
│   └── ui/               # Reusable UI components (Button, Input, etc.)
├── hooks/                 # Custom React hooks
│   ├── redux.ts          # Typed Redux hooks
│   ├── useDebounce.ts    # Debounce hook for search
│   └── useInfiniteScroll.ts # Infinite scroll implementation
├── services/              # API services
│   ├── index.ts          # Service exports
│   └── newsService.ts    # NewsAPI service layer
├── store/                 # Redux store and slices
│   ├── index.ts          # Store configuration
│   └── newsSlice.ts      # News state management
├── types/                 # TypeScript type definitions
│   ├── index.ts          # Type exports
│   └── news.ts           # News-related types
└── utils/                 # Utility functions
```

## Testing

This project includes a comprehensive test suite using Jest and React Testing Library.

### Test Coverage

The test suite covers:
- **Custom Hooks**: `useDebounce`, `useInfiniteScroll`
- **UI Components**: Buttons, inputs, loading states, error handling
- **News Components**: News cards, article grids, search functionality
- **Layout Components**: Header, navigation, responsive layouts
- **Icon Components**: All SVG icon components

### Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode during development
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run tests for CI (no watch mode)
npm run test:ci
```

### Test Configuration

Tests are configured with:
- **Test Environment**: jsdom for DOM testing
- **Setup**: Custom setup file with React Testing Library configuration
- **Path Mapping**: Supports `@/` imports matching the project structure
- **Coverage**: Excludes test files, app directory, and type definitions
- **Timeout**: 10-second timeout for async operations

## Architecture

### State Management

The application uses Redux Toolkit for predictable state management:

- **newsSlice**: Manages articles, loading states, search queries, and rate limiting
- **Async Thunks**: Handle API calls with proper error handling and rate limit detection
- **Typed Hooks**: Custom `useAppSelector` and `useAppDispatch` with proper TypeScript types

### API Layer

- **NewsService**: Encapsulates all NewsAPI interactions
- **Error Handling**: Comprehensive error handling with rate limit detection
- **Type Safety**: Full TypeScript types for API responses and requests
- **Environment Configuration**: Supports custom API endpoints and keys

### Component Architecture

- **Atomic Design**: Components organized by complexity (icons, ui, layout, features)
- **Compound Components**: Complex components like NewsFeed composed of smaller parts
- **Custom Hooks**: Reusable logic for debouncing, infinite scroll, and Redux integration
- **Proper Separation**: Clear separation between presentation and business logic

## API Configuration

This project uses [NewsAPI.org](https://newsapi.org) which provides:

- 1,000 requests per day (free tier)
- Latest headlines and article search
- Multiple sources and categories
- Real-time updates

### Rate Limiting

The app implements smart caching and request optimization to stay within API limits:

- Debounced search queries (500ms delay)
- Cached responses to minimize redundant calls
- Progressive loading with pagination

## Performance Features

- **Lazy Loading**: Images load only when visible
- **Code Splitting**: Dynamic imports for optimal bundle size
- **Memoization**: React.memo for component optimization
- **Infinite Scroll**: Efficient data fetching using intersection observer
- **Debounced Search**: Reduced API calls during typing

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [NewsAPI](https://newsapi.org) for providing the news data
- [Next.js](https://nextjs.org) for the React framework
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Redux Toolkit](https://redux-toolkit.js.org) for state management

---

# Sports Leagues App

A React TypeScript application that displays sports leagues from around the world. The application has search and filtering capabilities. The app fetches data from `TheSportsDB` API and implements state management and data caching. The user interface is styled with `TailwinCSS`.

# App Features
- Browse sports leagues
- Search leagues by name
- Filter leagues by type
- View season badges for leagues
- Cache data for improved performance
- Responsive design with `TailwindCSS`

## Technologies & Tools
- React 19
- TypeScript
- TailwindCSS
- React Context API
- Cache Storage API
- Vite
- Prettier

## Getting Started

### Prerequisites

- Node.js (v20.0.0 or later)
- npm

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/uzochukwueddie/sports-league.git
   cd sports-league
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:4000`

## Current Limitations

### 1. **API Dependency**
- **Single API Source**: The app relies entirely on TheSportsDB API. If the API is down or rate-limited, the entire app becomes non-functional
- **No Offline Fallback**: While caching is implemented, there's no comprehensive offline mode for when the API is unavailable

### 2. **Search and Filtering**
- **Basic Search**: Only supports simple text matching, no advanced search operators or fuzzy matching
- **Limited Filters**: Only sport type filtering available, no other metadata-based filters
- **No Search History**: Users cannot see or reuse previous searches

### 3. **Development and Maintenance**
- **No Testing**: No unit tests, integration tests, or end-to-end tests implemented

## AI Tools Used

The AI tool significantly accelerated the development process.

- **Anthropic Claude** - 
   - Used to generate UI mockups and design concepts
   - Assisted with refactoring of some code

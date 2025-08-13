# Sports Leagues SPA

A React-based single-page application that displays sports leagues with filtering capabilities and season badge integration.

## Overview

This project was built as a frontend development assignment for Sporty Group, demonstrating skills in component-based architecture, state management, and API integration. The application simulates a simplified component from an online bookmaker platform.

## Features

- **League Display**: Shows sports leagues with name, sport type, and alternate names
- **Search Functionality**: Real-time search across league names and alternate names
- **Sport Filtering**: Dropdown filter to show leagues by specific sports
- **Season Badges**: Click any league to view its season badge image
- **Responsive Design**: Mobile-first design that works on all screen sizes
- **Caching System**: API responses are cached to improve performance
- **Loading States**: Visual feedback during data fetching

## Tech Stack

- **Frontend Framework**: React 18 with functional components and hooks
- **Caching System**: Browser Cache API with intelligent TTL management
- **Styling**: Tailwind CSS for responsive design and utility classes
- **Icons**: Lucide React for consistent iconography
- **State Management**: Browser Cache API for persistence + React hooks for UI state
- **API Integration**: Native fetch API with advanced error handling and retry mechanisms
  
## API Integration

### All Leagues API
- **Endpoint**: `https://www.thesportsdb.com/api/v1/json/3/all_leagues.php`
- **Purpose**: Fetches complete list of sports leagues
- **Fields Used**: `strLeague`, `strSport`, `strLeagueAlternate`, `idLeague`

### Season Badge API
- **Endpoint**: `https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=<id>`
- **Purpose**: Retrieves season badge images for specific leagues
- **Caching**: Results cached in component state to avoid repeat calls

## Installation & Setup

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Start development server
npm run dev
```

## Component Architecture

The application follows a component-based architecture with clear separation of concerns:

- **Main App Component**: Handles all state management and API calls
- **Search & Filter Controls**: Dedicated section for user input controls
- **League Grid**: Responsive grid layout for league cards
- **Loading & Error States**: Dedicated UI components for different app states

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
   - Provided Tailwind CSS classes for responsive, modern design

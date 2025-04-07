#!/bin/bash

# Create src directory
mkdir -p src

# Create folder structure
mkdir -p src/api
mkdir -p src/components
mkdir -p src/constants
mkdir -p src/context
mkdir -p src/hooks
mkdir -p src/navigation
mkdir -p src/screens
mkdir -p src/theme
mkdir -p src/utils

# Create screen files
touch src/screens/SplashScreen.tsx
touch src/screens/DashboardScreen.tsx
touch src/screens/FavoritesScreen.tsx
touch src/screens/MovieDetailScreen.tsx

# Components
touch src/components/MovieCard.tsx
touch src/components/MovieList.tsx
touch src/components/RatingStars.tsx
touch src/components/SearchBar.tsx
touch src/components/CategoryTabs.tsx
touch src/components/MovieSection.tsx
touch src/components/ErrorMessage.tsx

# Context
cat <<EOT >> src/context/index.tsx
import React from 'react';
import { FavoritesProvider } from './FavoritesContext';
import { MoviesProvider } from './MoviesContext';

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MoviesProvider>
    <FavoritesProvider>
      {children}
    </FavoritesProvider>
  </MoviesProvider>
);
EOT

touch src/context/FavoritesContext.tsx
touch src/context/MoviesContext.tsx

# Other folders and files
touch src/api/tmdb.ts
touch src/constants/colors.ts
touch src/constants/endpoints.ts
touch src/constants/icons.ts
touch src/hooks/useFetchMovies.ts
touch src/navigation/BottomTabs.tsx
touch src/navigation/RootNavigator.tsx
touch src/theme/index.ts
touch src/utils/formatDate.ts
touch src/utils/ratingToStars.ts
touch src/AppNavigator.tsx

echo "✅ TypeScript React Native structure with 4 screens created successfully!"

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

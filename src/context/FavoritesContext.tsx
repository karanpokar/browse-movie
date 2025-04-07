import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Movie } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FavoritesContextType = {
  favorites: Movie[];
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(()=>{
    checkForFavorites();
  },[])

  const checkForFavorites=async()=>{
    const data= await AsyncStorage.getItem('fav')
    if(data){
      setFavorites(JSON.parse(data))
    }
  }

  const addToFavorites = async(movie: Movie) => {
    setFavorites((prev) => [...prev, movie]);
    await AsyncStorage.setItem('fav',JSON.stringify([...favorites, movie]))
  };

  const removeFromFavorites = async(movieId: number) => {
    setFavorites((prev) => prev.filter((m) => m.id !== movieId));
    await AsyncStorage.setItem('fav',JSON.stringify(favorites?.filter((m) => m.id !== movieId)))
  };

  const isFavorite = (movieId: number) => {
    return favorites.some((m) => m.id === movieId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within a FavoritesProvider');
  return context;
};

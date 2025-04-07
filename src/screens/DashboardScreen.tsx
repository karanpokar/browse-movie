import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import React from 'react';
import {useMovies} from '../context/MoviesContext';
import MovieSection from '../components/MovieSection';
import {colors, typography} from '../theme';
import Carousel from '../components/Carousel';
import GlassCard from '../components/GlassComponent';

import {useNavigation} from '@react-navigation/native';
import {useFavorites} from '../context/FavoritesContext';
import NavBar from '../components/Dashboard/NavBar';

const DashboardScreen = () => {
  const {movies} = useMovies();
  const {favorites} = useFavorites();

  return (
    <SafeAreaView
      style={{flex: 1, position: 'relative', backgroundColor: 'transparent'}}>
        <NavBar/>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          backgroundColor: colors.background,
          position: 'relative',
        }}>
        <Carousel />
        {favorites?.length > 0 && (
          <MovieSection section={'Favorites'} movies={favorites} />
        )}

        <MovieSection section={'Now Playing'} movies={movies?.nowPlaying} />
        <MovieSection section={'Top Rated'} movies={movies?.topRated} />
        <MovieSection section={'Popular'} movies={movies?.popular} />
        <MovieSection section={'Upcoming'} movies={movies?.upcoming} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;

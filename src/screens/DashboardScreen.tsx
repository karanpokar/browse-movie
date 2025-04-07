import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import React from 'react';
import {useMovies} from '../context/MoviesContext';
import MovieSection from '../components/MovieSection';
import {colors, typography} from '../theme';
import Carousel from '../components/Carousel';
import GlassCard from '../components/GlassComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const DashboardScreen = () => {
  const {movies} = useMovies();
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{flex: 1, position: 'relative', backgroundColor: 'transparent'}}>
      <GlassCard
        blurAmount={5}
        blurType="dark"
        style={{
          position: 'absolute',
          width: '100%',
          height: 60,
          zIndex: 10,
          borderRadius: 0,
          borderWidth: 0,
        }}>
        <View
          style={{
            height: '100%',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Icon
            onPress={() => {
              /*@ts-ignore*/
              navigation.navigate('SearchScreen');
            }}
            name="search"
            size={20}
            color={colors.placeholder}
          />
        </View>
      </GlassCard>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          backgroundColor: colors.background,
          position: 'relative',
        }}>
        <Carousel />
        <MovieSection section={'Now Playing'} movies={movies?.nowPlaying} />
        <MovieSection section={'Top Rated'} movies={movies?.topRated} />
        <MovieSection section={'Popular'} movies={movies?.popular} />
        <MovieSection section={'Upcoming'} movies={movies?.upcoming} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;

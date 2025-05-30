import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {Movie} from '../types';
import MovieItem from './MovieItem';
import {colors, size, typography} from '../theme';
import {useMovies} from '../context/MoviesContext';

type MovieSection = {
  section: string;
  movies: Movie[];
};

const MovieSection = ({section, movies}: MovieSection) => {
  const {updateScroll} = useMovies();
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}>
      <Text
        style={{
          color: colors.textPrimary,
          fontSize: typography.fontSize.subtitle,
          fontFamily: typography.fontFamily.medium,
          marginVertical: 14,
          marginLeft: 20,
        }}>
        {section}
      </Text>
      <FlatList
        data={movies}
        horizontal
        onEndReached={() => {
          updateScroll(section);
        }}
        keyExtractor={(item)=> `${section}:${item?.id}`}
        renderItem={({item, index, separators}) => (
          <MovieItem movie={item} index={index?.toString()} />
        )}
      />
    </View>
  );
};

export default MovieSection;

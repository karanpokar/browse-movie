import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Movie} from '../types';
import {size, typography} from '../theme';
import {useNavigation} from '@react-navigation/native';
import GlassCard from './GlassComponent';


const MovieItem = ({movie, index}: {movie: Movie; index: string}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        /*@ts-ignore*/
        navigation.navigate('MovieDetail', {
          movie,
        });
      }}
      id={movie.id?.toString()}
      style={{
        height: 200,
        width: 130,
        borderRadius: 6,
        marginLeft: size.horizontalPadding,
        position:'relative'
      }}>
      <Image
        style={{
          width: '100%',
          height: '100%',
          resizeMode: 'cover',
          borderRadius: 6,
        }}
        source={{uri: `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}}
      />
      
    </TouchableOpacity>
  );
};

export default MovieItem;

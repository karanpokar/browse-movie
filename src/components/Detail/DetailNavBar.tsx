import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useFavorites} from '../../context/FavoritesContext';
import {Movie} from '../../types';

const DetailNavBar = ({movie}: {movie: Movie}) => {
  const navigation = useNavigation();
  const {isFavorite, addToFavorites, removeFromFavorites} = useFavorites();
  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        top: 0,
        height: 50,
        backgroundColor: 'transparent',
        zIndex: 10,
        paddingHorizontal: 20,
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          height: 40,
          width: 40,
          borderRadius: 40,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon name="arrow-back" size={24} color={'white'} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (isFavorite(movie?.id)) {
            removeFromFavorites(movie?.id);
          } else {
            addToFavorites(movie);
          }
        }}
        style={{
          height: 40,
          width: 40,
          borderRadius: 40,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon
          name="heart"
          size={24}
          color={isFavorite(movie?.id) ? 'red' : 'white'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default DetailNavBar;

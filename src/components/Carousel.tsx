import React, {useRef, useState} from 'react';
import {
  View,
  FlatList,
  ImageBackground,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {colors} from '../theme';
import {useMovies} from '../context/MoviesContext';

const {width, height} = Dimensions.get('window');

const Carousel = () => {
  const {movies} = useMovies();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: any) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(slide);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={movies?.popular}
        onScroll={handleScroll}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <ImageBackground
            id={item?.id?.toString()}
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`,
            }}
            style={{
              width: width,
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: 'rgba(0, 0, 0, 0.8)', // Change opacity as needed
              }}
            />

            <ImageBackground
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
              }}
              style={styles.image}
              imageStyle={styles.imageBorder}>
              {/* Add any overlay or text here */}
              <View style={{position: 'absolute', width: '100%'}} />
            </ImageBackground>
          </ImageBackground>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: height * 0.7,
    
    backgroundColor: colors.background,
  },
  image: {
    width: width * 0.8,
    height: height * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  imageBorder: {
    borderRadius: 12,
  },

  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
  },
});

export default Carousel;

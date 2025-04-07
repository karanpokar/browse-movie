import {
  Image,
  View,
  Dimensions,
  ScrollView,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {colors, typography} from '../theme';
import LinearGradient from 'react-native-linear-gradient';
import {useEffect, useState} from 'react';
import {useMovies} from '../context/MoviesContext';
import {MovieDetail, Movie} from '../types';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import {convertMinutesToHours} from '../utils/formatDate';
import MovieSection from '../components/MovieSection';

import {useFavorites} from '../context/FavoritesContext';
import DetailNavBar from '../components/Detail/DetailNavBar';

const MovieDetailScreen = ({route}: any) => {
  const {movie} = route.params;
  const {width, height} = Dimensions.get('screen');
  /*@ts-ignore*/
  const [movieDetail, setMovieDetail] = useState<MovieDetail>(null);
  const [similarMovie, setSimilarMovie] = useState<Movie[]>([]);
  const [movieProvider, setMovieProvider] = useState<any[]>([]);
  const [movieVideos, setMovieVideos] = useState([]);
  const {
    fetchMovieDetails,
    fetchMovieSimilar,
    fetchMovieVideos,
    fetchMovieProviders,
  } = useMovies();

  useEffect(() => {
    if (movie?.id) {
      fetchMovieDetail();
      fetchSimilarMovie();
      fetchVideo();
      fetchMovieProvider();
    }
  }, [movie]);

  const fetchMovieDetail = async () => {
    const details = await fetchMovieDetails(movie?.id);
    if (details?.id) setMovieDetail(details);
  };

  const fetchSimilarMovie = async () => {
    const details: any = await fetchMovieSimilar(movie?.id);
    if (details?.results?.length > 0) {
      setSimilarMovie(details.results);
    }
  };

  const fetchVideo = async () => {
    const details: any = await fetchMovieVideos(movie?.id);
    if (details?.results?.length > 0) {
      setMovieVideos(details.results);
    }
  };

  const fetchMovieProvider = async () => {
    const details: any = await fetchMovieProviders(movie?.id);
    /*@ts-ignore*/
    if (details) {
      setMovieProvider(details?.rent || details?.buy || []);
    }
  };

  return (
    <View style={styles.container}>
      <DetailNavBar movie={movie} />
      <Image
        style={styles.poster}
        source={{uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`}}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        <LinearGradient
          colors={[
            'transparent',
            'rgba(0,0,0,0.3)',
            'rgba(0,0,0,0.6)',
            colors.background,
          ]}
          style={styles.gradient}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{movie?.title}</Text>

          <View style={styles.metaRow}>
            <Text style={styles.metaText}>
              {convertMinutesToHours(movieDetail?.runtime)} |{' '}
              {movieDetail?.spoken_languages?.[0]?.name} |{' '}
              {movieDetail?.release_date?.split('-')[0]}
            </Text>
            <StarRatingDisplay
              rating={movieDetail?.vote_average / 2}
              starSize={18}
            />
          </View>

          <View style={styles.genreRow}>
            {movieDetail?.genres?.map((item, index) => (
              <Text key={item.id} style={styles.genreText}>
                {index !== 0 ? ' | ' : ''}
                {item.name}
              </Text>
            ))}
          </View>

          <Text style={styles.overview}>{movieDetail?.overview}</Text>
          {similarMovie?.length > 0 && (
            <View style={{marginLeft: -20}}>
              <MovieSection section="Similar" movies={similarMovie} />
            </View>
          )}

          {movieProvider?.length > 0 && (
            /*@ts-ignore*/
            <>
              <Text style={styles.sectionHeading}>Available On</Text>
              <View style={styles.providerRow}>
                {movieProvider.map((item, index) => (
                  <Image
                    key={index}
                    style={styles.providerLogo}
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500/${item.logo_path}`,
                    }}
                  />
                ))}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default MovieDetailScreen;

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    position: 'relative',
    paddingTop: Platform.OS == 'ios' ? 50 : 20,
  },
  poster: {
    width,
    height: height * 0.5,
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  scroll: {
    flex: 1,
  },
  gradient: {
    height: height * 0.5,
    width: '100%',
    position: 'absolute',
    top: 0,
  },
  content: {
    marginTop: height * 0.4,
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 22,
    fontFamily: typography.fontFamily.bold,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontFamily: typography.fontFamily.medium,
  },
  genreRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  genreText: {
    color: colors.textPrimary,
    fontSize: 13,
    fontFamily: typography.fontFamily.medium,
  },
  overview: {
    color: colors.textPrimary,
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
  },
  sectionHeading: {
    fontSize: 18,
    fontFamily: typography.fontFamily.medium,
    color: colors.textPrimary,
    marginTop: 20,
    marginBottom: 10,
  },
  providerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  providerLogo: {
    width: 40,
    height: 40,
    borderRadius: 6,
    marginRight: 10,
    objectFit: 'cover',
  },
});

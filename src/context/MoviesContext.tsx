import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import axios from 'axios';
import {Movie} from '../types';
import {creds} from '../../creds';

type MoviesByCategory = {
  nowPlaying: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
};

type PagesByCategory = {
  nowPlaying: number;
  popular: number;
  topRated: number;
  upcoming: number;
};

type MoviesContextType = {
  movies: MoviesByCategory;
  setMovies: React.Dispatch<React.SetStateAction<MoviesByCategory>>;
  pages: PagesByCategory;
  setPages: React.Dispatch<React.SetStateAction<PagesByCategory>>;
  fetchNowPlaying: () => Promise<void>;
  fetchPopular: () => Promise<void>;
  fetchTopRated: () => Promise<void>;
  fetchUpcoming: () => Promise<void>;
  fetchMovieSimilar: (id: number) => Promise<void>;
  fetchMovieReview: (id: number) => Promise<void>;
  fetchMovieVideos: (id: number) => Promise<void>;
  fetchMovieProviders: (id: number) => Promise<void>;
  fetchMovieDetails: (id: number) => Promise<any>;
  searchMovie: (query: string) => Promise<any>;
  updateScroll: (type: string) => Promise<void>;
};

const MoviesContext = createContext<MoviesContextType | undefined>(undefined);

const defaultMovies: MoviesByCategory = {
  nowPlaying: [],
  popular: [],
  topRated: [],
  upcoming: [],
};

const defaultPages: PagesByCategory = {
  nowPlaying: 1,
  popular: 1,
  topRated: 1,
  upcoming: 1,
};

const BASE_URL = 'https://api.themoviedb.org/3';
const BEARER_TOKEN = creds.TMDB_API_KEY;

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${BEARER_TOKEN}`,
    accept: 'application/json',
  },
});

export const MoviesProvider = ({children}: {children: ReactNode}) => {
  const [movies, setMovies] = useState<MoviesByCategory>(defaultMovies);
  const [pages, setPages] = useState<PagesByCategory>(defaultPages);
  const fetchNowPlaying = async () => {
    const page = pages.nowPlaying;
    const res = await client.get(
      `/movie/now_playing?language=en-US&page=${page}`,
    );
    setMovies(prev => ({
      ...prev,
      nowPlaying: [...prev.nowPlaying, ...res.data.results],
    }));
    setPages(prev => ({...prev, nowPlaying: res.data?.page + 1}));
  };

  const fetchPopular = async () => {
    const page = pages.popular;
    const res = await client.get(`/movie/popular?language=en-US&page=${page}`);
    setMovies(prev => ({
      ...prev,
      popular: [...prev.popular, ...res.data.results],
    }));
    setPages(prev => ({...prev, popular: res.data?.page + 1}));
  };

  const fetchTopRated = async () => {
    const page = pages.topRated;
    const res = await client.get(
      `/movie/top_rated?language=en-US&page=${page}`,
    );
    setMovies(prev => ({
      ...prev,
      topRated: [...prev.topRated, ...res.data.results],
    }));
    setPages(prev => ({...prev, topRated: res.data?.page + 1}));
  };

  const fetchUpcoming = async () => {
    const page = pages.upcoming;
    const res = await client.get(`/movie/upcoming?language=en-US&page=${page}`);
    setMovies(prev => ({
      ...prev,
      upcoming: [...prev.upcoming, ...res.data.results],
    }));
    setPages(prev => ({...prev, upcoming: res.data?.page + 1}));
  };

  const fetchMovieDetails = async (id: number) => {
    const res = await client.get(`/movie/${id}?language=en-US`);
    return res.data;
  };

  const fetchMovieSimilar = async (id: number) => {
    const res = await client.get(`/movie/${id}/similar?language=en-US&page=1`);
    return res.data;
  };
  const fetchMovieReview = async (id: number) => {
    const res = await client.get(`/movie/${id}/reviews?language=en-US&page=1`);
    return res.data;
  };
  const fetchMovieProviders = async (id: number) => {
    const res = await client.get(`/movie/${id}/watch/providers`);
    console.log(res.data?.results);
    return res.data?.results?.['IN'];
  };
  const fetchMovieVideos = async (id: number) => {
    const res = await client.get(`/movie/${id}/videos`);
    return res.data?.results;
  };
  const searchMovie = async (query: string) => {
    const res = await client.get(
      `/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    );
    return res.data?.results;
  };

  {
    /*
     <MovieSection section={'Now Playing'} movies={movies?.nowPlaying} />
        <MovieSection section={'Top Rated'} movies={movies?.topRated} />
        <MovieSection section={'Popular'} movies={movies?.popular} />
        <MovieSection section={'Upcoming'} movies={movies?.upcoming} />
    */
  }

  const updateScroll = async (type: string) => {
    if (type == 'Now Playing') {
      fetchNowPlaying();
    } else if (type == 'Top Rated') {
      fetchTopRated();
    } else if (type == 'Popular') {
      fetchPopular();
    } else {
      fetchUpcoming();
    }
  };

  useEffect(() => {
    //console.log('UE Called')
    fetchNowPlaying();
    fetchPopular();
    fetchTopRated();
    fetchUpcoming();
  }, []);

  return (
    <MoviesContext.Provider
      value={{
        movies,
        setMovies,
        pages,
        setPages,
        fetchNowPlaying,
        fetchPopular,
        fetchTopRated,
        fetchUpcoming,
        fetchMovieDetails,
        fetchMovieReview,
        fetchMovieSimilar,
        fetchMovieProviders,
        fetchMovieVideos,
        searchMovie,
        updateScroll,
      }}>
      {children}
    </MoviesContext.Provider>
  );
};

export const useMovies = () => {
  const context = useContext(MoviesContext);
  if (!context)
    throw new Error('useMovies must be used within a MoviesProvider');
  return context;
};

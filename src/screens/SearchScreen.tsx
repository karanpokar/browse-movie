import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../theme';
import { useMovies } from '../context/MoviesContext';
import { Movie } from '../types';
import { useNavigation } from '@react-navigation/native';



const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const { searchMovie } = useMovies();
  const navigation=useNavigation()

  // Debounce the search input
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.trim().length > 0) {
        fetchData();
      } else {
        setResults([]);
      }
    }, 400); // 400ms debounce

    return () => clearTimeout(timeout);
  }, [query]);

  const fetchData = async () => {
    const data = await searchMovie(query);
    if (data && data.length > 0) {
      setResults(data);
    } else {
      setResults([]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Icon name="search" size={20} color={colors.placeholder} />
        <TextInput
          placeholder="Search for a movie..."
          placeholderTextColor={colors.placeholder}
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Icon name="close" size={20} color={colors.placeholder} />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
          onPress={() => {
            /*@ts-ignore*/
            navigation.navigate('MovieDetail', {
                movie:item,
            });
          }}
          key={item.id} style={styles.item}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
            <Image 
            style={{height:40,width:40,borderRadius:2,objectFit:'cover',marginRight:12}}
            source={{uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`}}
            />
            <Text style={styles.itemText}>{item.title}</Text>
            </View>
            <Icon name="chevron-forward" size={20} color={colors.accent} />
          </TouchableOpacity>
        )}
          /*@ts-ignore*/
        ListEmptyComponent={
          query.trim().length > 0 && (
            <Text style={styles.emptyText}>No results found</Text>
          )
        }
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: colors.textPrimary,
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  itemText: {
    color: colors.textPrimary,
    fontSize: 16,
    width:200,
  },
  emptyText: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
});

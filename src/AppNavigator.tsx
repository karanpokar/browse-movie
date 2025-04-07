import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import DashboardScreen from './screens/DashboardScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import MovieDetailScreen from './screens/MovieDetailScreen';
import { MoviesProvider } from './context/MoviesContext';
import SearchScreen from './screens/SearchScreen';

export type RootStackParamList = {
  Splash: undefined;
  Dashboard: undefined;
  Favorites: undefined;
  SearchScreen:undefined,
  MovieDetail: {
    movieId: number;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    console.log('AppNav')
  return (
    <MoviesProvider>
      <NavigationContainer >
        <Stack.Navigator initialRouteName="Dashboard" screenOptions={{ 
          headerShown: false 
          }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="SearchScreen" 
          options={{
            presentation: 'modal', // 👈 bottom-to-top transition on iOS
          }}  
          component={SearchScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Favorites" component={FavoritesScreen} />
          <Stack.Screen name="MovieDetail"
          options={{
            presentation: 'modal', // 👈 bottom-to-top transition on iOS
          }} 
          component={MovieDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </MoviesProvider>
  );
};

export default AppNavigator;

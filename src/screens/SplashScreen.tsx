import { View, Text } from 'react-native'
import React from 'react'
import { useMovies } from '../context/MoviesContext'

const SplashScreen = () => {
    //const {movies}=useMovies();
    console.log('Movies')
  return (
    <View>
      <Text>SplasScreen</Text>
    </View>
  )
}

export default SplashScreen
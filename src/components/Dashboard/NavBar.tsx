import { View, Text } from 'react-native'
import React from 'react'
import GlassCard from '../GlassComponent'
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../theme';
import { useNavigation } from '@react-navigation/native';


const NavBar = () => {
    const navigation = useNavigation();
  return (
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
  )
}

export default NavBar
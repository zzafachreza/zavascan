import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  StatusBar,
} from 'react-native';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';

export default function Utama({navigation}) {
  setTimeout(() => {
    navigation.replace('Splash');
  }, 1000);
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.primary,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <StatusBar backgroundColor={'#044cc2'} barStyle="light-content" />

      <Image
        source={require('../../assets/logo1.png')}
        resizeMode="contain"
        style={{width: 300}}
      />
      {/* <Text
        style={{
          fontFamily: fonts.secondary[600],
          fontSize: 20,
          color: '#e5e8e4',
        }}>
        By ZAVALABS Mobile Apps
      </Text> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

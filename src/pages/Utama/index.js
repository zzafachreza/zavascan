import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  Image,
  Animated,
  StatusBar
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { color } from 'react-native-reanimated';
import { getData, storeData } from '../../utils/localStorage';
import { PermissionsAndroid } from 'react-native';
import LottieView from 'lottie-react-native';
import DeviceInfo from 'react-native-device-info';
export default function Utama({ navigation }) {


  useEffect(() => {


    DeviceInfo.getDeviceName().then((name) => {
      DeviceInfo.getMacAddress().then((id) => {
        storeData('device', {
          deviceID: id,
          deviceName: name
        });
      });
    });



    const unsubscribe = getData('user').then(res => {
      if (!res) {
        setTimeout(() => {
          navigation.replace('Login');
        }, 2000);
      } else {
        setTimeout(() => {
          navigation.replace('MainApp');
        }, 2000);
      }
    });
  }, []);



  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.primary,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <Image
        source={require('../../assets/logo1.png')}
        resizeMode="contain"
        style={{ width: 300 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

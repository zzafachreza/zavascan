import React, { useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar
} from 'react-native';
import { colors } from '../../utils/colors';
import { getData, storeData } from '../../utils/localStorage';
import DeviceInfo from 'react-native-device-info';
export default function Utama({ navigation }) {


  DeviceInfo.getDeviceName().then((name) => {
    storeData('device', {
      deviceID: DeviceInfo.getDeviceId(),
      deviceName: name
    });
  });

  useEffect(() => {


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

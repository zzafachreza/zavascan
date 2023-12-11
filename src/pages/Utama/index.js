import React, { useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
  Animated,
  Text,
  ActivityIndicator,
  View
} from 'react-native';
import { colors } from '../../utils/colors';
import { getData, storeData } from '../../utils/localStorage';
import DeviceInfo from 'react-native-device-info';
import { MyDimensi } from '../../utils/fonts';
export default function Utama({ navigation }) {

  const img = new Animated.Value(MyDimensi / 1.5);
  const vw = new Animated.Value(0);

  DeviceInfo.getDeviceName().then((name) => {
    storeData('device', {
      deviceID: DeviceInfo.getDeviceId(),
      deviceName: name
    });
  });


  Animated.timing(img, {
    toValue: MyDimensi,
    duration: 800,
    useNativeDriver: false,
  }).start();
  Animated.timing(vw, {
    toValue: 1,
    duration: 1200,
    useNativeDriver: false,
  }).start();

  useEffect(() => {


    getData('user').then(res => {
      if (!res) {
        setTimeout(() => {
          navigation.replace('Login');
          // alert('ok')
        }, 1500);
      } else {
        setTimeout(() => {
          navigation.replace('MainApp');
        }, 1500);
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

      <View>
        <Animated.Image
          source={require('../../assets/splash.png')}
          resizeMode="contain"
          style={{
            width: img,
            height: img
          }}
        />
        <Animated.View style={{
          opacity: vw
        }}>
          <ActivityIndicator size="large" color={colors.white} />
        </Animated.View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

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
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { color } from 'react-native-reanimated';
import { getData, storeData } from '../../utils/localStorage';
import { PermissionsAndroid } from 'react-native';
import LottieView from 'lottie-react-native';
import DeviceInfo from 'react-native-device-info';

export default function Splash({ navigation }) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const bottom = new Animated.Value(windowWidth);
  const opacity = new Animated.Value(0);
  const bottomImage = new Animated.Value(-windowWidth);
  const bottomSun = new Animated.Value(-windowWidth);

  Animated.timing(bottom, {
    toValue: 0,
    duration: 1200,
    useNativeDriver: false,
  }).start();

  Animated.timing(opacity, {
    toValue: 1,
    duration: 2000,
    useNativeDriver: false,
  }).start();

  Animated.timing(bottomImage, {
    toValue: 100,
    duration: 1300,
    useNativeDriver: false,
  }).start();

  Animated.timing(bottomSun, {
    toValue: 0,
    duration: 1300,
    useNativeDriver: false,
  }).start();

  useEffect(() => {


    DeviceInfo.getDeviceName().then((name) => {
      // "OPM2.171026.006.G1"
      console.warn(name);

      DeviceInfo.getMacAddress().then((id) => {
        // "OPM2.171026.006.G1"

        storeData('device', {
          deviceID: id,
          deviceName: name
        });
      });



      // storeData('device', display);
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
    <SafeAreaView style={styles.page}>
      <View
        style={{
          flex: 1,
          // backgroundColor: 'red',
          padding: 20,
        }}>
        <Animated.Text
          style={{
            marginTop: 20,
            fontFamily: fonts.secondary[400],
            fontSize: windowWidth / 20,
            color: colors.black,
            bottom: bottom,
          }}>
          Aplikasi untuk memudahkan Anda dalam cek resi
        </Animated.Text>

        <Animated.View
          style={{
            width: windowWidth,
            // borderRadius: 80 / 2,
            right: bottomSun,
            // bottom: bottomImage,
            // margin: 10,
            height: 10,
            backgroundColor: colors.primary,
          }}
        />
      </View>
      <LottieView source={require('../../assets/scan.json')} autoPlay loop />

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'red',
        }}>
        <Image
          resizeMode="contain"
          style={{ width: 200, height: 200, alignSelf: 'center' }}
          source={require('../../assets/logo5.png')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  image: {
    // aspectRatio: 1,
  },
});

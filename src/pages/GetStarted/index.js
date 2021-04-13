import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Animated,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {MyButton, MyGap} from '../../components';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import LottieView from 'lottie-react-native';

export default function GetStarted({navigation}) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const bottom = new Animated.Value(windowWidth);
  const opacity = new Animated.Value(0);
  const top = new Animated.Value(0);

  Animated.timing(bottom, {
    toValue: 100,
    duration: 1200,
    useNativeDriver: false,
  }).start();

  Animated.timing(opacity, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: false,
  }).start();

  Animated.timing(top, {
    toValue: 50,
    duration: 1000,
    useNativeDriver: false,
  }).start();

  return (
    <ImageBackground
      source={require('../../assets/back.jpg')}
      style={styles.page}>
      <Text
        style={{
          fontSize: windowWidth / 6,
          fontFamily: fonts.secondary[900],
          color: colors.secondary,
          bottom: -30,
        }}>
        LAPULA
      </Text>
      <Text
        style={{
          fontSize: windowWidth / 6,
          fontFamily: fonts.secondary[900],
          color: colors.primary,
        }}>
        BEAUTY
      </Text>

      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
        }}>
        <MyButton
          title="LOGIN"
          Icons="log-in"
          warna={colors.primary}
          onPress={() => navigation.navigate('Login')}
        />
      </View>

      <Animated.View style={{height: top}} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  page: {
    // backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
});

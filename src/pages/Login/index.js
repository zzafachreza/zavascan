import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  Linking,
  Image,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Animated,
  ImageBackground,
  TouchableNativeFeedback,
} from 'react-native';
import { colors } from '../../utils/colors';
import { MyDimensi, fonts } from '../../utils/fonts';
import { MyInput, MyGap, MyButton } from '../../components';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import { storeData, getData } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';

export default function Login({ navigation }) {
  const windowWidth = Dimensions.get('window').width;
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(true);



  const validate = text => {

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      setData({ ...data, email: text });
      setValid(false);
      return false;
    } else {
      setData({ ...data, email: text });
      setValid(true);
    }
  };

  const [data, setData] = useState({
    email: '',
    password: '',
  });


  useEffect(() => {



    getData('device').then(res => {
      setData({
        ...data,
        deviceID: res.deviceID,
        deviceName: res.deviceName
      })
    })
  }, [])


  // login ok
  const masuk = () => {
    if (!valid) {
      showMessage({
        message: 'Maaf Email tidak valid !',
      });
    }
    else if (data.email.length === 0 && data.password.length === 0) {
      showMessage({
        message: 'Maaf Email dan Password masih kosong !',
      });
    } else if (data.email.length === 0) {
      showMessage({
        message: 'Maaf Email masih kosong !',
      });
    } else if (data.password.length === 0) {
      showMessage({
        message: 'Maaf Password masih kosong !',
      });
    } else {
      setLoading(true);
      setTimeout(() => {
        axios.post('https://zavalabs.com/api/login.php', data).then(res => {

          if (res.data.kode == 50) {
            showMessage({
              type: 'danger',
              message: res.data.msg,
            });
          } else {
            storeData('user', res.data);
            navigation.replace('MainApp');
          }
        }).finally(() => {
          setLoading(false);
        });
      }, 1200);
    }
  };


  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.primary
    }}>
      <ScrollView>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 10,
        }}>
          <Image source={require('../../assets/logo.png')} style={{
            width: MyDimensi / 1.2,
            height: MyDimensi / 1.3,
          }} />
        </View>
        <View style={{
          paddingHorizontal: 20,
        }}>
          <Text style={{
            fontFamily: fonts.secondary[600],
            color: colors.white,
            fontSize: MyDimensi / 14,
            marginBottom: 30,
          }}>Login</Text>

          <MyInput iconname="mail-outline" label="Email" placeholder="example@gmail.com" value={data.email}
            onChangeText={value => validate(value)} />
          <View style={{
            height: 20,
          }}>
            {!valid && (
              <Text
                style={{
                  color: colors.warning,
                  fontFamily: fonts.secondary[400],
                  textAlign: 'right',
                  fontSize: MyDimensi / 25,
                  marginTop: 10,
                  right: 10,
                }}>
                Maaf Email Anda Tidak Valid !
              </Text>
            )}
          </View>

          <MyInput onChangeText={value =>
            setData({
              ...data,
              password: value,
            })
          } iconname="lock-closed-outline" placeholder="******" label="Password" secureTextEntry />
          <MyGap jarak={35} />
          <View style={{
            paddingHorizontal: 40,
          }}>
            <MyButton
              warna={colors.bgform}
              colorText={colors.black}
              iconColor={colors.black}
              title="Login"
              Icons="log-in"
              onPress={masuk}
            />
            <MyGap jarak={20} />
            <MyButton
              warna={colors.bgform}
              colorText={colors.black}
              iconColor={colors.black}
              title="Hubungi Admin untuk login"
              Icons="logo-whatsapp"
              onPress={() => Linking.openURL('https://wa.me/6281312924040?text=Hallo%20admin%20mau%20coba%20demo%20aplikasi%20*ZAVASCAN*%20dong...')}
            />

          </View>

        </View>
      </ScrollView>
      {loading && (
        <LottieView
          source={require('../../assets/animation.json')}
          autoPlay
          loop
          style={{ backgroundColor: colors.primary }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 10,
  },
  image: {
    aspectRatio: 1.5,
    resizeMode: 'contain',
  },
});

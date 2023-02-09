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
  ImageBackground,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
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
    if (data.email.length === 0 && data.password.length === 0) {
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
          setLoading(false);
          if (res.data.kode == 50) {
            showMessage({
              type: 'danger',
              message: res.data.msg,
            });
          } else {
            storeData('user', res.data);
            navigation.replace('MainApp');
          }
        });
      }, 1200);
    }
  };
  return (
    <ImageBackground
      source={require('../../assets/back.jpeg')}
      style={styles.page}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
        }}>
        <View
          style={{
            height: 220,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.primary,
            padding: 10,
            borderRadius: 10,
          }}>
          <Image
            source={require('../../assets/logo1.png')}
            style={{
              resizeMode: 'contain',
              aspectRatio: 0.3,
            }}
          />
        </View>
        <View style={styles.page}>
          <Text
            style={{
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 20,
              color: colors.black,
              textAlign: 'center',
            }}>
            Silahkan login untuk masuk ke aplikasi
          </Text>

          <MyGap jarak={20} />
          <MyInput
            placeholder="Masukan email Anda"
            label="Email"
            iconname="mail"
            value={data.nama_lengkap}
            onChangeText={value => validate(value)}
          />

          {!valid && (
            <Text
              style={{
                color: colors.danger,
                fontFamily: fonts.primary[600],
                textAlign: 'right',
                right: 10,
              }}>
              Maaf Email Anda Tidak Valid !
            </Text>
          )}
          <MyGap jarak={20} />
          <MyInput
            label="Password"
            placeholder="Masukan password Anda"
            iconname="key"
            secureTextEntry
            onChangeText={value =>
              setData({
                ...data,
                password: value,
              })
            }
          />
          <MyGap jarak={40} />
          {valid && (
            <MyButton
              warna={colors.primary}
              title="LOGIN"
              Icons="log-in"
              onPress={masuk}
            />
          )}
          <MyGap jarak={10} />
          <MyButton
            warna={colors.success}
            title="HUBUNGI ADMIN UNTUK LOGIN"
            Icons="call"
            onPress={() => Linking.openURL('https://wa.me/6281319456595?text=Hallo%20admin%20mau%20coba%20demo%20aplikasi%20*ZAVASCAN*%20dong...')}
          />
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
    </ImageBackground>
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

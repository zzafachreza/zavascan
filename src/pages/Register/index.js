import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {MyInput, MyGap, MyButton} from '../../components';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import LottieView from 'lottie-react-native';

export default function Register({navigation}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    nama_lengkap: null,
    email: null,
    password: null,
    telepon: null,
    alamat: null,
  });

  const simpan = () => {
    setLoading(true);
    console.log(data);
    axios.post('https://zavalabs.com/api/register.php', data).then(res => {
      console.log(res);
      let err = res.data.split('#');

      // console.log(err[0]);
      if (err[0] == 50) {
        setTimeout(() => {
          setLoading(false);
          showMessage({
            message: err[1],
            type: 'danger',
          });
        }, 1200);
      } else {
        setTimeout(() => {
          setLoading(false);
          navigation.replace('Success', {
            messege: res.data,
          });
        }, 1200);
        showMessage({
          message: res.data,
          type: 'success',
        });
      }
    });
  };
  return (
    <ImageBackground
      style={styles.page}
      source={require('../../assets/back-beton.png')}>
      <ScrollView style={styles.page}>
        {/* <Image
        source={require('../../assets/logooren.png')}
        style={styles.image}
      /> */}

        <MyGap jarak={20} />
        <MyInput
          label="Nama Lengkap"
          iconname="person"
          value={data.nama_lengkap}
          onChangeText={value =>
            setData({
              ...data,
              nama_lengkap: value,
            })
          }
        />
        <MyGap jarak={10} />
        <MyInput
          label="Email"
          iconname="mail"
          value={data.email}
          onChangeText={value =>
            setData({
              ...data,
              email: value,
            })
          }
        />
        <MyGap jarak={10} />
        <MyInput
          label="Alamat"
          iconname="map"
          value={data.alamat}
          onChangeText={value =>
            setData({
              ...data,
              alamat: value,
            })
          }
        />
        <MyGap jarak={10} />
        <MyInput
          label="Telepon"
          iconname="call"
          keyboardType="number-pad"
          value={data.telepon}
          onChangeText={value =>
            setData({
              ...data,
              telepon: value,
            })
          }
        />
        <MyGap jarak={10} />
        <MyInput
          label="Password"
          iconname="key"
          secureTextEntry
          value={data.password}
          onChangeText={value =>
            setData({
              ...data,
              password: value,
            })
          }
        />
        <MyGap jarak={40} />
        <MyButton
          warna={colors.secondary}
          title="MASUK"
          Icons="log-in"
          onPress={simpan}
        />
        <Text
          style={{
            marginTop: 20,
            fontFamily: fonts.secondary[500],
            fontSize: 16,
            color: colors.black,
            // maxWidth: 230,
          }}>
          Silahkan melakukan pendaftaran terlebih dahulu, sebelum masuk ke
          Aplikasi Sobat Beton
        </Text>
      </ScrollView>
      {loading && (
        <LottieView
          source={require('../../assets/animation.json')}
          autoPlay
          loop
          style={{
            flex: 1,
            backgroundColor: colors.white,
          }}
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
    width: 620 / 4,
    height: 160 / 4,
  },
});

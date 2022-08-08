import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { MyInput, MyGap, MyButton } from '../../components';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import LottieView from 'lottie-react-native';

export default function Register({ navigation }) {
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
    nama_lengkap: '',
    email: '',
    password: '',
    telepon: '62',
    alamat: '',
  });

  const simpan = () => {

    console.log(data);
    if (data.nama_lengkap.length === 0) {
      showMessage({
        message: 'Maaf nama lengkap masih kosong !',
      });
    } else if (data.email.length === 0) {
      showMessage({
        message: 'Maaf email masih kosong !',
      });
    } else if (data.alamat.length === 0) {
      showMessage({
        message: 'Maaf alamat masih kosong !',
      });
    } else if (data.telepon.length <= 2) {
      showMessage({
        message: 'Maaf whatsapp masih kosong !',
      });
    } else if (data.password.length === 0) {
      showMessage({
        message: 'Maaf password masih kosong !',
      });
    } else {
      setLoading(true);
      axios.post('https://zavalabs.com/api/register.php', data).then(res => {
        console.log(res.data);

        if (parseInt(res.data) === 404) {
          setLoading(false);
          showMessage({
            message: 'Maaf nomor whatsapp Anda sudah terdaftar !',
            type: 'danger'
          })
        } else if (parseInt(res.data) === 405) {
          setLoading(false);
          showMessage({
            message: 'Maaf email Anda sudah terdaftar !',
            type: 'danger'
          })
        } else {

          setData({
            ...data,
            otp: res.data,
          })

          setTimeout(() => {
            setLoading(false);
            navigation.navigate('Otp', data)
          }, 1500)
        }



        // console.log(err[0]);
        // if (err[0] == 50) {
        //   setTimeout(() => {
        //     setLoading(false);
        //     showMessage({
        //       message: err[1],
        //       type: 'danger',
        //     });
        //   }, 1200);
        // } else {
        //   setTimeout(() => {
        //     setLoading(false);
        //     navigation.replace('Success', {
        //       messege: res.data,
        //     });
        //   }, 1200);
        //   showMessage({
        //     message: res.data,
        //     type: 'success',
        //   });
        // }
      });
    }
  };
  return (
    <ImageBackground style={styles.page}>
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
          label="Nomor Whatsapp (6281....)"
          iconname="logo-whatsapp"
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
        {valid && <MyButton
          warna={colors.secondary}
          title="DAFTAR SEKARANG"
          Icons="log-in"
          onPress={simpan}
        />}
        <Text
          style={{
            marginTop: 20,
            fontFamily: fonts.secondary[500],
            fontSize: 16,
            color: colors.black,
            // maxWidth: 230,
          }}>
          Silahkan melakukan pendaftaran terlebih dahulu, sebelum masuk ke
          Aplikasi Zavascan
        </Text>
      </ScrollView>
      {loading && (
        <LottieView
          source={require('../../assets/animation.json')}
          autoPlay
          loop
          style={{
            flex: 1,
            backgroundColor: colors.primary,
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

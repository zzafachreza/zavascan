import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import {fonts} from '../../utils/fonts';

export default function KamerHasil({navigation, route}) {
  const kirim = route.params;
  const [cek, setCek] = useState();
  const [pesan, setPesan] = useState('');
  useEffect(() => {
    axios
      .post('https://zavalabs.com/api/zavascan_kamera_add.php', kirim)
      .then(res => {
        console.log(res);
        if (res.data == 404) {
          // alert(cek);
          setCek(true);
          setPesan('Sudah pernah discan');
          setTimeout(() => {
            navigation.replace('Scanner');
          }, 500);
        } else {
          // alert(cek);
          setCek(false);
          setPesan('Berhasil disimpan !');
          setTimeout(() => {
            navigation.replace('Scanner');
          }, 500);
        }
      });
  }, []);
  return (
    <View
      style={{
        flex: 1,
      }}>
      {cek && (
        <LottieView
          source={require('../../assets/error.json')}
          autoPlay
          loop={false}
        />
      )}

      {!cek && (
        <LottieView
          source={require('../../assets/success.json')}
          autoPlay
          loop={false}
        />
      )}
      <Text
        style={{
          textAlign: 'center',
          margin: 10,
          fontFamily: fonts.secondary[600],
          fontSize: 18,
        }}>
        {kirim.key}
      </Text>
      <Text
        style={{
          textAlign: 'center',
          margin: 10,
          fontFamily: fonts.secondary[400],
          fontSize: 18,
        }}>
        {pesan}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});

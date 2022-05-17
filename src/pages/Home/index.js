import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import LottieView from 'lottie-react-native';
import { getData } from '../../utils/localStorage';
import { FlatListSlider } from 'react-native-flatlist-slider';
import { Preview, MyDashboard } from '../../components';
import { Icon } from 'react-native-elements';
import MyNews from '../../components/MyNews';
import MyCarouser from '../../components/MyCarouser';

export default function Home({ navigation }) {

  const [user, setUser] = useState([]);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    getData('user').then(res => {
      setUser(res);
    });

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(
      date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
    );
  }, []);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const ratio = 192 / 108;
  const _renderItem = ({ item, index }) => {
    return (
      <Image
        resizeMode="contain"
        source={{ uri: item.image }}
        style={{
          width: windowWidth,
          height: Math.round((windowWidth * 9) / 16),
        }}
      />
    );
  };

  const DataKategori = ({
    icon,
    nama,
    nama2,
    onPress,
    warna = colors.primary,
  }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: warna,
          padding: 5,
          borderRadius: 10,
          width: windowWidth / 2.5,
          height: windowHeight / 5,
          elevation: 5,
          justifyContent: 'center',
        }}>
        <View>
          <Icon
            type="ionicon"
            name={icon}
            color={colors.white}
            size={windowWidth / 5}
          />
        </View>
        <View>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              color: colors.white,
              fontSize: windowWidth / 30,
              textAlign: 'center',
              // marginHorizontal: 10,
            }}>
            {nama}
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              color: colors.white,
              fontSize: windowWidth / 35,
              textAlign: 'center',
              // marginHorizontal: 10,
            }}>
            {nama2}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}>
      <View
        style={{
          padding: 10,

          height: windowHeight / 10,
          flexDirection: 'row',
        }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: fonts.secondary[400],
              fontSize: 12,
              maxWidth: '80%',
              color: colors.white,
            }}>
            Selamat datang,
          </Text>
          <Text
            style={{
              marginTop: 2,
              fontFamily: fonts.secondary[600],
              fontSize: 14,
              maxWidth: '80%',
              color: colors.white,
            }}>
            {user.nama_lengkap}
          </Text>
          <Text
            style={{
              marginTop: 2,
              fontFamily: fonts.secondary[400],
              fontSize: 12,
              maxWidth: '80%',
              color: colors.white,
            }}>
            {user.email}
          </Text>
        </View>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
          <Text style={{
            fontFamily: fonts.secondary[800],
            color: colors.white,
            fontSize: 22,
          }}>ZAVASCAN</Text>
        </View>

        {/* <TouchableOpacity
          onPress={() => navigation.navigate('SerahTerima')}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
          }}>
          <Icon
            type="ionicon"
            name="open-outline"
            color={colors.white}
            size={windowWidth / 15}
          />
        </TouchableOpacity> */}
      </View>
      <MyCarouser />
      <ImageBackground
        source={require('../../assets/back.jpeg')}
        style={{
          flex: 1,
          backgroundColor: colors.white,
          justifyContent: 'center',
        }}>

        {/* <MyDashboard /> */}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <DataKategori
            warna={colors.primary}
            onPress={() => navigation.navigate('Scanner')}
            icon="qr-code-outline"
            nama="SCAN ALAT / MANUAL"
            nama2="Menggunakan Alat Scanner"
          />
          <DataKategori
            warna={colors.primary}
            onPress={() => navigation.navigate('Kamera')}
            icon="camera-outline"
            nama="SCAN KAMERA"
            nama2="Menggunakan Kamera HP"
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 20,
          }}>
          <DataKategori
            warna={colors.primary}
            onPress={() => navigation.navigate('LaporanTanggal')}
            icon="calendar-outline"
            nama="LAPORAN"
            nama2="Laporan Berdasarkan Tanggal"
          />
          <DataKategori
            warna={colors.primary}
            onPress={() => navigation.navigate('Hasil')}
            icon="file-tray-stacked-outline"
            nama="HASIL SCAN"
            nama2="Hasil Scan Hari ini"
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

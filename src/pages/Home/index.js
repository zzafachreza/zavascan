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
import { MyDimensi, fonts } from '../../utils/fonts';
import LottieView from 'lottie-react-native';
import { APIurl, getData } from '../../utils/localStorage';
import { FlatListSlider } from 'react-native-flatlist-slider';
import { Preview, MyDashboard } from '../../components';
import { Icon } from 'react-native-elements';
import MyNews from '../../components/MyNews';
import axios from 'axios';
import moment from 'moment';
import MyCarouser from '../../components/MyCarouser';
import { Alert } from 'react-native';
import { Linking } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

export default function Home({ navigation }) {

  const [user, setUser] = useState([]);
  const [currentDate, setCurrentDate] = useState('');
  const [device, setDivice] = useState({});
  const [open, setOpen] = useState(true);
  const [rekap, setRekap] = useState({
    resi: 0,
    packing: 0,
    retur: 0,
  })

  const [expired, setExpired] = useState('');
  const today = moment().format('YYYY-MM-DD');

  const isFocused = useIsFocused()
  useEffect(() => {
    if (isFocused) {
      getData('user').then(res => {
        setUser(res);


        // setLoading(true);
        axios.get(APIurl + 'rekap?id_member=' + res.id).then(resp => {
          console.log(resp.data);
          setRekap(resp.data)

        }).finally(() => {

        })



        axios.post('https://zavalabs.com/api/zavascan_expired.php', {
          id: res.id
        }).then(cek => {
          console.log('expired', cek.data);

          if (cek.data <= today) {
            console.log('Expired !');

            Alert.alert(
              "ZAVASCAN INFO",
              "Mohon maaf masa berlaku akun Anda telah berakhir, silahkan hubungi admin untuk mengaktifkan kembali",
              [

                { text: "Hubungi Admin", onPress: () => Linking.openURL('https://wa.me/6281319456595') }
              ]
            );
            setOpen(false);
          } else {
            console.log('Masih jalan')
            setOpen(true);
          }
        })
        getData('device').then(res2 => {
          setDivice(res2);
        });
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
    }
  }, [isFocused]);

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
    img,
    nama,
    nama2,
    onPress,
    warna = colors.secondary,
  }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: warna,
          padding: 5,
          borderRadius: 10,
          width: windowWidth / 2.5,
          height: windowHeight / 4.5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View>
          <Image source={img} style={{
            width: windowWidth / 7,
            height: windowWidth / 7,
            marginBottom: 10,
          }} />
        </View>
        <View>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              color: colors.black,
              fontSize: MyDimensi / 22,
              textAlign: 'center',
              marginBottom: 5,
            }}>
            {nama}
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              color: colors.white,
              fontSize: MyDimensi / 28,
              textAlign: 'center',
              color: '#82A6B0'
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
        backgroundColor: colors.white,
      }}>
      <View
        style={{
          paddingHorizontal: 10,
          paddingTop: 15,
          backgroundColor: colors.primary,
          height: windowHeight / 10,
          flexDirection: 'row',
          alignItems: 'center'
        }}>
        <View style={{ flex: 1, paddingLeft: 10, }}>

          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: MyDimensi / 22,
              color: colors.white,
            }}>
            Hi, {user.nama_lengkap}
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[400],
              fontSize: MyDimensi / 25,
              color: colors.white,
            }}>
            Welcome to zavascan
          </Text>
        </View>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          // flex: 1,
        }}>
          <Image source={require('../../assets/logohr.png')} style={{
            width: windowWidth / 4,
            resizeMode: 'contain',
            height: 30,
          }} />
          <Text style={{
            fontFamily: fonts.secondary[400],
            color: colors.white,
            fontSize: MyDimensi / 25,
          }}>{device.deviceName}</Text>

        </View>
      </View>
      <View style={{
        height: windowHeight / 7,
        // borderBottomLeftRadius: 50,
        // borderBottomRightRadius: 50,
        backgroundColor: colors.primary,
      }} />
      <View style={{
        marginTop: -80,
      }}>
        <MyCarouser />
      </View>

      {open && <View

        style={{
          flex: 1,
          backgroundColor: colors.white,
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <DataKategori
            onPress={() => navigation.navigate('Resi', user)}
            img={require('../../assets/a1.png')}
            nama="Scan Resi"
            nama2={rekap.resi + ' Scanned'}
          />
          <DataKategori
            onPress={() => navigation.navigate('Packing', user)}
            img={require('../../assets/a2.png')}
            nama="Scan Packing"
            nama2={rekap.packing + ' Scanned'}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 20,
          }}>
          <DataKategori

            onPress={() => navigation.navigate('Retur', user)}
            img={require('../../assets/a3.png')}
            nama="Scan Return"
            nama2={rekap.retur + ' Scanned'}
          />
          <DataKategori


            onPress={() => navigation.navigate('Laporan')}
            img={require('../../assets/a4.png')}
            nama="Laporan"
            nama2={(rekap.resi + rekap.packing + rekap.retur) + ' Scanned'}
          />
        </View>
        {/* <TouchableOpacity onPress={() => Linking.openURL('https://wa.me/6281319456595')} style={{
          padding: 10,
          borderRadius: 5,
          marginVertical: 10,
          marginHorizontal: 20,
          backgroundColor: colors.tertiary,

        }}>
          <Text style={{
            fontFamily: fonts.secondary[600],
            color: colors.primary,
            fontSize: windowWidth / 30,
            textAlign: 'center',
          }}>Klik disini untuk membuka Aplikasi ZAVASCAN via website</Text>
        </TouchableOpacity> */}
      </View >}

      {!open && <View style={{
        flex: 1,
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text style={{
          color: colors.white,
          fontFamily: fonts.secondary[400],
          textAlign: 'center',
          fontSize: 25,
        }}>Silahkan hubungi admin untuk melakukan upgrade</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://wa.me/6281319456595')}>
          <Text style={{
            backgroundColor: colors.success,
            padding: 10,
            borderRadius: 10,
            marginVertical: 10,
            color: colors.white,
            fontFamily: fonts.secondary[800],
            textAlign: 'center',
            fontSize: 25,
          }}>0813-1945-5695</Text>
        </TouchableOpacity>
      </View>}
    </SafeAreaView>
  );
}

import React, {useState, useEffect} from 'react';
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
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import LottieView from 'lottie-react-native';
import {getData} from '../../utils/localStorage';
import {FlatListSlider} from 'react-native-flatlist-slider';
import {Preview} from '../../components';
import {Icon} from 'react-native-elements';
import MyNews from '../../components/MyNews';

export default function Home({navigation}) {
  const images = [
    {
      image: 'https://kipmi.or.id/wp-content/uploads/2016/11/beton1.jpg',
    },
    {
      image: 'https://kipmi.or.id/wp-content/uploads/2017/01/molen-kecil.jpg',
    },
    {
      image: 'https://kipmi.or.id/wp-content/uploads/2016/11/beton8.jpg',
    },
  ];

  const [user, setUser] = useState([]);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    getData('user').then(res => {
      console.log(res);
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
  const _renderItem = ({item, index}) => {
    return (
      <Image
        resizeMode="contain"
        source={{uri: item.image}}
        style={{
          width: windowWidth,
          height: Math.round((windowWidth * 9) / 16),
        }}
      />
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View
        style={{
          backgroundColor: colors.primary,
          padding: 10,
          height: windowHeight / 6,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}>
        <Text
          style={{
            fontFamily: fonts.secondary[400],
            fontSize: windowWidth / 25,
            maxWidth: '80%',
            color: colors.white,
          }}>
          Selamat datang,
        </Text>
        <Text
          style={{
            marginTop: 2,
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 25,
            maxWidth: '80%',
            color: colors.white,
          }}>
          {user.nama_lengkap}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          // backgroundColor: 'red',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Kamera')}
          style={{
            paddingVertical: 20,
            paddingLeft: 10,
            alignItems: 'center',
            backgroundColor: colors.secondary,
            margin: 10,
            borderRadius: 10,
            flexDirection: 'row',
          }}>
          <Icon name="barcode-outline" type="ionicon" color={colors.white} />
          <Text
            style={{
              left: 10,
              fontFamily: fonts.secondary[600],
              color: colors.white,
              textAlign: 'center',
            }}>
            MULAI SCAN KAMERA
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Manual')}
          style={{
            paddingVertical: 20,
            paddingLeft: 10,
            alignItems: 'center',
            backgroundColor: colors.primary,
            margin: 10,
            borderRadius: 10,
            flexDirection: 'row',
          }}>
          <Icon name="keypad-outline" type="ionicon" color={colors.white} />
          <Text
            style={{
              left: 10,
              fontFamily: fonts.secondary[600],
              color: colors.white,
              textAlign: 'center',
            }}>
            MULAI INPUT MANUAL
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Hasil')}
          style={{
            paddingVertical: 20,
            paddingLeft: 10,
            alignItems: 'center',
            backgroundColor: colors.tertiary,
            margin: 10,
            borderRadius: 10,
            flexDirection: 'row',
          }}>
          <Icon name="list" type="ionicon" color={colors.white} />
          <Text
            style={{
              left: 10,
              fontFamily: fonts.secondary[600],
              color: colors.white,
              textAlign: 'center',
            }}>
            HASIL DATA SCAN
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
